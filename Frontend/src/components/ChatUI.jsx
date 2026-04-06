import React, { useState, useEffect, useRef } from 'react'
import { Send, Phone, MoreVertical, AlertCircle } from 'lucide-react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

const themeConfig = {
  patient: {
    header: 'from-blue-600 to-blue-700',
    headerLight: 'text-blue-100',
    button: 'hover:bg-blue-500',
    message: 'from-blue-500 to-blue-600',
  },
  caregiver: {
    header: 'from-teal-600 to-teal-700',
    headerLight: 'text-teal-100',
    button: 'hover:bg-teal-500',
    message: 'from-teal-500 to-teal-600',
  },
  doctor: {
    header: 'from-purple-600 to-purple-700',
    headerLight: 'text-purple-100',
    button: 'hover:bg-purple-500',
    message: 'from-purple-500 to-purple-600',
  },
}

export default function ChatUI({ conversation, onBack }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')
  const [loading, setLoading] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)
  const messagesEndRef = useRef(null)

  const theme = themeConfig[user?.role?.toLowerCase()] || themeConfig.patient

  // Fetch messages when conversation changes
  useEffect(() => {
    if (conversation) {
      fetchMessages()
      // Poll for new messages every 2 seconds
      const interval = setInterval(fetchMessages, 2000)
      return () => clearInterval(interval)
    }
  }, [conversation])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchMessages = async () => {
    try {
      const response = await api.getMessages(conversation.id)
      if (response.data && response.data.messages) {
        setMessages(response.data.messages)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!messageText.trim()) return

    try {
      setSendingMessage(true)
      await api.sendMessage(conversation.id, messageText)
      setMessageText('')
      await fetchMessages()
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSendingMessage(false)
    }
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center text-gray-500">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-semibold">Select a conversation to start</p>
          <p className="text-sm mt-2 opacity-70">Choose a contact from the left to view messages</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.header} text-white px-6 py-4 flex items-center justify-between shadow-md`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-semibold text-lg">
            {conversation.otherUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold">{conversation.otherUser.name}</h2>
            <p className={`${theme.headerLight} text-xs`}>Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className={`p-2 ${theme.button} rounded-full transition`}>
            <Phone className="w-5 h-5" />
          </button>
          <button className={`p-2 ${theme.button} rounded-full transition`}>
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No messages yet</p>
              <p className="text-sm mt-1">Start the conversation!</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === user.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.senderId === user.id
                    ? 'text-white rounded-br-none shadow-md'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none shadow-sm'
                }`}
                style={
                  message.senderId === user.id
                    ? {
                        background: user?.role?.toLowerCase() === 'caregiver'
                          ? 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'
                          : user?.role?.toLowerCase() === 'doctor'
                          ? 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)'
                          : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      }
                    : {}
                }
              >
                <p className="text-sm break-words">{message.text}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.senderId === user.id
                      ? theme.headerLight
                      : 'text-gray-600'
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-3 items-center">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            disabled={sendingMessage}
            className={`flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:border-transparent disabled:bg-gray-100 ${
              user?.role?.toLowerCase() === 'caregiver'
                ? 'focus:ring-teal-500'
                : user?.role?.toLowerCase() === 'doctor'
                ? 'focus:ring-purple-500'
                : 'focus:ring-blue-500'
            }`}
          />
          <button
            type="submit"
            disabled={!messageText.trim() || sendingMessage}
            className="text-white p-3 rounded-full transition shadow-md hover:shadow-lg flex items-center justify-center disabled:from-gray-300 disabled:to-gray-400"
            style={
              !(!messageText.trim() || sendingMessage)
                ? {
                    background: user?.role?.toLowerCase() === 'caregiver'
                      ? 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'
                      : user?.role?.toLowerCase() === 'doctor'
                      ? 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)'
                      : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  }
                : {}
            }
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

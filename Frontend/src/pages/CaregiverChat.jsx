import React, { useState, useEffect } from 'react'
import { MessageCircle, AlertCircle, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'
import ChatUI from '../components/ChatUI'

export default function CaregiverChat() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchConversations()
    // Refresh conversations every 5 seconds
    const interval = setInterval(fetchConversations, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchConversations = async () => {
    try {
      setLoading(true)
      const response = await api.getConversations()
      if (response.data && response.data.conversations) {
        const convs = response.data.conversations.map((conv) => ({
          id: conv.id,
          otherUser: {
            id: conv.patient.id,
            name: conv.patient.name,
            email: conv.patient.email,
            avatar: conv.patient.avatar || null,
          },
          lastMessage: conv.Message && conv.Message.length > 0 
            ? conv.Message[conv.Message.length - 1]
            : null,
          updatedAt: conv.updatedAt || conv.createdAt,
        }))
        setConversations(convs)
        if (!selectedConversation && convs.length > 0) {
          setSelectedConversation(convs[0])
        }
      }
    } catch (err) {
      console.error('Error fetching conversations:', err)
      setError('Failed to load conversations')
    } finally {
      setLoading(false)
    }
  }

  const formatMessagePreview = (message) => {
    if (!message) return 'No messages yet'
    return message.text.length > 40 ? message.text.substring(0, 40) + '...' : message.text
  }

  const formatTime = (date) => {
    const now = new Date()
    const msgDate = new Date(date)
    const diffMs = now - msgDate
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return msgDate.toLocaleDateString()
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Main Chat Layout */}
      <div className="flex gap-4 flex-1 w-full overflow-hidden">
          {/* Sidebar - Conversations List */}
          <div className="w-72 bg-white flex flex-col border-r border-gray-200 h-full">
            {/* Sidebar Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 flex items-center gap-3">
              <Users className="w-6 h-6" />
              <h2 className="text-xl font-bold">My Patients</h2>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {error && (
                <div className="m-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
                  {error}
                </div>
              )}
              {loading && conversations.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <div className="animate-pulse flex gap-2 justify-center mb-2">
                      <div className="h-3 w-3 bg-teal-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-teal-400 rounded-full"></div>
                      <div className="h-3 w-3 bg-teal-300 rounded-full"></div>
                    </div>
                    <p>Loading conversations...</p>
                  </div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500 px-6">
                    <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="font-medium">No patients yet</p>
                    <p className="text-sm mt-2">Accept patient links to start messaging</p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`w-full text-left px-4 py-4 hover:bg-teal-50 transition border-l-4 ${
                        selectedConversation?.id === conversation.id
                          ? 'bg-teal-100 border-teal-600'
                          : 'border-transparent hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {conversation.otherUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {conversation.otherUser.name}
                          </h3>
                          <p className="text-sm text-gray-600 truncate">
                            {formatMessagePreview(conversation.lastMessage)}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatTime(conversation.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          {selectedConversation ? (
            <ChatUI conversation={selectedConversation} onBack={() => setSelectedConversation(null)} />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl m-4">
              <div className="text-center text-gray-500">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-semibold">No conversation selected</p>
                <p className="text-sm mt-2 opacity-70">Choose a patient from the left to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
}

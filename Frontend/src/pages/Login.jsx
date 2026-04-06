import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Notification from '../components/Notification'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [notification, setNotification] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const isNewSignup = searchParams.get('newSignup') === 'true'

  // Show verification message for new signups
  useEffect(() => {
    if (isNewSignup) {
      setNotification({ 
        message: 'First verify your email, then do login', 
        type: 'info'
      })
    }
  }, [isNewSignup])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setNotification(null)

    if (!email || !password) {
      setNotification({ message: 'Please fill all fields', type: 'error' })
      setIsLoading(false)
      return
    }

    try {
      const result = await login(email, password)
      
      if (result.success) {
        setNotification({ message: 'Sign in successful', type: 'success' })
        
        // Redirect based on role from backend
        const userRole = result.user?.role?.toUpperCase()
        if (userRole === 'CAREGIVER' || userRole === 'DOCTOR') {
          navigate('/caregiver/dashboard')
        } else if (userRole === 'ADMIN') {
          navigate('/admin/dashboard')
        } else {
          // Default to patient dashboard
          navigate('/dashboard')
        }
      } else {
        setNotification({ message: result.message || 'Login failed', type: 'error' })
      }
    } catch (error) {
      setNotification({ message: 'Network error. Please try again.', type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo - Mobile Only */}
      <Link to="/" className="lg:hidden mb-8 flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 bg-[#2F5B8C] rounded-lg flex items-center justify-center text-white font-bold">
          M
        </div>
        <span className="text-xl font-bold text-[#2F5B8C]">MediTrack</span>
      </Link>

      {/* Main Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[550px]">
          
          {/* LEFT SECTION - Healthcare Image (Hidden on mobile) */}
          <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
            {/* Background Image */}
            <img
              src="https://res.cloudinary.com/dnbayngfx/image/upload/v1775225795/tinywow_craf_88997672_ba3kre.png"
              alt="Healthcare Professional"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F5B8C]/90 via-[#2F5B8C]/40 to-transparent"></div>

            {/* Content - Bottom Left */}
            <div className="relative z-10 flex flex-col justify-end w-full h-full p-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Smart Medication Management</h2>
                <p className="text-white/90 text-sm leading-relaxed">
                  Track, manage, and improve medication adherence
                </p>
                
                {/* Bullet Points */}
                <ul className="space-y-3 text-white/85 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Real-time medication reminders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Caregiver monitoring & support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Track health progress</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - Existing Form (55% on desktop, 100% on mobile) */}
          <div className="w-full lg:w-[55%] flex flex-col items-center justify-center p-8 lg:p-12">
            {/* Logo - Desktop Only */}
            <Link to="/" className="hidden lg:flex mb-8 items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-[#2F5B8C] rounded-lg flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="text-xl font-bold text-[#2F5B8C]">MediTrack</span>
            </Link>

            {/* Form Content */}
            <div className="w-full max-w-sm">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5B8C] focus:border-transparent transition-all"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5B8C] focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-[#2F5B8C] transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="mt-2 text-right">
                    <Link to="/forgot-password" className="text-sm text-[#2F5B8C] hover:text-[#264a73]">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Submit and Home Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#2F5B8C] to-[#3E6FA3] hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </button>
                  <Link
                    to="/"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-[#2F5B8C] bg-[#EAEFF5] hover:bg-[#DDE5EE] transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </Link>
                </div>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-500">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-[#2F5B8C] hover:text-[#3E6FA3]">
                  Create one
                </Link>
              </p>

              {/* Security Info */}
              <div className="mt-6 p-4 bg-[#EAEFF5] rounded-lg text-center">
                <p className="text-xs text-gray-600">
                  Your data is encrypted and secure. HIPAA compliant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}

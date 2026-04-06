import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Notification from '../components/Notification'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('patient')
  const [notification, setNotification] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth()

  // Password strength calculation
  const getPasswordStrength = (pwd) => {
    let score = 0
    if (!pwd) return { score: 0, label: '' }
    
    // Length check
    if (pwd.length >= 8) score += 1
    if (pwd.length >= 12) score += 1
    
    // Character variety checks
    if (/[a-z]/.test(pwd)) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1
    
    // Determine label and color
    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500', textColor: 'text-red-500' }
    if (score <= 4) return { score, label: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-500' }
    return { score, label: 'Strong', color: 'bg-green-500', textColor: 'text-green-500' }
  }

  const passwordStrength = getPasswordStrength(password)
  const strengthPercentage = Math.min((passwordStrength.score / 6) * 100, 100)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setNotification(null)

    if (!name || !email || !password) {
      setNotification({ message: 'Please fill all fields', type: 'error' })
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setNotification({ message: 'Password must be at least 8 characters', type: 'error' })
      setIsLoading(false)
      return
    }

    try {
      // Split name into first and last
      const nameParts = name.trim().split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''

      // Detect user's timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const userData = {
        email,
        password,
        firstName,
        lastName,
        role: role.toUpperCase(),
        timezone
      }

      const result = await register(userData)
      
      if (result.success) {
        setNotification({ 
          message: 'You successfully created account! Please verify your email.', 
          type: 'success' 
        })
        
        // Show verification link in console for development
        if (result.data?.verifyLink) {
          console.log('Email Verification Link:', result.data.verifyLink)
        }
        
        // Redirect to login immediately with newSignup flag
        navigate('/login?newSignup=true')
      } else {
        setNotification({ message: result.message || 'Registration failed', type: 'error' })
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
              src="https://res.cloudinary.com/dnbayngfx/image/upload/v1775227496/craf3_ezgbop.jpg"
              alt="Healthcare Professional"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F5B8C]/90 via-[#2F5B8C]/40 to-transparent"></div>

            {/* Content - Bottom Left */}
            <div className="relative z-10 flex flex-col justify-end w-full h-full p-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Join Our Community</h2>
                <p className="text-white/90 text-sm leading-relaxed">
                  Be part of the medication adherence revolution
                </p>
                
                {/* Bullet Points */}
                <ul className="space-y-3 text-white/85 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Easy account setup & onboarding</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Personalized medication tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Professional healthcare support</span>
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
                  Create Your Account
                </h1>
                <p className="text-gray-600">
                  Join thousands managing their medications
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select Your Role
                  </label>
                  <div className="flex gap-2">
                    {/* Patient */}
                    <button
                      type="button"
                      onClick={() => setRole('patient')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg border-2 transition-all ${
                        role === 'patient'
                          ? 'bg-[#2F5B8C] text-white border-[#2F5B8C] shadow-lg'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#2F5B8C] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <div className={`p-1 rounded-lg ${role === 'patient' ? 'bg-white/20' : 'bg-[#EAEFF5]'}`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      <span className="font-semibold text-xs">Patient</span>
                    </button>
                    
                    {/* Caregiver */}
                    <button
                      type="button"
                      onClick={() => setRole('doctor')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg border-2 transition-all ${
                        role === 'doctor'
                          ? 'bg-[#2F5B8C] text-white border-[#2F5B8C] shadow-lg'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#2F5B8C] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <div className={`p-1 rounded-lg ${role === 'doctor' ? 'bg-white/20' : 'bg-[#EAEFF5]'}`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                        </svg>
                      </div>
                      <span className="font-semibold text-xs">Caregiver</span>
                    </button>
                    
                    {/* Admin */}
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg border-2 transition-all ${
                        role === 'admin'
                          ? 'bg-[#2F5B8C] text-white border-[#2F5B8C] shadow-lg'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#2F5B8C] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <div className={`p-1 rounded-lg ${role === 'admin' ? 'bg-white/20' : 'bg-[#EAEFF5]'}`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                        </svg>
                      </div>
                      <span className="font-semibold text-xs">Admin</span>
                    </button>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5B8C] focus:border-transparent transition-all"
                  />
                </div>

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
                      minLength={8}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5B8C] focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-[#2F5B8C] transition-colors"
                      tabIndex={-1}>
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
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Password Strength:</span>
                        <span className={`text-xs font-semibold ${passwordStrength.textColor}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${passwordStrength.color} transition-all duration-300 ease-out`}
                          style={{ width: `${strengthPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center">
                  By signing up, you agree to our Terms and Privacy Policy
                </p>

                {/* Submit and Home Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#2F5B8C] to-[#3E6FA3] hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
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

              {/* Sign In Link */}
              <p className="text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-[#2F5B8C] hover:text-[#3E6FA3]">
                  Sign in
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

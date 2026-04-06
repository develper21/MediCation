import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo with Favicon Icon */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition duration-200">
            {/* Favicon Icon */}
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" rx="20" fill="#2F5B8C"/>
                <circle cx="50" cy="50" r="35" fill="white"/>
                <text x="50" y="68" fontFamily="Arial, sans-serif" fontSize="45" fontWeight="bold" fill="#2F5B8C" textAnchor="middle">M</text>
                <circle cx="75" cy="25" r="12" fill="#3E6FA3"/>
                <path d="M75 19 L75 31 M69 25 L81 25" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-[#2F5B8C]">MediTrack</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {isAuthenticated && user ? (
              <>
                <span className="text-sm text-gray-600 font-medium">
                  Welcome, <span className="text-[#2F5B8C] font-semibold">{user.name}</span>
                </span>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-[#2F5B8C] font-medium transition duration-200"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#2F5B8C] to-[#3E6FA3] rounded-lg hover:shadow-md transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#2F5B8C] hover:text-[#3E6FA3] font-semibold transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#2F5B8C] to-[#3E6FA3] rounded-lg hover:shadow-md transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

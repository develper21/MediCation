import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

export default function Landing() {
  const { isAuthenticated, user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return

    if (isAuthenticated && user) {
      const userRole = user.role?.toUpperCase()
      if (userRole === 'CAREGIVER' || userRole === 'DOCTOR') {
        navigate('/caregiver/dashboard', { replace: true })
      } else if (userRole === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true })
      } else if (userRole === 'PATIENT') {
        navigate('/dashboard', { replace: true })
      }
    }
  }, [isAuthenticated, isLoading, user, navigate])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]"><div className="text-gray-600">Loading...</div></div>
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      {/* Hero Section - Problem Focused */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A3A52] via-[#2F5B8C] to-[#3E6FA3] pt-28 pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-400/30 mb-6">
                <svg className="w-4 h-4 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-red-200">Critical Healthcare Problem</span>
              </div>

              {/* Favicon Icon Branding */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-16 h-16">
                    <rect width="100" height="100" rx="20" fill="#2F5B8C"/>
                    <circle cx="50" cy="50" r="35" fill="white"/>
                    <text x="50" y="68" fontFamily="Arial, sans-serif" fontSize="45" fontWeight="bold" fill="#2F5B8C" textAnchor="middle">M</text>
                    <circle cx="75" cy="25" r="12" fill="#3E6FA3"/>
                    <path d="M75 19 L75 31 M69 25 L81 25" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white leading-tight">
                50% of Patients <span className="text-[#22C55E]">Skip Their Medications</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 mb-6 leading-relaxed">
                Medication non-adherence causes <strong className="text-white">125,000 deaths</strong> annually in the US alone and costs the healthcare system <strong className="text-white">$300 billion</strong> every year.
              </p>

              <p className="text-base text-white/70 mb-10 leading-relaxed">
                MediTrack is an intelligent medication adherence platform designed to solve this crisis through smart reminders, real-time caregiver alerts, and comprehensive adherence analytics.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link to="/signup">
                  <button className="w-full sm:w-auto px-8 py-4 bg-[#22C55E] text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <span>Start Your Journey</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
                <Link to="/login">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
                    Sign In
                  </button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#22C55E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#22C55E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>End-to-End Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#22C55E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Used by 10,000+ Patients</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600 font-medium">Medication Adherence Crisis</span>
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">URGENT</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Patients Missing Doses</span>
                          <span className="font-bold text-red-500">50%</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{width: '50%'}} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Chronic Disease Patients</span>
                          <span className="font-bold text-orange-500">60%</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{width: '60%'}} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Annual Deaths (US)</span>
                          <span className="font-bold text-red-600">125,000</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-red-600 rounded-full" style={{width: '75%'}} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-xl p-6 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-bold text-lg">MediTrack Solution</span>
                    </div>
                    <p className="text-white/90 text-sm">
                      Our platform improves adherence by up to <strong className="text-white">85%</strong> through intelligent reminders and caregiver support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">
              The Challenge
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Medication Adherence Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Poor medication adherence is one of the biggest challenges in healthcare, affecting millions of patients and costing billions in preventable medical expenses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border-2 bg-red-50 text-red-600 border-red-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white shadow-sm mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="text-5xl font-bold mb-2">50%</div>
              <div className="font-semibold mb-3 opacity-90">of chronic disease patients</div>
              <p className="text-sm opacity-80 leading-relaxed">do not take their medications as prescribed, leading to disease progression and complications.</p>
            </div>

            <div className="p-8 rounded-2xl border-2 bg-orange-50 text-orange-600 border-orange-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white shadow-sm mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold mb-2">$300B</div>
              <div className="font-semibold mb-3 opacity-90">annual cost to healthcare</div>
              <p className="text-sm opacity-80 leading-relaxed">in the United States alone due to medication non-adherence and related complications.</p>
            </div>

            <div className="p-8 rounded-2xl border-2 bg-red-50 text-red-600 border-red-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white shadow-sm mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold mb-2">125K</div>
              <div className="font-semibold mb-3 opacity-90">preventable deaths per year</div>
              <p className="text-sm opacity-80 leading-relaxed">in the US due to medication non-adherence - more than many chronic diseases combined.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
              Our Solution
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How MediTrack Transforms Adherence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines smart technology with human care to ensure patients never miss their medications again.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                ),
                title: 'Smart Reminders',
                description: 'Personalized notifications via SMS, push, and email at optimal times based on your schedule.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Adherence Analytics',
                description: 'Visual dashboards showing adherence trends, streaks, and improvement over time.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Caregiver Network',
                description: 'Family members and healthcare providers receive instant alerts for missed doses.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'HIPAA Secure',
                description: 'End-to-end encryption and full HIPAA compliance for complete data protection.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="w-14 h-14 bg-[#EAEFF5] rounded-xl flex items-center justify-center text-[#2F5B8C] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-[#2F5B8C] to-[#3E6FA3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm font-semibold mb-4">
              Proven Results
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Making a Real Impact
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Our numbers speak for themselves. See how MediTrack is transforming medication adherence worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '85%', label: 'Adherence Improvement', subtext: 'Average increase in 3 months' },
              { number: '50K+', label: 'Active Users', subtext: 'Patients using daily' },
              { number: '2M+', label: 'Doses Tracked', subtext: 'Medications monitored' },
              { number: '99.9%', label: 'Platform Uptime', subtext: 'Enterprise reliability' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-5xl font-bold text-[#22C55E] mb-2">{stat.number}</div>
                <div className="font-semibold text-white mb-1">{stat.label}</div>
                <p className="text-sm text-white/70">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Four simple steps to transform your medication adherence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up in seconds with your email' },
              { step: '02', title: 'Add Medications', desc: 'Enter your prescriptions and dosage' },
              { step: '03', title: 'Set Schedule', desc: 'Choose reminder times that work for you' },
              { step: '04', title: 'Stay On Track', desc: 'Receive smart reminders and track progress' }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-bold text-[#EAEFF5] mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                    <svg className="w-8 h-8 text-[#3E6FA3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Ready to Never Miss a Dose Again?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Join over 50,000 patients who have transformed their medication adherence with MediTrack. Start your journey to better health today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <button className="px-10 py-4 bg-[#22C55E] text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <span>Create Free Account</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
            <Link to="/login">
              <button className="px-10 py-4 bg-white text-[#2F5B8C] font-semibold rounded-lg border-2 border-[#2F5B8C] hover:bg-[#EAEFF5] transition-all duration-300">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gradient-to-r from-[#1A3A52] to-[#1E4460] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Logo size="default" showText={false} />
                <span className="text-xl font-bold text-white">MediTrack</span>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Solving the medication adherence crisis through intelligent technology and human care.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-[#22C55E] rounded-full"></span>
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-blue-100 hover:text-[#22C55E] font-medium transition duration-200 text-sm">Home</Link></li>
                <li><Link to="/login" className="text-blue-100 hover:text-[#22C55E] font-medium transition duration-200 text-sm">Login</Link></li>
                <li><Link to="/signup" className="text-blue-100 hover:text-[#22C55E] font-medium transition duration-200 text-sm">Sign Up</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-[#22C55E] rounded-full"></span>
                Resources
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-blue-100 hover:text-[#22C55E] font-medium transition duration-200 text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-blue-100 hover:text-[#22C55E] font-medium transition duration-200 text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-blue-100 hover:text-[#22C55E] font-medium transition duration-200 text-sm">HIPAA Compliance</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-[#22C55E] rounded-full"></span>
                Connect
              </h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/15 hover:bg-[#22C55E] flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/15 hover:bg-[#22C55E] flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.823.907a15.99 15.99 0 006.097 6.097l.907-1.823a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57c-8.835 0-16-7.165-16-16V3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-200">
            <p>&copy; 2026 MediTrack. All rights reserved.</p>
            <p className="mt-4 md:mt-0 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#22C55E] rounded-full inline-block"></span>
              Committed to improving global health outcomes through better medication adherence.
            </p>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-[#22C55E] via-white to-[#22C55E] mt-8 opacity-60" />
      </footer>
    </div>
  )
}

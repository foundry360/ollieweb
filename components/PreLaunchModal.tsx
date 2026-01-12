'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface PreLaunchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PreLaunchModal({ isOpen, onClose }: PreLaunchModalProps) {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [userType, setUserType] = useState<'Neighbor' | 'Teenlancer' | 'Parent of Teenlancer' | ''>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    sessionStorage.setItem('prelaunch-modal-seen', 'true')
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast.error('Please enter your email address')
      return
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    if (!fullName.trim()) {
      toast.error('Please enter your full name')
      return
    }

    if (!userType) {
      toast.error('Please select how you plan to use Ollie')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/prelaunch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          full_name: fullName.trim(),
          user_type: userType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up')
      }

      toast.success('You\'ve been added to our pre-launch list! We\'ll notify you when we launch.')
      setEmail('')
      setFullName('')
      setUserType('')
      handleClose()
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
        <div className="bg-white rounded-t-2xl sm:rounded-lg shadow-2xl w-full sm:max-w-lg md:max-w-2xl max-h-[90vh] sm:max-h-[85vh] sm:overflow-hidden overflow-y-auto animate-fade-in" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)' }}>
          <div className="p-4 sm:p-6 md:p-8 relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Logo */}
            <div className="mb-4 sm:mb-6 flex justify-center">
              <Image
                src="/logo_dk.png"
                alt="Ollie Logo"
                width={120}
                height={40}
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>

            {/* Header */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-dark text-center mb-4 sm:mb-6">We&apos;re Launching Ollie Soon!</h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl font-semibold text-brand-dark mb-2 sm:mb-3">
              Help teens earn. Get local help. Build community.
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-text-gray-light mb-4 sm:mb-6">
              Ollie connects teens (14-19) with neighbors who need help with everyday tasks, all with complete parental oversight.
            </p>

            <p className="text-sm sm:text-base text-gray-600 font-medium mb-3 sm:mb-4">
              Join our pre-launch community and be among the first to experience the new neighborhood economy.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mb-4 sm:mb-6" noValidate>
              <input
                type="text"
                id="prelaunch-full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-brand-dark"
                placeholder="Enter your full name *"
                required
                aria-label="Full name"
                disabled={isSubmitting}
              />
              
              <input
                type="email"
                id="prelaunch-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-brand-dark"
                placeholder="Enter your email *"
                required
                aria-label="Email"
                disabled={isSubmitting}
              />

              <select
                id="prelaunch-user-type"
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'Neighbor' | 'Teenlancer' | 'Parent of Teenlancer' | '')}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent bg-white hover:bg-gray-50 ${
                  userType ? 'text-brand-dark' : 'text-gray-400'
                }`}
                style={{
                  backgroundColor: userType ? '#ffffff' : '#ffffff',
                }}
                required
                aria-label="I plan to use Ollie as a"
                disabled={isSubmitting}
              >
                <option value="" style={{ backgroundColor: '#ffffff', color: '#9CA3AF' }}>I plan to use Ollie as a... *</option>
                <option value="Neighbor" style={{ backgroundColor: '#ffffff', color: '#111827' }}>Neighbor</option>
                <option value="Teenlancer" style={{ backgroundColor: '#ffffff', color: '#111827' }}>Teenlancer</option>
                <option value="Parent of Teenlancer" style={{ backgroundColor: '#ffffff', color: '#111827' }}>Parent of Teenlancer</option>
              </select>

              {/* Benefits */}
              <div className="space-y-1.5 sm:space-y-2 py-3 sm:py-4">
                <div className="flex items-center text-xs sm:text-sm text-text-gray-light">
                  <span className="text-brand-green mr-2 sm:mr-3 font-bold">✓</span>
                  <span>All teens parent-verified</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-text-gray-light">
                  <span className="text-brand-green mr-2 sm:mr-3 font-bold">✓</span>
                  <span>Complete parental oversight</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-text-gray-light">
                  <span className="text-brand-green mr-2 sm:mr-3 font-bold">✓</span>
                  <span>Tasks within your neighborhood</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-text-gray-light">
                  <span className="text-brand-green mr-2 sm:mr-3 font-bold">✓</span>
                  <span>Safe messaging & payments</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-transparent border-2 border-brand-green text-brand-green py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold hover:bg-brand-green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  'Get Notified'
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-xs sm:text-sm text-text-gray-light">
              Launching February 2025 • Built by a local parent for local families
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


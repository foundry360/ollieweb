'use client'

import { useState } from 'react'
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
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full animate-slide-up" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)' }}>
          <div className="p-8 relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/logo_dk.png"
                alt="Ollie Logo"
                width={120}
                height={40}
                className="h-auto w-auto object-contain"
              />
            </div>

            {/* Header */}
            <h2 className="text-3xl font-bold text-brand-dark text-center mb-6">We&apos;re Launching Ollie Soon!</h2>

            {/* Subtitle */}
            <p className="text-xl font-semibold text-brand-dark mb-3">
              Help teens earn. Get local help. Build community.
            </p>

            {/* Description */}
            <p className="text-text-gray-light mb-6">
              Ollie connects teens (14-19) with neighbors who need help with everyday tasks, all with complete parental oversight.
            </p>

            <p className="text-brand-dark font-medium mb-4">
              Join the waitlist to get early access.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6" noValidate>
              <input
                type="text"
                id="prelaunch-full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-brand-dark"
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
                className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-brand-dark"
                placeholder="Enter your email *"
                required
                aria-label="Email"
                disabled={isSubmitting}
              />

              <select
                id="prelaunch-user-type"
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'Neighbor' | 'Teenlancer' | 'Parent of Teenlancer' | '')}
                className={`w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent bg-white hover:bg-gray-50 ${
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
              <div className="space-y-2 py-4">
                <div className="flex items-center text-text-gray-light">
                  <span className="text-brand-green mr-3 font-bold">✓</span>
                  <span>All teens parent-verified</span>
                </div>
                <div className="flex items-center text-text-gray-light">
                  <span className="text-brand-green mr-3 font-bold">✓</span>
                  <span>Complete parental oversight</span>
                </div>
                <div className="flex items-center text-text-gray-light">
                  <span className="text-brand-green mr-3 font-bold">✓</span>
                  <span>Tasks within your neighborhood</span>
                </div>
                <div className="flex items-center text-text-gray-light">
                  <span className="text-brand-green mr-3 font-bold">✓</span>
                  <span>Safe messaging & payments</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-transparent border-2 border-brand-green text-brand-green py-3 px-6 rounded-lg font-semibold hover:bg-brand-green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Notify Me'
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-text-gray-light text-sm">
              Launching February 2025 • Built by a local parent for local families
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


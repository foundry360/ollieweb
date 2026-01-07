'use client'

import { useState } from 'react'
import { X, Shield, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { PendingNeighborApplication } from '@/lib/types/database'

interface NeighborVerificationModalProps {
  application: PendingNeighborApplication
  onClose: () => void
  onVerified: () => void
}

interface VerificationResult {
  matches: number
  offenders: Array<{
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipcode: string
    offenses: string[]
  }>
  verified: boolean
}

export function NeighborVerificationModal({ application, onClose, onVerified }: NeighborVerificationModalProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleVerify = async () => {
    setIsVerifying(true)
    setError(null)
    setVerificationResult(null)

    try {
      const response = await fetch('/api/admin/neighbors/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: application.id }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed')
      }

      setVerificationResult(data.result)
      
      if (data.result.verified) {
        // Auto-close after a short delay if verified
        setTimeout(() => {
          onVerified()
          onClose()
        }, 2000)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to verify neighbor')
    } finally {
      setIsVerifying(false)
    }
  }

  // Parse full name into first and last name
  const nameParts = application.full_name.trim().split(/\s+/)
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Verify Neighbor</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Application details */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Application Details</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Name:</span>
                  <span className="ml-2 font-medium">{application.full_name}</span>
                </div>
                <div>
                  <span className="text-gray-500">Date of Birth:</span>
                  <span className="ml-2 font-medium">
                    {application.date_of_birth
                      ? new Date(application.date_of_birth).toLocaleDateString()
                      : 'Not provided'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Address:</span>
                  <span className="ml-2 font-medium">{application.address || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Phone:</span>
                  <span className="ml-2 font-medium">{application.phone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Verification Status:</span>
                  <span className={`ml-2 font-medium flex items-center ${
                    application.phone_verified ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {application.phone_verified ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified {application.phone_verified_at 
                          ? `on ${new Date(application.phone_verified_at).toLocaleDateString()}`
                          : ''}
                      </>
                    ) : (
                      'Not verified'
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification result */}
            {verificationResult && (
              <div className={`mb-6 p-4 rounded-lg ${
                verificationResult.verified
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center mb-3">
                  {verificationResult.verified ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  )}
                  <h4 className={`text-sm font-medium ${
                    verificationResult.verified ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {verificationResult.verified
                      ? 'No matches found - Verification passed'
                      : `${verificationResult.matches} potential match(es) found`}
                  </h4>
                </div>

                {verificationResult.offenders.length > 0 && (
                  <div className="mt-3 space-y-3">
                    {verificationResult.offenders.map((offender, index) => (
                      <div key={index} className="p-3 bg-white rounded border border-red-200">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {offender.firstName} {offender.lastName}
                          </div>
                          <div className="text-gray-600 mt-1">
                            {offender.address}, {offender.city}, {offender.state} {offender.zipcode}
                          </div>
                          {offender.offenses && offender.offenses.length > 0 && (
                            <div className="mt-2 text-xs text-gray-500">
                              <span className="font-medium">Offenses:</span> {offender.offenses.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-sm text-red-900">{error}</span>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Run Verification
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


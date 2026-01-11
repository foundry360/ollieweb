'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'unauthorized') {
      toast.error('Access denied. Admin privileges required.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Please enter both email and password')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Important: include cookies
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMessage = result.error || 'Login failed'
        if (response.status === 403) {
          toast.error('Access denied. Admin privileges required.')
        } else {
          toast.error(errorMessage)
        }
        setLoading(false)
        return
      }

      toast.success('Logged in successfully!')
      
      // Small delay to ensure cookie is stored
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Redirect to dashboard
      window.location.href = '/dashboard'
    } catch (error: any) {
      toast.error(error.message || 'Failed to login')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 p-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/10 relative z-10">
        <div>
          <div className="flex justify-center mb-6 opacity-90">
            <Image
              src="/logo_dk.png"
              alt="Ollie Logo"
              width={140}
              height={44}
              className="h-11 w-auto object-contain"
            />
          </div>
          <h2 className="text-center text-3xl font-semibold text-gray-800">
            Welcome to Ollie!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Sign in to your admin account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-200 bg-gray-50/50 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 sm:text-sm transition-all"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-200 bg-gray-50/50 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 sm:text-sm transition-all"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary/90 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to landing page
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="max-w-md w-full space-y-8 p-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/10 relative z-10">
          <div className="flex justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

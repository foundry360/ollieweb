'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  Briefcase, 
  DollarSign,
  Shield,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  ArrowUp,
  HelpCircle,
  Sprout,
  Heart,
  Calendar,
  ShoppingBag,
  Home,
  Wrench,
  Car,
  Baby,
  BookOpen,
  Music,
  Users
} from 'lucide-react'
import { useState, useEffect } from 'react'
import ContactModal from '@/components/ContactModal'
import PreLaunchModal from '@/components/PreLaunchModal'

export default function TeenlancersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isPreLaunchModalOpen, setIsPreLaunchModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="bg-brand-dark text-white border-b-0 sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/header-logo.png"
                alt="Ollie Logo"
                width={140}
                height={44}
                className="h-11 w-auto object-contain"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/teenlancers" className="text-brand-green font-semibold">
                For Teenlancers
              </Link>
              <Link href="/neighbors" className="text-white hover:text-brand-green transition-colors">
                For Neighbors
              </Link>
              <Link href="/community" className="text-white hover:text-brand-green transition-colors">
                Community
              </Link>
              <Link href="/login" className="text-white hover:text-brand-green transition-colors">
                Login
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsPreLaunchModalOpen(true)
                }}
                className="bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-brand-dark transition-colors"
              >
                Get Notified
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <Link 
                href="/teenlancers" 
                className="block text-brand-green font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Teenlancers
              </Link>
              <Link 
                href="/neighbors" 
                className="block text-white hover:text-brand-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Neighbors
              </Link>
              <Link 
                href="/community" 
                className="block text-white hover:text-brand-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                href="/login" 
                className="block text-white hover:text-brand-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                  setIsPreLaunchModalOpen(true)
                }}
                className="w-full bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-brand-dark transition-colors text-center"
              >
                Get Notified
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section for Teenlancers */}
      <section className="w-full bg-white border-b border-gray-200">
        <div className="w-full relative">
          <Image
            src="/teenlancer_banner.png"
            alt="For Teenlancers"
            width={1920}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
          {/* App Store and Google Play badges positioned above www.olliejobs.com */}
          <div className="absolute bottom-[15%] left-[calc(25%+6px)] transform -translate-x-1/2 flex flex-col sm:flex-row gap-3 justify-center items-center z-10">
            {/* App Store badge */}
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsPreLaunchModalOpen(true)
              }}
              className="hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
              aria-label="Download on the App Store"
            >
              <Image
                src="/apple.png"
                alt="Download on the App Store"
                width={150}
                height={50}
                className="h-auto w-auto object-contain max-w-[120px] sm:max-w-[150px]"
              />
            </button>
            {/* Google Play badge */}
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsPreLaunchModalOpen(true)
              }}
              className="hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
              aria-label="Get it on Google Play"
            >
              <Image
                src="/google.png"
                alt="Get it on Google Play"
                width={150}
                height={50}
                className="h-auto w-auto object-contain max-w-[120px] sm:max-w-[150px]"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-4">
            Here&apos;s Why Ollie Works
          </h2>
          <p className="text-center text-text-gray-light text-lg mb-12">
            No resume. No interview. No driving across town for minimum wage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-brand-green">
              <div className="bg-brand-green/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="text-brand-green" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-3">Earn Money</h3>
              <p className="text-text-gray-light">
                Browse and apply for local gigs that match your skills. Get paid securely through the platform for work you complete.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-brand-green">
              <div className="bg-brand-green/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="text-brand-green" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-3">Build Skills</h3>
              <p className="text-text-gray-light">
                Gain real-world experience in your neighborhood. Learn responsibility, communication, and work ethic while earning.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-brand-green">
              <div className="bg-brand-green/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-brand-green" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-3">Stay Safe</h3>
              <p className="text-text-gray-light">
                All neighbors are verified, all communication stays in-app, and your parents can approve gigs before you accept them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works for Teens */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-4">
            Getting Started Is Easy
          </h2>
          <p className="text-center text-text-gray-light text-lg mb-12">
            Four steps to start earning money in your neighborhood.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-lg font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-brand-dark mb-2">Create Your Profile</h3>
                  <p className="text-text-gray-light">
                    Sign up with parent approval and create a profile showing your skills and interests. Get verified and start browsing gigs.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-lg font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-brand-dark mb-2">Browse & Apply</h3>
                  <p className="text-text-gray-light">
                    Find gigs in your neighborhood that match your skills. Read descriptions, check pay rates, and apply to jobs that interest you.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-lg font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-brand-dark mb-2">Get Approved</h3>
                  <p className="text-text-gray-light">
                    Parents review and approve gig applications. Once approved, communicate with neighbors through the secure in-app messaging.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-lg font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-brand-dark mb-2">Complete & Get Paid</h3>
                  <p className="text-text-gray-light">
                    Finish the work, get it approved by the neighbor, and receive secure payment through the platform. Build your reputation!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border border-brand-green">
              <h3 className="text-2xl font-semibold text-brand-dark mb-4">What You Need to Know</h3>
              <ul className="space-y-3 text-text-gray-light">
                <li className="flex items-start">
                  <CheckCircle className="text-brand-green mr-3 flex-shrink-0 mt-1" size={20} />
                  <span>You must be 14-19 years old to use Ollie as a teenlancer</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-brand-green mr-3 flex-shrink-0 mt-1" size={20} />
                  <span>Parent or guardian approval is required to create an account</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-brand-green mr-3 flex-shrink-0 mt-1" size={20} />
                  <span>All gigs are age-appropriate and safety-focused</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-brand-green mr-3 flex-shrink-0 mt-1" size={20} />
                  <span>Parents can review and approve gigs before you accept</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-brand-green mr-3 flex-shrink-0 mt-1" size={20} />
                  <span>All payments are processed securely through the platform</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-brand-green mr-3 flex-shrink-0 mt-1" size={20} />
                  <span>Communication stays in-app - no need to share personal contact info</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Gigs Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-4">
            Ways to Earn
          </h2>
          <p className="text-center text-text-gray-light text-lg mb-12">
            Browse the most popular gig types and see what matches your skills and interests.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Sprout className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Yard Work</h3>
              <p className="text-text-gray-light text-sm">Lawn mowing, leaf raking, weeding</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Heart className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Pet Care</h3>
              <p className="text-text-gray-light text-sm">Pet sitting, dog walking</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Calendar className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Seasonal Help</h3>
              <p className="text-text-gray-light text-sm">Holiday setup, event prep, spring cleaning</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <ShoppingBag className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Errands</h3>
              <p className="text-text-gray-light text-sm">Grocery pickup, mail collection</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Home className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Household Tasks</h3>
              <p className="text-text-gray-light text-sm">Cleaning, organizing, moving help</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Wrench className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Basic Repairs</h3>
              <p className="text-text-gray-light text-sm">Furniture assembly, simple fixes</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Car className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Car Washing</h3>
              <p className="text-text-gray-light text-sm">Interior and exterior cleaning</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Baby className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Babysitting</h3>
              <p className="text-text-gray-light text-sm">Childcare, after-school care</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <BookOpen className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Tutoring</h3>
              <p className="text-text-gray-light text-sm">Homework help, subject tutoring</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Music className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Event Help</h3>
              <p className="text-text-gray-light text-sm">Party setup, event assistance</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Calendar className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Delivery</h3>
              <p className="text-text-gray-light text-sm">Local deliveries, package pickup</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Users className="text-brand-green" size={32} />
              </div>
              <h3 className="font-semibold text-brand-dark mb-2">Other</h3>
              <p className="text-text-gray-light text-sm">Custom tasks, special requests</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-brand-green to-brand-green/90 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl mb-12 text-white/90">
            Join the pre-launch list to be notified when Ollie launches in your area.
          </p>
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsPreLaunchModalOpen(true)
            }}
            className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-brand-green transition-all transform hover:scale-105 text-lg font-semibold"
          >
            Get Notified
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/header-logo.png"
                  alt="Ollie Logo"
                  width={140}
                  height={44}
                  className="h-11 w-auto object-contain"
                />
              </Link>
              <p className="text-text-gray-dark mb-4">
                Built for Teens. Trusted by Parents. Powered by Community.
              </p>
              <p className="text-text-gray-dark text-sm">
                A platform where teenlancers can find local gigs and neighbors can post tasks.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-text-gray-dark hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-text-gray-dark hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/community-guidelines" className="text-text-gray-dark hover:text-white transition-colors">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-text-gray-dark hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text-gray-dark hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-brand-gray pt-8 text-center text-text-gray-dark text-sm">
            <p>&copy; {new Date().getFullYear()} Ollie. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 bg-brand-green text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <ArrowUp size={20} className="sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Have a Question Button */}
      <button
        onClick={() => setIsContactModalOpen(true)}
        className="fixed bottom-4 sm:bottom-8 left-4 sm:left-8 bg-brand-green text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105 z-50 flex items-center gap-2 font-semibold text-sm sm:text-base"
        aria-label="Have a question?"
      >
        <HelpCircle size={18} className="sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Have a Question?</span>
      </button>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Pre-Launch Modal */}
      <PreLaunchModal
        isOpen={isPreLaunchModalOpen}
        onClose={() => setIsPreLaunchModalOpen(false)}
      />
    </div>
  )
}


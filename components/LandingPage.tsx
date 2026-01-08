'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  Briefcase, 
  Users, 
  Shield, 
  Heart,
  CheckCircle,
  Star,
  Menu,
  X,
  ArrowRight,
  FileText,
  CheckCircle2,
  DollarSign,
  Search,
  MessageCircle,
  Calendar,
  ChevronDown
} from 'lucide-react'
import { useState } from 'react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="bg-brand-dark text-white">
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
              <Link href="#features" className="text-white hover:text-brand-green transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-white hover:text-brand-green transition-colors">
                How It Works
              </Link>
              <Link href="#for-teens" className="text-white hover:text-brand-green transition-colors">
                For Teenlancers
              </Link>
              <Link href="#for-neighbors" className="text-white hover:text-brand-green transition-colors">
                For Neighbors
              </Link>
              <Link href="/login" className="text-white hover:text-brand-green transition-colors">
                Login
              </Link>
              <Link 
                href="#get-started"
                className="bg-brand-green text-white px-5 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Get Started
              </Link>
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
                href="#features" 
                className="block text-white hover:text-brand-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="block text-white hover:text-brand-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#for-teens" 
                className="block text-white hover:text-brand-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Teenlancers
              </Link>
              <Link 
                href="#for-neighbors" 
                className="block text-white hover:text-brand-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Neighbors
              </Link>
              <Link 
                href="/login" 
                className="block text-white hover:text-brand-green transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="#get-started"
                className="block bg-brand-green text-white px-5 py-3 rounded-lg hover:bg-opacity-90 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white relative">
        <div className="w-full relative">
          <Image
            src="/hero_banner.png"
            alt="Ollie - Built for Teens. Trusted by Parents. Powered by Community."
            width={1920}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
          {/* App Store and Google Play badges positioned above www.olliejobs.com */}
          <div className="absolute bottom-[calc(18%+10px)] left-[calc(25%+6px)] transform -translate-x-1/2 flex flex-col sm:flex-row gap-3 justify-center items-center z-10">
            {/* App Store badge */}
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              aria-label="Download on the App Store"
            >
              <Image
                src="/apple.png"
                alt="Download on the App Store"
                width={150}
                height={50}
                className="h-auto w-auto object-contain max-w-[150px]"
              />
            </a>
            {/* Google Play badge */}
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              aria-label="Get it on Google Play"
            >
              <Image
                src="/google.png"
                alt="Get it on Google Play"
                width={150}
                height={50}
                className="h-auto w-auto object-contain max-w-[150px]"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-4">
            Why Choose Ollie?
          </h2>
          <p className="text-center text-text-gray-light mb-12 text-lg">
            From posting a gig to finding trusted help, we&apos;ve made connecting with your neighbors safe and simple
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* For Teens Feature */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-border-gray hover:shadow-lg transition-shadow">
              <div className="bg-brand-green/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="text-brand-green" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-3">For Teenlancers</h3>
              <p className="text-text-gray-light">
                Browse gigs, earn money, and build valuable skills in your community. Perfect for teenlancers looking for flexible work opportunities.
              </p>
            </div>

            {/* For Neighbors Feature */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-border-gray hover:shadow-lg transition-shadow">
              <div className="bg-brand-green/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-brand-green" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-3">For Neighbors</h3>
              <p className="text-text-gray-light">
                Post tasks, find reliable help, and support teenlancers in your community. Get things done while making a difference.
              </p>
            </div>

            {/* Safe & Verified Feature */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-border-gray hover:shadow-lg transition-shadow">
              <div className="bg-brand-green/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-brand-green" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-3">Safe & Verified</h3>
              <p className="text-text-gray-light">
                Parent approval, verified users, and secure payments. Your safety and peace of mind are our top priorities.
              </p>
            </div>

            {/* Community Powered Feature */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-border-gray hover:shadow-lg transition-shadow">
              <div className="bg-brand-green/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-brand-green" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-3">Community Powered</h3>
              <p className="text-text-gray-light">
                Local connections and a trusted network. Build relationships while accomplishing tasks in your neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-4 animate-fade-in-up">
            How It Works
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-center text-brand-dark mb-4">
            Four Easy Steps to Get Started
          </h3>
          <p className="text-center text-text-gray-light mb-16 text-lg">
            From posting a gig to finding trusted help, we&apos;ve made connecting with your neighbors safe and simple
          </p>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="relative flex justify-center">
              <Image
                src="/gigdetails.png"
                alt="Gig Details"
                width={550}
                height={700}
                className="rounded-lg object-contain w-full h-auto max-w-md"
              />
            </div>

            {/* Right Column - Vertical Step Tracker */}
            <div id="for-teens" className="relative">
              <div className="space-y-8">
                {/* Step 1: Post a Gig */}
                <div id="for-neighbors" className="relative flex items-start py-3 animate-fade-in-up animate-delay-100">
                  <div className="flex-shrink-0 w-12 relative">
                    <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10 relative">
                      <span className="text-lg font-bold">1</span>
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-2xl font-normal text-brand-dark mb-2">Post a Gig</h3>
                    <p className="text-text-gray-light">Share what you need help with - from lawn care to pet sitting - and let local teens know you&apos;re looking for assistance.</p>
                  </div>
                </div>

                {/* Step 2: Browse and Apply */}
                <div className="relative flex items-start py-3 animate-fade-in-up animate-delay-200">
                  <div className="flex-shrink-0 w-12 relative">
                    <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10 relative">
                      <span className="text-lg font-bold">2</span>
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-2xl font-normal text-brand-dark mb-2">Browse and Apply</h3>
                    <p className="text-text-gray-light">Teens in your neighborhood discover gigs that match their skills and submit applications to help out.</p>
                  </div>
                </div>

                {/* Step 3: Choose Your Helper */}
                <div className="relative flex items-start py-3 animate-fade-in-up animate-delay-300">
                  <div className="flex-shrink-0 w-12 relative">
                    <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10 relative">
                      <span className="text-lg font-bold">3</span>
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-2xl font-normal text-brand-dark mb-2">Choose Your Helper</h3>
                    <p className="text-text-gray-light">Review profiles and applications from verified local teens, then select the neighbor who&apos;s the perfect fit for your gig.</p>
                  </div>
                </div>

                {/* Step 4: Get It Done */}
                <div className="relative flex items-start py-3 animate-fade-in-up animate-delay-400">
                  <div className="flex-shrink-0 w-12 relative">
                    <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10 relative">
                      <span className="text-lg font-bold">4</span>
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-2xl font-normal text-brand-dark mb-2">Get It Done</h3>
                    <p className="text-text-gray-light">Your chosen teen completes the work, and payment is processed securely through Ollie - building trust with every completed gig.</p>
                  </div>
                </div>
              </div>
              {/* Continuous vertical dashed line behind circles - stops at step 4 circle center */}
              <div className="absolute left-6 top-6 w-0 border-l-2 border-dashed border-brand-green/30" style={{ bottom: '5.25rem' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-brand-dark">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 - Teen */}
            <div className="bg-gray-50 p-6 rounded-lg border border-border-gray">
              <div className="flex items-center mb-4">
                <div className="flex text-accent-amber">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-text-gray-light mb-4">
                &quot;I&apos;ve earned over $500 in just a few months doing local gigs. The best part is working in my neighborhood and building connections!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-bold mr-3">
                  A
                </div>
                <div>
                  <p className="font-semibold text-brand-dark">Alex, 16</p>
                  <div className="flex items-center text-accent-orange text-sm">
                    <CheckCircle size={14} className="mr-1" />
                    <span>Verified Teenlancer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Neighbor */}
            <div className="bg-gray-50 p-6 rounded-lg border border-border-gray">
              <div className="flex items-center mb-4">
                <div className="flex text-accent-amber">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-text-gray-light mb-4">
                &quot;Finding reliable help for yard work and errands has never been easier. The teens are responsible and the parent verification gives me peace of mind.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-bold mr-3">
                  S
                </div>
                <div>
                  <p className="font-semibold text-brand-dark">Sarah M.</p>
                  <div className="flex items-center text-accent-orange text-sm">
                    <CheckCircle size={14} className="mr-1" />
                    <span>Verified Neighbor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - Parent */}
            <div className="bg-gray-50 p-6 rounded-lg border border-border-gray">
              <div className="flex items-center mb-4">
                <div className="flex text-accent-amber">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-text-gray-light mb-4">
                &quot;As a parent, I love that I can approve gigs and track my teen&apos;s work. It&apos;s safe, local, and teaches valuable life skills.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-bold mr-3">
                  M
                </div>
                <div>
                  <p className="font-semibold text-brand-dark">Mike T.</p>
                  <div className="flex items-center text-accent-orange text-sm">
                    <CheckCircle size={14} className="mr-1" />
                    <span>Verified Parent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety First Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-4">
            Safety First, Always
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-center text-brand-dark mb-4">
            Building trust through verification, transparency, and parental oversight
          </h3>
          <p className="text-center text-text-gray-light mb-12 max-w-5xl mx-auto text-lg">
            At Ollie, we know that safety isn&apos;t just a feature - it&apos;s the foundation of everything we do. We&apos;ve designed our platform with multiple layers of protection so parents, teens, and neighbors can all feel confident connecting with their community.
          </p>
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-brand-green/30 hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-16">
              {/* Item 1 - Left */}
              <div className="relative flex items-center justify-between">
                <div className="w-full md:w-[48%] md:pr-4">
                  <div className="bg-white p-6 rounded-lg border border-border-gray">
                    <div className="flex items-center mb-4 md:hidden">
                      <Shield className="text-brand-green mr-3" size={32} />
                      <h3 className="text-xl font-semibold text-brand-dark">Verified Profiles</h3>
                    </div>
                    <p className="text-text-gray-light">
                      Every user on Ollie goes through our verification process. Teens need parent or guardian approval to join, and neighbors verify their identity before posting gigs. Our verification badges help you instantly recognize trusted community members.
                    </p>
                  </div>
                </div>
                {/* Center connector dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-green rounded-full border-4 border-white z-10"></div>
                {/* Icon and heading on right side */}
                <div className="hidden md:block absolute left-1/2 transform translate-x-4 w-[48%]">
                  <div className="flex items-center">
                    <Shield className="text-brand-green mr-3" size={32} />
                    <h3 className="text-xl font-semibold text-brand-dark">Verified Profiles</h3>
                  </div>
                </div>
                <div className="hidden md:block w-[48%]"></div>
              </div>

              {/* Item 2 - Right */}
              <div className="relative flex items-center justify-between">
                {/* Icon and heading on left side */}
                <div className="hidden md:block w-[48%] pr-4">
                  <div className="flex items-center justify-end">
                    <h3 className="text-xl font-semibold text-brand-dark">Parental Oversight & Control</h3>
                    <Users className="text-brand-green ml-3" size={32} />
                  </div>
                </div>
                {/* Center connector dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-green rounded-full border-4 border-white z-10"></div>
                <div className="w-full md:w-[48%] md:pl-4">
                  <div className="bg-white p-6 rounded-lg border border-border-gray">
                    <div className="flex items-center mb-4 md:hidden">
                      <Users className="text-brand-green mr-3" size={32} />
                      <h3 className="text-xl font-semibold text-brand-dark">Parental Oversight & Control</h3>
                    </div>
                    <p className="text-text-gray-light">
                      Parents aren&apos;t locked out - they&apos;re built in. View all gig activity, set approval requirements for new gigs, monitor communications, and manage payment settings. You decide how much independence your teen has while they learn responsibility and earn money.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3 - Left */}
              <div className="relative flex items-center justify-between">
                <div className="w-full md:w-[48%] md:pr-4">
                  <div className="bg-white p-6 rounded-lg border border-border-gray">
                    <div className="flex items-center mb-4 md:hidden">
                      <MessageCircle className="text-brand-green mr-3" size={32} />
                      <h3 className="text-xl font-semibold text-brand-dark">Secure In-App Communication</h3>
                    </div>
                    <p className="text-text-gray-light">
                      All messages stay within the Ollie platform where parents can review them. No need to share personal phone numbers or contact information. Communication is transparent, monitored, and designed to keep everyone accountable.
                    </p>
                  </div>
                </div>
                {/* Center connector dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-green rounded-full border-4 border-white z-10"></div>
                {/* Icon and heading on right side */}
                <div className="hidden md:block absolute left-1/2 transform translate-x-4 w-[48%]">
                  <div className="flex items-center">
                    <MessageCircle className="text-brand-green mr-3" size={32} />
                    <h3 className="text-xl font-semibold text-brand-dark">Secure In-App Communication</h3>
                  </div>
                </div>
                <div className="hidden md:block w-[48%]"></div>
              </div>

              {/* Item 4 - Right */}
              <div className="relative flex items-center justify-between">
                {/* Icon and heading on left side */}
                <div className="hidden md:block w-[48%] pr-4">
                  <div className="flex items-center justify-end">
                    <h3 className="text-xl font-semibold text-brand-dark">Safe Payment Processing</h3>
                    <DollarSign className="text-brand-green ml-3" size={32} />
                  </div>
                </div>
                {/* Center connector dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-green rounded-full border-4 border-white z-10"></div>
                <div className="w-full md:w-[48%] md:pl-4">
                  <div className="bg-white p-6 rounded-lg border border-border-gray">
                    <div className="flex items-center mb-4 md:hidden">
                      <DollarSign className="text-brand-green mr-3" size={32} />
                      <h3 className="text-xl font-semibold text-brand-dark">Safe Payment Processing</h3>
                    </div>
                    <p className="text-text-gray-light">
                      Money never changes hands in person. All payments are processed securely through Ollie&apos;s platform. Once a teen completes the gig, neighbors review and approve the work in the app, then payment is processed and transferred to the teen&apos;s account - creating transparency and protection for everyone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 5 - Left */}
              <div className="relative flex items-center justify-between">
                <div className="w-full md:w-[48%] md:pr-4">
                  <div className="bg-white p-6 rounded-lg border border-border-gray">
                    <div className="flex items-center mb-4 md:hidden">
                      <FileText className="text-brand-green mr-3" size={32} />
                      <h3 className="text-xl font-semibold text-brand-dark">Community Guidelines & Support</h3>
                    </div>
                    <p className="text-text-gray-light">
                      Clear expectations help everyone succeed. Our community guidelines outline appropriate behavior, safety best practices, and what to do if something doesn&apos;t feel right. Our support team is always available to help resolve concerns quickly.
                    </p>
                  </div>
                </div>
                {/* Center connector dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-green rounded-full border-4 border-white z-10"></div>
                {/* Icon and heading on right side */}
                <div className="hidden md:block absolute left-1/2 transform translate-x-4 w-[48%]">
                  <div className="flex items-center">
                    <FileText className="text-brand-green mr-3" size={32} />
                    <h3 className="text-xl font-semibold text-brand-dark">Community Guidelines & Support</h3>
                  </div>
                </div>
                <div className="hidden md:block w-[48%]"></div>
              </div>

              {/* Item 6 - Right */}
              <div className="relative flex items-center justify-between">
                {/* Icon and heading on left side */}
                <div className="hidden md:block w-[48%] pr-4">
                  <div className="flex items-center justify-end">
                    <h3 className="text-xl font-semibold text-brand-dark">Age-Appropriate Work Only</h3>
                    <CheckCircle2 className="text-brand-green ml-3" size={32} />
                  </div>
                </div>
                {/* Center connector dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-green rounded-full border-4 border-white z-10"></div>
                <div className="w-full md:w-[48%] md:pl-4">
                  <div className="bg-white p-6 rounded-lg border border-border-gray">
                    <div className="flex items-center mb-4 md:hidden">
                      <CheckCircle2 className="text-brand-green mr-3" size={32} />
                      <h3 className="text-xl font-semibold text-brand-dark">Age-Appropriate Work Only</h3>
                    </div>
                    <p className="text-text-gray-light">
                      We carefully curate the types of gigs available on Ollie to ensure they&apos;re suitable for teens. No dangerous equipment, no late-night hours, and no situations that put young people at risk. Just honest work that builds skills and character.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Heading and Subheading */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Got Questions? We&apos;ve Got Answers
              </h2>
              <p className="text-text-gray-light text-base">
                From getting started to staying safe, find answers to the most common questions about using Ollie
              </p>
            </div>
            
            {/* Right Column - Accordion */}
            <div className="space-y-4">
            {/* FAQ 1 */}
            <div 
              className="border-b border-border-gray overflow-hidden bg-white cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
              onMouseLeave={() => setOpenFAQ(null)}
            >
              <button
                type="button"
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors group ${openFAQ === 1 ? 'bg-gray-50 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-200'}`}
              >
                <span className={`text-lg font-semibold transition-colors text-brand-dark`}>What is Ollie?</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all ${openFAQ === 1 ? 'text-brand-green transform rotate-180' : 'text-brand-green'}`}
                />
              </button>
              {openFAQ === 1 && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-text-gray-light">
                    Ollie is a neighborhood platform that connects local teens with neighbors who need help with everyday tasks like lawn care, pet sitting, snow shoveling, and more. We&apos;re building stronger communities by creating safe opportunities for teens to earn money while helping their neighbors.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div 
              className="border-b border-border-gray overflow-hidden bg-white cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
              onMouseLeave={() => setOpenFAQ(null)}
            >
              <button
                type="button"
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors group ${openFAQ === 2 ? 'bg-gray-50 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-200'}`}
              >
                <span className={`text-lg font-semibold transition-colors text-brand-dark`}>How do I sign up as a teenlancer?</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all ${openFAQ === 2 ? 'text-brand-green transform rotate-180' : 'text-brand-green'}`}
                />
              </button>
              {openFAQ === 2 && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-text-gray-light">
                    Download the Ollie app and create your profile with parent or guardian approval. You&apos;ll add information about the types of gigs you&apos;re interested in, your availability, and complete our verification process. Once approved, you can start browsing and applying for gigs in your neighborhood.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div 
              className="border-b border-border-gray overflow-hidden bg-white cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
              onMouseLeave={() => setOpenFAQ(null)}
            >
              <button
                type="button"
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors group ${openFAQ === 3 ? 'bg-gray-50 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-200'}`}
              >
                <span className={`text-lg font-semibold transition-colors text-brand-dark`}>How do I post a gig as a neighbor?</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all ${openFAQ === 3 ? 'text-brand-green transform rotate-180' : 'text-brand-green'}`}
                />
              </button>
              {openFAQ === 3 && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-text-gray-light">
                    Simply download the app, create your account, and post what you need help with. Include details like the type of work, when you need it done, and what you&apos;re willing to pay. Local teens will apply, and you can review their profiles to choose the best match for your needs.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div 
              className="border-b border-border-gray overflow-hidden bg-white cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
              onMouseLeave={() => setOpenFAQ(null)}
            >
              <button
                type="button"
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors group ${openFAQ === 4 ? 'bg-gray-50 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-200'}`}
              >
                <span className={`text-lg font-semibold transition-colors text-brand-dark`}>Is Ollie safe for teens?</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all ${openFAQ === 4 ? 'text-brand-green transform rotate-180' : 'text-brand-green'}`}
                />
              </button>
              {openFAQ === 4 && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-text-gray-light">
                    Safety is our top priority. All teens require parent/guardian approval to join. Neighbors undergo verification before posting gigs. Parents have full visibility into their teen&apos;s activities, can approve gigs before acceptance, and all communication happens through our secure platform. We also provide safety guidelines and best practices for both teens and neighbors.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div 
              className="border-b border-border-gray overflow-hidden bg-white cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === 5 ? null : 5)}
              onMouseLeave={() => setOpenFAQ(null)}
            >
              <button
                type="button"
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors group ${openFAQ === 5 ? 'bg-gray-50 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-200'}`}
              >
                <span className={`text-lg font-semibold transition-colors text-brand-dark`}>How does payment work?</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all ${openFAQ === 5 ? 'text-brand-green transform rotate-180' : 'text-brand-green'}`}
                />
              </button>
              {openFAQ === 5 && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-text-gray-light">
                    Payment is processed securely through the Ollie platform. When you post a gig, you agree on the price upfront. Once the work is completed to your satisfaction, you approve the payment and funds are released to the teen&apos;s account. Parents can help teens manage withdrawals to their linked bank account.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 6 */}
            <div 
              className="border-b border-border-gray overflow-hidden bg-white cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === 6 ? null : 6)}
              onMouseLeave={() => setOpenFAQ(null)}
            >
              <button
                type="button"
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors group ${openFAQ === 6 ? 'bg-gray-50 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-200'}`}
              >
                <span className={`text-lg font-semibold transition-colors text-brand-dark`}>What types of gigs can I post?</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all ${openFAQ === 6 ? 'text-brand-green transform rotate-180' : 'text-brand-green'}`}
                />
              </button>
              {openFAQ === 6 && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-text-gray-light">
                    Common gigs include lawn mowing, leaf raking, snow shoveling, pet sitting, dog walking, car washing, grocery pickup, trash bin assistance, and other neighborhood tasks. We focus on age-appropriate work that teens can safely complete with proper guidance.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 7 */}
            <div 
              className="border-b border-border-gray overflow-hidden bg-white cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === 7 ? null : 7)}
              onMouseLeave={() => setOpenFAQ(null)}
            >
              <button
                type="button"
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors group ${openFAQ === 7 ? 'bg-gray-50 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-200'}`}
              >
                <span className={`text-lg font-semibold transition-colors text-brand-dark`}>Do parents need to approve gigs?</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all ${openFAQ === 7 ? 'text-brand-green transform rotate-180' : 'text-brand-green'}`}
                />
              </button>
              {openFAQ === 7 && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-text-gray-light">
                    Yes! Parents have oversight of their teen&apos;s Ollie activity. Depending on your family&apos;s settings, parents can require approval before teens accept gigs, and they always have visibility into active and completed work. This ensures everyone feels comfortable and safe.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 8 */}
            <div 
              className="border-b border-border-gray overflow-hidden bg-white cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === 8 ? null : 8)}
              onMouseLeave={() => setOpenFAQ(null)}
            >
              <button
                type="button"
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors group ${openFAQ === 8 ? 'bg-gray-50 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-200'}`}
              >
                <span className={`text-lg font-semibold transition-colors text-brand-dark`}>How do I verify my account?</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all ${openFAQ === 8 ? 'text-brand-green transform rotate-180' : 'text-brand-green'}`}
                />
              </button>
              {openFAQ === 8 && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-text-gray-light">
                    Verification helps build trust in our community. Teens verify through parent/guardian approval and profile information. Neighbors verify through phone number confirmation and identity verification. Verified accounts display a badge so everyone knows they&apos;re connecting with trusted community members.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 9 */}
            <div 
              className="border-b border-border-gray overflow-hidden bg-white cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === 9 ? null : 9)}
              onMouseLeave={() => setOpenFAQ(null)}
            >
              <button
                type="button"
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors group ${openFAQ === 9 ? 'bg-gray-50 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-200'}`}
              >
                <span className={`text-lg font-semibold transition-colors text-brand-dark`}>What if I have a problem with a gig?</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all ${openFAQ === 9 ? 'text-brand-green transform rotate-180' : 'text-brand-green'}`}
                />
              </button>
              {openFAQ === 9 && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-text-gray-light">
                    Our support team is here to help. You can report issues directly through the app, and we&apos;ll work with both parties to resolve any concerns. We encourage open communication and provide dispute resolution support to ensure fair outcomes for everyone involved.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 10 */}
            <div 
              className="border-b border-border-gray overflow-hidden bg-white cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === 10 ? null : 10)}
              onMouseLeave={() => setOpenFAQ(null)}
            >
              <button
                type="button"
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors group ${openFAQ === 10 ? 'bg-gray-50 hover:bg-gray-200' : 'bg-gray-50 hover:bg-gray-200'}`}
              >
                <span className={`text-lg font-semibold transition-colors text-brand-dark`}>Is Ollie available in my area?</span>
                <ChevronDown
                  className={`w-5 h-5 transition-all ${openFAQ === 10 ? 'text-brand-green transform rotate-180' : 'text-brand-green'}`}
                />
              </button>
              {openFAQ === 10 && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-text-gray-light">
                    We&apos;re expanding to new neighborhoods regularly! Enter your zip code in the app to see if Ollie is active in your community. If we&apos;re not there yet, join our waitlist and we&apos;ll notify you as soon as we launch in your area.
                  </p>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download/CTA Section */}
      <section id="get-started" className="py-20 px-6 bg-gradient-to-b from-brand-green to-brand-green/90 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-20">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 text-white/90">
            Join thousands of teenlancers and neighbors building a stronger community together.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-brand-green px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 text-lg font-semibold"
          >
            Sign Up Now
          </Link>
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
    </div>
  )
}


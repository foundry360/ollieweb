'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Users, Shield, Briefcase } from 'lucide-react'
import PreLaunchModal from '@/components/PreLaunchModal'

export default function CommunityPage() {
  const [isPreLaunchModalOpen, setIsPreLaunchModalOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header/Navigation */}
        <header className="bg-brand-dark text-white sticky top-0 z-50">
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
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/teenlancers" className="text-white hover:text-brand-green transition-colors">
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
                  onClick={() => setIsPreLaunchModalOpen(true)}
                  className="bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-brand-dark transition-colors"
                >
                  Get Notified
                </button>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative w-full border-b border-gray-300">
          <Image
            src="/community_banner.png"
            alt="Community"
            width={1920}
            height={800}
            className="w-full h-auto"
            priority
          />
        </section>

        {/* The Problem We Saw Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                  The Problem We Saw
                </h2>
                <p className="text-lg text-text-gray-light mb-4">
                  Every neighborhood has the same challenge: Neighbors need help with everyday tasks, and teens need opportunities to earn and learn.
                </p>
                <p className="text-lg text-text-gray-light">
                  But there&apos;s a disconnect. Finding reliable help is hard. Giving teens safe, supervised work opportunities is even harder. Cash exchanges are awkward. Trust takes time to build. And there&apos;s no easy way to connect the people who live right next door.
                </p>
              </div>
              
              {/* Problem image */}
              <div className="rounded-lg overflow-hidden flex items-center">
                <Image
                  src="/the-problem.png"
                  alt="Neighborhood scene showing disconnect"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
              {/* Solution image */}
              <div className="rounded-lg overflow-hidden flex items-center">
                <Image
                  src="/girl_neighbor.png"
                  alt="Teen and neighbor working together"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                  Our Solution
                </h2>
                <p className="text-lg text-text-gray-light mb-6">
                  Ollie bridges that gap. We created a platform where:
                </p>
                <ul className="space-y-4 text-lg text-text-gray-light">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1 flex-shrink-0">1</div>
                    <span>Neighbors find trustworthy local teens for lawn care, pet sitting, and other tasks</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1 flex-shrink-0">2</div>
                    <span>Teens earn money, build work experience, and develop responsibility—all close to home</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1 flex-shrink-0">3</div>
                    <span>Parents maintain full oversight with built-in safety features and controls</span>
                  </li>
                </ul>
                <p className="text-lg text-text-gray-light mt-6">
                  It&apos;s the neighborhood connection that should have always existed, now made safe, simple, and reliable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Believe Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-dark mb-12">
              What We Believe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Belief 1 */}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Heart className="text-brand-green mr-4" size={32} />
                  <h3 className="text-xl font-semibold text-brand-dark">Teens deserve real opportunities</h3>
                </div>
                <p className="text-text-gray-light">
                  Not just screen time and allowances, but chances to earn their own money, learn the value of work, and build confidence through real-world responsibility.
                </p>
              </div>

              {/* Belief 2 */}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Users className="text-brand-green mr-4" size={32} />
                  <h3 className="text-xl font-semibold text-brand-dark">Communities are stronger when connected</h3>
                </div>
                <p className="text-text-gray-light">
                  The best help often lives right next door. When neighbors support local teens, everyone wins.
                </p>
              </div>

              {/* Belief 3 */}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Shield className="text-brand-green mr-4" size={32} />
                  <h3 className="text-xl font-semibold text-brand-dark">Safety enables opportunity</h3>
                </div>
                <p className="text-text-gray-light">
                  With the right safeguards—parental controls, background checks, secure payments—we can create opportunities that feel safe for everyone involved.
                </p>
              </div>

              {/* Belief 4 */}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Briefcase className="text-brand-green mr-4" size={32} />
                  <h3 className="text-xl font-semibold text-brand-dark">Work shapes character</h3>
                </div>
                <p className="text-text-gray-light">
                  A teen&apos;s first job isn&apos;t just about the money. It&apos;s about showing up, doing quality work, building reputation, and learning what it means to be dependable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitment Section */}
        <section className="py-20 px-6 bg-brand-dark text-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Commitment
            </h2>
            <p className="text-xl text-center mb-12 text-white/90 max-w-3xl mx-auto">
              We&apos;re building Ollie with three core commitments:
            </p>
            <div className="space-y-8">
              {/* Commitment 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Safety First, Always</h3>
                    <p className="text-lg text-white/90">
                      Every feature we build prioritizes the safety of teens and neighbors. Background checks, parental oversight, GPS tracking, and secure payments aren&apos;t add-ons—they&apos;re foundational.
                    </p>
                  </div>
                </div>
              </div>

              {/* Commitment 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Fair & Transparent</h3>
                    <p className="text-lg text-white/90">
                      Teens keep the majority of what they earn. Neighbors know exactly what they&apos;re paying. No hidden fees, no surprises, no fine print.
                    </p>
                  </div>
                </div>
              </div>

              {/* Commitment 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Community-Centered</h3>
                    <p className="text-lg text-white/90">
                      We&apos;re not a faceless gig platform. Ollie is about real people in real neighborhoods building real relationships. We&apos;re here to strengthen your community, not replace it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-[90rem]">
            <Image
              src="/who-we-are.png"
              alt="Who We Are"
              width={1600}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Join Us CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-brand-green to-brand-green/90 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-4xl mx-auto">
              Ollie is launching soon in communities like yours. Whether you&apos;re a neighbor who needs help, a teen ready to earn, or a parent looking for safe opportunities for your child, we&apos;d love to have you join our pre-launch community.
            </p>
            <button
              onClick={() => setIsPreLaunchModalOpen(true)}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-brand-green transition-colors"
            >
              Get Notified
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-brand-dark text-white py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <Link href="/" className="inline-block mb-4">
                  <Image
                    src="/header-logo.png"
                    alt="Ollie Logo"
                    width={140}
                    height={44}
                    className="h-11 w-auto object-contain"
                  />
                </Link>
                <p className="text-white/70 text-sm">
                  Connecting teens with neighbors for safe, supervised work opportunities.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">For You</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><Link href="/teenlancers" className="hover:text-white transition-colors">For Teenlancers</Link></li>
                  <li><Link href="/neighbors" className="hover:text-white transition-colors">For Neighbors</Link></li>
                  <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/community-guidelines" className="hover:text-white transition-colors">Community Guidelines</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-sm text-white/70">
                  support@olliejobs.com
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 pt-8 text-center text-white/70 text-sm">
              <p>&copy; {new Date().getFullYear()} Ollie. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* PreLaunch Modal */}
      <PreLaunchModal
        isOpen={isPreLaunchModalOpen}
        onClose={() => setIsPreLaunchModalOpen(false)}
      />
    </>
  )
}


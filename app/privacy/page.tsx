import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Privacy Policy | Ollie',
  description: 'Ollie Privacy Policy - How we protect your data and privacy',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-brand-dark text-white">
        <nav className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/header-logo.png"
              alt="Ollie Logo"
              width={140}
              height={44}
              className="h-11 w-auto object-contain"
            />
          </Link>
        </nav>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          Privacy Policy
        </h1>
        <p className="text-text-gray-light mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-text-gray-light">
          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">1. Introduction</h2>
            <p>
              Welcome to Ollie (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the safety of our users, especially teenlancers. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p>
              By using Ollie, you agree to the collection and use of information in accordance with this policy. If you are a parent or guardian of a teenlancer, you are responsible for ensuring your teen understands and agrees to this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-brand-dark mb-3">2.1 Personal Information</h3>
            <p>We collect information that you provide to us directly, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number</li>
              <li>Date of birth (for age verification)</li>
              <li>Parent/guardian contact information (for teenlancers)</li>
              <li>Profile information and preferences</li>
              <li>Payment information (processed securely through third-party providers)</li>
            </ul>

            <h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">2.2 Usage Information</h3>
            <p>We automatically collect certain information about your use of the platform, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device information (type, operating system, browser)</li>
              <li>IP address and location data</li>
              <li>Usage patterns and activity logs</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">2.3 Content Information</h3>
            <p>We collect content you create or share on the platform, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gig postings and applications</li>
              <li>Messages and communications</li>
              <li>Reviews and ratings</li>
              <li>Photos and profile information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, maintain, and improve our services</li>
              <li>To facilitate connections between teenlancers and neighbors</li>
              <li>To verify user identities and age (especially for teenlancers)</li>
              <li>To enable parent/guardian oversight and approval</li>
              <li>To process payments and transactions securely</li>
              <li>To send important updates and notifications</li>
              <li>To detect and prevent fraud, abuse, and illegal activity</li>
              <li>To comply with legal obligations</li>
              <li>To analyze usage patterns and improve user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">4. Information Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
            
            <h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">4.1 With Other Users</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your profile information is visible to other users on the platform</li>
              <li>Neighbors can see teenlancer profiles when reviewing applications</li>
              <li>Teenlancers can see neighbor profiles when viewing available gigs</li>
            </ul>

            <h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">4.2 With Service Providers</h3>
            <p>We may share information with third-party service providers who help us operate the platform, including payment processors, cloud hosting providers, and customer support services.</p>

            <h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">4.3 For Safety and Legal Compliance</h3>
            <p>We may disclose information if required by law, to protect the safety of users, or to investigate potential violations of our Terms of Service.</p>

            <h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">4.4 With Parental Consent</h3>
            <p>For teenlancers, we may share information with parents or guardians as necessary to provide oversight and ensure safety.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">5. Children&apos;s Privacy</h2>
            <p>
              Ollie is designed for teenlancers aged 14-19. We comply with applicable laws protecting minors and young adults. We require:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Parental or guardian consent before teenlancers can create accounts</li>
              <li>Parental oversight of teenlancer accounts and activity</li>
              <li>Age verification to ensure users meet our age requirements</li>
              <li>Limited data collection for minors, collecting only what is necessary to provide our services safely</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">6. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">7. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and review your personal information</li>
              <li>Update or correct inaccurate information</li>
              <li>Request deletion of your account and information</li>
              <li>Opt-out of certain communications</li>
              <li>Request a copy of your data</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at privacy@olliejobs.com. For teenlancers, parents or guardians must make these requests on their behalf.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">8. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and personalize content. You can control cookie preferences through your browser settings, though this may affect platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of material changes via email or through the platform. Your continued use of Ollie after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">10. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li><strong>Email:</strong> privacy@olliejobs.com</li>
              <li><strong>Website:</strong> <Link href="/" className="text-brand-green hover:underline">www.olliejobs.com</Link></li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border-gray">
          <Link
            href="/"
            className="text-brand-green hover:underline font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}


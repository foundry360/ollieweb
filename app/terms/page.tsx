import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Terms of Service | Ollie',
  description: 'Ollie Terms of Service - Rules and guidelines for using our platform',
}

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        <p className="text-text-gray-light mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-text-gray-light">
          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">1. Acceptance of Terms</h2>
            <p>
              Welcome to Ollie. By accessing or using our platform, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not use our services.
            </p>
            <p>
              If you are a parent or guardian of a teenlancer (a user aged 14-19), you are responsible for ensuring your teen understands and agrees to these Terms, and you agree to these Terms on their behalf.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">2. Description of Service</h2>
            <p>
              Ollie is a platform that connects teenlancers (teens aged 14-19) with neighbors who need help with local tasks and gigs. Our services include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Posting and browsing local gigs and tasks</li>
              <li>Connecting teenlancers with neighbors</li>
              <li>Facilitating secure payments between users</li>
              <li>Providing verification and safety features</li>
              <li>Enabling parental oversight for teenlancer accounts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">3. Eligibility and Age Requirements</h2>
            
            <h3 className="text-xl font-semibold text-brand-dark mb-3">3.1 Teenlancers</h3>
            <p>To use Ollie as a teenlancer, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be between the ages of 14 and 19</li>
              <li>Have parental or guardian consent</li>
              <li>Have your parent or guardian verify your account</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">3.2 Neighbors</h3>
            <p>To use Ollie as a neighbor, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years old</li>
              <li>Be legally authorized to enter into contracts</li>
              <li>Complete identity verification as required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">4. User Accounts</h2>
            <p>You are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and up-to-date information</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your account information is truthful and not misleading</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">5. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the platform for any illegal purpose or in violation of any laws</li>
              <li>Post false, misleading, or fraudulent information</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to bypass age restrictions or verification systems</li>
              <li>Impersonate another person or entity</li>
              <li>Post inappropriate, offensive, or harmful content</li>
              <li>Interfere with or disrupt the platform&apos;s operation</li>
              <li>Collect user information without authorization</li>
              <li>Use automated systems to access the platform without permission</li>
              <li>Engage in any activity that compromises the safety of teenlancers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">6. Gigs and Tasks</h2>
            
            <h3 className="text-xl font-semibold text-brand-dark mb-3">6.1 Posting Gigs</h3>
            <p>Neighbors may post gigs and tasks, agreeing to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate descriptions of the work required</li>
              <li>Set fair and reasonable payment terms</li>
              <li>Pay promptly upon completion of agreed work</li>
              <li>Treat teenlancers with respect and provide safe working conditions</li>
              <li>Not post tasks that are illegal, dangerous, or inappropriate for minors</li>
            </ul>

            <h3 className="text-xl font-semibold text-brand-dark mb-3 mt-6">6.2 Applying for Gigs</h3>
            <p>Teenlancers may apply for gigs, agreeing to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Have parent/guardian approval before accepting work</li>
              <li>Complete work as described and agreed upon</li>
              <li>Maintain professional and respectful communication</li>
              <li>Arrive on time and complete work safely and competently</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">7. Payments</h2>
            <p>
              Ollie facilitates payments between users through secure third-party payment processors. By using our payment features, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pay all agreed amounts promptly upon work completion</li>
              <li>Dispute payment issues through our platform resolution system</li>
              <li>Understand that Ollie may charge fees for payment processing</li>
              <li>Comply with all applicable payment and tax laws</li>
            </ul>
            <p className="mt-4">
              Ollie is not responsible for payment disputes between users but may facilitate resolution through our support services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">8. Safety and Verification</h2>
            <p>
              We implement safety measures including user verification, background checks (where applicable), and parental oversight for teenlancers. However, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ollie does not guarantee the identity, background, or conduct of any user</li>
              <li>You are responsible for your own safety when meeting or working with other users</li>
              <li>Teenlancers should never meet neighbors without parental knowledge and approval</li>
              <li>You should use good judgment and report any concerns or safety issues immediately</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">9. Parental Responsibilities</h2>
            <p>
              Parents and guardians of teenlancers agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Supervise their teen&apos;s use of the platform</li>
              <li>Approve all gig applications and work assignments</li>
              <li>Ensure their teen&apos;s safety when working with neighbors</li>
              <li>Review all communications and activity on their teen&apos;s account</li>
              <li>Be responsible for their teen&apos;s compliance with these Terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">10. Intellectual Property</h2>
            <p>
              All content on the Ollie platform, including logos, designs, text, graphics, and software, is owned by Ollie or its licensors and is protected by intellectual property laws. You may not copy, modify, or distribute our content without permission.
            </p>
            <p className="mt-4">
              You retain ownership of content you post but grant Ollie a license to use, display, and distribute such content on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">11. Disclaimers and Limitations of Liability</h2>
            <p>
              OLLIE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. We do not guarantee that the platform will be uninterrupted, error-free, or secure.
            </p>
            <p className="mt-4">
              To the maximum extent permitted by law, Ollie is not liable for any indirect, incidental, or consequential damages arising from your use of the platform, including disputes between users or any harm that may occur during gig work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">12. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for violations of these Terms, illegal activity, or any other reason we deem necessary to protect users or the platform.
            </p>
            <p className="mt-4">
              You may delete your account at any time through your account settings. Upon termination, your right to use the platform immediately ceases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">13. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. We will notify users of material changes via email or through the platform. Your continued use of Ollie after such changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">14. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the United States. Any disputes will be resolved through binding arbitration in accordance with applicable rules.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">15. Contact Information</h2>
            <p>
              If you have questions about these Terms, please contact us:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li><strong>Email:</strong> legal@olliejobs.com</li>
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


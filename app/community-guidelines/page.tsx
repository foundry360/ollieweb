import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Community Guidelines | Ollie',
  description: 'Ollie Community Guidelines - Building a safe and respectful community',
}

export default function CommunityGuidelines() {
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
          Community Guidelines
        </h1>
        <p className="text-text-gray-light mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-text-gray-light">
          <section>
            <p className="text-lg">
              At Ollie, we&apos;re building a community where teenlancers and neighbors can connect safely and respectfully. These guidelines help ensure everyone has a positive experience. By using Ollie, you agree to follow these guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">1. Age Restrictions & Verification</h2>
            <p className="mb-4">
              To maintain a safe environment for all users, Ollie has strict age requirements and verification processes. Teenlancers must be at least 14 years old to create an account and use the platform. For all users under the age of 18, parental or guardian consent is mandatory before account activation. This ensures that parents are aware of their teen&apos;s participation and can provide appropriate oversight.
            </p>
            <p className="mb-4">
              All users must complete identity verification through multiple channels, including phone number verification, email confirmation, and submission of appropriate documentation. This multi-step verification process helps us confirm that users are who they claim to be and meet our age requirements. Age misrepresentation is strictly prohibited and will result in immediate account suspension or termination.
            </p>
            <p>
              For Neighbors posting gigs on the platform, we may require additional background checks to ensure the safety of teenlancers. These checks help us verify that Neighbors are trustworthy community members who can provide safe work environments. All verification information is kept confidential and used solely for safety and security purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">2. Safety & Security</h2>
            <p className="mb-4">
              Your safety is our top priority. When meeting for the first time, always choose a public location such as a coffee shop, library, or community center. Never agree to meet at a private residence for an initial meeting, and always inform a parent or guardian about the meeting location and time.
            </p>
            <p className="mb-4">
              Teenlancers must keep their parents or guardians informed about all gig details, including the type of work, location, duration, and payment terms. Parents should be aware of who their teen is working with and where the work will take place. This transparency helps ensure everyone stays safe and accountable.
            </p>
            <p className="mb-4">
              Protect your personal information at all times. Do not share your home address, personal phone number, social media accounts, or other sensitive information until a gig has been officially accepted and you feel comfortable doing so. All communication should initially take place through the Ollie platform&apos;s secure messaging system.
            </p>
            <p className="mb-4">
              If you ever feel uncomfortable, unsafe, or witness any concerning behavior, report it immediately through the app&apos;s reporting feature or contact our support team. Trust your instincts—if something doesn&apos;t feel right, it probably isn&apos;t. We take all safety reports seriously and investigate them promptly.
            </p>
            <p>
              Keep your emergency contact information up to date in your profile. This ensures that in case of any emergency, we can quickly reach the appropriate people. Regularly review and update your safety settings and preferences to maintain the highest level of protection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">3. Transparency & Honesty</h2>
            <p className="mb-4">
              Building trust in our community requires honesty and transparency from everyone. All users must maintain accurate profiles that truthfully represent their skills, experience, and availability. Misleading information damages trust and can result in account restrictions.
            </p>
            <p className="mb-4">
              When posting gigs, Neighbors must provide clear, detailed descriptions of the work required, including specific tasks, expected duration, location, and any special requirements or safety considerations. Accurate gig descriptions help teenlancers make informed decisions and ensure successful matches.
            </p>
            <p className="mb-4">
              After completing a gig, both parties should provide honest, constructive reviews and ratings. Reviews help build the community&apos;s reputation system and guide future connections. Focus on factual information about the experience, communication, and work quality.
            </p>
            <p className="mb-4">
              Payment terms must be clearly discussed and agreed upon before work begins. All payments should be processed through the Ollie platform to ensure security and transparency. Neighbors should pay the agreed amount promptly upon completion of satisfactory work, and teenlancers should complete work as described and agreed.
            </p>
            <p>
              Maintain timely and professional communication throughout the gig process. Respond to messages promptly, keep all parties informed of any changes or delays, and communicate clearly about expectations and progress. Good communication prevents misunderstandings and builds stronger community relationships.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">4. Respectful Behavior</h2>
            <p className="mb-4">
              Ollie is a platform built on mutual respect and kindness. Harassment, bullying, discrimination, or any form of abusive behavior is strictly prohibited and will not be tolerated. This includes but is not limited to offensive language, threats, intimidation, or behavior that makes others feel unsafe or unwelcome.
            </p>
            <p className="mb-4">
              All communication on the platform should be professional, courteous, and appropriate. Whether you&apos;re a teenlancer reaching out about a gig or a neighbor posting work opportunities, maintain a respectful tone in all interactions. Remember that behind every profile is a real person deserving of respect.
            </p>
            <p className="mb-4">
              Inappropriate content, including but not limited to explicit material, hate speech, or content that violates community standards, is not allowed anywhere on the platform. This applies to profile photos, gig descriptions, messages, and any other content shared through Ollie.
            </p>
            <p className="mb-4">
              Respect personal and professional boundaries at all times. If someone declines a gig application, doesn&apos;t respond immediately, or sets boundaries, respect their decision. Do not pressure others or continue contacting them after they&apos;ve indicated they&apos;re not interested.
            </p>
            <p>
              Our community is diverse and includes people from various backgrounds, cultures, and experiences. Practice cultural sensitivity and be open to learning about others. Treat everyone with dignity and respect, regardless of their background, beliefs, or identity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">5. Verification & Account Security</h2>
            <p className="mb-4">
              To maintain platform security and user trust, all accounts must complete verification requirements. Phone number verification is mandatory for all users, as it helps us confirm identity and provides an additional security layer. Your phone number is kept private and used only for verification and important account notifications.
            </p>
            <p className="mb-4">
              Email confirmation is also required during account creation. This ensures we have a valid way to communicate important updates, safety alerts, and account information. Keep your email address current and check it regularly for platform communications.
            </p>
            <p className="mb-4">
              All users must upload a clear, recent profile photo that shows their face. This helps build trust within the community and allows users to recognize each other when meeting in person. Profile photos must be appropriate and cannot contain offensive, misleading, or inappropriate content.
            </p>
            <p className="mb-4">
              Maintain strong account security by using a unique, strong password and enabling two-factor authentication when available. Never share your account credentials with anyone, and log out of shared devices. If you suspect unauthorized access to your account, contact support immediately.
            </p>
            <p>
              Each person is allowed only one account on Ollie. Creating multiple accounts, sharing accounts, or using someone else&apos;s account is prohibited and will result in account suspension or termination. This policy helps maintain the integrity of our verification system and community trust.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">6. Prohibited Activities</h2>
            <p className="mb-4">
              Ollie is committed to maintaining a legal, safe, and ethical platform. Any activities that are illegal under local, state, or federal law are strictly prohibited. This includes but is not limited to activities involving drugs, alcohol (for minors), theft, vandalism, or any other criminal behavior. Users found engaging in illegal activities will have their accounts immediately terminated and may face legal consequences.
            </p>
            <p className="mb-4">
              All payments must be processed through the Ollie platform. Circumventing the platform&apos;s payment system by arranging off-platform payments is strictly prohibited. This policy protects both parties, ensures proper record-keeping, and maintains the security of financial transactions. Violations will result in immediate account suspension.
            </p>
            <p className="mb-4">
              Fake gigs, spam postings, or any attempts to mislead or defraud other users are not allowed. All gig postings must represent genuine work opportunities. Spam, including repetitive or irrelevant postings, will be removed and may result in account restrictions.
            </p>
            <p className="mb-4">
              Recruiting users for other services, platforms, or opportunities without explicit permission from Ollie is prohibited. The platform is designed to facilitate connections within our community, not to serve as a recruitment tool for external services. If you have a legitimate business opportunity that might benefit our community, contact us first for approval.
            </p>
            <p className="mb-4">
              To protect user privacy and safety, sharing personal contact information (phone numbers, email addresses, social media handles, etc.) before a gig has been officially accepted is not allowed. All initial communication should take place through the Ollie platform&apos;s secure messaging system. Once a gig is accepted, users may exchange contact information if both parties agree.
            </p>
            <p className="mb-4">
              Impersonation of any kind is strictly prohibited. This includes pretending to be someone else, using false identities, or misrepresenting your relationship to another person or organization. All accounts must represent real individuals who have completed our verification process.
            </p>
            <p>
              Exploitation of any kind, including but not limited to labor exploitation, financial exploitation, or taking advantage of users&apos; age or inexperience, is absolutely prohibited. Ollie is built on principles of fairness, respect, and mutual benefit. Any attempts to exploit other users will result in immediate account termination and may involve law enforcement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">7. Reporting & Enforcement</h2>
            <p className="mb-4">
              If you witness or experience behavior that violates these Community Guidelines, please report it immediately through the app&apos;s reporting feature. Reports can be made anonymously if preferred, and all reports are taken seriously. The sooner we know about a problem, the faster we can address it and protect our community.
            </p>
            <p className="mb-4">
              All reports are thoroughly investigated by our safety team. We review the circumstances, gather relevant information, and take appropriate action based on the severity and nature of the violation. Investigation timelines vary depending on the complexity of the situation, but we prioritize safety-related reports for immediate attention.
            </p>
            <p className="mb-4">
              Enforcement actions are taken based on the severity and frequency of violations. Minor violations may result in warnings and educational resources. More serious or repeated violations can lead to temporary suspensions, permanent account bans, or in cases involving illegal activity, cooperation with law enforcement agencies. Our goal is to maintain a safe community while giving users opportunities to correct their behavior when appropriate.
            </p>
            <p className="mb-4">
              If your account is subject to enforcement action, you have the right to appeal the decision. Appeals must be submitted through our support system and will be reviewed by our safety team. We consider all relevant information and context when reviewing appeals, and decisions are made fairly and consistently.
            </p>
            <p>
              Ollie cooperates fully with law enforcement agencies when illegal activity is suspected or reported. We may share relevant information with authorities when required by law or when necessary to protect user safety. We take our responsibility to keep the platform safe and legal very seriously.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">8. Platform Integrity</h2>
            <p className="mb-4">
              The success of Ollie depends on everyone fulfilling their commitments. Teenlancers must complete gigs as agreed upon, following the work description and meeting quality expectations. If circumstances change and you cannot complete a gig as planned, communicate immediately with the Neighbor and our support team to find a solution.
            </p>
            <p className="mb-4">
              Neighbors must pay fairly and on time for completed work. The agreed-upon payment amount should reflect fair compensation for the work performed, and payment should be processed promptly once work is completed and verified. Delayed or incomplete payments damage trust and may result in account restrictions.
            </p>
            <p className="mb-4">
              Accurate ratings and reviews are essential for building trust within our community. Provide honest, constructive feedback based on actual experiences. Reviews should focus on the work quality, communication, reliability, and overall experience. False or misleading reviews, whether positive or negative, undermine the integrity of our rating system.
            </p>
            <p>
              All users must respect and comply with Ollie&apos;s Terms of Service, Privacy Policy, and these Community Guidelines. These documents work together to create a safe, fair, and functional platform. Violations of any of these policies may result in enforcement actions. By using Ollie, you agree to follow all platform policies and contribute to maintaining a positive community environment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">9. Parental Involvement</h2>
            <p className="mb-4">
              Parental involvement is a cornerstone of Ollie&apos;s safety model. For all teenlancers under 18, parents or legal guardians must provide explicit consent and verify their own identity before their teen can activate an account. This verification process ensures that parents are who they claim to be and are actively involved in their teen&apos;s use of the platform.
            </p>
            <p className="mb-4">
              Parents receive automatic notifications about important account activity, including new gig applications, accepted gigs, completed work, and any safety reports or concerns. These notifications keep parents informed and allow them to stay engaged with their teen&apos;s Ollie experience.
            </p>
            <p className="mb-4">
              Parents have the ability to review and approve or decline gig applications before their teen can accept them. This oversight ensures that parents are aware of the work their teen is considering and can make informed decisions about what opportunities are appropriate. Parents can also set preferences for the types of gigs their teen can apply for.
            </p>
            <p>
              Parents have full access to their teen&apos;s account activity, including messages, gig history, payment information, and profile settings. This transparency allows parents to monitor their teen&apos;s use of the platform and intervene if necessary. We believe that parental involvement is essential for creating a safe environment where teens can learn responsibility while earning money.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">10. Contact & Support</h2>
            <p className="mb-4">
              Ollie provides multiple channels for getting help and support. Our in-app Help Center contains answers to frequently asked questions, tutorials on using platform features, and guidance on common situations. Before contacting support, check the Help Center as it may have the information you need immediately.
            </p>
            <p className="mb-4">
              For violations of Community Guidelines or Terms of Service, use the reporting feature within the app. This feature allows you to report specific incidents, users, or content that violates our policies. Reports are reviewed by our safety team, and you can track the status of your report through your account.
            </p>
            <p>
              For urgent safety concerns, including situations where someone is in immediate danger, contact our support team directly through the app or by email. Safety-related reports are prioritized and addressed as quickly as possible. If you are experiencing an emergency, call 911 or your local emergency services immediately. Ollie support is available to help with platform-related safety concerns, but cannot replace emergency services in life-threatening situations.
            </p>
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


import React from 'react'
const FF = `'Bricolage Grotesque', sans-serif`

const LAST_UPDATED = '6 April 2025'

export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        .legal-page {
          max-width: 760px; margin: 0 auto;
          padding: 120px 24px 80px;
          color: #b8c5d8; line-height: 1.75; font-size: 15px;
        }
        .legal-page h1 {
          font-family: ${FF}; font-size: 36px; font-weight: 800;
          color: #e8edf5; letter-spacing: -0.02em; margin-bottom: 8px;
        }
        .legal-page .updated {
          font-size: 13px; color: #3A5070; margin-bottom: 48px;
        }
        .legal-page h2 {
          font-family: ${FF}; font-size: 19px; font-weight: 700;
          color: #e8edf5; margin: 40px 0 12px;
        }
        .legal-page h3 {
          font-size: 15px; font-weight: 700; color: #c8d6e5;
          margin: 24px 0 8px;
        }
        .legal-page p { margin-bottom: 14px; }
        .legal-page ul { padding-left: 22px; margin-bottom: 14px; }
        .legal-page li { margin-bottom: 6px; }
        .legal-page a { color: #3B82F6; }
        .legal-page table {
          width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;
        }
        .legal-page th, .legal-page td {
          padding: 10px 14px; border: 1px solid rgba(255,255,255,0.08);
          text-align: left;
        }
        .legal-page th { background: rgba(255,255,255,0.04); color: #e8edf5; font-weight: 600; }
      `}</style>

      <div className="legal-page">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: {LAST_UPDATED}</p>

        <p>
          Cy-Sec Awareness and Consultancy Ltd ("<strong>Cy-Sec</strong>", "<strong>we</strong>", "<strong>us</strong>") is committed to
          protecting your personal data. This policy explains what data we collect, how we use it,
          and your rights under the UK General Data Protection Regulation (UK GDPR) and the
          Data Protection Act 2018.
        </p>

        <h2>1. Who We Are</h2>
        <p>
          Cy-Sec Awareness and Consultancy Ltd is the data controller for personal data collected
          through cy-sec.co.uk, fortifylearn.co.uk, and fortifyone.co.uk.
        </p>
        <p>Contact: <a href="mailto:gazc@cy-sec.co.uk">gazc@cy-sec.co.uk</a></p>

        <h2>2. What Data We Collect</h2>
        <table>
          <thead>
            <tr><th>Category</th><th>Data</th><th>Source</th></tr>
          </thead>
          <tbody>
            <tr><td>Account</td><td>Name, email address, password (hashed)</td><td>Registration form</td></tr>
            <tr><td>Payment</td><td>Transaction reference, amount, date — card details held by Stripe</td><td>Stripe checkout</td></tr>
            <tr><td>Learning activity</td><td>PBQ attempts, scores, simulation results</td><td>FortifyLearn platform</td></tr>
            <tr><td>Compliance data</td><td>Assessment responses, vendor records, DPIA content</td><td>FortifyOne platform</td></tr>
            <tr><td>Enquiries</td><td>Name, email, message content</td><td>Contact form</td></tr>
            <tr><td>Technical</td><td>IP address, browser type, page interactions</td><td>Automatic (server logs)</td></tr>
          </tbody>
        </table>

        <h2>3. Legal Basis for Processing</h2>
        <ul>
          <li><strong>Contract</strong> — to deliver the services you purchase or request</li>
          <li><strong>Legitimate interests</strong> — to improve our platforms, prevent fraud, and ensure security</li>
          <li><strong>Legal obligation</strong> — to comply with financial, tax, and regulatory requirements</li>
          <li><strong>Consent</strong> — for marketing communications (you can withdraw at any time)</li>
        </ul>

        <h2>4. How We Use Your Data</h2>
        <ul>
          <li>Providing access to FortifyLearn and FortifyOne platforms</li>
          <li>Processing payments and issuing purchase confirmations</li>
          <li>Responding to enquiries and delivering consultancy services</li>
          <li>Sending service updates and, where you have consented, marketing</li>
          <li>Detecting and preventing fraud and security incidents</li>
          <li>Complying with legal obligations</li>
        </ul>

        <h2>5. Third-Party Services</h2>
        <table>
          <thead>
            <tr><th>Provider</th><th>Purpose</th><th>Location</th></tr>
          </thead>
          <tbody>
            <tr><td>Supabase</td><td>Database and authentication</td><td>EU (Ireland)</td></tr>
            <tr><td>Vercel</td><td>Website hosting and deployment</td><td>EU/US (adequacy decision)</td></tr>
            <tr><td>Stripe</td><td>Payment processing</td><td>EU/US (standard contractual clauses)</td></tr>
          </tbody>
        </table>
        <p>We do not sell your personal data to third parties.</p>

        <h2>6. Data Retention</h2>
        <ul>
          <li>Account data — held while your account is active, deleted within 30 days of closure request</li>
          <li>Payment records — 7 years (legal obligation for financial records)</li>
          <li>Learning activity — held while your account is active</li>
          <li>Enquiry records — 12 months</li>
          <li>Server logs — 30 days</li>
        </ul>

        <h2>7. Your Rights</h2>
        <p>Under UK GDPR you have the right to:</p>
        <ul>
          <li><strong>Access</strong> — request a copy of your personal data</li>
          <li><strong>Rectification</strong> — correct inaccurate data</li>
          <li><strong>Erasure</strong> — request deletion ("right to be forgotten")</li>
          <li><strong>Restriction</strong> — limit how we process your data</li>
          <li><strong>Portability</strong> — receive your data in a portable format</li>
          <li><strong>Object</strong> — object to processing based on legitimate interests</li>
          <li><strong>Withdraw consent</strong> — at any time for consent-based processing</li>
        </ul>
        <p>To exercise any right, email <a href="mailto:gazc@cy-sec.co.uk">gazc@cy-sec.co.uk</a>. We will respond within 30 days.</p>

        <h2>8. Complaints</h2>
        <p>
          If you are unhappy with how we handle your data, you have the right to lodge a complaint
          with the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noreferrer">ico.org.uk</a>.
        </p>

        <h2>9. Cookies</h2>
        <p>
          Our platforms use strictly necessary cookies for authentication sessions. We do not use
          advertising or tracking cookies. You can disable cookies in your browser settings,
          but this will prevent login functionality.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Material changes will be communicated
          by email to registered users. The current version is always available at
          cy-sec.co.uk/privacy.
        </p>
      </div>
    </>
  )
}

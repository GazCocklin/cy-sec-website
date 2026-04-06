import React from 'react'
const FF = `'Bricolage Grotesque', sans-serif`

const LAST_UPDATED = '6 April 2025'

export default function Terms() {
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
        .legal-page p { margin-bottom: 14px; }
        .legal-page ul { padding-left: 22px; margin-bottom: 14px; }
        .legal-page li { margin-bottom: 6px; }
        .legal-page a { color: #3B82F6; }
      `}</style>

      <div className="legal-page">
        <h1>Terms of Service</h1>
        <p className="updated">Last updated: {LAST_UPDATED}</p>

        <p>
          These Terms of Service govern your use of the websites and services operated by
          Cy-Sec Awareness and Consultancy Ltd ("<strong>Cy-Sec</strong>", "<strong>we</strong>", "<strong>us</strong>"),
          including cy-sec.co.uk, fortifylearn.co.uk, and fortifyone.co.uk (collectively, the "<strong>Services</strong>").
          By accessing or using the Services, you agree to these terms.
        </p>

        <h2>1. About Us</h2>
        <p>
          Cy-Sec Awareness and Consultancy Ltd is a company registered in England and Wales.
          Contact: <a href="mailto:gazc@cy-sec.co.uk">gazc@cy-sec.co.uk</a>
        </p>

        <h2>2. Accounts</h2>
        <ul>
          <li>You must be 18 or over to create an account</li>
          <li>You are responsible for keeping your credentials secure</li>
          <li>You must not share access to paid content with others</li>
          <li>We may suspend accounts that violate these terms</li>
        </ul>

        <h2>3. Digital Content Purchases (FortifyLearn PBQ Packs)</h2>
        <p>
          PBQ Lab Packs are digital products. Under the Consumer Contracts Regulations 2013,
          you have a 14-day right to cancel digital content purchases unless you have agreed
          to immediate access. By completing your purchase and accessing the labs, you
          acknowledge that digital delivery has begun and waive your cancellation right.
        </p>
        <ul>
          <li>Purchases grant personal, non-transferable access to the specified labs</li>
          <li>Access is tied to your registered account email address</li>
          <li>We do not offer refunds for completed digital purchases except where required by law</li>
          <li>If labs are materially different from their description, contact us within 30 days</li>
        </ul>

        <h2>4. Subscriptions (FortifyOne Platform)</h2>
        <ul>
          <li>Subscriptions renew automatically unless cancelled before the renewal date</li>
          <li>You may cancel at any time via your account settings — access continues until period end</li>
          <li>Price changes will be notified at least 30 days in advance</li>
          <li>No refunds for partial subscription periods unless we materially fail to deliver</li>
        </ul>

        <h2>5. Consultancy Services</h2>
        <p>
          Consultancy engagements (vCISO, DORA Sprint, NIS2 Review, training delivery)
          are governed by separate statements of work agreed in writing. These terms apply
          to the extent not overridden by a signed engagement agreement.
        </p>

        <h2>6. Acceptable Use</h2>
        <p>You must not:</p>
        <ul>
          <li>Share, resell, or redistribute paid content</li>
          <li>Attempt to reverse-engineer or extract our platform code</li>
          <li>Use the Services for unlawful purposes</li>
          <li>Attempt to circumvent access controls or payment systems</li>
          <li>Upload malicious content or attempt to disrupt our infrastructure</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <p>
          All platform content, PBQ scenarios, simulation code, and course materials are owned
          by Cy-Sec Awareness and Consultancy Ltd or licensed to us. Your purchase grants a
          personal licence to use the content — it does not transfer ownership.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, our liability for any claim arising from
          use of the Services is limited to the amount you paid us in the 12 months
          preceding the claim. We are not liable for indirect or consequential losses.
        </p>
        <p>
          Nothing in these terms excludes liability for death or personal injury caused by
          negligence, fraud, or any other matter that cannot be excluded under English law.
        </p>

        <h2>9. Platform Availability</h2>
        <p>
          We aim for high availability but do not guarantee uninterrupted access. Planned
          maintenance will be communicated in advance where possible. We are not liable for
          losses caused by downtime.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These terms are governed by the law of England and Wales. Any disputes shall be
          subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>

        <h2>11. Changes to These Terms</h2>
        <p>
          We may update these terms. Material changes will be communicated by email with
          at least 30 days' notice for paid subscribers. Continued use of the Services
          after that period constitutes acceptance.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these terms: <a href="mailto:gazc@cy-sec.co.uk">gazc@cy-sec.co.uk</a>
        </p>
      </div>
    </>
  )
}

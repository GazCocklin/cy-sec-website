import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F7FA]">
      <Helmet>
        <title>Terms of service - Cy-Sec</title>
        <meta name="description" content="Terms of service for Cy-Sec Awareness and Consultancy Ltd, covering FortifyLearn lab purchases, FortifyOne subscriptions, and use of the cy-sec.co.uk website." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <FileText className="h-14 w-14 text-[#0891B2] mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-[#0B1D3A] via-[#0E5F8A] to-[#0891B2] bg-clip-text text-transparent">
            Terms of service
          </h1>
          <p className="text-slate-600">Last updated: 14 April 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12"
        >
          <div className="text-slate-700 space-y-8 leading-relaxed">

            <section>
              <p className="text-slate-600">
                These terms form a binding agreement between you and Cy-Sec Awareness and Consultancy Ltd, a company registered in England and Wales (company no. [Companies House number], registered office [registered address]) ("Cy-Sec", "we", "us", "our"). By accessing cy-sec.co.uk or purchasing any of our products or services, you agree to these terms. If you do not agree, do not use the site or buy our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. What we provide</h2>
              <p>Cy-Sec operates several connected products and services:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-slate-900">FortifyLearn</strong> — CompTIA exam preparation platform, sold as one-off lab packs through cy-sec.co.uk/store. Purchases grant perpetual, account-tied access to the labs in the pack you buy.</li>
                <li><strong className="text-slate-900">FortifyOne</strong> — governance, risk and compliance (GRC) platform, sold on a recurring subscription basis.</li>
                <li><strong className="text-slate-900">vCISO and consultancy</strong> — cybersecurity advisory and virtual CISO services delivered under separate statement of work.</li>
                <li><strong className="text-slate-900">Training services</strong> — instructor-led, self-study and hybrid CompTIA and CertNexus courses.</li>
              </ul>
              <p className="mt-3">We may add, change, or discontinue features over time. We will give reasonable notice of material changes affecting paid services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Eligibility and accounts</h2>
              <p>You must be at least 18 years old, or the age of majority in your jurisdiction, to buy our services. You are responsible for the accuracy of the information you provide, for keeping your account credentials secure, and for all activity under your account. Notify us immediately at info@cy-sec.co.uk if you suspect unauthorised access.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. FortifyLearn lab packs</h2>
              <p>Lab packs are one-off digital purchases, not subscriptions. When you buy a pack:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Access is delivered immediately to the FortifyLearn account linked to the email address used at checkout.</li>
                <li>The licence is personal, non-transferable, and granted for your individual exam preparation only. You may not share your account, resell access, or provide pack content to third parties.</li>
                <li>Access is perpetual in the sense that we do not time-limit it at point of sale. We may retire or replace individual labs as exam objectives change; where a lab is retired we will aim to provide a comparable replacement.</li>
                <li>Free taster labs are provided "as is" for evaluation purposes and may be withdrawn at any time.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Pricing, payment and VAT</h2>
              <p>Prices are shown in pounds sterling (GBP). Payments are processed by Stripe; we do not store or handle card details directly. Where VAT applies, it is included in the displayed price or shown separately at checkout. Subscription services (FortifyOne, vCISO retainers) renew automatically on the stated cadence until cancelled in accordance with the service's cancellation terms or the applicable statement of work.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Consumer rights and refunds</h2>
              <p>If you are a consumer based in the UK or EU, you normally have 14 days from purchase to cancel a distance contract for digital content under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013.</p>
              <p className="mt-3">Because FortifyLearn lab packs are digital content delivered immediately on purchase, by completing checkout and starting any lab in the pack you:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>expressly consent to immediate performance, and</li>
                <li>acknowledge that you lose your 14-day right of withdrawal once performance begins.</li>
              </ul>
              <p className="mt-3">If you have purchased a pack but not yet accessed any lab in it, contact info@cy-sec.co.uk within 14 days and we will refund the purchase. Nothing in these terms affects your statutory rights under the Consumer Rights Act 2015 where the digital content supplied is faulty, not as described, or not fit for purpose.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Acceptable use</h2>
              <p>You agree not to misuse our services. In particular, you must not:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>probe, scan or test the security of any system or network without authorisation (this restriction does not apply inside FortifyLearn's authorised lab environments, which are built for exactly this purpose);</li>
                <li>attempt to breach, bypass or interfere with authentication, rate limits, or any other security control;</li>
                <li>access non-public areas of our infrastructure, other users' accounts, or our source code;</li>
                <li>scrape, copy, mirror, republish or create derivative works from our lab content, PBQ questions, or training materials;</li>
                <li>use automated tools, bots, or AI systems to extract content from our platforms;</li>
                <li>use the services to build a competing product.</li>
              </ul>
              <p className="mt-3">We may suspend or terminate accounts that breach this clause without refund.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Intellectual property</h2>
              <p>All content on cy-sec.co.uk, within FortifyLearn, FortifyOne and our training materials — including labs, PBQ banks, simulations, tools such as Arclight SIEM, NETSCAN PRO, FORTIGUARD Policy Auditor, FL-NETSIM, NETCAP Analyzer, and NETPULSE NMS, written explanations, screenshots, logos and branding — is owned by Cy-Sec or our licensors and protected by UK and international copyright and trademark law. Your purchase grants a licence to use the content for your own learning; it does not transfer any ownership.</p>
              <p className="mt-3">CompTIA, Network+, Security+, CySA+ and related marks are trademarks of CompTIA, Inc. Cy-Sec and FortifyLearn are independent and not affiliated with, endorsed by, or sponsored by CompTIA.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">8. No exam guarantee</h2>
              <p>FortifyLearn is designed to help you prepare for CompTIA performance-based questions and exam objectives. We do not guarantee that using FortifyLearn will result in you passing any certification exam. Exam success depends on your own study, practice, and performance on the day.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">9. Service availability</h2>
              <p>We aim to keep our services available and working correctly, but we do not promise uninterrupted availability. Planned maintenance, third-party outages, and events outside our reasonable control may cause downtime. Where we offer a formal service level commitment for FortifyOne or vCISO engagements it will be set out in the relevant order or statement of work.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">10. Termination</h2>
              <p>You may stop using our services at any time. We may suspend or terminate your access if you breach these terms, misuse the service, or fail to pay amounts due. On termination for cause, any lab packs, subscriptions or other paid services end immediately and no refund is due. Clauses that by their nature should survive termination — including intellectual property, limitation of liability, and governing law — will continue to apply.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">11. Limitation of liability</h2>
              <p>Nothing in these terms limits or excludes our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot lawfully be limited.</p>
              <p className="mt-3">Subject to that, to the fullest extent permitted by law:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>we are not liable for indirect, special, or consequential loss, or for loss of profit, revenue, data, goodwill, or anticipated savings;</li>
                <li>our total aggregate liability to you arising out of or in connection with your use of any FortifyLearn product is limited to the amount you paid for that product in the twelve months before the claim arose;</li>
                <li>for FortifyOne and consultancy engagements, liability is governed by the limits set out in the applicable order or statement of work.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">12. Privacy and data protection</h2>
              <p>Our handling of personal data is described in our <a href="/privacy-policy" className="text-[#0891B2] hover:underline font-medium">Privacy Policy</a>. We process data in accordance with the UK GDPR and Data Protection Act 2018.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">13. Changes to these terms</h2>
              <p>We may update these terms to reflect changes to our services, the law, or our business. The "last updated" date at the top of this page shows when the current version took effect. For material changes affecting paid services we will give at least 30 days' notice by email or via the site. Continued use of the services after the effective date of a change means you accept the updated terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">14. Governing law and jurisdiction</h2>
              <p>These terms, and any dispute or claim arising out of or in connection with them, are governed by the laws of England and Wales. The courts of England and Wales have exclusive jurisdiction, except that if you are a consumer resident elsewhere in the UK you may also bring proceedings in the courts of your home jurisdiction.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">15. General</h2>
              <p>If any clause in these terms is found to be unenforceable, the rest of the terms will remain in effect. Our failure to enforce a right is not a waiver of that right. These terms are the entire agreement between you and us in relation to the services, and supersede any earlier agreement on the same subject matter.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">16. Contact us</h2>
              <p>Questions about these terms? Email us at <a href="mailto:info@cy-sec.co.uk" className="text-[#0891B2] hover:underline font-medium">info@cy-sec.co.uk</a>.</p>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;

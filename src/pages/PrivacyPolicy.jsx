import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F7FA]">
      <Helmet>
        <title>Privacy policy - Cy-Sec</title>
        <meta name="description" content="Privacy policy for Cy-Sec Awareness and Consultancy Ltd. How we collect, use, store and protect personal data across cy-sec.co.uk, FortifyLearn and FortifyOne." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Shield className="h-14 w-14 text-[#0891B2] mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-[#0B1D3A] via-[#0E5F8A] to-[#0891B2] bg-clip-text text-transparent">
            Privacy policy
          </h1>
          <p className="text-slate-600">Last updated: 19 April 2026</p>
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
                This policy explains how Cy-Sec Awareness and Consultancy Ltd collects, uses and protects personal data when you visit cy-sec.co.uk, buy our products, or use FortifyLearn, FortifyOne and our other services. We are committed to handling your data lawfully, transparently and in accordance with the UK GDPR and the Data Protection Act 2018.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Who we are</h2>
              <p>Cy-Sec Awareness and Consultancy Ltd is the data controller for personal data collected through cy-sec.co.uk and our products.</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Registered in England and Wales, company no. 13176798</li>
                <li>Registered office: Office 1 Izabella House, 24-26 Regent Place, Birmingham, England, B1 3NJ</li>
                <li>ICO registration number: <em className="text-slate-500">(pending registration)</em></li>
                <li>Contact: <a href="mailto:info@cy-sec.co.uk" className="text-[#0891B2] hover:underline font-medium">info@cy-sec.co.uk</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Data we collect</h2>
              <p>We collect personal data in the following categories:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-slate-900">Account data</strong> — name, email address, password hash, and the products you have purchased.</li>
                <li><strong className="text-slate-900">Contact data</strong> — name, email, phone number, company name and job title when you submit a contact form or engage us for consultancy.</li>
                <li><strong className="text-slate-900">Purchase data</strong> — records of your transactions. Card details are handled by Stripe and never stored on our servers.</li>
                <li><strong className="text-slate-900">Usage data</strong> — labs attempted, scores, progress and feedback within FortifyLearn, and equivalent platform activity within FortifyOne.</li>
                <li><strong className="text-slate-900">Assessment data</strong> — where you use FortifyOne, the risk, compliance and vendor data you enter into the platform (note: this is usually personal data about your own organisation rather than yourself).</li>
                <li><strong className="text-slate-900">Technical data</strong> — IP address, browser type, device type, operating system, pages visited and timestamps.</li>
                <li><strong className="text-slate-900">Marketing data</strong> — your preferences in receiving marketing from us.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. How we use your data and our legal basis</h2>
              <p>We process personal data only where we have a lawful basis to do so. The table below shows the main purposes and the basis we rely on for each:</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-2 pr-4 font-bold text-slate-900">Purpose</th>
                      <th className="text-left py-2 font-bold text-slate-900">Lawful basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 pr-4">Creating and managing your account; delivering the labs, subscriptions or services you have purchased</td>
                      <td className="py-3">Performance of a contract</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Processing payments via Stripe</td>
                      <td className="py-3">Performance of a contract</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Providing customer support and responding to enquiries</td>
                      <td className="py-3">Performance of a contract / legitimate interests</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Improving our products, fixing bugs, analysing usage patterns</td>
                      <td className="py-3">Legitimate interests</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Website analytics and performance monitoring</td>
                      <td className="py-3">Consent (via cookie banner)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Marketing emails about new products, labs or offers</td>
                      <td className="py-3">Consent (you can opt out at any time)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Meeting our legal and accounting obligations</td>
                      <td className="py-3">Legal obligation</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Detecting fraud and protecting our platforms</td>
                      <td className="py-3">Legitimate interests</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Who we share data with</h2>
              <p>We do not sell your personal data. We share it only with the processors and partners needed to run our business:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-slate-900">Stripe</strong> — payment processing. Stripe receives the data needed to take your payment and is an independent controller for fraud-prevention purposes.</li>
                <li><strong className="text-slate-900">Supabase</strong> — authentication and database hosting for FortifyLearn, FortifyOne and cy-sec.co.uk.</li>
                <li><strong className="text-slate-900">Vercel</strong> — website hosting and delivery.</li>
                <li><strong className="text-slate-900">Google Analytics</strong> — anonymous website usage analytics, loaded only if you accept analytics cookies.</li>
                <li><strong className="text-slate-900">LinkedIn (Insight Tag)</strong> — measures the effectiveness of LinkedIn advertising campaigns and provides anonymised website demographics. Loaded only if you accept marketing cookies.</li>
                <li><strong className="text-slate-900">Meta (Facebook Pixel)</strong> — measures the effectiveness of Facebook and Instagram advertising campaigns and enables retargeting. Loaded only if you accept marketing cookies.</li>
                <li><strong className="text-slate-900">Email and communication providers</strong> — for sending transactional emails (purchase confirmations, password resets) and, with your consent, marketing emails.</li>
                <li><strong className="text-slate-900">Professional advisers</strong> — accountants, auditors and legal advisers, where necessary.</li>
                <li><strong className="text-slate-900">Law enforcement or regulators</strong> — where we are legally required to disclose information.</li>
              </ul>
              <p className="mt-3">All processors act under written agreements requiring them to protect your data and use it only for the purposes we instruct.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. International transfers</h2>
              <p>Some of our processors are based outside the UK, including in the United States (for example, Stripe, Google Analytics, LinkedIn and Meta). Where personal data is transferred outside the UK, we rely on UK International Data Transfer Agreements, the UK Addendum to the EU Standard Contractual Clauses, or the UK Extension to the EU–US Data Privacy Framework, as appropriate, to ensure your data receives an equivalent level of protection.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">6. How long we keep your data</h2>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-slate-900">Account and purchase records</strong> — kept for as long as your account is active, and for six years after closure to meet UK tax and accounting obligations.</li>
                <li><strong className="text-slate-900">FortifyLearn progress data</strong> — kept for as long as your account exists so you can return to your training.</li>
                <li><strong className="text-slate-900">Contact form submissions</strong> — kept for up to 24 months unless they become part of an ongoing engagement.</li>
                <li><strong className="text-slate-900">Marketing data</strong> — kept until you unsubscribe or ask us to delete it.</li>
                <li><strong className="text-slate-900">Website analytics</strong> — retained by Google Analytics for 14 months by default.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Your rights</h2>
              <p>Under UK data protection law you have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-slate-900">Be informed</strong> about how we use your personal data (that's what this policy is for).</li>
                <li><strong className="text-slate-900">Access</strong> the personal data we hold about you.</li>
                <li><strong className="text-slate-900">Rectification</strong> — ask us to correct inaccurate or incomplete data.</li>
                <li><strong className="text-slate-900">Erasure</strong> — ask us to delete your personal data in certain circumstances.</li>
                <li><strong className="text-slate-900">Restriction</strong> — ask us to pause processing while a concern is investigated.</li>
                <li><strong className="text-slate-900">Data portability</strong> — receive your data in a structured, machine-readable format.</li>
                <li><strong className="text-slate-900">Object</strong> to processing based on legitimate interests, and to object to direct marketing at any time.</li>
                <li><strong className="text-slate-900">Not be subject to solely automated decisions</strong> that produce legal or similarly significant effects on you. We do not carry out such automated decision-making.</li>
                <li><strong className="text-slate-900">Withdraw consent</strong> at any time where we rely on consent as our lawful basis.</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, email <a href="mailto:info@cy-sec.co.uk" className="text-[#0891B2] hover:underline font-medium">info@cy-sec.co.uk</a>. We will respond within one month.</p>
              <p className="mt-3">If you are not satisfied with how we have handled your data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:underline font-medium">ico.org.uk</a> or on 0303 123 1113. We would appreciate the chance to address your concerns first, so please consider contacting us before going to the ICO.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">8. Cookies and similar technologies</h2>
              <p>Cy-sec.co.uk uses cookies for the following purposes:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-slate-900">Strictly necessary</strong> — required for the site to work, including authentication and shopping basket state. These are always on.</li>
                <li><strong className="text-slate-900">Analytics</strong> — Google Analytics (G-LRMVJPVBMZ) helps us understand how visitors use the site. These are loaded only if you accept analytics cookies via the consent banner.</li>
                <li><strong className="text-slate-900">Marketing</strong> — LinkedIn Insight Tag and Meta (Facebook) Pixel help us measure advertising effectiveness and reach relevant audiences. These are loaded only if you accept marketing cookies via the consent banner.</li>
              </ul>
              <p className="mt-3">You can change your cookie preferences at any time via the cookie settings link on the site, or by clearing cookies in your browser.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">9. Data security</h2>
              <p>We use technical and organisational measures to protect your personal data, including TLS encryption for data in transit, encrypted storage, access controls, role-based permissions, and the principle of least privilege for our own team. Passwords are never stored in plain text. Despite our best efforts no system is 100% secure, and we cannot guarantee absolute security. If a breach affects your personal data and is likely to result in a high risk to your rights, we will notify you and the ICO in accordance with our legal obligations.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">10. Children</h2>
              <p>Our services are not directed at children. You must be 18 or older to create an account or purchase our products. If we become aware that we have collected personal data from a child without appropriate consent, we will delete it.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">11. Changes to this policy</h2>
              <p>We may update this policy to reflect changes to our services, the law or our practices. The "last updated" date at the top shows when the current version took effect. For material changes that affect how we use your data, we will notify you by email or a prominent notice on the site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">12. Contact us</h2>
              <p>Questions, concerns or requests about privacy? Email <a href="mailto:info@cy-sec.co.uk" className="text-[#0891B2] hover:underline font-medium">info@cy-sec.co.uk</a> or write to us at the registered office above.</p>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

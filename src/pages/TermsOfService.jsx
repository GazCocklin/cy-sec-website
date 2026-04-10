import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Terms of Service - Cy-Sec</title>
        <meta name="description" content="Terms of Service for Cy-Sec Awareness and Consultancy, outlining the rules and regulations for the use of our website and services." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <FileText className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4 text-slate-800">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600">Last updated: 27 June 2025</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="prose max-w-none text-slate-700 space-y-6">
            <h2>1. Agreement to Terms</h2>
            <p>By accessing our website and using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>

            <h2>2. Services</h2>
            <p>Cy-Sec Awareness and Consultancy provides cybersecurity training and a risk management software-as-a-service platform (the "Services"). We reserve the right to modify or discontinue the Service at any time without notice.</p>

            <h2>3. User Accounts</h2>
            <p>To access certain features of the Service, you must register for an account. You are responsible for safeguarding your account password and for any activities or actions under your account. You agree to notify us immediately of any unauthorised use of your account.</p>

            <h2>4. Use of the Service</h2>
            <p>You agree not to misuse the Services. For example, you must not, and must not attempt to, use the services to:</p>
            <ul>
              <li>Probe, scan, or test the vulnerability of any system or network without authorisation. (This restriction does not apply to activity conducted within FortifyLearn's authorised lab environments, which are designed specifically for this purpose.)</li>
              <li>Breach or otherwise circumvent any security or authentication measures.</li>
              <li>Access, tamper with, or use non-public areas of the Service.</li>
              <li>Interfere with or disrupt any user, host, or network.</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Cy-Sec Awareness and Consultancy and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Cy-Sec Awareness and Consultancy.</p>

            <h2>6. Subscription and Payment</h2>
            <p>Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Subscriptions automatically renew unless you cancel it or we cancel it. A minimum term of 12 months applies to all monthly subscriptions unless otherwise stated.</p>

            <h2>7. Limitation of Liability</h2>
            <p>In no event shall Cy-Sec Awareness and Consultancy, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

            <h2>8. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.</p>
            
            <h2>9. Changes</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

            <h2>10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>Email: <a href="mailto:info@cy-sec.co.uk" className="text-blue-600 hover:underline">info@cy-sec.co.uk</a></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
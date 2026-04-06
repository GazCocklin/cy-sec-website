import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Privacy Policy - Cy-Sec</title>
        <meta name="description" content="Privacy Policy for Cy-Sec Awareness and Consultancy, detailing how we collect, use, and protect your data." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4 text-slate-800">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600">Last updated: 27 June 2025</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="prose max-w-none text-slate-700 space-y-6">
            <h2>1. Introduction</h2>
            <p>Welcome to Cy-Sec Awareness and Consultancy ("we", "our", "us"). We are committed to protecting and respecting your privacy. This policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>

            <h2>2. Data We Collect</h2>
            <p>We may collect and process the following data about you:</p>
            <ul>
              <li><strong>Personal Identification Information:</strong> Name, email address, phone number, company name, job title.</li>
              <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
              <li><strong>Assessment Data:</strong> Information you provide when using our Security Suite, including assessment responses and vendor information.</li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <p>We use the information we collect in the following ways:</p>
            <ul>
              <li>To provide, operate, and maintain our website and services.</li>
              <li>To improve, personalise, and expand our services.</li>
              <li>To understand and analyse how you use our services.</li>
              <li>To develop new products, services, features, and functionality.</li>
              <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
              <li>To process your transactions and manage your orders.</li>
              <li>To find and prevent fraud.</li>
            </ul>
            
            <h2>4. Legal Basis for Processing</h2>
            <p>Our legal basis for collecting and using the personal information described above will depend on the personal information concerned and the specific context in which we collect it. We will normally collect personal information from you only where we have your consent to do so, where we need the personal information to perform a contract with you, or where the processing is in our legitimate interests and not overridden by your data protection interests or fundamental rights and freedoms.</p>

            <h2>5. Data Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers. We may use third-party service providers to help us operate our business and the site or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.</p>
            
            <h2>6. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>

            <h2>7. Your Data Protection Rights</h2>
            <p>Under UK data protection law, you have rights including:</p>
            <ul>
              <li><strong>Your right of access</strong> - You have the right to ask us for copies of your personal information.</li>
              <li><strong>Your right to rectification</strong> - You have the right to ask us to rectify information you think is inaccurate.</li>
              <li><strong>Your right to erasure</strong> - You have the right to ask us to erase your personal information in certain circumstances.</li>
              <li><strong>Your right to restriction of processing</strong> - You have the right to ask us to restrict the processing of your information in certain circumstances.</li>
              <li><strong>Your right to data portability</strong> - You have the right to ask that we transfer the information you gave us to another organisation, or to you, in certain circumstances.</li>
            </ul>

            <h2>8. Cookie Policy</h2>
            <p>Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. For detailed information on the cookies we use and the purposes for which we use them see our Cookie Policy (which you may need to create separately).</p>

            <h2>9. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

            <h2>10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>Email: <a href="mailto:info@cy-sec.co.uk" className="text-blue-600 hover:underline">info@cy-sec.co.uk</a></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
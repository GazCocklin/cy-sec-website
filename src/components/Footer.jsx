import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Footer = () => (
  <footer className="bg-white/90 backdrop-blur-sm border-t border-slate-200 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-4">
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/87fee7998db1f823dea0ce4380337752.png"
              alt="Cy-Sec Logo"
              className="h-10 w-auto"
            />
          </div>
          <p className="text-slate-600 mb-6 max-w-md text-sm leading-relaxed">
            vCISO leadership, DORA &amp; NIS2 compliance, CompTIA certified training,
            and the FortifyOne GRC platform. One trusted partner.
          </p>
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="h-4 w-4 shrink-0" />
            <a href="mailto:info@cy-sec.co.uk" className="text-sm hover:text-blue-600 transition-colors">
              info@cy-sec.co.uk
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <span className="text-slate-800 font-semibold mb-4 block text-sm">Services</span>
          <ul className="space-y-3 text-sm">
            <li><Link to="/vciso" className="text-slate-600 hover:text-blue-600 transition-colors">Virtual CISO</Link></li>
            <li><Link to="/dora-compliance" className="text-slate-600 hover:text-blue-600 transition-colors">DORA Compliance</Link></li>
            <li><Link to="/nis2-compliance" className="text-slate-600 hover:text-blue-600 transition-colors">NIS2 Compliance</Link></li>
            <li><Link to="/training/comptia-certifications" className="text-slate-600 hover:text-blue-600 transition-colors">Certifications</Link></li>
            <li><Link to="/pbq-engine" className="text-slate-600 hover:text-blue-600 transition-colors">PBQ Simulator</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <span className="text-slate-800 font-semibold mb-4 block text-sm">Legal</span>
          <ul className="space-y-3 text-sm">
            <li><Link to="/privacy-policy" className="text-slate-600 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="text-slate-600 hover:text-blue-600 transition-colors">Terms of Service</Link></li>
          </ul>
          <div className="mt-6">
            <span className="text-slate-800 font-semibold mb-4 block text-sm">Platforms</span>
            <ul className="space-y-3 text-sm">
              <li><a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors">FortifyLearn</a></li>
              <li><a href="https://fortifyone.co.uk" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors">FortifyOne</a></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-slate-200 mt-8 pt-8 gap-4">
        <p className="text-slate-500 text-sm">
          © 2026 Cy-Sec Awareness and Consultancy Ltd. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <img
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/390c3df2ac99cc7ad0233de0dda0a060.png"
            alt="CompTIA Authorised Partner"
            className="h-10 w-auto"
          />
          <img
            src="https://horizons-cdn.hostinger.com/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/3c564edf4197ff2826b29bfb622cb01b.png"
            alt="CertNexus Authorised Training Partner"
            className="h-10 w-auto"
          />
          <img
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/8307f83b47ea643794e47e44b120c35e.png"
            alt="Cyber Essentials Certified"
            className="h-10 w-auto"
          />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

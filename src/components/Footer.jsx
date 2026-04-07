import React from 'react';
import { Mail } from 'lucide-react';
import FortifyOneLogo from '@/components/logos/FortifyOneLogo';
import FortifyLearnLogo from '@/components/logos/FortifyLearnLogo';

const Footer = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/87fee7998db1f823dea0ce4380337752.png" 
                alt="Cy-Sec Logo" 
                className="h-10 w-auto" 
              />
            </div>
            <p className="text-slate-600 mb-6 max-w-md">
              Leading cybersecurity awareness training and consultancy services. 
              Protecting organisations through comprehensive security solutions and expert guidance.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@cy-sec.co.uk</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-slate-800 font-semibold mb-4 block">Quick Links</span>
            <ul className="space-y-3">
              <li><a href="/" className="text-slate-600 hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="/about" className="text-slate-600 hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="/training-delivery" className="text-slate-600 hover:text-blue-600 transition-colors">Training Services</a></li>
              <li><a href="/security-suite" className="text-slate-600 hover:text-blue-600 transition-colors">Platform</a></li>
              <li className="pt-2">
                <a href="https://FortifyOne.co.uk" className="inline-block transition-transform hover:scale-105">
                  <FortifyOneLogo height={28} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-slate-800 font-semibold mb-4 block">Legal</span>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="text-slate-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-slate-600 hover:text-blue-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-slate-200 mt-8 pt-8">
          <p className="text-slate-600 text-sm mb-4 md:mb-0">
            © 2026 Cy-Sec Awareness and Consultancy. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <img 
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/390c3df2ac99cc7ad0233de0dda0a060.png" 
              alt="CompTIA Training Partner Logo" 
              className="h-10 w-auto" 
            />
            <img 
              src="https://horizons-cdn.hostinger.com/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/3c564edf4197ff2826b29bfb622cb01b.png" 
              alt="CertNexus Authorized Training Partner Logo" 
              className="h-10 w-auto" 
            />
            <img 
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/8307f83b47ea643794e47e44b120c35e.png" 
              alt="Cyber Essentials Certified Logo" 
              className="h-10 w-auto" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
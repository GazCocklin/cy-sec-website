import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IframeBookingModal from '@/components/IframeBookingModal';
import FortifyLearnLogo from '@/components/logos/FortifyLearnLogo';
import FortifyOneLogo from '@/components/logos/FortifyOneLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPlatformsOpen, setIsPlatformsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-blue-500/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 shrink-0 mr-4">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/7fb75178-dcd9-4a94-8e6f-2801e9c14c56/87fee7998db1f823dea0ce4380337752.png" 
                alt="Cy-Sec Awareness and Consultancy Logo" 
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-4 lg:space-x-6">
              
              {/* Services Dropdown Mega Menu */}
              <div className="relative group">
                <button className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                  Services <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="w-72 bg-slate-900 border border-blue-500/20 rounded-xl shadow-2xl overflow-hidden backdrop-blur-lg">
                    <div className="p-4 bg-slate-800/50">
                      <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">Training Services</p>
                      <div className="space-y-1">
                        <Link to="/training-delivery" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-blue-500/20 rounded-md transition-colors">Security Awareness Training</Link>
                        <Link to="/training/comptia-certifications" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-blue-500/20 rounded-md transition-colors">Professional Certifications</Link>
                      </div>
                    </div>
                    <div className="p-4 border-t border-slate-700 bg-slate-900/50">
                      <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Consultancy Services</p>
                      <div className="space-y-1">
                        <Link to="/vciso" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-cyan-500/20 rounded-md transition-colors">Virtual CISO</Link>
                        <Link to="/dora-compliance" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-cyan-500/20 rounded-md transition-colors">DORA Compliance Sprint</Link>
                        <Link to="/nis2-compliance" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-cyan-500/20 rounded-md transition-colors">NIS2 Compliance</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platforms Dropdown Menu */}
              <div className="relative group">
                <button className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">
                  Platforms <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="w-56 bg-slate-900 border border-blue-500/20 rounded-xl shadow-2xl overflow-hidden backdrop-blur-lg p-2">
                    <a href="https://fortifyone.co.uk" target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors h-14">
                      <FortifyOneLogo height={22} />
                    </a>
                    <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors h-14">
                      <FortifyLearnLogo height={22} />
                    </a>
                  </div>
                </div>
              </div>

              <Link
                to="/about"
                className={`relative px-2 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive('/about') ? 'text-blue-400 text-glow' : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                About
                {isActive('/about') && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400" initial={false} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                )}
              </Link>
              
              <div className="w-px h-6 bg-slate-700 mx-2"></div>

              <div className="flex items-center">
                <Button 
                  onClick={() => setIsContactModalOpen(true)} 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white glow-effect border-0"
                >
                  <Phone className="mr-2 h-4 w-4" /> Contact Us
                </Button>
              </div>

            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-blue-400"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="xl:hidden overflow-hidden border-t border-blue-500/20 bg-slate-900"
              >
                <div className="flex flex-col py-4 px-2 space-y-1">

                  {/* Mobile Services Accordion */}
                  <div className="flex flex-col">
                    <button 
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-blue-400 transition-colors"
                    >
                      <span>Services</span>
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden bg-slate-800/40 rounded-lg mx-2 my-1"
                        >
                          <div className="p-4 space-y-5">
                            <div>
                              <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Training Services</p>
                              <div className="space-y-1 pl-3 border-l border-slate-700">
                                <Link to="/training-delivery" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-gray-300 hover:text-white transition-colors">Security Awareness Training</Link>
                                <Link to="/training/comptia-certifications" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-gray-300 hover:text-white transition-colors">Professional Certifications</Link>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Consultancy Services</p>
                              <div className="space-y-1 pl-3 border-l border-slate-700">
                                <Link to="/vciso" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-gray-300 hover:text-white transition-colors">Virtual CISO</Link>
                                <Link to="/dora-compliance" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-gray-300 hover:text-white transition-colors">DORA Compliance Sprint</Link>
                                <Link to="/nis2-compliance" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-gray-300 hover:text-white transition-colors">NIS2 Compliance</Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile Platforms Accordion */}
                  <div className="flex flex-col">
                    <button 
                      onClick={() => setIsPlatformsOpen(!isPlatformsOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-blue-400 transition-colors"
                    >
                      <span>Platforms</span>
                      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isPlatformsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isPlatformsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden bg-slate-800/40 rounded-lg mx-2 my-1"
                        >
                          <div className="p-2 space-y-1">
                            <a href="https://fortifyone.co.uk" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="flex items-center justify-start px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors h-16">
                              <FortifyOneLogo height={22} />
                            </a>
                            <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="flex items-center justify-start px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors h-16">
                              <FortifyLearnLogo height={22} />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive('/about') ? 'text-blue-400 bg-slate-800' : 'text-gray-300 hover:bg-slate-800 hover:text-blue-400'
                    }`}
                  >
                    About
                  </Link>

                  <div className="pt-4 mt-2 px-2 border-t border-slate-800 space-y-3">
                    <Button 
                      onClick={() => { setIsOpen(false); setIsContactModalOpen(true); }}
                      className="w-full justify-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 text-base font-semibold border-0"
                    >
                      <Phone className="mr-2 h-5 w-5" /> Contact Us
                    </Button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <IframeBookingModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        url="https://cy-sec.online" 
      />
    </>
  );
};

export default Navbar;
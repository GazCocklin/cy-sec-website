import React, { useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FortifyLearnLogo from '@/components/logos/FortifyLearnLogo';
import FortifyOneLogo from '@/components/logos/FortifyOneLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [isConsultancyOpen, setIsConsultancyOpen] = useState(false);
  const [isPlatformsOpen, setIsPlatformsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const trainingLinks = [
    { to: '/training-delivery', label: 'Security Awareness Training' },
    { to: '/training/comptia-certifications', label: 'Professional Certifications' },
    { to: '/pbq-engine', label: 'FortifyLearn PBQ Engine' },
  ];

  const consultancyLinks = [
    { to: '/vciso', label: 'Virtual CISO' },
    { to: '/dora-compliance', label: 'DORA Compliance Sprint' },
    { to: '/nis2-compliance', label: 'NIS2 Compliance' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0 mr-6">
              <img
                src="/logos/cysec-logo.svg"
                alt="Cy-Sec Awareness and Consultancy Ltd"
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden xl:flex items-center space-x-1">

              {/* Training Services */}
              <div className="relative group">
                <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  Training Services
                  <ChevronDown className="ml-1.5 h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="w-64 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    <div className="px-4 pt-4 pb-2">
                      <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Training Services</p>
                      <div className="space-y-0.5">
                        {trainingLinks.map(l => (
                          <Link key={l.to} to={l.to}
                            className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="h-px bg-white/5 mx-4 mb-2" />
                    <div className="px-4 pb-4">
                      <p className="text-[10px] text-gray-500 px-3">CompTIA & CertNexus Authorised</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultancy Services */}
              <div className="relative group">
                <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  Consultancy Services
                  <ChevronDown className="ml-1.5 h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="w-64 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    <div className="px-4 pt-4 pb-4">
                      <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">Consultancy Services</p>
                      <div className="space-y-0.5">
                        {consultancyLinks.map(l => (
                          <Link key={l.to} to={l.to}
                            className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platforms */}
              <div className="relative group">
                <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  Platforms
                  <ChevronDown className="ml-1.5 h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="w-64 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden p-3 space-y-2">
                    <a href="https://fortifyone.co.uk" target="_blank" rel="noopener noreferrer"
                      className="flex items-center px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/[0.08]">
                      <FortifyOneLogo height={26} />
                    </a>
                    <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                      className="flex items-center px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/[0.08]">
                      <FortifyLearnLogo height={26} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-px h-5 bg-white/10 mx-2" />

              <Button
                onClick={() => navigate('/contact')}
                size="sm"
                className="bg-[#1A56DB] hover:bg-[#1e3a8a] text-white border-0 shadow-sm font-medium"
              >
                Contact Us
              </Button>
            </div>

            {/* Mobile toggle */}
            <div className="xl:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="xl:hidden overflow-hidden border-t border-white/10 bg-slate-900"
              >
                <div className="flex flex-col py-4 px-2 space-y-1">

                  {/* Mobile Training Services */}
                  <div>
                    <button onClick={() => setIsTrainingOpen(!isTrainingOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-slate-800 hover:text-white transition-colors">
                      <span>Training Services</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isTrainingOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isTrainingOpen && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          className="overflow-hidden">
                          <div className="mx-2 my-1 bg-slate-800/50 rounded-lg p-3 space-y-0.5">
                            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest px-3 py-1 mb-1">Training Services</p>
                            {trainingLinks.map(l => (
                              <Link key={l.to} to={l.to} onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                                {l.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile Consultancy Services */}
                  <div>
                    <button onClick={() => setIsConsultancyOpen(!isConsultancyOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-slate-800 hover:text-white transition-colors">
                      <span>Consultancy Services</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isConsultancyOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isConsultancyOpen && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          className="overflow-hidden">
                          <div className="mx-2 my-1 bg-slate-800/50 rounded-lg p-3 space-y-0.5">
                            <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 mb-1">Consultancy Services</p>
                            {consultancyLinks.map(l => (
                              <Link key={l.to} to={l.to} onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                                {l.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile Platforms */}
                  <div>
                    <button onClick={() => setIsPlatformsOpen(!isPlatformsOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-slate-800 hover:text-white transition-colors">
                      <span>Platforms</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isPlatformsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isPlatformsOpen && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          className="overflow-hidden">
                          <div className="mx-2 my-1 bg-slate-800/50 rounded-lg p-3 space-y-2">
                            <a href="https://fortifyone.co.uk" target="_blank" rel="noopener noreferrer"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/[0.08]">
                              <FortifyOneLogo height={26} />
                            </a>
                            <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/[0.08]">
                              <FortifyLearnLogo height={26} />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-3 px-2 border-t border-white/10">
                    <Button onClick={() => { setIsOpen(false); navigate('/contact'); }}
                      className="w-full bg-[#1A56DB] hover:bg-[#1e3a8a] text-white py-5 border-0 font-medium">
                      Contact Us
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

    </>
  );
};

export default Navbar;

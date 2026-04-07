import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Shield, BookOpen, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import IframeBookingModal from './IframeBookingModal';

const HeroCard = ({ icon: Icon, label, value, colour }) => (
  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3">
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colour}`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div>
      <p className="text-white/60 text-xs leading-none mb-0.5">{label}</p>
      <p className="text-white font-semibold text-sm leading-none">{value}</p>
    </div>
  </div>
);

const LandingPageHero = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background — lighter gradient, not pitch black */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0D2040 40%, #0A2A4A 70%, #061428 100%)' }} />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1698337313210-baf78bfa4f05)', backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'luminosity' }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(#1A56DB 1px, transparent 1px), linear-gradient(to right, #1A56DB 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      {/* Accent glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-400/30 rounded-full px-4 py-1.5">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium">UK Cybersecurity Practice</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight">
              Cybersecurity<br />
              Leadership.<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #06B6D4, #1A56DB)' }}>
                Compliance.<br />Training.
              </span>
            </h1>

            <p className="text-lg text-white/70 max-w-lg leading-relaxed">
              One partner. Board-level vCISO guidance, DORA &amp; NIS2 readiness, CompTIA certified training, and the FortifyOne compliance platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#1A56DB] hover:bg-[#1e40af] text-white px-7 py-5 text-base font-semibold border-0 shadow-lg shadow-blue-900/40"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book a Discovery Call
              </Button>
              <Button
                onClick={() => navigate('/vciso')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-7 py-5 text-base font-medium bg-transparent"
              >
                Explore Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Right — floating service cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Main card */}
            <div className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Virtual CISO</p>
                  <p className="text-white/50 text-sm">From £995/month · FortifyOne included</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[['ISO 27001','Automated'],['DORA','Compliant'],['NIS2','Active']].map(([fw, status]) => (
                  <div key={fw} className="bg-white/[0.06] border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-white text-xs font-semibold">{fw}</p>
                    <p className="text-cyan-400 text-xs mt-0.5">{status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Two smaller cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mb-3">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-white font-semibold text-sm">PBQ Simulator</p>
                <p className="text-white/50 text-xs mt-1">Live Cisco IOS topology</p>
                <button onClick={() => navigate('/pbq-engine')} className="mt-3 text-cyan-400 text-xs font-medium hover:text-cyan-300 flex items-center gap-1">
                  Try free <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mb-3">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-white font-semibold text-sm">CompTIA Training</p>
                <p className="text-white/50 text-xs mt-1">Security+, CySA+, Network+</p>
                <button onClick={() => navigate('/training/comptia-certifications')} className="mt-3 text-blue-400 text-xs font-medium hover:text-blue-300 flex items-center gap-1">
                  View courses <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <IframeBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} url="https://cy-sec.online" />
    </section>
  );
};

export default LandingPageHero;

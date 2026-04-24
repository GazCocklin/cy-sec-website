import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react';
import FortifyLearnLogo from '@/components/logos/FortifyLearnLogo';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';

const FL_FEATURES = [
  'Mock exams — PBQs + MCQs under one combined timer',
  '10 hands-on labs per cert with live CLI & visual tools',
  '1,000 MCQs per cert with full reasoning',
  'Lifetime access · no subscription · 14-day refund',
];

export default function LandingPageHero() {
  const navigate = useNavigate();

  return (
    <section className="relative flex items-center pt-20 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #060e1f 0%, #0B1D3A 55%, #0e3a5a 100%)' }} />

      {/* Photo texture */}
      <div className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1698337313210-baf78bfa4f05)',
          backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'luminosity',
        }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(8,145,178,1) 1px, transparent 1px), linear-gradient(to right, rgba(8,145,178,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

      {/* Glow */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.15) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ── LEFT: copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-7"
          >
            {/* Brand pill — replaces old Bubble-style header strip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase"
              style={{ background: 'rgba(8,145,178,0.15)', borderColor: 'rgba(8,145,178,0.35)', color: '#7DD3E8' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]" />
              Cy-Sec Awareness and Consultancy Ltd
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-white leading-[1.05]"
              style={{ letterSpacing: '-2px' }}>
              Cybersecurity<br />
              Leadership.<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #7DD3E8, #0891B2)' }}>
                Compliance.<br />Training.
              </span>
            </h1>

            <p className="text-[17px] text-white/60 max-w-lg leading-relaxed">
              One partner. Board-level vCISO guidance, DORA &amp; NIS2 readiness,
              CompTIA certified training, and purpose-built security platforms.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/contact')}
                className="text-white px-7 py-5 text-base font-bold border-0 shadow-lg hover:brightness-110 transition-all"
                style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}
              >
                <Calendar className="mr-2 h-4 w-4" />Book a Discovery Call
              </Button>
              <Button
                onClick={() => navigate('/vciso')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-7 py-5 text-base font-semibold bg-transparent"
              >
                Explore Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap gap-5 pt-1">
              {[
                'CompTIA Authorised Partner',
                'CertNexus Authorised Partner',
                'One-time purchase · No subscription',
              ].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(8,145,178,0.6)' }} />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: FortifyLearn showcase card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #071326 0%, #0B2540 60%, #0a3d5c 100%)' }}
          >
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(to right, #0891B2 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(8,145,178,0.25)' }} />

            {/* Main screenshot */}
            <div className="relative mx-5 mt-5 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10"
                style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="text-[10px] text-white/30 ml-2 font-mono">FortifyLearn — Live Lab</span>
              </div>
              <img
                src="/screenshots/fl-terminal.png"
                alt="FortifyLearn — Live CLI lab environment"
                className="w-full object-cover"
                style={{ maxHeight: 180, objectPosition: 'top' }}
              />
            </div>

            {/* Tool preview thumbnails */}
            <div className="grid grid-cols-3 gap-1.5 mx-5 mt-2">
              {[
                { img: '/screenshots/fl-siem.png', lbl: 'Arclight SIEM', cert: 'CySA+' },
                { img: '/screenshots/fl-exam-results.png', lbl: 'Mock Exam · Scored', cert: 'All certs' },
                { img: '/screenshots/fl-fortiguard.png', lbl: 'FORTIGUARD Auditor', cert: 'Sec+' },
              ].map(t => (
                <div key={t.lbl} className="relative rounded-lg overflow-hidden border border-white/10">
                  <img src={t.img} alt={t.lbl} className="w-full object-cover object-top" style={{ height: 72 }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,14,31,0.85) 0%, transparent 60%)' }} />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-end justify-between gap-1">
                    <span className="text-[8px] font-bold text-white/70 truncate">{t.lbl}</span>
                    <span className="text-[8px] font-bold flex-shrink-0" style={{ color: '#7DD3E8' }}>{t.cert}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Card content */}
            <div className="relative p-6">
              <div className="mb-4">
                <FortifyLearnLogo height={36} />
              </div>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                The complete CompTIA exam prep stack for Network+, Security+ and CySA+ — live CLI
                labs, interactive tools, an MCQ study bank, and mock exams that mirror the real
                test structure.
              </p>
              <div className="space-y-2 mb-5">
                {FL_FEATURES.map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                    <span className="text-slate-400 text-xs">{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Link to="/store"
                  className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff' }}>
                  Shop prep bundles →
                </Link>
                <Link to="/pbq-engine"
                  className="text-sm font-semibold transition-colors hover:text-white"
                  style={{ color: '#0891B2' }}>
                  View all labs →
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

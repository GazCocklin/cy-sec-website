import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle, ExternalLink } from 'lucide-react';
import FortifyLearnLogo from '@/components/logos/FortifyLearnLogo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FL_FEATURES = [
  'Representative CLI environments for N+, Sec+, CySA+',
  'Objective-by-objective scoring & detailed results',
  'Free taster labs — no payment needed to start',
];

export default function LandingPageHero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, #0a85ae 0%, #0a5c8a 35%, #0B1D3A 75%, #071326 100%)' }} />

      {/* Photo texture */}
      <div className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1698337313210-baf78bfa4f05)',
          backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'luminosity',
        }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(to right, #0891B2 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

      {/* Glow */}
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.2) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ── LEFT: copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-7"
          >
            {/* Brand identity — prominent */}
            <div className="flex items-center gap-3">
              <img src="/logos/cysec-logo-dark.svg" alt="Cy-Sec"
                className="h-10 w-auto"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div className="h-6 w-px bg-white/20" />
              <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">
                Awareness and Consultancy Ltd
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight"
              style={{ fontFamily: 'Bricolage Grotesque, Inter, system-ui, sans-serif' }}>
              Cybersecurity<br />
              Leadership.<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #22d3ee, #0891B2)' }}>
                Compliance.<br />Training.
              </span>
            </h1>

            <p className="text-lg text-white/65 max-w-lg leading-relaxed">
              One partner. Board-level vCISO guidance, DORA &amp; NIS2 readiness,
              CompTIA certified training, and purpose-built security platforms.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/contact')}
                className="text-white px-7 py-5 text-base font-semibold border-0 shadow-lg hover:brightness-110 transition-all"
                style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}
              >
                <Calendar className="mr-2 h-4 w-4" />Book a Discovery Call
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

          {/* ── RIGHT: FortifyLearn showcase card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #071326 0%, #0B2540 60%, #0a3d5c 100%)' }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(to right, #0891B2 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(8,145,178,0.25)' }} />

            {/* Real FL screenshot */}
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
                style={{ maxHeight: 220, objectPosition: 'top' }}
              />
            </div>

            {/* Card content */}
            <div className="relative p-6">
              <div className="mb-4">
                <FortifyLearnLogo height={36} />
              </div>

              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Performance-based question simulator with live CLI environments.
                Study for Network+, Security+ and CySA+ the way you'll actually be tested.
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
                <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff' }}>
                  Try FortifyLearn <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a href="/store"
                  className="text-sm font-semibold transition-colors hover:text-white"
                  style={{ color: '#0891B2' }}>
                  Buy a pack →
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Shield, FileCheck, BookOpen, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CARDS = [
  {
    icon: Shield,
    title: 'Virtual CISO',
    desc: 'Board-level security leadership on demand',
    tag: 'from £995/mo',
    href: '/vciso',
    external: false,
  },
  {
    icon: FileCheck,
    title: 'DORA & NIS2',
    desc: 'Fixed-price compliance sprints',
    tag: 'Regulatory',
    href: '/dora-compliance',
    external: false,
  },
  {
    icon: BookOpen,
    title: 'FortifyLearn',
    desc: 'CompTIA PBQ lab simulations',
    tag: 'Live now',
    href: 'https://fortifylearn.co.uk',
    external: true,
  },
  {
    icon: Cpu,
    title: 'FortifyOne GRC',
    desc: 'Compliance management platform',
    tag: 'from £149/mo',
    href: 'https://fortifyone.co.uk',
    external: true,
  },
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

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(to right, #0891B2 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

      {/* Glow orb */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.18) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── LEFT: copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-7"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#0891B2' }}>
              Cy-Sec Awareness and Consultancy Ltd
            </p>

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

          {/* ── RIGHT: service cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {CARDS.map(({ icon: Icon, title, desc, tag, href, external }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                onClick={() => external ? window.open(href, '_blank') : navigate(href)}
                className="group rounded-2xl p-5 cursor-pointer transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(8,145,178,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(8,145,178,0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-white text-sm mb-1">{title}</p>
                <p className="text-xs text-white/50 leading-relaxed mb-4">{desc}</p>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(8,145,178,0.15)', color: '#22d3ee' }}>
                  {tag}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

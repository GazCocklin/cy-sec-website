import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Zap, Star } from 'lucide-react';

const packs = [
  {
    name: 'Network+ PBQ Pack',
    code: 'N10-009',
    cert: 'CompTIA Network+',
    labs: 3,
    price: '£12.99',
    fullPrice: '£14.99',
    accent: '#EF4444',
    accentLight: 'rgba(239,68,68,0.1)',
    scenarios: [
      'ACL misconfiguration troubleshooting',
      'Multi-VLAN routing failure',
      'Enterprise multi-fault recovery',
    ],
    href: 'https://fortifylearn.co.uk',
    featured: false,
  },
  {
    name: 'N+ & Sec+ Bundle',
    code: 'N10-009 + SY0-701',
    cert: 'Network+ and Security+',
    labs: 7,
    price: '£19.99',
    fullPrice: '£24.99',
    accent: '#1A56DB',
    accentLight: 'rgba(26,86,219,0.12)',
    scenarios: [
      'All 7 labs — complete coverage',
      'Full Cisco IOS + Linux topology',
      'Best value for dual-cert candidates',
    ],
    href: 'https://fortifylearn.co.uk',
    featured: true,
    badge: 'Best Value',
  },
  {
    name: 'Security+ PBQ Pack',
    code: 'SY0-701',
    cert: 'CompTIA Security+',
    labs: 4,
    price: '£12.99',
    fullPrice: '£14.99',
    accent: '#8B5CF6',
    accentLight: 'rgba(139,92,246,0.1)',
    scenarios: [
      'SSH hardening simulation',
      'Legacy service exposure',
      'Privilege escalation scenario',
      'Post-pentest remediation',
    ],
    href: 'https://fortifylearn.co.uk',
    featured: false,
  },
];

const PBQPacksSection = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 my-8">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="mb-10"
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(26,86,219,0.1)', border: '1px solid rgba(26,86,219,0.25)', color: '#1A56DB' }}>
            <Terminal size={11}/> Powered by FortifyLearn
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#10B981' }}>
            <Zap size={11}/> Early access pricing
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-3" style={{ letterSpacing: '-0.02em' }}>
              Master the Part That{' '}
              <span className="gradient-text-purple">Fails Most Candidates.</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Performance-based questions account for{' '}
              <strong className="text-slate-800">up to 30% of your CompTIA exam score.</strong>{' '}
              They can't be guessed — they require real CLI skills in a live environment.
              Practise with actual Cisco IOS topology before exam day.
            </p>
          </div>
          <a
            href="https://fortifylearn.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 border border-slate-300 hover:border-slate-400 hover:text-slate-800 transition-all"
          >
            Try free labs first <ArrowRight size={14}/>
          </a>
        </div>
      </motion.div>

      {/* Pack cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {packs.map((pack, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: pack.featured ? '#05101F' : 'white',
              border: `1.5px solid ${pack.featured ? pack.accent + '60' : '#e2e8f0'}`,
              boxShadow: pack.featured ? `0 8px 32px ${pack.accent}20` : '0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            {/* Top accent bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${pack.accent}cc, ${pack.accent})` }}/>

            {/* Badge */}
            {pack.badge && (
              <div className="absolute top-5 right-5 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                style={{ background: pack.accent, color: 'white' }}>
                <Star size={9} fill="white"/> {pack.badge}
              </div>
            )}

            <div className="p-7 flex flex-col flex-grow">

              {/* Cert code badge */}
              <span className="inline-block text-xs font-bold px-2.5 py-1 rounded mb-3 self-start"
                style={{ background: pack.accentLight, color: pack.accent, border: `1px solid ${pack.accent}30` }}>
                {pack.code}
              </span>

              {/* Name */}
              <h3 className="font-bold text-xl mb-1" style={{ color: pack.featured ? 'white' : '#1e293b', letterSpacing: '-0.01em' }}>
                {pack.name}
              </h3>
              <p className="text-sm mb-5" style={{ color: pack.featured ? '#94A3B8' : '#64748b' }}>
                {pack.labs} hands-on PBQ simulations · One-time purchase
              </p>

              {/* Scenarios */}
              <ul className="space-y-2.5 mb-6 flex-grow">
                {pack.scenarios.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm"
                    style={{ color: pack.featured ? '#CBD5E1' : '#475569' }}>
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: pack.accentLight, color: pack.accent }}>✓</span>
                    {s}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black" style={{ color: pack.featured ? 'white' : '#1e293b' }}>
                  {pack.price}
                </span>
                <span className="text-sm line-through" style={{ color: pack.featured ? '#64748B' : '#94a3b8' }}>
                  {pack.fullPrice}
                </span>
                <span className="text-xs font-semibold" style={{ color: '#10B981' }}>Early access</span>
              </div>

              {/* CTA */}
              <a
                href={pack.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${pack.accent}cc, ${pack.accent})`,
                  boxShadow: `0 4px 14px ${pack.accent}35`,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow=`0 6px 20px ${pack.accent}55`; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=`0 4px 14px ${pack.accent}35`; }}
              >
                Buy Pack — {pack.price} <ArrowRight size={14}/>
              </a>
              <p className="text-center text-xs mt-2" style={{ color: pack.featured ? '#475569' : '#94a3b8' }}>
                Instant access on FortifyLearn
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Free labs banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 rounded-xl"
        style={{
          background: 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.2)',
        }}
      >
        <div>
          <p className="font-semibold text-slate-700">Try before you buy — two labs are always free</p>
          <p className="text-sm text-slate-500">One Network+ and one Security+ lab are free. Just enter your email to get started — no card needed.</p>
        </div>
        <a
          href="https://fortifylearn.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
          style={{ color: '#10B981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(16,185,129,0.1)'}
        >
          Start free labs <ArrowRight size={13}/>
        </a>
      </motion.div>
    </div>
  </section>
);

export default PBQPacksSection;

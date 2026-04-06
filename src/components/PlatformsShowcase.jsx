import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Shield, CheckCircle, BarChart3, Zap } from 'lucide-react';
import FortifyLearnLogo from '@/components/logos/FortifyLearnLogo';
import FortifyOneLogo from '@/components/logos/FortifyOneLogo';

/* ── Mini SVG mockups ─────────────────────────────────────── */

const FortifyLearnMockup = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    {/* Terminal window chrome */}
    <rect width="320" height="180" rx="8" fill="#030D18"/>
    <rect width="320" height="28" rx="8" fill="#071624"/>
    <rect y="20" width="320" height="8" fill="#071624"/>
    {/* Traffic lights */}
    <circle cx="14" cy="14" r="4" fill="#EF4444" opacity="0.7"/>
    <circle cx="26" cy="14" r="4" fill="#F59E0B" opacity="0.7"/>
    <circle cx="38" cy="14" r="4" fill="#10B981" opacity="0.7"/>
    {/* Tab label */}
    <text x="120" y="18" fontFamily="monospace" fontSize="9" fill="#64748B">ROUTER-01 · Cisco IOS</text>
    {/* Left panel - commands */}
    <rect x="0" y="28" width="90" height="152" fill="#071624"/>
    <text x="8" y="46" fontFamily="monospace" fontSize="7" fill="#93C5FD" letterSpacing="1">COMMANDS</text>
    {['show ip route', 'show access-list', 'ping 192.168.1.1', 'traceroute', 'show run'].map((cmd, i) => (
      <g key={i}>
        <rect x="4" y={54 + i * 20} width="82" height="16" rx="3" fill="rgba(26,86,219,0.08)" stroke="rgba(26,86,219,0.2)" strokeWidth="0.5"/>
        <text x="9" y={65 + i * 20} fontFamily="monospace" fontSize="7" fill="#7BA3C8">{cmd}</text>
      </g>
    ))}
    {/* Main terminal */}
    <rect x="90" y="28" width="230" height="152" fill="#030D18"/>
    {/* Terminal lines */}
    <text x="96" y="50" fontFamily="monospace" fontSize="8" fill="#22C55E">Router#</text>
    <text x="132" y="50" fontFamily="monospace" fontSize="8" fill="#E2E8F0">show access-lists</text>
    <text x="96" y="64" fontFamily="monospace" fontSize="7" fill="#64748B">Extended IP access list 101</text>
    <text x="96" y="76" fontFamily="monospace" fontSize="7" fill="#4ADE80">  10 permit ip 192.168.1.0 0.0.0.255 any</text>
    <text x="96" y="88" fontFamily="monospace" fontSize="7" fill="#F87171">  20 deny   ip 192.168.2.0 0.0.0.255 any</text>
    <text x="96" y="100" fontFamily="monospace" fontSize="7" fill="#4ADE80">  30 permit ip any any</text>
    <text x="96" y="116" fontFamily="monospace" fontSize="8" fill="#22C55E">Router#</text>
    <text x="132" y="116" fontFamily="monospace" fontSize="8" fill="#E2E8F0">ping 8.8.8.8</text>
    <text x="96" y="130" fontFamily="monospace" fontSize="7" fill="#67E8F9">Type escape sequence to abort.</text>
    <text x="96" y="142" fontFamily="monospace" fontSize="7" fill="#4ADE80">!!!!!  Success rate is 100%</text>
    {/* Prompt */}
    <text x="96" y="162" fontFamily="monospace" fontSize="8" fill="#22C55E">Router#</text>
    <rect x="135" y="155" width="6" height="9" rx="1" fill="#06B6D4" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0;0.8" dur="1.2s" repeatCount="indefinite"/>
    </rect>
  </svg>
);

const FortifyOneMockup = () => (
  <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <rect width="320" height="180" rx="8" fill="#05101F"/>
    {/* Top bar */}
    <rect width="320" height="36" fill="#071624"/>
    <text x="16" y="22" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#E2EEF9">Compliance Dashboard</text>
    <rect x="246" y="10" width="60" height="16" rx="8" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5"/>
    <circle cx="256" cy="18" r="3" fill="#10B981"/>
    <text x="262" y="22" fontFamily="sans-serif" fontSize="7" fill="#10B981">All systems</text>
    {/* Score ring */}
    <circle cx="60" cy="112" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
    <circle cx="60" cy="112" r="38" fill="none" stroke="url(#score-grad)" strokeWidth="8"
      strokeDasharray="214 239" strokeLinecap="round" transform="rotate(-90 60 112)"/>
    <text x="60" y="107" fontFamily="sans-serif" fontSize="18" fontWeight="900" fill="#E2EEF9" textAnchor="middle">89%</text>
    <text x="60" y="120" fontFamily="sans-serif" fontSize="8" fill="#10B981" textAnchor="middle">Excellent</text>
    <text x="60" y="132" fontFamily="sans-serif" fontSize="7" fill="#64748B" textAnchor="middle">Maturity Score</text>
    {/* Framework bars */}
    {[
      { name: 'ISO 27001', val: 87, color: '#1A56DB' },
      { name: 'DORA',      val: 94, color: '#06B6D4' },
      { name: 'NIS2',      val: 78, color: '#8B5CF6' },
      { name: 'NIST CSF',  val: 91, color: '#10B981' },
    ].map((f, i) => (
      <g key={i}>
        <text x="116" y={60 + i * 28} fontFamily="sans-serif" fontSize="8" fill="#94A3B8">{f.name}</text>
        <rect x="116" y={65 + i * 28} width="180" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
        <rect x="116" y={65 + i * 28} width={180 * f.val / 100} height="6" rx="3" fill={f.color} opacity="0.85"/>
        <text x="302" y={72 + i * 28} fontFamily="sans-serif" fontSize="8" fill="#E2EEF9" textAnchor="end">{f.val}%</text>
      </g>
    ))}
    {/* Bottom badges */}
    {['6 Frameworks', '47 Controls', '12 Vendors'].map((b, i) => (
      <g key={i}>
        <rect x={10 + i * 102} y="155" width="94" height="18" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(26,86,219,0.2)" strokeWidth="0.5"/>
        <text x={57 + i * 102} y="167" fontFamily="sans-serif" fontSize="8" fontWeight="600" fill="#94A3B8" textAnchor="middle">{b}</text>
      </g>
    ))}
    <defs>
      <linearGradient id="score-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1A56DB"/>
        <stop offset="100%" stopColor="#06B6D4"/>
      </linearGradient>
    </defs>
  </svg>
);

/* ── Main component ───────────────────────────────────────── */

const platforms = [
  {
    Logo: FortifyLearnLogo,
    Mockup: FortifyLearnMockup,
    tagline: 'CompTIA PBQ Simulator',
    href: 'https://fortifylearn.co.uk',
    accent: '#1A56DB',
    accentDark: '#1E3A8A',
    accentLight: 'rgba(26,86,219,0.12)',
    border: 'rgba(26,86,219,0.25)',
    borderHov: 'rgba(26,86,219,0.45)',
    desc: 'Performance-based question simulations for CompTIA Network+ and Security+. Live Cisco IOS topology, real CLI commands, study and exam modes.',
    stats: [
      { icon: Terminal, label: 'Live topology' },
      { icon: Zap,      label: 'Free to start' },
    ],
    features: [
      'Live Cisco IOS & Linux environment',
      'Study mode with guided hints',
      'Objective-by-objective scoring',
    ],
    cta: 'Try FortifyLearn →',
  },
  {
    Logo: FortifyOneLogo,
    Mockup: FortifyOneMockup,
    tagline: 'GRC Compliance Platform',
    href: 'https://fortifyone.co.uk',
    accent: '#06B6D4',
    accentDark: '#0E7490',
    accentLight: 'rgba(6,182,212,0.10)',
    border: 'rgba(6,182,212,0.22)',
    borderHov: 'rgba(6,182,212,0.45)',
    desc: 'ISO 27001:2022, NIST CSF 2.0, GDPR, SOC 2, DORA, and NIS2 compliance automation. Gap analysis, evidence collection, and audit-ready reports.',
    stats: [
      { icon: Shield,   label: '6 frameworks' },
      { icon: BarChart3, label: 'From £149/mo' },
    ],
    features: [
      'Automated evidence collection',
      'Vendor risk management',
      'DPIA & FRIA tools built-in',
    ],
    cta: 'Explore FortifyOne →',
  },
];

const PlatformsShowcase = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(180deg, #060b18 0%, #07101e 100%)' }}>
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#06B6D4' }}>
          Our Platforms
        </p>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
          Built by Practitioners.{' '}
          <span style={{
            background: 'linear-gradient(135deg, #1A56DB, #06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Used by Professionals.
          </span>
        </h2>
        <p className="text-lg text-slate-400 max-w-xl mx-auto">
          Two platforms that extend Cy-Sec's reach — available independently 
          or as part of a managed vCISO engagement.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {platforms.map(({ Logo, Mockup, tagline, href, accent, accentDark, accentLight, border, borderHov, desc, stats, features, cta }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="group rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${border}`,
              transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = borderHov;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 20px 48px ${accent}18`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = border;
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Top gradient bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${accentDark}, ${accent})` }}/>

            {/* Card body */}
            <div className="p-7 flex flex-col flex-grow">

              {/* Logo + tagline */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <Logo height={30}/>
                  <p className="text-xs font-semibold mt-1.5" style={{ color: accent, letterSpacing: '0.06em' }}>
                    {tagline}
                  </p>
                </div>
                <div className="flex gap-3">
                  {stats.map(({ icon: Icon, label }, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: accentLight, border: `1px solid ${border}`, color: accent }}>
                      <Icon size={11}/>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mockup */}
              <div className="rounded-xl overflow-hidden mb-5 ring-1" style={{ ringColor: border }}>
                <Mockup/>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{desc}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-grow">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <CheckCircle size={13} style={{ color: accent, flexShrink: 0 }}/>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${accentDark}, ${accent})`,
                  boxShadow: `0 4px 16px ${accent}30`,
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 6px 24px ${accent}50`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 4px 16px ${accent}30`; e.currentTarget.style.transform = 'none'; }}
              >
                {cta} <ArrowRight size={14}/>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PlatformsShowcase;

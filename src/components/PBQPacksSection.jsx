import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Zap, CheckCircle2, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const packs = [
  {
    name: 'Network+ PBQ Pack',
    code: 'N10-009',
    cert: 'CompTIA Network+',
    labs: 5,
    price: '£19.99',
    fullPrice: '£24.99',
    accent: '#0891B2',
    accentLight: 'rgba(8,145,178,0.1)',
    logo: '/logos/comptia-network-plus.svg',
    scenarios: [
      'DNS server misconfiguration',
      'Default gateway fault diagnosis',
      'DMZ ACL troubleshooting',
      'Dual ACL fault — multi-VLAN routing',
      'Enterprise multi-fault recovery',
    ],
    featured: false,
  },
  {
    name: 'All Access Bundle',
    code: 'N10-009 + SY0-701 + CS0-003',
    cert: 'Network+ · Security+ · CySA+',
    labs: 15,
    price: '£39.99',
    fullPrice: '£59.97',
    accent: '#1A56DB',
    accentLight: 'rgba(26,86,219,0.12)',
    logo: null,
    scenarios: [
      'All 15 labs — complete coverage',
      'Full Cisco IOS + Linux topology',
      'Best value — save £19.98',
    ],
    featured: true,
    badge: 'Best Value',
  },
  {
    name: 'Security+ PBQ Pack',
    code: 'SY0-701',
    cert: 'CompTIA Security+',
    labs: 5,
    price: '£19.99',
    fullPrice: '£24.99',
    accent: '#0891B2',
    accentLight: 'rgba(8,145,178,0.1)',
    logo: '/logos/comptia-security-plus.svg',
    scenarios: [
      'Firewall rule blocking HTTPS traffic',
      'Sensitive file permission hardening',
      'Insecure legacy service exposure',
      'Privilege escalation & audit failure',
      'Post-pentest remediation',
    ],
    featured: false,
  },
];

const PBQPacksSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 my-8">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(8,145,178,0.1)', border: '1px solid rgba(8,145,178,0.25)', color: '#0891B2' }}>
              <Terminal size={11} /> Powered by FortifyLearn
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#10B981' }}>
              <Zap size={11} /> Early access pricing
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
            <button
              onClick={() => navigate('/store')}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 border border-slate-300 hover:border-slate-400 hover:text-slate-800 transition-all"
            >
              View all packs <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
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
              <div style={{ height: 3, background: `linear-gradient(90deg, ${pack.accent}cc, ${pack.accent})` }} />

              {pack.badge && (
                <div className="absolute top-5 right-5 px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: pack.accent, color: 'white' }}>
                  {pack.badge}
                </div>
              )}

              <div className="p-7 flex flex-col flex-grow">
                {pack.logo && (
                  <img src={pack.logo} alt={pack.cert} className="w-10 h-10 object-contain mb-3" />
                )}
                {pack.featured && (
                  <div className="flex gap-2 mb-3">
                    {['/logos/comptia-network-plus.svg', '/logos/comptia-security-plus.svg', '/logos/comptia-cysa-plus.svg'].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-7 h-7 object-contain" />
                    ))}
                  </div>
                )}

                <span className="inline-block text-xs font-bold px-2.5 py-1 rounded mb-3 self-start"
                  style={{ background: pack.accentLight, color: pack.accent, border: `1px solid ${pack.accent}30` }}>
                  {pack.code}
                </span>

                <h3 className="font-bold text-xl mb-1" style={{ color: pack.featured ? 'white' : '#1e293b', letterSpacing: '-0.01em' }}>
                  {pack.name}
                </h3>
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center gap-1 text-xs" style={{ color: pack.featured ? '#94A3B8' : '#64748b' }}>
                    <BookOpen size={11} style={{ color: pack.accent }} />
                    <strong style={{ color: pack.featured ? '#CBD5E1' : '#475569' }}>{pack.labs}</strong> labs
                  </span>
                  <span className="text-xs" style={{ color: pack.featured ? '#64748b' : '#94a3b8' }}>Easy → Expert</span>
                </div>

                <ul className="space-y-2.5 mb-6 flex-grow">
                  {pack.scenarios.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm"
                      style={{ color: pack.featured ? '#CBD5E1' : '#475569' }}>
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: pack.accent }} />
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-black" style={{ color: pack.featured ? 'white' : '#1e293b' }}>
                    {pack.price}
                  </span>
                  <span className="text-sm line-through" style={{ color: pack.featured ? '#64748B' : '#94a3b8' }}>
                    {pack.fullPrice}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: '#10B981' }}>Early access</span>
                </div>

                <button
                  onClick={() => navigate('/store')}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${pack.accent}cc, ${pack.accent})`,
                    boxShadow: `0 4px 14px ${pack.accent}35`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                >
                  Buy Pack — {pack.price} <ArrowRight size={14} />
                </button>
                <p className="text-center text-xs mt-2" style={{ color: pack.featured ? '#475569' : '#94a3b8' }}>
                  One-time · 12 months access · Instant access
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CySA+ teaser */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 rounded-xl"
          style={{ background: 'rgba(8,145,178,0.06)', border: '1px solid rgba(8,145,178,0.2)' }}
        >
          <div className="flex items-center gap-3">
            <img src="/logos/comptia-cysa-plus.svg" alt="CySA+" className="w-8 h-8 object-contain" />
            <div>
              <p className="font-semibold text-slate-700 text-sm">CySA+ CS0-003 pack also available</p>
              <p className="text-xs text-slate-500">5 threat-hunt labs — web shells, APTs, C2 detection &amp; more.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/store')}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
            style={{ color: '#0891B2', background: 'rgba(8,145,178,0.1)', border: '1px solid rgba(8,145,178,0.25)' }}
          >
            View all packs in store <ArrowRight size={13} />
          </button>
        </motion.div>

        {/* Free labs banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 rounded-xl"
          style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          <div>
            <p className="font-semibold text-slate-700">Try before you buy — taster labs are always free</p>
            <p className="text-sm text-slate-500">Two Network+ tasters (CLI + visual) and one Security+ taster — free. Just enter your email, no card needed.</p>
          </div>
          <a
            href="https://fortifylearn.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
            style={{ color: '#10B981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
          >
            Start free labs <ArrowRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PBQPacksSection;

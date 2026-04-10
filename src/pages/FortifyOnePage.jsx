import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3, CheckCircle, Shield, FileText, AlertTriangle,
  Users, Lock, ArrowRight, Globe, Layers, ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURES = [
  {
    icon: Layers,
    title: 'Multi-Framework Compliance',
    desc: 'Manage ISO 27001, DORA, NIS2, NIST CSF 2.0, GDPR, SOC 2 and Cyber Essentials from a single platform. No more spreadsheets.',
  },
  {
    icon: BarChart3,
    title: 'Gap Analysis & Dashboards',
    desc: 'Instantly see your compliance posture across every framework. Colour-coded dashboards show where you stand and what needs attention.',
  },
  {
    icon: AlertTriangle,
    title: 'Vendor Risk Management',
    desc: 'Assess, track and manage third-party risk. Vendor questionnaires, scoring, and risk register built in — not bolted on.',
  },
  {
    icon: FileText,
    title: 'DPIA & Privacy Tools',
    desc: 'Data Protection Impact Assessments, Records of Processing Activities, and breach management — all GDPR-aligned and audit-ready.',
  },
  {
    icon: ClipboardList,
    title: 'Audit-Ready Reports',
    desc: 'Generate board-level executive summaries or detailed auditor reports at the click of a button. Evidence mapped, formatted, and exportable.',
  },
  {
    icon: Users,
    title: 'Built for SMEs',
    desc: 'Enterprise-grade GRC without enterprise complexity or pricing. Designed for organisations of 50–500 people who need to move fast.',
  },
];

const FRAMEWORKS = [
  'ISO 27001', 'DORA', 'NIS2', 'NIST CSF 2.0', 'GDPR',
  'SOC 2', 'Cyber Essentials', 'NIST SP 800-53',
];

const PRICING = [
  {
    name: 'Standalone',
    price: '£149',
    period: '/month',
    desc: 'Full platform access — manage your compliance posture independently.',
    features: ['All frameworks included', 'Gap analysis & dashboards', 'Vendor risk management', 'DPIA & privacy tools', 'Audit-ready reports', 'Up to 3 users'],
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'vCISO Included',
    price: 'Included',
    period: '',
    desc: 'FortifyOne is included at no extra cost with every Cy-Sec vCISO engagement.',
    features: ['Everything in Standalone', 'Unlimited users', 'Managed by your vCISO', 'Quarterly board reports', 'Regulatory horizon scanning', 'Priority support'],
    cta: 'Talk to us about vCISO',
    highlight: true,
  },
];

const DASHBOARD_ROWS = [
  ['ISO 27001', '87%', true],
  ['DORA', '62%', false],
  ['NIS2', '91%', true],
  ['NIST CSF', '74%', false],
];

export default function FortifyOnePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>FortifyOne GRC Platform — Compliance Management | Cy-Sec</title>
        <meta name="description" content="FortifyOne is a GRC compliance platform covering ISO 27001, DORA, NIS2, NIST CSF 2.0 and GDPR. Gap analysis, vendor risk, DPIA tools and audit-ready reports." />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #071326 0%, #0B1D3A 50%, #071326 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(to right, #0891B2 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(8,145,178,0.12)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-7 h-7" style={{ color: '#0891B2' }} />
                <span className="text-2xl font-black text-white">FortifyOne</span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full ml-1"
                  style={{ background: 'rgba(8,145,178,0.2)', color: '#22d3ee', border: '1px solid rgba(8,145,178,0.3)' }}>
                  GRC Platform
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight"
                style={{ fontFamily: 'Bricolage Grotesque, Inter, system-ui, sans-serif', letterSpacing: '-0.03em' }}>
                Compliance management<br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg, #22d3ee, #0891B2)' }}>
                  built for practitioners.
                </span>
              </h1>

              <p className="text-lg text-white/70 leading-relaxed max-w-lg">
                ISO 27001, DORA, NIS2, NIST CSF 2.0, GDPR — manage all your compliance obligations from one platform.
                Gap analysis, vendor risk, and audit-ready reports out of the box.
              </p>

              <div className="flex flex-wrap gap-2">
                {FRAMEWORKS.slice(0, 5).map(f => (
                  <span key={f} className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(8,145,178,0.15)', color: '#22d3ee', border: '1px solid rgba(8,145,178,0.25)' }}>
                    {f}
                  </span>
                ))}
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full text-white/40 border border-white/10">
                  +{FRAMEWORKS.length - 5} more
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button onClick={() => navigate('/contact')}
                  className="text-white px-7 py-5 text-base font-semibold border-0 hover:brightness-110 transition-all"
                  style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button onClick={() => navigate('/vciso')} variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-7 py-5 text-base font-medium bg-transparent">
                  Learn about vCISO
                </Button>
              </div>
            </motion.div>

            {/* Dashboard preview */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                style={{ background: 'rgba(0,0,0,0.4)' }}>
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10"
                  style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="text-xs text-white/30 ml-3 font-mono">FortifyOne — Compliance Dashboard</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Framework Status</p>
                    <span className="text-xs text-white/30">Q2 2026</span>
                  </div>
                  {DASHBOARD_ROWS.map(([label, pct, done]) => (
                    <div key={label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-medium text-white/70">{label}</span>
                        <span className="text-sm font-bold" style={{ color: done ? '#22d3ee' : 'rgba(255,255,255,0.4)' }}>{pct}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div className="h-full rounded-full transition-all"
                          style={{ width: pct, background: done ? 'linear-gradient(90deg,#0891B2,#22d3ee)' : 'rgba(8,145,178,0.4)' }} />
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-3">
                    {[['14', 'Open Actions'],['3','Vendors Due'],['2','Reports Ready']].map(([val, label]) => (
                      <div key={label} className="text-center">
                        <p className="text-xl font-black" style={{ color: '#0891B2' }}>{val}</p>
                        <p className="text-[10px] text-white/40">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#0891B2' }}>What's included</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Everything you need to stay compliant</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Built by security practitioners who got tired of compliance tools that looked impressive in demos but failed in practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all hover:border-[#0891B2]/20">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg,rgba(11,29,58,0.08),rgba(8,145,178,0.12))' }}>
                  <Icon className="w-5 h-5" style={{ color: '#0891B2' }} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAMEWORKS ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#0891B2' }}>Supported frameworks</p>
          <div className="flex flex-wrap justify-center gap-3">
            {FRAMEWORKS.map(f => (
              <span key={f} className="text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#0891B2' }}>Pricing</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Use FortifyOne standalone, or get it included free with a Cy-Sec vCISO engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PRICING.map(({ name, price, period, desc, features, cta, highlight }) => (
              <motion.div key={name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`rounded-3xl p-8 border-2 ${highlight
                  ? 'border-transparent text-white'
                  : 'bg-white border-slate-200'
                }`}
                style={highlight ? { background: 'linear-gradient(135deg,#071326,#0B1D3A)' } : {}}>
                <p className="text-sm font-bold uppercase tracking-widest mb-2"
                  style={{ color: highlight ? '#22d3ee' : '#0891B2' }}>{name}</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`text-4xl font-black ${highlight ? 'text-white' : 'text-slate-900'}`}>{price}</span>
                  {period && <span className={`text-sm ${highlight ? 'text-white/50' : 'text-slate-400'}`}>{period}</span>}
                </div>
                <p className={`text-sm mb-6 leading-relaxed ${highlight ? 'text-white/60' : 'text-slate-500'}`}>{desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#0891B2' }} />
                      <span className={`text-sm ${highlight ? 'text-white/80' : 'text-slate-600'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={() => navigate('/contact')}
                  className={`w-full py-3 font-semibold border-0 hover:brightness-110 transition-all ${!highlight ? 'text-white' : 'text-white'}`}
                  style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                  {cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to take control of your compliance?</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Book a 30-minute call with the Cy-Sec team. We'll show you FortifyOne, understand your current compliance obligations, and recommend the right approach.
          </p>
          <Button onClick={() => navigate('/contact')}
            className="text-white px-10 py-5 text-base font-semibold border-0 hover:brightness-110 transition-all shadow-lg"
            style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
            Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

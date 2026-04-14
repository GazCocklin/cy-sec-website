import React from 'react';
import { ArrowRight, CheckCircle, BarChart3, Shield, Globe } from 'lucide-react';
import FortifyLearnLogo from '@/components/logos/FortifyLearnLogo';
import FortifyOneLogo from '@/components/logos/FortifyOneLogo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const F1_FEATURES = [
  'ISO 27001, DORA, NIS2, NIST CSF 2.0, GDPR & more',
  'Gap analysis, vendor risk management & DPIA tools',
  'Audit-ready reports generated automatically',
  'Included with every vCISO engagement',
];

const F1_STATS = [
  { label: 'Frameworks', value: '10+' },
  { label: 'From', value: '£149/mo' },
  { label: 'vCISO', value: 'Included' },
];

const CERT_LABS = [
  { code: 'N10-009', name: 'Network+', img: '/screenshots/fl-netcap.png', tool: 'NETCAP Analyzer', href: '/comptia-network-plus-labs', accent: '#10b981' },
  { code: 'SY0-701', name: 'Security+', img: '/screenshots/fl-fortiguard.png', tool: 'FORTIGUARD Auditor', href: '/comptia-security-plus-labs', accent: '#0891B2' },
  { code: 'CS0-003', name: 'CySA+', img: '/screenshots/fl-siem.png', tool: 'Arclight SIEM', href: '/comptia-cysa-plus-labs', accent: '#0B1D3A' },
];

export default function PlatformsShowcase() {
  return (
    <section className="py-20 px-8 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ── FortifyLearn ── */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="mb-3"><FortifyLearnLogo height={30} variant="light" /></div>
              <h2 className="text-2xl font-extrabold text-[#0B1D3A]" style={{ letterSpacing: '-0.6px' }}>CompTIA PBQ simulation labs</h2>
              <p className="text-slate-500 text-sm mt-1 max-w-lg">Live CLI environments, interactive SIEM dashboards and firewall auditors — not flashcards, not videos. The closest thing to the real exam.</p>
            </div>
            <Link to="/pbq-engine"
              className="text-sm font-bold hover:underline flex-shrink-0"
              style={{ color: '#0891B2' }}>
              View the PBQ Engine →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CERT_LABS.map(cert => (
              <motion.div key={cert.code}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-[#F4F7FA] rounded-2xl overflow-hidden border border-[rgba(8,145,178,0.12)] hover:shadow-lg hover:border-[rgba(8,145,178,0.3)] transition-all">
                <div className="relative" style={{ height: 120 }}>
                  <img src={cert.img} alt={cert.tool} className="w-full h-full object-cover" style={{ objectPosition: 'top' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 30%,rgba(6,14,31,0.8))' }} />
                  <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                      style={{ background: 'rgba(6,14,31,0.75)', border: '1px solid rgba(8,145,178,0.4)', color: '#7DD3E8' }}>
                      {cert.tool}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-black tracking-widest uppercase mb-0.5" style={{ color: cert.accent }}>{cert.code}</p>
                  <p className="font-extrabold text-[#0B1D3A] text-sm mb-3">CompTIA {cert.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400">10 labs · 2 packs · £19.99</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link to={cert.href}
                      className="flex-1 text-center text-[11px] font-bold px-3 py-2 rounded-lg border hover:brightness-110 transition-all"
                      style={{ borderColor: 'rgba(8,145,178,0.3)', color: '#0891B2', background: 'rgba(8,145,178,0.06)' }}>
                      View labs →
                    </Link>
                    <Link to="/store"
                      className="flex-1 text-center text-[11px] font-bold px-3 py-2 rounded-lg text-white hover:brightness-110 transition-all"
                      style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                      Buy pack →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FortifyOne ── */}
        <div>
          <div className="mb-8">
            <div className="mb-3"><FortifyOneLogo height={30} variant="light" /></div>
            <h2 className="text-2xl font-extrabold text-[#0B1D3A]" style={{ letterSpacing: '-0.6px' }}>GRC Compliance Platform</h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Purpose-built compliance management for organisations that need to stay ahead of regulation —
              available standalone or included with every vCISO engagement.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* FortifyOne main card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:col-span-3 relative rounded-3xl p-8 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #071326 0%, #0B1D3A 60%, #0d2b4a 100%)' }}
            >
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: 'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(to right, #0891B2 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(8,145,178,0.15)' }} />

              {/* Dashboard preview */}
              <div className="relative mb-6 rounded-xl overflow-hidden border border-white/10"
                style={{ background: 'rgba(0,0,0,0.4)' }}>
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="text-[10px] text-white/30 ml-2 font-mono">FortifyOne — Compliance Dashboard</span>
                </div>
                <div className="px-4 py-3 space-y-2">
                  {[['ISO 27001','87%',true],['DORA','62%',false],['NIS2','91%',true],['NIST CSF','74%',false]].map(([label, pct, done]) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-[11px] text-white/50 w-20 font-mono">{label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/10">
                        <div className="h-full rounded-full transition-all"
                          style={{ width: pct, background: done ? 'linear-gradient(90deg,#0891B2,#7DD3E8)' : 'rgba(8,145,178,0.45)' }} />
                      </div>
                      <span className="text-[11px] font-semibold w-9 text-right"
                        style={{ color: done ? '#7DD3E8' : 'rgba(255,255,255,0.4)' }}>{pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 mb-1">
                  <BarChart3 className="w-5 h-5" style={{ color: '#0891B2' }} />
                  <span className="font-black text-white text-xl">FortifyOne</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(8,145,178,0.2)', color: '#7DD3E8', border: '1px solid rgba(8,145,178,0.3)' }}>
                    GRC Platform
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                  GRC compliance platform covering ISO 27001, NIST CSF 2.0, GDPR, DORA, and NIS2.
                  Gap analysis, vendor risk, DPIA tools, and audit-ready reports — all in one place.
                </p>
                <div className="space-y-2 mb-6">
                  {F1_FEATURES.map(f => (
                    <div key={f} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                      <span className="text-slate-400 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a href="/fortifyone"
                    className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all hover:brightness-110"
                    style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff' }}>
                    Explore FortifyOne <ArrowRight className="w-4 h-4" />
                  </a>
                  <span className="text-slate-500 text-sm">From £149/month</span>
                </div>
              </div>
            </motion.div>

            {/* Right side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              <div className="grid grid-cols-3 gap-3">
                {F1_STATS.map(({ label, value }) => (
                  <div key={label} className="bg-[#F4F7FA] border border-[rgba(8,145,178,0.1)] rounded-2xl p-4 text-center">
                    <p className="text-xl font-black text-[#0B1D3A]">{value}</p>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#F4F7FA] border border-[rgba(8,145,178,0.1)] rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891B2' }}>Supported Frameworks</p>
                <div className="flex flex-wrap gap-2">
                  {['ISO 27001','DORA','NIS2','NIST CSF 2.0','GDPR','SOC 2','Cyber Essentials','NIST SP 800-53'].map(f => (
                    <span key={f} className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-5 border"
                style={{ background: 'linear-gradient(135deg,rgba(11,29,58,0.04),rgba(8,145,178,0.06))', borderColor: 'rgba(8,145,178,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4" style={{ color: '#0891B2' }} />
                  <p className="text-sm font-bold text-[#0B1D3A]">Included with vCISO</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every Cy-Sec vCISO engagement includes full FortifyOne access — your compliance platform
                  and security leadership in a single monthly fee.
                </p>
                <a href="/vciso" className="inline-flex items-center gap-1 text-xs font-semibold mt-3 hover:opacity-80 transition-opacity"
                  style={{ color: '#0891B2' }}>
                  Learn about vCISO <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <Link to="/fortifyone"
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff' }}>
                <Globe className="w-4 h-4" /> Explore FortifyOne
              </Link>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

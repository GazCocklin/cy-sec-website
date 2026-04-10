import React from 'react';
import { ArrowRight, CheckCircle, BarChart3, Shield, Globe, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function PlatformsShowcase() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#0891B2' }}>
            Also in the Cy-Sec family
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">FortifyOne GRC Platform</h2>
          <p className="text-slate-500 text-sm mt-2 max-w-xl">
            Purpose-built compliance management for organisations that need to stay ahead of regulation —
            available standalone or included with every vCISO engagement.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── FortifyOne main card (3 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 relative rounded-3xl p-8 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #071326 0%, #0B1D3A 60%, #0d2b4a 100%)' }}
          >
            {/* Grid overlay */}
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
                        style={{ width: pct, background: done ? 'linear-gradient(90deg,#0891B2,#22d3ee)' : 'rgba(8,145,178,0.45)' }} />
                    </div>
                    <span className="text-[11px] font-semibold w-9 text-right"
                      style={{ color: done ? '#22d3ee' : 'rgba(255,255,255,0.4)' }}>{pct}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-1">
                <BarChart3 className="w-5 h-5" style={{ color: '#0891B2' }} />
                <span className="font-black text-white text-xl">FortifyOne</span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(8,145,178,0.2)', color: '#22d3ee', border: '1px solid rgba(8,145,178,0.3)' }}>
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

          {/* ── Right side: stat cards + vCISO hook (2 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {F1_STATS.map(({ label, value }) => (
                <div key={label} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <p className="text-xl font-black text-slate-900">{value}</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Supported frameworks */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891B2' }}>Supported Frameworks</p>
              <div className="flex flex-wrap gap-2">
                {['ISO 27001','DORA','NIS2','NIST CSF 2.0','GDPR','SOC 2','Cyber Essentials','NIST SP 800-53'].map(f => (
                  <span key={f} className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* vCISO tie-in */}
            <div className="rounded-2xl p-5 border"
              style={{ background: 'linear-gradient(135deg,rgba(11,29,58,0.04),rgba(8,145,178,0.06))', borderColor: 'rgba(8,145,178,0.2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4" style={{ color: '#0891B2' }} />
                <p className="text-sm font-bold text-slate-800">Included with vCISO</p>
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

            {/* CTA */}
            <a href="/fortifyone"
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff' }}>
              <Globe className="w-4 h-4" />
              Visit fortifyone.co.uk
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

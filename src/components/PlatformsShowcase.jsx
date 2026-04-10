import React from 'react';
import { ArrowRight, CheckCircle, Terminal, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const GradText = ({ children }) => (
  <span style={{
    background: 'linear-gradient(90deg, #22d3ee, #0891B2)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 700,
  }}>{children}</span>
);

const FL_FEATURES = [
  'Representative CLI environments for Network+, Security+ & CySA+',
  'Objective-by-objective scoring, study mode & exam mode',
  'Free taster labs — no payment required to start',
];

const F1_FEATURES = [
  'ISO 27001, DORA, NIS2, NIST CSF 2.0, GDPR & more',
  'Gap analysis, vendor risk, DPIA tools & audit-ready reports',
  'Included with every vCISO engagement',
];

export default function PlatformsShowcase() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#0891B2' }}>Our Platforms</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Built by practitioners</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            Two platforms that extend Cy-Sec's reach — available independently or as part of a managed vCISO engagement.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* ── FortifyLearn ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl p-8 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #071326 0%, #0B2540 60%, #0a3d5c 100%)' }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(to right, #0891B2 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(8,145,178,0.2)' }} />

            {/* Terminal preview strip */}
            <div className="relative mb-6 rounded-xl overflow-hidden border border-white/10"
              style={{ background: 'rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="text-[10px] text-white/30 ml-2 font-mono">bash — fortifylearn lab</span>
              </div>
              <div className="px-4 py-3 font-mono text-xs leading-relaxed">
                <p><span style={{ color: '#22d3ee' }}>router#</span> <span className="text-white/70">show ip route</span></p>
                <p className="text-white/40">Codes: C - connected, S - static</p>
                <p><span className="text-emerald-400">C</span> <span className="text-white/60">192.168.1.0/24 is directly connected, Gi0/0</span></p>
                <p><span className="text-emerald-400">C</span> <span className="text-white/60">10.0.0.0/30 is directly connected, Se0/0/0</span></p>
                <p className="mt-1"><span style={{ color: '#22d3ee' }}>router#</span> <span className="text-white/70">_</span></p>
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <Terminal className="w-4 h-4" style={{ color: '#22d3ee' }} />
                </div>
                <span className="font-bold text-white text-xl">Fortify<GradText>Learn</GradText></span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto" style={{ background: 'rgba(8,145,178,0.2)', color: '#22d3ee', border: '1px solid rgba(8,145,178,0.3)' }}>CompTIA Authorised</span>
              </div>

              <div className="space-y-2 mb-6">
                {FL_FEATURES.map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                    <span className="text-slate-400 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff' }}>
                  Try FortifyLearn <ArrowRight className="w-4 h-4" />
                </a>
                <span className="text-slate-500 text-sm">Free to start</span>
              </div>
            </div>
          </motion.div>

          {/* ── FortifyOne ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="relative rounded-3xl p-8 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #071326 0%, #0B1D3A 60%, #0d2b4a 100%)' }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(to right, #0891B2 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            {/* Glow */}
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(8,145,178,0.15)' }} />

            {/* Dashboard preview strip */}
            <div className="relative mb-6 rounded-xl overflow-hidden border border-white/10"
              style={{ background: 'rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="text-[10px] text-white/30 ml-2 font-mono">FortifyOne — GRC Dashboard</span>
              </div>
              <div className="px-4 py-3 space-y-2">
                {[['ISO 27001','87%',true],['DORA','62%',false],['NIS2','91%',true]].map(([label, pct, done]) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-[11px] text-white/50 w-16 font-mono">{label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/10">
                      <div className="h-full rounded-full" style={{ width: pct, background: done ? 'linear-gradient(90deg,#0891B2,#22d3ee)' : 'rgba(8,145,178,0.5)' }} />
                    </div>
                    <span className="text-[11px] font-semibold w-8 text-right" style={{ color: done ? '#22d3ee' : 'rgba(255,255,255,0.4)' }}>{pct}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <BarChart3 className="w-4 h-4" style={{ color: '#0891B2' }} />
                </div>
                <span className="font-bold text-white text-xl">Fortify<GradText>One</GradText></span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto" style={{ background: 'rgba(8,145,178,0.2)', color: '#22d3ee', border: '1px solid rgba(8,145,178,0.3)' }}>GRC Platform</span>
              </div>

              <div className="space-y-2 mb-6">
                {F1_FEATURES.map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                    <span className="text-slate-400 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a href="https://fortifyone.co.uk" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff' }}>
                  Explore FortifyOne <ArrowRight className="w-4 h-4" />
                </a>
                <span className="text-slate-500 text-sm">From £149/month</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

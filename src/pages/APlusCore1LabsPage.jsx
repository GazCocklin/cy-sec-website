import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Shield, Clock, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import ExamPrepSection from '../components/ExamPrepSection';

// ── A+ Core 1 (220-1201) landing page ────────────────────────────────────────
// Built 25-Apr-2026 alongside the storefront A+ rollout. Lab content is in
// active authoring (1 PBQ live at launch, target 10 across both packs). Lab
// titles below reflect the planned curriculum mapped to CompTIA's 220-1201
// objectives. Page-level "LAUNCHING SOON" badge sets expectations honestly.
// Hero/tool screenshots are placeholders reusing existing FortifyLearn shots
// — Gaz will swap them as A+-specific imagery is authored.

const PACK1_LABS = [
  { num: 1, title: 'Mobile device sync & connectivity',                     diff: 'Easy',         time: 12, obj: '1.0 / 5.0', tool: 'FL-Mobile' },
  { num: 2, title: 'Network cable & port troubleshooting',                  diff: 'Easy',         time: 12, obj: '2.0 / 5.0', tool: 'CLI Diag' },
  { num: 3, title: 'Hardware diagnostic workflows — POST & component swap', diff: 'Intermediate', time: 18, obj: '3.0 / 5.0', tool: 'CLI Diag' },
  { num: 4, title: 'Virtualisation & cloud configuration',                  diff: 'Hard',         time: 25, obj: '4.0',       tool: 'FL-VMSIM' },
  { num: 5, title: 'Multi-fault hardware/network triage',                   diff: 'Expert',       time: 30, obj: '2.0 / 3.0 / 5.0', tool: 'FL-Mobile' },
];

const PACK2_LABS = [
  { num: 1, title: 'Wireless AP misconfiguration — SSID, channel & encryption', diff: 'Easy',         time: 12, obj: '2.0 / 5.0', tool: 'FL-WiFi' },
  { num: 2, title: 'Printer & peripheral fault diagnosis',                       diff: 'Easy',         time: 14, obj: '3.0 / 5.0', tool: 'CLI Diag' },
  { num: 3, title: 'SOHO router & network share triage',                         diff: 'Intermediate', time: 20, obj: '2.0 / 4.0', tool: 'FL-WiFi' },
  { num: 4, title: 'Display & video subsystem repair',                           diff: 'Hard',         time: 18, obj: '3.0 / 5.0', tool: 'CLI Diag' },
  { num: 5, title: 'End-to-end client diagnostic exercise',                      diff: 'Expert',       time: 30, obj: '1.0 / 2.0 / 3.0 / 5.0', tool: 'FL-Mobile' },
];

const DIFF_STYLE = {
  Easy:'bg-green-100 text-green-700', Intermediate:'bg-blue-100 text-blue-700',
  Hard:'bg-amber-100 text-amber-700', Expert:'bg-[#0B1D3A]/10 text-[#0B1D3A]',
};
const TOOL_STYLE = {
  'CLI Diag':   'bg-[#e0f2f9] text-[#0E5F8A]',
  'FL-Mobile':  'bg-[#0B1D3A]/10 text-[#0B1D3A]',
  'FL-VMSIM':   'bg-amber-50 text-amber-700',
  'FL-WiFi':    'bg-emerald-50 text-emerald-700',
};

function LabRow({ lab }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[#F4F7FA] border border-[rgba(8,145,178,0.12)] rounded-xl hover:border-[rgba(8,145,178,0.3)] transition-colors">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
        {lab.num}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-[#0B1D3A] leading-snug">{lab.title}</p>
        </div>
        <div className="flex gap-2 flex-wrap mt-1.5">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[rgba(14,95,138,0.1)] text-[#0E5F8A]">220-1201 · {lab.obj}</span>
          {lab.time && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">~{lab.time} min</span>}
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${TOOL_STYLE[lab.tool] || 'bg-slate-100 text-slate-500'}`}>{lab.tool}</span>
        </div>
      </div>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${DIFF_STYLE[lab.diff]}`}>{lab.diff}</span>
    </div>
  );
}

function PackCard({ title, code, price, labs }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-[rgba(8,145,178,0.3)]">
      <div className="p-5 text-white" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0E5F8A)' }}>
        <p className="text-[10px] font-bold tracking-widest text-[#7DD3E8] uppercase mb-1">{code}</p>
        <h3 className="text-lg font-extrabold" style={{ letterSpacing: '-0.3px' }}>{title}</h3>
        <p className="text-[12px] text-white/50 mt-1">{labs} labs · Easy → Expert · Lifetime access</p>
      </div>
      <div className="p-5 bg-white">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-black text-[#0B1D3A]" style={{ letterSpacing: '-1px' }}>£{price}</span>
        </div>
        <p className="text-xs text-slate-400 mb-4">One-time · Lifetime access from purchase</p>
        <a href="/store" className="block w-full text-center text-white font-bold text-sm py-3 rounded-xl mb-3 hover:brightness-110 transition-all" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
          Add to basket →
        </a>
        <p className="text-[11px] text-slate-400 text-center">Or get the <span className="font-bold text-[#0891B2]">Prep Bundle for £39.99</span> — saves £24.98</p>
      </div>
    </div>
  );
}

const TRUST = [
  { icon: Lock, label: 'Secure checkout via Stripe', sub: 'Account created at checkout — no separate sign-up' },
  { icon: CheckCircle2, label: 'Exam objective mapped', sub: 'Every graded check maps to a 220-1201 domain' },
  { icon: Clock, label: 'Unlimited retries, Lifetime access', sub: 'Run each lab as many times as you need' },
  { icon: Shield, label: 'CompTIA Authorised Partner', sub: 'Developed and delivered by Cy-Sec' },
];

export default function APlusCore1LabsPage() {
  const [tab, setTab] = useState('p1');

  return (
    <>
      <Helmet>
        <title>CompTIA A+ Core 1 (220-1201) Practice Labs | FortifyLearn — Cy-Sec</title>
        <meta name="description" content="Hands-on CompTIA A+ Core 1 (220-1201) PBQ practice labs covering mobile devices, networking, hardware, virtualisation, and troubleshooting. Realistic diagnostic workflows. One-time purchase, lifetime access. CompTIA Authorised Partner." />
        <meta name="keywords" content="CompTIA A+ labs, A+ Core 1 practice, 220-1201 PBQ, hardware troubleshooting labs, CompTIA practice labs UK" />
        <link rel="canonical" href="https://cy-sec.co.uk/comptia-aplus-core1-labs" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img src="/screenshots/fl-techscope.png" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(6,14,31,0.97) 0%,rgba(11,29,58,0.95) 45%,rgba(8,80,120,0.80) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(8,145,178,1) 1px,transparent 1px),linear-gradient(to right,rgba(8,145,178,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 border text-xs font-bold tracking-wider uppercase text-[#7DD3E8]" style={{ background: 'rgba(8,145,178,0.15)', borderColor: 'rgba(8,145,178,0.35)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]" /> 220-1201 · CompTIA A+ Core 1
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border text-[10px] font-extrabold tracking-widest uppercase text-amber-300" style={{ background: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.35)' }}>
              <Sparkles className="w-3 h-3" /> Launching soon · early-bird pricing live
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-5" style={{ letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              A+ Core 1 practice labs.<br />
              <span style={{ background: 'linear-gradient(90deg,#7DD3E8,#0891B2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hardware. Networking.</span><br />
              Mobile devices.
            </h1>
            <p className="text-[15px] text-white/60 leading-relaxed mb-7 max-w-lg">
              <strong className="text-white/90">CompTIA A+ Core 1 (220-1201) performance-based questions</strong> test you on diagnosing mobile device, networking, and hardware faults under realistic conditions. FortifyLearn maps a planned 10-lab curriculum to every 220-1201 domain — content authoring is live and you'll get every lab as it ships, at today's launch price.
            </p>
            <div className="flex gap-3 flex-wrap mb-6">
              <a href="/store" className="px-6 py-3 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                Foundation Labs — £19.99
              </a>
              <a href="/store" className="px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/8 hover:bg-white/14 transition-all">
                Prep Bundle — £39.99
              </a>
            </div>
            <div className="flex gap-4 flex-wrap">
              {['10 labs across 2 tiers', 'Mapped to 220-1201', 'Lifetime access', 'Updated as content ships'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-white/40"><span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/60" />{t}</span>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="text-[10px] font-bold text-[#7DD3E8] tracking-wider uppercase absolute -top-4 left-4 bg-gradient-to-r from-[#0B1D3A] to-[#0891B2] px-3 py-1.5 rounded-md z-10">
              FortifyLearn diagnostic console — placeholder
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img src="/screenshots/fl-cysa-cli.png" alt="FortifyLearn diagnostic terminal placeholder for A+ Core 1 hardware troubleshooting labs" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO intro ── */}
      <section className="bg-white border-b border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[15px] text-slate-500 leading-relaxed">
              The <span className="font-semibold text-[#0891B2]">CompTIA A+ Core 1 (220-1201) exam</span> tests hands-on troubleshooting across five domains: mobile devices, networking, hardware, virtualisation & cloud, and hardware/network troubleshooting. FortifyLearn's planned <span className="font-semibold text-[#0891B2]">A+ Core 1 lab curriculum</span> works through a realistic scenario in each — diagnostic workflows you can run on day one of the job.
            </p>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              Foundation Labs covers the core scenarios — mobile sync, cable diagnostics, hardware POST checks, virtualisation setup, and a multi-fault triage. Advanced Labs builds on those with <strong className="text-[#0B1D3A]">wireless AP fault analysis</strong>, peripheral diagnostics, and an end-to-end client recovery exercise. Buy Foundation now and lock in the early-bird price while content rolls out.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-3">
            {[['10', 'Labs across 2 tiers'], ['220-1201', 'CompTIA exam code'], ['5', 'Domains covered']].map(([n, l]) => (
              <div key={l} className="bg-[#F4F7FA] rounded-xl p-4 border border-[rgba(8,145,178,0.1)]">
                <div className="text-2xl font-black text-[#0891B2]" style={{ letterSpacing: '-0.5px' }}>{n}</div>
                <div className="text-xs text-slate-400 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pack tabs ── */}
      <section className="bg-white py-14 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">A+ Core 1 (220-1201) labs</p>
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.8px' }}>Two packs. Ten labs. Mapped to every domain.</h2>
          <p className="text-[15px] text-slate-500 mb-8 max-w-xl">Foundation Labs covers the core 220-1201 scenarios. Advanced Labs adds the harder multi-fault and wireless workflows. Each lab is being authored to map to one or more A+ Core 1 objectives.</p>

          <div className="flex border-b-2 border-[rgba(8,145,178,0.15)] mb-8 gap-0">
            {[
              { id: 'p1', label: 'Foundation', meta: '5 labs · £19.99' },
              { id: 'p2', label: 'Advanced',   meta: '5 labs · £19.99' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-6 py-3 text-sm font-semibold border-b-2 -mb-0.5 transition-all ${tab === t.id ? 'text-[#0B1D3A] border-[#0891B2]' : 'text-slate-400 border-transparent hover:text-slate-600'}`}>
                {t.label}
                <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${tab === t.id ? 'bg-[#e0f2f9] text-[#0891B2]' : 'bg-slate-100 text-slate-400'}`}>{t.meta}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            <div className="space-y-3">
              {tab === 'p1' && PACK1_LABS.map(l => <LabRow key={l.num} lab={l} />)}
              {tab === 'p2' && PACK2_LABS.map(l => <LabRow key={l.num} lab={l} />)}
            </div>
            <div>
              {tab === 'p1' && <PackCard title="A+ Core 1 Foundation Labs" code="220-1201 · Foundation" price="19.99" labs={5} />}
              {tab === 'p2' && <PackCard title="A+ Core 1 Advanced Labs"   code="220-1201 · Advanced"   price="19.99" labs={5} />}
            </div>
          </div>
        </div>
      </section>

      {/* ── Exam prep deep-dive ── */}
      <ExamPrepSection cert="aplus_core1" certLabel="A+ Core 1" code="220-1201" />

      {/* ── Trust ── */}
      <section className="bg-[#F4F7FA] py-14 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-white rounded-xl p-4 border border-[rgba(8,145,178,0.1)] flex gap-3 items-start">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(8,145,178,0.08)', border: '1px solid rgba(8,145,178,0.2)' }}>
                <Icon className="w-4 h-4 text-[#0891B2]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0B1D3A]">{label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

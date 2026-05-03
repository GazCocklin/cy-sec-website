import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Shield, Clock, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import ExamPrepSection from '../components/ExamPrepSection';

const PACK1_LABS = [
  { num: 1, title: 'Suspicious process and outbound connection investigation', diff: 'Easy',         time: 10, obj: '1.2 / 1.3',             tool: 'Linux CLI' },
  { num: 2, title: 'Web application brute force investigation',                diff: 'Easy',         time: 10, obj: '1.2 / 1.3',             tool: 'Linux CLI' },
  { num: 3, title: 'SSH brute force investigation and containment',            diff: 'Intermediate', time: 20, obj: '1.2 / 1.3 / 3.2',       tool: 'CLI + SIEM' },
  { num: 4, title: 'Web shell compromise and lateral movement detection',      diff: 'Hard',         time: 30, obj: '1.2 / 1.3 / 3.1 / 3.2', tool: 'Linux CLI' },
  { num: 5, title: 'APT campaign — multi-stage threat hunt and firewall containment', diff: 'Expert', time: 40, obj: '1.2–1.4 / 2.4 / 3.1 / 3.2', tool: 'CLI + ACL' },
];

const PACK2_LABS = [
  { num: 1, title: 'Malicious cron job — persistence investigation and removal',                     diff: 'Easy',         time: 10, obj: '1.2 / 2.2',             tool: 'Linux CLI' },
  { num: 2, title: 'Internal port scan detection and host containment',                              diff: 'Easy',         time: 10, obj: '1.2 / 1.3',             tool: 'Linux CLI' },
  { num: 3, title: 'SIEM log correlation and incident triage',                                       diff: 'Intermediate', time: 25, obj: '1.2 / 1.3 / 2.4',       tool: 'Arclight SIEM' },
  { num: 4, title: 'Vulnerability assessment and remediation triage',                                diff: 'Hard',         time: 30, obj: '2.1 / 2.2 / 2.3 / 2.4', tool: 'NETSCAN PRO' },
  { num: 5, title: 'Credential harvesting and ransomware staging — multi-server eradication',       diff: 'Expert',       time: 25, obj: '1.2 / 1.4 / 2.2 / 3.3', tool: 'Linux CLI' },
];

const DIFF_STYLE = {
  Easy:         'bg-green-100 text-green-700',
  Intermediate: 'bg-blue-100 text-blue-700',
  Hard:         'bg-amber-100 text-amber-700',
  Expert:       'bg-[#0B1D3A]/10 text-[#0B1D3A]',
};
const TOOL_STYLE = {
  'Linux CLI':    'bg-[#e0f2f9] text-[#0E5F8A]',
  'CLI + SIEM':   'bg-[#e0f2f9] text-[#0E5F8A]',
  'CLI + ACL':    'bg-[#e0f2f9] text-[#0E5F8A]',
  'Arclight SIEM':'bg-amber-50 text-amber-700',
  'NETSCAN PRO':  'bg-emerald-50 text-emerald-700',
};

function LabRow({ lab, taster }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[#F4F7FA] border border-[rgba(8,145,178,0.12)] rounded-xl hover:border-[rgba(8,145,178,0.3)] transition-colors">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${taster ? 'bg-[#0891B2]' : 'bg-[#0B1D3A]'}`}
        style={!taster ? { background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' } : {}}
      >
        {taster ? 'F' : lab.num}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#0B1D3A] leading-snug">{lab.title}</p>
        <div className="flex gap-2 flex-wrap mt-1.5">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[rgba(14,95,138,0.1)] text-[#0E5F8A]">CS0-003 · {lab.obj}</span>
          {lab.time && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{lab.time} min</span>}
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${TOOL_STYLE[lab.tool] || 'bg-slate-100 text-slate-500'}`}>{lab.tool}</span>
        </div>
      </div>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${DIFF_STYLE[lab.diff]}`}>{lab.diff}</span>
    </div>
  );
}

function PackCard({ title, code, price, oldPrice, labs, complete, includes }) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-md border ${complete ? 'border-[rgba(11,29,58,0.2)]' : 'border-[rgba(8,145,178,0.3)]'}`}>
      <div className="p-5 text-white" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0E5F8A)' }}>
        <p className="text-[10px] font-bold tracking-widest text-[#7DD3E8] uppercase mb-1">{code}</p>
        <h3 className="text-lg font-extrabold" style={{ letterSpacing: '-0.3px' }}>{title}</h3>
        <p className="text-[12px] text-white/50 mt-1">{labs} labs · Easy → Expert · Lifetime access</p>
      </div>
      <div className="p-5 bg-white">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-black text-[#0B1D3A]" style={{ letterSpacing: '-1px' }}>£{price}</span>
          {oldPrice && <span className="text-sm text-slate-400 line-through">£{oldPrice}</span>}
          {oldPrice && <span className="text-xs font-bold bg-[#e0f2f9] text-[#0891B2] px-2 py-0.5 rounded-full">Save £{(parseFloat(oldPrice) - parseFloat(price)).toFixed(2)}</span>}
        </div>
        <p className="text-xs text-slate-400 mb-4">One-time · Lifetime access from purchase</p>
        <a
          href="/store"
          className="block w-full text-center text-white font-bold text-sm py-3 rounded-xl mb-3 transition-all hover:brightness-110"
          style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}
        >
          Add to basket →
        </a>
        {!complete && <p className="text-[11px] text-slate-400 text-center">Or get both tiers for <span className="font-bold text-[#0891B2]">£32.99</span> — saves £6.99</p>}
        {complete && includes && (
          <div className="border-t border-slate-100 pt-3 mt-1 space-y-1.5">
            {includes.map((inc, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2] flex-shrink-0" />
                {inc}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const TRUST = [
  { icon: Lock, label: 'Secure checkout via Stripe', sub: 'Account created at checkout — no separate sign-up' },
  { icon: CheckCircle2, label: 'Exam objective mapped', sub: 'Every graded check maps to a CS0-003 domain' },
  { icon: Clock, label: 'Unlimited retries, Lifetime access', sub: 'Run each lab as many times as you need' },
  { icon: Shield, label: 'CompTIA Authorised Partner', sub: 'Developed and delivered by Cy-Sec' },
];

export default function CySAPlusLabsPage() {
  const [tab, setTab] = useState('p1');
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>CompTIA CySA+ CS0-003 Practice Labs | FortifyLearn — Cy-Sec</title>
        <meta name="description" content="10 hands-on CySA+ CS0-003 simulation labs across 2 tiers. Live CLI investigation, Arclight SIEM triage, and NETSCAN PRO vulnerability assessment. One-time purchase, Lifetime access. CompTIA Authorised Partner." />
        <meta name="keywords" content="CompTIA CySA+ labs, CS0-003 practice, CySA+ PBQ simulation, SIEM triage, vulnerability assessment, CompTIA practice labs" />
        <link rel="canonical" href="https://cy-sec.co.uk/comptia-cysa-plus-labs" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img src="/screenshots/fl-netscan.png" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(6,14,31,0.97) 0%,rgba(11,29,58,0.95) 45%,rgba(8,80,120,0.80) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(8,145,178,1) 1px,transparent 1px),linear-gradient(to right,rgba(8,145,178,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border text-xs font-bold tracking-wider uppercase text-[#7DD3E8]" style={{ background: 'rgba(8,145,178,0.15)', borderColor: 'rgba(8,145,178,0.35)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]" /> CS0-003 · CompTIA CySA+
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-5" style={{ letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              CySA+ practice labs.<br />
              <span style={{ background: 'linear-gradient(90deg,#7DD3E8,#0891B2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Not flashcards.</span><br />
              Real analyst workflows.
            </h1>
            <p className="text-[15px] text-white/60 leading-relaxed mb-7 max-w-lg">
              <strong className="text-white/90">CompTIA CySA+ CS0-003</strong> tests you on live threat investigation, SIEM triage, and incident containment. FortifyLearn gives you real CLI environments, an interactive SIEM dashboard, and a vulnerability scanner — 10 labs across 2 tiers.
            </p>
            <div className="flex gap-3 flex-wrap mb-6">
              <a href="/store" className="px-6 py-3 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                CySA+ Foundation Labs — £19.99
              </a>
              <a href="/store" className="px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/8 hover:bg-white/14 transition-all">
                Complete (10 labs) — £32.99
              </a>
            </div>
            <div className="flex gap-4 flex-wrap">
              {['10 labs across 2 tiers', 'CompTIA Authorised Partner', 'Lifetime access', 'One-time payment'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/60" />{t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="text-[10px] font-bold text-[#7DD3E8] tracking-wider uppercase absolute -top-4 left-4 bg-gradient-to-r from-[#0B1D3A] to-[#0891B2] px-3 py-1.5 rounded-md z-10">
              Arclight SIEM v5.0.3 — CySA+ Advanced Labs
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img src="/screenshots/fl-siem.png" alt="Arclight SIEM v5.0.3 inside a FortifyLearn CySA+ Advanced Labs lab — live alert triage dashboard" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO intro ── */}
      <section className="bg-white border-b border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[15px] text-slate-500 leading-relaxed">
              The <span className="font-semibold text-[#0891B2]">CompTIA CySA+ CS0-003 exam</span> is built around analyst workflows — investigating active compromises, triaging SIEM alerts, assessing vulnerability scan results, and making containment decisions. FortifyLearn's <span className="font-semibold text-[#0891B2]">CySA+ practice labs</span> put you inside those workflows directly: two packs of five scenario labs, progressing from CLI investigation fundamentals through interactive SIEM and vulnerability scanner tooling.
            </p>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              Foundation Labs covers core CLI skills — log analysis, process investigation, brute force detection, lateral movement tracing, and a full APT campaign threat hunt. Advanced Labs introduces FortifyLearn's visual simulation tools: the <strong className="text-[#0B1D3A]">Arclight SIEM</strong> dashboard and <strong className="text-[#0B1D3A]">NETSCAN PRO</strong> vulnerability scanner, mirroring the tooling CS0-003 tests you on.
            </p>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              New to FortifyLearn? CySA+ doesn't have its own free taster lab — but the engine is identical across every cert. Try the <strong className="text-[#0B1D3A]">Network+</strong>, <strong className="text-[#0B1D3A]">Security+</strong> or <strong className="text-[#0B1D3A]">A+</strong> taster labs first to see the experience before you buy.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-3">
            {[['10', 'Labs across 2 tiers'], ['CS0-003', 'CompTIA exam code'], ['£32.99', 'Complete — all 10 labs']].map(([n, l]) => (
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
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">CySA+ CS0-003 labs</p>
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.8px' }}>Two packs. Ten labs. One progression.</h2>
          <p className="text-[15px] text-slate-500 mb-8 max-w-xl">Start with CLI fundamentals in Foundation Labs, then add interactive tooling in Advanced Labs. Or go Complete for the full 10-lab journey.</p>

          <div className="flex border-b-2 border-[rgba(8,145,178,0.15)] mb-8 gap-0">
            {[
              { id: 'p1', label: 'Foundation', meta: '5 labs · £19.99' },
              { id: 'p2', label: 'Advanced', meta: '5 labs · £19.99' },
              { id: 'complete', label: 'Complete', meta: '10 labs · £32.99' },
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
              {tab === 'complete' && (
                <>
                  <p className="text-xs text-slate-400 mb-2">All 10 labs — Foundation Labs then Advanced Labs in difficulty order.</p>
                  {[...PACK1_LABS, ...PACK2_LABS].sort((a, b) => {
                    const order = { Easy: 0, Intermediate: 1, Hard: 2, Expert: 3 };
                    return order[a.diff] - order[b.diff];
                  }).map((l, i) => <LabRow key={i} lab={{ ...l, num: i + 1 }} />)}
                </>
              )}
            </div>
            <div>
              {tab === 'p1' && <PackCard title="CySA+ Foundation Labs" code="CS0-003 · Foundation" price="19.99" labs={5} />}
              {tab === 'p2' && <PackCard title="CySA+ Advanced Labs" code="CS0-003 · Advanced" price="19.99" labs={5} />}
              {tab === 'complete' && (
                <PackCard title="CySA+ Complete" code="CS0-003 · Complete" price="32.99" oldPrice="39.98" labs={10} complete
                  includes={['Foundation Labs — 5 CLI investigation labs', 'Advanced Labs — 5 labs inc. Arclight SIEM & NETSCAN PRO', 'All 10 labs unlocked immediately', 'Lifetime access from purchase']}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Exam prep (deep-dive: Exam Engine — Study + Exam Mode + Prep Bundle savings) ── */}
      <ExamPrepSection cert="cysa" certLabel="CySA+" code="CS0-003" />

      {/* ── Tools ── */}
      <section className="bg-[#F4F7FA] py-14 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">The tools you'll use</p>
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.8px' }}>Not described. Actually used.</h2>
          <p className="text-[15px] text-slate-500 mb-8 max-w-xl">These screenshots are from real FortifyLearn labs. Advanced Labs introduces interactive simulation tools built to mirror real analyst tooling.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { img: '/screenshots/fl-siem.png', lbl: 'ARCLIGHT SIEM v5.0.3', title: 'Arclight SIEM — alert triage and incident containment', desc: 'Filter events by source IP, correlate alerts across a timeline, identify attack patterns, and trigger containment actions inside a simulated SOC dashboard with realistic event data.', pack: 'CySA+ Advanced Labs · lab 3' },
              { img: '/screenshots/fl-netscan.png', lbl: 'NETSCAN PRO v4.2.1', title: 'NETSCAN PRO — vulnerability assessment and remediation triage', desc: 'Review CVSS-scored findings across multiple hosts, filter by severity, identify false positives, and prioritise remediation — replicating the analyst workflow CS0-003 tests directly.', pack: 'CySA+ Advanced Labs · lab 4' },
            ].map(tool => (
              <div key={tool.lbl} className="bg-white rounded-2xl overflow-hidden border border-[rgba(8,145,178,0.12)]">
                <div className="relative">
                  <img src={tool.img} alt={tool.title} className="w-full" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-[#7DD3E8] tracking-wider uppercase px-2.5 py-1.5 rounded-md" style={{ background: 'rgba(6,14,31,0.82)', border: '1px solid rgba(8,145,178,0.35)' }}>{tool.lbl}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-[15px] font-bold text-[#0B1D3A] mb-2">{tool.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-3">{tool.desc}</p>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#e0f2f9] text-[#0891B2] border border-[rgba(8,145,178,0.2)]">{tool.pack}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="bg-[#F4F7FA] pb-14 px-8">
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

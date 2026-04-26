import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Terminal, BookOpen, Target, Award, ChevronRight } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: '01',
    title: 'Pick a cert and a starting point',
    desc: "Choose Network+, Security+, CySA+ or A+. Start with a free taster lab or an Exam Engine sample question — no card required.",
    icon: BookOpen,
  },
  {
    n: '02',
    title: 'Practise the way the exam tests you',
    desc: 'Real CLI, SIEM and visual tools for PBQ scenarios. Full reasoning panels for MCQ practice. Timed mock exams that mirror the live cert.',
    icon: Terminal,
  },
  {
    n: '03',
    title: 'Get scored against the real objectives',
    desc: 'Every PBQ check and every MCQ answer maps to specific CompTIA objectives, with a targeted improvement plan and a scaled 100–900 score on mock exams.',
    icon: Target,
  },
];

const PBQ_FEATURES = [
  'Live Cisco IOS, Linux and Windows terminals',
  'Interactive SIEM, firewall and packet analyser tools',
  'Realistic incident briefings and network topologies',
  'Every check mapped to a specific CompTIA objective',
];

const EXAM_FEATURES = [
  '1,000 MCQs per cert with full reasoning panels',
  'Study Mode for self-paced practice and review',
  'Timed Exam Mode mixing PBQs and MCQs under one clock',
  'Scaled 100–900 score that mirrors the live exam',
];

const TOOLS = [
  { img: '/screenshots/fl-netsim.png',     lbl: 'FL-NETSIM v2.0',           cert: 'Network+',  desc: 'Live Cisco IOS terminal with available commands panel. Real switch and router environments.' },
  { img: '/screenshots/fl-netcap.png',     lbl: 'NETCAP Analyzer v3.2',     cert: 'Network+',  desc: 'Packet capture flow topology showing asymmetric routing paths and TCP retransmits.' },
  { img: '/screenshots/fl-fortiguard.png', lbl: 'FORTIGUARD Auditor v3.1',  cert: 'Security+', desc: 'Visual firewall rule audit table with hit distribution charts and anomaly indicators.' },
  { img: '/screenshots/fl-siem.png',       lbl: 'Arclight SIEM v5.0.3',     cert: 'CySA+',     desc: 'Live alert triage dashboard with event correlation, filtering, and containment workflows.' },
  { img: '/screenshots/fl-techscope.png',  lbl: 'TechScope Hardware v2.0',  cert: 'A+ Core 1', desc: 'Hardware health dashboard: SMART diagnostics, RAM tests, battery health and thermal telemetry.' },
  { img: '/screenshots/fl-sentryshield.png', lbl: 'SentryShield Cloud EDR', cert: 'A+ Core 2', desc: 'Cloud EDR console with malicious-process detection, severity triage and tenant-wide endpoint health.' },
  { img: '/screenshots/fl-linux-cli.png',  lbl: 'Linux CLI',                cert: 'Security+', desc: 'Real Linux terminal for SSH hardening, permission auditing, and service investigation.' },
  { img: '/screenshots/fl-netscan.png',    lbl: 'NETSCAN PRO v4.2.1',       cert: 'CySA+',     desc: 'CVSS-scored vulnerability findings across multiple hosts with remediation triage.' },
];

const CERTS = [
  { name: 'Network+',   code: 'N10-009',  logo: '/logos/comptia-network-plus.svg',  landingPage: '/comptia-network-plus-labs',  comingSoon: false },
  { name: 'Security+',  code: 'SY0-701',  logo: '/logos/comptia-security-plus.svg', landingPage: '/comptia-security-plus-labs', comingSoon: false },
  { name: 'CySA+',      code: 'CS0-003',  logo: '/logos/comptia-cysa-plus.svg',     landingPage: '/comptia-cysa-plus-labs',     comingSoon: false },
  { name: 'A+ Core 1',  code: '220-1201', logo: '/logos/comptia-aplus.svg',         landingPage: '/comptia-aplus-core1-labs',   comingSoon: true  },
  { name: 'A+ Core 2',  code: '220-1202', logo: '/logos/comptia-aplus.svg',         landingPage: '/comptia-aplus-core2-labs',   comingSoon: true  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function FortifyLearnPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F4F7FA' }}>
      <Helmet>
        <title>FortifyLearn — CompTIA prep platform with live PBQ labs and a full Exam Engine | Cy-Sec</title>
        <meta name="description" content="FortifyLearn is the Cy-Sec CompTIA prep platform. Two engines, one platform: PBQ Engine for live CLI, SIEM and visual-tool simulations, and Exam Engine for 1,000 MCQs per cert with timed mock exams. Network+, Security+, CySA+ and A+. Try a free lab — no card required." />
        <link rel="canonical" href="https://cy-sec.co.uk/fortifylearn" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[480px] flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80&fit=crop"
            alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg,rgba(6,14,31,0.97) 0%,rgba(11,29,58,0.95) 45%,rgba(8,80,120,0.80) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(8,145,178,1) 1px,transparent 1px),linear-gradient(to right,rgba(8,145,178,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-5" style={{ letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              CompTIA prep that puts you in
              <span style={{ background: 'linear-gradient(90deg,#7DD3E8,#0891B2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {' '}real environments.
              </span>
            </h1>
            <p className="text-white/65 leading-relaxed mb-7 max-w-lg text-[15px]">
              Two engines, one platform. <strong className="text-white/90">PBQ Engine</strong> gives you live CLI, SIEM and visual-tool simulations. <strong className="text-white/90">Exam Engine</strong> gives you 1,000 MCQs per cert plus timed mock exams. Every CompTIA cert in our catalogue.
            </p>
            <div className="flex gap-3 flex-wrap mb-6">
              <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-sm font-bold text-white hover:brightness-110 transition-all"
                style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                Try a free lab →
              </a>
              <Link to="/store"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-all">
                Browse all products
              </Link>
            </div>
            <div className="flex gap-5 flex-wrap">
              {['Free taster labs — no card needed', 'One-time purchase', 'Lifetime access'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/60" />{t}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img src="/screenshots/fl-dashboard.png" alt="FortifyLearn dashboard showing certification progress, score and daily streak" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE TWO ENGINES ── */}
      <section className="bg-white py-16 px-8 border-b border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">The platform</p>
            <h2 className="text-3xl font-black text-[#0B1D3A] mb-3" style={{ letterSpacing: '-0.8px' }}>Two engines, one platform.</h2>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              Use either on its own, or buy them together as an Exam Prep Bundle and save £24.98 per cert.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* PBQ ENGINE MODULE */}
            <div className="rounded-2xl overflow-hidden border border-[rgba(11,29,58,0.1)] bg-white flex flex-col">
              <div className="p-6 text-white" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0E5F8A 60%,#0891B2)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <img src="/logos/fortifylearn-favicon.svg" alt="FortifyLearn" className="h-10 w-10 flex-shrink-0" />
                  <h3 className="text-2xl font-black" style={{ letterSpacing: '-0.6px' }}>FortifyLearn PBQ Engine</h3>
                </div>
                <p className="text-white/70 text-[13px] leading-relaxed">
                  Performance-based questions on live CLI, SIEM and visual tooling. The way the exam actually tests you.
                </p>
              </div>
              <div className="bg-[#F4F7FA]">
                <img src="/screenshots/fl-netcap.png" alt="NETCAP Analyzer showing packet capture flow topology and TCP retransmits" className="w-full" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-2.5 mb-6">
                  {PBQ_FEATURES.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-slate-600 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2] flex-shrink-0 mt-1.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">From</p>
                    <p className="text-2xl font-black text-[#0B1D3A]" style={{ letterSpacing: '-0.6px' }}>£19.99 <span className="text-xs font-medium text-slate-400">per pack</span></p>
                  </div>
                  <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-white hover:brightness-110 transition-all flex items-center gap-1.5"
                    style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                    Try a free lab <ChevronRight size={14} strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            </div>

            {/* EXAM ENGINE MODULE */}
            <div className="rounded-2xl overflow-hidden border border-[rgba(11,29,58,0.1)] bg-white flex flex-col">
              <div className="p-6 text-white" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0E5F8A 60%,#0891B2)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <img src="/logos/fortifylearn-favicon.svg" alt="FortifyLearn" className="h-10 w-10 flex-shrink-0" />
                  <h3 className="text-2xl font-black" style={{ letterSpacing: '-0.6px' }}>FortifyLearn Exam Engine</h3>
                </div>
                <p className="text-white/70 text-[13px] leading-relaxed">
                  Study Mode for self-paced practice. Exam Mode for timed mocks. Scaled 100–900 scoring like the real thing.
                </p>
              </div>
              <div className="bg-[#F4F7FA]">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-[#0B1D3A] text-[#7DD3E8]">PBQ · Exam Mode</div>
                    <img src="/screenshots/fl-exam-netplus.png" alt="OSPF Adjacency Failure PBQ in Exam Mode" className="w-full h-44 object-cover object-top" />
                  </div>
                  <div className="relative border-l border-slate-200">
                    <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-[#0B1D3A] text-[#7DD3E8]">MCQ · Study Mode</div>
                    <img src="/screenshots/fl-mcq-netplus.png" alt="STP port cost MCQ in Study Mode with reasoning panel" className="w-full h-44 object-cover object-top" />
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-2.5 mb-6">
                  {EXAM_FEATURES.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-slate-600 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2] flex-shrink-0 mt-1.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">One-time</p>
                    <p className="text-2xl font-black text-[#0B1D3A]" style={{ letterSpacing: '-0.6px' }}>£24.99 <span className="text-xs font-medium text-slate-400">per cert</span></p>
                  </div>
                  <Link to="/store"
                    className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-white hover:brightness-110 transition-all flex items-center gap-1.5"
                    style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                    See Exam Engine <ChevronRight size={14} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Bundle savings callout */}
          <div className="mt-6 rounded-2xl p-5 bg-gradient-to-r from-[rgba(11,29,58,0.04)] to-[rgba(8,145,178,0.06)] border border-[rgba(8,145,178,0.15)] flex items-center gap-4 flex-wrap">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
              <Award size={18} strokeWidth={2} color="#7DD3E8" />
            </div>
            <div className="flex-1 min-w-[240px]">
              <p className="text-[14px] font-bold text-[#0B1D3A] mb-0.5" style={{ letterSpacing: '-0.2px' }}>Both engines, one purchase — Exam Prep Bundle</p>
              <p className="text-[12px] text-slate-500 leading-relaxed">10 PBQ labs, 1,000 MCQs and timed mock exams per cert. £39.99 — saves £24.98 vs buying separately.</p>
            </div>
            <Link to="/store" className="px-4 py-2 rounded-lg text-xs font-bold text-white whitespace-nowrap hover:brightness-110 transition-all" style={{ background: '#0891B2' }}>
              View bundles →
            </Link>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#F4F7FA] py-14 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">How it works</p>
          <h2 className="text-2xl font-extrabold text-[#0B1D3A] mb-8" style={{ letterSpacing: '-0.5px' }}>Three steps. Real practice.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-4 items-start p-5 rounded-2xl border border-[rgba(8,145,178,0.12)] bg-white">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black text-white"
                  style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                  {n}
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1D3A] text-[14px] mb-2 leading-snug">{title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIDE THE PBQ ENGINE ── */}
      <section className="bg-white py-14 px-8 border-t border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Inside the PBQ Engine</p>
          <h2 className="text-2xl font-extrabold text-[#0B1D3A] mb-8" style={{ letterSpacing: '-0.5px' }}>From briefing to results in one session.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { img: '/screenshots/fl-lab-briefing.png', lbl: 'Real scenario briefings', desc: 'Each lab starts with a realistic incident briefing, network topology, and the exact CompTIA objectives being tested.' },
              { img: '/screenshots/fl-results.png',       lbl: 'Instant objective-mapped results', desc: 'Submit and immediately see every graded check, which objectives it covers, and a targeted improvement plan.' },
            ].map(s => (
              <div key={s.lbl} className="bg-[#F4F7FA] rounded-2xl overflow-hidden border border-[rgba(8,145,178,0.12)]">
                <img src={s.img} alt={s.lbl} className="w-full" />
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0891B2] mb-1">{s.lbl}</p>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIDE THE EXAM ENGINE ── */}
      <section className="bg-[#F4F7FA] py-14 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Inside the Exam Engine</p>
          <h2 className="text-2xl font-extrabold text-[#0B1D3A] mb-8" style={{ letterSpacing: '-0.5px' }}>Practice and assess in one place.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: '/screenshots/fl-mcq-reasoning.png', lbl: 'Study Mode with full reasoning', desc: '1,000 MCQs per cert, each with a structured reasoning panel — why right answers are right and why every other option is wrong.' },
              { img: '/screenshots/fl-exam-question.png', lbl: 'Timed Exam Mode',                desc: 'PBQs and MCQs combined under one timer. Same question chrome, same time pressure, scaled 100–900 score.' },
              { img: '/screenshots/fl-readiness.png',     lbl: 'Readiness projection',           desc: 'Know when you\'re actually ready. PASS/FAIL projection against the 700 mark, focus-three weakest domains, and a 14-day trajectory.' },
            ].map(s => (
              <div key={s.lbl} className="bg-white rounded-2xl overflow-hidden border border-[rgba(8,145,178,0.12)]">
                <img src={s.img} alt={s.lbl} className="w-full" />
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0891B2] mb-1">{s.lbl}</p>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL TOOLS ── */}
      <section className="bg-white py-14 px-8 border-t border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">The visual moat</p>
          <h2 className="text-2xl font-extrabold text-[#0B1D3A] mb-3" style={{ letterSpacing: '-0.5px' }}>Tools you don't get from flashcards.</h2>
          <p className="text-slate-500 text-[14px] mb-8 max-w-2xl leading-relaxed">
            Every PBQ scenario uses real or representative tooling — not click-through diagrams. CLI sessions you can type into. SIEM consoles with alert correlation. Hardware diagnostics, EDR triage, packet captures you actually read. This is what CompTIA tests, and what flashcards can't deliver.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS.map(t => (
              <div key={t.lbl} className="rounded-xl overflow-hidden border border-[rgba(8,145,178,0.12)] bg-[#F4F7FA]">
                <img src={t.img} alt={t.lbl} className="w-full" />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-[11px] font-bold text-[#0891B2]">{t.lbl}</p>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[rgba(11,29,58,0.06)] text-[#0B1D3A]">{t.cert}</span>
                  </div>
                  <p className="text-[12px] text-slate-500 leading-snug">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERT SUPPORT STRIP ── */}
      <section className="bg-[#F4F7FA] py-14 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Available for</p>
          <h2 className="text-2xl font-extrabold text-[#0B1D3A] mb-8" style={{ letterSpacing: '-0.5px' }}>Every CompTIA cert in our catalogue.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CERTS.map(c => (
              <Link key={c.code} to={c.landingPage}
                className="group bg-white rounded-2xl border border-[rgba(8,145,178,0.12)] p-5 flex flex-col items-center text-center hover:border-[rgba(8,145,178,0.4)] transition-colors relative">
                {c.comingSoon && (
                  <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(245,158,11,0.12)', color: '#BA7517', border: '1px solid rgba(245,158,11,0.35)' }}>
                    Soon
                  </span>
                )}
                <img src={c.logo} alt={`CompTIA ${c.name}`} className="h-16 mb-3" />
                <p className="text-[14px] font-bold text-[#0B1D3A] leading-tight">{c.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{c.code}</p>
                <p className="text-[11px] font-semibold text-[#0891B2] mt-3 group-hover:underline">View labs →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-14 px-8" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0E5F8A 55%,#0891B2)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-3" style={{ letterSpacing: '-0.8px' }}>Ready to practise the way the exam tests you?</h2>
          <p className="text-white/65 text-[15px] mb-7 max-w-2xl mx-auto leading-relaxed">
            Free taster labs, no card needed. Buy the labs and Exam Engine you want à la carte, or grab the full Exam Prep Bundle and save £24.98 per cert.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-[#0B1D3A] bg-white hover:bg-slate-100 transition-all">
              Try a free lab →
            </a>
            <Link to="/store"
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-white border border-white/30 hover:bg-white/10 transition-all">
              Browse all products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

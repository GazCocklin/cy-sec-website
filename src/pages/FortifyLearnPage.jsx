import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Terminal, ListChecks, Lightbulb, ArrowRight, Layers, GitBranch, Network } from 'lucide-react';

// Navbar + Footer are rendered globally in App.jsx — do NOT add them here.
// Direction: bold, alternating full-bleed engine rows. Distinct from the
// homepage (which uses HeroFortifyLearn/ProofStrip) so the two aren't twins.

const NAVY = '#0B1D3A';
const TEAL = '#0891B2';

const STEPS = [
  { n: '01', title: 'Read the briefing', desc: 'A real scenario — a switch to configure, a capture to read, a host to harden.' },
  { n: '02', title: 'Work the live console', desc: 'Type into real Cisco IOS and Linux. No multiple choice, no hand-holding.' },
  { n: '03', title: 'Get scored, with reasoning', desc: 'Objective-by-objective grading and the why behind every result. Retry as often as you like.' },
];

const TOOLS = [
  { Icon: Terminal, label: 'Live CLI', sub: 'Cisco IOS and Linux shells' },
  { Icon: Network, label: 'Packet capture', sub: 'Read real Wireshark traces' },
  { Icon: GitBranch, label: 'Topology', sub: 'Multi-device network maps' },
  { Icon: Layers, label: 'Visual tools', sub: 'SIEM, cert chains, partitions' },
];

function BrowserFrame({ label, src, alt, dark }) {
  return (
    <div className="w-full rounded-[14px] overflow-hidden"
      style={{ border: dark ? '1px solid #1e3a5c' : '1px solid #e2e8f0', boxShadow: '0 24px 48px -20px rgba(11,29,58,.35)' }}>
      <div className="flex items-center gap-2 px-3.5 py-[10px]"
        style={{ background: dark ? '#0a1730' : '#f1f5f9', borderBottom: dark ? '1px solid #1e3a5c' : '1px solid #e2e8f0' }}>
        <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#ef4444' }} />
        <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#eab308' }} />
        <span className="w-[10px] h-[10px] rounded-full" style={{ background: '#10b981' }} />
        <span className="ml-2 text-[11px] font-mono" style={{ color: dark ? '#7DD3E8' : '#64748b' }}>{label}</span>
      </div>
      <img src={src} alt={alt} className="block w-full h-auto" style={{ background: dark ? '#06101f' : '#fff' }} />
    </div>
  );
}

function EngineLabel({ Icon, n }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon size={18} style={{ color: TEAL }} strokeWidth={2.2} />
      <span className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: TEAL }}>Engine {n}</span>
    </div>
  );
}

export default function FortifyLearnPage() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>FortifyLearn — realistic PBQ labs and a full Exam Engine for CompTIA | Cy-Sec</title>
        <meta name="description" content="FortifyLearn is two engines in one platform: a PBQ Engine with live Cisco IOS and Linux labs, and an Exam Engine with 1,000 MCQs and full timed mock exams. Network+, Security+, CySA+ and A+. Start a free taster lab — no card required." />
        <link rel="canonical" href="https://cy-sec.co.uk/fortifylearn" />
      </Helmet>

      {/* ── HERO — split, 30% proof panel ── */}
      <section className="border-b" style={{ borderColor: '#e2e8f0' }}>
        <div className="grid lg:grid-cols-[1.1fr_.9fr]">
          <div className="px-8 lg:px-14 py-16 lg:py-20 flex items-center">
            <div className="max-w-xl">
              <div className="text-[11px] font-bold tracking-[0.14em] uppercase mb-4" style={{ color: TEAL }}>
                FortifyLearn · CompTIA exam prep
              </div>
              <h1 className="font-extrabold" style={{ color: NAVY, fontSize: 46, lineHeight: 1.04, letterSpacing: '-0.025em' }}>
                The exam is 30% hands-on.<br />
                <span style={{ color: TEAL }}>So is your prep.</span>
              </h1>
              <p className="text-[17px] leading-relaxed text-slate-600 mt-5 mb-8 max-w-[520px]">
                Performance-based questions are up to 30% of every CompTIA exam — and they can't be guessed.
                FortifyLearn is two engines in one platform: realistic PBQ labs, then a full timed Exam Engine.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl px-7 py-[14px] text-white font-semibold text-base transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg,#0891B2,#06B6D4)', boxShadow: '0 8px 24px -6px rgba(8,145,178,.5)' }}>
                  Start free taster labs <ArrowRight size={18} strokeWidth={2.5} />
                </a>
                <Link to="/store"
                  className="inline-flex items-center rounded-xl px-7 py-[14px] font-semibold text-base transition-colors"
                  style={{ border: '1.5px solid #0891B2', color: TEAL }}>
                  See all labs and pricing
                </Link>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center px-8 lg:px-10 py-16 lg:py-20"
            style={{ background: 'linear-gradient(135deg,#0B1D3A 0%,#0E5F8A 55%,#0891B2 100%)' }}>
            <div className="absolute top-6 left-6 rounded-full text-white text-[12px] font-semibold px-3.5 py-1.5"
              style={{ background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.28)' }}>
              30% of the exam is PBQs
            </div>
            <div className="w-full max-w-[540px]">
              <BrowserFrame label="fortifylearn.co.uk — Readiness" src="/screenshots/fl-readiness-hero.png"
                alt="FortifyLearn readiness report: a 746 of 900 projected CompTIA Network+ score marked pass, with the three weakest domains to focus on" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION INTRO ── */}
      <section className="max-w-3xl mx-auto px-8 pt-16 pb-2 text-center">
        <h2 className="text-3xl font-extrabold" style={{ color: NAVY, letterSpacing: '-0.02em' }}>Two engines, one platform.</h2>
        <p className="text-[17px] text-slate-600 mt-3">
          Practise the hands-on tasks, then prove your readiness under timed conditions — in one place.
        </p>
      </section>

      {/* ── ENGINE 01 — PBQ (text left / dark visual right) ── */}
      <section className="border-t mt-10" style={{ borderColor: '#e2e8f0' }}>
        <div className="grid lg:grid-cols-2 items-stretch">
          <div className="px-8 lg:px-14 py-14 flex items-center">
            <div className="max-w-lg">
              <EngineLabel Icon={Terminal} n="01" />
              <h3 className="text-2xl font-extrabold mb-3" style={{ color: NAVY, letterSpacing: '-0.01em' }}>PBQ Engine</h3>
              <p className="text-[16px] leading-relaxed text-slate-600 mb-5">
                Live Cisco IOS and Linux topology. Real CLI grading. The simulations flashcards can't touch.
              </p>
              <div className="text-[15px] font-semibold" style={{ color: '#334155' }}>
                Live console · objective-mapped · unlimited retries
              </div>
            </div>
          </div>
          <div className="flex items-center px-8 lg:px-12 py-12" style={{ background: NAVY }}>
            <BrowserFrame dark label="PBQ Engine — lab briefing" src="/screenshots/fl-lab-briefing.png"
              alt="FortifyLearn PBQ lab briefing: a scenario and the objectives to complete on a live console" />
          </div>
        </div>
      </section>

      {/* ── ENGINE 02 — Exam (light visual left / text right) ── */}
      <section className="border-t" style={{ borderColor: '#e2e8f0' }}>
        <div className="grid lg:grid-cols-2 items-stretch">
          <div className="flex items-center px-8 lg:px-12 py-12 order-last lg:order-first" style={{ background: '#F4F7FA' }}>
            <BrowserFrame label="Exam Engine — question" src="/screenshots/fl-exam-question.png"
              alt="FortifyLearn Exam Engine: a multiple-choice question with answer options" />
          </div>
          <div className="px-8 lg:px-14 py-14 flex items-center">
            <div className="max-w-lg">
              <EngineLabel Icon={ListChecks} n="02" />
              <h3 className="text-2xl font-extrabold mb-3" style={{ color: NAVY, letterSpacing: '-0.01em' }}>Exam Engine</h3>
              <p className="text-[16px] leading-relaxed text-slate-600 mb-5">
                1,000 MCQs with reasoning, full timed mock exams, and a readiness score that tells you when you're ready.
              </p>
              <div className="text-[15px] font-semibold" style={{ color: '#334155' }}>
                1,000 MCQs with reasoning · timed mocks · 100–900 scaled score
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-8 py-16" style={{ background: NAVY }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-8" style={{ letterSpacing: '-0.01em' }}>Three steps. Real practice.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)' }}>
                <div className="text-[13px] font-extrabold mb-2" style={{ color: '#22D3EE' }}>{s.n}</div>
                <h3 className="text-white font-bold text-[16px] mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.66)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVERY ANSWER EXPLAINED ── */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={18} style={{ color: TEAL }} strokeWidth={2.2} />
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: TEAL }}>Study mode</span>
            </div>
            <h2 className="text-3xl font-extrabold mb-3" style={{ color: NAVY, letterSpacing: '-0.02em' }}>Every answer, explained.</h2>
            <p className="text-[17px] leading-relaxed text-slate-600 max-w-lg">
              You don't just find out whether you were right — every question spells out why the correct answer works and why each other option doesn't. You learn the concept, not the answer key.
            </p>
          </div>
          <BrowserFrame label="fortifylearn.co.uk — Study Mode" src="/screenshots/fl-mcq-reasoning.png"
            alt="FortifyLearn study mode: a multiple-choice question with the correct answer, a full explanation, and why each other option is wrong" />
        </div>
      </section>

      {/* ── VISUAL TOOLS ── */}
      <section className="px-8 py-16 border-t" style={{ background: '#F4F7FA', borderColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-8" style={{ color: NAVY, letterSpacing: '-0.01em' }}>Tools you don't get from flashcards.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS.map((t) => (
              <div key={t.label} className="rounded-2xl bg-white p-5" style={{ border: '0.5px solid #e2e8f0' }}>
                <t.Icon size={22} style={{ color: TEAL }} strokeWidth={2} />
                <h3 className="font-bold text-[15px] mt-3 mb-1" style={{ color: NAVY }}>{t.label}</h3>
                <p className="text-[13px] text-slate-500">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE TASTER BANNER (external) ── */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-wrap rounded-2xl px-8 py-7"
          style={{ background: 'rgba(16,185,129,.07)', border: '1px solid rgba(16,185,129,.25)' }}>
          <div>
            <p className="text-[17px] font-bold mb-1" style={{ color: NAVY }}>Try before you buy — taster labs are always free.</p>
            <p className="text-sm text-slate-600">Two Network+ and two Security+ tasters (CLI + visual). Just enter your email — no card needed.</p>
          </div>
          <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
            style={{ color: '#10B981', background: 'rgba(16,185,129,.12)', border: '1px solid rgba(16,185,129,.3)' }}>
            Start free labs <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}

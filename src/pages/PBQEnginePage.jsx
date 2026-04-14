import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Terminal, CheckCircle, Layers, Clock, Target, BookOpen, Zap, ArrowRight, Shield, Lock } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: '01',
    title: 'Choose your certification and difficulty',
    desc: 'Pick from Network+, Security+ or CySA+. Start with a free taster lab — no card required. Unlock harder scenarios when you\'re ready.',
    icon: BookOpen,
  },
  {
    n: '02',
    title: 'Work through a realistic scenario',
    desc: 'A real incident briefing, live CLI environment or interactive visual tool, and graded checks mapped to specific CompTIA objectives.',
    icon: Terminal,
  },
  {
    n: '03',
    title: 'Get instant objective-mapped results',
    desc: 'Submit and see every graded check, which passed and which failed, the objective codes they cover, and a targeted improvement plan.',
    icon: Target,
  },
];

const TOOLS = [
  { img: '/screenshots/fl-netsim.png',    lbl: 'FL-NETSIM v2.0',          cert: 'Network+',  desc: 'Live Cisco IOS terminal with available commands panel. Real switch and router environments.' },
  { img: '/screenshots/fl-netcap.png',    lbl: 'NETCAP Analyzer v3.2',    cert: 'Network+',  desc: 'Packet capture flow topology showing asymmetric routing paths and TCP retransmits.' },
  { img: '/screenshots/fl-fortiguard.png',lbl: 'FORTIGUARD Auditor v3.1', cert: 'Security+', desc: 'Visual firewall rule audit table with hit distribution charts and anomaly indicators.' },
  { img: '/screenshots/fl-siem.png',      lbl: 'Arclight SIEM v5.0.3',    cert: 'CySA+',     desc: 'Live alert triage dashboard with event correlation, filtering, and containment workflows.' },
  { img: '/screenshots/fl-linux-cli.png', lbl: 'Linux CLI',               cert: 'Security+', desc: 'Real Linux terminal for SSH hardening, permission auditing, and service investigation.' },
  { img: '/screenshots/fl-netscan.png',   lbl: 'NETSCAN PRO v4.2.1',      cert: 'CySA+',     desc: 'CVSS-scored vulnerability findings across multiple hosts with remediation triage.' },
];

const CERTS = [
  {
    name: 'CompTIA Network+', code: 'N10-009',
    logo: '/logos/comptia-network-plus.svg',
    landingPage: '/comptia-network-plus-labs',
    heroImg: '/screenshots/fl-netcap.png',
    toolLabel: 'NETCAP Analyzer v3.2',
    accent: '#10b981',
    packs: 2, labs: 10, hasFree: true,
    desc: 'Cisco IOS troubleshooting — VLANs, ACLs, routing, DHCP, port security. Pack 2 adds FL-NETSIM topology, NETCAP packet analyser, and NETPULSE NMS.',
  },
  {
    name: 'CompTIA Security+', code: 'SY0-701',
    logo: '/logos/comptia-security-plus.svg',
    landingPage: '/comptia-security-plus-labs',
    heroImg: '/screenshots/fl-fortiguard.png',
    toolLabel: 'FORTIGUARD Policy Auditor v3.1',
    accent: '#0891B2',
    packs: 2, labs: 10, hasFree: true,
    desc: 'Linux server hardening — firewalls, file permissions, legacy services, privilege escalation. Pack 2 adds FORTIGUARD visual firewall audit, MFA enforcement, PKI management.',
  },
  {
    name: 'CompTIA CySA+', code: 'CS0-003',
    logo: '/logos/comptia-cysa-plus.svg',
    landingPage: '/comptia-cysa-plus-labs',
    heroImg: '/screenshots/fl-siem.png',
    toolLabel: 'Arclight SIEM v5.0.3',
    accent: '#0B1D3A',
    packs: 2, labs: 10, hasFree: false,
    desc: 'Threat investigation, SIEM alert triage, vulnerability assessment. Pack 2 adds Arclight SIEM dashboard and NETSCAN PRO — the visual tooling CS0-003 tests directly.',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PBQEnginePage() {
  return (
    <div className="min-h-screen" style={{ background: '#F4F7FA' }}>
      <Helmet>
        <title>FortifyLearn PBQ Engine — CompTIA Performance-Based Questions | Cy-Sec</title>
        <meta name="description" content="CompTIA PBQ simulation labs for Network+, Security+ and CySA+. Live Cisco IOS and Linux CLI environments, interactive SIEM and firewall audit tools, objective-mapped scoring. Try free — no card required." />
        <link rel="canonical" href="https://cy-sec.co.uk/pbq-engine" />
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border text-xs font-bold tracking-wider uppercase"
              style={{ background: 'rgba(8,145,178,0.15)', borderColor: 'rgba(8,145,178,0.35)', color: '#7DD3E8' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]" />
              CompTIA Authorised Partner — FortifyLearn
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-5" style={{ letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              CompTIA PBQ simulations.<br />
              <span style={{ background: 'linear-gradient(90deg,#7DD3E8,#0891B2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Not flashcards.
              </span><br />
              Real CLI environments.
            </h1>
            <p className="text-white/60 leading-relaxed mb-7 max-w-lg text-[15px]">
              <strong className="text-white/90">Performance-based questions</strong> with live Cisco IOS and Linux terminals, interactive SIEM dashboards, firewall auditors, and packet analysers — mapped to specific CompTIA objectives. Network+, Security+ and CySA+.
            </p>
            <div className="flex gap-3 flex-wrap mb-6">
              <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-sm font-bold text-white hover:brightness-110 transition-all"
                style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                Try a free lab →
              </a>
              <Link to="/store"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-all">
                Buy packs from £19.99
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
              <img src="/screenshots/fl-dashboard.png" alt="FortifyLearn dashboard showing score, streak and exam objectives" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-14 px-8 border-b border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">How it works</p>
          <h2 className="text-2xl font-extrabold text-[#0B1D3A] mb-8" style={{ letterSpacing: '-0.5px' }}>Three steps. Real practice.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map(({ n, title, desc, icon: Icon }) => (
              <div key={n} className="flex gap-4 items-start p-5 rounded-2xl border border-[rgba(8,145,178,0.12)] bg-[#F4F7FA]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black"
                  style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff' }}>
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

      {/* ── LAB SCREENSHOTS — 2 key ones side by side ── */}
      <section className="bg-[#F4F7FA] py-14 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Inside a lab</p>
          <h2 className="text-2xl font-extrabold text-[#0B1D3A] mb-8" style={{ letterSpacing: '-0.5px' }}>From briefing to results in one session.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { img: '/screenshots/fl-lab-briefing.png', lbl: 'Real scenario briefings', desc: 'Each lab starts with a realistic incident briefing, network topology, and the exact CompTIA objectives being tested.' },
              { img: '/screenshots/fl-results.png',       lbl: 'Instant objective-mapped results', desc: 'Submit and immediately see every graded check, which objectives it covers, and a targeted improvement plan.' },
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
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Interactive simulation tools</p>
          <h2 className="text-2xl font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.5px' }}>No other CompTIA prep platform has these.</h2>
          <p className="text-[15px] text-slate-500 mb-8 max-w-2xl">Six interactive tools across the three certifications — not described in documentation, actually used in the labs.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map(t => (
              <div key={t.lbl} className="bg-[#F4F7FA] rounded-xl overflow-hidden border border-[rgba(8,145,178,0.12)] hover:border-[rgba(8,145,178,0.3)] transition-colors">
                <div className="relative">
                  <img src={t.img} alt={t.lbl} className="w-full object-cover" style={{ height: 140, objectPosition: 'top' }} />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-2"
                    style={{ background: 'linear-gradient(to top,rgba(6,14,31,0.85),transparent)' }}>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                      style={{ background: 'rgba(6,14,31,0.7)', border: '1px solid rgba(8,145,178,0.4)', color: '#7DD3E8' }}>
                      {t.lbl}
                    </span>
                    <span className="text-[9px] font-bold px-2 py-1 rounded text-white/60"
                      style={{ background: 'rgba(6,14,31,0.5)' }}>
                      {t.cert}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[12px] text-slate-500 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="bg-[#F4F7FA] py-14 px-8 border-t border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Available certifications</p>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="text-2xl font-extrabold text-[#0B1D3A]" style={{ letterSpacing: '-0.5px' }}>Two packs per certification. Ten labs each.</h2>
            <Link to="/store" className="text-sm font-bold text-[#0891B2] hover:underline">View the store →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTS.map(cert => (
              <div key={cert.code} className="bg-white rounded-2xl overflow-hidden border border-[rgba(8,145,178,0.15)] hover:shadow-lg hover:border-[rgba(8,145,178,0.35)] transition-all">
                {/* Tool screenshot header */}
                <div className="relative overflow-hidden" style={{ height: 130 }}>
                  <img src={cert.heroImg} alt={cert.toolLabel} className="w-full h-full object-cover" style={{ objectPosition: 'top' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 0%,rgba(6,14,31,0.75) 100%)' }} />
                  <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                      style={{ background: 'rgba(6,14,31,0.75)', border: '1px solid rgba(8,145,178,0.4)', color: '#7DD3E8' }}>
                      {cert.toolLabel}
                    </span>
                    {cert.hasFree && (
                      <span className="text-[9px] font-bold px-2 py-1 rounded bg-[#0891B2] text-white">Free taster</span>
                    )}
                  </div>
                </div>
                {/* Cert info */}
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <img src={cert.logo} alt={cert.name} className="w-8 h-8 object-contain flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: cert.accent }}>{cert.code}</p>
                      <h3 className="font-extrabold text-[#0B1D3A] text-sm leading-tight">{cert.name}</h3>
                    </div>
                  </div>
                  <p className="text-[12px] text-slate-500 leading-relaxed mb-4">{cert.desc}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#F4F7FA] rounded-lg px-3 py-2 text-center">
                      <p className="text-base font-black text-[#0891B2]">{cert.labs}</p>
                      <p className="text-[10px] text-slate-400">labs total</p>
                    </div>
                    <div className="flex-1 bg-[#F4F7FA] rounded-lg px-3 py-2 text-center">
                      <p className="text-base font-black text-[#0B1D3A]">{cert.packs}</p>
                      <p className="text-[10px] text-slate-400">packs</p>
                    </div>
                    <div className="flex-1 bg-[#F4F7FA] rounded-lg px-3 py-2 text-center">
                      <p className="text-base font-black text-[#0B1D3A]">£19.99</p>
                      <p className="text-[10px] text-slate-400">per pack</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Link to={cert.landingPage}
                      className="flex-1 text-center text-xs font-bold px-3 py-2.5 rounded-lg border hover:brightness-110 transition-all"
                      style={{ borderColor: 'rgba(8,145,178,0.3)', color: '#0891B2', background: 'rgba(8,145,178,0.06)' }}>
                      View all labs →
                    </Link>
                    <Link to="/store"
                      className="flex-1 text-center text-xs font-bold px-3 py-2.5 rounded-lg text-white hover:brightness-110 transition-all"
                      style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                      Buy pack →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-white py-10 px-8 border-t border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Lock, label: 'Secure checkout via Stripe', sub: 'Account created at checkout — no sign-up needed' },
            { icon: CheckCircle, label: 'Exam objective mapped', sub: 'Every check maps to a specific CompTIA domain' },
            { icon: Clock, label: 'Unlimited retries, Lifetime access', sub: 'Run each lab as many times as you need' },
            { icon: Shield, label: 'CompTIA Authorised Partner', sub: 'Developed and delivered by Cy-Sec' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex gap-3 items-start p-4 bg-[#F4F7FA] rounded-xl border border-[rgba(8,145,178,0.1)]">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(8,145,178,0.08)', border: '1px solid rgba(8,145,178,0.2)' }}>
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

      {/* ── CTA ── */}
      <section className="py-16 px-8" style={{ background: '#0B1D3A' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-px h-12 bg-[rgba(8,145,178,0.4)] mx-auto mb-6" />
          <h2 className="text-2xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.5px' }}>Ready to pass your CompTIA exam?</h2>
          <p className="text-white/50 mb-8 text-[15px]">Try a free lab — no card required. Or buy a pack to unlock all difficulty levels.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
              className="px-7 py-3 rounded-xl text-sm font-bold text-white hover:brightness-110 transition-all"
              style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', border: '1px solid rgba(8,145,178,0.4)' }}>
              Try a free lab →
            </a>
            <Link to="/store"
              className="px-7 py-3 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-all">
              Buy packs from £19.99
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

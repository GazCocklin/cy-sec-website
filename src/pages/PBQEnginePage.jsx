import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import FortifyLearnLogo from '@/components/logos/FortifyLearnLogo';
import { Terminal, ArrowRight, CheckCircle, Layers, Clock, Target, BookOpen, Zap, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Terminal, title: 'Live Cisco IOS Environment', desc: 'Real router and switch terminals — show run, ping, traceroute, show access-lists, and more.' },
  { icon: Layers, title: 'Multi-Device Topologies', desc: 'Investigate faults across workstations, switches, routers, firewalls, and servers simultaneously.' },
  { icon: Target, title: 'Objective-by-Objective Scoring', desc: 'Every check maps to a CompTIA exam objective so you know exactly where you stand.' },
  { icon: BookOpen, title: 'Study & Exam Modes', desc: 'Study mode gives guided hints. Exam mode is timed and scored against the full objective set.' },
  { icon: Clock, title: 'Timed Simulations', desc: 'From 20-minute beginner scenarios to 40-minute expert multi-fault topologies.' },
  { icon: Zap, title: 'Instant Results', desc: 'Submit and see exactly which checks passed, which failed, and why — with explanations.' },
];

const certs = [
  { name: 'CompTIA Network+', code: 'N10-009', levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], free: 'Beginner', logo: '/logos/comptia-network-plus.svg' },
  { name: 'CompTIA Security+', code: 'SY0-701', levels: ['Easy', 'Intermediate', 'Hard', 'Expert'], free: 'Easy', logo: '/logos/comptia-security-plus.svg' },
  { name: 'CompTIA CySA+', code: 'CS0-003', levels: ['Easy', 'Intermediate', 'Hard', 'Expert'], free: null, logo: '/logos/comptia-cysa-plus.svg' },
];

// ── Screenshot mockup components ──

function LabPickerMockup() {
  const labs = [
    { title: 'DNS Server Misconfiguration', cert: 'N10-009', difficulty: 'Beginner', free: true, time: '20 min', devices: 3 },
    { title: 'Default Gateway Fault Diagnosis', cert: 'N10-009', difficulty: 'Intermediate', free: false, time: '25 min', devices: 4 },
    { title: 'DMZ ACL Troubleshooting', cert: 'N10-009', difficulty: 'Intermediate', free: false, time: '30 min', devices: 5 },
    { title: 'Dual ACL Fault — Multi-VLAN Routing', cert: 'N10-009', difficulty: 'Advanced', free: false, time: '35 min', devices: 6 },
    { title: 'Enterprise Multi-Fault Recovery', cert: 'N10-009', difficulty: 'Expert', free: false, time: '40 min', devices: 8 },
  ];
  const diffColor = { Beginner: '#10b981', Intermediate: '#0891B2', Advanced: '#8b5cf6', Expert: '#ef4444' };

  return (
    <div className="bg-[#0A1628] rounded-2xl overflow-hidden border border-white/10 shadow-2xl text-xs">
      {/* Title bar */}
      <div className="bg-[#071220] px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-slate-400 text-xs">FortifyLearn — Lab Library</span>
        <span className="text-slate-600 text-xs">N10-009 Network+</span>
      </div>
      {/* Filter bar */}
      <div className="px-4 py-2.5 flex items-center gap-3 border-b border-white/5 bg-[#0c1a2e]">
        <span className="text-slate-400">Filter:</span>
        {['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map((f, i) => (
          <span key={f} className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={i === 0 ? { background: 'rgba(8,145,178,0.2)', color: '#22d3ee', border: '1px solid rgba(8,145,178,0.4)' } : { background: 'rgba(255,255,255,0.05)', color: '#64748b' }}>
            {f}
          </span>
        ))}
      </div>
      {/* Lab rows */}
      <div className="divide-y divide-white/5">
        {labs.map((lab, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-white/[0.03] transition-colors">
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white text-xs font-medium">{lab.title}</span>
                {lab.free && <span className="px-1.5 py-0.5 rounded text-xs font-bold" style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>FREE</span>}
              </div>
              <div className="flex items-center gap-3">
                <span style={{ color: diffColor[lab.difficulty] || '#64748b' }} className="font-semibold">{lab.difficulty}</span>
                <span className="text-slate-500">{lab.time}</span>
                <span className="text-slate-500">{lab.devices} devices</span>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={lab.free ? { background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' } : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>
              {lab.free ? 'Start Free' : 'Start Lab'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LabTerminalMockup() {
  return (
    <div className="bg-[#030D18] rounded-2xl overflow-hidden border border-white/10 shadow-2xl font-mono">
      {/* Title bar */}
      <div className="bg-[#071624] px-4 py-2.5 flex items-center gap-3 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        {/* Device tabs */}
        <div className="flex gap-1 flex-1">
          {['ROUTER-01 · IOS', 'SW-CORE · IOS', 'FW-01 · ASA', 'PC-USER'].map((d, i) => (
            <span key={d} className="px-2.5 py-1 rounded text-xs"
              style={i === 0 ? { background: 'rgba(8,145,178,0.2)', color: '#22d3ee', border: '1px solid rgba(8,145,178,0.3)' } : { color: '#475569', background: 'rgba(255,255,255,0.03)' }}>
              {d}
            </span>
          ))}
        </div>
        <span className="text-slate-500 text-xs ml-auto">DMZ ACL Troubleshooting · 28:42 remaining</span>
      </div>
      {/* Terminal */}
      <div className="p-5 space-y-1 text-xs">
        <p><span className="text-green-400">Router#</span> <span className="text-slate-200">show access-lists</span></p>
        <p className="text-slate-400">Extended IP access list DMZ_IN</p>
        <p><span className="text-green-300 ml-4">10 permit tcp 10.10.10.0 0.0.0.255 any eq 443</span></p>
        <p><span className="text-green-300 ml-4">20 permit tcp 10.10.10.0 0.0.0.255 any eq 80</span></p>
        <p><span className="text-red-400 ml-4">30 deny   ip any any log</span></p>
        <p className="mt-2"><span className="text-green-400">Router#</span> <span className="text-slate-200">show ip interface GigabitEthernet0/1</span></p>
        <p className="text-slate-400">GigabitEthernet0/1 is up, line protocol is up</p>
        <p className="text-slate-400 ml-4">Inbound  access list is DMZ_IN</p>
        <p className="text-yellow-400 ml-4">Outbound access list is not set</p>
        <p className="mt-2"><span className="text-green-400">Router#</span> <span className="text-slate-200">debug ip packet 110</span></p>
        <p className="text-cyan-300">IP packet debugging is on for access list 110</p>
        <p className="text-slate-400">IP: s=10.10.10.5 (GigabitEthernet0/1), d=172.16.0.10, len 64, rcvd 4</p>
        <p className="text-red-400">IP: s=10.10.10.5, d=172.16.0.10 -- denied by DMZ_IN (30)</p>
        <p className="mt-2"><span className="text-green-400">Router#</span> <span className="animate-pulse">▌</span></p>
      </div>
    </div>
  );
}

function ResultsMockup() {
  const checks = [
    { pass: true, text: 'ACL 101 rule ordering is correct', obj: '3.3' },
    { pass: true, text: 'Permitted HTTPS traffic reaches 172.16.0.10', obj: '3.3' },
    { pass: true, text: 'ACL applied inbound on GigE0/1', obj: '3.4' },
    { pass: false, text: 'Outbound ACL configured on GigE0/0', obj: '3.4' },
    { pass: true, text: 'Implicit deny logs blocked traffic', obj: '3.3' },
    { pass: false, text: 'ICMP to internal subnet is blocked', obj: '3.3' },
    { pass: true, text: 'ACL syntax valid — no config errors', obj: '3.2' },
    { pass: true, text: 'Extended ACL used (not standard)', obj: '3.2' },
    { pass: true, text: 'Rule applied to correct interface direction', obj: '3.4' },
  ];
  const passed = checks.filter(c => c.pass).length;
  const pct = Math.round((passed / checks.length) * 100);

  return (
    <div className="bg-[#0A1628] rounded-2xl overflow-hidden border border-white/10 shadow-2xl text-xs">
      <div className="bg-[#071220] px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-slate-400 text-xs">FortifyLearn — Lab Results</span>
        <span className="text-slate-600 text-xs">N10-009 · Intermediate</span>
      </div>
      {/* Score header */}
      <div className="px-5 py-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-sm">DMZ ACL Troubleshooting</h3>
            <p className="text-slate-400 mt-0.5">Completed in 18:34 · Exam mode</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black" style={{ color: pct >= 75 ? '#34d399' : '#f59e0b' }}>{pct}%</div>
            <div className="text-slate-400">{passed}/{checks.length} checks</div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: pct >= 75 ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #f59e0b, #fcd34d)' }} />
        </div>
      </div>
      {/* Check list */}
      <div className="divide-y divide-white/5 max-h-56 overflow-y-auto">
        {checks.map((c, i) => (
          <div key={i} className="px-4 py-2.5 flex items-center gap-3">
            {c.pass
              ? <CheckCircle size={13} className="flex-shrink-0" style={{ color: '#34d399' }} />
              : <XCircle size={13} className="flex-shrink-0" style={{ color: '#f87171' }} />}
            <span className={c.pass ? 'text-slate-300' : 'text-red-300'}>{c.text}</span>
            <span className="ml-auto text-xs font-mono px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#64748b' }}>
              {c.obj}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PBQEnginePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>FortifyLearn PBQ Simulator — CompTIA Performance-Based Questions | Cy-Sec</title>
        <meta name="description" content="Practise CompTIA performance-based questions with live Cisco IOS topology. Network+, Security+ and CySA+ PBQ simulations with real CLI commands and objective-mapped scoring." />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0D2040 50%, #061428 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(to right, #0891B2 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="mb-2"><FortifyLearnLogo height={32} /></div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                CompTIA PBQ simulations.<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #06B6D4, #0891B2)' }}>
                  Actually realistic.
                </span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Performance-based questions with live Cisco IOS topology, real CLI commands, and instant objective-mapped scoring. The closest thing to the real exam.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-7 py-5 border-0">
                    Try Free Lab <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="https://fortifylearn.co.uk/pbq-lab" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-7 py-5 bg-transparent">
                    Browse All Labs
                  </Button>
                </a>
              </div>
              <p className="text-white/40 text-sm">One free Network+ and one free Security+ lab — just enter your email.</p>
            </motion.div>

            {/* Hero terminal */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <LabTerminalMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Built for exam-ready practice</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Not multiple choice. Real CLI. Real topology. Real scoring.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:border-slate-200 transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(8,145,178,0.08)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#0891B2' }} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCREENSHOT: Lab Picker ── */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891B2' }}>Lab Library</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-5">Pick your challenge level</h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                Every certification has labs spanning Beginner through Expert difficulty. Start with a free taster — no card required — then unlock the full pack when you're ready to go deeper.
              </p>
              <ul className="space-y-3">
                {[
                  { colour: '#10b981', label: 'Beginner', note: 'Free — just enter your email' },
                  { colour: '#0891B2', label: 'Intermediate', note: 'Requires paid pack' },
                  { colour: '#8b5cf6', label: 'Advanced', note: 'Multi-fault topologies' },
                  { colour: '#ef4444', label: 'Expert', note: 'Enterprise-scale scenarios' },
                ].map(d => (
                  <li key={d.label} className="flex items-center gap-3 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.colour }} />
                    <span className="font-semibold text-slate-700">{d.label}</span>
                    <span className="text-slate-400">— {d.note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <LabPickerMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SCREENSHOT: Results ── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <ResultsMockup />
            </motion.div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891B2' }}>Instant Scoring</p>
              <h2 className="text-3xl font-bold text-white mb-5">Know exactly where you stand</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Submit your lab and get a breakdown of every graded check, mapped to the CompTIA exam objective it covers. No guessing — you see precisely which skills need more work before exam day.
              </p>
              <ul className="space-y-3">
                {[
                  'Each check tied to a specific CompTIA exam objective code',
                  'Pass/fail per check with explanations in study mode',
                  'Overall score and time-on-task for every attempt',
                  'Re-attempt as many times as you need — no limits',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#0891B2' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Available certifications</h2>
            <p className="text-slate-500">Beginner labs are free. Paid packs unlock all difficulty levels.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {certs.map(cert => (
              <div key={cert.code} className="border border-slate-200 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <img src={cert.logo} alt={cert.name} className="w-10 h-10 object-contain" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#0891B2' }}>{cert.code}</p>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">{cert.name}</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {cert.levels.map(level => (
                    <div key={level} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-700 text-sm font-medium">{level}</span>
                      </div>
                      {level === cert.free
                        ? <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Free</span>
                        : <span className="text-xs text-slate-400">Paid pack</span>}
                    </div>
                  ))}
                </div>
                <a href="https://fortifylearn.co.uk/pbq-lab" target="_blank" rel="noopener noreferrer"
                  className="mt-8 flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: '#0891B2' }}>
                  Start practising <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: '#0A1628' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to pass your CompTIA exam?</h2>
          <p className="text-slate-400 mb-8">Create a free account and start with a beginner lab in under 2 minutes.</p>
          <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer">
            <Button className="font-semibold px-8 py-5 border-0 text-base text-slate-900"
              style={{ background: '#0891B2' }}>
              Launch FortifyLearn <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default PBQEnginePage;

import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import FortifyLearnLogo from '@/components/logos/FortifyLearnLogo';
import { Terminal, ArrowRight, CheckCircle, Layers, Clock, Target, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Terminal, title: 'Representative Cisco IOS & Linux Environment', desc: 'Representative router, switch and server terminals — type show run, grep, iptables, ss -an, and see realistic output.' },
  { icon: Layers, title: 'Multi-Device Topologies', desc: 'Investigate faults across workstations, switches, routers, firewalls, and servers simultaneously.' },
  { icon: Target, title: 'Objective-by-Objective Scoring', desc: 'Every check maps to a CompTIA exam objective so you know exactly where you stand.' },
  { icon: BookOpen, title: 'Study & Exam Modes', desc: 'Study mode gives guided hints. Exam mode is timed and scored against the full objective set.' },
  { icon: Clock, title: 'Timed Simulations', desc: 'From 20-minute beginner scenarios to 40-minute expert multi-fault topologies.' },
  { icon: Zap, title: 'Instant Results & Improvement Plans', desc: 'Submit and see which checks passed, which failed, and a targeted study plan for each gap.' },
];

const certs = [
  { name: 'CompTIA Network+', code: 'N10-009', levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], free: 'Beginner', logo: '/logos/comptia-network-plus.svg' },
  { name: 'CompTIA Security+', code: 'SY0-701', levels: ['Easy', 'Intermediate', 'Hard', 'Expert'], free: 'Easy', logo: '/logos/comptia-security-plus.svg' },
  { name: 'CompTIA CySA+', code: 'CS0-003', levels: ['Easy', 'Intermediate', 'Hard', 'Expert'], free: null, logo: '/logos/comptia-cysa-plus.svg' },
];

const screenshots = [
  {
    img: '/screenshots/fl-dashboard.png',
    alt: 'FortifyLearn dashboard showing score, daily streak and strengths vs focus areas',
    label: 'Your Dashboard',
    caption: 'Track your average score, daily streak, and see exactly which CompTIA objectives are strengths and which need more work — all in one place.',
    side: 'right',
  },
  {
    img: '/screenshots/fl-lab-picker.png',
    alt: 'FortifyLearn lab picker showing difficulty levels for CompTIA CySA+',
    label: 'Choose Your Level',
    caption: 'Every certification has labs from Easy through Expert. Start with a free taster — no card required — then unlock harder labs when you\'re ready.',
    side: 'left',
  },
  {
    img: '/screenshots/fl-lab-briefing.png',
    alt: 'FortifyLearn lab briefing screen showing scenario, objectives, and network topology',
    label: 'Real Scenario Briefings',
    caption: 'Each lab starts with a realistic incident briefing, network topology, and the exact CompTIA exam objectives being tested. You know what you\'re solving — and why it matters.',
    side: 'right',
  },
  {
    img: '/screenshots/fl-terminal.png',
    alt: 'FortifyLearn live Linux terminal inside a lab',
    label: 'Live CLI — Real Commands',
    caption: 'A representative CLI environment. Type actual commands — grep, iptables, ss, show access-lists — and see realistic output that mirrors real-world scenarios. Not multiple choice.',
    side: 'left',
  },
  {
    img: '/screenshots/fl-results.png',
    alt: 'FortifyLearn results screen with score breakdown and improvement plan',
    label: 'Instant Results & Study Plan',
    caption: 'Submit and immediately see every graded check, the objectives it covers, and a targeted improvement plan. You know exactly what to study next.',
    side: 'right',
  },
];

const PBQEnginePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>FortifyLearn PBQ Simulator — CompTIA Performance-Based Questions | Cy-Sec</title>
        <meta name="description" content="Practise CompTIA performance-based questions with representative Cisco IOS and Linux CLI environments. Network+, Security+ and CySA+ PBQ simulations with objective-mapped scoring." />
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
                Performance-based questions with representative Cisco IOS and Linux CLI environments, realistic command output, and instant objective-mapped scoring. The closest thing to the real exam.
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

            {/* Hero screenshot — dashboard */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="/screenshots/fl-dashboard.png"
                  alt="FortifyLearn dashboard"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Built for exam-ready practice</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Not multiple choice. Representative CLI environments. Realistic topology. Real scoring.</p>
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

      {/* ── SCREENSHOTS ── */}
      {screenshots.slice(1).map((shot, i) => (
        <section key={i} className={`py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-t border-slate-100`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                className={shot.side === 'left' ? 'lg:order-2' : 'lg:order-1'}
                initial={{ opacity: 0, x: shot.side === 'right' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                  <img src={shot.img} alt={shot.alt} className="w-full h-auto" loading="lazy" />
                </div>
              </motion.div>
              <div className={shot.side === 'left' ? 'lg:order-1' : 'lg:order-2'}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0891B2' }}>{shot.label}</p>
                <p className="text-slate-600 leading-relaxed text-lg">{shot.caption}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

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

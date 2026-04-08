import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import FortifyLearnLogo from '@/components/logos/FortifyLearnLogo';
import { Terminal, ArrowRight, CheckCircle, Layers, Clock, Target, BookOpen, Zap } from 'lucide-react';
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
  { name: 'CompTIA Network+', code: 'N10-009', levels: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], free: 'Beginner' },
  { name: 'CompTIA Security+', code: 'SY0-701', levels: ['Easy', 'Intermediate', 'Hard', 'Expert'], free: 'Easy' },
];

const PBQEnginePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>PBQ Simulator — CompTIA Performance-Based Questions | FortifyLearn</title>
        <meta name="description" content="Practice CompTIA performance-based questions with live Cisco IOS topology. Network+ and Security+ PBQ simulations with real CLI commands." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0D2040 50%, #061428 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#1A56DB 1px, transparent 1px), linear-gradient(to right, #1A56DB 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="mb-2">
                <FortifyLearnLogo height={32} />
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                CompTIA PBQ simulations.<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #06B6D4, #1A56DB)' }}>
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

            {/* Terminal preview */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="bg-[#030D18] rounded-2xl overflow-hidden border border-white/10 shadow-2xl font-mono text-sm">
                <div className="bg-[#071624] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-slate-500 text-xs ml-2">ROUTER-01 · Cisco IOS</span>
                </div>
                <div className="p-5 space-y-1 text-xs">
                  <p><span className="text-green-400">Router#</span> <span className="text-slate-200">show access-lists</span></p>
                  <p className="text-slate-400">Extended IP access list 101</p>
                  <p><span className="text-green-300 ml-4">10 permit ip 192.168.1.0 0.0.0.255 any</span></p>
                  <p><span className="text-red-400 ml-4">20 deny   ip 192.168.2.0 0.0.0.255 any</span></p>
                  <p><span className="text-green-300 ml-4">30 permit ip any any</span></p>
                  <p className="mt-2"><span className="text-green-400">Router#</span> <span className="text-slate-200">ping 8.8.8.8</span></p>
                  <p className="text-cyan-300">Type escape sequence to abort.</p>
                  <p className="text-green-400">!!!!! Success rate is 100 percent</p>
                  <p className="mt-2"><span className="text-green-400">Router#</span> <span className="animate-pulse">▌</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Built for exam-ready practice</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Not multiple choice. Real CLI. Real topology. Real scoring.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:border-slate-200 transition-all">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Available certifications</h2>
            <p className="text-slate-500">Beginner labs are free. Paid packs unlock all difficulty levels.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {certs.map(cert => (
              <div key={cert.code} className="border border-slate-200 rounded-2xl p-8">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{cert.code}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-6">{cert.name}</h3>
                <div className="space-y-3">
                  {cert.levels.map(level => (
                    <div key={level} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-700 text-sm font-medium">{level}</span>
                      </div>
                      {level === cert.free
                        ? <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Free</span>
                        : <span className="text-xs text-slate-400">Paid pack</span>
                      }
                    </div>
                  ))}
                </div>
                <a href="https://fortifylearn.co.uk/pbq-lab" target="_blank" rel="noopener noreferrer"
                  className="mt-8 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Start practising <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to pass your CompTIA exam?</h2>
          <p className="text-slate-400 mb-8">Create a free account and start with a beginner lab in under 2 minutes.</p>
          <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer">
            <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-8 py-5 border-0 text-base">
              Launch FortifyLearn <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default PBQEnginePage;

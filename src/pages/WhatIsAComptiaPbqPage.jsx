// What is a CompTIA PBQ? — top-of-funnel cornerstone explainer
// ─────────────────────────────────────────────────────────────────────────
// Targets question-shaped queries: "what is a comptia pbq", "comptia
// performance based questions explained", "how do comptia pbqs work",
// "why are pbqs hard". Long-form, structured for both human reading and
// LLM retrieval (heavy h2/h3, FAQ tail, schema).

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Terminal, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';

const FAQ = [
  {
    q: "What does PBQ stand for?",
    a: "Performance-Based Question. It's the type of CompTIA exam question that asks you to perform a task in a simulated environment — drag-and-drop a network diagram, type commands into a CLI prompt, configure a firewall rule, identify a vulnerability in a log — rather than pick from A/B/C/D.",
  },
  {
    q: "How many PBQs are on a CompTIA exam?",
    a: "Typically between 3 and 6 per exam, out of around 90 total questions. The exact count varies by exam version, and CompTIA does not publish per-exam PBQ counts in advance. PBQs almost always appear at the start of the exam and account for a disproportionately large share of your total points.",
  },
  {
    q: "Why are PBQs harder than multiple-choice questions?",
    a: "Three reasons. They take longer (5-10 minutes each, versus 60 seconds for an MCQ). You can't guess productively — there are usually no visible options to eliminate. And they test applied knowledge: not whether you know what a VLAN is, but whether you can identify a misconfigured trunk port from a topology diagram and a CLI snippet.",
  },
  {
    q: "Can I skip PBQs and come back to them?",
    a: "Yes. CompTIA lets you flag a PBQ and return to it before submitting the exam. The widely shared advice — and it's good advice — is to skip the first PBQ on sight, complete the multiple-choice section first to bank easy points, and return to the PBQs at the end with the time you have left. That avoids burning 15 minutes on question 1 and panicking through the rest.",
  },
  {
    q: "What's the best way to prepare for PBQs?",
    a: "Hands-on practice in environments that resemble the exam interface. Reading about commands isn't enough — you have to type them, see the output, and make decisions under uncertainty. Most candidates fail PBQs not because they don't know the theory, but because they've never practised the specific motor pattern of typing show vlan brief and reading the output. Practice platforms with PBQ-style simulation environments are the answer; look for ones that use real or representative CLI rather than click-through wizards.",
  },
  {
    q: "Are CompTIA PBQs the same across all certs?",
    a: "The format is similar — you're given a scenario, an environment, and a task — but the content varies wildly. Network+ PBQs lean on Cisco-IOS-style CLI, packet captures, and topology diagrams. Security+ PBQs include firewall rule configuration, log analysis, and certificate auditing. CySA+ PBQs revolve around SIEM triage, threat hunting, and vulnerability assessment. A+ PBQs focus on hardware diagnostics, OS recovery, and Windows admin tasks. Same exam shape, different muscles.",
  },
  {
    q: "Do PBQs use real Cisco IOS, real Linux, real Windows?",
    a: "On the actual CompTIA exam, the environments are simulations — they look and feel like the real thing but they're sandboxed mockups CompTIA controls. They are not licensed Cisco IOS firmware, not full Linux VMs, not real Windows installations. Third-party prep platforms vary: some give you click-through simulators (predetermined paths), some give you representative CLI environments (you type, you get realistic output), and a few give you actual containerised Linux. The ones that match the exam's interaction model most closely are the representative-CLI ones.",
  },
  {
    q: "How are PBQs scored?",
    a: "CompTIA does not publish exact PBQ scoring formulas. What's broadly known: PBQs are weighted higher than individual MCQs, partial credit exists on multi-step PBQs (you can get some marks even if you don't complete every check), and a wrong PBQ typically costs you more than a wrong MCQ. The pass mark is a scaled 100-900 score with the threshold around 700 (varies slightly by cert). Do well on PBQs and the MCQ section is forgiving; bomb the PBQs and the MCQ section has to be near-perfect to recover.",
  },
];

export default function WhatIsAComptiaPbqPage() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>What is a CompTIA PBQ? — Performance-Based Questions explained | FortifyLearn</title>
        <meta name="description" content="A practitioner's guide to CompTIA Performance-Based Questions (PBQs): what they are, how they're scored, why they're harder than multiple choice, and how to prepare. Covers Network+, Security+, CySA+ and A+." />
        <link rel="canonical" href="https://cy-sec.co.uk/what-is-a-comptia-pbq" />
        <meta property="og:title" content="What is a CompTIA PBQ? — Performance-Based Questions explained" />
        <meta property="og:description" content="A practitioner's guide to CompTIA Performance-Based Questions (PBQs): what they are, how they're scored, and how to prepare." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://cy-sec.co.uk/what-is-a-comptia-pbq" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'What is a CompTIA PBQ? — Performance-Based Questions explained',
            description: "A practitioner's guide to CompTIA Performance-Based Questions (PBQs): what they are, how they're scored, why they're harder than multiple choice, and how to prepare.",
            author: { '@type': 'Person', name: 'Gaz Cocklin' },
            publisher: {
              '@type': 'Organization',
              name: 'Cy-Sec',
              logo: { '@type': 'ImageObject', url: 'https://cy-sec.co.uk/logos/cy-sec-logo.svg' },
            },
            datePublished: '2026-05-03',
            mainEntityOfPage: 'https://cy-sec.co.uk/what-is-a-comptia-pbq',
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map(item => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          })}
        </script>
      </Helmet>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#060e1f 0%,#0B1D3A 55%,#0e3a5a 100%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(8,145,178,1) 1px,transparent 1px),linear-gradient(to right,rgba(8,145,178,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-3xl mx-auto px-8 py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 border text-[10px] font-bold tracking-widest uppercase"
            style={{ background: 'rgba(8,145,178,0.15)', borderColor: 'rgba(8,145,178,0.35)', color: '#7DD3E8' }}>
            <Terminal className="w-3 h-3" />
            CompTIA exam guide
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-[1.05]" style={{ letterSpacing: '-1.5px' }}>
            What is a CompTIA PBQ?
          </h1>
          <p className="text-white/65 leading-relaxed text-[16px] max-w-2xl">
            A practitioner's guide to Performance-Based Questions — what they are, how they're scored, why they're harder than multiple choice, and how to prepare for them properly. Written for anyone studying for Network+, Security+, CySA+, or A+ who's seen "PBQs" in the syllabus and isn't quite sure what's coming.
          </p>
          <p className="text-white/40 text-[12px] mt-6">
            By Cy-Sec Awareness and Consultancy
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-8 py-14">

        <p className="text-[17px] text-slate-700 leading-relaxed mb-6">
          A Performance-Based Question (PBQ) is a CompTIA exam question that asks you to <em>do</em> something rather than <em>recognise</em> something. Instead of picking A, B, C or D, you're dropped into a simulated environment — a CLI prompt, a network topology, a firewall rule editor, a log file — and given a task: configure this trunk port, identify the misconfigured ACL, contain this incident.
        </p>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-6">
          PBQs are the most failed section of every CompTIA exam, and they're the section most prep platforms are weakest on. This page explains what they are, how they work, and what actually works to prepare for them. No fluff, no marketing.
        </p>

        <div className="bg-[#F4F7FA] rounded-2xl border border-[rgba(8,145,178,0.15)] p-6 my-8">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-3">Quick facts</p>
          <ul className="space-y-2 text-[14px] text-slate-700">
            <li className="flex gap-2"><span className="text-[#0891B2] font-bold flex-shrink-0">·</span><span><strong>Per exam:</strong> typically 3-6 PBQs out of ~90 questions</span></li>
            <li className="flex gap-2"><span className="text-[#0891B2] font-bold flex-shrink-0">·</span><span><strong>Position:</strong> usually appear first</span></li>
            <li className="flex gap-2"><span className="text-[#0891B2] font-bold flex-shrink-0">·</span><span><strong>Time per question:</strong> 5-10 minutes (versus ~60 seconds for an MCQ)</span></li>
            <li className="flex gap-2"><span className="text-[#0891B2] font-bold flex-shrink-0">·</span><span><strong>Weighting:</strong> higher than individual MCQs (CompTIA doesn't publish exact figures)</span></li>
            <li className="flex gap-2"><span className="text-[#0891B2] font-bold flex-shrink-0">·</span><span><strong>Format:</strong> CLI typing, drag-and-drop, dropdown configuration, log analysis, topology diagrams</span></li>
            <li className="flex gap-2"><span className="text-[#0891B2] font-bold flex-shrink-0">·</span><span><strong>Skip allowed:</strong> yes — you can flag and return before submitting</span></li>
          </ul>
        </div>

        <h2 className="text-2xl font-black text-[#0B1D3A] mt-12 mb-4" style={{ letterSpacing: '-0.6px' }}>What a PBQ actually looks like</h2>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-4">A typical Network+ PBQ might present you with a four-switch topology diagram, a brief from a fictional company ("our SALES VLAN can't reach the ENG VLAN, and the new finance subnet is unreachable from the rest of the network"), and a CLI prompt where you can type Cisco-IOS-style commands against any of the four switches. Your job: figure out what's wrong and fix it. The exam will check the running configuration after you submit, look for specific changes (the missing trunk allow-list, the wrong native VLAN), and award partial credit accordingly.</p>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-4">A typical Security+ PBQ might give you a Linux server with a brief ("a recent pentest flagged that this server allows insecure SSH configurations and has a permission anomaly on /etc/shadow"), a shell prompt, and a checklist of remediation tasks. You read configuration files, run commands, change settings, verify the fix.</p>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-6">A typical CySA+ PBQ might drop you into a SIEM dashboard with 30 unread alerts and ask you to triage them — flag the genuine threats, dismiss the false positives, escalate the incidents that need it, and identify which IPs to block at the firewall.</p>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-6">The shape is consistent across certs: scenario, environment, task, scoring against specific success criteria. The difficulty isn't intellectual — most of the underlying knowledge is straightforward — it's procedural. Most candidates know <em>what</em> a trunk port is. Far fewer know what to type into the CLI to fix one when it's broken.</p>

        <h2 className="text-2xl font-black text-[#0B1D3A] mt-12 mb-4" style={{ letterSpacing: '-0.6px' }}>Why PBQs are harder than they look</h2>

        <h3 className="text-lg font-extrabold text-[#0B1D3A] mt-6 mb-2">1. Time pressure compounds.</h3>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-4">You have 90 minutes for ~90 questions. If you spend 10 minutes on each of 5 PBQs, that's 50 minutes gone — leaving 40 minutes for 85 multiple-choice questions, which is just under 30 seconds each. A slow PBQ section will eat your MCQ time, and a panicked MCQ run will cost you more points than the PBQ ever could.</p>

        <h3 className="text-lg font-extrabold text-[#0B1D3A] mt-6 mb-2">2. You can't guess productively.</h3>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-4">On an MCQ, even when you don't know the answer you can usually eliminate two options by logic and guess between the remaining two — a 50% chance of points. On a PBQ, you face an empty CLI or a blank topology. Guessing produces nothing. You either know how to do the task or you don't.</p>

        <h3 className="text-lg font-extrabold text-[#0B1D3A] mt-6 mb-2">3. They test applied knowledge, not recall.</h3>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-4">MCQs test recognition: do you know what a SYN flood is? PBQs test application: given a packet capture showing a SYN flood, can you identify it, decide which firewall rule to add, and implement that rule? Recognition is much easier than recall is much easier than application. PBQs sit at the hardest end of that spectrum.</p>

        <h3 className="text-lg font-extrabold text-[#0B1D3A] mt-6 mb-2">4. The motor pattern matters.</h3>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-6">A surprising amount of PBQ difficulty is muscle memory, not knowledge. If you've never typed <code className="text-[14px] bg-slate-100 px-1.5 py-0.5 rounded font-mono">show interfaces trunk</code> before, you'll lose 30 seconds remembering the exact syntax under exam pressure. If you've typed it 50 times, it's automatic. Reading about commands does not build this. Watching videos does not build this. Typing them does.</p>

        <h2 className="text-2xl font-black text-[#0B1D3A] mt-12 mb-4" style={{ letterSpacing: '-0.6px' }}>How to prepare for PBQs (the bit that actually matters)</h2>

        <h3 className="text-lg font-extrabold text-[#0B1D3A] mt-6 mb-2">Practise in environments that resemble the exam.</h3>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-4">The single biggest predictor of PBQ performance is whether you've practised the specific interaction model the exam uses. That means: a CLI prompt where you type commands and read output, a topology you can interact with, a log file you can search, a SIEM-style dashboard you can triage. Reading a textbook is not enough. Watching a video is not enough. You need keystroke-level practice.</p>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-4">When you evaluate prep platforms, look at their PBQ environments specifically. Some platforms ship click-through simulators: you click predetermined buttons in a predetermined order, and the "lab" is essentially a guided slideshow. These build very little of the muscle memory the exam tests. Others ship representative CLI environments: you type real commands, get realistic output, and the lab state changes based on what you do. These match the exam's interaction model far better.</p>

        <h3 className="text-lg font-extrabold text-[#0B1D3A] mt-6 mb-2">Use a study order that protects MCQ time.</h3>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-4">On exam day, the widely-recommended sequence: see the first PBQ, flag it without attempting, skip to the multiple-choice section, complete the MCQs first to bank guaranteed points, then return to the PBQs with whatever time you have left. This protects you from the worst failure mode — burning 25 minutes on a hard PBQ at question 1 and then having to rush the entire MCQ section.</p>

        <h3 className="text-lg font-extrabold text-[#0B1D3A] mt-6 mb-2">Build coverage across the cert's PBQ surface.</h3>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-4">PBQs cluster around specific objective areas, not the entire cert blueprint. Network+ PBQs lean heavily on switching, routing, and troubleshooting (less so on cabling theory or wireless standards). Security+ PBQs lean on hardening, log analysis, and certificate handling. Identify the high-PBQ-likelihood domains for your cert and over-practise those, even at the expense of a slightly weaker MCQ score.</p>

        <h3 className="text-lg font-extrabold text-[#0B1D3A] mt-6 mb-2">Time your practice runs.</h3>
        <p className="text-[16px] text-slate-700 leading-relaxed mb-6">Practising a lab unhurried is useful for learning. Practising it under a 10-minute timer is what builds exam fitness. A few timed mock PBQ sessions before the exam will reveal whether your "I know this" is actually "I know this and can complete it in 8 minutes" — those are very different things.</p>

        <h2 className="text-2xl font-black text-[#0B1D3A] mt-12 mb-4" style={{ letterSpacing: '-0.6px' }}>What PBQs look like for each CompTIA cert</h2>
        <div className="space-y-4 mt-6">
          {[
            { code: 'N10-009', name: 'Network+', focus: 'Cisco-IOS-style CLI, network topologies, packet captures, VLAN and trunk configuration, ACL troubleshooting, IP addressing and subnetting under pressure.', href: '/comptia-network-plus-labs' },
            { code: 'SY0-701', name: 'Security+', focus: 'Linux CLI for hardening, firewall rule audits, log file analysis, certificate handling and PKI, MFA and access control configuration.', href: '/comptia-security-plus-labs' },
            { code: 'CS0-003', name: 'CySA+', focus: 'SIEM alert triage, log correlation, threat hunting, vulnerability assessment, incident containment workflows, IOC identification.', href: '/comptia-cysa-plus-labs' },
            { code: '220-1201', name: 'A+ Core 1', focus: 'Hardware diagnostics, mobile device sync, virtualisation configuration, network cable troubleshooting, multi-fault hardware triage.', href: '/comptia-aplus-core1-labs' },
            { code: '220-1202', name: 'A+ Core 2', focus: 'Windows admin and recovery, malware response, account and permission audits, software troubleshooting, OS recovery procedures.', href: '/comptia-aplus-core2-labs' },
          ].map(c => (
            <Link key={c.code} to={c.href} className="block bg-[#F4F7FA] rounded-xl border border-[rgba(8,145,178,0.12)] p-5 hover:border-[rgba(8,145,178,0.35)] transition-colors">
              <div className="flex items-start justify-between gap-4 mb-1">
                <p className="text-[15px] font-extrabold text-[#0B1D3A]">{c.name} <span className="text-slate-400 font-bold">· {c.code}</span></p>
                <ChevronRight className="w-4 h-4 text-[#0891B2] flex-shrink-0 mt-1" strokeWidth={2.5} />
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed">{c.focus}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-black text-[#0B1D3A] mt-14 mb-6" style={{ letterSpacing: '-0.6px' }}>Frequently asked questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FAQ.map((item, i) => (
            <details key={i} className="group bg-[#F4F7FA] rounded-xl border border-[rgba(8,145,178,0.12)] overflow-hidden">
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <p className="text-[15px] font-semibold text-[#0B1D3A]">{item.q}</p>
                <ChevronDown className="w-4 h-4 text-[#0891B2] flex-shrink-0 transition-transform group-open:rotate-180" strokeWidth={2.5} />
              </summary>
              <div className="px-5 pb-5 -mt-1 text-[14px] text-slate-600 leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>

        <div className="rounded-2xl mt-14 p-8 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#0B1D3A 0%,#0E5F8A 55%,#0891B2 100%)' }}>
          <div className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(to right,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="relative">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#7DD3E8' }}>Practise on representative environments</p>
            <h3 className="text-2xl font-black mb-3 leading-tight" style={{ letterSpacing: '-0.6px' }}>Try a free PBQ lab. No card needed.</h3>
            <p className="text-white/65 text-[15px] mb-6 max-w-xl leading-relaxed">FortifyLearn is the CompTIA prep platform built around PBQ-style practice. Free taster labs available for Network+, Security+, A+ Core 1 and A+ Core 2 — no signup, no card, no fluff.</p>
            <div className="flex gap-3 flex-wrap">
              <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#0B1D3A] bg-white hover:bg-slate-100 transition-all">
                Try a free taster lab <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/fortifylearn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white border border-white/30 hover:bg-white/10 transition-all">
                Browse cert prep
              </Link>
            </div>
          </div>
        </div>


      </article>
    </div>
  );
}

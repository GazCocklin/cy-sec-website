import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Shield, Clock, CheckCircle2, Lock, ChevronDown } from 'lucide-react';
import ExamPrepSection from '../components/ExamPrepSection';

const PACK1_LABS = [
  { num: 'F', title: 'Port down — finance workstation offline',                                 diff: 'Easy',         obj: '2.3 / 5.3',                    tool: 'FL-NETSIM', free: true },
  { num: 'F', title: 'Static IP gateway misconfiguration',                                      diff: 'Easy',         obj: '1.4 / 5.3',                    tool: 'Cisco IOS', free: true },
  { num: 1, title: 'DNS server misconfiguration',                                                diff: 'Easy',         time: 8,  obj: '1.6 / 5.3 / 5.5',             tool: 'Cisco IOS' },
  { num: 2, title: 'Default gateway fault diagnosis',                                           diff: 'Easy',         time: 8,  obj: '1.4 / 5.3',                    tool: 'Cisco IOS' },
  { num: 3, title: 'DMZ configuration and ACL troubleshooting',                                diff: 'Intermediate', time: 30, obj: '3.5 / 2.4 / 3.2',              tool: 'FL-NETSIM' },
  { num: 4, title: 'Dual ACL fault — multi-VLAN routing failure',                             diff: 'Hard',         time: 30, obj: '3.5 / 2.4 / 5.1',              tool: 'FL-NETSIM' },
  { num: 5, title: 'Enterprise multi-fault: VLAN trunk, ACL and static route recovery',       diff: 'Expert',       time: 25, obj: '1.4 / 2.3 / 2.4 / 3.5',        tool: 'FL-NETSIM' },
];

const PACK2_LABS = [
  { num: 1, title: 'DHCP scope exhaustion — lease pool troubleshooting',        diff: 'Easy',         time: 10, obj: '2.2 / 3.1',             tool: 'Cisco IOS' },
  { num: 2, title: 'Port security violation — MAC binding recovery',            diff: 'Easy',         time: 10, obj: '2.3 / 4.3 / 5.5',       tool: 'Cisco IOS' },
  { num: 3, title: 'VLAN trunk misconfiguration — finance network isolation',   diff: 'Intermediate', time: 25, obj: '2.3 / 5.3',             tool: 'FL-NETSIM' },
  { num: 4, title: 'Asymmetric routing investigation via packet capture',       diff: 'Hard',         time: 15, obj: '2.3 / 5.4 / 5.5',       tool: 'NETCAP Analyzer' },
  { num: 5, title: 'SNMP multi-site bandwidth and interface fault triage',      diff: 'Expert',       time: 20, obj: '2.1 / 3.2 / 5.4 / 5.5', tool: 'NETPULSE NMS' },
];

const DIFF_STYLE = {
  Easy:'bg-green-100 text-green-700', Intermediate:'bg-blue-100 text-blue-700',
  Hard:'bg-amber-100 text-amber-700', Expert:'bg-[#0B1D3A]/10 text-[#0B1D3A]',
};
const TOOL_STYLE = {
  'Cisco IOS':     'bg-[#e0f2f9] text-[#0E5F8A]',
  'FL-NETSIM':     'bg-[#0B1D3A]/10 text-[#0B1D3A]',
  'NETCAP Analyzer':'bg-amber-50 text-amber-700',
  'NETPULSE NMS':  'bg-emerald-50 text-emerald-700',
};

function LabRow({ lab }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[#F4F7FA] border border-[rgba(8,145,178,0.12)] rounded-xl hover:border-[rgba(8,145,178,0.3)] transition-colors">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: lab.free ? '#0891B2' : 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
        {lab.num}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-[#0B1D3A] leading-snug">{lab.title}</p>
          {lab.free && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#e0f2f9] text-[#0891B2]">FREE TASTER</span>}
        </div>
        <div className="flex gap-2 flex-wrap mt-1.5">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[rgba(14,95,138,0.1)] text-[#0E5F8A]">N10-009 · {lab.obj}</span>
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
          {oldPrice && <><span className="text-sm text-slate-400 line-through">£{oldPrice}</span><span className="text-xs font-bold bg-[#e0f2f9] text-[#0891B2] px-2 py-0.5 rounded-full">Save £{(parseFloat(oldPrice)-parseFloat(price)).toFixed(2)}</span></>}
        </div>
        <p className="text-xs text-slate-400 mb-4">One-time · Lifetime access from purchase</p>
        <a href="/store" className="block w-full text-center text-white font-bold text-sm py-3 rounded-xl mb-3 hover:brightness-110 transition-all" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
          Add to basket →
        </a>
        {!complete && <p className="text-[11px] text-slate-400 text-center">Or get both tiers for <span className="font-bold text-[#0891B2]">£32.99</span> — saves £6.99</p>}
        {complete && includes && (
          <div className="border-t border-slate-100 pt-3 mt-1 space-y-1.5">
            {includes.map((inc, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2] flex-shrink-0" />{inc}
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
  { icon: CheckCircle2, label: 'Exam objective mapped', sub: 'Every graded check maps to an N10-009 domain' },
  { icon: Clock, label: 'Unlimited retries, Lifetime access', sub: 'Run each lab as many times as you need' },
  { icon: Shield, label: 'CompTIA Authorised Partner', sub: 'Developed and delivered by Cy-Sec' },
];

const TOOLS = [
  { img: '/screenshots/fl-netsim.png', lbl: 'FL-NETSIM v2.0', title: 'FL-NETSIM — live Cisco IOS environment', desc: 'Real Cisco IOS commands in a live switch or router terminal. Run show vlan brief, show interfaces trunk, or show running-config — the available commands panel guides your investigation while you interact with a realistic IOS environment.', pack: 'Foundation Labs labs 3–5 · Advanced Labs lab 3' },
  { img: '/screenshots/fl-netcap.png', lbl: 'NETCAP Analyzer v3.2', title: 'NETCAP Analyzer — packet capture and asymmetric routing', desc: 'Colour-coded flow topology showing exactly where forward and return paths diverge, TCP retransmit count, and a one-click static route remediation action — the exact scenario type that appears in N10-009 PBQs.', pack: 'Advanced Labs · lab 4' },
  { img: '/screenshots/fl-netpulse.png', lbl: 'NETPULSE NMS v6.1', title: 'NETPULSE NMS — multi-site SNMP monitoring', desc: 'Live site map with SNMP polling status, CRC error detection, unreachable host diagnosis, and interface fault triage across a multi-site topology — the kind of NMS work N10-009 tests in its harder PBQs.', pack: 'Advanced Labs · lab 5' },
];

const FAQ = [
  {
    q: 'Do these labs use real Cisco IOS, or simulated commands?',
    a: "Real Cisco IOS. The Foundation Labs use a live IOS environment where you type show running-config, show vlan brief, show interfaces trunk and other diagnostic commands and get genuine output. The available commands panel guides what's possible in each scenario, but you type every command yourself — not click predetermined buttons.",
  },
  {
    q: 'Is FortifyLearn endorsed by CompTIA?',
    a: 'Cy-Sec is a CompTIA Authorised Partner, which is a formal commercial relationship. The labs themselves are not officially endorsed by CompTIA — no third-party prep platform is. Every lab is mapped to specific N10-009 exam objectives, but CompTIA does not certify or review external lab content.',
  },
  {
    q: "What's the difference between Foundation Labs and Advanced Labs?",
    a: 'Foundation Labs is the £19.99 entry pack — five Cisco IOS scenarios covering DNS misconfiguration, default gateway faults, DMZ ACL troubleshooting, dual-VLAN routing, and an enterprise multi-fault recovery. Advanced Labs is the £19.99 second pack and adds three FortifyLearn-built tools beyond the CLI: FL-NETSIM (network topology simulator), NETCAP Analyzer (packet capture), and NETPULSE NMS (multi-site monitoring). Complete (£32.99) is both packs together at a £6.99 discount. All packs are one-time purchases with lifetime access from your purchase date and unlimited retries on every lab.',
  },
  {
    q: 'Are these labs enough on their own to pass Network+?',
    a: "For most people, no. The labs build the practical PBQ skill the exam tests, but you also need to study the theory that drives the multiple-choice section. We'd typically recommend pairing FortifyLearn Network+ Labs with a strong MCQ resource — either the FortifyLearn Exam Engine (which bundles MCQ Study Mode and timed mock exams in one product) or a third-party tool like Boson ExSim. The Exam Prep Bundle at £39.99 packages the labs and Exam Engine together at a £24.98 saving.",
  },
  {
    q: 'Will FortifyLearn guarantee I pass Network+?',
    a: 'No. Any prep platform claiming to guarantee a pass is overstating what it can do. Passing depends on you, the time you put into your study, and how the exam goes on the day. What FortifyLearn gives you is the real-CLI practice the exam tests for — not a guarantee.',
  },
  {
    q: 'What if a lab breaks or I have a question?',
    a: 'Email the FortifyLearn Support Team at fortifylearn@cy-sec.co.uk. Lab issues are usually fixed within a working day. We can also help with general platform and study questions.',
  },
  {
    q: 'Can I get a refund?',
    a: "If you've bought a pack but haven't accessed any lab yet, email the FortifyLearn Support Team at fortifylearn@cy-sec.co.uk within 14 days and we'll issue a full refund. Once you've started any lab, the pack counts as performance-begun digital content under UK consumer law and the 14-day right of withdrawal lapses — but your statutory rights under the Consumer Rights Act 2015 still apply if a lab is faulty or not as described. Full terms in our Terms of Service.",
  },
  {
    q: 'How does FortifyLearn compare to DojoLab, Dion Training, or Boson?',
    a: "Different categories. Dion Training is video-led and MCQ-strong, weaker on PBQs. DojoLab uses click-through simulators — they look like the exam but follow predefined paths rather than real CLI. Boson ExSim is the gold standard for written-question realism but doesn't ship labs. FortifyLearn is the real-CLI / real-tooling category — complementary to Boson, contrastive with click-through platforms. Some learners buy Boson and FortifyLearn together; that's a sensible combination.",
  },
];

export default function NetworkPlusLabsPage() {
  const [tab, setTab] = useState('p1');

  return (
    <>
      <Helmet>
        <title>CompTIA Network+ N10-009 Practice Labs | FortifyLearn — Cy-Sec</title>
        <meta name="description" content="10 hands-on Network+ N10-009 simulation labs across 2 tiers. Live Cisco IOS environments, FL-NETSIM network topology, NETCAP packet analyser, and NETPULSE NMS. One-time purchase, Lifetime access. CompTIA Authorised Partner." />
        <meta name="keywords" content="CompTIA Network+ labs, N10-009 practice, Network+ PBQ simulation, Cisco IOS troubleshooting, VLAN ACL labs, CompTIA practice labs" />
        <link rel="canonical" href="https://cy-sec.co.uk/comptia-network-plus-labs" />
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

      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img src="/screenshots/fl-netcap.png" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(6,14,31,0.97) 0%,rgba(11,29,58,0.95) 45%,rgba(8,80,120,0.80) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(8,145,178,1) 1px,transparent 1px),linear-gradient(to right,rgba(8,145,178,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border text-xs font-bold tracking-wider uppercase text-[#7DD3E8]" style={{ background: 'rgba(8,145,178,0.15)', borderColor: 'rgba(8,145,178,0.35)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]" /> N10-009 · CompTIA Network+
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-5" style={{ letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Network+ practice labs.<br />
              <span style={{ background: 'linear-gradient(90deg,#7DD3E8,#0891B2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Live Cisco IOS.</span><br />
              Real topologies.
            </h1>
            <p className="text-[15px] text-white/60 leading-relaxed mb-7 max-w-lg">
              <strong className="text-white/90">CompTIA Network+ N10-009 performance-based questions</strong> test you on troubleshooting live Cisco IOS faults — VLANs, ACLs, routing, DHCP, port security. FortifyLearn gives you live network topologies, a packet analyser, and an NMS console across 10 labs.
            </p>
            <div className="flex gap-3 flex-wrap mb-6">
              <a href="/store" className="px-6 py-3 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                Network+ Foundation Labs — £19.99
              </a>
              <a href="/store" className="px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/8 hover:bg-white/14 transition-all">
                Complete (10 labs) — £32.99
              </a>
            </div>
            <div className="flex gap-4 flex-wrap">
              {['10 labs across 2 tiers', 'Free taster labs', 'Live Cisco IOS + visual tools', 'Lifetime access'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-white/40"><span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/60" />{t}</span>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="text-[10px] font-bold text-[#7DD3E8] tracking-wider uppercase absolute -top-4 left-4 bg-gradient-to-r from-[#0B1D3A] to-[#0891B2] px-3 py-1.5 rounded-md z-10">
              FL-NETSIM v2.0 — live Cisco IOS environment
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img src="/screenshots/fl-netsim.png" alt="FL-NETSIM v2.0 — live Cisco IOS switch terminal inside a FortifyLearn Network+ lab" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO intro ── */}
      <section className="bg-white border-b border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[15px] text-slate-500 leading-relaxed">
              The <span className="font-semibold text-[#0891B2]">CompTIA Network+ N10-009 exam</span> includes performance-based questions requiring you to diagnose and fix live network faults — VLAN trunk misconfigurations, ACL errors, DHCP exhaustion, asymmetric routing. FortifyLearn's <span className="font-semibold text-[#0891B2]">Network+ practice labs</span> give you real Cisco IOS environments across 10 scenario labs.
            </p>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              Foundation Labs covers the core troubleshooting scenarios — DNS, default gateway, DMZ ACL, dual VLAN routing, and a complex enterprise multi-fault. Advanced Labs adds <strong className="text-[#0B1D3A]">NETCAP Analyzer</strong> for packet capture analysis and <strong className="text-[#0B1D3A]">NETPULSE NMS</strong> for multi-site SNMP monitoring — the scenarios most candidates are underprepared for.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-3">
            {[['10', 'Labs across 2 tiers'], ['N10-009', 'CompTIA exam code'], ['3', 'Tools in Advanced Labs']].map(([n, l]) => (
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
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Network+ N10-009 labs</p>
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.8px' }}>Two packs. Ten labs. One progression.</h2>
          <p className="text-[15px] text-slate-500 mb-8 max-w-xl">Foundation Labs builds CLI troubleshooting skills. Advanced Labs adds FL-NETSIM, NETCAP Analyzer, and NETPULSE NMS.</p>

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
              {tab === 'p1' && PACK1_LABS.map((l, i) => <LabRow key={i} lab={l} />)}
              {tab === 'p2' && PACK2_LABS.map(l => <LabRow key={l.num} lab={l} />)}
              {tab === 'complete' && (
                <>
                  <p className="text-xs text-slate-400 mb-2">All 10 labs — Foundation Labs then Advanced Labs in difficulty order.</p>
                  {[...PACK1_LABS, ...PACK2_LABS].map((l, i) => <LabRow key={i} lab={{ ...l, num: l.free ? 'F' : i }} />)}
                </>
              )}
            </div>
            <div>
              {tab === 'p1' && <PackCard title="Network+ Foundation Labs" code="N10-009 · Foundation" price="19.99" labs={5} />}
              {tab === 'p2' && <PackCard title="Network+ Advanced Labs" code="N10-009 · Advanced" price="19.99" labs={5} />}
              {tab === 'complete' && (
                <PackCard title="Network+ Complete" code="N10-009 · Complete" price="32.99" oldPrice="39.98" labs={10} complete
                  includes={['Foundation Labs — 5 Cisco IOS troubleshooting labs', 'Advanced Labs — 5 labs inc. FL-NETSIM, NETCAP, NETPULSE', '2 free taster labs (CLI + visual)', 'All 10 labs unlocked immediately']}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Exam prep (deep-dive: Exam Engine — Study + Exam Mode + Prep Bundle savings) ── */}
      <ExamPrepSection cert="netplus" certLabel="Network+" code="N10-009" />

      {/* ── Tools ── */}
      <section className="bg-[#F4F7FA] py-14 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">The tools you'll use</p>
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.8px' }}>Three visual tools. No other prep platform has them.</h2>
          <p className="text-[15px] text-slate-500 mb-8 max-w-xl">Advanced Labs introduces three interactive simulation tools built to mirror real network management software.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOOLS.map(tool => (
              <div key={tool.lbl} className="bg-white rounded-2xl overflow-hidden border border-[rgba(8,145,178,0.12)]">
                <div className="relative">
                  <img src={tool.img} alt={tool.title} className="w-full" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-[#7DD3E8] tracking-wider uppercase px-2.5 py-1.5 rounded-md" style={{ background: 'rgba(6,14,31,0.82)', border: '1px solid rgba(8,145,178,0.35)' }}>{tool.lbl}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-[14px] font-bold text-[#0B1D3A] mb-2">{tool.title}</h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed mb-3">{tool.desc}</p>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#e0f2f9] text-[#0891B2] border border-[rgba(8,145,178,0.2)]">{tool.pack}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-14 px-8 border-t border-[rgba(8,145,178,0.1)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Common questions</p>
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-8" style={{ letterSpacing: '-0.8px' }}>FAQ</h2>
          <div className="space-y-3">
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
        </div>
      </section>

      {/* ── Trust ── */}
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

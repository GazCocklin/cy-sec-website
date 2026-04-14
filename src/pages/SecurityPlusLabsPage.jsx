import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Shield, Clock, CheckCircle2, Lock } from 'lucide-react';

const PACK1_LABS = [
  { num: 'F', title: 'SSH hardening: root login vulnerability', diff: 'Easy', obj: '3.2 / 4.1', tool: 'Linux CLI', free: true },
  { num: 1, title: 'Firewall rule misconfiguration',                                           diff: 'Easy',         time: 8,  obj: '1.1 / 3.2',       tool: 'Linux CLI' },
  { num: 2, title: 'Sensitive file permission misconfiguration',                               diff: 'Easy',         time: 8,  obj: '1.1 / 3.3',       tool: 'Linux CLI' },
  { num: 3, title: 'Insecure legacy services: Telnet and FTP exposure',                       diff: 'Intermediate', time: 30, obj: '1.1 / 3.2',       tool: 'Linux CLI' },
  { num: 4, title: 'Privilege escalation and audit failure: two-server remediation',          diff: 'Hard',         time: 35, obj: '1.1 / 4.1',       tool: 'Linux CLI' },
  { num: 5, title: 'Post-pentest remediation: firewall, web process, and database exposure',  diff: 'Expert',       time: 40, obj: '1.1 / 3.2 / 4.1', tool: 'Linux CLI' },
];

const PACK2_LABS = [
  { num: 1, title: 'Unauthorised service account — privilege audit and remediation',                              diff: 'Easy',         time: 10, obj: '4.4 / 4.6',       tool: 'Linux CLI' },
  { num: 2, title: 'Stale user account lockdown — offboarded employee access audit',                             diff: 'Easy',         time: 10, obj: '4.6 / 4.9',       tool: 'Linux CLI' },
  { num: 3, title: 'MFA enforcement — TOTP on production bastion SSH',                                           diff: 'Intermediate', time: 20, obj: '4.1 / 4.6 / 4.9', tool: 'Linux CLI' },
  { num: 4, title: 'Firewall policy audit and remediation',                                                      diff: 'Hard',         time: 25, obj: '4.4 / 4.5',       tool: 'FORTIGUARD Auditor' },
  { num: 5, title: 'Certificate authority compromise — full PKI rotation and trust chain re-establishment',      diff: 'Expert',       time: 40, obj: '1.4 / 3.9 / 4.1', tool: 'Linux CLI' },
];

const DIFF_STYLE = {
  Easy:'bg-green-100 text-green-700', Intermediate:'bg-blue-100 text-blue-700',
  Hard:'bg-amber-100 text-amber-700', Expert:'bg-[#0B1D3A]/10 text-[#0B1D3A]',
};
const TOOL_STYLE = {
  'Linux CLI': 'bg-[#e0f2f9] text-[#0E5F8A]',
  'FORTIGUARD Auditor': 'bg-purple-50 text-purple-700',
};

function LabRow({ lab }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[#F4F7FA] border border-[rgba(8,145,178,0.12)] rounded-xl hover:border-[rgba(8,145,178,0.3)] transition-colors">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: lab.free ? '#0891B2' : 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}
      >
        {lab.num}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-[#0B1D3A] leading-snug">{lab.title}</p>
          {lab.free && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#e0f2f9] text-[#0891B2]">FREE TASTER</span>}
        </div>
        <div className="flex gap-2 flex-wrap mt-1.5">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[rgba(14,95,138,0.1)] text-[#0E5F8A]">SY0-701 · {lab.obj}</span>
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
        {!complete && <p className="text-[11px] text-slate-400 text-center">Or get both packs for <span className="font-bold text-[#0891B2]">£32.99</span> — saves £6.99</p>}
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
  { icon: CheckCircle2, label: 'Exam objective mapped', sub: 'Every graded check maps to a SY0-701 domain' },
  { icon: Clock, label: 'Unlimited retries, Lifetime access', sub: 'Run each lab as many times as you need' },
  { icon: Shield, label: 'CompTIA Authorised Partner', sub: 'Developed and delivered by Cy-Sec' },
];

export default function SecurityPlusLabsPage() {
  const [tab, setTab] = useState('p1');

  return (
    <>
      <Helmet>
        <title>CompTIA Security+ SY0-701 Practice Labs | FortifyLearn — Cy-Sec</title>
        <meta name="description" content="10 hands-on Security+ SY0-701 simulation labs across 2 packs. Live Linux CLI hardening, FORTIGUARD firewall policy auditing, and identity management. One-time purchase, Lifetime access. CompTIA Authorised Partner." />
        <meta name="keywords" content="CompTIA Security+ labs, SY0-701 practice, Security+ PBQ simulation, Linux hardening, firewall audit, CompTIA practice labs" />
        <link rel="canonical" href="https://cy-sec.co.uk/comptia-security-plus-labs" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80&fit=crop" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(6,14,31,0.97) 0%,rgba(11,29,58,0.95) 45%,rgba(8,80,120,0.80) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(8,145,178,1) 1px,transparent 1px),linear-gradient(to right,rgba(8,145,178,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border text-xs font-bold tracking-wider uppercase text-[#7DD3E8]" style={{ background: 'rgba(8,145,178,0.15)', borderColor: 'rgba(8,145,178,0.35)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]" /> SY0-701 · CompTIA Security+
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-5" style={{ letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Security+ practice labs.<br />
              <span style={{ background: 'linear-gradient(90deg,#7DD3E8,#0891B2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Real Linux.</span><br />
              Real hardening.
            </h1>
            <p className="text-[15px] text-white/60 leading-relaxed mb-7 max-w-lg">
              <strong className="text-white/90">CompTIA Security+ SY0-701 performance-based questions</strong> test you on server hardening, firewall policy, privilege escalation, and identity management. FortifyLearn gives you live Linux environments and a visual firewall auditor across 10 labs.
            </p>
            <div className="flex gap-3 flex-wrap mb-6">
              <a href="/store" className="px-6 py-3 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                Security+ Pack 1 — £19.99
              </a>
              <a href="/store" className="px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/8 hover:bg-white/14 transition-all">
                Complete (10 labs) — £32.99
              </a>
            </div>
            <div className="flex gap-4 flex-wrap">
              {['10 labs across 2 packs', 'Free taster lab', 'Lifetime access', 'One-time payment'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-white/40"><span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/60" />{t}</span>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="text-[10px] font-bold text-[#7DD3E8] tracking-wider uppercase absolute -top-4 left-4 bg-gradient-to-r from-[#0B1D3A] to-[#0891B2] px-3 py-1.5 rounded-md z-10">
              FORTIGUARD Policy Auditor v3.1 — Sec+ Pack 2
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img src="/screenshots/fl-fortiguard.png" alt="FORTIGUARD Policy Auditor v3.1 inside a FortifyLearn Security+ Pack 2 lab — firewall rule audit dashboard" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO intro ── */}
      <section className="bg-white border-b border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[15px] text-slate-500 leading-relaxed">
              The <span className="font-semibold text-[#0891B2]">CompTIA Security+ SY0-701 exam</span> includes performance-based questions that test practical hardening skills — fixing misconfigured firewalls, removing insecure services, auditing file permissions, and investigating privilege escalation. FortifyLearn's <span className="font-semibold text-[#0891B2]">Security+ practice labs</span> build these skills through live Linux CLI environments and, in Pack 2, the <strong className="text-[#0B1D3A]">FORTIGUARD Policy Auditor</strong> — a visual firewall rule audit interface.
            </p>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              Pack 1 covers server hardening fundamentals. Pack 2 moves into identity and access management — service account auditing, MFA enforcement, stale account remediation, and PKI management — alongside the FORTIGUARD visual tool for firewall policy review.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-3">
            {[['10', 'Labs across 2 packs'], ['SY0-701', 'CompTIA exam code'], ['Free', '1 taster lab — no card needed']].map(([n, l]) => (
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
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Security+ SY0-701 labs</p>
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.8px' }}>Two packs. Ten labs. One progression.</h2>
          <p className="text-[15px] text-slate-500 mb-8 max-w-xl">Pack 1 builds core hardening skills. Pack 2 adds identity management and visual firewall auditing. Go Complete for all 10.</p>

          <div className="flex border-b-2 border-[rgba(8,145,178,0.15)] mb-8 gap-0">
            {[
              { id: 'p1', label: 'Pack 1', meta: '5 labs · £19.99' },
              { id: 'p2', label: 'Pack 2', meta: '5 labs · £19.99' },
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
                  <p className="text-xs text-slate-400 mb-2">All 10 labs — Pack 1 then Pack 2 in difficulty order.</p>
                  {[PACK1_LABS[0], ...PACK1_LABS.slice(1), ...PACK2_LABS].map((l, i) => <LabRow key={i} lab={{ ...l, num: l.free ? 'F' : i }} />)}
                </>
              )}
            </div>
            <div>
              {tab === 'p1' && <PackCard title="Security+ Pack 1" code="SY0-701 · Pack 1" price="19.99" labs={5} />}
              {tab === 'p2' && <PackCard title="Security+ Pack 2" code="SY0-701 · Pack 2" price="19.99" labs={5} />}
              {tab === 'complete' && (
                <PackCard title="Security+ Complete" code="SY0-701 · Complete" price="32.99" oldPrice="39.98" labs={10} complete
                  includes={['Pack 1 — 5 server hardening labs', 'Pack 2 — 5 labs inc. FORTIGUARD Auditor', 'Free SSH hardening taster lab', 'All 10 labs unlocked immediately']}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="bg-[#F4F7FA] py-14 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">The tools you'll use</p>
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.8px' }}>Not described. Actually used.</h2>
          <p className="text-[15px] text-slate-500 mb-8 max-w-xl">Pack 1 is all CLI. Pack 2 introduces the FORTIGUARD Policy Auditor — a visual firewall rule table that mirrors real-world audit tooling.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { img: '/screenshots/fl-fortiguard.png', lbl: 'FORTIGUARD Policy Auditor v3.1', title: 'FORTIGUARD Policy Auditor — firewall rule audit and remediation', desc: 'Review a full firewall rule set, identify anomaly indicators (zero-hit DENY rules, overly broad ALLOW-ANY), analyse hit distribution across rules, and remove redundant policies — mirroring the firewall audit workflow tested in SY0-701.', pack: 'Security+ Pack 2 · lab 4' },
              { img: '/screenshots/fl-linux-cli.png', lbl: 'Linux CLI — Security+ Pack 1', title: 'Live Linux CLI — all Pack 1 labs', desc: 'Real commands, real output. Run ss -tlnp, ls /etc/ssh/, grep PermitRootLogin — the available commands panel guides the investigation, but you type every command yourself. The output reflects the actual vulnerability in the scenario.', pack: 'Security+ Pack 1 · all labs' },
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

import { useState } from 'react';
import BuyButton from '@/components/BuyButton';
import { priceOf, savingOf, lookup, formatPrice } from '@/lib/catalogue';
import { Helmet } from 'react-helmet';
import { Sparkles, ChevronDown } from 'lucide-react';
import ExamPrepSection from '../components/ExamPrepSection';

// ── A+ Core 1 (220-1201) landing page ────────────────────────────────────────
// Built 25-Apr-2026 alongside the storefront A+ rollout. All 10 labs across both
// packs are LIVE as of 05-Sep-2026 — the titles, difficulties, times and objective
// mappings below are the shipped content, not a plan. Source of truth is
// pbq_banks / pbq_questions where product_key = aplus_core1_pack or
// aplus_core1_pack_2; see canon project.fl_pbq_creator.aplus_pack_plan.
// Hero/tool screenshots remain placeholders reusing existing FortifyLearn shots.

const PACK1_LABS = [
  { num: 1, title: 'Thermal throttling and fan-curve diagnosis',            diff: 'Easy',         time: 10, obj: '3.0 / 5.0', tool: 'THERMGRID' },
  { num: 2, title: 'Mobile hotspot and eSIM provisioning triage',           diff: 'Intermediate', time: 12, obj: '1.0',       tool: 'CELLPLAN' },
  { num: 3, title: 'Printer fleet outage — driver, spooler and queue path', diff: 'Intermediate', time: 12, obj: '5.0',       tool: 'FLEETSPOOL' },
  { num: 4, title: 'Switch port, VLAN and uplink misconfiguration',         diff: 'Hard',         time: 15, obj: '2.0',       tool: 'PORTGRID' },
  { num: 5, title: 'Two concurrent faults — multi-symptom isolation',       diff: 'Expert',       time: 25, obj: '5.0 / 3.0', tool: 'FAULTGRID' },
];

const PACK2_LABS = [
  { num: 1, title: 'Office Wi-Fi channel and interference planning', diff: 'Easy',         time: 10, obj: '2.0',       tool: 'RFPLAN' },
  { num: 2, title: 'UEFI boot order and Secure Boot recovery',       diff: 'Intermediate', time: 12, obj: '3.0',       tool: 'FIRMBOOT' },
  { num: 3, title: 'Intermittent shutdown and POST-code isolation',  diff: 'Hard',         time: 15, obj: '5.0 / 3.0', tool: 'POSTTRACE' },
  { num: 4, title: 'VDI host contention and client provisioning',    diff: 'Hard',         time: 15, obj: '4.0',       tool: 'VDIOPS' },
  { num: 5, title: 'Degraded array rebuild and backplane fault',     diff: 'Expert',       time: 25, obj: '3.0 / 5.0', tool: 'ARRAYOPS' },
];

const DIFF_STYLE = {
  Easy:'bg-green-100 text-green-700', Intermediate:'bg-blue-100 text-blue-700',
  Hard:'bg-amber-100 text-amber-700', Expert:'bg-[#0B1D3A]/10 text-[#0B1D3A]',
};
const TOOL_STYLE = {
  'THERMGRID':  'bg-[#e0f2f9] text-[#0E5F8A]',
  'CELLPLAN':   'bg-emerald-50 text-emerald-700',
  'FLEETSPOOL': 'bg-purple-50 text-purple-700',
  'PORTGRID':   'bg-[#0B1D3A]/10 text-[#0B1D3A]',
  'FAULTGRID':  'bg-amber-50 text-amber-700',
  'RFPLAN':     'bg-emerald-50 text-emerald-700',
  'FIRMBOOT':   'bg-amber-50 text-amber-700',
  'POSTTRACE':  'bg-[#0B1D3A]/10 text-[#0B1D3A]',
  'VDIOPS':     'bg-[#e0f2f9] text-[#0E5F8A]',
  'ARRAYOPS':   'bg-purple-50 text-purple-700',
};

function LabRow({ lab }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[#F4F7FA] border border-[rgba(8,145,178,0.12)] rounded-xl hover:border-[rgba(8,145,178,0.3)] transition-colors">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
        {lab.num}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-[#0B1D3A] leading-snug">{lab.title}</p>
        </div>
        <div className="flex gap-2 flex-wrap mt-1.5">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[rgba(14,95,138,0.1)] text-[#0E5F8A]">220-1201 · {lab.obj}</span>
          {lab.time && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">~{lab.time} min</span>}
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${TOOL_STYLE[lab.tool] || 'bg-slate-100 text-slate-500'}`}>{lab.tool}</span>
        </div>
      </div>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${DIFF_STYLE[lab.diff]}`}>{lab.diff}</span>
    </div>
  );
}

function PackCard({ title, code, productKey, labs, complete, includes }) {
  // Prices come from the catalogue, never from a literal on the page.
  const price    = priceOf(productKey);
  const oldPrice = lookup(productKey)?.config.rrp;
  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-[rgba(8,145,178,0.3)]">
      <div className="p-5 text-white" style={{ background: 'linear-gradient(135deg,#0B1D3A,#0E5F8A)' }}>
        <p className="text-[10px] font-bold tracking-widest text-[#7DD3E8] uppercase mb-1">{code}</p>
        <h3 className="text-lg font-extrabold" style={{ letterSpacing: '-0.3px' }}>{title}</h3>
        <p className="text-[12px] text-white/50 mt-1">{labs} labs · Easy → Expert · Lifetime access</p>
      </div>
      <div className="p-5 bg-white">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-black text-[#0B1D3A]" style={{ letterSpacing: '-1px' }}>{formatPrice(price)}</span>
        </div>
        <p className="text-xs text-slate-400 mb-4">One-time · Lifetime access from purchase</p>
        <BuyButton productKey={productKey} className="block w-full text-center py-3 rounded-xl mb-3" />
        <p className="text-[11px] text-slate-400 text-center">Or get the <span className="font-bold text-[#0891B2]">Prep Bundle for {formatPrice(priceOf('aplus_core1_prep_bundle'))}</span> — saves {formatPrice(lookup('aplus_core1_prep_bundle')?.config.saving || 0)}</p>
      </div>
    </div>
  );
}


const FAQ = [
  {
    q: 'What does an A+ Core 1 lab look like in FortifyLearn?',
    a: 'Each lab puts you in a structured diagnostic workflow — a hardware fault, a mobile sync issue, a virtualisation misconfiguration — and asks you to identify the cause and the fix. The environments are representative tooling: console dashboards for hardware health, CLI-style diagnostic prompts, mobile device configuration screens, and topology diagnostic interfaces. They mirror the kind of decision-making the 220-1201 PBQs test, not actual hardware or networking equipment.',
  },
  {
    q: 'Is FortifyLearn endorsed by CompTIA?',
    a: 'Cy-Sec is a CompTIA Authorised Partner, which is a formal commercial relationship. The labs themselves are not officially endorsed by CompTIA — no third-party prep platform is. Every lab is mapped to specific 220-1201 exam objectives, but CompTIA does not certify or review external lab content.',
  },
  {
    q: "What's the difference between Foundation Labs and Advanced Labs?",
    a: `Foundation Labs is the ${formatPrice(priceOf('aplus_core1_pack'))} entry pack — five A+ Core 1 scenarios covering thermal throttling diagnosis, mobile hotspot and eSIM provisioning, a model-specific printer fleet outage, switch port and VLAN misconfiguration, and a two-fault multi-symptom isolation. Advanced Labs is the ${formatPrice(priceOf('aplus_core1_pack_2'))} second pack and adds Wi-Fi channel and interference planning, UEFI boot order and Secure Boot recovery, intermittent POST-code isolation, virtual desktop host contention, and a degraded array rebuild with a backplane fault. Or grab the Exam Prep Bundle at ${formatPrice(priceOf('aplus_core1_prep_bundle'))} for both packs plus the Exam Engine — saves ${formatPrice(savingOf('aplus_core1_prep_bundle'))}.`,
  },
  {
    q: 'How much A+ Core 1 content is available right now?',
    a: "All ten A+ Core 1 labs are live — five in Foundation Labs and five in Advanced Labs — and every one is included in the pack you buy, with lifetime access. Buy either pack and you get its five labs immediately; the Exam Prep Bundle adds the Exam Engine on top.",
  },
  {
    q: 'Are these labs enough on their own to pass A+ Core 1?',
    a: `For most people, no. The labs build the practical PBQ skill the exam tests, but A+ Core 1 has a heavy multiple-choice section covering mobile devices, networking concepts, hardware identification, virtualisation, and troubleshooting theory. Pair the labs with a strong MCQ resource — either the FortifyLearn Exam Engine or a third-party question bank — to cover both halves of the exam. The Exam Prep Bundle at ${formatPrice(priceOf('aplus_core1_prep_bundle'))} packages labs and Exam Engine together at a ${formatPrice(savingOf('aplus_core1_prep_bundle'))} saving.`,
  },
  {
    q: 'Will FortifyLearn guarantee I pass A+ Core 1?',
    a: 'No. Any prep platform claiming to guarantee a pass is overstating what it can do. Passing depends on you, the time you put into your study, and how the exam goes on the day. What FortifyLearn gives you is the realistic diagnostic-workflow practice the exam tests for — not a guarantee.',
  },
  {
    q: 'What if a lab breaks or I have a question?',
    a: 'Email the FortifyLearn Support Team at fortifylearn@cy-sec.co.uk. Lab issues are usually fixed within a working day. We can also help with general platform and study questions.',
  },
  {
    q: 'Can I get a refund?',
    a: "If you've bought a pack but haven't accessed any lab yet, email info@cy-sec.co.uk within 14 days and we'll issue a full refund. Once you've started any lab, the pack counts as performance-begun digital content under UK consumer law and the 14-day right of withdrawal lapses — but your statutory rights under the Consumer Rights Act 2015 still apply if a lab is faulty or not as described. Full terms in our Terms of Service.",
  },
];

export default function APlusCore1LabsPage() {
  const [tab, setTab] = useState('p1');

  return (
    <>
      <Helmet>
        <title>CompTIA A+ Core 1 (220-1201) Practice Labs | FortifyLearn — Cy-Sec</title>
        <meta name="description" content="Hands-on CompTIA A+ Core 1 (220-1201) PBQ practice labs covering mobile devices, networking, hardware, virtualisation, and troubleshooting. Realistic diagnostic workflows. One-time purchase, lifetime access. CompTIA Authorised Partner." />
        <meta name="keywords" content="CompTIA A+ labs, A+ Core 1 practice, 220-1201 PBQ, hardware troubleshooting labs, CompTIA practice labs UK" />
        <link rel="canonical" href="https://cy-sec.co.uk/comptia-aplus-core1-labs" />
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
          <img src="/screenshots/fl-techscope.png" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(6,14,31,0.97) 0%,rgba(11,29,58,0.95) 45%,rgba(8,80,120,0.80) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(8,145,178,1) 1px,transparent 1px),linear-gradient(to right,rgba(8,145,178,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 border text-xs font-bold tracking-wider uppercase text-[#7DD3E8]" style={{ background: 'rgba(8,145,178,0.15)', borderColor: 'rgba(8,145,178,0.35)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]" /> 220-1201 · CompTIA A+ Core 1
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border text-[10px] font-extrabold tracking-widest uppercase text-amber-300" style={{ background: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.35)' }}>
              <Sparkles className="w-3 h-3" /> All 10 labs live · lifetime access
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-5" style={{ letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              A+ Core 1 practice labs.<br />
              <span style={{ background: 'linear-gradient(90deg,#7DD3E8,#0891B2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hardware. Networking.</span><br />
              Mobile devices.
            </h1>
            <p className="text-[15px] text-white/60 leading-relaxed mb-7 max-w-lg">
              <strong className="text-white/90">CompTIA A+ Core 1 (220-1201) performance-based questions</strong> test you on diagnosing mobile device, networking, and hardware faults under realistic conditions. FortifyLearn's 10-lab A+ Core 1 curriculum maps to every 220-1201 domain, and all ten labs are live now — included in the pack you buy, with lifetime access.
            </p>
            <div className="flex gap-3 flex-wrap mb-6">
              <BuyButton productKey="aplus_core1_pack" className="px-6 py-3 rounded-xl text-sm">{`Foundation Labs — ${formatPrice(priceOf("aplus_core1_pack"))}`}</BuyButton>
              <BuyButton productKey="aplus_core1_prep_bundle" variant="outline" className="px-6 py-3 rounded-xl text-sm">{`Prep Bundle — ${formatPrice(priceOf("aplus_core1_prep_bundle"))}`}</BuyButton>
            </div>
            <div className="flex gap-4 flex-wrap">
              {['10 labs across 2 tiers', 'Mapped to 220-1201', 'Lifetime access', 'Updated as content ships'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-white/40"><span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/60" />{t}</span>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="text-[10px] font-bold text-[#7DD3E8] tracking-wider uppercase absolute -top-4 left-4 bg-gradient-to-r from-[#0B1D3A] to-[#0891B2] px-3 py-1.5 rounded-md z-10">
              FortifyLearn diagnostic console — in development
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img src="/screenshots/fl-cysa-cli.png" alt="FortifyLearn diagnostic terminal preview for A+ Core 1 hardware troubleshooting labs" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO intro ── */}
      <section className="bg-white border-b border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[15px] text-slate-500 leading-relaxed">
              The <span className="font-semibold text-[#0891B2]">CompTIA A+ Core 1 (220-1201) exam</span> tests hands-on troubleshooting across five domains: mobile devices, networking, hardware, virtualisation & cloud, and hardware/network troubleshooting. FortifyLearn's <span className="font-semibold text-[#0891B2]">A+ Core 1 lab curriculum</span> works through a realistic scenario in each — diagnostic workflows you can run on day one of the job.
            </p>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              Foundation Labs covers the everyday scenarios — a workstation throttling under load, a field laptop whose cellular modem never connects, a printer fleet where one model has stopped, a relocated desk that gets no address, and a machine carrying two independent faults at once. Advanced Labs builds on those with <strong className="text-[#0B1D3A]">wireless channel and interference planning</strong>, UEFI and Secure Boot recovery, an intermittent POST fault that two component swaps failed to fix, virtual desktop contention, and a degraded array that has dropped three good disks. All ten labs are live today.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-3">
            {[['10', 'Labs across 2 tiers'], ['220-1201', 'CompTIA exam code'], ['5', 'Domains covered']].map(([n, l]) => (
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
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">A+ Core 1 (220-1201) labs</p>
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.8px' }}>Two packs. Ten labs. Mapped to every domain.</h2>
          <p className="text-[15px] text-slate-500 mb-8 max-w-xl">Foundation Labs covers the core 220-1201 scenarios. Advanced Labs adds the harder multi-fault and wireless workflows. Every lab is live today and mapped to one or more A+ Core 1 objectives.</p>

          <div className="flex overflow-x-auto border-b-2 border-[rgba(8,145,178,0.15)] mb-8 gap-0">
            {[
              { id: 'p1', label: 'Foundation', meta: `5 labs · ${formatPrice(priceOf('aplus_core1_pack'))}` },
              { id: 'p2', label: 'Advanced',   meta: `5 labs · ${formatPrice(priceOf('aplus_core1_pack_2'))}` },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-4 sm:px-6 py-3 text-sm font-semibold border-b-2 -mb-0.5 transition-all whitespace-nowrap shrink-0 ${tab === t.id ? 'text-[#0B1D3A] border-[#0891B2]' : 'text-slate-400 border-transparent hover:text-slate-600'}`}>
                {t.label}
                <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${tab === t.id ? 'bg-[#e0f2f9] text-[#0891B2]' : 'bg-slate-100 text-slate-400'}`}>{t.meta}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            <div className="space-y-3">
              {tab === 'p1' && PACK1_LABS.map(l => <LabRow key={l.num} lab={l} />)}
              {tab === 'p2' && PACK2_LABS.map(l => <LabRow key={l.num} lab={l} />)}
            </div>
            <div>
              {tab === 'p1' && <PackCard title="A+ Core 1 Foundation Labs" code="220-1201 · Foundation" productKey="aplus_core1_pack" labs={5} />}
              {tab === 'p2' && <PackCard title="A+ Core 1 Advanced Labs"   code="220-1201 · Advanced" productKey="aplus_core1_pack_2" labs={5} />}
            </div>
          </div>
        </div>
      </section>

      {/* ── Exam prep deep-dive ── */}
      <ExamPrepSection cert="aplus_core1" certLabel="A+ Core 1" code="220-1201" />

      {/* ── FAQ ── */}
      <section className="bg-white py-14 px-8 border-t border-[rgba(8,145,178,0.1)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Common questions</p>
          <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-8" style={{ letterSpacing: '-0.8px' }}>FAQ</h2>
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
        </div>
      </section>
    </>
  );
}

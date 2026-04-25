// Exam Prep section — deep-dive Exam Engine (Study + Exam Mode) + Prep Bundle callout
// ------------------------------------------------------------------------------------
// Sits between the Pack tabs and Tools sections on each cert landing page. Previously
// a thin 3-card cross-sell strip (CompleteYourPrep); now a substantial product section
// so SEO visitors who land on /comptia-<cert>-labs see the full product range with
// real screenshots, features, and prices — not just lab packs.
//
// 25-Apr-2026: standalone MCQ Study Bank SKU retired. Buying the Exam Engine
// unlocks BOTH Study Mode (1,000 MCQs with reasoning) AND Exam Mode (timed PBQ + MCQ
// mock exam). The two cards below describe the two modes — they're not two products.
// One purchase, two ways of using it.
//
// Props:
//   cert       — cert key (netplus | secplus | cysa)
//   certLabel  — display label ("Network+" / "Security+" / "CySA+")
//   code       — CompTIA exam code ("N10-009" / "SY0-701" / "CS0-003")
//
// Uses <a href="/store"> to match the navigation pattern already established on
// the cert landing pages (Rule 5 <Link> migration deferred as a cross-page pass).

import { Star, Check, Clock, BarChart3, BookOpen, Target } from 'lucide-react';

export default function ExamPrepSection({ cert, certLabel, code }) {
  return (
    <section className="bg-[#F4F7FA] py-16 px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Beyond the labs</p>
        <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-3" style={{ letterSpacing: '-0.8px' }}>
          One Exam Engine. Two ways to use it.
        </h2>
        <p className="text-[15px] text-slate-500 mb-10 max-w-2xl leading-relaxed">
          Labs build the hands-on PBQ skills. The Exam Engine builds the exam-day fluency
          — practise at your own pace in Study Mode, then prove your readiness in Exam Mode.
          One purchase. Both modes included.
        </p>

        {/* Two-mode cards (both unlocked by a single Exam Engine purchase) */}
        <div className="bg-white rounded-2xl overflow-hidden border border-[rgba(8,145,178,0.15)] mb-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* ───── Study Mode ───── */}
            <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[rgba(8,145,178,0.1)]">
              <div className="relative bg-slate-50 border-b border-[rgba(8,145,178,0.1)]">
                <img src="/screenshots/fl-mcq-reasoning.png"
                  alt={`FortifyLearn Exam Engine — ${certLabel} Study Mode question with correct answer highlighted and full reasoning`}
                  className="w-full block" loading="lazy" />
                <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-md"
                  style={{ background: 'rgba(11,29,58,0.9)', color: '#7DD3E8', border: '1px solid rgba(125,211,232,0.3)' }}>
                  {code} · Study Mode
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-extrabold text-[#0B1D3A]" style={{ letterSpacing: '-0.4px' }}>Study Mode</h3>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#e0f2f9] text-[#0891B2]">1,000 Qs</span>
                </div>
                <p className="text-[14px] text-slate-600 mb-5 leading-relaxed">
                  1,000 multiple-choice questions per cert with full reasoning on every answer
                  — and every distractor. Built for focused revision on weak domains.
                </p>

                <ul className="space-y-2.5 flex-1">
                  <FeatureRow icon={BookOpen} text="Instant feedback after each answer with full reasoning" />
                  <FeatureRow icon={Target} text="Per-option “why this is wrong” explanations on every distractor" />
                  <FeatureRow icon={BarChart3} text="Objective tags so you can drill specific weak domains" />
                  <FeatureRow icon={Check} text="Self-paced — no timer, no pressure" />
                </ul>
              </div>
            </div>

            {/* ───── Exam Mode ───── */}
            <div className="flex flex-col">
              <div className="relative bg-slate-50 border-b border-[rgba(8,145,178,0.1)]">
                <img src="/screenshots/fl-exam-question.png"
                  alt={`FortifyLearn Exam Engine — ${certLabel} Exam Mode question in progress with countdown timer`}
                  className="w-full block" loading="lazy" />
                <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-md"
                  style={{ background: 'rgba(11,29,58,0.9)', color: '#7DD3E8', border: '1px solid rgba(125,211,232,0.3)' }}>
                  {code} · Exam Mode
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-extrabold text-[#0B1D3A]" style={{ letterSpacing: '-0.4px' }}>Exam Mode</h3>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#e0f2f9] text-[#0891B2]">Timed</span>
                </div>
                <p className="text-[14px] text-slate-600 mb-5 leading-relaxed">
                  A full mock that mirrors the real CompTIA exam. 3–6 PBQs plus 85–90 MCQs
                  under one combined timer, scored 100–900 with a per-domain diagnostic.
                </p>

                <ul className="space-y-2.5 flex-1">
                  <FeatureRow icon={Clock} text="Combined PBQ + MCQ session under a single exam timer" />
                  <FeatureRow icon={BarChart3} text="Scaled score (100–900) with per-domain diagnostic breakdown" />
                  <FeatureRow icon={Target} text="Randomised question selection — every attempt is different" />
                  <FeatureRow icon={Check} text="Honest ±50 point approximation disclaimer shown in-app" />
                </ul>
              </div>
            </div>

          </div>

          {/* Single price + CTA spanning both modes */}
          <div className="p-6 border-t border-[rgba(8,145,178,0.1)] bg-slate-50/50 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1">Both modes included</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#0B1D3A]" style={{ letterSpacing: '-0.5px' }}>£24.99</span>
                <span className="text-[13px] text-slate-500">· Exam Engine · Lifetime access</span>
              </div>
            </div>
            <a href="/store"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:brightness-95"
              style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
              Add Exam Engine to basket →
            </a>
          </div>

        </div>

        {/* ───── Prep Bundle savings callout ───── */}
        <div className="rounded-2xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg,#0B1D3A 0%,#0E5F8A 55%,#0891B2 100%)' }}>
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(to right,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-0">

            {/* Left: copy + breakdown + CTA */}
            <div className="md:col-span-3 p-8 md:p-10 flex flex-col text-white">
              <div className="inline-flex items-center self-start gap-1.5 px-3 py-1 rounded-full mb-4 border text-[10px] font-bold tracking-widest uppercase"
                style={{ background: 'rgba(125,211,232,0.15)', borderColor: 'rgba(125,211,232,0.35)', color: '#7DD3E8' }}>
                <Star className="w-3 h-3" fill="#7DD3E8" /> Best value · Prep Bundle
              </div>
              <h3 className="text-2xl md:text-3xl font-black leading-tight mb-3" style={{ letterSpacing: '-0.8px' }}>
                Everything for {certLabel}, together for £39.99.
              </h3>
              <p className="text-[14px] text-white/65 mb-6 leading-relaxed max-w-md">
                10 hands-on PBQ labs and the full Exam Engine (Study + Exam Mode) — bundled.
                Save £24.98 versus buying each piece à la carte.
              </p>

              <ul className="space-y-2 mb-6">
                <BundleRow label="Foundation Labs — 5 PBQ scenarios" price="£19.99" />
                <BundleRow label="Advanced Labs — 5 PBQ scenarios with visual tools" price="£19.99" />
                <BundleRow label="Exam Engine — Study Mode + Exam Mode" price="£24.99" />
              </ul>

              <div className="flex items-baseline gap-3 mb-5 flex-wrap">
                <span className="text-4xl font-black" style={{ letterSpacing: '-1px' }}>£39.99</span>
                <span className="text-lg text-white/40 line-through">£64.97</span>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded"
                  style={{ background: '#FDE8E8', color: '#A91818', letterSpacing: '0.02em' }}>
                  SAVE £24.98
                </span>
              </div>

              <a href="/store"
                className="inline-flex items-center justify-center self-start px-6 py-3 rounded-xl bg-white text-[#0B1D3A] text-sm font-bold transition-all hover:brightness-95">
                Shop the Prep Bundle →
              </a>
            </div>

            {/* Right: supporting visual (exam results screenshot) */}
            <div className="hidden md:block md:col-span-2 relative overflow-hidden" style={{ minHeight: 400 }}>
              <img src="/screenshots/fl-exam-results.png"
                alt={`FortifyLearn Exam Engine — ${certLabel} readiness projection and per-domain diagnostic`}
                className="absolute"
                style={{
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  maxWidth: '95%', maxHeight: '80%',
                  borderRadius: 10,
                  boxShadow: '0 20px 45px rgba(0,0,0,0.45), 0 0 0 1px rgba(125,211,232,0.12)',
                }}
                loading="lazy" />
              <div className="absolute bottom-4 left-4 text-[9px] font-bold tracking-wider uppercase"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                Exam Engine · readiness report
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Small building blocks ──────────────────────────────────────────────── */

function FeatureRow({ icon: Icon, text }) {
  return (
    <li className="flex gap-2.5 items-start">
      <div className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mt-0.5"
        style={{ background: 'rgba(8,145,178,0.1)' }}>
        <Icon className="w-3 h-3" style={{ color: '#0891B2' }} strokeWidth={2.5} />
      </div>
      <span className="text-[13px] text-slate-600 leading-relaxed">{text}</span>
    </li>
  );
}

function BundleRow({ label, price }) {
  return (
    <li className="flex items-center justify-between gap-4 py-1.5 border-b border-white/10">
      <div className="flex items-center gap-2">
        <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#7DD3E8' }} strokeWidth={2.5} />
        <span className="text-[13px] text-white/85">{label}</span>
      </div>
      <span className="text-[12px] text-white/35 line-through flex-shrink-0">{price}</span>
    </li>
  );
}

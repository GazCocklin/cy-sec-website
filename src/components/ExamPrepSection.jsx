// Exam Prep section — deep-dive Exam Engine + MCQ Study Bank + Prep Bundle callout
// ------------------------------------------------------------------------------------
// Sits between the Pack tabs and Tools sections on each cert landing page. Previously
// a thin 3-card cross-sell strip (CompleteYourPrep); now a substantial product section
// so SEO visitors who land on /comptia-<cert>-labs see the full product range (mock
// exams, MCQ practice, savings bundle) with real screenshots, features, and prices
// — not just lab packs.
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
          Mock exams and MCQ practice for {certLabel}
        </h2>
        <p className="text-[15px] text-slate-500 mb-10 max-w-2xl leading-relaxed">
          Labs build the hands-on PBQ skills. The Exam Engine and MCQ Study Bank build the
          exam-day fluency — scored practice, domain diagnostics, full reasoning on every
          question. Get them individually, or save £29.97 with the Prep Bundle.
        </p>

        {/* Two deep-dive product cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* ───── Exam Engine ───── */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[rgba(8,145,178,0.15)] flex flex-col">
            <div className="relative bg-slate-50 border-b border-[rgba(8,145,178,0.1)]">
              <img src="/screenshots/fl-exam-question.png"
                alt={`FortifyLearn Exam Engine — ${certLabel} mock exam question in progress with countdown timer`}
                className="w-full block" loading="lazy" />
              <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-md"
                style={{ background: 'rgba(11,29,58,0.9)', color: '#7DD3E8', border: '1px solid rgba(125,211,232,0.3)' }}>
                {code} · Mock exam
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-extrabold text-[#0B1D3A]" style={{ letterSpacing: '-0.4px' }}>Exam Engine</h3>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#e0f2f9] text-[#0891B2]">Timed</span>
              </div>
              <p className="text-[14px] text-slate-600 mb-5 leading-relaxed">
                Practice the exam you'll actually take. 3–6 PBQs plus 85–90 MCQs under a single
                combined timer, scored 100–900 — the same structure CompTIA uses.
              </p>

              <ul className="space-y-2.5 mb-6 flex-1">
                <FeatureRow icon={Clock} text="Combined PBQ + MCQ session under one timer — mirrors the real CompTIA exam" />
                <FeatureRow icon={BarChart3} text="Scaled score (100–900) with per-domain diagnostic breakdown" />
                <FeatureRow icon={Target} text="Randomised question selection — every attempt is different" />
                <FeatureRow icon={Check} text="Honest ±50 point approximation disclaimer shown in-app" />
              </ul>

              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#0B1D3A]" style={{ letterSpacing: '-0.5px' }}>£24.99</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">One-time · Lifetime access</p>
                </div>
              </div>
              <a href="/store"
                className="block w-full text-center py-3 rounded-xl text-sm font-bold text-white transition-all hover:brightness-95"
                style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
                Add Exam Engine to basket →
              </a>
            </div>
          </div>

          {/* ───── MCQ Study Bank ───── */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[rgba(8,145,178,0.15)] flex flex-col">
            <div className="relative bg-slate-50 border-b border-[rgba(8,145,178,0.1)]">
              <img src="/screenshots/fl-mcq-reasoning.png"
                alt={`FortifyLearn MCQ Study Bank — ${certLabel} question with correct answer highlighted and full reasoning`}
                className="w-full block" loading="lazy" />
              <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-md"
                style={{ background: 'rgba(11,29,58,0.9)', color: '#7DD3E8', border: '1px solid rgba(125,211,232,0.3)' }}>
                {code} · Study bank
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-extrabold text-[#0B1D3A]" style={{ letterSpacing: '-0.4px' }}>MCQ Study Bank</h3>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#e0f2f9] text-[#0891B2]">1,000 Qs</span>
              </div>
              <p className="text-[14px] text-slate-600 mb-5 leading-relaxed">
                1,000 multiple-choice questions per cert with full reasoning on every answer
                — and every distractor. Built for focused revision on weak domains.
              </p>

              <ul className="space-y-2.5 mb-6 flex-1">
                <FeatureRow icon={BookOpen} text="Study mode with instant feedback and reasoning after each answer" />
                <FeatureRow icon={Clock} text="Timed mode for speed and stamina under exam conditions" />
                <FeatureRow icon={Target} text="Every question tagged to a CompTIA exam objective — drill weak domains" />
                <FeatureRow icon={Check} text="Standalone or pair with the Exam Engine for timed mocks" />
              </ul>

              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#0B1D3A]" style={{ letterSpacing: '-0.5px' }}>£14.99</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">One-time · Lifetime access</p>
                </div>
              </div>
              <a href="/store"
                className="block w-full text-center py-3 rounded-xl text-sm font-bold text-[#0B1D3A] border-2 transition-all hover:bg-[#e0f2f9]"
                style={{ borderColor: '#0891B2' }}>
                Add MCQ Study Bank to basket →
              </a>
            </div>
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
                Everything for {certLabel}, together for £49.99.
              </h3>
              <p className="text-[14px] text-white/65 mb-6 leading-relaxed max-w-md">
                10 hands-on PBQ labs, the Exam Engine, and the 1,000-question MCQ Study Bank
                — bundled. Save £29.97 versus buying each piece à la carte.
              </p>

              <ul className="space-y-2 mb-6">
                <BundleRow label="Foundation Labs — 5 PBQ scenarios" price="£19.99" />
                <BundleRow label="Advanced Labs — 5 PBQ scenarios with visual tools" price="£19.99" />
                <BundleRow label="Exam Engine — timed PBQ + MCQ mock" price="£24.99" />
                <BundleRow label="MCQ Study Bank — 1,000 questions with reasoning" price="£14.99" />
              </ul>

              <div className="flex items-baseline gap-3 mb-5 flex-wrap">
                <span className="text-4xl font-black" style={{ letterSpacing: '-1px' }}>£49.99</span>
                <span className="text-lg text-white/40 line-through">£79.96</span>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded"
                  style={{ background: '#FDE8E8', color: '#A91818', letterSpacing: '0.02em' }}>
                  SAVE £29.97
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

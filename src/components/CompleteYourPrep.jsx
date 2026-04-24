// Complete your prep — cross-sell strip for cert landing pages
// -------------------------------------------------------------
// Sits between Pack tabs and Tools on each cert landing page. Surfaces the
// three non-labs SKUs (Exam Engine, MCQ Study Bank, Prep Bundle) that are
// otherwise only discoverable on /store, so SEO visitors landing on a
// cert-specific page see the full product range.
//
// Props:
//   cert       — cert key (netplus | secplus | cysa). Reserved for future
//                deep-linking to store anchors; currently unused at runtime.
//   certLabel  — display label for the heading ("Network+" etc.)
//   code       — CompTIA exam code ("N10-009" etc.), shown as a metadata
//                chip on each card.
//
// Uses <a href="/store"> to match the navigation pattern already established
// on the cert landing pages. (Rule 5 calls for <Link to="/store"> — the
// cert pages predate that rule and will be converted in a separate pass.)

import { Star } from 'lucide-react';

export default function CompleteYourPrep({ cert, certLabel, code }) {
  return (
    <section className="bg-[#F4F7FA] py-14 px-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-[#0891B2] mb-2">Beyond the labs</p>
        <h2 className="text-3xl font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.8px' }}>
          Complete your {certLabel} prep
        </h2>
        <p className="text-[15px] text-slate-500 mb-8 max-w-2xl">
          Labs are where PBQ skills get built. Pair them with a mock exam, a study bank, or both — and
          save £29.97 when you take the bundle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Exam Engine ─────────────────────────────────────────────── */}
          <a href="/store"
            className="block bg-white rounded-2xl border border-[rgba(8,145,178,0.25)] overflow-hidden hover:border-[#0891B2] hover:shadow-sm transition-all group">
            <div className="p-5 h-full flex flex-col">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#0891B2] mb-1">{code} · Mock exam</p>
              <h3 className="text-lg font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.3px' }}>Exam Engine</h3>
              <p className="text-[13px] text-slate-500 mb-4 leading-relaxed flex-1">
                Timed mock exam — 3–6 PBQs plus 85–90 MCQs under one combined timer, exactly like the real CompTIA exam. Scored 100–900 with per-domain diagnostics.
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-black text-[#0B1D3A]" style={{ letterSpacing: '-0.5px' }}>£24.99</span>
                <span className="text-[11px] text-slate-400">one-time · lifetime access</span>
              </div>
              <span className="text-xs font-semibold text-[#0891B2] group-hover:underline">See on store →</span>
            </div>
          </a>

          {/* MCQ Study Bank ──────────────────────────────────────────── */}
          <a href="/store"
            className="block bg-white rounded-2xl border border-[rgba(8,145,178,0.25)] overflow-hidden hover:border-[#0891B2] hover:shadow-sm transition-all group">
            <div className="p-5 h-full flex flex-col">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#0891B2] mb-1">{code} · Study bank</p>
              <h3 className="text-lg font-extrabold text-[#0B1D3A] mb-2" style={{ letterSpacing: '-0.3px' }}>MCQ Study Bank</h3>
              <p className="text-[13px] text-slate-500 mb-4 leading-relaxed flex-1">
                1,000 multiple-choice questions with full reasoning on every correct answer and every distractor. Objective-tagged so you can drill weak domains.
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-black text-[#0B1D3A]" style={{ letterSpacing: '-0.5px' }}>£14.99</span>
                <span className="text-[11px] text-slate-400">one-time · lifetime access</span>
              </div>
              <span className="text-xs font-semibold text-[#0891B2] group-hover:underline">See on store →</span>
            </div>
          </a>

          {/* Prep Bundle — featured (navy→teal gradient, Best value pill) ─ */}
          <a href="/store"
            className="block rounded-2xl overflow-hidden relative transition-all hover:-translate-y-0.5 hover:shadow-lg group"
            style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
            <div className="absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1 px-2 py-1 rounded bg-white text-[#0B1D3A]">
              <Star className="w-3 h-3" style={{ color: '#0891B2' }} fill="#0891B2" />
              Best value
            </div>
            <div className="p-5 h-full flex flex-col text-white">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#7DD3E8] mb-1">{code} · Everything</p>
              <h3 className="text-lg font-extrabold mb-2" style={{ letterSpacing: '-0.3px' }}>Exam Prep Bundle</h3>
              <p className="text-[13px] text-white/70 mb-4 leading-relaxed flex-1">
                All 10 labs, the Exam Engine, and the MCQ Study Bank — everything above, bundled. 37% cheaper than buying à la carte.
              </p>
              <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                <span className="text-2xl font-black" style={{ letterSpacing: '-0.5px' }}>£49.99</span>
                <span className="text-sm text-white/50 line-through">£79.96</span>
              </div>
              <div className="mb-3">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded" style={{ background: '#FDE8E8', color: '#A91818' }}>
                  SAVE £29.97
                </span>
              </div>
              <span className="text-xs font-semibold text-white group-hover:underline">See on store →</span>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}

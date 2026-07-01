import React from 'react';

/**
 * ProofStripFL — 4-stat band under the FortifyLearn hero.
 *
 * RULE 9: BRAND-GRADIENT — canon primary light gradient navy→mid-blue→teal
 *         (#0B1D3A → #0E5F8A → #0891B2) with white text, so all four stats
 *         stay legible across the whole band. (Earlier draft used a cyan→navy
 *         gradient with dark text — the right-hand stats fell dark-on-navy.)
 *
 * RULE 1/4: These are brand-level facts, confirmed by the owner (not StorePage
 *         pricing / live pack counts): PBQ share of the exam, MCQs-per-cert in
 *         Study Mode (1,000, with reasoning), the scaled mock-exam score range,
 *         and the free-taster offer. If a value ever needs to track live data,
 *         pass `items` instead of relying on these defaults.
 */
const DEFAULT_ITEMS = [
  { value: '~30%', label: 'OF YOUR EXAM IS PBQs' },
  { value: '1,000', label: 'MCQs PER CERT, WITH REASONING' },
  { value: '100–900', label: 'SCALED MOCK-EXAM SCORE' },
  { value: 'Free', label: 'TASTER LABS — NO CARD' },
];

export default function ProofStripFL({ items = DEFAULT_ITEMS }) {
  return (
    <section
      className="px-8 py-12"
      style={{ background: 'linear-gradient(135deg,#0B1D3A 0%,#0E5F8A 55%,#0891B2 100%)' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {items.map((it, i) => (
          <div key={i} style={{ color: '#FFFFFF' }}>
            <div className="font-extrabold leading-none text-4xl md:text-5xl">
              {it.value}
            </div>
            <div className="mt-2 text-xs font-bold tracking-widest" style={{ color: 'rgba(255,255,255,.8)' }}>
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

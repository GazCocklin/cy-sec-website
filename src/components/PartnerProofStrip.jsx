import React from 'react';

/**
 * PartnerProofStrip — partner-logo marquee under the FortifyLearn hero
 * (between <HeroFortifyLearn /> and <ProofStripFL /> on the homepage).
 *
 * RULE 3: NEVER improvise brand assets — all six logos are the processed
 *         partner files in public/logos/partners/ (backgrounds knocked out,
 *         cropped to content). masterschool.png and sudocyber.png were
 *         recoloured to brand navy #0B1D3A so they read on light surfaces;
 *         swap in original brand files if/when supplied.
 * RULE 9: Brand palette only — teal accent #0891B2, navy #0B1D3A. The H2
 *         gradient runs #0891B2 → #06B6D4 (a light tint of the same teal,
 *         per the approved design proof — not a new brand colour).
 *
 * Marquee: track renders the logo array twice and animates 0 → -50% for a
 * seamless loop (34s linear, paused on hover). Keyframes + hover/reduced-
 * motion rules live in src/index.css (.partner-marquee*). Under
 * prefers-reduced-motion the track doesn't animate — logos wrap into a
 * static centred grid and the duplicate set is hidden.
 */
const PARTNERS = [
  { src: '/logos/partners/comptia.png', alt: 'CompTIA', h: 28 },
  { src: '/logos/partners/bcs.png', alt: 'BCS, The Chartered Institute for IT', h: 58 },
  { src: '/logos/partners/masterschool.png', alt: 'Masterschool', h: 26 },
  { src: '/logos/partners/firebrand.png', alt: 'Firebrand Training', h: 40 },
  { src: '/logos/partners/learning-people.png', alt: 'Learning People', h: 38 },
  { src: '/logos/partners/sudocyber.png', alt: 'SudoCyber', h: 30 },
];

const LogoRow = ({ ariaHidden = false }) =>
  PARTNERS.map((p) => (
    <img
      key={`${p.src}${ariaHidden ? '-clone' : ''}`}
      src={p.src}
      alt={ariaHidden ? '' : p.alt}
      aria-hidden={ariaHidden || undefined}
      className={`w-auto opacity-90 flex-none${ariaHidden ? ' partner-marquee-clone' : ''}`}
      style={{ height: p.h }}
      loading="lazy"
      draggable="false"
    />
  ));

export default function PartnerProofStrip() {
  return (
    <section className="bg-slate-50 border-y border-slate-200 px-8 pt-16 pb-[72px]">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.14em]"
            style={{ color: '#0891B2' }}
          >
            Trusted across the industry
          </p>
          <h2
            className="mt-3 font-extrabold whitespace-nowrap"
            style={{ fontSize: 38, letterSpacing: '-0.02em', color: '#0B1D3A' }}
          >
            Companies already choosing{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ background: 'linear-gradient(135deg,#0891B2,#06B6D4)' }}
            >
              Cy-Sec
            </span>
          </h2>
          <p className="mt-4 text-slate-600" style={{ fontSize: 17 }}>
            Awarding bodies, training providers and security teams partner with
            us to deliver certified training and compliance-grade assurance.
          </p>
        </div>

        <div className="partner-marquee relative overflow-hidden py-2 mt-12">
          <div className="partner-marquee-track flex items-center gap-[88px] w-max">
            <LogoRow />
            <LogoRow ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}

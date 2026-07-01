import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * HeroFortifyLearn — FortifyLearn-led hero. Used on `/` and `/fortifylearn`.
 *
 * RULE 5: "Explore Exam Prep" is internal → <Link>. "Start Free Taster Labs"
 *         is an external link to fortifylearn.co.uk → <a target="_blank">
 *         (iOS-compliance: purchases stay on cy-sec /store; free labs live on FL).
 * RULE 9: BRAND-GRADIENT — canon navy→teal. The accent word + CTA use
 *         linear-gradient(135deg,#0B1D3A,#0891B2) / teal→bright (#0891B2→#06B6D4).
 * RULE 7 / Open Item #5: certification-tracks line does NOT enumerate certs —
 *         Cloud+ / AI Essentials are not live SKUs, and enumerating forces a
 *         rewrite per cert. Uses "every CompTIA cert in our catalogue" instead.
 * Hero image: real product screenshot, native resolution (no upscaled blur).
 */
const GRAD = 'linear-gradient(135deg,#0B1D3A,#0891B2)';
const GRAD_ACCENT = 'linear-gradient(135deg,#0891B2,#06B6D4)';

export default function HeroFortifyLearn() {
  return (
    <section className="relative overflow-hidden bg-white px-8 pt-16 pb-[72px]">
      {/* cyber-grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(8,145,178,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(8,145,178,.06) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 55% 35%, #000 35%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 90% 80% at 55% 35%, #000 35%, transparent 100%)',
        }}
      />
      <div className="absolute -top-24 -right-10 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'rgba(34,211,238,.16)', filter: 'blur(76px)' }} />
      <div className="absolute -bottom-36 -left-20 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'rgba(8,145,178,.12)', filter: 'blur(76px)' }} />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div>
          <div className="flex items-center gap-3.5 mb-[22px]">
            <img src="/logos/fortifylearn-logo.svg" alt="FortifyLearn" className="h-8 w-auto" />
            <span className="w-px h-[22px]" style={{ background: '#cbd5e1' }} />
            <span className="text-xs font-bold tracking-[0.14em] uppercase" style={{ color: '#64748b' }}>
              CompTIA Exam Prep
            </span>
          </div>

          <h1 className="font-extrabold text-[#0B1D3A]" style={{ fontSize: 62, lineHeight: 1.04, letterSpacing: '-0.025em' }}>
            Not Just Training.<br />
            <span style={{ background: GRAD_ACCENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              Transformation.
            </span>
          </h1>

          <p className="text-[19px] leading-[1.62] text-slate-600 mt-6 mb-8 max-w-[540px]">
            Performance-based questions are up to <strong className="text-[#0B1D3A]">30% of every
            CompTIA exam</strong> — and they can't be guessed. Train on live Cisco IOS and Linux
            topology, then prove your readiness with full, timed mock exams.
          </p>

          <div className="flex gap-4 mb-[34px] flex-wrap">
            {/* External — free labs on FortifyLearn */}
            <a
              href="https://fortifylearn.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl px-[30px] py-[15px] text-white font-semibold text-base transition-all hover:brightness-110"
              style={{ background: GRAD_ACCENT, boxShadow: '0 8px 24px -6px rgba(8,145,178,.5)' }}
            >
              Start Free Taster Labs <ArrowRight size={18} strokeWidth={2.5} />
            </a>
            {/* Internal */}
            <Link
              to="/fortifylearn"
              className="inline-flex items-center rounded-xl px-7 py-[15px] font-semibold text-base transition-colors"
              style={{ border: '1.5px solid #0891B2', color: '#0891B2' }}
            >
              Explore Exam Prep
            </Link>
          </div>

          <div className="flex items-center gap-5 pt-6 flex-wrap" style={{ borderTop: '1px solid #e2e8f0' }}>
            <div>
              <div className="text-[11px] font-bold tracking-[0.12em] uppercase mb-1.5 text-slate-400">
                Certification tracks
              </div>
              <div className="text-[15px] font-semibold text-slate-700">
                Every CompTIA cert in our catalogue
              </div>
            </div>
            <img src="/logos/comptia-partner-badge.webp" alt="Authorised CompTIA Partner"
              className="h-[46px] w-auto object-contain ml-auto" />
          </div>
        </div>

        {/* Real product screenshot in a browser frame */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-[22px]"
            style={{ background: 'linear-gradient(135deg,rgba(34,211,238,.26),rgba(8,145,178,.16))', filter: 'blur(38px)', opacity: 0.55 }} />
          <div className="relative rounded-[14px] overflow-hidden bg-white"
            style={{ border: '1px solid #e2e8f0', boxShadow: '0 30px 60px -18px rgba(11,29,58,.32)' }}>
            <div className="flex items-center gap-2 px-3.5 py-[11px]" style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
              <span className="w-[11px] h-[11px] rounded-full" style={{ background: '#ef4444' }} />
              <span className="w-[11px] h-[11px] rounded-full" style={{ background: '#eab308' }} />
              <span className="w-[11px] h-[11px] rounded-full" style={{ background: '#10b981' }} />
              <div className="ml-2.5 flex-1 max-w-[300px] rounded-md px-3 py-[5px] text-[11px] font-mono"
                style={{ background: '#fff', border: '1px solid #e2e8f0', color: '#64748b' }}>
                fortifylearn.co.uk — Readiness Report
              </div>
            </div>
            <img src="/screenshots/fl-readiness.png"
              alt="FortifyLearn readiness report — a 746/900 projected pass score, the three weakest domains to focus on, and a 14-day score trajectory"
              className="block w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

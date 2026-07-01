import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ClipboardCheck, ArrowRight } from 'lucide-react';

/**
 * ConsultancyBand — the "second door" on the homepage. Routes the
 * organisation/board buyer away from the FortifyLearn (learner) funnel.
 *
 * RULE 5: internal CTAs use <Link to>.
 * RULE 9: BRAND-GRADIENT — canon navy→teal on the section + button.
 *         Cyan (#22D3EE / #7DD3E8) used only as glow/accent text.
 * RULE 3: FortifyOne represented by its real logo asset, not a generated mark.
 * RULE 7: trust-line figures confirmed true by owner.
 */
const CARDS = [
  {
    to: '/vciso',
    icon: ShieldCheck,
    title: 'Virtual CISO',
    body: 'Board-level security leadership on demand — strategy, governance and risk ownership, without a full-time hire.',
  },
  {
    to: '/dora-compliance',
    icon: ClipboardCheck,
    title: 'DORA & NIS2 Compliance',
    body: "Get audit-ready for the EU's financial-sector (DORA) and network-security (NIS2) directives, in sprints that fit your timeline.",
    secondaryTo: '/nis2-compliance',
  },
  {
    to: '/fortifyone',
    logo: '/logos/fortifyone-logo-dark.svg',
    title: 'FortifyOne GRC Platform',
    body: 'All your cyber risk and compliance. One platform. Total control. Assessments, vendor risk and continuous monitoring in one place.',
  },
];

export default function ConsultancyBand() {
  return (
    <section
      className="relative overflow-hidden px-8 py-20"
      style={{ background: 'linear-gradient(150deg,#0B1D3A 0%,#0a1322 52%,#0c3346 100%)' }}
    >
      {/* cyber-grid + glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)',
          backgroundSize: '42px 42px',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 90% at 30% 20%, #000 30%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 80% 90% at 30% 20%, #000 30%, transparent 100%)',
        }}
      />
      <div
        className="absolute -top-32 -right-16 w-[440px] h-[440px] rounded-full pointer-events-none"
        style={{ background: 'rgba(8,145,178,.28)', filter: 'blur(90px)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-[0.14em] uppercase mb-4" style={{ color: '#7DD3E8' }}>
            Beyond the labs
          </div>
          <h2 className="text-4xl font-extrabold leading-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            FortifyLearn certifies your people.<br />
            <span
              style={{
                background: 'linear-gradient(135deg,#22D3EE,#8ED1FF)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Cy-Sec secures your organisation.
            </span>
          </h2>
          <p className="text-[17px] leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,.68)' }}>
            We're a UK cybersecurity training and consultancy firm. Beyond exam prep, we
            provide board-level security leadership and get organisations audit-ready for the
            regulations that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {CARDS.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="block rounded-2xl p-7 transition-colors"
              style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)' }}
            >
              {c.logo ? (
                <img src={c.logo} alt={c.title} className="h-[30px] w-auto mb-[18px]" />
              ) : (
                <div
                  className="w-[50px] h-[50px] rounded-[13px] flex items-center justify-center mb-5"
                  style={{ background: 'rgba(34,211,238,.1)', border: '1px solid rgba(34,211,238,.22)' }}
                >
                  <c.icon size={24} style={{ color: '#22D3EE' }} strokeWidth={2} />
                </div>
              )}
              <h3 className="text-[19px] font-bold text-white mb-[9px]">{c.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.62)' }}>
                {c.body}
              </p>
            </Link>
          ))}
        </div>

        <div
          className="flex items-center justify-between gap-6 flex-wrap pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,.1)' }}
        >
          <span className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,.6)' }}>
            1,000+ trained · 10+ countries · 6 compliance frameworks · Authorised CompTIA &amp; CertNexus Partner
          </span>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-bold transition-all hover:brightness-95"
            style={{ background: '#fff', color: '#0B1D3A' }}
          >
            Book a Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

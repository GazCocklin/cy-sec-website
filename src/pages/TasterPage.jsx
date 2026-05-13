import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, ShieldCheck, Play } from 'lucide-react';
import TASTER_CONFIGS from '@/config/tasterConfigs';

// Brand palette (matches canon.brand.colours)
const NAVY = '#0B1D3A';
const TEAL = '#0891B2';
const MID_BLUE = '#0E5F8A';
const SURFACE = '#F4F7FA';
const DEEP_NAVY = '#071530';

// Minimal header — brand mark only, no nav.
function TasterHeader() {
  return (
    <header
      className="w-full px-6 py-5 flex items-center"
      style={{ background: NAVY }}
    >
      <Link to="/" className="flex items-center gap-2" aria-label="Cy-Sec home">
        <img
          src="/logos/cysec-logo-dark.svg"
          alt="Cy-Sec"
          style={{ height: 28, display: 'block' }}
        />
      </Link>
    </header>
  );
}

// Minimal footer — no full nav.
function TasterFooter() {
  return (
    <footer
      className="w-full px-6 py-8 text-center text-sm"
      style={{ background: DEEP_NAVY, color: 'rgba(255,255,255,0.75)' }}
    >
      <p>Cy-Sec Awareness and Consultancy Ltd · Company 13176798 · ICO ZC127066</p>
      <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
        <span style={{ opacity: 0.4 }}>·</span>
        <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
        <span style={{ opacity: 0.4 }}>·</span>
        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>
    </footer>
  );
}

// Email capture form (Phase 1: stub — shows thank-you state on submit, no network call yet).
function EmailCaptureForm({ ctaLabel, formId }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    // TODO Phase 2: POST to /functions/v1/taster-signup with email + cert.
    // For now show a thank-you state so the page is verifiable end-to-end.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="w-full p-6 rounded-xl border"
        style={{
          background: 'rgba(8,145,178,0.06)',
          borderColor: 'rgba(8,145,178,0.25)',
        }}
      >
        <p className="text-base font-semibold" style={{ color: NAVY }}>
          Thanks — we're finalising the lab experience.
        </p>
        <p className="text-sm mt-2" style={{ color: '#475569' }}>
          We'll be in touch shortly at <strong>{email}</strong> with your access link.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor={formId} className="sr-only">Email address</label>
        <input
          id={formId}
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 px-4 py-3 rounded-lg border bg-white text-base focus:outline-none transition-colors"
          style={{
            borderColor: 'rgba(11,29,58,0.18)',
            color: NAVY,
          }}
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-lg text-white font-semibold text-base flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
          style={{ background: TEAL }}
        >
          {ctaLabel} <ArrowRight size={18} />
        </button>
      </div>
      <p className="text-xs mt-3" style={{ color: '#64748b' }}>
        Instant access. Unsubscribe in one click.{' '}
        <Link to="/privacy-policy" className="underline hover:no-underline">Privacy policy</Link>.
      </p>
    </form>
  );
}

// ---------- main page ----------

export default function TasterPage() {
  const { certSlug } = useParams();
  const cfg = TASTER_CONFIGS[certSlug];

  // Unknown cert slug → bounce home rather than 404 hard.
  if (!cfg) {
    return <Navigate to="/" replace />;
  }

  const { badge, hero, ctaLabel, whatYouDo, differentiation, faq, meta } = cfg;

  // FAQPage structured data
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div style={{ background: '#fff' }}>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <TasterHeader />

      {/* HERO */}
      <section className="px-6 py-12 sm:py-16" style={{ background: SURFACE }}>
        <div className="max-w-3xl mx-auto">
          {/* Cert badge pill */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: 'rgba(14,95,138,0.08)',
              color: MID_BLUE,
              border: '1px solid rgba(14,95,138,0.18)',
            }}
          >
            <img src={`/logos/${badge.file}`} alt="" style={{ height: 16 }} />
            <span>{badge.label}</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4"
            style={{ color: NAVY, letterSpacing: '-1px' }}
          >
            {hero.h1}
          </h1>
          <p className="text-base sm:text-lg mb-8" style={{ color: '#475569' }}>
            {hero.sub}
          </p>

          {/* Hero asset — loop video when available, static fallback for launch */}
          <div
            className="w-full mb-6 overflow-hidden"
            style={{
              borderRadius: 12,
              border: '0.5px solid rgba(11,29,58,0.15)',
            }}
          >
            {hero.loopVideo ? (
              <video
                src={hero.loopVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            ) : (
              <img
                src={hero.fallbackImage}
                alt={hero.fallbackAlt}
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            )}
          </div>

          <EmailCaptureForm ctaLabel={ctaLabel + ' →'} formId="taster-email-hero" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="px-6 py-6 border-t border-b" style={{ borderColor: 'rgba(11,29,58,0.08)' }}>
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <ShieldCheck size={20} style={{ color: TEAL, flexShrink: 0 }} />
          <p className="text-sm sm:text-base" style={{ color: NAVY }}>
            Built by working cyber security practitioners. Every lab is written from real defensive work.
          </p>
        </div>
      </section>

      {/* WHAT YOU'LL DO */}
      <section className="px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-8" style={{ color: NAVY, letterSpacing: '-0.5px' }}>
            What you'll do in the next 10 minutes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {whatYouDo.map((text, i) => (
              <div
                key={i}
                className="p-5 rounded-xl"
                style={{
                  background: SURFACE,
                  border: '1px solid rgba(8,145,178,0.12)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white mb-3"
                  style={{ background: `linear-gradient(135deg, ${NAVY}, ${TEAL})` }}
                >
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: NAVY }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="px-6 py-14" style={{ background: SURFACE }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-4 max-w-2xl" style={{ color: NAVY, letterSpacing: '-0.5px' }}>
            {differentiation.h2}
          </h2>
          <p className="text-base sm:text-lg mb-10 max-w-2xl" style={{ color: '#475569' }}>
            {differentiation.body}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {differentiation.images.map((img, i) => (
              <figure
                key={i}
                className="overflow-hidden rounded-xl bg-white"
                style={{ border: '1px solid rgba(11,29,58,0.08)' }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                />
                <figcaption
                  className="px-4 py-3 text-xs font-semibold"
                  style={{ color: MID_BLUE, background: 'rgba(14,95,138,0.04)' }}
                >
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WALKTHROUGH VIDEO — placeholder */}
      <section className="px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{ color: NAVY, letterSpacing: '-0.5px' }}>
            Watch a complete PBQ from briefing to verdict
          </h2>
          <div
            className="w-full aspect-video rounded-xl flex flex-col items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${NAVY}, ${TEAL})`,
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            <Play size={48} style={{ marginBottom: 12, opacity: 0.85 }} />
            <p className="text-sm font-semibold">Walkthrough video coming soon</p>
            <p className="text-xs mt-1" style={{ opacity: 0.7 }}>30–60 second silent screen capture</p>
          </div>
        </div>
      </section>

      {/* WHO BUILT THIS */}
      <section className="px-6 py-14" style={{ background: SURFACE }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{ color: NAVY, letterSpacing: '-0.5px' }}>
            Who built this
          </h2>
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: NAVY }}
              aria-hidden="true"
            >
              <ShieldCheck size={22} style={{ color: TEAL }} />
            </div>
            <div>
              <p className="text-base leading-relaxed mb-3" style={{ color: NAVY }}>
                FortifyLearn is built by working cyber security practitioners. The labs exist because existing CompTIA prep tests recall — not the practical judgement you'll need on the job.
              </p>
              <p className="text-sm" style={{ color: '#64748b' }}>
                Cy-Sec Awareness and Consultancy Ltd · ICO ZC127066
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-8" style={{ color: NAVY, letterSpacing: '-0.5px' }}>
            FAQ
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details
                key={i}
                className="rounded-xl"
                style={{
                  background: SURFACE,
                  border: '1px solid rgba(11,29,58,0.08)',
                }}
              >
                <summary
                  className="p-5 text-base font-semibold cursor-pointer list-none flex items-center justify-between"
                  style={{ color: NAVY }}
                >
                  <span>{item.q}</span>
                  <span style={{ color: TEAL, marginLeft: 12, fontSize: 20, lineHeight: 1 }}>+</span>
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#475569' }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-14" style={{ background: SURFACE }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: NAVY, letterSpacing: '-0.5px' }}>
            Still here? Start the lab.
          </h2>
          <p className="text-base mb-8" style={{ color: '#475569' }}>
            Ten minutes. One email. No card.
          </p>
          <EmailCaptureForm ctaLabel={ctaLabel + ' →'} formId="taster-email-bottom" />
        </div>
      </section>

      <TasterFooter />
    </div>
  );
}

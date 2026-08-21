// ── /store ───────────────────────────────────────────────────────────────────
// Rebuilt 21-Aug-2026. /store is no longer a browse destination — the five cert
// landing pages sell the product and now complete the purchase in place via the
// global basket drawer. /store keeps two genuine jobs: reviewing a multi-item
// basket before paying, and housing the cross-certification A+ Complete bundle
// (£64.99, both Cores), which belongs to no single cert page.
//
// The old page competed for attention across ~8 elements (layered hero, utility
// strip, badge rail, filter chips, gradient thumbnails, ribbons, SAVE pills,
// recently-viewed). All removed in favour of one visual hierarchy: one featured
// bundle, then a quiet price list. Savings read as plain grey text, never as a
// coloured badge — this brand also sells £995/month vCISO retainers and the
// discount-pill idiom undercut it.
//
// Cert + SKU data now lives in src/lib/catalogue.js, NOT here (see the note at
// the top of that file re: project RULE 1).
//
// There is deliberately no sticky basket bar: adding from a row opens the same
// global drawer used everywhere else, so there is one basket UI site-wide.

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useBasket } from '@/hooks/useBasket';
import BuyButton from '@/components/BuyButton';
import {
  STORE_CERT_TABS, featuredFor, individualFor,
  formatPrice, CERTS,
} from '@/lib/catalogue';

const TOOL_SHOTS = [
  { img: '/screenshots/fl-netsim.png',   caption: 'FL-NETSIM — Cisco IOS-style CLI' },
  { img: '/screenshots/fl-netcap.png',   caption: 'NETCAP Analyzer — packet capture' },
  { img: '/screenshots/fl-netpulse.png', caption: 'NETPULSE NMS — multi-site monitoring' },
];

export default function StorePage() {
  const [activeCert, setActiveCert] = useState('netplus');
  const { openDrawer, count } = useBasket();

  const cert = CERTS.find(c => c.key === activeCert);
  const featured = featuredFor(activeCert);
  const individual = individualFor(activeCert);

  return (
    <>
      <Helmet>
        <title>FortifyLearn store — CompTIA lab packs and exam engines | Cy-Sec</title>
        <meta
          name="description"
          content="Buy FortifyLearn CompTIA lab packs, exam engines and prep bundles. Hands-on performance-based question practice for Network+, Security+, CySA+ and A+. One-off payment, lifetime access."
        />
        <link rel="canonical" href="https://cy-sec.co.uk/store" />
      </Helmet>

      <div className="bg-white">
        <div className="mx-auto px-6" style={{ maxWidth: 960 }}>

          {/* ── Header ───────────────────────────────────────────────────── */}
          <header style={{ paddingTop: 56, paddingBottom: 40, borderBottom: '1px solid #e2e8f0' }}>
            <nav style={{ fontSize: 13, color: '#94a3b8' }} aria-label="Breadcrumb">
              <Link to="/" style={{ color: '#0E6E8C' }} className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/fortifylearn" style={{ color: '#0E6E8C' }} className="hover:underline">FortifyLearn</Link>
              <span className="mx-2">/</span>
              <span>Store</span>
            </nav>

            <p
              className="uppercase"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#64748b', marginTop: 22 }}
            >
              FortifyLearn store
            </p>
            <h1
              style={{
                fontSize: 40, fontWeight: 800, letterSpacing: '-1px', color: '#0B1D3A',
                maxWidth: '18ch', marginTop: 8, textWrap: 'pretty', lineHeight: 1.1,
              }}
            >
              Review your basket and check out.
            </h1>
            <p
              style={{ fontSize: 16, lineHeight: 1.6, color: '#475569', maxWidth: '56ch', marginTop: 14, textWrap: 'pretty' }}
            >
              Every pack is a one-off payment with lifetime access. If you arrived from a
              certification page, your basket is already waiting in the drawer.
            </p>

            {count > 0 && (
              <button
                type="button"
                onClick={openDrawer}
                className="mt-6 text-white transition-all hover:brightness-110"
                style={{
                  fontSize: 14, fontWeight: 700, borderRadius: 10, padding: '11px 22px',
                  background: 'linear-gradient(135deg,#0B1D3A,#0891B2)',
                }}
              >
                View basket ({count}) →
              </button>
            )}
          </header>

          {/* ── Certification switcher ───────────────────────────────────── */}
          <div style={{ paddingTop: 36 }}>
            <div className="flex flex-wrap gap-1.5">
              {STORE_CERT_TABS.map(t => {
                const active = t.key === activeCert;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveCert(t.key)}
                    aria-pressed={active}
                    style={{
                      fontSize: 14, fontWeight: 600, padding: '9px 14px', borderRadius: 9,
                      background: active ? '#f1f5f9' : 'transparent',
                      color: active ? '#0B1D3A' : '#64748b',
                    }}
                    className="transition-colors"
                  >
                    {t.short}
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>
              {cert?.title} · {cert?.code}
            </p>
          </div>

          {/* ── Featured bundle ──────────────────────────────────────────── */}
          {featured && (
            <section style={{ paddingTop: 28 }}>
              <div
                className="relative"
                style={{
                  maxWidth: 660, borderRadius: 20, padding: '44px 48px',
                  background: 'linear-gradient(135deg,#0B1D3A 0%,#0e3a52 55%,#0891B2 160%)',
                }}
              >
                {/* Real CompTIA badge (RULE 3 — never improvise brand assets).
                    The official mark is a white disc with #c8102e red, which
                    carries its own contrast against the navy card. */}
                <img
                  src={cert?.badge}
                  alt=""
                  aria-hidden="true"
                  className="absolute hidden sm:block"
                  style={{ right: 40, top: 40, width: 96, height: 96 }}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />

                <p
                  className="uppercase"
                  style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#00D9FF' }}
                >
                  {featured.comingSoon ? 'Launching soon' : 'Recommended'}
                </p>
                <h2
                  className="text-white"
                  style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.6px', marginTop: 10, textWrap: 'pretty' }}
                >
                  {featured.cardTitle || `${cert?.short} ${featured.label}`}
                </h2>
                <p
                  style={{
                    fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.72)',
                    maxWidth: '44ch', marginTop: 12, textWrap: 'pretty',
                  }}
                >
                  {featured.sub}
                </p>

                <div className="flex items-baseline gap-3 flex-wrap" style={{ marginTop: 22 }}>
                  <span className="text-white" style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-1px' }}>
                    {formatPrice(featured.price)}
                  </span>
                  {featured.rrp && (
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
                      normally {formatPrice(featured.rrp)}
                    </span>
                  )}
                </div>

                {featured.comingSoon && (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 12, maxWidth: '48ch' }}>
                    Content for this bundle is still being authored. You can buy now at the
                    early-bird price and everything unlocks as it ships.
                  </p>
                )}

                <BuyButton
                  productKey={featured.key}
                  className="mt-6"
                  style={{
                    fontSize: 15, fontWeight: 700, padding: '14px 28px', borderRadius: 12,
                    background: 'linear-gradient(135deg,#0E5F8A 0%,#0891B2 100%)',
                    boxShadow: '0 0 20px rgba(0,217,255,0.25)',
                  }}
                />
              </div>
            </section>
          )}

          {/* ── Product demonstration ────────────────────────────────────── */}
          <section style={{ paddingTop: 64 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', color: '#0B1D3A', textWrap: 'pretty' }}>
              This is a lab, not a video course.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: '#475569', maxWidth: '58ch', marginTop: 12, textWrap: 'pretty' }}>
              Every pack drops you into a working environment with a fault to find. You read the
              briefing, investigate with real tooling, and make the change that fixes it — the
              same shape of task CompTIA sets in a performance-based question.
            </p>

            <div
              style={{
                borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden', marginTop: 28,
                boxShadow: '0 24px 48px -20px rgba(11,29,58,.35)',
              }}
            >
              <div className="flex items-center gap-2" style={{ background: '#f1f5f9', padding: '10px 14px' }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: '#ef4444' }} />
                <span style={{ width: 10, height: 10, borderRadius: 999, background: '#eab308' }} />
                <span style={{ width: 10, height: 10, borderRadius: 999, background: '#10b981' }} />
                <span className="font-mono ml-2" style={{ fontSize: 11, color: '#64748b' }}>
                  fortifylearn.co.uk — lab briefing
                </span>
              </div>
              <img
                src="/screenshots/fl-lab-briefing.png"
                alt="A FortifyLearn lab briefing describing the fault to diagnose, the environment and the success criteria"
                className="w-full block"
              />
            </div>

            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginTop: 20 }}
            >
              {TOOL_SHOTS.map(t => (
                <figure key={t.img} style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <img src={t.img} alt={t.caption} className="w-full block" />
                  <figcaption style={{ fontSize: 12, color: '#64748b', padding: '10px 12px', background: '#f8fafc' }}>
                    {t.caption}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 16, textWrap: 'pretty' }}>
              Tooling varies by certification — SOC consoles for CySA+, Windows admin surfaces for A+.
            </p>
          </section>

          {/* ── Individual products ──────────────────────────────────────── */}
          <section style={{ paddingTop: 64 }}>
            <h2
              className="uppercase"
              style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: '#94a3b8' }}
            >
              Or buy individually
            </h2>

            <div style={{ marginTop: 8 }}>
              {individual.map(({ config, note }) => (
                <div
                  key={config.key}
                  className="flex items-center justify-between gap-6 flex-wrap"
                  style={{ padding: '26px 0', borderBottom: '1px solid #e2e8f0' }}
                >
                  <div style={{ minWidth: 220, flex: '1 1 380px' }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: '#0B1D3A' }}>
                      {config.cardTitle || config.label}
                      {config.meta && (
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginLeft: 10 }}>
                          {config.meta}
                        </span>
                      )}
                    </p>
                    <p style={{ fontSize: 14, lineHeight: 1.5, color: '#475569', marginTop: 4, textWrap: 'pretty' }}>
                      {config.sub}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="text-right">
                      <p style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px', color: '#0B1D3A' }}>
                        {formatPrice(config.price)}
                      </p>
                      <p style={{ fontSize: 12, color: '#64748b' }}>{note}</p>
                    </div>
                    <BuyButton productKey={config.key} variant="list" />
                  </div>
                </div>
              ))}
            </div>

            {cert?.landingPage && (
              <Link
                to={cert.landingPage}
                className="inline-block hover:underline"
                style={{ fontSize: 14, fontWeight: 600, color: '#0E6E8C', marginTop: 24 }}
              >
                See every {cert.short} lab in detail →
              </Link>
            )}
          </section>

          {/* ── Proof band ───────────────────────────────────────────────── */}
          {/* RULE 7 (honest metadata): the design called for "1000+ Students     */}
          {/* Trained / 10+ Countries / 2,000 Questions Per Cert". The first two  */}
          {/* are unsubstantiated (flagged in the 05-Aug-2026 site audit) and the */}
          {/* third is only true for Network+, Security+ and A+ Core 1 — CySA+    */}
          {/* and A+ Core 2 have smaller pools. Replaced with commercial terms    */}
          {/* that are true of every SKU and match the Terms of Service.          */}
          <section
            className="grid gap-8"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              padding: '32px 0', margin: '64px 0 0',
              borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0',
            }}
          >
            {[
              ['Lifetime', 'Access from purchase'],
              ['One-off', 'No subscription, no renewal'],
              ['14 days', 'Refund before you start a lab'],
            ].map(([figure, label]) => (
              <div key={label}>
                <p style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1px', color: '#0B1D3A' }}>
                  {figure}
                </p>
                <p
                  className="uppercase"
                  style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#94a3b8', marginTop: 6 }}
                >
                  {label}
                </p>
              </div>
            ))}
          </section>

          {/* ── Refund close ─────────────────────────────────────────────── */}
          <section style={{ padding: '48px 0 72px' }}>
            <div
              style={{
                background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: 16, padding: '32px 36px',
              }}
            >
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.4px', color: '#0B1D3A', textWrap: 'pretty' }}>
                Try it for 14 days. If it doesn&rsquo;t help, we refund you.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#475569', maxWidth: '60ch', marginTop: 12, textWrap: 'pretty' }}>
                Under the Consumer Rights Act you have 14 days to change your mind. Because packs
                unlock immediately, that right applies before you start your first lab — so have a
                look around, and if it is not what you expected, tell us and we will refund you in full.
              </p>
              <p style={{ fontSize: 14, color: '#64748b', marginTop: 14 }}>
                Questions first? Email{' '}
                <a href="mailto:info@cy-sec.co.uk" style={{ color: '#0E6E8C' }} className="hover:underline">
                  info@cy-sec.co.uk
                </a>{' '}
                — or read the{' '}
                <Link to="/terms-of-service" style={{ color: '#0E6E8C' }} className="hover:underline">
                  full terms
                </Link>.
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

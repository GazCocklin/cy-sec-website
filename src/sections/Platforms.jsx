import React from 'react'
import { T, grad } from '../theme'

const FF = T.FF

const platforms = [
  {
    name: 'FortifyLearn',
    tagline: 'CompTIA PBQ Simulator',
    href: 'https://fortifylearn.co.uk',
    accent: T.primary,
    accentDk: T.primaryDk,
    desc: 'Performance-based question simulations for CompTIA Network+ and Security+. The part of the exam most candidates fail — practised in a live topology environment with real CLI commands and Cisco IOS.',
    features: [
      'Live Cisco IOS & Linux topology',
      'Real command-line simulation',
      'Study and Exam modes',
      'Objective-by-objective scoring',
      'Detailed improvement plans',
    ],
    price: 'Free to start',
    cta: 'Try FortifyLearn →',
    tag: 'NEW',
  },
  {
    name: 'FortifyOne',
    tagline: 'GRC Compliance Platform',
    href: 'https://fortifyone.co.uk',
    accent: T.accent,
    accentDk: '#0E7490',
    desc: 'ISO 27001:2022, NIST CSF 2.0, GDPR, SOC 2, DORA, and NIS2 compliance automation. Gap analysis, evidence collection, vendor risk management, DPIA and FRIA tools — in one platform.',
    features: [
      '6 compliance frameworks',
      'Automated evidence collection',
      'Vendor risk management',
      'DPIA & FRIA tools',
      'Audit-ready export packages',
    ],
    price: 'From £149/month',
    cta: 'Explore FortifyOne →',
    tag: null,
  },
]

export default function Platforms() {
  return (
    <section id="platforms" style={{
      padding: '96px 24px',
      background: T.bgMid,
      borderTop: `1px solid ${T.border}`,
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontFamily: FF, fontSize: 11, fontWeight: 800,
            color: T.accent, letterSpacing: '0.15em', textTransform: 'uppercase',
            marginBottom: 12,
          }}>Our Platforms</div>
          <h2 style={{
            fontFamily: FF, fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 900, letterSpacing: '-0.03em', color: T.text,
            lineHeight: 1.1, marginBottom: 14,
          }}>
            Built by Practitioners.{' '}
            <span style={{ background: grad.accent, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Used by Professionals.
            </span>
          </h2>
          <p style={{ fontSize: 17, color: T.textMid, maxWidth: 520, lineHeight: 1.65 }}>
            Two platforms that extend Cy-Sec's reach — available independently or 
            as part of a managed vCISO engagement.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
        }} className="platforms-grid">
          {platforms.map(p => <PlatformCard key={p.name} {...p} />)}
        </div>
      </div>

      <style>{`
        .platforms-grid { }
        @media (max-width: 720px) {
          .platforms-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function PlatformCard({ name, tagline, href, accent, accentDk, desc, features, price, cta, tag }) {
  const [hov, setHov] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 18, padding: 36,
        background: hov ? `${accent}08` : T.bgCard,
        border: `1px solid ${hov ? `${accent}40` : T.border}`,
        display: 'flex', flexDirection: 'column', gap: 20,
        transition: 'all 0.25s', position: 'relative', overflow: 'hidden',
        transform: hov ? 'translateY(-3px)' : 'none',
      }}
    >
      {/* Accent gradient top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${accentDk}, ${accent})`,
        borderRadius: '18px 18px 0 0',
      }} />

      {/* Tag */}
      {tag && (
        <div style={{
          position: 'absolute', top: 20, right: 20,
          fontFamily: FF, fontSize: 10, fontWeight: 800,
          padding: '3px 10px', borderRadius: 99,
          background: `${accent}20`, color: accent,
          border: `1px solid ${accent}40`,
          letterSpacing: '0.1em',
        }}>{tag}</div>
      )}

      <div>
        <div style={{
          fontFamily: FF, fontSize: 28, fontWeight: 900,
          letterSpacing: '-0.02em', color: accent, lineHeight: 1,
          marginBottom: 4,
        }}>{name}</div>
        <div style={{
          fontFamily: FF, fontSize: 14, fontWeight: 600,
          color: T.textDim, letterSpacing: '0.04em',
        }}>{tagline}</div>
      </div>

      <p style={{ fontSize: 15, color: T.textMid, lineHeight: 1.7 }}>{desc}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: T.textMid }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
              background: `${accent}15`, border: `1px solid ${accent}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, color: accent, fontWeight: 800,
            }}>✓</div>
            {f}
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        paddingTop: 16, borderTop: `1px solid rgba(255,255,255,0.07)`, marginTop: 'auto',
      }}>
        <span style={{ fontFamily: FF, fontSize: 15, fontWeight: 800, color: T.text }}>{price}</span>
        <a
          href={href} target="_blank" rel="noreferrer"
          style={{
            fontFamily: FF, fontSize: 14, fontWeight: 700, color: '#fff',
            background: `linear-gradient(135deg, ${accentDk}, ${accent})`,
            border: 'none', borderRadius: 9, padding: '10px 18px',
            transition: 'all 0.2s', display: 'inline-block',
            boxShadow: `0 4px 14px ${accent}30`,
          }}
        >{cta}</a>
      </div>
    </div>
  )
}

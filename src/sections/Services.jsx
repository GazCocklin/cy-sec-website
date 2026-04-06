import React from 'react'
import { T, grad } from '../theme'

const FF = T.FF

const services = [
  {
    icon: '🛡',
    tag: 'Most Popular', tagColor: T.primary,
    title: 'Virtual CISO',
    desc: 'Dedicated cybersecurity leadership without the full-time cost. Strategic risk management, board reporting, policy governance, and regulatory oversight — with FortifyOne platform included.',
    price: 'From £995/month',
    cta: 'Enquire',
    href: '#contact',
  },
  {
    icon: '🏦',
    tag: 'Urgent', tagColor: T.error,
    title: 'DORA Compliance',
    desc: 'DORA has been mandatory for EU financial entities since January 2025. Structured sprint covering ICT risk, incident reporting, TLPT, and third-party oversight — delivered to a fixed price.',
    price: 'Fixed price from £4,000',
    cta: 'Check your exposure',
    href: '#contact',
  },
  {
    icon: '🌐',
    tag: 'Active enforcement', tagColor: T.warning,
    title: 'NIS2 Compliance',
    desc: 'NIS2 enforcement is live. Obligation mapping, gap analysis, security measure implementation, incident response planning, and supply chain oversight for essential and important entities.',
    price: 'From £2,500',
    cta: 'Get started',
    href: '#contact',
  },
  {
    icon: '📋',
    tag: 'SaaS Platform', tagColor: T.accent,
    title: 'FortifyOne GRC',
    desc: 'ISO 27001:2022, NIST CSF 2.0, GDPR, SOC 2, DORA, NIS2 — automated in one platform. Evidence collection, gap analysis, vendor risk management, and audit-ready reports.',
    price: 'From £149/month',
    cta: 'View platform →',
    href: 'https://fortifyone.co.uk',
    external: true,
  },
  {
    icon: '🎯',
    tag: 'Bespoke', tagColor: T.success,
    title: 'Security Awareness Training',
    desc: 'Role-specific, sector-aligned security awareness training for your entire workforce. Built around your actual threat landscape — not generic off-the-shelf slide decks.',
    price: 'Custom pricing',
    cta: 'Request a quote',
    href: '#contact',
  },
  {
    icon: '🏆',
    tag: 'Authorised', tagColor: '#8B5CF6',
    title: 'Certification Training',
    desc: 'CompTIA and CertNexus authorised delivery. Security+, CySA+, CASP+, Network+, AAISM, CRISC, BCS CISMP and more — delivered by active practitioners across UK, DACH, and Benelux.',
    price: 'Varies by certification',
    cta: 'View courses',
    href: '#training',
  },
]

export default function Services() {
  return (
    <section id="services" style={{
      padding: '96px 24px',
      background: T.bgMid,
      borderTop: `1px solid ${T.border}`,
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontFamily: FF, fontSize: 11, fontWeight: 800,
            color: T.accent, letterSpacing: '0.15em', textTransform: 'uppercase',
            marginBottom: 12,
          }}>What we do</div>
          <h2 style={{
            fontFamily: FF, fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 900, letterSpacing: '-0.03em', color: T.text,
            lineHeight: 1.1, marginBottom: 14, maxWidth: 600,
          }}>
            Everything Your Organisation Needs.{' '}
            <span style={{
              background: grad.accent,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>One Partner.</span>
          </h2>
          <p style={{ fontSize: 17, color: T.textMid, maxWidth: 500, lineHeight: 1.65 }}>
            Comprehensive services tailored to protect your organisation, train your staff,
            and achieve regulatory compliance — without the vendor juggling.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon, tag, tagColor, title, desc, price, cta, href, external }) {
  const [hov, setHov] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `rgba(26,86,219,0.05)` : T.bgCard,
        border: `1px solid ${hov ? 'rgba(26,86,219,0.3)' : T.border}`,
        borderRadius: 16, padding: 28,
        display: 'flex', flexDirection: 'column', gap: 16,
        transition: 'all 0.2s', cursor: 'default',
        transform: hov ? 'translateY(-3px)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: grad.bar, opacity: hov ? 1 : 0, transition: 'opacity 0.2s',
        borderRadius: '16px 16px 0 0',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: 28, lineHeight: 1 }}>{icon}</span>
        <span style={{
          fontSize: 10, fontWeight: 800, padding: '3px 10px',
          borderRadius: 99, letterSpacing: '0.08em',
          background: `${tagColor}18`, color: tagColor,
          border: `1px solid ${tagColor}30`, whiteSpace: 'nowrap',
          fontFamily: FF,
        }}>{tag}</span>
      </div>

      <div>
        <h3 style={{
          fontFamily: FF, fontSize: 19, fontWeight: 800,
          color: T.text, letterSpacing: '-0.01em', marginBottom: 8,
        }}>{title}</h3>
        <p style={{ fontSize: 14, color: T.textDim, lineHeight: 1.7 }}>{desc}</p>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, paddingTop: 16,
        borderTop: `1px solid rgba(255,255,255,0.06)`,
        marginTop: 'auto',
      }}>
        <span style={{
          fontFamily: FF, fontSize: 13, fontWeight: 700, color: T.primary,
        }}>{price}</span>
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          style={{
            fontFamily: FF, fontSize: 13, fontWeight: 700,
            color: hov ? T.text : T.textMid,
            background: 'transparent',
            border: `1px solid ${hov ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 7, padding: '7px 14px',
            transition: 'all 0.15s', whiteSpace: 'nowrap',
          }}
        >{cta}</a>
      </div>
    </div>
  )
}

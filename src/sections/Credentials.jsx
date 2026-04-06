import React from 'react'
import { T, grad } from '../theme'

const FF = T.FF

const certs = [
  { code: 'CISSP-ISSAP', full: 'Information Systems Security Architecture Professional', color: '#EF4444' },
  { code: 'CISM',    full: 'Certified Information Security Manager',    color: '#1A56DB' },
  { code: 'CRISC',   full: 'Certified in Risk & Information Systems Control', color: '#8B5CF6' },
  { code: 'CGEIT',   full: 'Certified in Governance of Enterprise IT',  color: '#F59E0B' },
  { code: 'CCSP',    full: 'Certified Cloud Security Professional',     color: '#0EA5E9' },
  { code: 'AAISM',   full: 'Associate in AI Security Management',       color: '#10B981' },
  { code: 'CITP MBCS', full: 'Chartered IT Professional, BCS',         color: '#06B6D4' },
]

const partners = [
  'CompTIA Authorised Partner',
  'CertNexus Partner',
  'Firebrand Training Associate',
  'ISO 27001 Lead Implementer',
  'DORA Specialist',
  'NIS2 Advisory',
]

const areas = [
  { icon: '🛡', title: 'Security Architecture', desc: 'Enterprise security design, zero trust frameworks, threat modelling, and defence-in-depth strategy across commercial and defence environments.' },
  { icon: '⚖️', title: 'GRC & Risk Management', desc: 'ISO 27001, NIST CSF, DORA, NIS2, GDPR. Risk framework implementation, board reporting, and regulatory compliance across fintech and critical infrastructure.' },
  { icon: '✈️', title: 'Defence & Government', desc: 'RAF background with experience delivering classified security architecture and capability development at MOD SECRET classification level.' },
  { icon: '🎓', title: 'Certification Training', desc: 'Authorised CompTIA and CertNexus instructor. Delivering CRISC, AAISM, BCS CISMP, and CompTIA certifications across UK, DACH, and Benelux.' },
]

export default function Credentials() {
  return (
    <section id="credentials" style={{
      padding: '96px 24px',
      background: T.bg,
      borderTop: `1px solid ${T.border}`,
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* Section label */}
        <div style={{
          fontFamily: FF, fontSize: 11, fontWeight: 800,
          color: T.accent, letterSpacing: '0.15em', textTransform: 'uppercase',
          marginBottom: 12,
        }}>Who we are</div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'start',
        }} className="cred-grid">
          
          {/* Left — bio */}
          <div>
            <h2 style={{
              fontFamily: FF, fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 900, letterSpacing: '-0.03em', color: T.text,
              lineHeight: 1.1, marginBottom: 20,
            }}>
              Led by an{' '}
              <span style={{ background: grad.accent, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Active Practitioner.
              </span>
            </h2>

            <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.75, marginBottom: 24 }}>
              Gaz Cocklin is a Senior Executive Security Consultant and vCISO with over 20 years 
              of experience spanning UK defence, critical infrastructure, and commercial sectors. 
              Currently serving as Head of Security at Appivate — the RAF's software factory — 
              while delivering vCISO services across fintech, defence, and regulated industries.
            </p>

            <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.75, marginBottom: 36 }}>
              Pursuing an MBA in Technology Management (Open University) and an MSc in Cyber Defence 
              (Cranfield University). Certification training is delivered through Firebrand Training 
              across UK, DACH, and Benelux.
            </p>

            {/* Partner badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {partners.map(p => (
                <span key={p} style={{
                  fontFamily: FF, fontSize: 11, fontWeight: 700,
                  padding: '5px 12px', borderRadius: 99,
                  background: T.glow, border: `1px solid ${T.border}`,
                  color: T.textDim, letterSpacing: '0.04em',
                }}>{p}</span>
              ))}
            </div>
          </div>

          {/* Right — certs */}
          <div>
            <div style={{
              fontFamily: FF, fontSize: 13, fontWeight: 700,
              color: T.textDim, marginBottom: 16, letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>Active Certifications</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
              {certs.map(c => (
                <div key={c.code} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 16px',
                  background: T.bgCard,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10, borderLeft: `3px solid ${c.color}`,
                }}>
                  <span style={{
                    fontFamily: FF, fontSize: 14, fontWeight: 900,
                    color: c.color, minWidth: 90,
                  }}>{c.code}</span>
                  <span style={{ fontSize: 13, color: T.textDim, lineHeight: 1.4 }}>{c.full}</span>
                </div>
              ))}
            </div>

            {/* MBA/MSc in progress */}
            <div style={{
              padding: '16px 18px',
              background: `${T.primary}10`,
              border: `1px solid ${T.border}`,
              borderRadius: 10,
            }}>
              <div style={{ fontFamily: FF, fontSize: 13, fontWeight: 700, color: T.primary, marginBottom: 6 }}>
                📚 In Progress
              </div>
              <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.6 }}>
                MBA in Technology Management (Open University) ·{' '}
                MSc in Cyber Defence (Cranfield University)
              </div>
            </div>
          </div>
        </div>

        {/* Areas of expertise */}
        <div style={{
          marginTop: 72,
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 20,
        }}>
          {areas.map(a => (
            <AreaCard key={a.title} {...a} />
          ))}
        </div>
      </div>

      <style>{`
        .cred-grid { }
        @media (max-width: 860px) {
          .cred-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  )
}

function AreaCard({ icon, title, desc }) {
  const [hov, setHov] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 24, borderRadius: 14,
        background: hov ? `rgba(26,86,219,0.05)` : T.bgCard,
        border: `1px solid ${hov ? 'rgba(26,86,219,0.3)' : T.border}`,
        transition: 'all 0.2s',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      <span style={{ fontSize: 24, display: 'block', marginBottom: 12 }}>{icon}</span>
      <h4 style={{ fontFamily: FF, fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 8 }}>{title}</h4>
      <p style={{ fontSize: 13, color: T.textDim, lineHeight: 1.65 }}>{desc}</p>
    </div>
  )
}

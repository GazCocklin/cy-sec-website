import React from 'react'
import { T, grad } from '../theme'

const FF = T.FF

const courses = [
  {
    cert: 'CompTIA Network+', code: 'N10-009',
    desc: 'Foundation networking for IT professionals. Subnetting, routing, switching, troubleshooting, and security fundamentals.',
    color: '#EF4444', days: '5 days',
  },
  {
    cert: 'CompTIA Security+', code: 'SY0-701',
    desc: 'Core cybersecurity skills for roles in security administration and compliance. The most in-demand entry security cert globally.',
    color: '#EF4444', days: '5 days',
  },
  {
    cert: 'CompTIA CySA+', code: 'CS0-003',
    desc: 'Threat detection, analysis, and response. Vulnerability management, SIEM, and applied security analytics.',
    color: '#EF4444', days: '5 days',
  },
  {
    cert: 'CompTIA CASP+', code: 'CAS-004',
    desc: 'Advanced security practitioner level. Enterprise security architecture, risk management, and cryptographic solutions.',
    color: '#EF4444', days: '5 days',
  },
  {
    cert: 'AAISM', code: 'AI Security',
    desc: 'Associate in AI Security Management. Governance, risk, and compliance for AI systems including EU AI Act and NIST AI RMF.',
    color: '#10B981', days: '3–4 days',
  },
  {
    cert: 'BCS CISMP', code: 'Information Security',
    desc: 'BCS Certificate in Information Security Management Principles. Foundation for information security careers.',
    color: '#06B6D4', days: '5 days',
  },
  {
    cert: 'CRISC', code: 'Risk Management',
    desc: 'ISACA Certified in Risk and Information Systems Control. Enterprise IT risk identification and management.',
    color: '#8B5CF6', days: '3–4 days',
  },
  {
    cert: 'CompTIA Cloud+', code: 'CV0-004',
    desc: 'Cloud computing concepts, security, deployment, and administration across hybrid and multi-cloud environments.',
    color: '#EF4444', days: '5 days',
  },
]

const regions = [
  { flag: '🇬🇧', name: 'United Kingdom', detail: 'London, Nationwide' },
  { flag: '🇩🇪', name: 'DACH Region', detail: 'Germany, Austria, Switzerland' },
  { flag: '🇧🇪', name: 'Benelux', detail: 'Belgium, Netherlands, Luxembourg' },
]

export default function Training() {
  return (
    <section id="training" style={{
      padding: '96px 24px',
      background: T.bg,
      borderTop: `1px solid ${T.border}`,
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          gap: 40, marginBottom: 56, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontFamily: FF, fontSize: 11, fontWeight: 800,
              color: T.accent, letterSpacing: '0.15em', textTransform: 'uppercase',
              marginBottom: 12,
            }}>Certification Training</div>
            <h2 style={{
              fontFamily: FF, fontSize: 'clamp(30px, 4vw, 48px)',
              fontWeight: 900, letterSpacing: '-0.03em', color: T.text,
              lineHeight: 1.1, marginBottom: 14,
            }}>
              Authorised Delivery.{' '}
              <span style={{ background: grad.accent, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Real-World Instructors.
              </span>
            </h2>
            <p style={{ fontSize: 17, color: T.textMid, maxWidth: 520, lineHeight: 1.65 }}>
              CompTIA and CertNexus authorised training delivered by active practitioners — not 
              career trainers. Scheduled across the UK, DACH, and Benelux through Firebrand Training.
            </p>
          </div>

          {/* Regions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {regions.map(r => (
              <div key={r.name} style={{
                padding: '12px 18px', borderRadius: 12,
                background: T.bgCard, border: `1px solid ${T.border}`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{r.flag}</div>
                <div style={{ fontFamily: FF, fontSize: 13, fontWeight: 700, color: T.text }}>{r.name}</div>
                <div style={{ fontSize: 12, color: T.textDim }}>{r.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Authorised badges */}
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40,
        }}>
          {['CompTIA Authorised Partner', 'CertNexus Partner', 'Firebrand Training Associate'].map(b => (
            <div key={b} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 99,
              background: `${T.primary}12`, border: `1px solid ${T.border}`,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: T.success,
              }} />
              <span style={{ fontFamily: FF, fontSize: 12, fontWeight: 700, color: T.textMid }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Course grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {courses.map(c => <CourseCard key={c.cert} {...c} />)}
        </div>

        {/* FortifyLearn CTA */}
        <div style={{
          marginTop: 40, padding: '24px 28px',
          background: `${T.primary}10`, border: `1px solid ${T.border}`,
          borderRadius: 14, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontFamily: FF, fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 4 }}>
              Practise with FortifyLearn PBQ Simulator
            </div>
            <div style={{ fontSize: 14, color: T.textDim }}>
              CompTIA Network+ and Security+ performance-based question simulations. 
              Free labs available — no account required.
            </div>
          </div>
          <a href="https://fortifylearn.co.uk" target="_blank" rel="noreferrer" style={{
            fontFamily: FF, fontSize: 14, fontWeight: 700, color: '#fff',
            background: grad.primary, border: 'none', borderRadius: 9,
            padding: '11px 22px', whiteSpace: 'nowrap',
            boxShadow: '0 4px 14px rgba(26,86,219,0.3)',
          }}>
            Try Free Labs →
          </a>
        </div>

        {/* Enquire */}
        <div style={{
          marginTop: 16, textAlign: 'center',
          fontSize: 14, color: T.textDim,
        }}>
          Don't see a course?{' '}
          <a href="#contact" style={{ color: T.primary, fontWeight: 600 }}>
            Enquire about bespoke delivery →
          </a>
        </div>
      </div>
    </section>
  )
}

function CourseCard({ cert, code, desc, color, days }) {
  const [hov, setHov] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 20, borderRadius: 12,
        background: hov ? `${color}06` : T.bgCard,
        border: `1px solid ${hov ? `${color}30` : T.border}`,
        borderLeft: `3px solid ${color}`,
        transition: 'all 0.2s',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{
          fontFamily: FF, fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
          padding: '2px 8px', borderRadius: 4,
          background: `${color}18`, color: color, border: `1px solid ${color}30`,
        }}>{code}</span>
        <span style={{ fontSize: 11, color: T.textDim, fontFamily: FF, fontWeight: 600 }}>{days}</span>
      </div>
      <h4 style={{
        fontFamily: FF, fontSize: 15, fontWeight: 800,
        color: T.text, marginBottom: 8, letterSpacing: '-0.01em',
      }}>{cert}</h4>
      <p style={{ fontSize: 12, color: T.textDim, lineHeight: 1.65 }}>{desc}</p>
    </div>
  )
}

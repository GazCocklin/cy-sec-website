import React from 'react'
import { T, grad } from '../theme'

const FF = T.FF

const reasons = [
  {
    icon: '⚡',
    title: 'Training + Compliance, Combined',
    desc: 'Unlike point solutions, Cy-Sec delivers certified training AND compliance automation AND vCISO leadership — from one trusted partner. No vendor juggling, no gaps between your consultant and your platform.',
  },
  {
    icon: '🎯',
    title: 'FortifyOne Included',
    desc: 'Every vCISO engagement includes FortifyOne — our GRC platform covering ISO 27001, NIST CSF 2.0, DORA, NIS2, GDPR and SOC 2. Competitors charge extra. We include it.',
  },
  {
    icon: '💷',
    title: 'Fixed Prices. No Surprises.',
    desc: 'DORA Sprint from £4,000. NIS2 Review from £2,500. vCISO from £995/month. Know exactly what you\'re paying before you commit — no day-rate ambiguity, no scope creep invoices.',
  },
  {
    icon: '🏛',
    title: 'Active Practitioners Only',
    desc: 'Led by a CISSP-ISSAP, CISM, CRISC certified vCISO with live defence and commercial sector delivery. Simultaneously serving as Head of Security at Appivate (RAF\'s software factory). Not theory.',
  },
]

const regs = [
  {
    name: 'DORA',
    status: 'Mandatory since Jan 2025',
    statusColor: T.error,
    desc: 'Digital Operational Resilience Act. Applies to all EU financial entities and their ICT service providers. ICT risk, incident reporting, TLPT, and third-party oversight requirements.',
    risk: 'Fines up to 2% of global turnover',
    riskColor: T.error,
  },
  {
    name: 'NIS2',
    status: 'Enforcement active',
    statusColor: T.warning,
    desc: 'Network and Information Security Directive 2. Expanded scope covering essential and important entities across 18 sectors. Supply chain obligations, incident notification within 24 hours.',
    risk: 'Personal liability for senior management',
    riskColor: T.warning,
  },
  {
    name: 'ISO 27001',
    status: '2022 edition current',
    statusColor: T.accent,
    desc: 'International standard for information security management systems. 2022 update includes new controls for threat intelligence, cloud security, and ICT readiness for business continuity.',
    risk: 'Required by major procurement frameworks',
    riskColor: T.accent,
  },
]

export default function Compliance() {
  return (
    <>
      {/* Why Cy-Sec */}
      <section id="why" style={{
        padding: '96px 24px',
        background: T.bgMid,
        borderTop: `1px solid ${T.border}`,
      }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 80, alignItems: 'center',
          }} className="why-grid">

            <div>
              <div style={{
                fontFamily: FF, fontSize: 11, fontWeight: 800,
                color: T.accent, letterSpacing: '0.15em', textTransform: 'uppercase',
                marginBottom: 12,
              }}>Why Cy-Sec</div>
              <h2 style={{
                fontFamily: FF, fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 900, letterSpacing: '-0.03em', color: T.text,
                lineHeight: 1.1, marginBottom: 20,
              }}>
                Not Just Another{' '}
                <span style={{ background: grad.accent, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Consultancy.
                </span>
              </h2>
              <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.75, marginBottom: 32 }}>
                Most organisations patch together a training provider, a compliance consultant, 
                and a CISO-for-hire. Cy-Sec delivers all three — with a platform that ties it 
                together and a practitioner who does the work, not just the advice.
              </p>
              <a href="#contact" style={{
                fontFamily: FF, fontWeight: 700, fontSize: 15, color: '#fff',
                background: grad.primary, border: 'none', borderRadius: 9,
                padding: '13px 26px', display: 'inline-block',
                boxShadow: '0 4px 16px rgba(26,86,219,0.3)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.target.style.transform='translateY(-1px)'; e.target.style.boxShadow='0 6px 22px rgba(26,86,219,0.45)' }}
                onMouseLeave={e => { e.target.style.transform='none'; e.target.style.boxShadow='0 4px 16px rgba(26,86,219,0.3)' }}
              >
                Start a conversation →
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {reasons.map((r, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                  padding: '20px 0',
                  borderBottom: i < reasons.length - 1 ? `1px solid ${T.border}` : 'none',
                  borderTop: i === 0 ? `1px solid ${T.border}` : 'none',
                }}>
                  <div style={{
                    fontSize: 18, width: 44, height: 44, flexShrink: 0,
                    background: T.glow, border: `1px solid ${T.border}`,
                    borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{r.icon}</div>
                  <div>
                    <div style={{ fontFamily: FF, fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 4 }}>
                      {r.title}
                    </div>
                    <div style={{ fontSize: 13, color: T.textDim, lineHeight: 1.65 }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory urgency */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #080f20 0%, #06101e 50%, #080f1c 100%)',
        borderTop: `1px solid rgba(239,68,68,0.12)`,
        borderBottom: `1px solid rgba(239,68,68,0.12)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(239,68,68,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: 99, padding: '5px 14px',
              fontSize: 12, fontWeight: 700, color: '#F87171',
              marginBottom: 20, letterSpacing: '0.06em', fontFamily: FF,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite' }} />
              Regulatory enforcement is live — not pending
            </div>
            <h2 style={{
              fontFamily: FF, fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 900, letterSpacing: '-0.025em', color: T.text,
              lineHeight: 1.15, marginBottom: 16,
            }}>
              Are You Actually Compliant?<br />
              <span style={{ color: T.textMid, fontWeight: 700 }}>Or Just Hoping You Are?</span>
            </h2>
            <p style={{
              fontSize: 17, color: T.textMid, lineHeight: 1.65,
              maxWidth: 560, margin: '0 auto 40px',
            }}>
              DORA and NIS2 are active. Regulators are issuing fines. 
              "We're working on it" is not a defence. Get clarity on where you stand — free.
            </p>
            <a href="#contact" style={{
              fontFamily: FF, fontWeight: 700, fontSize: 16, color: '#fff',
              background: grad.primary, border: 'none', borderRadius: 10,
              padding: '15px 32px', display: 'inline-block',
              boxShadow: '0 4px 20px rgba(26,86,219,0.4)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow='0 8px 28px rgba(26,86,219,0.5)' }}
              onMouseLeave={e => { e.target.style.transform='none'; e.target.style.boxShadow='0 4px 20px rgba(26,86,219,0.4)' }}
            >
              Check Your Compliance Exposure — Free
            </a>
          </div>

          {/* Reg cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20,
          }}>
            {regs.map(r => (
              <div key={r.name} style={{
                padding: 24, borderRadius: 14,
                background: T.bgCard, border: `1px solid ${T.border}`,
                borderTop: `3px solid ${r.statusColor}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontFamily: FF, fontSize: 22, fontWeight: 900, color: T.text }}>{r.name}</span>
                  <span style={{
                    fontFamily: FF, fontSize: 10, fontWeight: 800, letterSpacing: '0.06em',
                    padding: '3px 9px', borderRadius: 99,
                    background: `${r.statusColor}15`, color: r.statusColor,
                    border: `1px solid ${r.statusColor}30`,
                  }}>{r.status}</span>
                </div>
                <p style={{ fontSize: 13, color: T.textDim, lineHeight: 1.65, marginBottom: 12 }}>{r.desc}</p>
                <div style={{
                  fontSize: 12, fontWeight: 700, color: r.riskColor,
                  background: `${r.riskColor}10`, border: `1px solid ${r.riskColor}25`,
                  borderRadius: 7, padding: '6px 10px',
                }}>⚠ {r.risk}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .why-grid { }
        @media (max-width: 860px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </>
  )
}

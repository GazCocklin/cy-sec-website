import React from 'react'
import { T, grad } from '../theme'

const FF = T.FF
const yr = new Date().getFullYear()

const cols = [
  {
    title: 'Services',
    links: [
      { label: 'Virtual CISO',           href: '#services'  },
      { label: 'DORA Compliance',        href: '#services'  },
      { label: 'NIS2 Compliance',        href: '#services'  },
      { label: 'Security Awareness',     href: '#services'  },
      { label: 'Certification Training', href: '#training'  },
    ],
  },
  {
    title: 'Platforms',
    links: [
      { label: 'FortifyLearn',   href: 'https://fortifylearn.co.uk', ext: true },
      { label: 'FortifyOne GRC', href: 'https://fortifyone.co.uk',   ext: true },
      { label: 'PBQ Simulator',  href: 'https://fortifylearn.co.uk', ext: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Credentials',   href: '#credentials' },
      { label: 'Contact',       href: '#contact'     },
      { label: 'Privacy Policy',href: '/privacy'     },
      { label: 'Terms',         href: '/terms'       },
    ],
  },
]

const certs = ['CISSP-ISSAP', 'CISM', 'CRISC', 'CGEIT', 'CCSP', 'AAISM', 'CITP MBCS']

export default function Footer() {
  return (
    <footer style={{
      background: T.bgMid,
      borderTop: `1px solid ${T.border}`,
      paddingTop: 64,
    }}>
      {/* Top section */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48, marginBottom: 64,
        }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{
              fontFamily: FF, fontWeight: 900, fontSize: 22,
              letterSpacing: '-0.03em', color: T.text, marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="7" fill="rgba(26,86,219,0.15)" stroke="rgba(26,86,219,0.3)" strokeWidth="1"/>
                <path d="M8 10h5l3 8 3-8h5" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 6v16" stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
              </svg>
              Cy-Sec<span style={{ background: grad.accent, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>.</span>
            </div>
            <p style={{ fontSize: 14, color: T.textDim, lineHeight: 1.75, marginBottom: 20, maxWidth: 280 }}>
              Cybersecurity leadership, compliance, and authorised certification training. 
              One trusted partner for organisations that take security seriously.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {certs.map(c => (
                <span key={c} style={{
                  fontFamily: FF, fontSize: 10, fontWeight: 700,
                  padding: '3px 8px', borderRadius: 99,
                  background: T.glow, border: `1px solid ${T.border}`,
                  color: T.textDim, letterSpacing: '0.04em',
                }}>{c}</span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{
                fontFamily: FF, fontSize: 11, fontWeight: 800,
                color: T.accent, letterSpacing: '0.14em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.ext ? '_blank' : undefined}
                    rel={l.ext ? 'noreferrer' : undefined}
                    style={{
                      fontSize: 14, color: T.textDim, transition: 'color 0.15s',
                      fontWeight: 500,
                    }}
                    onMouseEnter={e => e.target.style.color = T.textMid}
                    onMouseLeave={e => e.target.style.color = T.textDim}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div style={{
          padding: '24px 28px', marginBottom: 40,
          background: T.glow, border: `1px solid ${T.border}`,
          borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontFamily: FF, fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 4 }}>
              Free compliance exposure check
            </div>
            <div style={{ fontSize: 14, color: T.textDim }}>
              DORA · NIS2 · ISO 27001 — understand your gaps before regulators do.
            </div>
          </div>
          <a href="#contact" style={{
            fontFamily: FF, fontSize: 14, fontWeight: 700, color: '#fff',
            background: grad.primary, border: 'none', borderRadius: 9,
            padding: '11px 22px', whiteSpace: 'nowrap',
            boxShadow: '0 4px 14px rgba(26,86,219,0.3)',
          }}>
            Book Discovery Call →
          </a>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 24, paddingBottom: 24,
          borderTop: `1px solid ${T.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: 13, color: T.textDim }}>
            © {yr} Cy-Sec Awareness and Consultancy Ltd · Registered in England & Wales
          </div>
          <div style={{ fontSize: 13, color: T.textDim, display: 'flex', gap: 20 }}>
            <a href="/privacy" style={{ color: T.textDim }}
              onMouseEnter={e => e.target.style.color = T.textMid}
              onMouseLeave={e => e.target.style.color = T.textDim}
            >Privacy Policy</a>
            <a href="/terms" style={{ color: T.textDim }}
              onMouseEnter={e => e.target.style.color = T.textMid}
              onMouseLeave={e => e.target.style.color = T.textDim}
            >Terms</a>
            <a href="mailto:gazc@cy-sec.co.uk" style={{ color: T.textDim }}
              onMouseEnter={e => e.target.style.color = T.textMid}
              onMouseLeave={e => e.target.style.color = T.textDim}
            >gazc@cy-sec.co.uk</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid { }
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

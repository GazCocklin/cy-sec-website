import React from 'react'
import { T, grad } from '../theme'

const FF = T.FF

export default function Hero() {
  const stats = [
    { val: '20+', label: 'Years Experience' },
    { val: '6+',  label: 'Compliance Frameworks' },
    { val: '£995', label: 'vCISO from / month' },
    { val: 'CISSP', label: 'ISSAP Certified' },
  ]

  const certs = [
    'CISSP-ISSAP', 'CISM', 'CRISC', 'CGEIT', 'CCSP', 'AAISM', 'CITP MBCS'
  ]

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      padding: '120px 24px 80px', overflow: 'hidden',
    }}>
      {/* Background layers */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: [
          'radial-gradient(ellipse 70% 55% at 65% 15%, rgba(26,86,219,0.14) 0%, transparent 60%)',
          'radial-gradient(ellipse 45% 35% at 15% 85%, rgba(6,182,212,0.08) 0%, transparent 55%)',
          'linear-gradient(180deg, #05101F 0%, #071624 100%)',
        ].join(', '),
      }} />

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.035,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1160, margin: '0 auto', width: '100%' }}>
        <div style={{ maxWidth: 760 }}>

          {/* Alert badge */}
          <div className="fu1" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 99, padding: '5px 14px',
            fontSize: 12, fontWeight: 700, color: '#F87171',
            marginBottom: 28, letterSpacing: '0.06em',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#EF4444',
              animation: 'pulse 1.5s infinite',
            }} />
            DORA & NIS2 enforcement is active — are you compliant?
          </div>

          {/* H1 */}
          <h1 className="fu2" style={{
            fontFamily: FF, fontSize: 'clamp(42px, 6.5vw, 80px)',
            fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.035em',
            color: T.text, marginBottom: 24,
          }}>
            Cybersecurity{' '}
            <span style={{
              background: grad.accent,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Leadership.</span>
            <br />Compliance. Training.
          </h1>

          {/* Sub */}
          <p className="fu3" style={{
            fontSize: 'clamp(16px, 2vw, 20px)', color: T.textMid,
            maxWidth: 580, lineHeight: 1.7, marginBottom: 40,
          }}>
            One trusted partner for vCISO leadership, DORA & NIS2 compliance, 
            CompTIA-authorised certification training, and the FortifyOne GRC platform.
          </p>

          {/* CTAs */}
          <div className="fu4" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 56 }}>
            <a href="#contact" style={{
              fontFamily: FF, fontWeight: 700, fontSize: 16, color: '#fff',
              background: grad.primary, border: 'none', borderRadius: 10,
              padding: '14px 28px', display: 'inline-block',
              boxShadow: '0 4px 20px rgba(26,86,219,0.38)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.transform='translateY(-2px)'; e.target.style.boxShadow='0 8px 28px rgba(26,86,219,0.5)' }}
              onMouseLeave={e => { e.target.style.transform='none'; e.target.style.boxShadow='0 4px 20px rgba(26,86,219,0.38)' }}
            >
              Book a Free Discovery Call
            </a>
            <a href="#services" style={{
              fontFamily: FF, fontWeight: 600, fontSize: 16, color: T.textMid,
              background: 'transparent', border: `1px solid ${T.border}`,
              borderRadius: 10, padding: '14px 28px', display: 'inline-block',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.color=T.text; e.target.style.borderColor='rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.target.style.color=T.textMid; e.target.style.borderColor=T.border }}
            >
              Explore Services →
            </a>
          </div>

          {/* Stats bar */}
          <div className="fu5" style={{
            display: 'flex', flexWrap: 'wrap', gap: 0,
            border: `1px solid ${T.border}`, borderRadius: 12,
            overflow: 'hidden', maxWidth: 680,
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                flex: '1 1 140px', padding: '18px 22px',
                borderRight: i < stats.length - 1 ? `1px solid ${T.border}` : 'none',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{
                  fontFamily: FF, fontSize: 26, fontWeight: 900,
                  color: T.primary, lineHeight: 1, marginBottom: 4,
                }}>{s.val}</div>
                <div style={{
                  fontSize: 11, color: T.textDim, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Credential pills - floating right */}
        <div style={{
          position: 'absolute', right: 0, top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 8,
          animation: 'fadeIn 1s 0.5s ease both',
        }} className="hide-mobile">
          {certs.map(c => (
            <div key={c} style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${T.border}`,
              borderRadius: 8, padding: '8px 14px',
              fontSize: 12, fontWeight: 700, color: T.textDim,
              letterSpacing: '0.05em', whiteSpace: 'nowrap',
              fontFamily: FF,
            }}>{c}</div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
        background: 'linear-gradient(to bottom, transparent, #05101F)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      <style>{`
        .hide-mobile { }
        @media (max-width: 960px) { .hide-mobile { display: none !important; } }
      `}</style>
    </section>
  )
}

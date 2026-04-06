// WhyCySec.jsx
import React from 'react'
const FF = `'Bricolage Grotesque', sans-serif`

const REASONS = [
  {
    icon: '⚡',
    title: 'Training + Compliance, Combined',
    desc: 'Unlike point solutions, Cy-Sec delivers certified training AND compliance automation AND vCISO leadership — all from one trusted partner. No vendor juggling.',
  },
  {
    icon: '🎯',
    title: 'FortifyOne Included',
    desc: 'Every vCISO engagement includes access to FortifyOne — our compliance platform covering ISO 27001, NIST CSF 2.0, DORA, NIS2 and more. Competitors charge extra.',
  },
  {
    icon: '💷',
    title: 'Fixed Prices. No Surprises.',
    desc: 'DORA Sprint from £4,000. NIS2 Review from £2,500. vCISO from £995/month. Know exactly what you\'re paying before you commit.',
  },
  {
    icon: '🏛',
    title: 'Active Practitioners',
    desc: 'Led by a CISSP-ISSAP, CISM, CRISC certified vCISO with active defence and commercial sector experience. Not theory — real-world delivery.',
  },
]

export default function WhyCySec() {
  return (
    <>
      <style>{`
        .why { padding: 96px 24px; background: #060b18; }
        .why-inner { max-width: 1200px; margin: 0 auto; }
        .why-layout {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }
        .why-left {}
        .why-h2 {
          font-family: ${FF}; font-size: clamp(30px, 3.5vw, 44px);
          font-weight: 800; letter-spacing: -0.03em; color: #e8edf5;
          line-height: 1.15; margin-bottom: 20px;
        }
        .why-sub { font-size: 16px; color: #4a6080; line-height: 1.7; margin-bottom: 32px; }
        .why-cta {
          font-family: ${FF}; font-size: 15px; font-weight: 700;
          color: #fff; background: linear-gradient(135deg, #1a6fc4, #0ea5e9);
          border: none; border-radius: 9px; padding: 13px 26px;
          cursor: pointer; transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(26,111,196,0.3);
          display: inline-block;
        }
        .why-cta:hover { transform: translateY(-1px); }
        .why-right { display: flex; flex-direction: column; gap: 4px; }
        .reason {
          padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; gap: 16px; align-items: flex-start;
        }
        .reason:first-child { border-top: 1px solid rgba(255,255,255,0.06); }
        .reason-icon {
          font-size: 22px; width: 44px; height: 44px;
          background: rgba(26,111,196,0.10); border: 1px solid rgba(26,111,196,0.2);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .reason-title {
          font-family: ${FF}; font-size: 16px; font-weight: 700;
          color: #e8edf5; margin-bottom: 4px;
        }
        .reason-desc { font-size: 14px; color: #5A7090; line-height: 1.6; }
        @media (max-width: 860px) {
          .why-layout { grid-template-columns: 1fr; gap: 48px; }
        }
      `}</style>
      <section className="why" id="why">
        <div className="why-inner">
          <div className="why-layout">
            <div className="why-left">
              <div className="section-label">Why Cy-Sec</div>
              <h2 className="why-h2">Not Just Another Consultancy.</h2>
              <p className="why-sub">
                Most organisations patch together a training provider, a compliance consultant, and a CISO-for-hire. Cy-Sec delivers all three — with a platform to tie it together.
              </p>
              <a href="#contact" className="why-cta">Start a conversation</a>
            </div>
            <div className="why-right">
              {REASONS.map(r => (
                <div key={r.title} className="reason">
                  <div className="reason-icon">{r.icon}</div>
                  <div>
                    <div className="reason-title">{r.title}</div>
                    <p className="reason-desc">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

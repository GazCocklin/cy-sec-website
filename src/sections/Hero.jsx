import React from 'react'

const FF = `'Bricolage Grotesque', sans-serif`

export default function Hero() {
  return (
    <>
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex; align-items: center;
          padding: 120px 24px 80px;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 60% 20%, rgba(26,111,196,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(14,165,233,0.10) 0%, transparent 55%),
            linear-gradient(180deg, #060b18 0%, #070e1f 100%);
        }
        .hero-grid {
          position: absolute; inset: 0; z-index: 0; opacity: 0.025;
          background-image:
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-inner {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto; width: 100%;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(26,111,196,0.12);
          border: 1px solid rgba(26,111,196,0.28);
          border-radius: 99px; padding: 6px 16px;
          font-size: 12px; font-weight: 600; color: #60A5FA;
          margin-bottom: 28px;
          animation: fadeUp 0.6s ease both;
        }
        .hero-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #3B82F6;
          animation: pulse 2s infinite;
        }
        .hero-h1 {
          font-family: ${FF};
          font-size: clamp(40px, 6vw, 76px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: #e8edf5;
          max-width: 820px;
          margin-bottom: 12px;
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .hero-h1 .accent {
          background: linear-gradient(135deg, #3B82F6, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: clamp(16px, 2vw, 20px);
          color: #7088a8;
          max-width: 600px;
          line-height: 1.65;
          margin-bottom: 40px;
          animation: fadeUp 0.7s 0.2s ease both;
        }
        .hero-ctas {
          display: flex; flex-wrap: wrap; gap: 14px;
          margin-bottom: 64px;
          animation: fadeUp 0.7s 0.3s ease both;
        }
        .btn-primary {
          font-family: ${FF}; font-size: 15px; font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, #1a6fc4, #0ea5e9);
          border: none; border-radius: 9px;
          padding: 14px 28px;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(26,111,196,0.35);
          cursor: pointer;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,111,196,0.45); }
        .btn-secondary {
          font-family: ${FF}; font-size: 15px; font-weight: 600;
          color: #b8c5d8;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 9px; padding: 14px 28px;
          transition: all 0.2s; cursor: pointer;
        }
        .btn-secondary:hover { color: #e8edf5; border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.04); }
        .hero-stats {
          display: flex; flex-wrap: wrap; gap: 0;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; overflow: hidden;
          max-width: 640px;
          animation: fadeUp 0.7s 0.4s ease both;
        }
        .hero-stat {
          flex: 1; min-width: 140px;
          padding: 20px 24px;
          border-right: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
        }
        .hero-stat:last-child { border-right: none; }
        .hero-stat-val {
          font-family: ${FF}; font-size: 26px; font-weight: 800;
          color: #1a6fc4; line-height: 1; margin-bottom: 4px;
        }
        .hero-stat-label {
          font-size: 12px; color: #4a6080; font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.08em;
        }

        /* Floating trust logos */
        .hero-trust {
          position: absolute; right: 0; top: 50%; transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 12px; opacity: 0.7;
          animation: fadeIn 1s 0.5s ease both;
        }
        .trust-badge {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; padding: 10px 16px;
          font-size: 11px; font-weight: 600; color: #5A7090;
          white-space: nowrap;
        }
        @media (max-width: 960px) {
          .hero-trust { display: none; }
        }
        @media (max-width: 480px) {
          .hero-stat { min-width: 120px; padding: 16px; }
          .hero-stat-val { font-size: 22px; }
        }
      `}</style>

      <section className="hero">
        <div className="hero-bg"/>
        <div className="hero-grid"/>
        <div className="hero-inner">

          <div className="hero-badge">
            <span className="hero-badge-dot"/>
            DORA &amp; NIS2 enforcement is active
          </div>

          <h1 className="hero-h1">
            Cybersecurity Leadership.<br/>
            <span className="accent">Compliance. Training.</span>
          </h1>

          <p className="hero-sub">
            One partner. vCISO leadership, DORA/NIS2 compliance, CompTIA-certified training,
            and the FortifyOne compliance platform — everything your organisation needs.
          </p>

          <div className="hero-ctas">
            <a href="#contact" className="btn-primary">Book a Free Discovery Call</a>
            <a href="#services" className="btn-secondary">Explore Services →</a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-val">6+</div>
              <div className="hero-stat-label">Compliance Frameworks</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">£995</div>
              <div className="hero-stat-label">vCISO from / month</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">Fixed</div>
              <div className="hero-stat-label">Price. No Surprises</div>
            </div>
          </div>

        </div>

        <div className="hero-trust">
          <div className="trust-badge">CISSP-ISSAP Certified</div>
          <div className="trust-badge">CompTIA Authorised</div>
          <div className="trust-badge">CISM · CRISC · CGEIT</div>
          <div className="trust-badge">ISO 27001 · DORA · NIS2</div>
          <div className="trust-badge">CertNexus Partner</div>
        </div>
      </section>
    </>
  )
}

import React from 'react'
const FF = `'Bricolage Grotesque', sans-serif`

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <>
      <style>{`
        .footer {
          padding: 48px 24px 32px;
          background: #040810;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px; margin-bottom: 48px;
        }
        .footer-brand {}
        .footer-logo {
          font-family: ${FF}; font-size: 20px; font-weight: 800;
          color: #e8edf5; margin-bottom: 12px; letter-spacing: -0.5px;
        }
        .footer-logo span { color: #1a6fc4; }
        .footer-desc { font-size: 13px; color: #3A5070; line-height: 1.7; max-width: 260px; }
        .footer-col-title {
          font-family: ${FF}; font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #2a4060; margin-bottom: 16px;
        }
        .footer-links { display: flex; flex-direction: column; gap: 10px; }
        .footer-link { font-size: 13px; color: #3A5070; transition: color 0.15s; }
        .footer-link:hover { color: #7088a8; }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.04);
          padding-top: 24px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .footer-copy { font-size: 12px; color: #253040; }
        .footer-certs { font-size: 12px; color: #1a2a3a; }
        @media (max-width: 760px) {
          .footer-inner { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .footer-inner { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">Cy<span>-</span>Sec</div>
            <p className="footer-desc">Cy-Sec Awareness and Consultancy Ltd. Cybersecurity leadership, compliance automation, and certified training for UK organisations.</p>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <div className="footer-links">
              <a href="#services" className="footer-link">Virtual CISO</a>
              <a href="#services" className="footer-link">DORA Compliance Sprint</a>
              <a href="#services" className="footer-link">NIS2 Compliance</a>
              <a href="#services" className="footer-link">Security Awareness</a>
              <a href="#services" className="footer-link">Certifications</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Products</div>
            <div className="footer-links">
              <a href="https://fortifylearn.co.uk" target="_blank" rel="noreferrer" className="footer-link">FortifyLearn</a>
              <a href="https://fortifyone.co.uk" target="_blank" rel="noreferrer" className="footer-link">FortifyOne</a>
              <a href="#catalogue" className="footer-link">PBQ Lab Packs</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-links">
              <a href="mailto:gazc@cy-sec.co.uk" className="footer-link">gazc@cy-sec.co.uk</a>
              <a href="#contact" className="footer-link">Book a discovery call</a>
              <a href="#contact" className="footer-link">Compliance check</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {year} Cy-Sec Awareness and Consultancy Ltd. All rights reserved.</span>
          <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
            <a href="/privacy" className="footer-link" style={{fontSize:12,color:'#253040'}}>Privacy Policy</a>
            <a href="/terms" className="footer-link" style={{fontSize:12,color:'#253040'}}>Terms of Service</a>
            <span className="footer-certs">CISSP-ISSAP · CISM · CRISC · CGEIT · CCSP · CompTIA Authorised Partner</span>
          </div>
        </div>
      </footer>
    </>
  )
}

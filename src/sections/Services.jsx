import React from 'react'

const FF = `'Bricolage Grotesque', sans-serif`

const SERVICES = [
  {
    icon: '🛡',
    title: 'Virtual CISO',
    desc: 'Dedicated cybersecurity leadership without the full-time hire. Strategic guidance, risk management, and board-level reporting. FortifyOne platform included.',
    price: 'From £995/month',
    tag: 'Most popular',
    tagColor: '#3B82F6',
    href: '#contact',
    cta: 'Enquire now',
  },
  {
    icon: '🏦',
    title: 'DORA Compliance Sprint',
    desc: 'DORA has been mandatory for EU financial entities since January 2025. Get compliant fast with our structured sprint — ICT risk, incident reporting, third-party oversight.',
    price: 'Fixed price from £4,000',
    tag: 'Urgent',
    tagColor: '#EF4444',
    href: '#contact',
    cta: 'Check your exposure',
  },
  {
    icon: '🌐',
    title: 'NIS2 Compliance',
    desc: 'NIS2 enforcement is active. Understand your obligations, identify gaps, and implement the measures required for your sector — fast.',
    price: 'From £2,500',
    tag: null,
    href: '#contact',
    cta: 'Get started',
  },
  {
    icon: '📋',
    title: 'FortifyOne Platform',
    desc: 'ISO 27001:2022, NIST CSF 2.0, GDPR, SOC 2, DORA, NIS2 — automated in one platform. Evidence collection, gap analysis, and audit-ready reports.',
    price: 'From £149/month',
    tag: 'SaaS',
    tagColor: '#8B5CF6',
    href: 'https://fortifyone.co.uk',
    cta: 'View platform →',
    external: true,
  },
  {
    icon: '🎓',
    title: 'Security Awareness Training',
    desc: 'Role-specific, bespoke cybersecurity awareness training for your entire organisation. Not generic slide decks — content tailored to your sector and threat landscape.',
    price: 'Custom pricing',
    tag: null,
    href: '#contact',
    cta: 'Request a quote',
  },
  {
    icon: '🏆',
    title: 'Professional Certifications',
    desc: 'CompTIA and CertNexus authorised training. Security+, CySA+, CASP+, Network+, AAISM and more. Delivered by active practitioners — not career trainers.',
    price: 'Varies by certification',
    tag: 'Authorised',
    tagColor: '#10B981',
    href: '#catalogue',
    cta: 'View PBQ packs →',
  },
]

export default function Services() {
  return (
    <>
      <style>{`
        .services {
          padding: 96px 24px;
          background: #070e1f;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .services-inner { max-width: 1200px; margin: 0 auto; }
        .services-header { margin-bottom: 56px; }
        .services-h2 {
          font-family: ${FF}; font-size: clamp(32px, 4vw, 48px);
          font-weight: 800; letter-spacing: -0.03em; color: #e8edf5;
          line-height: 1.1; margin-bottom: 12px;
        }
        .services-sub {
          font-size: 17px; color: #4a6080;
          max-width: 520px; line-height: 1.6;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }
        .service-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 28px;
          display: flex; flex-direction: column; gap: 16px;
          transition: all 0.2s; position: relative; overflow: hidden;
        }
        .service-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #1a6fc4, #0ea5e9);
          opacity: 0; transition: opacity 0.2s;
        }
        .service-card:hover {
          border-color: rgba(26,111,196,0.3);
          background: rgba(26,111,196,0.04);
          transform: translateY(-3px);
        }
        .service-card:hover::before { opacity: 1; }
        .service-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .service-icon { font-size: 28px; line-height: 1; }
        .service-tag {
          font-size: 10px; font-weight: 700;
          padding: 3px 9px; border-radius: 99px;
          letter-spacing: 0.08em; white-space: nowrap;
          border: 1px solid;
        }
        .service-title {
          font-family: ${FF}; font-size: 19px; font-weight: 700;
          color: #e8edf5; letter-spacing: -0.01em; margin-top: 4px;
        }
        .service-desc {
          font-size: 14px; color: #5A7090; line-height: 1.65;
          flex: 1;
        }
        .service-footer {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .service-price {
          font-family: ${FF}; font-size: 14px; font-weight: 700;
          color: #3B82F6;
        }
        .service-cta {
          font-size: 13px; font-weight: 600; color: #7088a8;
          background: transparent; border: 1px solid rgba(255,255,255,0.10);
          border-radius: 6px; padding: 7px 14px;
          transition: all 0.15s; cursor: pointer;
          white-space: nowrap;
          display: inline-block;
        }
        .service-cta:hover { color: #e8edf5; border-color: rgba(255,255,255,0.25); }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="services" id="services">
        <div className="services-inner">
          <div className="services-header">
            <div className="section-label">What we do</div>
            <h2 className="services-h2">Everything Your Organisation<br/>Needs. One Partner.</h2>
            <p className="services-sub">Comprehensive services tailored to protect your organisation, train your staff, and achieve complex regulatory compliance.</p>
          </div>

          <div className="services-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="service-card">
                <div className="service-top">
                  <span className="service-icon">{s.icon}</span>
                  {s.tag && (
                    <span className="service-tag" style={{ color: s.tagColor, borderColor: s.tagColor + '40', background: s.tagColor + '12' }}>
                      {s.tag}
                    </span>
                  )}
                </div>
                <div className="service-title">{s.title}</div>
                <p className="service-desc">{s.desc}</p>
                <div className="service-footer">
                  <span className="service-price">{s.price}</span>
                  <a href={s.href} className="service-cta" target={s.external ? '_blank' : undefined} rel={s.external ? 'noreferrer' : undefined}>
                    {s.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

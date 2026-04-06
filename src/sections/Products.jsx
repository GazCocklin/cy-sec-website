import React from 'react'
const FF = `'Bricolage Grotesque', sans-serif`

const PRODUCTS = [
  {
    name: 'FortifyLearn',
    tagline: 'CompTIA PBQ Simulator',
    desc: 'Performance-based question simulations for CompTIA Network+ and Security+. The part of the exam most candidates fail — practised in a live topology environment with real CLI commands.',
    features: ['Live Cisco IOS & Linux topology', 'Real command simulation', 'Study and Exam modes', 'Detailed improvement plans'],
    price: 'Free to start',
    cta: 'Try FortifyLearn →',
    href: 'https://fortifylearn.co.uk',
    color: '#1a6fc4',
    bg: 'rgba(26,111,196,0.08)',
    border: 'rgba(26,111,196,0.25)',
  },
  {
    name: 'FortifyOne',
    tagline: 'GRC Compliance Platform',
    desc: 'ISO 27001:2022, NIST CSF 2.0, GDPR, SOC 2, DORA, and NIS2 compliance automation. Gap analysis, evidence collection, vendor risk management, DPIA and FRIA tools — in one platform.',
    features: ['6 compliance frameworks', 'Vendor risk management', 'DPIA & FRIA tools', 'Audit-ready evidence packs'],
    price: 'From £149/month',
    cta: 'View FortifyOne →',
    href: 'https://fortifyone.co.uk',
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.25)',
  },
]

export default function Products() {
  return (
    <>
      <style>{`
        .products {
          padding: 96px 24px;
          background: #070e1f;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .products-inner { max-width: 1200px; margin: 0 auto; }
        .products-header { margin-bottom: 56px; }
        .products-h2 {
          font-family: ${FF}; font-size: clamp(30px, 4vw, 46px);
          font-weight: 800; letter-spacing: -0.03em; color: #e8edf5;
          line-height: 1.1; margin-bottom: 12px;
        }
        .products-sub { font-size: 17px; color: #4a6080; max-width: 520px; line-height: 1.6; }
        .products-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
        }
        .product-card {
          border-radius: 18px; padding: 36px;
          border: 1px solid;
          display: flex; flex-direction: column; gap: 20px;
          transition: all 0.2s;
        }
        .product-card:hover { transform: translateY(-3px); }
        .product-top {}
        .product-name {
          font-family: ${FF}; font-size: 28px; font-weight: 800;
          letter-spacing: -0.02em; line-height: 1; margin-bottom: 4px;
        }
        .product-tagline { font-size: 14px; font-weight: 600; opacity: 0.7; }
        .product-desc { font-size: 15px; color: #5A7090; line-height: 1.65; }
        .product-features { display: flex; flex-direction: column; gap: 8px; }
        .product-feature {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; color: #7088a8;
        }
        .product-feature-tick {
          width: 18px; height: 18px; border-radius: 50%;
          background: rgba(26,111,196,0.15); border: 1px solid rgba(26,111,196,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; flex-shrink: 0; color: #3B82F6; font-weight: 700;
        }
        .product-footer {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin-top: auto;
        }
        .product-price {
          font-family: ${FF}; font-size: 15px; font-weight: 700; color: #e8edf5;
        }
        .product-cta {
          font-family: ${FF}; font-size: 14px; font-weight: 700;
          color: #fff; border: none; border-radius: 8px;
          padding: 10px 18px; cursor: pointer; transition: all 0.2s;
          display: inline-block;
        }
        @media (max-width: 720px) {
          .products-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="products" id="products">
        <div className="products-inner">
          <div className="products-header">
            <div className="section-label">Our platforms</div>
            <h2 className="products-h2">Built by Practitioners.<br/>Used by Professionals.</h2>
            <p className="products-sub">Two platforms that extend Cy-Sec's reach — available independently or as part of a managed engagement.</p>
          </div>

          <div className="products-grid">
            {PRODUCTS.map(p => (
              <div key={p.name} className="product-card" style={{ background: p.bg, borderColor: p.border }}>
                <div className="product-top">
                  <div className="product-name" style={{ color: p.color }}>{p.name}</div>
                  <div className="product-tagline" style={{ color: p.color }}>{p.tagline}</div>
                </div>
                <p className="product-desc">{p.desc}</p>
                <div className="product-features">
                  {p.features.map(f => (
                    <div key={f} className="product-feature">
                      <div className="product-feature-tick">✓</div>
                      {f}
                    </div>
                  ))}
                </div>
                <div className="product-footer">
                  <span className="product-price">{p.price}</span>
                  <a href={p.href} target="_blank" rel="noreferrer"
                     className="product-cta"
                     style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`, boxShadow: `0 4px 14px ${p.color}40` }}>
                    {p.cta}
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

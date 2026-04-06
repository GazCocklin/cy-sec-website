import React from 'react'
const FF = `'Bricolage Grotesque', sans-serif`

const PACKS = [
  {
    name: 'CompTIA Network+ PBQ Pack',
    cert: 'N10-009',
    desc: 'Three hands-on simulations — ACL troubleshooting, multi-VLAN routing failure, and enterprise multi-fault recovery. Live Cisco IOS topology.',
    labs: 3,
    price: '12.99',
    fullPrice: '14.99',
    early: true,
    featured: false,
    color: '#1a6fc4',
  },
  {
    name: 'Network+ & Security+ Bundle',
    cert: 'N10-009 + SY0-701',
    desc: 'Complete PBQ simulation set — three Network+ labs and four Security+ labs. Full Cisco IOS and Linux topology coverage across seven scenarios.',
    labs: 7,
    price: '19.99',
    fullPrice: '24.99',
    early: true,
    featured: true,
    color: '#0ea5e9',
  },
  {
    name: 'CompTIA Security+ PBQ Pack',
    cert: 'SY0-701',
    desc: 'Four Linux server simulations — SSH hardening, legacy service exposure, privilege escalation, and post-pentest remediation.',
    labs: 4,
    price: '12.99',
    fullPrice: '14.99',
    early: true,
    featured: false,
    color: '#8B5CF6',
  },
]

export default function Catalogue() {
  return (
    <>
      <style>{`
        .catalogue {
          padding: 96px 24px;
          background: #060b18;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .catalogue-inner { max-width: 1200px; margin: 0 auto; }
        .catalogue-header { margin-bottom: 56px; }
        .catalogue-h2 {
          font-family: ${FF}; font-size: clamp(30px, 4vw, 46px);
          font-weight: 800; letter-spacing: -0.03em; color: #e8edf5;
          line-height: 1.1; margin-bottom: 12px;
        }
        .catalogue-sub { font-size: 17px; color: #4a6080; max-width: 560px; line-height: 1.6; }
        .catalogue-note {
          margin-top: 12px;
          font-size: 13px; color: #3B82F6; font-weight: 500;
        }
        .pack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px; align-items: start;
        }
        .pack-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 28px;
          display: flex; flex-direction: column; gap: 18px;
          transition: all 0.2s; position: relative;
        }
        .pack-card.featured {
          border-color: rgba(14,165,233,0.35);
          background: rgba(14,165,233,0.05);
        }
        .pack-card:hover { transform: translateY(-3px); }
        .pack-best {
          position: absolute; top: -11px; left: 20px;
          background: #0ea5e9; color: #fff;
          font-size: 10px; font-weight: 700;
          padding: 2px 12px; border-radius: 20px;
          letter-spacing: 0.08em;
          font-family: ${FF};
        }
        .pack-early {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(16,185,129,0.10); border: 1px solid rgba(16,185,129,0.25);
          border-radius: 99px; padding: 3px 10px;
          font-size: 10px; font-weight: 700; color: #10B981;
          letter-spacing: 0.08em;
        }
        .pack-name {
          font-family: ${FF}; font-size: 18px; font-weight: 800;
          color: #e8edf5; letter-spacing: -0.01em; line-height: 1.2;
        }
        .pack-cert {
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          padding: 2px 8px; border-radius: 4px; align-self: flex-start;
        }
        .pack-desc { font-size: 14px; color: #5A7090; line-height: 1.65; }
        .pack-labs {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; color: #3B82F6; font-weight: 600;
        }
        .pack-price-row {
          display: flex; align-items: baseline; gap: 8px;
        }
        .pack-price {
          font-family: ${FF}; font-size: 32px; font-weight: 900; color: #e8edf5;
        }
        .pack-price span { font-size: 18px; }
        .pack-full-price {
          font-size: 16px; color: #4a6080;
          text-decoration: line-through;
        }
        .pack-buy {
          font-family: ${FF}; font-size: 15px; font-weight: 700;
          color: #fff; border: none; border-radius: 9px;
          padding: 13px 0; width: 100%; cursor: pointer;
          transition: all 0.2s; display: block; text-align: center;
          box-shadow: 0 4px 14px rgba(26,111,196,0.3);
        }
        .pack-buy:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,111,196,0.4); }
        .pack-note {
          font-size: 11px; color: #3A5070; text-align: center;
        }
        .catalogue-free {
          margin-top: 40px; padding: 24px;
          background: rgba(16,185,129,0.05);
          border: 1px solid rgba(16,185,129,0.15);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
          flex-wrap: wrap;
        }
        .catalogue-free-text h4 {
          font-family: ${FF}; font-size: 16px; font-weight: 700;
          color: #e8edf5; margin-bottom: 4px;
        }
        .catalogue-free-text p { font-size: 14px; color: #4a6080; }
        .free-cta {
          font-family: ${FF}; font-size: 14px; font-weight: 700;
          color: #10B981; background: rgba(16,185,129,0.10);
          border: 1px solid rgba(16,185,129,0.25);
          border-radius: 8px; padding: 10px 20px;
          transition: all 0.15s; white-space: nowrap;
          display: inline-block;
        }
        .free-cta:hover { background: rgba(16,185,129,0.18); }
        @media (max-width: 480px) {
          .pack-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="catalogue" id="catalogue">
        <div className="catalogue-inner">
          <div className="catalogue-header">
            <div className="section-label">PBQ Lab Packs</div>
            <h2 className="catalogue-h2">Master the Part That<br/>Fails Most Candidates.</h2>
            <p className="catalogue-sub">
              Performance-based questions account for up to 30% of CompTIA exam marks. These aren't MCQs — they're live simulations. Practise with real topologies before your exam.
            </p>
            <p className="catalogue-note">🎉 Early access pricing — limited time</p>
          </div>

          <div className="pack-grid">
            {PACKS.map(p => (
              <div key={p.name} className={`pack-card${p.featured ? ' featured' : ''}`}>
                {p.featured && <div className="pack-best">BEST VALUE</div>}
                <div>
                  <span className="pack-early">✓ EARLY ACCESS</span>
                </div>
                <div>
                  <div className="pack-cert" style={{ color: p.color, background: p.color + '18', border: `1px solid ${p.color}30` }}>
                    {p.cert}
                  </div>
                </div>
                <div className="pack-name">{p.name}</div>
                <p className="pack-desc">{p.desc}</p>
                <div className="pack-labs">
                  ✓ {p.labs} PBQ labs included
                </div>
                <div className="pack-price-row">
                  <div className="pack-price"><span>£</span>{p.price}</div>
                  <div className="pack-full-price">£{p.fullPrice}</div>
                </div>
                <a href="https://fortifylearn.co.uk" target="_blank" rel="noreferrer"
                   className="pack-buy"
                   style={{ background: `linear-gradient(135deg, #1a6fc4, #0ea5e9)` }}>
                  Buy Pack — £{p.price} →
                </a>
                <p className="pack-note">One-time purchase · Instant access on FortifyLearn</p>
              </div>
            ))}
          </div>

          <div className="catalogue-free">
            <div className="catalogue-free-text">
              <h4>Try before you buy — free labs available</h4>
              <p>Network+ Easy and Security+ Easy labs are always free. No account required to preview.</p>
            </div>
            <a href="https://fortifylearn.co.uk" target="_blank" rel="noreferrer" className="free-cta">
              Try free labs →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

import React, { useState } from 'react'
const FF = `'Bricolage Grotesque', sans-serif`

export function Urgency() {
  return (
    <>
      <style>{`
        .urgency {
          padding: 80px 24px;
          background: linear-gradient(135deg, #0a1528 0%, #071020 50%, #0a1020 100%);
          border-top: 1px solid rgba(239,68,68,0.15);
          border-bottom: 1px solid rgba(239,68,68,0.15);
          position: relative; overflow: hidden;
        }
        .urgency::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(239,68,68,0.06) 0%, transparent 70%);
        }
        .urgency-inner {
          max-width: 800px; margin: 0 auto; text-align: center;
          position: relative; z-index: 1;
        }
        .urgency-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3);
          border-radius: 99px; padding: 6px 16px;
          font-size: 12px; font-weight: 700; color: #F87171;
          margin-bottom: 24px; letter-spacing: 0.06em;
        }
        .urgency-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #EF4444; animation: pulse 1.5s infinite;
        }
        .urgency-h2 {
          font-family: ${FF}; font-size: clamp(26px, 4vw, 40px);
          font-weight: 800; letter-spacing: -0.02em; color: #e8edf5;
          line-height: 1.2; margin-bottom: 16px;
        }
        .urgency-sub {
          font-size: 17px; color: #5A7090; line-height: 1.65; margin-bottom: 36px;
          max-width: 560px; margin-left: auto; margin-right: auto;
        }
        .urgency-cta {
          font-family: ${FF}; font-size: 16px; font-weight: 700;
          color: #fff; background: linear-gradient(135deg, #1a6fc4, #0ea5e9);
          border: none; border-radius: 10px; padding: 15px 32px;
          cursor: pointer; transition: all 0.2s; display: inline-block;
          box-shadow: 0 4px 20px rgba(26,111,196,0.35);
        }
        .urgency-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,111,196,0.45); }
      `}</style>

      <section className="urgency">
        <div className="urgency-inner">
          <div className="urgency-pill">
            <span className="urgency-dot"/>
            DORA mandatory since January 2025 · NIS2 enforcement active
          </div>
          <h2 className="urgency-h2">Are You Actually Compliant?<br/>Or Just Hoping You Are?</h2>
          <p className="urgency-sub">
            DORA and NIS2 aren't coming — they're here. Regulators are active, 
            fines are real, and "we're working on it" isn't a defence. 
            Get a free compliance exposure check today.
          </p>
          <a href="#contact" className="urgency-cta">Check Your Compliance Exposure — Free</a>
        </div>
      </section>
    </>
  )
}

export function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', org: '', message: '' })
  const [status, setStatus]   = useState(null) // null | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    // Stub — wire to Formspree or similar
    await new Promise(r => setTimeout(r, 900))
    setStatus('sent')
  }

  const inp = {
    width: '100%', padding: '12px 14px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '9px', color: '#e8edf5',
    fontSize: '15px', fontFamily: 'inherit',
    outline: 'none', transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  }

  return (
    <>
      <style>{`
        .contact {
          padding: 96px 24px;
          background: #060b18;
        }
        .contact-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
        }
        .contact-left {}
        .contact-h2 {
          font-family: ${FF}; font-size: clamp(28px, 3.5vw, 42px);
          font-weight: 800; letter-spacing: -0.02em; color: #e8edf5;
          line-height: 1.15; margin-bottom: 16px;
        }
        .contact-sub { font-size: 16px; color: #4a6080; line-height: 1.7; margin-bottom: 40px; }
        .contact-details { display: flex; flex-direction: column; gap: 16px; }
        .contact-item {
          display: flex; align-items: center; gap: 14px;
          font-size: 14px; color: #5A7090;
        }
        .contact-item-icon {
          width: 38px; height: 38px; border-radius: 9px;
          background: rgba(26,111,196,0.10); border: 1px solid rgba(26,111,196,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .contact-item-text { color: #b8c5d8; font-weight: 500; }
        .contact-right {}
        .contact-form { display: flex; flex-direction: column; gap: 14px; }
        .contact-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .contact-submit {
          font-family: ${FF}; font-size: 15px; font-weight: 700;
          color: #fff; background: linear-gradient(135deg, #1a6fc4, #0ea5e9);
          border: none; border-radius: 9px; padding: 14px 0;
          cursor: pointer; transition: all 0.2s; width: 100%;
          box-shadow: 0 4px 16px rgba(26,111,196,0.3);
        }
        .contact-submit:hover { transform: translateY(-1px); }
        .contact-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .contact-sent {
          padding: 20px; border-radius: 10px;
          background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25);
          text-align: center; font-size: 15px; color: #10B981; font-weight: 600;
          font-family: ${FF};
        }
        @media (max-width: 860px) {
          .contact-inner { grid-template-columns: 1fr; gap: 48px; }
          .contact-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="contact" id="contact">
        <div className="contact-inner">
          <div className="contact-left">
            <div className="section-label">Get in touch</div>
            <h2 className="contact-h2">Ready to Secure Your Organisation?</h2>
            <p className="contact-sub">
              Book a free 30-minute discovery call. No jargon. No hard sell. Just clarity on where you stand and what you need.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <span className="contact-item-text">United Kingdom</span>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">✉️</div>
                <a href="mailto:gazc@cy-sec.co.uk" className="contact-item-text" style={{ color: '#3B82F6' }}>gazc@cy-sec.co.uk</a>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">🔒</div>
                <span className="contact-item-text">vCISO · DORA · NIS2 · ISO 27001 · CompTIA Training</span>
              </div>
            </div>
          </div>

          <div className="contact-right">
            {status === 'sent' ? (
              <div className="contact-sent">
                ✓ Message received — we'll be in touch within one business day.
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-row">
                  <input required style={inp} placeholder="Your name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = 'rgba(26,111,196,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.10)'}/>
                  <input required type="email" style={inp} placeholder="Email address" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = 'rgba(26,111,196,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.10)'}/>
                </div>
                <input style={inp} placeholder="Organisation (optional)" value={form.org}
                  onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = 'rgba(26,111,196,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.10)'}/>
                <textarea required rows={5} style={{ ...inp, resize: 'vertical', minHeight: 120 }}
                  placeholder="How can we help? (compliance challenge, training need, vCISO enquiry...)"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = 'rgba(26,111,196,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.10)'}/>
                <button type="submit" className="contact-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Urgency

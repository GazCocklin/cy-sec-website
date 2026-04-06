import React, { useState } from 'react'
import { T, grad } from '../theme'

const FF = T.FF

const services = [
  'Virtual CISO (vCISO)',
  'DORA Compliance Sprint',
  'NIS2 Compliance Review',
  'ISO 27001 Implementation',
  'FortifyOne GRC Platform',
  'Security Awareness Training',
  'Certification Training',
  'Tabletop Exercise / Incident Response',
  'Security Architecture Review',
  'General Enquiry',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      // Fallback: mailto
      const subject = encodeURIComponent(`Cy-Sec Enquiry: ${form.service || 'General'}`)
      const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\n\n${form.message}`)
      window.location.href = `mailto:gazc@cy-sec.co.uk?subject=${subject}&body=${body}`
      setStatus('sent')
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid rgba(255,255,255,0.1)`,
    borderRadius: 9, color: T.text,
    padding: '11px 14px', width: '100%',
    fontSize: 14, outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s, background 0.2s',
  }

  return (
    <section id="contact" style={{
      padding: '96px 24px',
      background: T.bg,
      borderTop: `1px solid ${T.border}`,
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'start',
        }} className="contact-grid">

          {/* Left */}
          <div>
            <div style={{
              fontFamily: FF, fontSize: 11, fontWeight: 800,
              color: T.accent, letterSpacing: '0.15em', textTransform: 'uppercase',
              marginBottom: 12,
            }}>Get in touch</div>
            <h2 style={{
              fontFamily: FF, fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 900, letterSpacing: '-0.03em', color: T.text,
              lineHeight: 1.1, marginBottom: 20,
            }}>
              Ready to Secure Your{' '}
              <span style={{ background: grad.accent, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Organisation?
              </span>
            </h2>
            <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.75, marginBottom: 40 }}>
              Book a free 30-minute discovery call. No jargon. No hard sell. 
              Just clarity on where you stand and what you actually need.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
              {[
                { icon: '✉️', label: 'Email', val: 'gazc@cy-sec.co.uk', href: 'mailto:gazc@cy-sec.co.uk' },
                { icon: '📍', label: 'Location', val: 'United Kingdom', href: null },
                { icon: '🔒', label: 'Services', val: 'vCISO · DORA · NIS2 · ISO 27001 · Training', href: null },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: T.glow, border: `1px solid ${T.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: T.textDim, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                      {c.label}
                    </div>
                    {c.href ? (
                      <a href={c.href} style={{ fontSize: 14, color: T.textMid, fontWeight: 600 }}>{c.val}</a>
                    ) : (
                      <div style={{ fontSize: 14, color: T.textMid, fontWeight: 500 }}>{c.val}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust markers */}
            <div style={{
              padding: '16px 20px',
              background: T.bgCard, border: `1px solid ${T.border}`,
              borderRadius: 12,
            }}>
              <div style={{ fontFamily: FF, fontSize: 13, fontWeight: 700, color: T.textDim, marginBottom: 10 }}>
                Typical response
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Same day', 'No obligation', 'Free discovery call', 'Confidential'].map(t => (
                  <span key={t} style={{
                    fontFamily: FF, fontSize: 11, fontWeight: 700,
                    padding: '4px 10px', borderRadius: 99,
                    background: `${T.success}10`, border: `1px solid ${T.success}25`,
                    color: T.success,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'sent' ? (
              <div style={{
                padding: '40px 32px', borderRadius: 16,
                background: `${T.success}08`, border: `1px solid ${T.success}25`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                <div style={{ fontFamily: FF, fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 8 }}>
                  Message received
                </div>
                <div style={{ fontSize: 15, color: T.textMid, lineHeight: 1.65 }}>
                  Thanks for getting in touch. I'll respond the same day — usually within a few hours.
                </div>
              </div>
            ) : (
              <form onSubmit={submit} style={{
                background: T.bgCard, border: `1px solid ${T.border}`,
                borderRadius: 16, padding: 32,
                display: 'flex', flexDirection: 'column', gap: 16,
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                  <div>
                    <label style={{ fontSize: 13, color: T.textDim, fontWeight: 600, marginBottom: 6, display: 'block' }}>
                      Full name *
                    </label>
                    <input
                      required value={form.name} onChange={set('name')}
                      placeholder="Jane Smith" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'rgba(26,86,219,0.55)'; e.target.style.background = 'rgba(26,86,219,0.06)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: T.textDim, fontWeight: 600, marginBottom: 6, display: 'block' }}>
                      Email *
                    </label>
                    <input
                      required type="email" value={form.email} onChange={set('email')}
                      placeholder="jane@company.com" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'rgba(26,86,219,0.55)'; e.target.style.background = 'rgba(26,86,219,0.06)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 13, color: T.textDim, fontWeight: 600, marginBottom: 6, display: 'block' }}>
                    Company / Organisation
                  </label>
                  <input
                    value={form.company} onChange={set('company')}
                    placeholder="Acme Ltd" style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'rgba(26,86,219,0.55)'; e.target.style.background = 'rgba(26,86,219,0.06)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 13, color: T.textDim, fontWeight: 600, marginBottom: 6, display: 'block' }}>
                    Service of interest
                  </label>
                  <select
                    value={form.service} onChange={set('service')}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(26,86,219,0.55)'; e.target.style.background = 'rgba(26,86,219,0.06)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                  >
                    <option value="">Select a service…</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 13, color: T.textDim, fontWeight: 600, marginBottom: 6, display: 'block' }}>
                    Message *
                  </label>
                  <textarea
                    required value={form.message} onChange={set('message')}
                    placeholder="Tell me a bit about your situation — what you're facing, what you've already tried, and what success looks like for you."
                    rows={5} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(26,86,219,0.55)'; e.target.style.background = 'rgba(26,86,219,0.06)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    fontFamily: FF, fontSize: 15, fontWeight: 700, color: '#fff',
                    background: status === 'sending' ? T.textDim : grad.primary,
                    border: 'none', borderRadius: 9, padding: '14px 0',
                    width: '100%', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 16px rgba(26,86,219,0.3)',
                  }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>

                {status === 'error' && (
                  <div style={{ fontSize: 13, color: T.error, textAlign: 'center' }}>
                    Couldn't send. <a href="mailto:gazc@cy-sec.co.uk" style={{ color: T.primary }}>Email me directly</a> instead.
                  </div>
                )}

                <p style={{ fontSize: 12, color: T.textDim, textAlign: 'center' }}>
                  Your details are handled in accordance with our{' '}
                  <a href="/privacy" style={{ color: T.primary }}>Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid { }
        .form-row { }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

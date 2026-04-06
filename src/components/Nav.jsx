import React, { useState, useEffect } from 'react'
import { T, grad } from '../theme'

const FF = T.FF

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Services',     href: '#services'    },
    { label: 'Credentials',  href: '#credentials' },
    { label: 'Platforms',    href: '#platforms'   },
    { label: 'Training',     href: '#training'    },
    { label: 'Contact',      href: '#contact'     },
  ]

  const s = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      transition: 'all 0.3s',
      background: scrolled ? 'rgba(5,16,31,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${T.border}` : '1px solid transparent',
    },
    inner: {
      maxWidth: 1160, margin: '0 auto',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', height: 64,
    },
    logo: {
      fontFamily: FF, fontWeight: 800, fontSize: 20,
      letterSpacing: '-0.03em', color: T.text, display: 'flex', alignItems: 'center', gap: 8,
    },
    logoAccent: {
      background: grad.accent, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    },
    links: { display: 'flex', alignItems: 'center', gap: 4 },
    link: {
      fontFamily: FF, fontSize: 14, fontWeight: 600, color: T.textMid,
      padding: '6px 12px', borderRadius: 7, transition: 'all 0.15s',
      border: 'none', background: 'transparent',
    },
    cta: {
      fontFamily: FF, fontSize: 14, fontWeight: 700, color: '#fff',
      background: grad.primary, border: 'none', borderRadius: 8,
      padding: '8px 18px', transition: 'all 0.2s',
      boxShadow: '0 4px 14px rgba(26,86,219,0.3)',
    },
    burger: {
      display: 'none', flexDirection: 'column', gap: 4, background: 'none',
      border: 'none', padding: 6, cursor: 'pointer',
    },
    bar: { width: 22, height: 2, background: T.textMid, borderRadius: 2, transition: 'all 0.2s' },
    mobile: {
      position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
      background: 'rgba(5,16,31,0.98)', backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 8, zIndex: 199,
    },
    mobileLink: {
      fontFamily: FF, fontSize: 24, fontWeight: 700, color: T.textMid,
      padding: '12px 24px', borderRadius: 10, width: '100%', maxWidth: 280,
      textAlign: 'center', border: 'none', background: 'transparent',
      transition: 'color 0.15s',
    },
    mobileCta: {
      fontFamily: FF, fontSize: 16, fontWeight: 700, color: '#fff',
      background: grad.primary, border: 'none', borderRadius: 10,
      padding: '14px 32px', marginTop: 12,
      boxShadow: '0 4px 16px rgba(26,86,219,0.35)',
    },
  }

  return (
    <>
      <style>{`
        .nav-link:hover { color: #E2EEF9 !important; background: rgba(255,255,255,0.05) !important; }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,86,219,0.45) !important; }
        .burger { display: none; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-desktop-cta { display: none !important; }
          .burger { display: flex !important; }
        }
        .mobile-link:hover { color: #E2EEF9 !important; }
      `}</style>

      <nav style={s.nav}>
        <div style={s.inner}>
          {/* Logo */}
          <a href="/" style={s.logo}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="7" fill="rgba(26,86,219,0.15)" stroke="rgba(26,86,219,0.3)" strokeWidth="1"/>
              <path d="M8 10h5l3 8 3-8h5" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 6v16" stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
            </svg>
            <span>Cy-Sec<span style={s.logoAccent}>.</span></span>
          </a>

          {/* Desktop links */}
          <div className="nav-links" style={s.links}>
            {links.map(l => (
              <a key={l.label} href={l.href} className="nav-link" style={s.link}>{l.label}</a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="#contact" className="nav-cta nav-desktop-cta" style={s.cta}>
            Book Discovery Call
          </a>

          {/* Mobile burger */}
          <button className="burger" style={s.burger} onClick={() => setOpen(o => !o)}>
            <span style={{...s.bar, transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none'}} />
            <span style={{...s.bar, opacity: open ? 0 : 1}} />
            <span style={{...s.bar, transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none'}} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={s.mobile} onClick={() => setOpen(false)}>
          {links.map(l => (
            <a key={l.label} href={l.href} className="mobile-link" style={s.mobileLink}>{l.label}</a>
          ))}
          <a href="#contact" style={s.mobileCta}>Book Discovery Call</a>
        </div>
      )}
    </>
  )
}

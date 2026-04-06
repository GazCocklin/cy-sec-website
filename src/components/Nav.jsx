import React, { useState, useEffect } from 'react'

const FF = `'Bricolage Grotesque', sans-serif`

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Services',    href: '#services'   },
    { label: 'Products',    href: '#products'   },
    { label: 'PBQ Packs',   href: '#catalogue'  },
    { label: 'Why Cy-Sec',  href: '#why'        },
    { label: 'Contact',     href: '#contact'    },
  ]

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: all 0.3s;
        }
        .nav.scrolled {
          background: rgba(6,11,24,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px; height: 64px;
        }
        .nav-logo {
          font-family: ${FF};
          font-size: 20px; font-weight: 800; letter-spacing: -0.5px;
          background: linear-gradient(135deg, #e8edf5, #7BA3C8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .nav-logo span { color: #1a6fc4; -webkit-text-fill-color: #1a6fc4; }
        .nav-links { display: flex; align-items: center; gap: 8px; }
        .nav-link {
          font-size: 13px; font-weight: 500; color: #b8c5d8;
          padding: 6px 12px; border-radius: 6px;
          transition: all 0.15s;
          background: transparent; border: none;
        }
        .nav-link:hover { color: #e8edf5; background: rgba(255,255,255,0.06); }
        .nav-cta {
          font-size: 13px; font-weight: 700;
          color: #fff; background: linear-gradient(135deg, #1a6fc4, #0ea5e9);
          padding: 8px 18px; border-radius: 7px; border: none;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(26,111,196,0.3);
        }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(26,111,196,0.4); }
        .nav-hamburger {
          display: none; flex-direction: column; gap: 4px;
          background: transparent; border: none; padding: 4px; cursor: pointer;
        }
        .nav-hamburger span {
          display: block; width: 22px; height: 2px;
          background: #b8c5d8; border-radius: 1px; transition: all 0.2s;
        }
        .mobile-menu {
          display: none; position: fixed; top: 64px; left: 0; right: 0;
          background: rgba(6,11,24,0.98); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 20px 24px 24px; flex-direction: column; gap: 8px;
          z-index: 99;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          font-size: 16px; font-weight: 500; color: #b8c5d8;
          padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color 0.15s;
        }
        .mobile-menu a:hover { color: #e8edf5; }
        .mobile-menu-cta {
          margin-top: 8px; font-size: 15px; font-weight: 700;
          color: #fff; background: linear-gradient(135deg, #1a6fc4, #0ea5e9);
          padding: 14px 0; border-radius: 9px; border: none;
          text-align: center; cursor: pointer;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">Cy<span>-</span>Sec</a>
          <div className="nav-links">
            {links.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
            <a href="#contact" className="nav-cta">Book a Call</a>
          </div>
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <a href="#contact" className="mobile-menu-cta" onClick={() => setMenuOpen(false)}>
          Book a Free Call
        </a>
      </div>
    </>
  )
}

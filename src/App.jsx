import React, { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Credentials from './sections/Credentials'
import Platforms from './sections/Platforms'
import Training from './sections/Training'
import Compliance from './sections/Compliance'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import { T } from './theme'

const GLOBAL = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: #05101F;
    color: #E2EEF9;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(26,86,219,0.4); border-radius: 2px; }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; cursor: pointer; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .fu1 { animation: fadeUp 0.55s 0.00s ease both; }
  .fu2 { animation: fadeUp 0.55s 0.10s ease both; }
  .fu3 { animation: fadeUp 0.55s 0.20s ease both; }
  .fu4 { animation: fadeUp 0.55s 0.30s ease both; }
  .fu5 { animation: fadeUp 0.55s 0.40s ease both; }
  .fu6 { animation: fadeUp 0.55s 0.50s ease both; }

  input, textarea, select {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    color: #E2EEF9;
    padding: 11px 14px;
    width: 100%;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  input:focus, textarea:focus, select:focus {
    border-color: rgba(26,86,219,0.55);
    background: rgba(26,86,219,0.06);
  }
  input::placeholder, textarea::placeholder { color: #64748B; }
  select option { background: #071624; color: #E2EEF9; }
  label { font-size: 13px; color: #94A3B8; font-weight: 500; margin-bottom: 6px; display: block; }
`

function getPage() {
  const p = window.location.pathname
  if (p === '/privacy') return 'privacy'
  if (p === '/terms') return 'terms'
  return 'home'
}

export default function App() {
  const [page, setPage] = useState(getPage)
  useEffect(() => {
    const onPop = () => setPage(getPage())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (page === 'privacy') return (<><style>{GLOBAL}</style><Nav /><PrivacyPolicy /><Footer /></>)
  if (page === 'terms') return (<><style>{GLOBAL}</style><Nav /><Terms /><Footer /></>)

  return (
    <>
      <style>{GLOBAL}</style>
      <Nav />
      <Hero />
      <Services />
      <Credentials />
      <Platforms />
      <Training />
      <Compliance />
      <Contact />
      <Footer />
    </>
  )
}

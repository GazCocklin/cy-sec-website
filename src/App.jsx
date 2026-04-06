import React, { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Services from './sections/Services'
import WhyCySec from './sections/WhyCySec'
import Products from './sections/Products'
import Catalogue from './sections/Catalogue'
import Urgency from './sections/Urgency'
import Contact from './sections/Contact'
import Footer from './components/Footer'

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: #060b18;
    color: #e8edf5;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #1c2a4a; border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  .fade-up { animation: fadeUp 0.7s ease both; }
  .fade-in { animation: fadeIn 0.5s ease both; }

  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; cursor: pointer; }

  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #3B82F6;
    margin-bottom: 16px;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: #3B82F6;
    border-radius: 1px;
  }
`

export default function App() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhyCySec />
        <Products />
        <Catalogue />
        <Urgency />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

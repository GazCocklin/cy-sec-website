import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import {
  Shield, CheckCircle2, ArrowRight, ShoppingCart, X, Loader2, LogIn, Eye, EyeOff,
  Star, Infinity as InfinityIcon, Zap, RotateCcw, MapPin, Clock, Sparkles,
  Award, Lock, Database, Terminal, BarChart3, Layers,
} from 'lucide-react';

const SUPABASE_URL    = 'https://kmnbtnfgeadvvkwsdyml.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttbmJ0bmZnZWFkdnZrd3NkeW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMTAxNDEsImV4cCI6MjA4Njc4NjE0MX0.T7yHQmQ3qdobyZEAXoAmDptfrj2yH-ZIJ8RfjNOpEFs';
const BASKET_KEY = 'cysec_basket';
const RECENT_KEY = 'cysec_recent';
const RECENT_MAX = 8;

// ── Cert catalogue ───────────────────────────────────────────────────────────
// Five SKUs per cert (Foundation Labs, Advanced Labs, Complete, Exam Engine, Prep Bundle).
// kind field classifies the card for the products grid (bundle / labs / mock / study).
// badgeText is what we show on metadata chips where marketplaces typically show
// rating/sold counts — using honest product metadata instead of fabricated numbers.
const CERTS = [
  {
    key: 'netplus',
    title: 'CompTIA Network+',
    short: 'Network+',
    code: 'N10-009',
    badge: '/logos/comptia-network-plus.svg',
    landingPage: '/comptia-network-plus-labs',
    includes: [
      '10 hands-on CLI simulation labs',
      'Mock exam engine — Study Mode + Exam Mode',
      '1,000 MCQs + 50 PBQs per cert',
      'Lifetime access',
    ],
    pack1: {
      key: 'netplus_pack', label: 'Foundation Labs', sub: 'First 5 labs · foundations', price: 19.99, thumbnail: '/screenshots/fl-netsim.png',
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'DNS server misconfiguration',
        'Default gateway fault diagnosis',
        'DMZ ACL troubleshooting',
        'Dual ACL multi-VLAN routing failure',
        'Enterprise multi-fault recovery',
      ],
    },
    pack2: {
      key: 'netplus_pack_2', label: 'Advanced Labs', sub: 'Next 5 labs · advanced', price: 19.99, thumbnail: '/screenshots/fl-netpulse.png', isNew: true,
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'DHCP scope exhaustion',
        'Port security violation recovery',
        'VLAN trunk misconfiguration (live topology)',
        'Asymmetric routing via NETCAP Analyzer',
        'SNMP multi-site fault triage via NETPULSE NMS',
      ],
    },
    complete:  { key: 'netplus_complete',     label: 'Complete labs',    sub: 'All 10 labs · Foundation + Advanced',        price: 32.99, rrp: 39.98, saving: 6.99, kind: 'labs',   meta: 'Best value labs',   thumbnail: '/screenshots/fl-netcap.png' },
    exam:      { key: 'netplus_exam',         label: 'Exam Engine',      sub: 'Study Mode + Exam Mode · 1,000 MCQs + 50 PBQs',   price: 24.99,                            kind: 'mock',   meta: 'Mock exam + study', thumbnail: '/screenshots/fl-exam-netplus.png' },
    prepBundle:{ key: 'netplus_prep_bundle',  label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine',    price: 39.99, rrp: 64.97, saving: 24.98, kind: 'bundle', meta: 'Most popular',      thumbnail: null },
  },
  {
    key: 'secplus',
    title: 'CompTIA Security+',
    short: 'Security+',
    code: 'SY0-701',
    badge: '/logos/comptia-security-plus.svg',
    landingPage: '/comptia-security-plus-labs',
    includes: [
      '10 hands-on security labs',
      'Mock exam engine — Study Mode + Exam Mode',
      '1,000 MCQs + 50 PBQs per cert',
      'Lifetime access',
    ],
    pack1: {
      key: 'secplus_pack', label: 'Foundation Labs', sub: 'First 5 labs · foundations', price: 19.99, thumbnail: '/screenshots/fl-linux-cli.png',
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'Firewall rule blocking HTTPS traffic',
        'Sensitive file permission hardening',
        'Insecure legacy service exposure',
        'Privilege escalation & audit failure',
        'Post-pentest remediation',
      ],
    },
    pack2: {
      key: 'secplus_pack_2', label: 'Advanced Labs', sub: 'Next 5 labs · advanced', price: 19.99, thumbnail: '/screenshots/fl-fortiguard.png', isNew: true,
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'Stale user account lockdown',
        'Unauthorised service account audit',
        'MFA enforcement (TOTP on SSH bastion)',
        'Firewall policy audit via FORTIGUARD visual',
        'PKI rotation after CA compromise',
      ],
    },
    complete:  { key: 'secplus_complete',     label: 'Complete labs',    sub: 'All 10 labs · Foundation + Advanced',        price: 32.99, rrp: 39.98, saving: 6.99, kind: 'labs',   meta: 'Best value labs',   thumbnail: '/screenshots/fl-linux-cli.png' },
    exam:      { key: 'secplus_exam',         label: 'Exam Engine',      sub: 'Study Mode + Exam Mode · 1,000 MCQs + 50 PBQs',   price: 24.99,                            kind: 'mock',   meta: 'Mock exam + study', thumbnail: null, comingSoon: true },
    prepBundle:{ key: 'secplus_prep_bundle',  label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine',    price: 39.99, rrp: 64.97, saving: 24.98, kind: 'bundle', meta: 'Most popular',      thumbnail: null, comingSoon: true },
  },
  {
    key: 'cysa',
    title: 'CompTIA CySA+',
    short: 'CySA+',
    code: 'CS0-003',
    badge: '/logos/comptia-cysa-plus.svg',
    landingPage: '/comptia-cysa-plus-labs',
    includes: [
      '10 SOC analyst labs',
      'Mock exam engine — Study Mode + Exam Mode',
      '1,000 MCQs + 50 PBQs per cert',
      'Lifetime access',
    ],
    pack1: {
      key: 'cysa_pack', label: 'Foundation Labs', sub: 'First 5 labs · foundations', price: 19.99, thumbnail: '/screenshots/fl-cysa-cli.png',
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'Suspicious process & C2 detection',
        'Web application brute force investigation',
        'SSH brute force containment',
        'Web shell & lateral movement detection',
        'APT threat hunt + firewall containment',
      ],
    },
    pack2: {
      key: 'cysa_pack_2', label: 'Advanced Labs', sub: 'Next 5 labs · advanced', price: 19.99, thumbnail: '/screenshots/fl-siem.png', isNew: true,
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'Internal port scan detection & containment',
        'Malicious cron job persistence removal',
        'SIEM log correlation via Arclight SIEM visual',
        'Vulnerability triage via NETSCAN PRO visual',
        'Credential harvesting & ransomware eradication',
      ],
    },
    complete:  { key: 'cysa_complete',        label: 'Complete labs',    sub: 'All 10 labs · Foundation + Advanced',        price: 32.99, rrp: 39.98, saving: 6.99, kind: 'labs',   meta: 'Best value labs',   thumbnail: '/screenshots/fl-netscan.png' },
    exam:      { key: 'cysa_exam',            label: 'Exam Engine',      sub: 'Study Mode + Exam Mode · 1,000 MCQs + 50 PBQs',   price: 24.99,                            kind: 'mock',   meta: 'Mock exam + study', thumbnail: null, comingSoon: true },
    prepBundle:{ key: 'cysa_prep_bundle',     label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine',    price: 39.99, rrp: 64.97, saving: 24.98, kind: 'bundle', meta: 'Most popular',      thumbnail: null, comingSoon: true },
  },
  // ── A+ Core 1 (220-1201) ───────────────────────────────────────────────────
  // Wired 25-Apr-2026. Updated 25-Apr-2026 to current CompTIA exam codes
  // (220-1201/-1202 superseded the 1101/1102 cycle). Stripe prices live; webhook
  // PACK_LABELS + PREP_BUNDLE_EXPANSION already cover both Cores. Content is
  // sparse at launch, so every SKU is marked comingSoon: true — ribbon shows
  // "LAUNCHING SOON", buyable but honest about content state. No per-Core
  // Complete Labs SKU (the £64.99 dual-core mega bundle below covers all-in).
  // Dedicated landing page: /comptia-aplus-core1-labs.
  {
    key: 'aplus_core1',
    title: 'CompTIA A+ Core 1',
    short: 'A+ Core 1',
    code: '220-1201',
    badge: '/logos/comptia-aplus.svg',
    landingPage: '/comptia-aplus-core1-labs',
    includes: [
      'Hardware, networking, mobile devices',
      'Virtualisation & cloud, troubleshooting',
      'Mock exam engine — Study Mode + Exam Mode',
      'Lifetime access',
    ],
    pack1: {
      key: 'aplus_core1_pack', label: 'Foundation Labs', sub: 'First 5 labs · foundations', price: 19.99, thumbnail: '/screenshots/fl-cysa-cli.png',
      kind: 'labs', meta: '5 PBQ labs', comingSoon: true,
      highlights: [
        'Mobile device sync & connectivity',
        'Network cable & port troubleshooting',
        'Hardware diagnostic workflows',
        'Virtualisation & cloud configuration',
        'Multi-fault hardware/network triage',
      ],
    },
    pack2: {
      key: 'aplus_core1_pack_2', label: 'Advanced Labs', sub: 'Next 5 labs · advanced', price: 19.99, thumbnail: '/screenshots/fl-fortiguard.png',
      kind: 'labs', meta: '5 PBQ labs', isNew: true, comingSoon: true,
      highlights: [
        'Wireless AP misconfiguration',
        'Printer & peripheral fault diagnosis',
        'SOHO router & network share triage',
        'Display & video subsystem repair',
        'End-to-end client diagnostic exercise',
      ],
    },
    exam:      { key: 'aplus_core1_exam',         label: 'Exam Engine',      sub: 'Study Mode + Exam Mode · 1,000 MCQs + 50 PBQs',   price: 24.99,                            kind: 'mock',   meta: 'Mock exam + study', thumbnail: null, comingSoon: true },
    prepBundle:{ key: 'aplus_core1_prep_bundle',  label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine',    price: 39.99, rrp: 64.97, saving: 24.98, kind: 'bundle', meta: 'Most popular',      thumbnail: null, comingSoon: true },
  },
  // ── A+ Core 2 (220-1202) ───────────────────────────────────────────────────
  // Dedicated landing page: /comptia-aplus-core2-labs.
  {
    key: 'aplus_core2',
    title: 'CompTIA A+ Core 2',
    short: 'A+ Core 2',
    code: '220-1202',
    badge: '/logos/comptia-aplus.svg',
    landingPage: '/comptia-aplus-core2-labs',
    includes: [
      'Operating systems, Windows admin',
      'Security, software troubleshooting',
      'Mock exam engine — Study Mode + Exam Mode',
      'Lifetime access',
    ],
    pack1: {
      key: 'aplus_core2_pack', label: 'Foundation Labs', sub: 'First 5 labs · foundations', price: 19.99, thumbnail: '/screenshots/fl-linux-cli.png',
      kind: 'labs', meta: '5 PBQ labs', comingSoon: true,
      highlights: [
        'Windows account & permission audit',
        'Defender quarantine & malware response',
        'OS recovery & boot troubleshooting',
        'User profile & group policy fixes',
        'Software install/uninstall diagnostics',
      ],
    },
    pack2: {
      key: 'aplus_core2_pack_2', label: 'Advanced Labs', sub: 'Next 5 labs · advanced', price: 19.99, thumbnail: '/screenshots/fl-netscan.png',
      kind: 'labs', meta: '5 PBQ labs', isNew: true, comingSoon: true,
      highlights: [
        'Phishing incident response procedure',
        'Mobile MDM & wipe-on-loss policy',
        'BSOD root-cause investigation',
        'Backup & restore operational drill',
        'End-to-end ransomware containment',
      ],
    },
    exam:      { key: 'aplus_core2_exam',         label: 'Exam Engine',      sub: 'Study Mode + Exam Mode · 1,000 MCQs + 50 PBQs',   price: 24.99,                            kind: 'mock',   meta: 'Mock exam + study', thumbnail: null, comingSoon: true },
    prepBundle:{ key: 'aplus_core2_prep_bundle',  label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine',    price: 39.99, rrp: 64.97, saving: 24.98, kind: 'bundle', meta: 'Most popular',      thumbnail: null, comingSoon: true },
  },
];

// ── A+ Complete (Core 1 + Core 2 mega-bundle) ──────────────────────────────
// NOT a member of CERTS (different shape — spans two Cores, no per-Core SKUs).
// Rendered in the featured bundles row alongside the 5 cert prep bundles.
// Webhook PREP_BUNDLE_EXPANSION expands aplus_complete -> 6 entitlements
// (4 packs + 2 exam engines across both Cores).
const APLUS_MEGA = {
  key: 'aplus_complete_virtual_cert',
  title: 'CompTIA A+ Complete',
  short: 'A+ Complete',
  code: '220-1201 + 220-1202',
  badge: '/logos/comptia-aplus.svg',
  landingPage: '/store',
  prepBundle: {
    key: 'aplus_complete',
    label: 'A+ Complete (Core 1 + Core 2)',
    cardTitle: 'A+ Complete (both Cores)',
    sub: 'Both Cores · 20 labs + 2 Exam Engines',
    countChip: '20 labs · 2 Exam Engines',
    price: 64.99,
    rrp: 129.94,
    saving: 64.95,
    kind: 'bundle',
    meta: 'Full A+ certification',
    thumbnail: null,
    comingSoon: true,
  },
};

// Map each product key back to its cert + config (used by basket bar, recently viewed, etc.)
const KEY_LOOKUP = (() => {
  const out = {};
  for (const cert of CERTS) {
    for (const opt of ['pack1','pack2','complete','exam','prepBundle']) {
      // A+ Cores have no per-Core Complete Labs SKU; skip cleanly.
      if (!cert[opt]) continue;
      out[cert[opt].key] = { cert, option: opt, config: cert[opt] };
    }
  }
  // Cross-cert A+ mega bundle (not in CERTS — different shape, spans both Cores)
  out[APLUS_MEGA.prepBundle.key] = { cert: APLUS_MEGA, option: 'prepBundle', config: APLUS_MEGA.prepBundle };
  return out;
})();

// Flat product list for the main grid (excludes prep bundles — those get their
// own featured section). Ordered: Complete, Exam, Foundation Labs, Advanced Labs per cert.
// .filter(Boolean) drops undefined entries (A+ Cores have no per-Core Complete SKU).
const GRID_PRODUCTS = CERTS.flatMap(cert => [
  cert.complete && { cert, config: cert.complete },
  cert.exam     && { cert, config: cert.exam },
  cert.pack1    && { cert, config: cert.pack1 },
  cert.pack2    && { cert, config: cert.pack2 },
].filter(Boolean));

// ── localStorage helpers ─────────────────────────────────────────────────────
function loadBasket()  { try { return JSON.parse(localStorage.getItem(BASKET_KEY) || '[]'); } catch { return []; } }
function saveBasket(i) { try { localStorage.setItem(BASKET_KEY, JSON.stringify(i)); } catch {} }
function sanitiseBasket(basket) { return (basket || []).filter(k => KEY_LOOKUP[k]); }

function loadRecent()  { try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { return []; } }
function saveRecent(i) { try { localStorage.setItem(RECENT_KEY, JSON.stringify(i)); } catch {} }
function sanitiseRecent(r) { return (r || []).filter(k => KEY_LOOKUP[k]).slice(0, RECENT_MAX); }
function addRecent(productKey, current) {
  if (!KEY_LOOKUP[productKey]) return current || [];
  const filtered = (current || []).filter(k => k !== productKey && KEY_LOOKUP[k]);
  return [productKey, ...filtered].slice(0, RECENT_MAX);
}

function basketTotal(basket) {
  return basket.reduce((t, k) => t + (KEY_LOOKUP[k]?.config.price || 0), 0);
}

// ── Stripe trigger ────────────────────────────────────────────────────────────
async function triggerStripe(basketItems, currentSession) {
  if (!basketItems.length || !currentSession) return;
  const isMulti = basketItems.length > 1;
  const res = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${currentSession.access_token}` },
    body: JSON.stringify({
      product_key:  !isMulti ? basketItems[0] : undefined,
      product_keys: isMulti  ? basketItems : undefined,
      cancel_url: 'https://cy-sec.co.uk/store',
    }),
  });
  const data = await res.json();
  if (data.url) { localStorage.removeItem(BASKET_KEY); window.location.href = data.url; }
  return data;
}

// ── Checkout modal (unchanged from v2) ───────────────────────────────────────
function CheckoutModal({ basket, onClose }) {
  const [tab,       setTab]      = useState('signin');
  const [email,     setEmail]    = useState('');
  const [password,  setPassword] = useState('');
  const [confirm,   setConfirm]  = useState('');
  const [showPw,    setShowPw]   = useState(false);
  const [loading,   setLoading]  = useState(false);
  const [error,     setError]    = useState('');
  const [stage,     setStage]    = useState('form');
  const emailRef = useRef(null);

  useEffect(() => { emailRef.current?.focus(); }, [tab]);

  const displayPrice = basketTotal(basket);

  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true); setError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    setStage('launching');
    const result = await triggerStripe(basket, data.session);
    if (!result?.url) { setError('Checkout unavailable — please try again.'); setStage('form'); setLoading(false); }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 8)  { setError('Password must be at least 8 characters.'); return; }
    setLoading(true); setError('');
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    if (data.session) {
      setStage('launching');
      const result = await triggerStripe(basket, data.session);
      if (!result?.url) { setError('Checkout unavailable — please try again.'); setStage('form'); setLoading(false); }
    } else {
      setStage('confirm');
    }
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent";

  if (stage === 'launching') return (
    <ModalShell onClose={null}>
      <div className="text-center py-8">
        <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: '#0891B2' }} />
        <p className="font-semibold text-slate-800 text-lg">Setting up your checkout…</p>
        <p className="text-slate-500 text-sm mt-2">You'll be redirected to Stripe in a moment.</p>
      </div>
    </ModalShell>
  );

  if (stage === 'confirm') return (
    <ModalShell onClose={onClose}>
      <div className="text-center py-4">
        <div className="text-4xl mb-4">📧</div>
        <p className="font-bold text-slate-900 text-lg mb-2">Check your email</p>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          We've sent a confirmation link to <strong>{email}</strong>.<br />
          After confirming, return to this page and sign in to complete your purchase.
        </p>
        <p className="text-xs text-slate-400">Your basket will be waiting here.</p>
        <button onClick={onClose} className="mt-6 text-sm font-semibold" style={{ color: '#0891B2' }}>Back to store</button>
      </div>
    </ModalShell>
  );

  return (
    <ModalShell onClose={onClose}>
      <div className="text-center mb-6">
        <img src="/logos/fortifylearn-logo.svg" alt="FortifyLearn" className="h-7 mx-auto mb-3"
          onError={e => { e.target.style.display='none'; }} />
        <h2 className="text-xl font-bold text-slate-900">
          {tab === 'signin' ? 'Sign in to complete your purchase' : 'Create your FortifyLearn account'}
        </h2>
        <p className="text-slate-500 text-xs mt-1">
          {tab === 'signin'
            ? 'Use your FortifyLearn credentials to proceed to checkout.'
            : 'One account for both the store and FortifyLearn labs.'}
        </p>
      </div>
      <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
        {[['signin','Sign In'],['signup','Create Account']].map(([t, label]) => (
          <button key={t} onClick={() => { setTab(t); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}>{label}</button>
        ))}
      </div>
      <form onSubmit={tab === 'signin' ? handleSignIn : handleSignUp} className="space-y-3">
        <input ref={emailRef} type="email" required placeholder="Email address"
          value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
        <div className="relative">
          <input type={showPw ? 'text' : 'password'} required placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} className={inputCls} />
          <button type="button" onClick={() => setShowPw(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {tab === 'signup' && (
          <input type="password" required placeholder="Confirm password" minLength={8}
            value={confirm} onChange={e => setConfirm(e.target.value)} className={inputCls} />
        )}
        {error && <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
          {loading ? 'Please wait…'
            : tab === 'signin' ? `Sign In & Pay £${displayPrice.toFixed(2)}`
            : `Create Account & Pay £${displayPrice.toFixed(2)}`}
        </button>
      </form>
      <p className="text-center text-xs text-slate-400 mt-4">
        {tab === 'signin'
          ? <>No account? <button onClick={() => { setTab('signup'); setError(''); }} className="font-semibold" style={{ color: '#0891B2' }}>Create one free</button></>
          : <>Already have an account? <button onClick={() => { setTab('signin'); setError(''); }} className="font-semibold" style={{ color: '#0891B2' }}>Sign in</button></>
        }
      </p>
      <p className="text-center text-xs text-slate-300 mt-2">🔒 Secure payment via Stripe</p>
    </ModalShell>
  );
}

function ModalShell({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative">
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

// ── Utility announcement strip ───────────────────────────────────────────────
function UtilityStrip() {
  return (
    <div className="hidden sm:flex items-center justify-between text-xs px-4 py-2"
      style={{ background: '#071530', color: 'rgba(255,255,255,0.72)' }}>
      <div className="flex items-center gap-3">
        <span>UK-based support</span>
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
        <span>14-day refund</span>
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
        <span>CompTIA Authorised Partner</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="/contact" className="hover:text-white transition-colors">Help</a>
        <a href="mailto:fortifylearn@cy-sec.co.uk" className="transition-colors" style={{ color: '#7DD3E8' }}>Contact us</a>
      </div>
    </div>
  );
}

// ── Hero promo banner ────────────────────────────────────────────────────────
function PromoHero({ onShopBundles }) {
  return (
    <div className="relative overflow-hidden rounded-2xl flex flex-col sm:flex-row"
      style={{ background: 'linear-gradient(135deg,#0B1D3A 0%,#0E5F8A 50%,#0891B2 100%)', minHeight: 230, color: '#fff' }}>
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(to right,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative flex-[1.5] p-8 sm:p-10 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full mb-4 border text-[10px] font-bold tracking-widest uppercase"
          style={{ background: 'rgba(125,211,232,0.18)', borderColor: 'rgba(125,211,232,0.35)', color: '#7DD3E8' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7DD3E8', display: 'inline-block' }} />
          Exam Prep Bundle · Limited offer
        </div>
        <h1 className="font-black leading-none mb-3" style={{ fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-1px' }}>
          Save £24.98 on<br />exam-ready prep.
        </h1>
        <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-md">
          Real CLI labs and a full mock exam engine with Study Mode + Exam Mode — bundled for every CompTIA cert in our catalogue.
          One price. Lifetime access.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <button onClick={onShopBundles}
            className="bg-white text-slate-900 rounded-xl font-bold text-sm transition-all hover:brightness-95"
            style={{ padding: '10px 20px' }}>
            Shop bundles →
          </button>
          <span className="text-xs text-white/65">
            From <strong className="text-white text-sm">£39.99</strong>
            <span className="text-white/35 mx-2">·</span>
            <s className="text-white/35">£64.97</s>
          </span>
        </div>
      </div>
      <div className="relative flex-1 hidden sm:block overflow-hidden" style={{ minHeight: 230 }}>
        {/* CySA+ Arclight SIEM dashboard — communicates 'real advanced tool' at a glance */}
        <img src="/screenshots/fl-siem.png"
          alt="Arclight SIEM — a real tool inside FortifyLearn's CySA+ labs"
          className="absolute block"
          loading="lazy"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: '78%', maxWidth: '92%',
            borderRadius: 10,
            boxShadow: '0 20px 45px rgba(0,0,0,0.45), 0 0 0 1px rgba(125,211,232,0.12)',
          }} />

        {/* SAVE £24.98 — prominent value pill, top-left */}
        <div className="absolute z-10 font-extrabold rounded-md shadow-lg"
          style={{
            top: 20, left: 20,
            background: '#FDE8E8', color: '#A91818',
            fontSize: 11, padding: '5px 11px',
            letterSpacing: '0.02em',
          }}>
          SAVE £24.98
        </div>

        {/* 37% off — secondary reinforcement, top-right */}
        <div className="absolute z-10 font-extrabold rounded-full"
          style={{
            top: 20, right: 20,
            background: '#7DD3E8', color: '#0B1D3A',
            fontSize: 10, padding: '4px 10px',
            letterSpacing: '0.02em',
          }}>
          38% OFF
        </div>

        {/* Caption — so viewers know what they're looking at */}
        <div className="absolute z-10 text-[9px] font-bold tracking-wider uppercase"
          style={{ bottom: 18, left: 20, color: 'rgba(255,255,255,0.6)' }}>
          CySA+ · Arclight SIEM
        </div>

        {/* Pricing disclaimer preserved bottom-right */}
        <div className="absolute text-[10px] text-white/50" style={{ bottom: 16, right: 20 }}>
          *bundle pricing
        </div>
      </div>
    </div>
  );
}

// ── Featured prep bundle card ────────────────────────────────────────────────
function FeaturedBundleCard({ cert, inBasket, onToggle, onShowDetails }) {
  const { prepBundle } = cert;
  return (
    <div className="bg-white rounded-2xl overflow-hidden relative flex flex-col"
      style={{ border: '2px solid #0891B2' }}>
      <div className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 z-10 px-2.5 py-1 rounded"
        style={{ background: '#0891B2', color: '#fff' }}>
        <Star className="w-3 h-3" /> Recommended
      </div>
      <div className="relative flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#E6F7FB,#F4F7FA)', height: 110 }}>
        <img src={cert.badge} alt={cert.title} className="object-contain"
          style={{ width: 72, height: 72 }} onError={e => { e.target.style.display='none'; }} />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-sm font-bold text-slate-900 mb-0.5">{prepBundle.cardTitle || `${cert.short} Prep Bundle`}</p>
        <p className="text-xs text-slate-500 mb-3">{prepBundle.sub || 'Labs + Exam Engine'}</p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-black text-slate-900" style={{ letterSpacing: '-0.5px' }}>£{prepBundle.price.toFixed(2)}</span>
          <span className="text-sm text-slate-400 line-through">£{prepBundle.rrp.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-extrabold px-2 py-1 rounded"
            style={{ background: '#FDE8E8', color: '#A91818' }}>
            SAVE £{prepBundle.saving.toFixed(2)}
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">{prepBundle.countChip || '10 labs · Study + Exam Mode'}</span>
        </div>
        <button onClick={() => onToggle(prepBundle.key)}
          className={`mt-auto w-full py-2.5 rounded-lg text-sm font-bold transition-all ${
            inBasket
              ? 'bg-cyan-600 text-white hover:bg-cyan-700'
              : 'text-white hover:brightness-110'
          }`}
          style={inBasket ? {} : { background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
          {inBasket ? '✓ In basket' : 'Add bundle →'}
        </button>
        {onShowDetails && (
          <button onClick={onShowDetails}
            className="mt-2 w-full text-[11px] font-semibold text-slate-500 hover:text-cyan-700 transition-colors py-1">
            What's inside the bundle →
          </button>
        )}
      </div>
    </div>
  );
}

// ── Certification filter pill (rail above products grid) ────────────────────
function CertPill({ cert, active, onClick }) {
  return (
    <button onClick={() => onClick(cert.key)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all"
      style={active
        ? { background: '#0B1D3A', color: '#fff', boxShadow: '0 1px 3px rgba(11,29,58,0.18)' }
        : { background: '#fff', color: '#0B1D3A', border: '1px solid rgba(11,29,58,0.14)' }}>
      <img src={cert.badge} alt="" className="w-4 h-4 object-contain"
        onError={e => { e.target.style.display='none'; }} />
      {cert.short}
    </button>
  );
}

// ── Product card (main grid) ─────────────────────────────────────────────────
function ProductCard({ cert, config, inBasket, onToggle, onShowDetails }) {
  const isComplete = config.key.endsWith('_complete');
  const isExam     = config.key.endsWith('_exam');
  // Default = labs (pack1 / pack2 / aplus_core1_pack / etc)
  const TypeIcon = isExam ? BarChart3 : (isComplete ? Layers : Terminal);

  // Top-right pill: discount on Complete, NEW on isNew SKUs (mutually exclusive)
  let topRightPill = null;
  if (isComplete && config.saving) {
    const pct = Math.round((config.saving / config.rrp) * 100);
    topRightPill = { text: `-${pct}%`, bg: '#FDE8E8', color: '#A91818' };
  } else if (config.isNew && !config.comingSoon) {
    topRightPill = { text: 'NEW', bg: 'rgba(125,211,232,0.20)', color: '#7DD3E8' };
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col border border-slate-200 hover:border-cyan-400 hover:shadow-sm transition-all">
      {/* Branded thumbnail block — clickable, opens details */}
      <button onClick={onShowDetails}
        className="relative h-[100px] flex items-center justify-center w-full group overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0B1D3A,#0E5F8A 65%,#0891B2)' }}>
        {/* Cert tag (top-left) */}
        <span className="absolute top-2 left-2 text-[8.5px] font-extrabold uppercase tracking-wider"
          style={{ color: 'rgba(125,211,232,0.92)' }}>
          {cert.short} · {cert.code}
        </span>

        {/* Centered type icon */}
        <TypeIcon size={36} strokeWidth={1.5} color="rgba(255,255,255,0.82)"
          className="transition-transform duration-200 group-hover:scale-110" />

        {/* Top-right pill */}
        {topRightPill && (
          <span className="absolute top-2 right-2 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded"
            style={{ background: topRightPill.bg, color: topRightPill.color }}>
            {topRightPill.text}
          </span>
        )}

        {/* Coming soon ribbon */}
        {config.comingSoon && (
          <div className="absolute bottom-0 left-0 right-0 text-center text-[8.5px] font-extrabold py-0.5"
            style={{ background: 'rgba(245,158,11,0.92)', color: '#1c1917', letterSpacing: '1px' }}>
            LAUNCHING SOON
          </div>
        )}
      </button>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[12.5px] font-bold text-slate-900 leading-snug mb-0.5">
          {config.label}
        </p>
        <p className="text-[10.5px] text-slate-500 mb-3 line-clamp-2" style={{ minHeight: 26 }}>
          {config.sub || config.meta}
        </p>
        <div className="flex items-end justify-between gap-2 mt-auto">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-base font-black text-slate-900" style={{ letterSpacing: '-0.3px', lineHeight: 1 }}>
              £{config.price.toFixed(2)}
            </span>
            {config.rrp != null && (
              <span className="text-[10px] text-slate-400 line-through">£{config.rrp.toFixed(2)}</span>
            )}
          </div>
          <button onClick={(e) => { e.stopPropagation(); onToggle(config.key); }}
            className={`flex-shrink-0 px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all ${
              inBasket
                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                : 'text-white hover:brightness-110'
            }`}
            style={inBasket ? {} : { background: '#0B1D3A' }}>
            {inBasket ? '✓' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Product details modal ────────────────────────────────────────────────────
// Click "What's inside →" on any card to see what's actually in the SKU.
// Content is derived from the config/cert — pack1/2 show highlights arrays,
// complete shows both, exam shows the Study + Exam mode breakdown, prepBundle itemises.
function ProductDetailsModal({ cert, config, inBasket, onToggle, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEsc);
    return () => { document.body.style.overflow = prevOverflow; document.removeEventListener('keydown', handleEsc); };
  }, [onClose]);

  // Build the "what's inside" content per SKU type
  const isPackOne  = config.key.endsWith('_pack');
  const isPackTwo  = config.key.endsWith('_pack_2');
  const isComplete = config.key.endsWith('_complete');
  const isExam     = config.key.endsWith('_exam');
  const isBundle   = config.key.endsWith('_prep_bundle');
  const isAplusMega = config.key === 'aplus_complete';

  const sections = []; // { title: string, items: string[], desc?: string }

  if (isPackOne && cert.pack1?.highlights) {
    sections.push({ title: 'What you\'ll practise', items: cert.pack1.highlights });
  } else if (isPackTwo && cert.pack2?.highlights) {
    sections.push({ title: 'What you\'ll practise', items: cert.pack2.highlights });
  } else if (isComplete) {
    if (cert.pack1?.highlights) sections.push({ title: 'Foundation Labs', items: cert.pack1.highlights });
    if (cert.pack2?.highlights) sections.push({ title: 'Advanced Labs', items: cert.pack2.highlights });
  } else if (isExam) {
    sections.push({
      title: 'Study Mode',
      items: [
        '1,000 MCQs per cert, mapped to every exam objective',
        'Instant feedback after every answer with full reasoning',
        'Per-option "why this is wrong" explanations on every distractor',
        'Objective tags so you can drill specific weak domains',
        'Self-paced — no timer, no pressure',
      ],
    });
    sections.push({
      title: 'Exam Mode',
      items: [
        '3–6 real performance-based questions (PBQs) per session',
        '85–90 multiple-choice questions per session',
        'One combined timer — mirrors the real CompTIA exam',
        'Unlimited replays — every attempt shuffles a fresh mix',
      ],
    });
    sections.push({
      title: 'Question pool',
      items: [
        '50 exam-grade PBQs per cert',
        '1,000 MCQs per cert (Study Mode practises with these directly)',
        'Exam Mode draws a separate randomised subset to keep your mocks fair',
        'Pool expands as we author new content — all included, no upsell',
      ],
    });
    sections.push({
      title: 'Scoring & diagnostics',
      items: [
        'Scaled score 100–900 with a configurable pass threshold',
        'Per-domain breakdown so you know where you\'re strong or weak',
        'Focus-three weakest domains surfaced at the end of each attempt',
        'Targeted study recommendations based on your performance',
      ],
    });
    sections.push({
      title: 'The honesty bit',
      desc: 'Our score is an approximation of CompTIA\'s scaled score with a ±50 point margin. It\'s designed to tell you if you\'re exam-ready, not to predict your exact score on the day. Use it as a readiness signal.',
    });
  } else if (isAplusMega) {
    sections.push({
      title: 'What\'s included — both A+ Cores',
      items: [
        'A+ Core 1 (220-1201) Foundation Labs — 5 PBQs',
        'A+ Core 1 (220-1201) Advanced Labs — 5 PBQs',
        'A+ Core 1 Exam Engine — Study + Exam Mode',
        'A+ Core 2 (220-1202) Foundation Labs — 5 PBQs',
        'A+ Core 2 (220-1202) Advanced Labs — 5 PBQs',
        'A+ Core 2 Exam Engine — Study + Exam Mode',
      ],
    });
    sections.push({
      title: 'Why the bundle',
      desc: `Both Cores à la carte costs £${(19.99*4 + 24.99*2).toFixed(2)}. The Complete bundle is £${config.price.toFixed(2)} — you save £${config.saving.toFixed(2)} (50% off). Earn the full CompTIA A+ certification with one purchase. Lifetime access.`,
    });
  } else if (isBundle) {
    sections.push({
      title: 'What\'s included',
      items: [
        `Foundation Labs — 5 PBQs (£19.99 value)`,
        `Advanced Labs — 5 PBQs (£19.99 value)`,
        `Exam Engine — Study Mode + Exam Mode (£24.99 value)`,
      ],
    });
    sections.push({
      title: 'Why the bundle',
      desc: `Buying the three items separately costs £${(19.99+19.99+24.99).toFixed(2)}. The bundle is £${config.price.toFixed(2)} — you save £${config.saving.toFixed(2)}. Same lifetime access, same content, just a better price.`,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(11, 29, 58, 0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}>
        {/* Thumbnail banner (or fallback gradient with cert badge) */}
        <div className="relative" style={{ height: 180, overflow: 'hidden' }}>
          {config.thumbnail ? (
            <img src={config.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center top' }} />
          ) : (
            <div className="flex items-center justify-center h-full"
              style={{ background: 'linear-gradient(135deg,#0B1D3A,#0E5F8A,#0891B2)' }}>
              <img src={cert.badge} alt={cert.title} className="object-contain"
                style={{ width: 96, height: 96 }} onError={e => { e.target.style.display='none'; }} />
            </div>
          )}
          <button onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-md hover:bg-white transition-colors"
            aria-label="Close details">
            <X className="w-4 h-4 text-slate-900" />
          </button>
          {config.thumbnail && (
            <div className="absolute top-3 left-3 bg-white/95 rounded-md flex items-center gap-1.5 px-2 py-1 shadow-sm"
              style={{ border: '1px solid rgba(11,29,58,0.08)' }}>
              <img src={cert.badge} alt="" className="w-5 h-5 object-contain"
                onError={e => { e.target.style.display='none'; }} />
              <span className="text-[10px] font-extrabold text-slate-900 tracking-wide">{cert.short}</span>
            </div>
          )}
        </div>
        {/* Body */}
        <div className="p-6">
          <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">{cert.short} &middot; {cert.code}</p>
          <h2 className="text-xl font-black text-slate-900 mb-1" style={{ letterSpacing: '-0.3px' }}>{config.label}</h2>
          <p className="text-sm text-slate-600 mb-4">{config.sub}</p>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-5 pb-5 border-b border-slate-100">
            <span className="text-3xl font-black text-slate-900" style={{ letterSpacing: '-0.5px' }}>£{config.price.toFixed(2)}</span>
            {config.rrp != null && (
              <span className="text-base text-slate-400 line-through">£{config.rrp.toFixed(2)}</span>
            )}
            {config.saving != null && (
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded ml-1"
                style={{ background: '#FDE8E8', color: '#A91818' }}>SAVE £{config.saving.toFixed(2)}</span>
            )}
          </div>
          {/* Launching soon notice — content-gated SKUs */}
          {config.comingSoon && (
            <div className="mb-5 p-3 rounded-lg flex items-start gap-2.5"
              style={{ background: '#FEF3C7', border: '1px solid #F59E0B' }}>
              <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#92400E' }} />
              <div className="text-xs text-amber-900 leading-snug">
                <p className="font-bold mb-1">Content launching soon</p>
                <p>We're authoring the {cert.short} question pool now — Network+ is live today, {cert.short} follows. You can purchase now for lifetime access; we'll email you the moment the full content unlocks.</p>
              </div>
            </div>
          )}
          {/* Sections */}
          {sections.map((section, idx) => (
            <div key={idx} className={idx < sections.length - 1 ? 'mb-5' : ''}>
              <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">{section.title}</p>
              {section.desc && (
                <p className="text-sm text-slate-700 leading-relaxed">{section.desc}</p>
              )}
              {section.items && (
                <ul className="space-y-1.5">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-800">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#0891B2' }} />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {/* Lifetime access reassurance */}
          <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <InfinityIcon className="w-4 h-4" style={{ color: '#0891B2' }} />
            <span>Lifetime access &middot; 14-day refund &middot; Instant unlock</span>
          </div>
          {/* CTA */}
          <button onClick={() => { onToggle(config.key); onClose(); }}
            className={`mt-5 w-full py-3 rounded-lg text-sm font-bold transition-all ${
              inBasket
                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                : 'text-white hover:brightness-110'
            }`}
            style={inBasket ? {} : { background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
            {inBasket ? '✓ Added to basket — close' : (isBundle ? 'Add bundle →' : 'Add to basket')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Recently viewed strip ────────────────────────────────────────────────────
function RecentlyViewed({ productKeys, basket, onToggle, onClear }) {
  if (!productKeys || productKeys.length < 2) return null;
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4" style={{ color: '#0891B2' }} />
        <h2 className="text-[15px] font-extrabold text-slate-900" style={{ letterSpacing: '-0.3px' }}>Recently viewed</h2>
        <button onClick={onClear}
          className="ml-auto text-[11px] font-semibold text-slate-400 hover:text-slate-600 transition-colors">
          Clear
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'thin' }}>
        {productKeys.map(k => {
          const lookup = KEY_LOOKUP[k];
          if (!lookup) return null;
          const { cert, config } = lookup;
          const inBasket = basket.includes(k);
          return (
            <div key={k} className="bg-white rounded-xl border border-slate-200 flex-shrink-0 p-3 flex items-center gap-3"
              style={{ width: 260 }}>
              <div className="flex-shrink-0 rounded-lg flex items-center justify-center"
                style={{ width: 48, height: 48, background: '#F4F7FA', border: '1px solid #e5e7eb' }}>
                <img src={cert.badge} alt="" className="object-contain"
                  style={{ width: 34, height: 34 }} onError={e => { e.target.style.display='none'; }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{cert.short} {config.label}</p>
                <p className="text-[11px] text-slate-500 truncate">{config.sub}</p>
                <p className="text-[13px] font-black text-slate-900 mt-0.5" style={{ letterSpacing: '-0.3px' }}>£{config.price.toFixed(2)}</p>
              </div>
              <button onClick={() => onToggle(k)}
                className={`flex-shrink-0 w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  inBasket
                    ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                    : 'border border-slate-200 text-slate-900 hover:border-cyan-500 hover:text-cyan-700'
                }`}
                title={inBasket ? 'Remove from basket' : 'Add to basket'}>
                {inBasket ? '✓' : '+'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Trusted partners strip ───────────────────────────────────────────────────
// Brand-consistent: teal icon, navy name, slate subtitle. Mirrors the features
// trust strip above it. We deliberately don't use vendor brand colours here —
// the site's palette is navy + teal and introducing red/purple/green for each
// partner makes the row look like third-party ads instead of our own signal.
function TrustedPartners() {
  const partners = [
    { title: 'CompTIA',  sub: 'Authorised Partner',  icon: Award },
    { title: 'Stripe',   sub: 'Secure payments',     icon: Lock },
    { title: 'Vercel',   sub: 'Edge-hosted',         icon: Zap },
    { title: 'Supabase', sub: 'EU data residency',   icon: Database },
    { title: 'UK GDPR',  sub: 'ICO registered',      icon: Shield },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4" style={{ color: '#0891B2' }} />
        <h2 className="text-[15px] font-extrabold text-slate-900" style={{ letterSpacing: '-0.3px' }}>Built with trusted partners</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {partners.map(({ title, sub, icon: Icon }) => (
          <div key={title} className="bg-white rounded-xl border border-slate-200 px-3 py-4 text-center">
            <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: '#0891B2' }} strokeWidth={2} />
            <p className="text-xs font-extrabold mb-1 text-slate-900" style={{ letterSpacing: '-0.3px' }}>{title}</p>
            <p className="text-[10px] text-slate-500 font-semibold">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Basket bar (sticky, enhanced) ────────────────────────────────────────────
function BasketBar({ basket, user, authLoading, onRemove, onCheckout, checkoutLoading }) {
  if (basket.length === 0) return null;

  const items = basket
    .map(k => {
      const lookup = KEY_LOOKUP[k];
      if (!lookup) return null;
      const label = `${lookup.cert.short} ${lookup.config.label}`;
      return { key: k, label, price: lookup.config.price };
    })
    .filter(Boolean);

  const total = items.reduce((t, i) => t + i.price, 0);

  const isDisabled = checkoutLoading || authLoading;
  const btnLabel   = checkoutLoading ? 'Processing…' : authLoading ? 'Loading…'
    : user ? `Checkout — £${total.toFixed(2)}` : `Sign in to Checkout — £${total.toFixed(2)}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0B1D3A,#0D2645)' }}>
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 flex-1 flex-wrap">
            <ShoppingCart className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item.key} className="flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                  {item.label}
                  <button
                    onClick={() => onRemove(item.key)}
                    className="text-white/50 hover:text-white ml-0.5 transition-colors"
                    title={`Remove ${item.label}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <p className="text-white/50 text-xs">Total</p>
              <p className="text-white font-black text-xl">£{total.toFixed(2)}</p>
            </div>
            <button onClick={onCheckout} disabled={isDisabled}
              className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-bold text-slate-900 text-sm transition-all hover:brightness-110 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#22d3ee,#0891B2)' }}>
              {checkoutLoading || authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              {btnLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function StorePage() {
  const { user, session, loading: authLoading } = useAuth();
  const [basket,          setBasket]          = useState(() => sanitiseBasket(loadBasket()));
  const [recent,          setRecent]          = useState(() => sanitiseRecent(loadRecent()));
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showModal,       setShowModal]       = useState(false);
  const [error,           setError]           = useState(null);
  const [activeFilter,    setActiveFilter]    = useState('all'); // 'all' | 'netplus' | 'secplus' | 'cysa'
  const [activeProductKind, setActiveProductKind] = useState('all'); // 'all' | 'labs' | 'mock' | 'study'
  const [detailsFor,      setDetailsFor]      = useState(null); // product key whose details modal is open
  const bundleRef = useRef(null);

  useEffect(() => { saveBasket(basket); }, [basket]);
  useEffect(() => { saveRecent(recent); }, [recent]);

  function trackView(productKey) {
    setRecent(prev => addRecent(productKey, prev));
  }

  function toggleItem(productKey) {
    setError(null);
    trackView(productKey);
    setBasket(prev => prev.includes(productKey) ? prev.filter(k => k !== productKey) : [...prev, productKey]);
  }

  function removeItem(productKey) {
    setError(null);
    setBasket(prev => prev.filter(k => k !== productKey));
  }

  function clearRecent() {
    setRecent([]);
  }

  async function handleCheckout() {
    if (basket.length === 0) return;
    if (authLoading) return;
    if (!user || !session) { setShowModal(true); return; }
    setCheckoutLoading(true);
    setError(null);
    const result = await triggerStripe(basket, session);
    if (!result?.url) {
      setError(result?.error || 'Checkout unavailable. Please try again or contact info@cy-sec.co.uk.');
      setCheckoutLoading(false);
    }
  }

  const filteredProducts = GRID_PRODUCTS
    .filter(p => activeFilter === 'all' || p.cert.key === activeFilter)
    .filter(p => activeProductKind === 'all' || p.config.kind === activeProductKind);

  return (
    <div className={`min-h-screen ${basket.length > 0 ? 'pb-36 sm:pb-32' : 'pb-2'}`} style={{ background: '#F4F7FA' }}>
      <Helmet>
        <title>FortifyLearn Store — CompTIA exam prep bundles | Cy-Sec</title>
        <meta name="description" content="Real CompTIA PBQ simulation labs and a full Exam Engine with Study Mode + Exam Mode. Network+, Security+, CySA+ and A+ (Core 1 + Core 2) exam prep bundles from £39.99 — save up to £64.95 vs à la carte. Lifetime access, 14-day refund." />
      </Helmet>

      {showModal && (
        <CheckoutModal basket={basket} onClose={() => setShowModal(false)} />
      )}

      {detailsFor && (() => {
        const entry = KEY_LOOKUP[detailsFor];
        if (!entry) return null;
        return (
          <ProductDetailsModal
            cert={entry.cert}
            config={entry.config}
            inBasket={basket.includes(detailsFor)}
            onToggle={toggleItem}
            onClose={() => setDetailsFor(null)} />
        );
      })()}

      <UtilityStrip />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6 sm:space-y-8">

        <PromoHero onShopBundles={() => bundleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-3 rounded-xl flex items-start gap-2">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />{error}
          </div>
        )}

        {/* Featured — Prep Bundles */}
        <div ref={bundleRef}>
          <div className="flex items-center gap-2 sm:gap-3 mb-3 flex-wrap">
            <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: '#0891B2' }} />
            <h2 className="text-[15px] sm:text-base font-extrabold text-slate-900" style={{ letterSpacing: '-0.3px' }}>Featured — Exam Prep Bundles</h2>
            <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded"
              style={{ background: '#FAE5D9', color: '#7c2d12' }}>
              Bundle &amp; save
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[...CERTS, APLUS_MEGA].map(cert => (
              <FeaturedBundleCard key={cert.key} cert={cert}
                inBasket={basket.includes(cert.prepBundle.key)}
                onToggle={toggleItem}
                onShowDetails={() => setDetailsFor(cert.prepBundle.key)} />
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-3 flex-wrap">
            <h2 className="text-[15px] sm:text-base font-extrabold text-slate-900" style={{ letterSpacing: '-0.3px' }}>
              {activeFilter === 'all' ? 'All products' : `${CERTS.find(c => c.key === activeFilter)?.short} products`}
            </h2>
            <span className="text-[11px] text-slate-500 font-semibold">
              {filteredProducts.length} items · Lifetime access
            </span>
          </div>

          {/* Cert filter pill rail */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <button onClick={() => setActiveFilter('all')}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all"
              style={activeFilter === 'all'
                ? { background: '#0B1D3A', color: '#fff', boxShadow: '0 1px 3px rgba(11,29,58,0.18)' }
                : { background: '#fff', color: '#0B1D3A', border: '1px solid rgba(11,29,58,0.14)' }}>
              All certs
            </button>
            {CERTS.map(cert => (
              <CertPill key={cert.key} cert={cert}
                active={activeFilter === cert.key}
                onClick={(certKey) => setActiveFilter(prev => prev === certKey ? 'all' : certKey)} />
            ))}
          </div>

          {/* Product-kind filter chips — combines with the cert filter above */}
          <div className="flex items-center gap-1.5 mb-4 flex-wrap">
            {[
              { key: 'all',   label: 'All' },
              { key: 'labs',  label: 'PBQ labs' },
              { key: 'mock',  label: 'Exam Engine' },
            ].map(chip => {
              const active = activeProductKind === chip.key;
              return (
                <button key={chip.key}
                  onClick={() => setActiveProductKind(chip.key)}
                  className="text-[11px] font-bold px-3 py-1.5 rounded-full transition-all"
                  style={active
                    ? { background: '#0B1D3A', color: '#fff', letterSpacing: '-0.2px' }
                    : { background: '#fff', color: '#334155', border: '1px solid #e2e8f0', letterSpacing: '-0.2px' }}>
                  {chip.label}
                </button>
              );
            })}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 px-6 py-12 text-center">
              <p className="text-sm font-semibold text-slate-900 mb-1">Nothing matches those filters.</p>
              <p className="text-xs text-slate-500 mb-4">
                Try clearing a filter or switching to "All".
              </p>
              <button onClick={() => { setActiveFilter('all'); setActiveProductKind('all'); }}
                className="text-xs font-semibold" style={{ color: '#0891B2' }}>
                Clear filters →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
              {filteredProducts.map(({ cert, config }) => (
                <ProductCard key={config.key}
                  cert={cert} config={config}
                  inBasket={basket.includes(config.key)}
                  onToggle={toggleItem}
                  onShowDetails={() => setDetailsFor(config.key)} />
              ))}
            </div>
          )}
          {activeFilter !== 'all' && (
            <div className="mt-4 text-center">
              <a href={CERTS.find(c => c.key === activeFilter)?.landingPage}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">
                See all {CERTS.find(c => c.key === activeFilter)?.short} labs in detail
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Recently viewed — only shows when user has 2+ items tracked */}
        <RecentlyViewed productKeys={recent} basket={basket} onToggle={toggleItem} onClear={clearRecent} />

        {/* Trust strip: product features */}
        <div className="bg-white border border-slate-200 rounded-2xl px-4 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { icon: InfinityIcon, label: 'Lifetime access' },
            { icon: Zap,          label: 'Instant unlock' },
            { icon: RotateCcw,    label: '14-day refund' },
            { icon: MapPin,       label: 'UK support team' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
              <Icon className="w-4 h-4" style={{ color: '#0891B2' }} />
              {label}
            </div>
          ))}
        </div>

        <TrustedPartners />

      </div>

      <BasketBar
        basket={basket}
        user={user}
        authLoading={authLoading}
        onRemove={removeItem}
        onCheckout={handleCheckout}
        checkoutLoading={checkoutLoading}
      />
    </div>
  );
}

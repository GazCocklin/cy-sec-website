import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Shield, CheckCircle2, ArrowRight, ShoppingCart, X, Loader2, LogIn, Eye, EyeOff, Star, Infinity as InfinityIcon, Zap, RotateCcw, MapPin } from 'lucide-react';

const SUPABASE_URL    = 'https://kmnbtnfgeadvvkwsdyml.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttbmJ0bmZnZWFkdnZrd3NkeW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMTAxNDEsImV4cCI6MjA4Njc4NjE0MX0.T7yHQmQ3qdobyZEAXoAmDptfrj2yH-ZIJ8RfjNOpEFs';
const BASKET_KEY = 'cysec_basket';

// ── Cert catalogue ───────────────────────────────────────────────────────────
// Six SKUs per cert: Pack 1, Pack 2, Complete labs, Exam Engine, MCQ Bank,
// and the Prep Bundle (all four combined at a £29.97 discount).
const CERTS = [
  {
    key: 'netplus',
    title: 'CompTIA Network+',
    code: 'N10-009',
    badge: '/logos/comptia-network-plus.svg',
    landingPage: '/comptia-network-plus-labs',
    includes: [
      '10 hands-on CLI simulation labs',
      'Mock exam engine (PBQ + MCQ)',
      '500+ MCQ study bank with reasoning',
      'Lifetime access',
    ],
    pack1: {
      key: 'netplus_pack', label: 'Pack 1', sub: 'First 5 labs · foundations', price: 19.99,
      highlights: [
        'DNS server misconfiguration',
        'Default gateway fault diagnosis',
        'DMZ ACL troubleshooting',
        'Dual ACL multi-VLAN routing failure',
        'Enterprise multi-fault recovery',
      ],
    },
    pack2: {
      key: 'netplus_pack_2', label: 'Pack 2', sub: 'Next 5 labs · advanced', price: 19.99, isNew: true,
      highlights: [
        'DHCP scope exhaustion',
        'Port security violation recovery',
        'VLAN trunk misconfiguration (live topology)',
        'Asymmetric routing via NETCAP Analyzer',
        'SNMP multi-site fault triage via NETPULSE NMS',
      ],
    },
    complete:  { key: 'netplus_complete',     label: 'Complete labs',    sub: 'All 10 labs · Pack 1 + 2',        price: 32.99, rrp: 39.98, saving: 6.99 },
    exam:      { key: 'netplus_exam',         label: 'Exam Engine',      sub: 'Mock exam · PBQ + MCQ · scored',   price: 24.99 },
    mcq:       { key: 'mcq_netplus',          label: 'MCQ Study Bank',   sub: '500+ questions · full reasoning',  price: 14.99 },
    prepBundle:{ key: 'netplus_prep_bundle',  label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine + MCQ Bank',    price: 49.99, rrp: 79.96, saving: 29.97 },
  },
  {
    key: 'secplus',
    title: 'CompTIA Security+',
    code: 'SY0-701',
    badge: '/logos/comptia-security-plus.svg',
    landingPage: '/comptia-security-plus-labs',
    includes: [
      '10 hands-on security labs',
      'Mock exam engine (PBQ + MCQ)',
      '500+ MCQ study bank with reasoning',
      'Lifetime access',
    ],
    pack1: {
      key: 'secplus_pack', label: 'Pack 1', sub: 'First 5 labs · foundations', price: 19.99,
      highlights: [
        'Firewall rule blocking HTTPS traffic',
        'Sensitive file permission hardening',
        'Insecure legacy service exposure',
        'Privilege escalation & audit failure',
        'Post-pentest remediation',
      ],
    },
    pack2: {
      key: 'secplus_pack_2', label: 'Pack 2', sub: 'Next 5 labs · advanced', price: 19.99, isNew: true,
      highlights: [
        'Stale user account lockdown',
        'Unauthorised service account audit',
        'MFA enforcement (TOTP on SSH bastion)',
        'Firewall policy audit via FORTIGUARD visual',
        'PKI rotation after CA compromise',
      ],
    },
    complete:  { key: 'secplus_complete',     label: 'Complete labs',    sub: 'All 10 labs · Pack 1 + 2',        price: 32.99, rrp: 39.98, saving: 6.99 },
    exam:      { key: 'secplus_exam',         label: 'Exam Engine',      sub: 'Mock exam · PBQ + MCQ · scored',   price: 24.99 },
    mcq:       { key: 'mcq_secplus',          label: 'MCQ Study Bank',   sub: '500+ questions · full reasoning',  price: 14.99 },
    prepBundle:{ key: 'secplus_prep_bundle',  label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine + MCQ Bank',    price: 49.99, rrp: 79.96, saving: 29.97 },
  },
  {
    key: 'cysa',
    title: 'CompTIA CySA+',
    code: 'CS0-003',
    badge: '/logos/comptia-cysa-plus.svg',
    landingPage: '/comptia-cysa-plus-labs',
    includes: [
      '10 SOC analyst labs',
      'Mock exam engine (PBQ + MCQ)',
      '500+ MCQ study bank with reasoning',
      'Lifetime access',
    ],
    pack1: {
      key: 'cysa_pack', label: 'Pack 1', sub: 'First 5 labs · foundations', price: 19.99,
      highlights: [
        'Suspicious process & C2 detection',
        'Web application brute force investigation',
        'SSH brute force containment',
        'Web shell & lateral movement detection',
        'APT threat hunt + firewall containment',
      ],
    },
    pack2: {
      key: 'cysa_pack_2', label: 'Pack 2', sub: 'Next 5 labs · advanced', price: 19.99, isNew: true,
      highlights: [
        'Internal port scan detection & containment',
        'Malicious cron job persistence removal',
        'SIEM log correlation via Arclight SIEM visual',
        'Vulnerability triage via NETSCAN PRO visual',
        'Credential harvesting & ransomware eradication',
      ],
    },
    complete:  { key: 'cysa_complete',        label: 'Complete labs',    sub: 'All 10 labs · Pack 1 + 2',        price: 32.99, rrp: 39.98, saving: 6.99 },
    exam:      { key: 'cysa_exam',            label: 'Exam Engine',      sub: 'Mock exam · PBQ + MCQ · scored',   price: 24.99 },
    mcq:       { key: 'mcq_cysa',             label: 'MCQ Study Bank',   sub: '500+ questions · full reasoning',  price: 14.99 },
    prepBundle:{ key: 'cysa_prep_bundle',     label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine + MCQ Bank',    price: 49.99, rrp: 79.96, saving: 29.97 },
  },
];

// Map each product key back to its cert + short label for the basket bar
const KEY_LOOKUP = (() => {
  const out = {};
  for (const cert of CERTS) {
    for (const opt of ['pack1','pack2','complete','exam','mcq','prepBundle']) {
      out[cert[opt].key] = { cert, option: opt, config: cert[opt] };
    }
  }
  return out;
})();

function loadBasket()  { try { return JSON.parse(localStorage.getItem(BASKET_KEY) || '[]'); } catch { return []; } }
function saveBasket(i) { try { localStorage.setItem(BASKET_KEY, JSON.stringify(i)); } catch {} }

function sanitiseBasket(basket) {
  return (basket || []).filter(k => KEY_LOOKUP[k]);
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

// ── Checkout modal (unchanged) ────────────────────────────────────────────────
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

// ── Cert tab selector ────────────────────────────────────────────────────────
function CertTab({ cert, active, onClick }) {
  return (
    <button onClick={() => onClick(cert.key)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
        active
          ? 'border-cyan-500 bg-cyan-50/60 shadow-sm shadow-cyan-100'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}>
      <img src={cert.badge} alt="" className="w-11 h-11 object-contain flex-shrink-0"
        onError={e => { e.target.style.display='none'; }} />
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900 leading-tight">{cert.title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{cert.code}</p>
      </div>
    </button>
  );
}

// ── Prep Bundle hero card (the recommended purchase) ─────────────────────────
function PrepBundleHero({ cert, inBasket, onToggle }) {
  const { prepBundle } = cert;
  return (
    <div className="rounded-2xl overflow-hidden text-white mb-8 relative"
      style={{ background: 'linear-gradient(135deg,#0B1D3A 0%,#0E5F8A 100%)' }}>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(to right,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-shrink-0 bg-white/5 rounded-xl p-3 border border-white/10">
          <img src={cert.badge} alt={cert.title} className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            onError={e => { e.target.style.display='none'; }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 text-xs font-bold uppercase tracking-wider"
            style={{ background: '#0891B2', color: '#fff' }}>
            <Star className="w-3.5 h-3.5" />
            Recommended — save £{prepBundle.saving.toFixed(2)}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black mb-1" style={{ letterSpacing: '-0.5px' }}>
            {cert.title} Exam Prep Bundle
          </h3>
          <p className="text-white/60 text-sm mb-5 leading-relaxed max-w-2xl">
            Everything you need to walk into the exam ready. Labs, mock exam engine, and study question bank — all in.
          </p>
          <div className="flex items-baseline gap-3 flex-wrap mb-5">
            <span className="text-4xl font-black" style={{ letterSpacing: '-1px' }}>£{prepBundle.price.toFixed(2)}</span>
            <span className="text-white/40 line-through text-sm">£{prepBundle.rrp.toFixed(2)}</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded" style={{ background: '#7DD3E8', color: '#0B1D3A' }}>
              Save £{prepBundle.saving.toFixed(2)}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6 max-w-xl">
            {cert.includes.map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/85">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#7DD3E8' }} />
                {item}
              </div>
            ))}
          </div>
          <button onClick={() => onToggle(prepBundle.key)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              inBasket ? 'bg-white/15 border border-white/30 text-white hover:bg-white/20' : 'bg-white text-slate-900 hover:brightness-95'
            }`}>
            {inBasket
              ? <><CheckCircle2 className="w-4 h-4" /> In basket — click to remove</>
              : <>Add bundle to basket <ArrowRight className="w-4 h-4" /></>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Pack card (Pack 1 / Pack 2 / Complete) ───────────────────────────────────
function PackCard({ config, featured, inBasket, onToggle }) {
  const [showHighlights, setShowHighlights] = useState(false);
  return (
    <div className={`relative rounded-xl border-2 bg-white transition-all p-4 flex flex-col ${
      inBasket ? 'border-cyan-500 shadow-md shadow-cyan-100' : featured ? 'border-cyan-200' : 'border-slate-200 hover:border-slate-300'
    }`}>
      {config.isNew && !inBasket && (
        <span className="absolute -top-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
          style={{ background: '#0891B2' }}>NEW</span>
      )}
      <p className="text-sm font-bold text-slate-900 mb-0.5">{config.label}</p>
      <p className="text-xs text-slate-500 mb-3 leading-snug">{config.sub}</p>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-xl font-black text-slate-900" style={{ letterSpacing: '-0.3px' }}>£{config.price.toFixed(2)}</span>
        {config.saving != null && (
          <span className="text-xs font-bold" style={{ color: '#0891B2' }}>save £{config.saving.toFixed(2)}</span>
        )}
      </div>
      {config.highlights && (
        <>
          <button type="button" onClick={() => setShowHighlights(h => !h)}
            className="text-[11px] font-semibold mb-2 flex items-center gap-1 self-start"
            style={{ color: '#0891B2' }}>
            {showHighlights ? 'Hide labs' : 'Show labs'}
            <span className={`transition-transform inline-block ${showHighlights ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {showHighlights && (
            <ul className="mb-3 space-y-1">
              {config.highlights.map(h => (
                <li key={h} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-snug">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <button onClick={() => onToggle(config.key)}
        className={`mt-auto w-full py-2 rounded-lg text-xs font-bold transition-all ${
          inBasket
            ? 'bg-cyan-600 text-white hover:bg-cyan-700'
            : 'border border-slate-200 text-slate-900 hover:border-cyan-500 hover:text-cyan-700 hover:bg-cyan-50'
        }`}>
        {inBasket ? '✓ In basket' : `Add ${config.label.toLowerCase()}`}
      </button>
    </div>
  );
}

// ── Test prep card (Exam Engine / MCQ Bank) ──────────────────────────────────
function TestPrepCard({ config, inBasket, onToggle }) {
  return (
    <div className={`rounded-xl border-2 p-4 flex items-center gap-4 transition-all ${
      inBasket ? 'border-cyan-500 bg-cyan-50/60' : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
    }`}>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900 mb-0.5">{config.label}</p>
        <p className="text-xs text-slate-500 leading-snug">{config.sub}</p>
      </div>
      <span className="text-lg font-black text-slate-900 flex-shrink-0" style={{ letterSpacing: '-0.3px' }}>
        £{config.price.toFixed(2)}
      </span>
      <button onClick={() => onToggle(config.key)}
        className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
          inBasket
            ? 'bg-cyan-600 text-white hover:bg-cyan-700'
            : 'border border-slate-200 bg-white text-slate-900 hover:border-cyan-500 hover:text-cyan-700'
        }`}>
        {inBasket ? '✓ Added' : 'Add'}
      </button>
    </div>
  );
}

// ── Basket bar (persistent bottom CTA) ───────────────────────────────────────
function BasketBar({ basket, user, authLoading, onRemove, onCheckout, checkoutLoading }) {
  if (basket.length === 0) return null;

  const items = basket
    .map(k => {
      const lookup = KEY_LOOKUP[k];
      if (!lookup) return null;
      const label = `${lookup.cert.title} ${lookup.config.label}`;
      return { key: k, label, price: lookup.config.price };
    })
    .filter(Boolean);

  const total = items.reduce((t, i) => t + i.price, 0);

  const isDisabled = checkoutLoading || authLoading;
  const btnLabel   = checkoutLoading ? 'Processing…' : authLoading ? 'Loading…'
    : user ? `Checkout — £${total.toFixed(2)}` : `Sign in to Checkout — £${total.toFixed(2)}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0B1D3A,#0D2645)' }}>
        <div className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <p className="text-white/50 text-xs">Total</p>
              <p className="text-white font-black text-xl">£{total.toFixed(2)}</p>
            </div>
            <button onClick={onCheckout} disabled={isDisabled}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-900 text-sm transition-all hover:brightness-110 disabled:opacity-60"
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
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showModal,       setShowModal]       = useState(false);
  const [error,           setError]           = useState(null);
  const [activeCertKey,   setActiveCertKey]   = useState('netplus');

  useEffect(() => { saveBasket(basket); }, [basket]);

  const activeCert = CERTS.find(c => c.key === activeCertKey) || CERTS[0];

  function toggleItem(productKey) {
    setError(null);
    setBasket(prev => prev.includes(productKey) ? prev.filter(k => k !== productKey) : [...prev, productKey]);
  }

  function removeItem(productKey) {
    setError(null);
    setBasket(prev => prev.filter(k => k !== productKey));
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

  return (
    <div className={`min-h-screen ${basket.length > 0 ? 'pb-32' : 'pb-2'}`} style={{ background: '#F8FAFC' }}>
      <Helmet>
        <title>FortifyLearn Store — CompTIA exam prep bundles | Cy-Sec</title>
        <meta name="description" content="Real CompTIA PBQ simulation labs, mock exam engine and MCQ study banks. Network+, Security+ and CySA+ exam prep bundles from £49.99 — or buy individual packs from £19.99. Lifetime access." />
      </Helmet>

      {showModal && (
        <CheckoutModal basket={basket} onClose={() => setShowModal(false)} />
      )}

      {/* Compressed hero */}
      <div className="relative overflow-hidden" style={{ background: '#0B1D3A' }}>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(8,145,178,1) 1px,transparent 1px),linear-gradient(to right,rgba(8,145,178,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full mb-2 border text-[10px] font-bold tracking-widest uppercase"
              style={{ background: 'rgba(8,145,178,0.15)', borderColor: 'rgba(8,145,178,0.35)', color: '#7DD3E8' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#0891B2', display: 'inline-block' }} />
              FortifyLearn · CompTIA prep
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-1" style={{ letterSpacing: '-0.5px' }}>
              Real labs. Real mock exams.
            </h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-xl">
              Built around the questions that trip CompTIA candidates in the exam room. Free taster, no card needed.
            </p>
          </div>
          <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:brightness-110 bg-white text-slate-900">
            Try a free lab <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-8 space-y-8">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-3 rounded-xl flex items-start gap-2">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />{error}
          </div>
        )}

        {/* Step 1 — cert picker */}
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-slate-500 mb-3">1 · Choose your certification</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {CERTS.map(cert => (
              <CertTab key={cert.key} cert={cert} active={cert.key === activeCertKey} onClick={setActiveCertKey} />
            ))}
          </div>
        </div>

        {/* Step 2 — options for the active cert */}
        <div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-slate-500 mb-3">2 · Pick what you need</p>

          <PrepBundleHero
            cert={activeCert}
            inBasket={basket.includes(activeCert.prepBundle.key)}
            onToggle={toggleItem}
          />

          {/* Labs only */}
          <p className="text-[11px] font-bold tracking-widest uppercase text-slate-500 mb-3">Labs only</p>
          <div className="grid sm:grid-cols-3 gap-3 mb-7">
            <PackCard config={activeCert.pack1}    inBasket={basket.includes(activeCert.pack1.key)}    onToggle={toggleItem} />
            <PackCard config={activeCert.pack2}    inBasket={basket.includes(activeCert.pack2.key)}    onToggle={toggleItem} />
            <PackCard config={activeCert.complete} featured inBasket={basket.includes(activeCert.complete.key)} onToggle={toggleItem} />
          </div>

          {/* Test prep only */}
          <p className="text-[11px] font-bold tracking-widest uppercase text-slate-500 mb-3">Test prep only</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <TestPrepCard config={activeCert.exam} inBasket={basket.includes(activeCert.exam.key)} onToggle={toggleItem} />
            <TestPrepCard config={activeCert.mcq}  inBasket={basket.includes(activeCert.mcq.key)}  onToggle={toggleItem} />
          </div>

          {/* Cert landing link */}
          <div className="mt-5 text-center">
            <a href={activeCert.landingPage}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">
              See all {activeCert.title} labs in detail
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Trust strip */}
        <div className="bg-white border border-slate-200 rounded-2xl px-4 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { icon: InfinityIcon, label: 'Lifetime access' },
            { icon: Zap,      label: 'Instant unlock' },
            { icon: RotateCcw,label: '14-day refund' },
            { icon: MapPin,   label: 'UK support team' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
              <Icon className="w-4 h-4" style={{ color: '#0891B2' }} />
              {label}
            </div>
          ))}
        </div>

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

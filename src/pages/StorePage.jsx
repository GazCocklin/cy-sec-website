import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Shield, CheckCircle2, ArrowRight, ShoppingCart, X, Loader2, LogIn, Eye, EyeOff, Sparkles } from 'lucide-react';

const SUPABASE_URL    = 'https://kmnbtnfgeadvvkwsdyml.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttbmJ0bmZnZWFkdnZrd3NkeW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMTAxNDEsImV4cCI6MjA4Njc4NjE0MX0.T7yHQmQ3qdobyZEAXoAmDptfrj2yH-ZIJ8RfjNOpEFs';
const BASKET_KEY = 'cysec_basket';

// ── Cert catalogue ───────────────────────────────────────────────────────────
// Each cert has three purchase options: Pack 1, Pack 2, Complete (both packs).
// Users pick one option per cert card. Complete is pre-highlighted as the
// recommended path — 10 labs at a £6.99 discount vs buying the packs separately.
const CERTS = [
  {
    key: 'netplus',
    title: 'CompTIA Network+',
    code: 'N10-009',
    logo: '/logos/comptia-network-plus.svg',
    landingPage: '/comptia-network-plus-labs',
    heroImg: '/screenshots/fl-netcap.png',
    heroAlt: 'NETCAP Analyzer v3.2 — asymmetric routing packet capture in a Network+ lab',
    toolLabel: 'NETCAP Analyzer v3.2',
    accent: '#10b981',
    pack1: {
      key: 'netplus_pack',
      label: 'Pack 1',
      price: 19.99,
      highlights: [
        'DNS server misconfiguration',
        'Default gateway fault diagnosis',
        'DMZ ACL troubleshooting',
        'Dual ACL multi-VLAN routing failure',
        'Enterprise multi-fault recovery',
      ],
    },
    pack2: {
      key: 'netplus_pack_2',
      label: 'Pack 2',
      price: 19.99,
      isNew: true,
      highlights: [
        'DHCP scope exhaustion',
        'Port security violation recovery',
        'VLAN trunk misconfiguration (live topology)',
        'Asymmetric routing via NETCAP Analyzer',
        'SNMP multi-site fault triage via NETPULSE NMS',
      ],
    },
    complete: {
      key: 'netplus_complete',
      label: 'Complete',
      price: 32.99,
      rrp: 39.98,
      saving: 6.99,
    },
  },
  {
    key: 'secplus',
    title: 'CompTIA Security+',
    code: 'SY0-701',
    logo: '/logos/comptia-security-plus.svg',
    landingPage: '/comptia-security-plus-labs',
    heroImg: '/screenshots/fl-fortiguard.png',
    heroAlt: 'FORTIGUARD Policy Auditor v3.1 — firewall rule audit in a Security+ lab',
    toolLabel: 'FORTIGUARD Policy Auditor v3.1',
    accent: '#0891B2',
    pack1: {
      key: 'secplus_pack',
      label: 'Pack 1',
      price: 19.99,
      highlights: [
        'Firewall rule blocking HTTPS traffic',
        'Sensitive file permission hardening',
        'Insecure legacy service exposure',
        'Privilege escalation & audit failure',
        'Post-pentest remediation',
      ],
    },
    pack2: {
      key: 'secplus_pack_2',
      label: 'Pack 2',
      price: 19.99,
      isNew: true,
      highlights: [
        'Stale user account lockdown',
        'Unauthorised service account audit',
        'MFA enforcement (TOTP on SSH bastion)',
        'Firewall policy audit via FORTIGUARD visual',
        'PKI rotation after CA compromise',
      ],
    },
    complete: {
      key: 'secplus_complete',
      label: 'Complete',
      price: 32.99,
      rrp: 39.98,
      saving: 6.99,
    },
  },
  {
    key: 'cysa',
    title: 'CompTIA CySA+',
    code: 'CS0-003',
    logo: '/logos/comptia-cysa-plus.svg',
    landingPage: '/comptia-cysa-plus-labs',
    heroImg: '/screenshots/fl-siem.png',
    heroAlt: 'Arclight SIEM v5.0.3 — alert triage dashboard in a CySA+ lab',
    toolLabel: 'Arclight SIEM v5.0.3',
    accent: '#0B1D3A',
    pack1: {
      key: 'cysa_pack',
      label: 'Pack 1',
      price: 19.99,
      highlights: [
        'Suspicious process & C2 detection',
        'Web application brute force investigation',
        'SSH brute force containment',
        'Web shell & lateral movement detection',
        'APT threat hunt + firewall containment',
      ],
    },
    pack2: {
      key: 'cysa_pack_2',
      label: 'Pack 2',
      price: 19.99,
      isNew: true,
      highlights: [
        'Internal port scan detection & containment',
        'Malicious cron job persistence removal',
        'SIEM log correlation via Arclight SIEM visual',
        'Vulnerability triage via NETSCAN PRO visual',
        'Credential harvesting & ransomware eradication',
      ],
    },
    complete: {
      key: 'cysa_complete',
      label: 'Complete',
      price: 32.99,
      rrp: 39.98,
      saving: 6.99,
    },
  },
];

// Flatten all product keys so we can map from a basket key back to its cert + option
const KEY_LOOKUP = (() => {
  const out = {};
  for (const cert of CERTS) {
    out[cert.pack1.key]    = { cert, option: 'pack1',    config: cert.pack1 };
    out[cert.pack2.key]    = { cert, option: 'pack2',    config: cert.pack2 };
    out[cert.complete.key] = { cert, option: 'complete', config: cert.complete };
  }
  return out;
})();

function loadBasket()  { try { return JSON.parse(localStorage.getItem(BASKET_KEY) || '[]'); } catch { return []; } }
function saveBasket(i) { try { localStorage.setItem(BASKET_KEY, JSON.stringify(i)); } catch {} }

// Strip out any basket keys that no longer map to a valid product (handles stale
// entries from pre-launch e.g. 'bundle' that were in localStorage before the
// cert-bundle migration).
function sanitiseBasket(basket) {
  return (basket || []).filter(k => KEY_LOOKUP[k]);
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

function basketTotal(basket) {
  return basket.reduce((t, k) => t + (KEY_LOOKUP[k]?.config.price || 0), 0);
}

// ── Checkout modal ────────────────────────────────────────────────────────────
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

// ── Cert card with 3-option picker ────────────────────────────────────────────
function CertCard({ cert, selectedOption, onSelect }) {
  const [expanded, setExpanded] = useState(null); // which pack's highlights to show

  const OptionTile = ({ optionKey, config, isComplete }) => {
    const isSelected = selectedOption === optionKey;
    const showHighlights = expanded === optionKey;

    return (
      <div className={`relative rounded-xl border-2 transition-all overflow-hidden ${
        isSelected
          ? 'border-cyan-500 bg-cyan-50/60 shadow-md shadow-cyan-100'
          : isComplete
            ? 'border-slate-300 bg-slate-50/60 hover:border-slate-400'
            : 'border-slate-200 bg-white hover:border-slate-300'
      }`}>
        {isComplete && (
          <div className="absolute top-0 left-0 right-0 text-center py-1"
            style={{ background: 'linear-gradient(90deg,#0B1D3A,#0891B2)' }}>
            <span className="text-[10px] font-black uppercase tracking-widest text-white flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> Best Value — Save £{config.saving.toFixed(2)}
            </span>
          </div>
        )}
        <div className={`p-4 ${isComplete ? 'pt-7' : ''}`}>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <h4 className="font-bold text-slate-900 text-sm">{config.label}</h4>
              {config.isNew && !isComplete && (
                <span className="bg-cyan-500 text-white text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0">NEW</span>
              )}
            </div>
            <span className="text-[11px] text-slate-400 font-semibold flex-shrink-0">
              {isComplete ? '10 labs' : '5 labs'}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-black text-slate-800">£{config.price.toFixed(2)}</span>
            {isComplete && (
              <span className="text-xs text-slate-400 line-through">£{config.rrp.toFixed(2)}</span>
            )}
          </div>

          {!isComplete && config.highlights && (
            <button type="button"
              onClick={() => setExpanded(showHighlights ? null : optionKey)}
              className="text-[11px] font-semibold mb-3 flex items-center gap-1"
              style={{ color: '#0891B2' }}>
              {showHighlights ? 'Hide labs' : 'Show labs'}
              <span className={`transition-transform inline-block ${showHighlights ? 'rotate-180' : ''}`}>▾</span>
            </button>
          )}
          {!isComplete && showHighlights && config.highlights && (
            <ul className="mb-3 space-y-1">
              {config.highlights.map(h => (
                <li key={h} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-snug">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          )}
          {isComplete && (
            <p className="text-[11px] text-slate-600 leading-snug mb-3">
              Everything in Pack 1 and Pack 2 — all 10 hands-on labs from Easy to Expert.
            </p>
          )}

          <button
            type="button"
            onClick={() => onSelect(cert.key, optionKey, config.key)}
            className={`w-full py-2.5 rounded-lg font-bold text-xs transition-all ${
              isSelected
                ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                : isComplete
                  ? 'text-white hover:brightness-110'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
            style={isSelected ? {} : isComplete ? { background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' } : {}}>
            {isSelected ? '✓ In Basket' : (isComplete ? 'Choose Complete' : `Choose ${config.label}`)}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all overflow-hidden flex flex-col">
      {/* Tool screenshot header */}
      {cert.heroImg && (
        <div className="relative overflow-hidden" style={{ height: 120 }}>
          <img src={cert.heroImg} alt={cert.heroAlt} className="w-full h-full object-cover" style={{ objectPosition: 'top' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(6,14,31,0.7) 100%)' }} />
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded"
              style={{ background: 'rgba(6,14,31,0.75)', border: '1px solid rgba(8,145,178,0.4)', color: '#7DD3E8' }}>
              {cert.toolLabel}
            </span>
            <a href={cert.landingPage}
              className="text-[10px] font-bold px-2 py-1 rounded text-white hover:brightness-110 transition-all"
              style={{ background: 'rgba(8,145,178,0.7)' }}
              onClick={e => e.stopPropagation()}>
              View labs →
            </a>
          </div>
        </div>
      )}
      {/* Cert header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <img src={cert.logo} alt={cert.title} className="w-10 h-10 object-contain flex-shrink-0"
            onError={e => { e.target.style.display='none'; }} />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-black tracking-widest uppercase" style={{ color: cert.accent || '#0891B2' }}>{cert.code}</p>
            <h3 className="font-black text-slate-900 text-base leading-tight">{cert.title}</h3>
          </div>
        </div>
      </div>

      {/* 3-option picker */}
      <div className="p-4 space-y-3 flex-1">
        <OptionTile optionKey="pack1"    config={cert.pack1}    isComplete={false} />
        <OptionTile optionKey="pack2"    config={cert.pack2}    isComplete={false} />
        <OptionTile optionKey="complete" config={cert.complete} isComplete={true}  />
      </div>
    </div>
  );
}

// ── Basket bar ────────────────────────────────────────────────────────────────
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

  useEffect(() => { saveBasket(basket); }, [basket]);

  // Build a map of cert.key -> currently selected option ('pack1' | 'pack2' | 'complete' | null)
  const selectedOptionByCert = (() => {
    const out = {};
    for (const cert of CERTS) out[cert.key] = null;
    for (const k of basket) {
      const lookup = KEY_LOOKUP[k];
      if (lookup) out[lookup.cert.key] = lookup.option;
    }
    return out;
  })();

  function handleSelect(certKey, optionKey, productKey) {
    setError(null);
    const currentlySelected = selectedOptionByCert[certKey];
    setBasket(prev => {
      // Remove any existing selection for this cert
      const withoutCert = prev.filter(k => {
        const lookup = KEY_LOOKUP[k];
        return !lookup || lookup.cert.key !== certKey;
      });
      // If the clicked option was already selected, this acts as a toggle-off
      if (currentlySelected === optionKey) return withoutCert;
      return [...withoutCert, productKey];
    });
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
        <title>FortifyLearn Store — CompTIA PBQ Packs | Cy-Sec</title>
        <meta name="description" content="The official FortifyLearn store. CompTIA PBQ simulation packs for Network+, Security+ and CySA+ — representative CLI environments, objective-mapped scoring, Lifetime access from £19.99." />
      </Helmet>

      {showModal && (
        <CheckoutModal basket={basket} onClose={() => setShowModal(false)} />
      )}

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: 420 }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80&fit=crop"
            alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg,rgba(6,14,31,0.97) 0%,rgba(11,29,58,0.95) 45%,rgba(8,80,120,0.80) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(rgba(8,145,178,1) 1px,transparent 1px),linear-gradient(to right,rgba(8,145,178,1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 border text-xs font-bold tracking-wider uppercase"
              style={{ background: 'rgba(8,145,178,0.15)', borderColor: 'rgba(8,145,178,0.35)', color: '#7DD3E8' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0891B2', display: 'inline-block', flexShrink: 0 }} />
              CompTIA Authorised Partner
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4"
              style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              FortifyLearn{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#7DD3E8,#0891B2)' }}>Store.</span>
            </h1>
            <p className="text-white/60 mb-6 leading-relaxed max-w-lg">
              Not flashcards. Not videos. <strong className="text-white/90">Real CLI environments</strong> and interactive simulation tools — Network+, Security+, and CySA+ packs from £19.99.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { label: 'Network+ N10-009', href: '/comptia-network-plus-labs', color: '#10b981' },
                { label: 'Security+ SY0-701', href: '/comptia-security-plus-labs', color: '#0891B2' },
                { label: 'CySA+ CS0-003', href: '/comptia-cysa-plus-labs', color: '#0B1D3A' },
              ].map(c => (
                <a key={c.href} href={c.href}
                  className="text-xs font-bold px-3 py-1.5 rounded-full border text-white/70 hover:text-white transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}>
                  {c.label} →
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {['10 labs per certification','One-time purchase','Lifetime access','Free taster labs'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(8,145,178,0.6)', display: 'inline-block' }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* Tool screenshot preview strip */}
          <div className="hidden lg:grid grid-cols-3 gap-3">
            {[
              { img: '/screenshots/fl-netcap.png', label: 'NETCAP Analyzer v3.2', cert: 'Network+' },
              { img: '/screenshots/fl-fortiguard.png', label: 'FORTIGUARD Auditor v3.1', cert: 'Security+' },
              { img: '/screenshots/fl-siem.png', label: 'Arclight SIEM v5.0.3', cert: 'CySA+' },
            ].map((t, i) => (
              <div key={t.label} className="rounded-xl overflow-hidden border border-white/10 shadow-xl"
                style={{ transform: `translateY(${i === 1 ? -12 : i === 2 ? -6 : 0}px)` }}>
                <img src={t.img} alt={t.label} className="w-full object-cover" style={{ height: 120, objectPosition: 'top' }} />
                <div className="p-2" style={{ background: 'rgba(6,14,31,0.9)' }}>
                  <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: '#7DD3E8' }}>{t.cert}</p>
                  <p className="text-[10px] text-white/60 truncate">{t.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-6 space-y-10">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-3 rounded-xl flex items-start gap-2">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />{error}
          </div>
        )}

        <div>
          {/* Section header */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#0891B2' }}>FortifyLearn — CompTIA PBQ Simulation Packs</p>
              <h2 className="text-2xl font-extrabold text-slate-900" style={{ letterSpacing: '-0.5px' }}>Choose your certification</h2>
              <p className="text-sm text-slate-500 mt-1">One-time purchase · Lifetime access · No subscription</p>
            </div>
            <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl transition-all hover:brightness-110 flex-shrink-0 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff' }}>
              🆓 Try a free taster →
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CERTS.map(cert => (
              <CertCard
                key={cert.key}
                cert={cert}
                selectedOption={selectedOptionByCert[cert.key]}
                onSelect={handleSelect}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center justify-center text-slate-400 text-xs">
            {['Secure checkout via Stripe','Lifetime access from purchase','No subscription — one-time payment','CompTIA exam-aligned'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{t}</span>
            ))}
          </div>
        </div>

        {/* Free taster strip */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-slate-800 mb-1">Try before you buy — taster labs are always free</p>
            <p className="text-sm text-slate-500">Two Network+ tasters (CLI + visual) and two Security+ tasters (CLI + visual) — free. Just sign up, no card needed.</p>
          </div>
          <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff' }}>
            Launch FortifyLearn <ArrowRight className="w-4 h-4" />
          </a>
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

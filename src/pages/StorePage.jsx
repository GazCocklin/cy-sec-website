import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { Shield, CheckCircle2, ArrowRight, ShoppingCart, X, Tag, Loader2, Star, LogIn, Eye, EyeOff } from 'lucide-react';

const SUPABASE_URL    = 'https://kmnbtnfgeadvvkwsdyml.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttbmJ0bmZnZWFkdnZrd3NkeW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMTAxNDEsImV4cCI6MjA4Njc4NjE0MX0.T7yHQmQ3qdobyZEAXoAmDptfrj2yH-ZIJ8RfjNOpEFs';
const BASKET_KEY = 'cysec_basket';

const PACKS = [
  {
    key: 'netplus_pack', title: 'Network+ PBQ Pack 1', code: 'N10-009',
    price: 19.99, rrp: 24.99, logo: '/logos/comptia-network-plus.svg',
    labs: ['DNS server misconfiguration','Default gateway fault diagnosis','DMZ ACL troubleshooting','Dual ACL fault — multi-VLAN routing','Enterprise multi-fault recovery'],
  },
  {
    key: 'secplus_pack', title: 'Security+ PBQ Pack 1', code: 'SY0-701',
    price: 19.99, rrp: 24.99, logo: '/logos/comptia-security-plus.svg',
    labs: ['Firewall rule blocking HTTPS traffic','Sensitive file permission hardening','Insecure legacy service exposure','Privilege escalation & audit failure','Post-pentest remediation'],
  },
  {
    key: 'cysa_pack', title: 'CySA+ PBQ Pack 1', code: 'CS0-003',
    price: 19.99, rrp: 24.99, logo: '/logos/comptia-cysa-plus.svg', isNew: true,
    labs: ['Web app brute force investigation','Suspicious process & C2 detection','SSH brute force log analysis','Web shell & lateral movement','APT threat hunt + firewall containment'],
  },
];

const BUNDLE = { key: 'bundle', price: 39.99, rrp: 74.97, saving: 35.00 };

function loadBasket()  { try { return JSON.parse(localStorage.getItem(BASKET_KEY) || '[]'); } catch { return []; } }
function saveBasket(i) { try { localStorage.setItem(BASKET_KEY, JSON.stringify(i)); } catch {} }

// ── Stripe trigger ────────────────────────────────────────────────────────────
async function triggerStripe(basketItems, currentSession) {
  if (!basketItems.length || !currentSession) return;
  const allThree = PACKS.every(p => basketItems.includes(p.key));
  const useBundle = basketItems.includes('bundle') || allThree;
  const isMulti   = !useBundle && basketItems.length > 1;
  const res = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${currentSession.access_token}` },
    body: JSON.stringify({
      product_key:  useBundle ? 'bundle' : !isMulti ? basketItems[0] : undefined,
      product_keys: isMulti   ? basketItems : undefined,
      cancel_url: 'https://cy-sec.co.uk/store',
    }),
  });
  const data = await res.json();
  if (data.url) { localStorage.removeItem(BASKET_KEY); window.location.href = data.url; }
  return data;
}

// ── Checkout modal ────────────────────────────────────────────────────────────
function CheckoutModal({ basket, onSuccess, onClose }) {
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

  const displayPrice = (() => {
    if (basket.includes('bundle')) return BUNDLE.price;
    const allThree = PACKS.every(p => basket.includes(p.key));
    if (allThree) return BUNDLE.price;
    return basket.reduce((t, k) => t + (PACKS.find(p => p.key === k)?.price || 0), 0);
  })();

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

// ── Pack card ─────────────────────────────────────────────────────────────────
function PackCard({ pack, inBasket, onToggle }) {
  return (
    <div className={`relative bg-white rounded-2xl border-2 transition-all flex flex-col ${
      inBasket ? 'border-cyan-500 shadow-lg shadow-cyan-100' : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
    }`}>
      {pack.isNew && <span className="absolute top-4 right-4 bg-cyan-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">New</span>}
      <div className="p-6 flex-1">
        <div className="flex items-center gap-3 mb-4">
          <img src={pack.logo} alt={pack.title} className="w-11 h-11 object-contain" />
          <div>
            <p className="text-xs font-bold tracking-wider" style={{ color: '#0891B2' }}>{pack.code}</p>
            <h3 className="font-bold text-slate-900 text-base leading-tight">{pack.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
          <span>📋 5 labs</span><span>🎯 Easy → Expert</span>
        </div>
        <ul className="space-y-1.5 mb-6">
          {pack.labs.map(lab => (
            <li key={lab} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />{lab}
            </li>
          ))}
        </ul>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-800">£{pack.price.toFixed(2)}</span>
          <span className="text-sm text-slate-400 line-through">£{pack.rrp.toFixed(2)}</span>
          <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-full">Early access</span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <button onClick={() => onToggle(pack.key)}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
            inBasket ? 'bg-cyan-50 text-cyan-700 border-2 border-cyan-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300'
                     : 'text-white border-2 border-transparent hover:brightness-110'
          }`}
          style={inBasket ? {} : { background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}>
          {inBasket ? '✓ In Basket — Remove' : 'Add to Basket'}
        </button>
      </div>
    </div>
  );
}

// ── Bundle card ───────────────────────────────────────────────────────────────
function BundleCard({ inBasket, onToggle }) {
  return (
    <div className={`relative rounded-2xl border-2 transition-all overflow-hidden ${inBasket ? 'border-cyan-400' : 'border-transparent'}`}
      style={{ background: 'linear-gradient(135deg,#0B1D3A 0%,#0891B2 100%)' }}>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(to right,#fff 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="relative p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Best Value</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-1">All Access Bundle</h2>
            <p className="text-white/60 text-sm mb-3">Network+ · Security+ · CySA+ · 15 labs across all difficulties</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['CompTIA Network+','CompTIA Security+','CompTIA CySA+'].map(c => (
                <span key={c} className="text-xs font-semibold bg-white/10 text-white/80 px-3 py-1 rounded-full border border-white/20">{c}</span>
              ))}
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-white">£{BUNDLE.price.toFixed(2)}</span>
              <span className="text-white/40 line-through text-lg">£{BUNDLE.rrp.toFixed(2)}</span>
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full">Save £{BUNDLE.saving.toFixed(2)}</span>
            </div>
            <p className="text-white/40 text-xs mt-2">One-time · 12 months access · All 15 labs unlocked instantly</p>
          </div>
          <div className="md:text-right">
            <button onClick={() => onToggle('bundle')}
              className={`px-8 py-4 rounded-xl font-bold text-sm transition-all border-2 ${
                inBasket ? 'bg-white/10 text-white border-white/30 hover:bg-red-500/20 hover:border-red-400/50'
                         : 'bg-white text-slate-900 border-white hover:bg-cyan-50'
              }`}>
              {inBasket ? '✓ In Basket — Remove' : 'Add Bundle to Basket →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Basket bar ────────────────────────────────────────────────────────────────
function BasketBar({ basket, user, authLoading, onRemove, onCheckout, checkoutLoading }) {
  if (basket.length === 0) return null;

  const isBundle  = basket[0] === 'bundle';
  // Include key in items for remove buttons
  const items = isBundle
    ? [{ key: 'bundle', label: 'All Access Bundle', price: BUNDLE.price }]
    : basket.map(k => { const p = PACKS.find(x => x.key === k); return { key: k, label: p?.title, price: p?.price || 0 }; });

  const rawTotal  = items.reduce((t, i) => t + i.price, 0);
  const allThree  = PACKS.every(p => basket.includes(p.key));
  const displayPrice = allThree ? BUNDLE.price : rawTotal;
  const savingAmt = allThree ? (rawTotal - BUNDLE.price).toFixed(2) : null;

  const isDisabled = checkoutLoading || authLoading;
  const btnLabel   = checkoutLoading ? 'Processing…' : authLoading ? 'Loading…'
    : user ? `Checkout — £${displayPrice.toFixed(2)}` : `Sign in to Checkout — £${displayPrice.toFixed(2)}`;

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
            {savingAmt && (
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                <Tag className="w-3 h-3" />Bundle applied — saving £{savingAmt}
              </span>
            )}
            {!isBundle && basket.length === 2 && (
              <span className="text-white/50 text-xs">
                Add 3rd pack for £{(BUNDLE.price - displayPrice).toFixed(2)} more — bundle saves £{(rawTotal + 19.99 - BUNDLE.price).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <p className="text-white/50 text-xs">Total</p>
              <p className="text-white font-black text-xl">£{displayPrice.toFixed(2)}</p>
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
  const [basket,          setBasket]          = useState(() => loadBasket());
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showModal,       setShowModal]       = useState(false);
  const [error,           setError]           = useState(null);

  useEffect(() => { saveBasket(basket); }, [basket]);

  function toggleItem(key) {
    setError(null);
    if (key === 'bundle') {
      setBasket(prev => prev.includes('bundle') ? [] : ['bundle']);
    } else {
      setBasket(prev => {
        const withoutBundle = prev.filter(k => k !== 'bundle');
        return withoutBundle.includes(key) ? withoutBundle.filter(k => k !== key) : [...withoutBundle, key];
      });
    }
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
        <meta name="description" content="The official FortifyLearn store. CompTIA PBQ simulation packs for Network+, Security+ and CySA+ — representative CLI environments, objective-mapped scoring, 12 months access from £19.99." />
      </Helmet>

      {showModal && (
        <CheckoutModal basket={basket} onSuccess={() => setShowModal(false)} onClose={() => setShowModal(false)} />
      )}

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: 180 }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80&fit=crop"
            alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg,rgba(10,26,63,0.97) 0%,rgba(7,30,60,0.95) 45%,rgba(8,145,178,0.82) 100%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3"
              style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              FortifyLearn{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#22d3ee,#0891B2)' }}>Store.</span>
            </h1>
            <p className="text-white/60 text-sm">Add items to your basket — create your free FortifyLearn account at checkout.</p>
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
          {/* Section header with FL logo */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-black"
                style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                FortifyLearn
              </span>
              <span className="text-slate-300 font-light text-2xl">—</span>
              <h2 className="text-2xl font-bold text-slate-900">CompTIA PBQ Simulation Packs</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-slate-500">Representative CLI environments for CompTIA exam practice. One-time purchase · 12 months access.</p>
              <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all hover:brightness-110 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', color: '#fff' }}>
                🆓 Try a free taster lab →
              </a>
            </div>
          </div>

          <div className="mb-8"><BundleCard inBasket={basket.includes('bundle')} onToggle={toggleItem} /></div>

          <div>
            <p className="text-sm font-semibold text-slate-500 mb-4">Individual Packs</p>
            <div className="grid md:grid-cols-3 gap-6">
              {PACKS.map(pack => (
                <PackCard key={pack.key} pack={pack} inBasket={basket.includes(pack.key)} onToggle={toggleItem} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center justify-center text-slate-400 text-xs">
            {['Secure checkout via Stripe','12 months access from purchase date','No subscription — one-time payment','CompTIA Authorised Partner'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{t}</span>
            ))}
          </div>
        </div>

        {/* Free taster strip */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-slate-800 mb-1">Try before you buy — taster labs are always free</p>
            <p className="text-sm text-slate-500">One Network+ and one Security+ lab are free. Just sign up — no card needed.</p>
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
        onRemove={toggleItem}
        onCheckout={handleCheckout}
        checkoutLoading={checkoutLoading}
      />
    </div>
  );
}

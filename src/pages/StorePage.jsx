import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle2, ArrowRight, ShoppingCart, X, Tag, Loader2, Star } from 'lucide-react';

const SUPABASE_URL = 'https://kmnbtnfgeadvvkwsdyml.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttbmJ0bmZnZWFkdnZrd3NkeW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMTAxNDEsImV4cCI6MjA4Njc4NjE0MX0.T7yHQmQ3qdobyZEAXoAmDptfrj2yH-ZIJ8RfjNOpEFs';
const BASKET_KEY = 'cysec_basket';

// ── Product catalogue ───────────────────────────────────────────────────────
const PACKS = [
  {
    key: 'netplus_pack',
    title: 'CompTIA Network+',
    code: 'N10-009',
    price: 19.99,
    rrp: 24.99,
    logo: '/logos/comptia-network-plus.svg',
    labs: ['DNS server misconfiguration', 'Default gateway fault diagnosis', 'DMZ ACL troubleshooting', 'Dual ACL fault — multi-VLAN routing', 'Enterprise multi-fault recovery'],
  },
  {
    key: 'secplus_pack',
    title: 'CompTIA Security+',
    code: 'SY0-701',
    price: 19.99,
    rrp: 24.99,
    logo: '/logos/comptia-security-plus.svg',
    labs: ['Firewall rule blocking HTTPS traffic', 'Sensitive file permission hardening', 'Insecure legacy service exposure', 'Privilege escalation & audit failure', 'Post-pentest remediation'],
  },
  {
    key: 'cysa_pack',
    title: 'CompTIA CySA+',
    code: 'CS0-003',
    price: 19.99,
    rrp: 24.99,
    logo: '/logos/comptia-cysa-plus.svg',
    isNew: true,
    labs: ['Web app brute force investigation', 'Suspicious process & C2 detection', 'SSH brute force log analysis', 'Web shell & lateral movement', 'APT threat hunt + firewall containment'],
  },
];

const BUNDLE = {
  key: 'bundle',
  price: 39.99,
  rrp: 74.97,
  saving: 35.00,
};

// ── Basket helpers ──────────────────────────────────────────────────────────
function loadBasket() {
  try { return JSON.parse(localStorage.getItem(BASKET_KEY) || '[]'); }
  catch { return []; }
}
function saveBasket(items) {
  try { localStorage.setItem(BASKET_KEY, JSON.stringify(items)); }
  catch {}
}

// Compute what to actually check out — if all 3 packs are in basket, use bundle
function resolveCheckout(basket) {
  const allThree = PACKS.every(p => basket.includes(p.key));
  if (allThree) return { key: 'bundle', price: BUNDLE.price };
  return { key: basket.join('+'), price: basket.reduce((t, k) => t + (PACKS.find(p => p.key === k)?.price || 0), 0) };
}

// ── Pack card ───────────────────────────────────────────────────────────────
function PackCard({ pack, inBasket, onToggle }) {
  return (
    <div className={`relative bg-white rounded-2xl border-2 transition-all flex flex-col ${
      inBasket ? 'border-cyan-500 shadow-lg shadow-cyan-100' : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
    }`}>
      {pack.isNew && (
        <span className="absolute top-4 right-4 bg-cyan-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">New</span>
      )}
      <div className="p-6 flex-1">
        <div className="flex items-center gap-3 mb-4">
          <img src={pack.logo} alt={pack.title} className="w-11 h-11 object-contain" />
          <div>
            <p className="text-xs font-bold tracking-wider" style={{ color: '#0891B2' }}>{pack.code}</p>
            <h3 className="font-bold text-slate-900 text-base">{pack.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
          <span>📋 5 labs</span>
          <span>🎯 Easy → Expert</span>
        </div>
        <ul className="space-y-1.5 mb-6">
          {pack.labs.map(lab => (
            <li key={lab} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              {lab}
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
        <button
          onClick={() => onToggle(pack.key)}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
            inBasket
              ? 'bg-cyan-50 text-cyan-700 border-2 border-cyan-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300'
              : 'text-white border-2 border-transparent hover:brightness-110'
          }`}
          style={inBasket ? {} : { background: 'linear-gradient(135deg,#0B1D3A,#0891B2)' }}
        >
          {inBasket ? '✓ In Basket — Remove' : 'Add to Basket'}
        </button>
      </div>
    </div>
  );
}

// ── Bundle card ─────────────────────────────────────────────────────────────
function BundleCard({ inBasket, onToggle }) {
  return (
    <div className={`relative rounded-2xl border-2 transition-all overflow-hidden ${
      inBasket ? 'border-cyan-400' : 'border-transparent'
    }`}
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
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full">
                Save £{BUNDLE.saving.toFixed(2)}
              </span>
            </div>
            <p className="text-white/40 text-xs mt-2">One-time · 12 months access · All 15 labs unlocked instantly</p>
          </div>
          <div className="md:text-right">
            <button
              onClick={() => onToggle('bundle')}
              className={`px-8 py-4 rounded-xl font-bold text-sm transition-all border-2 ${
                inBasket
                  ? 'bg-white/10 text-white border-white/30 hover:bg-red-500/20 hover:border-red-400/50'
                  : 'bg-white text-slate-900 border-white hover:bg-cyan-50'
              }`}
            >
              {inBasket ? '✓ In Basket — Remove' : 'Add Bundle to Basket →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Basket panel ─────────────────────────────────────────────────────────────
function BasketBar({ basket, onRemove, onCheckout, checkoutLoading }) {
  if (basket.length === 0) return null;

  const isBundle = basket[0] === 'bundle';
  const items = isBundle ? [{ label: 'All Access Bundle', price: BUNDLE.price }]
    : basket.map(k => { const p = PACKS.find(x => x.key === k); return { label: p?.title, price: p?.price || 0 }; });

  const rawTotal = items.reduce((t, i) => t + i.price, 0);
  const allThree = PACKS.every(p => basket.includes(p.key));
  const displayPrice = allThree ? BUNDLE.price : rawTotal;
  const savingAmount = allThree ? (rawTotal - BUNDLE.price).toFixed(2) : null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0B1D3A,#0D2645)' }}>
        <div className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 flex-1 flex-wrap">
            <ShoppingCart className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <div className="flex flex-wrap gap-2">
              {items.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                  {item.label}
                  <button onClick={() => onRemove(basket[i])} className="text-white/50 hover:text-white ml-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            {savingAmount && (
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                <Tag className="w-3 h-3" />
                Bundle applied — saving £{savingAmount}
              </span>
            )}
            {!isBundle && basket.length === 2 && (
              <span className="text-white/50 text-xs">
                Add the 3rd pack for just £{(BUNDLE.price - displayPrice).toFixed(2)} more — bundle saves £{(rawTotal + 19.99 - BUNDLE.price).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <p className="text-white/50 text-xs">Total</p>
              <p className="text-white font-black text-xl">£{displayPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={onCheckout}
              disabled={checkoutLoading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-900 text-sm transition-all hover:brightness-110 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#22d3ee,#0891B2)' }}
            >
              {checkoutLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Checkout — £{displayPrice.toFixed(2)} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────
export default function StorePage() {
  const { user, session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [basket, setBasket] = useState(() => loadBasket());
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState(null);

  // After login redirect, restore basket and auto-prompt checkout if basket has items
  useEffect(() => {
    if (!authLoading && user && session) {
      const stored = loadBasket();
      if (stored.length > 0) {
        setBasket(stored);
      }
    }
  }, [authLoading, user, session]);

  // Sync basket to localStorage whenever it changes
  useEffect(() => {
    saveBasket(basket);
  }, [basket]);

  function toggleItem(key) {
    setError(null);
    if (key === 'bundle') {
      // Bundle replaces all individual packs
      setBasket(prev => prev.includes('bundle') ? [] : ['bundle']);
    } else {
      setBasket(prev => {
        // Remove bundle if individual pack added
        const withoutBundle = prev.filter(k => k !== 'bundle');
        return withoutBundle.includes(key)
          ? withoutBundle.filter(k => k !== key)
          : [...withoutBundle, key];
      });
    }
  }

  async function handleCheckout() {
    if (basket.length === 0) return;

    if (!user || !session) {
      // Save basket, redirect to login — will restore on return
      navigate('/login', { state: { from: { pathname: '/store' } } });
      return;
    }

    setCheckoutLoading(true);
    setError(null);

    // If all 3 packs selected, use bundle
    const allThree = PACKS.every(p => basket.includes(p.key));
    const productKey = (basket.includes('bundle') || allThree) ? 'bundle'
      : basket.length === 1 ? basket[0]
      : basket[0]; // For 2 packs we still use first (edge fn will need updating for multi later)

    // For multi-pack, use the keys list
    const isMulti = !basket.includes('bundle') && basket.length > 1 && !allThree;

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          product_key: productKey,
          product_keys: isMulti ? basket : undefined,
          cancel_url: 'https://cy-sec.co.uk/store',
        }),
      });
      const data = await res.json();
      if (data.url) {
        localStorage.removeItem(BASKET_KEY); // Clear basket on successful redirect
        window.location.href = data.url;
      } else {
        setError(data.error || 'Checkout unavailable. Please try again or contact info@cy-sec.co.uk.');
        setCheckoutLoading(false);
      }
    } catch {
      setError('Checkout unavailable. Please try again or contact info@cy-sec.co.uk.');
      setCheckoutLoading(false);
    }
  }

  const inBasket = (key) => basket.includes(key) || (key !== 'bundle' && PACKS.every(p => basket.includes(p.key)) && basket.includes(key));

  return (
    <div className="min-h-screen pb-32" style={{ background: '#F8FAFC' }}>
      <Helmet>
        <title>Cy-Sec Shop — FortifyLearn PBQ Packs | Cy-Sec</title>
        <meta name="description" content="The official Cy-Sec shop. CompTIA PBQ simulation packs for Network+, Security+ and CySA+ — representative CLI environments, objective-mapped scoring, 12 months access from £19.99." />
      </Helmet>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ minHeight: 280 }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80&fit=crop"
            alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg,rgba(10,26,63,0.97) 0%,rgba(7,30,60,0.95) 45%,rgba(8,145,178,0.82) 100%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">Official Cy-Sec Shop</p>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3"
              style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Cy-Sec<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg,#22d3ee,#0891B2)' }}>Shop.</span>
            </h1>
            <p className="text-white/60 text-sm">Add items to your basket — no account needed until checkout.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-12">

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-5 py-3 rounded-xl flex items-start gap-2">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />{error}
          </div>
        )}

        {/* ── FortifyLearn PBQ Packs section ── */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">FortifyLearn — CompTIA PBQ Simulation Packs</h2>
            <p className="text-sm text-slate-500">
              Representative CLI environments for CompTIA exam practice. One-time purchase · 12 months access.
              <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
                className="ml-2 font-semibold hover:underline" style={{ color: '#0891B2' }}>
                Try a free taster lab first →
              </a>
            </p>
          </div>

          {/* Bundle */}
          <div className="mb-8">
            <BundleCard inBasket={basket.includes('bundle')} onToggle={toggleItem} />
          </div>

          {/* Individual packs */}
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-4">Individual Packs</p>
            <div className="grid md:grid-cols-3 gap-6">
              {PACKS.map(pack => (
                <PackCard
                  key={pack.key}
                  pack={pack}
                  inBasket={basket.includes(pack.key)}
                  onToggle={toggleItem}
                />
              ))}
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap gap-4 items-center justify-center text-slate-400 text-xs">
            {['Secure checkout via Stripe', '12 months access from purchase date', 'No subscription — one-time payment', 'CompTIA Authorised Partner'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Free taster ── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
          <p className="font-semibold text-slate-800 mb-1">Try before you buy — taster labs are always free</p>
          <p className="text-sm text-slate-500 mb-4">One Network+ and one Security+ lab are free. Just sign up — no card needed.</p>
          <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ color: '#0891B2' }}>
            Launch FortifyLearn <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* ── Sticky basket bar ── */}
      <BasketBar
        basket={basket}
        onRemove={(key) => toggleItem(key)}
        onCheckout={handleCheckout}
        checkoutLoading={checkoutLoading}
      />
    </div>
  );
}

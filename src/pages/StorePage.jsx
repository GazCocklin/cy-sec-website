import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Terminal, Zap, Lock, CheckCircle2, ArrowRight, BookOpen, Target, Trophy, ShieldCheck, Clock, Star } from 'lucide-react';

const SUPABASE_URL = 'https://kmnbtnfgeadvvkwsdyml.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttbmJ0bmZnZWFkdnZrd3NkeW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMTAxNDEsImV4cCI6MjA4Njc4NjE0MX0.T7yHQmQ3qdobyZEAXoAmDptfrj2yH-ZIJ8RfjNOpEFs';

const packs = [
  {
    key: 'netplus_pack',
    name: 'CompTIA Network+',
    code: 'N10-009',
    price: 19.99,
    rrp: 24.99,
    labs: 5,
    level: 'Easy → Expert',
    logo: '/logos/comptia-network-plus.svg',
    tag: null,
    scenarios: [
      'DNS server misconfiguration',
      'Default gateway fault diagnosis',
      'DMZ ACL troubleshooting',
      'Dual ACL fault — multi-VLAN routing',
      'Enterprise multi-fault recovery',
    ],
  },
  {
    key: 'secplus_pack',
    name: 'CompTIA Security+',
    code: 'SY0-701',
    price: 19.99,
    rrp: 24.99,
    labs: 5,
    level: 'Easy → Expert',
    logo: '/logos/comptia-security-plus.svg',
    tag: null,
    scenarios: [
      'Firewall rule blocking HTTPS traffic',
      'Sensitive file permission hardening',
      'Insecure legacy service exposure',
      'Privilege escalation & audit failure',
      'Post-pentest remediation',
    ],
  },
  {
    key: 'cysa_pack',
    name: 'CompTIA CySA+',
    code: 'CS0-003',
    price: 19.99,
    rrp: 24.99,
    labs: 5,
    level: 'Easy → Expert',
    logo: '/logos/comptia-cysa-plus.svg',
    tag: 'New',
    scenarios: [
      'Web app brute force investigation',
      'Suspicious process & C2 detection',
      'SSH brute force log analysis',
      'Web shell & lateral movement',
      'APT threat hunt + firewall containment',
    ],
  },
];

const bundle = {
  key: 'bundle',
  name: 'All Access Bundle',
  subtitle: 'Network+ · Security+ · CySA+',
  price: 39.99,
  rrp: 59.97,
  labs: 15,
  saving: '£19.98',
};

function PackCard({ pack, onBuy, loading }) {
  const [hovered, setHovered] = useState(false);
  const isBuying = loading === pack.key;
  const accent = '#0891B2';
  const accentDark = '#065F7A';

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'white',
        border: `1.5px solid ${hovered ? accent + '50' : '#e2e8f0'}`,
        boxShadow: hovered ? `0 16px 48px ${accent}18` : '0 2px 16px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-3px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: 4, background: `linear-gradient(90deg, ${accentDark}, ${accent})` }} />

      {pack.tag && (
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: accent }}>
          {pack.tag}
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <img src={pack.logo} alt={pack.name} className="w-10 h-10 object-contain" />
          <div>
            <div className="font-bold text-slate-800 text-base leading-tight">{pack.name}</div>
            <div className="text-xs font-mono font-semibold mt-0.5" style={{ color: accent }}>{pack.code}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <BookOpen size={12} style={{ color: accent }} />
            <span><strong className="text-slate-700">{pack.labs}</strong> labs</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Target size={12} style={{ color: accent }} />
            <span>{pack.level}</span>
          </div>
        </div>

        <ul className="space-y-2 mb-6 flex-grow">
          {pack.scenarios.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
              {s}
            </li>
          ))}
        </ul>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-black text-slate-800">£{pack.price.toFixed(2)}</span>
          <span className="text-sm text-slate-400 line-through">£{pack.rrp.toFixed(2)}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(16,185,129,0.1)', color: '#059669' }}>
            Early access
          </span>
        </div>

        <button
          onClick={() => onBuy(pack.key)}
          disabled={isBuying}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 disabled:opacity-60"
          style={{
            background: `linear-gradient(135deg, ${accentDark}, ${accent})`,
            boxShadow: `0 4px 16px ${accent}35`,
          }}
        >
          {isBuying ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Redirecting…
            </span>
          ) : (
            <>Buy Pack — £{pack.price.toFixed(2)} <ArrowRight size={14} /></>
          )}
        </button>
        <p className="text-center text-xs text-slate-400 mt-2">One-time purchase · 12 months access</p>
      </div>
    </div>
  );
}

function BundleCard({ onBuy, loading }) {
  const [hovered, setHovered] = useState(false);
  const isBuying = loading === bundle.key;

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, #0A1E3F 0%, #0a5c8a 60%, #0891B2 100%)',
        border: '1.5px solid rgba(8,145,178,0.4)',
        boxShadow: hovered ? '0 24px 64px rgba(8,145,178,0.25)' : '0 8px 32px rgba(8,145,178,0.12)',
        transform: hovered ? 'translateY(-3px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(8,145,178,0.25) 0%, transparent 60%)' }} />

      <div className="relative p-8 flex flex-col lg:flex-row items-start lg:items-center gap-8">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-yellow-400" />
            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-yellow-400"
              style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}>
              Best Value — Save {bundle.saving}
            </span>
          </div>
          <h3 className="text-2xl font-black text-white mb-1" style={{ letterSpacing: '-0.02em' }}>
            {bundle.name}
          </h3>
          <p className="text-slate-300 text-sm mb-5">{bundle.subtitle} · {bundle.labs} labs across all difficulties</p>
          <div className="flex flex-wrap gap-2">
            {['CompTIA Network+', 'CompTIA Security+', 'CompTIA CySA+'].map((cert, i) => (
              <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#bae6fd', border: '1px solid rgba(255,255,255,0.15)' }}>
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col items-center lg:items-end gap-4 lg:min-w-48">
          <div className="text-center lg:text-right">
            <div className="flex items-baseline gap-2 justify-center lg:justify-end">
              <span className="text-4xl font-black text-white">£{bundle.price.toFixed(2)}</span>
            </div>
            <div className="text-sm text-slate-400 line-through">£{bundle.rrp.toFixed(2)} separately</div>
          </div>
          <button
            onClick={() => onBuy(bundle.key)}
            disabled={isBuying}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 disabled:opacity-60 w-full lg:w-auto"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}
          >
            {isBuying ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Redirecting…
              </span>
            ) : (
              <>Get All Access — £{bundle.price.toFixed(2)} <ArrowRight size={14} /></>
            )}
          </button>
          <p className="text-xs text-slate-400 text-center">One-time · 12 months access · All 15 labs unlocked instantly</p>
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const handleBuy = async (productKey) => {
    if (!user || !session) {
      navigate('/fortify-one/login', { state: { from: { pathname: '/store' } } });
      return;
    }
    setLoading(productKey);
    setError(null);
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
          cancel_url: 'https://cy-sec.co.uk/store',
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Checkout is temporarily unavailable. Please try again shortly or contact info@cy-sec.co.uk.');
        setLoading(null);
      }
    } catch (e) {
      setError('Checkout is temporarily unavailable. Please try again shortly or contact info@cy-sec.co.uk.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      <Helmet>
        <title>Cy-Sec Shop — FortifyLearn PBQ Packs | Cy-Sec</title>
        <meta name="description" content="The official Cy-Sec shop. CompTIA PBQ simulation packs for Network+, Security+ and CySA+ — representative CLI environments, objective-mapped scoring, 12 months access from £19.99." />
      </Helmet>

      {/* Hero with photo background */}
      <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80&fit=crop"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(10,26,63,0.97) 0%, rgba(7,30,60,0.95) 45%, rgba(8,145,178,0.82) 100%)' }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(#0891B2 1px, transparent 1px), linear-gradient(to right, #0891B2 1px, transparent 1px)', backgroundSize: '56px 56px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <Terminal size={11} /> Powered by FortifyLearn
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <Zap size={11} /> Early access pricing
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
                style={{ letterSpacing: '-0.03em', fontFamily: 'Bricolage Grotesque, Inter, system-ui, sans-serif', lineHeight: 1.1 }}>
                CompTIA PBQ<br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg, #22d3ee, #0891B2)' }}>
                  Simulation Packs.
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                Performance-based questions account for <strong className="text-white">up to 30% of your CompTIA exam score.</strong> Practise in a live CLI environment — real commands, real topology, real scoring.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                {[
                  { icon: ShieldCheck, text: 'Live Cisco IOS topology' },
                  { icon: Clock, text: '12 months access' },
                  { icon: Star, text: 'One-time payment' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-slate-300">
                    <Icon size={14} style={{ color: '#0891B2' }} />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: cert showcase */}
            <div className="hidden lg:flex flex-col gap-3">
              {[
                { logo: '/logos/comptia-network-plus.svg', name: 'Network+', code: 'N10-009', labs: 5 },
                { logo: '/logos/comptia-security-plus.svg', name: 'Security+', code: 'SY0-701', labs: 5 },
                { logo: '/logos/comptia-cysa-plus.svg', name: 'CySA+', code: 'CS0-003', labs: 5, isNew: true },
              ].map((cert, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                  <img src={cert.logo} alt={cert.name} className="w-10 h-10 object-contain flex-shrink-0" />
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">CompTIA {cert.name}</span>
                      {cert.isNew && (
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded text-white"
                          style={{ background: '#0891B2' }}>New</span>
                      )}
                    </div>
                    <span className="text-xs font-mono" style={{ color: '#22d3ee' }}>{cert.code}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-sm">£19.99</div>
                    <div className="text-xs text-slate-400">{cert.labs} labs</div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between px-5 py-3 rounded-xl mt-1"
                style={{ background: 'linear-gradient(90deg, rgba(8,145,178,0.2), rgba(8,145,178,0.1))', border: '1px solid rgba(8,145,178,0.3)' }}>
                <span className="text-sm font-semibold text-white">All 3 packs — All Access Bundle</span>
                <span className="font-black text-white">£39.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {!user && (
          <div className="flex items-center gap-3 mb-8 p-4 rounded-xl"
            style={{ background: 'rgba(8,145,178,0.06)', border: '1px solid rgba(8,145,178,0.2)' }}>
            <Lock size={16} className="flex-shrink-0" style={{ color: '#0891B2' }} />
            <p className="text-sm text-slate-600">
              You need a FortifyLearn account to purchase.{' '}
              <button onClick={() => navigate('/fortify-one/login', { state: { from: { pathname: '/store' } } })}
                className="font-semibold underline" style={{ color: '#0891B2' }}>
                Sign in or create an account →
              </button>
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 mb-8 p-4 rounded-xl bg-red-50 border border-red-200">
            <Shield size={16} className="flex-shrink-0 mt-0.5 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* ─── FortifyLearn PBQ Simulation Packs ─── */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-1">FortifyLearn — CompTIA PBQ Simulation Packs</h2>
          <p className="text-sm text-slate-500 mb-6">Practice performance-based questions in a representative CLI environment. One-time purchase · 12 months access.</p>
        </div>
        <div className="mb-8">
          <BundleCard onBuy={handleBuy} loading={loading} />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-700 mb-1">Individual Packs</h2>
          <p className="text-sm text-slate-500">Purchase a single certification pack — or grab the bundle above for all three.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {packs.map((pack) => (
            <PackCard key={pack.key} pack={pack} onBuy={handleBuy} loading={loading} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-2xl"
          style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div>
            <p className="font-semibold text-slate-800">Try before you buy — taster labs are always free</p>
            <p className="text-sm text-slate-500 mt-0.5">One Network+ and one Security+ lab are free. No card required — just create an account.</p>
          </div>
          <a href="https://fortifylearn.co.uk" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={{ color: '#059669', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
            Start free labs <ArrowRight size={13} />
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          {['Secure checkout via Stripe', '12 months access from purchase date', 'No subscription — one-time payment'].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <CheckCircle2 size={13} style={{ color: '#10b981' }} />
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

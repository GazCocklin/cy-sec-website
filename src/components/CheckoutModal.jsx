// ── Checkout modal ───────────────────────────────────────────────────────────
// Extracted verbatim from StorePage.jsx on 21-Aug-2026 (auth flow unchanged) so
// the basket drawer and the store can share one checkout surface.

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { X, Loader2, LogIn, Eye, EyeOff } from 'lucide-react';
import { basketTotal } from '@/lib/catalogue';
import { triggerStripe } from '@/lib/checkout';

export default function CheckoutModal({ basket, onClose }) {
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

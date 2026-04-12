import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';

const ADMIN_EMAILS = ['gazc@cy-sec.co.uk', 'aimeec@cy-sec.co.uk'];

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) { setError(signInError.message); setLoading(false); return; }
    const userEmail = data?.user?.email?.toLowerCase() || '';
    if (!ADMIN_EMAILS.includes(userEmail)) {
      await supabase.auth.signOut();
      setError('Access denied. This portal is for Cy-Sec administrators only.');
      setLoading(false);
      return;
    }
    navigate(from, { replace: true });
  };

  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
  const EyeOffIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #060e1f 0%, #0B1D3A 55%, #0e3a5a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Segoe UI', system-ui, sans-serif", padding: '24px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(8,145,178,1) 1px, transparent 1px), linear-gradient(to right, rgba(8,145,178,1) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      <div style={{ width: '100%', maxWidth: 400, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <img src="/logos/cysec-favicon.svg" alt="Cy-Sec" style={{ width: 44, height: 44, borderRadius: 10 }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1.1 }}>Cy-Sec</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#7DD3E8', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 1 }}>Admin Portal</div>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Authorised personnel only</p>
        </div>
        <div style={{
          background: '#fff', borderRadius: 16,
          boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)',
          padding: '32px',
        }}>
          {error && (
            <div style={{
              background: '#fff7ed', border: '1px solid #fed7aa', borderLeft: '3px solid #f97316',
              borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#9a3412',
            }}>{error}</div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Email address
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@cy-sec.co.uk" autoComplete="email"
                style={{ width: '100%', boxSizing: 'border-box', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 9, fontSize: 14, color: '#0B1D3A', background: '#f8fafc', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#0891B2'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin(e)}
                  autoComplete="current-password"
                  style={{ width: '100%', boxSizing: 'border-box', padding: '11px 42px 11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 9, fontSize: 14, color: '#0B1D3A', background: '#f8fafc', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#0891B2'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            <button
              onClick={handleLogin}
              disabled={loading || !email || !password}
              style={{
                width: '100%', padding: '13px',
                background: (!email || !password || loading) ? 'rgba(8,145,178,0.4)' : 'linear-gradient(135deg,#0B1D3A,#0891B2)',
                color: '#fff', border: 'none', borderRadius: 9, fontSize: 14, fontWeight: 700,
                cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', marginTop: 4, letterSpacing: '-0.01em',
              }}
            >{loading ? 'Signing in\u2026' : 'Sign in to admin'}</button>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          Not admin?{' '}
          <a href="/fortify-one/login" style={{ color: '#7DD3E8', textDecoration: 'none', fontWeight: 600 }}>FortifyOne login &rarr;</a>
        </p>
      </div>
    </div>
  );
}

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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f4fd 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, #1a6fc4, #0ea5e9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, boxShadow: '0 4px 14px rgba(26,111,196,0.35)',
            }}>🛡️</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.04em' }}>Cy-Sec</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1a6fc4', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: -2 }}>Admin Portal</div>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: '#64748b', marginTop: 12 }}>Authorised personnel only</p>
        </div>

        <div style={{
          background: '#ffffff', borderRadius: 16,
          boxShadow: '0 4px 24px rgba(15,23,42,0.10), 0 1px 4px rgba(15,23,42,0.06)',
          padding: '32px', border: '1px solid #e2e8f0',
        }}>
          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: 8, padding: '10px 14px', marginBottom: 20,
              fontSize: 13, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 8,
            }}>⚠️ {error}</div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                Email Address
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@cy-sec.co.uk" autoComplete="email"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8,
                  fontSize: 14, color: '#0f172a', background: '#f8fafc',
                  fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#1a6fc4'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin(e)}
                  placeholder="••••••••••••••••" autoComplete="current-password"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '10px 40px 10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8,
                    fontSize: 14, color: '#0f172a', background: '#f8fafc',
                    fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#1a6fc4'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
                <button type="button" onClick={() => setShowPassword(p => !p)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 16 }}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading || !email || !password}
              style={{
                width: '100%', padding: '11px',
                background: 'linear-gradient(135deg, #1a6fc4, #0ea5e9)',
                color: '#fff', border: 'none', borderRadius: 8,
                fontSize: 14, fontWeight: 700, cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', boxShadow: '0 2px 8px rgba(26,111,196,0.30)',
                opacity: (!email || !password || loading) ? 0.6 : 1,
                marginTop: 4,
              }}
            >{loading ? 'Signing in…' : 'Sign In to Admin'}</button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#94a3b8' }}>
          Not admin?{' '}
          <a href="/fortify-one/login" style={{ color: '#1a6fc4', textDecoration: 'none', fontWeight: 600 }}>
            FortifyOne Login →
          </a>
        </p>
      </div>
    </div>
  );
}

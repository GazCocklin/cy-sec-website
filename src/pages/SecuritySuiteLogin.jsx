import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';

const SecuritySuiteLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, session, user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login'); // login | reset

  useEffect(() => {
    if (!authLoading && user && session) {
      const from = location.state?.from?.pathname || '/fortify-one/dashboard';
      navigate(from, { replace: true });
    }
  }, [session, user, authLoading, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (mode === 'login') {
      const { error: err } = await signIn(email, password);
      if (err) setError(err.message || 'Invalid credentials. Please try again.');
    } else {
      // reset — placeholder, toast for now
      toast({ title: 'Reset email sent', description: 'Check your inbox for a password reset link.' });
    }
    setLoading(false);
  };

  const FF = "'Segoe UI','SF Pro Display',-apple-system,sans-serif";

  const inp = {
    width: '100%',
    padding: '11px 14px',
    background: 'rgba(0,0,0,0.03)',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    color: '#0f172a',
    fontSize: 14,
    fontFamily: FF,
    outline: 'none',
    boxSizing: 'border-box',
  };

  const stats = [
    ['6+', 'Frameworks'],
    ['ISO 27001', 'DORA · NIS2'],
    ['12mo', 'Access'],
  ];

  return (
    <>
      <Helmet>
        <title>FortifyOne — Sign In</title>
        <meta name="description" content="Sign in to FortifyOne — your cybersecurity compliance and GRC platform." />
      </Helmet>

      <style>{`
        @keyframes fo-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        .fo-fade { animation: fo-fadeUp .6s ease both; }
        .fo-d1   { animation-delay: .1s; }
        .fo-d2   { animation-delay: .2s; }
        .fo-d3   { animation-delay: .3s; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        fontFamily: FF,
        background: '#dde4ed',
      }}>

        {/* ── LEFT PANEL ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 72px',
          maxWidth: 560,
          background: [
            'linear-gradient(160deg, rgba(7,25,41,0.91) 0%, rgba(10,34,64,0.87) 45%, rgba(11,92,107,0.80) 100%)',
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80&fit=crop') center/cover no-repeat",
          ].join(', '),
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '20px 0 60px -4px rgba(0,0,0,0.55)',
        }}>
          {/* dot grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }} />

          {/* Logo */}
          <div className="fo-fade" style={{ marginBottom: 48 }}>
            <img
              src="/logos/fortifyone-logo-dark.svg"
              alt="FortifyOne"
              style={{ height: 36, display: 'block' }}
            />
          </div>

          {/* Headline */}
          <h1 className="fo-fade fo-d1" style={{
            fontSize: 40, fontWeight: 800, lineHeight: 1.12,
            letterSpacing: '-.03em', marginBottom: 20, color: '#ffffff',
          }}>
            All your cyber risk.<br />
            <span style={{ color: '#0891B2' }}>One platform.</span>
          </h1>

          {/* Subtext */}
          <p className="fo-fade fo-d2" style={{
            fontSize: 15, color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.65, maxWidth: 400,
          }}>
            ISO 27001, DORA, NIS2, SOC 2 and more. Automated assessments,
            vendor risk and compliance reporting.
          </p>

          {/* Stats */}
          <div className="fo-fade fo-d3" style={{ display: 'flex', gap: 40, marginTop: 48 }}>
            {stats.map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#0891B2' }}>{val}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="fo-fade" style={{
            width: 380,
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 20,
            padding: 36,
            boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          }}>
            {/* Card logo */}
            <div style={{ marginBottom: 24 }}>
              <img
                src="/logos/fortifyone-logo.svg"
                alt="FortifyOne"
                style={{ height: 40, display: 'block' }}
              />
            </div>

            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 28 }}>
              {mode === 'login' ? 'Sign in to your security dashboard.' : 'Enter your email to reset your password.'}
            </p>

            {error && (
              <div style={{
                padding: '10px 14px', borderRadius: 8, fontSize: 13,
                background: '#fee2e2', border: '1px solid #fca5a5',
                color: '#dc2626', marginBottom: 16,
              }}>{error}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  style={inp} type="email" placeholder="you@company.com"
                  value={email} onChange={e => setEmail(e.target.value)} required
                />
              </div>

              {mode === 'login' && (
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      style={{ ...inp, paddingRight: 42 }}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password} onChange={e => setPassword(e.target.value)} required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(s => !s)}
                      style={{
                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: '#94a3b8', fontSize: 13, fontFamily: FF,
                      }}
                    >{showPassword ? 'Hide' : 'Show'}</button>
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading} style={{
                padding: '12px 0', borderRadius: 9, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #0B1D3A, #0891B2)',
                color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: FF,
                opacity: loading ? 0.7 : 1, transition: 'opacity .15s',
                boxShadow: '0 0 16px rgba(8,145,178,0.25)',
              }}>
                {loading ? 'Please wait…' : mode === 'login' ? 'Sign In →' : 'Send Reset Email'}
              </button>
            </form>

            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              {mode === 'login' ? (
                <button onClick={() => { setMode('reset'); setError(''); }} style={{
                  background: 'none', border: 'none', color: '#94a3b8',
                  cursor: 'pointer', fontSize: 13, fontFamily: FF,
                }}>Forgot password?</button>
              ) : (
                <button onClick={() => { setMode('login'); setError(''); }} style={{
                  background: 'none', border: 'none', color: '#0891B2',
                  cursor: 'pointer', fontSize: 13, fontFamily: FF,
                }}>Back to sign in</button>
              )}
            </div>

            <div style={{
              marginTop: 20, padding: '12px 16px', borderRadius: 10,
              background: '#f8fafc', border: '1px solid #e2e8f0',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', color: '#94a3b8', marginBottom: 4 }}>
                PART OF THE CY-SEC ECOSYSTEM
              </p>
              <p style={{ fontSize: 12, color: '#64748b' }}>
                FortifyOne works alongside{' '}
                <a href="https://fortifylearn.co.uk" target="_blank" rel="noreferrer"
                   style={{ color: '#0891B2', textDecoration: 'none' }}>FortifyLearn</a>
                {' '}— one login for both.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecuritySuiteLogin;

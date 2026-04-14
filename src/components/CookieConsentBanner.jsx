import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'cysec_cookie_consent';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set(COOKIE_CONSENT_KEY, 'granted', { expires: 365 });
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set(COOKIE_CONSENT_KEY, 'denied', { expires: 365 });
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ backgroundColor: '#0B1D3A', borderTop: '1px solid rgba(8,145,178,0.3)' }}
          className="fixed bottom-0 left-0 right-0 z-[100] shadow-2xl"
        >
          {/* Teal accent line */}
          <div style={{ height: '2px', background: 'linear-gradient(90deg, #0B1D3A, #0891B2, #0B1D3A)' }} />

          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Icon + text */}
            <div className="flex items-center gap-3">
              <ShieldCheck
                className="flex-shrink-0"
                style={{ width: 28, height: 28, color: '#0891B2' }}
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>
                We use cookies for analytics to improve your experience. You can accept or decline &mdash; see our{' '}
                <Link
                  to="/privacy-policy"
                  style={{ color: '#0891B2' }}
                  className="hover:underline font-medium"
                >
                  Privacy Policy
                </Link>{' '}
                for details.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Accept — navy→teal gradient */}
              <button
                onClick={handleAccept}
                style={{
                  background: 'linear-gradient(135deg, #0B1D3A, #0891B2)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Accept
              </button>

              {/* Decline — ghost teal border */}
              <button
                onClick={handleDecline}
                style={{
                  background: 'transparent',
                  color: '#7DD3E8',
                  border: '1px solid rgba(8,145,178,0.5)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#0891B2';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(8,145,178,0.5)';
                  e.currentTarget.style.color = '#7DD3E8';
                }}
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;

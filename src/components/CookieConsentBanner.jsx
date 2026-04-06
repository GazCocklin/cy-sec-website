import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
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
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set(COOKIE_CONSENT_KEY, 'denied', { expires: 365 });
    if (typeof window.gtag === 'function') {
       window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
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
          className="fixed bottom-0 left-0 right-0 z-[100] bg-slate-800 text-white shadow-2xl p-4"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <p className="text-sm">
                We use cookies to enhance your experience and for analytics. By clicking "Accept", you agree to our use of cookies.
                Read our <Link to="/privacy-policy" className="underline hover:text-yellow-300">Privacy Policy</Link> for more details.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button onClick={handleAccept} className="bg-blue-600 hover:bg-blue-700">
                Accept
              </Button>
              <Button variant="outline" onClick={handleDecline} className="text-blue-300 border-blue-300 hover:bg-slate-700 hover:text-blue-200">
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
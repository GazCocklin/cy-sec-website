import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const consent = Cookies.get('cysec_cookie_consent');
    if (consent === 'granted' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-LRMVJPVBMZ', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};

export default usePageTracking;
import { useState, useEffect, useCallback } from 'react';

export const useWidgetScript = () => {
  const [status, setStatus] = useState(() => {
    const existing = document.getElementById('cysec-widget-script');
    return existing ? (existing.getAttribute('data-status') || 'loading') : 'idle';
  });

  const loadScript = useCallback(() => {
    const scriptId = 'cysec-widget-script';
    let script = document.getElementById(scriptId);

    const onScriptLoad = () => {
      console.log("Widget script loaded successfully");
      if (script) script.setAttribute('data-status', 'ready');
      setStatus('ready');
    };

    const onScriptError = (error) => {
      console.error("Widget script failed to load:", error);
      if (script) script.setAttribute('data-status', 'error');
      setStatus('error');
    };

    if (script) {
      const currentStatus = script.getAttribute('data-status');
      if (currentStatus === 'ready') {
        setStatus('ready');
        return;
      } else if (currentStatus === 'error') {
        setStatus('error');
        return;
      }
      
      // If script exists but is still loading, attach listeners to update this component's state
      script.addEventListener('load', onScriptLoad);
      script.addEventListener('error', onScriptError);
      
      return () => {
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);
      };
    }

    console.log("Widget script loading...");
    setStatus('loading');
    
    script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cy-sec.online/widget.js';
    script.async = true;
    script.setAttribute('data-status', 'loading');
    
    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);
    document.head.appendChild(script);

    // Timeout fallback (10 seconds)
    const timeoutId = setTimeout(() => {
      const currentScript = document.getElementById(scriptId);
      if (currentScript && currentScript.getAttribute('data-status') !== 'ready') {
        console.error("Widget initialization timeout - fallback shown");
        currentScript.setAttribute('data-status', 'error');
        setStatus('error');
      }
    }, 10000);

    return () => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const cleanup = loadScript();
    return () => {
      if (cleanup) cleanup();
    };
  }, [loadScript]);

  const retry = useCallback(() => {
    const script = document.getElementById('cysec-widget-script');
    if (script) script.remove();
    setStatus('idle');
  }, []);

  return { status, retry };
};
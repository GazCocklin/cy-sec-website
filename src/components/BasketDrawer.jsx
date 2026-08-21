// ── BasketDrawer ─────────────────────────────────────────────────────────────
// The one basket UI on the site. Mounted globally in App.jsx beside
// <BasketProvider>, so every cert landing page completes a purchase without a
// navigation — the buyer never leaves the page that convinced them.
//
// Behaviour: opens on add and on the navbar basket button; closes on ×, on
// scrim click and on Escape; traps focus while open; locks body scroll;
// restores focus to the trigger on close (handled by useBasket).

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useBasket } from '@/hooks/useBasket';
import { lookup, formatPrice } from '@/lib/catalogue';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function BasketDrawer({ onCheckout }) {
  const {
    items, total, upsell, isDrawerOpen, closeDrawer, remove, switchToBundle,
  } = useBasket();

  const panelRef = useRef(null);

  // Escape to close + focus trap.
  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape') { e.stopPropagation(); closeDrawer(); return; }
    if (e.key !== 'Tab') return;

    const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
    if (!nodes?.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }, [closeDrawer]);

  // Lock body scroll while open, and move focus into the panel.
  useEffect(() => {
    if (!isDrawerOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => {
      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
      nodes?.[0]?.focus();
    }, 60);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [isDrawerOpen]);

  const isEmpty = items.length === 0;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={closeDrawer}
            className="fixed inset-0"
            style={{
              zIndex: 100,
              background: 'rgba(11,29,58,0.45)',
              backdropFilter: 'blur(2px)',
            }}
          />

          {/* Panel */}
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Your basket"
            onKeyDown={onKeyDown}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full flex flex-col bg-white"
            style={{
              zIndex: 101,
              width: 400,
              maxWidth: '92vw',
              boxShadow: '-24px 0 60px rgba(11,29,58,0.22)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between shrink-0"
              style={{ padding: '24px 28px', borderBottom: '1px solid #e2e8f0' }}
            >
              <h2
                className="font-extrabold"
                style={{ fontSize: 18, letterSpacing: '-0.3px', color: '#0B1D3A' }}
              >
                Your basket
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close basket"
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto" style={{ padding: '0 28px' }}>
              {isEmpty ? (
                <p
                  className="text-center"
                  style={{ fontSize: 14, color: '#94a3b8', padding: '48px 8px', textWrap: 'pretty' }}
                >
                  Nothing here yet. Add a lab pack and it will appear without leaving this page.
                </p>
              ) : (
                items.map((key) => {
                  const entry = lookup(key);
                  if (!entry) return null;
                  const { cert, config } = entry;
                  return (
                    <div
                      key={key}
                      className="flex items-start justify-between gap-4"
                      style={{ padding: '20px 0', borderBottom: '1px solid #f1f5f9' }}
                    >
                      <div className="min-w-0">
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#0B1D3A' }}>
                          {cert.short} — {config.cardTitle || config.label}
                        </p>
                        <p style={{ fontSize: 12.5, lineHeight: 1.5, color: '#64748b', marginTop: 2 }}>
                          {config.sub}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(key)}
                          className="underline transition-colors"
                          style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#dc2626'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; }}
                        >
                          Remove
                        </button>
                      </div>
                      <span
                        className="shrink-0"
                        style={{ fontSize: 15, fontWeight: 700, color: '#0B1D3A' }}
                      >
                        {formatPrice(config.price)}
                      </span>
                    </div>
                  );
                })
              )}

              {/* Contextual bundle upsell — only when switching actually saves money */}
              {upsell && (
                <div
                  style={{
                    background: '#e0f2f9',
                    border: '1px solid rgba(8,145,178,0.25)',
                    borderRadius: 12,
                    padding: '16px 18px',
                    margin: '20px 0',
                  }}
                >
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: '#0B1D3A', textWrap: 'pretty' }}>
                    Add the <strong>Exam Engine</strong> and you have the full Exam Prep Bundle
                    — for <strong>{formatPrice(upsell.saving)} less</strong> than buying separately.
                  </p>
                  <button
                    type="button"
                    onClick={() => switchToBundle(upsell.certKey, upsell.bundleKey)}
                    className="mt-3 text-white transition-all hover:brightness-110"
                    style={{
                      fontSize: 13, fontWeight: 700, background: '#0891B2',
                      borderRadius: 9, padding: '9px 14px',
                    }}
                  >
                    Switch to the bundle — {formatPrice(upsell.bundlePrice)}
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="shrink-0"
              style={{ background: '#F4F7FA', borderTop: '1px solid #e2e8f0', padding: '20px 28px 24px' }}
            >
              <div className="flex items-baseline justify-between mb-4">
                <span style={{ fontSize: 14, color: '#64748b' }}>Total</span>
                <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', color: '#0B1D3A' }}>
                  {formatPrice(total)}
                </span>
              </div>
              <button
                type="button"
                disabled={isEmpty}
                onClick={() => { if (!isEmpty) onCheckout?.(); }}
                className="w-full text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:hover:brightness-100"
                style={{
                  fontSize: 15, fontWeight: 700, padding: 15, borderRadius: 12,
                  background: isEmpty ? '#cbd5e1' : 'linear-gradient(135deg,#0B1D3A,#0891B2)',
                }}
              >
                Checkout
              </button>
              <p className="text-center" style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>
                Lifetime access · 14-day refund before you start a lab
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

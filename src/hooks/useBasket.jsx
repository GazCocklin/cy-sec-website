// ── Global basket context ────────────────────────────────────────────────────
// The basket used to be page-local state inside StorePage.jsx, which is exactly
// why the five cert landing pages had nowhere to put an item and their
// "Add to basket" buttons could only navigate to /store.
//
// NOT to be confused with src/hooks/useCart.jsx — that is an older
// product/variant/quantity e-commerce cart serving ProductDetailPage and
// ProductsList only. This basket holds bare SKU key strings.
//
// Persists to the same 'cysec_basket' localStorage key the old StorePage used,
// so baskets already sitting in a customer's browser survive this deploy.

import React, {
  createContext, useContext, useState, useEffect, useCallback, useMemo, useRef,
} from 'react';
import {
  loadBasket, saveBasket, sanitiseBasket, basketTotal, bundleUpsellFor,
  swapCertToBundle, KEY_LOOKUP,
} from '@/lib/catalogue';

const BasketContext = createContext(null);

export function useBasket() {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error('useBasket must be used inside <BasketProvider>');
  return ctx;
}

export function BasketProvider({ children }) {
  const [items, setItems] = useState(() => sanitiseBasket(loadBasket()));
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Element that opened the drawer, so focus can be returned on close.
  const lastTriggerRef = useRef(null);

  useEffect(() => { saveBasket(items); }, [items]);

  const has = useCallback(key => items.includes(key), [items]);

  const openDrawer = useCallback(() => {
    lastTriggerRef.current = document.activeElement;
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    const trigger = lastTriggerRef.current;
    if (trigger && typeof trigger.focus === 'function') {
      window.requestAnimationFrame(() => trigger.focus());
    }
    lastTriggerRef.current = null;
  }, []);

  // Idempotent: adding an item already present does not duplicate it. Either
  // way the drawer opens, so the button doubles as "view basket".
  const add = useCallback((key) => {
    if (!KEY_LOOKUP[key]) return;
    setItems(prev => (prev.includes(key) ? prev : [...prev, key]));
    openDrawer();
  }, [openDrawer]);

  const remove = useCallback((key) => {
    setItems(prev => prev.filter(k => k !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const switchToBundle = useCallback((certKey, bundleKey) => {
    setItems(prev => swapCertToBundle(prev, certKey, bundleKey));
  }, []);

  const value = useMemo(() => ({
    items,
    count: items.length,
    total: basketTotal(items),
    upsell: bundleUpsellFor(items),
    isDrawerOpen,
    has, add, remove, clear, switchToBundle,
    openDrawer, closeDrawer,
  }), [items, isDrawerOpen, has, add, remove, clear, switchToBundle, openDrawer, closeDrawer]);

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

// ── BuyButton ────────────────────────────────────────────────────────────────
// The one add-to-basket control. Idempotent: pressing it when the SKU is
// already in the basket reopens the drawer rather than adding a duplicate,
// and the label flips to "In your basket — view".
//
// Replaces the <a href="/store"> pattern that used to sit on every cert page,
// which added nothing and handed the buyer to an empty basket (Rule 5 as well:
// anchors trigger a full page reload and break SPA + SSO state).

import React from 'react';
import { useBasket } from '@/hooks/useBasket';
import { lookup, formatPrice } from '@/lib/catalogue';

export default function BuyButton({
  productKey,
  className = '',
  style,
  variant = 'primary',
  children,
  showPrice = false,
}) {
  const { has, add, openDrawer } = useBasket();
  const entry = lookup(productKey);

  if (!entry) return null;

  const inBasket = has(productKey);
  const { config } = entry;

  function handleClick() {
    if (inBasket) openDrawer();
    else add(productKey);
  }

  const base =
    'inline-flex items-center justify-center transition-all hover:brightness-110 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2] focus-visible:ring-offset-2';

  const variants = {
    primary: 'text-white font-bold',
    outline:
      'font-semibold text-white border border-white/20 bg-white/8 hover:bg-white/14',
    list:
      'font-semibold border rounded-[10px] px-5 py-[9px] text-sm',
  };

  const primaryStyle =
    variant === 'primary'
      ? { background: 'linear-gradient(135deg,#0B1D3A,#0891B2)', ...style }
      : style;

  // Store list rows invert to solid navy once the item is in the basket.
  const listStyle =
    variant === 'list'
      ? inBasket
        ? { background: '#0B1D3A', color: '#ffffff', borderColor: '#0B1D3A', ...style }
        : { background: '#ffffff', color: '#0B1D3A', borderColor: '#cbd5e1', ...style }
      : primaryStyle;

  const label =
    children != null
      ? children
      : inBasket
        ? 'In your basket — view'
        : showPrice
          ? `Add to basket — ${formatPrice(config.price)}`
          : 'Add to basket →';

  const displayLabel = inBasket && variant === 'list' ? 'In basket' : label;

  return (
    <button
      type="button"
      onClick={handleClick}
      // No aria-label here: an aria-label overrides the visible text, which
      // previously made the button announce "Add to basket" while displaying
      // "In your basket — view" (WCAG 2.5.3 label-in-name).
      className={`${base} ${variants[variant] || ''} ${className}`}
      style={listStyle}
    >
      {displayLabel}
    </button>
  );
}

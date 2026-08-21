// ── Stripe checkout handoff ──────────────────────────────────────────────────
// Extracted from StorePage.jsx on 21-Aug-2026 so the drawer, the store and the
// cert pages all hand off through one code path.
//
// Raw SKU keys are posted exactly as held in the basket. The
// create-checkout-session edge function runs the three collapse passes
// (COMPLETE_COLLAPSE, PREP_BUNDLE_COLLAPSE, APLUS_MEGA_COLLAPSE — see
// canon.pricing.collapse_logic) and rewards the customer with bundle pricing
// automatically. Do NOT pre-collapse here: that would duplicate the rule in two
// places and they would drift.

import { clearStoredBasket } from '@/lib/catalogue';

const SUPABASE_URL = 'https://kmnbtnfgeadvvkwsdyml.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttbmJ0bmZnZWFkdnZrd3NkeW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMTAxNDEsImV4cCI6MjA4Njc4NjE0MX0.T7yHQmQ3qdobyZEAXoAmDptfrj2yH-ZIJ8RfjNOpEFs';

export async function triggerStripe(basketItems, currentSession) {
  if (!basketItems?.length || !currentSession) return null;

  const isMulti = basketItems.length > 1;

  const res = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${currentSession.access_token}`,
    },
    body: JSON.stringify({
      product_key: !isMulti ? basketItems[0] : undefined,
      product_keys: isMulti ? basketItems : undefined,
      cancel_url: `${window.location.origin}/store`,
    }),
  });

  const data = await res.json();
  if (data?.url) {
    clearStoredBasket();
    window.location.href = data.url;
  }
  return data;
}

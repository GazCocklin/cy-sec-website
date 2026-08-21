// ── FortifyLearn catalogue — SINGLE SOURCE OF TRUTH for certs, SKUs and prices ──
// Extracted from StorePage.jsx on 21-Aug-2026 as part of the purchase-flow rebuild.
//
// RULE 1 (project instructions) previously named StorePage.jsx as the single
// source of truth for certs. That role now belongs to THIS file. Every cert
// landing page, ExamPrepSection, the store and the basket read prices from
// here, so a price changes in exactly two places: this file and the Stripe
// PRICE_MAP in the create-checkout-session edge function.
//
// Cross-cutting facts (prices, collapse logic, cert metadata) are canonical in
// public._platform_canon — see canon.pricing.standard_ladder, canon.pricing.
// aplus_per_core, canon.pricing.aplus_mega and canon.pricing.collapse_logic.

export const BASKET_KEY = 'cysec_basket';

// ── Cert catalogue ───────────────────────────────────────────────────────────
// Five SKUs per cert (Foundation Labs, Advanced Labs, Complete, Exam Engine, Prep Bundle).
// kind field classifies the card for the products grid (bundle / labs / mock / study).
// badgeText is what we show on metadata chips where marketplaces typically show
// rating/sold counts — using honest product metadata instead of fabricated numbers.
export const CERTS = [
  {
    key: 'netplus',
    title: 'CompTIA Network+',
    short: 'Network+',
    code: 'N10-009',
    badge: '/logos/comptia-network-plus.svg',
    landingPage: '/comptia-network-plus-labs',
    includes: [
      '10 hands-on CLI simulation labs',
      'Mock exam engine — Study Mode + Exam Mode',
      '2,000 MCQs (1,000 study + 1,000 exam) + 50 PBQs per cert',
      'Lifetime access',
    ],
    pack1: {
      key: 'netplus_pack', label: 'Foundation Labs', sub: 'First 5 labs · foundations', price: 19.99, thumbnail: '/screenshots/fl-netsim.png',
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'DNS server misconfiguration',
        'Default gateway fault diagnosis',
        'DMZ ACL troubleshooting',
        'Dual ACL multi-VLAN routing failure',
        'Enterprise multi-fault recovery',
      ],
    },
    pack2: {
      key: 'netplus_pack_2', label: 'Advanced Labs', sub: 'Next 5 labs · advanced', price: 19.99, thumbnail: '/screenshots/fl-netpulse.png', isNew: true,
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'DHCP scope exhaustion',
        'Port security violation recovery',
        'VLAN trunk misconfiguration (live topology)',
        'Asymmetric routing via NETCAP Analyzer',
        'SNMP multi-site fault triage via NETPULSE NMS',
      ],
    },
    complete:  { key: 'netplus_complete',     label: 'Complete labs',    sub: 'All 10 labs · Foundation + Advanced',        price: 32.99, rrp: 39.98, saving: 6.99, kind: 'labs',   meta: 'Best value labs',   thumbnail: '/screenshots/fl-netcap.png' },
    exam:      { key: 'netplus_exam',         label: 'Exam Engine',      sub: 'Study + Exam Mode · 2,000 MCQs · 50 PBQs',   price: 24.99,                            kind: 'mock',   meta: 'Mock exam + study', thumbnail: '/screenshots/fl-exam-netplus.png' },
    prepBundle:{ key: 'netplus_prep_bundle',  label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine',    price: 39.99, rrp: 64.97, saving: 24.98, kind: 'bundle', meta: 'Most popular',      thumbnail: null },
  },
  {
    key: 'secplus',
    title: 'CompTIA Security+',
    short: 'Security+',
    code: 'SY0-701',
    badge: '/logos/comptia-security-plus.svg',
    landingPage: '/comptia-security-plus-labs',
    includes: [
      '10 hands-on security labs',
      'Mock exam engine — Study Mode + Exam Mode',
      '2,000 MCQs (1,000 study + 1,000 exam) + 50 PBQs per cert',
      'Lifetime access',
    ],
    pack1: {
      key: 'secplus_pack', label: 'Foundation Labs', sub: 'First 5 labs · foundations', price: 19.99, thumbnail: '/screenshots/fl-linux-cli.png',
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'Firewall rule blocking HTTPS traffic',
        'Sensitive file permission hardening',
        'Insecure legacy service exposure',
        'Privilege escalation & audit failure',
        'Post-pentest remediation',
      ],
    },
    pack2: {
      key: 'secplus_pack_2', label: 'Advanced Labs', sub: 'Next 5 labs · advanced', price: 19.99, thumbnail: '/screenshots/fl-fortiguard.png', isNew: true,
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'Stale user account lockdown',
        'Unauthorised service account audit',
        'MFA enforcement (TOTP on SSH bastion)',
        'Firewall policy audit via FORTIGUARD visual',
        'PKI rotation after CA compromise',
      ],
    },
    complete:  { key: 'secplus_complete',     label: 'Complete labs',    sub: 'All 10 labs · Foundation + Advanced',        price: 32.99, rrp: 39.98, saving: 6.99, kind: 'labs',   meta: 'Best value labs',   thumbnail: '/screenshots/fl-linux-cli.png' },
    exam:      { key: 'secplus_exam',         label: 'Exam Engine',      sub: 'Study + Exam Mode · 2,000 MCQs · 50 PBQs',   price: 24.99,                            kind: 'mock',   meta: 'Mock exam + study', thumbnail: null },
    prepBundle:{ key: 'secplus_prep_bundle',  label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine',    price: 39.99, rrp: 64.97, saving: 24.98, kind: 'bundle', meta: 'Most popular',      thumbnail: null },
  },
  {
    key: 'cysa',
    title: 'CompTIA CySA+',
    short: 'CySA+',
    code: 'CS0-004',
    badge: '/logos/comptia-cysa-plus.svg',
    landingPage: '/comptia-cysa-plus-labs',
    includes: [
      '10 SOC analyst labs',
      'Mock exam engine — Study Mode + Exam Mode',
      '2,000 MCQs (1,000 study + 1,000 exam) + 50 PBQs per cert',
      'Lifetime access',
    ],
    pack1: {
      key: 'cysa_pack', label: 'Foundation Labs', sub: 'First 5 labs · foundations', price: 19.99, thumbnail: '/screenshots/fl-cysa-cli.png',
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'Suspicious process & C2 detection',
        'Web application brute force investigation',
        'SSH brute force containment',
        'Web shell & lateral movement detection',
        'APT threat hunt + firewall containment',
      ],
    },
    pack2: {
      key: 'cysa_pack_2', label: 'Advanced Labs', sub: 'Next 5 labs · advanced', price: 19.99, thumbnail: '/screenshots/fl-siem.png', isNew: true,
      kind: 'labs', meta: '5 PBQ labs',
      highlights: [
        'Internal port scan detection & containment',
        'Malicious cron job persistence removal',
        'SIEM log correlation via Arclight SIEM visual',
        'Vulnerability triage via NETSCAN PRO visual',
        'Credential harvesting & ransomware eradication',
      ],
    },
    complete:  { key: 'cysa_complete',        label: 'Complete labs',    sub: 'All 10 labs · Foundation + Advanced',        price: 32.99, rrp: 39.98, saving: 6.99, kind: 'labs',   meta: 'Best value labs',   thumbnail: '/screenshots/fl-netscan.png' },
    exam:      { key: 'cysa_exam',            label: 'Exam Engine',      sub: 'Study + Exam Mode · 2,000 MCQs · 50 PBQs',   price: 24.99,                            kind: 'mock',   meta: 'Mock exam + study', thumbnail: null, comingSoon: true },
    prepBundle:{ key: 'cysa_prep_bundle',     label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine',    price: 39.99, rrp: 64.97, saving: 24.98, kind: 'bundle', meta: 'Most popular',      thumbnail: null, comingSoon: true },
  },
  // ── A+ Core 1 (220-1201) ───────────────────────────────────────────────────
  // Wired 25-Apr-2026. Updated 25-Apr-2026 to current CompTIA exam codes
  // (220-1201/-1202 superseded the 1101/1102 cycle). Stripe prices live; webhook
  // PACK_LABELS + PREP_BUNDLE_EXPANSION already cover both Cores. Content is
  // sparse at launch, so every SKU is marked comingSoon: true — ribbon shows
  // "LAUNCHING SOON", buyable but honest about content state. No per-Core
  // Complete Labs SKU (the £64.99 dual-core mega bundle below covers all-in).
  // Dedicated landing page: /comptia-aplus-core1-labs.
  {
    key: 'aplus_core1',
    title: 'CompTIA A+ Core 1',
    short: 'A+ Core 1',
    code: '220-1201',
    badge: '/logos/comptia-aplus.svg',
    landingPage: '/comptia-aplus-core1-labs',
    includes: [
      'Hardware, networking, mobile devices',
      'Virtualisation & cloud, troubleshooting',
      'Mock exam engine — Study Mode + Exam Mode',
      'Lifetime access',
    ],
    pack1: {
      key: 'aplus_core1_pack', label: 'Foundation Labs', sub: 'First 5 labs · foundations', price: 19.99, thumbnail: '/screenshots/fl-cysa-cli.png',
      kind: 'labs', meta: '5 PBQ labs', comingSoon: true,
      highlights: [
        'Mobile device sync & connectivity',
        'Network cable & port troubleshooting',
        'Hardware diagnostic workflows',
        'Virtualisation & cloud configuration',
        'Multi-fault hardware/network triage',
      ],
    },
    pack2: {
      key: 'aplus_core1_pack_2', label: 'Advanced Labs', sub: 'Next 5 labs · advanced', price: 19.99, thumbnail: '/screenshots/fl-fortiguard.png',
      kind: 'labs', meta: '5 PBQ labs', isNew: true, comingSoon: true,
      highlights: [
        'Wireless AP misconfiguration',
        'Printer & peripheral fault diagnosis',
        'SOHO router & network share triage',
        'Display & video subsystem repair',
        'End-to-end client diagnostic exercise',
      ],
    },
    exam:      { key: 'aplus_core1_exam',         label: 'Exam Engine',      sub: 'Study + Exam Mode · 2,000 MCQs · 50 PBQs',   price: 24.99,                            kind: 'mock',   meta: 'Mock exam + study', thumbnail: null, comingSoon: true },
    prepBundle:{ key: 'aplus_core1_prep_bundle',  label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine',    price: 39.99, rrp: 64.97, saving: 24.98, kind: 'bundle', meta: 'Most popular',      thumbnail: null, comingSoon: true },
  },
  // ── A+ Core 2 (220-1202) ───────────────────────────────────────────────────
  // Dedicated landing page: /comptia-aplus-core2-labs.
  {
    key: 'aplus_core2',
    title: 'CompTIA A+ Core 2',
    short: 'A+ Core 2',
    code: '220-1202',
    badge: '/logos/comptia-aplus.svg',
    landingPage: '/comptia-aplus-core2-labs',
    includes: [
      'Operating systems, Windows admin',
      'Security, software troubleshooting',
      'Mock exam engine — Study Mode + Exam Mode',
      'Lifetime access',
    ],
    pack1: {
      key: 'aplus_core2_pack', label: 'Foundation Labs', sub: 'First 5 labs · foundations', price: 19.99, thumbnail: '/screenshots/fl-linux-cli.png',
      kind: 'labs', meta: '5 PBQ labs', comingSoon: true,
      highlights: [
        'Windows account & permission audit',
        'Defender quarantine & malware response',
        'OS recovery & boot troubleshooting',
        'User profile & group policy fixes',
        'Software install/uninstall diagnostics',
      ],
    },
    pack2: {
      key: 'aplus_core2_pack_2', label: 'Advanced Labs', sub: 'Next 5 labs · advanced', price: 19.99, thumbnail: '/screenshots/fl-netscan.png',
      kind: 'labs', meta: '5 PBQ labs', isNew: true, comingSoon: true,
      highlights: [
        'Phishing incident response procedure',
        'Mobile MDM & wipe-on-loss policy',
        'BSOD root-cause investigation',
        'Backup & restore operational drill',
        'End-to-end ransomware containment',
      ],
    },
    exam:      { key: 'aplus_core2_exam',         label: 'Exam Engine',      sub: 'Study + Exam Mode · 2,000 MCQs · 50 PBQs',   price: 24.99,                            kind: 'mock',   meta: 'Mock exam + study', thumbnail: null, comingSoon: true },
    prepBundle:{ key: 'aplus_core2_prep_bundle',  label: 'Exam Prep Bundle', sub: 'Labs + Exam Engine',    price: 39.99, rrp: 64.97, saving: 24.98, kind: 'bundle', meta: 'Most popular',      thumbnail: null, comingSoon: true },
  },
];

// ── A+ Complete (Core 1 + Core 2 mega-bundle) ──────────────────────────────
// NOT a member of CERTS (different shape — spans two Cores, no per-Core SKUs).
// Rendered in the featured bundles row alongside the 5 cert prep bundles.
// Webhook PREP_BUNDLE_EXPANSION expands aplus_complete -> 6 entitlements
// (4 packs + 2 exam engines across both Cores).
export const APLUS_MEGA = {
  key: 'aplus_complete_virtual_cert',
  title: 'CompTIA A+ Complete',
  short: 'A+ Complete',
  code: '220-1201 + 220-1202',
  badge: '/logos/comptia-aplus.svg',
  landingPage: '/store',
  prepBundle: {
    key: 'aplus_complete',
    label: 'A+ Complete (Core 1 + Core 2)',
    cardTitle: 'A+ Complete (both Cores)',
    sub: 'Both Cores · 20 labs + 2 Exam Engines',
    countChip: '20 labs · 2 Exam Engines',
    price: 64.99,
    rrp: 129.94,
    saving: 64.95,
    kind: 'bundle',
    meta: 'Full A+ certification',
    thumbnail: null,
    comingSoon: true,
  },
};

// Map each product key back to its cert + config (used by basket bar, recently viewed, etc.)
export const KEY_LOOKUP = (() => {
  const out = {};
  for (const cert of CERTS) {
    for (const opt of ['pack1','pack2','complete','exam','prepBundle']) {
      // A+ Cores have no per-Core Complete Labs SKU; skip cleanly.
      if (!cert[opt]) continue;
      out[cert[opt].key] = { cert, option: opt, config: cert[opt] };
    }
  }
  // Cross-cert A+ mega bundle (not in CERTS — different shape, spans both Cores)
  out[APLUS_MEGA.prepBundle.key] = { cert: APLUS_MEGA, option: 'prepBundle', config: APLUS_MEGA.prepBundle };
  return out;
})();

// Flat product list for the main grid (excludes prep bundles — those get their
// own featured section). Ordered: Complete, Exam, Foundation Labs, Advanced Labs per cert.
// .filter(Boolean) drops undefined entries (A+ Cores have no per-Core Complete SKU).
export const GRID_PRODUCTS = CERTS.flatMap(cert => [
  cert.complete && { cert, config: cert.complete },
  cert.exam     && { cert, config: cert.exam },
  cert.pack1    && { cert, config: cert.pack1 },
  cert.pack2    && { cert, config: cert.pack2 },
].filter(Boolean));


// ── Basket persistence ───────────────────────────────────────────────────────
// Same localStorage key as the pre-rebuild StorePage, so baskets that exist in
// a live browser survive this deploy rather than silently emptying.
export function loadBasket() {
  try { return JSON.parse(localStorage.getItem(BASKET_KEY) || '[]'); } catch { return []; }
}
export function saveBasket(items) {
  try { localStorage.setItem(BASKET_KEY, JSON.stringify(items)); } catch { /* private mode */ }
}
export function clearStoredBasket() {
  try { localStorage.removeItem(BASKET_KEY); } catch { /* private mode */ }
}
// Drop any key that no longer exists in the catalogue (retired SKUs, old carts).
export function sanitiseBasket(items) {
  return (items || []).filter(k => KEY_LOOKUP[k]);
}

// ── Derived values ───────────────────────────────────────────────────────────
export function priceOf(key) {
  return KEY_LOOKUP[key]?.config.price || 0;
}
export function basketTotal(items) {
  return (items || []).reduce((t, k) => t + priceOf(k), 0);
}
export function formatPrice(n) {
  return `£${Number(n).toFixed(2)}`;
}
export function lookup(key) {
  return KEY_LOOKUP[key] || null;
}

// ── Bundle upsell ────────────────────────────────────────────────────────────
// Shown in the drawer only when the basket holds a labs SKU for a cert and
// holds neither that cert's Exam Engine nor its Prep Bundle — i.e. exactly when
// switching to the bundle would actually save the customer money.
//
// This is where the £24.98 saving is communicated: at the moment it becomes
// relevant, rather than as a permanent discount badge on every card.
const LABS_OPTIONS = ['pack1', 'pack2', 'complete'];

export function bundleUpsellFor(items) {
  const keys = items || [];
  for (const key of keys) {
    const entry = KEY_LOOKUP[key];
    if (!entry || !LABS_OPTIONS.includes(entry.option)) continue;

    const cert = entry.cert;
    const bundle = cert.prepBundle;
    // A+ Complete is a cross-cert bundle with no labs SKUs of its own.
    if (!bundle || !cert.exam) continue;

    const hasExam   = keys.includes(cert.exam.key);
    const hasBundle = keys.includes(bundle.key);
    if (hasExam || hasBundle) continue;

    // Never upsell a bundle we are openly describing as not yet ready.
    if (bundle.comingSoon) continue;

    return {
      certKey: cert.key,
      certShort: cert.short,
      bundleKey: bundle.key,
      bundlePrice: bundle.price,
      saving: bundle.saving,
    };
  }
  return null;
}

// Replace every SKU belonging to that cert with the single bundle SKU,
// leaving other certs' lines in the basket untouched.
export function swapCertToBundle(items, certKey, bundleKey) {
  const cert = CERTS.find(c => c.key === certKey);
  if (!cert) return items;
  const certKeys = new Set(
    ['pack1', 'pack2', 'complete', 'exam', 'prepBundle']
      .map(o => cert[o]?.key)
      .filter(Boolean)
  );
  const rest = (items || []).filter(k => !certKeys.has(k));
  return [...rest, bundleKey];
}

// ── Store page ordering ──────────────────────────────────────────────────────
// The store is a basket, not a browse destination. Per certification it shows
// ONE featured product, then a quiet "or buy individually" list.
//
// The featured SKU is the Exam Prep Bundle for every cert except A+ Core 2,
// where it is the cross-cert A+ Complete bundle (£64.99) — that bundle spans
// both Cores and so belongs to no single cert landing page.
export function featuredFor(certKey) {
  if (certKey === 'aplus_core2') return APLUS_MEGA.prepBundle;
  const cert = CERTS.find(c => c.key === certKey);
  return cert?.prepBundle || null;
}

// Individual (non-featured) SKUs for a cert, in list order.
export function individualFor(certKey) {
  const cert = CERTS.find(c => c.key === certKey);
  if (!cert) return [];
  const rows = [
    cert.complete && { config: cert.complete, note: cert.complete.saving ? `Saves ${formatPrice(cert.complete.saving)}` : 'Lifetime access' },
    cert.pack1    && { config: cert.pack1,    note: 'Lifetime access' },
    cert.pack2    && { config: cert.pack2,    note: 'Lifetime access' },
    cert.exam     && { config: cert.exam,     note: 'Lifetime access' },
  ].filter(Boolean);

  // On A+ Core 2 the per-Core Prep Bundle is not the featured card, so it
  // still needs a home in the individual list.
  if (certKey === 'aplus_core2' && cert.prepBundle) {
    rows.push({ config: cert.prepBundle, note: `Saves ${formatPrice(cert.prepBundle.saving)}` });
  }

  return rows.map(r => ({
    ...r,
    note: r.config.comingSoon ? 'Launching soon' : r.note,
  }));
}

// Tabs across the top of the store, in display order.
export const STORE_CERT_TABS = CERTS.map(c => ({
  key: c.key, short: c.short, title: c.title, code: c.code, badge: c.badge,
}));

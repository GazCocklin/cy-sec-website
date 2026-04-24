# Cy-Sec Website — Project Instructions

> This document mirrors the instructions pinned in the Claude.ai project UI.
> Kept in the repo as a backup and so it travels with the code.
> When the Claude.ai project instructions are updated, update this file too (and vice versa).

**Last updated:** 24 April 2026 (Pack → Foundation/Advanced Labs rename site-wide; store hero SIEM screenshot + product-kind filter chips; ExamPrepSection replaces CompleteYourPrep on cert pages; webhook v31 + welcome-email v11 with label sync; fl-cysa-cli.png added — all 18 SKUs now thumbnailed; legal page placeholders filled; pool-size targets clarified)

---

## Purpose

This project covers the development and optimisation of the **cy-sec.co.uk** website — the primary commercial face of Cy-Sec Awareness and Consultancy Ltd. Every decision should be made through two lenses simultaneously: **SEO ranking** and **conversion**. The site must rank for the right search terms AND convert visitors into paying customers for FortifyLearn and the wider product suite.

- **Owner:** Gary Cocklin (Gaz)
- **Primary site:** cy-sec.co.uk (React/Vite SPA → Vercel auto-deploy)
- **Platform store:** cy-sec.co.uk/store (sole purchase point for FortifyLearn — iOS App Store compliant)

---

## Brand assets — canonical (critical)

**NEVER create, guess, or invent logos, colours, icons, or fonts.** All canonical brand files live at `GazCocklin/cy-sec-website /public/logos/`. Fetch via GitHub MCP or clone before using any brand asset. Never improvise.

### Cy-Sec mark (April 2026) — dual C integrated lockup

The Cy-Sec icon is two concentric Cs — outer C (r=30 stroke-7) and inner C (r=17 stroke-6) — drawn with butt (square) stroke caps that rhyme with Segoe UI's capital C terminals. Reads as the brand initial plus layered-defense semantics. **Replaced** the previous spiral icon.

**Lockup spec (v3 integrated):**
- Icon transform in wordmark: `translate(34,40) scale(0.44)`
- Wordmark "Cy-Sec" at `x=56`, subline "Awareness and Consultancy Ltd" at `x=58`
- Icon sized to cap-height (not oversized); tight 6px gap to wordmark
- Dark mode gradient: `white → #7DD3E8` (NO dark teal `#0891B2` — that fades into navy backgrounds and kills legibility)

### Logo files

| File | Purpose |
|---|---|
| `cysec-logo.svg` | Cy-Sec light mode wordmark (navy→teal gradient) |
| `cysec-logo-dark.svg` | Cy-Sec dark mode wordmark (white→#7DD3E8) |
| `cysec-favicon.svg` | 100×100 rounded-square badge, white dual-C |
| `/public/favicon.svg` | ROOT copy of cysec-favicon.svg. **Must be kept in sync** — both files updated when mark changes. |
| `cysec-logo.png` | 2000×928 PNG for React-PDF report templates |
| `fortifylearn-logo.svg` / `-dark.svg` / `-favicon.svg` | FortifyLearn brand |
| `fortifyone-logo.svg` / `-dark.svg` / `-favicon.svg` | FortifyOne brand |

**Logo components:** `src/components/logos/FortifyLearnLogo.jsx` and `FortifyOneLogo.jsx` accept a `variant` prop: `'dark'` (default, white text for dark backgrounds) or `'light'` (dark text for white/light backgrounds). Always pass `variant="light"` on white sections.

### CompTIA badges (real, used by store)

In `/public/logos/`:
- `comptia-network-plus.svg`
- `comptia-security-plus.svg`
- `comptia-cysa-plus.svg`

(Also in `GazCocklin/fortify-learn /public/assets/` for cross-repo parity.)

### Tool screenshots (`public/screenshots/`)

| File | Tool / context |
|---|---|
| `fl-exam-question.png` | **Exam Engine — question in progress** (NTP Drift PBQ, 1:29:35 timer, network diagram). Used on all 3 Exam Engine product cards, purchase-confirmation emails for Exam Engine buyers, and the ExamPrepSection Exam Engine card on every cert landing page. |
| `fl-exam-results.png` | **Exam Engine — readiness outcome** (746/900 PASS, Focus three domains). Used in purchase-confirmation emails for Prep Bundle buyers and as the right-panel visual of the ExamPrepSection Prep Bundle callout on every cert landing page. |
| `fl-mcq-reasoning.png` | **MCQ Study Bank — full reasoning** (DNS cache poisoning question with CORRECT ANSWER + "Why the other options are wrong"). Used on all 3 MCQ Bank cards, MCQ purchase-confirmation emails, and the ExamPrepSection MCQ card on every cert landing page. |
| `fl-exam-banner.png` | **Cert-agnostic crop of the readiness banner** (1800×360, "READINESS 746/900 PASS" teal bar). **Currently unused** — was an experiment as a Prep Bundle card backdrop, reverted because the crop cut off the 746/PASS score. Kept on disk for a future retry with a better crop. |
| `fl-siem.png` | **Arclight SIEM v5.0.3** — CySA+ Advanced Labs signature tool. Also used as the right-panel visual on the store's promo hero. |
| `fl-netscan.png` | NETSCAN PRO v4.2.1 (CySA+ Advanced Labs / Complete Labs) |
| `fl-cysa-cli.png` | **CySA+ Foundation Labs firewall-hunt shot** — FW1 (Perimeter) admin terminal, `grep`/`tail` on `/var/log/firewall.log` showing 352 ACCEPT entries from 91.108.4.34 → 10.40.0.20:443 (suspected exfil). 925×604 native (no upscale), JPEG q82. |
| `fl-netsim.png` | FL-NETSIM v2.0 / Cisco IOS terminal (Network+ Foundation Labs thumbnail) |
| `fl-netcap.png` | NETCAP Analyzer v3.2 (N+ Advanced Labs / Complete Labs) |
| `fl-netpulse.png` | NETPULSE NMS v6.1 (N+ Advanced Labs) |
| `fl-fortiguard.png` | FORTIGUARD Policy Auditor v3.1 (Sec+ Advanced Labs / Complete Labs) |
| `fl-linux-cli.png` | Linux CLI / SSH hardening (Sec+ Foundation Labs thumbnail) |
| `fl-dashboard.png` / `fl-terminal.png` / `fl-lab-briefing.png` / `fl-lab-picker.png` / `fl-results.png` | Platform UI shots (fallbacks, abandoned-cart email, etc.) |

**Format convention:** All files stored with `.png` extension but are actually JPEG content (smaller files, browsers handle it). Standard pipeline for new Tier 1 screenshots is ~1800px wide. `fl-cysa-cli.png` is an exception — native 925px kept because upscaling terminal text blurs readability and the card renders at ~240px anyway. Command: `convert input.png -strip -interlace Plane -quality 82 "jpeg:output.png"` (add `-resize '1800x>'` when source is larger than target).

### Logo spec (do not deviate)

- **Favicons:** 100×100px, rx=20, diagonal gradient `#0B1D3A→#0E5F8A→#0891B2`
- **Wordmarks:** Font Segoe UI weight 800, size 46px, letter-spacing -1.8
- **Icons:** Cy-Sec = dual concentric Cs, FortifyLearn = terminal, FortifyOne = orbit arcs

---

## Colour system — mandatory

### Gradients

- **Primary gradient (light mode):** `#0B1D3A → #0E5F8A → #0891B2`
- **Primary gradient (dark mode):** `white → #7DD3E8` (NO third stop — dark teal `#0891B2` fades into navy)

### Palette

| Token | Hex | Usage |
|---|---|---|
| Teal accent | `#0891B2` | The one canonical teal. NEVER `#1A56DB`. |
| Navy | `#0B1D3A` | Primary dark background |
| Dark navy | `#071530` | Utility strip / footer deep background |
| Mid blue | `#0E5F8A` | Gradient mid-stop only (light mode) |
| Light teal | `#7DD3E8` | Dark mode text/gradient use only |
| Surface | `#F4F7FA` | Light page background |

### Marketplace accents (store page only, Emmable-inspired)

- Red SAVE pill: bg `#FDE8E8` text `#A91818`
- Orange "OFF" pill: bg `#fed7aa` text `#7c2d12`

These appear only on discount badges — do not use elsewhere.

**Forbidden:** Reds and purples in product UI (except marketplace discount pills above). `#1A56DB`. Bootstrap blue. Any blue-500 Tailwind class on brand elements.

All button CTAs, highlights, borders, icon accents: `#0891B2` or navy→teal gradient. Gradient buttons: `linear-gradient(135deg,#0B1D3A,#0891B2)`.

---

## Typography

- **Wordmarks:** Segoe UI 800, letter-spacing -1.8
- **Body:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- **Headings on new pages:** `font-black`, letter-spacing -0.3px to -1.5px
- **All headings:** sentence case. Never Title Case, never ALL CAPS in body.

---

## Site structure — live pages (April 2026)

| Route | Purpose |
|---|---|
| `cy-sec.co.uk/` | Homepage (React, redesigned April 2026) |
| `cy-sec.co.uk/store` | FortifyLearn store (MARKETPLACE LAYOUT v4) |
| `cy-sec.co.uk/pbq-engine` | FortifyLearn PBQ Engine explainer |
| `cy-sec.co.uk/comptia-network-plus-labs` | N+ cert landing page |
| `cy-sec.co.uk/comptia-security-plus-labs` | Sec+ cert landing page |
| `cy-sec.co.uk/comptia-cysa-plus-labs` | CySA+ cert landing page |
| `cy-sec.co.uk/fortifyone` | FortifyOne GRC platform page |
| `cy-sec.co.uk/admin` | Admin dashboard (navy brand, dual-C logo) |
| `cy-sec.co.uk/admin/login` | Admin login |

**Cert landing page routes:**
- `/comptia-network-plus-labs` → `src/pages/NetworkPlusLabsPage.jsx`
- `/comptia-security-plus-labs` → `src/pages/SecurityPlusLabsPage.jsx`
- `/comptia-cysa-plus-labs` → `src/pages/CySAPlusLabsPage.jsx`

All three cert pages share `src/components/ExamPrepSection.jsx` (added 24-Apr-2026, replaced the earlier thin `CompleteYourPrep` strip). This sits between the Labs tabs and Tools sections and surfaces the non-labs SKUs (Exam Engine, MCQ Study Bank, Prep Bundle) as a full deep-dive product section — two-up cards with screenshots + feature lists + prices + CTAs, then a full-width Prep Bundle savings callout with gradient background and `fl-exam-results.png` floating visual. Props: `cert` / `certLabel` / `code`. Uses `<a href="/store">` until the Rule 5 `<Link>` migration lands.

**Navbar — Training Services dropdown has two sections:**
- **Training Services:** Professional Certifications / PBQ Engine / Store
- **FortifyLearn Labs:** Network+ Labs / Security+ Labs / CySA+ Labs

---

## Product suite

### FortifyLearn (fortifylearn.co.uk)

CompTIA exam prep platform. **Key differentiators:** real CLI simulation labs, visual interactive tools, and **integrated mock exam engine** (PBQ+MCQ under one timer, approximating real CompTIA exam structure).

#### Pricing ladder (all 3 certs — netplus, secplus, cysa)

| Product (public label) | Price | Contents | Key |
|---|---|---|---|
| **Foundation Labs** | £19.99 | 5 PBQ scenarios | `{cert}_pack` |
| **Advanced Labs** | £19.99 | 5 PBQ scenarios (uses visual tools) | `{cert}_pack_2` |
| **Complete Labs** | £32.99 | All 10 labs (save £6.99 vs £39.98 à la carte) | `{cert}_complete` |
| **Exam Engine** | £24.99 | Mock exam session: 3–6 PBQs + 85–90 MCQs under one combined timer, scaled 100–900 score. Draws from a pool of 50 PBQs + 500 MCQs per cert. | `{cert}_exam` |
| **MCQ Study Bank** | £14.99 | 1,000 MCQs per cert with full reasoning (separate pool from Exam Engine) | `mcq_{cert}` |
| **Exam Prep Bundle** | £49.99 | Everything (save £29.97 vs £79.96 à la carte) = Foundation Labs + Advanced Labs + Exam Engine + MCQ Study Bank (4 entitlements) | `{cert}_prep_bundle` |

**Public labels vs internal keys:** Public labels were renamed from "Pack 1" / "Pack 2" to "Foundation Labs" / "Advanced Labs" site-wide on 24-Apr-2026 (commit `1b8e193`) after user feedback that "Pack 1/2" communicated nothing. Internal `product_key` values (`{cert}_pack`, `{cert}_pack_2`, `{cert}_complete`, etc.) stayed stable — these are Stripe/webhook/entitlement contracts. The webhook `PACK_LABELS` lookup (v31) and `send-welcome-email` body copy (v11) are synced to the new public labels.

**5-labs-per-tier rule:** Each labs tier (Foundation / Advanced) is capped at 5 PBQ scenarios. Additional labs would go into pack_3 once pack_2 is full — but internal keys stay `_pack` / `_pack_2` for schema stability regardless of display label.

#### Free tasters (5 total, April 2026)

- Platform Walkthrough (tutorial)
- Network+: Static IP Gateway Misconfiguration
- Network+: Port Down — Finance Workstation Offline
- Security+: SSH Hardening — Root Login Vulnerability
- Security+: Firewall Rule Review — Unauthorised Remote Access

CySA+ does not have free tasters.

#### Visual tools (all real, screenshots in `public/screenshots/`)

| Tool | Used in |
|---|---|
| Arclight SIEM v5.0.3 | CySA+ Advanced Labs |
| NETSCAN PRO v4.2.1 | CySA+ Advanced Labs |
| FORTIGUARD Policy Auditor v3.1 | Sec+ Advanced Labs |
| FL-NETSIM v2.0 | N+ Foundation Labs (labs 3–5), Advanced Labs (lab 3) |
| NETCAP Analyzer v3.2 | N+ Advanced Labs |
| NETPULSE NMS v6.1 | N+ Advanced Labs |

### FortifyOne (fortifyone.co.uk)

GRC platform. From £149/mo standalone, included with vCISO. **Internal route:** `/fortifyone` (NOT external link from main nav).

---

## Stripe prices (live mode)

### Exam Engines (created 24-Apr-2026)

| Product key | Stripe price ID |
|---|---|
| `netplus_exam` | `price_1TPg3lPp3j8eGdItU9xzSbv9` |
| `secplus_exam` | `price_1TPg3wPp3j8eGdItQWHGJEoq` |
| `cysa_exam` | `price_1TPg46Pp3j8eGdItEgYjGLQu` |

### Prep Bundles (created 24-Apr-2026)

| Product key | Stripe price ID |
|---|---|
| `netplus_prep_bundle` | `price_1TPg4JPp3j8eGdIt3ugOsHqv` |
| `secplus_prep_bundle` | `price_1TPg4UPp3j8eGdItkzIPMyHe` |
| `cysa_prep_bundle` | `price_1TPg4fPp3j8eGdItJAogqpOE` |

### MCQ Banks (pre-existing)

| Product key | Stripe price ID |
|---|---|
| `mcq_netplus` | `price_1TNZkaPp3j8eGdItTwXCWwcG` |
| `mcq_secplus` | `price_1TNZkiPp3j8eGdItfKRgO1TW` |
| `mcq_cysa` | `price_1TNZkoPp3j8eGdItNS8KRPDx` |

Labs packs: pre-existing. Look up in Stripe Dashboard if needed — all referenced via `PRICE_MAP` in `create-checkout-session` Edge Function.

---

## Store page — architecture (v4, 24-Apr-2026)

**File:** `src/pages/StorePage.jsx` (~1085 lines as of 24-Apr evening; grew with product-kind filter + inline hero screenshot + ProductDetailsModal)
**Style:** Marketplace (Emmable-inspired, Cy-Sec branded). Replaced previous cert-tab-focused layout.

### Section order (top to bottom)

1. **Utility announcement strip** (navy, trust signals — UK support / 14-day refund / CompTIA Authorised Partner)
2. **Promo hero** (navy→teal gradient). Right panel displays **`fl-siem.png` Arclight SIEM dashboard** centred with drop shadow as the headline visual — communicates "real professional tool" at a glance. Four corner overlays: SAVE £29.97 (top-left red pill), 37% OFF (top-right teal pill), "CySA+ · Arclight SIEM" caption (bottom-left), `*bundle pricing` disclaimer (bottom-right). Mobile hides the right panel via `hidden sm:block`.
3. **Featured row** — 3 Prep Bundle cards (★ RECOMMENDED badge, SAVE £29.97 pill, gradient CTA)
4. **Browse by certification** — 3 cert tiles (click = filter grid)
5. **Products grid** — 15 SKUs in responsive 2/3/4/5-col grid (Prep Bundles excluded from grid — they have their own row above), preceded by a **product-kind filter chip row** (All / PBQ labs / Mock exams / MCQ banks). Cert filter and kind filter compose independently — e.g. `Network+ + MCQ banks` yields one card. Empty-state card with "Clear filters →" reset when both filters combine to zero matches.
6. **Recently viewed** — horizontal scrolling strip (conditional on localStorage having 2+ tracked items)
7. **Features trust strip** (Lifetime / Instant / 14-day refund / UK support)
8. **Built with trusted partners** — refactored 24-Apr to brand-consistent teal lucide icons (Award / Lock / Zap / Database / Shield) instead of vendor brand colours (the earlier red CompTIA / purple Stripe / green Supabase version broke the "no reds/purples in product UI" rule).
9. **Sticky basket bar** (fixed bottom, navy gradient) — appears when basket > 0, mobile-optimised stacking

### Key utilities preserved in StorePage.jsx

- `CERTS` array (single source of truth — add cert = one edit here)
- `KEY_LOOKUP`, `GRID_PRODUCTS` (derived from CERTS)
- `loadBasket`/`saveBasket`/`sanitiseBasket` — localStorage `cysec_basket`
- `loadRecent`/`saveRecent`/`addRecent` — localStorage `cysec_recent` (max 8)
- `triggerStripe` — `product_key` singular, `product_keys` array for multi
- `CheckoutModal` / `ModalShell` / `BasketBar`

### Product card thumbnails (24-Apr-2026)

Every SKU config in the CERTS array has a `thumbnail` field. `ProductCard` and `FeaturedBundleCard` render this image and overlay a small cert-badge chip so viewers still identify the cert at a glance. **All 18 SKU configs now have a distinctive thumbnail.** The only remaining `thumbnail: null` entries are the 3 Prep Bundles, which is intentional — `FeaturedBundleCard` uses a clean light-gradient + centred CompTIA badge design instead of a screenshot.

| SKU key | thumbnail |
|---|---|
| `netplus_pack` | `/screenshots/fl-netsim.png` |
| `netplus_pack_2` | `/screenshots/fl-netpulse.png` |
| `netplus_complete` | `/screenshots/fl-netcap.png` |
| `netplus_exam` | `/screenshots/fl-exam-question.png` |
| `mcq_netplus` | `/screenshots/fl-mcq-reasoning.png` |
| `netplus_prep_bundle` | **`null`** (intentional — gradient + cert badge) |
| `secplus_pack` | `/screenshots/fl-linux-cli.png` |
| `secplus_pack_2` | `/screenshots/fl-fortiguard.png` |
| `secplus_complete` | `/screenshots/fl-linux-cli.png` |
| `secplus_exam` | `/screenshots/fl-exam-question.png` |
| `mcq_secplus` | `/screenshots/fl-mcq-reasoning.png` |
| `secplus_prep_bundle` | **`null`** (intentional — gradient + cert badge) |
| `cysa_pack` | `/screenshots/fl-cysa-cli.png` (firewall log hunt, added 24-Apr) |
| `cysa_pack_2` | `/screenshots/fl-siem.png` |
| `cysa_complete` | `/screenshots/fl-netscan.png` |
| `cysa_exam` | `/screenshots/fl-exam-question.png` |
| `mcq_cysa` | `/screenshots/fl-mcq-reasoning.png` |
| `cysa_prep_bundle` | **`null`** (intentional — gradient + cert badge) |

**Prep Bundle banner — reverted 24-Apr-2026.** An earlier experiment had Prep Bundle featured cards using `fl-exam-banner.png` (a cropped cert-agnostic version of the readiness screen) as a backdrop. The crop cut off the 746/PASS score, leaving a meaningless teal strip. Reverted to the clean light-gradient + centred cert badge design. `fl-exam-banner.png` remains in `public/screenshots/` unused — keep for future retry with a better crop, or delete if next screenshot pass replaces it.

### Product details modal — "What's inside →" (24-Apr-2026)

Every product card and Prep Bundle card has a "What's inside →" link beneath its CTA. Clicking it opens `ProductDetailsModal` (defined near the bottom of StorePage.jsx, ~line 570), which explains what's actually in the SKU. Content is derived per SKU type from the config/cert data — we never hard-code per-SKU marketing copy here, so adding a new cert/SKU doesn't require touching the modal code.

| SKU type | Modal content source |
|---|---|
| Foundation Labs (`*_pack`) | `cert.pack1.highlights` array (real lab names) |
| Advanced Labs (`*_pack_2`) | `cert.pack2.highlights` array |
| Complete Labs (`*_complete`) | Both `pack1.highlights` and `pack2.highlights`, grouped with headings |
| Exam Engine (`*_exam`) | Static spec — exam format (3–6 PBQs + 85–90 MCQs per session, one combined timer), question pool section (50 PBQs + 500 MCQs per cert), scoring (100–900 scaled, per-domain diagnostic, focus-three), and the honesty block (±50pt approximation disclaimer) |
| MCQ Study Bank (`mcq_*`) | Static spec — 1,000 questions per cert with full reasoning panel, per-distractor "why this is wrong", objective tags, flag-to-revisit. "Standalone — pair with Exam Engine for timed mocks." |
| Prep Bundle (`*_prep_bundle`) | Itemised value breakdown (Foundation Labs £19.99 + Advanced Labs £19.99 + Exam Engine £24.99 + MCQ Study Bank £14.99) plus the why-the-bundle math |

Modal UX: backdrop click closes, `Escape` closes, body-scroll locked while open. Hero banner uses the config thumbnail when present. Layout: thumbnail band top, cert+code header, price row with SAVE pill if applicable, content sections with teal check-icon bullets, lifetime/refund/instant trust strip, branded navy→teal gradient CTA (reuses `onToggle` from parent so basket state stays consistent).

**Why this matters for conversion:** cards stay scannable but curious visitors can deep-dive without leaving the store. "What's inside" is also how we give lab packs a second layer of value — the cards just say "5 foundation labs" but the modal names every lab, letting a buyer confirm relevance before committing.

### Cert filter tiles behaviour

- Click tile → filters product grid to that cert, smooth-scrolls to grid
- Click active tile again (or "Show all →") → resets to 'all'

### Recently viewed behaviour

- Triggered when user adds item to basket (`toggleItem`)
- Max 8 items, newest-first, deduplicated
- Survives session (localStorage)
- Strip only renders once 2+ items are tracked
- "Clear" button resets the list

### Product card metadata philosophy (IMPORTANT — honest, not fabricated)

Cards show "Foundation labs" / "Advanced labs" / "Best value labs" / "Mock exam · timed" / "Study bank" / "Most popular" instead of star ratings or sold counts. **We do NOT fabricate social proof.** When real Trustpilot/G2 reviews or sales data arrive, swap `config.meta` for a `★ rating + sold count` block — one change in `ProductCard` component.

---

## Store scale thresholds — important for adding certs

Current store scales cleanly to ~5 certs. Three hardcoded pinch points break beyond that:

1. **Featured bundles row:** `lg:grid-cols-3` (hardcoded). Breaks at 4+ bundles.
   Fix when adding 4th bundle: convert to horizontal scroll OR cap featured at 3 editor's-pick bundles.

2. **Browse-by-certification tiles:** `grid-cols-3` (hardcoded). Breaks at 4+.
   Fix: responsive wrapping OR horizontal scroll.

3. **Hero promo copy** mentions certs by name ("Network+, Security+ and CySA+"). At 5+ certs this reads badly. Rewrite generic: "for every CompTIA cert in our catalogue" OR rotate hero based on newest content.

### For multi-vendor expansion (CertNexus, (ISC)², AWS, etc.)

4. Add `vendor` field to each cert entry (`'comptia' | 'certnexus' | etc.`). Add vendor filter bar above cert tiles.

5. Allow optional SKUs per cert: guard rendering with `cert.mcq && <TestPrepCard .../>`. Current catalogue assumes all 6 SKUs present; vendor-specific certs may have different shape (e.g. voucher, eBook).

6. Trusted partners strip needs data-driven vendor badges if vendor-specific partner status is relevant.

**Recommendation:** don't refactor preemptively. At 5th cert (likely A+ Core 1 + Core 2 in pipeline), do horizontal-scroll + vendor field. At first non-CompTIA cert, add vendor filter bar + optional SKU guards.

---

## Entitlement architecture (known gap)

Three entitlement tables on Supabase project `kmnbtnfgeadvvkwsdyml`:

- `fl_entitlements` — free-text `product_key` (no FK)
- `user_entitlements` — `pack_id` UUID required
- `user_purchases` — `pack_id` UUID required

Exam, MCQ, and Prep Bundle purchases only write to `fl_entitlements` because they lack pack UUIDs (no `fl_packs` rows exist for them). `user_entitlements` and `user_purchases` therefore have NO rows for non-pack SKUs.

**Consequence:** admin revenue reporting via `user_purchases` MISSES exam, mcq, and prep_bundle revenue. Flagged and accepted as non-blocking.

**Future fix:** add UUIDs + `fl_packs` rows for exam/mcq/prep_bundle. Normalise so all entitlements write to all three tables and admin reports capture full revenue.

---

## GitHub & infrastructure

- **cy-sec.co.uk:** React/Vite SPA, `GazCocklin/cy-sec-website`, `main` branch → Vercel auto-deploy (~90s). Bundle-patching workflow — never `npm run build`.
- **PAT:** Supabase `_platform_secrets` key=`github_pat` (fetch via Supabase MCP, never ask Gaz). GitHub MCP connector is **read-only** (403 on writes). Reliable write path: clone with PAT, commit, push. Note: `api.github.com` is NOT on bash egress allowlist, so REST API calls fail — use git CLI only.
- **Supabase:** `kmnbtnfgeadvvkwsdyml` (shared across all products)
- **Git config:** `user.email=gazc@cy-sec.co.uk` / `user.name=GazCocklin`
- **Vercel team:** `team_VchoAehUBBaWu4dPpsrvw3lh`
- **cy-sec-website project:** `prj_lL5WovTnI6mGdutrzBviiAq3JSiY`

### Admin

- Allowed emails: `gazc@cy-sec.co.uk`, `aimeec@cy-sec.co.uk`
- `fl_feedback` UPDATE: must use RPC `update_feedback_status`
- Purchases view: calls `get_purchase_history()` RPC

---

## Edge Functions — current state

### send-contact-confirmation (v11, verify_jwt:false)

`x-contact-secret` header auth. Dual-C logo in hero. Sends to submitter + `info@cy-sec.co.uk`.

### send-welcome-email (v11, verify_jwt:true)

FortifyLearn welcome email. Lists 5 free tasters. Upsell block uses the current public labels: **Complete Labs (10 labs) £32.99** per cert · saves £6.99 and **Foundation or Advanced Labs (5 labs) £19.99**. MCQ variant subtext says "MCQ Study Bank is unlocked"; "both" variant heading is "MCQ Study Bank". Terminology fully synced with the site rename (v11, 24-Apr-2026). Canonical asset paths: `cy-sec.co.uk/logos/` and `cy-sec.co.uk/screenshots/`. Single-file ~25.8KB.

### send-fl-feedback-email (v9, verify_jwt:false)

FL bug report + feature request emails. Bug = red (`#ef4444`), Feature = teal (`#0891B2`). Custom CORS allowlist.

### stripe-webhook (v31, verify_jwt:false — Stripe calls without JWT)

**Split into two files** as of v28. Single-file deploys over ~38KB fail.

- `index.ts` (~13KB): handlers + `PACK_LABELS` + `PACK_UUID_MAP` + `COMPLETE_EXPANSION` + `PREP_BUNDLE_EXPANSION` + `BUNDLE_PACKS`
- `emails.ts` (~25.5KB): all email template functions, exports 6 sendX functions (admin/customer × confirmation/refund/abandoned-cart)

**v31 (24-Apr-2026):** `PACK_LABELS` fully synced to the site rename. Customer-facing strings in purchase confirmations, refunds, and abandoned-cart emails now say "Network+ Foundation Labs", "Security+ Advanced Labs", "CySA+ Complete Labs", "MCQ Study Bank" (was "MCQ Question Bank"), etc. Product keys unchanged — this was a label-only sync.

`PREP_BUNDLE_EXPANSION` includes `mcq_{cert}` — prep_bundle purchases grant 4 entitlements per cert (Foundation Labs, Advanced Labs, Exam Engine, MCQ Study Bank).

**Handles:** `checkout.session.completed`, `charge.refunded`, `checkout.session.expired`.

`certLandingForKey`: MCQ/exam emails route to `fortifylearn.co.uk/?page=examengine` (was `cy-sec.co.uk` — bug fixed in v28).

`heroScreenshotForKey` (v30, 24-Apr-2026) routes purchase-confirmation email hero images:

| Key match | Screenshot | Alt text |
|---|---|---|
| `isPrepBundleKey` | `fl-exam-results.png` | FortifyLearn exam readiness projection |
| `isExamKey` | `fl-exam-question.png` | FortifyLearn Exam Engine — question in progress |
| `isMcqKey` | `fl-mcq-reasoning.png` | FortifyLearn MCQ Study Bank — question with reasoning |
| `netplus*` | `fl-netpulse.png` | NETPULSE NMS v6.1 |
| `secplus*` | `fl-fortiguard.png` | FORTIGUARD Policy Auditor v3.1 |
| `cysa*` | `fl-siem.png` | Arclight SIEM v5.0.3 |
| fallback | `fl-dashboard.png` | FortifyLearn |

**Critical ordering:** `isPrepBundleKey` check must come before `key.startsWith("netplus")` etc., otherwise `netplus_prep_bundle` matches the Network+ labs route first.

### create-checkout-session (v23, verify_jwt:true)

`PRICE_MAP` includes all 6 SKUs per cert (18 total).

`PREP_BUNDLE_COLLAPSE` auto-optimises carts: `[complete, exam] → prep_bundle`. Customer charged £49.99 instead of £57.98 AND gets MCQ as surprise bonus via webhook expansion. Collapse triggers on complete + exam even without MCQ in cart — intentional UX (customer wins £8, we gain bundle uplift signal).

**Known stale comment (v23, line ~28):** `// Exam Prep Bundle — £49.99 per cert (Pack 1 + Pack 2 + Exam Engine)` is both outdated terminology AND factually incomplete (bundle expands to 4 items including MCQ via webhook). Non-customer-facing; fix on next real deploy rather than a standalone v24.

### Stripe Dashboard (already configured)

- Webhook subscribed: `checkout.session.completed`, `charge.refunded`, `checkout.session.expired`
- Stripe default customer emails DISABLED for Successful payments + Refunds (prevents duplicates with branded emails). Failed charges remains enabled.

---

## SEO — core keywords

**Primary:** CompTIA PBQ practice, CompTIA performance-based questions, CompTIA Network+ PBQ labs, CompTIA Security+ PBQ simulation, CompTIA CySA+ practice labs, CompTIA exam prep UK, CompTIA mock exam UK

**Long-tail:** "how to pass CompTIA PBQ questions", "SIEM lab CompTIA CySA+", "packet capture lab CompTIA Network+", "firewall configuration CompTIA practice", "CompTIA labs UK", "CompTIA practice exam with PBQ"

**On-page rules:** H1 must contain primary keyword. Unique meta description per page with keyword + CTA. Internal linking: every cert page links to store.

### Store meta (v4)

- **Title:** "FortifyLearn Store — CompTIA exam prep bundles | Cy-Sec"
- **Description:** "Real CompTIA PBQ simulation labs, mock exam engine and MCQ study banks. Network+, Security+ and CySA+ exam prep bundles from £49.99 — save £29.97 vs à la carte. Lifetime access, 14-day refund."

---

## Conversion principles

**The funnel:** Organic search → cert landing page → store → bundle/pack

### CTA hierarchy (v3 store)

- **Primary:** "Add bundle →" on Prep Bundle featured cards (£49.99); "Add to basket" on individual SKU cards
- **Secondary:** Complete labs cards with -18% SAVE £6.99 pill
- **Tertiary:** "Try a free lab" in hero (external → fortifylearn.co.uk)
- **Retention:** Recently viewed strip keeps abandoned items visible cross-session

### Bundle economics

- Prep Bundle £49.99 saves customer £29.97 (37% off à la carte £79.96)
- Complete Labs £32.99 saves £6.99 (18% off £39.98)
- `PREP_BUNDLE_COLLAPSE` in `create-checkout-session` converts `[complete+exam]` to `prep_bundle` automatically — customer saves £8, we bundle MCQ as bonus (drives bundle attach rate)

### Routing rules

- "Add to basket" → stays in store, updates sticky basket bar
- "Checkout" → sign-in modal (guest users) → Stripe redirect
- Cert tile click → filters grid + smooth-scrolls to grid section
- "Shop bundles →" in hero → smooth-scrolls to featured bundle row
- Free taster CTA → fortifylearn.co.uk (external, needs account)

---

## Standing rules

### Rule 1 — always update these instructions

At the end of any conversation where changes were made, update these instructions. Do not wait to be asked. **Update both copies together:** the Claude.ai project UI (source of truth for Claude's session context) AND `docs/project-instructions.md` (version-controlled mirror in the repo). They must not drift.

### Rule 2 — cross-project instruction updates

At end of session update relevant project instructions via Chrome MCP if available. Each project gets its OWN tailored update. Method: navigate to `claude.ai/projects`, click project, click Edit Instructions, SELECT ALL, replace entirely, save. Do not append. If Chrome MCP unavailable, output full replacement text in chat for Gaz to paste manually.

### Rule 3 — never improvise brand assets

Always fetch logos from canonical source before using.

### Rule 4 — pack counts reflect live database

Lab counts in marketing copy should reflect live Supabase `pbq_banks`.

### Rule 5 — routing

All primary purchase CTAs use internal React `<Link to="/store">`. FortifyOne CTAs use internal `<Link to="/fortifyone">`. Never link away from cy-sec.co.uk for purchase flows.

### Rule 6 — favicon sync

When the Cy-Sec brand mark changes, BOTH files must be updated:

- `/public/logos/cysec-favicon.svg`
- `/public/favicon.svg` (root, referenced by `index.html`)

Forgetting the root file means tab icons stay on the old mark even after a successful deploy.

### Rule 7 — honest metadata (store page)

Product cards show factual metadata ("Foundation labs", "Most popular") instead of star ratings or sold counts. **Do not fabricate social proof.** When real reviews/sales data arrive, swap in one place (`config.meta` in the CERTS array → ProductCard renders whatever is there).

### Rule 8 — Edge Function size ceiling

Single-file Edge Function deploys over ~38KB fail. `stripe-webhook` is split into `index.ts` + `emails.ts` for this reason. Keep each file under ~25KB. If adding significant logic, split further rather than consolidating.

---

## Pending / next session

### Immediate

- **Rule 5 migration** — cert landing pages (`NetworkPlusLabsPage.jsx` etc.) and `ExamPrepSection.jsx` use `<a href="/store">` instead of React Router `<Link to="/store">`. Causes full page reloads on nav. Cross-page pass to convert all of them.

### Screenshot pickups

Tier 1 (exam + MCQ + CySA CLI) complete. Remaining gaps:

- **Tier 2 — "Labs + Exam + MCQ" composite/montage.** Three-device stack showing a terminal, an exam question, and an MCQ side-by-side. Cert-agnostic. Could replace the current SIEM-only hero visual if it reads better — but the current hero is good enough that this is a "nice-to-have", not urgent.
- **Tier 3 — Lab briefing screen** for card hover states (optional).
- **Tier 3 — Real customer logos** for the trusted-partners strip once we have named references. When this lands, swap `TrustedPartners` component config from the current lucide-icon treatment to vendor logos.

### When scale warrants (likely with A+ Core 1 + Core 2 launch)

- Featured bundles row: convert from `lg:grid-cols-3` to horizontal scroll, or cap at 3 editor's picks
- Cert tile grid: same — convert from `grid-cols-3` to responsive wrap/scroll
- Hero promo copy: genericise ("every CompTIA cert in our catalogue" instead of naming three certs)

### When first non-CompTIA cert lands

- Add `vendor` field to CERTS array entries in `StorePage.jsx`
- Add vendor filter bar above cert tiles
- Guard optional SKUs: `cert.mcq && <TestPrepCard .../>`
- Trusted partners strip: make data-driven for multiple vendor badges

### Deferred

- Free-to-paid conversion tracking view in admin
- Licence expiry tracker in admin
- Revenue breakdown by pack in admin (blocked by entitlement gap — non-pack SKUs aren't in `user_purchases`)
- Entitlement gap proper fix: add UUIDs + `fl_packs` rows for exam/mcq/prep_bundle so admin revenue reporting includes them
- Reviews strategy (Google Business Profile, G2) — once we have actual reviews, swap `config.meta` from "Foundation labs" etc. to ★ rating + sold count
- Bundle pricing review (deferred multiple times — current £49.99 is working, revisit with real conversion data)

### Recently completed (24-Apr-2026 session)

Done and removed from pending:

- ✅ Legal page placeholders filled (Companies House #, registered address, ICO #) on `TermsOfService.jsx` and `PrivacyPolicy.jsx`
- ✅ Cert landing pages now cover Exam Engine + MCQ Bank + Prep Bundle via `ExamPrepSection.jsx`
- ✅ CySA+ Foundation Labs screenshot (`fl-cysa-cli.png`) added — all 18 SKUs thumbnailed
- ✅ Pack 1 / Pack 2 → Foundation Labs / Advanced Labs rename site-wide + webhook v31 + welcome-email v11 alignment
- ✅ Store hero SIEM screenshot replaces "37%" typography
- ✅ Product-kind filter chips added to store grid (All / PBQ labs / Mock exams / MCQ banks)
- ✅ `TrustedPartners` refactored to brand-consistent teal icons (removed the red/purple/green vendor-colour version that broke the palette rule)

---

## FortifyLearn product updates (22-Apr-2026)

Two major changes on the FortifyLearn platform that should shape the next marketing-site refresh when content is ready:

### 1. Cert lineup expanded from 3 to 5

Now supported:

- CompTIA Network+ (N10-009)
- CompTIA Security+ (SY0-701)
- CompTIA CySA+ (CS0-003)
- **CompTIA A+ Core 1 (220-1101)** — NEW
- **CompTIA A+ Core 2 (220-1102)** — NEW

A+ content is being authored — banks exist and are live but empty until PBQ Creator and Exam Engine projects populate them. Wait for the per-cert content threshold before marketing A+ prominently.

Use the single official CompTIA A+ badge for both Cores on cert lineup displays — exam code (220-1101 / 220-1102) differentiates them in product copy. CompTIA issues one A+ credential covering both Cores.

**NOTE:** Adding A+ brings store to 5 certs — approaching scale threshold. See **Store scale thresholds** section above. Featured row and cert tile grid will need horizontal scroll treatment.

### 2. Integrated Exam feature — major differentiator

The platform now offers real-exam mock simulation: 3-6 PBQs + 85-90 MCQs under a single combined timer, mirroring the actual CompTIA exam structure. No major competitor delivers this well. Messer's site has no PBQ simulation. Dion has PBQs but not integrated with MCQs under one timer. Boson approximates but lacks the platform-level content ecosystem.

**Key product messaging angles:**

- "Practice the exam you'll actually take"
- "Real PBQs + MCQs, one combined timer, scored like the real thing"
- "CompTIA-approximate scaled score (100-900), per-domain diagnostic, targeted study recommendations"
- "±50 point approximation disclaimer" — stated honestly in-app, protects against over-claim

**Scoring model:** linear scaled 100-900 with configurable pass threshold per cert. PBQs weighted 4× MCQs by default (closest published approximation of CompTIA's real weighting).

**Content-gated launch:**

Feature is live in production (code-complete as of 22-Apr-2026) but returns `insufficient_content` per cert until authoring meets launch thresholds:

- **Minimum:** 10 PBQs + 200 MCQs exam-tagged per cert
- **Mature:** 40-60 PBQs + 600-900 MCQs exam-tagged per cert

**DO NOT launch marketing announcement for the integrated exam** until at least one cert has hit the minimum threshold and has been end-to-end tested by a real user. Announcing before content is ready would over-promise.

First cert likely ready: Network+ (largest existing bank, 200+ MCQs once tagged). Monitor PBQ Creator and Exam Engine project progress for the go-signal.

**NOTE:** Exam Engine is ALREADY A SELLABLE SKU (£24.99 per cert) and is included in Prep Bundles. It's live in Stripe and the store. Content gate is at the platform (FortifyLearn app) level, not the storefront level — people can buy it now; they just won't get a usable experience until content ships.

---

## Suggested marketing site changes when ready

Timed to product readiness:

1. **Homepage hero:** add "Mock exams that mirror the real thing" or similar above-the-fold messaging once first cert hits threshold.

2. **Cert pages:** expand from 3 to 5 (add A+ Core 1, A+ Core 2 pages with authentic CompTIA A+ badge). Timing: wait for A+ content. Remember scale threshold — store navbar + cert tiles will need responsive treatment.

3. **"How it works" section:** add new step explaining the integrated mock exam flow (PBQs first, MCQs second, one timer, per-domain diagnostic, study recommendations).

4. **Differentiator comparison table:** if competitor comparison is part of marketing narrative, integrated exam is the strongest single differentiator now in hand.

---

## Visual assets available

### CompTIA cert badges (real) in cy-sec-website repo

- `/public/logos/comptia-network-plus.svg`
- `/public/logos/comptia-security-plus.svg`
- `/public/logos/comptia-cysa-plus.svg`

Used directly by `StorePage.jsx` featured bundle cards and cert tiles.

### Also in GazCocklin/fortify-learn /public/assets/

- `comptia-netplus.svg`, `comptia-secplus.svg`, `comptia-cysa.svg`
- `comptia-aplus-core1.svg`, `comptia-aplus-core2.svg` (A+ Cores share the same real badge file)

Brand colours/tokens unchanged. Gradient: `linear-gradient(135deg, #0B1D3A, #0891B2)`.

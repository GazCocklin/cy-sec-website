# Cy-Sec Website — Project Instructions

> This document mirrors the instructions pinned in the Claude.ai project UI.
> Kept in the repo as a backup and so it travels with the code.
> When the Claude.ai project instructions are updated, update this file too (and vice versa).

**Last updated:** 25 April 2026 (MCQ retirement → Exam Engine becomes Study + Exam Mode; Prep Bundle £39.99; A+ Core 1 + Core 2 vertical added with dual-core mega bundle; A+ exam codes corrected to 220-1201/1202; dedicated A+ landing pages built; stripe-webhook v34)

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
- `comptia-aplus.svg` (single A+ badge — used for both Core 1 and Core 2; CompTIA issues one A+ credential covering both Cores, exam code differentiates them)

### Tool screenshots (`public/screenshots/`)

| File | Tool / context |
|---|---|
| `fl-exam-question.png` | **Exam Engine — question in progress** (NTP Drift PBQ, 1:29:35 timer, network diagram). Used on all 3 Exam Engine product cards, purchase-confirmation emails for Exam Engine buyers, and the ExamPrepSection Exam Engine card on every cert landing page. |
| `fl-exam-results.png` | **Exam Engine — readiness outcome** (746/900 PASS, Focus three domains). Used in purchase-confirmation emails for Prep Bundle buyers and as the right-panel visual of the ExamPrepSection Prep Bundle callout on every cert landing page. |
| `fl-mcq-reasoning.png` | **MCQ Study Mode — full reasoning** (DNS cache poisoning question with CORRECT ANSWER + "Why the other options are wrong"). Used on the Exam Engine cards as the Study Mode visual reference, and the ExamPrepSection MCQ Study Mode card on every cert landing page. |
| `fl-siem.png` | **Arclight SIEM v5.0.3** — CySA+ Advanced Labs signature tool. Also used as the right-panel visual on the store's promo hero. |
| `fl-netscan.png` | NETSCAN PRO v4.2.1 (CySA+ Advanced Labs / Complete Labs) |
| `fl-cysa-cli.png` | **CySA+ Foundation Labs firewall-hunt shot** — FW1 (Perimeter) admin terminal, `grep`/`tail` on `/var/log/firewall.log` showing 352 ACCEPT entries from 91.108.4.34 → 10.40.0.20:443 (suspected exfil). Also currently used as A+ Core 1 hero placeholder. |
| `fl-netsim.png` | FL-NETSIM v2.0 / Cisco IOS terminal (Network+ Foundation Labs thumbnail) |
| `fl-netcap.png` | NETCAP Analyzer v3.2 (N+ Advanced Labs / Complete Labs) |
| `fl-netpulse.png` | NETPULSE NMS v6.1 (N+ Advanced Labs) |
| `fl-fortiguard.png` | FORTIGUARD Policy Auditor v3.1 (Sec+ Advanced Labs / Complete Labs). Also currently used as A+ Core 2 hero placeholder. |
| `fl-linux-cli.png` | Linux CLI / SSH hardening (Sec+ Foundation Labs thumbnail) |
| `fl-dashboard.png` / `fl-terminal.png` / `fl-lab-briefing.png` / `fl-lab-picker.png` / `fl-results.png` | Platform UI shots (fallbacks, abandoned-cart email, etc.) |
| `fl-exam-banner.png` | Currently unused. Was an experimental Prep Bundle backdrop (cropped readiness banner). Crop cut off the 746/PASS score; reverted. Kept for a future retry with a better crop. |

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
- Amber "Launching soon" badge (A+ landing pages): text `#fcd34d` on `rgba(245,158,11,0.12)` with `rgba(245,158,11,0.35)` border

These appear only on discount/coming-soon badges — do not use elsewhere.

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
| `cy-sec.co.uk/comptia-aplus-core1-labs` | **NEW (25-Apr-2026)** A+ Core 1 (220-1201) cert landing page |
| `cy-sec.co.uk/comptia-aplus-core2-labs` | **NEW (25-Apr-2026)** A+ Core 2 (220-1202) cert landing page |
| `cy-sec.co.uk/fortifyone` | FortifyOne GRC platform page |
| `cy-sec.co.uk/admin` | Admin dashboard (navy brand, dual-C logo) |
| `cy-sec.co.uk/admin/login` | Admin login |

**Cert landing page routes:**
- `/comptia-network-plus-labs` → `src/pages/NetworkPlusLabsPage.jsx`
- `/comptia-security-plus-labs` → `src/pages/SecurityPlusLabsPage.jsx`
- `/comptia-cysa-plus-labs` → `src/pages/CySAPlusLabsPage.jsx`
- `/comptia-aplus-core1-labs` → `src/pages/APlusCore1LabsPage.jsx`
- `/comptia-aplus-core2-labs` → `src/pages/APlusCore2LabsPage.jsx`

The N+/Sec+/CySA+ pages share `src/components/ExamPrepSection.jsx` (added 24-Apr-2026, replaced the earlier thin `CompleteYourPrep` strip). This sits between the Labs tabs and Tools sections and surfaces the non-labs SKUs (Exam Engine, Prep Bundle) as a full deep-dive product section. Updated 25-Apr to reflect MCQ retirement: now describes Exam Engine in two modes (Study Mode for self-paced practice, Exam Mode for timed mocks) rather than separating MCQ Bank as its own SKU.

The two new A+ landing pages also use `ExamPrepSection`, passing `cert="aplus_core1"` / `cert="aplus_core2"`. The component reads `cert` / `certLabel` / `code` as display tokens only (no hardcoded mapping), so this works without component changes. Both A+ pages have a 2-tab structure (Foundation + Advanced) — no Complete tab, because A+ Cores have no per-Core Complete SKU.

**Navbar — Training Services dropdown has two sections:**
- **Training Services:** Professional Certifications / PBQ Engine / Store
- **FortifyLearn Labs:** Network+ Labs / Security+ Labs / CySA+ Labs / A+ Core 1 Labs / A+ Core 2 Labs

---

## Product suite

### FortifyLearn (fortifylearn.co.uk)

CompTIA exam prep platform. **Key differentiators:** real CLI simulation labs, visual interactive tools, and **integrated mock exam engine** (PBQ+MCQ under one timer, approximating real CompTIA exam structure).

#### Pricing ladder (post-MCQ retirement, 25-Apr-2026)

**For N+/Sec+/CySA+ — 5 SKUs per cert:**

| Product (public label) | Price | Contents | Key |
|---|---|---|---|
| **Foundation Labs** | £19.99 | 5 PBQ scenarios | `{cert}_pack` |
| **Advanced Labs** | £19.99 | 5 PBQ scenarios (uses visual tools) | `{cert}_pack_2` |
| **Complete Labs** | £32.99 | All 10 labs (save £6.99 vs £39.98 à la carte) | `{cert}_complete` |
| **Exam Engine** | £24.99 | **Study Mode** (1,000 MCQs with full reasoning, self-paced) **+ Exam Mode** (timed mock: 3–6 PBQs + 85–90 MCQs under one combined timer, scaled 100–900 score) | `{cert}_exam` |
| **Exam Prep Bundle** | £39.99 | Foundation Labs + Advanced Labs + Exam Engine = 3 entitlements (saves £24.98 vs £64.97 à la carte, 38% off) | `{cert}_prep_bundle` |

**For A+ Core 1 / A+ Core 2 — 4 SKUs per Core (no per-Core Complete):**

| Product | Price | Key |
|---|---|---|
| **Foundation Labs** | £19.99 | `aplus_coreN_pack` |
| **Advanced Labs** | £19.99 | `aplus_coreN_pack_2` |
| **Exam Engine** | £24.99 | `aplus_coreN_exam` |
| **Exam Prep Bundle** | £39.99 | `aplus_coreN_prep_bundle` (Foundation + Advanced + Exam Engine) |

**A+ Complete dual-core mega bundle:**

| Product | Price | Contents | Key |
|---|---|---|---|
| **A+ Complete (Core 1 + Core 2)** | £64.99 | 4 packs + 2 Exam Engines = 6 entitlements (saves £64.95 vs £129.94, 50% off) | `aplus_complete` |

**Total live SKUs:** 9 base (3 certs × Foundation/Advanced/Complete) + 6 base (3 certs × Exam Engine/Prep Bundle) + 8 A+ (Core 1/2 × 4 SKUs) + 1 A+ mega = **24 active Stripe prices**.

#### MCQ retirement (25-Apr-2026)

Standalone MCQ Study Banks were retired in commit 99f62061. Their content (1,000 MCQs per cert with full reasoning) was integrated into the Exam Engine as **Study Mode**. The Exam Engine now sells two modes for one £24.99 price:

- **Study Mode** — self-paced MCQ practice with full reasoning panel (per-distractor "why this is wrong", objective tags, flag-to-revisit)
- **Exam Mode** — timed PBQ + MCQ mock, scaled 100–900, per-domain diagnostic, focus-three recommendations

The Prep Bundle was simplified from 4 items to 3 items (Foundation Labs + Advanced Labs + Exam Engine) and reduced from £49.99 to £39.99 to match. Webhook `PREP_BUNDLE_EXPANSION` updated accordingly. Legacy `mcq_*` keys still recognised in `PACK_LABELS` for historical refund/abandoned-cart webhooks.

**FortifyLearn app entitlement gating** still uses `hasEntitlement('mcq_X')` in places — pending update to `hasEntitlement('X_exam')` so Exam Engine buyers correctly unlock Study Mode. Highest-impact pending item.

#### Free tasters (5 total, April 2026)

- Platform Walkthrough (tutorial)
- Network+: Static IP Gateway Misconfiguration
- Network+: Port Down — Finance Workstation Offline
- Security+: SSH Hardening — Root Login Vulnerability
- Security+: Firewall Rule Review — Unauthorised Remote Access

CySA+ does not have free tasters. A+ does not have free tasters.

#### Visual tools (all real, screenshots in `public/screenshots/`)

| Tool | Used in |
|---|---|
| Arclight SIEM v5.0.3 | CySA+ Advanced Labs |
| NETSCAN PRO v4.2.1 | CySA+ Advanced Labs |
| FORTIGUARD Policy Auditor v3.1 | Sec+ Advanced Labs |
| FL-NETSIM v2.0 | N+ Foundation Labs (labs 3–5), Advanced Labs (lab 3) |
| NETCAP Analyzer v3.2 | N+ Advanced Labs |
| NETPULSE NMS v6.1 | N+ Advanced Labs |

A+ Core 1/Core 2 tools are still being defined as content is authored. Lab listings on the new landing pages reference placeholder tool names (`FL-Mobile`, `FL-VMSIM`, `FL-WiFi`, `Win Admin`, `Defender`, `WinRE CLI`, `FL-MDM`, `FL-Backup`, `CLI Diag`) that will be replaced with real tool names as labs ship.

### FortifyOne (fortifyone.co.uk)

GRC platform. From £149/mo standalone, included with vCISO. **Internal route:** `/fortifyone` (NOT external link from main nav).

---

## Stripe prices (live mode, 24 active prices)

### Network+, Security+, CySA+ Foundation/Advanced/Complete (pre-existing)

Look up in Stripe Dashboard if needed — all referenced via `PRICE_MAP` in `create-checkout-session` Edge Function.

### Exam Engines (24-Apr-2026)

| Product key | Stripe price ID |
|---|---|
| `netplus_exam` | `price_1TPg3lPp3j8eGdItU9xzSbv9` |
| `secplus_exam` | `price_1TPg3wPp3j8eGdItQWHGJEoq` |
| `cysa_exam` | `price_1TPg46Pp3j8eGdItEgYjGLQu` |

### Prep Bundles £39.99 (25-Apr-2026, replaces £49.99 originals)

The original £49.99 Prep Bundle prices (`price_1TPg4J/U/f`) remain in Stripe for historical refund flows. **Pending:** archive in Stripe Dashboard alongside the 3 retired MCQ products (`prod_UMIL6AAhMjNfC4`, `prod_UMILDNb6xVrthi`, `prod_UMILIGD0Em9zeH`).

| Product key | Stripe price ID |
|---|---|
| `netplus_prep_bundle` | `price_1TPzkY...` (£39.99) |
| `secplus_prep_bundle` | `price_1TPzke...` (£39.99) |
| `cysa_prep_bundle`    | `price_1TPzkj...` (£39.99) |

### A+ Core 1 (220-1201) — 4 SKUs (25-Apr-2026)

| Product key | Stripe price ID |
|---|---|
| `aplus_core1_pack`         | `price_1TPzqTPp3j8eGdItxuunRn8x` (£19.99) |
| `aplus_core1_pack_2`       | `price_1TPzqYPp3j8eGdItgobe9VB5` (£19.99) |
| `aplus_core1_exam`         | `price_1TPzqdPp3j8eGdItugc2Irsg` (£24.99) |
| `aplus_core1_prep_bundle`  | `price_1TPzqiPp3j8eGdItkGapIMv7` (£39.99) |

### A+ Core 2 (220-1202) — 4 SKUs (25-Apr-2026)

| Product key | Stripe price ID |
|---|---|
| `aplus_core2_pack`         | `price_1TPzqnPp3j8eGdIt6qj0H3SX` (£19.99) |
| `aplus_core2_pack_2`       | `price_1TPzqtPp3j8eGdItApOY7diD` (£19.99) |
| `aplus_core2_exam`         | `price_1TPzqzPp3j8eGdIttEWW1jOp` (£24.99) |
| `aplus_core2_prep_bundle`  | `price_1TPzr4Pp3j8eGdItZLNComfB` (£39.99) |

### A+ Complete (dual-Core mega bundle) — 25-Apr-2026

| Product key | Stripe price ID |
|---|---|
| `aplus_complete` | `price_1TPzrAPp3j8eGdItYBKJ6ijQ` (£64.99) |

---

## Store page — architecture (v4, post-A+ rollout)

**File:** `src/pages/StorePage.jsx` (~1085 lines)
**Style:** Marketplace (Emmable-inspired, Cy-Sec branded). Replaced previous cert-tab-focused layout.

### Section order (top to bottom)

1. **Utility announcement strip** (navy, trust signals — UK support / 14-day refund / CompTIA Authorised Partner)
2. **Promo hero** (navy→teal gradient). Right panel displays **`fl-siem.png` Arclight SIEM dashboard** as the headline visual. Hero copy is generic — "every CompTIA cert in our catalogue" — to scale to N+ certs without rewrite.
3. **Featured row** — 6 Prep Bundle / mega cards: 3 base certs (N+, Sec+, CySA+) at £39.99 each, then A+ Core 1 + A+ Core 2 prep bundles at £39.99 each, then `APLUS_MEGA` (£64.99 dual-core) as a sixth featured card. The row is mapped from `[...CERTS, APLUS_MEGA]` (length 6).
4. **Browse by certification** — 5 cert tiles (N+, Sec+, CySA+, A+ Core 1, A+ Core 2) — click filters product grid
5. **Products grid** — responsive 2/3/4/5-col grid, preceded by a **product-kind filter chip row** (All / PBQ labs / Exam Engines). Cert filter and kind filter compose independently. A+ products show a "LAUNCHING SOON" amber ribbon (cards still buyable — early-bird pricing). Empty-state card with "Clear filters →" reset.
6. **Recently viewed** — horizontal scrolling strip (conditional on localStorage having 2+ tracked items)
7. **Features trust strip** (Lifetime / Instant / 14-day refund / UK support)
8. **Built with trusted partners** — brand-consistent teal lucide icons (Award / Lock / Zap / Database / Shield)
9. **Sticky basket bar** (fixed bottom, navy gradient) — appears when basket > 0, mobile-optimised stacking

### Key utilities preserved in StorePage.jsx

- `CERTS` array (single source of truth — adding a cert = one edit here). Each cert has: `key`, `title`, `short`, `code`, `badge`, `landingPage`, `pack1` / `pack2` / `complete?` / `exam` / `prep_bundle` SKU configs (Complete is optional — A+ Cores omit it). The `comingSoon` flag triggers the LAUNCHING SOON ribbon — currently true on all A+ SKUs.
- `APLUS_MEGA` constant — separate from the `CERTS` array because it spans two Cores. Mapped through `FeaturedBundleCard` with data-driven cardTitle/sub/countChip props that fall back when missing.
- `KEY_LOOKUP`, `GRID_PRODUCTS` (derived from CERTS) — robust to missing complete/optional SKUs
- `loadBasket` / `saveBasket` / `sanitiseBasket` — localStorage `cysec_basket`
- `loadRecent` / `saveRecent` / `addRecent` — localStorage `cysec_recent` (max 8)
- `triggerStripe` — `product_key` singular for single items, `product_keys` array for multi
- `CheckoutModal` / `ModalShell` / `BasketBar`
- `ProductDetailsModal` — "What's inside →" link on every card. Content derived per SKU type (`isAplusMega` branch handles the dual-Core case).

### Product card thumbnails

Every SKU config has a `thumbnail` field. `ProductCard` and `FeaturedBundleCard` render it with a small cert-badge chip overlay. Where a thumbnail is `null` (Prep Bundles, mega bundles), the card uses a clean light-gradient + centred CompTIA badge design instead.

A+ Core 1 / Core 2 SKUs currently use placeholder thumbnails (`fl-cysa-cli.png` and `fl-fortiguard.png`) — to be swapped for A+ specific imagery as content is authored.

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

Cards show "Foundation labs" / "Advanced labs" / "Best value labs" / "Mock exam · timed" / "Most popular" instead of star ratings or sold counts. **We do NOT fabricate social proof.** When real Trustpilot/G2 reviews or sales data arrive, swap `config.meta` for a `★ rating + sold count` block — one change in `ProductCard` component.

---

## Store scale thresholds — live state with 5 certs

The store now lists 5 certs (N+, Sec+, CySA+, A+ Core 1, A+ Core 2). The previously-hardcoded pinch points have been mitigated:

- **Featured bundles row:** 6 cards shown via `[...CERTS, APLUS_MEGA].length === 6`. Already at scale boundary — the next cert (whether 6th CompTIA cert or first non-CompTIA vendor) should switch this to horizontal scroll OR cap featured at 3 editor's-pick bundles.
- **Browse-by-certification tiles:** now 5 tiles. Still uses `grid-cols-3` layout — wraps 3+2 on desktop. Tolerable but a cleaner responsive treatment is overdue. Switch when adding cert 6.
- **Hero promo copy:** genericised in this update to "for every CompTIA cert in our catalogue" — already scales to any cert count without rewrite.

### For multi-vendor expansion (CertNexus, (ISC)², AWS, etc.)

When a non-CompTIA cert lands:
1. Add `vendor` field to each cert entry (`'comptia' | 'certnexus' | etc.`). Add vendor filter bar above cert tiles.
2. Allow optional SKUs per cert: guard rendering with `cert.mcq && <TestPrepCard .../>`. Current catalogue assumes a fixed shape; vendor-specific certs may have different shape (e.g. voucher, eBook).
3. Trusted partners strip needs data-driven vendor badges if vendor-specific partner status is relevant.

---

## Entitlement architecture (known gap)

Three entitlement tables on Supabase project `kmnbtnfgeadvvkwsdyml`:

- `fl_entitlements` — free-text `product_key` (no FK)
- `user_entitlements` — `pack_id` UUID required
- `user_purchases` — `pack_id` UUID required

Exam, MCQ-legacy, and Prep Bundle purchases only write to `fl_entitlements` because they lack pack UUIDs (no `fl_packs` rows exist for them). A+ Cores fall in the same bucket.

**Consequence:** admin revenue reporting via `user_purchases` MISSES exam, prep_bundle, and A+ revenue. Flagged and accepted as non-blocking.

**Future fix:** add UUIDs + `fl_packs` rows for exam/prep_bundle/A+. Normalise so all entitlements write to all three tables and admin reports capture full revenue.

---

## GitHub & infrastructure

- **cy-sec.co.uk:** React/Vite SPA, `GazCocklin/cy-sec-website`, `main` branch → Vercel auto-deploy (~90s). Bundle-patching workflow — never `npm run build`.
- **PAT:** Supabase `_platform_secrets` key=`github_pat` (fetch via Supabase MCP, never ask Gaz). GitHub MCP connector is **read-only** (403 on writes). Reliable write path: clone with PAT, commit, push. `api.github.com` is NOT on bash egress allowlist; use git CLI only.
- **Pushback workflow** (preferred for in-repo edits): Postgres-driven via `cysec-pushback` edge function v2 (verify_jwt:false, X-FL-Admin auth). Stage ops in `_push_ops` table (path, op_type 'replace' or 'full', old_text, new_text using Postgres dollar-quote tags such as the four-character delimiter Z). Dry-run with `?dry_run=1`, then push. v2 supports new files when all ops on a path are 'full'.
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

FortifyLearn welcome email. Lists 5 free tasters. Upsell block uses Foundation/Advanced Labs and Complete Labs labels (legacy MCQ language synced out in v11).

### send-fl-feedback-email (v9, verify_jwt:false)

FL bug report + feature request emails. Bug = red (`#ef4444`), Feature = teal (`#0891B2`). Custom CORS allowlist.

### stripe-webhook (v34, verify_jwt:false — Stripe calls without JWT)

**Split into two files** (single-file deploys over ~38KB fail).

- `index.ts` (~13KB): handlers + `PACK_LABELS` + `PACK_UUID_MAP` + `COMPLETE_EXPANSION` + `PREP_BUNDLE_EXPANSION` + `BUNDLE_PACKS`
- `emails.ts` (~26KB): all email template functions, exports 6 sendX functions (admin/customer × confirmation/refund/abandoned-cart)

**v33 (25-Apr-2026)** — A+ vertical added:
- `PACK_LABELS` covers all 9 A+ keys (Core 1 / Core 2 × pack/pack_2/exam/prep_bundle plus aplus_complete)
- `PREP_BUNDLE_EXPANSION` updated for the post-MCQ-retirement 3-item bundle (Foundation + Advanced + Exam Engine, no MCQ). For A+ Cores: `aplus_coreN_prep_bundle` → 3 entitlements. For aplus_complete: 6 entitlements (4 packs + 2 Exam Engines).
- `EXAM_KEYS` array in emails.ts includes `aplus_core1_exam` and `aplus_core2_exam`
- `APLUS_MEGA_KEYS = ["aplus_complete"]` for the dual-Core case

**v34 (25-Apr-2026)** — `emails.ts` `certLandingForKey()` updated:
- A+ Core 1 keys (`aplus_core1_*`) → `https://cy-sec.co.uk/comptia-aplus-core1-labs`
- A+ Core 2 keys (`aplus_core2_*`) → `https://cy-sec.co.uk/comptia-aplus-core2-labs`
- `aplus_complete` (mega bundle) still falls back to `/store` (no single landing page for the dual-Core mega)
- Order matters: Core checks come BEFORE the generic `aplus` catch
- `index.ts` unchanged from v33

**Handles:** `checkout.session.completed`, `charge.refunded`, `checkout.session.expired`.

`heroScreenshotForKey` routes purchase-confirmation email hero images:

| Key match | Screenshot |
|---|---|
| `isPrepBundleKey` | `fl-exam-results.png` |
| `isExamKey` | `fl-exam-question.png` |
| Legacy `isMcqKey` | `fl-mcq-reasoning.png` (or `fl-mcq-netplus.png` for `mcq_netplus`) |
| `netplus*` | `fl-netpulse.png` |
| `secplus*` | `fl-fortiguard.png` |
| `cysa*` | `fl-siem.png` |
| A+ (no specific shot yet) / fallback | `fl-dashboard.png` |

**Critical ordering:** `isPrepBundleKey` and `isExamKey` checks must come before `key.startsWith("netplus")` etc., otherwise `netplus_prep_bundle` matches the Network+ labs route first.

### create-checkout-session (v25, verify_jwt:true)

`PRICE_MAP` includes all 24 SKUs (15 base + 9 A+).

Three collapse passes optimise carts before sending to Stripe:
- `COMPLETE_COLLAPSE` (N+/Sec+/CySA+ only): `[pack, pack_2] → complete` — customer charged £32.99 instead of £39.98
- `PREP_BUNDLE_COLLAPSE` per cert: `[pack, pack_2, exam] → prep_bundle` — customer charged £39.99 instead of £64.97. Triggers per cert independently.
- `APLUS_MEGA_COLLAPSE`: six A+ SKUs (any combination) OR both Core prep bundles → `aplus_complete` — customer charged £64.99 instead of £79.98+ — drives mega bundle attach rate

Legacy `mcq_*` keys auto-redirect to `*_exam` so old links / abandoned baskets resolve correctly.

### Stripe Dashboard (already configured)

- Webhook subscribed: `checkout.session.completed`, `charge.refunded`, `checkout.session.expired`
- Stripe default customer emails DISABLED for Successful payments + Refunds (prevents duplicates with branded emails). Failed charges remains enabled.

---

## SEO — core keywords

**Primary:** CompTIA PBQ practice, CompTIA performance-based questions, CompTIA Network+ PBQ labs, CompTIA Security+ PBQ simulation, CompTIA CySA+ practice labs, **CompTIA A+ Core 1 practice (220-1201)**, **CompTIA A+ Core 2 practice (220-1202)**, CompTIA exam prep UK, CompTIA mock exam UK

**Long-tail:** "how to pass CompTIA PBQ questions", "SIEM lab CompTIA CySA+", "packet capture lab CompTIA Network+", "firewall configuration CompTIA practice", "A+ Core 1 hardware troubleshooting labs", "A+ Core 2 OS labs", "CompTIA labs UK", "CompTIA practice exam with PBQ"

**On-page rules:** H1 must contain primary keyword. Unique meta description per page with keyword + CTA. Internal linking: every cert page links to store.

### Store meta (v4)

- **Title:** "FortifyLearn Store — CompTIA exam prep bundles | Cy-Sec"
- **Description:** "Real CompTIA PBQ simulation labs, mock exam engine and Study Mode practice. Network+, Security+, CySA+, A+ Core 1 and A+ Core 2 exam prep bundles from £39.99 — save up to £24.98 vs à la carte. Lifetime access, 14-day refund."

---

## Conversion principles

**The funnel:** Organic search → cert landing page → store → bundle/pack

### CTA hierarchy (v4 store)

- **Primary:** "Add bundle →" on Prep Bundle featured cards (£39.99 base certs / £39.99 A+ Core / £64.99 A+ Complete); "Add to basket" on individual SKU cards
- **Secondary:** Complete labs cards with -18% SAVE £6.99 pill (N+/Sec+/CySA+ only)
- **Tertiary:** "Try a free lab" in hero (external → fortifylearn.co.uk)
- **Retention:** Recently viewed strip keeps abandoned items visible cross-session

### Bundle economics

- Base cert Prep Bundle £39.99 saves customer £24.98 (38% off à la carte £64.97 = pack £19.99 + pack_2 £19.99 + exam £24.99)
- Complete Labs £32.99 saves £6.99 (18% off £39.98) — N+/Sec+/CySA+ only
- A+ Core Prep Bundle £39.99 saves £24.98 (same maths as base certs)
- A+ Complete £64.99 saves £64.95 (50% off £129.94) — biggest single-purchase saving in the catalogue
- `PREP_BUNDLE_COLLAPSE` and `APLUS_MEGA_COLLAPSE` in `create-checkout-session` automatically rewrite carts to the cheaper bundle SKU when matching SKUs are detected — customer wins the saving, we win the bundle attach signal

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

### Immediate (high-impact)

- **FortifyLearn app entitlement gating** (`GazCocklin/fortify-learn` repo, untouched): replace `hasEntitlement('mcq_X')` with `hasEntitlement('X_exam')` so Exam Engine buyers actually unlock Study Mode. Highest-impact gap from MCQ retirement.
- **Stripe Dashboard archive** (~2 min, manual): archive 3 retired MCQ products (`prod_UMIL6AAhMjNfC4`, `prod_UMILDNb6xVrthi`, `prod_UMILIGD0Em9zeH`) and 3 old £49.99 Prep Bundle prices. Archive only — preserves refund history.
- **Rule 5 migration** — cert landing pages including the 2 new A+ pages, plus `ExamPrepSection.jsx`, use `<a href="/store">` instead of React Router `<Link to="/store">`. Causes full page reloads on nav. Cross-page pass to convert all of them.

### A+ specific (timed to content readiness)

- **A+ specific hero/tool screenshots** to replace the placeholder `fl-cysa-cli.png` (Core 1 hero) and `fl-fortiguard.png` (Core 2 hero), plus the placeholder thumbnails on all 8 A+ store SKU cards
- **A+ content authoring** to threshold (current: 1 PBQ + 20 MCQs Core 1 / 0 MCQs Core 2). Target minimum 10 PBQs per pack tier and 200 MCQs per Core for an honest launch
- **`is_for_sale=true`** on A+ DB rows when content reaches threshold

### Screenshot pickups

Tier 1 (exam + MCQ + CySA CLI) complete. Remaining gaps:

- **Tier 2 — "Labs + Exam + Study Mode" composite/montage.** Three-device stack showing a terminal, an exam question, and a Study Mode reasoning panel side-by-side. Cert-agnostic. Could replace the current SIEM-only hero visual if it reads better — but the current hero is good enough that this is a "nice-to-have", not urgent.
- **Tier 3 — Lab briefing screen** for card hover states (optional)
- **Tier 3 — Real customer logos** for the trusted-partners strip once we have named references. When this lands, swap `TrustedPartners` component config from the current lucide-icon treatment to vendor logos.

### When 6th cert lands

- Featured bundles row: convert from `lg:grid-cols-3` (currently shown 6 cards / 2 rows) to horizontal scroll, or cap at 3 editor's picks
- Cert tile grid: convert from `grid-cols-3` to responsive wrap/scroll
- Hero promo copy already scales — no change

### When first non-CompTIA cert lands

- Add `vendor` field to CERTS array entries in `StorePage.jsx`
- Add vendor filter bar above cert tiles
- Guard optional SKUs: `cert.mcq && <TestPrepCard .../>`
- Trusted partners strip: make data-driven for multiple vendor badges

### Deferred

- Free-to-paid conversion tracking view in admin
- Licence expiry tracker in admin
- Revenue breakdown by pack in admin (blocked by entitlement gap — non-pack SKUs aren't in `user_purchases`)
- Entitlement gap proper fix: add UUIDs + `fl_packs` rows for exam/prep_bundle/A+
- Reviews strategy (Google Business Profile, G2) — once we have actual reviews, swap `config.meta` from "Foundation labs" etc. to ★ rating + sold count
- Bundle pricing review — current £39.99 base / £39.99 A+ Core / £64.99 A+ Complete are working; revisit with real conversion data

### Recently completed (25-Apr-2026 session)

Done and removed from pending:

- ✅ MCQ Study Banks retired — Exam Engine now sells Study Mode + Exam Mode (commit 99f62061)
- ✅ Prep Bundle simplified to 3 items at £39.99 (was 4 items at £49.99)
- ✅ A+ Core 1 + Core 2 added to storefront with 4 SKUs each + dual-Core mega `aplus_complete` £64.99 (commit 3bbada96)
- ✅ A+ exam codes corrected from 220-1101/1102 to current 220-1201/1202 (commit f144a10e)
- ✅ Dedicated A+ landing pages built: `/comptia-aplus-core1-labs` and `/comptia-aplus-core2-labs` (commit f144a10e)
- ✅ stripe-webhook v33 wired for A+ vertical (PACK_LABELS, PREP_BUNDLE_EXPANSION, APLUS_MEGA, EXAM_KEYS arrays)
- ✅ stripe-webhook v34 emails.ts certLandingForKey routes A+ Core keys to dedicated landing pages
- ✅ create-checkout-session v25 with 24-entry PRICE_MAP and three-pass collapse logic
- ✅ Hero promo copy genericised to scale with cert count
- ✅ Featured row scaled to 6 cards via `[...CERTS, APLUS_MEGA]`

### Recently completed (24-Apr-2026 session)

- ✅ Legal page placeholders filled (Companies House #, registered address, ICO #) on `TermsOfService.jsx` and `PrivacyPolicy.jsx`
- ✅ Cert landing pages now cover Exam Engine + (then-MCQ Bank) + Prep Bundle via `ExamPrepSection.jsx` (since updated for MCQ retirement)
- ✅ CySA+ Foundation Labs screenshot (`fl-cysa-cli.png`) added — all 18 SKUs thumbnailed
- ✅ Pack 1 / Pack 2 → Foundation Labs / Advanced Labs rename site-wide + webhook v31 + welcome-email v11 alignment
- ✅ Store hero SIEM screenshot replaces "37%" typography
- ✅ Product-kind filter chips added to store grid
- ✅ `TrustedPartners` refactored to brand-consistent teal icons

---

## Visual assets available

### CompTIA cert badges (real) in cy-sec-website repo

- `/public/logos/comptia-network-plus.svg`
- `/public/logos/comptia-security-plus.svg`
- `/public/logos/comptia-cysa-plus.svg`
- `/public/logos/comptia-aplus.svg` (single A+ badge — used for Core 1, Core 2, and aplus_complete display)

Used directly by `StorePage.jsx` featured bundle cards, cert tiles, and the two new A+ landing pages.

### Also in GazCocklin/fortify-learn /public/assets/

- `comptia-netplus.svg`, `comptia-secplus.svg`, `comptia-cysa.svg`
- `comptia-aplus-core1.svg`, `comptia-aplus-core2.svg` (A+ Cores share the same real badge file — shipped to cy-sec-website as `comptia-aplus.svg`)

Brand colours/tokens unchanged. Gradient: `linear-gradient(135deg, #0B1D3A, #0891B2)`.

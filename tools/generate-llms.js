#!/usr/bin/env node
//
// RETIRED 21-Aug-2026. DO NOT RE-WIRE INTO THE BUILD.
//
// This script auto-generated public/llms.txt by scanning src/pages for <Helmet>
// blocks. It had two defects that put internal pages on a public, machine-readable
// surface that LLM crawlers fetch preferentially:
//
//   1. URLs were fabricated. It built a route map from App.jsx, then tested
//      `routes.length` on a Map (always undefined), so it ALWAYS fell through to
//      generateFallbackUrl() and derived paths from filenames instead.
//   2. No allow-list. Every page with a <Helmet> was published, including
//      StrategicRoadmap, MarketingInsights, PreLaunchChecklist and the admin
//      dashboards, each with a description explaining its internal purpose.
//
// It also wrote to public/llms.txt — the same path as the curated file — so every
// build silently destroyed the hand-maintained version before Vite copied public/
// into dist/. The curated file had therefore never been served.
//
// public/llms.txt is now hand-maintained and version-controlled. Edit it directly.
// Keep prices in sync with canon.pricing.standard_ladder and partner claims in
// sync with canon.brand.partner_status.
//
console.error('tools/generate-llms.js is retired. public/llms.txt is hand-maintained. See the comment in this file.');
process.exit(1);

# Cy-Sec Email Templates

All transactional email templates live here. Production HTML files ready for use with [Resend](https://resend.com).

## Design conventions

| Property | Value |
|---|---|
| Max width | 600px |
| Header image | `https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80&fit=crop` (matches FL/FO login pages) |
| Gradient overlay | `linear-gradient(160deg, rgba(7,25,41,0.93), rgba(10,34,64,0.88), rgba(11,92,107,0.82))` |
| Primary colour | `#1A56DB` |
| Navy | `#0A1E3F` |
| Accent cyan | `#0891B2` |
| Heading font | Bricolage Grotesque (Google Fonts) + `system-ui` fallback |
| Logo font (SVG) | Segoe UI / SF Pro Display (embedded in SVG files) |
| Outlook support | VML background image block included in all hero headers |

## Template variables

All variables use `{{double_curly_braces}}` syntax.

| Variable | Description |
|---|---|
| `{{first_name}}` | Recipient first name |
| `{{message_preview}}` | First ~200 chars of submitted message |
| `{{year}}` | Pass `new Date().getFullYear()` from Edge Function |

## Templates

| File | Trigger | Type | Accent colour |
|---|---|---|---|
| `contact-confirmation.html` | Contact form submission (cy-sec.co.uk/contact) | Transactional | Blue `#1A56DB` |
| `fl-feedback-confirmation.html` | FL bug report submission | Transactional | Red `#ef4444` |
| `fl-feature-request-confirmation.html` | FL feature request submission | Transactional | Purple `#8b5cf6` |

## Edge Functions

| Function | Location | Trigger |
|---|---|---|
| `send-contact-confirmation` | `supabase/functions/send-contact-confirmation/` | Called from ContactPage.jsx after DB insert |

## Deploying edge functions

```bash
# Set API key secret
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx --project-ref kmnbtnfgeadvvkwsdyml

# Deploy function
supabase functions deploy send-contact-confirmation --project-ref kmnbtnfgeadvvkwsdyml
```

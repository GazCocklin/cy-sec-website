# Cy-Sec Email Templates

All transactional email templates live here. Production HTML files ready for use with [Resend](https://resend.com).

## Design conventions

| Property | Value |
|---|---|
| Max width | 600px |
| Hero image | `https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&fit=crop` (FL circuit board) |
| Hero gradient | `linear-gradient(160deg, rgba(7,25,41,0.93), rgba(10,34,64,0.88), rgba(11,92,107,0.82))` |
| CTA button colour | `#0891B2` (Cy-Sec teal) |
| Navy | `#0A1E3F` |
| Heading font | Bricolage Grotesque (Google Fonts) + `system-ui` fallback |
| Logo | SVG inline — Cy-Sec spiral + wordmark |
| Design system | https://www.notion.so/33ec8ee707e18199b8e2d12f345acef7 |

## Templates — Transactional (Resend)

| File | Trigger | Accent |
|---|---|---|
| `contact-confirmation.html` | Contact form (cy-sec.co.uk/contact) | Blue `#1A56DB` |
| `fl-feedback-confirmation.html` | FL bug report via feedback widget | Red `#ef4444` |
| `fl-feature-request-confirmation.html` | FL feature request via feedback widget | Purple `#8b5cf6` |

### Edge Functions (Supabase `kmnbtnfgeadvvkwsdyml`)

| Function | Trigger |
|---|---|
| `send-contact-confirmation` | Called from ContactPage.jsx after DB insert |
| `send-fl-feedback-email` | DB trigger `on_fl_feedback_insert` on `fl_feedback` table — handles both fault and feature types |

## Templates — Supabase Auth Emails

Deployed live to Supabase via Management API. Update via `PATCH https://api.supabase.com/v1/projects/kmnbtnfgeadvvkwsdyml/config/auth`.

| File | Template | Subject | Pill |
|---|---|---|---|
| `auth-confirm-signup.html` | Confirm signup | `Confirm your FortifyLearn account` | 🟢 Green |
| `auth-reset-password.html` | Reset password | `Reset your FortifyLearn password` | 🟡 Amber |
| `auth-magic-link.html` | Magic link | `Your FortifyLearn sign-in link` | 🔵 Cyan |
| `auth-invite-user.html` | Invite user | `You've been invited to FortifyLearn` | 🟣 Purple |

All auth templates use `{{ .ConfirmationURL }}` as the single Supabase variable.

## Updating Supabase auth templates

```js
// PATCH with Management API token from supabase.dashboard.auth.token in localStorage
fetch('https://api.supabase.com/v1/projects/kmnbtnfgeadvvkwsdyml/config/auth', {
  method: 'PATCH',
  headers: { 'Authorization': 'Bearer <token>', 'Content-Type': 'application/json' },
  body: JSON.stringify({
    mailer_subjects_confirmation: 'Confirm your FortifyLearn account',
    mailer_templates_confirmation_content: '<html>...',
    // etc.
  })
})
```

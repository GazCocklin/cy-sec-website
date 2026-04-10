// supabase/functions/send-contact-confirmation/index.ts
// Deploy: supabase functions deploy send-contact-confirmation
// Secret:  supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM           = 'Cy-Sec <noreply@cy-sec.co.uk>'
const ADMIN_TO       = 'info@cy-sec.co.uk'

const cors = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ─── Email: user confirmation ─────────────────────────────────────────────────
function confirmationHtml(firstName: string, messagePreview: string): string {
  const year = new Date().getFullYear()
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700&display=swap');
    body{margin:0;padding:0;background-color:#e8edf4;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
    table{border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;}
    @media only screen and (max-width:600px){
      .wrap{width:100%!important;}
      .pad{padding:32px 24px!important;}
      .h1{font-size:30px!important;line-height:1.2!important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#e8edf4;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#e8edf4;">We've received your message and will be in touch within one business day — Cy-Sec Awareness &amp; Consultancy</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#e8edf4;padding:36px 16px;">
    <tr><td align="center">
      <table class="wrap" role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="border-radius:12px 12px 0 0;padding:0;overflow:hidden;">
            <!--[if gte mso 9]>
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="mso-width-percent:1000;height:320px;">
              <v:fill type="frame" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80&fit=crop" color="#0A1E3F"/>
              <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text:true;">
            <![endif]-->
            <div style="background-color:#0A1E3F;background-image:linear-gradient(160deg,rgba(7,25,41,0.93) 0%,rgba(10,34,64,0.88) 45%,rgba(11,92,107,0.82) 100%),url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80&fit=crop');background-size:cover;background-position:center;border-radius:12px 12px 0 0;">
              <div style="background-image:radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:28px 28px;padding:40px 48px 48px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:44px;">
                  <tr>
                    <td style="vertical-align:bottom;">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 80" width="186" height="48" style="display:block;">
                        <g transform="translate(6,16) scale(0.188)"><path fill="white" d="M250 138a12 12 0 0 1-24 0a94.11 94.11 0 0 0-94-94a84.09 84.09 0 0 0-84 84a74.09 74.09 0 0 0 74 74a64.07 64.07 0 0 0 64-64a54.06 54.06 0 0 0-54-54a44.05 44.05 0 0 0-44 44a34 34 0 0 0 34 34a24 24 0 0 0 24-24a14 14 0 0 0-14-14a4 4 0 0 0-2.82 1.17A12 12 0 0 1 124 148a20 20 0 0 1-20-20a28 28 0 0 1 28-28a38 38 0 0 1 38 38a48.05 48.05 0 0 1-48 48a58.07 58.07 0 0 1-58-58a68.07 68.07 0 0 1 68-68a78.09 78.09 0 0 1 78 78a88.1 88.1 0 0 1-88 88a98.11 98.11 0 0 1-98-98A108.12 108.12 0 0 1 132 20a118.13 118.13 0 0 1 118 118"/></g>
                        <text x="70" y="50" font-family="'Segoe UI','SF Pro Display',-apple-system,sans-serif" font-size="46" font-weight="800" letter-spacing="-1.8" fill="white">Cy-Sec</text>
                        <text x="72" y="68" font-family="'Segoe UI','SF Pro Display',-apple-system,sans-serif" font-size="11.5" font-weight="400" letter-spacing="0.2" fill="rgba(255,255,255,0.45)">Awareness and Consultancy Ltd</text>
                      </svg>
                    </td>
                    <td align="right" style="vertical-align:bottom;"><a href="https://cy-sec.co.uk" style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:11px;color:rgba(255,255,255,0.3);text-decoration:none;">cy-sec.co.uk</a></td>
                  </tr>
                </table>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                  <tr><td style="background:rgba(26,86,219,0.28);border:1px solid rgba(96,165,250,0.4);border-radius:100px;padding:5px 16px;">
                    <span style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:11px;font-weight:600;color:#93c5fd;letter-spacing:1.5px;text-transform:uppercase;">Message received</span>
                  </td></tr>
                </table>
                <h1 class="h1" style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:38px;font-weight:700;color:#ffffff;margin:0 0 16px;line-height:1.15;letter-spacing:-1.5px;">
                  Thanks for<br/>getting in touch,<br/><span style="color:#0891B2;">${firstName}.</span>
                </h1>
                <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:16px;color:rgba(255,255,255,0.7);margin:0;line-height:1.65;">Your message is safe with us. We'll respond<br/>within one business day.</p>
              </div>
            </div>
            <!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr><td style="padding:40px 48px 0;">
                <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:10px;font-weight:600;color:#94a3b8;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 14px;">Your message</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr><td style="background:#f8fafc;border-left:4px solid #1A56DB;padding:18px 22px;border-radius:0 8px 8px 0;">
                    <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:15px;color:#334155;margin:0;line-height:1.7;font-style:italic;">"${messagePreview}"</p>
                  </td></tr>
                </table>
              </td></tr>
            </table>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr><td style="padding:36px 48px 0;">
                <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:10px;font-weight:600;color:#94a3b8;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 22px;">What happens next</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:18px;"><tr>
                  <td width="44" style="vertical-align:top;"><div style="width:34px;height:34px;background:#eff6ff;border-radius:8px;text-align:center;line-height:34px;font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:14px;font-weight:700;color:#1A56DB;">1</div></td>
                  <td style="padding-left:14px;vertical-align:top;padding-top:2px;">
                    <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:15px;font-weight:600;color:#0f172a;margin:0 0 4px;">We review your enquiry</p>
                    <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:14px;color:#64748b;margin:0;line-height:1.55;">Our team assesses your query and routes it to the right consultant.</p>
                  </td>
                </tr></table>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:18px;"><tr>
                  <td width="44" style="vertical-align:top;"><div style="width:34px;height:34px;background:#eff6ff;border-radius:8px;text-align:center;line-height:34px;font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:14px;font-weight:700;color:#1A56DB;">2</div></td>
                  <td style="padding-left:14px;vertical-align:top;padding-top:2px;">
                    <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:15px;font-weight:600;color:#0f172a;margin:0 0 4px;">You hear back within 24 hours</p>
                    <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:14px;color:#64748b;margin:0;line-height:1.55;">A direct response from <span style="color:#1A56DB;">info@cy-sec.co.uk</span> — straight from our team.</p>
                  </td>
                </tr></table>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                  <td width="44" style="vertical-align:top;"><div style="width:34px;height:34px;background:#eff6ff;border-radius:8px;text-align:center;line-height:34px;font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:14px;font-weight:700;color:#1A56DB;">3</div></td>
                  <td style="padding-left:14px;vertical-align:top;padding-top:2px;">
                    <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:15px;font-weight:600;color:#0f172a;margin:0 0 4px;">We get to work</p>
                    <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:14px;color:#64748b;margin:0;line-height:1.55;">Whether it's consulting, FortifyLearn or FortifyOne — we'll come back with the right approach for you.</p>
                  </td>
                </tr></table>
              </td></tr>
            </table>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr><td style="padding:36px 48px 0;"><div style="height:1px;background:#f1f5f9;"></div></td></tr>
            </table>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr><td style="padding:32px 48px 44px;">
                <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:10px;font-weight:600;color:#94a3b8;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 18px;">Also from Cy-Sec</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                  <td width="48%" style="vertical-align:top;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                      <td style="background:#0A1E3F;border-radius:10px;padding:20px;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 80" width="148" height="25" style="display:block;margin-bottom:12px;">
                          <defs><linearGradient id="flg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="470" y2="0"><stop offset="0%" stop-color="white"/><stop offset="55%" stop-color="#7DD3E8"/><stop offset="100%" stop-color="#0891B2"/></linearGradient></defs>
                          <g transform="translate(6,16) scale(0.188)"><path fill="url(#flg)" d="M216 44H40a20 20 0 0 0-20 20v128a20 20 0 0 0 20 20h176a20 20 0 0 0 20-20V64a20 20 0 0 0-20-20Zm-4 144H44V68h168ZM72.5 150.63L100.79 128L72.5 105.37a12 12 0 1 1 15-18.74l40 32a12 12 0 0 1 0 18.74l-40 32a12 12 0 0 1-15-18.74ZM144 172h32a12 12 0 0 0 0-24h-32a12 12 0 0 0 0 24Z"/></g>
                          <text x="70" y="50" font-family="'Segoe UI','SF Pro Display',-apple-system,sans-serif" font-size="46" font-weight="800" letter-spacing="-1.8" fill="url(#flg)">FortifyLearn</text>
                        </svg>
                        <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:12px;color:rgba(255,255,255,0.5);margin:0 0 14px;line-height:1.55;">CompTIA PBQ labs — Network+, Security+ &amp; CySA+. Free tasters available now.</p>
                        <a href="https://fortifylearn.co.uk" style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:12px;font-weight:600;color:#0891B2;text-decoration:none;">Try free labs &rarr;</a>
                      </td>
                    </tr></table>
                  </td>
                  <td width="4%" style="min-width:10px;">&nbsp;</td>
                  <td width="48%" style="vertical-align:top;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
                      <td style="background:#0A1E3F;border-radius:10px;padding:20px;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 80" width="148" height="25" style="display:block;margin-bottom:12px;">
                          <defs><linearGradient id="fog" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="430" y2="0"><stop offset="0%" stop-color="white"/><stop offset="55%" stop-color="#7DD3E8"/><stop offset="100%" stop-color="#0891B2"/></linearGradient></defs>
                          <g transform="translate(36,40) scale(0.62)" stroke="url(#fog)" fill="none" stroke-linecap="round"><path d="M 25 -25 A 35 35 0 1 1 -25 25" stroke-width="7"/><path d="M -25 25 A 35 35 0 0 1 25 -25" stroke-width="7" stroke-dasharray="10 6"/></g>
                          <circle cx="36" cy="40" r="7" fill="url(#fog)"/><circle cx="58" cy="18" r="5.5" fill="url(#fog)"/><circle cx="14" cy="62" r="5.5" fill="url(#fog)"/>
                          <text x="72" y="50" font-family="'Segoe UI','SF Pro Display',-apple-system,sans-serif" font-size="46" font-weight="800" letter-spacing="-1.8" fill="url(#fog)">FortifyOne</text>
                        </svg>
                        <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:12px;color:rgba(255,255,255,0.5);margin:0 0 14px;line-height:1.55;">GRC platform for SMEs. DORA, NIS2 &amp; ISO 27001 compliance from £149/month.</p>
                        <a href="https://fortifyone.co.uk" style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:12px;font-weight:600;color:#0891B2;text-decoration:none;">Learn more &rarr;</a>
                      </td>
                    </tr></table>
                  </td>
                </tr></table>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#0A1E3F;border-radius:0 0 12px 12px;padding:28px 48px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:20px;"><tr><td>
              <a href="https://cy-sec.co.uk" style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:12px;color:#475569;text-decoration:none;margin-right:16px;">Website</a>
              <a href="https://cy-sec.co.uk/store" style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:12px;color:#475569;text-decoration:none;margin-right:16px;">PBQ Store</a>
              <a href="https://cy-sec.co.uk/privacy-policy" style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:12px;color:#475569;text-decoration:none;">Privacy Policy</a>
            </td></tr></table>
            <div style="height:1px;background:rgba(255,255,255,0.07);margin-bottom:20px;"></div>
            <p style="font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:11px;color:#334155;margin:0;line-height:1.75;">
              &copy; ${year} Cy-Sec Awareness and Consultancy Ltd. Registered in England &amp; Wales.<br/>
              This email was sent because you submitted a contact form at <a href="https://cy-sec.co.uk" style="color:#334155;text-decoration:none;">cy-sec.co.uk</a>.
            </p>
          </td>
        </tr>
        <tr><td style="height:28px;"></td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ─── Email: admin notification ────────────────────────────────────────────────
function adminHtml(name: string, email: string, company: string | null, phone: string | null, interest: string | null, message: string): string {
  const FF = "font-family:'Bricolage Grotesque',system-ui,sans-serif;"
  const rows = [
    ['Name',     name],
    ['Email',    `<a href="mailto:${email}" style="color:#1A56DB;">${email}</a>`],
    company  ? ['Company',  company]  : null,
    phone    ? ['Phone',    phone]    : null,
    interest ? ['Interest', interest] : null,
  ].filter(Boolean) as [string, string][]

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
  <style>@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600&display=swap');</style>
  </head><body style="margin:0;padding:0;background:#e8edf4;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="padding:36px 16px;background:#e8edf4;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;">
        <tr><td style="height:5px;background:#1A56DB;border-radius:12px 12px 0 0;"></td></tr>
        <tr><td style="background:#0A1E3F;padding:28px 36px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 80" width="155" height="40" style="display:block;">
            <g transform="translate(6,16) scale(0.188)"><path fill="white" d="M250 138a12 12 0 0 1-24 0a94.11 94.11 0 0 0-94-94a84.09 84.09 0 0 0-84 84a74.09 74.09 0 0 0 74 74a64.07 64.07 0 0 0 64-64a54.06 54.06 0 0 0-54-54a44.05 44.05 0 0 0-44 44a34 34 0 0 0 34 34a24 24 0 0 0 24-24a14 14 0 0 0-14-14a4 4 0 0 0-2.82 1.17A12 12 0 0 1 124 148a20 20 0 0 1-20-20a28 28 0 0 1 28-28a38 38 0 0 1 38 38a48.05 48.05 0 0 1-48 48a58.07 58.07 0 0 1-58-58a68.07 68.07 0 0 1 68-68a78.09 78.09 0 0 1 78 78a88.1 88.1 0 0 1-88 88a98.11 98.11 0 0 1-98-98A108.12 108.12 0 0 1 132 20a118.13 118.13 0 0 1 118 118"/></g>
            <text x="70" y="50" font-family="'Segoe UI',sans-serif" font-size="46" font-weight="800" letter-spacing="-1.8" fill="white">Cy-Sec</text>
          </svg>
          <p style="${FF}font-size:13px;color:rgba(255,255,255,0.5);margin:8px 0 0;">New contact form submission</p>
        </td></tr>
        <tr><td style="background:#ffffff;padding:32px 36px;">
          <p style="${FF}font-size:10px;font-weight:600;color:#94a3b8;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 16px;">Submission details</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:24px;">
            ${rows.map(([label, value]) => `
            <tr>
              <td style="${FF}font-size:13px;font-weight:600;color:#64748b;padding:8px 16px 8px 0;width:90px;vertical-align:top;">${label}</td>
              <td style="${FF}font-size:14px;color:#0f172a;padding:8px 0;">${value}</td>
            </tr>`).join('')}
          </table>
          <p style="${FF}font-size:10px;font-weight:600;color:#94a3b8;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 12px;">Message</p>
          <div style="background:#f8fafc;border-left:4px solid #1A56DB;padding:16px 20px;border-radius:0 8px 8px 0;">
            <p style="${FF}font-size:14px;color:#334155;margin:0;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <div style="margin-top:24px;">
            <a href="mailto:${email}" style="${FF}display:inline-block;padding:12px 24px;background:#1A56DB;color:#fff;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">Reply to ${name} &rarr;</a>
          </div>
        </td></tr>
        <tr><td style="background:#0A1E3F;border-radius:0 0 12px 12px;padding:20px 36px;">
          <p style="${FF}font-size:11px;color:#334155;margin:0;">Submitted via cy-sec.co.uk/contact &mdash; view in <a href="https://cy-sec.co.uk/admin" style="color:#475569;">admin panel</a></p>
        </td></tr>
        <tr><td style="height:24px;"></td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

// ─── Handler ──────────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    const { name, email, company, phone, interest, message } = await req.json()

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400, headers: { ...cors, 'Content-Type': 'application/json' },
      })
    }

    const firstName      = name.trim().split(' ')[0]
    const messagePreview = message.length > 200 ? message.substring(0, 197) + '...' : message

    const sendEmail = (to: string, subject: string, html: string) =>
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: FROM, to: [to], subject, html }),
      })

    // Fire both emails concurrently
    const [confirmRes, adminRes] = await Promise.all([
      sendEmail(
        email,
        `We've received your message, ${firstName}`,
        confirmationHtml(firstName, messagePreview)
      ),
      sendEmail(
        ADMIN_TO,
        `New contact form submission — ${name}`,
        adminHtml(name, email, company || null, phone || null, interest || null, message)
      ),
    ])

    if (!confirmRes.ok) {
      const err = await confirmRes.text()
      throw new Error(`Resend (confirm): ${err}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('send-contact-confirmation error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }
})

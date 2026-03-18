// ── send-welcome-email Edge Function ──────────────────────────────────────────
// Deploy: supabase functions deploy send-welcome-email
// Secret:  supabase secrets set RESEND_API_KEY=<your-key>

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { email, name } = await req.json();
  if (!email) return new Response('Missing email', { status: 400 });

  const displayName = name || 'there';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Kokoon <onboarding@resend.dev>',
      to: [email],
      subject: 'welcome to kokoon',
      html: welcomeHtml(displayName),
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.ok ? 200 : 400,
    headers: { 'Content-Type': 'application/json' },
  });
});

function welcomeHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f7f2e8;font-family:Georgia,'Times New Roman',serif;color:#080810;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f2e8;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">
          <tr>
            <td style="padding-bottom:40px;">
              <p style="margin:0;font-size:10px;letter-spacing:.38em;text-transform:uppercase;opacity:.32;">Kokoon</p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:16px;">
              <h1 style="margin:0;font-size:26px;font-weight:normal;letter-spacing:.05em;line-height:1.3;">welcome, ${name}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:15px;line-height:1.75;opacity:.6;">
                Every focus session you complete hatches a creature — common, rare, or legendary — drawn from Japan, the Americas, Europe, Africa, and beyond.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:36px;">
              <table cellpadding="0" cellspacing="0" style="width:100%;">
                <tr><td style="padding:14px 0;border-top:1px solid rgba(8,8,16,.08);">
                  <p style="margin:0;font-size:10px;letter-spacing:.22em;text-transform:uppercase;opacity:.45;">01 · start a focus session</p>
                </td></tr>
                <tr><td style="padding:14px 0;border-top:1px solid rgba(8,8,16,.08);">
                  <p style="margin:0;font-size:10px;letter-spacing:.22em;text-transform:uppercase;opacity:.45;">02 · finish to hatch a creature</p>
                </td></tr>
                <tr><td style="padding:14px 0;border-top:1px solid rgba(8,8,16,.08);border-bottom:1px solid rgba(8,8,16,.08);">
                  <p style="margin:0;font-size:10px;letter-spacing:.22em;text-transform:uppercase;opacity:.45;">03 · build your collection</p>
                </td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:48px;">
              <a href="https://kokoon.app/app"
                 style="display:inline-block;background:#080810;color:#f7f2e8;text-decoration:none;font-size:10px;letter-spacing:.28em;text-transform:uppercase;padding:14px 36px;">
                open kokoon
              </a>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid rgba(8,8,16,.1);padding-top:28px;">
              <p style="margin:0;font-size:10px;letter-spacing:.15em;text-transform:uppercase;opacity:.28;line-height:1.8;">
                Kokoon — focus your time, hatch creatures
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

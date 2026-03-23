// ── send-contact-email Edge Function ──────────────────────────────────────────
// Deploy: supabase functions deploy send-contact-email

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: corsHeaders });

  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return new Response('Missing fields', { status: 400, headers: corsHeaders });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Kokoon Contact <hello@kokoon.app>',
      to: ['hello@kokoon.app'],
      reply_to: email,
      subject: `message from ${name}`,
      html: `<div style="font-family:Georgia,serif;font-size:14px;color:#080810;line-height:1.8;">
        <p style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;opacity:.4;">Kokoon · Contact Form</p>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;">${message}</p>
      </div>`,
    }),
  });

  return new Response(JSON.stringify({ ok: res.ok }), {
    status: res.ok ? 200 : 400,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});

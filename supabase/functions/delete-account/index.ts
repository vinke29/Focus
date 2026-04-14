// ── delete-account Edge Function ──────────────────────────────────────────────
// Deploy: supabase functions deploy delete-account
// Deletes the authenticated user's account and all their data.
// All table rows cascade-delete via FK → auth.users on delete cascade.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: corsHeaders });

  // Verify the caller is authenticated
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });

  const supabaseUrl    = Deno.env.get('SUPABASE_URL')!;
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const anonKey        = Deno.env.get('SUPABASE_ANON_KEY')!;

  // Extract and validate the caller's JWT
  const token = authHeader.replace(/^Bearer\s+/i, '');
  // Use admin client to verify the token — more reliable than anon client server-side
  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: { user }, error: userError } = await adminClient.auth.getUser(token);
  if (userError || !user) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized', detail: userError?.message, tokenPrefix: token.slice(0, 20) }),
      { status: 401, headers: corsHeaders }
    );
  }

  const { error } = await adminClient.auth.admin.deleteUser(user.id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });

  return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});

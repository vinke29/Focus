// ── SUPABASE CONFIG ────────────────────────────────────────────────────────────
// Fill these in from Supabase Dashboard → Settings → API
const SUPABASE_URL      = 'https://bvfxxedhvdknwvvkyuph.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_XyzHbIwzLhRbGbqOfIY8UA_K8Gfw78R';

// ── CLIENT ────────────────────────────────────────────────────────────────────
let _sb = null;
try {
  if (window.supabase && SUPABASE_URL.includes('supabase.co')) {
    _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        flowType: 'implicit',   // PKCE loses sessionStorage on iOS Safari redirect
      }
    });
  }
} catch(e) {
  // Supabase init failed — app falls back to localStorage
}

// ── DB FACADE ─────────────────────────────────────────────────────────────────
// All methods are safe to call even when offline / CDN failed — they
// resolve with null/[] so the app falls back to localStorage seamlessly.

const DB = {

  get available() { return !!_sb; },

  // ── AUTH ──────────────────────────────────────────────────────────────────

  async getSession() {
    if (!_sb) return { data: { session: null } };
    return _sb.auth.getSession();
  },

  async signIn(email, password) {
    if (!_sb) throw new Error('offline');
    const { data, error } = await _sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async updatePassword(newPassword) {
    if (!_sb) throw new Error('offline');
    const { error } = await _sb.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },

  async resetPassword(email) {
    if (!_sb) throw new Error('offline');
    const { error } = await _sb.auth.resetPasswordForEmail(email, {
      redirectTo: 'app.kokoon.focus://reset-password'
    });
    if (error) throw error;
  },

  async signUp(name, email, password) {
    if (!_sb) throw new Error('offline');
    // Pass name as metadata — a DB trigger picks it up and writes profiles
    const { data, error } = await _sb.auth.signUp({
      email, password,
      options: { data: { name }, emailRedirectTo: 'app.kokoon.focus://confirm' }
    });
    if (error) throw error;
    return data; // data.session is null when email confirmation is required
  },

  async setSession(accessToken, refreshToken) {
    if (!_sb) return { data: null, error: 'offline' };
    return _sb.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  },

  async exchangeCode(url) {
    if (!_sb) return { data: null, error: 'offline' };
    return _sb.auth.exchangeCodeForSession(url);
  },

  async signOut() {
    if (!_sb) return;
    const { error } = await _sb.auth.signOut();
    if (error) throw error;
  },

  async signInWithApple() {
    if (!_sb) throw new Error('offline');
    const SignInWithApple = window.Capacitor?.Plugins?.SignInWithApple;
    if (!SignInWithApple) throw new Error('Apple sign-in not available on this platform');

    const result = await SignInWithApple.authorize({
      clientId: 'app.kokoon.focus',
      redirectURI: 'app.kokoon.focus://callback',
      scopes: 'name email',
    });

    const { identityToken, givenName, familyName } = result.response;
    if (!identityToken) throw new Error('No identity token returned from Apple');

    const { data, error } = await _sb.auth.signInWithIdToken({
      provider: 'apple',
      token: identityToken,
    });
    if (error) throw error;

    // Apple only provides name on the very first sign-in — capture it while we have it
    const appleName = [givenName, familyName].filter(Boolean).join(' ') || null;
    return { ...data, appleName };
  },

  async signInWithGoogle() {
    if (!_sb) throw new Error('offline');
    const isNative = typeof window.Capacitor !== 'undefined' && window.Capacitor.isNativePlatform();
    if (isNative) {
      // In native app, open OAuth in system browser, redirect back via URL scheme
      const { data, error } = await _sb.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'app.kokoon.focus://callback',
          skipBrowserRedirect: true,
          queryParams: { prompt: 'select_account' },
        }
      });
      if (error) throw error;
      if (!data?.url) throw new Error('no OAuth URL returned from Supabase');
      await window.Capacitor.Plugins.Browser.open({ url: data.url });
    } else {
      const { error } = await _sb.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/app', queryParams: { prompt: 'select_account' } }
      });
      if (error) throw error;
    }
  },

  // ── PROFILE ───────────────────────────────────────────────────────────────

  async loadProfile() {
    if (!_sb) return null;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return null;
    const { data } = await _sb.from('profiles').select('name').eq('id', user.id).maybeSingle();
    return data; // { name } or null
  },

  async saveProfile(name) {
    if (!_sb) return;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;
    const row = { id: user.id, name };
    if (user.email) row.email = user.email;
    await _sb.from('profiles').upsert(row);
  },

  // ── COLLECTION ────────────────────────────────────────────────────────────

  async loadCollection() {
    if (!_sb) return null;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return null;
    const { data, error } = await _sb
      .from('collection')
      .select('char_id, variant, hatched_at')
      .eq('user_id', user.id)
      .order('hatched_at', { ascending: true });
    if (error) throw error;
    return (data || []).map(r => ({
      id:        r.char_id,
      variant:   r.variant,
      timestamp: new Date(r.hatched_at).getTime(),
    }));
  },

  async addCollectionEntry(charId, variantId) {
    if (!_sb) return;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;
    await _sb.from('collection').insert({
      user_id:   user.id,
      char_id:   charId,
      variant:   variantId,
    });
  },

  // Full replace — used after fusion to keep server in sync
  async saveCollection(entries) {
    if (!_sb) return;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;
    await _sb.from('collection').delete().eq('user_id', user.id);
    if (!entries.length) return;
    const rows = entries.map(e => ({
      user_id:   user.id,
      char_id:   e.id,
      variant:   e.variant || 'standard',
      hatched_at: new Date(e.timestamp || Date.now()).toISOString(),
    }));
    await _sb.from('collection').insert(rows);
  },

  // ── SESSIONS ──────────────────────────────────────────────────────────────

  async loadSessions() {
    if (!_sb) return null;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return null;
    const { data, error } = await _sb
      .from('sessions')
      .select('duration, completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: true });
    if (error) throw error;
    return (data || []).map(r => ({
      duration:  r.duration,
      timestamp: new Date(r.completed_at).getTime(),
    }));
  },

  async addSession(duration) {
    if (!_sb) return;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;
    await _sb.from('sessions').insert({ user_id: user.id, duration });
  },

  async invokeFunction(name, body) {
    if (!_sb) return null;
    return _sb.functions.invoke(name, { body });
  },

  async deleteAccount() {
    if (!_sb) throw new Error('offline');
    const { error } = await _sb.functions.invoke('delete-account', { body: {} });
    if (error) throw error;
  },

  // ── PUBLIC PROFILES ───────────────────────────────────────────────────────

  async getOrCreateSlug(name) {
    if (!_sb) return null;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return null;
    const { data: profile } = await _sb.from('profiles').select('slug').eq('id', user.id).maybeSingle();
    if (profile?.slug) return profile.slug;
    // Generate slug: name + 6 random alphanumeric chars
    const base   = (name || 'focus').toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '').slice(0, 12) || 'focus';
    const suffix = Math.random().toString(36).slice(2, 8);
    const slug   = `${base}-${suffix}`;
    await _sb.from('profiles').update({ slug }).eq('id', user.id);
    return slug;
  },

  async loadPublicProfile(slug) {
    if (!_sb) return null;
    const { data, error } = await _sb
      .from('profiles')
      .select('id, name, session_count, total_minutes, badges, max_streak')
      .eq('slug', slug)
      .maybeSingle();
    if (error || !data) return null;
    return data;
  },

  async loadPublicCollection(userId) {
    if (!_sb) return null;
    const { data, error } = await _sb
      .from('collection')
      .select('char_id, variant, hatched_at')
      .eq('user_id', userId)
      .order('hatched_at', { ascending: true });
    if (error) return null;
    return (data || []).map(r => ({
      id:        r.char_id,
      variant:   r.variant,
      timestamp: new Date(r.hatched_at).getTime(),
    }));
  },

  // ── BADGES ───────────────────────────────────────────────────────────────

  async loadBadges() {
    if (!_sb) return null;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return null;
    const { data } = await _sb.from('profiles').select('badges, max_streak').eq('id', user.id).maybeSingle();
    return data; // { badges: [...], max_streak: N }
  },

  async saveBadges(badges) {
    if (!_sb) return;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;
    await _sb.from('profiles').update({ badges }).eq('id', user.id);
  },

  async updateMaxStreak(streak) {
    if (!_sb) return;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;
    await _sb.from('profiles').update({ max_streak: streak }).eq('id', user.id);
  },

  async updateNurtureProgress(nurtureSessionsTotal, evolvedCount, evolutionSessionsJson, evolvedCreatures) {
    if (!_sb) return;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;
    await _sb.from('profiles').update({
      nurture_sessions:        nurtureSessionsTotal,
      evolved_count:           evolvedCount,
      evolution_sessions_json: evolutionSessionsJson || {},
      evolved_creatures:       evolvedCreatures || [],
    }).eq('id', user.id);
  },

  async recordEvolution(charId) {
    if (!_sb) return;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;
    await _sb.from('evolutions').insert({ user_id: user.id, char_id: charId });
  },

  async setEvoHintSeen() {
    if (!_sb) return;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;
    await _sb.from('profiles').update({ evo_hint_seen: true }).eq('id', user.id);
  },

  async loadBadgeStats() {
    if (!_sb) return null;
    const { data, error } = await _sb.from('badge_stats').select('badge_id, earned_count');
    if (error) return null;
    const map = {};
    (data || []).forEach(r => { map[r.badge_id] = r.earned_count; });
    return map;
  },

  async incrementBadgeStat(badgeId) {
    if (!_sb) return;
    await _sb.rpc('increment_badge_stat', { p_badge_id: badgeId });
  },

  async getPlayerCount() {
    if (!_sb) return null;
    const { data, error } = await _sb.rpc('get_player_count');
    if (error) return null;
    return data;
  },

  onAuthStateChange(callback) {
    if (!_sb) return { data: { subscription: { unsubscribe: () => {} } } };
    return _sb.auth.onAuthStateChange(callback);
  },

  async rpc(name, params) {
    if (!_sb) return { data: null, error: 'offline' };
    return _sb.rpc(name, params);
  },
};

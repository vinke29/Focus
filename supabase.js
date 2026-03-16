// ── SUPABASE CONFIG ────────────────────────────────────────────────────────────
// Fill these in from Supabase Dashboard → Settings → API
const SUPABASE_URL      = 'https://bvfxxedhvdknwvvkyuph.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_XyzHbIwzLhRbGbqOfIY8UA_K8Gfw78R';

// ── CLIENT ────────────────────────────────────────────────────────────────────
let _sb = null;
try {
  if (window.supabase && SUPABASE_URL.includes('supabase.co')) {
    _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
  }
} catch(e) {
  console.warn('Supabase init failed:', e);
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

  async signUp(name, email, password) {
    if (!_sb) throw new Error('offline');
    // Pass name as metadata — a DB trigger picks it up and writes profiles
    const { data, error } = await _sb.auth.signUp({
      email, password,
      options: { data: { name } }
    });
    if (error) throw error;
    return data; // data.session is null when email confirmation is required
  },

  async signOut() {
    if (!_sb) return;
    const { error } = await _sb.auth.signOut();
    if (error) throw error;
  },

  // ── PROFILE ───────────────────────────────────────────────────────────────

  async loadProfile() {
    if (!_sb) return null;
    const { data } = await _sb.from('profiles').select('name').maybeSingle();
    return data; // { name } or null
  },

  async saveProfile(name) {
    if (!_sb) return;
    const { data: { user } } = await _sb.auth.getUser();
    if (!user) return;
    await _sb.from('profiles').upsert({ id: user.id, name });
  },

  // ── COLLECTION ────────────────────────────────────────────────────────────

  async loadCollection() {
    if (!_sb) return null;
    const { data, error } = await _sb
      .from('collection')
      .select('char_id, variant, hatched_at')
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
    const { data, error } = await _sb
      .from('sessions')
      .select('duration, completed_at')
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
};

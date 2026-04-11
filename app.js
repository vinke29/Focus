// Suppress unhandled promise rejections (offline DB writes, plugin calls, etc.)
window.addEventListener('unhandledrejection', e => e.preventDefault());

// ── NATIVE (CAPACITOR) ───────────────────────────────────────────────────────
const IS_NATIVE = typeof window.Capacitor !== 'undefined' && window.Capacitor.isNativePlatform();

// Haptics — uses Capacitor on native, falls back to navigator.vibrate on web
const Haptic = {
  _cap: IS_NATIVE && window.Capacitor.Plugins.Haptics,
  light()  { this._cap ? this._cap.impact({ style: 'LIGHT' })  : navigator.vibrate?.([18]); },
  medium() { this._cap ? this._cap.impact({ style: 'MEDIUM' }) : navigator.vibrate?.([30, 80, 60]); },
  heavy()  { this._cap ? this._cap.impact({ style: 'HEAVY' })  : navigator.vibrate?.([180]); },
  tap()    { this._cap ? this._cap.impact({ style: 'LIGHT' })  : navigator.vibrate?.([10]); },
  rumble() { this._cap ? this._cap.notification({ type: 'WARNING' }) : navigator.vibrate?.([8, 60, 8, 60, 8]); },
  burst()  { this._cap ? this._cap.impact({ style: 'HEAVY' })  : navigator.vibrate?.([220]); },
};

// Live Activity bridge (iOS 16.1+ Lock Screen / Dynamic Island timer)
const LiveActivity = IS_NATIVE && (window.Capacitor.Plugins?.LiveActivity || null);

// App Blocking bridge (iOS Screen Time / Family Controls)
const AppBlocking = IS_NATIVE && (window.Capacitor.Plugins?.AppBlocking || null);

// LocalNotifications — needed for reliable ring/vibrate when the app is backgrounded.
// The Live Activity AlertConfiguration only fires while the app is running in foreground;
// when iOS suspends the WKWebView the JS timer stops and stopActivity is never called.
const LocalNotif = IS_NATIVE && (window.Capacitor.Plugins?.LocalNotifications || null);
const TIMER_NOTIF_ID = 77;

// Mark body so CSS can show native-only UI
if (IS_NATIVE) document.body.classList.add('is-native');

// Dismiss keyboard on tap outside inputs (native iOS)
if (IS_NATIVE) {
  document.addEventListener('click', e => {
    if (!e.target.closest('input, textarea, select')) {
      document.activeElement?.blur();
    }
  });

  // Scroll focused input into view when keyboard appears
  const { Keyboard } = window.Capacitor.Plugins;
  if (Keyboard) {
    Keyboard.addListener('keyboardWillShow', ({ keyboardHeight }) => {
      const el = document.activeElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
      }
      // Push auth view up so form stays visible
      const authView = document.getElementById('view-auth');
      if (authView) authView.style.paddingBottom = keyboardHeight + 'px';
    });
    Keyboard.addListener('keyboardWillHide', () => {
      const authView = document.getElementById('view-auth');
      if (authView) authView.style.paddingBottom = '';
    });
  }
}

// Wake lock — keep screen on during timer sessions
let _wakeLock = null;
async function requestWakeLock() {
  if (_wakeLock) return;
  try { _wakeLock = await navigator.wakeLock.request('screen'); }
  catch(e) { /* not supported or denied */ }
}
function releaseWakeLock() {
  if (_wakeLock) { _wakeLock.release().catch(() => {}); _wakeLock = null; }
}

// ── FUSION ────────────────────────────────────────────────────────────────────
const VARIANT_NEXT = { standard: 'gold', gold: 'crimson', crimson: 'void' };

// Drop hint: dynamically calculated per-character odds based on unlocked regions
function calcDropOdds(rarity, variantId) {
  const unlocked = getUnlockedRegions();
  const tier = RARITY_WEIGHTS.find(t => t.rarity === rarity);
  if (!tier) return '';
  const poolSize = tier.pool.filter(id => unlocked.has(CHARACTERS[id]?.region)).length;
  if (!poolSize) return '';
  const variantObj = VARIANTS.find(v => v.id === variantId);
  if (!variantObj) return '';
  const variantTotal = VARIANTS.reduce((s, v) => s + v.weight, 0);
  const odds = 1 / ((tier.weight / 100) * (1 / poolSize) * (variantObj.weight / variantTotal));
  const rounded = odds < 100 ? Math.round(odds) : Math.round(odds / 10) * 10;
  return `~1 in ${rounded.toLocaleString()} sessions`;
}

// ── MILESTONES ────────────────────────────────────────────────────────────────
const MILESTONES = {
  10:  { label: '10 sessions',   msg: "you're building a habit" },
  25:  { label: '25 sessions',   msg: 'focus is becoming part of you' },
  50:  { label: '50 sessions',   msg: 'halfway to a hundred' },
  100: { label: '100 sessions',  msg: 'one hundred. legendary.' },
  200: { label: '200 sessions',  msg: 'two hundred sessions deep' },
  365: { label: '365 sessions',  msg: 'a full year of focus' },
};

function seenMilestones() {
  try { return new Set(JSON.parse(localStorage.getItem('focus-milestones') || '[]')); }
  catch(e) { return new Set(); }
}

function markMilestoneSeen(n) {
  const seen = seenMilestones();
  seen.add(n);
  localStorage.setItem('focus-milestones', JSON.stringify([...seen]));
}

// ── BADGES ───────────────────────────────────────────────────────────────────
const BADGES = [
  // Sessions
  { id: 'first_session', name: 'First Session',      desc: 'Complete your first focus session',  category: 'sessions', icon: '🎯', check: ctx => ctx.sessions >= 1,   progress: ctx => ({ cur: ctx.sessions, max: 1 }) },
  { id: 'sessions_10',   name: 'Kindling',          desc: 'Complete 10 sessions',              category: 'sessions', icon: '🔥', check: ctx => ctx.sessions >= 10,  progress: ctx => ({ cur: ctx.sessions, max: 10 }) },
  { id: 'sessions_25',   name: 'Steady Flame',      desc: 'Complete 25 sessions',              category: 'sessions', icon: '🔥', check: ctx => ctx.sessions >= 25,  progress: ctx => ({ cur: ctx.sessions, max: 25 }) },
  { id: 'sessions_50',   name: 'Burning Bright',    desc: 'Complete 50 sessions',              category: 'sessions', icon: '🔥', check: ctx => ctx.sessions >= 50,  progress: ctx => ({ cur: ctx.sessions, max: 50 }) },
  { id: 'sessions_100',  name: 'Centennial',        desc: 'Complete 100 sessions',             category: 'sessions', icon: '💯', check: ctx => ctx.sessions >= 100, progress: ctx => ({ cur: ctx.sessions, max: 100 }) },
  { id: 'sessions_200',  name: 'Eternal Focus',     desc: 'Complete 200 sessions',             category: 'sessions', icon: '✦',  check: ctx => ctx.sessions >= 200, progress: ctx => ({ cur: ctx.sessions, max: 200 }) },
  { id: 'sessions_365',  name: 'Year of Focus',     desc: 'Complete 365 sessions',             category: 'sessions', icon: '🗓️', check: ctx => ctx.sessions >= 365, progress: ctx => ({ cur: ctx.sessions, max: 365 }) },
  // Streaks
  { id: 'streak_3',      name: 'Three Days',        desc: 'Reach a 3-day streak',              category: 'streaks',  icon: '⚡', check: ctx => ctx.maxStreak >= 3,  progress: ctx => ({ cur: ctx.maxStreak, max: 3 }) },
  { id: 'streak_7',      name: 'Full Week',         desc: 'Reach a 7-day streak',              category: 'streaks',  icon: '⚡', check: ctx => ctx.maxStreak >= 7,  progress: ctx => ({ cur: ctx.maxStreak, max: 7 }) },
  { id: 'streak_14',     name: 'Fortnight',         desc: 'Reach a 14-day streak',             category: 'streaks',  icon: '⚡', check: ctx => ctx.maxStreak >= 14, progress: ctx => ({ cur: ctx.maxStreak, max: 14 }) },
  { id: 'streak_30',     name: 'Iron Will',         desc: 'Reach a 30-day streak',             category: 'streaks',  icon: '🛡️', check: ctx => ctx.maxStreak >= 30, progress: ctx => ({ cur: ctx.maxStreak, max: 30 }) },
  // Collection
  { id: 'collect_5',     name: 'Budding Collector',  desc: 'Own 5 unique characters',           category: 'collection', icon: '🌱', check: ctx => ctx.ownedIds.size >= 5,  progress: ctx => ({ cur: ctx.ownedIds.size, max: 5 }) },
  { id: 'collect_15',    name: 'Seasoned Collector', desc: 'Own 15 unique characters',          category: 'collection', icon: '🌿', check: ctx => ctx.ownedIds.size >= 15, progress: ctx => ({ cur: ctx.ownedIds.size, max: 15 }) },
  { id: 'collect_all',   name: 'Master Collector',   desc: 'Own every character',               category: 'collection', icon: '👑', check: ctx => ctx.ownedIds.size >= Object.keys(CHARACTERS).length, progress: ctx => ({ cur: ctx.ownedIds.size, max: Object.keys(CHARACTERS).length }) },
  // Regions
  { id: 'region_japan',    name: 'Spirit of Japan',       desc: 'Complete the Japan region',     category: 'regions', icon: '⛩️', check: ctx => ctx.completedRegions.has('japanese') },
  { id: 'region_americas', name: 'Heart of the Americas', desc: 'Complete the Americas region',  category: 'regions', icon: '🌎', check: ctx => ctx.completedRegions.has('americas') },
  { id: 'region_europe',   name: 'Lore of Europe',        desc: 'Complete the Europe region',    category: 'regions', icon: '🏰', check: ctx => ctx.completedRegions.has('european') },
  { id: 'region_africa',   name: 'Soul of Africa',        desc: 'Complete the Africa region',    category: 'regions', icon: '🌍', check: ctx => ctx.completedRegions.has('african') },
  { id: 'region_fantasy',  name: 'Beyond the Maps',       desc: 'Complete the Fantasy region',   category: 'regions', icon: '✨', check: ctx => ctx.completedRegions.has('fantasy') },
  // Variants
  { id: 'first_gold',    name: 'Golden Touch',   desc: 'Obtain a gold variant',     category: 'variants', icon: '🥇', check: ctx => ctx.variantSet.has('gold') },
  { id: 'first_crimson', name: 'Crimson Flame',   desc: 'Obtain a crimson variant',  category: 'variants', icon: '🔴', check: ctx => ctx.variantSet.has('crimson') },
  { id: 'first_void',    name: 'Into the Void',   desc: 'Obtain a void variant',     category: 'variants', icon: '🟣', check: ctx => ctx.variantSet.has('void') },
  // Time
  { id: 'hours_10',  name: 'Focused Mind',   desc: 'Accumulate 10 hours of focus',   category: 'time', icon: '⏳', check: ctx => ctx.totalMinutes >= 600,  progress: ctx => ({ cur: Math.floor(ctx.totalMinutes / 60), max: 10, unit: 'h' }) },
  { id: 'hours_50',  name: 'Deep Focus',     desc: 'Accumulate 50 hours of focus',   category: 'time', icon: '⏳', check: ctx => ctx.totalMinutes >= 3000, progress: ctx => ({ cur: Math.floor(ctx.totalMinutes / 60), max: 50, unit: 'h' }) },
  { id: 'hours_100', name: 'Master of Time', desc: 'Accumulate 100 hours of focus',  category: 'time', icon: '⌛', check: ctx => ctx.totalMinutes >= 6000, progress: ctx => ({ cur: Math.floor(ctx.totalMinutes / 60), max: 100, unit: 'h' }) },
  // Rarity
  { id: 'first_rare',      name: 'Something Special',  desc: 'Hatch a rare creature',      category: 'rarity', icon: '◆', check: ctx => [...ctx.ownedIds].some(id => CHARACTERS[id]?.rarity === 'rare') },
  { id: 'first_legendary', name: 'Mythical Discovery', desc: 'Hatch a legendary creature',  category: 'rarity', icon: '★', check: ctx => [...ctx.ownedIds].some(id => CHARACTERS[id]?.rarity === 'legendary') },
];

const REGION_LABELS = {
  japanese: 'japan', americas: 'americas', european: 'europe',
  african: 'africa', fantasy: 'fantasy'
};

// Session thresholds at which each region becomes discoverable
const REGION_UNLOCKS = {
  japanese: 0,
  americas: 10,
  european: 25,
  african:  50,
  fantasy:  100,
};
const REGION_UNLOCK_ORDER = ['japanese', 'americas', 'european', 'african', 'fantasy'];
const REGION_UNLOCK_MSGS  = {
  americas: 'a new world awaits',
  european: 'the old world opens',
  african:  'ancient lands revealed',
  fantasy:  'beyond the edge of maps',
};

function getUnlockedRegions() {
  const n = sessions.length;
  // A region is also unlocked if the user already owns a character from it —
  // you can't un-discover something you've already collected.
  const ownedRegions = new Set(state.collection.map(e => CHARACTERS[e.id]?.region).filter(Boolean));
  return new Set(REGION_UNLOCK_ORDER.filter(r => n >= REGION_UNLOCKS[r] || ownedRegions.has(r)));
}

function getNextUnlock() {
  const n = sessions.length;
  for (const region of REGION_UNLOCK_ORDER) {
    if (REGION_UNLOCKS[region] > n) {
      return { region, sessionsAway: REGION_UNLOCKS[region] - n };
    }
  }
  return null; // all regions unlocked
}

function getCompletedRegions(ownedIds) {
  const regionTotal = {}, regionOwned = {};
  Object.values(CHARACTERS).forEach(c => {
    regionTotal[c.region] = (regionTotal[c.region] || 0) + 1;
  });
  ownedIds.forEach(id => {
    const r = CHARACTERS[id]?.region;
    if (r) regionOwned[r] = (regionOwned[r] || 0) + 1;
  });
  return new Set(Object.keys(regionTotal).filter(r => regionOwned[r] === regionTotal[r]));
}

function checkFusion(charId, variantId) {
  if (!VARIANT_NEXT[variantId]) return false; // Void can't fuse further
  const count = state.collection.filter(
    e => e.id === charId && (e.variant || 'standard') === variantId
  ).length;
  return count >= 3;
}

function applyFusion(charId, fromVariantId) {
  const toVariantId = VARIANT_NEXT[fromVariantId];
  if (!toVariantId) return null;
  let removed = 0;
  state.collection = state.collection.filter(e => {
    if (removed < 3 && e.id === charId && (e.variant || 'standard') === fromVariantId) {
      removed++;
      return false;
    }
    return true;
  });
  state.collection.push({ id: charId, variant: toVariantId, timestamp: Date.now() });
  saveCollection();
  return VARIANTS.find(v => v.id === toVariantId);
}

let pendingFusion = null;

function showFusionScreen(char, fromVariant, toVariant) {
  const overlay = document.getElementById('fusion-overlay');
  const title   = document.getElementById('fusion-title');
  const orbs    = [document.getElementById('fo0'), document.getElementById('fo1'), document.getElementById('fo2')];
  const core    = document.getElementById('fusion-core');
  const result  = document.getElementById('fusion-result');
  const btn     = document.getElementById('btn-fusion-ok');

  // Reset state
  title.classList.remove('show');
  orbs.forEach(o => {
    o.classList.remove('pop');
    o.style.cssText = '';
    o.style.color      = fromVariant.color;
    o.style.background = fromVariant.color + '1a';
    o.style.boxShadow  = `0 0 18px ${fromVariant.color}44`;
  });
  core.classList.remove('burst');
  core.style.background = toVariant.color;
  core.style.boxShadow  = `0 0 50px 24px ${toVariant.color}66`;
  result.classList.remove('reveal');
  btn.classList.remove('show');

  // Populate result
  const resultArt = document.getElementById('fusion-result-art');
  resultArt.innerHTML = char.svg;
  applyVariantFilter(resultArt, toVariant.id);
  document.getElementById('fusion-result-name').textContent = charNameEn(char);
  const badge = document.getElementById('fusion-result-badge');
  badge.textContent    = char.rarityLabel + ' · ' + toVariant.label;
  badge.style.color    = toVariant.color;
  badge.style.borderColor = toVariant.color;

  overlay.classList.add('open');

  // Animation sequence
  setTimeout(() => title.classList.add('show'), 200);
  setTimeout(() => {
    orbs.forEach((o, i) => setTimeout(() => { o.classList.add('pop'); SFX.fusionOrbPop(); }, i * 80));
  }, 600);

  // Converge orbs toward center
  setTimeout(() => {
    SFX.fusionConverge();
    const rowEl = document.getElementById('fusion-orbs-row');
    const rowCx = rowEl.getBoundingClientRect().left + rowEl.getBoundingClientRect().width / 2;
    orbs.forEach((o, i) => {
      const oCx = o.getBoundingClientRect().left + o.getBoundingClientRect().width / 2;
      const dx  = rowCx - oCx;
      o.style.transition = 'all .42s ease-in';
      o.style.transform  = `translateX(${dx}px) scale(0.25)`;
      o.style.opacity    = '0';
    });
  }, 1500);

  setTimeout(() => { core.classList.add('burst'); SFX.fusionBurst(); Haptic.burst(); }, 1960);
  setTimeout(() => { result.classList.add('reveal'); SFX.fusionReveal(toVariant.id); Haptic.medium(); }, 2200);
  setTimeout(() => btn.classList.add('show'), 2950);
}

function closeFusionScreen() {
  document.getElementById('fusion-overlay').classList.remove('open');
}

// ── EVOLUTION SCREEN ─────────────────────────────────────────────────────────

function showEvolutionScreen(baseChar, evolvedChar) {
  const overlay = document.getElementById('evolution-overlay');
  const baseArt = document.getElementById('evo-base-art');
  const evolvedArt = document.getElementById('evo-evolved-art');
  const title = document.getElementById('evo-title');
  const subtitle = document.getElementById('evo-subtitle');
  const btn = document.getElementById('btn-evo-ok');
  const flash = document.getElementById('evo-flash');

  // Reset
  title.classList.remove('show');
  subtitle.classList.remove('show');
  btn.classList.remove('show');
  baseArt.classList.remove('morph-out');
  evolvedArt.classList.remove('reveal');
  flash.style.opacity = '0';

  // Populate
  baseArt.innerHTML = baseChar.svg;
  evolvedArt.innerHTML = evolvedChar.svg;

  // Apply rarest variant filter
  const rarestVariant = getRarestOwnedVariant(baseChar.id);
  applyVariantFilter(baseArt, rarestVariant);
  applyVariantFilter(evolvedArt, rarestVariant);

  document.getElementById('evo-name').textContent = charNameEn(evolvedChar);
  document.getElementById('evo-form').textContent = evolvedChar.subtitle;

  overlay.classList.add('open');

  // Animation sequence
  setTimeout(() => { title.classList.add('show'); }, 300);

  // Base art glows and pulses
  setTimeout(() => {
    baseArt.classList.add('morph-out');
    SFX.burst('rare');
    Haptic.heavy();
  }, 1800);

  // Flash
  setTimeout(() => {
    flash.style.transition = 'opacity .12s ease';
    flash.style.opacity = '1';
    setTimeout(() => {
      flash.style.transition = 'opacity .5s ease';
      flash.style.opacity = '0';
    }, 120);
  }, 2200);

  // Reveal evolved
  setTimeout(() => {
    evolvedArt.classList.add('reveal');
    SFX.burst('legendary');
    Haptic.burst();
  }, 2400);

  // Show subtitle + button
  setTimeout(() => { subtitle.classList.add('show'); }, 3000);
  setTimeout(() => { btn.classList.add('show'); }, 3600);
}

function closeEvolutionScreen() {
  document.getElementById('evolution-overlay').classList.remove('open');
  document.getElementById('hatch-stage').style.opacity = '';
  state.pendingEvolution = null;
  _hatchInProgress = false;
  // Auto-unpin after evolution — creature is maxed out
  unpinCreature();
  resetTimerState();
  navigateTo('timer');
}

// Apply colour-filter class matching a variant to any art container element
function applyVariantFilter(el, variantId) {
  el.classList.remove('vf-gold', 'vf-crimson', 'vf-void');
  if (variantId !== 'standard') el.classList.add(`vf-${variantId}`);
}

// ── SESSION LOG ───────────────────────────────────────────────────────────────
let sessions = [];

function loadSessions() {
  try {
    const saved = localStorage.getItem('focus-sessions');
    if (saved) sessions = JSON.parse(saved);
  } catch(e) { sessions = []; }
}

function addSession(durationMinutes) {
  sessions.push({ timestamp: Date.now(), duration: durationMinutes });
  localStorage.setItem('focus-sessions', JSON.stringify(sessions));
  DB.addSession(durationMinutes).catch(() => {});
}

function calcStreak() {
  if (!sessions.length) return 0;
  // Unique calendar days that had at least one session
  const dayKey = ts => {
    const d = new Date(ts);
    return d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
  };
  const days = new Set(sessions.map(s => dayKey(s.timestamp)));
  const today = new Date();
  // Start from today; if no session today, try from yesterday (grace period)
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function formatHours(totalMinutes) {
  if (totalMinutes < 60)  return `${totalMinutes} min`;
  const h = totalMinutes / 60;
  return h < 10 ? `${h.toFixed(1)} hrs` : `${Math.round(h)} hrs`;
}

// ── TOP-LEVEL TABS (stats | collection | achievements) ───────────────────────
function renderTopTab() {
  const tab = state.topTab || 'collection';

  document.querySelectorAll('.top-tab, .bottom-tab').forEach(b =>
    b.classList.toggle('active', b.dataset.top === tab)
  );

  const regionTabs = document.querySelector('#view-collection .region-tabs');
  regionTabs.classList.toggle('hidden', tab !== 'collection');

  const collStats = document.getElementById('collection-stats');
  if (collStats) collStats.style.display = tab === 'collection' ? '' : 'none';

  // Update title per tab
  const titleEl = document.getElementById('collection-title');
  if (titleEl) {
    const name = getUserName();
    if (tab === 'stats') titleEl.textContent = name ? `${name}'s kokoon` : 'kokoon';
    else if (tab === 'achievements') titleEl.textContent = name ? `${name}'s achievements` : 'achievements';
    else updateCollectionTitle();
  }

  // Share button only on collection tab
  const shareBtn = document.getElementById('btn-share-collection');
  if (shareBtn) shareBtn.style.display = tab === 'collection' ? '' : 'none';

  const grid    = document.getElementById('collection-grid');
  const statsEl = document.getElementById('stats-content');

  if (tab === 'stats') {
    grid.style.display    = 'none';
    statsEl.classList.add('active');
    renderStatsTab();
  } else if (tab === 'achievements') {
    grid.style.display    = '';
    statsEl.classList.remove('active');
    renderCollectionStats();
    state.filter = 'badges';
    renderBadges();
  } else {
    grid.style.display    = '';
    statsEl.classList.remove('active');
    if (state.filter === 'badges') state.filter = 'all';
    renderCollection();
  }
}

let _activityPeriod = 'W';

function buildActivityChart(minsIn, now) {
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const today = startOfDay(now);
  let buckets = [];

  if (_activityPeriod === 'W') {
    // 7 days: today and 6 days before
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const next = new Date(d); next.setDate(next.getDate() + 1);
      buckets.push({ label: dayNames[d.getDay()], mins: minsIn(d, next), isCurrent: i === 0 });
    }
  } else if (_activityPeriod === 'M') {
    // 12 weeks: current week and 11 before
    const weekStart = new Date(today); weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    for (let i = 11; i >= 0; i--) {
      const ws = new Date(weekStart); ws.setDate(ws.getDate() - i * 7);
      const we = new Date(ws); we.setDate(we.getDate() + 7);
      const label = `${monthNames[ws.getMonth()]} ${ws.getDate()}`;
      buckets.push({ label, mins: minsIn(ws, we), isCurrent: i === 0 });
    }
  } else {
    // 12 months: current month and 11 before
    for (let i = 11; i >= 0; i--) {
      const ms = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const me = new Date(ms.getFullYear(), ms.getMonth() + 1, 1);
      buckets.push({ label: monthNames[ms.getMonth()], mins: minsIn(ms, me), isCurrent: i === 0 });
    }
  }

  const maxMins = Math.max(...buckets.map(b => b.mins), 1);

  const bars = buckets.map(b => {
    const pct = Math.max((b.mins / maxMins) * 100, b.mins > 0 ? 4 : 0);
    const current = b.isCurrent ? ' activity-bar-current' : '';
    return `<div class="activity-col${current}">
      <div class="activity-value">${b.mins > 0 ? formatHours(b.mins) : ''}</div>
      <div class="activity-bar-track"><div class="activity-bar-fill" style="height:${pct}%"></div></div>
      <div class="activity-label">${b.label}</div>
    </div>`;
  }).join('');

  return `<div class="activity-chart">${bars}</div>`;
}

function renderStatsTab() {
  const el = document.getElementById('stats-content');
  if (!el) return;

  if (!sessions.length) {
    el.innerHTML = `
      <div class="stats-empty">
        <div class="stats-empty-icon">🥚</div>
        <div class="stats-empty-title">your story starts here</div>
        <div class="stats-empty-body">Complete your first focus session to hatch a creature and start tracking your progress.</div>
      </div>
    `;
    return;
  }

  const now = new Date();
  const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const startOfWeek = d => { const s = startOfDay(d); s.setDate(s.getDate() - s.getDay()); return s; };
  const startOfMonth = d => new Date(d.getFullYear(), d.getMonth(), 1);
  const startOfYear = d => new Date(d.getFullYear(), 0, 1);

  const minsIn = (from, to) => sessions
    .filter(s => s.timestamp >= from.getTime() && s.timestamp < to.getTime())
    .reduce((sum, s) => sum + s.duration, 0);

  // Current periods
  const todayStart = startOfDay(now);
  const weekStart  = startOfWeek(now);
  const monthStart = startOfMonth(now);
  const tomorrow   = new Date(todayStart); tomorrow.setDate(tomorrow.getDate() + 1);

  const todayMins = minsIn(todayStart, tomorrow);
  const weekMins  = minsIn(weekStart, now);
  const monthMins = minsIn(monthStart, now);
  const yearStart = startOfYear(now);
  const yearMins  = minsIn(yearStart, now);

  // Previous periods
  const yesterdayStart = new Date(todayStart); yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const lastWeekStart = new Date(weekStart); lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  const lastMonthStart = new Date(monthStart); lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);

  const yesterdayMins  = minsIn(yesterdayStart, todayStart);
  const lastWeekMins   = minsIn(lastWeekStart, weekStart);
  const lastMonthMins  = minsIn(lastMonthStart, monthStart);
  const lastYearStart  = new Date(yearStart); lastYearStart.setFullYear(lastYearStart.getFullYear() - 1);
  const lastYearMins   = minsIn(lastYearStart, yearStart);

  const streak    = calcStreak();
  const totalMins = sessions.reduce((s, x) => s + x.duration, 0);
  const totalSess = sessions.length;

  // Headline message — layered: streak first, then session milestones, then fallback
  let headline = 'every journey starts with a single session.';
  if (streak >= 100)      headline = `${streak} days. this is who you are now.`;
  else if (streak >= 30)  headline = `${streak} days. extraordinary discipline.`;
  else if (streak >= 14)  headline = `${streak} days strong. this is becoming part of you.`;
  else if (streak === 7)  headline = 'one full week. you are proving something.';
  else if (streak >= 7)   headline = `${streak} days. the rhythm is yours now.`;
  else if (streak >= 3)   headline = `${streak} days in. the habit is taking root.`;
  else if (streak === 2)  headline = 'day two. keep going.';
  else if (totalSess >= 100) headline = `${totalSess} sessions. a centurion of focus.`;
  else if (totalSess >= 50)  headline = `${totalSess} sessions and counting.`;
  else if (todayMins > 0) headline = 'you showed up today. that is what matters.';
  else if (totalSess === 1)  headline = 'the first step. welcome.';
  else if (totalSess > 0) headline = 'your next session is waiting.';

  // Delta text helpers
  function deltaText(current, previous, label) {
    const diff = current - previous;
    if (diff === 0 || previous === 0) return '';
    const word = diff > 0 ? 'more' : 'less';
    return `${formatHours(Math.abs(diff))} ${word} than last ${label}`;
  }

  // Focus narrative
  const todayDelta  = deltaText(todayMins, yesterdayMins, 'yesterday');
  const weekDelta   = deltaText(weekMins, lastWeekMins, 'week');
  const monthDelta  = deltaText(monthMins, lastMonthMins, 'month');
  const yearDelta   = deltaText(yearMins, lastYearMins, 'year');

  const focusRows = [
    { value: formatHours(todayMins),  label: 'today',      delta: todayDelta },
    { value: formatHours(weekMins),   label: 'this week',  delta: weekDelta },
    { value: formatHours(monthMins),  label: 'this month', delta: monthDelta },
    { value: formatHours(yearMins),   label: 'this year',  delta: yearDelta },
  ];
  const focusLines = focusRows.map(r =>
    `<div class="stats-line">
      <span class="stats-value">${r.value}</span> ${r.label}${r.delta ? ` <span class="stats-delta">· ${r.delta}</span>` : ''}
    </div>`
  ).join('');

  // Activity chart
  const activityHtml = buildActivityChart(minsIn, now);

  // Streak + journey lines
  let journeyLines = '';
  if (streak > 0) {
    journeyLines += `<div class="stats-line">
      <span class="stats-value">${streak} day${streak !== 1 ? 's' : ''}</span> current streak
    </div>`;
    if (streak >= state.maxStreak) {
      journeyLines += `<div class="stats-line stats-highlight"><em>this is your best streak yet</em></div>`;
    } else {
      journeyLines += `<div class="stats-line stats-highlight"><em>best: ${state.maxStreak} days</em></div>`;
    }
  }
  journeyLines += `<div class="stats-line">
    <span class="stats-value">${totalSess}</span> session${totalSess !== 1 ? 's' : ''} · <span class="stats-value">${formatHours(totalMins)}</span> total
  </div>`;

  el.innerHTML = `
    <div class="stats-headline">${headline}</div>

    <div class="stats-section">
      <div class="stats-section-label">you've focused</div>
      ${focusLines}
    </div>

    <div class="stats-section">
      <div class="stats-section-label">
        activity
        <span class="heatmap-toggles">
          <button class="heatmap-toggle${_activityPeriod === 'W' ? ' active' : ''}" data-period="W">W</button>
          <button class="heatmap-toggle${_activityPeriod === 'M' ? ' active' : ''}" data-period="M">M</button>
          <button class="heatmap-toggle${_activityPeriod === 'Y' ? ' active' : ''}" data-period="Y">Y</button>
        </span>
      </div>
      ${activityHtml}
    </div>

    <div class="stats-section">
      <div class="stats-section-label">your journey</div>
      ${journeyLines}
    </div>
  `;

  // Bind activity period toggles
  el.querySelectorAll('.heatmap-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      _activityPeriod = btn.dataset.period;
      renderStatsTab();
    });
  });
}

function renderTimerStats() {
  const el = document.getElementById('timer-stats');
  if (!el) return;
  if (!sessions.length) { el.classList.remove('has-data'); renderNudge(); return; }

  const streak    = calcStreak();
  const totalMins = sessions.reduce((s, x) => s + x.duration, 0);
  const streakPart = streak > 0 ? `🔥 ${streak} day${streak !== 1 ? 's' : ''} · ` : '';

  el.innerHTML = `<span class="stat-line">${streakPart}${sessions.length} session${sessions.length !== 1 ? 's' : ''} · ${formatHours(totalMins)}</span>`;
  el.classList.add('has-data');
  renderNudge();
}

function renderNudge() {
  const el = document.getElementById('timer-nudge');
  if (!el) return;

  // Priority 1: streak at risk (after 5pm, has a streak, no session today)
  const streak = calcStreak();
  if (streak > 0) {
    const hour = new Date().getHours();
    if (hour >= 17) {
      const dayKey = ts => { const d = new Date(ts); return d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate(); };
      const todayHasSessions = sessions.some(s => dayKey(s.timestamp) === dayKey(Date.now()));
      if (!todayHasSessions) {
        el.textContent = 'return to kokoon tonight to keep your streak';
        el.classList.add('show');
        return;
      }
    }
  }

  // Priority 2: milestones — nurture progress + next region unlock
  const parts = [];
  if (state.pinnedCreature && EVOLUTIONS[state.pinnedCreature] && !isEvolved(state.pinnedCreature)) {
    const name = charNameEn(getDisplayCharacter(state.pinnedCreature));
    const done = state.evolutionSessions[state.pinnedCreature] || 0;
    const left = Math.max(EVOLUTION_SESSIONS - done, 0);
    parts.push(`${name} evolves in ${left} session${left !== 1 ? 's' : ''}`);
  }
  const next = getNextUnlock();
  if (next) parts.push(`${REGION_LABELS[next.region]} unlocks in ${next.sessionsAway} session${next.sessionsAway !== 1 ? 's' : ''}`);

  if (parts.length) {
    el.innerHTML = parts.join('<br>');
    el.classList.add('show');
    return;
  }

  el.textContent = '';
  el.classList.remove('show');
}

// ── DAILY REMINDER ────────────────────────────────────────────────────────────

const REMINDER_HOUR = 20; // 8 pm

function todayDateKey() {
  const d = new Date();
  return d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
}

function reminderEnabled() {
  return localStorage.getItem('focus-reminder') === 'on';
}

function showReminderPrompt() {
  const el = document.getElementById('reminder-prompt');
  if (!el || localStorage.getItem('focus-reminder-asked')) return;
  if (!('Notification' in window)) return;

  el.innerHTML = `
    <span class="rp-text">want a daily reminder at 8pm?</span>
    <button class="rp-btn" id="rp-yes">yes please</button>
    <button class="rp-btn rp-no" id="rp-no">no thanks</button>
  `;
  el.classList.add('show');

  document.getElementById('rp-yes').addEventListener('click', async () => {
    localStorage.setItem('focus-reminder-asked', 'true');
    el.classList.remove('show');
    let perm = Notification.permission;
    if (perm === 'default') perm = await Notification.requestPermission();
    if (perm === 'granted') {
      localStorage.setItem('focus-reminder', 'on');
      checkReminderNotification();
    }
  });
  document.getElementById('rp-no').addEventListener('click', () => {
    localStorage.setItem('focus-reminder-asked', 'true');
    el.classList.remove('show');
  });
}

async function toggleReminder() {
  // Kept for potential settings use
  if (!('Notification' in window)) return;
  if (reminderEnabled()) { localStorage.setItem('focus-reminder', 'off'); return; }
  let perm = Notification.permission;
  if (perm === 'default') perm = await Notification.requestPermission();
  if (perm === 'granted') { localStorage.setItem('focus-reminder', 'on'); checkReminderNotification(); }
}

function checkReminderNotification() {
  if (!reminderEnabled()) return;
  if (Notification.permission !== 'granted') return;
  const now = new Date();
  if (now.getHours() < REMINDER_HOUR) return;
  const dayKey = ts => { const d = new Date(ts); return d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate(); };
  const todayKey = todayDateKey();
  if (sessions.some(s => dayKey(s.timestamp) === todayKey)) return; // already sessioned today
  if (localStorage.getItem('focus-reminded-date') === String(todayKey)) return; // already notified today
  localStorage.setItem('focus-reminded-date', String(todayKey));
  const n = new Notification('Kokoon', {
    body: 'Time for your daily focus session 🔥',
    icon: '/icon.svg',
    tag:  'focus-daily-reminder',
  });
  n.onclick = () => { window.focus(); n.close(); };
}

function initReminder() {
  if (!('Notification' in window)) return;
  checkReminderNotification();
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      checkReminderNotification();
      // Reconcile timer against wall clock after coming back from background
      if (state.timer.running && state.timer.endTime && !_hatchInProgress) {
        const remaining = Math.round((state.timer.endTime - Date.now()) / 1000);
        if (remaining <= 0) {
          clearInterval(state.timer.interval);
          state.timer.running   = false;
          state.timer.remaining = 0;
          state.timer.endTime   = null;
          updateTimerDisplay();
          onTimerComplete();
        } else {
          state.timer.remaining = remaining;
          updateTimerDisplay();
          updateProgressRing(1 - remaining / state.timer.duration);
          updateEggGlow(1 - remaining / state.timer.duration);
        }
      }
    }
  });
  setInterval(checkReminderNotification, 5 * 60 * 1000);

  // If another tab completes (and clears) the timer, stop ours
  window.addEventListener('storage', (e) => {
    if (e.key === 'focus-timer' && e.newValue === null && state.timer.running) {
      clearInterval(state.timer.interval);
      state.timer.running = false;
      state.timer.endTime = null;
      resetTimerState();
    }
  });
}

function renderCollectionStats() {
  const ownedIds   = new Set(state.collection.map(e => e.id));
  const totalCards = state.collection.length;

  // Per-region totals and owned counts
  const regionTotal = {}, regionOwned = {};
  Object.values(CHARACTERS).forEach(c => {
    regionTotal[c.region] = (regionTotal[c.region] || 0) + 1;
  });
  ownedIds.forEach(id => {
    const r = CHARACTERS[id]?.region;
    if (r) regionOwned[r] = (regionOwned[r] || 0) + 1;
  });

  // Only count characters/owned within unlocked regions for the stats strip + "all" tab
  const unlockedRegions = getUnlockedRegions();
  const unlockedTotal   = Object.values(CHARACTERS).filter(c => unlockedRegions.has(c.region)).length;
  const unlockedOwned   = [...ownedIds].filter(id => unlockedRegions.has(CHARACTERS[id]?.region)).length;

  // Stats strip
  const statsEl = document.getElementById('collection-stats');
  if (statsEl) {
    statsEl.innerHTML =
      `<span><span class="cs-frac">${unlockedOwned}</span>` +
      `<span class="cs-total"> / ${unlockedTotal} characters</span></span>` +
      `<span class="cs-sep">·</span>` +
      `<span>${totalCards} cards</span>`;
  }

  // Region tab counts + locked state
  document.querySelectorAll('.region-btn').forEach(btn => {
    const region = btn.dataset.region;
    const span   = btn.querySelector('.tab-count');
    if (!span) return;

    if (region === 'all') {
      span.textContent = `${unlockedOwned}/${unlockedTotal}`;
      btn.classList.remove('locked');
    } else if (!unlockedRegions.has(region)) {
      // Locked region — fog it out, show unlock threshold
      btn.classList.add('locked');
      btn.classList.remove('complete');
      span.textContent = '';
      let sublabel = btn.querySelector('.tab-unlock');
      if (!sublabel) {
        sublabel = document.createElement('span');
        sublabel.className = 'tab-unlock';
        btn.appendChild(sublabel);
      }
      sublabel.textContent = `session ${REGION_UNLOCKS[region]}`;
    } else {
      // Unlocked region — normal behavior
      btn.classList.remove('locked');
      const sublabel = btn.querySelector('.tab-unlock');
      if (sublabel) sublabel.remove();
      const o = regionOwned[region] || 0;
      const t = regionTotal[region] || 0;
      span.textContent = `${o}/${t}`;
      btn.classList.toggle('complete', t > 0 && o === t);
    }
  });
}

// ── STATE ─────────────────────────────────────────────────────────────────────
const state = {
  view: 'timer',
  timer: {
    duration: 25 * 60,
    remaining: 25 * 60,
    running: false,
    interval: null,
    endTime: null,   // wall-clock ms when timer should complete
  },
  hatch: { character: null, variant: null },
  collection: [],  // [{ id, timestamp }]
  filter: 'all',
  topTab: 'collection',
  previewAll: false,
  onboarding: false,    // true during the welcome hatch
  pendingMilestone: null,
  pendingRegionComplete: null,
  pendingRegionUnlock: null,
  badges: [],        // [{id, earned_at}]
  maxStreak: 0,
  pinnedCreature: null,    // character id (e.g. 'shiro') or null
  evolutionSessions: {},   // { charId: count } — sessions completed while pinned
  evolvedCreatures: [],    // [ charId, ... ] — characters that have evolved
  pendingEvolution: null,  // { baseChar, evolvedChar } — queued evolution animation
};

// ── PERSISTENCE ──────────────────────────────────────────────────────────────
// localStorage is used as a write-through cache for fast startup and offline.
// Supabase is the primary store; writes are fire-and-forget.

function loadCollection() {
  try {
    const saved = localStorage.getItem('focus-collection');
    if (saved) state.collection = JSON.parse(saved);
  } catch(e) {}
}

function saveCollection() {
  localStorage.setItem('focus-collection', JSON.stringify(state.collection));
  DB.saveCollection(state.collection).catch(() => {});
}

// ── BADGES ──────────────────────────────────────────────────────────────────

const BADGE_IMAGE_IDS = new Set(['first_session','sessions_10','sessions_25','sessions_50','sessions_100','sessions_200','sessions_365','streak_3','streak_7','streak_14','streak_30','collect_5','collect_15','collect_all','region_japan','region_americas','region_europe','region_africa','region_fantasy','first_gold','first_crimson','first_void','hours_10','hours_50','hours_100','first_rare','first_legendary']);

function badgeArtHtml(badge) {
  if (BADGE_IMAGE_IDS.has(badge.id)) {
    return `<img class="badge-tile-img" src="badges/${badge.id}.png" alt="${badge.name}">`;
  }
  return `<div class="badge-tile-icon">${badge.icon}</div>`;
}

function loadBadges() {
  try {
    const saved = localStorage.getItem('focus-badges');
    if (saved) state.badges = JSON.parse(saved);
    state.maxStreak = parseInt(localStorage.getItem('focus-max-streak') || '0') || 0;
  } catch(e) {}
}

// ── PINNED CREATURE & EVOLUTION PERSISTENCE ──────────────────────────────────

function loadPinnedCreature() {
  try {
    state.pinnedCreature = localStorage.getItem('focus-pinned') || null;
    const evo = localStorage.getItem('focus-evolution-sessions');
    if (evo) state.evolutionSessions = JSON.parse(evo);
    const evolved = localStorage.getItem('focus-evolved');
    if (evolved) state.evolvedCreatures = JSON.parse(evolved);
  } catch(e) {}
  // Backfill Supabase with whatever is in localStorage (no-op if all zeros)
  const nurtureTotal = Object.values(state.evolutionSessions).reduce((a, b) => a + b, 0);
  DB.updateNurtureProgress(nurtureTotal, state.evolvedCreatures.length, state.evolutionSessions, state.evolvedCreatures).catch(() => {});
}

function savePinnedCreature() {
  if (state.pinnedCreature) {
    localStorage.setItem('focus-pinned', state.pinnedCreature);
  } else {
    localStorage.removeItem('focus-pinned');
  }
  localStorage.setItem('focus-evolution-sessions', JSON.stringify(state.evolutionSessions));
  localStorage.setItem('focus-evolved', JSON.stringify(state.evolvedCreatures));
  const nurtureTotal = Object.values(state.evolutionSessions).reduce((a, b) => a + b, 0);
  DB.updateNurtureProgress(nurtureTotal, state.evolvedCreatures.length, state.evolutionSessions, state.evolvedCreatures).catch(() => {});
}

function pinCreature(charId) {
  state.pinnedCreature = charId;
  if (!state.evolutionSessions[charId]) state.evolutionSessions[charId] = 0;
  savePinnedCreature();
  renderPinnedCreature();
}

function unpinCreature() {
  state.pinnedCreature = null;
  savePinnedCreature();
  renderPinnedCreature();
}

function isEvolved(charId) {
  return state.evolvedCreatures.includes(charId);
}

function getDisplayCharacter(charId) {
  // Returns the evolved version if this creature has evolved, otherwise the base
  if (isEvolved(charId) && EVOLUTIONS[charId]) return EVOLUTIONS[charId];
  return CHARACTERS[charId];
}

// Characters that have a nurture (holding-egg) image — add IDs here as images are created
const NURTURE_IMAGES = new Set([
  'shiro','karasu','kyubi','tanuki','koi','kappa',
  'kodama','oni','baku','raijin_wolf','tsuru','jorogumo',
  'capybara','axolotl','quetzal','condor','jaguar','armadillo',
  'llama','chupacabra','coati','tapir','anaconda','colibri',
  'badger','chameleon','fenrir','gorilla','gryphon','hare',
  'hedgehog','hippo','honey_badger','hyena','meerkat','mongoose',
  'okapi','pangolin','robin','salamander','selkie','serval',
  'stag','tau','unicorn','warthog','wisp','wyvern',
  'basilisk','chimera','djinn','fairy','golem','imp',
  'kraken','mimic','myconid','phoenix','sprite','wyrm',
]);

function renderPinnedCreature() {
  const container = document.getElementById('pinned-creature');
  const eggEl = document.getElementById('timer-egg');
  const menu = document.getElementById('egg-action-menu');
  if (!container) return;

  const charId = state.pinnedCreature;
  const owns = charId && CHARACTERS[charId] && state.collection.some(e => e.id === charId);

  if (menu) menu.classList.remove('open');

  const unpinBtn = document.getElementById('btn-unpin-creature');

  if (!owns) {
    container.innerHTML = '';
    container.classList.remove('show');
    if (eggEl) { eggEl.innerHTML = EGG_SVG_SMALL; eggEl.style.cursor = 'pointer'; }
    if (unpinBtn) unpinBtn.style.display = 'none';
    renderEvolutionRing(null, 0);
    return;
  }

  if (unpinBtn) unpinBtn.style.display = 'block';

  if (NURTURE_IMAGES.has(charId)) {
    if (eggEl) { eggEl.innerHTML = `<img src="/chars/${charId}_nurture.png" class="nurture-egg-img" alt="${charId}">`; eggEl.style.cursor = ''; }
    container.innerHTML = '';
    container.classList.remove('show');
  } else {
    if (eggEl) { eggEl.innerHTML = EGG_SVG_SMALL; eggEl.style.cursor = ''; }
    const char = getDisplayCharacter(charId);
    const rarestVariant = getRarestOwnedVariant(charId);
    container.innerHTML = `<div class="pinned-art">${char.svg}</div>`;
    applyVariantFilter(container.querySelector('.pinned-art'), rarestVariant);
    container.classList.add('show');
  }

  const progress = state.evolutionSessions[charId] || 0;
  renderEvolutionRing(charId, progress);
}

function renderEvolutionRing(charId, progress) {
  const svg = document.getElementById('progress-ring');
  if (!svg) return;
  svg.querySelectorAll('.evo-segment').forEach(el => el.remove());
  if (!charId || !EVOLUTIONS[charId] || isEvolved(charId)) return;

  const char = CHARACTERS[charId];
  const r = 118, cx = 130, cy = 130;
  const circumference = 2 * Math.PI * r;
  const gap = 12;
  const segLen = (circumference - EVOLUTION_SESSIONS * gap) / EVOLUTION_SESSIONS;
  const filled = Math.min(progress, EVOLUTION_SESSIONS);
  const segAngle = (segLen + gap) / circumference * 360;

  for (let i = 0; i < EVOLUTION_SESSIONS; i++) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'evo-segment');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', char.accentColor);
    circle.setAttribute('stroke-width', '4');
    circle.setAttribute('stroke-linecap', 'round');
    circle.setAttribute('opacity', i < filled ? '0.85' : '0.12');
    circle.setAttribute('stroke-dasharray', `${segLen} ${circumference - segLen}`);
    circle.setAttribute('stroke-dashoffset', '0');
    circle.setAttribute('transform', `rotate(${-90 + i * segAngle}, ${cx}, ${cy})`);
    svg.appendChild(circle);
  }
}

function showNurtureComplete(charId, progress) {
  resetTimerState();
  _hatchInProgress = false;
  // Dismiss Live Activity and delivered notification from lock screen (same as hatch path)
  if (LocalNotif) { LocalNotif.removeAllDeliveredNotifications().catch(() => {}); }
  if (LiveActivity) { LiveActivity.stopActivity({ dismissImmediately: true }).catch(() => {}); }
  prepareNurtureView(charId, progress);
  navigateTo('hatch');
  setTimeout(() => runNurtureSequence(charId, progress), 400);
}

function initEggInteraction() {
  // Tap egg → always go to collection (to pick or change creature)
  document.getElementById('timer-egg')?.addEventListener('click', () => {
    navigateTo('collection');
  });
  // ✕ button → unpin
  document.getElementById('btn-unpin-creature')?.addEventListener('click', e => {
    e.stopPropagation();
    unpinCreature();
  });
}

function getRarestOwnedVariant(charId) {
  const vc = {};
  state.collection.forEach(e => {
    if (e.id === charId) {
      const v = e.variant || 'standard';
      vc[v] = (vc[v] || 0) + 1;
    }
  });
  const rarest = [...VARIANTS].reverse().find(v => (vc[v.id] || 0) > 0);
  return rarest ? rarest.id : 'standard';
}

function calcMaxStreakFromHistory() {
  if (!sessions.length) return 0;
  const dayKey = ts => {
    const d = new Date(ts);
    return d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
  };
  const days = [...new Set(sessions.map(s => dayKey(s.timestamp)))].sort();
  let max = 1, cur = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(Math.floor(days[i-1] / 10000), Math.floor((days[i-1] % 10000) / 100), days[i-1] % 100);
    const curr = new Date(Math.floor(days[i] / 10000), Math.floor((days[i] % 10000) / 100), days[i] % 100);
    const diff = (curr - prev) / (1000 * 60 * 60 * 24);
    if (diff === 1) { cur++; max = Math.max(max, cur); }
    else { cur = 1; }
  }
  return max;
}

function buildBadgeContext() {
  const ownedIds = new Set(state.collection.map(e => e.id));
  const variantSet = new Set(state.collection.map(e => e.variant || 'standard'));
  const totalMins = sessions.reduce((s, x) => s + x.duration, 0);
  const completedRegions = getCompletedRegions(ownedIds);
  return { sessions: sessions.length, streak: calcStreak(), maxStreak: state.maxStreak, ownedIds, variantSet, totalMinutes: totalMins, completedRegions };
}

function checkBadges() {
  const ctx = buildBadgeContext();
  const earnedIds = new Set(state.badges.map(b => b.id));
  const newBadges = [];

  for (const badge of BADGES) {
    if (earnedIds.has(badge.id)) continue;
    if (badge.check(ctx)) {
      const entry = { id: badge.id, earned_at: new Date().toISOString() };
      state.badges.push(entry);
      newBadges.push(entry);
    }
  }

  if (newBadges.length > 0) {
    localStorage.setItem('focus-badges', JSON.stringify(state.badges));
    DB.saveBadges(state.badges).catch(() => {});
    newBadges.forEach(b => DB.incrementBadgeStat(b.id).catch(() => {}));
  }

  return newBadges;
}

let _pendingBadgeToasts = [];

function showNextBadgeToast() {
  if (!_pendingBadgeToasts.length) return;
  const badge = _pendingBadgeToasts.shift();
  const toast = document.getElementById('badge-toast');
  document.getElementById('badge-toast-art').innerHTML = badgeArtHtml(badge);
  document.getElementById('badge-toast-name').textContent = badge.name;
  toast.classList.add('show');
  toast.onclick = () => {
    toast.classList.remove('show');
    _pendingBadgeToasts = [];
    state.topTab = 'achievements';
    navigateTo('collection');
    setTimeout(() => openBadgeModal(badge, { earned: true }), 300);
  };
  setTimeout(() => {
    toast.classList.remove('show');
    // Show next badge after fade out
    if (_pendingBadgeToasts.length) setTimeout(showNextBadgeToast, 600);
  }, 3500);
}

function updateMaxStreak() {
  const streak = calcStreak();
  if (streak > state.maxStreak) {
    state.maxStreak = streak;
    localStorage.setItem('focus-max-streak', String(streak));
    DB.updateMaxStreak(streak).catch(() => {});
  }
}

// Badge stats cache
let _badgeStatsCache = null;
let _playerCountCache = null;

async function loadBadgeStatsAndCount() {
  if (_badgeStatsCache && _playerCountCache) return { stats: _badgeStatsCache, total: _playerCountCache };
  const [stats, total] = await Promise.all([
    DB.loadBadgeStats().catch(() => null),
    DB.getPlayerCount().catch(() => null),
  ]);
  _badgeStatsCache = stats || {};
  _playerCountCache = total || 1;
  return { stats: _badgeStatsCache, total: _playerCountCache };
}

async function renderBadges() {
  const grid = document.getElementById('collection-grid');
  grid.innerHTML = '';
  grid.classList.add('badge-mode');

  const { stats, total } = await loadBadgeStatsAndCount();
  const earnedIds = new Set(state.badges.map(b => b.id));
  const earnedMap = {};
  state.badges.forEach(b => { earnedMap[b.id] = b.earned_at; });
  const ctx = buildBadgeContext();

  const earned = BADGES.filter(b => earnedIds.has(b.id));
  const unearned = BADGES.filter(b => !earnedIds.has(b.id));

  // Section: Earned
  if (earned.length) {
    const header = document.createElement('div');
    header.className = 'badge-section-header';
    header.textContent = `Earned · ${earned.length}`;
    grid.appendChild(header);

    const earnedGrid = document.createElement('div');
    earnedGrid.className = 'badge-grid';
    earned.forEach(badge => {
      const dateText = new Date(earnedMap[badge.id]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
      const count = stats[badge.id] || 0;
      const pct = total > 0 ? ((count / total) * 100) : 0;
      const pctText = 'earned by ' + (pct < 1 ? '<1' : Math.round(pct)) + '% of players';

      const card = document.createElement('div');
      card.className = 'badge-tile earned';
      card.innerHTML = `
        <div class="badge-tile-art">${badgeArtHtml(badge)}</div>
        <div class="badge-tile-info">
          <div class="badge-tile-name">${badge.name}</div>
        </div>
      `;
      card.addEventListener('click', () => openBadgeModal(badge, { earned: true, date: earnedMap[badge.id], pctText }));
      earnedGrid.appendChild(card);
    });
    grid.appendChild(earnedGrid);
  }

  // Section: Unearned
  if (unearned.length) {
    const header = document.createElement('div');
    header.className = 'badge-section-header';
    header.textContent = `Unearned · ${unearned.length}`;
    grid.appendChild(header);

    const unearnedGrid = document.createElement('div');
    unearnedGrid.className = 'badge-grid';
    unearned.forEach(badge => {
      const card = document.createElement('div');
      card.className = 'badge-tile unearned';

      const count = stats[badge.id] || 0;
      const rarePct = total > 0 ? ((count / total) * 100) : 0;
      const rarePctText = count > 0 ? 'earned by ' + (rarePct < 1 ? '<1' : Math.round(rarePct)) + '%' : '';

      let progressHtml = '';
      if (badge.progress) {
        const p = badge.progress(ctx);
        const pct = Math.min((p.cur / p.max) * 100, 100);
        const unit = p.unit || '';
        progressHtml = `
          <div class="badge-tile-progress">
            <div class="badge-progress-bar"><div class="badge-progress-fill" style="width:${pct}%"></div></div>
            <div class="badge-progress-text">${p.cur}${unit}/${p.max}${unit}</div>
          </div>`;
      }

      card.innerHTML = `
        <div class="badge-tile-art">${badgeArtHtml(badge)}</div>
        <div class="badge-tile-info">
          <div class="badge-tile-name">${badge.name}</div>
          ${progressHtml}
        </div>
      `;
      card.addEventListener('click', () => openBadgeModal(badge, { earned: false, pctText: rarePctText }));
      unearnedGrid.appendChild(card);
    });
    grid.appendChild(unearnedGrid);
  }

  if (!earned.length && !unearned.length) {
    grid.innerHTML = '<div class="badge-section-header" style="text-align:center;padding:3rem 1rem;opacity:.4">Complete sessions to earn achievements</div>';
  }
}

// ── BADGE MODAL ─────────────────────────────────────────────────────────────

function openBadgeModal(badge, opts) {
  const artEl  = document.getElementById('badge-modal-art');
  const nameEl = document.getElementById('badge-modal-name');
  const descEl = document.getElementById('badge-modal-desc');
  const dateEl = document.getElementById('badge-modal-date');
  const pctEl  = document.getElementById('badge-modal-pct');
  const progEl = document.getElementById('badge-modal-progress');
  const card   = document.getElementById('badge-modal-card');

  card.classList.remove('flipped');

  // Art
  if (BADGE_IMAGE_IDS.has(badge.id)) {
    const img = `<img src="badges/${badge.id}.png" alt="${badge.name}"` +
      (opts.earned ? '' : ' style="filter:grayscale(1);opacity:.4"') + '>';
    artEl.innerHTML = img;
  } else {
    artEl.innerHTML = `<div class="badge-tile-icon">${badge.icon}</div>`;
  }

  nameEl.textContent = badge.name;
  document.getElementById('badge-modal-front-name').textContent = badge.name;
  descEl.textContent = badge.desc;

  // Date (earned only)
  if (opts.earned && opts.date) {
    dateEl.textContent = new Date(opts.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
    dateEl.style.display = '';
  } else {
    dateEl.style.display = 'none';
  }

  // Rarity pct
  if (opts.pctText) {
    pctEl.textContent = opts.pctText;
    pctEl.style.display = '';
  } else {
    pctEl.style.display = 'none';
  }

  // Progress (unearned only)
  if (!opts.earned && badge.progress) {
    const ctx = buildBadgeContext();
    const p = badge.progress(ctx);
    const pct = Math.min((p.cur / p.max) * 100, 100);
    const unit = p.unit || '';
    progEl.innerHTML = `
      <div class="badge-progress-bar"><div class="badge-progress-fill" style="width:${pct}%"></div></div>
      <div class="badge-progress-text">${p.cur}${unit} / ${p.max}${unit}</div>`;
    progEl.style.display = '';
  } else {
    progEl.innerHTML = '';
    progEl.style.display = 'none';
  }

  document.getElementById('badge-modal').classList.add('open');
}

function closeBadgeModal() {
  document.getElementById('badge-modal').classList.remove('open');
  document.getElementById('badge-modal-card').classList.remove('flipped');
  const view = document.querySelector('.view.active');
  if (view) { view.style.overflow = 'hidden'; requestAnimationFrame(() => { view.style.overflow = ''; }); }
}

function initBadgeModalListeners() {
  document.getElementById('badge-modal-close').addEventListener('click', closeBadgeModal);
  document.getElementById('badge-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeBadgeModal();
  });
  document.getElementById('badge-modal-card').addEventListener('click', () => {
    document.getElementById('badge-modal-card').classList.toggle('flipped');
  });
}

function addToCollection(character, variant) {
  const entry = { id: character.id, variant: variant.id, timestamp: Date.now() };
  state.collection.push(entry);
  localStorage.setItem('focus-collection', JSON.stringify(state.collection));
  DB.addCollectionEntry(character.id, variant.id).catch(() => {});
}

// ── NAVIGATION ───────────────────────────────────────────────────────────────
function navigateTo(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById(`view-${viewId}`);
  el.classList.add('active');
  state.view = viewId;
  // Deactivate onboard slides so their pointer-events:all can't bleed through
  if (viewId !== 'onboard') {
    document.querySelectorAll('.ob-slide').forEach(s => s.classList.remove('active'));
  }
  // iOS PWA: kick the scroll container so WebKit doesn't freeze it
  if (viewId === 'collection' || viewId === 'profile') {
    el.style.overflow = 'hidden';
    requestAnimationFrame(() => { el.style.overflow = ''; });
  }
  if (viewId === 'collection') { updateCollectionTitle(); renderTopTab(); }
  if (viewId === 'timer') {
    renderTimerStats();
    if (_pendingBadgeToasts.length) setTimeout(showNextBadgeToast, 800);
    maybeShowEvoHint();
  } else {
    document.getElementById('evo-hint-banner')?.classList.remove('show');
  }
  const noMute = viewId === 'collection' || viewId === 'auth' || viewId === 'onboard' || viewId === 'profile';
  const muteBtn = document.getElementById('btn-mute');
  if (muteBtn) { muteBtn.style.opacity = noMute ? '0' : ''; muteBtn.style.pointerEvents = noMute ? 'none' : ''; }
}

function loadMuteState() {
  const m = localStorage.getItem('focus-muted') === 'true';
  SFX.setMuted(m);
  document.getElementById('btn-mute').classList.toggle('muted', m);
}

function toggleMute() {
  const m = !SFX.isMuted();
  SFX.setMuted(m);
  localStorage.setItem('focus-muted', String(m));
  document.getElementById('btn-mute').classList.toggle('muted', m);
}

function maybeShowEvoHint() {
  if (localStorage.getItem('focus-evo-hint-seen')) return;
  if (sessions.length < 3) return;
  const hasNurtured = Object.values(state.evolutionSessions || {}).some(n => n > 0);
  if (hasNurtured) return;
  setTimeout(() => document.getElementById('evo-hint-banner')?.classList.add('show'), 700);
}

function dismissEvoHint() {
  document.getElementById('evo-hint-banner')?.classList.remove('show');
  localStorage.setItem('focus-evo-hint-seen', '1');
  DB.setEvoHintSeen().catch(() => {});
}

function initBlockApps() {
  const on = localStorage.getItem('focus-block-apps') === 'true';
  const el = document.getElementById('btn-block-apps');
  if (el) el.checked = on;
}

function isBlockAppsEnabled() {
  return document.getElementById('btn-block-apps')?.checked ?? false;
}

function initDarkMode() {
  const dark = localStorage.getItem('focus-dark') === 'true';
  document.documentElement.classList.toggle('dark', dark);
  document.body.classList.toggle('dark', dark);
}

function toggleDark() {
  const dark = document.body.classList.toggle('dark');
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('focus-dark', String(dark));
}


// ── TIMER ─────────────────────────────────────────────────────────────────────
const RING_CIRC = 2 * Math.PI * 118; // 741.12

function updateTimerDisplay() {
  const m = Math.floor(state.timer.remaining / 60);
  const s = state.timer.remaining % 60;
  document.getElementById('time-minutes').textContent = String(m).padStart(2, '0');
  document.getElementById('time-seconds').textContent = String(s).padStart(2, '0');
  // Update mini timer if open
  if (_miniWin && !_miniWin.closed) {
    const el = _miniWin.document.getElementById('mini-time');
    if (el) el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
}

let _miniWin = null;
function openMiniTimer() {
  if (_miniWin && !_miniWin.closed) { _miniWin.focus(); return; }
  const dark = document.documentElement.classList.contains('dark');
  const bg = dark ? '#0a0a12' : '#f0ebe0';
  const fg = dark ? '#ddd7c8' : '#080810';
  _miniWin = window.open('', 'minitimer', 'width=220,height=100,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no');
  if (!_miniWin) return;
  const m = Math.floor(state.timer.remaining / 60);
  const s = state.timer.remaining % 60;
  _miniWin.document.write(`<!DOCTYPE html>
<html><head><title>Focus</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: ${bg}; display: flex; align-items: center; justify-content: center;
    height: 100vh; font-family: 'Helvetica Neue', sans-serif; user-select: none;
    -webkit-app-region: drag; }
  #mini-time { font-size: 3rem; font-weight: 200; letter-spacing: .04em; color: ${fg}; }
</style></head>
<body><div id="mini-time">${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}</div></body></html>`);
  _miniWin.document.close();
}

function updateProgressRing(progress) {
  const offset = RING_CIRC * (1 - progress);
  document.getElementById('ring-fill').style.strokeDashoffset = offset;
}

function updateEggGlow(progress) {
  const el = document.getElementById('timer-egg');
  if (!el) return;
  const blur  = 6 + progress * 18;
  const alpha = 0.05 + progress * 0.35;
  el.style.filter = `drop-shadow(0 0 ${blur}px rgba(240,165,0,${alpha.toFixed(2)}))`;
}

function setDuration(minutes) {
  if (state.timer.running) return;
  state.timer.duration  = minutes * 60;
  state.timer.remaining = minutes * 60;
  document.querySelectorAll('.dur-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.min) === minutes);
  });
  updateTimerDisplay();
  updateProgressRing(0);
}

function saveTimerState() {
  localStorage.setItem('focus-timer', JSON.stringify({
    endTime:   state.timer.endTime,
    duration:  state.timer.duration,
    remaining: state.timer.remaining,
    running:   state.timer.running,
  }));
}

let _hatchInProgress = false;

function clearTimerState() {
  localStorage.removeItem('focus-timer');
}

async function startTimer() {
  _hatchInProgress = false;
  state.timer.running = true;
  state.timer.endTime = Date.now() + state.timer.remaining * 1000;
  saveTimerState();
  requestWakeLock();
  if (LiveActivity) {
    LiveActivity.startActivity({
      totalSeconds: state.timer.duration,
      remainingSeconds: state.timer.remaining,
    }).catch(() => {});
  }
  if (AppBlocking && isBlockAppsEnabled()) {
    try {
      let { status } = await AppBlocking.getAuthorizationStatus();
      if (status === 'notDetermined') {
        const { granted } = await AppBlocking.requestAuthorization();
        if (granted) {
          // Brief pause for authorization to propagate before setting shields
          await new Promise(r => setTimeout(r, 500));
          await AppBlocking.startBlocking();
        }
      } else if (status === 'approved') {
        await AppBlocking.startBlocking();
      }
    } catch (_) { /* blocking is best-effort */ }
  }
  // Schedule a LocalNotification at exact end time so the phone rings even when
  // the app is backgrounded and JS is suspended (Live Activity alert needs foreground).
  if (LocalNotif) {
    LocalNotif.requestPermissions().then(({ display }) => {
      if (display !== 'granted') return;
      LocalNotif.cancel({ notifications: [{ id: TIMER_NOTIF_ID }] }).catch(() => {}).finally(() => {
        const isNurturing = state.pinnedCreature && EVOLUTIONS[state.pinnedCreature] && !isEvolved(state.pinnedCreature);
        const notifBody = isNurturing
          ? `${CHARACTERS[state.pinnedCreature].nameShort} nurtured · session complete 🥚`
          : 'Your egg is hatching 🥚';
        LocalNotif.schedule({ notifications: [{
          id: TIMER_NOTIF_ID,
          title: 'Kokoon',
          body: notifBody,
          schedule: { at: new Date(state.timer.endTime), allowWhileIdle: true },
          sound: 'default',
        }]}).catch(() => {});
      });
    }).catch(() => {});
  }
  document.getElementById('btn-start-focus').innerHTML = '<span>pause</span>';
  document.getElementById('btn-reset-timer').classList.remove('visible');
  document.getElementById('view-timer').classList.add('running');

  state.timer.interval = setInterval(() => {
    // Derive remaining from wall clock — survives background throttling
    state.timer.remaining = Math.max(0, Math.round((state.timer.endTime - Date.now()) / 1000));
    updateTimerDisplay();
    const progress = 1 - state.timer.remaining / state.timer.duration;
    updateProgressRing(progress);
    updateEggGlow(progress);
    if (state.timer.remaining <= 0) {
      clearInterval(state.timer.interval);
      state.timer.running = false;
      state.timer.endTime = null;
      onTimerComplete();
    }
  }, 1000);
}

function pauseTimer() {
  state.timer.running = false;
  state.timer.endTime = null;
  clearInterval(state.timer.interval);
  releaseWakeLock();
  saveTimerState();
  if (LocalNotif) {
    LocalNotif.cancel({ notifications: [{ id: TIMER_NOTIF_ID }] }).catch(() => {});
    LocalNotif.removeAllDeliveredNotifications().catch(() => {});
  }
  if (AppBlocking) { AppBlocking.stopBlocking().catch(() => {}); }
  if (LiveActivity) {
    LiveActivity.updateActivity({
      remainingSeconds: state.timer.remaining,
      isPaused: true,
    }).catch(() => {});
  }
  document.getElementById('btn-start-focus').innerHTML = '<span>resume</span>';
  document.getElementById('btn-reset-timer').classList.add('visible');
}

function toggleTimer() {
  if (state.timer.running) pauseTimer();
  else startTimer();
}

function resetTimerState() {
  clearInterval(state.timer.interval);
  clearTimerState();
  releaseWakeLock();
  if (LocalNotif) {
    LocalNotif.cancel({ notifications: [{ id: TIMER_NOTIF_ID }] }).catch(() => {});
    LocalNotif.removeAllDeliveredNotifications().catch(() => {});
  }
  if (LiveActivity) { LiveActivity.stopActivity().catch(() => {}); }
  if (AppBlocking) { AppBlocking.stopBlocking().catch(() => {}); }
  state.timer.running   = false;
  state.timer.remaining = state.timer.duration;
  updateTimerDisplay();
  updateProgressRing(0);
  updateEggGlow(0);
  document.getElementById('btn-start-focus').innerHTML = '<span>begin focus</span>';
  document.getElementById('btn-reset-timer').classList.remove('visible');
  document.getElementById('view-timer').classList.remove('running');
}

function onTimerComplete() {
  // Guard against duplicate completions (e.g. two tabs, visibilitychange + interval race).
  if (_hatchInProgress) return;
  const saved = localStorage.getItem('focus-timer');
  if (!saved) return;           // another tab already claimed this completion
  _hatchInProgress = true;
  localStorage.removeItem('focus-timer');
  releaseWakeLock();
  // Clear the LocalNotification from the notification centre now that the user is in-app
  if (LocalNotif) { LocalNotif.removeAllDeliveredNotifications().catch(() => {}); }
  // End the Live Activity cleanly — LocalNotif handles ringing, no alert needed here.
  // dismissImmediately clears it from the notification centre right after hatch.
  if (LiveActivity) { LiveActivity.stopActivity({ dismissImmediately: true }).catch(() => {}); }
  if (AppBlocking) { AppBlocking.stopBlocking().catch(() => {}); }

  const prevSessionCount = sessions.length;
  addSession(state.timer.duration / 60);
  renderTimerStats();
  notifySessionComplete();

  // ── Evolution tracking: increment sessions for pinned creature ──
  state.pendingEvolution = null;
  if (state.pinnedCreature && !isEvolved(state.pinnedCreature) && EVOLUTIONS[state.pinnedCreature]) {
    state.evolutionSessions[state.pinnedCreature] = (state.evolutionSessions[state.pinnedCreature] || 0) + 1;
    if (state.evolutionSessions[state.pinnedCreature] >= EVOLUTION_SESSIONS) {
      // Evolution triggered!
      state.evolvedCreatures.push(state.pinnedCreature);
      state.pendingEvolution = {
        baseChar: CHARACTERS[state.pinnedCreature],
        evolvedChar: EVOLUTIONS[state.pinnedCreature],
      };
      DB.recordEvolution(state.pinnedCreature).catch(() => {});
    }
    savePinnedCreature();
  }

  // Detect a newly-unlocked region (session count just crossed a threshold)
  state.pendingRegionUnlock = REGION_UNLOCK_ORDER.find(r => {
    const t = REGION_UNLOCKS[r];
    return t > 0 && sessions.length >= t && prevSessionCount < t;
  }) || null;

  // Check for first-time milestone
  const n = sessions.length;
  if (MILESTONES[n] && !seenMilestones().has(n)) {
    state.pendingMilestone = MILESTONES[n];
    markMilestoneSeen(n);
  } else {
    state.pendingMilestone = null;
  }

  // Region unlock takes priority over milestone toast (they share sessions 10/25/50/100)
  if (state.pendingRegionUnlock) state.pendingMilestone = null;

  // One-time reminder prompt: fires after completing a second consecutive day (first real streak)
  if (calcStreak() === 2 && !localStorage.getItem('focus-reminder-asked')) {
    setTimeout(showReminderPrompt, 1000);
  }

  // Update max streak and check for new badges
  updateMaxStreak();
  const newBadges = checkBadges();
  if (newBadges.length) {
    _pendingBadgeToasts = newBadges.map(b => BADGES.find(def => def.id === b.id)).filter(Boolean);
  }

  // ── Evolution path: skip hatch entirely, go straight to evolution screen ──
  if (state.pendingEvolution) {
    if (isGuest()) {
      // Undo evolution — roll back state so one more session triggers it after sign-up
      state.evolvedCreatures = state.evolvedCreatures.filter(id => id !== state.pinnedCreature);
      localStorage.setItem('focus-evolved', JSON.stringify(state.evolvedCreatures));
      state.evolutionSessions[state.pinnedCreature] = EVOLUTION_SESSIONS - 1;
      state.pendingEvolution = null;
      // Show guest prompt on dark canvas
      state.hatch.guestBlocked = true;
      state.hatch.character = null;
      state.hatch.variant   = null;
      navigateTo('hatch');
      document.getElementById('hatch-stage').style.opacity = '0';
      document.getElementById('guest-creature-name').textContent = 'evolution awaits';
      document.getElementById('guest-signup-msg').textContent    = 'create an account to evolve your creature and unlock its final form.';
      setTimeout(() => document.getElementById('guest-signup-prompt').classList.add('show'), 600);
      return;
    }
    const evo = state.pendingEvolution;
    navigateTo('hatch'); // reuse view as a blank dark canvas
    // Hide hatch-stage elements so only evolution overlay shows
    document.getElementById('hatch-stage').style.opacity = '0';
    setTimeout(() => showEvolutionScreen(evo.baseChar, evo.evolvedChar), 600);
    return;
  }

  // ── Nurture path: creature pinned → no hatch, show progress animation ──
  if (state.pinnedCreature && EVOLUTIONS[state.pinnedCreature] && !isEvolved(state.pinnedCreature)) {
    if (isGuest()) {
      // Undo the session increment so no progress is banked without an account
      state.evolutionSessions[state.pinnedCreature] = Math.max(0, (state.evolutionSessions[state.pinnedCreature] || 0) - 1);
      state.hatch.guestBlocked = true;
      state.hatch.character    = null;
      state.hatch.variant      = null;
      navigateTo('hatch');
      document.getElementById('hatch-stage').style.opacity = '0';
      document.getElementById('guest-creature-name').textContent = 'evolution awaits';
      document.getElementById('guest-signup-msg').textContent    = 'create an account to evolve your creature and unlock its final form.';
      setTimeout(() => document.getElementById('guest-signup-prompt').classList.add('show'), 600);
      return;
    }
    const progress = state.evolutionSessions[state.pinnedCreature] || 0;
    showNurtureComplete(state.pinnedCreature, progress);
    return;
  }

  // ── Guest gate: block second+ hatch until account is created ──
  if (isGuest() && state.collection.length >= 1) {
    const rollResult = rollCharacterInUnlockedRegions(state.timer.duration);
    state.hatch.character  = rollResult.character;
    state.hatch.variant    = rollResult.variant;
    state.hatch.guestBlocked = true;
    state.pendingRegionUnlock  = null;
    state.pendingRegionComplete = null;
    prepareHatchView(rollResult.character, rollResult.variant);
    navigateTo('hatch');
    setTimeout(runHatchSequence, 400);
    return;
  }
  state.hatch.guestBlocked = false;

  // ── Normal hatch path ──
  // If a new region just unlocked, guarantee a creature from that region
  const rollResult = state.pendingRegionUnlock
    ? rollFromRegion(state.pendingRegionUnlock, state.timer.duration)
    : rollCharacterInUnlockedRegions(state.timer.duration);
  const { character, variant } = rollResult;
  state.hatch.character = character;
  state.hatch.variant   = variant;

  // Detect newly completed region
  const completedBefore = getCompletedRegions(new Set(state.collection.map(e => e.id)));
  addToCollection(character, variant);
  const completedAfter  = getCompletedRegions(new Set(state.collection.map(e => e.id)));
  const newRegion = [...completedAfter].find(r => !completedBefore.has(r));
  state.pendingRegionComplete = newRegion || null;
  // Region completion takes priority — suppress milestone and region-unlock toasts
  if (newRegion) { state.pendingMilestone = null; state.pendingRegionUnlock = null; }

  // Check if this hatch triggered a fusion
  if (checkFusion(character.id, variant.id)) {
    const toVariant = applyFusion(character.id, variant.id);
    if (toVariant) {
      const fromVariant = VARIANTS.find(v => v.id === variant.id);
      pendingFusion = { char: character, fromVariant, toVariant };
    }
  } else {
    pendingFusion = null;
  }

  prepareHatchView(character, variant);
  navigateTo('hatch');

  if (state.pendingRegionUnlock) {
    // Show region discovery overlay first, then hatch
    const region = state.pendingRegionUnlock;
    const label  = REGION_LABELS[region] || region;
    const msg    = REGION_UNLOCK_MSGS[region] || '';
    const overlay = document.getElementById('region-discover-overlay');
    document.getElementById('region-discover-label').textContent = `✦ ${label} ✦`;
    document.getElementById('region-discover-msg').textContent = msg;

    setTimeout(() => {
      overlay.classList.add('show');
      SFX.regionDiscover();
      Haptic.medium();
    }, 400);

    // Fade out overlay and start hatch
    setTimeout(() => {
      overlay.classList.add('fade-out');
      state.pendingRegionUnlock = null;
    }, 2800);

    // Start hatch after overlay fades
    setTimeout(runHatchSequence, 3200);

    // Fusion after hatch (with region overlay delay)
    if (pendingFusion) {
      setTimeout(() => {
        if (pendingFusion) {
          const { char, fromVariant, toVariant } = pendingFusion;
          pendingFusion = null;
          showFusionScreen(char, fromVariant, toVariant);
        }
      }, 3200 + 5600);
    }
  } else {
    setTimeout(runHatchSequence, 400);

    // Auto-trigger fusion animation after the hatch sequence finishes
    if (pendingFusion) {
      setTimeout(() => {
        if (pendingFusion) {
          const { char, fromVariant, toVariant } = pendingFusion;
          pendingFusion = null;
          showFusionScreen(char, fromVariant, toVariant);
        }
      }, 5600);
    }
  }
}

// ── HATCH SEQUENCE ────────────────────────────────────────────────────────────
let parts = [];
let particleCanvas, px;

function prepareHatchView(character, variant) {
  // Inject character SVG
  const wrap = document.getElementById('char-wrap');
  wrap.innerHTML = character.svg;
  wrap.style.opacity = '0';
  wrap.style.transition = 'none';
  applyVariantFilter(wrap, variant.id);

  // Drop hint — fusion progress only (keep it minimal)
  const hintEl = document.getElementById('char-drop-hint');
  const dupeCount = state.collection.filter(
    e => e.id === character.id && (e.variant || 'standard') === variant.id
  ).length;
  if (dupeCount === 2 && VARIANT_NEXT[variant.id]) {
    hintEl.textContent = `2 of 3 — one more to fuse into ${VARIANT_NEXT[variant.id]}`;
  } else {
    hintEl.textContent = '';
  }

  // Reset egg
  const egg = document.getElementById('hatch-egg');
  egg.style.transition  = 'none';
  egg.style.opacity     = '1';
  egg.style.transform   = '';
  egg.style.animation   = 'eggPulse 2s ease-in-out infinite';

  // Reset cracks
  const cracks = document.getElementById('hatch-cracks');
  cracks.style.opacity    = '0';
  cracks.style.transition = 'none';
  ['hc1','hc2','hc3','hc4','hc5','hc1g','hc2g','hc3g'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.style.transition = 'none'; el.style.strokeDashoffset = '1'; }
  });

  // Reset UI — hide footer BEFORE setting character info to prevent name flash
  document.getElementById('hatch-footer').classList.remove('show');
  document.getElementById('milestone-toast').classList.remove('show', 'region-complete', 'region-unlock');

  // Reset region discover overlay
  const discoverOverlay = document.getElementById('region-discover-overlay');
  discoverOverlay.classList.remove('show', 'fade-out');
  discoverOverlay.style.transition = 'opacity .6s ease';

  // Character info (set after footer is hidden)
  document.getElementById('char-name').textContent   = character.name;
  document.getElementById('char-sub').textContent    = character.subtitle;

  // Resize particle canvas
  particleCanvas.width  = window.innerWidth;
  particleCanvas.height = window.innerHeight;

  // Reset speed lines + flash
  const flashEl = document.getElementById('flash');
  flashEl.style.background = '';
  flashEl.style.opacity    = '0';
  document.getElementById('speed-wrap').style.opacity = '0';

  // Restore hatch buttons (may have been hidden during nurture sequence)
  document.getElementById('btn-share').style.display           = '';
  document.getElementById('btn-see-collection').style.display  = '';
  document.getElementById('btn-focus-again').style.display     = '';
  document.getElementById('btn-nurture-continue').style.display = 'none';
}

function runHatchSequence() {
  const egg    = document.getElementById('hatch-egg');
  const cracks = document.getElementById('hatch-cracks');
  const wrap   = document.getElementById('char-wrap');
  const flash  = document.getElementById('flash');
  const speedW = document.getElementById('speed-wrap');

  // 1. Cracks at 1.6s
  setTimeout(() => {
    cracks.style.opacity    = '1';
    cracks.style.transition = 'opacity .1s';
    animateCracks();
    SFX.crack();
    Haptic.light();
  }, 1600);

  setTimeout(() => { SFX.crack(0.55); Haptic.tap(); }, 1920);

  // 2. Shake at 2.2s
  setTimeout(() => { shakeEgg(egg); SFX.rumble(); Haptic.rumble(); }, 2200);

  // 3. BURST at 3.0s
  setTimeout(() => {
    SFX.burst(state.hatch.character.rarity);
    Haptic.heavy();
    // Flash
    flash.style.opacity = '1';
    setTimeout(() => {
      flash.style.transition = 'opacity .5s ease';
      flash.style.opacity    = '0';
    }, 55);

    // Speed lines
    buildSpeedLines();
    speedW.style.transition = 'opacity .5s ease';
    speedW.style.opacity    = '1';
    setTimeout(() => { speedW.style.opacity = '0'; }, 480);

    // Particles
    const rect = document.getElementById('hatch-egg-wrap').getBoundingClientRect();
    spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    tickParticles();

    // Hide egg, show character (or keep hidden if guest is blocked)
    egg.style.transition    = 'opacity .15s ease';
    egg.style.opacity       = '0';
    cracks.style.opacity    = '0';
    if (!state.hatch.guestBlocked) {
      wrap.style.transition   = 'opacity .4s ease .1s';
      wrap.style.opacity      = '1';
      // Character glow burst
      const char = state.hatch.character;
      const svg  = wrap.querySelector('svg');
      if (svg) {
        svg.style.filter     = `drop-shadow(0 0 28px ${char.accentColor}bb)`;
        svg.style.transition = 'filter 1.2s ease';
        setTimeout(() => {
          svg.style.filter = `drop-shadow(0 0 10px ${char.accentColor}44)`;
        }, 350);
      }
    }
  }, 3000);

  // 4. Show UI at 3.6s
  setTimeout(() => {
    if (state.hatch.guestBlocked) {
      maybeShowGuestPrompt();
    } else {
      document.getElementById('hatch-footer').classList.add('show');
      maybeShowGuestPrompt();
    }
  }, 3600);

  // 5. Region complete or milestone toast — appears after actions settle
  if (state.pendingRegionComplete) {
    const region = state.pendingRegionComplete;
    const label  = REGION_LABELS[region] || region;
    const total  = Object.values(CHARACTERS).filter(c => c.region === region).length;
    setTimeout(() => {
      document.getElementById('milestone-num').textContent = `${label} complete`;
      document.getElementById('milestone-msg').textContent = `all ${total} characters discovered`;
      const toast = document.getElementById('milestone-toast');
      toast.classList.add('show', 'region-complete');
      setTimeout(() => toast.classList.remove('show', 'region-complete'), 5000);
      state.pendingRegionComplete = null;
    }, 5000);
  } else if (state.pendingMilestone) {
    const m = state.pendingMilestone;
    setTimeout(() => {
      document.getElementById('milestone-num').textContent = m.label;
      document.getElementById('milestone-msg').textContent = m.msg;
      const toast = document.getElementById('milestone-toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 5000);
    }, 5000);
  }
}

function animateCracks() {
  const ids = ['hc1','hc2','hc3','hc4','hc5','hc1g','hc2g','hc3g'];
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => {
      el.style.transition      = `stroke-dashoffset ${200 + i * 55}ms ease`;
      el.style.strokeDashoffset = '0';
    }, i * 75);
  });
}

function shakeEgg(egg) {
  egg.style.animation = 'none';
  let i = 0;
  const shake = setInterval(() => {
    const tx = (Math.random() - .5) * 9;
    const ty = (Math.random() - .5) * 5;
    const rot = (Math.random() - .5) * 4;
    egg.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
    if (++i > 16) {
      clearInterval(shake);
      egg.style.transform = '';
    }
  }, 48);
}

// ── NURTURE COMPLETE SEQUENCE ────────────────────────────────────────────────
function prepareNurtureView(charId, progress) {
  const char = CHARACTERS[charId];
  const wrap = document.getElementById('char-wrap');

  // Show nurture image (creature holding egg) or fall back to portrait SVG
  if (NURTURE_IMAGES.has(charId)) {
    wrap.innerHTML = `<img src="/chars/${charId}_nurture.png" class="nurture-seq-img" alt="${char.nameShort}">`;
  } else {
    wrap.innerHTML = char.svg;
  }
  wrap.style.opacity   = '0';
  wrap.style.transition = 'none';

  // Hide egg + cracks — creature is the centerpiece, no egg to crack
  const egg = document.getElementById('hatch-egg');
  egg.style.opacity  = '0';
  egg.style.animation = 'none';
  document.getElementById('hatch-cracks').style.opacity = '0';

  // Footer text
  const left = EVOLUTION_SESSIONS - progress;
  document.getElementById('char-name').textContent = char.name;
  document.getElementById('char-sub').textContent  = left > 0
    ? `session ${progress} of ${EVOLUTION_SESSIONS} complete`
    : `${char.nameShort} is ready to evolve ✦`;
  document.getElementById('char-drop-hint').textContent = '';
  document.getElementById('hatch-footer').classList.remove('show');
  document.getElementById('milestone-toast').classList.remove('show', 'region-complete', 'region-unlock');

  // Show nurture continue button, hide hatch-specific buttons
  document.getElementById('btn-share').style.display          = 'none';
  document.getElementById('btn-see-collection').style.display = 'none';
  document.getElementById('btn-focus-again').style.display    = 'none';
  document.getElementById('btn-nurture-continue').style.display = '';

  // Flash stays white — reset background + opacity
  const flash = document.getElementById('flash');
  flash.style.background = '';
  flash.style.opacity    = '0';
  flash.style.transition = 'opacity .05s';
  document.getElementById('speed-wrap').style.opacity = '0';

  // Reset region overlay
  const discoverOverlay = document.getElementById('region-discover-overlay');
  discoverOverlay.classList.remove('show', 'fade-out');

  // Resize particle canvas
  particleCanvas.width  = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}

function runNurtureSequence(charId, progress) {
  const char  = CHARACTERS[charId];
  const wrap  = document.getElementById('char-wrap');
  const flash = document.getElementById('flash');
  const speedW = document.getElementById('speed-wrap');
  const art   = wrap.querySelector('img, svg');

  // Creature fades in immediately with a soft glow
  wrap.style.transition = 'opacity .6s ease';
  wrap.style.opacity    = '1';
  if (art) {
    art.style.filter     = `drop-shadow(0 0 18px ${char.accentColor}77)`;
    art.style.transition = 'filter .6s ease';
  }

  // 1. Shake at 0.8s — creature pulses with energy
  setTimeout(() => {
    shakeElement(wrap);
    SFX.rumble();
    Haptic.rumble();
  }, 800);

  // 2. BURST at 1.4s
  setTimeout(() => {
    SFX.nurtureProgress();
    Haptic.heavy();

    // Flash
    flash.style.opacity = '1';
    setTimeout(() => {
      flash.style.transition = 'opacity .5s ease';
      flash.style.opacity    = '0';
    }, 55);

    // Speed lines in accent color
    buildNurtureSpeedLines(char.accentColor);
    speedW.style.transition = 'opacity .5s ease';
    speedW.style.opacity    = '1';
    setTimeout(() => { speedW.style.opacity = '0'; }, 480);

    // Particles in accent color
    const rect = document.getElementById('hatch-egg-wrap').getBoundingClientRect();
    spawnNurtureParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, char.accentColor);
    tickParticles();

    // Big glow burst on creature, then settles
    if (art) {
      art.style.filter = `drop-shadow(0 0 42px ${char.accentColor}cc)`;
      setTimeout(() => {
        art.style.transition = 'filter 1.2s ease';
        art.style.filter     = `drop-shadow(0 0 14px ${char.accentColor}55)`;
      }, 350);
    }
  }, 1400);

  // 3. Show footer at 2.2s
  setTimeout(() => {
    document.getElementById('hatch-footer').classList.add('show');
    maybeShowGuestPrompt();
  }, 2200);
}

function shakeElement(el) {
  let i = 0;
  const shake = setInterval(() => {
    const tx  = (Math.random() - .5) * 9;
    const ty  = (Math.random() - .5) * 5;
    const rot = (Math.random() - .5) * 4;
    el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
    if (++i > 16) {
      clearInterval(shake);
      el.style.transform = '';
    }
  }, 48);
}

function buildNurtureSpeedLines(accentColor) {
  const svg = document.getElementById('speed-svg');
  svg.innerHTML = '';
  const cx = 400, cy = 400;
  for (let i = 0; i < 96; i++) {
    const a     = (i / 96) * Math.PI * 2 + (Math.random() - .5) * .06;
    const inner = 50 + Math.random() * 50;
    const outer = 340 + Math.random() * 240;
    const line  = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', cx + Math.cos(a) * inner);
    line.setAttribute('y1', cy + Math.sin(a) * inner);
    line.setAttribute('x2', cx + Math.cos(a) * outer);
    line.setAttribute('y2', cy + Math.sin(a) * outer);
    line.setAttribute('stroke', i % 6 === 0 ? accentColor : i % 9 === 0 ? '#fff' : '#080810');
    line.setAttribute('stroke-width', .5 + Math.random() * 2.5);
    line.setAttribute('opacity', .35 + Math.random() * .6);
    svg.appendChild(line);
  }
}

function spawnNurtureParticles(cx, cy, accentColor) {
  for (let i = 0; i < 110; i++) {
    const a   = Math.random() * Math.PI * 2;
    const spd = 2 + Math.random() * 10;
    const big = Math.random() > .85;
    parts.push({
      x: cx, y: cy,
      vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
      r: big ? 4 + Math.random() * 5 : 1.5 + Math.random() * 3,
      color: Math.random() > .38 ? accentColor : '#080810',
      alpha: 1, decay: .013 + Math.random() * .024,
      trail: [], trailLen: big ? 11 : 5,
      gravity: .08
    });
  }
  // Glowing orbs in accent color (no egg shards — no egg to break)
  for (let i = 0; i < 16; i++) {
    const a   = (i / 16) * Math.PI * 2 + (Math.random() - .5) * .3;
    const spd = 2 + Math.random() * 6;
    parts.push({
      x: cx, y: cy,
      vx: Math.cos(a) * spd * .8, vy: Math.sin(a) * spd - 2,
      r: 4 + Math.random() * 10,
      color: accentColor,
      alpha: 1, decay: .018,
      trail: [], trailLen: 8,
      gravity: .10
    });
  }
}

// ── SPEED LINES ──────────────────────────────────────────────────────────────
function buildSpeedLines() {
  const svg = document.getElementById('speed-svg');
  svg.innerHTML = '';
  const cx = 400, cy = 400;
  for (let i = 0; i < 96; i++) {
    const a     = (i / 96) * Math.PI * 2 + (Math.random() - .5) * .06;
    const inner = 50 + Math.random() * 50;
    const outer = 340 + Math.random() * 240;
    const line  = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', cx + Math.cos(a) * inner);
    line.setAttribute('y1', cy + Math.sin(a) * inner);
    line.setAttribute('x2', cx + Math.cos(a) * outer);
    line.setAttribute('y2', cy + Math.sin(a) * outer);
    line.setAttribute('stroke', i % 6 === 0 ? '#0047ff' : i % 9 === 0 ? '#00e5ff' : '#080810');
    line.setAttribute('stroke-width', .5 + Math.random() * 2.5);
    line.setAttribute('opacity', .35 + Math.random() * .6);
    svg.appendChild(line);
  }
}

// ── PARTICLE SYSTEM ───────────────────────────────────────────────────────────
function spawnParticles(cx, cy) {
  for (let i = 0; i < 110; i++) {
    const a    = Math.random() * Math.PI * 2;
    const spd  = 2 + Math.random() * 10;
    const blue = Math.random() > .38;
    const big  = Math.random() > .85;
    parts.push({
      x: cx, y: cy,
      vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
      r: big ? 4 + Math.random() * 5 : 1.5 + Math.random() * 3,
      color: blue ? (Math.random() > .5 ? '#00e5ff' : '#0047ff') : '#080810',
      alpha: 1, decay: .013 + Math.random() * .024,
      trail: [], trailLen: big ? 11 : 5,
      gravity: .08
    });
  }
  // Egg shards
  for (let i = 0; i < 20; i++) {
    const a   = (i / 20) * Math.PI * 2 + (Math.random() - .5) * .3;
    const spd = 3 + Math.random() * 7;
    parts.push({
      x: cx, y: cy,
      vx: Math.cos(a) * spd * .8, vy: Math.sin(a) * spd - 2.5,
      r: 5 + Math.random() * 13,
      color: '#f0ebe0', stroke: '#080810',
      alpha: 1, decay: .02,
      trail: [], trailLen: 0,
      gravity: .18, rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - .5) * .14,
      isShard: true
    });
  }
}

function tickParticles() {
  px.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  parts.forEach(p => {
    p.trail.push({ x: p.x, y: p.y });
    if (p.trail.length > p.trailLen) p.trail.shift();
    p.x  += p.vx; p.y  += p.vy;
    p.vx *= .93;  p.vy *= .93;
    p.vy += p.gravity;
    p.alpha -= p.decay;
    if (p.isShard) p.rot += p.vrot;

    px.save();
    px.globalAlpha = Math.max(0, p.alpha);

    if (p.isShard) {
      px.translate(p.x, p.y); px.rotate(p.rot);
      px.beginPath();
      px.moveTo(0, -p.r); px.lineTo(p.r * .4, p.r); px.lineTo(-p.r * .4, p.r);
      px.closePath();
      px.fillStyle   = p.color; px.fill();
      px.strokeStyle = p.stroke || '#080810';
      px.lineWidth   = 1.5; px.stroke();
    } else {
      if (p.trail.length > 1) {
        px.beginPath();
        px.moveTo(p.trail[0].x, p.trail[0].y);
        p.trail.forEach(pt => px.lineTo(pt.x, pt.y));
        px.lineTo(p.x, p.y);
        px.strokeStyle  = p.color;
        px.lineWidth    = p.r * .75;
        px.lineCap      = 'round';
        px.globalAlpha  = Math.max(0, p.alpha * .45);
        px.stroke();
      }
      px.globalAlpha = Math.max(0, p.alpha);
      px.beginPath();
      px.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      px.fillStyle = p.color; px.fill();
    }
    px.restore();
  });
  parts = parts.filter(p => p.alpha > 0);
  if (parts.length > 0) requestAnimationFrame(tickParticles);
  else px.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
}

// ── PUBLIC PROFILE ────────────────────────────────────────────────────────────
let profileFilter = 'all';

async function showPublicProfile(slug) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-profile').classList.add('active');
  document.getElementById('profile-title').textContent = 'loading...';
  // Hide mute button — no sound on public profile
  const muteBtn = document.getElementById('btn-mute');
  if (muteBtn) { muteBtn.style.opacity = '0'; muteBtn.style.pointerEvents = 'none'; }
  initModalListeners();
  document.body.style.opacity = '1';

  const profile = await DB.loadPublicProfile(slug);
  if (!profile) {
    document.getElementById('profile-title').textContent = 'profile not found';
    return;
  }

  const collection = await DB.loadPublicCollection(profile.id) || [];

  // Header
  document.getElementById('profile-title').textContent =
    profile.name ? `${profile.name}'s collection` : 'collection';

  // Stats
  const statsEl = document.getElementById('profile-stats');
  if (statsEl) {
    const owned = new Set(collection.map(e => e.id)).size;
    const mins  = profile.total_minutes || 0;
    statsEl.innerHTML =
      `<span><span class="cs-frac">${owned}</span><span class="cs-total"> characters</span></span>` +
      `<span class="cs-sep">·</span>` +
      `<span>${profile.session_count || 0} sessions</span>` +
      `<span class="cs-sep">·</span>` +
      `<span>${formatHours(mins)} focused</span>`;
  }

  // Earned badges strip
  const profileBadges = (profile.badges || []);
  const badgesEl = document.getElementById('profile-badges');
  if (badgesEl && profileBadges.length > 0) {
    badgesEl.innerHTML = profileBadges.map(b => {
      const def = BADGES.find(d => d.id === b.id);
      return def ? `<span class="profile-badge-chip" title="${def.desc}">${def.icon} ${def.name}</span>` : '';
    }).join('');
  }

  renderProfileGrid(collection, 'all');
  renderProfileTabs(collection);
}

function renderProfileTabs(collection) {
  const tabsEl = document.getElementById('profile-tabs');
  if (!tabsEl) return;

  // Show tabs for regions the owner has at least one character from
  const ownedRegions = new Set(collection.map(e => CHARACTERS[e.id]?.region).filter(Boolean));
  const tabs = ['all', ...REGION_UNLOCK_ORDER.filter(r => ownedRegions.has(r))];

  tabsEl.innerHTML = '';
  tabs.forEach(region => {
    const btn = document.createElement('button');
    btn.className = 'region-btn' + (region === profileFilter ? ' active' : '');
    btn.dataset.region = region;
    const label = region === 'all' ? 'all' : REGION_LABELS[region];
    btn.textContent = label;
    btn.addEventListener('click', () => {
      profileFilter = region;
      tabsEl.querySelectorAll('.region-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.region === region)
      );
      renderProfileGrid(collection, region);
    });
    tabsEl.appendChild(btn);
  });
}

function renderProfileGrid(collection, filter) {
  const grid = document.getElementById('profile-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Build variant counts
  const variantCounts = {};
  collection.forEach(e => {
    if (!variantCounts[e.id]) variantCounts[e.id] = { standard: 0, gold: 0, crimson: 0, void: 0 };
    const v = e.variant || 'standard';
    variantCounts[e.id][v] = (variantCounts[e.id][v] || 0) + 1;
  });

  const ownedIds = new Set(collection.map(e => e.id));

  // Only show characters from regions the owner has discovered (owns ≥1 char from)
  const ownedRegions = new Set(collection.map(e => CHARACTERS[e.id]?.region).filter(Boolean));

  // Sort: owned newest-first, locked at end
  const latestTs = {};
  collection.forEach(e => {
    if (!latestTs[e.id] || e.timestamp > latestTs[e.id]) latestTs[e.id] = e.timestamp;
  });

  const allIds = Object.keys(CHARACTERS)
    .filter(id => ownedRegions.has(CHARACTERS[id]?.region))
    .sort((a, b) => {
      const tsA = latestTs[a] || 0, tsB = latestTs[b] || 0;
      if (tsA && tsB) return tsB - tsA;
      if (tsA) return -1;
      if (tsB) return 1;
      return 0;
    });

  allIds.forEach(id => {
    const char = CHARACTERS[id];
    if (!char) return;
    if (filter !== 'all' && char.region !== filter) return;
    if (!ownedIds.has(id)) return; // profile only shows what's actually collected

    const vc = variantCounts[id] || {};
    const rarestOwned = [...VARIANTS].reverse().find(v => (vc[v.id] || 0) > 0) || VARIANTS[0];

    const card = document.createElement('div');
    card.className = 'char-card';

    const art = document.createElement('div');
    art.className = 'card-art';
    art.innerHTML = char.svg;
    applyVariantFilter(art, rarestOwned.id);
    card.appendChild(art);

    const variantDots = VARIANTS.map(v => {
      const owned = (vc[v.id] || 0) > 0;
      return `<span class="var-dot ${owned ? 'owned' : ''}" style="background:${v.color}"></span>`;
    }).join('');

    const info = document.createElement('div');
    info.className = 'card-info';
    info.innerHTML = `
      <div class="card-name">${charNameEn(char)}</div>
      <div class="card-rarity">${char.rarity}</div>
      <div class="card-variants">${variantDots}</div>
    `;
    card.appendChild(info);
    card.addEventListener('click', () => openCardModal(id, vc));
    grid.appendChild(card);
  });
}

// ── COLLECTION ────────────────────────────────────────────────────────────────
function renderCollection() {
  const grid = document.getElementById('collection-grid');
  grid.innerHTML = '';
  grid.classList.remove('badge-mode');

  renderCollectionStats();

  // Update region tab active state
  document.querySelectorAll('.region-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.region === state.filter);
  });

  // Preview mode indicator (removed for production)

  // Guard: if the current filter is a locked region, reset to 'all'
  const unlockedRegions = getUnlockedRegions();
  if (state.filter !== 'all' && !unlockedRegions.has(state.filter)) {
    state.filter = 'all';
    document.querySelectorAll('.region-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.region === 'all')
    );
  }

  // Count per character, broken down by variant
  const variantCounts = {}; // { id: { standard: N, gold: N, crimson: N, void: N } }
  state.collection.forEach(e => {
    if (!variantCounts[e.id]) variantCounts[e.id] = { standard: 0, gold: 0, crimson: 0, void: 0 };
    const v = e.variant || 'standard'; // backward compat
    variantCounts[e.id][v] = (variantCounts[e.id][v] || 0) + 1;
  });

  // Completion banner for a fully-discovered region
  if (state.filter !== 'all') {
    const ownedIds = new Set(state.collection.map(e => e.id));
    const regionChars = Object.values(CHARACTERS).filter(c => c.region === state.filter);
    const allFound = regionChars.length > 0 && regionChars.every(c => ownedIds.has(c.id));
    if (allFound) {
      // Determine next goal in priority order
      const evolvable = regionChars.filter(c => EVOLUTIONS[c.id]);
      const allEvolved = evolvable.length === 0 || evolvable.every(c => state.evolvedCreatures.includes(c.id));
      const allGold    = regionChars.every(c => (variantCounts[c.id]?.gold || 0) > 0);
      const allCrimson = regionChars.every(c => (variantCounts[c.id]?.crimson || 0) > 0);
      const allVoid    = regionChars.every(c => (variantCounts[c.id]?.void || 0) > 0);

      const evolvedCount = evolvable.filter(c => state.evolvedCreatures.includes(c.id)).length;

      let msg;
      if (!allEvolved) {
        msg = evolvedCount === 0
          ? `you got them all — try evolving them next`
          : `${evolvedCount} of ${evolvable.length} evolved — keep going`;
      } else if (!allGold) {
        const goldCount = regionChars.filter(c => (variantCounts[c.id]?.gold || 0) > 0).length;
        msg = goldCount === 0
          ? `all evolved — hunt for gold variants`
          : `${goldCount} of ${regionChars.length} gold — keep hunting`;
      } else if (!allCrimson) {
        const crimsonCount = regionChars.filter(c => (variantCounts[c.id]?.crimson || 0) > 0).length;
        msg = crimsonCount === 0
          ? `all gold — try for crimson next`
          : `${crimsonCount} of ${regionChars.length} crimson — keep going`;
      } else if (!allVoid) {
        const voidCount = regionChars.filter(c => (variantCounts[c.id]?.void || 0) > 0).length;
        msg = voidCount === 0
          ? `all crimson — try for void next`
          : `${voidCount} of ${regionChars.length} void — almost there`;
      } else {
        msg = `${REGION_LABELS[state.filter] || state.filter} mastered ✦`;
      }

      const banner = document.createElement('div');
      banner.className = 'region-complete-banner';
      banner.textContent = msg;
      grid.appendChild(banner);
    }
  }

  // Most recently collected first, locked cards at the end
  const latestTs = {}; // charId → most recent timestamp
  state.collection.forEach(e => {
    if (!latestTs[e.id] || e.timestamp > latestTs[e.id]) latestTs[e.id] = e.timestamp;
  });

  const allIds = Object.keys(CHARACTERS).sort((a, b) => {
    const tsA = latestTs[a] || 0;
    const tsB = latestTs[b] || 0;
    if (tsA && tsB) return tsB - tsA;   // both owned — newest first
    if (tsA) return -1;                 // a owned, b locked — a first
    if (tsB) return 1;                  // b owned, a locked — b first
    return 0;                           // both locked — keep original order
  });

  allIds.forEach(id => {
    const char  = getDisplayCharacter(id);
    if (!char) return;

    // Region filter
    if (state.filter !== 'all' && char.region !== state.filter) return;
    // Hide locked-region characters from the "all" tab entirely (world hasn't been discovered yet)
    if (state.filter === 'all' && !unlockedRegions.has(char.region)) return;

    const vc      = variantCounts[id] || {};
    const count   = Object.values(vc).reduce((s, n) => s + n, 0);
    const unlocked = count > 0 || state.previewAll;

    const card = document.createElement('div');
    card.className = unlocked ? 'char-card' : 'char-card locked';
    if (state.previewAll && count === 0) card.style.opacity = '.55';

    if (unlocked) {
      // Art — colour-filtered by the rarest variant owned
      const rarestOwned = [...VARIANTS].reverse().find(v => (vc[v.id] || 0) > 0) || VARIANTS[0];
      const art = document.createElement('div');
      art.className = 'card-art';
      art.innerHTML = char.svg;
      applyVariantFilter(art, rarestOwned.id);
      card.appendChild(art);

      card.style.position = 'relative';

      // Count badge (only for real earned dupes)
      if (count > 1) {
        const badge = document.createElement('span');
        badge.className   = 'card-count';
        badge.textContent = `× ${count}`;
        card.appendChild(badge);
      }

      // Evolved corner marker
      if (isEvolved(id)) {
        const evo = document.createElement('span');
        evo.className = 'card-evolved-mark';
        evo.textContent = '✦';
        evo.style.color = char.accentColor;
        card.appendChild(evo);
      }

      // Tooltip — haiku only on small card; lore lives in the modal
      if (char.haiku) {
        const tip = document.createElement('div');
        tip.className = 'card-tooltip';
        tip.innerHTML = `<div class="tip-haiku">${char.haiku}</div>`;
        card.appendChild(tip);
      }

      // Variant dots — show which variants the player has collected
      const variantDots = VARIANTS.map(v => {
        const owned = (vc[v.id] || 0) > 0;
        const n     = vc[v.id] || 0;
        return `<span class="var-dot ${owned ? 'owned' : ''}" style="background:${v.color}" title="${v.label}${n > 1 ? ' ×' + n : ''}"></span>`;
      }).join('');

      // English name: use charNameEn to handle Japanese-first vs English-first names
      const nameEn = charNameEn(char);

      // Info
      const info = document.createElement('div');
      info.className = 'card-info';
      info.innerHTML = `
        <div class="card-name">${nameEn}</div>
        <div class="card-rarity">${char.rarity}</div>
        <div class="card-variants">${variantDots}</div>
      `;
      card.appendChild(info);

      // Click → open modal
      card.addEventListener('click', () => openCardModal(id, vc));
    } else {
      // Locked — show silhouette of the character for mystery/desire
      const art = document.createElement('div');
      art.className = 'card-art';
      art.innerHTML = char.svg;
      card.appendChild(art);
      const info = document.createElement('div');
      info.className = 'card-info';
      info.innerHTML = `<div class="card-name" style="opacity:.22">???</div>`;
      card.appendChild(info);
    }

    grid.appendChild(card);
  });
}

// ── CARD MODAL ────────────────────────────────────────────────────────────────
let modalChar          = null;
let modalVc            = null;
let modalOwnedVariants = [];
let modalVariantIndex  = 0;

function charNameEn(char) {
  if (!char.name.includes('·')) return char.name;
  const parts = char.name.split('·').map(s => s.trim());
  // If first part is ASCII (English first), use it; otherwise use last part
  return /^[A-Za-z0-9'\-\s]+$/.test(parts[0]) ? parts[0] : parts[parts.length - 1];
}

function openCardModal(charId, vc) {
  const baseChar = CHARACTERS[charId];
  if (!baseChar) return;

  // Use evolved version for display if applicable
  const char = getDisplayCharacter(charId);

  modalChar          = char;
  modalVc            = vc;
  modalOwnedVariants = VARIANTS.filter(v => (vc[v.id] || 0) > 0);
  // Start on rarest owned variant
  modalVariantIndex  = Math.max(0, modalOwnedVariants.length - 1);

  const nameEn = charNameEn(char);

  // Reset flip state
  document.getElementById('modal-card').classList.remove('flipped');
  const hint = document.querySelector('.flip-hint');
  if (hint) hint.classList.remove('hidden');

  // Front: art (filter applied in renderModalVariantNav after variant is known)
  const modalArtEl = document.getElementById('modal-art');
  modalArtEl.innerHTML = char.svg;
  const DARK_ART_EVOLVED = ['raijin_wolf_evolved','kyubi_evolved','jorogumo_evolved','tsuru_evolved'];
  modalArtEl.classList.toggle('dark-art', DARK_ART_EVOLVED.includes(char.id));
  // Evolved corner marker
  const existingEvoMark = modalArtEl.querySelector('.modal-evolved-mark');
  if (existingEvoMark) existingEvoMark.remove();
  if (isEvolved(charId)) {
    const mark = document.createElement('span');
    mark.className = 'modal-evolved-mark';
    mark.textContent = '✦';
    mark.style.color = char.accentColor;
    modalArtEl.appendChild(mark);
  }

  // Back: lore + haiku + meta
  document.getElementById('modal-back-name').textContent = nameEn;
  document.getElementById('modal-back-lore').textContent  = char.lore  || '';
  document.getElementById('modal-back-haiku').innerHTML   = char.haiku || '';

  // Date first collected
  const entries = state.collection.filter(e => e.id === charId && e.timestamp);
  const firstTs = entries.length ? Math.min(...entries.map(e => e.timestamp)) : null;
  document.getElementById('modal-back-date').textContent = firstTs
    ? 'collected ' + new Date(firstTs).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  // Info strip
  document.getElementById('modal-name').textContent = nameEn;
  document.getElementById('modal-sub').textContent  = char.subtitle;

  // Pin button — only show if creature can evolve and hasn't yet
  const pinBtn = document.getElementById('modal-pin-btn');
  if (pinBtn) {
    const canEvolve = EVOLUTIONS[charId] && !isEvolved(charId);
    if (canEvolve) {
      pinBtn.style.display = '';
      const timerRunning = state.timer.running;
      const isPinned = state.pinnedCreature === charId;
      if (timerRunning) {
        pinBtn.textContent = isPinned ? 'nurturing · timer running' : 'timer is running';
        pinBtn.disabled = true;
        pinBtn.onclick = null;
      } else {
        pinBtn.disabled = false;
        pinBtn.textContent = isPinned ? 'unpin' : 'nurture';
        pinBtn.onclick = () => {
          if (state.pinnedCreature === charId) {
            unpinCreature();
            pinBtn.textContent = 'nurture';
          } else {
            pinCreature(charId);
            closeCardModal();
            navigateTo('timer');
          }
        };
      }
    } else {
      pinBtn.style.display = 'none';
    }
  }

  // Nurture progress block — only for evolvable, not-yet-evolved creatures
  const nurtureEl = document.getElementById('modal-back-nurture');
  if (nurtureEl) {
    const canEvolve = EVOLUTIONS[charId] && !isEvolved(charId);
    if (canEvolve) {
      const progress = state.evolutionSessions[charId] || 0;
      const left = Math.max(EVOLUTION_SESSIONS - progress, 0);
      nurtureEl.textContent = `evolves in ${left} session${left !== 1 ? 's' : ''}`;
      nurtureEl.style.display = '';
    } else {
      nurtureEl.style.display = 'none';
    }
  }

  renderModalVariantNav();
  document.getElementById('card-modal').classList.add('open');
}

function renderModalVariantNav() {
  const variant = modalOwnedVariants[modalVariantIndex] || VARIANTS[0];
  updateModalRarity(modalChar, variant);
  applyVariantFilter(document.getElementById('modal-art'), variant.id);

  // Update rarity odds on card back for current variant
  document.getElementById('modal-back-odds').textContent = calcDropOdds(modalChar.rarity, variant.id);

  const nav = document.getElementById('modal-var-nav');
  if (modalOwnedVariants.length < 2) { nav.style.display = 'none'; return; }

  // Build dot indicators — one per owned variant
  nav.style.display = 'flex';
  nav.innerHTML = modalOwnedVariants.map((v, i) => {
    const active = i === modalVariantIndex ? ' active' : '';
    const col = v.color;
    return `<button class="modal-var-dot${active}" data-vi="${i}" style="border-color:${col};${active ? `background:${col};` : ''}" title="${v.label}"></button>`;
  }).join('');

  nav.querySelectorAll('.modal-var-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      modalVariantIndex = parseInt(dot.dataset.vi, 10);
      renderModalVariantNav();
    });
  });
}

function stepModalVariant(dir) {
  const newIdx = modalVariantIndex + dir;
  if (newIdx < 0 || newIdx >= modalOwnedVariants.length) return;
  modalVariantIndex = newIdx;
  renderModalVariantNav();
}
// kept for keyboard/swipe support

function updateModalRarity(char, variant) {
  const rarityTag  = document.getElementById('modal-rarity-tag');
  const variantTag = document.getElementById('modal-variant-tag');

  rarityTag.textContent = char.rarityLabel.replace(/[◇◈✦]\s*/g, '');
  rarityTag.style.color = char.rarity === 'legendary' ? '#b8860b'
                        : char.rarity === 'rare'      ? '#6a7b8b'
                        : 'inherit';

  variantTag.textContent = variant.label;
  variantTag.style.color = variant.color;
}

function initModalListeners() {
  document.getElementById('modal-close').addEventListener('click', closeCardModal);
  document.getElementById('card-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeCardModal();
  });
  document.getElementById('modal-card').addEventListener('click', () => {
    document.getElementById('modal-card').classList.toggle('flipped');
    const hint = document.querySelector('.flip-hint');
    if (hint) hint.classList.add('hidden');
  });
}

function closeCardModal() {
  document.getElementById('card-modal').classList.remove('open');
  document.getElementById('modal-card').classList.remove('flipped');
  // iOS PWA: re-enable scroll on the view underneath after modal closes
  const view = document.querySelector('.view.active');
  if (view) { view.style.overflow = 'hidden'; requestAnimationFrame(() => { view.style.overflow = ''; }); }
}

// ── ONBOARDING ────────────────────────────────────────────────────────────────
function getUserName() {
  return localStorage.getItem('focus-name') || '';
}

function saveName(name) {
  localStorage.setItem('focus-name', name.trim());
}

function updateCollectionTitle() {
  const el = document.getElementById('collection-title');
  if (!el) return;
  const name = getUserName();
  el.textContent = name ? `${name}'s collection` : 'collection';
}

function rollWelcomeCharacter() {
  // First session is always a Japanese common character (Japan is the starting region)
  const pool = RARITY_WEIGHTS.find(t => t.rarity === 'common').pool
    .filter(id => CHARACTERS[id]?.region === 'japanese');
  const id = pool[Math.floor(Math.random() * pool.length)];
  return { character: CHARACTERS[id], variant: VARIANTS[0] }; // always standard
}

// Duration-based rarity boost: longer sessions = better odds
// 25 min: base (65/28/7), 45 min: (58/33/9), 60 min: (52/36/12)
function getDurationBoost(durationSecs) {
  const mins = durationSecs / 60;
  if (mins >= 60) return { rarityShift: [-13, 8, 5], variantBoost: 2.0 };
  if (mins >= 45) return { rarityShift: [-7, 5, 2],  variantBoost: 1.5 };
  return { rarityShift: [0, 0, 0], variantBoost: 1.0 };
}

function rollBoostedVariant(boost) {
  // Boost gold/crimson/void weights while keeping standard as the remainder
  const boosted = VARIANTS.map((v, i) => ({
    ...v,
    weight: i === 0 ? v.weight : v.weight * boost,
  }));
  const total = boosted.reduce((s, v) => s + v.weight, 0);
  const roll = Math.random() * total;
  let cumulative = 0;
  for (const v of boosted) {
    cumulative += v.weight;
    if (roll < cumulative) return VARIANTS.find(orig => orig.id === v.id);
  }
  return VARIANTS[0];
}

function weightedPickFromPool(pool, lastCharId) {
  // Reduce odds of getting the same character as last hatch
  const weights = pool.map(id => id === lastCharId ? 0.25 : 1);
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

function rollFromRegion(region, durationSecs) {
  const { rarityShift, variantBoost } = getDurationBoost(durationSecs || 25 * 60);
  const lastCharId = state.collection.length ? state.collection[state.collection.length - 1].id : null;
  const weights = RARITY_WEIGHTS.map((t, i) => ({
    ...t,
    weight: t.weight + (rarityShift[i] || 0),
  }));
  const roll = Math.random() * 100;
  let cumulative = 0;
  for (const tier of weights) {
    cumulative += tier.weight;
    if (roll < cumulative) {
      const pool = tier.pool.filter(id => CHARACTERS[id]?.region === region);
      if (pool.length) {
        return { character: CHARACTERS[weightedPickFromPool(pool, lastCharId)], variant: rollBoostedVariant(variantBoost) };
      }
    }
  }
  const allIds = Object.values(CHARACTERS).filter(c => c.region === region).map(c => c.id);
  return { character: CHARACTERS[weightedPickFromPool(allIds, lastCharId)], variant: rollBoostedVariant(variantBoost) };
}

function rollCharacterInUnlockedRegions(durationSecs) {
  const unlocked = getUnlockedRegions();
  const { rarityShift, variantBoost } = getDurationBoost(durationSecs || 25 * 60);
  const lastCharId = state.collection.length ? state.collection[state.collection.length - 1].id : null;

  const weights = RARITY_WEIGHTS.map((t, i) => ({
    ...t,
    weight: t.weight + (rarityShift[i] || 0),
  }));

  const roll = Math.random() * 100;
  let cumulative = 0;
  for (const tier of weights) {
    cumulative += tier.weight;
    if (roll < cumulative) {
      const pool = tier.pool.filter(id => unlocked.has(CHARACTERS[id]?.region));
      if (pool.length) {
        return { character: CHARACTERS[weightedPickFromPool(pool, lastCharId)], variant: rollBoostedVariant(variantBoost) };
      }
    }
  }
  // Fallback: any character from any unlocked region
  const allIds = Object.values(CHARACTERS).filter(c => unlocked.has(c.region)).map(c => c.id);
  return { character: CHARACTERS[weightedPickFromPool(allIds, lastCharId)], variant: rollBoostedVariant(variantBoost) };
}

function startOnboarding() {
  const { character, variant } = rollWelcomeCharacter();
  state.hatch.character = character;
  state.hatch.variant   = variant;
  state.onboarding      = true;
  addToCollection(character, variant);

  // Customise the hatch CTA for onboarding
  document.getElementById('btn-share').style.display = 'none';
  document.getElementById('btn-focus-again').innerHTML  = '<span>begin your journey</span>';
  document.getElementById('btn-see-collection').innerHTML = '<span>see your collection</span>';

  prepareHatchView(character, variant);
  navigateTo('hatch');
  setTimeout(runHatchSequence, 400);
}

function finishOnboarding() {
  state.onboarding = false;
  // Restore normal hatch button labels
  document.getElementById('btn-share').style.display = '';
  document.getElementById('btn-focus-again').innerHTML  = '<span>focus again</span>';
  document.getElementById('btn-see-collection').innerHTML = '<span>collection</span>';
  resetTimerState();
  navigateTo('timer');
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
function requestNotificationPermission() {
  if (!('Notification' in window) || Notification.permission !== 'default') return;
  Notification.requestPermission();
}

function notifySessionComplete() {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  if (!document.hidden) return; // tab is visible — no need
  const isNurturing = state.pinnedCreature && EVOLUTIONS[state.pinnedCreature] && !isEvolved(state.pinnedCreature);
  const body = isNurturing
    ? `${CHARACTERS[state.pinnedCreature].nameShort} nurtured · session complete 🥚`
    : 'Session complete — your creature is ready to hatch 🥚';
  new Notification('Kokoon', {
    body,
    icon: '/icon.svg',
    tag:  'focus-complete',
    renotify: false
  });
}

// ── SHARE CARD ────────────────────────────────────────────────────────────────
const VARIANT_CANVAS_FILTER = {
  gold:    'sepia(.48) saturate(2.6) hue-rotate(8deg) brightness(1.1)',
  crimson: 'sepia(.52) saturate(3.2) hue-rotate(-22deg) brightness(1.04)',
  void:    'hue-rotate(255deg) saturate(2.6) brightness(1.45) contrast(1.08)',
};

async function generateShareCard(char, variant) {
  const W = 400, H = 520;
  const canvas = document.createElement('canvas');
  canvas.width  = W * 2; // 2× for retina
  canvas.height = H * 2;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);

  // Background
  ctx.fillStyle = '#080810';
  ctx.fillRect(0, 0, W, H);

  // Void nebula patch in art area
  if (variant.id === 'void') {
    const grad = ctx.createRadialGradient(W / 2, 195, 0, W / 2, 195, 180);
    grad.addColorStop(0,    '#2a0a4e');
    grad.addColorStop(0.45, '#0e0420');
    grad.addColorStop(1,    '#080810');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 20, W, 340);
  }

  // Variant accent line at top
  ctx.fillStyle = variant.color + 'bb';
  ctx.fillRect(40, 12, W - 80, 2);

  // Draw creature art
  // If SVG references an external image (PNG characters), load the image directly;
  // otherwise render via SVG blob as before.
  const pngMatch = char.svg.match(/href="([^"]+\.png)"/);
  await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const filter = VARIANT_CANVAS_FILTER[variant.id];
      if (filter) ctx.filter = filter;
      const artW = 280, artH = 320;
      const artX = (W - artW) / 2;
      const artY = 28;
      ctx.drawImage(img, artX, artY, artW, artH);
      ctx.filter = 'none';
      if (!pngMatch) URL.revokeObjectURL(img.src);
      resolve();
    };
    img.onerror = () => { if (!pngMatch) URL.revokeObjectURL(img.src); resolve(); };
    if (pngMatch) {
      img.src = pngMatch[1];
    } else {
      const svgBlob = new Blob([char.svg], { type: 'image/svg+xml;charset=utf-8' });
      img.src = URL.createObjectURL(svgBlob);
    }
  });

  // Character name
  const nameEn = charNameEn(char);
  ctx.fillStyle = '#f7f2e8';
  ctx.font = `bold 26px 'Zen Antique Soft', serif`;
  ctx.textAlign = 'center';
  ctx.fillText(nameEn, W / 2, 386);

  // Subtitle
  ctx.fillStyle = 'rgba(247,242,232,.42)';
  ctx.font = `400 11px 'Noto Serif JP', serif`;
  ctx.letterSpacing = '0.08em';
  ctx.fillText(char.subtitle, W / 2, 404);

  // Rarity badge
  ctx.fillStyle = variant.color;
  ctx.font = `400 12px 'Noto Serif JP', serif`;
  ctx.fillText(char.rarityLabel + '  ·  ' + variant.label, W / 2, 432);

  // Divider
  ctx.strokeStyle = 'rgba(247,242,232,.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 452); ctx.lineTo(W - 80, 452);
  ctx.stroke();

  // Branding
  ctx.fillStyle = 'rgba(247,242,232,.28)';
  ctx.font = `200 13px 'Noto Serif JP', serif`;
  ctx.fillText('kokoon', W / 2, 478);

  // Outer border
  ctx.strokeStyle = variant.color + '28';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(8, 8, W - 16, H - 16);

  return canvas;
}

async function shareCollection() {
  const btn  = document.getElementById('btn-share-collection');
  const name = getUserName();
  btn.style.opacity = '.4';
  btn.disabled = true;

  try {
    const slug = await DB.getOrCreateSlug(name);
    if (!slug) { btn.style.opacity = ''; btn.disabled = false; return; }

    const url = `${window.location.origin}/app?profile=${slug}`;

    // On mobile use native share sheet (has Copy Link); on desktop copy to clipboard
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      await navigator.share({ title: `${name}'s Focus collection`, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
    }

    // Always show the "link copied" toast as confirmation
    let tooltip = document.getElementById('share-copied-tip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'share-copied-tip';
      tooltip.className = 'share-copied-tip';
      document.body.appendChild(tooltip);
    }
    tooltip.textContent = isMobile ? 'shared' : 'link copied';
    tooltip.classList.add('show');
    setTimeout(() => tooltip.classList.remove('show'), 2200);
  } catch(e) {}

  btn.style.opacity = '';
  btn.disabled = false;
}

async function shareCreature() {
  const { character: char, variant } = state.hatch;
  if (!char || !variant) return;

  const btn = document.getElementById('btn-share');
  btn.disabled = true;
  const origText = btn.querySelector('span').textContent;
  btn.querySelector('span').textContent = '...';

  try {
    const canvas = await generateShareCard(char, variant);
    const nameEn = charNameEn(char);
    const fileName = `focus-${char.id}-${variant.id}.png`;

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], fileName, { type: 'image/png' });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: `I hatched ${nameEn}!`,
            text:  `${char.rarityLabel} · ${variant.label} — Kokoon`,
            files: [file],
          });
        } catch (e) {
          if (e.name !== 'AbortError') downloadBlob(blob, fileName);
        }
      } else {
        downloadBlob(blob, fileName);
      }

      btn.disabled = false;
      btn.querySelector('span').textContent = origText;
    }, 'image/png');
  } catch (e) {
    btn.disabled = false;
    btn.querySelector('span').textContent = origText;
  }
}

async function shareFromModal() {
  const btn = document.getElementById('btn-modal-share');
  const char    = modalChar;
  const variant = modalOwnedVariants[modalVariantIndex] || VARIANTS[0];
  if (!char || !variant) return;

  btn.disabled = true;

  try {
    const canvas   = await generateShareCard(char, variant);
    const nameEn   = charNameEn(char);
    const fileName = `focus-${char.id}-${variant.id}.png`;

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], fileName, { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: `I collected ${nameEn}!`,
            text:  `${char.rarityLabel} · ${variant.label} — Kokoon`,
            files: [file],
          });
        } catch(e) {
          if (e.name !== 'AbortError') downloadBlob(blob, fileName);
        }
      } else {
        downloadBlob(blob, fileName);
      }
      btn.disabled = false;
    }, 'image/png');
  } catch(e) {
    btn.disabled = false;
  }
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href = url; a.download = fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ── SERVICE WORKER ────────────────────────────────────────────────────────────
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

// ── AUTH FLOW ─────────────────────────────────────────────────────────────────

function showAuthError(panel, msg) {
  const el = document.getElementById(panel === 'signin' ? 'si-error' : 'su-error');
  if (el) el.textContent = msg;
}
function clearAuthErrors() {
  ['si-error','su-error'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}
function setAuthLoading(btn, loading) {
  btn.disabled = loading;
  const span = btn.querySelector('span');
  if (!span) return;
  btn.dataset.origText = btn.dataset.origText || span.textContent;
  span.textContent = loading ? '...' : btn.dataset.origText;
}

async function performAppleSignIn() {
  const btn = document.getElementById('btn-apple');
  btn.disabled = true;
  document.getElementById('apple-error').textContent = '';
  try {
    const result = await DB.signInWithApple();
    // Apple only returns name on the very first sign-in — pre-seed localStorage
    // so handleSignedIn's new-user path picks it up and shows onboarding
    if (result?.appleName) {
      localStorage.setItem('focus-name', result.appleName);
    }
    await handleSignedIn(result.user);
  } catch(e) {
    const msg = e.message || 'apple sign-in failed';
    document.getElementById('apple-error').textContent = msg;
    btn.disabled = false;
  }
}

async function performGoogleSignIn() {
  const btn = document.getElementById('btn-google');
  btn.disabled = true;
  document.getElementById('google-error').textContent = '';
  try {
    await DB.signInWithGoogle();
  } catch(e) {
    const msg = e.message || 'google sign-in failed';
    document.getElementById('google-error').textContent = msg;
    btn.disabled = false;
  }
}

async function handleSignedIn(user) {
  // Load from localStorage immediately for fast render
  loadCollection();
  loadSessions();
  loadBadges();
  loadPinnedCreature();
  renderTimerStats();
  renderPinnedCreature();
  initEggInteraction();

  // Check new-user flag BEFORE profile — a DB trigger may have already
  // created the profile row during sign-up, so profile existence alone
  // is not a reliable indicator of "returning user".
  const isNewUser = localStorage.getItem('focus-new-user') === 'true';

  if (!isNewUser) {
    // Try loading profile, retry once on network failure
    let profile = null;
    let profileLoadFailed = false;
    try {
      profile = await DB.loadProfile();
    } catch (_) {
      // First attempt failed (network error) — retry once
      try {
        profile = await DB.loadProfile();
      } catch (_2) {
        profileLoadFailed = true;
      }
    }

    // Network error: fall back to localStorage name rather than triggering new-user flow
    if (profileLoadFailed) {
      const cachedName = localStorage.getItem('focus-name');
      if (cachedName) {
        updateCollectionTitle();
        navigateTo('timer');
        return;
      }
      // No cached name and can't reach server — still don't create a new profile,
      // just go to timer with a fallback name
      navigateTo('timer');
      return;
    }

    if (profile !== null) {
      // ── Returning user ────────────────────────────────────────────────────
      // profile row exists → existing user even if name is somehow missing
      const resolvedName = profile.name ||
                           user.user_metadata?.full_name?.split(' ')[0] ||
                           user.user_metadata?.name ||
                           localStorage.getItem('focus-name') || '';
      if (resolvedName) localStorage.setItem('focus-name', resolvedName);
      // DB is source of truth for evolved creatures — overwrite localStorage
      if (Array.isArray(profile.evolved_creatures)) {
        state.evolvedCreatures = profile.evolved_creatures;
        localStorage.setItem('focus-evolved', JSON.stringify(state.evolvedCreatures));
      }
      updateCollectionTitle();
      navigateTo('timer');
      // Sync collection + sessions in background
      const _syncStart = Date.now();
      Promise.all([DB.loadCollection(), DB.loadSessions(), DB.loadBadges()])
        .then(([col, sess, badgeData]) => {
          if (col  !== null) {
            // Merge: keep server entries + any local entries added during the async load
            // (e.g. a hatch that fired while Supabase was still loading)
            const serverKeys = new Set(col.map(e => `${e.id}:${e.variant}:${e.timestamp}`));
            const localOnly = state.collection.filter(e =>
              e.timestamp >= _syncStart && !serverKeys.has(`${e.id}:${e.variant}:${e.timestamp}`)
            );
            state.collection = [...col, ...localOnly];
            localStorage.setItem('focus-collection', JSON.stringify(state.collection));
          }
          if (sess !== null) { sessions = sess;         localStorage.setItem('focus-sessions',   JSON.stringify(sess)); renderTimerStats(); }
          if (badgeData) {
            if (badgeData.badges?.length) { state.badges = badgeData.badges; localStorage.setItem('focus-badges', JSON.stringify(state.badges)); }
            if (badgeData.max_streak > state.maxStreak) { state.maxStreak = badgeData.max_streak; localStorage.setItem('focus-max-streak', String(state.maxStreak)); }
          }
          // Backfill: compute historical max streak if not yet set
          if (state.maxStreak === 0 && sessions.length > 0) {
            state.maxStreak = calcMaxStreakFromHistory();
            localStorage.setItem('focus-max-streak', String(state.maxStreak));
            DB.updateMaxStreak(state.maxStreak).catch(() => {});
          }
          // Retroactively award badges for existing progress
          checkBadges();
        })
        .catch(() => {});
      return;
    }
  }

  // ── New user ──────────────────────────────────────────────────────────────
  // Safety check: even if the new-user flag was set, verify this account has
  // no existing collection in Supabase before wiping local state and onboarding.
  // This prevents re-onboarding returning users who hit an auth edge case.
  localStorage.removeItem('focus-new-user');

  let existingCollection = null;
  try { existingCollection = await DB.loadCollection(); } catch(_) {}
  if (existingCollection && existingCollection.length > 0) {
    // Account has data — treat as returning user with a broken profile
    const name = localStorage.getItem('focus-name') ||
                 user.user_metadata?.full_name?.split(' ')[0] ||
                 user.user_metadata?.name || '';
    if (name) {
      localStorage.setItem('focus-name', name);
      DB.saveProfile(name).catch(() => {});
    }
    updateCollectionTitle();
    navigateTo('timer');
    return;
  }

  const name = localStorage.getItem('focus-name') ||
               user.user_metadata?.full_name?.split(' ')[0] ||
               user.user_metadata?.name || 'there';

  localStorage.setItem('focus-name', name);

  const hasGuestData = localStorage.getItem('focus-guest-migrate') === 'true';
  if (hasGuestData && (state.collection.length > 0 || sessions.length > 0)) {
    // Migrate guest data to the new account instead of starting fresh
    localStorage.removeItem('focus-guest');
    localStorage.removeItem('focus-guest-migrate');
    // If a hatch was blocked mid-flow, add that creature now
    if (state.hatch.guestBlocked && state.hatch.character) {
      addToCollection(state.hatch.character, state.hatch.variant);
      state.hatch.guestBlocked = false;
    }
    try { await DB.saveProfile(name); } catch(_) {}
    if (state.collection.length > 0) DB.saveCollection(state.collection).catch(() => {});
    if (sessions.length > 0) {
      sessions.forEach(s => DB.addSession(s.duration).catch(() => {}));
    }
    DB.invokeFunction('send-welcome-email', { email: user.email, name }).catch(() => {});
    updateCollectionTitle();
    navigateTo('timer');
    return;
  }

  localStorage.removeItem('focus-guest');
  localStorage.removeItem('focus-guest-migrate');
  state.collection = [];
  sessions = [];
  try {
    await DB.saveProfile(name);
  } catch(e) {
    // Profile save failed — offline cache will retry
  }
  DB.invokeFunction('send-welcome-email', { email: user.email, name })
    .catch(() => {});
  showOnboardingEgg(name);
}

async function performSignIn() {
  const email    = document.getElementById('si-email').value.trim();
  const password = document.getElementById('si-password').value;
  const btn      = document.getElementById('btn-signin');
  clearAuthErrors();
  if (!email || !password) { showAuthError('signin', 'email and password required'); return; }
  setAuthLoading(btn, true);
  try {
    const data = await DB.signIn(email, password);
    await handleSignedIn(data.user);
  } catch(e) {
    showAuthError('signin', e.message || 'sign in failed');
    setAuthLoading(btn, false);
  }
}

async function performSignUp() {
  const name     = document.getElementById('su-name').value.trim();
  const email    = document.getElementById('su-email').value.trim();
  const password = document.getElementById('su-password').value;
  const btn      = document.getElementById('btn-signup');
  clearAuthErrors();
  if (!name)     { showAuthError('signup', 'name is required'); return; }
  if (!email)    { showAuthError('signup', 'email is required'); return; }
  if (password.length < 6) { showAuthError('signup', 'password must be at least 6 characters'); return; }
  setAuthLoading(btn, true);
  try {
    const data = await DB.signUp(name, email, password);
    // Always persist name + new-user flag so onboarding fires after email confirmation too
    localStorage.setItem('focus-name', name);
    localStorage.setItem('focus-new-user', 'true');
    const hasGuestData = localStorage.getItem('focus-guest-migrate') === 'true';
    if (!data.session) {
      // Email confirmation required — show notice; onboarding will fire on next sign-in
      document.getElementById('panel-signup').style.display  = 'none';
      document.getElementById('auth-confirm').style.display  = 'flex';
      return;
    }
    localStorage.removeItem('focus-new-user');
    if (hasGuestData && (state.collection.length > 0 || sessions.length > 0)) {
      // Migrate guest data to the new account instead of starting fresh
      localStorage.removeItem('focus-guest');
      localStorage.removeItem('focus-guest-migrate');
      // If a hatch was blocked mid-flow, add that creature now
      if (state.hatch.guestBlocked && state.hatch.character) {
        addToCollection(state.hatch.character, state.hatch.variant);
        state.hatch.guestBlocked = false;
      }
      DB.saveProfile(name).catch(() => {});
      if (state.collection.length > 0) DB.saveCollection(state.collection).catch(() => {});
      if (sessions.length > 0) {
        sessions.forEach(s => DB.addSession(s.duration).catch(() => {}));
      }
      DB.invokeFunction('send-welcome-email', { email, name }).catch(() => {});
      updateCollectionTitle();
      navigateTo('timer');
    } else {
      // Fresh start: go straight to onboarding egg
      localStorage.removeItem('focus-guest');
      localStorage.removeItem('focus-guest-migrate');
      state.collection = [];
      sessions = [];
      DB.invokeFunction('send-welcome-email', { email, name }).catch(() => {});
      showOnboardingEgg(name);
    }
  } catch(e) {
    showAuthError('signup', e.message || 'sign up failed');
    setAuthLoading(btn, false);
  }
}

async function performSignOut() {
  try { await DB.signOut(); } catch(e) {}
  resetTimerState();
  _hatchInProgress = false;
  // Clear local state
  state.collection = [];
  state.badges = [];
  state.maxStreak = 0;
  state.onboarding = false;
  sessions = [];
  localStorage.removeItem('focus-collection');
  localStorage.removeItem('focus-sessions');
  localStorage.removeItem('focus-name');
  localStorage.removeItem('focus-badges');
  localStorage.removeItem('focus-max-streak');
  localStorage.removeItem('focus-new-user');
  localStorage.removeItem('focus-timer');
  _badgeStatsCache = null;
  _playerCountCache = null;
  // Strip stale auth tokens from URL so a refresh can't re-create the session
  if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
  // Reset auth form
  clearAuthErrors();
  setAuthLoading(document.getElementById('btn-signin'), false);
  setAuthLoading(document.getElementById('btn-signup'), false);
  document.getElementById('btn-google').disabled = false;
  document.getElementById('si-email').value    = '';
  document.getElementById('si-password').value = '';
  document.getElementById('panel-signin').style.display = 'flex';
  document.getElementById('panel-signup').style.display = 'none';
  document.getElementById('auth-confirm').style.display = 'none';
  document.getElementById('tab-signin').classList.add('active');
  document.getElementById('tab-signup').classList.remove('active');
  navigateTo('auth');
}

function showResetPasswordPanel() {
  // Hide all auth panels, show reset password panel
  document.getElementById('panel-signin').style.display = 'none';
  document.getElementById('panel-signup').style.display = 'none';
  document.getElementById('panel-forgot').style.display = 'none';
  document.getElementById('auth-confirm').style.display = 'none';
  document.getElementById('panel-reset-password').style.display = 'flex';
  document.getElementById('rp-error').textContent = '';
  document.getElementById('rp-password').value = '';
  document.getElementById('rp-password2').value = '';
  navigateTo('auth');
}

function openAccountSheet() {
  const name  = getUserName();
  const initial = (name || '?')[0].toUpperCase();
  document.getElementById('account-avatar').textContent       = initial;
  document.getElementById('account-name-display').textContent = name || '—';
  // Pull email from Supabase session if available
  DB.getSession().then(({ data }) => {
    document.getElementById('account-email-display').textContent = data?.session?.user?.email || '';
  }).catch(() => {});
  document.getElementById('account-sheet').classList.add('open');
  document.getElementById('account-sheet-backdrop').classList.add('open');
}

function closeAccountSheet() {
  document.getElementById('account-sheet').classList.remove('open');
  document.getElementById('account-sheet-backdrop').classList.remove('open');
}

function openDeleteConfirm() {
  document.getElementById('delete-confirm-overlay').classList.add('open');
}

function closeDeleteConfirm() {
  document.getElementById('delete-confirm-overlay').classList.remove('open');
}

async function performDeleteAccount() {
  const btn = document.getElementById('btn-delete-confirm');
  btn.textContent = 'deleting…';
  btn.disabled = true;
  document.getElementById('delete-error').textContent = '';
  try {
    await DB.deleteAccount();
    await performSignOut();
  } catch(e) {
    btn.textContent = 'delete my account';
    btn.disabled = false;
    document.getElementById('delete-error').textContent = 'deletion failed — please try again or contact support.';
  }
}

// Show the egg-tap slide directly (used after sign-up)
function showOnboardingEgg(name) {
  // Slide 1: intro
  document.getElementById('ob-intro-name').textContent = `welcome, ${name}`;
  // Slide 2: egg
  document.getElementById('ob-greeting').textContent = `ready, ${name}?`;
  document.getElementById('ob-egg-wrap').innerHTML = EGG_SVG_SMALL;
  // Show slide 1 first
  navigateTo('onboard');
  document.getElementById('ob-slide-1').classList.add('active');
  document.getElementById('ob-slide-2').classList.remove('active');
  // → button advances to egg slide
  const nextBtn = document.getElementById('ob-next');
  nextBtn.onclick = () => {
    document.getElementById('ob-slide-1').classList.remove('active');
    document.getElementById('ob-slide-2').classList.add('active');
  };
}

// ── INIT ──────────────────────────────────────────────────────────────────────
async function init() {
  // Public profile route — skip auth entirely
  const profileSlug = new URLSearchParams(window.location.search).get('profile');
  if (profileSlug) {
    initDarkMode();
    await showPublicProfile(profileSlug);
    return;
  }

  loadMuteState();
  initDarkMode();
  initBlockApps();
  initReminder();
  if (!IS_NATIVE) registerSW();

  // Native-only setup
  if (IS_NATIVE) {
    const { StatusBar } = window.Capacitor.Plugins;
    StatusBar.setStyle({ style: 'DARK' }).catch(() => {});
    // Hide mini timer — window.open not available in native webview
    const miniBtn = document.getElementById('btn-mini-timer');
    if (miniBtn) miniBtn.style.display = 'none';
    // Open external links (target="_blank") in SFSafariViewController, not system Safari
    document.addEventListener('click', e => {
      const a = e.target.closest('a[target="_blank"]');
      if (!a || !a.href) return;
      e.preventDefault();
      window.Capacitor.Plugins.Browser.open({ url: a.href });
    });
    // Handle OAuth deep link callback
    const AppPlugin = window.Capacitor.Plugins.App;
    AppPlugin?.addListener('appUrlOpen', async ({ url }) => {
      if (!url) return;
      // Close the in-app SFSafariViewController browser
      window.Capacitor.Plugins.Browser?.close();
      // PKCE flow: app.kokoon.focus://callback?code=XXX
      const queryIndex = url.indexOf('?');
      if (queryIndex >= 0) {
        const params = new URLSearchParams(url.substring(queryIndex + 1));
        const code = params.get('code');
        if (code) {
          const { data, error } = await DB.exchangeCode(url);
          if (error) return;
          if (!error && data?.session) {
            if (params.get('type') === 'recovery') {
              showResetPasswordPanel();
            } else {
              await handleSignedIn(data.session.user);
            }
          }
          return;
        }
      }
      // Implicit flow fallback: app.kokoon.focus://callback#access_token=...
      const hashIndex = url.indexOf('#');
      if (hashIndex < 0) return;
      const fragment = url.substring(hashIndex + 1);
      const params = new URLSearchParams(fragment);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const type = params.get('type');
      if (accessToken) {
        const { data, error } = await DB.setSession(accessToken, refreshToken);
        if (!error && data?.session) {
          if (type === 'recovery') {
            showResetPasswordPanel();
          } else {
            await handleSignedIn(data.session.user);
          }
        }
      }
    });
  }
  setInterval(renderNudge, 5 * 60 * 1000); // re-check nudge every 5 min

  // Particle canvas
  particleCanvas = document.getElementById('particles');
  px = particleCanvas.getContext('2d');
  particleCanvas.width  = window.innerWidth;
  particleCanvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    particleCanvas.width  = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  });

  document.getElementById('timer-egg').innerHTML = EGG_SVG_SMALL;
  updateTimerDisplay();

  // ── Event listeners ──────────────────────────────────────────────────────

  // Fusion overlay
  document.getElementById('btn-fusion-ok').addEventListener('click', closeFusionScreen);

  // Card modal
  initModalListeners();
  initBadgeModalListeners();

  // Duration picker
  document.querySelectorAll('.dur-btn').forEach(btn => {
    btn.addEventListener('click', () => setDuration(parseInt(btn.dataset.min)));
  });

  // Mute + dark toggles
  document.getElementById('btn-mute').addEventListener('click', toggleMute);
  document.getElementById('btn-dark').addEventListener('click', toggleDark);
  document.getElementById('btn-block-apps')?.addEventListener('change', async e => {
    localStorage.setItem('focus-block-apps', String(e.target.checked));
    if (e.target.checked && AppBlocking) {
      const { status } = await AppBlocking.getAuthorizationStatus();
      if (status !== 'approved') {
        await AppBlocking.requestAuthorization();
      }
    }
  });
  document.getElementById('btn-choose-apps')?.addEventListener('click', async () => {
    if (!AppBlocking) return;
    const { status } = await AppBlocking.getAuthorizationStatus();
    if (status !== 'approved') {
      const { granted } = await AppBlocking.requestAuthorization();
      if (!granted) {
        alert('To block apps during focus, go to Settings → Screen Time and allow Kokoon access.');
        return;
      }
    }
    AppBlocking.showPicker().catch(() => {});
  });

  // Start/pause button
  document.getElementById('btn-start-focus').addEventListener('click', () => {
    SFX.unlock();
    requestNotificationPermission();
    toggleTimer();
  });

  document.getElementById('btn-reset-timer').addEventListener('click', resetTimerState);

  // Mini timer button
  document.getElementById('btn-mini-timer').addEventListener('click', openMiniTimer);

  // Collection button
  document.getElementById('btn-open-collection').addEventListener('click', () => navigateTo('collection'));
  document.getElementById('btn-back-to-timer').addEventListener('click', () => {
    if (state.timer.remaining <= 0) resetTimerState();
    navigateTo('timer');
  });
  document.getElementById('btn-tab-timer').addEventListener('click', () => {
    if (state.timer.remaining <= 0) resetTimerState();
    navigateTo('timer');
  });

  // Sign out
  // Account sheet
  document.getElementById('btn-account').addEventListener('click', openAccountSheet);
  document.getElementById('account-sheet-backdrop').addEventListener('click', closeAccountSheet);
  document.getElementById('btn-account-signout').addEventListener('click', () => { closeAccountSheet(); performSignOut(); });
  document.getElementById('btn-account-delete').addEventListener('click', () => { closeAccountSheet(); openDeleteConfirm(); });
  document.getElementById('btn-delete-cancel').addEventListener('click', closeDeleteConfirm);
  document.getElementById('btn-delete-confirm').addEventListener('click', performDeleteAccount);

  // Share collection button
  document.getElementById('btn-share-collection').addEventListener('click', shareCollection);

  // Hatch actions
  document.getElementById('btn-share').addEventListener('click', shareCreature);
  document.getElementById('btn-modal-share').addEventListener('click', shareFromModal);
  document.getElementById('btn-see-collection').addEventListener('click', () => {
    if (state.onboarding) finishOnboarding();
    state.topTab = 'collection';
    navigateTo('collection');
  });
  document.getElementById('btn-focus-again').addEventListener('click', () => {
    if (state.onboarding) { finishOnboarding(); return; }
    resetTimerState();
    navigateTo('timer');
  });
  document.getElementById('evo-hint-banner')?.addEventListener('click', () => {
    dismissEvoHint();
    navigateTo('collection');
  });
  document.getElementById('evo-hint-dismiss')?.addEventListener('click', e => {
    e.stopPropagation();
    dismissEvoHint();
  });
  document.getElementById('btn-nurture-continue').addEventListener('click', () => {
    navigateTo('timer');
    setTimeout(() => {
      renderPinnedCreature();
      const svg = document.getElementById('progress-ring');
      const segs = svg ? [...svg.querySelectorAll('.evo-segment')] : [];
      const progress = state.evolutionSessions[state.pinnedCreature] || 0;
      const newSeg = segs[progress - 1];
      if (newSeg) newSeg.classList.add('seg-pulse');
    }, 200);
  });

  // Onboarding egg tap → welcome hatch
  document.getElementById('ob-egg-wrap').addEventListener('click', () => {
    SFX.unlock();
    SFX.crack(0.7);
    startOnboarding();
  });

  // Apple sign-in (native only)
  if (!IS_NATIVE) {
    const appleBtn = document.getElementById('btn-apple');
    if (appleBtn) appleBtn.style.display = 'none';
  }
  document.getElementById('btn-apple').addEventListener('click', performAppleSignIn);

  // Google sign-in
  document.getElementById('btn-google').addEventListener('click', performGoogleSignIn);

  // Auth: tab switching
  document.getElementById('tab-signin').addEventListener('click', () => {
    document.getElementById('tab-signin').classList.add('active');
    document.getElementById('tab-signup').classList.remove('active');
    document.getElementById('panel-signin').style.display = 'flex';
    document.getElementById('panel-signup').style.display = 'none';
    document.getElementById('auth-confirm').style.display = 'none';
    clearAuthErrors();
  });
  document.getElementById('tab-signup').addEventListener('click', () => {
    document.getElementById('tab-signup').classList.add('active');
    document.getElementById('tab-signin').classList.remove('active');
    document.getElementById('panel-signup').style.display = 'flex';
    document.getElementById('panel-signin').style.display = 'none';
    document.getElementById('auth-confirm').style.display = 'none';
    clearAuthErrors();
    setTimeout(() => document.getElementById('su-name').focus(), 60);
  });

  // Auth: form submission
  document.getElementById('btn-signin').addEventListener('click', performSignIn);
  document.getElementById('btn-signup').addEventListener('click', performSignUp);
  document.getElementById('btn-goto-signin').addEventListener('click', () => {
    document.getElementById('auth-confirm').style.display = 'none';
    document.getElementById('panel-signin').style.display = 'flex';
    document.getElementById('tab-signin').classList.add('active');
    document.getElementById('tab-signup').classList.remove('active');
  });
  document.getElementById('btn-forgot-password').addEventListener('click', () => {
    const email = document.getElementById('si-email').value;
    document.getElementById('panel-signin').style.display = 'none';
    document.getElementById('panel-forgot').style.display = 'flex';
    if (email) document.getElementById('fp-email').value = email;
  });
  document.getElementById('btn-back-signin').addEventListener('click', () => {
    document.getElementById('panel-forgot').style.display = 'none';
    document.getElementById('panel-signin').style.display = 'flex';
    document.getElementById('fp-error').textContent = '';
  });
  document.getElementById('btn-send-reset').addEventListener('click', async () => {
    const email = document.getElementById('fp-email').value.trim();
    const btn = document.getElementById('btn-send-reset');
    const err = document.getElementById('fp-error');
    if (!email) { err.textContent = 'please enter your email'; return; }
    setAuthLoading(btn, true);
    try {
      await DB.resetPassword(email);
      err.style.color = 'var(--ink)';
      err.textContent = 'reset link sent — check your email.';
      btn.style.display = 'none';
    } catch (e) {
      err.style.color = '';
      err.textContent = e.message || 'could not send reset link';
    } finally {
      setAuthLoading(btn, false);
    }
  });
  document.getElementById('fp-email').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-send-reset').click();
  });
  document.getElementById('btn-set-password').addEventListener('click', async () => {
    const pw  = document.getElementById('rp-password').value;
    const pw2 = document.getElementById('rp-password2').value;
    const btn = document.getElementById('btn-set-password');
    const err = document.getElementById('rp-error');
    if (pw.length < 6) { err.textContent = 'password must be at least 6 characters'; return; }
    if (pw !== pw2)    { err.textContent = 'passwords do not match'; return; }
    setAuthLoading(btn, true);
    try {
      await DB.updatePassword(pw);
      const { data } = await DB.getSession();
      if (data?.session?.user) await handleSignedIn(data.session.user);
    } catch (e) {
      err.textContent = e.message || 'could not update password';
      setAuthLoading(btn, false);
    }
  });
  // Guest mode: explore without account
  document.getElementById('btn-guest').addEventListener('click', () => {
    localStorage.setItem('focus-guest', 'true');
    loadCollection();
    loadSessions();
    loadBadges();
    renderTimerStats();
    initEggInteraction();
    navigateTo('timer');
  });

  // Guest signup prompt buttons
  document.getElementById('btn-guest-create-account').addEventListener('click', () => {
    document.getElementById('guest-signup-prompt').classList.remove('show');
    localStorage.setItem('focus-guest-migrate', 'true');
    // Switch to sign-up tab
    document.getElementById('tab-signup').classList.add('active');
    document.getElementById('tab-signin').classList.remove('active');
    document.getElementById('panel-signup').style.display = 'flex';
    document.getElementById('panel-signin').style.display = 'none';
    document.getElementById('auth-confirm').style.display = 'none';
    clearAuthErrors();
    navigateTo('auth');
    setTimeout(() => document.getElementById('su-name').focus(), 60);
  });
  document.getElementById('btn-guest-dismiss').addEventListener('click', () => {
    document.getElementById('guest-signup-prompt').classList.remove('show');
    if (state.hatch.guestBlocked) {
      state.hatch.guestBlocked = false;
      state.hatch.character    = null;
      state.hatch.variant      = null;
      document.getElementById('hatch-stage').style.opacity = '';
      resetTimerState();
      navigateTo('timer');
    }
  });

  // Allow Enter key in auth inputs
  ['si-email','si-password'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') performSignIn(); });
  });
  ['su-name','su-email','su-password'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') performSignUp(); });
  });

  // Region filter tabs (including badges tab)
  document.querySelectorAll('.top-tab, .bottom-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.topTab = btn.dataset.top;
      renderTopTab();
    });
  });

  document.querySelectorAll('.region-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('locked')) return;
      state.filter = btn.dataset.region;
      renderCollection();
    });
  });

  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    // Arrow keys — cycle variants in modal
    if (document.getElementById('card-modal').classList.contains('open')) {
      if (e.key === 'ArrowLeft')  { stepModalVariant(-1); return; }
      if (e.key === 'ArrowRight') { stepModalVariant(1);  return; }
    }
    // Escape — close modal first, then back to timer from collection
    if (e.key === 'Escape') {
      if (document.getElementById('badge-modal').classList.contains('open')) { closeBadgeModal(); return; }
      if (document.getElementById('card-modal').classList.contains('open')) { closeCardModal(); return; }
      if (state.view === 'collection') {
        if (state.timer.remaining <= 0) resetTimerState();
        navigateTo('timer');
      }
    }
  });

  // ── Auth routing ──────────────────────────────────────────────────────────
  // getSession() internally awaits Supabase's initializePromise, which means
  // it blocks until initialize() has fully run — including extracting any
  // OAuth access_token from the URL hash and storing the session.
  const { data } = await DB.getSession().catch(() => ({ data: { session: null } }));
  const session = data.session;

  // Strip auth tokens from the URL hash so a later refresh can't replay them
  if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);

  if (session) {
    await handleSignedIn(session.user);
    // Restore a running or paused timer that survived a page reload
    try {
      const saved = JSON.parse(localStorage.getItem('focus-timer') || 'null');
      if (saved?.running && saved.endTime && saved.endTime > Date.now()) {
        // Was running — resume from wall clock
        state.timer.duration  = saved.duration;
        state.timer.remaining = Math.round((saved.endTime - Date.now()) / 1000);
        state.timer.endTime   = saved.endTime;
        startTimer();
      } else if (saved?.running && saved.endTime && saved.endTime <= Date.now()) {
        // Timer completed while app was closed — trigger hatch
        state.timer.duration  = saved.duration;
        state.timer.remaining = 0;
        state.timer.running   = false;
        state.timer.endTime   = null;
        updateTimerDisplay();
        onTimerComplete();
      } else if (saved && !saved.running && saved.remaining > 0 && saved.remaining < saved.duration) {
        // Was paused — restore paused position
        state.timer.duration  = saved.duration;
        state.timer.remaining = saved.remaining;
        updateTimerDisplay();
        const progress = 1 - state.timer.remaining / state.timer.duration;
        updateProgressRing(progress);
        updateEggGlow(progress);
        document.getElementById('btn-start-focus').innerHTML = '<span>resume</span>';
        document.getElementById('btn-reset-timer').classList.add('visible');
        document.querySelectorAll('.dur-btn').forEach(b => {
          b.classList.toggle('active', parseInt(b.dataset.min) === saved.duration / 60);
        });
      } else {
        clearTimerState();
      }
    } catch(e) { clearTimerState(); }
  } else if (localStorage.getItem('focus-guest') === 'true') {
    loadCollection();
    loadSessions();
    loadBadges();
    renderTimerStats();
    initEggInteraction();
    navigateTo('timer');
  } else {
    navigateTo('auth');
    setTimeout(() => document.getElementById('si-email').focus(), 100);
  }
  document.body.style.opacity = '1';
}

// ── Guest mode ────────────────────────────────────────────────────────────────

function isGuest() {
  return localStorage.getItem('focus-guest') === 'true';
}

function maybeShowGuestPrompt() {
  if (!isGuest()) return;
  const nameEl = document.getElementById('guest-creature-name');
  const msgEl  = document.getElementById('guest-signup-msg');
  if (state.hatch.guestBlocked) {
    nameEl.textContent = 'your creature is waiting';
    msgEl.textContent  = 'create an account to reveal it and keep building your collection.';
  } else {
    const name = state.hatch?.character?.name;
    nameEl.textContent = name ? `you hatched ${name}` : 'your creature hatched';
    msgEl.textContent  = 'create an account to save your creatures and build your collection.';
  }
  setTimeout(() => {
    document.getElementById('guest-signup-prompt').classList.add('show');
  }, state.hatch.guestBlocked ? 800 : 1200);
}

document.addEventListener('DOMContentLoaded', init);

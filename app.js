// ── FUSION ────────────────────────────────────────────────────────────────────
const VARIANT_NEXT = { standard: 'gold', gold: 'crimson', crimson: 'void' };

// Drop hint: per-character odds (rarity × variant ÷ pool size)
// Pools: common 12 chars, rare 11, legendary 5. Variant weights: std 1000, gold 100, crimson 10, void 1 / 1111 total
const DROP_HINTS = {
  'rare-standard':     '~1 in 44 sessions',
  'legendary-standard':'~1 in 80 sessions',
  'common-gold':       '~1 in 200 sessions',
  'rare-gold':         '~1 in 440 sessions',
  'legendary-gold':    '~1 in 800 sessions',
  'common-crimson':    '~1 in 2,000 sessions',
  'rare-crimson':      '~1 in 4,400 sessions',
  'legendary-crimson': '~1 in 8,000 sessions',
  'common-void':       '~1 in 20,000 sessions',
  'rare-void':         '~1 in 44,000 sessions',
  'legendary-void':    '~1 in 80,000 sessions',
};

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

  setTimeout(() => { core.classList.add('burst'); SFX.fusionBurst(); navigator.vibrate?.([220]); }, 1960);
  setTimeout(() => { result.classList.add('reveal'); SFX.fusionReveal(toVariant.id); navigator.vibrate?.([30, 80, 60]); }, 2200);
  setTimeout(() => btn.classList.add('show'), 2950);
}

function closeFusionScreen() {
  document.getElementById('fusion-overlay').classList.remove('open');
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

function renderTimerStats() {
  const el = document.getElementById('timer-stats');
  if (!el) return;
  if (!sessions.length) { el.classList.remove('has-data'); updateStreakWarning(); return; }

  const streak    = calcStreak();
  const totalMins = sessions.reduce((s, x) => s + x.duration, 0);

  const streakLine = streak > 0
    ? `<span class="stat-streak">🔥 ${streak} day streak</span>`
    : '';
  const totalsLine = `<span class="stat-totals">${sessions.length} session${sessions.length !== 1 ? 's' : ''}<span class="stat-sep"> · </span>${formatHours(totalMins)} focused</span>`;

  el.innerHTML = streakLine + totalsLine;
  el.classList.add('has-data');
  updateStreakWarning();
}

function updateStreakWarning() {
  const el = document.getElementById('streak-warning');
  if (!el) return;
  const hour = new Date().getHours();
  if (hour < 17) { el.classList.remove('show'); return; }
  const dayKey = ts => { const d = new Date(ts); return d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate(); };
  const todayKey = dayKey(Date.now());
  const todayHasSessions = sessions.some(s => dayKey(s.timestamp) === todayKey);
  if (todayHasSessions) { el.classList.remove('show'); return; }
  if (calcStreak() === 0) { el.classList.remove('show'); return; }
  el.textContent = '🔥 focus tonight to keep your streak';
  el.classList.add('show');
}

function renderCollectionStats() {
  const ownedIds   = new Set(state.collection.map(e => e.id));
  const totalChars = Object.keys(CHARACTERS).length;
  const unlocked   = ownedIds.size;
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

  // Stats strip
  const statsEl = document.getElementById('collection-stats');
  if (statsEl) {
    statsEl.innerHTML =
      `<span><span class="cs-frac">${unlocked}</span>` +
      `<span class="cs-total"> / ${totalChars} characters</span></span>` +
      `<span class="cs-sep">·</span>` +
      `<span>${totalCards} cards</span>`;
  }

  // Region tab counts
  document.querySelectorAll('.region-btn').forEach(btn => {
    const region = btn.dataset.region;
    const span   = btn.querySelector('.tab-count');
    if (!span) return;
    if (region === 'all') {
      span.textContent = `${unlocked}/${totalChars}`;
    } else {
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
    interval: null
  },
  hatch: { character: null, variant: null },
  collection: [],  // [{ id, timestamp }]
  filter: 'all',
  previewAll: false,
  onboarding: false   // true during the welcome hatch
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

function addToCollection(character, variant) {
  const entry = { id: character.id, variant: variant.id, timestamp: Date.now() };
  state.collection.push(entry);
  localStorage.setItem('focus-collection', JSON.stringify(state.collection));
  DB.addCollectionEntry(character.id, variant.id).catch(() => {});
}

// ── NAVIGATION ───────────────────────────────────────────────────────────────
function navigateTo(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${viewId}`).classList.add('active');
  state.view = viewId;
  if (viewId === 'collection') { updateCollectionTitle(); renderCollection(); }
  const noMute = viewId === 'collection' || viewId === 'auth' || viewId === 'onboard';
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

function initDarkMode() {
  const dark = localStorage.getItem('focus-dark') === 'true';
  document.body.classList.toggle('dark', dark);
}

function toggleDark() {
  const dark = document.body.classList.toggle('dark');
  localStorage.setItem('focus-dark', String(dark));
}


// ── TIMER ─────────────────────────────────────────────────────────────────────
const RING_CIRC = 2 * Math.PI * 118; // 741.12

function updateTimerDisplay() {
  const m = Math.floor(state.timer.remaining / 60);
  const s = state.timer.remaining % 60;
  document.getElementById('time-minutes').textContent = String(m).padStart(2, '0');
  document.getElementById('time-seconds').textContent = String(s).padStart(2, '0');
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
  el.style.filter = `drop-shadow(0 0 ${blur}px rgba(0,71,255,${alpha.toFixed(2)}))`;
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

function startTimer() {
  state.timer.running = true;
  document.getElementById('btn-start-focus').innerHTML = '<span>pause</span>';
  document.getElementById('view-timer').classList.add('running');

  state.timer.interval = setInterval(() => {
    state.timer.remaining = Math.max(0, state.timer.remaining - 1);
    updateTimerDisplay();
    const progress = 1 - state.timer.remaining / state.timer.duration;
    updateProgressRing(progress);
    updateEggGlow(progress);
    if (state.timer.remaining <= 0) {
      clearInterval(state.timer.interval);
      state.timer.running = false;
      onTimerComplete();
    }
  }, 1000);
}

function pauseTimer() {
  state.timer.running = false;
  clearInterval(state.timer.interval);
  document.getElementById('btn-start-focus').innerHTML = '<span>resume</span>';
}

function toggleTimer() {
  if (state.timer.running) pauseTimer();
  else startTimer();
}

function resetTimerState() {
  clearInterval(state.timer.interval);
  state.timer.running   = false;
  state.timer.remaining = state.timer.duration;
  updateTimerDisplay();
  updateProgressRing(0);
  updateEggGlow(0);
  document.getElementById('btn-start-focus').innerHTML = '<span>begin focus</span>';
  document.getElementById('view-timer').classList.remove('running');
}

function onTimerComplete() {
  addSession(state.timer.duration / 60);
  renderTimerStats();
  notifySessionComplete();

  const { character, variant } = rollCharacter();
  state.hatch.character = character;
  state.hatch.variant   = variant;
  addToCollection(character, variant);

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

  // Session number
  const sessionNumEl = document.getElementById('hatch-session-num');
  if (sessionNumEl) sessionNumEl.textContent = sessions.length ? `session ${sessions.length}` : '';

  // Character info
  document.getElementById('char-name').textContent   = character.name;
  document.getElementById('char-sub').textContent    = character.subtitle;

  // Rarity badge — styled by tier + variant
  const rarityEl = document.getElementById('char-rarity');
  rarityEl.textContent    = character.rarityLabel + ' · ' + variant.label;
  rarityEl.style.color    = variant.color;
  rarityEl.style.borderColor = variant.color;
  rarityEl.style.background  = variant.id !== 'standard' ? variant.color + '18' : 'transparent';
  rarityEl.className = `tier-${character.rarity} variant-${variant.id}`;

  // Drop hint (only for rarer finds)
  const hintEl = document.getElementById('char-drop-hint');
  hintEl.textContent = DROP_HINTS[`${character.rarity}-${variant.id}`] || '';

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

  // Reset UI
  document.getElementById('hatch-header').classList.remove('show');
  document.getElementById('hatch-actions').classList.remove('show');

  // Resize particle canvas
  particleCanvas.width  = window.innerWidth;
  particleCanvas.height = window.innerHeight;

  // Reset speed lines + flash
  document.getElementById('flash').style.opacity     = '0';
  document.getElementById('speed-wrap').style.opacity = '0';
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
    navigator.vibrate?.([18]);
  }, 1600);

  setTimeout(() => { SFX.crack(0.55); navigator.vibrate?.([10]); }, 1920);

  // 2. Shake at 2.2s
  setTimeout(() => { shakeEgg(egg); SFX.rumble(); navigator.vibrate?.([8, 60, 8, 60, 8]); }, 2200);

  // 3. BURST at 3.0s
  setTimeout(() => {
    SFX.burst(state.hatch.character.rarity);
    navigator.vibrate?.([180]);
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

    // Hide egg, show character
    egg.style.transition    = 'opacity .15s ease';
    egg.style.opacity       = '0';
    cracks.style.opacity    = '0';
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
  }, 3000);

  // 4. Show UI at 3.6s
  setTimeout(() => {
    document.getElementById('hatch-header').classList.add('show');
    setTimeout(() => {
      document.getElementById('hatch-actions').classList.add('show');
    }, 600);
  }, 3600);
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

// ── COLLECTION ────────────────────────────────────────────────────────────────
function renderCollection() {
  const grid = document.getElementById('collection-grid');
  grid.innerHTML = '';

  renderCollectionStats();

  // Update region tab active state
  document.querySelectorAll('.region-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.region === state.filter);
  });

  // Preview mode indicator
  let indicator = document.getElementById('preview-indicator');
  if (state.previewAll) {
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'preview-indicator';
      indicator.textContent = '[ dev preview — press A to exit ]';
      indicator.style.cssText = 'position:fixed;bottom:1.2rem;left:50%;transform:translateX(-50%);font-size:.7rem;opacity:.35;letter-spacing:.1em;pointer-events:none;';
      document.body.appendChild(indicator);
    }
  } else {
    if (indicator) indicator.remove();
  }

  // Count per character, broken down by variant
  const variantCounts = {}; // { id: { standard: N, gold: N, crimson: N, void: N } }
  state.collection.forEach(e => {
    if (!variantCounts[e.id]) variantCounts[e.id] = { standard: 0, gold: 0, crimson: 0, void: 0 };
    const v = e.variant || 'standard'; // backward compat
    variantCounts[e.id][v] = (variantCounts[e.id][v] || 0) + 1;
  });

  // All characters in defined order (insertion order from CHARACTERS object)
  const allIds = Object.keys(CHARACTERS);

  allIds.forEach(id => {
    const char  = CHARACTERS[id];
    if (!char) return;

    // Region filter
    if (state.filter !== 'all' && char.region !== state.filter) return;

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

      // Count badge (only for real earned dupes)
      if (count > 1) {
        const badge = document.createElement('span');
        badge.className   = 'card-count';
        badge.textContent = `× ${count}`;
        card.style.position = 'relative';
        card.appendChild(badge);
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
      // Locked
      const art = document.createElement('div');
      art.className = 'card-art';
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
  const char = CHARACTERS[charId];
  if (!char) return;

  modalChar          = char;
  modalVc            = vc;
  modalOwnedVariants = VARIANTS.filter(v => (vc[v.id] || 0) > 0);
  // Start on rarest owned variant
  modalVariantIndex  = Math.max(0, modalOwnedVariants.length - 1);

  const nameEn = charNameEn(char);

  // Reset flip state
  document.getElementById('modal-card').classList.remove('flipped');

  // Front: art (filter applied in renderModalVariantNav after variant is known)
  document.getElementById('modal-art').innerHTML = char.svg;

  // Back: lore + haiku
  document.getElementById('modal-back-name').textContent = nameEn;
  document.getElementById('modal-back-lore').textContent  = char.lore  || '';
  document.getElementById('modal-back-haiku').innerHTML   = char.haiku || '';

  // Info strip
  document.getElementById('modal-name').textContent = nameEn;
  document.getElementById('modal-sub').textContent  = char.subtitle;

  renderModalVariantNav();
  document.getElementById('card-modal').classList.add('open');
}

function renderModalVariantNav() {
  const variant = modalOwnedVariants[modalVariantIndex] || VARIANTS[0];
  updateModalRarity(modalChar, variant);
  applyVariantFilter(document.getElementById('modal-art'), variant.id);

  const nav = document.getElementById('modal-var-nav');
  if (modalOwnedVariants.length < 2) { nav.style.display = 'none'; return; }
  nav.style.display = 'flex';

  const label = document.getElementById('modal-var-label');
  const n     = modalVc[variant.id] || 0;
  label.textContent = n > 1 ? `${variant.label} ×${n}` : variant.label;
  label.style.color = variant.color;

  const prev = document.getElementById('modal-prev');
  const next = document.getElementById('modal-next');
  prev.disabled = modalVariantIndex === 0;
  next.disabled = modalVariantIndex === modalOwnedVariants.length - 1;
}

function stepModalVariant(dir) {
  const newIdx = modalVariantIndex + dir;
  if (newIdx < 0 || newIdx >= modalOwnedVariants.length) return;
  modalVariantIndex = newIdx;
  renderModalVariantNav();
}

function updateModalRarity(char, variant) {
  const el = document.getElementById('modal-rarity');
  el.textContent       = char.rarityLabel + ' · ' + variant.label;
  el.style.color       = variant.color;
  el.style.borderColor = variant.color;
}

function closeCardModal() {
  document.getElementById('card-modal').classList.remove('open');
  document.getElementById('modal-card').classList.remove('flipped');
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
  const pool = RARITY_WEIGHTS.find(t => t.rarity === 'common').pool;
  const id   = pool[Math.floor(Math.random() * pool.length)];
  return { character: CHARACTERS[id], variant: VARIANTS[0] }; // always standard
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
  new Notification('Focus · 集中', {
    body: 'Session complete — your creature is ready to hatch 🥚',
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

  // Draw SVG creature
  const svgBlob = new Blob([char.svg], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl  = URL.createObjectURL(svgBlob);
  await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const filter = VARIANT_CANVAS_FILTER[variant.id];
      if (filter) ctx.filter = filter;
      // Center creature art in a 280×320 zone
      const artW = 280, artH = 320;
      const artX = (W - artW) / 2;
      const artY = 28;
      ctx.drawImage(img, artX, artY, artW, artH);
      ctx.filter = 'none';
      URL.revokeObjectURL(svgUrl);
      resolve();
    };
    img.onerror = () => { URL.revokeObjectURL(svgUrl); resolve(); };
    img.src = svgUrl;
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
  ctx.fillText('Focus  ·  集中', W / 2, 478);

  // Outer border
  ctx.strokeStyle = variant.color + '28';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(8, 8, W - 16, H - 16);

  return canvas;
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
      const file = new File([blob], fileName, { type: 'image/png' });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: `I hatched ${nameEn}!`,
            text:  `${char.rarityLabel} · ${variant.label} — Focus · 集中`,
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

async function handleSignedIn(user) {
  // Use localStorage cache immediately for fast render
  loadCollection();
  loadSessions();
  renderTimerStats();

  // New user who confirmed email after sign-up: show onboarding egg
  if (localStorage.getItem('focus-new-user') === 'true') {
    localStorage.removeItem('focus-new-user');
    const name = localStorage.getItem('focus-name') || 'there';
    state.collection = [];
    sessions = [];
    showOnboardingEgg(name);
  } else {
    navigateTo('timer');
  }

  // Sync from Supabase in background and update cache
  Promise.all([DB.loadCollection(), DB.loadSessions(), DB.loadProfile()])
    .then(([col, sess, profile]) => {
      if (col   !== null) { state.collection = col; localStorage.setItem('focus-collection', JSON.stringify(col)); }
      if (sess  !== null) { sessions = sess;         localStorage.setItem('focus-sessions',   JSON.stringify(sess)); renderTimerStats(); }
      if (profile?.name)  { localStorage.setItem('focus-name', profile.name); updateCollectionTitle(); }
    })
    .catch(() => {}); // offline — localStorage cache is sufficient
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
    if (!data.session) {
      // Email confirmation required — show notice; onboarding will fire on next sign-in
      document.getElementById('panel-signup').style.display  = 'none';
      document.getElementById('auth-confirm').style.display  = 'flex';
      return;
    }
    // Auto-confirmed: go straight to onboarding egg
    state.collection = [];
    sessions = [];
    localStorage.removeItem('focus-new-user');
    showOnboardingEgg(name);
  } catch(e) {
    showAuthError('signup', e.message || 'sign up failed');
    setAuthLoading(btn, false);
  }
}

async function performSignOut() {
  try { await DB.signOut(); } catch(e) {}
  // Clear local state
  state.collection = [];
  sessions = [];
  localStorage.removeItem('focus-collection');
  localStorage.removeItem('focus-sessions');
  localStorage.removeItem('focus-name');
  // Reset auth form
  clearAuthErrors();
  document.getElementById('si-email').value    = '';
  document.getElementById('si-password').value = '';
  document.getElementById('panel-signin').style.display = 'flex';
  document.getElementById('panel-signup').style.display = 'none';
  document.getElementById('auth-confirm').style.display = 'none';
  document.getElementById('tab-signin').classList.add('active');
  document.getElementById('tab-signup').classList.remove('active');
  navigateTo('auth');
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
  loadMuteState();
  initDarkMode();
  registerSW();
  setInterval(updateStreakWarning, 5 * 60 * 1000); // re-check every 5 min

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
  document.getElementById('modal-close').addEventListener('click', closeCardModal);
  document.getElementById('card-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeCardModal();
  });
  document.getElementById('modal-card').addEventListener('click', () => {
    document.getElementById('modal-card').classList.toggle('flipped');
  });
  document.getElementById('modal-prev').addEventListener('click', e => {
    e.stopPropagation(); stepModalVariant(-1);
  });
  document.getElementById('modal-next').addEventListener('click', e => {
    e.stopPropagation(); stepModalVariant(1);
  });

  // Duration picker
  document.querySelectorAll('.dur-btn').forEach(btn => {
    btn.addEventListener('click', () => setDuration(parseInt(btn.dataset.min)));
  });

  // Mute + dark toggles
  document.getElementById('btn-mute').addEventListener('click', toggleMute);
  document.getElementById('btn-dark').addEventListener('click', toggleDark);

  // Start/pause button
  document.getElementById('btn-start-focus').addEventListener('click', () => {
    SFX.unlock();
    requestNotificationPermission();
    toggleTimer();
  });

  // Collection button
  document.getElementById('btn-open-collection').addEventListener('click', () => navigateTo('collection'));
  document.getElementById('btn-back-to-timer').addEventListener('click', () => {
    navigateTo('timer');
  });

  // Sign out
  document.getElementById('btn-signout').addEventListener('click', performSignOut);

  // Hatch actions
  document.getElementById('btn-share').addEventListener('click', shareCreature);
  document.getElementById('btn-see-collection').addEventListener('click', () => {
    if (state.onboarding) finishOnboarding();
    navigateTo('collection');
  });
  document.getElementById('btn-focus-again').addEventListener('click', () => {
    if (state.onboarding) { finishOnboarding(); return; }
    resetTimerState();
    navigateTo('timer');
  });

  // Onboarding egg tap → welcome hatch
  document.getElementById('ob-egg-wrap').addEventListener('click', () => {
    SFX.unlock();
    SFX.crack(0.7);
    startOnboarding();
  });

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
  // Allow Enter key in auth inputs
  ['si-email','si-password'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') performSignIn(); });
  });
  ['su-name','su-email','su-password'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') performSignUp(); });
  });

  // Region filter tabs
  document.querySelectorAll('.region-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.filter = btn.dataset.region;
      renderCollection();
    });
  });

  // DEV shortcuts
  document.addEventListener('keydown', e => {
    // Never fire shortcuts while typing in an input field
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    // H — instant hatch (from timer view); Shift+H cycles through all rarity/variant combos for badge preview
    if (e.key === 'h' || e.key === 'H') {
      if (state.view === 'timer' || state.view === 'hatch') {
        if (e.shiftKey) {
          // Cycle through a showcase: common·standard → rare·standard → legendary·standard → legendary·gold → legendary·crimson → legendary·void
          const showcase = [
            { char: CHARACTERS.shiro,       variant: VARIANTS[0] }, // common standard
            { char: CHARACTERS.koi,         variant: VARIANTS[0] }, // rare standard
            { char: CHARACTERS.kyubi,       variant: VARIANTS[0] }, // legendary standard
            { char: CHARACTERS.kyubi,       variant: VARIANTS[1] }, // legendary gold
            { char: CHARACTERS.kyubi,       variant: VARIANTS[2] }, // legendary crimson
            { char: CHARACTERS.kyubi,       variant: VARIANTS[3] }, // legendary void
          ];
          const idx = ((state._showcaseIdx || 0)) % showcase.length;
          state._showcaseIdx = idx + 1;
          const { char, variant } = showcase[idx];
          state.hatch.character = char;
          state.hatch.variant   = variant;
          prepareHatchView(char, variant);
          navigateTo('hatch');
          document.getElementById('hatch-header').classList.add('show');
          document.getElementById('hatch-actions').classList.add('show');
          document.getElementById('char-wrap').style.opacity = '1';
        } else {
          clearInterval(state.timer.interval);
          state.timer.remaining = 0;
          state.timer.running = false;
          onTimerComplete();
        }
      }
    }
    // F — force fusion test: seeds 2 Shiro Standard then hatches a 3rd (from timer view)
    if (e.key === 'f' || e.key === 'F') {
      if (state.view === 'timer') {
        state.collection.push(
          { id: 'shiro', variant: 'standard', timestamp: Date.now() - 2000 },
          { id: 'shiro', variant: 'standard', timestamp: Date.now() - 1000 }
        );
        saveCollection();
        const orig = rollCharacter;
        window.rollCharacter = () => ({ character: CHARACTERS.shiro, variant: VARIANTS[0] });
        onTimerComplete();
        window.rollCharacter = orig;
      }
    }
    // G — god mode: fill collection with every character × every variant
    if (e.key === 'g' || e.key === 'G') {
      Object.keys(CHARACTERS).forEach(id => {
        VARIANTS.forEach(v => {
          state.collection.push({ id, variant: v.id, timestamp: Date.now() });
        });
      });
      saveCollection();
      navigateTo('collection');
    }
    // X — wipe collection + sessions + sign out (Shift+X)
    if (e.key === 'x' || e.key === 'X') {
      if (e.shiftKey) {
        state.collection = [];
        saveCollection();
        sessions = [];
        localStorage.removeItem('focus-sessions');
        localStorage.removeItem('focus-name');
        renderTimerStats();
        performSignOut();
      }
    }
    // S — seed fake session history for testing stats (Shift+S)
    if (e.key === 's' || e.key === 'S') {
      if (e.shiftKey) {
        const now = Date.now();
        const day = 86400000;
        // 12 sessions spread over the last 8 days (skipping day 5 to show streak break)
        const fakes = [
          { daysAgo: 0,   dur: 25 },
          { daysAgo: 0,   dur: 45 },
          { daysAgo: 1,   dur: 60 },
          { daysAgo: 2,   dur: 25 },
          { daysAgo: 2,   dur: 25 },
          { daysAgo: 3,   dur: 45 },
          { daysAgo: 4,   dur: 60 },
          // day 5 intentionally skipped — streak resets here
          { daysAgo: 6,   dur: 25 },
          { daysAgo: 7,   dur: 45 },
          { daysAgo: 7,   dur: 60 },
        ];
        fakes.forEach(f => {
          sessions.push({ timestamp: now - f.daysAgo * day, duration: f.dur });
        });
        localStorage.setItem('focus-sessions', JSON.stringify(sessions));
        renderTimerStats();
        alert('Seeded 10 fake sessions across 8 days. Streak should show 5.');
      }
    }
    // C — open collection from timer
    if (e.key === 'c' || e.key === 'C') {
      if (state.view === 'timer') navigateTo('collection');
    }
    // A — toggle preview-all mode in collection
    if (e.key === 'a' || e.key === 'A') {
      if (state.view === 'collection') {
        state.previewAll = !state.previewAll;
        renderCollection();
      }
    }
    // Arrow keys — cycle variants in modal
    if (document.getElementById('card-modal').classList.contains('open')) {
      if (e.key === 'ArrowLeft')  { stepModalVariant(-1); return; }
      if (e.key === 'ArrowRight') { stepModalVariant(1);  return; }
    }
    // Escape — close modal first, then back to timer from collection
    if (e.key === 'Escape') {
      if (document.getElementById('card-modal').classList.contains('open')) { closeCardModal(); return; }
      if (state.view === 'collection') {
        navigateTo('timer');
      }
    }
  });

  // ── Auth routing ──────────────────────────────────────────────────────────
  const { data: { session } } = await DB.getSession();
  if (session) {
    await handleSignedIn(session.user);
  } else {
    navigateTo('auth');
    // Auto-focus sign-in email field
    setTimeout(() => document.getElementById('si-email').focus(), 100);
  }
}

document.addEventListener('DOMContentLoaded', init);

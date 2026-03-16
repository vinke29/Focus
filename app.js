// ── FUSION ────────────────────────────────────────────────────────────────────
const VARIANT_NEXT = { standard: 'gold', gold: 'crimson', crimson: 'void' };

// Drop hint: shown on hatch screen for uncommon finds only
const DROP_HINTS = {
  'rare-standard':     '~1 in 4 sessions',
  'legendary-standard':'~1 in 16 sessions',
  'common-gold':       '~1 in 17 sessions',
  'rare-gold':         '~1 in 40 sessions',
  'legendary-gold':    '~1 in 160 sessions',
  'common-crimson':    '~1 in 170 sessions',
  'rare-crimson':      '~1 in 400 sessions',
  'legendary-crimson': '~1 in 1,600 sessions',
  'common-void':       '~1 in 1,700 sessions',
  'rare-void':         '~1 in 4,000 sessions',
  'legendary-void':    '~1 in 16,000 sessions',
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
  document.getElementById('fusion-result-art').innerHTML = char.svg;
  document.getElementById('fusion-result-name').textContent = charNameEn(char);
  const badge = document.getElementById('fusion-result-badge');
  badge.textContent    = char.rarityLabel + ' · ' + toVariant.label;
  badge.style.color    = toVariant.color;
  badge.style.borderColor = toVariant.color;

  overlay.classList.add('open');

  // Animation sequence
  setTimeout(() => title.classList.add('show'), 200);
  setTimeout(() => orbs.forEach(o => o.classList.add('pop')), 600);

  // Converge orbs toward center
  setTimeout(() => {
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

  setTimeout(() => core.classList.add('burst'), 1960);
  setTimeout(() => result.classList.add('reveal'), 2200);
  setTimeout(() => btn.classList.add('show'), 2950);
}

function closeFusionScreen() {
  document.getElementById('fusion-overlay').classList.remove('open');
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
  previewAll: false
};

// ── PERSISTENCE ──────────────────────────────────────────────────────────────
function loadCollection() {
  try {
    const saved = localStorage.getItem('focus-collection');
    if (saved) state.collection = JSON.parse(saved);
  } catch(e) {}
}

function saveCollection() {
  localStorage.setItem('focus-collection', JSON.stringify(state.collection));
}

function addToCollection(character, variant) {
  state.collection.push({ id: character.id, variant: variant.id, timestamp: Date.now() });
  saveCollection();
}

// ── NAVIGATION ───────────────────────────────────────────────────────────────
function navigateTo(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`view-${viewId}`).classList.add('active');
  state.view = viewId;
  if (viewId === 'collection') renderCollection();
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
  }, 1600);

  // 2. Shake at 2.2s
  setTimeout(() => shakeEgg(egg), 2200);

  // 3. BURST at 3.0s
  setTimeout(() => {
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
      // Art
      const art = document.createElement('div');
      art.className = 'card-art';
      art.innerHTML = char.svg;
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
      art.innerHTML = `<div class="locked-icon">undiscovered</div>`;
      card.appendChild(art);
      const info = document.createElement('div');
      info.className = 'card-info';
      info.innerHTML = `<div class="card-name" style="opacity:.2">???</div>`;
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

  // Front: art
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

// ── INIT ──────────────────────────────────────────────────────────────────────
function init() {
  loadCollection();

  // Particle canvas
  particleCanvas = document.getElementById('particles');
  px = particleCanvas.getContext('2d');
  particleCanvas.width  = window.innerWidth;
  particleCanvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    particleCanvas.width  = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  });

  // Inject small egg into timer view
  document.getElementById('timer-egg').innerHTML = EGG_SVG_SMALL;
  updateTimerDisplay();

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

  // Start/pause button
  document.getElementById('btn-start-focus').addEventListener('click', toggleTimer);

  // Collection button
  document.getElementById('btn-open-collection').addEventListener('click', () => navigateTo('collection'));
  document.getElementById('btn-back-to-timer').addEventListener('click', () => {
    resetTimerState();
    navigateTo('timer');
  });

  // Hatch actions
  document.getElementById('btn-see-collection').addEventListener('click', () => navigateTo('collection'));
  document.getElementById('btn-focus-again').addEventListener('click', () => {
    resetTimerState();
    navigateTo('timer');
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
    // H — instant hatch (from timer view)
    if (e.key === 'h' || e.key === 'H') {
      if (state.view === 'timer') {
        state.timer.remaining = 0;
        clearInterval(state.timer.interval);
        state.timer.running = false;
        onTimerComplete();
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
        resetTimerState();
        navigateTo('timer');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', init);

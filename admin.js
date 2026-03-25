// ── KOKOON ADMIN DASHBOARD ───────────────────────────────────────────────────

const ADMIN_EMAIL = 'ignaciovinke@gmail.com';
const TOTAL_CHARS = 60;

// Character metadata for enriching the animal distribution chart
const CHAR_META = {
  shiro:'Shiro',karasu:'Karasu',kyubi:'Kyubi',tanuki:'Tanuki',koi:'Koi',
  kappa:'Kappa',kodama:'Kodama',oni:'Oni',baku:'Baku',raijin_wolf:'Raijin Wolf',
  tsuru:'Tsuru',jorogumo:'Jorogumo',
  capybara:'Capybara',axolotl:'Axolotl',quetzal:'Quetzal',condor:'Condor',
  jaguar:'Jaguar',armadillo:'Armadillo',llama:'Llama',chupacabra:'Chupacabra',
  coati:'Coati',tapir:'Tapir',anaconda:'Anaconda',colibri:'Colibri',
  hedgehog:'Hedgehog',hare:'Hare',stag:'Stag',gryphon:'Gryphon',
  unicorn:'Unicorn',selkie:'Selkie',wisp:'Wisp',wyvern:'Wyvern',
  robin:'Robin',badger:'Badger',salamander:'Salamander',fenrir:'Fenrir',
  meerkat:'Meerkat',mongoose:'Mongoose',pangolin:'Pangolin',warthog:'Warthog',
  hyena:'Hyena',okapi:'Okapi',chameleon:'Chameleon',honey_badger:'Honey Badger',
  hippo:'Hippo',serval:'Serval',tau:'Tau',gorilla:'Gorilla',
  sprite:'Sprite',imp:'Imp',golem:'Golem',djinn:'Djinn',basilisk:'Basilisk',
  fairy:'Fairy',chimera:'Chimera',kraken:'Kraken',phoenix:'Phoenix',
  myconid:'Myconid',mimic:'Mimic',wyrm:'Wyrm',
};

const CHAR_RARITY = {};
['shiro','tanuki','kappa','kodama','tsuru','capybara','armadillo','llama','colibri','hedgehog','hare','wisp','robin','badger','meerkat','mongoose','coati','tapir','pangolin','warthog','chameleon','sprite','imp','fairy','myconid','mimic']
  .forEach(id => CHAR_RARITY[id] = 'common');
['karasu','koi','oni','baku','jorogumo','axolotl','quetzal','condor','jaguar','stag','gryphon','selkie','salamander','fenrir','anaconda','hyena','okapi','honey_badger','hippo','serval','gorilla','golem','djinn','basilisk','chimera','kraken']
  .forEach(id => CHAR_RARITY[id] = 'rare');
['kyubi','raijin_wolf','chupacabra','unicorn','wyvern','phoenix','tau','wyrm']
  .forEach(id => CHAR_RARITY[id] = 'legendary');

let currentPeriod = 'all';

// ── Init ─────────────────────────────────────────────────────────────────────

async function init() {
  const { data } = await DB.getSession().catch(() => ({ data: { session: null } }));
  const session = data?.session;

  if (!session || session.user.email !== ADMIN_EMAIL) {
    document.getElementById('admin-loading').style.display = 'none';
    document.getElementById('admin-unauthorized').style.display = 'flex';
    setTimeout(() => window.location.href = '/app', 2000);
    return;
  }

  // Period toggle
  document.querySelectorAll('.admin-period-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.admin-period-toggle .active').classList.remove('active');
      btn.classList.add('active');
      currentPeriod = btn.dataset.period;
      loadDashboard();
    });
  });

  await loadDashboard();
  initCharactersView();
  document.getElementById('admin-loading').style.display = 'none';
  document.getElementById('admin-dashboard').style.display = 'block';
}

// ── Data loading ─────────────────────────────────────────────────────────────

let _animalData = { hatched: [], nurtured: [], evolved: [] };

async function loadDashboard() {
  const [overview, animals, nurtured, evolved, leaders, splits, signups, streaks, dau, sessionsTime, evolutionsTime, signupList] = await Promise.all([
    DB.rpc('admin_overview',              { p_period: currentPeriod }),
    DB.rpc('admin_animal_distribution',   { p_period: currentPeriod }),
    DB.rpc('admin_nurture_per_animal'),
    DB.rpc('admin_evolutions_per_animal'),
    DB.rpc('admin_collection_leaders',    { p_period: currentPeriod }),
    DB.rpc('admin_session_splits',        { p_period: currentPeriod }),
    DB.rpc('admin_signups_over_time',     { p_period: currentPeriod }),
    DB.rpc('admin_streak_distribution'),
    DB.rpc('admin_daily_active_users',    { p_period: currentPeriod }),
    DB.rpc('admin_sessions_over_time',    { p_period: currentPeriod }),
    DB.rpc('admin_evolutions_over_time',  { p_period: currentPeriod }),
    DB.rpc('admin_signup_list',           { p_period: currentPeriod }),
  ]);

  if (overview.error) { console.error('admin_overview:', overview.error); return; }

  _animalData = {
    hatched:  animals.data  || [],
    nurtured: nurtured.data || [],
    evolved:  evolved.data  || [],
  };

  renderCards(overview.data);
  renderAnimalTabs();
  renderSplitsChart(splits.data || []);
  renderSignupsChart(signups.data || []);
  renderDAUChart(dau.data || []);
  renderSessionsOverTimeChart(sessionsTime.data || []);
  renderEvolutionsOverTimeChart(evolutionsTime.data || []);
  renderStreaksChart(streaks.data || []);
  renderLeaders(leaders.data || []);
  renderSignupList(signupList.data || []);
}

// ── Render: metric cards ─────────────────────────────────────────────────────

function renderCards(d) {
  document.getElementById('m-users').textContent    = fmt(d.total_users);
  document.getElementById('m-animals').textContent  = fmt(d.total_animals);
  document.getElementById('m-sessions').textContent = fmt(d.total_sessions);
  document.getElementById('m-dau').textContent      = fmt(d.dau);
  document.getElementById('m-nurture').textContent  = fmt(d.total_nurture_sessions);
  document.getElementById('m-evolved').textContent  = fmt(d.total_evolved);

  const mins = d.total_focus_minutes;
  const hrs  = Math.floor(mins / 60);
  const rm   = mins % 60;
  document.getElementById('m-time').textContent = hrs > 0 ? `${hrs}h ${rm}m` : `${rm}m`;

  const newEl = document.getElementById('m-new-users');
  if (currentPeriod !== 'all' && d.new_users !== undefined) {
    newEl.textContent = `+${d.new_users} new`;
  } else {
    newEl.textContent = '';
  }
}

// ── Render: bar charts ───────────────────────────────────────────────────────

function renderBarChart(container, items, labelFn, valueFn, classFn, clickFn) {
  const el = document.getElementById(container);
  if (!items.length) { el.innerHTML = '<span style="opacity:.3;font-size:.6rem">no data</span>'; return; }
  const max = Math.max(...items.map(valueFn), 1);
  el.innerHTML = items.map((item, i) => {
    const pct = (valueFn(item) / max * 100).toFixed(1);
    const cls = classFn ? classFn(item) : '';
    const clickable = clickFn ? 'style="cursor:pointer" data-i="' + i + '"' : '';
    return `<div class="bar-row" ${clickable}>
      <span class="bar-label">${labelFn(item)}</span>
      <div class="bar-track"><div class="bar-fill ${cls}" style="width:${pct}%"></div></div>
      <span class="bar-value">${fmt(valueFn(item))}</span>
    </div>`;
  }).join('');
  if (clickFn) {
    el.querySelectorAll('.bar-row[data-i]').forEach(row => {
      row.addEventListener('click', () => clickFn(items[+row.dataset.i]));
    });
  }
}

let _activeAnimalTab = 'hatched';

function renderAnimalTabs() {
  document.querySelectorAll('.animal-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === _activeAnimalTab);
    btn.onclick = () => {
      _activeAnimalTab = btn.dataset.tab;
      renderAnimalTabs();
    };
  });
  const data = _animalData[_activeAnimalTab] || [];
  renderBarChart('chart-animals', data,
    d => CHAR_META[d.char_id] || d.char_id,
    d => d.count,
    d => CHAR_RARITY[d.char_id] || ''
  );
}

function renderSplitsChart(data) {
  renderBarChart('chart-splits', data, d => d.bucket, d => d.count);
}

function renderSignupsChart(data) {
  const label = currentPeriod === 'all' ? d => 'wk ' + formatDay(d.day) : d => formatDay(d.day);
  renderBarChart('chart-signups', data, label, d => d.signups);
}

function renderDAUChart(data) {
  const label = currentPeriod === 'all' ? d => 'wk ' + formatDay(d.day) : d => formatDay(d.day);
  renderBarChart('chart-dau', data, label, d => d.active_users, null, d => showDAUDetail(d.day));
}

async function showDAUDetail(day) {
  const dateStr = String(day).slice(0, 10); // YYYY-MM-DD, no timezone shift
  const [yr, mo, dy] = dateStr.split('-');
  const label = `${parseInt(mo)}/${parseInt(dy)}/${yr}`;

  const modal = document.getElementById('dau-modal');
  const title = document.getElementById('dau-modal-title');
  const body  = document.getElementById('dau-modal-body');

  title.textContent = `Active users — ${label}`;
  body.innerHTML = '<span style="opacity:.4;font-size:.6rem">loading...</span>';
  modal.style.display = 'flex';

  const { data, error } = await DB.rpc('admin_dau_detail', { p_date: dateStr });
  if (error || !data) { body.innerHTML = '<span style="opacity:.4;font-size:.6rem">error loading data</span>'; return; }

  if (!data.length) { body.innerHTML = '<span style="opacity:.4;font-size:.6rem">no sessions found</span>'; return; }

  const rows = data.map((d, i) => `<tr>
    <td>${i + 1}</td>
    <td>${esc(d.name)}</td>
    <td style="opacity:.5;font-size:.55rem">${esc(d.email || '—')}</td>
    <td>${d.sessions}</td>
  </tr>`).join('');
  body.innerHTML = `<table class="admin-table">
    <thead><tr><th>#</th><th>name</th><th>email</th><th>sessions</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function renderStreaksChart(data) {
  renderBarChart('chart-streaks', data, d => d.bucket, d => d.count);
}

function renderSessionsOverTimeChart(data) {
  const label = currentPeriod === 'all' ? d => 'wk ' + formatDay(d.day) : d => formatDay(d.day);
  renderBarChart('chart-sessions-time', data, label, d => d.sessions);
}

function renderEvolutionsOverTimeChart(data) {
  const label = currentPeriod === 'all' ? d => 'wk ' + formatDay(d.day) : d => formatDay(d.day);
  renderBarChart('chart-evolutions-time', data, label, d => d.evolutions);
}

// ── Render: leaders table ────────────────────────────────────────────────────

function renderLeaders(data) {
  const el = document.getElementById('panel-leaders');
  if (!data.length) { el.innerHTML = '<span style="opacity:.3;font-size:.6rem">no data</span>'; return; }
  const rows = data.map((d, i) => {
    const pct = (d.unique_chars / TOTAL_CHARS * 100).toFixed(0);
    const barW = Math.max(pct, 2);
    const hintIcon = d.evo_hint_seen ? '✓' : '—';
    return `<tr>
      <td>${i + 1}</td>
      <td style="min-width:140px">${esc(d.name)}${d.email ? `<br><span style="opacity:.4;font-size:.55rem">${esc(d.email)}</span>` : ''}</td>
      <td>${d.unique_chars}<span style="opacity:.3">/${TOTAL_CHARS}</span> <span class="completion-bar" style="width:${barW}px"></span></td>
      <td>${d.std || 0}</td>
      <td style="color:#c9a227">${d.gold || 0}</td>
      <td style="color:#c0392b">${d.crimson || 0}</td>
      <td style="color:#5b2d8e">${d.void || 0}</td>
      <td>${d.total_animals}</td>
      <td>${d.nurture_sessions || 0}</td>
      <td>${d.evolved_count || 0}</td>
      <td>${hintIcon}</td>
    </tr>`;
  }).join('');
  el.innerHTML = `<table class="admin-table">
    <thead><tr><th>#</th><th>name</th><th>unique</th><th>std</th><th style="color:#c9a227">gold</th><th style="color:#c0392b">crim</th><th style="color:#5b2d8e">void</th><th>total</th><th>nurture</th><th>evolved</th><th>hint</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

// ── Render: signup list table ─────────────────────────────────────────────

function renderSignupList(data) {
  const el = document.getElementById('panel-signups-list');
  if (!data.length) { el.innerHTML = '<span style="opacity:.3;font-size:.6rem">no sign-ups</span>'; return; }
  const rows = data.map((d, i) => {
    const date = new Date(d.created_at);
    const ts = `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')}`;
    return `<tr>
      <td>${i + 1}</td>
      <td>${esc(d.name)}</td>
      <td>${esc(d.email || '—')}</td>
      <td>${ts}</td>
    </tr>`;
  }).join('');
  el.innerHTML = `<table class="admin-table">
    <thead><tr><th>#</th><th>name</th><th>email</th><th>signed up</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n) {
  if (n == null) return '—';
  return Number(n).toLocaleString();
}

function formatDay(d) {
  if (!d) return '';
  const [, month, day] = String(d).split('-');
  return `${parseInt(month)}/${parseInt(day)}`;
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

// ── Characters QA view ───────────────────────────────────────────────────────

const NURTURE_IDS = new Set([
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

let qaForm    = 'plain';
let qaVariant = 'standard';

function initCharactersView() {
  // Top-level tab switching
  document.querySelectorAll('.admin-top-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-top-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.dataset.view;
      document.getElementById('view-dashboard').classList.toggle('active', view === 'dashboard');
      document.getElementById('view-characters').classList.toggle('active', view === 'characters');
      // Hide period toggle when in characters view
      document.querySelector('.admin-period-toggle').style.visibility =
        view === 'characters' ? 'hidden' : 'visible';
      if (view === 'characters') renderQAGrid();
    });
  });

  // Filter pills
  document.querySelectorAll('.qa-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter;
      document.querySelectorAll(`.qa-pill[data-filter="${filter}"]`).forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (filter === 'form') {
        qaForm = pill.dataset.value;
        // Disable variant pills for nurtured (variants don't apply)
        document.querySelectorAll('#variant-pills .qa-pill').forEach(p => {
          p.disabled = qaForm === 'nurtured';
          p.classList.toggle('active', p.dataset.value === 'standard');
        });
        if (qaForm === 'nurtured') qaVariant = 'standard';
      } else {
        qaVariant = pill.dataset.value;
      }
      renderQAGrid();
    });
  });
}

function qaCharNameEn(char) {
  const name = char.name || '';
  if (!name.includes('·')) return name;
  const parts = name.split('·').map(s => s.trim());
  return /^[A-Za-z0-9'\-\s]+$/.test(parts[0]) ? parts[0] : parts[parts.length - 1];
}

function renderQAGrid() {
  const grid = document.getElementById('qa-grid');
  if (!grid) return;

  const ids = Object.keys(CHARACTERS);
  const vfClass = qaVariant !== 'standard' ? `vf-${qaVariant}` : '';

  grid.innerHTML = ids.map(id => {
    const char  = CHARACTERS[id];
    const rarity = char.rarity || 'common';
    const enName = qaCharNameEn(char) || id;
    let artHtml;
    let hasContent = true;

    if (qaForm === 'plain') {
      artHtml = `<div class="qa-art ${vfClass}">${char.svg}</div>`;

    } else if (qaForm === 'evolved') {
      const evo = typeof EVOLUTIONS !== 'undefined' && EVOLUTIONS[id];
      if (evo) {
        artHtml = `<div class="qa-art ${vfClass}">${evo.svg}</div>`;
      } else {
        artHtml = `<div class="qa-placeholder">no evolved form</div>`;
        hasContent = false;
      }

    } else { // nurtured
      if (NURTURE_IDS.has(id)) {
        artHtml = `<div class="qa-art"><img src="/chars/${id}_nurture.png" alt="${id}" onerror="this.parentElement.outerHTML='<div class=\\'qa-placeholder\\'>no image</div>'"></div>`;
      } else {
        artHtml = `<div class="qa-placeholder">no nurture image</div>`;
        hasContent = false;
      }
    }

    const clickable = hasContent ? `data-qa-id="${id}" style="cursor:pointer"` : '';
    return `<div class="qa-card" ${clickable}>
      ${artHtml}
      <div class="qa-name">${esc(enName)}<br><span style="opacity:.4">${id}</span></div>
      <div class="qa-rarity">${rarity}</div>
    </div>`;
  }).join('');

  // Event delegation — one listener on the grid
  grid.onclick = e => {
    const card = e.target.closest('[data-qa-id]');
    if (card) openQAModal(card.dataset.qaId);
  };
}

function openQAModal(id) {
  const char = CHARACTERS[id];
  if (!char) return;

  const enName  = qaCharNameEn(char) || id;
  const subtitle = char.subtitle || '';
  const vfClass  = qaVariant !== 'standard' ? `vf-${qaVariant}` : '';

  // Resolve art + lore
  let artHtml, lore, haiku;
  if (qaForm === 'evolved') {
    const evo = typeof EVOLUTIONS !== 'undefined' && EVOLUTIONS[id];
    artHtml = evo ? evo.svg : char.svg;
    lore    = evo?.lore || char.lore || '';
    haiku   = evo?.haiku || char.haiku || '';
  } else if (qaForm === 'nurtured') {
    artHtml = `<img src="/chars/${id}_nurture.png" alt="${id}">`;
    lore    = char.lore || '';
    haiku   = char.haiku || '';
  } else {
    artHtml = char.svg;
    lore    = char.lore || '';
    haiku   = char.haiku || '';
  }

  // Populate modal
  const art = document.getElementById('qa-modal-art');
  art.className = 'qa-modal-art' + (vfClass ? ' ' + vfClass : '');
  art.innerHTML = artHtml;

  document.getElementById('qa-modal-back-name').textContent  = enName;
  document.getElementById('qa-modal-back-lore').textContent  = lore;
  document.getElementById('qa-modal-back-haiku').innerHTML   = haiku.split('\n').join('<br>');
  document.getElementById('qa-modal-back-rarity').textContent = char.rarity || '';
  document.getElementById('qa-modal-name').textContent = enName;
  document.getElementById('qa-modal-sub').textContent  = subtitle;

  // Reset flip state
  document.getElementById('qa-modal-card').classList.remove('flipped');

  document.getElementById('qa-modal').classList.add('open');
}

function closeQAModal() {
  document.getElementById('qa-modal').classList.remove('open');
}

// ── Boot ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);

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
  document.getElementById('admin-loading').style.display = 'none';
  document.getElementById('admin-dashboard').style.display = 'block';
}

// ── Data loading ─────────────────────────────────────────────────────────────

async function loadDashboard() {
  const [overview, animals, leaders, splits, signups, streaks, dau, signupList] = await Promise.all([
    DB.rpc('admin_overview',            { p_period: currentPeriod }),
    DB.rpc('admin_animal_distribution', { p_period: currentPeriod }),
    DB.rpc('admin_collection_leaders',  { p_period: currentPeriod }),
    DB.rpc('admin_session_splits',      { p_period: currentPeriod }),
    DB.rpc('admin_signups_over_time',   { p_period: currentPeriod }),
    DB.rpc('admin_streak_distribution'),
    DB.rpc('admin_daily_active_users',  { p_period: currentPeriod }),
    DB.rpc('admin_signup_list',         { p_period: currentPeriod }),
  ]);

  if (overview.error) { console.error('admin_overview:', overview.error); return; }

  renderCards(overview.data);
  renderAnimalChart(animals.data || []);
  renderSplitsChart(splits.data || []);
  renderSignupsChart(signups.data || []);
  renderDAUChart(dau.data || []);
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

function renderBarChart(container, items, labelFn, valueFn, classFn) {
  const el = document.getElementById(container);
  if (!items.length) { el.innerHTML = '<span style="opacity:.3;font-size:.6rem">no data</span>'; return; }
  const max = Math.max(...items.map(valueFn), 1);
  el.innerHTML = items.map(item => {
    const pct = (valueFn(item) / max * 100).toFixed(1);
    const cls = classFn ? classFn(item) : '';
    return `<div class="bar-row">
      <span class="bar-label">${labelFn(item)}</span>
      <div class="bar-track"><div class="bar-fill ${cls}" style="width:${pct}%"></div></div>
      <span class="bar-value">${fmt(valueFn(item))}</span>
    </div>`;
  }).join('');
}

function renderAnimalChart(data) {
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
  renderBarChart('chart-dau', data, label, d => d.active_users);
}

function renderStreaksChart(data) {
  renderBarChart('chart-streaks', data, d => d.bucket, d => d.count);
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
  const date = new Date(d);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

// ── Boot ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);

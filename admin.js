// ── KOKOON ADMIN DASHBOARD ───────────────────────────────────────────────────

const ADMIN_EMAIL = 'ignaciovinke@gmail.com';
const TOTAL_CHARS = 44;

// Character metadata for enriching the animal distribution chart
const CHAR_META = {
  shiro:'Shiro',karasu:'Karasu',kyubi:'Kyubi',tanuki:'Tanuki',koi:'Koi',
  kappa:'Kappa',kodama:'Kodama',oni:'Oni',baku:'Baku',raijin_wolf:'Raijin Wolf',
  capybara:'Capybara',axolotl:'Axolotl',quetzal:'Quetzal',condor:'Condor',
  jaguar:'Jaguar',armadillo:'Armadillo',llama:'Llama',chupacabra:'Chupacabra',
  coati:'Coati',tapir:'Tapir',anaconda:'Anaconda',
  hedgehog:'Hedgehog',hare:'Hare',stag:'Stag',gryphon:'Gryphon',
  unicorn:'Unicorn',selkie:'Selkie',wisp:'Wisp',wyvern:'Wyvern',
  meerkat:'Meerkat',mongoose:'Mongoose',pangolin:'Pangolin',warthog:'Warthog',
  hyena:'Hyena',okapi:'Okapi',
  sprite:'Sprite',imp:'Imp',golem:'Golem',djinn:'Djinn',basilisk:'Basilisk',
  fairy:'Fairy',chimera:'Chimera',kraken:'Kraken',phoenix:'Phoenix',
};

const CHAR_RARITY = {};
['shiro','tanuki','kappa','kodama','capybara','armadillo','llama','hedgehog','hare','wisp','meerkat','mongoose','coati','tapir','pangolin','warthog','sprite','imp','fairy']
  .forEach(id => CHAR_RARITY[id] = 'common');
['karasu','koi','oni','baku','axolotl','quetzal','condor','jaguar','stag','gryphon','selkie','anaconda','hyena','okapi','golem','djinn','basilisk','chimera','kraken']
  .forEach(id => CHAR_RARITY[id] = 'rare');
['kyubi','raijin_wolf','chupacabra','unicorn','wyvern','phoenix']
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
  const [overview, animals, leaders, splits, signups, streaks, dau] = await Promise.all([
    DB.rpc('admin_overview',            { p_period: currentPeriod }),
    DB.rpc('admin_animal_distribution', { p_period: currentPeriod }),
    DB.rpc('admin_collection_leaders',  { p_period: currentPeriod }),
    DB.rpc('admin_session_splits',      { p_period: currentPeriod }),
    DB.rpc('admin_signups_over_time',   { p_period: currentPeriod }),
    DB.rpc('admin_streak_distribution'),
    DB.rpc('admin_daily_active_users',  { p_period: currentPeriod }),
  ]);

  if (overview.error) { console.error('admin_overview:', overview.error); return; }

  renderCards(overview.data);
  renderAnimalChart(animals.data || []);
  renderSplitsChart(splits.data || []);
  renderSignupsChart(signups.data || []);
  renderDAUChart(dau.data || []);
  renderStreaksChart(streaks.data || []);
  renderLeaders(leaders.data || []);
}

// ── Render: metric cards ─────────────────────────────────────────────────────

function renderCards(d) {
  document.getElementById('m-users').textContent    = fmt(d.total_users);
  document.getElementById('m-animals').textContent  = fmt(d.total_animals);
  document.getElementById('m-sessions').textContent = fmt(d.total_sessions);
  document.getElementById('m-dau').textContent      = fmt(d.dau);

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
    return `<tr>
      <td>${i + 1}</td>
      <td>${esc(d.name)}</td>
      <td>${d.unique_chars}/${TOTAL_CHARS} <span class="completion-bar" style="width:${barW}px"></span></td>
      <td><span style="opacity:.7">${d.common || 0}</span><span style="opacity:.3">/19</span> · <span style="color:var(--blue)">${d.rare || 0}</span><span style="opacity:.3">/19</span> · <span style="color:var(--gold)">${d.legendary || 0}</span><span style="opacity:.3">/6</span></td>
      <td>${variantBadges(d)}</td>
      <td>${d.total_animals}</td>
    </tr>`;
  }).join('');
  el.innerHTML = `<table class="admin-table">
    <thead><tr><th>#</th><th>name</th><th>unique</th><th>C · R · L</th><th>variants</th><th>total</th></tr></thead>
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

function variantBadges(d) {
  const parts = [];
  if (d.gold)    parts.push(`<span style="color:#c9a227">${d.gold}G</span>`);
  if (d.crimson) parts.push(`<span style="color:#c0392b">${d.crimson}C</span>`);
  if (d.void)    parts.push(`<span style="color:#5b2d8e">${d.void}V</span>`);
  return parts.length ? parts.join(' ') : '<span style="opacity:.25">—</span>';
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

// ── Boot ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);

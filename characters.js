// ── EGG (timer view, small) ──────────────────────────────────────────────────
const EGG_SVG_SMALL = `
<svg width="160" height="200" viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="teggGrd" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#ddd8ca"/>
    </radialGradient>
    <radialGradient id="teggGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f0a500" stop-opacity=".18"/>
      <stop offset="100%" stop-color="#f0a500" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="110" cy="268" rx="55" ry="9" fill="rgba(0,0,0,.1)"/>
  <path d="M110,8 C158,8 196,60 196,148 C196,222 158,272 110,272 C62,272 24,222 24,148 C24,60 62,8 110,8 Z"
    fill="url(#teggGrd)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>
  <path d="M110,8 C158,8 196,60 196,148 C196,222 158,272 110,272 C62,272 24,222 24,148 C24,60 62,8 110,8 Z"
    fill="url(#teggGlow)"/>
  <path d="M75,45 C82,32 96,24 105,22" stroke="white" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".7"/>
  <path d="M60,80 C64,68 70,58 76,52" stroke="white" stroke-width="2" stroke-linecap="round" fill="none" opacity=".4"/>
  <g class="egg-rune" opacity=".35">
    <ellipse cx="110" cy="120" rx="22" ry="28" stroke="#f0a500" stroke-width="2" fill="none" opacity=".5"/>
    <ellipse cx="110" cy="120" rx="12" ry="16" stroke="#f5c842" stroke-width="1.5" fill="none" opacity=".4"/>
  </g>
</svg>`;

// ── CHARACTERS ───────────────────────────────────────────────────────────────

// ── EVOLUTION MAP ─────────────────────────────────────────────────────────────
// Maps base character id → evolved character definition.
// Only characters with an entry here can evolve.
const EVOLUTIONS = {
  shiro: {
    id: 'shiro_evolved',
    name: '白猫 · Shiro',
    nameShort: '白猫',
    region: 'japanese',
    subtitle: 'White Cat Spirit · Evolved',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#f0a500',
    lore: 'Through patient devotion, Shiro\'s single tail has bloomed into flowing spirit flames. She now guards her keeper\'s focus with ancient power.',
    haiku: '静かな炎<br>白猫の尾が光る<br>集中の守り',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/shiro_evolved.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  karasu: {
    id: 'karasu_evolved',
    name: '烏天狗 · Karasu',
    nameShort: '烏天狗',
    region: 'japanese',
    subtitle: 'Crow Tengu · Evolved',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#d40000',
    lore: 'Having memorised every secret the forest ever held, Karasu now commands the wind itself. His wings carry the weight of a thousand whispered truths.',
    haiku: '嵐の翼<br>千の秘密を抱いて<br>天狗は翔ける',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/karasu_evolved.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  tanuki: {
    id: 'tanuki_evolved',
    name: '狸 · Tanuki',
    nameShort: '狸',
    region: 'japanese',
    subtitle: 'Raccoon Dog Spirit · Evolved',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#8B5E14',
    lore: 'No longer a wanderer, Tanuki has mastered every shape the world offers. His belly-drum now shakes the earth and calls the harvest moon.',
    haiku: '形を変えて<br>満月に腹を打つ<br>古狸の力',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/tanuki_evolved.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  koi: {
    id: 'koi_evolved',
    name: '錦鯉 · Koi',
    nameShort: '錦鯉',
    region: 'japanese',
    subtitle: 'Sacred Carp · Evolved',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#E84000',
    lore: 'Having crested every waterfall the world could place before it, Koi now blazes through the sky, its scales burning like a comet at dusk.',
    haiku: '滝を越えて<br>炎の鱗が輝く<br>空を泳ぐ鯉',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/koi_evolved.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  kappa: {
    id: 'kappa_evolved',
    name: '河童 · Kappa',
    nameShort: '河童',
    region: 'japanese',
    subtitle: 'River Imp · Evolved',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#2E7D52',
    lore: 'Kappa has grown into a true guardian of rivers. His dish-plate never spills now, brimming with water that can heal or command the deep currents.',
    haiku: '皿に満ちた水<br>川の命を守りて<br>河童は立つ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/kappa_evolved.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  kodama: {
    id: 'kodama_evolved',
    name: '木霊 · Kodama',
    nameShort: '木霊',
    region: 'japanese',
    subtitle: 'Forest Echo · Evolved',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#7AAE3E',
    lore: 'Rooted in centuries of whispered wishes, Kodama has grown into the forest itself. Every tree in the grove now echoes its ancient voice.',
    haiku: '森全体が<br>一つの声となりて<br>木霊は歌う',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/kodama_evolved.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  oni: {
    id: 'oni_evolved',
    name: '鬼 · Oni',
    nameShort: '鬼',
    region: 'japanese',
    subtitle: 'Mountain Demon · Evolved',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#C41C1C',
    lore: 'The mountains themselves tremble when Oni passes. His judgment is now absolute — those with focused hearts find safe passage; those who wander are turned back.',
    haiku: '山が震える<br>鬼の一声で道<br>開かれる今',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/oni_evolved.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  baku: {
    id: 'baku_evolved',
    name: '獏 · Baku',
    nameShort: '獏',
    region: 'japanese',
    subtitle: 'Dream Eater · Evolved',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#7b4aff',
    lore: 'Baku no longer merely consumes nightmares — it shapes the dreamscape itself, weaving focus and clarity into the sleep of those it protects.',
    haiku: '夢を織りなし<br>闇を光へと変え<br>獏は守る',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/baku_evolved.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  raijin_wolf: {
    id: 'raijin_wolf_evolved',
    name: '雷神狼 · Raijin',
    nameShort: '雷神狼',
    region: 'japanese',
    subtitle: 'Thunder Wolf · Evolved',
    rarity: 'legendary',
    rarityLabel: '✦ Legendary',
    accentColor: '#00b4ff',
    lore: 'Born from a thundercloud, Raijin has grown into a storm unto himself. His howl splits the sky and his paws leave scorched earth crackling with lightning.',
    haiku: '嵐を纏い<br>雷神狼が駆ける<br>天地が揺れる',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/raijin_wolf_evolved.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  tsuru: {
    id: 'tsuru_evolved',
    name: '鶴 · Tsuru',
    nameShort: '鶴',
    region: 'japanese',
    subtitle: 'Sacred Crane · Evolved',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#C62828',
    lore: 'A thousand years of patience have made Tsuru\'s dance a force of nature. Where she lands, the mist clears and time slows to a perfect stillness.',
    haiku: '千年の舞<br>霧が晴れ時が止む<br>鶴の羽広げ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/tsuru_evolved.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  jorogumo: {
    id: 'jorogumo_evolved',
    name: '絡新婦 · Jorogumo',
    nameShort: '絡新婦',
    region: 'japanese',
    subtitle: 'Spider Enchantress · Evolved',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#B8860B',
    lore: 'Jorogumo\'s webs now span entire valleys, each thread a golden story. Those who follow them find not a trap, but the path to their deepest focus.',
    haiku: '谷を渡る糸<br>黄金の物語紡ぎ<br>蜘蛛は待ちわびる',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/jorogumo_evolved.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  }
};

const EVOLUTION_SESSIONS = 5; // sessions with creature pinned to trigger evolution

const CHARACTERS = {

  // ── 白猫 · Shiro ─ Common ─ Amber ──────────────────────────────────────────
  shiro: {
    id: 'shiro',
    name: '白猫 · Shiro',
    nameShort: '白猫',
    region: 'japanese',
    subtitle: 'White Cat Spirit · Baby Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#f0a500',
    lore: 'A ghost-white cat spirit born from a moonbeam, who brings calm focus to those who welcome her into their study.',
    haiku: '満月の下で<br>白猫は夢を見る<br>夜明けの吐息',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/shiro.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── 烏天狗 · Karasu ─ Rare ─ Red ───────────────────────────────────────────
  karasu: {
    id: 'karasu',
    name: '烏天狗 · Karasu',
    nameShort: '烏天狗',
    region: 'japanese',
    subtitle: 'Crow Tengu · Fledgling Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#d40000',
    lore: 'A young crow tengu who memorises every secret spoken beneath the forest canopy and trades wisdom for focused silence.',
    haiku: '赤い目が嵐を<br>裂く夜明け前に読む<br>知恵は無言なり',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/karasu.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── 九尾狐 · Kyūbi ─ Legendary ─ Blue ─────────────────────────────────────
  kyubi: {
    id: 'kyubi',
    name: '九尾狐 · Kyūbi',
    nameShort: '九尾狐',
    region: 'japanese',
    subtitle: 'Nine-Tail Fox Spirit · Baby Form',
    rarity: 'legendary',
    rarityLabel: '✦ Legendary',
    accentColor: '#0047ff',
    lore: 'A legendary nine-tailed fox whose tails fan like starlight — each one earned through a century of perfect, unbroken focus.',
    haiku: '九つの尾が<br>星のように弧を描く<br>集中の空',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/kyubi.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── 狸 · Tanuki ─ Common ─ Brown ────────────────────────────────────────────
  tanuki: {
    id: 'tanuki',
    name: '狸 · Tanuki',
    nameShort: '狸',
    subtitle: 'Raccoon Dog Spirit · Wanderer Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#8B5E14',
    region: 'japanese',
    lore: 'A mischievous shape-shifter who drums his belly under autumn moons.',
    haiku: '秋の夜に<br>腹鼓を打つ狸<br>月が笑う',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/tanuki.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── 錦鯉 · Koi ─ Rare ─ Orange-Red ─────────────────────────────────────────
  koi: {
    id: 'koi',
    name: '錦鯉 · Koi',
    nameShort: '錦鯉',
    subtitle: 'Sacred Carp · River Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#E84000',
    region: 'japanese',
    lore: 'A carp who swam upstream through a thousand storms and earned its scales of fire.',
    haiku: '流れに逆らう<br>紅い鱗が光る<br>川の夢見る',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/koi.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── 河童 · Kappa ─ Common ─ Green ───────────────────────────────────────────
  kappa: {
    id: 'kappa',
    name: '河童 · Kappa',
    nameShort: '河童',
    subtitle: 'River Imp · Shallow Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#2E7D52',
    region: 'japanese',
    lore: 'A polite river guardian who bows so deeply his dish-plate spills and he loses his power.',
    haiku: '礼儀正しく<br>皿の水こぼれる<br>夏の河童よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/kappa.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── 木霊 · Kodama ─ Common ─ Green ──────────────────────────────────────────
  kodama: {
    id: 'kodama',
    name: '木霊 · Kodama',
    nameShort: '木霊',
    subtitle: 'Forest Echo · Seedling Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#7AAE3E',
    region: 'japanese',
    lore: 'A tiny forest spirit born from an ancient tree that remembers every whispered wish.',
    haiku: '古木の中に<br>静かな声が宿る<br>風の木霊よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/kodama.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── 鬼 · Oni ─ Rare ─ Red ───────────────────────────────────────────────────
  oni: {
    id: 'oni',
    name: '鬼 · Oni',
    nameShort: '鬼',
    subtitle: 'Mountain Demon · Young Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#C41C1C',
    region: 'japanese',
    lore: 'A red-horned demon who guards the mountain passes and judges the hearts of travelers.',
    haiku: '赤い角持ち<br>山の番人として<br>鬼は眠らぬ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/oni.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── 獏 · Baku ─ Rare ─ Purple ───────────────────────────────────────────────
  baku: {
    id: 'baku',
    name: '獏 · Baku',
    nameShort: '獏',
    subtitle: 'Dream Eater · Slumbering Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#7b4aff',
    region: 'japanese',
    lore: 'A chimeric spirit that devours nightmares, leaving only the sweetest dreams behind.',
    haiku: '悪夢を食らう<br>朝の光の前に<br>獏は消えゆく',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/baku.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── 雷神狼 · Raijin Wolf ─ Legendary ─ Amber ────────────────────────────────
  raijin_wolf: {
    id: 'raijin_wolf',
    name: '雷神狼 · Raijin',
    nameShort: '雷神狼',
    subtitle: 'Thunder Wolf · Storm Cub',
    rarity: 'legendary',
    rarityLabel: '✦ Legendary',
    accentColor: '#00b4ff',
    region: 'japanese',
    lore: 'A wolf pup born inside a thundercloud, whose howl calls lightning from a clear sky.',
    haiku: '雷鳴の子よ<br>空を引き裂く牙で<br>嵐を呼ぶ狼',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/raijin_wolf.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Capybara · カピバラ ─ Common ─ Tan ──────────────────────────────────────
  capybara: {
    id: 'capybara',
    name: 'Capybara · カピバラ',
    nameShort: 'カピバラ',
    subtitle: 'River Giant · Calm Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#C4924A',
    region: 'americas',
    lore: 'The most patient creature on earth, who lets smaller animals rest upon its back.',
    haiku: '川のほとりに<br>全てを受け入れる<br>大きな心よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/capybara.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Axolotl · アホロートル ─ Rare ─ Pink ────────────────────────────────────
  axolotl: {
    id: 'axolotl',
    name: 'Axolotl · アホロートル',
    nameShort: 'アホロートル',
    subtitle: 'Walking Fish · Bloom Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#FF69B4',
    region: 'americas',
    lore: 'An eternal larva who never fully grows up, carrying the magic of perpetual renewal.',
    haiku: '変わらぬまま<br>水底で微笑む<br>永遠の子よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/axolotl.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Quetzal · ケツァル ─ Rare ─ Green ───────────────────────────────────────
  quetzal: {
    id: 'quetzal',
    name: 'Quetzal · ケツァル',
    nameShort: 'ケツァル',
    subtitle: 'Sacred Bird · Plume Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#00A854',
    region: 'americas',
    lore: 'The god-bird of the Maya whose tail feathers trail behind like a comet through jade sky.',
    haiku: '緑の羽根が<br>空に虹を描く<br>神の使いよ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/quetzal.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Condor · コンドル ─ Rare ─ Red ──────────────────────────────────────────
  condor: {
    id: 'condor',
    name: 'Condor · コンドル',
    nameShort: 'コンドル',
    subtitle: 'Sky Elder · Soaring Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#C62828',
    region: 'americas',
    lore: 'A great vulture who rides Andean thermals for days without beating its wings once.',
    haiku: '頂を越え<br>翼を羽ばたかずに<br>風が運ぶ魂',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/condor.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Jaguar · ジャガー ─ Rare ─ Orange ───────────────────────────────────────
  jaguar: {
    id: 'jaguar',
    name: 'Jaguar · ジャガー',
    nameShort: 'ジャガー',
    subtitle: 'Spotted King · Prowl Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#3a8c2f',
    region: 'americas',
    lore: 'The shadow lord of the rainforest, who steps so softly that even leaves refuse to stir.',
    haiku: '斑点の王よ<br>密林に溶け込む<br>足音なき夜',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/jaguar.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Armadillo · アルマジロ ─ Common ─ Brown ──────────────────────────────────
  armadillo: {
    id: 'armadillo',
    name: 'Armadillo · アルマジロ',
    nameShort: 'アルマジロ',
    subtitle: 'Iron Shell · Curl Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#7C5C3A',
    region: 'americas',
    lore: 'An ancient armored wanderer who curls into a perfect sphere when the world gets too loud.',
    haiku: '甲羅に包まれ<br>世界から離れ丸く<br>静けさの中に',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/armadillo.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Llama · リャマ ─ Common ─ Rose ──────────────────────────────────────────
  llama: {
    id: 'llama',
    name: 'Llama · リャマ',
    nameShort: 'リャマ',
    subtitle: 'Andean Guide · Highland Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#e88c50',
    region: 'americas',
    lore: 'A fluffy mountain companion who spits at problems and carries burdens without complaint.',
    haiku: '高地の道を<br>荷を担い歩む<br>リャマの誇り',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/llama.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Chupacabra · チュパカブラ ─ Legendary ─ Electric Green ───────────────────
  chupacabra: {
    id: 'chupacabra',
    name: 'Chupacabra · チュパカブラ',
    nameShort: 'チュパカブラ',
    subtitle: 'Blood Drinker · Shadow Form',
    rarity: 'legendary',
    rarityLabel: '✦ Legendary',
    accentColor: '#76FF03',
    region: 'americas',
    lore: 'A glowing cryptid seen only at the edge of sight, leaving nothing but silence and wonder.',
    haiku: '光る瞳が<br>暗闇から現れる<br>伝説の影よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/chupacabra.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Coati · コアティ ─ Common ─ Orange ───────────────────────────────────────
  coati: {
    id: 'coati',
    name: 'Coati · コアティ',
    nameShort: 'コアティ',
    subtitle: 'Ring-Tail Wanderer · Curious Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#E8762A',
    region: 'americas',
    lore: 'A curious ring-tailed wanderer of the forest floor, always poking its long nose into tomorrow.',
    haiku: '縞の尾を振り<br>森の秘密を探す<br>鼻先の旅よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/coati.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Tapir · バク ─ Common ─ Brown ─────────────────────────────────────────────
  tapir: {
    id: 'tapir',
    name: 'Tapir · バク',
    nameShort: 'バク',
    subtitle: 'Dream-Eater · Ancient Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#7B6B5A',
    region: 'americas',
    lore: 'An ancient shape between pig and elephant, walking the same forest paths for sixty million years.',
    haiku: '億年の道<br>変わらぬ姿で歩く<br>太古の歩みよ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/tapir.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Anaconda · アナコンダ ─ Rare ─ Green ──────────────────────────────────────
  anaconda: {
    id: 'anaconda',
    name: 'Anaconda · アナコンダ',
    nameShort: 'アナコンダ',
    subtitle: 'River Sovereign · Coiled Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#2E7D32',
    region: 'americas',
    lore: 'The river\'s own pulse, coiled and patient, who measures time in the slow drift of floodwaters.',
    haiku: '川の底から<br>静かに世界を巻く<br>水の支配者よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/anaconda.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Hedgehog · ハリネズミ ─ Common ─ Brown ───────────────────────────────────
  hedgehog: {
    id: 'hedgehog',
    name: 'Hedgehog · ハリネズミ',
    nameShort: 'ハリネズミ',
    subtitle: 'Spine Keeper · Twilight Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#6D4C41',
    region: 'european',
    lore: 'A tiny night wanderer who wears its armor proudly and snuffles through autumn leaves.',
    haiku: '針を纏い<br>落ち葉の中を歩く<br>夜の小さき者',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/hedgehog.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Hare · 野兎 ─ Common ─ Silver ───────────────────────────────────────────
  hare: {
    id: 'hare',
    name: 'Hare · 野兎',
    nameShort: '野兎',
    subtitle: 'Moon Hare · Fleet Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#9E9E9E',
    region: 'european',
    lore: 'A moon-touched hare who outruns the dawn and knows the paths between worlds.',
    haiku: '月光の道<br>耳を立てて駆ける<br>朝より速い',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/hare.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Stag · 牡鹿 ─ Rare ─ Gold ───────────────────────────────────────────────
  stag: {
    id: 'stag',
    name: 'Stag · 牡鹿',
    nameShort: '牡鹿',
    subtitle: 'Forest Crown · Antler Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#8B6914',
    region: 'european',
    lore: 'The ancient king of the forest, whose antlers hold the map of every old-growth path.',
    haiku: '枝角広げ<br>森の王として立つ<br>秋の風の中',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/stag.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Gryphon · グリフォン ─ Rare ─ Gold ──────────────────────────────────────
  gryphon: {
    id: 'gryphon',
    name: 'Gryphon · グリフォン',
    nameShort: 'グリフォン',
    subtitle: 'Noble Beast · Fledgling Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#c8a840',
    region: 'european',
    lore: 'Half eagle, half lion — the gryphon guards what is most precious and cannot be bribed.',
    haiku: '翼と爪で<br>宝を守り抜く<br>天と地の子',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/gryphon.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Unicorn · ユニコーン ─ Legendary ─ Magenta ───────────────────────────────
  unicorn: {
    id: 'unicorn',
    name: 'Unicorn · ユニコーン',
    nameShort: 'ユニコーン',
    subtitle: 'Pure Horn · Foal Form',
    rarity: 'legendary',
    rarityLabel: '✦ Legendary',
    accentColor: '#D500F9',
    region: 'european',
    lore: 'A spirit horse whose spiral horn can purify any poison and mend any broken thing.',
    haiku: '螺旋の角が<br>毒を清め光る<br>純白の夢',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/unicorn.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Selkie · セルキー ─ Rare ─ Blue ─────────────────────────────────────────
  selkie: {
    id: 'selkie',
    name: 'Selkie · セルキー',
    nameShort: 'セルキー',
    subtitle: 'Seal Folk · Shoreline Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#29B6F6',
    region: 'european',
    lore: 'A seal who sheds her skin at the shore to walk among humans, always longing for the tide.',
    haiku: '波の彼方を<br>夢見る瞳で見る<br>帰れぬ海よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/selkie.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Will-o-Wisp · 鬼火 ─ Common ─ Teal ─────────────────────────────────────
  wisp: {
    id: 'wisp',
    name: "Will-o'-Wisp · 鬼火",
    nameShort: '鬼火',
    subtitle: 'Marsh Light · Drift Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#00E5B4',
    region: 'european',
    lore: 'A wandering soul-light that drifts above bogs, guiding the lost or leading them astray.',
    haiku: '霧の底から<br>青白い光浮かぶ<br>道なき道よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/wisp.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Wyvern · ワイバーン ─ Legendary ─ Teal ──────────────────────────────────
  wyvern: {
    id: 'wyvern',
    name: 'Wyvern · ワイバーン',
    nameShort: 'ワイバーン',
    subtitle: 'Sea Drake · Hatchling Form',
    rarity: 'legendary',
    rarityLabel: '✦ Legendary',
    accentColor: '#006064',
    region: 'european',
    lore: 'A two-legged dragon who nests in sea-cliffs and breathes a mist that makes sailors forget their names.',
    haiku: '崖の巣から<br>霧を吐き飛び立つ<br>忘れられた名',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/wyvern.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Meerkat · ミーアキャット ─ Common ─ Amber ────────────────────────────────
  meerkat: {
    id: 'meerkat',
    name: 'Meerkat · ミーアキャット',
    nameShort: 'ミーアキャット',
    subtitle: 'Sentinel · Watch Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#C49A2A',
    region: 'african',
    lore: 'The eternal watchman of the Kalahari, who stands guard so others can sleep without fear.',
    haiku: '砂漠の番人<br>背を伸ばし空を見る<br>仲間を守る',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/meerkat.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Mongoose · マングース ─ Common ─ Brown ───────────────────────────────────
  mongoose: {
    id: 'mongoose',
    name: 'Mongoose · マングース',
    nameShort: 'マングース',
    subtitle: 'Cobra Dancer · Swift Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#8D6E63',
    region: 'african',
    lore: 'The lightning-fast enemy of serpents, who dances with cobras as if death were a game.',
    haiku: '蛇と踊る<br>命懸けの舞いを<br>笑顔で制す',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/mongoose.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Pangolin · センザンコウ ─ Common ─ Tan ────────────────────────────────────
  pangolin: {
    id: 'pangolin',
    name: 'Pangolin · センザンコウ',
    nameShort: 'センザンコウ',
    subtitle: 'Scale Moon · Armored Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#B8956E',
    region: 'african',
    lore: 'The only scaled mammal on earth, rolling into a perfect moon of armor when danger comes near.',
    haiku: '鱗の月よ<br>脅威に丸く閉じる<br>無敵の守りよ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/pangolin.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Warthog · イボイノシシ ─ Common ─ Brown ───────────────────────────────────
  warthog: {
    id: 'warthog',
    name: 'Warthog · イボイノシシ',
    nameShort: 'イボイノシシ',
    subtitle: 'Tusk Brave · Prairie Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#8B7355',
    region: 'african',
    lore: 'Brave enough to charge a lion, wise enough to know when to run, and happy either way.',
    haiku: '牙を誇らし<br>草原を駆け抜けて<br>恐れを知らぬよ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/warthog.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Hyena · ハイエナ ─ Rare ─ Golden ──────────────────────────────────────────
  hyena: {
    id: 'hyena',
    name: 'Hyena · ハイエナ',
    nameShort: 'ハイエナ',
    subtitle: 'Night Sovereign · Laughing Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#C8A84B',
    region: 'african',
    lore: 'Not a scavenger but a sovereign, whose laugh echoes across the savanna like a declaration.',
    haiku: '夜の笑い声<br>草原に響き渡る<br>王の宣言よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/hyena.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Okapi · オカピ ─ Rare ─ Reddish-Brown ────────────────────────────────────
  okapi: {
    id: 'okapi',
    name: 'Okapi · オカピ',
    nameShort: 'オカピ',
    subtitle: 'Congo Ghost · Striped Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#7B4F2E',
    region: 'african',
    lore: 'The ghost of the Congo forest, with a giraffe\'s tongue and a zebra\'s legs, seen by few and doubted by many.',
    haiku: '縞模様の足<br>密林の奥深く<br>幻の獣よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/okapi.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ════════════════════════════════════════════════════════════════════════════
  // FANTASY REGION
  // ════════════════════════════════════════════════════════════════════════════

  // ── Sprite · 精霊 ─ Common ─ Violet ─────────────────────────────────────────
  sprite: {
    id: 'sprite',
    name: 'Sprite · 精霊',
    nameShort: '精霊',
    subtitle: 'Magic Spark · Drift Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#7c4dff',
    region: 'fantasy',
    lore: 'A tiny spark of pure magic given form, drawn to places where focus and creativity flow freely.',
    haiku: '魔法の光<br>集中の場をめぐる<br>はかない輝き',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/sprite.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Imp · インプ ─ Common ─ Crimson ─────────────────────────────────────────
  imp: {
    id: 'imp',
    name: 'Imp · インプ',
    nameShort: 'インプ',
    subtitle: 'Mischief Devil · Hatchling Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#c62828',
    region: 'fantasy',
    lore: 'A mischievous devil-kin who steals idle thoughts and trades them back as sudden bursts of inspiration.',
    haiku: '怠け心を<br>盗んで翼で消える<br>閃きを置く',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/imp.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Golem · ゴーレム ─ Rare ─ Moss Green ────────────────────────────────────
  golem: {
    id: 'golem',
    name: 'Golem · ゴーレム',
    nameShort: 'ゴーレム',
    subtitle: 'Stone Guardian · Woken Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#558b2f',
    region: 'fantasy',
    lore: 'Shaped from ancient clay by a forgotten wizard, it now guards the boundary between distraction and deep work.',
    haiku: '粘土の番人<br>記憶より古い石<br>静かに守る',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/golem.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Djinn · ジン ─ Rare ─ Teal ──────────────────────────────────────────────
  djinn: {
    id: 'djinn',
    name: 'Djinn · ジン',
    nameShort: 'ジン',
    subtitle: 'Smoke Spirit · Manifest Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#0277bd',
    region: 'fantasy',
    lore: 'A smoke-born spirit of granting who appears only to those focused enough to state what they truly wish for.',
    haiku: '煙の中から<br>願いを聞く精霊<br>霧のように消える',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/djinn.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Basilisk · バジリスク ─ Rare ─ Olive ────────────────────────────────────
  basilisk: {
    id: 'basilisk',
    name: 'Basilisk · バジリスク',
    nameShort: 'バジリスク',
    subtitle: 'Crowned Serpent · Coil Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#827717',
    region: 'fantasy',
    lore: 'The crowned serpent whose petrifying gaze turns scattered thoughts into still, meditative stone.',
    haiku: '石に変える目<br>散らばる心を固め<br>王冠輝く',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/basilisk.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Fairy · フェアリー ─ Common ─ Rose ──────────────────────────────────────
  fairy: {
    id: 'fairy',
    name: 'Fairy · フェアリー',
    nameShort: 'フェアリー',
    subtitle: 'Forest Fey · Bloom Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#e91e8c',
    region: 'fantasy',
    lore: 'A flower-crowned fey who scatters focus dust — one pinch clears the mind and sets intention.',
    haiku: '花の冠<br>集中の粉を撒く<br>心が澄む朝',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/fairy.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Chimera · キマイラ ─ Rare ─ Amber ───────────────────────────────────────
  chimera: {
    id: 'chimera',
    name: 'Chimera · キマイラ',
    nameShort: 'キマイラ',
    subtitle: 'Tri-Beast · Cub Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#e65100',
    region: 'fantasy',
    lore: 'Three minds fused into one body — lion, goat, and serpent — each one sharpened by focus into a single fierce will.',
    haiku: '三つの魂<br>一つの体に宿る<br>集中の獣',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/chimera.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Kraken · クラーケン ─ Rare ─ Cobalt ─────────────────────────────────────
  kraken: {
    id: 'kraken',
    name: 'Kraken · クラーケン',
    nameShort: 'クラーケン',
    subtitle: 'Deep Terror · Hatchling Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#1565c0',
    region: 'fantasy',
    lore: 'A tiny hatchling of the legendary deep-sea leviathan, still learning to control the eight arms that will one day sink ships.',
    haiku: '深海の子<br>八本の腕で掴む<br>まだ小さな夢',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/kraken.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Phoenix · フェニックス ─ Legendary ─ Ember ───────────────────────────────
  phoenix: {
    id: 'phoenix',
    name: 'Phoenix · フェニックス',
    nameShort: 'フェニックス',
    subtitle: 'Immortal Firebird · Risen Form',
    rarity: 'legendary',
    rarityLabel: '✦ Legendary',
    accentColor: '#e65100',
    region: 'fantasy',
    lore: 'Born from the ashes of spent effort, it rises every time a session ends — proof that hard work is never truly lost.',
    haiku: '燃え尽きた後<br>灰の中から輝く<br>また朝が来る',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/phoenix.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── 鶴 · Tsuru ─ Common ─ Crimson Red ─────────────────────────────────────
  tsuru: {
    id: 'tsuru',
    name: '鶴 · Tsuru',
    nameShort: '鶴',
    region: 'japanese',
    subtitle: 'Sacred Crane · Mist Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#C62828',
    lore: 'A red-crowned crane who folds herself out of morning mist and grants a thousand years of patience to anyone who watches her dance.',
    haiku: '朝霧の中<br>千年の忍耐を<br>舞いで授ける',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/tsuru.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── 絡新婦 · Jorogumo ─ Rare ─ Gold ──────────────────────────────────────
  jorogumo: {
    id: 'jorogumo',
    name: '絡新婦 · Jorogumo',
    nameShort: '絡新婦',
    region: 'japanese',
    subtitle: 'Spider Enchantress · Silk Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#B8860B',
    lore: 'A silk-spinning spider spirit who weaves webs so beautiful that anyone who sees one forgets to look away.',
    haiku: '金の糸を紡ぎ<br>美しき罠を張る<br>見れば忘れる',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/jorogumo.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Colibri · コリブリ ─ Common ─ Teal ────────────────────────────────────
  colibri: {
    id: 'colibri',
    name: 'Colibri · コリブリ',
    nameShort: 'コリブリ',
    region: 'americas',
    subtitle: 'Jeweled Hummingbird · Hover Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#00BFA5',
    lore: 'A hummingbird so fast it drinks from flowers that haven\'t bloomed yet, leaving a trail of impossible color.',
    haiku: '咲く前の花<br>虹の尾を残して<br>宝石が飛ぶ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/colibri.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Robin · コマドリ ─ Common ─ Red-Orange ────────────────────────────────
  robin: {
    id: 'robin',
    name: 'Robin · コマドリ',
    nameShort: 'コマドリ',
    region: 'european',
    subtitle: 'Hearthfire Songbird · Ember Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#D84315',
    lore: 'A plump little bird whose red breast holds a stolen ember from the first hearth fire, singing warmth into cold mornings.',
    haiku: '赤い胸に<br>炉の火を隠して<br>冬に歌う鳥',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/robin.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Badger · アナグマ ─ Common ─ Charcoal ─────────────────────────────────
  badger: {
    id: 'badger',
    name: 'Badger · アナグマ',
    nameShort: 'アナグマ',
    region: 'european',
    subtitle: 'Earth Warden · Burrow Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#455A64',
    lore: 'A tunnel-digger who never gives ground, never forgets a grudge, and never leaves a friend behind.',
    haiku: '土を掘り進む<br>決して退かぬ意志<br>友を守る爪',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/badger.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Salamander · サラマンダー ─ Rare ─ Molten Orange ──────────────────────
  salamander: {
    id: 'salamander',
    name: 'Salamander · サラマンダー',
    nameShort: 'サラマンダー',
    region: 'european',
    subtitle: 'Fire Newt · Ember Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#E64A19',
    lore: 'A creature born in the hottest forge flame, who sleeps in embers and leaves tiny charred footprints wherever it walks.',
    haiku: '炉の炎から<br>生まれし小さき影<br>焦げた足跡',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/salamander.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Fenrir · フェンリル ─ Rare ─ Frost Blue ──────────────────────────────
  fenrir: {
    id: 'fenrir',
    name: 'Fenrir · フェンリル',
    nameShort: 'フェンリル',
    region: 'european',
    subtitle: 'Dire Wolf · Aurora Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#546E7A',
    lore: 'A wolf cub born beneath the northern lights, whose howl shakes snow from every peak in the range.',
    haiku: 'オーロラの下<br>雪を揺らす遠吠え<br>巨狼の子よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/fenrir.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Chameleon · カメレオン ─ Common ─ Leaf Green ──────────────────────────
  chameleon: {
    id: 'chameleon',
    name: 'Chameleon · カメレオン',
    nameShort: 'カメレオン',
    region: 'african',
    subtitle: 'Colour Thief · Shifting Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#43A047',
    lore: 'A slow-moving sage who wears the world\'s palette on its skin, changing to match whatever truth surrounds it.',
    haiku: '世界の色を<br>纏いて静かに行く<br>真実の肌よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/chameleon.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Honey Badger · ラーテル ─ Rare ─ Steel Silver ─────────────────────────
  honey_badger: {
    id: 'honey_badger',
    name: 'Honey Badger · ラーテル',
    nameShort: 'ラーテル',
    region: 'african',
    subtitle: 'Fearless One · Defiant Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#78909C',
    lore: 'The creature that fears nothing — not cobra, not lion, not thunder. It simply does not care.',
    haiku: '恐れを知らぬ<br>蛇も獅子も退ける<br>鋼の意志よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/honey_badger.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Hippo · カバ ─ Rare ─ Slate Blue ──────────────────────────────────────
  hippo: {
    id: 'hippo',
    name: 'Hippo · カバ',
    nameShort: 'カバ',
    region: 'african',
    subtitle: 'River Throne · Calm Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#607D8B',
    lore: 'Looks peaceful floating in the shallows, but nothing in Africa is foolish enough to test that calm.',
    haiku: '静かな水面<br>穏やかに見えるが<br>怒れば王よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/hippo.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Serval · サーバル ─ Rare ─ Golden Amber ───────────────────────────────
  serval: {
    id: 'serval',
    name: 'Serval · サーバル',
    nameShort: 'サーバル',
    region: 'african',
    subtitle: 'Grassland Shadow · Leap Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#F9A825',
    lore: 'A wild cat who hears mice beneath the earth and leaps higher than any creature its size should.',
    haiku: '草原の影<br>地の下の音を聞き<br>天へと跳ぶ猫',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/serval.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Tau · タウ ─ Legendary ─ Pale Gold ────────────────────────────────────
  tau: {
    id: 'tau',
    name: 'Tau · タウ',
    nameShort: 'タウ',
    region: 'african',
    subtitle: 'White Lion Spirit · Moonborn Form',
    rarity: 'legendary',
    rarityLabel: '✦ Legendary',
    accentColor: '#FFB300',
    lore: 'A pale lion cub with fur the colour of dry bone, said to appear only once a generation on the plains. Born under a blood moon, it carries the silence of the savanna at midnight.',
    haiku: '白き毛並みに<br>血の月の光宿す<br>草原の沈黙',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/tau.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Gorilla · ゴリラ ─ Rare ─ Deep Charcoal ──────────────────────────────
  gorilla: {
    id: 'gorilla',
    name: 'Gorilla · ゴリラ',
    nameShort: 'ゴリラ',
    region: 'african',
    subtitle: 'Mountain Guardian · Stillness Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#37474F',
    lore: 'A gentle giant who sits in stillness for hours, watching the mist roll through the volcanic peaks — moving only when something truly matters.',
    haiku: '霧の山頂<br>静かに座る巨人<br>動くは真の時',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/gorilla.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Myconid · マイコニド ─ Common ─ Earthy Mauve ─────────────────────────
  myconid: {
    id: 'myconid',
    name: 'Myconid · マイコニド',
    nameShort: 'マイコニド',
    region: 'fantasy',
    subtitle: 'Mushroom Spirit · Spore Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#8E6B5E',
    lore: 'A living mushroom who spreads calm through invisible spores, turning anxious rooms into peaceful groves.',
    haiku: '胞子を撒いて<br>不安を静める茸<br>森の安らぎ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/myconid.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Mimic · ミミック ─ Common ─ Old Brass ─────────────────────────────────
  mimic: {
    id: 'mimic',
    name: 'Mimic · ミミック',
    nameShort: 'ミミック',
    region: 'fantasy',
    subtitle: 'Treasure Chest · Hoard Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#A1887F',
    lore: 'A tiny chest with teeth and one big eye that hoards shiny distractions so you don\'t have to.',
    haiku: '光る物を<br>隠す小さな箱よ<br>歯を見せ笑う',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/mimic.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  },

  // ── Wyrm · ワーム ─ Legendary ─ Deep Amethyst ────────────────────────────
  wyrm: {
    id: 'wyrm',
    name: 'Wyrm · ワーム',
    nameShort: 'ワーム',
    region: 'fantasy',
    subtitle: 'Ancient Dragon · Hatchling Form',
    rarity: 'legendary',
    rarityLabel: '✦ Legendary',
    accentColor: '#4A148C',
    lore: 'The last egg of the oldest bloodline, cracked open after a thousand years of silence — small now, but the earth trembled when it yawned.',
    haiku: '千年の卵<br>割れて目覚める古竜<br>大地が震える',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g class="char-float">
    <g class="char-body">
      <image href="/chars/wyrm.png" x="10" y="0" width="300" height="380"/>
    </g>
  </g>
</svg>`
  }

};

// ── RARITY ROLL ──────────────────────────────────────────────────────────────

const RARITY_WEIGHTS = [
  { rarity: 'common',    weight: 65, pool: ['shiro','tanuki','kappa','kodama','tsuru','capybara','armadillo','llama','colibri','hedgehog','hare','wisp','robin','badger','meerkat','mongoose','coati','tapir','pangolin','warthog','chameleon','sprite','imp','fairy','myconid','mimic'] },
  { rarity: 'rare',      weight: 28, pool: ['karasu','koi','oni','baku','jorogumo','axolotl','quetzal','condor','jaguar','stag','gryphon','selkie','salamander','fenrir','anaconda','hyena','okapi','honey_badger','hippo','serval','gorilla','golem','djinn','basilisk','chimera','kraken'] },
  { rarity: 'legendary', weight: 7,  pool: ['kyubi','raijin_wolf','chupacabra','unicorn','wyvern','phoenix','tau','wyrm'] }
];

// ── VARIANT ROLL ──────────────────────────────────────────────────────────────
// Each hatched character also gets a variant tier.
// Weights: Standard 1000 · Gold 100 · Crimson 10 · Void 1

const VARIANTS = [
  { id: 'standard', label: 'Standard', color: '#8c8880', weight: 1000 },
  { id: 'gold',     label: 'Gold',     color: '#c9a227', weight: 100  },
  { id: 'crimson',  label: 'Crimson',  color: '#c0392b', weight: 10   },
  { id: 'void',     label: 'Void',     color: '#5b2d8e', weight: 1    },
];
const VARIANT_TOTAL = VARIANTS.reduce((s, v) => s + v.weight, 0);

function rollVariant() {
  const roll = Math.random() * VARIANT_TOTAL;
  let cumulative = 0;
  for (const v of VARIANTS) {
    cumulative += v.weight;
    if (roll < cumulative) return v;
  }
  return VARIANTS[0];
}

function rollCharacter() {
  const roll = Math.random() * 100;
  let cumulative = 0;
  for (const tier of RARITY_WEIGHTS) {
    cumulative += tier.weight;
    if (roll < cumulative) {
      const pool = tier.pool;
      const character = CHARACTERS[pool[Math.floor(Math.random() * pool.length)]];
      return { character, variant: rollVariant() };
    }
  }
  return { character: CHARACTERS['shiro'], variant: rollVariant() }; // fallback
}

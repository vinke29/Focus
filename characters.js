// ── EGG (timer view, small) ──────────────────────────────────────────────────
const EGG_SVG_SMALL = `
<svg width="160" height="200" viewBox="0 0 220 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="teggGrd" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#ddd8ca"/>
    </radialGradient>
    <radialGradient id="teggGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0047ff" stop-opacity=".18"/>
      <stop offset="100%" stop-color="#0047ff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="110" cy="268" rx="55" ry="9" fill="rgba(0,0,0,.1)"/>
  <path d="M110,8 C158,8 196,60 196,148 C196,222 158,272 110,272 C62,272 24,222 24,148 C24,60 62,8 110,8 Z"
    fill="url(#teggGrd)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>
  <path d="M110,8 C158,8 196,60 196,148 C196,222 158,272 110,272 C62,272 24,222 24,148 C24,60 62,8 110,8 Z"
    fill="url(#teggGlow)"/>
  <path d="M75,45 C82,32 96,24 105,22" stroke="white" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".7"/>
  <path d="M60,80 C64,68 70,58 76,52" stroke="white" stroke-width="2" stroke-linecap="round" fill="none" opacity=".4"/>
  <g class="egg-rune" opacity=".45">
    <path d="M118,85 L102,118 L114,118 L98,155" stroke="#0047ff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M118,85 L102,118 L114,118 L98,155" stroke="#00e5ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".6"/>
  </g>
</svg>`;

// ── CHARACTERS ───────────────────────────────────────────────────────────────

const CHARACTERS = {

  // ── 白猫 · Shiro ─ Common ─ Amber ──────────────────────────────────────────
  shiro: {
    id: 'shiro',
    name: '白猫 · Shiro',
    nameShort: 'Shiro',
    region: 'japanese',
    subtitle: 'White Cat Spirit · Baby Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#f0a500',
    lore: 'A ghost-white cat spirit born from a moonbeam, who brings calm focus to those who welcome her into their study.',
    haiku: 'Beneath the full moon<br>the white cat dreams in silence<br>still dawn holds her breath',
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
    nameShort: 'Karasu',
    region: 'japanese',
    subtitle: 'Crow Tengu · Fledgling Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#d40000',
    lore: 'A young crow tengu who memorises every secret spoken beneath the forest canopy and trades wisdom for focused silence.',
    haiku: 'Red eyes cut the storm<br>the crow reads winds before dawn<br>wisdom needs no words',
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
    nameShort: 'Kyūbi',
    region: 'japanese',
    subtitle: 'Nine-Tail Fox Spirit · Baby Form',
    rarity: 'legendary',
    rarityLabel: '✦ Legendary',
    accentColor: '#0047ff',
    lore: 'A legendary nine-tailed fox whose tails fan like starlight — each one earned through a century of perfect, unbroken focus.',
    haiku: 'Nine tails arc like stars<br>the fox spirit wakes at dusk<br>focus lights the sky',
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="meer-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#f5e8cc"/>
      <stop offset="100%" stop-color="#d4b880"/>
    </radialGradient>
    <radialGradient id="meer-belly" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#ece0c8"/>
    </radialGradient>
    <radialGradient id="meer-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#C49A2A" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#C49A2A" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="364" rx="46" ry="7" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="255" rx="72" ry="82" fill="url(#meer-aura)"/>

  <g class="char-body">

    <!-- Tail (long, thin, raised) -->
    <path d="M192,310 C215,290 230,265 225,238 C218,214 200,210 192,222 C198,216 208,224 204,240 C200,254 192,272 192,295Z"
      fill="url(#meer-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Tail tip dark -->
    <circle cx="224" cy="240" r="6" fill="#080810" opacity=".5"/>

    <!-- Upright body -->
    <path d="M130,285 C130,248 142,230 160,230 C178,230 190,248 190,285 C190,320 178,348 160,348 C142,348 130,320 130,285Z"
      fill="url(#meer-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

    <!-- Belly stripe (amber) -->
    <ellipse cx="160" cy="292" rx="22" ry="40" fill="url(#meer-belly)" stroke="#080810" stroke-width="2"/>
    <path d="M148,270 L148,325" stroke="#C49A2A" stroke-width="1.5" fill="none" opacity=".3"/>
    <path d="M172,270 L172,325" stroke="#C49A2A" stroke-width="1.5" fill="none" opacity=".3"/>

    <!-- Arms (short, held up slightly) -->
    <path d="M132,265 C116,258 106,264 104,276 C112,268 122,264 132,268Z"
      fill="url(#meer-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M188,265 C204,258 214,264 216,276 C208,268 198,264 188,268Z"
      fill="url(#meer-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- Feet -->
    <path d="M140,344 L130,364 C126,368 120,366 118,360 C124,356 130,350 132,344Z"
      fill="url(#meer-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M180,344 L190,364 C194,368 200,366 202,360 C196,356 190,350 188,344Z"
      fill="url(#meer-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

  </g>

  <!-- Head (scanning animation) -->
  <g class="head-scan">
    <!-- Neck -->
    <path d="M146,232 C143,215 146,200 150,188 C154,191 166,191 170,188 C174,200 177,215 174,232Z"
      fill="url(#meer-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>

    <!-- Head -->
    <circle cx="160" cy="172" r="46" fill="url(#meer-body)" stroke="#080810" stroke-width="4"/>

    <!-- Dark eye patches -->
    <ellipse cx="136" cy="166" rx="18" ry="14" fill="#080810" opacity=".5"/>
    <ellipse cx="184" cy="166" rx="18" ry="14" fill="#080810" opacity=".5"/>

    <!-- Eyes (bright, alert) -->
    <ellipse cx="136" cy="165" rx="13" ry="12" fill="white" stroke="#080810" stroke-width="2"/>
    <circle cx="136" cy="165" r="7.5" fill="#C49A2A"/>
    <path d="M136,157 C137,161 137,169 136,172 C135,169 135,161 136,157Z" fill="#080810"/>
    <circle cx="139" cy="161" r="2.8" fill="white" opacity=".9"/>

    <ellipse cx="184" cy="165" rx="13" ry="12" fill="white" stroke="#080810" stroke-width="2"/>
    <circle cx="184" cy="165" r="7.5" fill="#C49A2A"/>
    <path d="M184,157 C185,161 185,169 184,172 C183,169 183,161 184,157Z" fill="#080810"/>
    <circle cx="187" cy="161" r="2.8" fill="white" opacity=".9"/>

    <!-- Small rounded ears -->
    <ellipse cx="122" cy="145" rx="14" ry="13" fill="url(#meer-body)" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="122" cy="145" rx="8" ry="7" fill="#C49A2A" opacity=".45"/>
    <ellipse cx="198" cy="145" rx="14" ry="13" fill="url(#meer-body)" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="198" cy="145" rx="8" ry="7" fill="#C49A2A" opacity=".45"/>

    <!-- Pointed snout -->
    <path d="M148,182 C150,192 156,198 160,198 C164,198 170,192 172,182Z"
      fill="#d4b880" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="157" cy="191" rx="4" ry="3.5" fill="#080810" opacity=".6"/>
    <ellipse cx="163" cy="191" rx="4" ry="3.5" fill="#080810" opacity=".6"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="mong-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#f0e4d8"/>
      <stop offset="100%" stop-color="#c8b0a0"/>
    </radialGradient>
    <radialGradient id="mong-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#8D6E63" stop-opacity=".2"/>
      <stop offset="100%" stop-color="#8D6E63" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="360" rx="70" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="268" rx="88" ry="68" fill="url(#mong-aura)"/>

  <g class="char-float">
    <g class="char-body">

      <!-- Long bushy tail -->
      <path d="M225,268 C252,255 268,232 260,208 C252,186 232,183 220,196 C228,192 238,203 234,218 C230,230 222,248 225,268Z"
        fill="url(#mong-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M258,212 C252,203 242,200 236,206" stroke="#080810" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".3"/>

      <!-- Long sleek body (low-slung) -->
      <path d="M80,258 C80,228 106,210 160,210 C214,210 240,228 240,258 C240,285 218,305 160,305 C102,305 80,285 80,258Z"
        fill="url(#mong-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

      <!-- Underbelly (lighter) -->
      <ellipse cx="160" cy="265" rx="58" ry="32" fill="#f5ede5" stroke="#080810" stroke-width="1.8" opacity=".5"/>
      <!-- Fur grain -->
      <path d="M100,252 C108,244 118,242 126,246" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".18"/>
      <path d="M220,252 C212,244 202,242 194,246" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".18"/>

      <!-- Short legs -->
      <path d="M104,295 L96,336 C92,342 86,342 84,336 C90,330 94,322 96,314Z"
        fill="url(#mong-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M136,302 L130,342 C126,347 120,347 118,342 C124,337 128,328 130,320Z"
        fill="url(#mong-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M184,302 L190,342 C194,347 200,347 202,342 C196,337 192,328 190,320Z"
        fill="url(#mong-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M216,295 L224,336 C228,342 234,342 236,336 C230,330 226,322 224,314Z"
        fill="url(#mong-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    </g>

    <!-- Head (alert, slightly raised) -->
    <ellipse cx="128" cy="218" rx="44" ry="40" fill="url(#mong-body)" stroke="#080810" stroke-width="4"/>

    <!-- Pointed snout -->
    <path d="M88,225 C88,218 100,212 112,210 C112,222 106,230 98,232Z"
      fill="url(#mong-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Nostrils -->
    <ellipse cx="92" cy="226" rx="4" ry="3" fill="#8D6E63" opacity=".55"/>

    <!-- Eyes (both on forward-facing side, near snout) -->
    <circle cx="108" cy="208" r="12" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="108" cy="208" r="7" fill="#080810"/>
    <circle cx="111" cy="205" r="2.5" fill="white" opacity=".9"/>

    <circle cx="128" cy="203" r="11" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="128" cy="203" r="6.5" fill="#080810"/>
    <circle cx="131" cy="200" r="2.5" fill="white" opacity=".9"/>

    <!-- Small ears -->
    <ellipse cx="104" cy="184" rx="13" ry="12" fill="url(#mong-body)" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="104" cy="184" rx="7" ry="6" fill="#8D6E63" opacity=".4"/>
    <ellipse cx="136" cy="179" rx="13" ry="11" fill="url(#mong-body)" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="136" cy="179" rx="7" ry="6" fill="#8D6E63" opacity=".4"/>

    <!-- Whiskers -->
    <line x1="68"  y1="222" x2="100" y2="224" stroke="#080810" stroke-width="1.4" opacity=".35"/>
    <line x1="65"  y1="230" x2="98"  y2="230" stroke="#080810" stroke-width="1.2" opacity=".25"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="pang-body" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#e8d0b0"/>
      <stop offset="100%" stop-color="#a07850"/>
    </radialGradient>
    <radialGradient id="pang-scale" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#d4b88a"/>
      <stop offset="100%" stop-color="#8c6835"/>
    </radialGradient>
    <radialGradient id="pang-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#B8956E" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#B8956E" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="160" cy="364" rx="55" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="265" rx="72" ry="85" fill="url(#pang-aura)"/>
  <g class="char-float">
    <path d="M188,330 C218,310 244,286 250,258 C258,230 246,208 228,204 C212,200 202,212 200,228 C198,242 206,258 210,272 C214,288 214,312 188,330Z"
      fill="url(#pang-scale)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M240,222 C246,236 246,252 242,264" stroke="#080810" stroke-width="2" fill="none" opacity=".28"/>
    <path d="M226,210 C234,224 236,242 232,254" stroke="#080810" stroke-width="2" fill="none" opacity=".25"/>
    <path d="M214,210 C220,224 222,240 218,254" stroke="#080810" stroke-width="1.8" fill="none" opacity=".22"/>
    <path d="M106,300 C104,268 114,242 132,228 C148,214 168,210 186,218 C204,226 212,248 210,276 C208,302 196,328 166,340 C146,348 128,338 116,326 C108,316 106,308 106,300Z"
      fill="url(#pang-scale)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>
    <path d="M114,288 C126,276 148,270 170,272 C190,274 202,280 208,290" stroke="#080810" stroke-width="1.8" fill="none" opacity=".22"/>
    <path d="M110,306 C124,294 146,288 168,290 C188,292 200,298 206,308" stroke="#080810" stroke-width="1.8" fill="none" opacity=".2"/>
    <path d="M118,324 C132,314 154,308 172,310 C188,312 198,318 202,326" stroke="#080810" stroke-width="1.8" fill="none" opacity=".18"/>
    <ellipse cx="130" cy="256" rx="12" ry="8" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".65"/>
    <ellipse cx="150" cy="248" rx="12" ry="8" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".65"/>
    <ellipse cx="170" cy="246" rx="12" ry="8" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".65"/>
    <ellipse cx="190" cy="250" rx="11" ry="8" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".65"/>
    <ellipse cx="120" cy="272" rx="13" ry="9" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".6"/>
    <ellipse cx="142" cy="265" rx="13" ry="9" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".6"/>
    <ellipse cx="164" cy="262" rx="13" ry="9" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".6"/>
    <ellipse cx="186" cy="266" rx="12" ry="9" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".6"/>
    <ellipse cx="128" cy="288" rx="13" ry="9" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".55"/>
    <ellipse cx="150" cy="281" rx="13" ry="9" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".55"/>
    <ellipse cx="172" cy="278" rx="12" ry="9" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".55"/>
    <ellipse cx="192" cy="282" rx="12" ry="9" fill="url(#pang-scale)" stroke="#080810" stroke-width="1.5" opacity=".55"/>
    <path d="M118,334 C110,342 106,354 108,364" stroke="#080810" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M132,340 C130,352 130,362 132,370" stroke="#080810" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M178,340 C180,352 180,362 178,370" stroke="#080810" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M192,334 C200,342 202,354 200,364" stroke="#080810" stroke-width="6" stroke-linecap="round" fill="none"/>
  </g>
  <g class="head-scan">
    <ellipse cx="140" cy="228" rx="26" ry="20" fill="url(#pang-body)" stroke="#080810" stroke-width="3"/>
    <ellipse cx="130" cy="200" rx="34" ry="28" fill="url(#pang-body)" stroke="#080810" stroke-width="3.5"/>
    <path d="M100,208 C90,212 80,208 78,198 C76,190 82,184 90,183 C102,182 114,192 116,202Z"
      fill="url(#pang-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="81" cy="198" rx="5" ry="4" fill="#080810" opacity=".65"/>
    <ellipse cx="116" cy="196" rx="12" ry="11" fill="white" stroke="#080810" stroke-width="2"/>
    <circle cx="116" cy="196" r="7" fill="#080810"/>
    <circle cx="119" cy="193" r="2.5" fill="white" opacity=".9"/>
    <path d="M148,188 L158,172 L162,190Z" fill="url(#pang-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="wart-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#bfb0a0"/>
      <stop offset="100%" stop-color="#786050"/>
    </radialGradient>
    <radialGradient id="wart-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#8B7355" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#8B7355" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="160" cy="364" rx="68" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="268" rx="85" ry="88" fill="url(#wart-aura)"/>
  <g class="char-float">
    <path d="M192,255 C205,245 210,232 205,220 C202,228 200,242 192,255Z"
      fill="url(#wart-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="205" cy="220" r="6" fill="#080810" opacity=".55"/>
    <path d="M118,234 C128,218 148,208 160,206 C172,208 192,218 202,234"
      stroke="#080810" stroke-width="7" fill="none" stroke-linecap="round" opacity=".35"/>
    <path d="M122,228 C132,212 150,204 160,202 C170,204 188,212 198,228"
      stroke="#8B7355" stroke-width="3" fill="none" stroke-linecap="round" opacity=".4"/>
    <ellipse cx="160" cy="302" rx="78" ry="64" fill="url(#wart-body)" stroke="#080810" stroke-width="4.5"/>
    <ellipse cx="108" cy="358" rx="25" ry="13" fill="url(#wart-body)" stroke="#080810" stroke-width="3"/>
    <path d="M96,358 L92,370" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M108,361 L108,372" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M122,361 L124,372" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="212" cy="358" rx="25" ry="13" fill="url(#wart-body)" stroke="#080810" stroke-width="3"/>
    <path d="M224,358 L228,370" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M212,361 L212,372" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M198,361 L196,372" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
  </g>
  <g class="char-body">
    <ellipse cx="160" cy="248" rx="44" ry="32" fill="url(#wart-body)" stroke="#080810" stroke-width="4"/>
    <ellipse cx="160" cy="206" rx="58" ry="46" fill="url(#wart-body)" stroke="#080810" stroke-width="4.5"/>
    <ellipse cx="160" cy="234" rx="42" ry="26" fill="#a09080" stroke="#080810" stroke-width="3"/>
    <ellipse cx="144" cy="234" rx="9" ry="8" fill="#080810" opacity=".7"/>
    <ellipse cx="176" cy="234" rx="9" ry="8" fill="#080810" opacity=".7"/>
    <path d="M120,238 C106,242 96,250 100,264 C108,258 114,248 124,244Z"
      fill="#f5eed8" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M200,238 C214,242 224,250 220,264 C212,258 206,248 196,244Z"
      fill="#f5eed8" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="132" cy="224" rx="8" ry="6" fill="url(#wart-body)" stroke="#080810" stroke-width="2" opacity=".7"/>
    <ellipse cx="188" cy="224" rx="8" ry="6" fill="url(#wart-body)" stroke="#080810" stroke-width="2" opacity=".7"/>
    <ellipse cx="128" cy="204" rx="14" ry="13" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="128" cy="204" r="8" fill="#080810"/>
    <circle cx="131" cy="201" r="3" fill="white" opacity=".9"/>
    <ellipse cx="192" cy="204" rx="14" ry="13" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="192" cy="204" r="8" fill="#080810"/>
    <circle cx="195" cy="201" r="3" fill="white" opacity=".9"/>
    <path d="M110,190 L98,162 L124,178Z" fill="url(#wart-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M210,190 L222,162 L196,178Z" fill="url(#wart-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M112,188 L104,170 L122,180Z" fill="#8B7355" opacity=".4"/>
    <path d="M208,188 L216,170 L198,180Z" fill="#8B7355" opacity=".4"/>
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="hyen-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#f0d898"/>
      <stop offset="100%" stop-color="#b08840"/>
    </radialGradient>
    <radialGradient id="hyen-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#C8A84B" stop-opacity=".25"/>
      <stop offset="100%" stop-color="#C8A84B" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="155" cy="364" rx="64" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="155" cy="260" rx="84" ry="88" fill="url(#hyen-aura)"/>
  <g class="char-float">
    <g class="cat-tail" style="transform-origin:200px 292px">
      <path d="M200,292 C222,274 238,248 234,224 C230,200 214,192 202,202 C194,210 196,232 198,250 C200,268 202,280 200,292Z"
        fill="url(#hyen-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="233" cy="222" rx="10" ry="8" fill="#080810" opacity=".55"/>
    </g>
    <path d="M98,280 C96,254 110,230 130,222 C150,214 172,218 188,232 C204,246 210,268 208,296 C206,322 194,348 166,352 C140,356 122,342 112,322 C102,306 100,294 98,280Z"
      fill="url(#hyen-body)" stroke="#080810" stroke-width="4.5" stroke-linejoin="round"/>
    <g class="spot-pulse">
      <circle cx="130" cy="256" r="10" fill="#080810" opacity=".22"/>
      <circle cx="156" cy="246" r="8" fill="#080810" opacity=".2"/>
      <circle cx="180" cy="254" r="9" fill="#080810" opacity=".22"/>
      <circle cx="144" cy="274" r="11" fill="#080810" opacity=".2"/>
      <circle cx="170" cy="270" r="8" fill="#080810" opacity=".18"/>
      <circle cx="120" cy="274" r="8" fill="#080810" opacity=".18"/>
      <circle cx="194" cy="270" r="7" fill="#080810" opacity=".16"/>
      <circle cx="138" cy="294" r="9" fill="#080810" opacity=".18"/>
      <circle cx="165" cy="292" r="7" fill="#080810" opacity=".16"/>
    </g>
    <ellipse cx="118" cy="352" rx="24" ry="13" fill="url(#hyen-body)" stroke="#080810" stroke-width="3"/>
    <path d="M104,352 L98,364" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M116,356 L114,366" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M130,356 L132,366" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="194" cy="340" rx="26" ry="14" fill="url(#hyen-body)" stroke="#080810" stroke-width="3"/>
    <path d="M180,340 L174,354" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M192,344 L190,356" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M206,344 L208,356" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <g class="char-body">
    <ellipse cx="154" cy="228" rx="36" ry="30" fill="url(#hyen-body)" stroke="#080810" stroke-width="3.5"/>
    <ellipse cx="154" cy="192" rx="50" ry="44" fill="url(#hyen-body)" stroke="#080810" stroke-width="4.5"/>
    <circle cx="134" cy="182" r="7" fill="#080810" opacity=".14"/>
    <circle cx="174" cy="182" r="6" fill="#080810" opacity=".12"/>
    <ellipse cx="154" cy="218" rx="36" ry="20" fill="#d0a850" stroke="#080810" stroke-width="3"/>
    <path d="M124,218 C130,226 144,232 154,232 C164,232 178,226 184,218"
      stroke="#080810" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="142" cy="214" rx="7" ry="5.5" fill="#080810" opacity=".6"/>
    <ellipse cx="166" cy="214" rx="7" ry="5.5" fill="#080810" opacity=".6"/>
    <ellipse cx="128" cy="190" rx="14" ry="13" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="128" cy="190" r="8" fill="#C8A84B"/>
    <path d="M128,180 C129,185 129,195 128,200 C127,195 127,185 128,180Z" fill="#080810"/>
    <circle cx="131" cy="185" r="2.8" fill="white" opacity=".9"/>
    <ellipse cx="180" cy="190" rx="14" ry="13" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="180" cy="190" r="8" fill="#C8A84B"/>
    <path d="M180,180 C181,185 181,195 180,200 C179,195 179,185 180,180Z" fill="#080810"/>
    <circle cx="183" cy="185" r="2.8" fill="white" opacity=".9"/>
    <ellipse cx="114" cy="162" rx="22" ry="20" fill="url(#hyen-body)" stroke="#080810" stroke-width="3"/>
    <ellipse cx="114" cy="162" rx="13" ry="12" fill="#C8A84B" opacity=".3"/>
    <ellipse cx="194" cy="162" rx="22" ry="20" fill="url(#hyen-body)" stroke="#080810" stroke-width="3"/>
    <ellipse cx="194" cy="162" rx="13" ry="12" fill="#C8A84B" opacity=".3"/>
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="okap-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#c08060"/>
      <stop offset="100%" stop-color="#5a3018"/>
    </radialGradient>
    <radialGradient id="okap-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7B4F2E" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#7B4F2E" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="160" cy="364" rx="60" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="250" rx="80" ry="88" fill="url(#okap-aura)"/>
  <g class="char-float">
    <path d="M206,280 C220,270 226,255 222,242 C218,250 216,262 206,280Z"
      fill="url(#okap-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="221" cy="243" rx="8" ry="7" fill="#080810" opacity=".5"/>
    <ellipse cx="158" cy="286" rx="72" ry="60" fill="url(#okap-body)" stroke="#080810" stroke-width="4.5"/>
    <rect x="105" y="338" width="24" height="34" rx="10" fill="url(#okap-body)" stroke="#080810" stroke-width="3"/>
    <rect x="103" y="348" width="28" height="5" rx="2" fill="#080810" opacity=".55"/>
    <rect x="103" y="356" width="28" height="4" rx="2" fill="#080810" opacity=".5"/>
    <rect x="103" y="364" width="28" height="3" rx="2" fill="white" opacity=".45"/>
    <ellipse cx="117" cy="373" rx="13" ry="6" fill="#3a2010" stroke="#080810" stroke-width="2"/>
    <rect x="187" y="338" width="24" height="34" rx="10" fill="url(#okap-body)" stroke="#080810" stroke-width="3"/>
    <rect x="185" y="348" width="28" height="5" rx="2" fill="#080810" opacity=".55"/>
    <rect x="185" y="356" width="28" height="4" rx="2" fill="#080810" opacity=".5"/>
    <rect x="185" y="364" width="28" height="3" rx="2" fill="white" opacity=".45"/>
    <ellipse cx="199" cy="373" rx="13" ry="6" fill="#3a2010" stroke="#080810" stroke-width="2"/>
    <rect x="115" y="332" width="22" height="32" rx="9" fill="url(#okap-body)" stroke="#080810" stroke-width="2.5"/>
    <rect x="113" y="342" width="26" height="4" rx="2" fill="#080810" opacity=".4"/>
    <rect x="113" y="350" width="26" height="4" rx="2" fill="#080810" opacity=".38"/>
    <ellipse cx="126" cy="365" rx="12" ry="5" fill="#3a2010" stroke="#080810" stroke-width="2"/>
    <rect x="179" y="332" width="22" height="32" rx="9" fill="url(#okap-body)" stroke="#080810" stroke-width="2.5"/>
    <rect x="177" y="342" width="26" height="4" rx="2" fill="#080810" opacity=".4"/>
    <rect x="177" y="350" width="26" height="4" rx="2" fill="#080810" opacity=".38"/>
    <ellipse cx="190" cy="365" rx="12" ry="5" fill="#3a2010" stroke="#080810" stroke-width="2"/>
  </g>
  <g class="neck-sway" style="transform-origin:156px 248px">
    <rect x="136" y="188" width="40" height="72" rx="18" fill="url(#okap-body)" stroke="#080810" stroke-width="4"/>
    <ellipse cx="156" cy="172" rx="36" ry="30" fill="url(#okap-body)" stroke="#080810" stroke-width="4"/>
    <path d="M128,178 C120,184 116,196 118,206 C122,214 130,218 140,216 C148,214 156,208 156,200 C156,190 148,182 140,178Z"
      fill="url(#okap-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="122" cy="203" rx="5" ry="4" fill="#080810" opacity=".65"/>
    <path d="M132,218 C130,228 130,236 132,242" stroke="#7B4F2E" stroke-width="4" stroke-linecap="round" fill="none" opacity=".8"/>
    <ellipse cx="138" cy="170" rx="14" ry="13" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="138" cy="170" r="8" fill="#080810"/>
    <circle cx="141" cy="167" r="3" fill="white" opacity=".9"/>
    <path d="M148,148 L144,130 C143,126 146,123 149,126 C151,122 154,124 153,128Z"
      fill="url(#okap-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M168,146 L166,128 C165,124 168,121 171,124 C173,120 175,123 174,127Z"
      fill="url(#okap-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M136,148 L126,118 L158,136Z" fill="url(#okap-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M140,145 L133,122 L154,136Z" fill="#7B4F2E" opacity=".4"/>
    <path d="M176,148 L184,120 L156,136Z" fill="url(#okap-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M172,145 L178,122 L158,136Z" fill="#7B4F2E" opacity=".4"/>
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="spr-body" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#f0eaff"/>
      <stop offset="100%" stop-color="#c8b4f8"/>
    </radialGradient>
    <radialGradient id="spr-wing" cx="40%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#f8f4ff"/>
      <stop offset="100%" stop-color="#ddd4fc"/>
    </radialGradient>
    <radialGradient id="spr-eye" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#b39ddb"/>
      <stop offset="100%" stop-color="#512da8"/>
    </radialGradient>
    <radialGradient id="spr-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7c4dff" stop-opacity=".4"/>
      <stop offset="100%" stop-color="#7c4dff" stop-opacity="0"/>
    </radialGradient>
    <filter id="spr-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse cx="160" cy="360" rx="38" ry="6" fill="rgba(0,0,0,.08)"/>
  <ellipse class="char-aura" cx="160" cy="210" rx="88" ry="80" fill="url(#spr-aura)"/>

  <g class="char-float">

    <!-- Wings (upper pair) -->
    <path d="M160,190 C135,165 100,158 90,178 C86,192 108,198 130,194 C142,192 152,191 160,190Z"
      fill="url(#spr-wing)" stroke="#080810" stroke-width="2" opacity=".85"/>
    <path d="M160,190 C185,165 220,158 230,178 C234,192 212,198 190,194 C178,192 168,191 160,190Z"
      fill="url(#spr-wing)" stroke="#080810" stroke-width="2" opacity=".85"/>
    <!-- Wing veins -->
    <path d="M160,190 C148,178 126,172 114,180" stroke="#7c4dff" stroke-width="1" fill="none" opacity=".4"/>
    <path d="M160,190 C172,178 194,172 206,180" stroke="#7c4dff" stroke-width="1" fill="none" opacity=".4"/>

    <!-- Wings (lower pair, smaller) -->
    <path d="M158,206 C138,204 112,215 110,232 C108,244 128,242 146,232 C152,228 156,218 158,206Z"
      fill="url(#spr-wing)" stroke="#080810" stroke-width="1.8" opacity=".7"/>
    <path d="M162,206 C182,204 208,215 210,232 C212,244 192,242 174,232 C168,228 164,218 162,206Z"
      fill="url(#spr-wing)" stroke="#080810" stroke-width="1.8" opacity=".7"/>

    <!-- Body glow -->
    <circle cx="160" cy="210" r="44" fill="#7c4dff" opacity=".15" filter="url(#spr-glow)"/>

    <!-- Body -->
    <circle cx="160" cy="210" r="36" fill="url(#spr-body)" stroke="#080810" stroke-width="3.5"/>

    <!-- Belly highlight -->
    <ellipse cx="156" cy="216" rx="19" ry="21" fill="white" opacity=".35"/>

    <!-- Face -->
    <circle cx="147" cy="203" r="9" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="147" cy="203" r="5.5" fill="url(#spr-eye)"/>
    <circle cx="149" cy="200" r="2.5" fill="white" opacity=".9"/>

    <circle cx="173" cy="203" r="9" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="173" cy="203" r="5.5" fill="url(#spr-eye)"/>
    <circle cx="175" cy="200" r="2.5" fill="white" opacity=".9"/>

    <!-- Happy mouth -->
    <path d="M151,220 C156,226 164,226 169,220" stroke="#080810" stroke-width="2.2" fill="none" stroke-linecap="round"/>

    <!-- Antennae -->
    <path d="M149,176 C143,162 137,150 134,140" stroke="#080810" stroke-width="2" stroke-linecap="round" fill="none"/>
    <circle cx="133" cy="138" r="5" fill="#7c4dff" stroke="#080810" stroke-width="2"/>
    <path d="M171,176 C177,162 183,150 186,140" stroke="#080810" stroke-width="2" stroke-linecap="round" fill="none"/>
    <circle cx="187" cy="138" r="5" fill="#7c4dff" stroke="#080810" stroke-width="2"/>

    <!-- Floating sparkles -->
    <circle cx="98" cy="178" r="3.5" fill="#7c4dff" opacity=".7" filter="url(#spr-glow)"/>
    <circle cx="222" cy="183" r="3" fill="#7c4dff" opacity=".6" filter="url(#spr-glow)"/>
    <circle cx="108" cy="238" r="3" fill="#b39ddb" opacity=".55" filter="url(#spr-glow)"/>
    <circle cx="212" cy="240" r="2.5" fill="#b39ddb" opacity=".6" filter="url(#spr-glow)"/>
    <circle cx="148" cy="155" r="2.5" fill="#7c4dff" opacity=".5" filter="url(#spr-glow)"/>
    <circle cx="173" cy="158" r="2" fill="#7c4dff" opacity=".5" filter="url(#spr-glow)"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="imp-body" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#8b3a6b"/>
      <stop offset="100%" stop-color="#4a1040"/>
    </radialGradient>
    <radialGradient id="imp-belly" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#c06090"/>
      <stop offset="100%" stop-color="#8b3a6b"/>
    </radialGradient>
    <radialGradient id="imp-eye" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffee58"/>
      <stop offset="100%" stop-color="#f57f17"/>
    </radialGradient>
    <radialGradient id="imp-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c62828" stop-opacity=".3"/>
      <stop offset="100%" stop-color="#c62828" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="356" rx="50" ry="8" fill="rgba(0,0,0,.12)"/>
  <ellipse class="char-aura" cx="160" cy="240" rx="82" ry="75" fill="url(#imp-aura)"/>

  <g class="char-float">

    <!-- Tail (curling up behind) -->
    <path d="M195,315 C220,298 238,268 228,244 C220,226 205,226 200,240 C196,252 204,270 196,288 C190,300 187,310 195,315Z"
      fill="url(#imp-body)" stroke="#080810" stroke-width="2.8" stroke-linejoin="round"/>
    <!-- Tail tip (spade-shaped) -->
    <path d="M228,244 L236,232 L239,248 Z"
      fill="#c62828" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>

    <!-- Bat wings (folded, behind body) -->
    <path d="M138,204 C118,188 93,190 86,208 C94,200 108,198 120,203 C102,218 100,242 108,252 C114,232 126,212 138,207Z"
      fill="url(#imp-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round" opacity=".88"/>
    <!-- Wing membrane lines -->
    <path d="M97,212 C108,218 120,222 130,218" stroke="#080810" stroke-width="1" fill="none" opacity=".25"/>
    <path d="M103,228 C112,233 122,235 130,232" stroke="#080810" stroke-width=".9" fill="none" opacity=".2"/>

    <path d="M182,204 C202,188 227,190 234,208 C226,200 212,198 200,203 C218,218 220,242 212,252 C206,232 194,212 182,207Z"
      fill="url(#imp-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round" opacity=".88"/>
    <path d="M223,212 C212,218 200,222 190,218" stroke="#080810" stroke-width="1" fill="none" opacity=".25"/>
    <path d="M217,228 C208,233 198,235 190,232" stroke="#080810" stroke-width=".9" fill="none" opacity=".2"/>

    <!-- Body -->
    <ellipse cx="160" cy="262" rx="58" ry="65" fill="url(#imp-body)" stroke="#080810" stroke-width="4"/>
    <!-- Belly -->
    <ellipse cx="160" cy="270" rx="32" ry="45" fill="url(#imp-belly)" stroke="#080810" stroke-width="1.5" opacity=".8"/>

    <!-- Little hooves -->
    <path d="M124,322 C112,326 108,334 120,336 C130,338 140,332 138,322Z"
      fill="url(#imp-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M120,336 C116,340 118,344 126,344 C134,344 136,340 132,336" stroke="#080810" stroke-width="2" fill="#4a1040"/>
    <path d="M196,322 C208,326 212,334 200,336 C190,338 180,332 182,322Z"
      fill="url(#imp-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M200,336 C204,340 202,344 194,344 C186,344 184,340 188,336" stroke="#080810" stroke-width="2" fill="#4a1040"/>

    <!-- Head -->
    <circle cx="160" cy="190" r="52" fill="url(#imp-body)" stroke="#080810" stroke-width="4"/>

    <!-- Horns -->
    <path d="M135,152 C127,132 131,112 138,104 C138,118 135,134 140,150Z"
      fill="#c62828" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M133,132 L139,127" stroke="#080810" stroke-width="1.2" fill="none" opacity=".4"/>
    <path d="M131,120 L136,115" stroke="#080810" stroke-width="1" fill="none" opacity=".3"/>

    <path d="M185,152 C193,132 189,112 182,104 C182,118 185,134 180,150Z"
      fill="#c62828" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M187,132 L181,127" stroke="#080810" stroke-width="1.2" fill="none" opacity=".4"/>
    <path d="M189,120 L184,115" stroke="#080810" stroke-width="1" fill="none" opacity=".3"/>

    <!-- Pointy ears -->
    <path d="M112,164 C100,150 96,133 100,122 C106,135 110,150 116,162Z"
      fill="url(#imp-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M208,164 C220,150 224,133 220,122 C214,135 210,150 204,162Z"
      fill="url(#imp-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- Eyes -->
    <ellipse cx="142" cy="187" rx="13" ry="11" fill="url(#imp-eye)" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="142" cy="188" rx="6" ry="5" fill="#080810"/>
    <circle cx="145" cy="184" r="2.5" fill="white" opacity=".8"/>
    <ellipse cx="178" cy="187" rx="13" ry="11" fill="url(#imp-eye)" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="178" cy="188" rx="6" ry="5" fill="#080810"/>
    <circle cx="181" cy="184" r="2.5" fill="white" opacity=".8"/>

    <!-- Sly grin with tiny fangs -->
    <path d="M138,208 C148,218 172,218 182,208" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M148,214 L150,220" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M172,214 L170,220" stroke="#080810" stroke-width="2" stroke-linecap="round"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="gol-stone" cx="35%" cy="30%" r="72%">
      <stop offset="0%" stop-color="#c8c4bc"/>
      <stop offset="100%" stop-color="#8c897e"/>
    </radialGradient>
    <radialGradient id="gol-dark" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#a09c94"/>
      <stop offset="100%" stop-color="#6a6760"/>
    </radialGradient>
    <radialGradient id="gol-crystal" cx="35%" cy="25%" r="65%">
      <stop offset="0%" stop-color="#aaffcc"/>
      <stop offset="100%" stop-color="#00c853"/>
    </radialGradient>
    <radialGradient id="gol-eye" cx="30%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#b9ffce"/>
      <stop offset="100%" stop-color="#00e676"/>
    </radialGradient>
    <radialGradient id="gol-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#558b2f" stop-opacity=".28"/>
      <stop offset="100%" stop-color="#558b2f" stop-opacity="0"/>
    </radialGradient>
    <filter id="gol-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse cx="160" cy="364" rx="62" ry="9" fill="rgba(0,0,0,.14)"/>
  <ellipse class="char-aura" cx="160" cy="245" rx="88" ry="82" fill="url(#gol-aura)"/>

  <g class="char-float">

    <!-- Left arm -->
    <rect x="84" y="196" width="38" height="74" rx="10" fill="url(#gol-stone)" stroke="#080810" stroke-width="3.5"/>
    <rect x="78" y="258" width="44" height="34" rx="8" fill="url(#gol-dark)" stroke="#080810" stroke-width="3"/>
    <path d="M85,272 L85,284" stroke="#080810" stroke-width="1.5" fill="none" opacity=".3"/>
    <path d="M95,270 L95,282" stroke="#080810" stroke-width="1.5" fill="none" opacity=".3"/>
    <path d="M105,272 L105,284" stroke="#080810" stroke-width="1.5" fill="none" opacity=".3"/>

    <!-- Right arm -->
    <rect x="198" y="196" width="38" height="74" rx="10" fill="url(#gol-stone)" stroke="#080810" stroke-width="3.5"/>
    <rect x="198" y="258" width="44" height="34" rx="8" fill="url(#gol-dark)" stroke="#080810" stroke-width="3"/>
    <path d="M205,272 L205,284" stroke="#080810" stroke-width="1.5" fill="none" opacity=".3"/>
    <path d="M215,270 L215,282" stroke="#080810" stroke-width="1.5" fill="none" opacity=".3"/>
    <path d="M225,272 L225,284" stroke="#080810" stroke-width="1.5" fill="none" opacity=".3"/>

    <!-- Body -->
    <rect x="106" y="190" width="108" height="122" rx="14" fill="url(#gol-stone)" stroke="#080810" stroke-width="4"/>
    <!-- Crack lines -->
    <path d="M132,208 C136,222 134,236 138,248" stroke="#080810" stroke-width="1.5" fill="none" opacity=".2"/>
    <path d="M178,213 C176,228 179,240 175,254" stroke="#080810" stroke-width="1.2" fill="none" opacity=".18"/>

    <!-- Chest crystal gem -->
    <polygon points="160,226 147,248 160,260 173,248" fill="url(#gol-crystal)" stroke="#080810" stroke-width="2.5" class="crystal-g"/>
    <polygon points="160,232 153,244 160,252 167,244" fill="#efffee" opacity=".65" filter="url(#gol-glow)"/>

    <!-- Shoulder moss -->
    <ellipse cx="124" cy="197" rx="16" ry="8" fill="#4caf50" stroke="#080810" stroke-width="1.5" opacity=".85"/>
    <ellipse cx="196" cy="197" rx="16" ry="8" fill="#4caf50" stroke="#080810" stroke-width="1.5" opacity=".85"/>
    <path d="M114,195 C118,192 122,192 125,195" stroke="#2e7d32" stroke-width="1.2" fill="none" opacity=".5"/>
    <path d="M120,199 C124,196 128,196 132,199" stroke="#2e7d32" stroke-width="1.2" fill="none" opacity=".5"/>
    <path d="M186,195 C190,192 194,192 197,195" stroke="#2e7d32" stroke-width="1.2" fill="none" opacity=".5"/>
    <path d="M192,199 C196,196 200,196 204,199" stroke="#2e7d32" stroke-width="1.2" fill="none" opacity=".5"/>

    <!-- Legs -->
    <rect x="118" y="302" width="44" height="52" rx="10" fill="url(#gol-dark)" stroke="#080810" stroke-width="3.5"/>
    <rect x="158" y="302" width="44" height="52" rx="10" fill="url(#gol-dark)" stroke="#080810" stroke-width="3.5"/>

    <!-- Head -->
    <rect x="116" y="128" width="88" height="76" rx="16" fill="url(#gol-stone)" stroke="#080810" stroke-width="4"/>
    <!-- Head crack -->
    <path d="M148,140 C144,152 146,163 142,172" stroke="#080810" stroke-width="1.5" fill="none" opacity=".2"/>
    <!-- Head moss -->
    <ellipse cx="160" cy="131" rx="25" ry="9" fill="#4caf50" stroke="#080810" stroke-width="1.5" opacity=".88"/>
    <path d="M142,129 C146,125 150,125 154,129" stroke="#2e7d32" stroke-width="1.2" fill="none" opacity=".6"/>
    <path d="M152,126 C156,122 160,122 163,126" stroke="#2e7d32" stroke-width="1.2" fill="none" opacity=".6"/>
    <path d="M163,129 C167,125 171,125 175,129" stroke="#2e7d32" stroke-width="1.2" fill="none" opacity=".6"/>

    <!-- Eyes (glowing green) -->
    <rect x="131" y="154" width="22" height="15" rx="4" fill="url(#gol-eye)" stroke="#080810" stroke-width="2.5" class="crystal-g"/>
    <rect x="167" y="154" width="22" height="15" rx="4" fill="url(#gol-eye)" stroke="#080810" stroke-width="2.5" class="crystal-g"/>
    <rect x="136" y="158" width="12" height="7" rx="2" fill="#efffee" opacity=".65" filter="url(#gol-glow)"/>
    <rect x="172" y="158" width="12" height="7" rx="2" fill="#efffee" opacity=".65" filter="url(#gol-glow)"/>

    <!-- Mouth (stone slot) -->
    <path d="M142,186 L160,183 L178,186" stroke="#080810" stroke-width="3" fill="none" stroke-linecap="round"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="djn-body" cx="35%" cy="28%" r="70%">
      <stop offset="0%" stop-color="#80cbc4"/>
      <stop offset="100%" stop-color="#006064"/>
    </radialGradient>
    <radialGradient id="djn-smoke" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#b2dfdb"/>
      <stop offset="60%" stop-color="#80cbc4"/>
      <stop offset="100%" stop-color="#006064" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="djn-eye" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#e0f7fa"/>
      <stop offset="100%" stop-color="#b2dfdb"/>
    </radialGradient>
    <radialGradient id="djn-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0277bd" stop-opacity=".35"/>
      <stop offset="100%" stop-color="#0277bd" stop-opacity="0"/>
    </radialGradient>
    <filter id="djn-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse class="char-aura" cx="160" cy="235" rx="95" ry="88" fill="url(#djn-aura)"/>

  <g class="wisp-bob">

    <!-- Smoke tail (dissolving lower body) -->
    <ellipse cx="160" cy="345" rx="72" ry="36" fill="url(#djn-smoke)" stroke="#080810" stroke-width="1.5" opacity=".45"/>
    <ellipse cx="152" cy="322" rx="56" ry="30" fill="url(#djn-smoke)" stroke="#080810" stroke-width="1.8" opacity=".62"/>
    <ellipse cx="162" cy="298" rx="48" ry="26" fill="url(#djn-smoke)" stroke="#080810" stroke-width="2" opacity=".75"/>
    <path d="M122,342 C109,330 105,316 113,306" stroke="#080810" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".3"/>
    <path d="M198,342 C211,330 215,316 207,306" stroke="#080810" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".3"/>

    <!-- Torso -->
    <path d="M118,265 C113,236 116,212 124,202 C136,190 184,190 196,202 C204,212 207,236 202,265 C190,278 175,284 160,284 C145,284 130,278 118,265Z"
      fill="url(#djn-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Chest band (gold) -->
    <path d="M122,236 C138,242 182,242 198,236" stroke="#f9a825" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M123,244 C138,249 182,249 197,244" stroke="#f9a825" stroke-width="2" fill="none" stroke-linecap="round" opacity=".55"/>
    <!-- Center jewel -->
    <circle cx="160" cy="244" r="7" fill="#f9a825" stroke="#080810" stroke-width="2" class="crystal-g"/>
    <circle cx="160" cy="244" r="4" fill="#fff9c4" opacity=".85" filter="url(#djn-glow)"/>

    <!-- Left arm -->
    <path d="M124,208 C105,200 92,208 88,223 C98,212 112,210 122,216Z"
      fill="url(#djn-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="84" cy="230" rx="16" ry="12" fill="url(#djn-body)" stroke="#080810" stroke-width="2.8"/>
    <ellipse cx="84" cy="232" rx="16" ry="6" fill="none" stroke="#f9a825" stroke-width="3"/>

    <!-- Right arm -->
    <path d="M196,208 C215,200 228,208 232,223 C222,212 208,210 198,216Z"
      fill="url(#djn-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="236" cy="230" rx="16" ry="12" fill="url(#djn-body)" stroke="#080810" stroke-width="2.8"/>
    <ellipse cx="236" cy="232" rx="16" ry="6" fill="none" stroke="#f9a825" stroke-width="3"/>

    <!-- Head -->
    <circle cx="160" cy="168" r="56" fill="url(#djn-body)" stroke="#080810" stroke-width="4"/>

    <!-- Turban -->
    <path d="M107,155 C112,128 138,116 160,116 C182,116 208,128 213,155"
      fill="none" stroke="#f9a825" stroke-width="8" stroke-linecap="round"/>
    <path d="M112,158 C118,133 140,122 160,122 C180,122 202,133 208,158"
      fill="none" stroke="#f9a825" stroke-width="3.5" stroke-linecap="round" opacity=".5"/>
    <!-- Turban jewel -->
    <circle cx="160" cy="118" r="9" fill="#f9a825" stroke="#080810" stroke-width="2.5" class="crystal-g"/>
    <circle cx="160" cy="118" r="5" fill="#fff9c4" opacity=".85" filter="url(#djn-glow)"/>

    <!-- Eyes (glowing bright) -->
    <ellipse cx="140" cy="165" rx="14" ry="12" fill="url(#djn-eye)" stroke="#080810" stroke-width="2.5" class="eye-pulse"/>
    <ellipse cx="140" cy="166" rx="7" ry="6" fill="#004d40"/>
    <circle cx="143" cy="162" r="3" fill="white" opacity=".9"/>
    <ellipse cx="180" cy="165" rx="14" ry="12" fill="url(#djn-eye)" stroke="#080810" stroke-width="2.5" class="eye-pulse"/>
    <ellipse cx="180" cy="166" rx="7" ry="6" fill="#004d40"/>
    <circle cx="183" cy="162" r="3" fill="white" opacity=".9"/>

    <!-- Smile -->
    <path d="M144,186 C152,194 168,194 176,186" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Floating smoke sparks -->
    <circle cx="110" cy="310" r="4" fill="#80cbc4" opacity=".6" filter="url(#djn-glow)"/>
    <circle cx="210" cy="316" r="3.5" fill="#80cbc4" opacity=".55" filter="url(#djn-glow)"/>
    <circle cx="96" cy="268" r="3" fill="#b2dfdb" opacity=".5" filter="url(#djn-glow)"/>
    <circle cx="224" cy="275" r="3.5" fill="#b2dfdb" opacity=".5" filter="url(#djn-glow)"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bsl-body" cx="35%" cy="30%" r="72%">
      <stop offset="0%" stop-color="#8d9a2e"/>
      <stop offset="100%" stop-color="#4a5000"/>
    </radialGradient>
    <radialGradient id="bsl-belly" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#d4d890"/>
      <stop offset="100%" stop-color="#9ca820"/>
    </radialGradient>
    <radialGradient id="bsl-eye" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffe082"/>
      <stop offset="100%" stop-color="#f57f17"/>
    </radialGradient>
    <radialGradient id="bsl-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#827717" stop-opacity=".28"/>
      <stop offset="100%" stop-color="#827717" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="366" rx="54" ry="8" fill="rgba(0,0,0,.12)"/>
  <ellipse class="char-aura" cx="160" cy="255" rx="90" ry="82" fill="url(#bsl-aura)"/>

  <g class="char-float">

    <!-- Back coil -->
    <path d="M94,302 C70,287 66,257 76,234 C86,212 106,204 126,208 C115,210 100,224 94,245 C88,266 94,287 102,302Z"
      fill="url(#bsl-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>

    <!-- Main coil body -->
    <path d="M102,320 C85,307 75,282 81,254 C87,227 106,210 128,207 C158,204 188,217 200,242 C210,262 205,292 192,312 C178,334 158,344 140,344 C122,344 111,332 102,320Z"
      fill="url(#bsl-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Belly scales -->
    <path d="M106,292 C118,282 142,280 160,284 C178,288 196,294 200,307"
      fill="url(#bsl-belly)" stroke="#080810" stroke-width="2" opacity=".85"/>
    <path d="M108,305 C120,299 140,297 157,300" stroke="#080810" stroke-width="1" fill="none" opacity=".2"/>
    <path d="M90,267 C97,261 108,258 117,261" stroke="#080810" stroke-width="1" fill="none" opacity=".18"/>
    <path d="M86,282 C93,276 104,273 113,276" stroke="#080810" stroke-width="1" fill="none" opacity=".15"/>

    <!-- Chicken feet -->
    <path d="M130,333 C125,347 122,358 118,363" stroke="#4a5000" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M118,363 L108,372" stroke="#4a5000" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M118,363 L118,374" stroke="#4a5000" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M118,363 L128,372" stroke="#4a5000" stroke-width="3.5" stroke-linecap="round" fill="none"/>

    <path d="M155,342 C155,356 153,366 150,372" stroke="#4a5000" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M150,372 L140,378" stroke="#4a5000" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M150,372 L150,380" stroke="#4a5000" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M150,372 L160,379" stroke="#4a5000" stroke-width="3.5" stroke-linecap="round" fill="none"/>

    <!-- Neck -->
    <path d="M156,218 C146,208 140,190 146,174 C153,167 167,167 174,174 C180,190 174,208 164,218Z"
      fill="url(#bsl-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Head -->
    <path d="M128,150 C128,127 140,110 160,110 C180,110 192,127 192,150 C192,167 182,180 160,184 C138,180 128,167 128,150Z"
      fill="url(#bsl-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

    <!-- Crown spines -->
    <path d="M160,110 L160,84 L162,110Z" fill="#f5f0dc" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M147,114 L136,90 L150,114Z" fill="#f5f0dc" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M136,122 L120,102 L138,124Z" fill="#f5f0dc" stroke="#080810" stroke-width="1.8" stroke-linejoin="round" opacity=".9"/>
    <path d="M173,114 L184,90 L170,114Z" fill="#f5f0dc" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M184,122 L200,102 L182,124Z" fill="#f5f0dc" stroke="#080810" stroke-width="1.8" stroke-linejoin="round" opacity=".9"/>
    <!-- Crown base -->
    <path d="M128,127 C140,122 180,122 192,127" stroke="#e8d98a" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- Eyes (wide, golden, hypnotic) -->
    <circle cx="142" cy="150" r="14" fill="url(#bsl-eye)" stroke="#080810" stroke-width="3" class="eye-pulse"/>
    <ellipse cx="142" cy="151" rx="5" ry="10" fill="#080810"/>
    <circle cx="145" cy="145" r="3" fill="white" opacity=".7"/>
    <circle cx="142" cy="150" r="17" fill="none" stroke="#827717" stroke-width="1.5" opacity=".5"/>

    <circle cx="178" cy="150" r="14" fill="url(#bsl-eye)" stroke="#080810" stroke-width="3" class="eye-pulse"/>
    <ellipse cx="178" cy="151" rx="5" ry="10" fill="#080810"/>
    <circle cx="181" cy="145" r="3" fill="white" opacity=".7"/>
    <circle cx="178" cy="150" r="17" fill="none" stroke="#827717" stroke-width="1.5" opacity=".5"/>

    <!-- Forked tongue -->
    <path d="M160,180 L160,197" stroke="#c62828" stroke-width="3" stroke-linecap="round" fill="none" class="tongue-fork"/>
    <path d="M160,197 L152,207" stroke="#c62828" stroke-width="2.5" stroke-linecap="round" fill="none" class="tongue-fork"/>
    <path d="M160,197 L168,207" stroke="#c62828" stroke-width="2.5" stroke-linecap="round" fill="none" class="tongue-fork"/>

    <!-- Head scale texture -->
    <path d="M138,142 C146,139 174,139 182,142" stroke="#080810" stroke-width="1" fill="none" opacity=".2"/>
    <path d="M133,157 C142,154 178,154 187,157" stroke="#080810" stroke-width="1" fill="none" opacity=".18"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fry-skin" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffe0b2"/>
      <stop offset="100%" stop-color="#ffb74d"/>
    </radialGradient>
    <radialGradient id="fry-dress" cx="35%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#f8bbd0"/>
      <stop offset="100%" stop-color="#c2185b"/>
    </radialGradient>
    <radialGradient id="fry-wing" cx="40%" cy="25%" r="65%">
      <stop offset="0%" stop-color="#fce4ec"/>
      <stop offset="100%" stop-color="#f8bbd0"/>
    </radialGradient>
    <radialGradient id="fry-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e91e8c" stop-opacity=".35"/>
      <stop offset="100%" stop-color="#e91e8c" stop-opacity="0"/>
    </radialGradient>
    <filter id="fry-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse cx="160" cy="364" rx="42" ry="7" fill="rgba(0,0,0,.09)"/>
  <ellipse class="char-aura" cx="160" cy="232" rx="90" ry="82" fill="url(#fry-aura)"/>

  <g class="char-float">

    <!-- Wings (dragonfly-style, translucent) -->
    <!-- Upper left -->
    <path d="M148,196 C124,175 90,170 80,192 C76,206 100,212 126,206 C136,203 143,200 148,196Z"
      fill="url(#fry-wing)" stroke="#c2185b" stroke-width="1.8" opacity=".8"/>
    <!-- Upper right -->
    <path d="M172,196 C196,175 230,170 240,192 C244,206 220,212 194,206 C184,203 177,200 172,196Z"
      fill="url(#fry-wing)" stroke="#c2185b" stroke-width="1.8" opacity=".8"/>
    <!-- Lower left -->
    <path d="M150,212 C132,210 108,220 106,236 C104,248 122,246 140,238 C146,235 149,224 150,212Z"
      fill="url(#fry-wing)" stroke="#c2185b" stroke-width="1.5" opacity=".65"/>
    <!-- Lower right -->
    <path d="M170,212 C188,210 212,220 214,236 C216,248 198,246 180,238 C174,235 171,224 170,212Z"
      fill="url(#fry-wing)" stroke="#c2185b" stroke-width="1.5" opacity=".65"/>
    <!-- Wing vein accents -->
    <path d="M148,196 C138,185 118,180 106,188" stroke="#e91e8c" stroke-width=".9" fill="none" opacity=".4"/>
    <path d="M172,196 C182,185 202,180 214,188" stroke="#e91e8c" stroke-width=".9" fill="none" opacity=".4"/>

    <!-- Dress / body -->
    <path d="M135,258 C128,240 130,222 140,210 C148,202 172,202 180,210 C190,222 192,240 185,258 C178,274 170,284 160,284 C150,284 142,274 135,258Z"
      fill="url(#fry-dress)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Dress hem ruffle -->
    <path d="M132,262 C140,270 150,276 160,276 C170,276 180,270 188,262" stroke="#080810" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".5"/>

    <!-- Arms -->
    <path d="M138,218 C120,210 106,216 102,230 C112,220 124,218 134,224Z"
      fill="url(#fry-skin)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="98" cy="237" rx="13" ry="10" fill="url(#fry-skin)" stroke="#080810" stroke-width="2.2"/>
    <!-- Wand in left hand -->
    <path d="M88,242 L72,216" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="70" cy="213" r="6" fill="#fff176" stroke="#080810" stroke-width="2"/>
    <circle cx="70" cy="213" r="3" fill="#ffd600" opacity=".9" filter="url(#fry-glow)"/>

    <path d="M182,218 C200,210 214,216 218,230 C208,220 196,218 186,224Z"
      fill="url(#fry-skin)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="222" cy="237" rx="13" ry="10" fill="url(#fry-skin)" stroke="#080810" stroke-width="2.2"/>

    <!-- Legs (small, peeking below dress) -->
    <path d="M148,280 C146,294 144,308 142,318" stroke="#080810" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <ellipse cx="142" cy="322" rx="10" ry="7" fill="url(#fry-skin)" stroke="#080810" stroke-width="2.2"/>
    <path d="M172,280 C174,294 176,308 178,318" stroke="#080810" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <ellipse cx="178" cy="322" rx="10" ry="7" fill="url(#fry-skin)" stroke="#080810" stroke-width="2.2"/>

    <!-- Head -->
    <circle cx="160" cy="185" r="46" fill="url(#fry-skin)" stroke="#080810" stroke-width="4"/>

    <!-- Flower crown -->
    <!-- Petals around crown band -->
    <circle cx="130" cy="145" r="9" fill="#ff80ab" stroke="#080810" stroke-width="2"/>
    <circle cx="130" cy="145" r="4" fill="#fff9c4"/>
    <circle cx="145" cy="135" r="9" fill="#ff4081" stroke="#080810" stroke-width="2"/>
    <circle cx="145" cy="135" r="4" fill="#fff9c4"/>
    <circle cx="160" cy="132" r="10" fill="#f50057" stroke="#080810" stroke-width="2"/>
    <circle cx="160" cy="132" r="5" fill="#fff9c4"/>
    <circle cx="175" cy="135" r="9" fill="#ff4081" stroke="#080810" stroke-width="2"/>
    <circle cx="175" cy="135" r="4" fill="#fff9c4"/>
    <circle cx="190" cy="145" r="9" fill="#ff80ab" stroke="#080810" stroke-width="2"/>
    <circle cx="190" cy="145" r="4" fill="#fff9c4"/>
    <!-- Crown band -->
    <path d="M122,152 C136,146 184,146 198,152" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Ears (pointy) -->
    <path d="M116,172 C104,158 102,142 108,132 C112,144 114,158 120,170Z"
      fill="url(#fry-skin)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M204,172 C216,158 218,142 212,132 C208,144 206,158 200,170Z"
      fill="url(#fry-skin)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- Eyes -->
    <circle cx="144" cy="183" r="10" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="144" cy="183" r="6" fill="#880e4f"/>
    <circle cx="147" cy="180" r="2.5" fill="white" opacity=".9"/>
    <circle cx="176" cy="183" r="10" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="176" cy="183" r="6" fill="#880e4f"/>
    <circle cx="179" cy="180" r="2.5" fill="white" opacity=".9"/>

    <!-- Smile -->
    <path d="M150,200 C156,206 164,206 170,200" stroke="#080810" stroke-width="2.2" fill="none" stroke-linecap="round"/>

    <!-- Rosy cheeks -->
    <ellipse cx="133" cy="196" rx="10" ry="6" fill="#f06292" opacity=".35"/>
    <ellipse cx="187" cy="196" rx="10" ry="6" fill="#f06292" opacity=".35"/>

    <!-- Wand sparkles -->
    <circle cx="58" cy="208" r="3" fill="#fff176" opacity=".7" filter="url(#fry-glow)"/>
    <circle cx="76" cy="200" r="2.5" fill="#ffd600" opacity=".6" filter="url(#fry-glow)"/>
    <circle cx="82" cy="222" r="2" fill="#fff9c4" opacity=".55" filter="url(#fry-glow)"/>

    <!-- Floating petal/sparkle around character -->
    <circle cx="232" cy="195" r="3" fill="#f48fb1" opacity=".6" filter="url(#fry-glow)"/>
    <circle cx="92" cy="248" r="2.5" fill="#f48fb1" opacity=".5" filter="url(#fry-glow)"/>
    <circle cx="228" cy="255" r="3" fill="#ff80ab" opacity=".55" filter="url(#fry-glow)"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="chm-lion" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffe082"/>
      <stop offset="100%" stop-color="#e65100"/>
    </radialGradient>
    <radialGradient id="chm-goat" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#d7ccc8"/>
      <stop offset="100%" stop-color="#8d6e63"/>
    </radialGradient>
    <radialGradient id="chm-mane" cx="40%" cy="25%" r="68%">
      <stop offset="0%" stop-color="#ffb74d"/>
      <stop offset="100%" stop-color="#bf360c"/>
    </radialGradient>
    <radialGradient id="chm-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e65100" stop-opacity=".3"/>
      <stop offset="100%" stop-color="#e65100" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="362" rx="66" ry="9" fill="rgba(0,0,0,.12)"/>
  <ellipse class="char-aura" cx="160" cy="248" rx="92" ry="84" fill="url(#chm-aura)"/>

  <g class="char-float">

    <!-- Serpent tail (back, coiling up from rump) -->
    <path d="M202,305 C224,288 240,260 232,236 C224,214 208,212 202,226 C198,238 206,258 198,278 C192,294 190,306 202,305Z"
      fill="url(#chm-lion)" stroke="#080810" stroke-width="2.8" stroke-linejoin="round"/>
    <!-- Snake head at tail tip -->
    <ellipse cx="233" cy="235" rx="14" ry="10" transform="rotate(-25 233 235)"
      fill="url(#chm-goat)" stroke="#080810" stroke-width="2.5"/>
    <circle cx="228" cy="230" r="4" fill="white" stroke="#080810" stroke-width="1.8"/>
    <circle cx="228" cy="230" r="2" fill="#080810"/>
    <!-- Snake tongue -->
    <path d="M240,237 L248,240 M240,237 L248,244" stroke="#c62828" stroke-width="1.8" stroke-linecap="round" fill="none"/>

    <!-- Body (lion-like, crouching) -->
    <path d="M110,278 C106,248 112,224 128,210 C142,198 178,198 192,210 C208,224 214,248 210,278 C204,308 186,332 160,332 C134,332 116,308 110,278Z"
      fill="url(#chm-lion)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

    <!-- Fur texture lines on body -->
    <path d="M130,240 C136,254 134,270 132,285" stroke="#080810" stroke-width="1.2" fill="none" opacity=".18"/>
    <path d="M160,235 C162,252 161,270 158,285" stroke="#080810" stroke-width="1.2" fill="none" opacity=".16"/>
    <path d="M188,242 C185,255 185,270 188,284" stroke="#080810" stroke-width="1.2" fill="none" opacity=".18"/>

    <!-- Front left paw -->
    <ellipse cx="126" cy="324" rx="28" ry="14" fill="url(#chm-lion)" stroke="#080810" stroke-width="3"/>
    <path d="M104,322 L108,330" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M117,325 L119,333" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M130,325 L130,333" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <!-- Front right paw -->
    <ellipse cx="194" cy="324" rx="28" ry="14" fill="url(#chm-lion)" stroke="#080810" stroke-width="3"/>
    <path d="M172,322 L176,330" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M185,325 L187,333" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M202,325 L202,333" stroke="#080810" stroke-width="2" stroke-linecap="round"/>

    <!-- Goat head (on back, second head) — smaller, facing side -->
    <ellipse cx="218" cy="206" rx="30" ry="24" transform="rotate(18 218 206)"
      fill="url(#chm-goat)" stroke="#080810" stroke-width="3"/>
    <!-- Goat horns -->
    <path d="M208,186 C202,172 206,158 212,154 C212,166 210,178 212,188Z"
      fill="url(#chm-goat)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M222,182 C220,168 226,155 232,152 C230,164 226,177 226,186Z"
      fill="url(#chm-goat)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Goat beard -->
    <path d="M218,222 C218,230 215,236 216,240" stroke="#d7ccc8" stroke-width="3" stroke-linecap="round" fill="none"/>
    <!-- Goat eye -->
    <ellipse cx="225" cy="204" rx="6" ry="5" fill="white" stroke="#080810" stroke-width="2"/>
    <ellipse cx="225" cy="205" rx="2" ry="4" fill="#080810"/>

    <!-- Lion main head -->
    <circle cx="152" cy="182" r="58" fill="url(#chm-lion)" stroke="#080810" stroke-width="4"/>

    <!-- Mane (ring around head) -->
    <!-- Mane spikes -->
    <path d="M96,158 C88,138 94,118 105,112 C106,128 100,146 104,160Z"
      fill="url(#chm-mane)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M106,140 C102,120 110,102 120,98 C120,114 114,132 116,146Z"
      fill="url(#chm-mane)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M122,128 C122,108 132,92 143,90 C142,106 134,124 136,138Z"
      fill="url(#chm-mane)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M140,122 C142,102 154,88 164,88 C162,104 154,120 154,134Z"
      fill="url(#chm-mane)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M160,122 C166,102 178,90 188,92 C184,108 176,124 174,136Z"
      fill="url(#chm-mane)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M178,128 C188,110 202,100 212,104 C206,118 196,132 196,146Z"
      fill="url(#chm-mane)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M194,142 C208,128 222,122 230,128 C222,140 210,150 208,162Z"
      fill="url(#chm-mane)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M98,178 C86,166 82,150 88,140 C96,152 100,168 100,180Z"
      fill="url(#chm-mane)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>

    <!-- Lion nose/muzzle -->
    <ellipse cx="150" cy="195" rx="30" ry="22" fill="url(#chm-mane)" stroke="#080810" stroke-width="2.5" opacity=".7"/>
    <ellipse cx="150" cy="192" rx="10" ry="7" fill="#bf360c" stroke="#080810" stroke-width="2"/>
    <!-- Nostrils -->
    <ellipse cx="145" cy="192" rx="3" ry="2" fill="#080810" opacity=".6"/>
    <ellipse cx="155" cy="192" rx="3" ry="2" fill="#080810" opacity=".6"/>
    <!-- Lion mouth -->
    <path d="M135,202 C142,210 158,210 165,202" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Lion eyes -->
    <ellipse cx="126" cy="174" rx="14" ry="12" fill="white" stroke="#080810" stroke-width="3"/>
    <ellipse cx="126" cy="175" rx="7" ry="7" fill="#f57f17"/>
    <ellipse cx="126" cy="175" rx="3.5" ry="5.5" fill="#080810"/>
    <circle cx="128" cy="171" r="2.5" fill="white" opacity=".85"/>

    <ellipse cx="174" cy="174" rx="14" ry="12" fill="white" stroke="#080810" stroke-width="3"/>
    <ellipse cx="174" cy="175" rx="7" ry="7" fill="#f57f17"/>
    <ellipse cx="174" cy="175" rx="3.5" ry="5.5" fill="#080810"/>
    <circle cx="176" cy="171" r="2.5" fill="white" opacity=".85"/>

    <!-- Lion ears -->
    <path d="M100,152 C90,134 92,114 100,106 C104,120 104,138 108,152Z"
      fill="url(#chm-lion)" stroke="#080810" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M200,150 C210,132 210,112 202,104 C198,118 198,136 194,150Z"
      fill="url(#chm-lion)" stroke="#080810" stroke-width="2.8" stroke-linejoin="round"/>
    <!-- Ear inner -->
    <path d="M101,148 C95,134 96,120 102,114" stroke="#c2185b" stroke-width="2" fill="none" opacity=".5"/>
    <path d="M199,146 C205,132 204,118 198,112" stroke="#c2185b" stroke-width="2" fill="none" opacity=".5"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="krk-body" cx="35%" cy="28%" r="70%">
      <stop offset="0%" stop-color="#90caf9"/>
      <stop offset="100%" stop-color="#1565c0"/>
    </radialGradient>
    <radialGradient id="krk-mantle" cx="35%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#bbdefb"/>
      <stop offset="100%" stop-color="#42a5f5"/>
    </radialGradient>
    <radialGradient id="krk-eye" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#e3f2fd"/>
      <stop offset="100%" stop-color="#90caf9"/>
    </radialGradient>
    <radialGradient id="krk-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1565c0" stop-opacity=".32"/>
      <stop offset="100%" stop-color="#1565c0" stop-opacity="0"/>
    </radialGradient>
    <filter id="krk-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse cx="160" cy="364" rx="52" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="248" rx="95" ry="88" fill="url(#krk-aura)"/>

  <g class="char-float">

    <!-- Tentacles (8 arms radiating below the body) -->
    <!-- Far left tentacle -->
    <path d="M130,304 C104,315 82,330 72,348 C78,338 88,326 92,316 C82,322 76,334 74,350 C84,340 96,332 104,322 C96,334 92,348 96,358Z"
      fill="url(#krk-body)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- Mid-left outer tentacle -->
    <path d="M138,312 C122,326 112,344 110,362 C116,350 124,338 128,328 C122,342 120,356 122,368Z"
      fill="url(#krk-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <!-- Mid-left tentacle -->
    <path d="M148,316 C138,332 134,350 136,368 C140,355 144,340 146,328 C142,344 142,360 146,372Z"
      fill="url(#krk-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <!-- Center-left tentacle -->
    <path d="M156,318 C152,336 152,354 156,370 C158,356 158,340 158,326 C156,344 158,360 162,372Z"
      fill="url(#krk-mantle)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- Center-right tentacle -->
    <path d="M164,318 C168,336 168,354 164,370 C162,356 162,340 162,326 C164,344 162,360 158,372Z"
      fill="url(#krk-mantle)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- Mid-right tentacle -->
    <path d="M172,316 C182,332 186,350 184,368 C180,355 176,340 174,328 C178,344 178,360 174,372Z"
      fill="url(#krk-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <!-- Mid-right outer tentacle -->
    <path d="M182,312 C198,326 208,344 210,362 C204,350 196,338 192,328 C198,342 200,356 198,368Z"
      fill="url(#krk-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <!-- Far right tentacle -->
    <path d="M190,304 C216,315 238,330 248,348 C242,338 232,326 228,316 C238,322 244,334 246,350 C236,340 224,332 216,322 C224,334 228,348 224,358Z"
      fill="url(#krk-body)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>

    <!-- Sucker spots on tentacles -->
    <circle cx="126" cy="328" r="3" fill="white" stroke="#080810" stroke-width="1.2" opacity=".7"/>
    <circle cx="110" cy="346" r="2.5" fill="white" stroke="#080810" stroke-width="1" opacity=".65"/>
    <circle cx="140" cy="338" r="2.5" fill="white" stroke="#080810" stroke-width="1" opacity=".65"/>
    <circle cx="154" cy="344" r="3" fill="white" stroke="#080810" stroke-width="1.2" opacity=".7"/>
    <circle cx="166" cy="344" r="3" fill="white" stroke="#080810" stroke-width="1.2" opacity=".7"/>
    <circle cx="180" cy="338" r="2.5" fill="white" stroke="#080810" stroke-width="1" opacity=".65"/>
    <circle cx="200" cy="346" r="2.5" fill="white" stroke="#080810" stroke-width="1" opacity=".65"/>
    <circle cx="194" cy="328" r="3" fill="white" stroke="#080810" stroke-width="1.2" opacity=".7"/>

    <!-- Mantle / body (balloon-shaped) -->
    <ellipse cx="160" cy="248" rx="72" ry="82" fill="url(#krk-mantle)" stroke="#080810" stroke-width="4"/>

    <!-- Mantle fin ridges -->
    <path d="M90,232 C88,220 92,210 98,205" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".3"/>
    <path d="M230,232 C232,220 228,210 222,205" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".3"/>
    <!-- Mantle top point -->
    <path d="M152,166 C154,148 158,135 160,128 C162,135 166,148 168,166"
      fill="url(#krk-mantle)" stroke="#080810" stroke-width="2.8" stroke-linejoin="round"/>

    <!-- Skin texture spots -->
    <circle cx="138" cy="228" r="5" fill="#1565c0" opacity=".18"/>
    <circle cx="160" cy="218" r="6" fill="#1565c0" opacity=".15"/>
    <circle cx="182" cy="225" r="5" fill="#1565c0" opacity=".18"/>
    <circle cx="130" cy="258" r="4" fill="#1565c0" opacity=".15"/>
    <circle cx="190" cy="255" r="4" fill="#1565c0" opacity=".15"/>

    <!-- Two large eyes -->
    <circle cx="135" cy="265" r="24" fill="white" stroke="#080810" stroke-width="3.5"/>
    <circle cx="135" cy="265" r="16" fill="url(#krk-eye)"/>
    <circle cx="135" cy="265" r="10" fill="#080810"/>
    <circle cx="130" cy="258" r="4.5" fill="white" opacity=".9"/>
    <!-- Pupil slit (cuttlefish-style) -->
    <rect x="132" y="257" width="6" height="16" rx="3" fill="#080810" opacity=".6"/>

    <circle cx="185" cy="265" r="24" fill="white" stroke="#080810" stroke-width="3.5"/>
    <circle cx="185" cy="265" r="16" fill="url(#krk-eye)"/>
    <circle cx="185" cy="265" r="10" fill="#080810"/>
    <circle cx="180" cy="258" r="4.5" fill="white" opacity=".9"/>
    <rect x="182" y="257" width="6" height="16" rx="3" fill="#080810" opacity=".6"/>

    <!-- Beak (small, centre bottom of mantle) -->
    <path d="M152,308 L160,318 L168,308 L160,313Z"
      fill="#080810" stroke="#080810" stroke-width="1.5" stroke-linejoin="round" opacity=".75"/>

    <!-- Bioluminescent dots -->
    <circle cx="106" cy="225" r="4" fill="#42a5f5" opacity=".6" filter="url(#krk-glow)"/>
    <circle cx="214" cy="228" r="3.5" fill="#42a5f5" opacity=".55" filter="url(#krk-glow)"/>
    <circle cx="100" cy="272" r="3" fill="#90caf9" opacity=".5" filter="url(#krk-glow)"/>
    <circle cx="220" cy="275" r="3.5" fill="#90caf9" opacity=".5" filter="url(#krk-glow)"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="phx-body" cx="35%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#ffcc80"/>
      <stop offset="100%" stop-color="#e65100"/>
    </radialGradient>
    <radialGradient id="phx-wing" cx="40%" cy="25%" r="68%">
      <stop offset="0%" stop-color="#ffb74d"/>
      <stop offset="100%" stop-color="#bf360c"/>
    </radialGradient>
    <radialGradient id="phx-flame1" cx="30%" cy="20%" r="80%">
      <stop offset="0%" stop-color="#fff176"/>
      <stop offset="50%" stop-color="#ffb300"/>
      <stop offset="100%" stop-color="#e65100"/>
    </radialGradient>
    <radialGradient id="phx-flame2" cx="30%" cy="20%" r="80%">
      <stop offset="0%" stop-color="#ff8a65"/>
      <stop offset="60%" stop-color="#e53935"/>
      <stop offset="100%" stop-color="#880e4f"/>
    </radialGradient>
    <radialGradient id="phx-eye" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#fff9c4"/>
      <stop offset="100%" stop-color="#ffd600"/>
    </radialGradient>
    <radialGradient id="phx-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e65100" stop-opacity=".45"/>
      <stop offset="100%" stop-color="#e65100" stop-opacity="0"/>
    </radialGradient>
    <filter id="phx-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse cx="160" cy="367" rx="58" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura ember-g" cx="160" cy="238" rx="108" ry="100" fill="url(#phx-aura)"/>

  <g class="phoenix-rise">

    <!-- Tail feathers (fan behind body) -->
    <!-- Outer left -->
    <path d="M138,272 C116,257 88,237 70,196 C80,212 88,232 86,252 C94,240 106,257 120,272Z"
      fill="url(#phx-flame2)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Mid-left -->
    <path d="M143,276 C126,257 113,230 116,196 C118,216 118,242 126,265Z"
      fill="url(#phx-flame1)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Center (tallest) -->
    <path d="M154,280 C147,257 147,227 154,192 C161,227 161,257 163,280Z"
      fill="url(#phx-flame1)" stroke="#080810" stroke-width="2.8" stroke-linejoin="round"/>
    <!-- Mid-right -->
    <path d="M177,276 C194,257 207,230 204,196 C202,216 202,242 194,265Z"
      fill="url(#phx-flame1)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Outer right -->
    <path d="M182,272 C204,257 232,237 250,196 C240,212 232,232 234,252 C226,240 214,257 200,272Z"
      fill="url(#phx-flame2)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- Tail eyespots -->
    <ellipse cx="79" cy="250" rx="8" ry="12" fill="#fff176" stroke="#080810" stroke-width="1.5" opacity=".75"/>
    <ellipse cx="79" cy="250" rx="4" ry="6" fill="#e65100" opacity=".85"/>
    <ellipse cx="234" cy="250" rx="8" ry="12" fill="#fff176" stroke="#080810" stroke-width="1.5" opacity=".75"/>
    <ellipse cx="234" cy="250" rx="4" ry="6" fill="#e65100" opacity=".85"/>

    <!-- Flame tips on tail (glowing) -->
    <ellipse cx="154" cy="194" rx="10" ry="16" fill="#fff176" opacity=".85" filter="url(#phx-glow)" class="ember-g"/>
    <ellipse cx="117" cy="200" rx="8" ry="12" fill="#ffb300" opacity=".65" filter="url(#phx-glow)" class="ember-g"/>
    <ellipse cx="203" cy="200" rx="8" ry="12" fill="#ffb300" opacity=".65" filter="url(#phx-glow)" class="ember-g"/>

    <!-- Wings (swept back) -->
    <path d="M126,248 C103,230 88,216 83,198 C94,212 106,225 118,238 C106,225 104,210 108,198 C114,213 122,230 130,244Z"
      fill="url(#phx-wing)" stroke="#080810" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M194,248 C217,230 232,216 237,198 C226,212 214,225 202,238 C214,225 216,210 212,198 C206,213 198,230 190,244Z"
      fill="url(#phx-wing)" stroke="#080810" stroke-width="2.8" stroke-linejoin="round"/>
    <!-- Wing quills -->
    <path d="M102,214 C110,220 118,228 126,238" stroke="#080810" stroke-width="1.2" fill="none" opacity=".3"/>
    <path d="M218,214 C210,220 202,228 194,238" stroke="#080810" stroke-width="1.2" fill="none" opacity=".3"/>

    <!-- Body -->
    <ellipse cx="160" cy="272" rx="66" ry="62" fill="url(#phx-body)" stroke="#080810" stroke-width="4"/>
    <!-- Breast feather texture -->
    <path d="M128,267 C138,260 152,258 160,262 C168,258 182,260 192,267" stroke="#080810" stroke-width="1.5" fill="none" opacity=".2"/>
    <path d="M124,284 C135,276 152,274 160,278 C168,274 185,276 196,284" stroke="#080810" stroke-width="1.2" fill="none" opacity=".18"/>
    <path d="M127,300 C138,293 153,291 160,295 C167,291 182,293 193,300" stroke="#080810" stroke-width="1" fill="none" opacity=".15"/>

    <!-- Talons -->
    <path d="M130,328 C124,340 120,347 116,352" stroke="#bf360c" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M116,352 L106,362" stroke="#bf360c" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M116,352 L116,364" stroke="#bf360c" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M116,352 L126,360" stroke="#bf360c" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M190,328 C196,340 200,347 204,352" stroke="#bf360c" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M204,352 L194,362" stroke="#bf360c" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M204,352 L204,364" stroke="#bf360c" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M204,352 L214,360" stroke="#bf360c" stroke-width="3.5" stroke-linecap="round" fill="none"/>

    <!-- Head -->
    <circle cx="160" cy="215" r="50" fill="url(#phx-body)" stroke="#080810" stroke-width="4"/>

    <!-- Flame crest -->
    <path d="M160,168 C154,148 150,128 158,108 C164,128 168,148 160,168Z"
      fill="url(#phx-flame1)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M147,173 C137,152 131,130 138,111 C143,130 147,153 149,173Z"
      fill="url(#phx-flame2)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M173,173 C183,152 189,130 182,111 C177,130 173,153 171,173Z"
      fill="url(#phx-flame2)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M135,179 C127,162 123,144 130,130 C134,145 138,163 138,179Z"
      fill="#ffb300" stroke="#080810" stroke-width="1.8" stroke-linejoin="round" opacity=".8"/>
    <path d="M185,179 C193,162 197,144 190,130 C186,145 182,163 182,179Z"
      fill="#ffb300" stroke="#080810" stroke-width="1.8" stroke-linejoin="round" opacity=".8"/>
    <!-- Crest glow -->
    <ellipse cx="160" cy="136" rx="18" ry="30" fill="#fff176" opacity=".5" filter="url(#phx-glow)" class="ember-g"/>

    <!-- Beak -->
    <path d="M148,220 L160,230 L172,220 L160,225Z"
      fill="#ffd600" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- Eyes -->
    <ellipse cx="140" cy="211" rx="14" ry="13" fill="url(#phx-eye)" stroke="#080810" stroke-width="3" class="eye-pulse"/>
    <ellipse cx="140" cy="212" rx="7" ry="6" fill="#080810"/>
    <circle cx="143" cy="208" r="3" fill="white" opacity=".85"/>
    <path d="M130,203 C132,199 138,199 140,203" stroke="#e65100" stroke-width="1.5" fill="none" opacity=".5"/>

    <ellipse cx="180" cy="211" rx="14" ry="13" fill="url(#phx-eye)" stroke="#080810" stroke-width="3" class="eye-pulse"/>
    <ellipse cx="180" cy="212" rx="7" ry="6" fill="#080810"/>
    <circle cx="183" cy="208" r="3" fill="white" opacity=".85"/>
    <path d="M170,203 C172,199 178,199 180,203" stroke="#e65100" stroke-width="1.5" fill="none" opacity=".5"/>

    <!-- Floating embers -->
    <circle cx="93" cy="198" r="4" fill="#ffb300" opacity=".7" filter="url(#phx-glow)" class="ember-g"/>
    <circle cx="227" cy="203" r="3.5" fill="#ff8a65" opacity=".6" filter="url(#phx-glow)" class="ember-g"/>
    <circle cx="86" cy="242" r="3" fill="#ffcc80" opacity=".55" filter="url(#phx-glow)"/>
    <circle cx="234" cy="250" r="4" fill="#ffcc80" opacity=".6" filter="url(#phx-glow)"/>
    <circle cx="143" cy="178" r="2.5" fill="#fff176" opacity=".7" filter="url(#phx-glow)" class="ember-g"/>
    <circle cx="177" cy="180" r="2.5" fill="#fff176" opacity=".65" filter="url(#phx-glow)" class="ember-g"/>

  </g>
</svg>`
  }

};

// ── RARITY ROLL ──────────────────────────────────────────────────────────────

const RARITY_WEIGHTS = [
  { rarity: 'common',    weight: 65, pool: ['shiro','tanuki','kappa','kodama','capybara','armadillo','llama','hedgehog','hare','wisp','meerkat','mongoose','coati','tapir','pangolin','warthog','sprite','imp','fairy'] },
  { rarity: 'rare',      weight: 28, pool: ['karasu','koi','oni','baku','axolotl','quetzal','condor','jaguar','stag','gryphon','selkie','anaconda','hyena','okapi','golem','djinn','basilisk','chimera','kraken'] },
  { rarity: 'legendary', weight: 7,  pool: ['kyubi','raijin_wolf','chupacabra','unicorn','wyvern','phoenix'] }
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

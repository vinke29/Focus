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
      <image href="/chars/shiro.png" x="40" y="30" width="240" height="320"/>
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
      <image href="/chars/karasu.png" x="40" y="30" width="240" height="320"/>
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
      <image href="/chars/kyubi.png" x="40" y="30" width="240" height="320"/>
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
      <image href="/chars/tanuki.png" x="40" y="30" width="240" height="320"/>
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
      <image href="/chars/koi.png" x="40" y="30" width="240" height="320"/>
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
      <image href="/chars/kappa.png" x="40" y="30" width="240" height="320"/>
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
      <image href="/chars/kodama.png" x="40" y="30" width="240" height="320"/>
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
      <image href="/chars/oni.png" x="40" y="30" width="240" height="320"/>
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
      <image href="/chars/baku.png" x="40" y="30" width="240" height="320"/>
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
      <image href="/chars/raijin_wolf.png" x="40" y="30" width="240" height="320"/>
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="capy-body" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#f0e4cc"/>
      <stop offset="100%" stop-color="#d4c4a0"/>
    </radialGradient>
    <radialGradient id="capy-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#C4924A" stop-opacity=".2"/>
      <stop offset="100%" stop-color="#C4924A" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="360" rx="72" ry="9" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="265" rx="94" ry="72" fill="url(#capy-aura)"/>

  <g class="char-float">
    <g class="char-body">

      <!-- Tail (tiny) -->
      <ellipse cx="232" cy="285" rx="10" ry="8" fill="url(#capy-body)" stroke="#080810" stroke-width="2.5"/>

      <!-- Main body (large barrel shape) -->
      <path d="M80,230 C80,185 112,158 160,158 C208,158 240,185 240,230 C240,278 215,308 160,308 C105,308 80,278 80,230Z"
        fill="url(#capy-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

      <!-- Fur texture lines -->
      <path d="M100,240 C108,228 118,224 128,228" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".18"/>
      <path d="M98,260 C108,248 120,244 132,248" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".14"/>
      <path d="M220,240 C212,228 202,224 192,228" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".18"/>

      <!-- Legs (short, stubby) -->
      <path d="M108,300 L100,345 C96,350 90,350 88,345 C94,340 98,332 100,322Z"
        fill="url(#capy-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M140,308 L134,348 C130,353 124,353 122,348 C128,343 132,335 134,325Z"
        fill="url(#capy-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M180,308 L186,348 C190,353 196,353 198,348 C192,343 188,335 186,325Z"
        fill="url(#capy-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M212,300 L220,345 C224,350 230,350 232,345 C226,340 222,332 220,322Z"
        fill="url(#capy-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    </g>

    <!-- Head (large, rectangular) -->
    <path d="M105,195 C105,165 128,148 160,148 C192,148 215,165 215,195 C215,225 200,248 160,248 C120,248 105,225 105,195Z"
      fill="url(#capy-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

    <!-- Nostrils (on top of muzzle) -->
    <ellipse cx="148" cy="208" rx="8" ry="6" fill="#C4924A" opacity=".5" stroke="#080810" stroke-width="1.5"/>
    <ellipse cx="172" cy="208" rx="8" ry="6" fill="#C4924A" opacity=".5" stroke="#080810" stroke-width="1.5"/>

    <!-- Small ears -->
    <ellipse cx="112" cy="156" rx="14" ry="12" fill="url(#capy-body)" stroke="#080810" stroke-width="3"/>
    <ellipse cx="112" cy="156" rx="8" ry="7" fill="#C4924A" opacity=".5"/>
    <ellipse cx="208" cy="156" rx="14" ry="12" fill="url(#capy-body)" stroke="#080810" stroke-width="3"/>
    <ellipse cx="208" cy="156" rx="8" ry="7" fill="#C4924A" opacity=".5"/>

    <!-- Eyes (calm, half-lidded) -->
    <ellipse cx="130" cy="182" rx="16" ry="14" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="130" cy="184" r="9" fill="#080810"/>
    <circle cx="133" cy="180" r="3" fill="white" opacity=".9"/>
    <!-- Heavy calm eyelid -->
    <path d="M114,179 C120,174 140,174 146,179" stroke="#080810" stroke-width="3" fill="none" stroke-linecap="round"/>

    <ellipse cx="190" cy="182" rx="16" ry="14" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="190" cy="184" r="9" fill="#080810"/>
    <circle cx="193" cy="180" r="3" fill="white" opacity=".9"/>
    <path d="M174,179 C180,174 200,174 206,179" stroke="#080810" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- Content mouth -->
    <path d="M144,220 C152,226 168,226 176,220" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="axo-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#fff0f5"/>
      <stop offset="100%" stop-color="#f0d8e8"/>
    </radialGradient>
    <radialGradient id="axo-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF69B4" stop-opacity=".28"/>
      <stop offset="100%" stop-color="#FF69B4" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="358" rx="65" ry="8" fill="rgba(0,0,0,.09)"/>
  <ellipse class="char-aura" cx="160" cy="248" rx="90" ry="78" fill="url(#axo-aura)"/>

  <g class="koi-swim">

    <!-- Tail fin -->
    <path d="M160,320 C140,342 118,358 108,348 C122,330 138,308 148,298 M160,320 C180,342 202,358 212,348 C198,330 182,308 172,298Z"
      fill="#FF69B4" stroke="#080810" stroke-width="2.5" stroke-linejoin="round" opacity=".8"/>

    <!-- Body -->
    <path d="M160,118 C198,118 226,152 226,220 C226,280 198,325 160,325 C122,325 94,280 94,220 C94,152 122,118 160,118Z"
      fill="url(#axo-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

    <!-- Belly (lighter) -->
    <ellipse cx="160" cy="228" rx="44" ry="72" fill="white" stroke="#080810" stroke-width="1.5" opacity=".4"/>

    <!-- Stubby legs -->
    <path d="M108,238 C90,240 76,252 78,268 C88,258 100,250 108,250Z"
      fill="url(#axo-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M108,278 C90,285 78,298 82,312 C92,302 102,290 108,282Z"
      fill="url(#axo-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M212,238 C230,240 244,252 242,268 C232,258 220,250 212,250Z"
      fill="url(#axo-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M212,278 C230,285 242,298 238,312 C228,302 218,290 212,282Z"
      fill="url(#axo-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- Gill stalks Left (3) -->
    <g class="gill-l">
      <path d="M118,148 C102,132 96,112 104,98 C108,112 110,132 118,148Z" fill="#FF69B4" stroke="#080810" stroke-width="2" opacity=".85"/>
      <path d="M126,138 C108,125 102,104 110,90 C115,104 118,124 126,138Z" fill="#FF69B4" stroke="#080810" stroke-width="2" opacity=".75"/>
      <path d="M134,132 C120,118 116,98 124,84 C128,98 132,118 134,132Z" fill="#FF69B4" stroke="#080810" stroke-width="1.8" opacity=".65"/>
    </g>
    <!-- Gill stalks Right (3) -->
    <g class="gill-r">
      <path d="M202,148 C218,132 224,112 216,98 C212,112 210,132 202,148Z" fill="#FF69B4" stroke="#080810" stroke-width="2" opacity=".85"/>
      <path d="M194,138 C212,125 218,104 210,90 C205,104 202,124 194,138Z" fill="#FF69B4" stroke="#080810" stroke-width="2" opacity=".75"/>
      <path d="M186,132 C200,118 204,98 196,84 C192,98 188,118 186,132Z" fill="#FF69B4" stroke="#080810" stroke-width="1.8" opacity=".65"/>
    </g>

    <!-- Head -->
    <ellipse cx="160" cy="162" rx="52" ry="48" fill="url(#axo-body)" stroke="#080810" stroke-width="3.5"/>

    <!-- Eyes (wide, cute) -->
    <circle cx="134" cy="155" r="14" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="134" cy="155" r="8"  fill="#080810"/>
    <circle cx="138" cy="151" r="3"  fill="white" opacity=".9"/>
    <circle cx="130" cy="160" r="1.5" fill="white" opacity=".5"/>

    <circle cx="186" cy="155" r="14" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="186" cy="155" r="8"  fill="#080810"/>
    <circle cx="190" cy="151" r="3"  fill="white" opacity=".9"/>
    <circle cx="182" cy="160" r="1.5" fill="white" opacity=".5"/>

    <!-- Perma-smile -->
    <path d="M140,178 C148,186 172,186 180,178" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Cheek blush spots -->
    <ellipse cx="118" cy="172" rx="10" ry="7" fill="#FF69B4" opacity=".35"/>
    <ellipse cx="202" cy="172" rx="10" ry="7" fill="#FF69B4" opacity=".35"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="qtz-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#e8f5e8"/>
      <stop offset="100%" stop-color="#c0dcc0"/>
    </radialGradient>
    <radialGradient id="qtz-breast" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#f0ece0"/>
    </radialGradient>
    <radialGradient id="qtz-red" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#e84040"/>
      <stop offset="100%" stop-color="#a82020"/>
    </radialGradient>
    <radialGradient id="qtz-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00A854" stop-opacity=".25"/>
      <stop offset="100%" stop-color="#00A854" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="365" rx="38" ry="6" fill="rgba(0,0,0,.08)"/>
  <ellipse class="char-aura" cx="160" cy="220" rx="82" ry="110" fill="url(#qtz-aura)"/>

  <g class="char-float">

    <!-- Long tail plumes (fanning behind, trailing low) -->
    <path d="M148,260 C130,300 106,340 82,364 C96,372 112,369 118,360 C136,336 153,300 154,276Z"
      fill="#00A854" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M160,264 C155,308 148,354 144,374 C155,379 170,379 174,374 C170,354 165,308 160,264Z"
      fill="#00A854" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M172,260 C190,300 214,340 238,364 C224,372 208,369 202,360 C184,336 167,300 166,276Z"
      fill="#00A854" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Plume tips highlight -->
    <path d="M84,364 C90,374 106,376 116,370" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M236,364 C230,374 214,376 204,370" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>

    <!-- Wings (large, spread) -->
    <g class="wing-soar">
      <path d="M105,182 C80,164 46,150 22,160 C36,170 58,174 76,178 C54,196 42,220 54,238 C68,220 88,200 105,193Z"
        fill="url(#qtz-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <!-- Wing feather lines left -->
      <path d="M76,178 C62,196 56,220 62,238" stroke="#080810" stroke-width="1.5" fill="none" opacity=".3"/>
      <path d="M52,164 C44,182 44,210 54,228" stroke="#080810" stroke-width="1.2" fill="none" opacity=".25"/>
      <path d="M215,182 C240,164 274,150 298,160 C284,170 262,174 244,178 C266,196 278,220 266,238 C252,220 232,200 215,193Z"
        fill="url(#qtz-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <!-- Wing feather lines right -->
      <path d="M244,178 C258,196 264,220 258,238" stroke="#080810" stroke-width="1.5" fill="none" opacity=".3"/>
      <path d="M268,164 C276,182 276,210 266,228" stroke="#080810" stroke-width="1.2" fill="none" opacity=".25"/>
    </g>

    <!-- Body -->
    <path d="M160,148 C130,148 108,168 108,202 C108,236 128,262 160,262 C192,262 212,236 212,202 C212,168 190,148 160,148Z"
      fill="url(#qtz-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

    <!-- Scarlet breast (resplendent quetzal signature) -->
    <ellipse cx="160" cy="212" rx="35" ry="44" fill="url(#qtz-red)" stroke="#080810" stroke-width="2"/>

    <!-- Crest (5 spikes) -->
    <path d="M140,114 C132,90 136,68 144,56 C148,74 148,96 144,114Z" fill="#00A854" stroke="#080810" stroke-width="2" opacity=".85"/>
    <path d="M152,110 C146,84 150,60 155,48 C159,66 159,90 155,110Z" fill="#00A854" stroke="#080810" stroke-width="2.5"/>
    <path d="M160,108 C158,80 162,56 165,44 C168,58 168,82 164,108Z" fill="#00A854" stroke="#080810" stroke-width="2.5"/>
    <path d="M168,110 C174,84 170,60 165,48 C169,66 173,90 169,110Z" fill="#00A854" stroke="#080810" stroke-width="2.5"/>
    <path d="M180,114 C188,90 184,68 176,56 C172,74 172,96 176,114Z" fill="#00A854" stroke="#080810" stroke-width="2" opacity=".85"/>

    <!-- Head -->
    <circle cx="160" cy="136" r="42" fill="url(#qtz-body)" stroke="#080810" stroke-width="4"/>

    <!-- Eyes -->
    <circle cx="140" cy="130" r="11" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="140" cy="130" r="6.5" fill="#080810"/>
    <circle cx="143" cy="127" r="2.5" fill="white" opacity=".9"/>

    <circle cx="180" cy="130" r="11" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="180" cy="130" r="6.5" fill="#080810"/>
    <circle cx="183" cy="127" r="2.5" fill="white" opacity=".9"/>

    <!-- Beak (small, hooked) -->
    <path d="M148,146 C152,152 168,152 172,146 L170,160 C164,165 156,165 150,160Z"
      fill="#080810" stroke="#080810" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M148,148 C154,154 166,154 172,148" stroke="#f7f2e8" stroke-width=".8" fill="none" opacity=".2"/>

    <!-- Feet -->
    <path d="M140,262 L132,290 L122,296 L118,290 L128,288 L130,262Z" fill="url(#qtz-body)" stroke="#080810" stroke-width="2"/>
    <path d="M180,262 L188,290 L198,296 L202,290 L192,288 L190,262Z" fill="url(#qtz-body)" stroke="#080810" stroke-width="2"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="cond-body" cx="35%" cy="28%" r="70%">
      <stop offset="0%" stop-color="#1c1c28"/>
      <stop offset="100%" stop-color="#080810"/>
    </radialGradient>
    <radialGradient id="cond-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#C62828" stop-opacity=".2"/>
      <stop offset="100%" stop-color="#C62828" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="365" rx="50" ry="7" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="230" rx="105" ry="85" fill="url(#cond-aura)"/>

  <g class="char-float">

    <!-- Left wing (spread wide) -->
    <g class="wing-soar">
      <path d="M115,195 C85,178 50,175 30,190 C40,185 55,183 68,190 C48,205 38,225 50,238 C60,220 75,205 90,200 C72,220 68,242 80,252 C88,232 100,214 115,205Z"
        fill="url(#cond-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Wing feather lines -->
      <path d="M60,192 C72,200 84,205 94,202" stroke="#2a2a3a" stroke-width="1.2" fill="none" opacity=".4"/>
      <path d="M50,212 C65,218 80,220 92,216" stroke="#2a2a3a" stroke-width="1" fill="none" opacity=".3"/>
    </g>

    <!-- Right wing (spread wide) -->
    <g class="wing-soar" style="animation-delay:-.5s">
      <path d="M205,195 C235,178 270,175 290,190 C280,185 265,183 252,190 C272,205 282,225 270,238 C260,220 245,205 230,200 C248,220 252,242 240,252 C232,232 220,214 205,205Z"
        fill="url(#cond-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M260,192 C248,200 236,205 226,202" stroke="#2a2a3a" stroke-width="1.2" fill="none" opacity=".4"/>
      <path d="M270,212 C255,218 240,220 228,216" stroke="#2a2a3a" stroke-width="1" fill="none" opacity=".3"/>
    </g>

    <!-- Body -->
    <ellipse cx="160" cy="235" rx="52" ry="64" fill="url(#cond-body)" stroke="#080810" stroke-width="4"/>

    <!-- White neck ruff -->
    <path d="M132,182 C136,168 148,160 160,160 C172,160 184,168 188,182 C180,175 170,172 160,172 C150,172 140,175 132,182Z"
      fill="#f7f2e8" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M134,183 C140,176 152,172 160,172 C168,172 180,176 186,183" stroke="#080810" stroke-width="1" fill="none" opacity=".3"/>

    <!-- Bare red head -->
    <circle cx="160" cy="148" r="36" fill="#C62828" stroke="#080810" stroke-width="3.5"/>
    <!-- Head texture/wrinkles -->
    <path d="M136,140 C140,132 152,128 160,128" stroke="#080810" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".35"/>
    <path d="M132,152 C136,144 146,140 155,140" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".25"/>

    <!-- Eyes -->
    <circle cx="144" cy="144" r="11" fill="#1c1c28" stroke="#080810" stroke-width="2.5"/>
    <circle cx="144" cy="144" r="6" fill="#080810"/>
    <circle cx="147" cy="141" r="2.5" fill="white" opacity=".9"/>

    <circle cx="176" cy="144" r="11" fill="#1c1c28" stroke="#080810" stroke-width="2.5"/>
    <circle cx="176" cy="144" r="6" fill="#080810"/>
    <circle cx="179" cy="141" r="2.5" fill="white" opacity=".9"/>

    <!-- Hooked beak -->
    <path d="M144,160 C150,168 170,168 176,160 L174,178 C168,186 152,186 146,178Z"
      fill="#f0e8c0" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M144,162 L176,162" stroke="#080810" stroke-width="1.5" opacity=".4"/>
    <!-- Hook at tip -->
    <path d="M146,178 C148,184 156,188 162,184" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Legs -->
    <path d="M142,295 L134,342 L122,348 L118,342 L130,338 L132,295Z" fill="url(#cond-body)" stroke="#080810" stroke-width="2.5"/>
    <path d="M178,295 L186,342 L198,348 L202,342 L190,338 L188,295Z" fill="url(#cond-body)" stroke="#080810" stroke-width="2.5"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="jag-body" cx="35%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#e8c870"/>
      <stop offset="100%" stop-color="#a87830"/>
    </radialGradient>
    <radialGradient id="jag-belly" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#e8d8b0"/>
    </radialGradient>
    <radialGradient id="jag-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3a8c2f" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#3a8c2f" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse class="char-aura" cx="160" cy="220" rx="115" ry="105" fill="url(#jag-aura)"/>
  <g class="char-float">
    <!-- Body -->
    <ellipse cx="165" cy="255" rx="72" ry="48" fill="url(#jag-body)" stroke="#080810" stroke-width="4"/>
    <!-- Belly -->
    <ellipse cx="158" cy="268" rx="42" ry="30" fill="url(#jag-belly)"/>
    <!-- Body spots (rosettes) -->
    <circle cx="138" cy="238" r="10" fill="none" stroke="#5a3010" stroke-width="3" opacity=".6"/>
    <circle cx="138" cy="238" r="4" fill="#5a3010" opacity=".4"/>
    <circle cx="178" cy="232" r="11" fill="none" stroke="#5a3010" stroke-width="3" opacity=".6"/>
    <circle cx="178" cy="232" r="4.5" fill="#5a3010" opacity=".4"/>
    <circle cx="210" cy="250" r="9" fill="none" stroke="#5a3010" stroke-width="3" opacity=".55"/>
    <circle cx="210" cy="250" r="3.5" fill="#5a3010" opacity=".35"/>
    <circle cx="124" cy="265" r="8" fill="none" stroke="#5a3010" stroke-width="2.5" opacity=".5"/>
    <!-- Tail (long, curling) -->
    <path d="M236,260 C258,245 278,230 285,210 C290,192 282,178 272,178 C262,178 256,188 258,198 C252,190 244,190 240,198 C236,208 242,225 236,260Z"
      fill="url(#jag-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <circle cx="275" cy="182" r="7" fill="none" stroke="#5a3010" stroke-width="2.5" opacity=".6"/>
    <!-- Neck -->
    <ellipse cx="128" cy="218" rx="32" ry="26" fill="url(#jag-body)" stroke="#080810" stroke-width="3.5"/>
    <!-- Head (big round cat head) -->
    <ellipse cx="115" cy="182" rx="52" ry="48" fill="url(#jag-body)" stroke="#080810" stroke-width="4"/>
    <!-- Ear spots -->
    <circle cx="98" cy="175" r="6" fill="#5a3010" opacity=".4"/>
    <circle cx="132" cy="170" r="6" fill="#5a3010" opacity=".4"/>
    <!-- Belly white patch on face -->
    <ellipse cx="112" cy="200" rx="28" ry="18" fill="url(#jag-belly)"/>
    <!-- Ears -->
    <path d="M76,152 L62,118 L104,142Z" fill="url(#jag-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M79,150 L67,122 L100,143Z" fill="#c8682a" opacity=".5"/>
    <path d="M148,148 L162,114 L172,143Z" fill="url(#jag-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M150,147 L162,118 L168,143Z" fill="#c8682a" opacity=".5"/>
    <!-- Eyes (green) -->
    <ellipse cx="96" cy="178" rx="13" ry="11" fill="white" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="96" cy="178" rx="8" ry="8" fill="#3a8c2f"/>
    <ellipse cx="96" cy="178" rx="3.5" ry="5" fill="#080810"/>
    <circle cx="99" cy="175" r="2.5" fill="white" opacity=".9"/>
    <ellipse cx="136" cy="175" rx="12" ry="10" fill="white" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="136" cy="175" rx="7.5" ry="7.5" fill="#3a8c2f"/>
    <ellipse cx="136" cy="175" rx="3" ry="4.5" fill="#080810"/>
    <circle cx="139" cy="172" r="2" fill="white" opacity=".9"/>
    <!-- Nose -->
    <ellipse cx="112" cy="196" rx="8" ry="5" fill="#c8682a" stroke="#080810" stroke-width="1.5"/>
    <!-- Mouth -->
    <path d="M104,202 Q112,208 120,202" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Whiskers -->
    <path d="M90,198 L60,194" stroke="#080810" stroke-width="1.5" stroke-linecap="round" opacity=".4"/>
    <path d="M90,202 L62,202" stroke="#080810" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
    <path d="M135,195 L162,190" stroke="#080810" stroke-width="1.5" stroke-linecap="round" opacity=".4"/>
    <path d="M135,200 L163,200" stroke="#080810" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
    <!-- Face spots -->
    <circle cx="80" cy="183" r="5" fill="#5a3010" opacity=".35"/>
    <circle cx="148" cy="180" r="4.5" fill="#5a3010" opacity=".35"/>
    <!-- Legs -->
    <rect x="95" y="292" width="24" height="55" rx="12" fill="url(#jag-body)" stroke="#080810" stroke-width="3.5"/>
    <rect x="132" y="295" width="24" height="52" rx="12" fill="url(#jag-body)" stroke="#080810" stroke-width="3.5"/>
    <rect x="172" y="292" width="24" height="55" rx="12" fill="url(#jag-body)" stroke="#080810" stroke-width="3.5"/>
    <rect x="207" y="294" width="22" height="52" rx="11" fill="url(#jag-body)" stroke="#080810" stroke-width="3.5"/>
    <!-- Paws -->
    <ellipse cx="107" cy="349" rx="15" ry="9" fill="url(#jag-body)" stroke="#080810" stroke-width="3"/>
    <ellipse cx="144" cy="348" rx="15" ry="9" fill="url(#jag-body)" stroke="#080810" stroke-width="3"/>
    <ellipse cx="184" cy="349" rx="15" ry="9" fill="url(#jag-body)" stroke="#080810" stroke-width="3"/>
    <ellipse cx="218" cy="347" rx="14" ry="8" fill="url(#jag-body)" stroke="#080810" stroke-width="3"/>
    <!-- Ground shadow -->
    <ellipse cx="168" cy="360" rx="80" ry="8" fill="rgba(0,0,0,.08)"/>
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="arma-shell" cx="35%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#d8c8a8"/>
      <stop offset="100%" stop-color="#b8a880"/>
    </radialGradient>
    <radialGradient id="arma-skin" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#f0e4cc"/>
      <stop offset="100%" stop-color="#d4c4a0"/>
    </radialGradient>
    <radialGradient id="arma-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7C5C3A" stop-opacity=".2"/>
      <stop offset="100%" stop-color="#7C5C3A" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="360" rx="66" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="250" rx="88" ry="72" fill="url(#arma-aura)"/>

  <g class="char-float">
    <g class="char-body">

      <!-- Tail (scaly) -->
      <path d="M218,275 C240,265 258,248 256,228 C248,232 238,242 228,252 C240,240 244,224 236,212 C226,222 218,242 218,258Z"
        fill="url(#arma-shell)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M228,240 L238,234" stroke="#080810" stroke-width="1.2" opacity=".35"/>
      <path d="M232,252 L244,244" stroke="#080810" stroke-width="1.2" opacity=".3"/>

      <!-- Main shell (domed) -->
      <path d="M80,238 C80,188 112,158 160,158 C208,158 240,188 240,238 C240,280 212,308 160,308 C108,308 80,280 80,238Z"
        fill="url(#arma-shell)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

      <!-- Shell bands (horizontal) -->
      <path d="M84,218 C104,212 136,208 160,208 C184,208 216,212 236,218" stroke="#080810" stroke-width="2" fill="none" opacity=".4"/>
      <path d="M82,238 C102,230 136,226 160,226 C184,226 218,230 238,238" stroke="#080810" stroke-width="2" fill="none" opacity=".4"/>
      <path d="M84,258 C104,252 136,248 160,248 C184,248 216,252 236,258" stroke="#080810" stroke-width="2" fill="none" opacity=".4"/>
      <path d="M90,276 C108,272 136,268 160,268 C184,268 212,272 230,276" stroke="#080810" stroke-width="1.8" fill="none" opacity=".35"/>
      <!-- Band accent color lines -->
      <path d="M84,228 C104,222 136,218 160,218 C184,218 216,222 236,228" stroke="#7C5C3A" stroke-width="1" fill="none" opacity=".3"/>
      <path d="M82,248 C102,240 136,236 160,236 C184,236 218,240 238,248" stroke="#7C5C3A" stroke-width="1" fill="none" opacity=".3"/>
      <path d="M86,268 C106,262 136,258 160,258 C184,258 214,262 234,268" stroke="#7C5C3A" stroke-width="1" fill="none" opacity=".25"/>

      <!-- Shell plate lines (vertical segments) -->
      <path d="M108,172 L102,300" stroke="#080810" stroke-width="1" opacity=".2"/>
      <path d="M130,162 L126,306" stroke="#080810" stroke-width="1" opacity=".18"/>
      <path d="M160,158 L160,308" stroke="#080810" stroke-width="1" opacity=".18"/>
      <path d="M190,162 L194,306" stroke="#080810" stroke-width="1" opacity=".18"/>
      <path d="M212,172 L218,300" stroke="#080810" stroke-width="1" opacity=".2"/>

      <!-- Legs (small, peeking out) -->
      <path d="M100,288 L88,330 C84,336 78,336 76,330 C82,325 86,318 88,310Z"
        fill="url(#arma-skin)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M220,288 L232,330 C236,336 242,336 244,330 C238,325 234,318 232,310Z"
        fill="url(#arma-skin)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    </g>

    <!-- Head shield + snout -->
    <path d="M116,180 C116,158 136,144 160,144 C184,144 204,158 204,180 C204,195 194,205 176,210 C168,195 152,195 144,210 C126,205 116,195 116,180Z"
      fill="url(#arma-shell)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Snout (pointed) -->
    <path d="M144,210 C148,225 154,235 160,238 C166,235 172,225 176,210Z"
      fill="url(#arma-skin)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <!-- Nostrils -->
    <circle cx="154" cy="230" r="3.5" fill="#080810" opacity=".5"/>
    <circle cx="166" cy="230" r="3.5" fill="#080810" opacity=".5"/>

    <!-- Eyes (small, beady) -->
    <circle cx="134" cy="175" r="10" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="134" cy="175" r="6" fill="#080810"/>
    <circle cx="137" cy="172" r="2" fill="white" opacity=".9"/>

    <circle cx="186" cy="175" r="10" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="186" cy="175" r="6" fill="#080810"/>
    <circle cx="189" cy="172" r="2" fill="white" opacity=".9"/>

    <!-- Small ears -->
    <path d="M120,160 L110,136 L135,155Z" fill="url(#arma-shell)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M200,160 L210,136 L185,155Z" fill="url(#arma-shell)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="llama-body" cx="35%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#d4c8a8"/>
    </radialGradient>
    <radialGradient id="llama-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e88c50" stop-opacity=".2"/>
      <stop offset="100%" stop-color="#e88c50" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse class="char-aura" cx="160" cy="230" rx="108" ry="105" fill="url(#llama-aura)"/>
  <g class="char-float">
    <!-- Fluffy rectangular body -->
    <rect x="88" y="225" width="148" height="110" rx="32" fill="url(#llama-body)" stroke="#080810" stroke-width="4"/>
    <!-- Fluffy texture bumps (wavy outline detail) -->
    <path d="M90,240 C100,233 115,233 125,240 C135,233 150,233 160,240 C170,233 185,233 195,240 C205,233 220,233 230,240" stroke="#080810" stroke-width="1.2" fill="none" opacity=".18"/>
    <path d="M90,255 C100,248 115,248 125,255 C135,248 150,248 160,255 C170,248 185,248 195,255 C205,248 218,248 228,255" stroke="#080810" stroke-width="1" fill="none" opacity=".14"/>
    <!-- Legs (sturdy, not stick-thin) -->
    <rect x="102" y="325" width="28" height="45" rx="12" fill="url(#llama-body)" stroke="#080810" stroke-width="3.5"/>
    <rect x="142" y="325" width="28" height="45" rx="12" fill="url(#llama-body)" stroke="#080810" stroke-width="3.5"/>
    <rect x="172" y="325" width="28" height="45" rx="12" fill="url(#llama-body)" stroke="#080810" stroke-width="3.5"/>
    <rect x="208" y="325" width="26" height="45" rx="12" fill="url(#llama-body)" stroke="#080810" stroke-width="3.5"/>
    <!-- Hooves (split) -->
    <path d="M100,368 L100,375 M116,368 L116,375" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M140,368 L140,375 M156,368 L156,375" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M170,368 L170,375 M186,368 L186,375" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M206,368 L206,375 M220,368 L220,375" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <!-- Long proud neck (key feature) -->
    <path d="M148,230 C148,195 150,162 152,140 C154,118 158,108 162,108 C166,108 170,118 172,140 C174,162 176,195 176,230Z"
      fill="url(#llama-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>
    <!-- Head (small oval on top of neck) -->
    <ellipse cx="162" cy="98" rx="32" ry="28" fill="url(#llama-body)" stroke="#080810" stroke-width="4"/>
    <!-- Banana ears (llama's signature long curved ears) -->
    <path d="M138,82 C130,68 128,48 132,36 C138,30 148,32 150,42 C152,52 148,68 144,80Z"
      fill="url(#llama-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M140,80 C133,68 132,52 135,40 C138,34 145,34 146,42 C148,52 145,66 141,78Z"
      fill="#e88c50" opacity=".45"/>
    <path d="M186,82 C194,68 196,48 192,36 C186,30 176,32 174,42 C172,52 176,68 180,80Z"
      fill="url(#llama-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M184,80 C191,68 192,52 189,40 C186,34 179,34 178,42 C176,52 179,66 183,78Z"
      fill="#e88c50" opacity=".45"/>
    <!-- Pompom topknot (fluffy tuft) -->
    <circle cx="148" cy="75" r="9" fill="url(#llama-body)" stroke="#080810" stroke-width="2.5"/>
    <circle cx="163" cy="68" r="10" fill="url(#llama-body)" stroke="#080810" stroke-width="2.5"/>
    <circle cx="178" cy="73" r="8" fill="url(#llama-body)" stroke="#080810" stroke-width="2.5"/>
    <!-- Eyes (long-lashed, serene) -->
    <ellipse cx="148" cy="96" rx="11" ry="9" fill="white" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="148" cy="97" rx="6" ry="6" fill="#4a3820"/>
    <circle cx="148" cy="97" r="3" fill="#080810"/>
    <circle cx="151" cy="94" r="2" fill="white" opacity=".9"/>
    <!-- Eyelashes -->
    <path d="M138,90 L135,85 M142,88 L140,83 M148,87 L148,82" stroke="#080810" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>
    <ellipse cx="176" cy="96" rx="10" ry="9" fill="white" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="176" cy="97" rx="6" ry="6" fill="#4a3820"/>
    <circle cx="176" cy="97" r="3" fill="#080810"/>
    <circle cx="179" cy="94" r="2" fill="white" opacity=".9"/>
    <path d="M167,90 L164,85 M172,88 L170,83 M177,87 L177,82" stroke="#080810" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>
    <!-- Muzzle (boxy, llama-ish) -->
    <rect x="148" y="105" width="28" height="18" rx="6" fill="#e8e0d0" stroke="#080810" stroke-width="2.5"/>
    <!-- Nostrils -->
    <ellipse cx="155" cy="116" rx="3.5" ry="2.5" fill="#080810" opacity=".5"/>
    <ellipse cx="167" cy="116" rx="3.5" ry="2.5" fill="#080810" opacity=".5"/>
    <!-- Ground shadow -->
    <ellipse cx="165" cy="373" rx="70" ry="7" fill="rgba(0,0,0,.08)"/>
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="chup-body" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#e8f0e0"/>
      <stop offset="100%" stop-color="#c8d0b8"/>
    </radialGradient>
    <radialGradient id="chup-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#76FF03" stop-opacity=".4"/>
      <stop offset="60%" stop-color="#76FF03" stop-opacity=".15"/>
      <stop offset="100%" stop-color="#76FF03" stop-opacity="0"/>
    </radialGradient>
    <filter id="chup-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse cx="160" cy="365" rx="52" ry="7" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="230" rx="96" ry="88" fill="url(#chup-aura)"/>

  <g class="char-float">

    <!-- Back spines -->
    <path d="M138,148 L126,108 L140,138Z" fill="url(#chup-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M150,138 L142,96 L156,132Z" fill="url(#chup-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M162,136 L158,92 L170,130Z" fill="url(#chup-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M174,140 L174,100 L184,136Z" fill="url(#chup-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M185,148 L188,110 L196,144Z" fill="url(#chup-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Spine glow tips -->
    <g filter="url(#chup-glow)">
      <circle cx="128" cy="108" r="4" fill="#76FF03" opacity=".9"/>
      <circle cx="143" cy="96"  r="4" fill="#76FF03" opacity=".9"/>
      <circle cx="159" cy="92"  r="4" fill="#76FF03" opacity=".9"/>
      <circle cx="175" cy="100" r="4" fill="#76FF03" opacity=".9"/>
      <circle cx="189" cy="110" r="3.5" fill="#76FF03" opacity=".85"/>
    </g>

    <!-- Body (hunched, reptilian) -->
    <g class="char-body">
      <path d="M160,280 C118,280 90,256 90,224 C90,194 108,168 130,158 L190,158 C212,168 230,194 230,224 C230,256 202,280 160,280Z"
        fill="url(#chup-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>
      <!-- Scale texture -->
      <path d="M108,218 C114,210 124,208 132,212" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".2"/>
      <path d="M104,240 C112,232 124,230 134,234" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".18"/>
      <path d="M212,218 C206,210 196,208 188,212" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".2"/>

      <!-- Clawed feet -->
      <path d="M118,274 L106,320 C98,325 90,322 90,315 C97,312 103,306 106,298Z"
        fill="url(#chup-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M94,315 L86,325 M100,316 L94,328 M108,314 L104,326" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M202,274 L214,320 C222,325 230,322 230,315 C223,312 217,306 214,298Z"
        fill="url(#chup-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M226,315 L234,325 M220,316 L226,328 M212,314 L216,326" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Arm claws -->
      <path d="M92,215 C74,210 62,220 64,236 C72,228 82,220 92,218Z"
        fill="url(#chup-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M66,232 L58,244 M72,236 L66,248 M80,238 L76,250" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M228,215 C246,210 258,220 256,236 C248,228 238,220 228,218Z"
        fill="url(#chup-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M254,232 L262,244 M248,236 L254,248 M240,238 L244,250" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Head (reptilian, low) -->
    <path d="M120,170 C120,148 138,136 160,136 C182,136 200,148 200,170 C200,192 184,205 160,205 C136,205 120,192 120,170Z"
      fill="url(#chup-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

    <!-- Glowing eyes (the signature) -->
    <g class="eye-pulse" filter="url(#chup-glow)">
      <ellipse cx="138" cy="164" rx="16" ry="14" fill="#76FF03"/>
      <ellipse cx="182" cy="164" rx="16" ry="14" fill="#76FF03"/>
    </g>
    <ellipse cx="138" cy="164" rx="16" ry="14" fill="white" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="138" cy="164" rx="10" ry="12" fill="#76FF03" opacity=".8"/>
    <path d="M138,152 C139,158 139,170 138,175 C137,170 137,158 138,152Z" fill="#080810"/>
    <circle cx="142" cy="158" r="3" fill="white" opacity=".9"/>

    <ellipse cx="182" cy="164" rx="16" ry="14" fill="white" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="182" cy="164" rx="10" ry="12" fill="#76FF03" opacity=".8"/>
    <path d="M182,152 C183,158 183,170 182,175 C181,170 181,158 182,152Z" fill="#080810"/>
    <circle cx="186" cy="158" r="3" fill="white" opacity=".9"/>

    <!-- Fanged mouth -->
    <path d="M136,192 C142,200 178,200 184,192 C178,188 170,186 162,187 L160,194 L158,187 C150,186 142,188 136,192Z"
      fill="#080810" opacity=".8"/>
    <path d="M146,192 L143,202" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M174,192 L177,202" stroke="white" stroke-width="2.5" stroke-linecap="round"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="coat-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#f5d8b0"/>
      <stop offset="100%" stop-color="#c07a35"/>
    </radialGradient>
    <radialGradient id="coat-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E8762A" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#E8762A" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="155" cy="364" rx="62" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="155" cy="258" rx="82" ry="90" fill="url(#coat-aura)"/>
  <g class="char-float">
    <g class="cat-tail" style="transform-origin:198px 300px">
      <path d="M198,300 C220,278 244,250 248,218 C252,188 238,168 222,164 C206,160 193,174 192,194 C191,214 200,235 205,252 C210,270 208,288 198,300Z"
        fill="url(#coat-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M220,172 C229,184 232,198 228,210" stroke="#080810" stroke-width="6.5" stroke-linecap="round" fill="none" opacity=".4"/>
      <path d="M208,198 C216,210 218,224 215,236" stroke="#080810" stroke-width="5.5" stroke-linecap="round" fill="none" opacity=".38"/>
      <path d="M200,226 C207,238 208,252 205,264" stroke="#080810" stroke-width="5" stroke-linecap="round" fill="none" opacity=".35"/>
    </g>
    <ellipse cx="152" cy="300" rx="60" ry="52" fill="url(#coat-body)" stroke="#080810" stroke-width="4"/>
    <ellipse cx="148" cy="308" rx="36" ry="40" fill="#fef2e4" stroke="#080810" stroke-width="1.8" opacity=".5"/>
    <ellipse cx="116" cy="348" rx="26" ry="14" fill="url(#coat-body)" stroke="#080810" stroke-width="3"/>
    <path d="M102,349 L96,362" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M114,353 L112,364" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M128,353 L130,364" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="186" cy="348" rx="26" ry="14" fill="url(#coat-body)" stroke="#080810" stroke-width="3"/>
    <path d="M200,349 L206,362" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M188,353 L190,364" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M174,353 L172,364" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M106,285 C93,290 84,302 86,318 C94,310 104,300 106,292Z"
      fill="url(#coat-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M196,285 C210,290 218,302 216,318 C208,310 198,300 196,292Z"
      fill="url(#coat-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
  </g>
  <g class="head-scan">
    <ellipse cx="148" cy="252" rx="26" ry="22" fill="url(#coat-body)" stroke="#080810" stroke-width="3"/>
    <circle cx="148" cy="218" r="38" fill="url(#coat-body)" stroke="#080810" stroke-width="4"/>
    <path d="M118,210 C124,202 140,198 152,200 C152,206 148,212 140,214 C132,216 122,214 118,210Z"
      fill="#080810" opacity=".3"/>
    <path d="M118,224 C106,228 92,225 84,216 C82,208 86,200 94,197 C106,193 120,202 124,214Z"
      fill="#c07a35" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="87" cy="212" rx="5" ry="4" fill="#080810" opacity=".65"/>
    <ellipse cx="134" cy="208" rx="12" ry="11" fill="white" stroke="#080810" stroke-width="2"/>
    <circle cx="134" cy="208" r="7" fill="#080810"/>
    <circle cx="137" cy="205" r="2.5" fill="white" opacity=".9"/>
    <ellipse cx="162" cy="208" rx="12" ry="11" fill="white" stroke="#080810" stroke-width="2"/>
    <circle cx="162" cy="208" r="7" fill="#080810"/>
    <circle cx="165" cy="205" r="2.5" fill="white" opacity=".9"/>
    <ellipse cx="122" cy="190" rx="14" ry="13" fill="url(#coat-body)" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="122" cy="190" rx="8" ry="7" fill="#E8762A" opacity=".42"/>
    <ellipse cx="174" cy="190" rx="14" ry="13" fill="url(#coat-body)" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="174" cy="190" rx="8" ry="7" fill="#E8762A" opacity=".42"/>
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="tapir-body" cx="38%" cy="32%" r="70%">
      <stop offset="0%" stop-color="#cfc2b0"/>
      <stop offset="100%" stop-color="#7a6856"/>
    </radialGradient>
    <radialGradient id="tapir-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7B6B5A" stop-opacity=".2"/>
      <stop offset="100%" stop-color="#7B6B5A" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="160" cy="364" rx="72" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="268" rx="92" ry="88" fill="url(#tapir-aura)"/>
  <g class="char-float">
    <ellipse cx="228" cy="285" rx="13" ry="9" fill="url(#tapir-body)" stroke="#080810" stroke-width="2"/>
    <ellipse cx="160" cy="300" rx="82" ry="68" fill="url(#tapir-body)" stroke="#080810" stroke-width="4.5"/>
    <ellipse cx="108" cy="358" rx="26" ry="14" fill="url(#tapir-body)" stroke="#080810" stroke-width="3.5"/>
    <path d="M90,358 L87,371" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M104,362 L102,373" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M122,362 L122,373" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="212" cy="358" rx="26" ry="14" fill="url(#tapir-body)" stroke="#080810" stroke-width="3.5"/>
    <path d="M230,358 L233,371" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M216,362 L218,373" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M198,362 L198,373" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
  </g>
  <g class="char-body">
    <ellipse cx="160" cy="240" rx="42" ry="30" fill="url(#tapir-body)" stroke="#080810" stroke-width="4"/>
    <ellipse cx="160" cy="200" rx="52" ry="44" fill="url(#tapir-body)" stroke="#080810" stroke-width="4.5"/>
    <g class="trunk-sway" style="transform-origin:160px 215px">
      <path d="M140,220 C138,236 142,252 152,262 C158,268 164,268 170,262 C178,252 180,236 178,220Z"
        fill="url(#tapir-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="153" cy="260" rx="5" ry="4" fill="#080810" opacity=".65"/>
      <ellipse cx="167" cy="260" rx="5" ry="4" fill="#080810" opacity=".65"/>
    </g>
    <ellipse cx="128" cy="192" rx="15" ry="14" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="128" cy="192" r="8.5" fill="#080810"/>
    <circle cx="131" cy="189" r="3" fill="white" opacity=".9"/>
    <ellipse cx="192" cy="192" rx="15" ry="14" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="192" cy="192" r="8.5" fill="#080810"/>
    <circle cx="195" cy="189" r="3" fill="white" opacity=".9"/>
    <ellipse cx="118" cy="166" rx="20" ry="17" fill="url(#tapir-body)" stroke="#080810" stroke-width="3"/>
    <ellipse cx="118" cy="166" rx="12" ry="10" fill="#7B6B5A" opacity=".4"/>
    <ellipse cx="202" cy="166" rx="20" ry="17" fill="url(#tapir-body)" stroke="#080810" stroke-width="3"/>
    <ellipse cx="202" cy="166" rx="12" ry="10" fill="#7B6B5A" opacity=".4"/>
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="anac-body" cx="40%" cy="30%" r="68%">
      <stop offset="0%" stop-color="#a8c880"/>
      <stop offset="100%" stop-color="#2a5a28"/>
    </radialGradient>
    <radialGradient id="anac-belly" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#e8d8b0"/>
      <stop offset="100%" stop-color="#c0b080"/>
    </radialGradient>
    <radialGradient id="anac-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2E7D32" stop-opacity=".25"/>
      <stop offset="100%" stop-color="#2E7D32" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="160" cy="364" rx="78" ry="9" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="295" rx="95" ry="72" fill="url(#anac-aura)"/>
  <g class="anac-coil">
    <ellipse cx="160" cy="324" rx="88" ry="40" fill="url(#anac-body)" stroke="#080810" stroke-width="5"/>
    <path d="M80,310 C100,300 130,296 160,296 C190,296 220,300 240,310" stroke="#080810" stroke-width="1.8" fill="none" opacity=".18"/>
    <path d="M75,322 C98,312 130,308 160,308 C190,308 222,312 245,322" stroke="#080810" stroke-width="1.8" fill="none" opacity=".16"/>
    <ellipse cx="168" cy="314" rx="58" ry="28" fill="url(#anac-body)" stroke="#080810" stroke-width="4.5"/>
    <ellipse cx="168" cy="318" rx="40" ry="20" fill="url(#anac-belly)" stroke="#080810" stroke-width="2" opacity=".6"/>
  </g>
  <g class="char-float">
    <path d="M148,282 C144,254 148,228 156,208 C162,190 170,186 178,195 C186,206 186,230 182,260 C178,280 172,290 162,290Z"
      fill="url(#anac-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>
    <path d="M156,282 C154,254 156,228 160,210 C164,194 170,193 170,202 C172,218 172,244 168,268 C166,280 162,288 158,288Z"
      fill="url(#anac-belly)" opacity=".55"/>
    <path d="M136,182 C138,158 150,142 164,138 C180,134 196,142 202,160 C208,178 198,196 180,198 C166,200 146,196 136,182Z"
      fill="url(#anac-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>
    <ellipse cx="148" cy="168" rx="12" ry="11" fill="white" stroke="#080810" stroke-width="2"/>
    <ellipse cx="148" cy="168" rx="8" ry="10" fill="#d4a800"/>
    <path d="M148,158 C149,163 149,173 148,178 C147,173 147,163 148,158Z" fill="#080810"/>
    <circle cx="151" cy="163" r="2.5" fill="white" opacity=".8"/>
    <ellipse cx="192" cy="168" rx="12" ry="11" fill="white" stroke="#080810" stroke-width="2"/>
    <ellipse cx="192" cy="168" rx="8" ry="10" fill="#d4a800"/>
    <path d="M192,158 C193,163 193,173 192,178 C191,173 191,163 192,158Z" fill="#080810"/>
    <circle cx="195" cy="163" r="2.5" fill="white" opacity=".8"/>
    <ellipse cx="140" cy="178" rx="5" ry="3" fill="#080810" opacity=".35"/>
    <ellipse cx="199" cy="178" rx="5" ry="3" fill="#080810" opacity=".35"/>
    <g class="tongue-fork">
      <path d="M168,198 L168,214" stroke="#c0392b" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M168,214 L160,224 M168,214 L176,224" stroke="#c0392b" stroke-width="2" stroke-linecap="round"/>
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="hog-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#e5e0d5"/>
    </radialGradient>
    <radialGradient id="hog-spine" cx="40%" cy="30%" r="68%">
      <stop offset="0%" stop-color="#c8a870"/>
      <stop offset="100%" stop-color="#8a6040"/>
    </radialGradient>
    <radialGradient id="hog-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#6D4C41" stop-opacity=".2"/>
      <stop offset="100%" stop-color="#6D4C41" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="358" rx="60" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="270" rx="80" ry="62" fill="url(#hog-aura)"/>

  <g class="char-float">
    <g class="char-body">

      <!-- Spiny back dome -->
      <path d="M90,258 C90,210 118,178 160,178 C202,178 230,210 230,258 C230,295 205,318 160,318 C115,318 90,295 90,258Z"
        fill="url(#hog-spine)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>

      <!-- Spine lines radiating from back -->
      <path d="M120,185 L108,162" stroke="#080810" stroke-width="2" stroke-linecap="round" opacity=".6"/>
      <path d="M132,180 L124,156" stroke="#080810" stroke-width="2" stroke-linecap="round" opacity=".6"/>
      <path d="M144,178 L140,153" stroke="#080810" stroke-width="2" stroke-linecap="round" opacity=".65"/>
      <path d="M156,177 L155,152" stroke="#080810" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>
      <path d="M168,178 L172,153" stroke="#080810" stroke-width="2" stroke-linecap="round" opacity=".65"/>
      <path d="M180,180 L188,156" stroke="#080810" stroke-width="2" stroke-linecap="round" opacity=".6"/>
      <path d="M192,185 L204,162" stroke="#080810" stroke-width="2" stroke-linecap="round" opacity=".6"/>
      <path d="M202,196 L218,178" stroke="#080810" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>
      <path d="M110,196 L94,178"  stroke="#080810" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>
      <!-- Spine tips (dark) -->
      <circle cx="108" cy="162" r="2.5" fill="#080810" opacity=".6"/>
      <circle cx="124" cy="156" r="2.5" fill="#080810" opacity=".6"/>
      <circle cx="140" cy="153" r="2.5" fill="#080810" opacity=".65"/>
      <circle cx="155" cy="152" r="2.8" fill="#080810" opacity=".7"/>
      <circle cx="172" cy="153" r="2.5" fill="#080810" opacity=".65"/>
      <circle cx="188" cy="156" r="2.5" fill="#080810" opacity=".6"/>
      <circle cx="204" cy="162" r="2.5" fill="#080810" opacity=".6"/>

      <!-- Soft underbelly -->
      <path d="M108,285 C112,310 136,318 160,318 C184,318 208,310 212,285Z"
        fill="url(#hog-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

      <!-- Tiny legs -->
      <ellipse cx="126" cy="322" rx="18" ry="10" fill="url(#hog-body)" stroke="#080810" stroke-width="2.5"/>
      <ellipse cx="194" cy="322" rx="18" ry="10" fill="url(#hog-body)" stroke="#080810" stroke-width="2.5"/>
    </g>

    <!-- Face (soft, pale) -->
    <path d="M118,258 C118,232 136,215 160,215 C184,215 202,232 202,258 C202,275 190,288 160,288 C130,288 118,275 118,258Z"
      fill="url(#hog-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Eyes (small, bright) -->
    <circle cx="140" cy="248" r="11" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="140" cy="248" r="6.5" fill="#080810"/>
    <circle cx="143" cy="245" r="2.5" fill="white" opacity=".9"/>

    <circle cx="180" cy="248" r="11" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="180" cy="248" r="6.5" fill="#080810"/>
    <circle cx="183" cy="245" r="2.5" fill="white" opacity=".9"/>

    <!-- Snout (pointy) -->
    <path d="M145,268 C148,278 158,284 162,284 C166,284 174,278 175,268Z"
      fill="#c8a870" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Wet nose -->
    <ellipse cx="158" cy="277" rx="6" ry="5" fill="#6D4C41" opacity=".7"/>

    <!-- Small ears -->
    <path d="M130,228 L122,210 L142,224Z" fill="url(#hog-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M190,228 L198,210 L178,224Z" fill="url(#hog-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="hare-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#ddd8ca"/>
    </radialGradient>
    <radialGradient id="hare-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9E9E9E" stop-opacity=".2"/>
      <stop offset="100%" stop-color="#9E9E9E" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="362" rx="58" ry="7" fill="rgba(0,0,0,.09)"/>
  <ellipse class="char-aura" cx="160" cy="250" rx="80" ry="80" fill="url(#hare-aura)"/>

  <g class="char-float">

    <!-- Tall left ear -->
    <path d="M132,168 L118,68 L148,160Z"
      fill="url(#hare-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M134,165 L123,78 L145,158Z" fill="#9E9E9E" opacity=".4"/>

    <!-- Tall right ear (with wave animation) -->
    <g class="ear-wave">
      <path d="M188,168 L202,68 L172,160Z"
        fill="url(#hare-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M186,165 L197,78 L175,158Z" fill="#9E9E9E" opacity=".4"/>
    </g>

    <!-- Body -->
    <g class="char-body">
      <ellipse cx="160" cy="278" rx="62" ry="72" fill="url(#hare-body)" stroke="#080810" stroke-width="4"/>
      <!-- Belly -->
      <ellipse cx="160" cy="285" rx="36" ry="52" fill="white" stroke="#080810" stroke-width="1.8" opacity=".45"/>
      <!-- Fluffy tail -->
      <circle cx="222" cy="295" r="16" fill="url(#hare-body)" stroke="#080810" stroke-width="2.5"/>
      <circle cx="222" cy="295" r="10" fill="white" opacity=".5"/>

      <!-- Hind feet (large) -->
      <path d="M114,340 C94,340 80,348 80,358 C90,354 104,350 114,352Z"
        fill="url(#hare-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M206,340 C226,340 240,348 240,358 C230,354 216,350 206,352Z"
        fill="url(#hare-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M80,358 L86,364 M92,360 L96,366 M104,362 L106,368" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M240,358 L234,364 M228,360 L224,366 M216,362 L214,368" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Head -->
    <circle cx="160" cy="185" r="50" fill="url(#hare-body)" stroke="#080810" stroke-width="4"/>

    <!-- Eyes (wide, moon-touched) -->
    <ellipse cx="134" cy="180" rx="18" ry="17" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="134" cy="180" r="11" fill="#080810"/>
    <circle cx="138" cy="176" r="4" fill="white" opacity=".9"/>
    <circle cx="130" cy="185" r="1.8" fill="white" opacity=".5"/>

    <ellipse cx="186" cy="180" rx="18" ry="17" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="186" cy="180" r="11" fill="#080810"/>
    <circle cx="190" cy="176" r="4" fill="white" opacity=".9"/>
    <circle cx="182" cy="185" r="1.8" fill="white" opacity=".5"/>

    <!-- Nose -->
    <path d="M154,198 L166,198 L160,204Z" fill="#9E9E9E" opacity=".7"/>
    <!-- Mouth -->
    <path d="M153,204 C156,210 164,210 167,204" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Whiskers -->
    <line x1="100" y1="196" x2="146" y2="198" stroke="#080810" stroke-width="1.4" opacity=".35"/>
    <line x1="96"  y1="205" x2="144" y2="204" stroke="#080810" stroke-width="1.2" opacity=".25"/>
    <line x1="220" y1="196" x2="174" y2="198" stroke="#080810" stroke-width="1.4" opacity=".35"/>
    <line x1="224" y1="205" x2="176" y2="204" stroke="#080810" stroke-width="1.2" opacity=".25"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="stag-body" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#f5e8d0"/>
      <stop offset="100%" stop-color="#d0b888"/>
    </radialGradient>
    <radialGradient id="stag-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#8B6914" stop-opacity=".25"/>
      <stop offset="100%" stop-color="#8B6914" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="368" rx="52" ry="7" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="240" rx="85" ry="90" fill="url(#stag-aura)"/>

  <g class="char-float">

    <!-- Left antler -->
    <g stroke="#8B6914" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M128,140 L108,90 L96,60" stroke-width="5"/>
      <path d="M118,108 L100,88 L88,70" stroke-width="4"/>
      <path d="M108,82 L92,68 L82,52" stroke-width="3.5"/>
      <path d="M96,62 L80,54 L70,40" stroke-width="3"/>
      <path d="M108,90 L118,72 L124,56" stroke-width="3.5"/>
      <!-- Highlight -->
      <path d="M128,140 L108,90 L96,60" stroke="#c8981e" stroke-width="2" opacity=".4"/>
    </g>

    <!-- Right antler -->
    <g stroke="#8B6914" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M192,140 L212,90 L224,60" stroke-width="5"/>
      <path d="M202,108 L220,88 L232,70" stroke-width="4"/>
      <path d="M212,82 L228,68 L238,52" stroke-width="3.5"/>
      <path d="M224,62 L240,54 L250,40" stroke-width="3"/>
      <path d="M212,90 L202,72 L196,56" stroke-width="3.5"/>
      <path d="M192,140 L212,90 L224,60" stroke="#c8981e" stroke-width="2" opacity=".4"/>
    </g>

    <!-- Body -->
    <g class="char-body">
      <ellipse cx="160" cy="278" rx="58" ry="68" fill="url(#stag-body)" stroke="#080810" stroke-width="4"/>
      <!-- Neck -->
      <path d="M138,210 C136,190 140,175 148,168 C154,172 166,172 172,168 C180,175 184,190 182,210Z"
        fill="url(#stag-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>

      <!-- Legs (slender) -->
      <rect x="122" y="338" width="16" height="30" rx="7" fill="url(#stag-body)" stroke="#080810" stroke-width="3"/>
      <rect x="148" y="338" width="16" height="30" rx="7" fill="url(#stag-body)" stroke="#080810" stroke-width="3"/>
      <rect x="156" y="338" width="16" height="30" rx="7" fill="url(#stag-body)" stroke="#080810" stroke-width="3"/>
      <rect x="182" y="338" width="16" height="30" rx="7" fill="url(#stag-body)" stroke="#080810" stroke-width="3"/>
      <!-- Hooves -->
      <rect x="122" y="360" width="16" height="9" rx="4" fill="#080810" opacity=".75"/>
      <rect x="148" y="360" width="16" height="9" rx="4" fill="#080810" opacity=".75"/>
      <rect x="156" y="360" width="16" height="9" rx="4" fill="#080810" opacity=".75"/>
      <rect x="182" y="360" width="16" height="9" rx="4" fill="#080810" opacity=".75"/>
    </g>

    <!-- Head -->
    <ellipse cx="160" cy="162" rx="44" ry="48" fill="url(#stag-body)" stroke="#080810" stroke-width="4"/>

    <!-- Ears -->
    <path d="M122,148 L106,120 L138,140Z" fill="url(#stag-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M124,146 L112,124 L136,140Z" fill="#8B6914" opacity=".4"/>
    <path d="M198,148 L214,120 L182,140Z" fill="url(#stag-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M196,146 L208,124 L184,140Z" fill="#8B6914" opacity=".4"/>

    <!-- Eyes (amber, proud) -->
    <ellipse cx="136" cy="156" rx="17" ry="16" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="136" cy="156" r="10" fill="#8B6914"/>
    <path d="M136,146 C138,151 138,161 136,166 C134,161 134,151 136,146Z" fill="#080810"/>
    <circle cx="140" cy="151" r="3.5" fill="white" opacity=".9"/>

    <ellipse cx="184" cy="156" rx="17" ry="16" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="184" cy="156" r="10" fill="#8B6914"/>
    <path d="M184,146 C186,151 186,161 184,166 C182,161 182,151 184,146Z" fill="#080810"/>
    <circle cx="188" cy="151" r="3.5" fill="white" opacity=".9"/>

    <!-- Muzzle -->
    <path d="M145,172 C147,182 154,188 160,188 C166,188 173,182 175,172Z"
      fill="#d0b888" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="155" cy="180" rx="5" ry="4" fill="#080810" opacity=".5"/>
    <ellipse cx="165" cy="180" rx="5" ry="4" fill="#080810" opacity=".5"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="gryph-body" cx="35%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#f0e8c8"/>
      <stop offset="100%" stop-color="#c8a840"/>
    </radialGradient>
    <radialGradient id="gryph-wing" cx="20%" cy="20%" r="80%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#d4c48a"/>
    </radialGradient>
    <radialGradient id="gryph-aura" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#c8a840" stop-opacity=".25"/>
      <stop offset="100%" stop-color="#c8a840" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse class="char-aura" cx="160" cy="200" rx="140" ry="130" fill="url(#gryph-aura)"/>
  <g class="char-float">
    <!-- LEFT WING (spread wide) -->
    <path d="M118,200 C95,180 52,155 28,128 C42,140 55,158 65,175 M118,200 C88,195 45,188 20,180 C40,185 72,192 95,198 M118,200 C88,210 45,222 22,232 C44,222 78,212 102,205Z"
      fill="url(#gryph-wing)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <!-- RIGHT WING (spread wide) -->
    <path d="M202,200 C225,180 268,155 292,128 C278,140 265,158 255,175 M202,200 C232,195 275,188 300,180 C280,185 248,192 225,198 M202,200 C232,210 275,222 298,232 C276,222 242,212 218,205Z"
      fill="url(#gryph-wing)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <!-- Lion body (hindquarters) -->
    <ellipse cx="160" cy="285" rx="62" ry="50" fill="url(#gryph-body)" stroke="#080810" stroke-width="4"/>
    <!-- Lion tail -->
    <path d="M220,298 C240,278 252,255 248,235 C244,220 234,218 228,225 C224,233 228,244 232,252 C222,248 216,255 218,266 C220,278 220,288 220,298Z"
      fill="url(#gryph-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <!-- Tail tuft -->
    <path d="M244,224 C248,215 252,210 255,212 C252,220 248,226 244,230Z"
      fill="#080810" opacity=".6"/>
    <!-- Lion hind legs -->
    <rect x="118" y="320" width="26" height="48" rx="13" fill="url(#gryph-body)" stroke="#080810" stroke-width="3.5"/>
    <rect x="180" y="320" width="26" height="48" rx="13" fill="url(#gryph-body)" stroke="#080810" stroke-width="3.5"/>
    <ellipse cx="131" cy="370" rx="16" ry="9" fill="url(#gryph-body)" stroke="#080810" stroke-width="3"/>
    <ellipse cx="193" cy="370" rx="16" ry="9" fill="url(#gryph-body)" stroke="#080810" stroke-width="3"/>
    <!-- Eagle chest/body (upper) -->
    <ellipse cx="160" cy="228" rx="52" ry="48" fill="url(#gryph-body)" stroke="#080810" stroke-width="4"/>
    <!-- Feather texture on chest -->
    <path d="M132,212 C140,206 152,204 162,208" stroke="#080810" stroke-width="1.5" fill="none" opacity=".2"/>
    <path d="M128,222 C138,215 154,213 166,217" stroke="#080810" stroke-width="1.5" fill="none" opacity=".2"/>
    <path d="M126,234 C138,227 156,225 170,229" stroke="#080810" stroke-width="1.5" fill="none" opacity=".2"/>
    <!-- Eagle talons (front) -->
    <rect x="122" y="262" width="20" height="38" rx="10" fill="url(#gryph-body)" stroke="#080810" stroke-width="3.5"/>
    <rect x="180" y="262" width="20" height="38" rx="10" fill="url(#gryph-body)" stroke="#080810" stroke-width="3.5"/>
    <!-- Talon claws -->
    <path d="M118,296 L112,306 M126,298 L122,308 M134,298 L132,308" stroke="#080810" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M176,296 L170,306 M184,298 L180,308 M192,298 L192,308" stroke="#080810" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <!-- EAGLE HEAD (the hero) -->
    <ellipse cx="160" cy="170" rx="42" ry="40" fill="url(#gryph-body)" stroke="#080810" stroke-width="4"/>
    <!-- Crest feathers -->
    <path d="M148,132 L144,108 L156,128Z" fill="url(#gryph-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M160,130 L158,104 L170,128Z" fill="url(#gryph-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M172,132 L174,108 L182,130Z" fill="url(#gryph-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- HOOKED EAGLE BEAK (central, downward) -->
    <path d="M147,183 C150,190 156,196 160,198 C164,196 170,190 173,183 L171,196 C165,206 155,206 149,196Z"
      fill="#c8a840" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <!-- Beak nostril ridge -->
    <path d="M152,185 C156,187 164,187 168,185" stroke="#080810" stroke-width="1.5" fill="none" opacity=".4" stroke-linecap="round"/>
    <!-- Fierce eyes (both sides — front-facing) -->
    <ellipse cx="140" cy="162" rx="13" ry="11" fill="white" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="140" cy="162" rx="8" ry="8" fill="#c8a840"/>
    <circle cx="140" cy="162" r="4" fill="#080810"/>
    <circle cx="143" cy="159" r="2" fill="white" opacity=".9"/>
    <ellipse cx="180" cy="162" rx="13" ry="11" fill="white" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="180" cy="162" rx="8" ry="8" fill="#c8a840"/>
    <circle cx="180" cy="162" r="4" fill="#080810"/>
    <circle cx="183" cy="159" r="2" fill="white" opacity=".9"/>
    <!-- Fierce eyebrows (both sides, angling toward center) -->
    <path d="M126,152 L144,158" stroke="#080810" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M194,152 L176,158" stroke="#080810" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Ground shadow -->
    <ellipse cx="160" cy="362" rx="70" ry="8" fill="rgba(0,0,0,.08)"/>
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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="uni-body" cx="38%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#ede8f8"/>
    </radialGradient>
    <radialGradient id="uni-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#D500F9" stop-opacity=".35"/>
      <stop offset="60%" stop-color="#D500F9" stop-opacity=".12"/>
      <stop offset="100%" stop-color="#D500F9" stop-opacity="0"/>
    </radialGradient>
    <filter id="uni-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse cx="160" cy="365" rx="60" ry="8" fill="rgba(0,0,0,.09)"/>
  <ellipse class="char-aura" cx="160" cy="230" rx="105" ry="98" fill="url(#uni-aura)"/>

  <g class="char-float">

    <!-- Flowing mane (behind head) -->
    <path d="M188,148 C210,135 228,118 232,96 C228,104 220,114 210,120 C218,104 220,84 212,68 C206,78 202,96 200,112 C204,94 202,74 192,62 C188,74 188,95 190,110 C188,95 184,78 174,68 C172,82 176,102 180,118Z"
      fill="url(#uni-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Mane magenta shimmer -->
    <path d="M210,120 C218,104 220,84 212,68" stroke="#D500F9" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".5"/>
    <path d="M200,112 C204,94 202,74 192,62" stroke="#D500F9" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".4"/>

    <!-- Body -->
    <g class="char-body">
      <path d="M96,248 C96,198 122,168 160,168 C198,168 224,198 224,248 C224,290 202,318 160,318 C118,318 96,290 96,248Z"
        fill="url(#uni-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

      <!-- Legs (elegant) -->
      <rect x="118" y="308" width="16" height="56" rx="7" fill="url(#uni-body)" stroke="#080810" stroke-width="3"/>
      <rect x="144" y="308" width="16" height="56" rx="7" fill="url(#uni-body)" stroke="#080810" stroke-width="3"/>
      <rect x="160" y="308" width="16" height="56" rx="7" fill="url(#uni-body)" stroke="#080810" stroke-width="3"/>
      <rect x="186" y="308" width="16" height="56" rx="7" fill="url(#uni-body)" stroke="#080810" stroke-width="3"/>
      <rect x="118" y="356" width="16" height="9" rx="4" fill="#D500F9" opacity=".5"/>
      <rect x="144" y="356" width="16" height="9" rx="4" fill="#D500F9" opacity=".5"/>
      <rect x="160" y="356" width="16" height="9" rx="4" fill="#D500F9" opacity=".5"/>
      <rect x="186" y="356" width="16" height="9" rx="4" fill="#D500F9" opacity=".5"/>

      <!-- Tail -->
      <path d="M220,268 C244,255 256,232 248,208 C240,188 224,185 216,197 C222,192 232,203 228,218 C224,230 218,248 220,268Z"
        fill="url(#uni-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M246,212 C240,202 230,198 224,204" stroke="#D500F9" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".5"/>
    </g>

    <!-- Neck -->
    <path d="M138,170 C135,148 138,124 144,108 C150,112 170,112 176,108 C182,124 185,148 182,170Z"
      fill="url(#uni-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Head -->
    <ellipse cx="160" cy="108" rx="44" ry="50" fill="url(#uni-body)" stroke="#080810" stroke-width="4"/>

    <!-- Horn (spiral) -->
    <g class="horn-glow" filter="url(#uni-glow)">
      <path d="M160,60 L148,25 L172,25 Z" fill="#D500F9" stroke="#080810" stroke-width="2.5" stroke-linejoin="round" opacity=".9"/>
    </g>
    <!-- Spiral marks on horn -->
    <path d="M155,53 C157,46 161,40 163,33" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/>
    <path d="M153,46 L167,42" stroke="white" stroke-width="1" fill="none" opacity=".4"/>

    <!-- Ears -->
    <path d="M126,82 L115,55 L142,76Z" fill="url(#uni-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M128,80 L120,60 L140,76Z" fill="#D500F9" opacity=".4"/>
    <path d="M194,82 L205,55 L178,76Z" fill="url(#uni-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M192,80 L200,60 L180,76Z" fill="#D500F9" opacity=".4"/>

    <!-- Eyes (magenta, luminous) -->
    <ellipse cx="136" cy="104" rx="18" ry="17" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="136" cy="104" r="11" fill="#D500F9" filter="url(#uni-glow)"/>
    <path d="M136,93 C138,98 138,110 136,115 C134,110 134,98 136,93Z" fill="#080810"/>
    <circle cx="140" cy="99" r="4" fill="white" opacity=".9"/>

    <ellipse cx="184" cy="104" rx="18" ry="17" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="184" cy="104" r="11" fill="#D500F9" filter="url(#uni-glow)"/>
    <path d="M184,93 C186,98 186,110 184,115 C182,110 182,98 184,93Z" fill="#080810"/>
    <circle cx="188" cy="99" r="4" fill="white" opacity=".9"/>

    <!-- Muzzle -->
    <path d="M144,122 C146,132 153,138 160,138 C167,138 174,132 176,122Z"
      fill="#ede8f8" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M153,130 C156,134 164,134 167,130" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="selk-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#e8f4fc"/>
      <stop offset="100%" stop-color="#b8d8f0"/>
    </radialGradient>
    <radialGradient id="selk-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#29B6F6" stop-opacity=".28"/>
      <stop offset="100%" stop-color="#29B6F6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="362" rx="60" ry="8" fill="rgba(0,0,0,.09)"/>
  <ellipse class="char-aura" cx="160" cy="240" rx="88" ry="82" fill="url(#selk-aura)"/>

  <g class="char-float">

    <!-- Seal lower body / flipper tail -->
    <path d="M116,305 C104,330 88,352 78,358 C88,362 102,358 114,348 C118,358 120,368 128,368 C130,355 128,338 126,322Z"
      fill="url(#selk-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M204,305 C216,330 232,352 242,358 C232,362 218,358 206,348 C202,358 200,368 192,368 C190,355 192,338 194,322Z"
      fill="url(#selk-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>

    <!-- Body -->
    <g class="char-body">
      <path d="M98,248 C98,205 124,178 160,178 C196,178 222,205 222,248 C222,285 205,312 160,312 C115,312 98,285 98,248Z"
        fill="url(#selk-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>
      <!-- Seal markings (spots) -->
      <circle cx="130" cy="252" r="6" fill="#080810" opacity=".12"/>
      <circle cx="155" cy="268" r="5" fill="#080810" opacity=".1"/>
      <circle cx="178" cy="254" r="6" fill="#080810" opacity=".12"/>
      <circle cx="148" cy="235" r="4" fill="#080810" opacity=".1"/>
      <circle cx="172" cy="238" r="4" fill="#080810" opacity=".1"/>

      <!-- Arm flippers -->
      <path d="M102,235 C82,228 66,236 62,252 C72,244 86,240 98,246Z"
        fill="url(#selk-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M218,235 C238,228 254,236 258,252 C248,244 234,240 222,246Z"
        fill="url(#selk-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    </g>

    <!-- Flowing hair -->
    <path d="M126,168 C110,148 106,122 114,100 C118,115 120,138 124,158 C120,136 122,110 132,94 C138,110 138,136 136,158 C136,135 140,110 150,98 C153,115 150,140 148,162Z"
      fill="url(#selk-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round" opacity=".9"/>
    <!-- Hair blue shimmer -->
    <path d="M114,100 C118,115 120,138 124,158" stroke="#29B6F6" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".4"/>

    <!-- Head -->
    <circle cx="160" cy="175" r="52" fill="url(#selk-body)" stroke="#080810" stroke-width="4"/>

    <!-- Eyes (dreamy, large — selkie-eye animation) -->
    <g class="selkie-eye">
      <ellipse cx="136" cy="168" rx="21" ry="20" fill="white" stroke="#080810" stroke-width="3"/>
      <circle cx="136" cy="168" r="13" fill="#29B6F6"/>
      <path d="M136,155 C138,161 138,175 136,181 C134,175 134,161 136,155Z" fill="#080810"/>
      <circle cx="141" cy="162" r="5" fill="white" opacity=".9"/>
      <circle cx="131" cy="174" r="2.5" fill="white" opacity=".5"/>
    </g>
    <g class="selkie-eye" style="animation-delay:-.8s">
      <ellipse cx="184" cy="168" rx="21" ry="20" fill="white" stroke="#080810" stroke-width="3"/>
      <circle cx="184" cy="168" r="13" fill="#29B6F6"/>
      <path d="M184,155 C186,161 186,175 184,181 C182,175 182,161 184,155Z" fill="#080810"/>
      <circle cx="189" cy="162" r="5" fill="white" opacity=".9"/>
      <circle cx="179" cy="174" r="2.5" fill="white" opacity=".5"/>
    </g>

    <!-- Soft nose -->
    <path d="M154,188 L166,188 L160,194Z" fill="#29B6F6" opacity=".6"/>
    <!-- Gentle smile -->
    <path d="M148,196 C154,204 166,204 172,196" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Whiskers -->
    <line x1="98"  y1="186" x2="144" y2="188" stroke="#080810" stroke-width="1.4" opacity=".35"/>
    <line x1="95"  y1="195" x2="142" y2="194" stroke="#080810" stroke-width="1.2" opacity=".25"/>
    <line x1="222" y1="186" x2="176" y2="188" stroke="#080810" stroke-width="1.4" opacity=".35"/>
    <line x1="225" y1="195" x2="178" y2="194" stroke="#080810" stroke-width="1.2" opacity=".25"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="wisp-grd" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#e8fef8"/>
      <stop offset="100%" stop-color="#b0f0e0"/>
    </radialGradient>
    <radialGradient id="wisp-core" cx="38%" cy="35%" r="62%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#d0f8ee"/>
    </radialGradient>
    <radialGradient id="wisp-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00E5B4" stop-opacity=".45"/>
      <stop offset="100%" stop-color="#00E5B4" stop-opacity="0"/>
    </radialGradient>
    <filter id="wisp-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse class="char-aura" cx="160" cy="220" rx="100" ry="95" fill="url(#wisp-aura)"/>

  <g class="wisp-bob">

    <!-- Trailing smaller wisps below -->
    <g class="wisp-trail">
      <ellipse cx="148" cy="310" rx="16" ry="20" fill="url(#wisp-grd)" stroke="#080810" stroke-width="2" opacity=".6"/>
      <ellipse cx="172" cy="335" rx="12" ry="15" fill="url(#wisp-grd)" stroke="#080810" stroke-width="1.8" opacity=".45"/>
      <ellipse cx="155" cy="358" rx="8"  ry="10" fill="url(#wisp-grd)" stroke="#080810" stroke-width="1.5" opacity=".3"/>
    </g>

    <!-- Connecting wisps (wavy tail) -->
    <path d="M148,275 C140,290 144,305 148,310" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round" opacity=".4"/>
    <path d="M168,288 C174,305 174,320 172,335" stroke="#080810" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".3"/>

    <!-- Main orb body -->
    <g filter="url(#wisp-glow)">
      <circle cx="160" cy="195" r="80" fill="#00E5B4" opacity=".2"/>
    </g>
    <circle cx="160" cy="195" r="72" fill="url(#wisp-grd)" stroke="#080810" stroke-width="3.5"/>
    <circle cx="160" cy="195" r="52" fill="url(#wisp-core)" stroke="#080810" stroke-width="2" opacity=".6"/>
    <circle cx="160" cy="195" r="30" fill="white" opacity=".4"/>

    <!-- Face (minimal, floating) -->
    <!-- Eyes -->
    <circle cx="142" cy="188" r="10" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="142" cy="188" r="6"  fill="#080810"/>
    <circle cx="145" cy="185" r="2.5" fill="white" opacity=".9"/>

    <circle cx="178" cy="188" r="10" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="178" cy="188" r="6"  fill="#080810"/>
    <circle cx="181" cy="185" r="2.5" fill="white" opacity=".9"/>

    <!-- Wiggly mouth -->
    <path d="M146,208 C152,215 168,215 174,208" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Tiny floating sparks -->
    <circle cx="108" cy="155" r="4" fill="#00E5B4" opacity=".7" filter="url(#wisp-glow)"/>
    <circle cx="215" cy="162" r="3" fill="#00E5B4" opacity=".6" filter="url(#wisp-glow)"/>
    <circle cx="100" cy="220" r="3" fill="#00E5B4" opacity=".55" filter="url(#wisp-glow)"/>
    <circle cx="218" cy="228" r="4" fill="#00E5B4" opacity=".6" filter="url(#wisp-glow)"/>
    <circle cx="148" cy="128" r="3" fill="#00E5B4" opacity=".5" filter="url(#wisp-glow)"/>
    <circle cx="175" cy="122" r="2.5" fill="#00E5B4" opacity=".45" filter="url(#wisp-glow)"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="wyv-body" cx="35%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#d8eee8"/>
      <stop offset="100%" stop-color="#9cc8c0"/>
    </radialGradient>
    <radialGradient id="wyv-belly" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#e8ece0"/>
    </radialGradient>
    <radialGradient id="wyv-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#006064" stop-opacity=".3"/>
      <stop offset="100%" stop-color="#006064" stop-opacity="0"/>
    </radialGradient>
    <filter id="wyv-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse cx="160" cy="365" rx="55" ry="7" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="228" rx="100" ry="95" fill="url(#wyv-aura)"/>

  <g class="char-float">

    <!-- Left wing -->
    <g class="wing-soar">
      <path d="M112,188 C80,165 48,168 30,190 C44,182 62,178 78,185 C58,202 50,228 64,244 C72,222 88,204 104,198 C88,218 84,244 96,258 C106,235 110,210 112,200Z"
        fill="url(#wyv-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Wing membrane veins -->
      <path d="M48,192 C62,200 76,205 88,200" stroke="#006064" stroke-width="1.2" fill="none" opacity=".4"/>
      <path d="M56,212 C70,218 84,220 94,215" stroke="#006064" stroke-width="1" fill="none" opacity=".35"/>
      <path d="M68,230 C80,234 90,235 96,230" stroke="#006064" stroke-width="1" fill="none" opacity=".3"/>
    </g>

    <!-- Right wing -->
    <g class="wing-flut" style="animation-delay:-.3s">
      <path d="M208,188 C240,165 272,168 290,190 C276,182 258,178 242,185 C262,202 270,228 256,244 C248,222 232,204 216,198 C232,218 236,244 224,258 C214,235 210,210 208,200Z"
        fill="url(#wyv-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M272,192 C258,200 244,205 232,200" stroke="#006064" stroke-width="1.2" fill="none" opacity=".4"/>
      <path d="M264,212 C250,218 236,220 226,215" stroke="#006064" stroke-width="1" fill="none" opacity=".35"/>
      <path d="M252,230 C240,234 230,235 224,230" stroke="#006064" stroke-width="1" fill="none" opacity=".3"/>
    </g>

    <!-- Tail (barbed) -->
    <path d="M214,268 C245,252 265,225 256,198 C248,175 228,172 214,186 C222,181 234,193 230,210 C226,225 215,245 214,268Z"
      fill="url(#wyv-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <!-- Tail barb -->
    <path d="M254,200 L268,190 L255,208Z" fill="#006064" stroke="#080810" stroke-width="2" stroke-linejoin="round" opacity=".8"/>

    <!-- Body -->
    <g class="char-body">
      <ellipse cx="160" cy="255" rx="58" ry="68" fill="url(#wyv-body)" stroke="#080810" stroke-width="4"/>
      <!-- Belly scales -->
      <ellipse cx="160" cy="262" rx="36" ry="52" fill="url(#wyv-belly)" stroke="#080810" stroke-width="2"/>
      <path d="M136,235 L184,235" stroke="#080810" stroke-width="1" opacity=".2"/>
      <path d="M132,248 L188,248" stroke="#080810" stroke-width="1" opacity=".18"/>
      <path d="M132,261 L188,261" stroke="#080810" stroke-width="1" opacity=".18"/>
      <path d="M134,274 L186,274" stroke="#080810" stroke-width="1" opacity=".18"/>

      <!-- Two legs (no arms — wyvern style) -->
      <path d="M128,315 L116,355 C110,360 102,358 100,352 C106,347 112,340 114,332Z"
        fill="url(#wyv-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M100,352 L94,362 M106,355 L102,365 M114,356 L112,366" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M192,315 L204,355 C210,360 218,358 220,352 C214,347 208,340 206,332Z"
        fill="url(#wyv-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M220,352 L226,362 M214,355 L218,365 M206,356 L208,366" stroke="#080810" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <!-- Neck -->
    <path d="M136,188 C133,168 136,148 142,132 C148,136 172,136 178,132 C184,148 187,168 184,188Z"
      fill="url(#wyv-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>

    <!-- Dragon head -->
    <path d="M118,140 C118,112 136,96 160,96 C184,96 202,112 202,140 C202,165 184,178 160,178 C136,178 118,165 118,140Z"
      fill="url(#wyv-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

    <!-- Horns -->
    <path d="M132,106 L118,72 L140,100Z" fill="#006064" stroke="#080810" stroke-width="2.5" stroke-linejoin="round" opacity=".9"/>
    <path d="M188,106 L202,72 L180,100Z" fill="#006064" stroke="#080810" stroke-width="2.5" stroke-linejoin="round" opacity=".9"/>

    <!-- Snout (elongated) -->
    <path d="M136,158 C136,170 146,178 160,178 C174,178 184,170 184,158Z"
      fill="url(#wyv-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <!-- Nostril slits -->
    <path d="M148,170 L153,166 L150,174Z" fill="#006064" opacity=".6"/>
    <path d="M172,170 L167,166 L170,174Z" fill="#006064" opacity=".6"/>

    <!-- Eyes (slit pupils, teal) -->
    <ellipse cx="136" cy="132" rx="18" ry="16" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="136" cy="132" r="11" fill="#006064" filter="url(#wyv-glow)"/>
    <path d="M136,119 C137,126 137,138 136,144 C135,138 135,126 136,119Z" fill="#080810" opacity=".9"/>
    <circle cx="140" cy="127" r="3.5" fill="white" opacity=".8"/>

    <ellipse cx="184" cy="132" rx="18" ry="16" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="184" cy="132" r="11" fill="#006064" filter="url(#wyv-glow)"/>
    <path d="M184,119 C185,126 185,138 184,144 C183,138 183,126 184,119Z" fill="#080810" opacity=".9"/>
    <circle cx="188" cy="127" r="3.5" fill="white" opacity=".8"/>

    <!-- Mist breath hint -->
    <path d="M148,178 C140,188 136,200 140,210 C148,196 152,185 152,178Z"
      fill="#006064" opacity=".15" stroke="none"/>
    <path d="M170,178 C178,190 180,204 174,214 C168,198 166,186 168,178Z"
      fill="#006064" opacity=".12" stroke="none"/>

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

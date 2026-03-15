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
    nameShort: '白猫',
    subtitle: 'White Cat Spirit · Baby Form',
    rarity: 'common',
    rarityLabel: '◇ Common',
    accentColor: '#f0a500',
    haiku: '月の下で<br>白猫は夢を見る<br>静かな夜明け',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="shiro-body" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e5e0d5"/>
    </radialGradient>
    <radialGradient id="shiro-eye" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffc84a"/>
      <stop offset="100%" stop-color="#c87000"/>
    </radialGradient>
    <radialGradient id="shiro-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f0a500" stop-opacity=".32"/>
      <stop offset="100%" stop-color="#f0a500" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Shadow -->
  <ellipse cx="160" cy="352" rx="66" ry="9" fill="rgba(0,0,0,.1)"/>

  <!-- Aura -->
  <ellipse class="cat-aura" cx="160" cy="235" rx="92" ry="82" fill="url(#shiro-aura)"/>

  <!-- Float group -->
  <g class="cat-float">

    <!-- TAIL (behind body) -->
    <g class="cat-tail" style="transform-origin:218px 292px">
      <path d="M218,292 C252,272 272,242 260,210 C248,178 218,177 202,196 C186,215 200,240 214,248 C221,252 223,270 218,292 Z"
        fill="url(#shiro-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
      <!-- Tail fur strokes -->
      <path d="M236,240 C246,226 252,208 244,194" stroke="#080810" stroke-width="1" fill="none" stroke-linecap="round" opacity=".14"/>
      <path d="M228,254 C240,240 248,222 242,206" stroke="#080810" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".1"/>
    </g>

    <!-- BODY -->
    <g class="cat-body">
      <ellipse cx="160" cy="258" rx="66" ry="72"
        fill="url(#shiro-body)" stroke="#080810" stroke-width="4"/>

      <!-- Belly -->
      <ellipse cx="160" cy="263" rx="38" ry="52"
        fill="white" stroke="#080810" stroke-width="2" opacity=".55"/>

      <!-- Fur texture lines -->
      <path d="M150,238 C152,252 152,266 149,278" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".12"/>
      <path d="M160,234 C162,249 162,265 159,278" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".12"/>
      <path d="M170,238 C168,252 168,266 171,278" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".12"/>

      <!-- LEFT PAW -->
      <ellipse cx="118" cy="324" rx="29" ry="15"
        fill="url(#shiro-body)" stroke="#080810" stroke-width="3"/>
      <path d="M96,323 L100,331" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M110,326 L112,334" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M124,326 L124,334" stroke="#080810" stroke-width="2" stroke-linecap="round"/>

      <!-- RIGHT PAW -->
      <ellipse cx="202" cy="324" rx="29" ry="15"
        fill="url(#shiro-body)" stroke="#080810" stroke-width="3"/>
      <path d="M224,323 L220,331" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M210,326 L208,334" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M196,326 L196,334" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- LEFT EAR (behind head) -->
    <path d="M108,114 L95,62 L152,100 Z"
      fill="url(#shiro-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M112,109 L103,70 L146,98 Z"
      fill="#f0a500" opacity=".8"/>

    <!-- RIGHT EAR (with twitch) -->
    <g class="cat-ear-r">
      <path d="M212,114 L225,62 L168,100 Z"
        fill="url(#shiro-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M208,109 L217,70 L174,98 Z"
        fill="#f0a500" opacity=".8"/>
    </g>

    <!-- HEAD -->
    <circle cx="160" cy="146" r="62"
      fill="url(#shiro-body)" stroke="#080810" stroke-width="4"/>

    <!-- LEFT EYE -->
    <g>
      <ellipse cx="134" cy="143" rx="22" ry="20" fill="white" stroke="#080810" stroke-width="3"/>
      <ellipse cx="134" cy="143" rx="15" ry="14" fill="url(#shiro-eye)"/>
      <path d="M134,130 C136,135 136,151 134,156 C132,151 132,135 134,130Z" fill="#080810"/>
      <circle cx="141" cy="137" r="4.5" fill="white" opacity=".9"/>
      <circle cx="127" cy="151" r="2" fill="white" opacity=".5"/>
    </g>

    <!-- RIGHT EYE -->
    <g>
      <ellipse cx="186" cy="143" rx="22" ry="20" fill="white" stroke="#080810" stroke-width="3"/>
      <ellipse cx="186" cy="143" rx="15" ry="14" fill="url(#shiro-eye)"/>
      <path d="M186,130 C188,135 188,151 186,156 C184,151 184,135 186,130Z" fill="#080810"/>
      <circle cx="193" cy="137" r="4.5" fill="white" opacity=".9"/>
      <circle cx="179" cy="151" r="2" fill="white" opacity=".5"/>
    </g>

    <!-- Nose (small inverted triangle) -->
    <path d="M155,162 L165,162 L160,169 Z" fill="#f0a500" opacity=".85"/>

    <!-- Mouth -->
    <path d="M154,169 C157,175 163,175 166,169" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Whiskers left -->
    <line x1="100" y1="162" x2="146" y2="165" stroke="#080810" stroke-width="1.5" opacity=".4"/>
    <line x1="96"  y1="171" x2="144" y2="170" stroke="#080810" stroke-width="1.4" opacity=".3"/>
    <line x1="100" y1="180" x2="145" y2="175" stroke="#080810" stroke-width="1.2" opacity=".22"/>

    <!-- Whiskers right -->
    <line x1="220" y1="162" x2="174" y2="165" stroke="#080810" stroke-width="1.5" opacity=".4"/>
    <line x1="224" y1="171" x2="176" y2="170" stroke="#080810" stroke-width="1.4" opacity=".3"/>
    <line x1="220" y1="180" x2="175" y2="175" stroke="#080810" stroke-width="1.2" opacity=".22"/>

  </g><!-- /cat-float -->
</svg>`
  },

  // ── 烏天狗 · Karasu ─ Rare ─ Red ───────────────────────────────────────────
  karasu: {
    id: 'karasu',
    name: '烏天狗 · Karasu',
    nameShort: '烏天狗',
    subtitle: 'Crow Tengu · Fledgling Form',
    rarity: 'rare',
    rarityLabel: '◈ Rare',
    accentColor: '#d40000',
    haiku: '赤い瞳で<br>嵐を見通す鴉<br>知恵の使者よ',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="karasu-body" cx="35%" cy="25%" r="70%">
      <stop offset="0%" stop-color="#1c1c28"/>
      <stop offset="100%" stop-color="#080810"/>
    </radialGradient>
    <radialGradient id="karasu-breast" cx="50%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e5e0d5"/>
    </radialGradient>
    <radialGradient id="karasu-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#d40000" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#d40000" stop-opacity="0"/>
    </radialGradient>
    <filter id="karasu-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Shadow -->
  <ellipse cx="160" cy="368" rx="52" ry="8" fill="rgba(0,0,0,.1)"/>

  <!-- Aura -->
  <ellipse class="crow-aura" cx="160" cy="232" rx="80" ry="92" fill="url(#karasu-aura)"/>

  <!-- Float group -->
  <g class="crow-float">

    <!-- LEFT WING (behind body) -->
    <g class="crow-wing-l">
      <path d="M100,198 C72,202 50,222 54,248 C58,270 76,278 96,272 C84,258 82,238 94,224 C102,214 104,206 100,198Z"
        fill="url(#karasu-body)" stroke="#080810" stroke-width="2"/>
      <!-- Feather edge lines -->
      <path d="M54,248 C46,258 44,272 54,279 C62,284 76,280 84,270" stroke="#1c1c28" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".5"/>
      <path d="M82,262 C76,272 74,280 80,284" stroke="#1c1c28" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".35"/>
      <!-- Feather highlight -->
      <path d="M102,200 C84,212 68,234 70,256" stroke="#f7f2e8" stroke-width="1" fill="none" stroke-linecap="round" opacity=".1"/>
    </g>

    <!-- RIGHT WING (behind body) -->
    <g class="crow-wing-r">
      <path d="M220,198 C248,202 270,222 266,248 C262,270 244,278 224,272 C236,258 238,238 226,224 C218,214 216,206 220,198Z"
        fill="url(#karasu-body)" stroke="#080810" stroke-width="2"/>
      <!-- Feather edge lines -->
      <path d="M266,248 C274,258 276,272 266,279 C258,284 244,280 236,270" stroke="#1c1c28" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".5"/>
      <path d="M238,262 C244,272 246,280 240,284" stroke="#1c1c28" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".35"/>
      <path d="M218,200 C236,212 252,234 250,256" stroke="#f7f2e8" stroke-width="1" fill="none" stroke-linecap="round" opacity=".1"/>
    </g>

    <!-- BODY -->
    <g class="crow-body">
      <ellipse cx="160" cy="234" rx="60" ry="78"
        fill="url(#karasu-body)" stroke="#080810" stroke-width="4"/>

      <!-- Breast (white) -->
      <ellipse cx="160" cy="240" rx="34" ry="56"
        fill="url(#karasu-breast)" stroke="#080810" stroke-width="2.5"/>

      <!-- Breast feather texture -->
      <path d="M150,214 C152,228 152,246 150,258" stroke="#080810" stroke-width="1" fill="none" stroke-linecap="round" opacity=".1"/>
      <path d="M160,210 C162,225 162,244 160,258" stroke="#080810" stroke-width="1" fill="none" stroke-linecap="round" opacity=".1"/>
      <path d="M170,214 C168,228 168,246 170,258" stroke="#080810" stroke-width="1" fill="none" stroke-linecap="round" opacity=".1"/>

      <!-- Wing-body fold lines -->
      <path d="M100,198 C105,220 108,248 106,268" stroke="#080810" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".25"/>
      <path d="M220,198 C215,220 212,248 214,268" stroke="#080810" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".25"/>
    </g>

    <!-- LEGS -->
    <path d="M148,308 L136,350" stroke="#080810" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M136,350 L116,354" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M136,350 L130,360" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M136,350 L148,356" stroke="#080810" stroke-width="3" stroke-linecap="round"/>

    <path d="M172,308 L184,350" stroke="#080810" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M184,350 L204,354" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M184,350 L190,360" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M184,350 L172,356" stroke="#080810" stroke-width="3" stroke-linecap="round"/>

    <!-- HEAD GROUP -->
    <g class="crow-head">
      <!-- Neck -->
      <path d="M138,158 C138,150 148,145 160,145 C172,145 182,150 182,158 L182,168 C178,164 170,162 160,162 C150,162 142,164 138,168Z"
        fill="url(#karasu-body)" stroke="none"/>

      <!-- HEAD -->
      <circle cx="160" cy="114" r="48"
        fill="url(#karasu-body)" stroke="#080810" stroke-width="4"/>

      <!-- Head feather sheen -->
      <path d="M128,96 C136,86 148,80 160,80" stroke="#2a2a3a" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".4"/>
      <path d="M122,108 C127,98 134,92 142,89" stroke="#2a2a3a" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".3"/>

      <!-- Crest feathers -->
      <path d="M153,68 L148,50 L155,58" stroke="#080810" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M160,66 L158,46 L162,46" stroke="#080810" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M167,68 L172,50 L165,58" stroke="#080810" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- BEAK (front-facing, downward) -->
      <path d="M147,130 C152,138 168,138 173,130 L168,150 L152,150 Z"
        fill="#080810" stroke="#080810" stroke-width="1.5" stroke-linejoin="round"/>
      <!-- Red beak tip -->
      <path d="M152,150 L168,150 L160,160 Z" fill="#d40000"/>
      <!-- Beak division line -->
      <path d="M148,133 C154,140 166,140 172,133" stroke="#f7f2e8" stroke-width=".8" fill="none" opacity=".2"/>

      <!-- LEFT EYE (normal, smaller) -->
      <circle cx="140" cy="108" r="11" fill="white" stroke="#080810" stroke-width="2.5"/>
      <circle cx="140" cy="108" r="6.5" fill="#080810"/>
      <circle cx="143" cy="105" r="2.5" fill="white" opacity=".9"/>

      <!-- RIGHT EYE (red accented — the signature mark) -->
      <g class="crow-eye-glow" filter="url(#karasu-glow)">
        <!-- Outer red ring -->
        <circle cx="180" cy="108" r="17" fill="none" stroke="#d40000" stroke-width="2.5" opacity=".85"/>
      </g>
      <circle cx="180" cy="108" r="12" fill="white" stroke="#080810" stroke-width="2.5"/>
      <circle cx="180" cy="108" r="7" fill="#080810"/>
      <circle cx="183" cy="105" r="2.5" fill="white" opacity=".9"/>
      <!-- Red iris tint -->
      <circle cx="180" cy="108" r="5.5" fill="#d40000" opacity=".28"/>

    </g><!-- /crow-head -->

  </g><!-- /crow-float -->
</svg>`
  },

  // ── 九尾狐 · Kyūbi ─ Legendary ─ Blue ─────────────────────────────────────
  kyubi: {
    id: 'kyubi',
    name: '九尾狐 · Kyūbi',
    nameShort: '九尾',
    subtitle: 'Nine-Tail Fox Spirit · Baby Form',
    rarity: 'legendary',
    rarityLabel: '✦ Legendary',
    accentColor: '#0047ff',
    haiku: '雷光の狐<br>集中の炎が<br>今、覚醒す',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="kyubi-aura" cx="50%" cy="48%" r="54%">
      <stop offset="0%" stop-color="#00e5ff" stop-opacity=".28"/>
      <stop offset="65%" stop-color="#0047ff" stop-opacity=".12"/>
      <stop offset="100%" stop-color="#0047ff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="kyubi-fur" cx="32%" cy="26%" r="72%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#ccc8be"/>
    </radialGradient>
    <radialGradient id="kyubi-head" cx="36%" cy="30%" r="68%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#d4d0c4"/>
    </radialGradient>
    <filter id="kyubi-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="kyubi-tail-g" x="-20%" y="-10%" width="140%" height="120%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="kyubi-eye-g" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background aura -->
  <ellipse class="char-aura" cx="160" cy="195" rx="138" ry="155" fill="url(#kyubi-aura)"/>

  <!-- ── NINE TAILS ── hero of the design, fanning from body roots up to arc of tips -->
  <g class="char-float" filter="url(#kyubi-tail-g)">

    <!-- Tail 0 – far left -->
    <path d="M143,324 Q65,232 35,130 Q88,220 153,324Z"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- Tail 1 -->
    <path d="M146,323 Q95,200 68,90 Q115,192 156,323Z"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- Tail 2 -->
    <path d="M149,322 Q118,180 102,65 Q135,174 159,322Z"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- Tail 3 -->
    <path d="M152,321 Q138,174 132,52 Q152,167 162,321Z"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- Tail 4 – center, longest -->
    <path d="M155,320 Q151,177 160,46 Q169,177 165,320Z"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Tail 5 -->
    <path d="M158,321 Q168,167 188,52 Q182,174 168,321Z"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- Tail 6 -->
    <path d="M161,322 Q185,174 218,65 Q202,180 171,322Z"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- Tail 7 -->
    <path d="M164,323 Q205,192 252,90 Q225,200 174,323Z"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- Tail 8 – far right -->
    <path d="M167,324 Q232,220 285,130 Q255,232 177,324Z"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="2.2" stroke-linejoin="round"/>

    <!-- ── FOX BODY (compact, lower third — tails emerge behind) ── -->

    <!-- Body / chest -->
    <ellipse cx="160" cy="328" rx="40" ry="22"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="3.5"/>
    <!-- Belly patch -->
    <ellipse cx="160" cy="330" rx="22" ry="13" fill="#fefcf5" stroke="#080810" stroke-width="2" opacity=".75"/>

    <!-- Paws -->
    <ellipse cx="139" cy="347" rx="15" ry="9" fill="url(#kyubi-fur)" stroke="#080810" stroke-width="3"/>
    <path d="M129,349 L128,356" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M135,351 L134,358" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M141,352 L141,359" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M147,351 L148,358" stroke="#080810" stroke-width="2" stroke-linecap="round"/>

    <ellipse cx="181" cy="347" rx="15" ry="9" fill="url(#kyubi-fur)" stroke="#080810" stroke-width="3"/>
    <path d="M191,349 L192,356" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M185,351 L186,358" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M179,352 L179,359" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M173,351 L172,358" stroke="#080810" stroke-width="2" stroke-linecap="round"/>

    <!-- Pointed fox ears (behind head) -->
    <path d="M130,268 L116,228 L150,260Z"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M190,268 L204,228 L170,260Z"
      fill="url(#kyubi-fur)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <!-- Ear inner blue -->
    <path d="M133,266 L121,234 L148,261Z" fill="#0047ff" opacity=".45"/>
    <path d="M187,266 L199,234 L172,261Z" fill="#0047ff" opacity=".45"/>

    <!-- HEAD -->
    <ellipse cx="160" cy="285" rx="34" ry="28"
      fill="url(#kyubi-head)" stroke="#080810" stroke-width="3.5"/>

    <!-- Muzzle (pointed fox snout) -->
    <ellipse cx="160" cy="295" rx="17" ry="12" fill="#e8e4da" stroke="#080810" stroke-width="2.5"/>
    <!-- Nose -->
    <ellipse cx="160" cy="291" rx="5" ry="3.5" fill="#080810"/>
    <!-- Mouth -->
    <path d="M154,297 Q160,302 166,297" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Eyes -->
    <g class="eye-l" filter="url(#kyubi-eye-g)">
      <ellipse cx="146" cy="278" rx="11" ry="9" fill="white" stroke="#080810" stroke-width="2.5"/>
      <ellipse cx="146" cy="278" rx="7"  ry="6" fill="#0047ff"/>
      <ellipse cx="146" cy="279" rx="3.5" ry="4" fill="#080810"/>
      <circle  cx="149" cy="275" r="2.5" fill="white" opacity=".9"/>
    </g>
    <g class="eye-r" filter="url(#kyubi-eye-g)">
      <ellipse cx="174" cy="278" rx="11" ry="9" fill="white" stroke="#080810" stroke-width="2.5"/>
      <ellipse cx="174" cy="278" rx="7"  ry="6" fill="#0047ff"/>
      <ellipse cx="174" cy="279" rx="3.5" ry="4" fill="#080810"/>
      <circle  cx="177" cy="275" r="2.5" fill="white" opacity=".9"/>
    </g>

    <!-- Eyebrow marks -->
    <path d="M134,268 L146,273" stroke="#080810" stroke-width="3" stroke-linecap="round"/>
    <path d="M186,268 L174,273" stroke="#080810" stroke-width="3" stroke-linecap="round"/>

    <!-- Cheek whisker marks -->
    <path d="M128,282 L140,280" stroke="#080810" stroke-width="2"   stroke-linecap="round" opacity=".6"/>
    <path d="M127,287 L139,286" stroke="#080810" stroke-width="1.5" stroke-linecap="round" opacity=".4"/>
    <path d="M192,282 L180,280" stroke="#080810" stroke-width="2"   stroke-linecap="round" opacity=".6"/>
    <path d="M193,287 L181,286" stroke="#080810" stroke-width="1.5" stroke-linecap="round" opacity=".4"/>

    <!-- Forehead rune -->
    <g class="rune" filter="url(#kyubi-glow)">
      <path d="M164,258 L156,268 L163,268 L155,280" stroke="#0047ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M164,258 L156,268 L163,268 L155,280" stroke="#00e5ff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".8"/>
    </g>

  </g><!-- /char-float -->

  <!-- Orbiting sparks -->
  <g class="spark-ring">
    <circle cx="160" cy="60"  r="3"   fill="#00e5ff" opacity=".9"/>
    <circle cx="268" cy="168" r="2.5" fill="#0047ff" opacity=".8"/>
    <circle cx="228" cy="326" r="2.5" fill="#00e5ff" opacity=".7"/>
    <circle cx="92"  cy="326" r="2"   fill="#0047ff" opacity=".8"/>
    <circle cx="52"  cy="168" r="3"   fill="#00e5ff" opacity=".9"/>
  </g>
  <g class="spark-ring-r" opacity=".5">
    <circle cx="160" cy="38"  r="2"   fill="#00e5ff"/>
    <circle cx="278" cy="185" r="2"   fill="#0047ff"/>
    <circle cx="214" cy="350" r="2"   fill="#00e5ff"/>
    <circle cx="106" cy="350" r="1.5" fill="#0047ff"/>
    <circle cx="42"  cy="185" r="2"   fill="#00e5ff"/>
  </g>

  <!-- Ground shadow -->
  <ellipse cx="160" cy="368" rx="55" ry="8" fill="rgba(0,0,0,.1)"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="tanuki-fur" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#e8d0a0"/>
      <stop offset="100%" stop-color="#b8903c"/>
    </radialGradient>
    <radialGradient id="tanuki-belly" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#f5e8cc"/>
      <stop offset="100%" stop-color="#ddc890"/>
    </radialGradient>
    <radialGradient id="tanuki-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#8B5E14" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#8B5E14" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="360" rx="68" ry="9" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="245" rx="90" ry="82" fill="url(#tanuki-aura)"/>

  <g class="char-float">

    <!-- Straw hat (wide conical) -->
    <ellipse cx="160" cy="108" rx="78" ry="20" fill="#d4c080" stroke="#080810" stroke-width="3.5"/>
    <path d="M138,108 C143,88 157,80 160,78 C163,80 177,88 182,108Z" fill="#c8b060" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M82,108 C110,117 140,121 160,121 C180,121 210,117 238,108" stroke="#8B5E14" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".6"/>

    <!-- Striped tail (front, signature feature) -->
    <path d="M200,290 C232,278 252,255 248,228 C244,204 224,198 210,210 C222,205 234,218 228,236 C222,252 208,268 200,290Z"
      fill="url(#tanuki-fur)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <!-- Tail stripes -->
    <path d="M232,230 C226,222 216,220 210,226" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round" opacity=".5"/>
    <path d="M238,244 C230,236 220,234 214,240" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round" opacity=".45"/>
    <path d="M236,258 C228,252 218,250 214,256" stroke="#080810" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".4"/>

    <!-- Body (wide, barrel-shaped) -->
    <g class="char-body">
      <ellipse cx="156" cy="268" rx="72" ry="78" fill="url(#tanuki-fur)" stroke="#080810" stroke-width="4"/>

      <!-- Big round belly (the drum) -->
      <ellipse cx="156" cy="280" rx="50" ry="58" fill="url(#tanuki-belly)" stroke="#080810" stroke-width="2.5"/>
      <!-- Belly drum ring -->
      <ellipse cx="156" cy="284" rx="32" ry="28" fill="none" stroke="#8B5E14" stroke-width="2" opacity=".35"/>

      <!-- Short stubby legs -->
      <path d="M108,336 L98,360 C94,365 88,363 86,357 C92,352 98,344 100,336Z"
        fill="url(#tanuki-fur)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <path d="M204,336 L214,360 C218,365 224,363 226,357 C220,352 214,344 212,336Z"
        fill="url(#tanuki-fur)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    </g>

    <!-- Left ear (round, dog-like) -->
    <ellipse cx="118" cy="148" rx="20" ry="22" fill="url(#tanuki-fur)" stroke="#080810" stroke-width="3.5"/>
    <ellipse cx="118" cy="148" rx="11" ry="13" fill="#8B5E14" opacity=".5"/>
    <!-- Right ear -->
    <ellipse cx="198" cy="148" rx="20" ry="22" fill="url(#tanuki-fur)" stroke="#080810" stroke-width="3.5"/>
    <ellipse cx="198" cy="148" rx="11" ry="13" fill="#8B5E14" opacity=".5"/>

    <!-- Head (wider, more dog-like) -->
    <circle cx="158" cy="190" r="56" fill="url(#tanuki-fur)" stroke="#080810" stroke-width="4"/>

    <!-- Raccoon eye mask (signature feature) -->
    <ellipse cx="134" cy="185" rx="24" ry="18" fill="#3a2808" opacity=".55"/>
    <ellipse cx="182" cy="185" rx="24" ry="18" fill="#3a2808" opacity=".55"/>

    <!-- Eyes (on top of mask) -->
    <circle cx="134" cy="184" r="13" fill="white" stroke="#080810" stroke-width="2"/>
    <circle cx="134" cy="184" r="8" fill="#080810"/>
    <circle cx="137" cy="181" r="3" fill="white" opacity=".9"/>

    <circle cx="182" cy="184" r="13" fill="white" stroke="#080810" stroke-width="2"/>
    <circle cx="182" cy="184" r="8" fill="#080810"/>
    <circle cx="185" cy="181" r="3" fill="white" opacity=".9"/>

    <!-- Wide dog snout -->
    <path d="M136,204 C138,218 148,226 158,226 C168,226 178,218 180,204Z"
      fill="url(#tanuki-belly)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Nose -->
    <ellipse cx="152" cy="215" rx="6" ry="5" fill="#8B5E14" opacity=".7"/>
    <ellipse cx="164" cy="215" rx="6" ry="5" fill="#8B5E14" opacity=".7"/>
    <!-- Smile -->
    <path d="M144,222 C150,230 166,230 172,222" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Whiskers -->
    <line x1="96"  y1="208" x2="132" y2="210" stroke="#080810" stroke-width="1.4" opacity=".35"/>
    <line x1="92"  y1="216" x2="130" y2="215" stroke="#080810" stroke-width="1.2" opacity=".25"/>
    <line x1="220" y1="208" x2="184" y2="210" stroke="#080810" stroke-width="1.4" opacity=".35"/>
    <line x1="224" y1="216" x2="186" y2="215" stroke="#080810" stroke-width="1.2" opacity=".25"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="koi-body" cx="38%" cy="35%" r="68%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#e8e0d0"/>
    </radialGradient>
    <radialGradient id="koi-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E84000" stop-opacity=".28"/>
      <stop offset="100%" stop-color="#E84000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="355" rx="80" ry="8" fill="rgba(0,0,0,.08)"/>
  <ellipse class="char-aura" cx="160" cy="210" rx="115" ry="88" fill="url(#koi-aura)"/>

  <g class="koi-swim">

    <!-- Tail fin (forked, flowing) -->
    <path d="M264,178 C290,145 298,108 288,90 C275,118 268,148 264,168 M264,178 C290,210 298,248 288,268 C275,240 268,210 264,188Z"
      fill="#E84000" stroke="#080810" stroke-width="2.5" stroke-linejoin="round" opacity=".85"/>
    <!-- Tail fin inner lines -->
    <path d="M280,100 C274,125 270,152 266,172" stroke="#080810" stroke-width="1" fill="none" stroke-linecap="round" opacity=".3"/>
    <path d="M280,256 C274,233 270,208 266,188" stroke="#080810" stroke-width="1" fill="none" stroke-linecap="round" opacity=".3"/>

    <!-- Main body (elongated S-curve fish) -->
    <path d="M80,178 C80,128 112,98 160,98 C204,98 258,118 264,178 C258,238 204,258 160,258 C112,258 80,228 80,178Z"
      fill="url(#koi-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

    <!-- Scale pattern (arcing lines) -->
    <path d="M108,130 C124,122 158,120 178,128" stroke="#080810" stroke-width="1.2" fill="none" opacity=".15"/>
    <path d="M98,152 C118,142 158,140 182,148" stroke="#080810" stroke-width="1.2" fill="none" opacity=".15"/>
    <path d="M94,175 C116,165 158,163 186,170" stroke="#080810" stroke-width="1.2" fill="none" opacity=".15"/>
    <path d="M96,198 C118,190 158,188 184,195" stroke="#080810" stroke-width="1.2" fill="none" opacity=".14"/>
    <path d="M102,220 C122,213 158,211 180,217" stroke="#080810" stroke-width="1.2" fill="none" opacity=".13"/>

    <!-- Orange accent patches -->
    <path d="M130,132 C140,122 172,122 182,132 C172,142 140,142 130,132Z" fill="#E84000" opacity=".5"/>
    <path d="M108,168 C118,158 142,158 150,168 C142,178 118,178 108,168Z" fill="#E84000" opacity=".4"/>
    <path d="M175,195 C185,185 210,185 218,195 C210,205 185,205 175,195Z" fill="#E84000" opacity=".4"/>

    <!-- Dorsal fin -->
    <g class="koi-fin">
      <path d="M130,100 C125,72 135,52 142,46 C144,62 142,82 138,98Z"
        fill="url(#koi-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M152,99 C150,70 158,50 163,46 C164,62 162,82 158,97Z"
        fill="url(#koi-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M172,101 C174,74 182,56 188,52 C186,68 182,88 176,101Z"
        fill="url(#koi-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    </g>

    <!-- Pectoral fin (top) -->
    <g class="koi-fin" style="animation-delay:-.4s">
      <path d="M148,120 C128,96 110,86 98,90 C112,104 130,115 145,122Z"
        fill="#E84000" stroke="#080810" stroke-width="2" stroke-linejoin="round" opacity=".75"/>
    </g>
    <!-- Pectoral fin (bottom) -->
    <g class="koi-fin" style="animation-delay:-.8s">
      <path d="M148,236 C128,260 110,270 98,266 C112,252 130,241 145,234Z"
        fill="#E84000" stroke="#080810" stroke-width="2" stroke-linejoin="round" opacity=".75"/>
    </g>

    <!-- Anal fin -->
    <path d="M198,246 C212,264 224,270 232,264 C220,254 208,248 200,244Z"
      fill="#E84000" stroke="#080810" stroke-width="1.8" opacity=".65"/>

    <!-- Head -->
    <ellipse cx="106" cy="178" rx="36" ry="46" fill="url(#koi-body)" stroke="#080810" stroke-width="3.5"/>

    <!-- Eye -->
    <circle cx="96" cy="165" r="12" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="96" cy="165" r="7" fill="#E84000"/>
    <circle cx="99" cy="162" r="2.5" fill="white" opacity=".9"/>

    <!-- Mouth (pursed) -->
    <path d="M76,186 C82,192 94,192 98,186" stroke="#080810" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- Barbels -->
    <path d="M78,189 C72,198 72,208 76,214" stroke="#080810" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".5"/>
    <path d="M86,190 C82,200 83,210 88,215" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".4"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="kappa-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#d8f0d8"/>
      <stop offset="100%" stop-color="#a8cca8"/>
    </radialGradient>
    <radialGradient id="kappa-shell" cx="35%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#c8e8c0"/>
      <stop offset="100%" stop-color="#88b880"/>
    </radialGradient>
    <radialGradient id="kappa-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2E7D52" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#2E7D52" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="360" rx="62" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="240" rx="86" ry="80" fill="url(#kappa-aura)"/>

  <g class="char-float">

    <!-- Turtle shell (visible as ring around body, from front) -->
    <ellipse cx="160" cy="258" rx="74" ry="70" fill="url(#kappa-shell)" stroke="#080810" stroke-width="4"/>
    <!-- Shell pattern -->
    <ellipse cx="160" cy="258" rx="54" ry="52" fill="none" stroke="#2E7D52" stroke-width="1.8" opacity=".45"/>
    <path d="M106,258 L214,258" stroke="#2E7D52" stroke-width="1.2" opacity=".35"/>
    <path d="M160,204 L160,312" stroke="#2E7D52" stroke-width="1.2" opacity=".35"/>
    <path d="M118,218 L202,298" stroke="#2E7D52" stroke-width="1" opacity=".25"/>
    <path d="M202,218 L118,298" stroke="#2E7D52" stroke-width="1" opacity=".25"/>

    <!-- Body (sits inside/in front of shell) -->
    <g class="char-body">
      <ellipse cx="160" cy="252" rx="54" ry="62" fill="url(#kappa-body)" stroke="#080810" stroke-width="3.5"/>

      <!-- Belly plate -->
      <ellipse cx="160" cy="258" rx="34" ry="46" fill="#c8f0c0" stroke="#080810" stroke-width="2" opacity=".6"/>

      <!-- Crossed legs (seated) -->
      <path d="M106,300 C88,308 76,324 82,336 C90,326 100,316 108,312Z"
        fill="url(#kappa-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Webbed foot left -->
      <path d="M82,336 C74,342 72,350 78,354 C82,348 85,340 86,336Z" fill="url(#kappa-body)" stroke="#080810" stroke-width="2"/>
      <path d="M86,336 C80,344 80,352 86,354 C88,347 88,340 88,336Z" fill="url(#kappa-body)" stroke="#080810" stroke-width="2"/>
      <path d="M90,335 C86,344 87,352 93,353 C93,347 92,340 90,335Z" fill="url(#kappa-body)" stroke="#080810" stroke-width="1.8"/>

      <path d="M214,300 C232,308 244,324 238,336 C230,326 220,316 212,312Z"
        fill="url(#kappa-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Webbed foot right -->
      <path d="M238,336 C246,342 248,350 242,354 C238,348 235,340 234,336Z" fill="url(#kappa-body)" stroke="#080810" stroke-width="2"/>
      <path d="M234,336 C240,344 240,352 234,354 C232,347 232,340 232,336Z" fill="url(#kappa-body)" stroke="#080810" stroke-width="2"/>
      <path d="M230,335 C234,344 233,352 227,353 C227,347 228,340 230,335Z" fill="url(#kappa-body)" stroke="#080810" stroke-width="1.8"/>

      <!-- Webbed hands (open, spread) -->
      <path d="M106,238 C88,228 76,234 74,248 C82,241 92,237 102,242Z"
        fill="url(#kappa-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M74,248 L66,258 M78,252 L72,262 M84,255 L80,265" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M214,238 C232,228 244,234 246,248 C238,241 228,237 218,242Z"
        fill="url(#kappa-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M246,248 L254,258 M242,252 L248,262 M236,255 L240,265" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Head -->
    <circle cx="160" cy="178" r="52" fill="url(#kappa-body)" stroke="#080810" stroke-width="4"/>

    <!-- Water dish on head -->
    <ellipse cx="160" cy="134" rx="40" ry="14" fill="#2E7D52" opacity=".3" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="160" cy="134" rx="28" ry="8" fill="#2E7D52" opacity=".4"/>
    <!-- Water surface shimmer -->
    <path d="M144,131 C150,128 170,128 176,131" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M148,135 C154,132 166,132 172,135" stroke="white" stroke-width="1" fill="none" stroke-linecap="round" opacity=".5"/>

    <!-- Eyes (wide, expressive) -->
    <ellipse cx="136" cy="172" rx="20" ry="18" fill="white" stroke="#080810" stroke-width="3"/>
    <circle cx="136" cy="172" r="12" fill="#2E7D52"/>
    <circle cx="140" cy="168" r="4.5" fill="white" opacity=".9"/>
    <circle cx="132" cy="177" r="2" fill="white" opacity=".5"/>

    <ellipse cx="184" cy="172" rx="20" ry="18" fill="white" stroke="#080810" stroke-width="3"/>
    <circle cx="184" cy="172" r="12" fill="#2E7D52"/>
    <circle cx="188" cy="168" r="4.5" fill="white" opacity=".9"/>
    <circle cx="180" cy="177" r="2" fill="white" opacity=".5"/>

    <!-- Beak (prominent, forward-pointing) -->
    <path d="M144,192 C148,200 172,200 176,192 L178,212 C172,220 148,220 142,212Z"
      fill="#2E7D52" stroke="#080810" stroke-width="2.5" stroke-linejoin="round" opacity=".9"/>
    <path d="M144,194 L176,194" stroke="#080810" stroke-width="1.5" opacity=".4"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="kodama-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#eae8de"/>
    </radialGradient>
    <radialGradient id="kodama-sm" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e8e8dc"/>
    </radialGradient>
    <radialGradient id="kodama-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7AAE3E" stop-opacity=".28"/>
      <stop offset="100%" stop-color="#7AAE3E" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="148" cy="358" rx="42" ry="6" fill="rgba(0,0,0,.07)"/>
  <ellipse cx="228" cy="348" rx="24" ry="5" fill="rgba(0,0,0,.06)"/>
  <ellipse class="char-aura" cx="168" cy="240" rx="88" ry="80" fill="url(#kodama-aura)"/>

  <!-- Floating leaves -->
  <g class="wisp-trail">
    <path d="M88,180 C82,170 86,160 94,162 C98,170 96,179 88,180Z" fill="#7AAE3E" opacity=".55"/>
    <path d="M245,195 C251,183 259,179 263,185 C259,197 251,201 245,195Z" fill="#7AAE3E" opacity=".45"/>
    <path d="M108,130 C104,120 108,112 115,114 C118,122 116,130 108,130Z" fill="#7AAE3E" opacity=".4"/>
    <path d="M225,148 C231,138 239,136 242,142 C238,152 230,154 225,148Z" fill="#7AAE3E" opacity=".38"/>
    <path d="M72,240 C68,232 71,224 78,226 C80,234 78,242 72,240Z" fill="#7AAE3E" opacity=".3"/>
  </g>

  <!-- Small kodama (right, behind/beside) -->
  <g style="transform: translate(72px, 28px)">
    <g class="wisp-bob" style="animation-delay:-.9s; animation-duration:4.2s">
      <!-- Small body -->
      <ellipse cx="228" cy="288" rx="28" ry="26" fill="url(#kodama-sm)" stroke="#080810" stroke-width="3"/>
      <!-- Small head -->
      <ellipse cx="228" cy="258" rx="26" ry="28" fill="url(#kodama-sm)" stroke="#080810" stroke-width="3"/>
      <!-- Small face -->
      <circle cx="220" cy="254" r="3.5" fill="#080810" opacity=".65"/>
      <circle cx="236" cy="254" r="3.5" fill="#080810" opacity=".65"/>
      <circle cx="221" cy="253" r="1.2" fill="white" opacity=".6"/>
      <circle cx="237" cy="253" r="1.2" fill="white" opacity=".6"/>
      <path d="M222,264 C225,268 231,268 234,264" stroke="#080810" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".5"/>
      <!-- Tiny leaf sprout -->
      <path d="M228,232 C226,222 218,216 215,210 C221,210 230,216 232,224 C233,216 240,210 246,212 C243,220 234,225 228,232Z"
        fill="#7AAE3E" stroke="#080810" stroke-width="1.8" stroke-linejoin="round" opacity=".8"/>
      <!-- Tiny stick arms -->
      <line x1="202" y1="284" x2="216" y2="278" stroke="#080810" stroke-width="2.5" stroke-linecap="round" opacity=".5"/>
      <line x1="254" y1="284" x2="240" y2="278" stroke="#080810" stroke-width="2.5" stroke-linecap="round" opacity=".5"/>
    </g>
  </g>

  <!-- Big kodama (left, front) -->
  <g class="wisp-bob">
    <!-- Body -->
    <ellipse cx="138" cy="298" rx="46" ry="44" fill="url(#kodama-body)" stroke="#080810" stroke-width="3.5"/>

    <!-- Stick arms (slightly raised) -->
    <line x1="92"  y1="292" x2="116" y2="282" stroke="#080810" stroke-width="3" stroke-linecap="round" opacity=".55"/>
    <line x1="184" y1="292" x2="160" y2="282" stroke="#080810" stroke-width="3" stroke-linecap="round" opacity=".55"/>
    <!-- Tiny hands -->
    <circle cx="90"  cy="291" r="4" fill="url(#kodama-body)" stroke="#080810" stroke-width="2"/>
    <circle cx="186" cy="291" r="4" fill="url(#kodama-body)" stroke="#080810" stroke-width="2"/>

    <!-- Stick legs -->
    <line x1="122" y1="340" x2="116" y2="362" stroke="#080810" stroke-width="3" stroke-linecap="round" opacity=".5"/>
    <line x1="154" y1="342" x2="160" y2="364" stroke="#080810" stroke-width="3" stroke-linecap="round" opacity=".5"/>

    <!-- Head (bigger, rounder) -->
    <ellipse cx="138" cy="240" rx="52" ry="56" fill="url(#kodama-body)" stroke="#080810" stroke-width="4"/>

    <!-- Head leaf/branch sprout -->
    <path d="M138,186 C135,172 124,162 120,152 C128,152 140,160 143,173 C146,160 158,152 165,155 C160,166 148,174 138,186Z"
      fill="#7AAE3E" stroke="#080810" stroke-width="2.2" stroke-linejoin="round" opacity=".85"/>

    <!-- Face: expressive dot eyes + smile -->
    <circle cx="120" cy="234" r="7" fill="#080810" opacity=".7"/>
    <circle cx="156" cy="234" r="7" fill="#080810" opacity=".7"/>
    <!-- Eye gleam -->
    <circle cx="122" cy="232" r="2.5" fill="white" opacity=".7"/>
    <circle cx="158" cy="232" r="2.5" fill="white" opacity=".7"/>
    <!-- Smile (slightly wider) -->
    <path d="M118,256 C126,264 150,264 158,256" stroke="#080810" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".55"/>
    <!-- Rosy cheeks -->
    <ellipse cx="108" cy="248" rx="10" ry="7" fill="#7AAE3E" opacity=".18"/>
    <ellipse cx="168" cy="248" rx="10" ry="7" fill="#7AAE3E" opacity=".18"/>

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
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="oni-face" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#f8d8d8"/>
      <stop offset="100%" stop-color="#e0a8a8"/>
    </radialGradient>
    <radialGradient id="oni-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#C41C1C" stop-opacity=".28"/>
      <stop offset="100%" stop-color="#C41C1C" stop-opacity="0"/>
    </radialGradient>
    <filter id="oni-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse cx="160" cy="362" rx="58" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="220" rx="105" ry="98" fill="url(#oni-aura)"/>

  <g class="char-float">

    <!-- Wild hair mass (behind everything) -->
    <path d="M68,160 C58,120 68,80 88,60 C85,90 85,120 90,145Z" fill="#080810" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M95,140 C88,100 96,65 112,48 C112,78 112,110 115,136Z" fill="#080810" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M120,130 C118,90 128,58 142,44 C144,74 144,104 143,128Z" fill="#080810" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M200,130 C202,90 192,58 178,44 C176,74 176,104 177,128Z" fill="#080810" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M225,140 C232,100 224,65 208,48 C208,78 208,110 205,136Z" fill="#080810" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M252,160 C262,120 252,80 232,60 C235,90 235,120 230,145Z" fill="#080810" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>

    <!-- HORNS (very prominent) -->
    <path d="M118,128 L94,52 L148,116Z"
      fill="#C41C1C" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M122,126 L102,65 L144,116Z" fill="#080810" opacity=".18"/>
    <path d="M202,128 L226,52 L172,116Z"
      fill="#C41C1C" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M198,126 L218,65 L176,116Z" fill="#080810" opacity=".18"/>

    <!-- Big face (takes up most of card) -->
    <ellipse cx="160" cy="218" rx="100" ry="108" fill="url(#oni-face)" stroke="#080810" stroke-width="5"/>
    <!-- Red skin overlay -->
    <ellipse cx="160" cy="218" rx="100" ry="108" fill="#C41C1C" opacity=".22"/>

    <!-- Strong brow ridges -->
    <path d="M90,170 L136,158" stroke="#080810" stroke-width="5" stroke-linecap="round"/>
    <path d="M230,170 L184,158" stroke="#080810" stroke-width="5" stroke-linecap="round"/>

    <!-- Eyes (fierce, angular) -->
    <path d="M90,180 L140,172 L140,196 L90,196Z" fill="white" stroke="#080810" stroke-width="3"/>
    <ellipse cx="118" cy="186" rx="14" ry="12" fill="#C41C1C" filter="url(#oni-glow)"/>
    <circle cx="118" cy="186" r="8" fill="#080810"/>
    <circle cx="122" cy="182" r="3" fill="white" opacity=".9"/>

    <path d="M180,172 L230,180 L230,196 L180,196Z" fill="white" stroke="#080810" stroke-width="3"/>
    <ellipse cx="202" cy="186" rx="14" ry="12" fill="#C41C1C" filter="url(#oni-glow)"/>
    <circle cx="202" cy="186" r="8" fill="#080810"/>
    <circle cx="206" cy="182" r="3" fill="white" opacity=".9"/>

    <!-- Nose (broad, flat) -->
    <path d="M144,218 L176,218 L172,232 L148,232Z" fill="#c08080" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="150" cy="226" r="5" fill="#080810" opacity=".4"/>
    <circle cx="170" cy="226" r="5" fill="#080810" opacity=".4"/>

    <!-- MASSIVE FANGED GRIN -->
    <path d="M88,256 C104,288 136,305 160,305 C184,305 216,288 232,256 C218,248 202,244 190,248 L184,262 L174,244 C168,242 152,242 146,244 L136,262 L130,248 C118,244 102,248 88,256Z"
      fill="#080810"/>
    <!-- Fangs (white) -->
    <path d="M122,256 L116,276" stroke="white" stroke-width="5" stroke-linecap="round"/>
    <path d="M140,252 L136,272" stroke="white" stroke-width="4" stroke-linecap="round"/>
    <path d="M198,256 L204,276" stroke="white" stroke-width="5" stroke-linecap="round"/>
    <path d="M180,252 L184,272" stroke="white" stroke-width="4" stroke-linecap="round"/>
    <!-- Tongue -->
    <path d="M146,270 C148,284 160,290 174,270" fill="#C41C1C" stroke="#080810" stroke-width="1.5" stroke-linejoin="round" opacity=".9"/>

    <!-- Cheek blush (demon style) -->
    <ellipse cx="94"  cy="222" rx="22" ry="14" fill="#C41C1C" opacity=".2"/>
    <ellipse cx="226" cy="222" rx="22" ry="14" fill="#C41C1C" opacity=".2"/>

    <!-- Body (stocky, below face) -->
    <path d="M80,318 C80,300 112,288 160,288 C208,288 240,300 240,318 C240,340 215,360 160,360 C105,360 80,340 80,318Z"
      fill="url(#oni-face)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>
    <ellipse cx="160" cy="318" rx="48" ry="34" fill="#C41C1C" opacity=".15"/>

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
    accentColor: '#6944CC',
    region: 'japanese',
    lore: 'A chimeric spirit that devours nightmares, leaving only the sweetest dreams behind.',
    haiku: '悪夢を食らう<br>朝の光の前に<br>獏は消えゆく',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="baku-body" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#f0eef8"/>
      <stop offset="100%" stop-color="#d0cce0"/>
    </radialGradient>
    <radialGradient id="baku-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#6944CC" stop-opacity=".35"/>
      <stop offset="100%" stop-color="#6944CC" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="360" rx="64" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="235" rx="95" ry="85" fill="url(#baku-aura)"/>

  <!-- Dream wisps floating around -->
  <g class="baku-drift">
    <circle cx="90"  cy="160" r="8"  fill="#6944CC" opacity=".22"/>
    <circle cx="235" cy="178" r="6"  fill="#6944CC" opacity=".18"/>
    <circle cx="100" cy="290" r="5"  fill="#6944CC" opacity=".15"/>
    <circle cx="226" cy="308" r="7"  fill="#6944CC" opacity=".2"/>
    <circle cx="148" cy="88"  r="5"  fill="#6944CC" opacity=".18"/>
    <circle cx="182" cy="78"  r="4"  fill="#9966ff" opacity=".2"/>
  </g>

  <g class="char-body">
    <!-- Tiger-stripe legs (bear paws) -->
    <path d="M118,302 L108,348 C102,354 96,354 94,348 C100,342 104,336 106,328Z"
      fill="url(#baku-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M202,302 L212,348 C218,354 224,354 226,348 C220,342 216,336 214,328Z"
      fill="url(#baku-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <!-- Stripe marks on legs -->
    <path d="M108,320 C112,316 118,315 122,318" stroke="#6944CC" stroke-width="1.5" fill="none" opacity=".4"/>
    <path d="M210,320 C206,316 200,315 196,318" stroke="#6944CC" stroke-width="1.5" fill="none" opacity=".4"/>

    <!-- Main body -->
    <ellipse cx="160" cy="262" rx="70" ry="72" fill="url(#baku-body)" stroke="#080810" stroke-width="4"/>

    <!-- Tiger stripes on body -->
    <path d="M98,242 C106,232 118,230 128,236" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round" opacity=".2"/>
    <path d="M94,262 C104,252 118,250 130,256" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round" opacity=".18"/>
    <path d="M222,242 C214,232 202,230 192,236" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round" opacity=".2"/>

    <!-- Ox tail -->
    <path d="M226,268 C250,258 262,238 252,218 C244,200 228,198 222,212 C230,208 240,216 238,232 C236,244 228,254 226,268Z"
      fill="url(#baku-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M248,222 C244,214 236,212 232,218" stroke="#080810" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".3"/>
  </g>

  <!-- Head with elephant trunk -->
  <g class="char-float">
    <circle cx="160" cy="178" r="56" fill="url(#baku-body)" stroke="#080810" stroke-width="4"/>
    <!-- Purple dream shimmer -->
    <circle cx="160" cy="178" r="56" fill="#6944CC" opacity=".08"/>

    <!-- Ears (large, tapir-like) -->
    <path d="M112,148 C90,130 80,108 92,92 C104,104 110,128 112,148Z"
      fill="url(#baku-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M112,146 C96,130 90,112 98,98 C106,108 110,128 112,146Z" fill="#6944CC" opacity=".3"/>
    <path d="M208,148 C230,130 240,108 228,92 C216,104 210,128 208,148Z"
      fill="url(#baku-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M208,146 C224,130 230,112 222,98 C214,108 210,128 208,146Z" fill="#6944CC" opacity=".3"/>

    <!-- Trunk (elephant-like, curled at tip) -->
    <path d="M160,210 C148,218 138,232 136,248 C134,262 140,272 148,268 C142,260 140,250 144,240 C148,230 156,222 160,218Z"
      fill="url(#baku-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M148,268 C144,274 148,280 155,278 C149,275 148,270 150,266Z"
      fill="url(#baku-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- Eyes (dreamy, half-lidded) -->
    <path d="M126,166 C126,156 136,150 146,150 C156,150 164,156 164,166 C164,172 158,176 146,176 C136,176 126,172 126,166Z"
      fill="white" stroke="#080810" stroke-width="2.5"/>
    <!-- Heavy eyelid -->
    <path d="M126,163 C136,158 156,158 164,163" stroke="#080810" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="146" cy="166" r="7" fill="#6944CC"/>
    <circle cx="149" cy="163" r="2.5" fill="white" opacity=".9"/>

    <path d="M156,166 C156,156 166,150 176,150 C186,150 194,156 194,166 C194,172 188,176 176,176 C166,176 156,172 156,166Z"
      fill="white" stroke="#080810" stroke-width="2.5"/>
    <path d="M156,163 C166,158 186,158 194,163" stroke="#080810" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="176" cy="166" r="7" fill="#6944CC"/>
    <circle cx="179" cy="163" r="2.5" fill="white" opacity=".9"/>

    <!-- Dream spiral on forehead -->
    <path d="M158,132 C160,126 165,124 168,128 C171,132 169,138 165,140 C162,142 159,140 158,137 C157,134 159,131 161,132"
      stroke="#6944CC" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
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
    accentColor: '#F5A000',
    region: 'japanese',
    lore: 'A wolf pup born inside a thundercloud, whose howl calls lightning from a clear sky.',
    haiku: '雷鳴の子よ<br>空を引き裂く牙で<br>嵐を呼ぶ狼',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="rwolf-body" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#ccc8be"/>
    </radialGradient>
    <radialGradient id="rwolf-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F5A000" stop-opacity=".45"/>
      <stop offset="60%" stop-color="#F5A000" stop-opacity=".18"/>
      <stop offset="100%" stop-color="#F5A000" stop-opacity="0"/>
    </radialGradient>
    <filter id="rwolf-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <ellipse cx="160" cy="362" rx="62" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="220" rx="108" ry="98" fill="url(#rwolf-aura)"/>

  <!-- Lightning bolts orbiting -->
  <g class="bolt" filter="url(#rwolf-glow)">
    <path d="M72,148 L82,128 L78,138 L90,118" stroke="#F5A000" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <g class="bolt-2" filter="url(#rwolf-glow)">
    <path d="M248,148 L238,128 L242,138 L230,118" stroke="#F5A000" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <g class="bolt-3" filter="url(#rwolf-glow)">
    <path d="M162,58 L155,42 L158,52 L150,36" stroke="#F5A000" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <g class="char-float">

    <!-- Tail (raised, electric tip) -->
    <path d="M215,272 C248,252 268,222 260,192 C252,165 228,162 212,180 C222,176 236,188 232,208 C228,226 216,244 215,272Z"
      fill="url(#rwolf-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <g filter="url(#rwolf-glow)">
      <path d="M258,196 L265,182 L261,192 L270,178" stroke="#F5A000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </g>

    <!-- Body -->
    <g class="char-body">
      <ellipse cx="155" cy="262" rx="68" ry="74" fill="url(#rwolf-body)" stroke="#080810" stroke-width="4"/>
      <!-- Lightning marking on body -->
      <path d="M126,232 L136,212 L130,224 L142,204" stroke="#F5A000" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>
      <!-- Belly -->
      <ellipse cx="155" cy="270" rx="38" ry="52" fill="white" opacity=".4" stroke="#080810" stroke-width="2"/>

      <!-- Front paws -->
      <ellipse cx="108" cy="330" rx="30" ry="14" fill="url(#rwolf-body)" stroke="#080810" stroke-width="3"/>
      <path d="M86,329 L90,338" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M100,332 L102,341" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M114,332 L114,341" stroke="#080810" stroke-width="2" stroke-linecap="round"/>

      <ellipse cx="204" cy="330" rx="30" ry="14" fill="url(#rwolf-body)" stroke="#080810" stroke-width="3"/>
      <path d="M226,329 L222,338" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M212,332 L210,341" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M198,332 L198,341" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Ears -->
    <path d="M116,118 L102,72 L150,106Z" fill="url(#rwolf-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M120,114 L110,78 L146,106Z" fill="#F5A000" opacity=".7"/>
    <path d="M204,118 L218,72 L170,106Z" fill="url(#rwolf-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M200,114 L210,78 L174,106Z" fill="#F5A000" opacity=".7"/>

    <!-- Head -->
    <circle cx="160" cy="150" r="60" fill="url(#rwolf-body)" stroke="#080810" stroke-width="4"/>

    <!-- Forehead lightning mark -->
    <g filter="url(#rwolf-glow)">
      <path d="M166,108 L156,126 L164,126 L152,148" stroke="#F5A000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M166,108 L156,126 L164,126 L152,148" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".6"/>
    </g>

    <!-- Muzzle -->
    <path d="M160,158 C145,158 134,165 134,175 C134,185 144,190 160,190 C176,190 186,185 186,175 C186,165 175,158 160,158Z"
      fill="#e8e4da" stroke="#080810" stroke-width="3"/>

    <!-- Nose -->
    <path d="M154,166 C154,162 166,162 166,166 C166,170 163,172 160,172 C157,172 154,170 154,166Z" fill="#080810"/>

    <!-- Mouth -->
    <path d="M152,176 C156,182 164,182 168,176" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Eyes (amber, glowing) -->
    <ellipse cx="134" cy="146" rx="20" ry="18" fill="white" stroke="#080810" stroke-width="3"/>
    <circle cx="134" cy="146" r="12" fill="#F5A000" filter="url(#rwolf-glow)"/>
    <path d="M134,133 C136,139 136,153 134,158 C132,153 132,139 134,133Z" fill="#080810"/>
    <circle cx="140" cy="140" r="4" fill="white" opacity=".9"/>

    <ellipse cx="186" cy="146" rx="20" ry="18" fill="white" stroke="#080810" stroke-width="3"/>
    <circle cx="186" cy="146" r="12" fill="#F5A000" filter="url(#rwolf-glow)"/>
    <path d="M186,133 C188,139 188,153 186,158 C184,153 184,139 186,133Z" fill="#080810"/>
    <circle cx="192" cy="140" r="4" fill="white" opacity=".9"/>

    <!-- Whiskers -->
    <line x1="96"  y1="170" x2="128" y2="172" stroke="#080810" stroke-width="1.5" opacity=".4"/>
    <line x1="92"  y1="179" x2="126" y2="178" stroke="#080810" stroke-width="1.3" opacity=".3"/>
    <line x1="228" y1="170" x2="192" y2="172" stroke="#080810" stroke-width="1.5" opacity=".4"/>
    <line x1="232" y1="179" x2="194" y2="178" stroke="#080810" stroke-width="1.3" opacity=".3"/>

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
    <radialGradient id="qtz-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00A854" stop-opacity=".25"/>
      <stop offset="100%" stop-color="#00A854" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="365" rx="38" ry="6" fill="rgba(0,0,0,.08)"/>
  <ellipse class="char-aura" cx="160" cy="220" rx="82" ry="110" fill="url(#qtz-aura)"/>

  <g class="char-float">

    <!-- Long tail plumes (behind everything) -->
    <path d="M148,258 C138,290 128,320 118,348 C126,355 135,352 140,345 C142,328 148,304 152,282Z"
      fill="#00A854" stroke="#080810" stroke-width="2.5" stroke-linejoin="round" opacity=".85"/>
    <path d="M160,262 C158,296 155,328 152,358 C160,362 168,362 172,358 C172,328 168,296 160,262Z"
      fill="#00A854" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M172,258 C182,290 192,320 202,348 C194,355 185,352 180,345 C178,328 172,304 168,282Z"
      fill="#00A854" stroke="#080810" stroke-width="2.5" stroke-linejoin="round" opacity=".85"/>
    <!-- Plume tips white -->
    <path d="M118,348 C122,356 132,358 140,354" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/>
    <path d="M202,348 C198,356 188,358 180,354" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/>

    <!-- Wings -->
    <g class="wing-soar">
      <path d="M102,172 C74,158 52,170 48,190 C60,182 76,178 90,182 C78,196 72,212 82,222 C88,208 96,194 102,186Z"
        fill="url(#qtz-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M218,172 C246,158 268,170 272,190 C260,182 244,178 230,182 C242,196 248,212 238,222 C232,208 224,194 218,186Z"
        fill="url(#qtz-body)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    </g>

    <!-- Body -->
    <path d="M160,148 C130,148 108,168 108,202 C108,236 128,262 160,262 C192,262 212,236 212,202 C212,168 190,148 160,148Z"
      fill="url(#qtz-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>

    <!-- Breast (white/cream) -->
    <ellipse cx="160" cy="210" rx="32" ry="42" fill="url(#qtz-breast)" stroke="#080810" stroke-width="2"/>

    <!-- Crest -->
    <path d="M148,110 C142,92 144,76 150,68 C154,80 154,96 152,110Z" fill="#00A854" stroke="#080810" stroke-width="2" opacity=".9"/>
    <path d="M160,106 C158,86 162,70 165,62 C168,74 168,90 164,106Z" fill="#00A854" stroke="#080810" stroke-width="2"/>
    <path d="M172,110 C178,92 176,76 170,68 C166,80 166,96 168,110Z" fill="#00A854" stroke="#080810" stroke-width="2" opacity=".9"/>

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
    accentColor: '#E65100',
    region: 'americas',
    lore: 'The shadow lord of the rainforest, who steps so softly that even leaves refuse to stir.',
    haiku: '斑点の王よ<br>密林に溶け込む<br>足音なき夜',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="jag-body" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#f5e8d0"/>
      <stop offset="100%" stop-color="#d8c8a0"/>
    </radialGradient>
    <radialGradient id="jag-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E65100" stop-opacity=".2"/>
      <stop offset="100%" stop-color="#E65100" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="360" rx="65" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="240" rx="90" ry="80" fill="url(#jag-aura)"/>

  <g class="char-float">

    <!-- Tail (long, curved) -->
    <path d="M215,265 C248,248 268,220 262,192 C255,165 234,160 218,176 C228,172 240,184 236,202 C232,218 220,236 215,265Z"
      fill="url(#jag-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <!-- Tail spots -->
    <circle cx="244" cy="194" r="5" fill="#080810" opacity=".35"/>
    <circle cx="238" cy="212" r="4" fill="#080810" opacity=".3"/>
    <path d="M260,190 L262,182 L258,186Z" fill="#080810" opacity=".2"/>

    <!-- Body -->
    <g class="char-body">
      <ellipse cx="155" cy="258" rx="70" ry="74" fill="url(#jag-body)" stroke="#080810" stroke-width="4"/>

      <!-- Rosette spots on body -->
      <g class="spot-anim">
        <path d="M112,230 C116,222 126,220 132,226 C130,234 120,236 112,230Z" fill="none" stroke="#080810" stroke-width="1.8" opacity=".5"/>
        <circle cx="122" cy="228" r="3" fill="#080810" opacity=".4"/>
        <path d="M188,222 C194,214 204,214 208,220 C206,228 196,230 188,222Z" fill="none" stroke="#080810" stroke-width="1.8" opacity=".5"/>
        <circle cx="198" cy="220" r="3" fill="#080810" opacity=".4"/>
        <path d="M134,270 C138,262 148,260 154,266 C152,274 142,276 134,270Z" fill="none" stroke="#080810" stroke-width="1.8" opacity=".45"/>
        <circle cx="144" cy="268" r="2.5" fill="#080810" opacity=".35"/>
        <path d="M170,260 C174,252 184,250 190,256 C188,264 178,266 170,260Z" fill="none" stroke="#080810" stroke-width="1.8" opacity=".45"/>
        <circle cx="180" cy="258" r="2.5" fill="#080810" opacity=".35"/>
      </g>

      <!-- Paws -->
      <ellipse cx="108" cy="328" rx="30" ry="14" fill="url(#jag-body)" stroke="#080810" stroke-width="3"/>
      <path d="M86,326 L90,336" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M100,330 L102,340" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M114,330 L114,340" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="204" cy="328" rx="30" ry="14" fill="url(#jag-body)" stroke="#080810" stroke-width="3"/>
      <path d="M226,326 L222,336" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M212,330 L210,340" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M198,330 L198,340" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Ears -->
    <path d="M118,136 L105,98 L148,124Z" fill="url(#jag-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M121,133 L112,106 L144,124Z" fill="#E65100" opacity=".5"/>
    <path d="M202,136 L215,98 L172,124Z" fill="url(#jag-body)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M199,133 L208,106 L176,124Z" fill="#E65100" opacity=".5"/>

    <!-- Head -->
    <circle cx="160" cy="164" r="58" fill="url(#jag-body)" stroke="#080810" stroke-width="4"/>

    <!-- Face spots/rosettes -->
    <circle cx="130" cy="178" r="4" fill="#080810" opacity=".3"/>
    <circle cx="190" cy="178" r="4" fill="#080810" opacity=".3"/>
    <g class="spot-anim">
      <circle cx="118" cy="158" r="5" fill="none" stroke="#080810" stroke-width="1.5" opacity=".35"/>
      <circle cx="202" cy="158" r="5" fill="none" stroke="#080810" stroke-width="1.5" opacity=".35"/>
    </g>

    <!-- Eyes (fierce orange) -->
    <ellipse cx="134" cy="152" rx="20" ry="18" fill="white" stroke="#080810" stroke-width="3"/>
    <circle cx="134" cy="152" r="12" fill="#E65100"/>
    <path d="M134,140 C136,146 136,158 134,163 C132,158 132,146 134,140Z" fill="#080810"/>
    <circle cx="140" cy="146" r="4" fill="white" opacity=".9"/>

    <ellipse cx="186" cy="152" rx="20" ry="18" fill="white" stroke="#080810" stroke-width="3"/>
    <circle cx="186" cy="152" r="12" fill="#E65100"/>
    <path d="M186,140 C188,146 188,158 186,163 C184,158 184,146 186,140Z" fill="#080810"/>
    <circle cx="192" cy="146" r="4" fill="white" opacity=".9"/>

    <!-- Muzzle -->
    <path d="M160,166 C145,166 134,174 134,184 C134,194 144,200 160,200 C176,200 186,194 186,184 C186,174 175,166 160,166Z"
      fill="#e8d8b0" stroke="#080810" stroke-width="3"/>
    <path d="M154,174 L166,174 L160,180Z" fill="#080810" opacity=".7"/>
    <path d="M152,182 C156,188 164,188 168,182" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Whiskers -->
    <line x1="95"  y1="182" x2="128" y2="184" stroke="#080810" stroke-width="1.5" opacity=".4"/>
    <line x1="92"  y1="190" x2="126" y2="190" stroke="#080810" stroke-width="1.3" opacity=".3"/>
    <line x1="225" y1="182" x2="192" y2="184" stroke="#080810" stroke-width="1.5" opacity=".4"/>
    <line x1="228" y1="190" x2="194" y2="190" stroke="#080810" stroke-width="1.3" opacity=".3"/>

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
    accentColor: '#D4827A',
    region: 'americas',
    lore: 'A fluffy mountain companion who spits at problems and carries burdens without complaint.',
    haiku: '高地の道を<br>荷を担い歩む<br>リャマの誇り',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="llama-body" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#fefcf5"/>
      <stop offset="100%" stop-color="#e0dace"/>
    </radialGradient>
    <radialGradient id="llama-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#D4827A" stop-opacity=".2"/>
      <stop offset="100%" stop-color="#D4827A" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="364" rx="58" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="250" rx="82" ry="85" fill="url(#llama-aura)"/>

  <g class="char-float">

    <!-- Body (fluffy, rectangular) -->
    <g class="char-body">
      <path d="M98,230 C98,190 120,168 160,168 C200,168 222,190 222,230 C222,272 205,305 160,305 C115,305 98,272 98,230Z"
        fill="url(#llama-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>
      <!-- Fluffy texture -->
      <path d="M106,218 C112,208 120,205 128,210" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".15"/>
      <path d="M104,238 C112,228 122,225 132,230" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".13"/>
      <path d="M214,218 C208,208 200,205 192,210" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".15"/>
      <path d="M216,238 C208,228 198,225 188,230" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".13"/>

      <!-- Legs (long, slender) -->
      <rect x="122" y="298" width="18" height="64" rx="8" fill="url(#llama-body)" stroke="#080810" stroke-width="3"/>
      <rect x="148" y="298" width="18" height="64" rx="8" fill="url(#llama-body)" stroke="#080810" stroke-width="3"/>
      <rect x="154" y="298" width="18" height="64" rx="8" fill="url(#llama-body)" stroke="#080810" stroke-width="3"/>
      <rect x="180" y="298" width="18" height="64" rx="8" fill="url(#llama-body)" stroke="#080810" stroke-width="3"/>
      <!-- Hooves -->
      <rect x="122" y="354" width="18" height="10" rx="5" fill="#080810" opacity=".7"/>
      <rect x="148" y="354" width="18" height="10" rx="5" fill="#080810" opacity=".7"/>
      <rect x="154" y="354" width="18" height="10" rx="5" fill="#080810" opacity=".7"/>
      <rect x="180" y="354" width="18" height="10" rx="5" fill="#080810" opacity=".7"/>
    </g>

    <!-- Long neck -->
    <g class="neck-sway">
      <path d="M140,170 C136,145 138,118 142,96 C148,100 160,102 172,100 C176,122 174,148 170,170Z"
        fill="url(#llama-body)" stroke="#080810" stroke-width="4" stroke-linejoin="round"/>
      <!-- Neck fluff -->
      <path d="M140,150 C136,140 136,128 140,118" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".15"/>
      <path d="M170,150 C174,140 174,128 170,118" stroke="#080810" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".15"/>
    </g>

    <!-- Head -->
    <ellipse cx="158" cy="90" rx="36" ry="42" fill="url(#llama-body)" stroke="#080810" stroke-width="4"/>

    <!-- Banana ears -->
    <path d="M133,68 L122,38 L145,62Z" fill="url(#llama-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M135,66 L127,44 L143,63Z" fill="#D4827A" opacity=".55"/>
    <path d="M183,68 L194,38 L171,62Z" fill="url(#llama-body)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
    <path d="M181,66 L189,44 L173,63Z" fill="#D4827A" opacity=".55"/>

    <!-- Eyes (gentle) -->
    <ellipse cx="140" cy="85" rx="14" ry="13" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="140" cy="86" r="8" fill="#080810"/>
    <circle cx="143" cy="83" r="3" fill="white" opacity=".9"/>

    <ellipse cx="176" cy="85" rx="14" ry="13" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="176" cy="86" r="8" fill="#080810"/>
    <circle cx="179" cy="83" r="3" fill="white" opacity=".9"/>

    <!-- Muzzle (boxy) -->
    <path d="M140,104 C142,114 154,120 158,120 C162,120 174,114 176,104Z"
      fill="#e8d8c0" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Nostrils -->
    <circle cx="151" cy="112" r="4" fill="#D4827A" opacity=".6"/>
    <circle cx="165" cy="112" r="4" fill="#D4827A" opacity=".6"/>

    <!-- Fluffy top knot -->
    <path d="M145,52 C140,42 143,32 150,30 C153,40 152,50 148,56Z" fill="url(#llama-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M158,48 C156,36 160,26 165,26 C166,37 163,48 160,52Z" fill="url(#llama-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>
    <path d="M171,52 C176,42 173,32 166,30 C163,40 164,50 168,56Z" fill="url(#llama-body)" stroke="#080810" stroke-width="2" stroke-linejoin="round"/>

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
    accentColor: '#FFB300',
    region: 'european',
    lore: 'Half eagle, half lion — the gryphon guards what is most precious and cannot be bribed.',
    haiku: '翼と爪で<br>宝を守り抜く<br>天と地の子',
    svg: `
<svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="gryph-fore" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#f5e8cc"/>
      <stop offset="100%" stop-color="#d8c890"/>
    </radialGradient>
    <radialGradient id="gryph-hind" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#f0e4c0"/>
      <stop offset="100%" stop-color="#ccc080"/>
    </radialGradient>
    <radialGradient id="gryph-aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFB300" stop-opacity=".25"/>
      <stop offset="100%" stop-color="#FFB300" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <ellipse cx="160" cy="365" rx="66" ry="8" fill="rgba(0,0,0,.1)"/>
  <ellipse class="char-aura" cx="160" cy="240" rx="95" ry="88" fill="url(#gryph-aura)"/>

  <g class="char-float">

    <!-- Wings (folded, behind) -->
    <g class="wing-soar">
      <path d="M108,200 C82,185 60,195 52,215 C64,208 80,204 94,210 C78,225 72,248 84,260 C92,240 100,220 108,210Z"
        fill="url(#gryph-fore)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Feather detail -->
      <path d="M60,216 C70,222 82,226 92,222" stroke="#080810" stroke-width="1.2" fill="none" opacity=".3"/>
      <path d="M56,232 C68,236 80,238 90,234" stroke="#080810" stroke-width="1" fill="none" opacity=".25"/>
    </g>
    <g class="wing-soar" style="animation-delay:-.4s">
      <path d="M212,200 C238,185 260,195 268,215 C256,208 240,204 226,210 C242,225 248,248 236,260 C228,240 220,220 212,210Z"
        fill="url(#gryph-fore)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M260,216 C250,222 238,226 228,222" stroke="#080810" stroke-width="1.2" fill="none" opacity=".3"/>
      <path d="M264,232 C252,236 240,238 230,234" stroke="#080810" stroke-width="1" fill="none" opacity=".25"/>
    </g>

    <!-- Lion hindquarters -->
    <g class="char-body">
      <ellipse cx="160" cy="280" rx="68" ry="62" fill="url(#gryph-hind)" stroke="#080810" stroke-width="4"/>
      <!-- Lion tail -->
      <path d="M220,272 C248,255 262,228 250,205 C242,188 224,186 216,200 C224,196 234,207 230,222 C226,236 218,252 220,272Z"
        fill="url(#gryph-hind)" stroke="#080810" stroke-width="3" stroke-linejoin="round"/>
      <!-- Tail tuft -->
      <ellipse cx="248" cy="206" rx="10" ry="14" fill="url(#gryph-fore)" stroke="#080810" stroke-width="2.5" transform="rotate(-20,248,206)"/>

      <!-- Lion paws (back) -->
      <path d="M110,328 C96,328 84,338 84,348 C94,344 106,340 114,342Z" fill="url(#gryph-hind)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M84,348 L80,356 M90,350 L88,358 M98,351 L98,359" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
      <path d="M210,328 C224,328 236,338 236,348 C226,344 214,340 206,342Z" fill="url(#gryph-hind)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M236,348 L240,356 M230,350 L232,358 M222,351 L222,359" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Eagle body/breast -->
    <path d="M120,225 C120,192 138,172 160,172 C182,172 200,192 200,225 C200,252 184,268 160,268 C136,268 120,252 120,225Z"
      fill="url(#gryph-fore)" stroke="#080810" stroke-width="3.5" stroke-linejoin="round"/>
    <!-- Breast feather lines -->
    <path d="M134,210 C140,202 152,200 160,204" stroke="#080810" stroke-width="1.2" fill="none" opacity=".2"/>
    <path d="M130,225 C138,216 152,214 162,218" stroke="#080810" stroke-width="1.2" fill="none" opacity=".18"/>

    <!-- Eagle head -->
    <circle cx="160" cy="158" r="44" fill="url(#gryph-fore)" stroke="#080810" stroke-width="4"/>

    <!-- Crest feathers -->
    <path d="M145,118 L138,95 L150,112Z" fill="url(#gryph-fore)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M158,114 L155,90 L164,112Z" fill="url(#gryph-fore)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M171,118 L178,95 L166,112Z" fill="url(#gryph-fore)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>

    <!-- Eyes (eagle, sharp) -->
    <ellipse cx="136" cy="152" rx="17" ry="15" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="136" cy="152" r="10" fill="#FFB300"/>
    <path d="M136,142 C138,147 138,157 136,162 C134,157 134,147 136,142Z" fill="#080810"/>
    <circle cx="140" cy="147" r="3.5" fill="white" opacity=".9"/>
    <!-- Fierce brow -->
    <path d="M120,144 L148,140" stroke="#080810" stroke-width="3.5" stroke-linecap="round"/>

    <ellipse cx="184" cy="152" rx="17" ry="15" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="184" cy="152" r="10" fill="#FFB300"/>
    <path d="M184,142 C186,147 186,157 184,162 C182,157 182,147 184,142Z" fill="#080810"/>
    <circle cx="188" cy="147" r="3.5" fill="white" opacity=".9"/>
    <path d="M200,144 L172,140" stroke="#080810" stroke-width="3.5" stroke-linecap="round"/>

    <!-- Eagle beak (hooked) -->
    <path d="M147,166 C152,174 168,174 173,166 L170,182 C165,188 155,188 150,182Z"
      fill="#FFB300" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M147,168 L173,168" stroke="#080810" stroke-width="1.2" opacity=".4"/>
    <path d="M150,182 C153,188 160,190 166,186" stroke="#080810" stroke-width="2" fill="none" stroke-linecap="round"/>

    <!-- Eagle talons (front) -->
    <path d="M124,258 C112,258 100,266 100,276 C108,272 118,268 126,270Z" fill="url(#gryph-fore)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M100,276 L96,284 M106,278 L104,286 M114,279 L114,287" stroke="#080810" stroke-width="2" stroke-linecap="round"/>
    <path d="M196,258 C208,258 220,266 220,276 C212,272 202,268 194,270Z" fill="url(#gryph-fore)" stroke="#080810" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M220,276 L224,284 M214,278 L216,286 M206,279 L206,287" stroke="#080810" stroke-width="2" stroke-linecap="round"/>

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

    <!-- Eyes -->
    <circle cx="116" cy="210" r="12" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="116" cy="210" r="7" fill="#080810"/>
    <circle cx="119" cy="207" r="2.5" fill="white" opacity=".9"/>

    <circle cx="144" cy="206" r="12" fill="white" stroke="#080810" stroke-width="2.5"/>
    <circle cx="144" cy="206" r="7" fill="#080810"/>
    <circle cx="147" cy="203" r="2.5" fill="white" opacity=".9"/>

    <!-- Small ears -->
    <ellipse cx="112" cy="186" rx="13" ry="12" fill="url(#mong-body)" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="112" cy="186" rx="7" ry="6" fill="#8D6E63" opacity=".4"/>
    <ellipse cx="145" cy="182" rx="13" ry="11" fill="url(#mong-body)" stroke="#080810" stroke-width="2.5"/>
    <ellipse cx="145" cy="182" rx="7" ry="6" fill="#8D6E63" opacity=".4"/>

    <!-- Whiskers -->
    <line x1="68"  y1="222" x2="100" y2="224" stroke="#080810" stroke-width="1.4" opacity=".35"/>
    <line x1="65"  y1="230" x2="98"  y2="230" stroke="#080810" stroke-width="1.2" opacity=".25"/>

  </g>
</svg>`
  }

};

// ── RARITY ROLL ──────────────────────────────────────────────────────────────

const RARITY_WEIGHTS = [
  { rarity: 'common',    weight: 65, pool: ['shiro','tanuki','kappa','kodama','capybara','armadillo','llama','hedgehog','hare','wisp','meerkat','mongoose'] },
  { rarity: 'rare',      weight: 28, pool: ['karasu','koi','oni','baku','axolotl','quetzal','condor','jaguar','stag','gryphon','selkie'] },
  { rarity: 'legendary', weight: 7,  pool: ['kyubi','raijin_wolf','chupacabra','unicorn','wyvern'] }
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

// ── SOUND DESIGN — Web Audio synthesis, no files ──────────────────────────────
const SFX = (() => {
  let ctx = null;
  let muted = false;

  function ac() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function setMuted(val) { muted = val; }
  function isMuted()     { return muted; }

  // Unlock AudioContext on first user gesture
  function unlock() { ac(); }

  // ── Primitives ──────────────────────────────────────────────────────────────

  function tone(c, freq, type, t, dur, vol, freqEnd) {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, t + dur * 0.85);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.05);
  }

  function noise(c, t, dur, filterFreq, filterQ, vol) {
    const samples = Math.ceil(c.sampleRate * (dur + 0.05));
    const buf     = c.createBuffer(1, samples, c.sampleRate);
    const data    = buf.getChannelData(0);
    for (let i = 0; i < samples; i++) data[i] = Math.random() * 2 - 1;
    const src  = c.createBufferSource();
    src.buffer = buf;
    const filt = c.createBiquadFilter();
    filt.type            = 'bandpass';
    filt.frequency.value = filterFreq;
    filt.Q.value         = filterQ;
    const g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filt); filt.connect(g); g.connect(c.destination);
    src.start(t); src.stop(t + dur + 0.05);
  }

  // ── Hatch sounds ────────────────────────────────────────────────────────────

  // A short shell-crack transient
  function crack(vol = 1) {
    if (muted) return;
    const c = ac(), t = c.currentTime;
    noise(c, t,        0.07, 1400, 2.8, 0.32 * vol);
    noise(c, t,        0.14, 350,  1.4, 0.18 * vol);
    tone(c, 110, 'sine', t, 0.09, 0.35 * vol, 38);
  }

  // Low rumble during egg shake
  function rumble() {
    if (muted) return;
    const c = ac(), t = c.currentTime;
    noise(c, t,      0.55, 90,  1.2, 0.12);
    noise(c, t+0.1,  0.4,  170, 1.5, 0.08);
  }

  // Burst + rarity-tuned sparkle reveal
  function burst(rarity) {
    if (muted) return;
    const c = ac(), t = c.currentTime;

    // Shell shatter — layered noise
    noise(c, t,      0.18, 900,  1.8, 0.5);
    noise(c, t,      0.1,  2500, 3.2, 0.28);
    noise(c, t,      0.28, 220,  1.1, 0.38);

    // Low boom
    tone(c, 75, 'sine', t, 0.3, 0.65, 28);

    // Rarity sparkle — delay slightly so boom lands first
    const sd = 0.07;
    if (rarity === 'common') {
      tone(c, 880,  'sine', t+sd,      0.55, 0.16);
      tone(c, 1320, 'sine', t+sd+0.13, 0.45, 0.13);
    } else if (rarity === 'rare') {
      tone(c, 660,  'sine', t+sd,      0.45, 0.14);
      tone(c, 880,  'sine', t+sd+0.1,  0.48, 0.17);
      tone(c, 1320, 'sine', t+sd+0.22, 0.55, 0.19);
      tone(c, 1760, 'sine', t+sd+0.36, 0.55, 0.14);
    } else { // legendary
      // Full chord hits, then cascade
      [440, 550, 660].forEach(f => tone(c, f, 'sine', t+sd, 0.75, 0.12));
      tone(c, 880,  'sine', t+sd+0.1,  0.8,  0.17);
      tone(c, 1320, 'sine', t+sd+0.22, 0.75, 0.15);
      tone(c, 1760, 'sine', t+sd+0.36, 0.7,  0.13);
      tone(c, 2640, 'triangle', t+sd+0.5, 0.6, 0.09);
    }
  }

  // ── Fusion sounds ───────────────────────────────────────────────────────────

  // Soft magical pop when each orb appears
  function fusionOrbPop() {
    if (muted) return;
    const c = ac(), t = c.currentTime;
    tone(c, 320, 'sine', t,      0.22, 0.14, 180);
    noise(c, t,  0.1,   2200, 5, 0.08);
  }

  // Rising whine as orbs converge (call once, it lasts ~0.45s)
  function fusionConverge() {
    if (muted) return;
    const c = ac(), t = c.currentTime;
    // Rising sawtooth through lowpass — sounds like energy building
    const o    = c.createOscillator();
    const filt = c.createBiquadFilter();
    const g    = c.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(160, t);
    o.frequency.exponentialRampToValueAtTime(1100, t + 0.42);
    filt.type            = 'lowpass';
    filt.frequency.value = 1400;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.06);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.46);
    o.connect(filt); filt.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + 0.5);
    noise(c, t, 0.42, 500, 1.8, 0.07);
  }

  // Core implosion/explosion moment
  function fusionBurst() {
    if (muted) return;
    const c = ac(), t = c.currentTime;
    noise(c, t,      0.22, 700,  1.4, 0.6);
    noise(c, t,      0.12, 3500, 3,   0.35);
    tone(c, 95, 'sine', t, 0.38, 0.75, 22);

    // Rising shimmer immediately after the hit
    const sd = 0.07;
    tone(c, 660,  'sine', t+sd,      0.6, 0.13);
    tone(c, 880,  'sine', t+sd+0.07, 0.6, 0.15);
    tone(c, 1100, 'sine', t+sd+0.16, 0.6, 0.14);
    tone(c, 1320, 'sine', t+sd+0.26, 0.65, 0.13);
  }

  // Triumphant variant reveal arpeggio
  function fusionReveal(toVariantId) {
    if (muted) return;
    const c = ac(), t = c.currentTime;
    const arps = {
      gold:    [392, 494, 587, 784, 988],   // G major — warm, bright
      crimson: [349, 440, 523, 698, 880],   // F major — bold
      void:    [311, 370, 466, 622, 830],   // Eb minor — dark, mysterious
    };
    const freqs = arps[toVariantId] || arps.gold;
    freqs.forEach((freq, i) => {
      tone(c, freq, 'sine', t + i * 0.09, 1.0 - i * 0.06, 0.17 - i * 0.01);
    });
    // High shimmer tail
    tone(c, freqs[freqs.length - 1] * 2, 'triangle', t + freqs.length * 0.09, 0.8, 0.09);
  }

  // ── Region discovery ─────────────────────────────────────────────────────────

  // Deep, expansive reveal — a low swell rising into a bright open chord
  function regionDiscover() {
    if (muted) return;
    const c = ac(), t = c.currentTime;
    // Low swell
    tone(c, 65, 'sine', t, 1.2, 0.35, 130);
    noise(c, t, 0.6, 180, 1.2, 0.08);
    // Rising chord — open fifth feeling
    const sd = 0.3;
    tone(c, 262, 'sine',     t+sd,      1.0, 0.12);  // C
    tone(c, 392, 'sine',     t+sd+0.12, 0.9, 0.14);  // G
    tone(c, 523, 'sine',     t+sd+0.25, 0.8, 0.12);  // C5
    tone(c, 784, 'triangle', t+sd+0.4,  0.7, 0.08);  // G5
    // Shimmer tail
    tone(c, 1047, 'triangle', t+sd+0.55, 0.9, 0.06);
  }

  // Warm energy bloom for nurture session complete — no crack/shatter, rising chimes
  function nurtureProgress() {
    if (muted) return;
    const c = ac(), t = c.currentTime;
    // Soft low pulse — energy gathering
    tone(c, 95, 'sine', t, 0.5, 0.32, 48);
    noise(c, t, 0.4, 140, 1.0, 0.07);
    // Rising shimmer cascade
    const sd = 0.1;
    tone(c, 440,  'sine', t+sd,      0.55, 0.14);
    tone(c, 660,  'sine', t+sd+0.1,  0.6,  0.15);
    tone(c, 880,  'sine', t+sd+0.22, 0.65, 0.14);
    tone(c, 1320, 'sine', t+sd+0.36, 0.6,  0.11);
  }

  return { unlock, setMuted, isMuted, crack, rumble, burst, nurtureProgress, fusionOrbPop, fusionConverge, fusionBurst, fusionReveal, regionDiscover };
})();

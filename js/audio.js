// ============================================================================
//  AUDIO  —  procedural music & SFX via the Web Audio API (no asset files).
//  Ambient pad-based score with per-mood chord progressions, plus short
//  synthesized stingers and dialogue blips. Degrades to a silent no-op when
//  Web Audio is unavailable (e.g. headless jsdom).
// ============================================================================

const GameAudio = (function () {
  let ctx = null, master = null, musicBus = null, sfxBus = null, delay = null;
  let muted = false, started = false;
  let moodName = null, mood = null, timer = null, step = 0;
  let lastBlip = 0;

  // chord progressions expressed as semitone offsets from a root frequency
  const MOODS = {
    title:  { root: 130.81, wave:"sine",     cut: 800,  tempo: 3200, gain:.5,
              prog: [[0,3,7,10],[ -2,3,5,10],[ -4,3,8,12],[ -5,2,7,10]] },
    day:    { root: 174.61, wave:"triangle", cut: 1100, tempo: 3600, gain:.42,
              prog: [[0,4,7,11],[2,5,9,12],[-3,4,7,9],[0,4,7,11]] },
    night:  { root: 130.81, wave:"sine",     cut: 760,  tempo: 4200, gain:.4,
              prog: [[0,3,7],[ -2,3,7],[ -4,3,8],[ -2,5,8]] },
    hub:    { root: 164.81, wave:"triangle", cut: 980,  tempo: 3800, gain:.4,
              prog: [[0,4,7,11],[-3,2,7,9],[-5,4,7,12],[-1,3,7,10]] },
    dark:   { root: 98.00,  wave:"sine",     cut: 560,  tempo: 4600, gain:.46,
              prog: [[0,3,6],[0,1,6],[ -2,3,6],[ -3,1,6]] },
    trial:  { root: 110.00, wave:"sawtooth", cut: 720,  tempo: 1600, gain:.34,
              prog: [[0,3,7],[1,6,10],[0,3,8],[ -1,5,11]] },
    exec:   { root: 87.31,  wave:"sawtooth", cut: 640,  tempo: 1200, gain:.4,
              prog: [[0,1,6,11],[ -1,2,6,12],[0,3,6,13],[1,6,7,13]] },
  };

  function ensure() {
    if (ctx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0;
      master.connect(ctx.destination);
      musicBus = ctx.createGain(); musicBus.gain.value = 0.9; musicBus.connect(master);
      sfxBus = ctx.createGain(); sfxBus.gain.value = 1.0; sfxBus.connect(master);
      // a touch of space
      delay = ctx.createDelay(); delay.delayTime.value = 0.33;
      const fb = ctx.createGain(); fb.gain.value = 0.28;
      delay.connect(fb); fb.connect(delay); delay.connect(master);
      musicBus.connect(delay);
    } catch (e) { ctx = null; }
  }

  function start() {
    ensure();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    started = true;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(muted ? 0 : 0.30, ctx.currentTime + 1.4);
    if (mood && !timer) schedule();
  }

  function note(freq, when, dur, wave, cut, vGain) {
    const o = ctx.createOscillator(); o.type = wave; o.frequency.value = freq;
    const o2 = ctx.createOscillator(); o2.type = wave; o2.frequency.value = freq; o2.detune.value = 6;
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = cut;
    const g = ctx.createGain(); g.gain.value = 0;
    o.connect(f); o2.connect(f); f.connect(g); g.connect(musicBus);
    const a = Math.min(0.9, dur * 0.4), r = dur * 0.7;
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vGain, when + a);
    g.gain.linearRampToValueAtTime(0.0001, when + dur);
    o.start(when); o2.start(when); o.stop(when + dur + 0.05); o2.stop(when + dur + 0.05);
  }

  function schedule() {
    if (!ctx || !mood) return;
    const t = ctx.currentTime + 0.05;
    const chord = mood.prog[step % mood.prog.length];
    const dur = mood.tempo / 1000 * 1.15;
    chord.forEach((semi, i) => {
      const freq = mood.root * Math.pow(2, semi / 12);
      note(freq, t + i * 0.04, dur, mood.wave, mood.cut, (mood.gain / chord.length) * 0.9);
    });
    // sparse high shimmer on calm moods, pulse on tense ones
    if (moodName === "trial" || moodName === "exec") {
      note(mood.root * 2, t, mood.tempo/1000*0.5, "square", mood.cut*1.4, 0.05);
    }
    step++;
    timer = setTimeout(schedule, mood.tempo);
  }

  function setMood(name) {
    if (name === moodName) return;
    moodName = name; mood = MOODS[name] || null; step = 0;
    if (timer) { clearTimeout(timer); timer = null; }
    if (ctx && started && mood) schedule();
  }

  // ---- SFX ----
  function ping(freq, dur, type, vol, slideTo) {
    if (!ctx) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator(); o.type = type || "triangle"; o.frequency.value = freq;
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    const g = ctx.createGain(); g.gain.value = 0;
    o.connect(g); g.connect(sfxBus);
    g.gain.linearRampToValueAtTime(vol, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function noiseHit(dur, vol, cut) {
    if (!ctx) return;
    const t = ctx.currentTime;
    const n = ctx.createBufferSource();
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    n.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = cut || 1800;
    const g = ctx.createGain(); g.gain.value = vol;
    n.connect(f); f.connect(g); g.connect(sfxBus);
    n.start(t); n.stop(t + dur);
  }

  function sfx(type) {
    if (!ctx || !started) return;
    switch (type) {
      case "select":  ping(520, 0.10, "triangle", 0.18); break;
      case "back":    ping(300, 0.10, "sine", 0.15); break;
      case "break":   ping(880, 0.18, "square", 0.22, 1760); ping(440, 0.25, "sawtooth", 0.12); break;
      case "good":    ping(660, 0.12, "triangle", 0.2, 990); setTimeout(()=>ping(990,0.18,"triangle",0.18),90); break;
      case "bad":     ping(200, 0.22, "sawtooth", 0.2, 120); break;
      case "flash":   noiseHit(0.25, 0.25, 3000); ping(140, 0.3, "sawtooth", 0.18, 80); break;
      case "shake":   noiseHit(0.4, 0.3, 900); break;
      case "glitch":  for (let i=0;i<5;i++) setTimeout(()=>ping(120+Math.random()*900,0.05,"square",0.1),i*45); break;
      case "boom":    noiseHit(0.7, 0.4, 600); ping(70, 0.9, "sine", 0.3, 40); break;
      case "bond":    [0,4,7,12].forEach((s,i)=>setTimeout(()=>ping(330*Math.pow(2,s/12),0.4,"triangle",0.16),i*110)); break;
    }
  }

  function blip() {
    if (!ctx || !started) return;
    const now = (ctx.currentTime || 0);
    if (now - lastBlip < 0.028) return;
    lastBlip = now;
    ping(420 + Math.random()*120, 0.025, "square", 0.04);
  }

  function toggle() {
    muted = !muted;
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(muted ? 0 : 0.30, ctx.currentTime + 0.2);
    }
    return muted;
  }
  function isMuted() { return muted; }
  function isOn() { return started && !!ctx; }

  return { start, setMood, sfx, blip, toggle, isMuted, isOn };
})();

if (typeof module !== "undefined") module.exports = { GameAudio };

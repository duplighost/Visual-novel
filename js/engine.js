// ============================================================================
//  ENGINE  —  the visual-novel runtime for STATIC
// ============================================================================

const AUTO_SLOT = "static_slot_auto";
const SLOT_KEYS = ["static_slot_1", "static_slot_2", "static_slot_3"];
const SETTINGS_KEY = "static_settings_v1";

const Settings = { textSpeed: 16, volume: 0.6, muted: false };
function loadSettings() {
  try { Object.assign(Settings, JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}")); } catch (e) {}
}
function saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(Settings)); } catch (e) {}
}
function applySettings() {
  if (window.GameAudio) { GameAudio.setVolume(Settings.volume); GameAudio.setMuted(Settings.muted); }
  const mb = document.getElementById("muteBtn");
  if (mb) { mb.textContent = Settings.muted ? "♪̶" : "♪"; mb.classList.toggle("muted", Settings.muted); }
}

const State = {
  flags: {},          // freetime completions (ft_<id> = maxed), chapter progress
  bullets: [],        // truth bullets for the CURRENT case (cleared per chapter)
  log: [],            // persistent logbook: every bullet ever found {id,name,desc,case}
  affection: {},      // id -> 0..MAX_AFFECTION (stages of the free-time chain done)
  slots: 0,           // free-time actions remaining this break
  freetimeOpen: false,
  visited: {},        // investigation spots seen
};
const MAX_AFFECTION = 6; // 5 build-up events + the capstone

// ---- mascot sprite (not a roster character) ---------------------------------
function staticSprite() {
  return `
  <svg viewBox="0 0 200 240" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" class="dr-portrait" aria-label="STATIC">
    <defs><radialGradient id="st_glow" cx="0.5" cy="0.4" r="0.6">
      <stop offset="0" stop-color="#ff2d6f" stop-opacity="0.5"/><stop offset="1" stop-color="#ff2d6f" stop-opacity="0"/>
    </radialGradient></defs>
    <rect x="0" y="0" width="200" height="240" fill="url(#st_glow)"/>
    <!-- mic stand -->
    <rect x="96" y="150" width="8" height="80" fill="#1b1b22"/>
    <ellipse cx="100" cy="232" rx="40" ry="8" fill="#1b1b22"/>
    <!-- mic head -->
    <circle cx="100" cy="100" r="62" fill="#15151b" stroke="#ff2d6f" stroke-width="3"/>
    <g stroke="#3a3a46" stroke-width="2">
      <line x1="58" y1="78" x2="142" y2="78"/><line x1="52" y1="92" x2="148" y2="92"/>
      <line x1="50" y1="106" x2="150" y2="106"/><line x1="54" y1="120" x2="146" y2="120"/>
      <line x1="62" y1="134" x2="138" y2="134"/>
    </g>
    <!-- teeth grin -->
    <path d="M62 118 Q100 150 138 118 L138 124 Q100 158 62 124 Z" fill="#0a0a0d"/>
    <g fill="#e8e8ee"><path d="M70 122 l8 10 8 -10z"/><path d="M86 124 l8 11 8 -11z"/><path d="M102 124 l8 11 8 -11z"/><path d="M118 122 l8 10 8 -10z"/></g>
    <!-- one recording eye, one dead eye -->
    <circle cx="78" cy="92" r="14" fill="#0a0a0d" stroke="#3a3a46" stroke-width="2"/>
    <circle cx="78" cy="92" r="5" fill="#e8e8ee"/>
    <circle cx="122" cy="92" r="14" fill="#3a0010" stroke="#ff2d6f" stroke-width="2"/>
    <circle cx="122" cy="92" r="7" fill="#ff2d6f"><animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite"/></circle>
    <text x="122" y="96" text-anchor="middle" font-size="8" fill="#0a0a0d" font-weight="bold">REC</text>
  </svg>`;
}

function artFor(id) { return `assets/cast/${id}.jpg`; }

function spriteFor(id) {
  if (!id) return "";
  if (id === "static") return staticSprite();
  if (id === "protagonist") return buildPortrait(CHARACTERS.protagonist);
  const c = CHARACTERS[id];
  if (!c) return "";
  // the 20 Ultimates each have a full painterly card; zoom into the figure's bust
  // so the card's own baked nameplate/side quotes sit outside the sprite frame.
  return `<div class="sprite-img" role="img" aria-label="${c.name}" style="background-image:url('${artFor(id)}')"></div>`;
}

// ---------------------------------------------------------------- DOM helpers
const $ = (sel) => document.querySelector(sel);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

// ---------------------------------------------------------------- Scene player
const Player = {
  scene: [],
  idx: 0,
  onDone: null,

  play(beats, onDone) {
    this.scene = beats;
    this.idx = 0;
    this.onDone = onDone || null;
    showStage();
    this.step();
  },

  step() {
    if (this.idx >= this.scene.length) { if (this.onDone) this.onDone(); return; }
    const b = this.scene[this.idx++];

    if (b.bg)   { setBg(b.bg); return this.step(); }
    if (b.sfx)  { doSfx(b.sfx); return this.step(); }
    if (b.give) { addBullet(b.give); return this.step(); }
    if (b.flag) { State.flags[b.flag] = true; save(); return this.step(); }
    if (b.ifFlag) { // conditional line: only shown if a flag is set
      if (State.flags[b.ifFlag]) return renderLine(b);
      return this.step();
    }
    if (b.slots !== undefined) { State.slots = b.slots; save(); return this.step(); }
    if (b.clearBullets) { State.bullets = []; save(); return this.step(); }
    if (b.unlock === "freetime") { State.freetimeOpen = true; save(); return this.step(); }

    if (b.go)   { return runScene(b.go); }
    if (b.ally) {
      // a bonded ally's insight — only surfaces if you spent enough time with them
      if ((State.affection[b.ally.id] || 0) >= (b.ally.need || 1)) {
        return renderLine({ s:b.ally.id, who:CHARACTERS[b.ally.id].name + " (ally)", t:b.ally.text });
      }
      return this.step();
    }
    if (b.defend)      { return runDefense(b.defend, () => this.step()); }
    if (b.execArt)     { return showExecutionSplash(b, () => this.step()); }
    if (b.epilogue)    { return playEpilogue(); }
    if (b.investigate) { return runInvestigation(b.investigate, () => this.step()); }
    if (b.trial)       { return runTrial(b.trial, () => this.step()); }
    if (b.choices)     { return renderChoices(b.choices); }
    if (b.end)         { return openHub(); }

    // dialogue / narration
    renderLine(b);
  },
};

function runScene(label) {
  const beats = STORY[label];
  if (!beats) { openHub(); return; }
  Player.play(beats);
}

// full-screen execution splash using the blackened's card art
function showExecutionSplash(b, done) {
  if (window.GameAudio) { GameAudio.setMood("exec"); GameAudio.sfx("boom"); }
  doSfx("glitch");
  const ids = Array.isArray(b.execArt) ? b.execArt : [b.execArt];
  $("#stage").style.display = "none";
  const ov = $("#overlay");
  ov.style.display = "flex";
  ov.innerHTML = `
    <div class="exec-splash">
      <div class="exec-banner">EXECUTION</div>
      <div class="exec-cards">
        ${ids.map((id)=>`<div class="exec-card">
          <img src="${artFor(id)}" alt="${CHARACTERS[id].name}">
          <span class="exec-stamp">CANCELLED</span>
        </div>`).join("")}
      </div>
      <div class="exec-title">${b.title || ""}</div>
      <div class="exec-sub">${ids.map((id)=>CHARACTERS[id].name).join("&nbsp;&nbsp;·&nbsp;&nbsp;")}</div>
      <button class="big-btn next-case" id="execGo">▶ Proceed</button>
    </div>`;
  ov.querySelector("#execGo").onclick = () => {
    if (window.GameAudio) GameAudio.sfx("select");
    ov.style.display = "none";
    $("#stage").style.display = "";
    done();
  };
}

// ---------------------------------------------------------------- Rendering
function renderLine(b) {
  const stage = $("#stage");
  const speaking = b.s || null;

  // sprite slot
  const sp = $("#sprite");
  if (speaking) { sp.innerHTML = spriteFor(speaking); sp.classList.add("active"); }
  else { sp.classList.remove("active"); }

  const box = $("#dialogue");
  const nameTag = $("#nametag");
  if (b.who) { nameTag.textContent = b.who; nameTag.style.display = "block"; }
  else { nameTag.style.display = "none"; }

  // accent name tag with speaker color
  if (speaking && CHARACTERS[speaking]) {
    nameTag.style.setProperty("--tag", CHARACTERS[speaking].palette.accent);
  } else if (speaking === "static") {
    nameTag.style.setProperty("--tag", "#ff2d6f");
  } else {
    nameTag.style.setProperty("--tag", "#9fb3c8");
  }

  const textEl = $("#text");
  const t = b.t || "";
  const isCard = /^(EXECUTION:|CHAPTER \d|THE END\.|★ BOND FORMED)/.test(t) || /COMPLETE\.?$/.test(t);
  textEl.classList.toggle("card-text", isCard);
  typeText(textEl, t, () => { $("#advance").style.display = "block"; });
  $("#advance").style.display = "none";
  $("#choices").innerHTML = "";
}

let typing = null;
function typeText(node, text, done) {
  if (typing) clearInterval(typing);
  node.textContent = "";
  node.dataset.full = text;
  const speed = Settings.textSpeed;
  if (!speed) { node.textContent = text; if (done) done(); return; } // instant
  let i = 0;
  typing = setInterval(() => {
    node.textContent = text.slice(0, ++i);
    if (window.GameAudio && i % 2 === 0) GameAudio.blip();
    if (i >= text.length) { clearInterval(typing); typing = null; if (done) done(); }
  }, speed);
}
function finishTyping() {
  const node = $("#text");
  if (typing) { clearInterval(typing); typing = null; node.textContent = node.dataset.full || node.textContent; $("#advance").style.display = "block"; return true; }
  return false;
}

function advance() {
  if (finishTyping()) return;
  if ($("#choices").children.length) return; // waiting on a choice
  Player.step();
}

function renderChoices(choices) {
  const wrap = $("#choices");
  wrap.innerHTML = "";
  $("#advance").style.display = "none";
  choices.forEach((c) => {
    const btn = el("button", "choice-btn", c.t);
    btn.onclick = () => { wrap.innerHTML = ""; runScene(c.go); };
    wrap.appendChild(btn);
  });
}

// ---------------------------------------------------------------- Backgrounds & SFX
const BG_MOOD = { "bg-dark":"dark", "bg-studio":"day", "bg-night":"night", "bg-bar":"day", "bg-trial":"trial" };
function setBg(cls) {
  const bg = $("#bg");
  bg.className = "bg " + cls;
  if (window.GameAudio) GameAudio.setMood(BG_MOOD[cls] || "day");
}
function doSfx(kind) {
  const root = $("#game");
  root.classList.remove("fx-shake","fx-flash","fx-glitch");
  void root.offsetWidth;
  root.classList.add("fx-" + kind);
  if (window.GameAudio) GameAudio.sfx(kind);
  setTimeout(() => root.classList.remove("fx-" + kind), 700);
}

// ---------------------------------------------------------------- Truth bullets
function addBullet(b) {
  if (!State.bullets.find((x) => x.id === b.id)) { State.bullets.push(b); save(); }
}

// ---------------------------------------------------------------- Investigation
function runInvestigation(caseId, done) {
  const data = INVESTIGATIONS[caseId];
  const stage = $("#stage");
  stage.style.display = "none";
  const ov = $("#overlay");
  ov.style.display = "flex";
  State.visited[caseId] = State.visited[caseId] || {};

  function render() {
    const visited = State.visited[caseId];
    const allDone = data.spots.every((s) => visited[s.id]);
    ov.innerHTML = `
      <div class="panel investigate">
        <h2 class="panel-title">🔍 INVESTIGATION</h2>
        <p class="panel-sub">${data.title} — ${data.intro}</p>
        <div class="spot-grid">
          ${data.spots.map((s) => `
            <button class="spot ${visited[s.id] ? "done" : ""}" data-spot="${s.id}">
              <span class="spot-label">${s.label}</span>
              <span class="spot-state">${visited[s.id] ? "✓ examined" : "examine"}</span>
            </button>`).join("")}
        </div>
        <div class="bullets">
          <h3>Truth Bullets (${State.bullets.length})</h3>
          ${State.bullets.length ? State.bullets.map((b)=>`<div class="bullet"><b>${b.name}</b><span>${b.desc}</span></div>`).join("") : '<p class="muted">None yet. Examine the scene.</p>'}
        </div>
        <button class="big-btn ${allDone ? "" : "disabled"}" id="toTrial" ${allDone?"":"disabled"}>
          ${allDone ? "▶ Begin the Class Trial" : "Examine every spot to continue"}
        </button>
      </div>`;

    ov.querySelectorAll(".spot").forEach((btn) => {
      btn.onclick = () => {
        const spot = data.spots.find((s) => s.id === btn.dataset.spot);
        showSpot(spot, caseId, render);
      };
    });
    const t = ov.querySelector("#toTrial");
    if (t && allDone) t.onclick = () => { ov.style.display = "none"; stage.style.display = ""; done(); };
  }
  render();
}

function showSpot(spot, caseId, back) {
  const ov = $("#overlay");
  ov.innerHTML = `
    <div class="panel spot-detail">
      <h2 class="panel-title">${spot.label}</h2>
      <p class="spot-body">${spot.body}</p>
      <div class="bullet got"><span class="got-tag">TRUTH BULLET ACQUIRED</span><b>${spot.bullet.name}</b><span>${spot.bullet.desc}</span></div>
      <button class="big-btn" id="back">◀ Back to the scene</button>
    </div>`;
  State.visited[caseId][spot.id] = true;
  addBullet(spot.bullet);
  recordBullet(spot.bullet, (INVESTIGATIONS[caseId] || {}).title || "Case");
  save();
  ov.querySelector("#back").onclick = back;
}

// persistent logbook — survives the per-chapter bullet clear
function recordBullet(b, caseTitle) {
  if (!State.log.find((x) => x.id === b.id)) {
    State.log.push({ id:b.id, name:b.name, desc:b.desc, case:caseTitle });
    save();
  }
}

// ---------------------------------------------------------------- Class Trial
function runTrial(caseId, done) {
  const data = TRIALS[caseId];
  const stage = $("#stage");
  stage.style.display = "none";
  const ov = $("#overlay");
  ov.style.display = "flex";
  let round = 0;

  function renderRound() {
    if (round >= data.rounds.length) { renderAccuse(); return; }
    const r = data.rounds[round];
    ov.innerHTML = `
      <div class="panel trial">
        <div class="trial-head"><span class="onair">● ON AIR</span><h2 class="panel-title">CLASS TRIAL</h2><span class="round-num">Debate ${round+1}/${data.rounds.length}</span></div>
        <p class="trial-prompt">${r.prompt}</p>
        <p class="panel-sub">Fire a Truth Bullet at the statement that contradicts the evidence.</p>
        <div class="statements">
          ${r.statements.map((s,i)=>`<button class="statement ${s.weak?"weak":""}" data-i="${i}">${escapeHtml(s.text)}</button>`).join("")}
        </div>
        <div class="ammo">
          <h3>Your Truth Bullets — pick one, then a statement</h3>
          <div class="ammo-row">
            ${State.bullets.map((b)=>`<button class="ammo-btn" data-b="${b.id}" title="${b.desc}">${b.name}</button>`).join("")}
          </div>
          <p class="hint">💡 ${r.hint}</p>
        </div>
        <div class="trial-msg" id="tmsg"></div>
      </div>`;

    let chosenBullet = null;
    ov.querySelectorAll(".ammo-btn").forEach((btn)=>{
      btn.onclick = () => {
        ov.querySelectorAll(".ammo-btn").forEach(b=>b.classList.remove("sel"));
        btn.classList.add("sel"); chosenBullet = btn.dataset.b;
        $("#tmsg").innerHTML = `<span class="loaded">Loaded: ${btn.textContent}. Now fire at a statement.</span>`;
      };
    });
    ov.querySelectorAll(".statement").forEach((btn)=>{
      btn.onclick = () => {
        const s = r.statements[+btn.dataset.i];
        if (!chosenBullet) { $("#tmsg").innerHTML = `<span class="bad">Load a Truth Bullet first.</span>`; return; }
        if (s.weak && chosenBullet === s.bullet) {
          doSfx("flash");
          if (window.GameAudio) GameAudio.sfx("break");
          btn.classList.add("hit");
          $("#tmsg").innerHTML = `<span class="good">BREAK!</span> ${escapeHtml(s.success)}`;
          disableAll();
          const next = el("button","big-btn","▶ Continue");
          next.onclick = () => { round++; renderRound(); };
          $("#tmsg").appendChild(next);
        } else if (s.weak) {
          doSfx("shake");
          $("#tmsg").innerHTML = `<span class="bad">That bullet doesn't pierce it.</span> Right target, wrong evidence. Try another Truth Bullet.`;
        } else {
          doSfx("shake");
          $("#tmsg").innerHTML = `<span class="bad">That statement holds up.</span> Find the one that contradicts the evidence.`;
        }
      };
    });
    function disableAll(){ ov.querySelectorAll(".statement,.ammo-btn").forEach(b=>b.disabled=true); }
  }

  function renderAccuse() {
    const a = data.accuse;
    ov.innerHTML = `
      <div class="panel trial">
        <div class="trial-head"><span class="onair">● ON AIR</span><h2 class="panel-title">THE VERDICT</h2></div>
        <p class="trial-prompt">${a.prompt}</p>
        <div class="accuse-grid">
          ${a.options.map((o,i)=>`<button class="accuse" data-i="${i}">${o.name}</button>`).join("")}
        </div>
        <div class="trial-msg" id="tmsg"></div>
      </div>`;
    ov.querySelectorAll(".accuse").forEach((btn)=>{
      btn.onclick = () => {
        const o = a.options[+btn.dataset.i];
        if (o.correct) {
          doSfx("flash"); if (window.GameAudio) GameAudio.sfx("good"); btn.classList.add("hit");
          ov.querySelectorAll(".accuse").forEach(b=>b.disabled=true);
          $("#tmsg").innerHTML = `<span class="good">VERDICT REACHED.</span> ${escapeHtml(a.right)}`;
          const next = el("button","big-btn","▶ Deliver the verdict");
          next.onclick = () => { ov.style.display="none"; stage.style.display=""; done(); };
          $("#tmsg").appendChild(next);
        } else {
          doSfx("shake");
          $("#tmsg").innerHTML = `<span class="bad">${escapeHtml(a.wrong)}</span>`;
        }
      };
    });
  }

  renderRound();
}

function escapeHtml(s){ return (s||"").replace(/[&<>"]/g, c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c])); }

// ---------------------------------------------------------------- Chapter flow
// Chapter 1 begins from a New Broadcast; chapters 2-6 unlock in sequence
// from the Free Time hub as each prior chapter completes.
const CHAPTER_FLOW = [
  { need:"prologueDone", done:"ch1done", scene:"daily1", label:"Ch.1: Last Call" },
  { need:"ch1done", done:"ch2done", scene:"ch2_intro", label:"Ch.2: What She Knew" },
  { need:"ch2done", done:"ch3done", scene:"ch3_intro", label:"Ch.3: The Voice" },
  { need:"ch3done", done:"ch4done", scene:"ch4_intro", label:"Ch.4: Partners" },
  { need:"ch4done", done:"ch5done", scene:"ch5_intro", label:"Ch.5: Time of Death" },
  { need:"ch5done", done:"ch6done", scene:"ch6_intro", label:"Ch.6: The Last Episode" },
];
function nextChapter() {
  return CHAPTER_FLOW.find((c) => State.flags[c.need] && !State.flags[c.done]) || null;
}
function nextChapterButton() {
  const c = nextChapter();
  if (!c) return "";
  return `<button class="big-btn next-case" id="nextCaseBtn" data-scene="${c.scene}">▶ Continue the Broadcast — ${c.label}</button>`;
}

// ---------------------------------------------------------------- Free Time Hub
function openHub() {
  showOverlayFull();
  if (window.GameAudio) GameAudio.setMood("hub");
  const ov = $("#overlay");
  const order = ROSTER_ORDER.filter((id) => FREETIME[id]);
  const bonded = order.filter(id=>State.flags["ft_"+id]).length;
  ov.innerHTML = `
    <div class="panel hub">
      <h2 class="panel-title">⏳ FREE TIME</h2>
      <p class="panel-sub">Spend a moment with someone. Each visit deepens the bond; max it out for the capstone — the wound cracked open by love instead of pressure.</p>
      <p class="hub-progress">Bonds completed: ${bonded} / ${order.length}
        &nbsp;•&nbsp; <span class="slots ${State.slots<=0?'spent':''}">${State.slots} ${State.slots===1?'moment':'moments'} left this break</span></p>
      <div class="hub-grid">
        ${order.map((id)=>{
          const c = CHARACTERS[id];
          const aff = State.affection[id] || 0;
          const done = aff >= MAX_AFFECTION;
          const dead = isDeceased(id);
          const lost = dead && !done;
          const noTime = !done && !dead && State.slots <= 0;
          const cls = [ done?"bonded":"", dead?"deceased":"", lost?"locked":"", noTime?"notime":"" ].join(" ");
          const disabled = lost || noTime;
          const meter = `<span class="meter">${"♥".repeat(aff)}<span class="m-empty">${"♥".repeat(MAX_AFFECTION-aff)}</span></span>`;
          const title = done ? "Bond complete — revisit the capstone"
            : lost ? "Lost — they're gone" : noTime ? "No time left this break" : `Spend a moment with ${c.short}`;
          return `<button class="hub-card ${cls}" data-id="${id}" ${disabled?"disabled":""} title="${title}">
            <div class="hub-portrait"><img class="card-img" loading="lazy" src="${artFor(id)}" alt="${c.name}">${dead?'<span class="dead-x">✕</span>':''}${done?'<span class="bond-seal">♥</span>':''}</div>
            <div class="hub-name">${c.short}</div>
            <div class="hub-meter">${meter}</div>
          </button>`;
        }).join("")}
      </div>
      <div class="hub-actions">
        ${nextChapterButton()}
        ${State.flags.ch6done ? '<button class="big-btn" id="outroBtn">🎬 Epilogue</button>' : ''}
        ${State.log.length ? '<button class="big-btn" id="logBtn">📓 Truth Logbook</button>' : ''}
        <button class="big-btn" id="galleryBtn">📁 Cast Gallery</button>
        <button class="big-btn" id="saveBtn">💾 Save</button>
        <button class="big-btn" id="setBtn">⚙ Settings</button>
        <button class="big-btn" id="titleBtn">⌂ Title Screen</button>
      </div>
    </div>`;
  ov.querySelectorAll(".hub-card").forEach((btn)=>{
    btn.onclick = () => playFreeTime(btn.dataset.id);
  });
  const nc = ov.querySelector("#nextCaseBtn");
  if (nc) nc.onclick = () => runScene(nc.dataset.scene);
  const ob = ov.querySelector("#outroBtn");
  if (ob) ob.onclick = () => playEpilogue();
  const lb = ov.querySelector("#logBtn");
  if (lb) lb.onclick = () => openLogbook();
  ov.querySelector("#galleryBtn").onclick = openGallery;
  ov.querySelector("#saveBtn").onclick = openSaveMenu;
  ov.querySelector("#setBtn").onclick = () => openSettings("hub");
  ov.querySelector("#titleBtn").onclick = showTitle;
}

function isDeceased(id) {
  const f = FATES[id];
  return !!(f && State.flags[f.flag]);
}

// ---------------------------------------------------------------- Truth Logbook
function openLogbook() {
  showOverlayFull();
  const ov = $("#overlay");
  // preserve discovery order, group by case
  const groups = [];
  State.log.forEach((b) => {
    let g = groups.find((x) => x.case === b.case);
    if (!g) { g = { case:b.case, items:[] }; groups.push(g); }
    g.items.push(b);
  });
  ov.innerHTML = `
    <div class="panel logbook">
      <h2 class="panel-title">📓 TRUTH LOGBOOK</h2>
      <p class="panel-sub">Every Truth Bullet you've uncovered — ${State.log.length} across ${groups.length} ${groups.length===1?"case":"cases"}.</p>
      ${groups.map((g)=>`
        <div class="log-case">
          <h3 class="log-case-title">${g.case}</h3>
          ${g.items.map((b)=>`<div class="bullet"><b>${b.name}</b><span>${b.desc}</span></div>`).join("")}
        </div>`).join("")}
      <button class="big-btn" id="backHub">◀ Back</button>
    </div>`;
  ov.querySelector("#backHub").onclick = () => { if (State.freetimeOpen) openHub(); else showTitle(); };
}

// ---------------------------------------------------------------- Settings
function openSettings(from) {
  showOverlayFull();
  const ov = $("#overlay");
  const speeds = [["Slow",32],["Normal",16],["Fast",7],["Instant",0]];
  ov.innerHTML = `
    <div class="panel settings">
      <h2 class="panel-title">⚙ SETTINGS</h2>
      <div class="set-row"><label>Text speed</label>
        <div class="set-opts">${speeds.map(([n,v])=>`<button class="set-btn ${Settings.textSpeed===v?"sel":""}" data-sp="${v}">${n}</button>`).join("")}</div>
      </div>
      <div class="set-row"><label>Volume</label>
        <input id="volRange" type="range" min="0" max="100" value="${Math.round(Settings.volume*100)}">
        <span id="volVal">${Math.round(Settings.volume*100)}%</span>
        <button class="set-btn ${Settings.muted?"sel":""}" id="muteToggle">${Settings.muted?"Muted":"Sound on"}</button>
      </div>
      <p class="panel-sub">The quick ♪ button (top-right) also toggles sound at any time.</p>
      <button class="big-btn" id="setBack">◀ Back</button>
    </div>`;
  ov.querySelectorAll(".set-btn[data-sp]").forEach((b)=>{
    b.onclick = () => { Settings.textSpeed = +b.dataset.sp; saveSettings();
      ov.querySelectorAll(".set-btn[data-sp]").forEach(x=>x.classList.toggle("sel", x===b)); };
  });
  const vr = ov.querySelector("#volRange");
  vr.oninput = () => { audioKick(); Settings.volume = vr.value/100; $("#volVal").textContent = vr.value+"%";
    if (window.GameAudio) GameAudio.setVolume(Settings.volume); saveSettings(); };
  ov.querySelector("#muteToggle").onclick = () => { audioKick(); Settings.muted = !Settings.muted;
    saveSettings(); applySettings(); openSettings(from); };
  ov.querySelector("#setBack").onclick = () => { if (window.GameAudio) GameAudio.sfx("back"); from==="hub"?openHub():showTitle(); };
}

// ---------------------------------------------------------------- Save / Load menus
function slotRowsHTML(mode) {
  const rows = [];
  const entry = (key, label) => {
    const d = readSlot(key);
    const meta = d ? `${d.meta.ch} · ${d.meta.bonds} bond${d.meta.bonds===1?"":"s"} · ${new Date(d.ts).toLocaleString()}` : "— empty —";
    const action = mode === "save"
      ? `<button class="big-btn slot-act" data-key="${key}">Save here</button>`
      : `<button class="big-btn slot-act" data-key="${key}" ${d?"":"disabled"}>Load</button>`;
    rows.push(`<div class="slot-row"><div class="slot-info"><b>${label}</b><span>${meta}</span></div>${action}</div>`);
  };
  if (mode === "load") entry(AUTO_SLOT, "Autosave");
  SLOT_KEYS.forEach((k,i)=>entry(k, "Slot " + (i+1)));
  return rows.join("");
}
function openSaveMenu() {
  showOverlayFull();
  const ov = $("#overlay");
  ov.innerHTML = `
    <div class="panel slots">
      <h2 class="panel-title">💾 SAVE GAME</h2>
      <p class="panel-sub">Progress autosaves automatically. Keep manual backups in three slots.</p>
      <div class="slot-list">${slotRowsHTML("save")}</div>
      <button class="big-btn" id="back">◀ Back</button>
    </div>`;
  ov.querySelectorAll(".slot-act").forEach((b)=>{
    b.onclick = () => { writeSlot(b.dataset.key); if (window.GameAudio) GameAudio.sfx("select"); openSaveMenu();
      b.textContent = "Saved!"; };
  });
  ov.querySelector("#back").onclick = () => openHub();
}
function openLoadMenu(from) {
  showOverlayFull();
  const ov = $("#overlay");
  ov.innerHTML = `
    <div class="panel slots">
      <h2 class="panel-title">📂 LOAD GAME</h2>
      <p class="panel-sub">Pick a save to resume from.</p>
      <div class="slot-list">${slotRowsHTML("load")}</div>
      <button class="big-btn" id="back">◀ Back</button>
    </div>`;
  ov.querySelectorAll(".slot-act").forEach((b)=>{
    if (b.disabled) return;
    b.onclick = () => { if (loadSlot(b.dataset.key)) { if (window.GameAudio) GameAudio.sfx("select"); resume(); } };
  });
  ov.querySelector("#back").onclick = () => { from==="hub"?openHub():showTitle(); };
}

// ---------------------------------------------------------------- Defense (relationship-gated)
function runDefense(d, done) {
  showOverlayFull();
  const ov = $("#overlay");
  const aff = State.affection[d.id] || 0;
  const canVouch = aff >= (d.threshold || 3);
  const c = CHARACTERS[d.id];
  ov.innerHTML = `
    <div class="panel defense" style="--accent:${c.palette.accent}">
      <h2 class="panel-title">🛡 DEFEND ${c.short.toUpperCase()}</h2>
      <div class="defense-top">
        <div class="defense-portrait"><div class="sprite-img" style="background-image:url('${artFor(d.id)}')"></div></div>
        <div>
          <p class="defense-prompt">${d.prompt}</p>
          <div class="defense-meter">Your bond with ${c.short}: <span class="meter">${"♥".repeat(aff)}<span class="m-empty">${"♥".repeat(MAX_AFFECTION-aff)}</span></span></div>
        </div>
      </div>
      <div class="defense-opts">
        <button class="choice-btn ${canVouch?"":"locked"}" id="vouch" ${canVouch?"":"disabled"}>
          ${canVouch ? d.optionBonded : `🔒 ${d.optionBonded}`}
          ${canVouch ? "" : `<span class="lock-note">${d.lockedText || "You don't know them well enough to stake your word on it."}</span>`}
        </button>
        <button class="choice-btn" id="neutral">${d.optionNeutral}</button>
      </div>
      <div class="defense-msg" id="dmsg"></div>
    </div>`;
  const finish = () => { if (window.GameAudio) GameAudio.sfx("select"); ov.style.display="none"; $("#stage").style.display=""; done(); };
  const v = ov.querySelector("#vouch");
  if (canVouch) v.onclick = () => {
    State.flags[d.flag] = true; save();
    if (window.GameAudio) GameAudio.sfx("good");
    $("#dmsg").innerHTML = `<span class="good">You spoke for them.</span> ${escapeHtml(d.successText)}`;
    showContinue();
  };
  ov.querySelector("#neutral").onclick = () => {
    $("#dmsg").innerHTML = escapeHtml(d.neutralText);
    showContinue();
  };
  function showContinue() {
    ov.querySelectorAll(".defense-opts button").forEach(b=>b.disabled=true);
    const n = el("button","big-btn","▶ Continue"); n.onclick = finish; $("#dmsg").appendChild(n);
  }
}

// ---------------------------------------------------------------- Epilogue
function playEpilogue() {
  const order = ROSTER_ORDER.filter((id) => FREETIME[id]);
  const bonded = order.filter((id) => State.flags["ft_"+id]);
  const bondedLost = bonded.filter((id) => isDeceased(id));
  const bondedAlive = bonded.filter((id) => !isDeceased(id));
  const n = bonded.length;
  const nameList = (ids) => ids.map((id)=>CHARACTERS[id].short).join(", ");

  // tiered framing on how many wounds you let yourself know
  let tier;
  if (n === 0) tier = [
    "You solved every case and never once let anyone in. You walked the whole game with your hands clean and your heart closed.",
    "Twenty wounds passed through this studio and you learned the shape of none of them. You were the perfect detective. You were entirely alone.",
    "The light outside is very bright, and there is no one beside you to squint into it with.",
  ];
  else if (n <= 5) tier = [
    `You let a few of them in — ${n} ${n===1?"person":"people"} who got to be more than a suspect to you.`,
    "It wasn't many. But it was real, and in a building designed to turn people into evidence, real was the rarest thing there was.",
    "You carry them out with you. The ones you reached, and the ache of the ones you didn't.",
  ];
  else if (n <= 12) tier = [
    `You knew them — really knew them. ${n} masks dropped for you, ${n} wounds handed over on purpose.`,
    "You refused to treat this as only a puzzle. You kept choosing the harder thing: to stay, past the point each of them expected you to leave.",
    "That's why walking out hurts this much. You have something to grieve. That was always the point.",
  ];
  else tier = [
    `You let almost everyone in — ${n} of the twenty. You learned every defense mechanism in the building and loved past every one of them.`,
    "You were the one pair of eyes the studio couldn't fool, and the one heart it couldn't close. Both at once. That's the whole trick of you.",
    "No one has ever been known the way you knew them. Carry that out into the light. It's the only thing in here that was ever really yours.",
  ];

  const beats = [
    { bg:"bg-dark" },
    { t:"EPILOGUE." },
    { bg:"bg-night" },
    ...tier.map((t)=>({ t })),
  ];
  if (bondedLost.length) {
    beats.push({ t:`The ones you knew and couldn't save walk out with you anyway, in the only way the dead ever do — carried: ${nameList(bondedLost)}.` });
  }
  if (bondedAlive.length) {
    beats.push({ t:`And the ones still warm, who chose to leave beside you: ${nameList(bondedAlive)}. You didn't do this alone after all.` });
  } else if (n > 0) {
    beats.push({ t:"Every soul you let in is gone now. You leave with their gifts in your pockets and their names in your mouth, and that has to be enough." });
  }
  beats.push({ t:"Behind you, Sienna walks unrecorded for the first time in her life — no hook, no monetization, just a person who finally felt one of them." });
  beats.push({ t:"The ON AIR sign is dark. The story is yours now. However much of it you chose to let matter." });
  beats.push({ t:"THE END." });

  Player.play(beats, () => openHub());
}

function playFreeTime(id) {
  const c = CHARACTERS[id];
  const ft = FREETIME[id];
  const aff = State.affection[id] || 0;
  const done = aff >= MAX_AFFECTION;

  if (done) return viewCapstone(id);        // already maxed — re-read the capstone, free
  if (isDeceased(id)) return;               // lost route
  if (State.slots <= 0) return;             // out of time this break

  const stage = aff;                        // 0..5
  const isCapstone = stage === MAX_AFFECTION - 1;
  showStage(); setBg("bg-night");

  const beats = [{ bg:"bg-night" }];
  if (stage === 0) beats.push({ s:id, who:c.name, t:`${c.title}. The tell to watch: ${c.tell || "—"}` });
  if (!isCapstone) {
    beats.push({ s:id, who:c.name, t:ft.events[stage] });
    beats.push({ s:id, t:`(Bond with ${c.short}: ${"♥".repeat(stage+1)}${"·".repeat(MAX_AFFECTION-stage-1)})` });
  } else {
    beats.push({ s:id, t:"— Capstone —" });
    ft.lines.forEach((line)=>beats.push({ s:id, who:c.name, t:line }));
    beats.push({ s:id, t:`★ BOND COMPLETE — Gift received: ${ft.gift}` });
  }

  State.slots = Math.max(0, State.slots - 1);
  State.affection[id] = aff + 1;
  if (State.affection[id] >= MAX_AFFECTION) State.flags["ft_"+id] = true;
  save();

  Player.play(beats, () => {
    if (isCapstone && window.GameAudio) GameAudio.sfx("bond");
    openHub();
  });
}

function viewCapstone(id) {
  const c = CHARACTERS[id], ft = FREETIME[id];
  showStage(); setBg("bg-night");
  const beats = [
    { bg:"bg-night" },
    { s:id, who:c.name, t:`${c.title} — bond complete. ♥` },
    ...ft.lines.map((line)=>({ s:id, who:c.name, t:line })),
    { s:id, t:`Gift kept: ${ft.gift}` },
  ];
  Player.play(beats, () => openHub());
}

// ---------------------------------------------------------------- Cast Gallery
function openGallery() {
  showOverlayFull();
  const ov = $("#overlay");
  ov.innerHTML = `
    <div class="panel gallery">
      <h2 class="panel-title">📁 THE ULTIMATE ROSTER</h2>
      <p class="panel-sub">Twenty Ultimates, twenty different ways to be broken. Click a file to open it.</p>
      <div class="gal-grid">
        ${ROSTER_ORDER.map((id)=>{
          const c = CHARACTERS[id];
          const dead = isDeceased(id);
          return `<button class="gal-card ${dead?"deceased":""}" data-id="${id}">
            <div class="gal-portrait"><img class="card-img" loading="lazy" src="${artFor(id)}" alt="${c.name}">${dead?'<span class="dead-x">✕</span>':''}</div>
            <div class="gal-name">${c.short}${State.flags["ft_"+id]?' <span class="heart">♥</span>':''}</div>
            <div class="gal-title">${c.title}</div>
          </button>`;
        }).join("")}
      </div>
      <button class="big-btn" id="backHub">◀ Back</button>
    </div>`;
  ov.querySelectorAll(".gal-card").forEach((btn)=> btn.onclick = () => showProfile(btn.dataset.id));
  ov.querySelector("#backHub").onclick = () => { if (State.freetimeOpen) openHub(); else showTitle(); };
}

function fateLine(id) {
  if (!isDeceased(id)) return "";
  const f = FATES[id];
  const label = f.role === "Mastermind" ? `Unmasked in Chapter ${f.ch} — the Mastermind`
    : `Deceased — Chapter ${f.ch} ${f.role}`;
  return `<div class="profile-fate">✝ ${label}</div>`;
}

function showProfile(id) {
  const c = CHARACTERS[id];
  const ov = $("#overlay");
  ov.innerHTML = `
    <div class="panel profile" style="--accent:${c.palette.accent}">
      <div class="profile-top">
        <div class="profile-portrait"><img class="card-img" src="${artFor(id)}" alt="${c.name}">${isDeceased(id)?'<span class="dead-x">✕</span>':''}</div>
        <div class="profile-info">
          <h2 class="profile-name">${c.name}</h2>
          <div class="profile-title">${c.title}</div>
          <p class="profile-blurb">${c.blurb}</p>
          <blockquote class="profile-quote">“${c.tagline}”</blockquote>
          <div class="profile-tell"><b>The tell —</b> ${c.tell || "—"}</div>
          ${fateLine(id)}
          <div class="profile-status">${State.flags["ft_"+id] ? "♥ Bond formed" : (isDeceased(id) ? "Bond: lost" : "Bond: not yet")}</div>
        </div>
      </div>
      <button class="big-btn" id="backGal">◀ Back to roster</button>
    </div>`;
  ov.querySelector("#backGal").onclick = openGallery;
}

// ---------------------------------------------------------------- Title
let montageBuilt = false;
function buildMontage() {
  if (montageBuilt) return;
  const m = $("#montage");
  if (!m) return;
  // two rows of drifting cards (duplicated for a seamless loop)
  const ids = ROSTER_ORDER.slice();
  const rowA = ids.slice(0, 10), rowB = ids.slice(10);
  const strip = (row) => row.concat(row).map((id)=>
    `<div class="m-card" style="background-image:url('${artFor(id)}')"></div>`).join("");
  m.innerHTML = `<div class="m-row m-row-a">${strip(rowA)}</div><div class="m-row m-row-b">${strip(rowB)}</div>`;
  montageBuilt = true;
}
function showTitle() {
  $("#stage").style.display = "none";
  $("#overlay").style.display = "none";
  buildMontage();
  if (window.GameAudio) GameAudio.setMood("title");
  $("#title").style.display = "flex";
  $("#continueBtn").style.display = hasSave() ? "block" : "none";
}

// ---------------------------------------------------------------- view toggles
function showStage() {
  $("#title").style.display = "none";
  $("#overlay").style.display = "none";
  $("#stage").style.display = "";
}
function showOverlayFull() {
  $("#title").style.display = "none";
  $("#stage").style.display = "none";
  $("#overlay").style.display = "flex";
}

// ---------------------------------------------------------------- Save/Load (slots)
function slotMeta() {
  const f = State.flags || {};
  let ch = "Prologue";
  if (f.ch6done) ch = "Complete";
  else for (let i = 5; i >= 1; i--) { if (f["ch"+i+"done"]) { ch = "Chapter " + (i+1); break; } }
  if (ch === "Prologue" && f.prologueDone) ch = "Chapter 1";
  const bonds = Object.keys(f).filter((k)=>k.startsWith("ft_")).length;
  return { ch, bonds };
}
function writeSlot(key) {
  try {
    localStorage.setItem(key, JSON.stringify({ state: State, meta: slotMeta(), ts: Date.now() }));
    return true;
  } catch (e) { return false; }
}
function readSlot(key) {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; } catch (e) { return null; }
}
function applyState(s) {
  Object.assign(State, s);
  if (!Array.isArray(State.log)) State.log = [];
  if (!Array.isArray(State.bullets)) State.bullets = [];
  if (!State.affection || typeof State.affection !== "object") State.affection = {};
  if (typeof State.slots !== "number") State.slots = 0;
}
// autosave
function save() { writeSlot(AUTO_SLOT); }
function loadSlot(key) {
  const d = readSlot(key);
  if (!d) return false;
  applyState(d.state || d); // tolerate legacy flat saves
  return true;
}
function latestSlotKey() {
  const all = [AUTO_SLOT, ...SLOT_KEYS].map((k)=>({ k, d: readSlot(k) })).filter((x)=>x.d);
  if (!all.length) return null;
  all.sort((a,b)=>(b.d.ts||0)-(a.d.ts||0));
  return all[0].k;
}
function hasSave() { return !!latestSlotKey(); }

// ---------------------------------------------------------------- Boot
function startNew() {
  State.flags = {}; State.bullets = []; State.log = []; State.affection = {}; State.slots = 0;
  State.freetimeOpen = false; State.visited = {};
  save();
  runScene("prologue");
}
function resume() {
  if (State.freetimeOpen) openHub();
  else runScene("prologue");
}
function continueGame() {
  const k = latestSlotKey();
  if (k && loadSlot(k)) resume();
  else startNew();
}

function audioKick() { if (window.GameAudio) { GameAudio.start(); applySettings(); } }

window.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  $("#newBtn").onclick = () => { audioKick(); GameAudio && GameAudio.sfx("select"); startNew(); };
  $("#continueBtn").onclick = () => { audioKick(); GameAudio && GameAudio.sfx("select"); continueGame(); };
  $("#loadBtn").onclick = () => { audioKick(); openLoadMenu("title"); };
  $("#galleryTitleBtn").onclick = () => { audioKick(); openGallery(); };
  $("#setTitleBtn").onclick = () => { audioKick(); openSettings("title"); };
  $("#stage").addEventListener("click", advance);
  const mb = $("#muteBtn");
  if (mb) mb.onclick = () => {
    audioKick();
    const m = GameAudio ? GameAudio.toggle() : true;
    Settings.muted = m; saveSettings();
    mb.textContent = m ? "♪̶" : "♪";
    mb.classList.toggle("muted", m);
  };
  applySettings();
  document.addEventListener("keydown", (e) => {
    if ((e.key === " " || e.key === "Enter") && $("#stage").style.display !== "none") {
      e.preventDefault(); advance();
    }
  });
  showTitle();
});

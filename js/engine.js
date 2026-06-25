// ============================================================================
//  ENGINE  —  the visual-novel runtime for STATIC
// ============================================================================

const SAVE_KEY = "static_vn_save_v1";

const State = {
  flags: {},          // freetime completions, chapter progress
  bullets: [],        // truth bullets for the CURRENT case (cleared per chapter)
  log: [],            // persistent logbook: every bullet ever found {id,name,desc,case}
  freetimeOpen: false,
  visited: {},        // investigation spots seen
};

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
    if (b.clearBullets) { State.bullets = []; save(); return this.step(); }
    if (b.unlock === "freetime") { State.freetimeOpen = true; save(); return this.step(); }

    if (b.go)   { return runScene(b.go); }
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
  let i = 0;
  const speed = 16;
  node.dataset.full = text;
  typing = setInterval(() => {
    node.textContent = text.slice(0, ++i);
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
function setBg(cls) {
  const bg = $("#bg");
  bg.className = "bg " + cls;
}
function doSfx(kind) {
  const root = $("#game");
  root.classList.remove("fx-shake","fx-flash","fx-glitch");
  void root.offsetWidth;
  root.classList.add("fx-" + kind);
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
          doSfx("flash"); btn.classList.add("hit");
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
  const ov = $("#overlay");
  const order = ROSTER_ORDER.filter((id) => FREETIME[id]);
  ov.innerHTML = `
    <div class="panel hub">
      <h2 class="panel-title">⏳ FREE TIME</h2>
      <p class="panel-sub">Spend time with a survivor. Each capstone is the wound, cracked open by love instead of pressure.</p>
      <p class="hub-progress">Bonds formed: ${order.filter(id=>State.flags["ft_"+id]).length} / ${order.length}</p>
      <div class="hub-grid">
        ${order.map((id)=>{
          const c = CHARACTERS[id];
          const done = State.flags["ft_"+id];
          const dead = isDeceased(id);
          const locked = dead && !done;
          const cls = [ done?"bonded":"", dead?"deceased":"", locked?"locked":"" ].join(" ");
          const mark = done ? '<span class="heart">♥</span>' : (locked ? '<span class="cross">✝</span>' : '');
          return `<button class="hub-card ${cls}" data-id="${id}" ${locked?"disabled":""} title="${locked?"This bond is lost — they're gone.":c.title}">
            <div class="hub-portrait"><img class="card-img" loading="lazy" src="${artFor(id)}" alt="${c.name}">${dead?'<span class="dead-x">✕</span>':''}</div>
            <div class="hub-name">${c.short} ${mark}</div>
            <div class="hub-title">${locked?"— lost —":c.title.replace("Ultimate ","")}</div>
          </button>`;
        }).join("")}
      </div>
      <div class="hub-actions">
        ${nextChapterButton()}
        ${State.flags.ch6done ? '<button class="big-btn" id="outroBtn">🎬 Epilogue</button>' : ''}
        ${State.log.length ? '<button class="big-btn" id="logBtn">📓 Truth Logbook</button>' : ''}
        <button class="big-btn" id="galleryBtn">📁 Cast Gallery</button>
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
  if (isDeceased(id) && !State.flags["ft_"+id]) return; // can't bond with the dead
  const c = CHARACTERS[id];
  const ft = FREETIME[id];
  showStage();
  setBg("bg-night");
  const events = ft.events || [];
  const beats = [
    { bg:"bg-night" },
    { s:id, who:c.name, t:`${c.title}. The tell to watch: ${c.tell || "—"}` },
    ...events.map((line)=>({ s:id, t:line })),
    ...ft.lines.map((line)=>({ s:id, t:line })),
    { s:id, t:`★ BOND FORMED — Gift received: ${ft.gift}` },
  ];
  Player.play(beats, () => {
    State.flags["ft_"+id] = true; save();
    openHub();
  });
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

// ---------------------------------------------------------------- Save/Load
function save() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(State)); } catch(e){}
}
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    Object.assign(State, data);
    if (!Array.isArray(State.log)) State.log = [];
    if (!Array.isArray(State.bullets)) State.bullets = [];
    return true;
  } catch(e){ return false; }
}
function hasSave() {
  try { return !!localStorage.getItem(SAVE_KEY); } catch(e){ return false; }
}

// ---------------------------------------------------------------- Boot
function startNew() {
  State.flags = {}; State.bullets = []; State.log = []; State.freetimeOpen = false; State.visited = {};
  save();
  runScene("prologue");
}
function continueGame() {
  load();
  if (State.freetimeOpen) openHub();
  else runScene("prologue");
}

window.addEventListener("DOMContentLoaded", () => {
  $("#newBtn").onclick = startNew;
  $("#continueBtn").onclick = continueGame;
  $("#galleryTitleBtn").onclick = openGallery;
  $("#stage").addEventListener("click", advance);
  document.addEventListener("keydown", (e) => {
    if ((e.key === " " || e.key === "Enter") && $("#stage").style.display !== "none") {
      e.preventDefault(); advance();
    }
  });
  showTitle();
});

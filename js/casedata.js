// ============================================================================
//  CASE DATA  —  investigation spots, truth bullets, class-trial sequences,
//  and the Free Time capstone events for the whole cast.
// ============================================================================

// ---- Investigation: clickable spots that each grant a Truth Bullet ----------
const INVESTIGATIONS = {
  case1: {
    title: "Chapter 1 — Last Call",
    intro: "The bar, the body, and one long night. Examine every spot to collect Truth Bullets.",
    spots: [
      {
        id: "glass",
        label: "The empty glass",
        body: "A lowball, tipped on its side. A thin film of residue clings to the bottom — and a faint, deliberate bitterness under the alcohol. Whatever killed her was masked by the drink, not added to it crudely. This was dosed by someone who knew exactly how much.",
        bullet: { id:"tb_dose", name:"Masked Dosing", desc:"The poison was precisely measured and hidden by the drink's own flavor — the work of someone who knows lethal vs. delicious to the milligram." },
      },
      {
        id: "body",
        label: "Tanya's body (with Nyx)",
        body: "Nyx confirms it: a fast-acting poison, ingested, roughly two hours before discovery. No defensive wounds. No fear. \"She didn't see it coming,\" Nyx says. \"She trusted whatever she drank completely.\"",
        bullet: { id:"tb_trust", name:"No Struggle", desc:"Tanya drank willingly, without a moment's suspicion. She trusted the person who served her." },
      },
      {
        id: "bar",
        label: "Behind the bar",
        body: "Every bottle is in its place except a small amber dropper bottle of 'bitters,' wiped clean and set slightly apart from the others. The bar log — Declan keeps one, obsessively — lists every drink he poured that week, with the exact build of each. Tanya's last drink is recorded in his hand: her order, measured out to the drop.",
        bullet: { id:"tb_log", name:"The Bar Log", desc:"Declan recorded Tanya's last drink in obsessive, exact detail — the man who claims not to care knew precisely what was in her hand." },
      },
      {
        id: "stools",
        label: "The stool & the doorway",
        body: "Only one stool is pulled out — Tanya's. No second glass anywhere. Whoever else was here never drank, and stood the whole time. You remember it yourself: you left Declan and Tanya alone at the bar. No one else came or went; Asher, who watches the halls, swears the corridor was empty until the announcement.",
        bullet: { id:"tb_alone", name:"Alone at the Bar", desc:"Tanya and Declan were the only two present. No third party could have dosed the glass." },
      },
    ],
  },

  case3: {
    title: "Chapter 3 — The Voice",
    intro: "The sealed recording booth, a dead debater, and a fight nobody actually had. Collect every Truth Bullet.",
    spots: [
      {
        id: "file",
        label: "STATIC File: the body",
        body: "Rex Montgomery. Blunt-force trauma to the back of the head, a single blow. No defensive wounds; death was near-instant. Time of death: a broad window, 9:30 PM to 10:30 PM. Broad enough that the 10:15 'argument' sits comfortably inside it — the room is already anchoring on 'died right after the Silas fight.'",
        bullet: { id:"tb_tod", name:"STATIC File (TOD)", desc:"Single blow to the back of the head. Time of death anywhere from 9:30 to 10:30 PM — a wide, convenient window." },
      },
      {
        id: "watch",
        label: "Rex's shattered stopwatch",
        body: "Knocked under the mixing console in the struggle, face cracked, hands frozen at 9:42 PM. Rex timed every argument he ever won; the watch was always running. It stopped the instant it hit the floor.",
        bullet: { id:"tb_watch", name:"Stopwatch — 9:42", desc:"Rex's ever-running stopwatch shattered at 9:42 PM. If he died at 9:42, he could not have been screaming at anyone at 10:15." },
      },
      {
        id: "booth",
        label: "The soundproofed booth (with Imogen)",
        body: "Imogen knows the room's acoustics cold. The inner booth is fully sealed — live voices inside cannot be heard in the hallway at all. The only sound that ever reaches the corridor speaker is the internal monitor feed, routed there from the console.",
        bullet: { id:"tb_proof", name:"Soundproofing", desc:"Nothing inside the sealed booth is audible in the hall except the routed monitor feed. Anything 'heard' from the corridor was a feed — audio, not bodies." },
      },
      {
        id: "fiona",
        label: "Fiona's rounds",
        body: "Fiona always clocks the time exactly. At 10:15 PM, on her fixed nightly loop, she heard a two-man argument — Rex and Silas, unmistakable — from the studio. On her 10:50 return loop it had gone silent and the door hung open. That's when she found him.",
        bullet: { id:"tb_fiona", name:"Fiona's Testimony", desc:"At exactly 10:15 PM Fiona heard 'Rex and Silas' fighting inside the studio. The whole frame rests on this." },
      },
      {
        id: "drive",
        label: "The studio drive",
        body: "The console is still powered, a track queued in the playback log. On the drive: a saved recording of an argument between 'Rex' and 'Silas.' File creation timestamp: 9:48 PM — six minutes after the stopwatch stopped. The 10:15 'fight' was a recording, cued to play through the hallway monitor.",
        bullet: { id:"tb_audio", name:"The Audio File (9:48)", desc:"The 'argument' is a recording created at 9:48 PM and played at 10:15. The voices were faked after Rex was already dead." },
      },
      {
        id: "silasvoice",
        label: "Listen to the recorded 'Silas'",
        body: "Play the file again. 'Silas' is panicking — pleading, raw, ordinary. He sounds like a scared, plain man. And that is impossible. The real Silas Thorne has not dropped his noir character once in living memory — not when accused, not right now in this very trial, fighting for his life in a dead man's voice. Under stress Silas gets MORE in character, never less. A 'Silas' who suddenly talks plain isn't Silas. It's a performance of Silas, built by someone who understood acting in general but not this actor's specific, total prison.",
        bullet: { id:"tb_wrongsilas", name:"The Wrong Silas", desc:"The recorded 'Silas' speaks plainly and panicked — which the real Silas physically cannot do. It's a performance of Silas by someone who didn't understand his pathology. Only a voice actor could build it." },
      },
      {
        id: "alibis",
        label: "Alibis: Itsuki, Silas, Imogen",
        body: "Itsuki was in the common room 10:00–10:30, loudly doing impressions — Caleb, Tanya, and Rowan all confirm it. Airtight... for the manufactured 10:15 moment. Silas claims he was alone 'working a case,' in character in the halls — unverifiable. Imogen's own ASMR session recorded continuously in another wing, timestamped straight through. The audio expert is cleared.",
        bullet: { id:"tb_alibi", name:"The Manufactured Alibi", desc:"Itsuki has an airtight alibi for 10:15 — the exact moment the fake fight 'proves' Rex died. An airtight alibi for a manufactured moment is evidence of the man who manufactured it." },
      },
    ],
  },
};

// ---- Class Trial: rounds of "nonstop debate" --------------------------------
// Each round shows statements; the player must fire the correct Truth Bullet
// at the flagged "weak point" statement.
const TRIALS = {
  case1: {
    rounds: [
      {
        prompt: "NONSTOP DEBATE — Who could have killed Tanya?",
        statements: [
          { text: "Anyone could've slipped something in her glass while the bar was busy.", weak:true, bullet:"tb_alone",
            success: "Wrong. The bar wasn't busy. Tanya and Declan were ALONE — one stool out, one glass, no second drinker. No outsider had the chance." },
          { text: "Tanya would never accept a drink from someone she didn't trust.", weak:false },
          { text: "There were no wounds, so it has to be poison of some kind.", weak:false },
        ],
        hint: "Someone's claiming there was opportunity for an outsider. What did the doorway tell you?",
      },
      {
        prompt: "NONSTOP DEBATE — But surely the poisoning was clumsy. An accident, even?",
        statements: [
          { text: "Maybe Tanya grabbed the wrong bottle herself. She was reckless.", weak:false },
          { text: "If it WAS poison, it was dumped in fast and sloppy — panic, not planning.", weak:true, bullet:"tb_dose",
            success: "No. The dosing was precise and MASKED by the drink's own bitterness. This wasn't sloppy panic — it was measured by someone who knows exactly how much is delicious and how much is lethal." },
          { text: "STATIC could have rigged the glass to frame one of us.", weak:false },
        ],
        hint: "How crude was the poisoning, really? Remember the residue in the glass.",
      },
      {
        prompt: "NONSTOP DEBATE — Fine. But why Declan? He barely knew her. Where's the connection?",
        statements: [
          { text: "Declan didn't care about Tanya at all — he ignored her like everyone else.", weak:true, bullet:"tb_log",
            success: "That's the lie. The man who 'doesn't care' recorded her exact order in his bar log, measured to the drop. Indifference doesn't keep records like that. He knew precisely what was in her hand." },
          { text: "Tanya promised she'd drink anything he served. We all heard her say it.", weak:false },
          { text: "Declan never even denied it when the body was found.", weak:false },
        ],
        hint: "'He doesn't care.' Does the evidence behind the bar agree with that?",
      },
    ],
    // final accusation
    accuse: {
      prompt: "It all points one way. Name the blackened who poured the last call.",
      options: [
        { name:"Declan Cross", correct:true },
        { name:"Nyx Valerius", correct:false },
        { name:"Sabrina Finch", correct:false },
        { name:"Jasmine Sterling", correct:false },
      ],
      wrong: "No — the evidence doesn't fit. Look again at the glass, the log, the empty doorway.",
      right: "Declan Cross. The Ultimate Mixologist, who served the one person who'd drink anything he made — and made it lethal, to prove a thing about himself he'd believed his whole life.",
    },
  },

  case3: {
    rounds: [
      {
        prompt: "NONSTOP DEBATE — Silas was the last voice with Rex, so Silas is the killer.",
        statements: [
          { text: "Fiona heard them, so Rex was alive and fighting Silas at 10:15 PM.", weak:true, bullet:"tb_watch",
            success: "Then explain the stopwatch. Rex's ever-running watch shattered at 9:42 PM. He couldn't be screaming at anyone at 10:15 — he'd already been dead for half an hour." },
          { text: "Silas can't even drop the act to deny it like a human being.", weak:false },
          { text: "Silas has no alibi for the whole evening.", weak:false },
        ],
        hint: "Two clocks disagree — Fiona's 10:15, and something Rex always carried.",
      },
      {
        prompt: "NONSTOP DEBATE — But the watch must've broken early. The voices prove Rex was alive at 10:15!",
        statements: [
          { text: "You can't fake a live two-man fight through a studio door.", weak:true, bullet:"tb_proof",
            success: "You don't fake it through a door — the booth is sealed. The only thing the hallway ever hears is the routed monitor feed. What Fiona heard at 10:15 wasn't two men. It was audio." },
          { text: "Maybe Rex broke his own watch hours earlier and it means nothing.", weak:false },
          { text: "STATIC could have rigged the whole scene to frame Silas.", weak:false },
        ],
        hint: "Where exactly does sound from that booth actually go?",
      },
      {
        prompt: "NONSTOP DEBATE — Fine, it was a recording. But anyone could press record — there's nothing pointing to who.",
        statements: [
          { text: "If it was on the drive, we'll never know when it was even made.", weak:true, bullet:"tb_audio",
            success: "Wrong — the file is timestamped. Created at 9:48 PM, six minutes after the watch stopped. Someone killed Rex at 9:42, recorded a fake fight at 9:48, and played it at 10:15 to bury the real time of death and pin it on Silas." },
          { text: "Imogen explained the soundproofing, so it's probably Imogen.", weak:false },
          { text: "The murder weapon was wiped, so there's no evidence at all.", weak:false },
        ],
        hint: "A file on a drive carries more than sound. What does it carry?",
      },
      {
        prompt: "NONSTOP DEBATE — A recording isn't enough. A master could mimic anyone — even a perfect Silas. There's no way to single one person out.",
        statements: [
          { text: "A great enough voice actor would nail the Silas voice flawlessly.", weak:true, bullet:"tb_wrongsilas",
            success: "Then listen to the 'Silas' on that file. He's panicking — plain, raw, ordinary. The real Silas has NEVER dropped his character, not even in this trial, fighting for his life. Under stress he gets MORE noir, not less. A plain, frightened Silas isn't Silas — it's a performance of Silas, built by someone who understood acting but not THIS actor's prison. Only one Ultimate could build it." },
          { text: "Itsuki has an airtight alibi at 10:15 — he can't be the killer.", weak:false },
          { text: "It could just as easily be Sienna; she loves this kind of thing.", weak:false },
        ],
        hint: "The fake fight has two voices. One of them is wrong in a way only this victim's pathology could expose.",
      },
    ],
    accuse: {
      prompt: "There's only one person whose whole talent is becoming other people's voices. Name the blackened.",
      options: [
        { name:"Itsuki Endo", correct:true },
        { name:"Silas Thorne", correct:false },
        { name:"Imogen Crane", correct:false },
        { name:"Sienna Fox", correct:false },
      ],
      wrong: "No. The frame wants Silas, the noise points at the audio crowd — but means isn't the question. Who could PERFORM it?",
      right: "Itsuki Endo. The Ultimate Voice Actor — who performed a living Rex and a frightened Silas into a sealed booth, and got everything right except the one man who can never sound plain.",
    },
  },
};

// ---- Free Time capstone events (the payoff of each route) --------------------
// Each is the moment that rhymes, exactly, with the murder motive it could
// have been. Completing one grants a "report card" entry.
const FREETIME = {
  itsuki: { who:"Itsuki Endo", lines:[
    "He does one last voice — yours, perfectly, gently — then drops it.",
    "\"That was me. Just then. Asking you to stay.\" Flat, unrehearsed, nothing like the others.",
    "He hands you a voice memo: him reading something in his own voice. The only recording of the real one that exists.",
  ], gift:"A voice memo of Itsuki, as himself." },
  silas: { who:"Silas Thorne", lines:[
    "You say his real name — not the detective's — and ask for one true thing without the voice.",
    "He gives you the annotated script of the role he's been hiding inside, in his real handwriting.",
    "He tells you one flat sentence about what happened. Then immediately tries to take it back.",
  ], gift:"The annotated script, in Silas's real hand." },
  imogen: { who:"Imogen Crane", lines:[
    "You let her whisper the cruelest true thing she has, and you only say: \"I know. I'm staying.\"",
    "She records you a track that isn't an insult, for once — your name, said gently, on a loop.",
    "It's the most naked thing she's ever made.",
  ], gift:"A track of your name, said kindly." },
  chloe: { who:"Chloe Carmichael", lines:[
    "You give her a gift with no pitch, no ask, no catch — and watch her wait a full ten seconds for the other shoe.",
    "It never drops. She tears up the downline sheet with your name on it.",
    "\"I don't want you in the business. I just want you.\"",
  ], gift:"A torn-up downline sheet." },
  jasmine: { who:"Jasmine Sterling", lines:[
    "She lets you photograph her mid-laugh — ugly, uncontrolled — and doesn't ask to delete it.",
    "Then she pries a rhinestone off the crown and presses it into your hand.",
    "\"The only thing I've ever given away on purpose.\"",
  ], gift:"A single rhinestone from the crown." },
  sienna: { who:"Sienna Fox", lines:[
    "She puts the phone down. Actually stops recording.",
    "She tells you a story with no episode, no hook, no monetization.",
    "Just because it's true, and it's yours.",
  ], gift:"An off-the-record story." },
  leo: { who:"Leo Graves", lines:[
    "The cameras-off version, finally. He tells you his real favorite movie — not the studio answer.",
    "He flinches when you applaud.",
    "Then he lets you applaud anyway.",
  ], gift:"His real favorite — and permission to clap." },
  caleb: { who:"Caleb \"Crash\" Riley", lines:[
    "He sits with you in a quiet room and doesn't reach for his pulse, doesn't need the rush.",
    "He admits, terrified, that stillness with you doesn't feel like dying for once.",
    "He gives you the helmet from his first stunt — the one he survived when he didn't expect to.",
  ], gift:"The helmet from his first stunt." },
  sabrina: { who:"Sabrina Finch", lines:[
    "She tells you one thing that's true and lets it stand — doesn't undercut it.",
    "It costs her more than any con ever did.",
    "Then she hands back your wallet with everything still in it. \"First time I've ever given something back.\"",
  ], gift:"Your wallet — everything still in it." },
  declan: { who:"Declan Cross", lines:[
    "He makes you a drink with nothing hidden in it. Just good, and kind.",
    "He watches you drink it, braced for proof that he's lethal — and you're fine.",
    "He gives you the recipe in his own hand. \"It's the only one I make that won't ruin you.\"",
  ], gift:"A recipe that won't ruin you." },
  fiona: { who:"Fiona Slate", lines:[
    "She throws out the run-sheet for one unplanned day with you and white-knuckles through not knowing what's next.",
    "Then she tears a blank page from her binder.",
    "\"This part. The part I can't plan. It's yours.\"",
  ], gift:"A blank page from the binder." },
  asher: { who:"Asher Finn", lines:[
    "He tells you about the real thing — the original betrayal that taught him to watch everything.",
    "He trusts you with the one secret he never turned into a theory.",
    "He shows you the notebook where, between the conspiracies, he's been tracking only the days you seemed okay.",
  ], gift:"The notebook of your good days." },
  tanya: { who:"Tanya \"T-Bone\" Jenkins", lines:[
    "She eats one bite slowly. Lets it last. Lets you last.",
    "She admits she's been afraid the whole time that good things get taken.",
    "Then she pushes half her food across the table — the most sacred thing she owns.",
  ], gift:"Half her plate." },
  rex: { who:"Rex Montgomery", lines:[
    "You out-argue him — clean, no bait — and instead of anger, the quiet, grateful thing crosses his face.",
    "He concedes a point for the first time in his life.",
    "He offers you his hand, with no rebuttal prepared.",
  ], gift:"A conceded point, and a handshake." },
  maeve: { who:"Maeve Harrow", lines:[
    "You ask her a real question about herself and wait out the silence until she answers.",
    "The un-dirt Maeve isn't boring at all.",
    "She hands over a secret she's never traded — her own — and asks for nothing back.",
  ], gift:"Her own secret, freely given." },
  elias: { who:"Elias Croft", lines:[
    "You catch him fully off-script, every move failing — and instead of mocking the collapse, you stay for the kid underneath.",
    "He takes the fedora off and sets it down.",
    "\"I don't think I need the bit with you.\"",
  ], gift:"The fedora, set down." },
  nyx: { who:"Nyx Valerius", lines:[
    "She lets herself care for you while you're warm, tolerating the unbearable risk that you could leave under your own power.",
    "You keep choosing to stay vertical, and stay anyway.",
    "She doesn't measure you for anything. \"I want you alive. That's new for me.\"",
  ], gift:"Not being measured for a casket." },
  rowan: { who:"Rowan \"Riot\" Price", lines:[
    "You call the bluff so gently it stops being a bluff.",
    "Rowan admits the unbearable thing: the life is fine, they're sad anyway, there's no story to blame.",
    "They finally actually light a clove and share it, the costume cracking into something real.",
  ], gift:"A shared clove, for real this time." },
  kieran: { who:"Kieran Holt", lines:[
    "Away from the bar, you make him feel worth something with no espresso to hide behind.",
    "He lets the snobbery go for one evening.",
    "He makes you a coffee with no lecture, no judgment — just the best thing he knows how to make, handed over plainly.",
  ], gift:"A coffee with no lecture." },
  noboru: { who:"Noboru Abe", lines:[
    "He chooses you — as Noboru, as a person, not a role in any hive — which no one ever did.",
    "He lets a bee land on your open palm and tells you it won't sting.",
    "He means: you're safe with me, in the only language he trusts.",
  ], gift:"A bee on your open palm, and trust." },
};

if (typeof module !== "undefined") module.exports = { INVESTIGATIONS, TRIALS, FREETIME };

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

  case2: {
    title: "Chapter 2 — What She Knew",
    intro: "A dressing room, a fallen mirror, and an alibi delivered before anyone asked. Collect every Truth Bullet.",
    spots: [
      {
        id: "body2",
        label: "Maeve's body (with Nyx)",
        body: "Blunt force to the temple — but the angle is wrong for a mirror toppling onto someone standing. The blow came level, from the side, with force behind it. Nyx, flat: \"This wasn't gravity. Something swung.\"",
        bullet: { id:"tb_angle", name:"Wrong Angle", desc:"The wound is a level, side-on blow — not consistent with a mirror falling on her. She was struck, then the scene was staged as an accident." },
      },
      {
        id: "mirror2",
        label: "The staged scene",
        body: "The vanity mirror lies across her, but the floor beneath is wrong: barely any shattered glass under the body, far too much swept neatly to one side. A genuine fall scatters glass everywhere. This was arranged after the fact by someone meticulous.",
        bullet: { id:"tb_staged", name:"Staged Accident", desc:"The glass was cleaned and re-placed — the 'accident' was composed afterward by a careful, premeditated hand." },
      },
      {
        id: "footage2",
        label: "The stage rehearsal footage",
        body: "Jasmine's alibi: continuous footage of her rehearsing on the main stage during the time of death. It's genuine, unedited footage — she's flawless in it, of course. Behind her, the big stage mirror catches the back wall... and the wall clock reflected in it.",
        bullet: { id:"tb_clock", name:"The Reflected Clock", desc:"In the mirror behind 'tonight's' rehearsal, the reflected wall clock reads ~20 minutes off the timestamp. The footage is real but from an earlier rehearsal — the one record she couldn't curate." },
      },
      {
        id: "secret2",
        label: "Maeve's hidden files",
        body: "Tucked in Maeve's lining: a single index card in her shorthand. A disqualifying secret about Jasmine — the kind that doesn't just lose a pageant but ends the whole carefully-built self. Maeve had been 'willing to trade.' Jasmine wasn't buying.",
        bullet: { id:"tb_dirt", name:"The Crown-Costing Secret", desc:"Maeve held dirt that would have destroyed the one thing Jasmine bled her whole life for. Motive, precise and total." },
      },
    ],
  },

  case4: {
    title: "Chapter 4 — Partners",
    intro: "A barista down behind his own counter, two used cups, and two suspects each blaming the other. Collect every Truth Bullet.",
    spots: [
      {
        id: "cups4",
        label: "The two coffee cups",
        body: "Two cups on the bar, both used, both made by Kieran with his usual snobbish precision. He served two guests his own coffee right before he died — and stayed behind the counter, relaxed, back turned. He was comfortable with both of them in the room.",
        bullet: { id:"tb_twocups", name:"Two Guests", desc:"Kieran made and served two coffees, then turned his back — two people were present and he trusted the situation enough to face away." },
      },
      {
        id: "blow4",
        label: "The counter & the body",
        body: "Kieran was struck from behind while at the espresso machine — but the geometry is impossible for one person. The angle of the blow needed someone behind the counter; yet the machine only lets one work there at a time without being noticed. Someone had to be in front, holding his attention, while someone slipped around back.",
        bullet: { id:"tb_twoperson", name:"A Two-Person Job", desc:"The kill required one person distracting Kieran from the front while a second came around behind. It could not have been done alone." },
      },
      {
        id: "stories4",
        label: "The conflicting alibis",
        body: "Chloe swears she left first and Elias stayed. Elias swears Chloe stayed the whole time and he left first. They cannot both be telling the truth — and neither will budge, because each is sure the smart play is to bury the other.",
        bullet: { id:"tb_conflict", name:"Incompatible Stories", desc:"Chloe and Elias each place the other at the scene while exonerating themselves. Mutually exclusive — they were both there." },
      },
      {
        id: "sheet4",
        label: "The recruitment sheet",
        body: "In Chloe's room, a 'joint venture' worksheet — her downline pitch, repurposed. Two names at the top: hers and Elias's. A plan written as a partnership: the murder sold to Elias as a team win, graduation split fifty-fifty. The 'opportunity' was the crime.",
        bullet: { id:"tb_partners", name:"The Partnership", desc:"Chloe recruited Elias into the murder as a 'joint venture.' Two culprits, working together — and each privately planning to let the other take the fall." },
      },
    ],
  },

  case5: {
    title: "Chapter 5 — Time of Death",
    intro: "A dead skeptic, and the one witness everyone has trusted all game holding the only autopsy. The murderer controls the evidence. Collect every Truth Bullet.",
    spots: [
      {
        id: "report5",
        label: "Nyx's autopsy report",
        body: "Clean, authoritative, trusted. Time of death: 11:00 PM. Cause: sedative overdose. Conveniently, Nyx was demonstrably with four others at eleven. The whole room is anchoring on the eleven-o'clock window — and on her alibi inside it.",
        bullet: { id:"tb_report", name:"The Autopsy (11 PM)", desc:"Nyx's own report fixes TOD at 11 PM — a time she has an alibi for. The cast has trusted her findings all game without ever checking them." },
      },
      {
        id: "lividity5",
        label: "The body itself",
        body: "Look past the report to Asher. The lividity — the way blood has pooled and fixed under the skin — is far too advanced for an 11 PM death. The body has been cooling for hours longer than the report claims. The flesh says early evening, not eleven.",
        bullet: { id:"tb_lividity", name:"What the Body Says", desc:"Lividity and cooling put the real time of death hours before 11 PM. The corpse contradicts the coroner's own report." },
      },
      {
        id: "hands5",
        label: "Nyx's hands",
        body: "Asher's last theory, scrawled in his notebook and confirmed in front of everyone: Nyx shakes around the living and goes still around the dead. She delivered this autopsy — the most important testimony of her life — without a single tremor. She has never been that calm around any of you. She was, in that moment, home.",
        bullet: { id:"tb_hands", name:"Steady Hands", desc:"The woman who trembles around the living delivered her report perfectly steady — calm only ever found around the dead. She wrote the findings; she controls the evidence." },
      },
      {
        id: "notebook5",
        label: "Asher's notebook",
        body: "Asher was the only one who never trusted Nyx's findings — pages of it, the lone skeptic poking at the one 'objective' authority in the room. And between the conspiracies, a quieter line about her: that she watched him the way she watched the bodies. He saw her clearly. That's why he had to be the one to go.",
        bullet: { id:"tb_skeptic", name:"The Only Skeptic", desc:"Asher alone distrusted Nyx's autopsies and was closing in. Silencing him meant the forensic authority would never be questioned again — and kept the one person 'leaving' her from leaving." },
      },
    ],
  },

  case6: {
    title: "Chapter 6 — The Last Episode",
    intro: "Not a crime scene — the whole season. Gather the tells you've been collecting since Chapter 1.",
    spots: [
      {
        id: "recorder6",
        label: "The phantom recorder",
        body: "Twice now, at the most horrific moments — Itsuki's confession, the steady-handed coroner — one person reached, by pure reflex, for a recorder that wasn't there. The day a true-crime podcaster stops recording is the day she's actually scared. She never truly stopped. She just lost the device.",
        bullet: { id:"tb_recorder", name:"The Reaching Hand", desc:"Sienna's reflex reach for a recorder at every climax — the storyteller's instinct, never switched off, at moments no detached observer would have." },
      },
      {
        id: "narration6",
        label: "Six chapters of narration",
        body: "Replay the season in your head. Every death, she narrated like a beat. 'Picture it.' 'That's a great episode.' 'A voice as a weapon, a voice as a confession.' She wasn't reacting to the show. She was writing it — out loud, in real time, the way a producer talks through a cut.",
        bullet: { id:"tb_narration", name:"The Editorial Voice", desc:"Sienna framed every murder as content as it happened — not a witness's horror but a producer's commentary. She was narrating her own show." },
      },
      {
        id: "motives6",
        label: "The tailored motives",
        body: "The Truth Recorder. The secret envelopes. The 'team graduation' rule that landed exactly when the two most validation-starved people were circling each other. Each motive was aimed, editorial, escalating like a season arc. Somebody knew this cast intimately and wrote pressure to fit each wound.",
        bullet: { id:"tb_motives", name:"Tailored Pressure", desc:"Every chapter's motive was custom-built to a specific wound and escalated like a writers'-room arc. Someone who'd studied the cast was scripting the season." },
      },
      {
        id: "static6",
        label: "STATIC itself",
        body: "Look at the host. A microphone. A recording light for an eye. The 'studio,' the 'ON AIR' sign, the 'ratings,' the 'segments.' This was never a school or a prison. It was always a broadcast. And a broadcast — STATIC said it himself — only ever read the lines it was given. A broadcast has a producer.",
        bullet: { id:"tb_broadcast", name:"It Was Always a Show", desc:"The entire game is staged as a broadcast, and STATIC admits to only reading given lines. A show has a producer — and only one Ultimate's talent is producing true-crime episodes." },
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

  case2: {
    rounds: [
      {
        prompt: "NONSTOP DEBATE — Poor Maeve. A terrible accident — the mirror simply fell on her.",
        statements: [
          { text: "The heavy mirror toppled and struck her as she stood there.", weak:true, bullet:"tb_angle",
            success: "No. The wound is a level, side-on blow with force behind it — not what a mirror falling from above leaves. She was struck by something swung. This was no accident." },
          { text: "Maeve made enemies of everyone; anyone might've wanted her gone.", weak:false },
          { text: "She was found beneath the mirror in her own dressing room.", weak:false },
        ],
        hint: "Does the shape of the wound match a mirror falling from above?",
      },
      {
        prompt: "NONSTOP DEBATE — Even if she was struck, Jasmine was rehearsing on stage. The footage proves it.",
        statements: [
          { text: "The continuous rehearsal footage puts Jasmine elsewhere at the time of death.", weak:true, bullet:"tb_clock",
            success: "The footage is real — but not from tonight. The wall clock reflected in the stage mirror behind her reads twenty minutes off. She replayed an earlier rehearsal as her alibi, and forgot the one record she couldn't curate: the clock in the glass." },
          { text: "The scene was staged, sure, but staging isn't proof of who did it.", weak:false },
          { text: "Jasmine would never risk her image on something so messy.", weak:false },
        ],
        hint: "The footage is genuine. So what in the frame doesn't belong to tonight?",
      },
      {
        prompt: "NONSTOP DEBATE — But why Jasmine? What could the gossip columnist possibly have on HER?",
        statements: [
          { text: "Jasmine had nothing to fear from Maeve — her record is spotless.", weak:true, bullet:"tb_dirt",
            success: "Wrong. Maeve was carrying a secret that wouldn't just cost a pageant — it would end the entire self Jasmine bled her whole life to build. For the woman who never once decided the crown wasn't worth it, that's a motive worth a life." },
          { text: "Maeve was 'always willing to trade' — maybe she traded with someone else.", weak:false },
          { text: "The secret envelopes from STATIC could point anywhere.", weak:false },
        ],
        hint: "What does a pageant queen fear more than anything? What did Maeve have?",
      },
    ],
    accuse: {
      prompt: "She won't crack on her face. Catch her on the math. Name the blackened.",
      options: [
        { name:"Jasmine Sterling", correct:true },
        { name:"Sabrina Finch", correct:false },
        { name:"Nyx Valerius", correct:false },
        { name:"Fiona Slate", correct:false },
      ],
      wrong: "No — the composure is flawless, but the evidence isn't about her composure. Re-check the wound, the clock, the secret.",
      right: "Jasmine Sterling. The Ultimate Pageant Queen, who staged a murder as clean as a stage and was undone by a clock she couldn't curate — never on her face, only on the math.",
    },
  },

  case4: {
    rounds: [
      {
        prompt: "NONSTOP DEBATE — It's a single killer. One person caught Kieran alone and struck him down.",
        statements: [
          { text: "One person could've struck him from behind while he worked.", weak:true, bullet:"tb_twoperson",
            success: "Not at that counter. The blow needed someone behind him — but the espresso station only fits one worker, and Kieran was wary. Someone had to hold his attention from the front while a second slipped around back. This took two." },
          { text: "Kieran served coffee to whoever did it before he died.", weak:false },
          { text: "He was struck from behind at the espresso machine.", weak:false },
        ],
        hint: "Could one person really get behind a wary Kieran at that counter unnoticed?",
      },
      {
        prompt: "NONSTOP DEBATE — Fine, two were there. But Chloe says she left first — so blame Elias alone.",
        statements: [
          { text: "Chloe left early, so only Elias was present for the murder.", weak:true, bullet:"tb_conflict",
            success: "But Elias swears the opposite — that Chloe stayed the whole time and HE left first. They each place the other at the scene. Both stories can't be true; the only way they reconcile is if they were both there the whole time." },
          { text: "Two used cups means Kieran was comfortable with both guests.", weak:false },
          { text: "STATIC's new rule allows a team to graduate together.", weak:false },
        ],
        hint: "Put Chloe's story next to Elias's. Can both be true?",
      },
      {
        prompt: "NONSTOP DEBATE — But those two? Working together? They're a scammer and a fool, not a team.",
        statements: [
          { text: "Chloe and Elias would never collaborate on anything.", weak:true, bullet:"tb_partners",
            success: "Except for the recruitment sheet in Chloe's room — a 'joint venture,' both their names at the top, the murder pitched as a downline win, graduation split fifty-fifty. They absolutely teamed up. They just each planned to let the other take the fall." },
          { text: "The conflicting stories prove they hate each other.", weak:false },
          { text: "Only one of them could actually have swung the blow.", weak:false },
        ],
        hint: "Was there anything in writing that put these two on the same side?",
      },
    ],
    accuse: {
      prompt: "Count carefully — the number of culprits matters. Name the blackened.",
      options: [
        { name:"Chloe AND Elias (both)", correct:true },
        { name:"Elias Croft alone", correct:false },
        { name:"Chloe Carmichael alone", correct:false },
        { name:"Sabrina Finch", correct:false },
      ],
      wrong: "No — name the right NUMBER. A two-person job, two conflicting stories, one partnership in writing.",
      right: "Chloe Carmichael AND Elias Croft. Two culprits who sold each other a partnership and were each quietly planning to let the other hang — a team that was never a team at all.",
    },
  },

  case5: {
    rounds: [
      {
        prompt: "NONSTOP DEBATE — The autopsy says 11 PM. So the killer is whoever lacks an alibi for eleven.",
        statements: [
          { text: "Time of death was 11 PM, exactly as the report states.", weak:true, bullet:"tb_lividity",
            success: "The body says otherwise. The lividity is far too advanced — blood pooled and fixed for hours longer than an 11 PM death allows. Asher died in the early evening, not at eleven. The report is wrong." },
          { text: "Asher was found in the archive room, where he often worked.", weak:false },
          { text: "The cause was a sedative, which anyone could have obtained.", weak:false },
        ],
        hint: "The report is one source. The body is another. Do they agree?",
      },
      {
        prompt: "NONSTOP DEBATE — That's absurd. The autopsy is objective evidence — why would the time be wrong?",
        statements: [
          { text: "The coroner's findings are neutral fact; they can't be faked.", weak:true, bullet:"tb_hands",
            success: "They can — when the coroner is the killer. Nyx is the only one who reads the bodies, and she delivered this report perfectly steady, the calm she only ever finds around the dead. She wrote a time of death that gave herself an alibi. She controls the very evidence we've trusted all game." },
          { text: "Nyx had no reason to lie about the time of death.", weak:false },
          { text: "Someone could have tampered with the body after she examined it.", weak:false },
        ],
        hint: "Who actually produces the 'objective' evidence in this room — and how were their hands?",
      },
      {
        prompt: "NONSTOP DEBATE — Even so — why Asher? He was harmless, just paranoid noise.",
        statements: [
          { text: "Asher posed no threat to anyone; he was all conspiracy and no substance.", weak:true, bullet:"tb_skeptic",
            success: "Asher was the one person who never trusted Nyx's findings — the lone skeptic closing in on the one authority no one else questioned. And he'd decided to leave her. Silencing him protected the lie and kept the person 'abandoning' her from ever walking away." },
          { text: "Asher's notebook was full of nonsense theories.", weak:false },
          { text: "The sedative cause points away from Nyx, not toward her.", weak:false },
        ],
        hint: "Of everyone, who was the single person actively distrusting the coroner?",
      },
    ],
    accuse: {
      prompt: "When the evidence itself can lie, believe the body. Name the blackened.",
      options: [
        { name:"Nyx Valerius", correct:true },
        { name:"Sabrina Finch", correct:false },
        { name:"Silas Thorne", correct:false },
        { name:"Fiona Slate", correct:false },
      ],
      wrong: "No — you're trusting a report written by your suspect. Re-check the body against the autopsy, and watch the hands.",
      right: "Nyx Valerius. The Ultimate Mortician, who lied in her own autopsy because she's the only one who reads the dead — and kept the man leaving her the only way she knew how.",
    },
  },

  case6: {
    rounds: [
      {
        prompt: "NONSTOP DEBATE — There's no body, no murder weapon. There's nothing here to even solve.",
        statements: [
          { text: "Without a crime scene, there's no way to point at a mastermind.", weak:true, bullet:"tb_broadcast",
            success: "Look at what this place actually is. A microphone host. A recording-light eye. 'ON AIR,' 'ratings,' 'segments.' It was never a prison — it was always a broadcast. And STATIC just told us he only read the lines he was given. A show has a producer." },
          { text: "STATIC confessed he wasn't the one in charge.", weak:false },
          { text: "The survivors are the only suspects left.", weak:false },
        ],
        hint: "What kind of place has STATIC been running this whole time?",
      },
      {
        prompt: "NONSTOP DEBATE — A producer, fine. But anyone could have been pulling strings from the shadows.",
        statements: [
          { text: "There's no telling who was actually scripting it — it could be anyone.", weak:true, bullet:"tb_narration",
            success: "There is a tell. Across all six chapters, one voice narrated every death like a beat — 'picture it,' 'that's a great episode,' 'a voice as a weapon, a voice as a confession.' That's not a witness reacting. That's a producer talking through a cut, in real time." },
          { text: "The motives were random pressure, nothing more.", weak:false },
          { text: "STATIC could have written all the lines himself.", weak:false },
        ],
        hint: "Who talked about the murders the way a showrunner talks about episodes?",
      },
      {
        prompt: "NONSTOP DEBATE — Narrating isn't producing. Where's the proof this person shaped the actual game?",
        statements: [
          { text: "The chapter motives were generic — they prove nothing about authorship.", weak:true, bullet:"tb_motives",
            success: "They were anything but generic. Each motive was aimed at a specific wound and escalated like a season arc — the Truth Recorder for the performers, the team rule landing exactly as the two loneliest people circled each other. Someone who'd studied this cast was writing the pressure. And only one Ultimate produces true-crime episodes for a living." },
          { text: "The phantom recorder is just a nervous habit.", weak:false },
          { text: "Plenty of people here understand drama and structure.", weak:false },
        ],
        hint: "Who in this building has the exact talent for scripting an escalating true-crime season?",
      },
    ],
    accuse: {
      prompt: "One last time — aim the truth at the lie. Who has been holding the pen?",
      options: [
        { name:"Sienna Fox", correct:true },
        { name:"Silas Thorne", correct:false },
        { name:"Sabrina Finch", correct:false },
        { name:"STATIC", correct:false },
      ],
      wrong: "No. STATIC only read the lines. Look for the one who narrated the season and had the talent to script it.",
      right: "Sienna Fox. The Ultimate True Crime Podcaster — the editorial voice over the entire game, who built a killing game to feel something she'd edited out of a thousand real ones, and never did, until the very end.",
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

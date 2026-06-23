// ============================================================================
//  STORY SCRIPT  —  "STATIC: A Killing Game"
//  Scene format consumed by engine.js. Each scene is an array of beats.
//  Beat kinds:
//    {s, who, t}          dialogue: sprite charId (s), speaker name (who), text (t)
//    {t}                  narration (no speaker)
//    {bg}                 change background class
//    {sfx}                screen flash effect: "shake","flash","glitch"
//    {choices:[{t,go}]}   branching choice -> jump to label
//    {go}                 unconditional jump to scene label
//    {give}               award a Truth Bullet id (logbook)
//    {investigate}        investigation hub (uses scene's spots)
//    {trial}              run a class-trial sequence (id into TRIALS)
//    {unlock:"freetime"}  open the free-time hub
//    {end}                return to title
// ============================================================================

const STORY = {

  // -------------------------------------------------------------- PROLOGUE
  prologue: [
    { bg:"bg-dark" },
    { t:"Cold tile against your cheek. The hum of a fluorescent light that's been left on too long." },
    { t:"You don't remember lying down. You don't remember the room. You don't remember—" },
    { sfx:"glitch" },
    { t:"—your own talent. There's a gap where it should be, smooth as a worn coin." },
    { s:"protagonist", who:"You", t:"...Where is this?" },
    { bg:"bg-studio" },
    { t:"You're in what looks like an abandoned broadcast studio. Padded walls. Dead microphones hanging like fruit. A red ON AIR sign, unlit." },
    { t:"Nineteen others are already awake. You make twenty-one." },
    { sfx:"flash" },
    { s:"static", who:"???", t:"GOOOOOOD EVENING, listeners! And welcome — to the only show that matters!" },
    { t:"Something drops from the rafters and lands on the producer's desk. A creature. Half vintage microphone, half something with too many teeth. One eye is a glowing red recording light." },
    { s:"static", who:"STATIC", t:"I'm STATIC — your host, your producer, your biggest fan! And YOU are my cast. Twenty-one Ultimates, one studio, and a premise the audience is going to DIE for." },
    { s:"sienna", who:"Sienna Fox", t:"Okay, that's an incredible cold open, I have to give it that." },
    { s:"declan", who:"Declan Cross", t:"Speak for yourself." },
    { s:"static", who:"STATIC", t:"The rules are simple, kittens. You live here now. Forever! UNLESS — you want to graduate." },
    { s:"static", who:"STATIC", t:"To graduate, you only have to do one teensy little thing: kill another cast member. And get away with it." },
    { sfx:"shake" },
    { s:"jasmine", who:"Jasmine Sterling", t:"...I'm sorry. Say that again, with the smile this time." },
    { s:"static", who:"STATIC", t:"After every murder, we hold a CLASS TRIAL! You debate, you accuse, you VOTE. Guess the blackened right — and the killer alone is punished. Guess WRONG—" },
    { s:"static", who:"STATIC", t:"—and the killer walks free, while the rest of you get cancelled. Permanently. Off the air!" },
    { s:"asher", who:"Asher Finn", t:"It's a closed system. Cameras everywhere, no exits, no off switch. I counted. I counted twice." },
    { s:"rex", who:"Rex Montgomery", t:"Define 'get away with it.' Burden of proof on the accuser, or the accused? Because that materially changes the game theory." },
    { s:"static", who:"STATIC", t:"Ohhh, I LIKE you. On the accuser, Bastard. Now — the mics are hot. Try not to bore me." },
    { t:"STATIC's recording light blinks, slow and patient, like it has all the time in the world." },
    { s:"protagonist", who:"You", t:"(Twenty strangers, every one of them a weapon. And a hole where my own name for myself should be.)" },
    { s:"protagonist", who:"You", t:"(I don't know what I'm the Ultimate of. But I know I'm going to figure out who did this — before it figures out me.)" },
    { go:"meet" },
  ],

  // -------------------------------------------------------------- MEET CAST
  meet: [
    { bg:"bg-studio" },
    { t:"In the long first hours, you take stock of the people you're trapped with. A few introduce themselves. Most just let you watch." },
    { s:"tanya", who:"Tanya \"T-Bone\" Jenkins", t:"There's a whole pantry back there. Industrial. You believe that? Whatever happens, we ain't starving." },
    { s:"declan", who:"Declan Cross", t:"There's also a bar. Fully stocked. I'd tell you to stay away from it, but nobody ever listens." },
    { s:"imogen", who:"Imogen Crane", t:"(leaning close, a breath against your ear) You're cataloguing exits and faces. Smart. Lonely, but smart." },
    { s:"sabrina", who:"Sabrina Finch", t:"Don't mind her. Come here, let me get a good look at you — oh, you're going to be one of my favorites, I can already tell." },
    { s:"protagonist", who:"You", t:"(Every word out of her mouth feels true and rehearsed at the same time.)" },
    { t:"You'll learn the rest of them soon enough. STATIC is in no hurry. STATIC, you're starting to understand, enjoys the waiting most of all." },
    { s:"static", who:"STATIC", t:"Settle in, cast! Get to know each other. The chemistry is EVERYTHING. Dead air is the only thing I can't forgive." },
    { t:"You can review the full roster any time from the cast gallery. For now, the studio settles into an uneasy quiet." },
    { go:"daily1" },
  ],

  // -------------------------------------------------------------- DAILY LIFE / MOTIVE
  daily1: [
    { bg:"bg-night" },
    { t:"DAY THREE. No one has slept much. The studio has a way of making the dark feel recorded." },
    { t:"Then STATIC delivers the first motive — slid under every door on a single index card." },
    { s:"static", who:"STATIC", t:"RATINGS ARE FLAT, people! So here's a little incentive. In 48 hours, I release one private recording of each of you to everyone else. Your worst moment. Your real one." },
    { s:"static", who:"STATIC", t:"Unless, of course, the show gets... interesting before then. A body would be SO interesting." },
    { s:"maeve", who:"Maeve Harrow", t:"He's monetizing secrets. That's my whole act. I'm almost offended." },
    { s:"tanya", who:"Tanya \"T-Bone\" Jenkins", t:"Pfft. Mine's just gonna be me eating. Joke's on him." },
    { t:"But you catch it — the flicker. The way her laugh lands a half-beat late. Whatever's on Tanya's tape, it isn't dinner." },
    { bg:"bg-bar" },
    { t:"That night you can't sleep, so you drift toward the only warm light left on: the bar." },
    { t:"Declan is there, of course. Polishing a glass he's already polished. And Tanya is perched on a stool, talking at him without pause, the way she does." },
    { s:"tanya", who:"Tanya", t:"C'mon, Declan, one for the road! You're the Ultimate Mixologist and you've never made ME anything. That's basically an insult." },
    { s:"declan", who:"Declan", t:"It's a kindness. Go to bed, Tanya." },
    { s:"tanya", who:"Tanya", t:"Make me one and I will. I'll drink anything you put in front of me. That's a promise." },
    { s:"protagonist", who:"You", t:"(He stares at her for a long moment. Something moves behind his eyes that I don't have a name for yet.)" },
    { s:"declan", who:"Declan", t:"...Fine. One. Then everyone goes to bed and I never do this again." },
    { t:"You leave them to it. The last thing you hear is ice against glass, and Tanya laughing, delighted to have finally won something." },
    { t:"You should have stayed." },
    { go:"discovery" },
  ],

  // -------------------------------------------------------------- THE BODY
  discovery: [
    { bg:"bg-dark" },
    { sfx:"flash" },
    { s:"static", who:"STATIC", t:"DING DONG! A body has been discovered! Cast to the bar, cast to the bar — we are LIVE, baby!" },
    { sfx:"shake" },
    { bg:"bg-bar" },
    { t:"Tanya is slumped at the end of the bar, cheek to the wood, an empty lowball glass tipped over by her open hand. She is not asleep." },
    { s:"jasmine", who:"Jasmine", t:"(perfectly composed) Don't touch anything. We'll need it exactly as it is." },
    { s:"nyx", who:"Nyx Valerius", t:"(crouching, unbothered) She's been gone perhaps two hours. No wound. No struggle. Her color's wrong." },
    { s:"nyx", who:"Nyx", t:"This is poison. Almost certainly something she drank." },
    { t:"Every head in the room turns, slowly, toward the man behind the bar." },
    { s:"declan", who:"Declan", t:"(very quietly) ...I knew it. I knew I'd be the one." },
    { s:"asher", who:"Asher", t:"That's not a denial. Anyone else notice that's not a denial?" },
    { s:"static", who:"STATIC", t:"You've got the run of the studio to investigate, kittens. Then — the CLASS TRIAL. Find me my killer, or I find you all an ending." },
    { s:"protagonist", who:"You", t:"(The loudest, most alive person here went silent first. And the only suspect is already grieving himself.)" },
    { s:"protagonist", who:"You", t:"(Don't assume. Look. Collect the truth, piece by piece.)" },
    { go:"investigate1" },
  ],

  // -------------------------------------------------------------- INVESTIGATION
  investigate1: [
    { bg:"bg-bar" },
    { t:"INVESTIGATION — examine everything. Gather the Truth Bullets you'll need in the trial. Visit all the spots, then begin." },
    { investigate:"case1" },
    { go:"trial1_intro" },
  ],

  // -------------------------------------------------------------- TRIAL INTRO
  trial1_intro: [
    { bg:"bg-trial" },
    { sfx:"glitch" },
    { s:"static", who:"STATIC", t:"And we're LIVE in five, four, three—" },
    { t:"The floor drops into a ring of podiums, one for each of you, one draped in black with Tanya's photo crossed out in red. The ON AIR sign blazes." },
    { s:"static", who:"STATIC", t:"This is a CLASS TRIAL! Discuss the case, find the contradictions, and vote for the blackened. Get it right, and only the killer pays." },
    { s:"rex", who:"Rex", t:"Then let's be rigorous. The prosecution's case writes itself: Declan made the drink, Declan hates everyone, Declan barely denied it. Quod erat demonstrandum." },
    { s:"declan", who:"Declan", t:"(flat) Sure. Vote me out. I told you I was poison. I've been telling everyone that for years." },
    { s:"protagonist", who:"You", t:"(He's not defending himself. He WANTS this. That's exactly why I can't let the room take the easy answer.)" },
    { s:"protagonist", who:"You", t:"(Listen for the statement that doesn't fit the evidence. Aim the truth at the lie.)" },
    { trial:"case1" },
    { go:"verdict1" },
  ],

  // -------------------------------------------------------------- VERDICT
  verdict1: [
    { bg:"bg-trial" },
    { s:"protagonist", who:"You", t:"It wasn't a murder. It was the opposite of one — and that's the cruelest part." },
    { s:"declan", who:"Declan", t:"...Stop. Don't." },
    { s:"protagonist", who:"You", t:"Tanya said it herself: 'I'll drink anything you put in front of me.' She meant it as a joke. As trust. Declan heard it as a dare he couldn't survive." },
    { s:"protagonist", who:"You", t:"You didn't poison her to escape, Declan. You poisoned her because she got close, and you've spent your whole life certain that anyone who gets close to you dies of it." },
    { s:"protagonist", who:"You", t:"You made yourself into the thing you swore you already were. The crack was the glass — you remembered her order in too much detail. Bitters, no garnish, exactly enough of the thing that killed her. A man who doesn't care doesn't measure that carefully." },
    { s:"declan", who:"Declan", t:"(a long silence) ...She trusted the glass. That was her only crime. And I proved her wrong, the way I always knew I would." },
    { s:"static", who:"STATIC", t:"The cast has voted! And the cast is — CORRECT! The blackened who served the last call: Declan Cross!" },
    { sfx:"glitch" },
    { s:"declan", who:"Declan", t:"Don't waste your grief on me. I'd have been the death of every one of you eventually. At least this way it was quick." },
    { go:"execution1" },
  ],

  // -------------------------------------------------------------- EXECUTION (stylized)
  execution1: [
    { bg:"bg-dark" },
    { sfx:"flash" },
    { s:"static", who:"STATIC", t:"It's time for the part the audience tunes in for! Declan Cross — your last call!" },
    { sfx:"shake" },
    { t:"EXECUTION: LAST CALL." },
    { t:"A spotlight. An enormous, gleaming bar that stretches to a vanishing point. Declan, alone behind it, bound to make one final drink." },
    { t:"Bottle after bottle pours itself into a glass the size of a man. He works without expression, the way he always said he would — precise, contemptuous, alone." },
    { t:"The light goes out on the ON AIR sign. The studio holds its breath. And then it is very, very quiet at the bar." },
    { bg:"bg-night" },
    { t:"Nobody speaks for a long time." },
    { s:"sienna", who:"Sienna", t:"(softly, and for once she is not narrating) ...He remembered all of our orders. Every one." },
    { s:"protagonist", who:"You", t:"(One down. The loudest and the loneliest, both gone in a single night. And nineteen of us left to learn what we're capable of.)" },
    { s:"static", who:"STATIC", t:"GREAT television, everybody! Truly. Rest up — the ratings only go one direction from here." },
    { go:"hub_intro" },
  ],

  // -------------------------------------------------------------- FREE TIME HUB
  hub_intro: [
    { bg:"bg-night" },
    { t:"In the hollow days that follow, the survivors do the only thing left to do between bodies: they try to know each other." },
    { t:"FREE TIME. Spend time with the cast. Every route is one wound, cracked open by love instead of pressure — the same act the murder would have been, aimed the other way." },
    { flag:"ch1done" },
    { unlock:"freetime" },
    { end:true },
  ],

  // ============================================================ CHAPTER 3
  //  "The Voice" — Victim: Rex.  Blackened: Itsuki.  Framed: Silas.
  ch3_intro: [
    { bg:"bg-studio" },
    { t:"CHAPTER 3 — \"THE VOICE.\"  Two more bodies came and went between then and now. The studio has learned to keep score." },
    { t:"At 8:00 PM, STATIC unveils the chapter's pressure." },
    { s:"static", who:"STATIC", t:"New segment, darlings! The TRUTH RECORDER. In forty-eight hours I play one clip of each of you over the PA — alone, unguarded, being who you ACTUALLY are. No performance. No bit. The real voice." },
    { t:"For most of the cast it's a humiliation. For the performers, it's a loaded gun." },
    { s:"itsuki", who:"Itsuki Endo", t:"(very lightly, in someone else's bright voice) Oh, fun. Can't wait to hear myself." },
    { s:"protagonist", who:"You", t:"(He's smiling in a voice that isn't his. And under it, for half a second, there's nothing at all.)" },
    { bg:"bg-night" },
    { t:"Rex has spent the whole chapter circling Itsuki like a dog with a bone — the voice actor is the most interesting puzzle in the building, and Rex cannot leave a deduction unspoken." },
    { s:"rex", who:"Rex Montgomery", t:"I've cracked you, you know. The recording's going to be silence. There's no one in there. And I'm going to say so — out loud — before the bear gets the chance." },
    { s:"itsuki", who:"Itsuki", t:"(a long, flat pause) ...That's a hell of a thing to say to a man, Rex." },
    { t:"Rex means it as a flex. It's a death sentence. His own." },
    { go:"ch3_discovery" },
  ],

  ch3_discovery: [
    { bg:"bg-dark" },
    { sfx:"glitch" },
    { s:"static", who:"STATIC", t:"DING DONG! A body has been discovered! AV wing, kittens — and oh, this one's GOOD." },
    { sfx:"shake" },
    { bg:"bg-studio" },
    { s:"fiona", who:"Fiona Slate", t:"It's Rex. The recording booth. I do my rounds on a fixed loop — I passed at 10:15 and heard him screaming at Silas, plain as anything. Came back at 10:50, the door was open, and..." },
    { s:"silas", who:"Silas Thorne", t:"(noir cadence, unwavering) Easy now, doll. I never laid a hand on the kid. I've been framed slicker than a three-card draw." },
    { s:"jasmine", who:"Jasmine", t:"You were the last voice with him, Silas. You have no alibi. And you can't even drop the act to deny it like a human being." },
    { s:"protagonist", who:"You", t:"(The whole room is thirty seconds from convicting Silas. Which is exactly why I'm not going to take the obvious answer. Look first.)" },
    { go:"ch3_investigate" },
  ],

  ch3_investigate: [
    { bg:"bg-studio" },
    { t:"INVESTIGATION — the recording booth, the body, the studio drive. Examine every spot, then begin the trial." },
    { clearBullets:true },
    { investigate:"case3" },
    { go:"ch3_trial_intro" },
  ],

  ch3_trial_intro: [
    { bg:"bg-trial" },
    { sfx:"glitch" },
    { s:"static", who:"STATIC", t:"LIVE again! You know the drill. The room wants Silas. Prove them right — or prove them wrong." },
    { s:"protagonist", who:"You", t:"(A voice was the last thing anyone heard from Rex. The whole case is whether a voice is proof a person was alive. Let's find out.)" },
    { trial:"case3" },
    { go:"ch3_verdict" },
  ],

  ch3_verdict: [
    { bg:"bg-trial" },
    // --- Rebuttal showdown: Itsuki becomes everyone ---
    { t:"REBUTTAL SHOWDOWN. Itsuki smiles. And then he comes apart into everyone." },
    { s:"itsuki", who:"Itsuki", t:"(in YOUR voice — pitch-perfect, warm, wounded) You don't actually believe this, do you? Come on. You KNOW me—" },
    { s:"itsuki", who:"Itsuki", t:"(snapping into Rex — alive, smug, insufferable) Relax, would you? I'm fine. Cite your source, detective, you've got nothing—" },
    { s:"itsuki", who:"Itsuki", t:"(a small, trembling voice no one has heard from him) I couldn't — I would never hurt anyone — please, you have to—" },
    { s:"itsuki", who:"Itsuki", t:"(now a grieving friend, cracking on cue) He was my FRIEND. You think I could sit in that booth with his body—" },
    { s:"sabrina", who:"Sabrina", t:"(almost admiring, almost afraid) He's wearing us. One at a time. He'll be whoever each of us can't bear to convict." },
    { s:"leo", who:"Leo", t:"(hoarse, white-faced) Stop it. Stop — pick one. Pick a fucking ONE." },
    // --- Speak as yourself ---
    { s:"protagonist", who:"You", t:"Itsuki. Stop. Defend yourself — right now, in your OWN voice. Not mine. Not Rex's. Not some stranger you invented. Just you." },
    { t:"Silence. And it stretches. The same silence from the quiet room, where you once asked him this exact thing and he bolted." },
    { t:"He doesn't bolt now. There's nowhere left. His mouth opens." },
    { s:"itsuki", who:"Itsuki", t:"(flat. no color. no music. no one home.) ...What do you want me to say." },
    { t:"The room goes very, very still. That's it. That's the voice — the one the Truth Recorder was going to broadcast in forty-eight hours. The nothing under the masks." },
    { s:"itsuki", who:"Itsuki", t:"(the same dead register, every word the same weight) Rex figured it out. That there's nothing in here. He was going to stand up and SAY it. Make it a joke, before the bear could even play the tape." },
    { s:"itsuki", who:"Itsuki", t:"I could survive being empty. (a long, level pause) I couldn't survive everyone KNOWING I was empty." },
    { s:"itsuki", who:"Itsuki", t:"So I made him quiet. Then I tried to be someone innocent instead. One more time. I've done a thousand voices. I never learned mine. This is it. There's no more of it than this." },
    // --- Verdict ---
    { s:"static", who:"STATIC", t:"UPUPU — he SANG! On his very own voice, no backup track! Cast your votes, kittens — though honestly, after that, do we even need to?" },
    { sfx:"glitch" },
    { s:"static", who:"STATIC", t:"Dingdingding! The blackened is the Ultimate Voice Actor — ITSUKI ENDO! Time for his solo!" },
    { s:"silas", who:"Silas", t:"(to the floor — and for half of one syllable the drawl falls clean off the word before he catches it) ...Kid saved my life by trying to wear me. (it's back instantly, the bunker sealing) ...World's a funny, mean little town, doll." },
    { s:"sienna", who:"Sienna", t:"(soft, transfixed, reaching again for a recorder she doesn't have) A voice as a weapon. A voice as a confession. The murder weapon AND the murder AND the man... God. Somebody should be writing this down." },
    { s:"protagonist", who:"You", t:"(Nobody clocks her. They will. File it away.)" },
    { s:"leo", who:"Leo", t:"(no venom left — which from Leo is the loudest thing he's ever said) I've pretended to be a hundred people I'm not. Whole childhood. At least I always knew which one was ME." },
    { s:"leo", who:"Leo", t:"He killed a guy so none of us would find out there was no one home. And we just made him say it out loud. To a full room." },
    { t:"You say nothing. There's nothing to add. There was never a version of tonight where Itsuki Endo got to stay hidden." },
    { go:"ch3_execution" },
  ],

  ch3_execution: [
    { bg:"bg-dark" },
    { sfx:"flash" },
    { s:"static", who:"STATIC", t:"EXECUTION TIME! Itsuki Endo — break a leg. Break all of them!" },
    { sfx:"shake" },
    { t:"EXECUTION: THE LAST BOOTH." },
    { t:"Itsuki is dragged into an endless recording studio that stretches past the horizon — booth after booth after booth. A red ON AIR light flares. A script drops." },
    { t:"He voices a character. Flawless. The light dies, the booth goes dark, and the next lights up — new script, new face, new voice. Faster. Faster. A thousand strangers pouring out of one throat, each perfect, none of them him." },
    { sfx:"glitch" },
    { t:"At the very end, every screen in every booth lights up at once and plays a single recording over the infinite speakers: Itsuki, alone, in his own flat voice, saying nothing at all." },
    { t:"The Truth Recorder, finally aired — to a stadium of no one. And the lights go out for good." },
    { bg:"bg-night" },
    { s:"sienna", who:"Sienna Fox", t:"(too lit up, reaching twice for a recorder that isn't there) ...That was incredible. The structure of it. A voice became a weapon became a confession. God, what a—" },
    { s:"sienna", who:"Sienna", t:"(catching herself) ...sorry. What a waste. That's what I meant." },
    { s:"protagonist", who:"You", t:"(She doesn't realize she's auditioning for a job she'll eventually take. Neither do they. File it away.)" },
    { flag:"ch3done" },
    { go:"hub_intro" },
  ],
};

// Closing card shown if the player exhausts everything.
const OUTRO = [
  { bg:"bg-dark" },
  { t:"END OF THE DEMO BUILD." },
  { t:"Chapter 1 — \"Last Call\" — is complete, and the Free Time routes are open." },
  { t:"Twenty Ultimates. Twenty wounds. One machine where the dating sim and the killing game were never two games at all." },
  { t:"Thank you for playing STATIC." },
  { end:true },
];

if (typeof module !== "undefined") module.exports = { STORY, OUTRO };

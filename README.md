# STATIC — A Killing Game

A **Danganronpa-style visual novel** built in vanilla HTML/CSS/JS — no build step, no
dependencies. It implements *The Ultimate Roster*: twenty Ultimates, twenty different
ways to be broken, plus the 21st seat (you), trapped in a broadcast studio by a
microphone-shaped mascot called **STATIC**.

The pitch the design is built on: **the dating sim and the killing game are one machine.**
Every character has a single wound. The Free Time route is that wound cracked open by
*love*. The murder is the same wound cracked open by *pressure*. Same act, aimed in
opposite directions.

## Play it

Open `index.html` in any modern browser. That's it.

> Some browsers restrict `localStorage` on `file://`. If "Continue" misbehaves, serve
> the folder instead: `python3 -m http.server` then visit `http://localhost:8000`.

Click or press **Space / Enter** to advance dialogue.

## What's in the build

- **Full cast gallery** — all 20 Ultimates with procedurally-drawn SVG sprites,
  bios, signature lines, and "the tell" that betrays them. Each sprite is generated
  from the character's palette, hair silhouette, eye shape, and talent emblem.
- **A complete six-chapter season.** Each case is the full loop: motive → body
  discovery → **investigation** (collect Truth Bullets) → **class trial** (nonstop
  debate: load a Truth Bullet, fire it at the contradiction) → verdict → stylized
  execution. Chapters unlock in order from the Free Time hub.
  1. **"Last Call"** — Tanya / Declan. The poison cocktail and the man certain he's lethal.
  2. **"What She Knew"** — Maeve / Jasmine. A flawless killer caught not on her face but on the clock she couldn't curate.
  3. **"The Voice"** — Rex / Itsuki (framing Silas). A voice as proof of a living person — and the perfect Silas that's wrong the one way only Silas could expose.
  4. **"Partners"** — Kieran / Chloe + Elias. Two culprits, two conflicting stories, one partnership that was never a partnership.
  5. **"Time of Death"** — Asher / Nyx. The case where the murderer controls the forensic evidence, and you have to believe the body over the coroner.
  6. **"The Last Episode"** — the mastermind unmasking. Not a murder to solve, but the season itself: who's been holding the pen, and whether the narrator can finally feel one of them.
- **Free Time hub** — a six-event arc's capstone for every survivor: the mask drops
  on purpose, once, and they hand you the wound itself. Bonds are tracked and saved.

## Project layout

```
index.html            # shell: title, VN stage, overlay
css/style.css         # the ink-black / bone / hot-pink broadcast skin + CRT scanlines
data/characters.js    # the 21-seat roster: palettes, bios, taglines, tells
js/portraits.js       # procedural SVG sprite generator
js/story.js           # scene scripts (prologue, Ch.1, Ch.3, hub, outro)
js/casedata.js        # investigation spots, truth bullets, trials, free-time events
js/engine.js          # the VN runtime: dialogue, choices, investigation, trial, hub, saves
```

## Extending it

- **New character:** add an entry to `CHARACTERS` and (optionally) a cosmetic row in
  `PORTRAIT_STYLE`, then list them in `ROSTER_ORDER` and add a `FREETIME` capstone.
- **New case:** add scenes to `STORY`, an entry to `INVESTIGATIONS` and `TRIALS`
  (the validator enforces exactly one weak statement per debate round and that every
  fired bullet is collectable), then wire a button in the Free Time hub.

All six chapters of the design doc's suggested spine are implemented. New chapters
slot into the same scene/case format, gated by sequential `chNdone` flags in
`CHAPTER_FLOW` (engine.js).

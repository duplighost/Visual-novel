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
- **Chapter 1 — "Last Call"** — Victim: Tanya. Blackened: Declan. Full loop:
  prologue → motive → body discovery → **investigation** (collect Truth Bullets) →
  **class trial** (nonstop debate: load a Truth Bullet, fire it at the contradiction) →
  verdict → stylized execution.
- **Chapter 3 — "The Voice"** — Victim: Rex. Blackened: Itsuki. Framed: Silas. The
  case where a voice is treated as proof of a living person — and the killer's perfect
  Silas impression is wrong in the one way only Silas's pathology could expose.
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

The remaining chapters from the design doc (Ch.2 *What She Knew*, Ch.4 *Partners*,
Ch.5 *Time of Death*, Ch.6 *The Last Episode*) slot into the same scene/case format.

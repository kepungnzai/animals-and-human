# Animal Discovery HQ 🐾

A playful, self-contained learning page for kids aged 8–9 about recent animal discoveries,
with animated illustrations and an interactive quiz at the end.

## How to open it
- Double-click **`index.html`** — everything (pictures, animations, quiz) works straight from
  the file, no internet needed. (Google Fonts are a nice-to-have; the page falls back to
  built-in playful fonts if you are offline.)
- Ages: 8–9. Suggested use: read the page together, let the child flip the cards, then take
  the Big Quiz.

## What's inside
| File               | Purpose                                                              |
|--------------------|----------------------------------------------------------------------|
| `index.html`       | The whole main lesson page (text + hand-drawn SVG illustrations)     |
| `styles.css`       | Colours, layout, animations (floating clouds, bubbles, flip cards…)  |
| `app.js`           | Main-page interactions: card flip, scroll reveal, 6-question quiz    |
| `dumbo-octopus.html` | Sub-page: Dumbo Octopus deep-sea anatomy (see below)               |
| `dumbo.css`        | Deep-sea theme + anatomy diagram / depth ladder styles               |
| `dumbo.js`         | Sub-page interactions: anatomy map + 5-question mini quiz            |
| `axolotl-regeneration.html` | Sub-page: Axolotl regeneration (see below)                    |
| `axolotl.css`      | Fresh pond theme + regrow cards / recipe steps styles                |
| `axolotl.js`       | Sub-page interactions: scroll reveal + 5-question mini quiz          |
| `snake-antivenom.html` | Sub-page: Snake venom to medicine (see below)                     |
| `snake.css`        | Savanna-lab theme + steps / lock-and-key / safety styles             |
| `snake.js`         | Sub-page interactions: scroll reveal + 6-question mini quiz          |
| `naked-mole-rat.html` | Sub-page: Naked mole-rat superpowers (see below)                  |
| `molerat.css`      | Underground-earth theme + superpowers / engineering styles           |
| `molerat.js`       | Sub-page interactions: scroll reveal + 6-question mini quiz          |
| `seastar-regeneration.html` | Sub-page: Sea star regeneration (see below)                    |
| `seastar.css`      | Coral-reef theme + how-it-grows steps / DNA section styles           |
| `seastar.js`       | Sub-page interactions: scroll reveal + 6-question mini quiz          |

## Sub-page: `seastar-regeneration.html` 🌊
From the Deep-Dive grid on the main page → “Sea Star Regeneration → Dive in!”, or open the file directly.

It answers: **how does a sea star regrow lost arms completely, is it in their DNA, and what are
researchers learning for human limb regrowth?**
- **Meet the Sea Star** — not a fish, no brain/blood, water vascular system + tube feet, arm-tip eye spots, ~1,900 species.
- **How It Grows Back** — why (autotomy = drop the grabbed arm; comet form = new star from one arm + disc), then 5 steps:
  seal wound → rebuild the watery inside (coelom) → the tip with the terminal tube foot grows first →
  cells dedifferentiate into “builder cells” → weeks-to-months of growth (faster in warm water).
- **Is It Their DNA?** — YES. DNA is the recipe book; *gene expression* is which recipes cook. Re-growing re-activates
  embryo/baby building genes; key families: Wnt, BMP, FGF, retinoic acid, Hox. Tool: single-cell RNA-seq; 2022–23 sea-star “cell maps”.
- **For Human Healing** — why humans scar instead of regrow, the research dream (fingertips, organs, spinal-cord healing),
  human stem-cell limits (Wikipedia notes human-medicine implications), people already regrow a little (liver/skin/fingertip tips).
- **Mini Quiz** — 6 questions with explanations, stars and confetti.

## Sub-page: `naked-mole-rat.html` 🐀
From the Deep-Dive grid on the main page → “Naked Mole-Rat → Dig in!”, or open the file directly.

It answers: **why is the naked mole-rat special (cancer resistance + low-oxygen tolerance),
and what are scientists engineering from what they learned?**
- **Meet the Mole-Rat** — East Africa, ~8–10 cm, wrinkly pink skin, moving buck teeth, a “queen”.
- **Superpowers**
  1. Nearly cancer-proof (2009 double-lock p16+p27; 2013 giant HMW-HA jelly-sugar cover story in
     *Nature* + error-free ribosomes; *Science* “Vertebrate of the Year 2013”).
  2. Survives 18 min with zero oxygen & 5 hours at 5% oxygen; heart ~200→50 bpm; 2017 plant-like
     fructose trick (*Science*).
  3. Lives 37+ years (longest-lived rodent); “negligible senescence” (mortality doesn’t rise with age).
- **Science Lab: What we’re engineering** — 2023: transferred the mole-rat’s Has2 gene into mice →
  healthier + ~4.4% longer life; ribosome research; dreams of stroke/heart-attack protection.
- **Mini Quiz** — 6 questions with explanations, stars and confetti.

## Sub-page: `snake-antivenom.html` 🐍
From the featured Anaconda card → “How Does Venom Become Antivenom?”, or open the file directly.

It answers: **how do humans use snake venom to make antivenom (a cure), how does it work, and
can one antivenom fix all bites?**
- **The Problem** — WHO stats: ~5.4M snakebites/year, 81–138k deaths.
- **How It’s Made** — 4 steps: milking venom → horse/sheep antibody factory → purify antibodies →
  the neutralizing injection. (Milking, boosting, freeze-dried powder lasts ~5 years.)
- **The Right Key** — venom toxins are “locks”, antibodies are “keys”. Monovalent vs polyvalent;
  NO universal antivenom yet — but 2024 synthetic-antibody research made a big step.
- **Venom Medicine** — bonus cures: captopril (blood-pressure pill from jararaca pit viper),
  clotting tests/surgical glue, future pain-killers.
- **Bite Safety** — the S.T.O.P. rules (do’s) and the old myths to never try (sucking, cutting, tying).
- **Mini Quiz** — 6 questions with explanations, stars and confetti.

## Sub-page: `axolotl-regeneration.html` 🦎
From the main page flip the Axolotl card → “Regrow with it”, or open the file directly.

It answers: **why can the axolotl regrow parts of its body, and what limits does it have?**
- **The Big Reason** — losing a tail/leg saves its life; it heals without scars.
- **What CAN It Regrow?** — legs, tail (with spinal cord), gills, lower jaw, skin (no scar),
  parts of heart, parts of brain, eye tissues.
- **The Secret Recipe** — 5 steps: fast wound cover → nerve signals → blastema builder cells
  (dedifferentiation) → blueprint reading (axes) → macrophage quiet parts.
- **The Real Limits** (honest answers!) — no whole head/brain, takes weeks–months, slows with age,
  needs the right helpers, and fades after metamorphosis.
- **Why Scientists Care** — 2022 giant genome (10× human), dreams of healing spinal cords/hearts,
  2025 good news for critically endangered wild axolotls.
- **Mini Quiz** — 5 questions with explanations, stars and confetti.

## Sub-page: `dumbo-octopus.html` 🐙
From the main page tap the Dumbo card back → “Dive deeper”, or open the file directly.

It answers: **what anatomy lets the dumbo octopus survive the deep sea?**
- **The Big Squeeze** — why dense pressure pops air-pockets, but a water-balloon body is fine.
- **Look Inside** — an interactive, animated anatomy diagram (tap numbered dots or cards):
  1. Finny fins (energy-saving swimming) · 2. Large night-vision eyes ·
  3. Gelatinous jelly mantle (pressure-proof) · 4. Webbed umbrella arms ·
  5. Cirri + suckers (sweeping food from the mud) · 6. Funnel (gentle jets).
- **Superpowers** — no ink sac, low metabolism, small size (20–30 cm), cold-proof jelly.
- **Where It Lives** — animated 0 → 7,000 m depth ladder (record sighting 7,279 m).
- **Mini Quiz** — 5 questions with explanations, stars and confetti.

## Page structure (a quick lesson flow)
1. **Hero** — hook the explorer with floating animals.
2. **Featured Animal of the Week** — the Northern Green Anaconda, the brand-new species that
   scientists announced in **February 2024** (DNA showed northern anacondas are a separate species).
3. **Three more Animal Pals** (tap-to-flip cards), each with a recent finding:
   - **Dumbo Octopus** — deepest-living octopus; newest sighting March 2025 (Gulf of Guinea).
   - **Axolotl** — regenerates legs, tail, gills, heart and brain parts; wild ones survive in
     only one lake system in Mexico (critically endangered).
   - **Peacock Spider** — 4–5 mm dancer with a rainbow fan; 100+ species and new ones found
     every year in Australia.
4. **The Big Quiz** — 6 multiple-choice questions with instant feedback, progress bar,
   star rating, a badge and confetti.

## Teacher/parent tips
- Every “wow fact” on the page is checked against real 2024–2025 science news (Wikipedia
  citations), worded in short, kid-friendly sentences.
- The quiz is forgiving: every question shows a mini explanation so a wrong answer still
  teaches something.
- Try the “Re-read the facts” link on the results screen after a round.

## Extending it
- Add another animal: copy one `<article class="animal-card">` block in `index.html`, draw a
  small inline SVG for it (see the others), and add a matching quiz question in `app.js`
  (`var quizData = [...]`). Update `.card-grid` will re-flow automatically.
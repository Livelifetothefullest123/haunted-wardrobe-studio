# Haunted Wardrobe Studio — Design

## Overview
Plain HTML, CSS, and vanilla JavaScript, one page, no backend. The same logic file powers both the browser UI and the Node tests, so the tested behaviour is the behaviour judges see.

## Architecture
- `index.html` — page structure: header, four picker groups, one plan section (title, meta, main costume, accessories, hair/makeup, DIY note, cost breakdown, total, checklist), a short "How it works" section, and the footer. Loads `style.css` and `app.js`.
- `style.css` — dark purple/black theme with orange/gold accents, large rounded picker buttons, a light plan card for contrast and readability, and a 390px media query.
- `app.js` — data + logic + UI:
  - Picker option lists, in the exact order given in the requirements.
  - `BASE_PLANS`: 20 base plans, one per vibe (5) × occasion (4), each with title, main costume, 3 accessories, hair, makeup, and a DIY/buy note.
  - `COMFORT_ITEMS`: one comfort layer per comfort option.
  - `getPlan(occasion, vibe, budget, comfort)`: validates the four pickers, picks the base plan by vibe + occasion, computes a deterministic target total inside the budget band from the combination index, and distributes that total across four cost items (Main costume 60%, Accessories 20%, Hair & makeup 12%, Comfort layer 8%) using a largest-remainder distribution, so the breakdown sums exactly to the total.
  - Browser UI: picker buttons update state and re-render the plan immediately; checklist checkboxes are plain DOM checkboxes, session-only, with no storage.
  - Node export: `module.exports` is guarded by `typeof module`, so the browser does not break and Node tests can import the same functions.

## Cost model
- Under $25 DIY: $18.99 + ($0–$4.00 in $1 steps by combination index) — always below $25.
- $25–$50: $34.99 + ($0–$14.00 in $2 steps by combination index) — always $25–$50.
- $50+: $59.99 + ($0–$25.00 in $5 steps by combination index) — always above $50.
- Sample combination (Halloween party, Witchy glam, $25–$50, Chilly outdoors) has combination index 4, giving $34.99 + $8.00 = $42.99.

## Correctness
- `test-wardrobe.js` imports `getPlan` from `app.js` and checks all 180 combinations (4 × 5 × 3 × 3), cost sums, budget bands, checklists, required fields, the sample plan, and invalid input handling.

## Errors handled
- Invalid picker values return `null` from `getPlan` instead of crashing; the UI only calls it with valid picker values, and the browser guards against a missing plan by returning early.

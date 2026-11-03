# Haunted Wardrobe Studio

**A Halloween costume planner for girls and women, built for Kiroween 2026 in the Costume Contest category.**

Pick an occasion, a vibe, a budget, and the weather — get a complete costume plan, with a cost breakdown that adds up and a checklist to tick off before you leave.

## How to run it

No install, no build step, no backend, no account.

Open `index.html` in any modern browser (or serve this folder with any static server and open the page).

## The picker flow

1. **Occasion:** Halloween party, Trick-or-treat, School, Photo shoot.
2. **Vibe:** Witchy glam, Vampire elegant, Ghostly, Pumpkin patch, Fairy twilight.
3. **Budget:** Under $25 DIY, $25-$50, $50+.
4. **Comfort:** Warm indoors, Chilly outdoors, Rainy.

Every combination (4 × 5 × 3 × 3 = 180 combinations) returns a real, complete plan, never a blank state. The base costume comes from your vibe and occasion, the total is scaled to stay inside your budget band, and a comfort layer is added: a light shawl for warm indoors, a warm cloak/coat layer for chilly outdoors, and a clear rain cape with waterproof shoe covers for rain.

Each plan shows: main costume, accessories, hair and makeup, a DIY vs buy note, a cost breakdown that sums exactly to the displayed total, and a tick-off checklist (checkboxes in the browser only, session-only, no storage).

## Sample plan on load

The app loads with a complete sample already shown:

- **Pickers:** Halloween party, Witchy glam, $25-$50, Chilly outdoors
- **Plan:** Midnight Witch in Velvet
- **Main costume:** Long velvet gown in deep plum with a starry cape
- **Accessories:** Wide-brim witch hat, Crescent moon necklace, Striped stockings
- **Hair:** Loose waves with a silver streak clip
- **Makeup:** Smoky purple eyes and deep plum lips
- **Comfort layer:** Warm cloak / coat layer — fits over the costume
- **Total:** $42.99, inside the $25-$50 band, with the breakdown summing exactly to $42.99

## How Kiro was used

This project was built spec-first, not by vibe coding alone:

- **Spec-driven development:** The spec in `.kiro/specs/haunted-wardrobe/` was written before the app code: `requirements.md` first (what the app must do), then `design.md` (how the plan, cost, and UI logic work), then `tasks.md` (the implementation steps, checked off as done). The spec forced decisions up front — for example, that every combination must return a plan, that money must be in integer cents, and that totals must stay inside their budget band — instead of discovering those rules while coding. Compared with vibe coding, the spec made the build easier to test: the tests in `test-wardrobe.js` check the spec's requirements directly, so a failing test points back to a named requirement.
- **Steering docs:** `.kiro/steering/product.md` keeps the product women/girls-centred, generic (no copyrighted characters), and readable; `tech.md` keeps the stack to plain HTML/CSS/JS with no backend or dependencies; `structure.md` keeps file names and roles fixed. The biggest difference steering made was consistency: the plan card, cost model, and file list stayed the same across the whole build, instead of drifting as new ideas were added.
- **Hooks:** `.kiro/hooks/run-tests.json` documents a hook to run `node test-wardrobe.js` when `app.js` changes, so a broken plan, cost sum, or budget band is caught immediately. The exact hook schema and trigger behaviour can vary by Kiro version, so check your Kiro version's hook documentation before relying on automatic triggering; the manual fallback always works: `node test-wardrobe.js` and `node --check app.js`.
- **What was not claimed:** No real Kiro IDE session, Kiro account, Kiro credits, GitHub repo, demo URL, or video link is claimed here. Those steps are still pending on the project owner's side. The `.kiro` folder in this project is the spec, steering, and hook configuration for this build, and it must not be added to any `.gitignore`.

## Files

- `index.html` — page structure and picker/plan sections
- `style.css` — dark purple/black theme with orange/gold accents, mobile-first
- `app.js` — picker lists, 20 base plans, cost logic, and browser UI
- `test-wardrobe.js` — automated tests (run with Node, no dependencies)
- `.kiro/specs/haunted-wardrobe/requirements.md` — requirements
- `.kiro/specs/haunted-wardrobe/design.md` — design
- `.kiro/specs/haunted-wardrobe/tasks.md` — implementation tasks
- `.kiro/steering/product.md`, `tech.md`, `structure.md` — steering docs
- `.kiro/hooks/run-tests.json` — hook configuration for running tests on `app.js` changes
- `LICENSE` — MIT

## Tests

Run the tests (no dependencies):

```bash
node test-wardrobe.js
node --check app.js
```

Tests cover: all 180 picker combinations return a plan, every cost breakdown sums exactly to its total, every total is inside its budget band, every plan has a non-empty checklist and all required fields, the sample plan is correct, and invalid picker input returns null instead of crashing.

## Privacy and safety

No credentials, secrets, API keys, or accounts are in this repo. No login is required, and no data leaves the browser — the checklist is session-only, with no storage.

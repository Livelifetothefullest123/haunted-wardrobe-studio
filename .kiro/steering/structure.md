# Structure steering

Project root, Haunted Wardrobe Studio:

- `index.html` — page structure and picker/plan sections. Loads `style.css` and `app.js`.
- `style.css` — theme, picker buttons, plan card, checklist, 390px media query.
- `app.js` — picker lists, 20 base plans, comfort items, cost distribution, `getPlan()`, and the browser UI. Exports the same functions for Node tests.
- `test-wardrobe.js` — Node tests, no dependencies. Run with `node test-wardrobe.js`.
- `README.md` — what it does, how to run it, the sample plan, the Kiro write-up, files, tests, license.
- `LICENSE` — MIT, Copyright 2026 Haunted Wardrobe Studio.
- `.kiro/specs/haunted-wardrobe/requirements.md` — requirements, written first.
- `.kiro/specs/haunted-wardrobe/design.md` — design, matching the code as built.
- `.kiro/specs/haunted-wardrobe/tasks.md` — implementation tasks, checked off as done.
- `.kiro/steering/product.md`, `tech.md`, `structure.md` — this steering set.
- `.kiro/hooks/run-tests.json` — hook configuration describing running the tests when `app.js` changes.

Rules:
- Do NOT add the `.kiro` directory or its sub-folders to any `.gitignore`. Kiroween requires it at the repo root.
- Do NOT add a backend, a build step, or a dependency without updating the spec, the design, and the README first.
- Keep file names exactly as listed above, so the README file list stays accurate.

# Haunted Wardrobe Studio — Requirements

## Introduction
A Halloween costume planner for girls and women, built for Kiroween 2026 in the Costume Contest category. It must be spooky and polished, but first of all readable and usable on a phone.

## Requirements

### Requirement 1: Four pickers
- WHEN a user opens the app, THEN four picker groups are shown: Occasion, Vibe, Budget, and Comfort.
- WHEN a picker option is tapped, THEN the plan updates immediately, with no page reload.
- Occasion options SHALL be: Halloween party, Trick-or-treat, School, Photo shoot.
- Vibe options SHALL be: Witchy glam, Vampire elegant, Ghostly, Pumpkin patch, Fairy twilight.
- Budget options SHALL be: Under $25 DIY, $25-$50, $50+.
- Comfort options SHALL be: Warm indoors, Chilly outdoors, Rainy.

### Requirement 2: A complete plan for every combination
- WHEN any valid combination of the four pickers is chosen, THEN a complete costume plan is shown, never a blank or error state.
- The plan SHALL include: a title, main costume, accessories, hair, makeup, a DIY vs buy note, a comfort layer, a cost breakdown, a total, and a tick-off checklist.
- The base plan SHALL be chosen deterministically by vibe + occasion, so the same pickers always give the same base costume.

### Requirement 3: Costs that add up, inside the budget band
- WHEN a plan is shown, THEN its cost breakdown SHALL sum exactly to its displayed total, to the cent.
- WHEN the budget is Under $25 DIY, THEN the total SHALL be below $25.
- WHEN the budget is $25-$50, THEN the total SHALL be between $25 and $50 inclusive.
- WHEN the budget is $50+, THEN the total SHALL be above $50.
- The comfort layer SHALL change with comfort: a light shawl for warm indoors, a warm cloak/coat layer for chilly outdoors, and a clear rain cape with waterproof shoe covers for rain.

### Requirement 4: Sample plan on load
- WHEN the app first loads, THEN a complete sample plan is shown for: Halloween party, Witchy glam, $25-$50, Chilly outdoors.
- The sample plan SHALL be titled "Midnight Witch in Velvet" with a total of $42.99.

### Requirement 5: Checklist, no login, no backend
- WHEN a plan is shown, THEN a tick-off checklist is shown, with checkboxes in the browser only.
- The app SHALL NOT require a login, a backend, a build step, a dependency, or an API key.
- The app SHALL NOT use copyrighted or trademarked characters, names, or franchises. All costume themes SHALL be generic.

### Requirement 6: Polished, readable, mobile-first UI
- The UI SHALL be dark purple/black with orange/gold accents, with large picker buttons and good contrast.
- The layout SHALL be usable at 390px width, with no layout that forces the plan off-screen.
- The footer SHALL read: "Haunted Wardrobe Studio — built for Kiroween 2026. MIT License."

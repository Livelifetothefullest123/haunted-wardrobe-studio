// Haunted Wardrobe Studio — automated tests. Run: node test-wardrobe.js
// No dependencies. Exits non-zero if any test fails.
const { OCCASIONS, VIBES, BUDGETS, COMFORTS, getPlan } = require("./app.js");

let passed = 0, failed = 0;
function check(name, cond, detail) {
  if (cond) { passed++; console.log("PASS: " + name); }
  else { failed++; console.log("FAIL: " + name + (detail ? " — " + detail : "")); }
}
function inBand(plan) {
  if (plan.budget === "Under $25 DIY") return plan.totalCents > 0 && plan.totalCents < 2500;
  if (plan.budget === "$25-$50") return plan.totalCents >= 2500 && plan.totalCents <= 5000;
  return plan.totalCents > 5000; // $50+
}

let comboCount = 0, allPlans = true, allSums = true, allBands = true, allChecklists = true, allFields = true;
for (const o of OCCASIONS) for (const v of VIBES) for (const b of BUDGETS) for (const c of COMFORTS) {
  comboCount++;
  const p = getPlan(o, v, b, c);
  if (!p) { allPlans = false; continue; }
  const sum = p.breakdown.reduce((a, r) => a + r.cents, 0);
  if (sum !== p.totalCents) allSums = false;
  if (!inBand(p)) allBands = false;
  if (!p.checklist || p.checklist.length === 0 || p.checklist.some((x) => !x)) allChecklists = false;
  if (!p.title || !p.main || !p.accessories || p.accessories.length === 0 || !p.hair || !p.makeup || !p.diyBuy || !p.comfortItem) allFields = false;
}
check("every picker combination returns a plan (180 combos)", comboCount === 180 && allPlans, "combos=" + comboCount);
check("every cost breakdown sums exactly to its total", allSums);
check("every total is inside its budget band", allBands);
check("every plan has a non-empty checklist", allChecklists);
check("every plan has title, main, accessories, hair, makeup, DIY note, comfort item", allFields);

// Sample plan: Halloween party, Witchy glam, $25-$50, Chilly outdoors.
const s = getPlan("Halloween party", "Witchy glam", "$25-$50", "Chilly outdoors");
check("sample plan exists", !!s);
check("sample plan title is Midnight Witch in Velvet", s && s.title === "Midnight Witch in Velvet", s && s.title);
check("sample plan total is $42.99", s && s.totalCents === 4299, s && ("got " + s.totalCents));
check("sample plan breakdown sums to total", s && s.breakdown.reduce((a, r) => a + r.cents, 0) === s.totalCents);
check("sample plan comfort is a warm cloak layer", s && s.comfortItem.includes("Warm cloak"), s && s.comfortItem);
check("invalid picker returns null, not a crash", getPlan("Nope", "Witchy glam", "$25-$50", "Chilly outdoors") === null);

console.log("\n" + passed + " passed, " + failed + " failed");
if (failed > 0) process.exit(1);

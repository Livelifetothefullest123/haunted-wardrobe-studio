// Haunted Wardrobe Studio — costume plan logic + browser UI.
// Plain vanilla JavaScript. No backend, no dependencies, no API keys.
// The plan for a picker combination is deterministic: a base plan is
// chosen by vibe + occasion, costs are scaled to the budget band, and
// a comfort layer is adjusted for comfort. Every valid combination
// returns a complete plan, never a blank state.

const OCCASIONS = ["Halloween party", "Trick-or-treat", "School", "Photo shoot"];
const VIBES = ["Witchy glam", "Vampire elegant", "Ghostly", "Pumpkin patch", "Fairy twilight"];
const BUDGETS = ["Under $25 DIY", "$25-$50", "$50+"];
const COMFORTS = ["Warm indoors", "Chilly outdoors", "Rainy"];

const COMFORT_ITEMS = {
  "Warm indoors": "Light shawl — breathable, easy to remove indoors",
  "Chilly outdoors": "Warm cloak / coat layer — fits over the costume",
  "Rainy": "Clear rain cape + waterproof shoe covers — keeps the costume dry"
};

// Base plans: one per vibe x occasion, in vibe order, occasion order.
// Each entry: title, main costume, 3 accessories, hair, makeup, DIY/buy note.
const BASE_PLANS = [
  // Witchy glam
  { title: "Midnight Witch in Velvet", main: "Long velvet gown in deep plum with a starry cape", accessories: ["Wide-brim witch hat", "Crescent moon necklace", "Striped stockings"], hair: "Loose waves with a silver streak clip", makeup: "Smoky purple eyes and deep plum lips", diyBuy: "DIY the cape from velvet fabric; buy the hat if time is short." },
  { title: "Friendly Neighbourhood Witch", main: "Knee-length purple dress with a tulle skirt", accessories: ["Mini broom prop", "Pointed witch hat", "Striped socks"], hair: "Braids with orange ribbons", makeup: "Freckles and soft purple shadow", diyBuy: "DIY the tulle skirt over a dress you own; buy the hat and broom." },
  { title: "Classroom Witch", main: "Black dress with a purple cardigan and a star badge", accessories: ["Small hat headband", "Book-bag charm", "Star wand"], hair: "Neat bun with a purple ribbon", makeup: "Light and sparkly, school-friendly", diyBuy: "DIY the badge and wand from card and ribbon; buy the headband." },
  { title: "Portrait Witch", main: "Flowing gown with dramatic sleeves", accessories: ["Crystal ball prop", "Velvet choker", "Long gloves"], hair: "Soft Hollywood waves", makeup: "Bold purple eyes and plum lips for photos", diyBuy: "DIY the sleeves with extra fabric; buy the choker and gloves." },
  // Vampire elegant
  { title: "Velvet Vampire", main: "Burgundy velvet dress with a sweeping cape", accessories: ["Cameo brooch", "Cape clasp", "Red velvet choker"], hair: "Sleek updo", makeup: "Pale base, red lips, dark eyes", diyBuy: "DIY the cape from velvet; buy the brooch and choker." },
  { title: "Little Vampire", main: "Black and red cape set with a dress", accessories: ["Safe costume fangs", "Short cape", "Round medallion"], hair: "Side part, neatly combed", makeup: "Simple pale base with rosy cheeks", diyBuy: "DIY the medallion from card and foil; buy the cape set." },
  { title: "Bookish Vampire", main: "Dark blazer, white shirt, and a long dark skirt", accessories: ["Old book prop", "Cameo pin", "Dark scarf"], hair: "Low ponytail", makeup: "Minimal, with a dark lip tint", diyBuy: "DIY the scarf trim; buy the pin and use a book you own." },
  { title: "Grand Vampire Portrait", main: "Floor-length gown with a high-collar cape", accessories: ["Candelabra prop", "Long gloves", "Jewelled brooch"], hair: "Elegant chignon", makeup: "Dramatic pale base, deep red lips", diyBuy: "DIY the collar with stiff fabric; buy the gloves and brooch." },
  // Ghostly
  { title: "Glowing Ghost Host", main: "Flowing white gown with shimmer layers", accessories: ["Glow bracelet", "Sheer veil", "Silver chain"], hair: "Soft curls", makeup: "Luminous pale base with silver shimmer", diyBuy: "DIY the shimmer layers from sheer fabric; buy the glow bracelet." },
  { title: "Friendly Ghost", main: "White dress with a friendly ghost cape", accessories: ["Glow stick", "White headband", "Small pumpkin bucket"], hair: "Simple and neat, with a white clip", makeup: "Light white face paint, friendly smile", diyBuy: "DIY the cape from a white sheet; buy the glow stick and bucket." },
  { title: "Gentle Ghost", main: "White top, grey skirt, and a ghost capelet", accessories: ["Ghost hair clip", "White socks", "Small tote bag"], hair: "Pigtails with white ribbons", makeup: "Light and natural", diyBuy: "DIY the capelet and clip; buy the tote if needed." },
  { title: "Ethereal Ghost", main: "Long white layered dress with a translucent veil", accessories: ["Pearl necklace", "Long veil", "White flowers"], hair: "Loose ethereal waves", makeup: "Dewy pale base with soft grey shadow", diyBuy: "DIY the veil from tulle; buy the pearl necklace." },
  // Pumpkin patch
  { title: "Pumpkin Queen", main: "Orange gown with a green leaf cape", accessories: ["Pumpkin crown", "Green sash", "Vine bracelet"], hair: "Curls with leaf clips", makeup: "Warm orange blush and gold shimmer", diyBuy: "DIY the crown and sash; buy the gown or dye one orange." },
  { title: "Pumpkin Patch Pal", main: "Orange dress with a pumpkin tunic", accessories: ["Pumpkin hat", "Green leggings", "Pumpkin bucket"], hair: "Braids with green ribbons", makeup: "Orange cheeks and freckles", diyBuy: "DIY the tunic from orange fabric; buy the hat and bucket." },
  { title: "Harvest Pumpkin", main: "Orange sweater, brown skirt, and a pumpkin pin", accessories: ["Leaf headband", "Canvas tote", "Warm scarf"], hair: "Ponytail with a leaf clip", makeup: "Natural, with a warm lip colour", diyBuy: "DIY the pin and headband; use a sweater and skirt you own." },
  { title: "Golden Pumpkin Portrait", main: "Burnished orange gown with leaf detailing", accessories: ["Golden leaf crown", "Velvet wrap", "Pumpkin prop"], hair: "Updo with leaf pins", makeup: "Golden glow, warm bronze shadow", diyBuy: "DIY the leaf detailing; buy the crown and wrap." },
  // Fairy twilight
  { title: "Twilight Fairy", main: "Lavender tulle dress with fairy wings", accessories: ["Fairy wings", "Star wand", "Flower crown"], hair: "Curls with glitter", makeup: "Lilac shimmer and glitter freckles", diyBuy: "DIY the flower crown; buy the wings and wand." },
  { title: "Garden Fairy", main: "Pastel dress with small wings", accessories: ["Small wand", "Flower headband", "Sparkle bag"], hair: "Braids with small flowers", makeup: "Pastel shadow and glitter", diyBuy: "DIY the headband; buy the wings." },
  { title: "Library Fairy", main: "Pastel cardigan, tulle skirt, and wing hair clips", accessories: ["Book prop", "Wand pencil", "Flower pin"], hair: "Bun with flower pins", makeup: "Light pastel, school-friendly", diyBuy: "DIY the pin and clips; use a cardigan and skirt you own." },
  { title: "Moonlit Fairy", main: "Silver-lavender gown with large wings", accessories: ["Star wand", "Moon crown", "Sheer shawl"], hair: "Flowing waves with star clips", makeup: "Silver-lilac shimmer and star glitter", diyBuy: "DIY the star clips; buy the crown and wings." }
];

function formatMoney(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function distribute(totalCents, weights) {
  const weightSum = weights.reduce((a, b) => a + b, 0);
  const exact = weights.map((w) => (totalCents * w) / weightSum);
  const floors = exact.map((x) => Math.floor(x));
  let remainder = totalCents - floors.reduce((a, b) => a + b, 0);
  const order = exact.map((x, i) => ({ i, frac: x - Math.floor(x) }))
    .sort((a, b) => b.frac - a.frac || a.i - b.i);
  const result = floors.slice();
  for (let k = 0; k < remainder; k++) result[order[k % order.length].i] += 1;
  return result;
}

function targetTotalCents(comboIndex, budget) {
  if (budget === "Under $25 DIY") return 1899 + (comboIndex % 5) * 100;
  if (budget === "$25-$50") return 3499 + (comboIndex % 8) * 200;
  return 5999 + (comboIndex % 6) * 500; // $50+
}

function getPlan(occasion, vibe, budget, comfort) {
  const oi = OCCASIONS.indexOf(occasion);
  const vi = VIBES.indexOf(vibe);
  const bi = BUDGETS.indexOf(budget);
  const ci = COMFORTS.indexOf(comfort);
  if (oi < 0 || vi < 0 || bi < 0 || ci < 0) return null;
  const base = BASE_PLANS[vi * OCCASIONS.length + oi];
  const comboIndex = ((vi * OCCASIONS.length + oi) * BUDGETS.length + bi) * COMFORTS.length + ci;
  const totalCents = targetTotalCents(comboIndex, budget);
  const weights = [60, 20, 12, 8];
  const parts = distribute(totalCents, weights);
  const comfortItem = COMFORT_ITEMS[comfort];
  const breakdown = [
    { name: "Main costume", detail: base.main, cents: parts[0] },
    { name: "Accessories", detail: base.accessories.join(", "), cents: parts[1] },
    { name: "Hair & makeup", detail: base.hair + " — " + base.makeup, cents: parts[2] },
    { name: "Comfort layer", detail: comfortItem, cents: parts[3] }
  ];
  const checklist = [base.main].concat(base.accessories, [base.hair, base.makeup, comfortItem]);
  return {
    occasion, vibe, budget, comfort,
    title: base.title, main: base.main, accessories: base.accessories,
    hair: base.hair, makeup: base.makeup, diyBuy: base.diyBuy,
    comfortItem, breakdown, totalCents, checklist
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { OCCASIONS, VIBES, BUDGETS, COMFORTS, getPlan, formatMoney, distribute };
}

// ---- Browser UI ----
if (typeof document !== "undefined") {
  const state = {
    occasion: "Halloween party",
    vibe: "Witchy glam",
    budget: "$25-$50",
    comfort: "Chilly outdoors"
  };

  function pickerGroup(elId, values, key) {
    const el = document.getElementById(elId);
    el.innerHTML = "";
    values.forEach((v) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pick" + (state[key] === v ? " active" : "");
      b.textContent = v;
      b.setAttribute("aria-pressed", state[key] === v ? "true" : "false");
      b.addEventListener("click", () => { state[key] = v; renderPickers(); renderPlan(); });
      el.appendChild(b);
    });
  }
  function renderPickers() {
    pickerGroup("pick-occasion", OCCASIONS, "occasion");
    pickerGroup("pick-vibe", VIBES, "vibe");
    pickerGroup("pick-budget", BUDGETS, "budget");
    pickerGroup("pick-comfort", COMFORTS, "comfort");
  }
  function renderPlan() {
    const plan = getPlan(state.occasion, state.vibe, state.budget, state.comfort);
    if (!plan) return;
    document.getElementById("plan-title").textContent = plan.title;
    document.getElementById("plan-meta").textContent =
      plan.occasion + " • " + plan.vibe + " • " + plan.budget + " • " + plan.comfort;
    document.getElementById("plan-main").textContent = plan.main;
    document.getElementById("plan-diy").textContent = plan.diyBuy;
    const acc = document.getElementById("plan-accessories");
    acc.innerHTML = "";
    plan.accessories.forEach((a) => { const li = document.createElement("li"); li.textContent = a; acc.appendChild(li); });
    document.getElementById("plan-hair").textContent = plan.hair;
    document.getElementById("plan-makeup").textContent = plan.makeup;
    const bd = document.getElementById("cost-breakdown");
    bd.innerHTML = "";
    plan.breakdown.forEach((row) => {
      const li = document.createElement("li");
      li.innerHTML = "<span>" + row.name + ": " + row.detail + "</span><strong>" + formatMoney(row.cents) + "</strong>";
      bd.appendChild(li);
    });
    document.getElementById("plan-total").textContent = "Total: " + formatMoney(plan.totalCents) + " (" + plan.budget + ")";
    const cl = document.getElementById("checklist");
    cl.innerHTML = "";
    plan.checklist.forEach((item) => {
      const label = document.createElement("label");
      const box = document.createElement("input");
      box.type = "checkbox";
      label.appendChild(box);
      label.appendChild(document.createTextNode(" " + item));
      cl.appendChild(label);
    });
  }
  document.addEventListener("DOMContentLoaded", () => { renderPickers(); renderPlan(); });
}

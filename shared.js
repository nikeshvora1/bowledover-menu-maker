/* shared.js — constants, seed data, storage & theming shared by the menu (index.html) and admin (admin.html) */
(function () {
  "use strict";

  var LS_KEY = 'bowled_over_menu_v1';
  var ALLERGENS = ['Nuts', 'Dairy', 'Gluten', 'Soy', 'Egg', 'Sesame'];
  var DIETS = ['Veg', 'Vegan', 'Keto', 'High-Protein'];
  var MACRO_SLIDERS = [
    { key: 'protein', label: 'Min protein', min: 0, max: 50, step: 1, dir: '>=', off: 0, unit: 'g', pfx: '≥ ' },
    { key: 'cal', label: 'Max calories', min: 100, max: 800, step: 10, dir: '<=', off: 800, unit: ' kcal', pfx: '≤ ' },
    { key: 'carbs', label: 'Max carbs', min: 0, max: 80, step: 2, dir: '<=', off: 80, unit: 'g', pfx: '≤ ' },
    { key: 'fat', label: 'Max fat', min: 0, max: 50, step: 1, dir: '<=', off: 50, unit: 'g', pfx: '≤ ' },
  ];
  var MACRO_DEFAULTS = { protein: 0, cal: 800, carbs: 80, fat: 50 };
  var PRESETS = [
    { label: 'Bowled Over', primary: '#2A0714', magenta: '#7C1247', accent: '#F1C878', ink: '#4A0E24' },
    { label: 'Matcha', primary: '#10221A', magenta: '#1F5A44', accent: '#CBE86B', ink: '#123021' },
    { label: 'Espresso', primary: '#1C130D', magenta: '#5B3A24', accent: '#E7B67A', ink: '#3B2414' },
    { label: 'Midnight', primary: '#0E1424', magenta: '#25366B', accent: '#8FB4FF', ink: '#152142' },
  ];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function gid() { return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  function seed() {
    var b = { name: 'Bowled Over', tagline: 'Where taste meets balance — every bowl crafted with precision.', logo: null, primary: '#2A0714', magenta: '#7C1247', accent: '#F1C878', ink: '#4A0E24' };
    var cats = [
      { id: 'c1', name: 'Smoothie Bowls' }, { id: 'c2', name: 'Grain Bowls' },
      { id: 'c3', name: 'Cold-Pressed Juices' }, { id: 'c4', name: 'Boosters & Add-ons' },
    ];
    var p = function (id, categoryId, name, description, price, cal, protein, carbs, fat, allergens, diets, image) {
      return { id: id, categoryId: categoryId, name: name, description: description, price: price, image: image || null, macros: { cal: cal, protein: protein, carbs: carbs, fat: fat }, allergens: allergens, diets: diets };
    };
    var products = [
      p('p1', 'c1', 'Choco Banana Blend', 'Chocolate açaí base, banana coins, house granola, cacao nibs & chia seeds.', 380, 420, 12, 58, 14, ['Nuts', 'Gluten'], ['Veg'], './images/Chocolate Haven.jpg'),
      p('p2', 'c1', 'Blueberry Matcha Bowl', 'Ceremonial matcha & wild blueberry blend, toasted granola, fresh berries.', 410, 390, 10, 52, 12, ['Nuts', 'Gluten', 'Dairy'], ['Veg'], './images/Berry Blush.jpg'),
      p('p3', 'c1', 'Peanut Protein Bowl', 'Banana-peanut base, whey boost, granola, banana and dark chocolate shards.', 430, 520, 32, 54, 18, ['Nuts', 'Gluten', 'Dairy'], ['Veg', 'High-Protein']),
      p('p4', 'c1', 'Green Guru Bowl', 'Spinach, mango & avocado blend, coconut, granola and fresh kiwi.', 400, 360, 9, 48, 13, ['Gluten'], ['Vegan', 'Veg'], './images/Green Goddess.jpg'),
      p('p5', 'c2', 'Peanut Power Quinoa', 'Quinoa, kidney beans, roasted peanuts, peppers and a tangy tamarind drizzle.', 360, 480, 22, 56, 16, ['Nuts', 'Soy'], ['Vegan', 'Veg', 'High-Protein'], './images/Zesty Quinoa.jpg'),
      p('p6', 'c2', 'Mediterranean Chickpea', 'Chickpeas, cucumber, olives, feta and a bright lemon-herb dressing.', 350, 440, 18, 44, 20, ['Dairy'], ['Veg']),
      p('p7', 'c2', 'Keto Cobb Bowl', 'Grilled chicken, boiled egg, avocado, crisp greens and creamy ranch.', 420, 560, 38, 12, 40, ['Egg', 'Dairy'], ['Keto', 'High-Protein']),
      p('p8', 'c3', 'Green Reset', 'Cucumber, celery, green apple, spinach, ginger and lemon. Cold-pressed daily.', 220, 120, 3, 26, 1, [], ['Vegan', 'Veg']),
      p('p9', 'c3', 'Citrus Kick', 'Orange, carrot, turmeric and pineapple with a gentle hit of chilli.', 220, 140, 2, 32, 1, [], ['Vegan', 'Veg']),
      p('p10', 'c4', 'Extra Granola', 'House-baked oat & almond granola. Add crunch to any bowl.', 60, 150, 5, 18, 7, ['Nuts', 'Gluten'], ['Veg'], './images/Dry Fruit Mania.jpg'),
      p('p11', 'c4', 'Chia Protein Boost', 'Plant protein and chia — blend into any bowl or juice.', 80, 90, 15, 6, 2, [], ['Vegan', 'Veg', 'High-Protein']),
    ];
    return { brand: b, categories: cats, products: products };
  }

  function load() {
    var data = null;
    try { var raw = localStorage.getItem(LS_KEY); if (raw) data = JSON.parse(raw); } catch (e) {}
    if (!data || !data.categories) data = seed();
    return data;
  }
  function save(brand, categories, products) {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ brand: brand, categories: categories, products: products })); } catch (e) {}
  }

  function applyTheme(root, brand) {
    if (!root || !brand) return;
    root.style.setProperty('--bp', brand.primary);
    root.style.setProperty('--bp2', brand.magenta);
    root.style.setProperty('--acc', brand.accent);
    root.style.setProperty('--ink', brand.ink);
  }

  // Chip pill (ported from Chip.dc.html). dataAttrs = raw html attributes string.
  function chip(label, active, dataAttrs) {
    if (active) {
      return '<button ' + dataAttrs + ' style="padding:8px 14px;border-radius:999px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:700;white-space:nowrap;border:1px solid var(--acc);background:var(--acc);color:var(--ink);transition:all .12s ease;">' + esc(label) + '</button>';
    }
    return '<button class="chip-inactive" ' + dataAttrs + ' style="padding:8px 14px;border-radius:999px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;white-space:nowrap;border:1px solid color-mix(in oklab, var(--acc), transparent 60%);background:transparent;color:color-mix(in oklab, var(--acc), white 8%);transition:all .12s ease;">' + esc(label) + '</button>';
  }

  window.BO = {
    LS_KEY: LS_KEY, ALLERGENS: ALLERGENS, DIETS: DIETS,
    MACRO_SLIDERS: MACRO_SLIDERS, MACRO_DEFAULTS: MACRO_DEFAULTS, PRESETS: PRESETS,
    esc: esc, gid: gid, seed: seed, load: load, save: save, applyTheme: applyTheme, chip: chip,
  };
})();

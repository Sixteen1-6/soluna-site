/* ============================================================
   CATALOG, edit this file to change products, drops, and brand.
   No build step: save and refresh.
   ============================================================ */

const BRAND = {
  name: "Soluna",
  email: "hello@solunapkl.com",
  tagline: "Made for sunny days",
  // Pre-launch: nothing is buyable yet. "Notify me" sends people to the
  // first-drop section so they can join the list.
  fallbackBuyUrl: "drops.html#notify",
  // Email capture: create a free form at https://formspree.io and paste the
  // endpoint here (e.g. "https://formspree.io/f/abcdwxyz").
  // Empty = emails saved to localStorage only.
  formEndpoint: "",
  social: {
    instagram: "https://instagram.com/solunapkl",
    tiktok: "https://tiktok.com/@solunapkl",
    email: "mailto:hello@solunapkl.com",
  },
};

/* ----------------------------- products ----------------------------- */
/* Pre-launch lineup. No final prices: products read "Coming soon" until the
   first drop opens. Copy stays light and aspirational, no spec sheets. */

const PRODUCTS = [
  {
    id: "case-blush",
    name: "The Case, Blush",
    category: "Case",
    price: null,
    badge: "First drop",
    colorway: { face: "#E7A6AE", accent: "#1F2E48", edge: "#D8909A", grip: "#1F2E48" },
    swatches: ["#E7A6AE", "#9DBCD8", "#1F2E48"],
    blurb: "A structured case in a soft, sun-washed pink. Built so a paddle worth keeping arrives at the court the way it left the house.",
    buyUrl: "",
  },
  {
    id: "case-marina",
    name: "The Case, Marina",
    category: "Case",
    price: null,
    badge: null,
    colorway: { face: "#9DBCD8", accent: "#1F2E48", edge: "#86A8C8", grip: "#1F2E48" },
    swatches: ["#9DBCD8", "#E7A6AE", "#1F2E48"],
    blurb: "The same structured shape in a calm coastal blue. Confident, made to be carried for years.",
    buyUrl: "",
  },
  {
    id: "court-tee",
    name: "The Court Tee",
    category: "Apparel",
    price: null,
    badge: null,
    colorway: { face: "#F3ECDD", accent: "#1F2E48", edge: "#D8CDB6", grip: "#F3ECDD" },
    swatches: ["#F3ECDD", "#1F2E48", "#5E7B9E"],
    blurb: "A heavyweight cream tee with a small navy mark at the chest. The kind of plain you reach for on the bright days.",
    buyUrl: "",
  },
  {
    id: "club-cap",
    name: "The Club Cap",
    category: "Apparel",
    price: null,
    badge: null,
    colorway: { face: "#1F2E48", accent: "#F3ECDD", edge: "#16223A", grip: "#1F2E48" },
    swatches: ["#1F2E48", "#9DBCD8", "#F3ECDD"],
    blurb: "An unstructured navy cap with a low embroidered S. Pulled-down brim, easy summer shade.",
    buyUrl: "",
  },
  {
    id: "court-ball",
    name: "The Court Ball",
    category: "Balls",
    price: null,
    badge: null,
    colorway: { face: "#F3ECDD", accent: "#1F2E48", edge: "#D8CDB6", grip: "#1F2E48" },
    swatches: ["#F3ECDD", "#1F2E48", "#9DBCD8"],
    blurb: "A designed pickleball in the Soluna palette. Tournament weight, true bounce, made to be seen on a bright court.",
    buyUrl: "",
  },
];

/* ------------------------------ drops ------------------------------- */
/* status is derived from dates at render time; just set the dates.
   - opensAt in the future  -> "upcoming" (countdown + notify)
   - opensAt past, closesAt future -> "live" (buy + stock bar)
   - closesAt past or stockLeft 0  -> "closed" (sold out) */

const DROPS = [
  {
    id: "drop-001",
    number: "001",
    name: "FIRST LIGHT",
    headline: "The Case, first drop",
    description:
      "Our opening run. The Case in Blush and Marina, made in a small first batch out of Lexington. Join the list and you will be the first to know when it opens.",
    opensAt: "2026-07-15T10:00:00",
    closesAt: "2026-07-20T10:00:00",
    price: null,
    stockTotal: 120,
    stockLeft: 120,
    productId: "case-blush",
    colorway: { face: "#E7A6AE", accent: "#1F2E48", edge: "#D8909A", grip: "#1F2E48" },
    buyUrl: "",
  },
];

/* --------------------------- case renderer -------------------------- */
/* Generates a clean editorial SVG of the Case (a rounded, paddle-shaped
   structured case with a dashed zipper arc and a small embroidered serif
   "S" bottom-right) in the Soluna palette. Swap for real photography as
   soon as you have it: set `image: "assets/photo.jpg"` on a product and it
   will be used instead. */

let _svgUid = 0;
function caseSVG(c, opts = {}) {
  const uid = "c" + (++_svgUid);
  const tilt = opts.tilt ?? -6;
  const ink = c.accent;
  return `
  <svg viewBox="0 0 320 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Soluna case">
    <defs>
      <linearGradient id="${uid}-face" x1="0" y1="0" x2=".9" y2="1.1">
        <stop offset="0" stop-color="${c.face}"/>
        <stop offset="1" stop-color="${c.edge}"/>
      </linearGradient>
    </defs>
    <ellipse cx="160" cy="468" rx="98" ry="12" fill="rgba(31,46,72,.12)"/>
    <g transform="rotate(${tilt} 160 250)">
      <!-- outer shell -->
      <rect x="46" y="20" width="228" height="340" rx="98" fill="${c.edge}"/>
      <!-- case face -->
      <rect x="54" y="28" width="212" height="324" rx="92" fill="url(#${uid}-face)"/>
      <!-- inner hairline panel -->
      <rect x="72" y="46" width="176" height="288" rx="78" fill="none"
            stroke="${ink}" stroke-width="1.25" stroke-opacity=".35"/>
      <!-- dashed zipper arc -->
      <path d="M70 120 Q160 60 250 120" fill="none" stroke="${ink}" stroke-width="2"
            stroke-linecap="round" stroke-dasharray="2 8" stroke-opacity=".75"/>
      <!-- zipper pull -->
      <line x1="160" y1="84" x2="160" y2="108" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>
      <rect x="153" y="106" width="14" height="20" rx="5" fill="none" stroke="${ink}" stroke-width="2"/>
      <!-- embroidered serif S, bottom-right -->
      <text x="232" y="318" text-anchor="middle" font-family="'Bodoni Moda', Didot, 'Times New Roman', serif"
            font-weight="600" font-size="40" fill="${ink}" opacity=".9">S</text>
      <!-- throat + carry handle -->
      <path d="M130 354 L190 354 L182 384 L138 384 Z" fill="${c.edge}"/>
      <rect x="138" y="380" width="44" height="22" rx="11" fill="none" stroke="${ink}" stroke-width="3"/>
    </g>
  </svg>`;
}

/* Simple render for apparel (a clean tee in the Soluna palette) */
function teeSVG(c) {
  const uid = "t" + (++_svgUid);
  const ink = c.accent;
  return `
  <svg viewBox="0 0 320 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Soluna tee">
    <ellipse cx="160" cy="452" rx="116" ry="12" fill="rgba(31,46,72,.10)"/>
    <g>
      <path d="M110 96 L62 132 L84 196 L112 182 L112 408 Q160 426 208 408 L208 182 L236 196 L258 132 L210 96 Q185 116 160 116 Q135 116 110 96 Z"
            fill="${c.face}" stroke="${c.edge}" stroke-width="2"/>
      <path d="M110 96 Q135 116 160 116 Q185 116 210 96 L202 90 Q160 108 118 90 Z" fill="${c.edge}"/>
      <!-- small chest mark: embroidered serif S -->
      <text x="138" y="208" text-anchor="middle" font-family="'Bodoni Moda', Didot, 'Times New Roman', serif"
            font-weight="600" font-size="24" fill="${ink}">S</text>
    </g>
  </svg>`;
}

/* Designed pickleball: a holed ball in the Soluna palette (placeholder until photos). */
function ballSVG(c) {
  const uid = "b" + (++_svgUid);
  const ink = c.accent;
  const cx = 160, cy = 250, R = 122;
  let holes = "";
  for (let row = -3; row <= 3; row++) {
    for (let col = -3; col <= 3; col++) {
      const hx = cx + col * 36 + (row % 2 ? 18 : 0);
      const hy = cy + row * 36;
      const dx = hx - cx, dy = hy - cy;
      if (dx * dx + dy * dy < (R - 24) * (R - 24)) {
        holes += `<circle cx="${hx.toFixed(0)}" cy="${hy.toFixed(0)}" r="9" fill="${ink}" opacity=".85"/>`;
      }
    }
  }
  return `
  <svg viewBox="0 0 320 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Soluna pickleball">
    <defs>
      <radialGradient id="${uid}-f" cx=".38" cy=".34" r=".75">
        <stop offset="0" stop-color="${c.face}"/>
        <stop offset="1" stop-color="${c.edge}"/>
      </radialGradient>
    </defs>
    <ellipse cx="160" cy="392" rx="104" ry="13" fill="rgba(31,46,72,.12)"/>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#${uid}-f)" stroke="${c.edge}" stroke-width="2"/>
    ${holes}
  </svg>`;
}

function productArt(p, opts = {}) {
  if (p.image) return `<img src="${p.image}" alt="${p.name}" loading="lazy">`;
  if (p.category === "Apparel") return teeSVG(p.colorway);
  if (p.category === "Balls") return ballSVG(p.colorway);
  if (p.category === "Case") return caseSVG(p.colorway, opts);
  return caseSVG(p.colorway, opts);
}

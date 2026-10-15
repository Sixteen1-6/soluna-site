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
    id: "tee-fresh-white",
    name: "Fresh White Performance Tee",
    category: "Apparel",
    price: null,
    badge: "First drop",
    colorway: { face: "#F6F6F4", accent: "#1F2E48", edge: "#D8CDB6", grip: "#F6F6F4" },
    swatches: ["#F6F6F4", "#B9BDC1", "#1F2E48"],
    blurb: "A breathable performance knit in fresh white, with the wordmark in navy at the chest. Built for long points on bright days.",
    image: "assets/tee-white-front.jpg",
    images: ["assets/tee-white-front.jpg", "assets/tee-white-back.jpg"],
    buyUrl: "",
  },
  {
    id: "tee-grey",
    name: "Grey Performance Tee",
    category: "Apparel",
    price: null,
    badge: null,
    colorway: { face: "#B9BDC1", accent: "#1F2E48", edge: "#A6ABAF", grip: "#B9BDC1" },
    swatches: ["#B9BDC1", "#F6F6F4", "#1F2E48"],
    blurb: "The same performance knit in heather grey, with a vented spine down the back. Cool through the hottest afternoons.",
    image: "assets/tee-grey-front.jpg",
    images: ["assets/tee-grey-front.jpg", "assets/tee-grey-back.jpg"],
    buyUrl: "",
  },
  {
    id: "ball-retro-wave",
    name: "Retro Wave Court Ball",
    category: "Balls",
    price: null,
    badge: "First drop",
    colorway: { face: "#F3ECDD", accent: "#D97B2F", edge: "#D8CDB6", grip: "#1F2E48" },
    swatches: ["#F3ECDD", "#E8A33D", "#9DBCD8"],
    blurb: "A designed ball in a retro wave print, cream with citrus and sky. Made to be seen on a bright court.",
    image: "assets/ball-retro-3.jpg",
    images: ["assets/ball-retro-3.jpg", "assets/ball-retro-1.jpg", "assets/ball-retro-2.jpg"],
    buyUrl: "",
  },
  {
    id: "ball-blush-pinstripe",
    name: "Blush Pinstripe Court Ball",
    category: "Balls",
    price: null,
    badge: null,
    colorway: { face: "#F2A9C4", accent: "#D8698E", edge: "#E7A6AE", grip: "#1F2E48" },
    swatches: ["#F2A9C4", "#E7A6AE", "#F3ECDD"],
    blurb: "A designed ball in soft pink with fine pinstripes. Easy to spot on any court.",
    image: "assets/ball-pinstripe-3.jpg",
    images: ["assets/ball-pinstripe-3.jpg", "assets/ball-pinstripe-1.jpg", "assets/ball-pinstripe-2.jpg"],
    buyUrl: "",
  },
  {
    id: "short-clean-white",
    name: "Clean White Performance Short",
    category: "Apparel",
    price: null,
    badge: null,
    colorway: { face: "#F6F6F4", accent: "#1F2E48", edge: "#E4E4E0", grip: "#F6F6F4" },
    swatches: ["#F6F6F4", "#B9BDC1", "#1F2E48"],
    blurb: "A clean performance short in bright white with a small S at the hem. Light, quick-drying, made for long afternoons.",
    image: "assets/hero-court.jpg",
    images: ["assets/hero-court.jpg"],
    buyUrl: "",
  },
  {
    id: "short-grey",
    name: "Grey Performance Short",
    category: "Apparel",
    price: null,
    badge: null,
    colorway: { face: "#B9BDC1", accent: "#1F2E48", edge: "#A6ABAF", grip: "#B9BDC1" },
    swatches: ["#B9BDC1", "#F6F6F4", "#1F2E48"],
    blurb: "The same performance short in heather grey, with the S at the hem. Light, quick-drying, cool through the hottest afternoons.",
    image: "assets/oncourt-grey.jpg",
    images: ["assets/oncourt-grey.jpg"],
    buyUrl: "",
  },
];

/* ------------------------------ drops ------------------------------- */
/* status is derived from dates at render time; just set the dates.
   - opensAt in the future  -> "upcoming" (countdown + notify)
   - opensAt past, closesAt future -> "live" (buy + stock bar)
   - closesAt past or stockLeft 0  -> "closed" (sold out) */

const DROPS = [];

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

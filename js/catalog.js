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
    id: "made-for-sunny-days-performance-tee",
    name: "Made For Sunny Days Performance Tee",
    category: "Apparel",
    price: null,
    badge: "First drop",
    colorway: { face: "#FFFFFF", accent: "#161616", edge: "#E6E6E6", grip: "#FFFFFF" },
    swatches: ["#FFFFFF", "#9DBCD8"],
    blurb: "The Made For Sunny Days Performance Tee combines lightweight, cooling performance fabric with strategically placed laser-etched ventilation for enhanced airflow. Its breathable, non-cling construction helps keep the fabric from sticking to your skin during intense play, while the precision-cut detailing creates a sleek, modern finish. Designed for comfort, movement, and effortless style on and off the court.",
    image: "assets/mfsd-white-black-2.webp",
    images: [2, 1, 3, 4, 5].map(i => `assets/mfsd-white-black-${i}.webp`),
    variants: [
      { id: "white-black", label: "White / Black", swatch: "#FFFFFF", textColor: "#111111", images: [2, 1, 3, 4, 5].map(i => `assets/mfsd-white-black-${i}.webp`) },
      { id: "baby-blue-white", label: "Baby Blue / White", swatch: "#9DBCD8", textColor: "#FFFFFF", images: [2, 1, 3, 4, 5].map(i => `assets/mfsd-baby-blue-white-${i}.webp`) }
    ],
    buyUrl: "",
  },
  {
    id: "one-more-game-performance-tee",
    name: "One More Game Performance Tee",
    category: "Apparel",
    price: null,
    badge: "First drop",
    colorway: { face: "#1F2E48", accent: "#9DBCD8", edge: "#1F2E48", grip: "#1F2E48" },
    swatches: ["#1F2E48"],
    blurb: "The One More Game Performance Tee combines lightweight, cooling performance fabric with strategically placed laser-etched ventilation for enhanced airflow. Its breathable, non-cling construction helps keep the fabric from sticking to your skin during intense play, while the precision-cut detailing creates a sleek, modern finish. Designed for comfort, movement, and effortless style on and off the court.",
    image: "assets/01_Front_Model.png",
    images: ["assets/01_Front_Model.png", "assets/02_Back_Model.png", "assets/03_One_More_Game_Chest_Detail.png", "assets/04_SOLUNA_Sleeve_Detail.png", "assets/05_SOLUNA_Back_Laser_Detail.png"],
    variants: [
      { id: "navy", label: "Navy", swatch: "#1F2E48", textColor: "#9DBCD8", images: ["assets/01_Front_Model.png", "assets/02_Back_Model.png", "assets/03_One_More_Game_Chest_Detail.png", "assets/04_SOLUNA_Sleeve_Detail.png", "assets/05_SOLUNA_Back_Laser_Detail.png"] }
    ],
    buyUrl: "",
  },
  {
    id: "reinstated-performance-tee",
    name: "REINSTATED Performance Tee",
    category: "Apparel",
    price: null,
    badge: "First drop",
    colorway: { face: "#9DBCD8", accent: "#FFFFFF", edge: "#9DBCD8", grip: "#9DBCD8" },
    swatches: ["#9DBCD8"],
    blurb: "The REINSTATED Performance Tee combines lightweight, cooling performance fabric with strategically placed laser-etched ventilation for enhanced airflow. Its breathable, non-cling construction helps keep the fabric from sticking to your skin during intense play, while the precision-cut detailing creates a sleek, modern finish. Designed for comfort, movement, and effortless style on and off the court.",
    image: "assets/reinstated-03_REINSTATED_Collar_Detail.png",
    images: [
      "assets/reinstated-03_REINSTATED_Collar_Detail.png",
      "assets/reinstated-01_Front_Model.png",
      "assets/reinstated-02_Back_Model.png",
      "assets/reinstated-04_SOLUNA_Sleeve_Detail.png",
      "assets/reinstated-05_SOLUNA_Back_Laser_Detail.png"
    ],
    variants: [
      { id: "baby-blue", label: "Baby Blue", swatch: "#9DBCD8", textColor: "#FFFFFF", images: [
        "assets/reinstated-03_REINSTATED_Collar_Detail.png",
        "assets/reinstated-01_Front_Model.png",
        "assets/reinstated-02_Back_Model.png",
        "assets/reinstated-04_SOLUNA_Sleeve_Detail.png",
        "assets/reinstated-05_SOLUNA_Back_Laser_Detail.png"
      ] }
    ],
    buyUrl: "",
  },
  {
    id: "return-performance-tee",
    name: "RETURN Performance Tee",
    category: "Apparel",
    price: null,
    badge: "First drop",
    colorway: { face: "#FFFFFF", accent: "#161616", edge: "#E6E6E6", grip: "#FFFFFF" },
    swatches: ["#FFFFFF", "#1F2E48"],
    blurb: "The RETURN Performance Tee combines lightweight, cooling performance fabric with strategically placed laser-etched ventilation for enhanced airflow. Its breathable, non-cling construction helps keep the fabric from sticking to your skin during intense play, while the precision-cut detailing creates a sleek, modern finish. Designed for comfort, movement, and effortless style on and off the court.",
    image: "assets/return-white-black-3.webp",
    images: [3, 2, 1, 4, 5].map(i => `assets/return-white-black-${i}.webp`),
    variants: [
      { id: "white-black", label: "White / Black", swatch: "#FFFFFF", textColor: "#111111", images: [3, 2, 1, 4, 5].map(i => `assets/return-white-black-${i}.webp`) },
      { id: "navy-baby-blue", label: "Navy / Baby Blue", swatch: "#1F2E48", textColor: "#9DBCD8", images: [2, 1, 3, 4, 5].map(i => `assets/return-navy-baby-blue-${i}.webp`) }
    ],
    buyUrl: "",
  },
  {
    id: "made-for-sunny-days-hat-coastal-blue-cream",
    name: "Made for Sunny Days",
    category: "Apparel",
    price: null,
    badge: "First drop",
    colorway: { face: "#A9CAE9", accent: "#1F2E48", edge: "#F3ECDD", grip: "#A9CAE9" },
    swatches: ["#A9CAE9", "#F3ECDD"],
    blurb: "The Made for Sunny Days hat in Coastal Blue/Cream features a coastal blue and cream camo design, navy embroidery, a blue brim, rope detailing, laser-etched ventilation, and an adjustable snapback closure. Made for sunny days on and off the court.",
    image: "assets/01_Angle.png",
    images: ["assets/01_Angle.png", "assets/02_Front.png", "assets/03_Back.png", "assets/04_Emblem_Side.png", "assets/05_Interior.png"],
    variants: [
      { id: "coastal-blue-cream", label: "Coastal Blue/Cream", swatch: "#A9CAE9", textColor: "#1F2E48", images: ["assets/01_Angle.png", "assets/02_Front.png", "assets/03_Back.png", "assets/04_Emblem_Side.png", "assets/05_Interior.png"] }
    ],
    buyUrl: "",
  },
  {
    id: "made-for-sunny-days-hat-cream-navy",
    name: "Made for Sunny Days",
    category: "Apparel",
    price: null,
    badge: "First drop",
    colorway: { face: "#F3ECDD", accent: "#1F2E48", edge: "#F3ECDD", grip: "#1F2E48" },
    swatches: ["#F3ECDD", "#1F2E48"],
    blurb: "The Made for Sunny Days hat in Cream/Navy features a cream crown and brim, navy embroidery, rope detailing, laser-etched ventilation, a navy paddle emblem, and an adjustable snapback closure. Made for sunny days on and off the court.",
    image: "assets/Cream Cap with Navy Sunny Days Embroidery-1.png",
    images: ["assets/Cream Cap with Navy Sunny Days Embroidery-1.png","assets/Cream “Made for Sunny Days” Cap-2.png","assets/Ivory Perforated Snapback Cap Back-3.png","assets/Cream “Sunny Days” Embroidered Cap-4.png","assets/Soluna Cap Interior Detail-5.png"],
    variants: [
      { id: "cream-navy", label: "Cream/Navy", swatch: "#F3ECDD", textColor: "#1F2E48", images: ["assets/Cream Cap with Navy Sunny Days Embroidery-1.png","assets/Cream “Made for Sunny Days” Cap-2.png","assets/Ivory Perforated Snapback Cap Back-3.png","assets/Cream “Sunny Days” Embroidered Cap-4.png","assets/Soluna Cap Interior Detail-5.png"] }
    ],
    buyUrl: "",
  },
  {
    id: "return-hat-bold",
    name: "Return",
    category: "Apparel",
    price: null,
    badge: "First drop",
    colorway: { face: "#F8F7F4", accent: "#111111", edge: "#F8F7F4", grip: "#111111" },
    swatches: ["#F8F7F4", "#111111"],
    blurb: "The Return hat in Bold features a structured white crown and curved brim, raised RETURN embroidery with black outlining, black-and-white rope detailing, laser-etched ventilation, a black paddle emblem, SOLUNA side embroidery, and an adjustable snapback closure. Made for the court and beyond.",
    image: "assets/White Return Letterman Cap.png",
    images: ["assets/White Return Letterman Cap.png","assets/White SOLUNA Return Cap Product Shot.png","assets/SOLUNA Hat Interior Detail.png","assets/White “RETURN” Rope-Trim Cap.png","assets/White Perforated Snapback Cap Back View.png"],
    variants: [{ id: "bold", label: "Bold", swatch: "#F8F7F4", textColor: "#111111", images: ["assets/White Return Letterman Cap.png","assets/White SOLUNA Return Cap Product Shot.png","assets/SOLUNA Hat Interior Detail.png","assets/White “RETURN” Rope-Trim Cap.png","assets/White Perforated Snapback Cap Back View.png"] }],
    buyUrl: "",
  },
  {
    id: "soluna-hat-made-for-sunny-days",
    name: "Soluna",
    category: "Apparel",
    price: null,
    badge: "First drop",
    colorway: { face: "#F6EBDD", accent: "#1F2E48", edge: "#8ABFEF", grip: "#F6EBDD" },
    swatches: ["#F6EBDD", "#8ABFEF", "#1F2E48"],
    blurb: "The Soluna hat in Made for Sunny Days features a structured cream crown, coastal-blue brim, navy Soluna script and MADE FOR SUNNY DAYS embroidery, a golden sun accent, laser-etched ventilation, a blue paddle emblem, SOLUNA side embroidery, and an adjustable snapback closure. Made for sunny days on and off the court.",
    image: "assets/Front.png",
    images: ["assets/Front.png","assets/Interior sunrise.png","assets/Angle.png","assets/Embroidery Side.png"],
    variants: [{ id: "made-for-sunny-days", label: "Made for Sunny Days", swatch: "#F6EBDD", textColor: "#1F2E48", images: ["assets/Front.png","assets/Interior sunrise.png","assets/Angle.png","assets/Embroidery Side.png"] }],
    buyUrl: "",
  },
  {
    id: "return-hat-white-camo",
    name: "Return",
    category: "Apparel",
    price: null,
    badge: "First drop",
    colorway: { face: "#F3F1ED", accent: "#FFFFFF", edge: "#D8D7D5", grip: "#F3F1ED" },
    swatches: ["#F3F1ED", "#D8D7D5"],
    blurb: "The Return hat in White Camo features a white and soft-gray camouflage pattern, raised white RETURN embroidery, matching white rope detailing, laser-etched ventilation, a white paddle emblem, SOLUNA side embroidery, and an adjustable snapback closure. Made for sunny days on and off the court.",
    image: "assets/Monochrome RETURN Camo Cap.png",
    images: ["assets/Monochrome RETURN Camo Cap.png","assets/Emblem Angle.png","assets/Interior.png"],
    variants: [{ id: "white-camo", label: "White Camo", swatch: "#F3F1ED", textColor: "#777777", images: ["assets/Monochrome RETURN Camo Cap.png","assets/Emblem Angle.png","assets/Interior.png"] }],
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
    blurb: "A 40-hole outdoor pickleball designed for durability, consistent flight, and reliable play, game after game. Finished in a retro wave print of cream, citrus, and sky for standout visibility on court.",
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
    blurb: "A 40-hole outdoor pickleball built for durability, consistent flight, and dependable performance through every rally. Finished in soft pink with fine pinstripes for easy visibility on court.",
    image: "assets/ball-pinstripe-3.jpg",
    images: ["assets/ball-pinstripe-3.jpg", "assets/ball-pinstripe-1.jpg", "assets/ball-pinstripe-2.jpg"],
    buyUrl: "",
  }
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

/* ============================================================
   site.js, shared chrome (nav/footer), countdowns, renderers
   Soluna, premium pickleball. Made for sunny days.
   ============================================================ */

/* ------------------------------ icons -------------------------------------- */

const ICONS = {
  search: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>`,
  bag: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>`,
  ig: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>`,
  tt: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3a5.3 5.3 0 0 0 4.3 4.4v3a8.4 8.4 0 0 1-4.4-1.5v6.5a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2a2.9 2.9 0 1 0 2 2.7V3h3.1z"/></svg>`,
  mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
};

/* ------------------------------ theme (Sol / Luna) ------------------------- */

const THEME_KEY = "soluna_theme";

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "luna") root.setAttribute("data-theme", "luna");
  else root.removeAttribute("data-theme");
}

function restoreTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch { /* private mode */ }
  applyTheme(saved === "luna" ? "luna" : "sol");
}

function toggleTheme() {
  const isLuna = document.documentElement.getAttribute("data-theme") === "luna";
  const next = isLuna ? "sol" : "luna";
  applyTheme(next);
  try { localStorage.setItem(THEME_KEY, next); } catch { /* private mode */ }
}

/* ------------------------------ drops logic -------------------------------- */

function nextDrop() {
  const now = Date.now();
  const upcoming = DROPS
    .filter(d => new Date(d.opensAt).getTime() > now)
    .sort((a, b) => new Date(a.opensAt) - new Date(b.opensAt));
  return upcoming[0] || null;
}

function dropStatus(d) {
  const now = Date.now();
  const opens = new Date(d.opensAt).getTime();
  const closes = new Date(d.closesAt).getTime();
  if (now < opens) return "upcoming";
  if (now < closes && d.stockLeft > 0) return "live";
  return "closed";
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/* ------------------------------ shared chrome ------------------------------ */

function injectChrome(active) {
  const drop = nextDrop();
  const announce = drop
    ? `MADE FOR SUNNY DAYS &nbsp;&middot;&nbsp; <b>THE FIRST DROP &ldquo;${drop.name}&rdquo; ARRIVES ${fmtDate(drop.opensAt).toUpperCase()}</b>`
    : `MADE FOR SUNNY DAYS &nbsp;&middot;&nbsp; <b>THE FIRST DROP IS COMING SOON</b>`;

  const links = [
    ["index.html#drop", "The Drop"],
    ["shop.html", "Starting Lineup"],
    ["balls.html", "Balls"],
    ["apparel.html", "Apparel"],
    ["january-tournament/", "Tournament"],
    ["about.html", "Story"],
  ];

  // Highlight the current destination in both desktop and mobile navigation.
  const currentPath = window.location.pathname.replace(/\\/g, "/").replace(/\\/g, "/");
  const currentPage = currentPath.endsWith("/") ? (currentPath.includes("/january-tournament/") ? "january-tournament/" : "index.html") : currentPath.split("/").pop();
  const isCurrentLink = href => {
    const target = href.split("#")[0];
    return target === currentPage || (target === "january-tournament/" && currentPath.includes("/january-tournament"));
  };
  const navLink = ([href, label]) => `<a href="${href}"${isCurrentLink(href) ? ' class="nav-active" aria-current="page"' : ""}>${label}</a>`;

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="announce">${announce}</div>
    <header class="site">
      <nav class="nav">
        <a class="brand" href="index.html"><img src="assets/logo.png" class="logo" alt="Soluna"></a>
        <ul class="nav-links">
          ${links.map(([href, label]) => `<li>${navLink([href, label])}</li>`).join("")}
        </ul>
        <div class="nav-right">
          <button class="theme-toggle" type="button" aria-label="Toggle Sol or Luna mode">Sol / Luna</button>
          <a href="#" aria-label="Search">${ICONS.search}</a>
          <button class="nav-burger" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </nav>
      <div class="mobile-menu">
        ${links.map(([href, label]) => navLink([href, label])).join("")}
        <button class="theme-toggle" type="button" aria-label="Toggle Sol or Luna mode">Sol / Luna</button>
      </div>
    </header>
  `);

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="site">
      <div class="wrap">
        <div class="foot-top">
          <div class="foot-brand">
            <img src="assets/logo.png" class="logo" alt="Soluna">
            <p>Premium pickleball, made for sunny days. A first drop in limited colorways, designed in Lexington, Kentucky.</p>
            <div class="foot-social">
              <a href="${BRAND.social.instagram}" aria-label="Instagram">${ICONS.ig}</a>
              <a href="${BRAND.social.tiktok}" aria-label="TikTok">${ICONS.tt}</a>
              <a href="mailto:${BRAND.email}" aria-label="Email">${ICONS.mail}</a>
            </div>
          </div>
          <div class="foot-col">
            <h4>Shop</h4>
            <a href="shop.html">Starting Lineup</a>
            <a href="balls.html">Balls</a>
            <a href="apparel.html">Apparel</a>
          </div>
          <div class="foot-col">
            <h4>Soluna</h4>
            <a href="about.html">Our Story</a>
            <a href="january-tournament/">January Tournament</a>
            <a href="mailto:${BRAND.email}">Contact</a>
            <a href="${BRAND.social.instagram}">Instagram</a>
          </div>
          <div class="foot-col">
            <h4>Stay close</h4>
            <a href="index.html#drop">Get the first drop</a>
            <a href="${BRAND.social.tiktok}">TikTok</a>
            <a href="mailto:${BRAND.email}">${BRAND.email}</a>
          </div>
        </div>
      </div>
      <div class="foot-mark"><img src="assets/logo.png" class="logo" alt="Soluna"></div>
      <div class="foot-legal">
        <span>&copy; ${new Date().getFullYear()} ${BRAND.name}. Made for sunny days.</span>
        <span>Privacy &nbsp;&middot;&nbsp; Terms &nbsp;&middot;&nbsp; Accessibility</span>
      </div>
    </footer>
  `);

  const burger = document.querySelector(".nav-burger");
  const menu = document.querySelector(".mobile-menu");
  burger?.addEventListener("click", () => menu.classList.toggle("open"));

  document.querySelectorAll(".theme-toggle").forEach(btn => {
    btn.addEventListener("click", toggleTheme);
  });
}

/* -------------------------------- countdowns ------------------------------- */

function startCountdowns() {
  const els = [...document.querySelectorAll("[data-countdown]")];
  if (!els.length) return;
  const tick = () => {
    const now = Date.now();
    for (const el of els) {
      let diff = new Date(el.dataset.countdown).getTime() - now;
      if (diff < 0) diff = 0;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;
      const vals = { d, h, m, s };
      for (const k of ["d", "h", "m", "s"]) {
        const n = el.querySelector(`[data-u="${k}"]`);
        if (n) n.textContent = String(vals[k]).padStart(2, "0");
      }
    }
  };
  tick();
  setInterval(tick, 1000);
}

function countdownHTML(iso) {
  return `
  <div class="countdown" data-countdown="${iso}">
    <div class="unit"><div class="num" data-u="d">00</div><div class="lbl">Days</div></div>
    <div class="sep">:</div>
    <div class="unit"><div class="num" data-u="h">00</div><div class="lbl">Hrs</div></div>
    <div class="sep">:</div>
    <div class="unit"><div class="num" data-u="m">00</div><div class="lbl">Min</div></div>
    <div class="sep">:</div>
    <div class="unit"><div class="num" data-u="s">00</div><div class="lbl">Sec</div></div>
  </div>`;
}

/* ------------------------------ product cards ------------------------------ */

function productCard(p) {
  const badge = p.badge
    ? `<span class="badge ${p.badge === "New" ? "accent" : ""}">${p.badge}</span>` : "";
  const photos = p.images?.length ? p.images : (p.image ? [p.image] : []);
  const carousel = photos.length > 1;
  const media = carousel
    ? `<div class="card-carousel-track">${photos.map((src, i) =>
        `<img src="${src}" alt="${p.name} — photo ${i + 1}" loading="lazy" draggable="false">`).join("")}</div>
       <div class="card-carousel-dots" aria-hidden="true">${photos.map((_, i) =>
        `<span class="card-carousel-dot${i === 0 ? " active" : ""}"></span>`).join("")}</div>`
    : productArt(p);
  return `
  <a class="card reveal${["return-performance-tee", "made-for-sunny-days-performance-tee", "one-more-game-performance-tee", "reinstated-performance-tee"].includes(p.id) ? " return-tee-card" : ""}" href="product.html?id=${p.id}">
    ${badge}
    <div class="frame${p.image ? " photo" : ""}${carousel ? " card-carousel" : ""}">${media}</div>
    <div class="swatches">${p.swatches.map(s => `<i style="background:${s}"></i>`).join("")}</div>
    <h3>${p.name}</h3>
    <div class="cat">${p.category}</div>
    <div class="status">
      <span class="soon">Coming soon</span>
      <span class="notify">Notify</span>
    </div>
  </a>`;
}

function wireCardCarousels(container) {
  const reduceMotion = window.matchMedia("prefers-reduced-motion: reduce").matches;
  container.querySelectorAll(".card-carousel").forEach(frame => {
    const card = frame.closest(".card");
    const slides = [...frame.querySelectorAll(".card-carousel-track img")];
    const dots = [...frame.querySelectorAll(".card-carousel-dot")];
    if (slides.length < 2) return;
    let index = 0;
    let timer = null;
    const show = i => {
      index = i % slides.length;
      frame.querySelector(".card-carousel-track").style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, n) => dot.classList.toggle("active", n === index));
    };
    const stop = () => { if (timer !== null) { clearInterval(timer); timer = null; } };
    card.addEventListener("mouseenter", () => {
      if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
      stop();
      timer = setInterval(() => show(index + 1), 2200);
    });
    card.addEventListener("mouseleave", () => { stop(); show(0); });
    card.addEventListener("focusout", e => {
      if (!card.contains(e.relatedTarget)) { stop(); show(0); }
    });
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) { stop(); show(0); }
    });
    observer.observe(card);
  });
}

function renderProductGrid(sel, products = PRODUCTS) {
  const el = document.querySelector(sel);
  if (el) {
    el.innerHTML = products.map(productCard).join("");
    wireCardCarousels(el);
  }
}

/* -------------------------------- email forms ------------------------------ */

// Open the published Klaviyo signup form. Klaviyo handles consent and storage.
const KLAVIYO_SIGNUP_FORM_ID = "SpUbSP";
function openKlaviyoSignup() {
  window._klOnsite = window._klOnsite || [];
  window._klOnsite.push(["openForm", KLAVIYO_SIGNUP_FORM_ID]);
}

function wireSignupForms() {
  document.addEventListener("click", e => {
    const trigger = e.target.closest("[data-klaviyo-open]");
    if (!trigger) return;
    e.preventDefault();
    openKlaviyoSignup();
  });
}

/* ------------------------------ reveal on scroll ---------------------------- */

function wireReveals() {
  const io = new IntersectionObserver(entries => {
    for (const en of entries) if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* ------------------------- per-product SEO (product.html) ------------------ */
/* product.html selects a product from ?id=, so its title/description/canonical
   and Product structured data must be set at render time. Googlebot renders JS,
   so this makes each product URL unique; the static tags in product.html's <head>
   are the no-JS fallback. */

const SITE_ORIGIN = "https://solunapkl.com";

function _meta(key, val) {
  let el = document.head.querySelector(`meta[${key}]`);
  if (!el) {
    el = document.createElement("meta");
    const [attr, raw] = key.split("=");
    el.setAttribute(attr, raw.replace(/"/g, ""));
    document.head.appendChild(el);
  }
  el.setAttribute("content", val);
}

function setProductSEO(p) {
  const url = `${SITE_ORIGIN}/product.html?id=${p.id}`;
  const titled = `${p.name}, ${BRAND.name}`;
  const desc = p.blurb.length > 155 ? p.blurb.slice(0, 152).trimEnd() + "..." : p.blurb;

  document.title = titled;
  _meta('name="description"', desc);
  _meta('property="og:title"', titled);
  _meta('property="og:description"', desc);
  _meta('property="og:url"', url);
  _meta('name="twitter:title"', titled);
  _meta('name="twitter:description"', desc);

  let canon = document.head.querySelector('link[rel="canonical"]');
  if (!canon) {
    canon = document.createElement("link");
    canon.setAttribute("rel", "canonical");
    document.head.appendChild(canon);
  }
  canon.setAttribute("href", url);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": p.name,
    "description": p.blurb,
    "brand": { "@type": "Brand", "name": BRAND.name },
    "category": p.category,
    "image": p.image ? `${SITE_ORIGIN}/${p.image}` : `${SITE_ORIGIN}/assets/og-image.png`,
    "url": url,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "priceCurrency": "USD",
      "url": url,
    },
  };
  let s = document.getElementById("product-jsonld");
  if (!s) {
    s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "product-jsonld";
    document.head.appendChild(s);
  }
  s.textContent = JSON.stringify(ld);
}


/* -------------------------- seamless hat photography -------------------------
   Hat product images are supplied on white. Remove only white pixels connected
   to the OUTSIDE of each photo, preserving the actual hat, details and shadows.
   Original image files remain unchanged. Result works on cream and navy themes.
   --------------------------------------------------------------------------- */
const hatCutoutCache = new Map();

function cutOutHatPhoto(img) {
  const src = img.getAttribute("src");
  if (!src || /^(data|blob):/.test(src) || !img.complete || !img.naturalWidth) return;

  if (!hatCutoutCache.has(src)) {
    const task = new Promise(resolve => {
      try {
        const width = img.naturalWidth, height = img.naturalHeight;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) { resolve(null); return; }
        context.drawImage(img, 0, 0);
        const image = context.getImageData(0, 0, width, height);
        const pixels = image.data;
        const count = width * height;
        const visited = new Uint8Array(count);
        const queue = new Uint32Array(count);
        let head = 0, tail = 0, removed = 0;

        // The cream hat is deliberately not keyed out: all RGB channels
        // must be near white, and the region must connect to a photo edge.
        function enqueue(i) {
          if (visited[i]) return;
          visited[i] = 1;
          const p = i * 4;
          if (pixels[p + 3] > 0 &&
              pixels[p] >= 231 && pixels[p + 1] >= 231 && pixels[p + 2] >= 231 &&
              Math.max(pixels[p], pixels[p + 1], pixels[p + 2]) -
              Math.min(pixels[p], pixels[p + 1], pixels[p + 2]) <= 20) {
            queue[tail++] = i;
          }
        }

        for (let x = 0; x < width; x++) {
          enqueue(x);
          enqueue((height - 1) * width + x);
        }
        for (let y = 0; y < height; y++) {
          enqueue(y * width);
          enqueue(y * width + width - 1);
        }

        while (head < tail) {
          const i = queue[head++];
          pixels[i * 4 + 3] = 0;
          removed++;
          const x = i % width;
          if (x > 0) enqueue(i - 1);
          if (x < width - 1) enqueue(i + 1);
          if (i >= width) enqueue(i - width);
          if (i < count - width) enqueue(i + width);
        }

        if (!removed) { resolve(null); return; }
        context.putImageData(image, 0, 0);
        canvas.toBlob(blob => resolve(blob ? URL.createObjectURL(blob) : null), "image/png");
      } catch (error) {
        // A photo that cannot be processed is still displayed untouched.
        resolve(null);
      }
    });
    hatCutoutCache.set(src, task);
  }

  hatCutoutCache.get(src).then(url => {
    // Don't replace a thumbnail that has switched to another colorway.
    if (url && img.getAttribute("src") === src) img.src = url;
  });
}

function setupSeamlessHatPhotos() {
  const wired = new WeakSet();
  const scan = () => {
    document.querySelectorAll('.card[href*="-hat-"] .frame img, body.hat-product-page .pdp-left img').forEach(img => {
      if (!wired.has(img)) {
        wired.add(img);
        img.addEventListener("load", () => cutOutHatPhoto(img));
      }
      if (img.complete && img.naturalWidth) cutOutHatPhoto(img);
    });
  };
  const observer = new MutationObserver(scan);
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
  scan();
}

/* ---------------------------------- boot ----------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  restoreTheme();
  injectChrome();
  if (typeof pageInit === "function") pageInit();
  setupSeamlessHatPhotos();
  startCountdowns();
  wireSignupForms();
  wireReveals();
});

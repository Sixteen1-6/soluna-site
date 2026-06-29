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
    ["about.html", "Story"],
  ];

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="announce">${announce}</div>
    <header class="site">
      <nav class="nav">
        <a class="brand" href="index.html"><img src="assets/logo.png" class="logo" alt="Soluna"></a>
        <ul class="nav-links">
          ${links.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}
        </ul>
        <div class="nav-right">
          <button class="theme-toggle" type="button" aria-label="Toggle Sol or Luna mode">Sol / Luna</button>
          <a href="#" aria-label="Search">${ICONS.search}</a>
          <button class="nav-burger" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </nav>
      <div class="mobile-menu">
        ${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}
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
            <a href="index.html#drop">The Drop</a>
            <a href="shop.html">Starting Lineup</a>
          </div>
          <div class="foot-col">
            <h4>Soluna</h4>
            <a href="about.html">Our Story</a>
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
  return `
  <a class="card reveal" href="product.html?id=${p.id}">
    ${badge}
    <div class="frame">${productArt(p)}</div>
    <div class="swatches">${p.swatches.map(s => `<i style="background:${s}"></i>`).join("")}</div>
    <h3>${p.name}</h3>
    <div class="cat">${p.category}</div>
    <div class="status">
      <span class="soon">Coming soon</span>
      <span class="notify">Notify</span>
    </div>
  </a>`;
}

function renderProductGrid(sel, products = PRODUCTS) {
  const el = document.querySelector(sel);
  if (el) el.innerHTML = products.map(productCard).join("");
}

/* -------------------------------- email forms ------------------------------ */

function wireSignupForms() {
  document.querySelectorAll("form[data-signup]").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type=email]");
      const email = input.value.trim();
      if (!email) return;
      if (BRAND.formEndpoint) {
        try {
          await fetch(BRAND.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ email, source: form.dataset.signup }),
          });
        } catch { /* still show success; the list is best-effort */ }
      } else {
        const saved = JSON.parse(localStorage.getItem("soluna_signups") || "[]");
        saved.push({ email, source: form.dataset.signup, at: new Date().toISOString() });
        localStorage.setItem("soluna_signups", JSON.stringify(saved));
      }
      form.style.display = "none";
      const ok = form.parentElement.querySelector(".ok");
      if (ok) ok.style.display = "block";
    });
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
    "image": `${SITE_ORIGIN}/assets/og-image.png`,
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

/* ---------------------------------- boot ----------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  restoreTheme();
  injectChrome();
  if (typeof pageInit === "function") pageInit();
  startCountdowns();
  wireSignupForms();
  wireReveals();
});

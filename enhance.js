/* ============================================================
   DFS — UX enhancement layer
   Loaded LAST (after app.js) so dynamically-rendered grids
   (sport cards, trending picks) already exist in the DOM.
   ============================================================ */
(function () {
  "use strict";

  var docEl = document.documentElement;
  docEl.classList.add("js"); // gate the hidden/animated states in enhance.css

  var reduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- hero entrance ----------
     Fire as soon as the DOM is ready — NOT on window.load, which would
     wait for the hero iframe (it pulls React/Babel from a CDN) and leave
     the hero copy hidden for seconds. Two rAFs let the hidden initial
     state paint first so the transition actually runs. */
  function markLoaded() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { document.body.classList.add("loaded"); });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", markLoaded);
  } else {
    markLoaded();
  }

  /* ---------- scroll-reveal with stagger ---------- */
  // Tag elements as reveal targets without editing the exported HTML.
  // [selector, staggerStepMs] — children of a group get incremental delay.
  var groups = [
    [".section-head", 0],
    [".steps .step", 90],
    [".sport-grid .sport-card", 70],
    [".lm-head", 0],
    [".picks-grid .pick-card", 60],
    [".plays .play", 110],
    [".promo-grid > div", 120],
    [".foot-grid > div", 70],
  ];

  var revealEls = [];
  groups.forEach(function (g) {
    var nodes = document.querySelectorAll(g[0]);
    nodes.forEach(function (el, i) {
      if (el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      if (g[1]) el.style.setProperty("--rd", i * g[1] + "ms");
      revealEls.push(el);
    });
  });

  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---------- animated stat counters ---------- */
  // "2.8M+" -> prefix:"" num:2.8 dec:1 suffix:"M+" ; "$98M+" -> prefix:"$"
  function parseStat(text) {
    var m = String(text).match(/^([^\d.-]*)(-?[\d,]*\.?\d+)(.*)$/);
    if (!m) return null;
    var raw = m[2].replace(/,/g, "");
    return {
      prefix: m[1],
      value: parseFloat(raw),
      decimals: (raw.split(".")[1] || "").length,
      suffix: m[3],
    };
  }
  function animateCount(el) {
    var spec = parseStat(el.textContent);
    if (!spec || isNaN(spec.value)) return;
    if (reduced) return; // leave the authored value as-is
    var dur = 1500, start = null;
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); }; // easeOutCubic
    function frame(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      var v = (spec.value * ease(t)).toFixed(spec.decimals);
      el.textContent = spec.prefix + v + spec.suffix;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = spec.prefix + spec.value.toFixed(spec.decimals) + spec.suffix;
    }
    requestAnimationFrame(frame);
  }

  var stats = document.querySelectorAll(".stats .stat .n");
  if (stats.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      // keep authored values
    } else {
      var statIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animateCount(e.target);
            statIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.6 });
      stats.forEach(function (el) { statIO.observe(el); });
    }
  }

  /* ---------- scroll-spy: active nav link follows the section ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav-links a[href^='#']")
  );
  var linkFor = {};
  navLinks.forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    if (id) linkFor[id] = a;
  });
  var spyTargets = Object.keys(linkFor)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (spyTargets.length && "IntersectionObserver" in window) {
    var visible = new Set();
    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      });
      // pick the topmost visible section
      var current = spyTargets
        .filter(function (s) { return visible.has(s.id); })
        .sort(function (a, b) {
          return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
        })[0];
      if (current) {
        navLinks.forEach(function (a) { a.classList.remove("active"); });
        if (linkFor[current.id]) linkFor[current.id].classList.add("active");
      }
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    spyTargets.forEach(function (s) { spyIO.observe(s); });
  }

  /* ---------- nav scroll state + progress bar + coin parallax ---------- */
  var nav = document.querySelector(".nav");
  var progress = null;
  if (nav) {
    progress = document.createElement("div");
    progress.className = "nav-progress";
    nav.appendChild(progress);
  }
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", y > 8);
    if (progress) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
})();

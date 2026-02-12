// Mobile menu
const navToggle = document.getElementById("navToggle");
const navDrawer = document.getElementById("navDrawer");

if (navToggle && navDrawer) {
  navToggle.addEventListener("click", () => {
    const open = navDrawer.style.display === "block";
    navDrawer.style.display = open ? "none" : "block";
    navToggle.setAttribute("aria-expanded", String(!open));
    navDrawer.setAttribute("aria-hidden", String(open));
  });

  // Close drawer after click
  navDrawer.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navDrawer.style.display = "none";
      navToggle.setAttribute("aria-expanded", "false");
      navDrawer.setAttribute("aria-hidden", "true");
    });
  });
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal on scroll
const reveals = Array.from(document.querySelectorAll(".reveal"));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// Counters
function animateCounter(el, target) {
  const duration = 900;
  const start = 0;
  const startTime = performance.now();

  function tick(now) {
    const p = Math.min(1, (now - startTime) / duration);
    const value = Math.floor(start + (target - start) * (1 - Math.pow(1 - p, 3)));
    el.textContent = value.toString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counters = Array.from(document.querySelectorAll("[data-counter]"));
let countersDone = false;

const counterObserver = new IntersectionObserver((entries) => {
  const anyVisible = entries.some(e => e.isIntersecting);
  if (!anyVisible || countersDone) return;

  counters.forEach(el => {
    const t = parseInt(el.getAttribute("data-counter"), 10);
    if (!Number.isNaN(t)) animateCounter(el, t);
  });

  countersDone = true;
}, { threshold: 0.25 });

const hero = document.querySelector(".hero");
if (hero) counterObserver.observe(hero);

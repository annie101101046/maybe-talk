// Language switching
let currentLang = 'zh';

// Single swap point for the three buy buttons. Overlay script binds these hrefs.
const CHECKOUT = {
  single: "https://kincode.gumroad.com/l/single-trimester",
  full: "https://kincode.gumroad.com/l/full-pregnancy-pass",
  gift: "https://kincode.gumroad.com/l/gift-edition"
};

function applyCheckoutLinks() {
  document.querySelectorAll("[data-plan]").forEach(el => {
    const url = CHECKOUT[el.dataset.plan];
    if (url) el.href = url;
  });
}

function applyLang(lang) {
  currentLang = lang === 'en' ? 'en' : 'zh';
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  document.querySelectorAll('.i18n').forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (text) el.textContent = text;
  });
  document.documentElement.lang = currentLang === 'zh' ? 'zh-Hant' : 'en';
  document.documentElement.classList.remove('i18n-pending');
  applyCheckoutLinks();
}

function setLang(lang) {
  var choice = lang === 'en' ? 'en' : 'zh';
  try { localStorage.setItem('lang', choice); } catch (e) {}
  applyLang(choice);
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

applyLang(window.__siteLang === 'en' ? 'en' : 'zh');

// Nav scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

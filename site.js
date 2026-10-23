// Language switching
let currentLang = 'zh';

// Point a plan at checkout later by setting its url. Empty url keeps the mailto.
const CHECKOUT_EMAIL = "hello@maybeshedliketotalk.org";
const CHECKOUT = {
  single: {
    url: "",
    zh: {
      subject: "預購：單一孕期 US$15",
      body: "你好，我想預購「單一孕期」（US$15）。\n\n姓名：\n預產期：\n想走的週數（1–12 / 13–27 / 28–40）：\n"
    },
    en: {
      subject: "Pre-order: Single Trimester US$15",
      body: "Hi, I'd like to pre-order Single Trimester (US$15).\n\nName:\nDue date:\nWeeks I'd like (1–12 / 13–27 / 28–40):\n"
    }
  },
  full: {
    url: "",
    zh: {
      subject: "預購：全孕期通行證 US$29",
      body: "你好，我想預購「全孕期通行證」（早鳥 US$29）。\n\n姓名：\n預產期：\n"
    },
    en: {
      subject: "Pre-order: Full Pregnancy Pass US$29",
      body: "Hi, I'd like to pre-order the Full Pregnancy Pass (early bird US$29).\n\nName:\nDue date:\n"
    }
  },
  gift: {
    url: "",
    zh: {
      subject: "預購：送禮版 US$45",
      body: "你好，我想預購「送禮版」（US$45）。\n\n姓名：\n預產期：\n"
    },
    en: {
      subject: "Pre-order: Gift Edition US$45",
      body: "Hi, I'd like to pre-order the Gift Edition (US$45).\n\nName:\nDue date:\n"
    }
  }
};

function checkoutHref(plan, lang) {
  const item = CHECKOUT[plan];
  if (!item) return "mailto:" + CHECKOUT_EMAIL;
  if (item.url) return item.url;
  const copy = item[lang] || item.zh;
  const params = new URLSearchParams({ subject: copy.subject, body: copy.body });
  return "mailto:" + CHECKOUT_EMAIL + "?" + params.toString();
}

function applyCheckoutLinks() {
  document.querySelectorAll("[data-plan]").forEach(el => {
    el.href = checkoutHref(el.dataset.plan, currentLang);
  });
}

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('.i18n').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
  applyCheckoutLinks();
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

applyCheckoutLinks();

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

/* ===== ניווט, סימון עמוד פעיל והופעה הדרגתית ===== */
(function () {
  'use strict';

  /* תפריט מובייל */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* סימון הקישור הפעיל לפי שם הקובץ */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === current) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* הופעה הדרגתית של בלוקים בגלילה */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* כפתור חזרה לראש העמוד */
  const toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.textContent = '↑';
  toTop.setAttribute('aria-label', 'חזרה לראש העמוד');
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
  document.body.appendChild(toTop);
  window.addEventListener('scroll', function () {
    toTop.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
})();

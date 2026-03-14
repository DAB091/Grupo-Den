/* ═══════════════════════════════════════════════════
   GRUPO DEN — main.js
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Activar animaciones ─────────────────────────── */
  document.documentElement.classList.add('js-ready');

  /* ── Navbar scroll shadow ────────────────────────── */
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── Mobile menu ─────────────────────────────────── */
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Cerrar al hacer click en un link
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navList.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar al hacer click fuera del menú
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navList.classList.contains('open')) {
        navList.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Scroll Reveal ───────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

})();

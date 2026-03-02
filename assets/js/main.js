/* ============================================
   DRWX — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile menu toggle ---
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (toggle) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }

  // --- Scroll reveal animations ---
  const fadeElements = document.querySelectorAll(
    '.service-card, .about__text, .about__stats, .stat, .stack__item, .contact__info, .contact__form, .section__header'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animation for grid items
        const delay = entry.target.closest('.services__grid, .stack__grid, .about__stats')
          ? i * 80 : 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeElements.forEach(el => observer.observe(el));

  // --- Counter animation ---
  const counters = document.querySelectorAll('.stat__number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const isDecimal = target % 1 !== 0;
        const duration = 1500;
        const start = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = target * eased;
          el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // --- Nav background on scroll ---
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      nav.style.borderBottomColor = 'rgba(34, 211, 238, 0.1)';
    } else {
      nav.style.borderBottomColor = '';
    }
    lastScroll = scrollY;
  }, { passive: true });

  // --- Contact form ---
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nombre = form.querySelector('#nombre').value;
      const email = form.querySelector('#email').value;
      const mensaje = form.querySelector('#mensaje').value;

      // For now, open mailto (replace with actual backend later)
      const mailtoLink = `mailto:hola@drwx.io?subject=Consulta de ${encodeURIComponent(nombre)}&body=${encodeURIComponent(mensaje)}%0A%0A--- Enviado desde drwx.io por ${encodeURIComponent(nombre)} (${encodeURIComponent(email)})`;
      
      window.location.href = mailtoLink;

      // Visual feedback
      const btn = form.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Mensaje preparado';
      btn.style.background = 'var(--green)';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 3000);
    });
  }

  // --- Smooth anchor scrolling (fallback) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});

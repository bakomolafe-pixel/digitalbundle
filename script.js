// =================================================================
// SKILL TO CASH — Landing Page Interactions
// =================================================================

// ----- 1. COUNTDOWN TIMER (resets every 24h to keep urgency real) -----
function startCountdown() {
  // Set a recurring 24h window. Every visitor sees a fresh timer that
  // ends at the next midnight (local time).
  const els = [
    document.getElementById('countdown'),
    document.getElementById('countdown2')
  ].filter(Boolean);

  function tick() {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const diff = end - now;

    const h = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    const text = `${h}:${m}:${s}`;
    els.forEach(el => el.textContent = text);
  }
  tick();
  setInterval(tick, 1000);
}

// ----- 2. FAQ ACCORDION -----
function setupFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    // Ensure each question button has a + indicator
    if (q && !q.querySelector('span')) {
      const plus = document.createElement('span');
      plus.textContent = '+';
      q.appendChild(plus);
    }
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked (toggle)
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ----- 3. SMOOTH SCROLL for anchor links -----
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ----- 4. STICKY CTA — Hide near top, show after hero scroll -----
function setupStickyCTA() {
  const sticky = document.querySelector('.sticky-cta');
  if (!sticky) return;

  const hero = document.querySelector('.hero');
  const heroHeight = hero ? hero.offsetHeight : 600;

  window.addEventListener('scroll', () => {
    if (window.scrollY > heroHeight * 0.6) {
      sticky.style.transform = 'translateY(0)';
      sticky.style.opacity = '1';
    } else {
      sticky.style.transform = 'translateY(100%)';
      sticky.style.opacity = '0';
    }
  });
  // Initial state
  sticky.style.transition = 'all 0.3s ease';
  sticky.style.transform = 'translateY(100%)';
  sticky.style.opacity = '0';
}

// ----- 5. SCROLL REVEAL animations -----
function setupReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.pain-card, .promise-card, .inside-card, .bonus-card, .testimonial, .for-card, .trans-col'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ----- 6. Init everything when DOM is ready -----
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupFAQ();
  setupSmoothScroll();
  setupStickyCTA();
  setupReveal();
});

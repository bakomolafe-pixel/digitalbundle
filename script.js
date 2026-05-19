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



// ----- 7. SALES POP-UP (Social Proof Notification) -----
function setupSalesPop() {
  const pop = document.getElementById('salesPop');
  const popName = document.getElementById('popName');
  const popTime = document.getElementById('popTime');
  const popClose = document.getElementById('popClose');
  if (!pop || !popName || !popTime) return;

  const buyers = [
    { name: 'Adaeze from Enugu', time: '2 minutes ago' },
    { name: 'Tobi from Lagos', time: '4 minutes ago' },
    { name: 'Blessing from PH', time: '6 minutes ago' },
    { name: 'Emeka from Abuja', time: '8 minutes ago' },
    { name: 'Seyi from Ibadan', time: '11 minutes ago' },
    { name: 'Nkechi from Owerri', time: '13 minutes ago' },
    { name: 'Chisom from Uyo', time: '15 minutes ago' },
    { name: 'Tunde from Abeokuta', time: '18 minutes ago' },
    { name: 'Amina from Kano', time: '21 minutes ago' },
    { name: 'David from Benin', time: '24 minutes ago' },
    { name: 'Funke from Osogbo', time: '27 minutes ago' },
    { name: 'Chidi from Onitsha', time: '30 minutes ago' },
  ];

  let index = 0;
  let dismissed = false;
  let showTimeout, hideTimeout, cycleInterval;

  function showPop() {
    if (dismissed) return;
    const buyer = buyers[index % buyers.length];
    popName.textContent = buyer.name;
    popTime.textContent = buyer.time;
    pop.classList.add('show');

    // Hide after 5 seconds
    hideTimeout = setTimeout(() => {
      pop.classList.remove('show');
    }, 5000);

    index++;
  }

  // Close button
  if (popClose) {
    popClose.addEventListener('click', () => {
      pop.classList.remove('show');
      dismissed = true;
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearInterval(cycleInterval);
    });
  }

  // Start after 8 seconds, then cycle every 15 seconds
  showTimeout = setTimeout(() => {
    showPop();
    cycleInterval = setInterval(() => {
      showPop();
    }, 15000);
  }, 8000);
}

// Add to init
document.addEventListener('DOMContentLoaded', () => {
  setupSalesPop();
});

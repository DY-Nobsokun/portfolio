const menuTrigger = document.querySelector('.explore-trigger');
const menu = document.querySelector('.explore-menu');
function closeMenu() {
  menu.hidden = true;
  menuTrigger.setAttribute('aria-expanded', 'false');
}
menuTrigger.addEventListener('click', () => {
  menu.hidden = !menu.hidden;
  menuTrigger.setAttribute('aria-expanded', String(!menu.hidden));
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.explore')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

function filterProjects(category) {
  document.querySelectorAll('.filter').forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.project-card').forEach((card) => {
    card.hidden = category !== 'All' && card.dataset.type !== category;
  });
}
document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => filterProjects(button.dataset.filter));
});
document.querySelectorAll('[data-category]').forEach((link) => {
  link.addEventListener('click', () => {
    filterProjects(link.dataset.category);
    closeMenu();
  });
});

const projectDialog = document.querySelector('#project-dialog');
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => {
    if (card.dataset.type === 'Posters') {
      window.location.href = '/posters.html';
      return;
    }
    if (card.dataset.type === 'Video') {
      window.location.href = '/video.html';
      return;
    }
    if (card.dataset.type === 'UX/UI') {
      window.location.href = '/ux-ui.html';
      return;
    }
    document.querySelector('#dialog-category').textContent = card.dataset.type;
    document.querySelector('#dialog-title').textContent = card.dataset.title;
    document.querySelector('#dialog-description').textContent = card.dataset.description;
    projectDialog.showModal();
  });
});
document.querySelector('#contact-open').addEventListener('click', () => {
  document.querySelector('#contact-dialog').showModal();
});
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
const sections = document.querySelectorAll('#home, #about, #projects');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.toggle('active', link.hash === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-15% 0px -65% 0px' });
sections.forEach((section) => observer.observe(section));

const phoneCarousel = document.querySelector('.phone-carousel');
const phoneCards = [...phoneCarousel.querySelectorAll('.phone-card')];
const phoneToggle = document.querySelector('#phone-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activePhone = 2;
let phonePaused = reducedMotion.matches;
let phoneTimer;
let phoneVisible = false;

function renderPhones() {
  phoneCards.forEach((card, index) => {
    card.dataset.slot = String((index - activePhone + 7) % 5 - 2);
  });
  phoneCarousel.querySelector('.carousel-position').textContent = `${String(activePhone + 1).padStart(2, '0')} / 05`;
}

function startPhoneRotation() {
  window.clearInterval(phoneTimer);
  if (phonePaused || !phoneVisible || document.hidden || phoneCarousel.matches(':hover') || phoneCarousel.contains(document.activeElement)) return;
  phoneTimer = window.setInterval(() => {
    activePhone = (activePhone + 1) % phoneCards.length;
    renderPhones();
  }, 3000);
}

function updatePhoneToggle() {
  phoneToggle.textContent = phonePaused ? 'Resume rotation' : 'Pause rotation';
  phoneToggle.setAttribute('aria-pressed', String(phonePaused));
  startPhoneRotation();
}

document.querySelector('#phone-previous').addEventListener('click', () => {
  activePhone = (activePhone + phoneCards.length - 1) % phoneCards.length;
  renderPhones();
  startPhoneRotation();
});
document.querySelector('#phone-next').addEventListener('click', () => {
  activePhone = (activePhone + 1) % phoneCards.length;
  renderPhones();
  startPhoneRotation();
});
phoneToggle.addEventListener('click', () => {
  phonePaused = !phonePaused;
  updatePhoneToggle();
});
phoneCarousel.addEventListener('mouseenter', () => window.clearInterval(phoneTimer));
phoneCarousel.addEventListener('mouseleave', startPhoneRotation);
phoneCarousel.addEventListener('focusin', () => window.clearInterval(phoneTimer));
phoneCarousel.addEventListener('focusout', () => window.setTimeout(startPhoneRotation, 0));
document.addEventListener('visibilitychange', startPhoneRotation);
reducedMotion.addEventListener('change', () => {
  phonePaused = reducedMotion.matches;
  updatePhoneToggle();
});
const phoneObserver = new IntersectionObserver(([entry]) => {
  phoneVisible = entry.isIntersecting;
  startPhoneRotation();
}, { threshold: 0.15 });
phoneObserver.observe(phoneCarousel);
renderPhones();
updatePhoneToggle();

const skillsSection = document.querySelector('.skills-section');
const skillsTrack = skillsSection.querySelector('.skills-track');
const skillsCopy = skillsTrack.querySelector('.skills-group').cloneNode(true);
skillsCopy.setAttribute('aria-hidden', 'true');
skillsTrack.append(skillsCopy);

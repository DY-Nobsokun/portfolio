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

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

const closeMenu = () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  document.body.classList.remove('menu-open');
};

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeMenu();
  } else {
    navigation.classList.add('open');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Закрыть меню');
    document.body.classList.add('menu-open');
  }
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 8), { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const form = document.querySelector('#trial-form');
const formStatus = document.querySelector('#form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(form).get('name').trim();
  formStatus.textContent = `Спасибо, ${name}! Это демо-форма — подключение отправки будет выполнено после согласования.`;
  form.reset();
});

const contactStatus = document.querySelector('#contact-status');
document.querySelectorAll('[data-contact]').forEach((button) => {
  button.addEventListener('click', () => {
    const channel = button.dataset.contact === 'whatsapp' ? 'WhatsApp' : 'звонка';
    contactStatus.textContent = `Номер для ${channel} будет добавлен после согласования с академией.`;
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

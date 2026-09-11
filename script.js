// Theme toggle: respects saved choice, falls back to system preference.
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const applyTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  themeToggle.querySelector('.theme-toggle__icon').textContent =
    theme === 'dark' ? '☀️' : '🌙';
};

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});
// Highlight the current section in the nav as you scroll.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const setActiveLink = () => {
  let currentId = '';
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
    link.style.color = isActive ? 'var(--accent-deep)' : '';
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();
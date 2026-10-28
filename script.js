const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();

// Each gallery slider controls only its own matched image pair.
document.querySelectorAll('.comparison-view').forEach((comparison) => {
  const range = comparison.querySelector('.comparison-range');
  range.addEventListener('input', () => {
    comparison.style.setProperty('--position', `${range.value}%`);
    range.setAttribute('aria-valuetext', `${range.value} percent before image visible`);
  });
});


// Keep ambient video muted; respect system reduced-motion preferences.
const heroVideo = document.querySelector('.hero-video');
const hero = document.querySelector('.hero');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (heroVideo.dataset.videoSrc) {
  heroVideo.src = heroVideo.dataset.videoSrc;
  heroVideo.muted = true;
  const playVideo = () => heroVideo.play().catch(() => {});
  heroVideo.addEventListener('playing', () => hero.classList.add('video-ready'));
  heroVideo.addEventListener('error', () => hero.classList.remove('video-ready'));
  motionPreference.addEventListener('change', (event) => {
    if (event.matches) heroVideo.pause(); else playVideo();
  });
  if (!motionPreference.matches) playVideo();
}

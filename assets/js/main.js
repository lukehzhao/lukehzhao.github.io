// Year + scrollspy + mobile toggles
document.addEventListener('DOMContentLoaded', () => {
  // Year
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // Scrollspy for right sidebar (desktop)
  const tocLinks = document.querySelectorAll('.aside a[href^="#"]');
  const targets = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const spy = () => {
    const pos = window.scrollY + 120;
    let active = null;
    for (const s of targets) if (s.offsetTop <= pos) active = s.id;
    tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active));
  };
  if (targets.length){ document.addEventListener('scroll', spy, {passive:true}); spy(); }

  // Mobile: hamburger menu
  const body = document.body;
  const mBtn = document.querySelector('.mnav-btn');
  const backdrop = document.querySelector('.backdrop');
  if (mBtn) mBtn.addEventListener('click', () => body.classList.toggle('menu-open'));
  if (backdrop) backdrop.addEventListener('click', () => body.classList.remove('menu-open'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){ body.classList.remove('menu-open'); body.classList.remove('toc-open'); }
  });
  // Close drawer when a nav link is tapped
  document.querySelectorAll('.rail nav a').forEach(a => {
    a.addEventListener('click', () => body.classList.remove('menu-open'));
  });

  // Mobile: floating TOC (Research/Teaching)
  const tocFab = document.querySelector('.toc-fab');
  if (tocFab){
    tocFab.addEventListener('click', () => body.classList.toggle('toc-open'));
    // Close TOC when a link is clicked
    const sheet = document.querySelector('.toc-sheet');
    if (sheet){
      sheet.querySelectorAll('a').forEach(a => a.addEventListener('click', () => body.classList.remove('toc-open')));
    }
  }
});

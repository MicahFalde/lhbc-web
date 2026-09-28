// Three-line menu on phones (Cam, Ed: 2026-09-10/14). Content is visible without this script
// on wide screens; on narrow ones the nav is hidden until the button opens it.
(function () {
  var btn = document.querySelector('.menu'), nav = document.getElementById('nav');
  if (!btn || !nav) return;
  function set(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('open', open);
  }
  btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !btn.contains(e.target)) set(false);
  });
})();

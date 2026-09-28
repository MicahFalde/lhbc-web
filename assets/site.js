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

// AIDEV-NOTE: Latest-message card (home) and recent list (sermons) come from Apple's public podcast
// lookup, which allows cross-origin reads. Everything here is an enhancement: the static text stays
// if the request fails, and the recent list section is simply absent without data.
(function () {
  var title = document.querySelector('[data-latest-title]'), meta = document.querySelector('[data-latest-meta]');
  var list = document.querySelector('[data-episodes]');
  if (!title && !list) return;
  var when = function (iso) { return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }); };
  var split = function (name) { var i = name.indexOf(' - '); return i > 0 ? [name.slice(0, i), name.slice(i + 3)] : ['', name]; };
  fetch('https://itunes.apple.com/lookup?id=6811710226&entity=podcastEpisode&limit=8')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var eps = (d.results || []).filter(function (r) { return r.kind === 'podcast-episode'; })
        .sort(function (a, b) { return a.releaseDate < b.releaseDate ? 1 : -1; });
      if (!eps.length) return;
      if (title) {
        var p = split(eps[0].trackName);
        title.textContent = p[1];
        meta.textContent = (p[0] ? p[0] + '. ' : '') + when(eps[0].releaseDate) + '.';
      }
      if (list) {
        eps.slice(0, 6).forEach(function (e) {
          var p = split(e.trackName), li = document.createElement('li'), a = document.createElement('a');
          a.href = e.trackViewUrl; a.rel = 'noopener'; a.target = '_blank';
          a.innerHTML = '<span class="d"></span><span class="t"><b></b><span></span></span><span class="m"></span>';
          a.querySelector('.d').textContent = new Date(e.releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          a.querySelector('.t b').textContent = p[1]; a.querySelector('.t span').textContent = p[0];
          a.querySelector('.m').textContent = Math.round((e.trackTimeMillis || 0) / 60000) + ' min';
          li.appendChild(a); list.appendChild(li);
        });
        list.closest('section').hidden = false;
      }
    }).catch(function () {});
})();

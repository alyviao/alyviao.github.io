(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  // highlight current page in nav
  var page = location.pathname.split('/').pop() || 'index.html';
  $('#sideNav .nav-link').forEach(function (a) { if (a.getAttribute('href') === page) a.classList.add('active'); });

  // stagger index for load-in animation
  $('.my-auto').forEach(function (box) {
    Array.prototype.forEach.call(box.children, function (el, i) { el.style.setProperty('--i', i); });
  });

  // scroll reveal
  var items = $('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }

  // scroll progress bar
  var bar = document.createElement('div');
  bar.id = 'progress';
  document.body.appendChild(bar);
  function progress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
  }
  window.addEventListener('scroll', progress, { passive: true });
  progress();
})();

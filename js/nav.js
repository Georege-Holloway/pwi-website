/* Mobile navigation toggle. The only JavaScript on the site.
   The nav is visible by default when JS is unavailable, because the
   data-open attribute is only consulted below 900px and the button is
   hidden above it. */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });

  /* Close the menu on Escape and return focus to the button. */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (nav.getAttribute('data-open') !== 'true') return;
    nav.setAttribute('data-open', 'false');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  });
})();

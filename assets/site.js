// Change this to your real inbox. The contact form opens the visitor's email app addressed here.
var CONTACT_EMAIL = 'hello@goldendayfilms.com';

(function () {
  var nav = document.querySelector('.nav');
  var onScroll = function () { nav.classList.toggle('solid', window.scrollY > 40); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  document.querySelector('.burger').addEventListener('click', function () {
    nav.classList.toggle('open');
  });
  document.querySelectorAll('.nav ul a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); });
  });

  // scroll reveal
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: .12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // portfolio lightbox
  var lb = document.querySelector('.lb');
  if (lb) {
    var lv = lb.querySelector('video');
    var close = function () { lb.classList.remove('open'); lv.pause(); lv.removeAttribute('src'); lv.load(); };
    document.querySelectorAll('.reel').forEach(function (r) {
      var open = function () {
        lv.src = r.getAttribute('data-src');
        lb.classList.add('open');
        lv.play();
      };
      r.addEventListener('click', open);
      r.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    lb.querySelector('button').addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  // contact form -> mailto
  var form = document.getElementById('enquiry');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var body = [
        'Name: ' + f.get('name'),
        'Email: ' + f.get('email'),
        'Wedding date: ' + f.get('date'),
        'Service needed: ' + f.get('service'),
        'Footage: ' + f.get('footage'),
        '',
        f.get('message')
      ].join('\n');
      window.location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent('Wedding edit enquiry from ' + f.get('name')) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();

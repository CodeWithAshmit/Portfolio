/* Ashmit Srivastava, portfolio
   Mobile navigation, active-section highlighting and footer year.
   No dependencies. */
(function () {
  'use strict';

  var MOBILE_QUERY = '(max-width: 860px)';

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  var header = document.querySelector('.site-header');
  var mobile = window.matchMedia(MOBILE_QUERY);

  /* ----- Mobile navigation ----- */
  function setMenu(open, returnFocus) {
    if (!toggle || !nav) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (!open && returnFocus) toggle.focus();
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close after choosing a link.
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });

    // Close with Escape and return focus to the button.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false, true);
      }
    });

    // Close when clicking or tapping outside the header.
    document.addEventListener('click', function (event) {
      if (toggle.getAttribute('aria-expanded') === 'true' && !header.contains(event.target)) {
        setMenu(false);
      }
    });

    // Reset when the layout grows to desktop width.
    var onBreakpoint = function (event) { if (!event.matches) setMenu(false); };
    if (mobile.addEventListener) mobile.addEventListener('change', onBreakpoint);
    else if (mobile.addListener) mobile.addListener(onBreakpoint);
  }

  /* ----- Highlight the nav link for the section in view ----- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function setCurrent(id) {
    links.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });

    // Nothing is current while the hero is on screen.
    var hero = document.getElementById('home');
    if (hero) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) setCurrent('');
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 }).observe(hero);
    }
  }

  /* ----- Tabbed project sketches (arrow keys, Home and End supported) ----- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-tabs]'), function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (event) {
        var next = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length];
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (event.key === 'Home') next = tabs[0];
        else if (event.key === 'End') next = tabs[tabs.length - 1];
        if (next) { event.preventDefault(); select(next, true); }
      });
    });
  });

  /* ----- Image lightbox (native <dialog>: Escape and focus return come built in) ----- */
  var box = document.getElementById('lightbox');
  var triggers = document.querySelectorAll('[data-lightbox]');

  if (box && typeof box.showModal === 'function') {
    var boxImg = box.querySelector('.lightbox-img');
    var boxCaption = box.querySelector('.lightbox-caption');

    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', function () {
        boxImg.src = trigger.getAttribute('data-full');
        boxImg.alt = trigger.getAttribute('data-alt') || '';
        boxCaption.textContent = trigger.getAttribute('data-caption') || '';
        box.showModal();
        document.documentElement.classList.add('lightbox-open');
      });
    });

    // The dialog fills the viewport, so a click on the dialog itself is a click outside the image.
    box.addEventListener('click', function (event) {
      if (event.target === box) box.close();
    });
    box.addEventListener('close', function () {
      document.documentElement.classList.remove('lightbox-open');
      boxImg.removeAttribute('src');
    });
  } else {
    // Very old browsers: open the full-size image in a new tab instead.
    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', function () {
        window.open(trigger.getAttribute('data-full'), '_blank', 'noopener');
      });
    });
  }

  /* ----- Footer year ----- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

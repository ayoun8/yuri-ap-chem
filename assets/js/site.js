/* =========================================================
   AP Chemistry Study Hub — shared site script
   - Builds the sidebar from NAV (edit NAV to add pages)
   - "On this page" links from elements with data-toc="Label"
   - Page search, expand/collapse, mastery progress
   - Opens collapsed sections when you jump to them
   - Prev/next links between pages in the same group
   ========================================================= */
(function () {
  'use strict';

  // ---------------------------------------------------------------
  // Site map. To add a page: add one line here.
  // key must match <body data-page="..."> on that page.
  // ---------------------------------------------------------------
  var NAV = [
    { title: 'Start', items: [
      { key: 'home', href: 'index.html', label: 'Home' }
    ]},
    { title: 'Lesson Recaps', items: [
      { key: 'lesson-2026-10-10', href: 'lessons/2026-10-10-imfs-gases.html', label: 'Oct 10 · IMFs & Gases', badge: 'Latest' }
    ]},
    { title: 'Course Notes', items: [
      { key: 'summer', href: 'summer-review.html', label: 'Summer Review' },
      { key: 'unit0', href: 'units/unit-0.html', label: 'Unit 0 · Foundations' },
      { key: 'unit1', href: 'units/unit-1.html', label: 'Unit 1 · Atomic Structure' },
      { key: 'unit2', href: 'units/unit-2.html', label: 'Unit 2 · Bonding & Structure' },
      { key: 'unit3', href: 'units/unit-3.html', label: 'Unit 3 · IMFs & Gases' },
      { key: 'unit4', href: 'units/unit-4.html', label: 'Unit 4 · Reactions' },
      { key: 'unit5', href: 'units/unit-5.html', label: 'Unit 5 · Kinetics' }
    ]},
    { title: 'Test Prep', items: [
      { key: 'test1', href: 'tests/test-1.html', label: 'Test 1 · What to Know' },
      { key: 'u0review', href: 'tests/unit-0-review.html', label: 'Unit 0 Test · Review' },
      { key: 'u0p1', href: 'tests/unit-0-practice-1.html', label: 'Unit 0 · Practice Test 1' },
      { key: 'u0p2', href: 'tests/unit-0-practice-2.html', label: 'Unit 0 · Practice Test 2' }
    ]},
    { title: 'Tools', items: [
      { key: 'formulas', href: 'formula-sheet.html', label: 'Formula & Constants Sheet' },
      { key: 'quiz', href: 'units/unit-0.html#quiz', label: 'Mixed Mastery Quiz', toolFor: 'unit0' }
    ]}
  ];

  // Checkbox progress saved by the old single-page site, so nobody loses it.
  // [old storage key, first index, count] for each page.
  var LEGACY_MASTERY = {"test1": ["apChemStudyMastery", 0, 1], "summer": ["apChemStudyMastery", 1, 9], "unit0": ["apChemStudyMastery", 10, 17], "unit1": ["apChemStudyMastery", 27, 9], "unit2": ["apChemStudyMastery", 36, 9], "unit3": ["apChemStudyMastery", 45, 10], "unit4": ["apChemStudyMastery", 55, 9], "unit5": ["apChemStudyMastery", 64, 9], "u0review": ["u0mastery", 0, 7]};

  var body = document.body;
  var root = body.getAttribute('data-root') || '';
  var pageKey = body.getAttribute('data-page') || '';
  var main = document.querySelector('main');

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function store(get, k, v) {
    try { if (get) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }

  // ---------------------------------------------------------------
  // Opening collapsed sections
  // ---------------------------------------------------------------
  function openTo(target) {
    for (var n = target; n; n = n.parentElement) {
      if (n.tagName === 'DETAILS') n.open = true;
    }
  }
  function jumpTo(id, smooth) {
    var t = id && document.getElementById(id);
    if (!t) return false;
    openTo(t);
    setTimeout(function () { t.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' }); }, 30);
    return true;
  }

  // ---------------------------------------------------------------
  // Sidebar
  // ---------------------------------------------------------------
  var aside = document.getElementById('sidebar');
  var tocItems = [].slice.call(document.querySelectorAll('[data-toc][id]'));
  var detailsAll = main ? main.querySelectorAll('details') : [];
  var checks = main ? [].slice.call(main.querySelectorAll('.master input[type=checkbox], input.mastery, label.mastery input[type=checkbox]')) : [];

  function buildSidebar() {
    if (!aside) return;
    aside.innerHTML = '';
    aside.appendChild(el('a', { class: 'brand', href: root + 'index.html' }, 'AP Chemistry'));
    aside.appendChild(el('div', { class: 'sub' }, 'Study Hub · Units 0–5'));

    var hasSearch = tocItems.length > 0 || detailsAll.length > 0;
    if (hasSearch) {
      aside.appendChild(el('input', { class: 'search', id: 'search', type: 'search', placeholder: 'Search this page…', 'aria-label': 'Search this page' }));
      aside.appendChild(el('div', { class: 'search-empty hidden', id: 'searchEmpty' }, 'No matches on this page.'));
    }

    var nav = el('nav', { 'aria-label': 'Site' });
    NAV.forEach(function (group) {
      nav.appendChild(el('div', { class: 'navtitle' }, esc(group.title)));
      group.items.forEach(function (item) {
        var isCurrent = item.key === pageKey && !item.toolFor;
        var a = el('a', { href: root + item.href }, esc(item.label) + (item.badge ? '<span class="badge">' + esc(item.badge) + '</span>' : ''));
        if (isCurrent) { a.className = 'current'; a.setAttribute('aria-current', 'page'); }
        nav.appendChild(a);
        if (isCurrent && tocItems.length) {
          var toc = el('div', { class: 'toc' });
          tocItems.forEach(function (t) {
            toc.appendChild(el('a', { href: '#' + t.id, 'data-toc-link': t.id }, esc(t.getAttribute('data-toc'))));
          });
          nav.appendChild(toc);
        }
      });
    });
    aside.appendChild(nav);

    if (checks.length || detailsAll.length) {
      var prog = el('div', { class: 'prog' });
      if (checks.length) {
        prog.appendChild(el('div', { class: 'prow' }, '<span>Mastery on this page</span><span id="pct">0%</span>'));
        prog.appendChild(el('div', { class: 'bar' }, '<div class="fill" id="fill"></div>'));
      }
      if (detailsAll.length) {
        prog.appendChild(el('div', { class: 'actions' }, '<button type="button" id="openAll">Expand all</button><button type="button" id="closeAll">Collapse all</button>'));
      }
      aside.appendChild(prog);
    }
  }

  // ---------------------------------------------------------------
  // Mastery checkboxes (saved per page in this browser)
  // ---------------------------------------------------------------
  function setupMastery() {
    if (!checks.length) return;
    var key = 'mastery:' + pageKey;
    var saved = null;
    try { saved = JSON.parse(store(true, key) || 'null'); } catch (e) {}
    if (!Array.isArray(saved) && LEGACY_MASTERY[pageKey]) {
      var m = LEGACY_MASTERY[pageKey];
      try {
        if (m[0] === 'apChemStudyMastery') {
          var old = JSON.parse(store(true, m[0]) || 'null');
          if (Array.isArray(old)) saved = old.slice(m[1], m[1] + m[2]);
        } else {
          saved = checks.map(function (_, i) { return store(true, m[0] + (m[1] + i)) === '1'; });
        }
      } catch (e) {}
    }
    if (Array.isArray(saved)) checks.forEach(function (c, i) { c.checked = !!saved[i]; });
    function update() {
      var done = checks.filter(function (c) { return c.checked; }).length;
      var pct = Math.round(done / checks.length * 100);
      var fill = document.getElementById('fill'), p = document.getElementById('pct');
      if (fill) fill.style.width = pct + '%';
      if (p) p.textContent = pct + '%';
      store(false, key, JSON.stringify(checks.map(function (c) { return c.checked; })));
    }
    checks.forEach(function (c) { c.addEventListener('change', update); });
    update();
  }

  // ---------------------------------------------------------------
  // Expand / collapse
  // ---------------------------------------------------------------
  function setupExpand() {
    var o = document.getElementById('openAll'), c = document.getElementById('closeAll');
    // The practice-test answer key stays closed unless opened on purpose.
    function all() { return [].slice.call(main.querySelectorAll('details')).filter(function (d) { return !d.closest('.answer-key'); }); }
    if (o) o.addEventListener('click', function () { all().forEach(function (d) { d.open = true; }); });
    if (c) c.addEventListener('click', function () { all().forEach(function (d) { d.open = false; }); });
  }

  // ---------------------------------------------------------------
  // Search: filters top-level cards and collapsible sections
  // ---------------------------------------------------------------
  function setupSearch() {
    var input = document.getElementById('search');
    if (!input || !main) return;
    var wrap = main.querySelector('.wrap') || main;
    var blocks = [].slice.call(wrap.children).filter(function (n) { return !n.matches('footer, .pager'); });
    function topDetails(block) {
      return [].slice.call(block.querySelectorAll('details')).filter(function (d) {
        var p = d.parentElement.closest('details');
        return !p || !block.contains(p) || p === block;
      }).filter(function (d) { return d !== block; });
    }
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var anyHit = false;
      blocks.forEach(function (block) {
        var parts = topDetails(block);
        if (!q) {
          block.classList.remove('hidden');
          parts.forEach(function (d) { d.classList.remove('hidden'); });
          return;
        }
        var meta = function (n) { return ((n.dataset.keywords || '') + ' ' + (n.dataset.search || '') + ' ' + n.textContent).toLowerCase(); };
        var blockHit = false;
        if (parts.length) {
          parts.forEach(function (d) {
            var hit = meta(d).indexOf(q) > -1;
            d.classList.toggle('hidden', !hit);
            if (hit) { d.open = true; blockHit = true; }
          });
          if (!blockHit) {
            // Match in the card's own intro text (outside its collapsibles)
            var clone = block.cloneNode(true);
            [].slice.call(clone.querySelectorAll('details')).forEach(function (d) { d.remove(); });
            blockHit = meta(clone).indexOf(q) > -1;
            if (blockHit) parts.forEach(function (d) { d.classList.remove('hidden'); });
          }
        } else {
          blockHit = meta(block).indexOf(q) > -1;
          if (blockHit && block.tagName === 'DETAILS') block.open = true;
        }
        block.classList.toggle('hidden', !blockHit);
        if (blockHit) anyHit = true;
      });
      var empty = document.getElementById('searchEmpty');
      if (empty) empty.classList.toggle('hidden', !q || anyHit);
    });
  }

  // ---------------------------------------------------------------
  // Highlight the current "On this page" link while scrolling
  // ---------------------------------------------------------------
  function setupScrollSpy() {
    if (!tocItems.length || !('IntersectionObserver' in window)) return;
    var links = [].slice.call(document.querySelectorAll('[data-toc-link]'));
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-toc-link') === e.target.id); });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    tocItems.forEach(function (t) { obs.observe(t); });
  }

  // ---------------------------------------------------------------
  // In-page links open their collapsed target; mobile menu
  // ---------------------------------------------------------------
  function setupLinks() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (a) {
        var id = decodeURIComponent(a.getAttribute('href').slice(1));
        if (id && jumpTo(id, true)) {
          e.preventDefault();
          history.replaceState(null, '', '#' + id);
          body.classList.remove('nav-open');
        }
        return;
      }
      if (e.target.closest && e.target.closest('[data-nav-toggle]')) {
        body.classList.toggle('nav-open');
        return;
      }
      if (body.classList.contains('nav-open') && !e.target.closest('#sidebar')) {
        body.classList.remove('nav-open');
      }
    });
    window.addEventListener('hashchange', function () { jumpTo(location.hash.slice(1), true); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') body.classList.remove('nav-open'); });
  }

  // ---------------------------------------------------------------
  // Prev / next within the same sidebar group
  // ---------------------------------------------------------------
  function setupPager() {
    var wrap = main && (main.querySelector('.wrap') || main);
    if (!wrap) return;
    NAV.forEach(function (group) {
      var items = group.items.filter(function (i) { return !i.toolFor; });
      var idx = items.map(function (i) { return i.key; }).indexOf(pageKey);
      if (idx < 0 || items.length < 2) return;
      var prev = items[idx - 1], next = items[idx + 1];
      var pager = el('nav', { class: 'pager', 'aria-label': 'Previous and next' });
      if (prev) pager.appendChild(el('a', { class: 'prev', href: root + prev.href }, '<small>← Previous</small>' + esc(prev.label)));
      if (next) pager.appendChild(el('a', { class: 'next', href: root + next.href }, '<small>Next →</small>' + esc(next.label)));
      var footer = wrap.querySelector('.site-footer');
      wrap.insertBefore(pager, footer);
    });
  }

  buildSidebar();
  setupMastery();
  setupExpand();
  setupSearch();
  setupScrollSpy();
  setupLinks();
  setupPager();
  if (location.hash) jumpTo(location.hash.slice(1), false);
})();

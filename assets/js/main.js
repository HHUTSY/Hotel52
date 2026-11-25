/* Hotel 52 — трохи vanilla JS. Без залежностей. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: прозорий над hero → з блюром при скролі ---------- */
  const header = $('[data-header]');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Мобільне меню (<dialog>) ---------- */
  const menu = $('#mobile-menu');
  const menuOpen = $('[data-menu-open]');
  if (menu && menuOpen && typeof menu.showModal === 'function') {
    menuOpen.setAttribute('aria-expanded', 'false');
    menuOpen.addEventListener('click', () => { menu.showModal(); menuOpen.setAttribute('aria-expanded', 'true'); });
    menu.addEventListener('close', () => { menuOpen.setAttribute('aria-expanded', 'false'); menuOpen.focus(); });
    $$('[data-menu-close]', menu).forEach((b) => b.addEventListener('click', () => menu.close()));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => menu.close()));
  }

  /* ---------- Поява при скролі, малювання ліній, лічильники ---------- */
  const fmt = (v, dec) => v.toLocaleString('uk-UA', { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: false });
  const count = (el) => {
    const to = parseFloat(el.dataset.count);
    const from = parseFloat(el.dataset.from || '0');
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = fmt(to, dec) + suffix; return; }
    const dur = 1600, t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(from + (to - from) * e, dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        if (el.hasAttribute('data-reveal')) el.classList.add('is-in');
        if (el.classList.contains('draw')) el.classList.add('is-drawn');
        if (el.hasAttribute('data-count')) count(el);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    $$('[data-reveal], .draw, [data-count]').forEach((el) => io.observe(el));
  } else {
    $$('[data-reveal]').forEach((el) => el.classList.add('is-in'));
    $$('.draw').forEach((el) => el.classList.add('is-drawn'));
  }

  /* ---------- Легкий parallax ---------- */
  const px = $$('[data-parallax]');
  if (px.length && !reduced) {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      px.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const k = parseFloat(el.dataset.parallax) || 0.15;
        const y = (r.top + r.height / 2 - vh / 2) * -k;
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(1.12)`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Форма бронювання ---------- */
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const parseIso = (s) => { const [y, m, d] = (s || '').split('-').map(Number); return y && m && d ? new Date(y, m - 1, d) : null; };
  const plural = (n, one, few, many) => {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  };
  const guestsText = (a, c) => `${a} ${plural(a, 'дорослий', 'дорослих', 'дорослих')}` + (c > 0 ? ` · ${c} ${plural(c, 'дитина', 'дитини', 'дітей')}` : '');

  const qs = new URLSearchParams(location.search);
  $$('[data-booking]').forEach((form) => {
    const inEl = $('[data-arrival]', form), outEl = $('[data-departure]', form);
    const ad = $('[data-adults]', form), ch = $('[data-children]', form);
    const label = $('[data-guests-label]', form), guests = $('[data-guests]', form);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    inEl.min = iso(today);
    const qIn = parseIso(qs.get('arrival')), qOut = parseIso(qs.get('departure'));
    inEl.value = iso(qIn && qIn >= today ? qIn : today);
    outEl.value = iso(qOut && qIn && qOut > qIn ? qOut : addDays(parseIso(inEl.value), 1));
    outEl.min = iso(addDays(parseIso(inEl.value), 1));
    if (qs.get('adults')) ad.value = qs.get('adults');
    if (qs.get('children')) ch.value = qs.get('children');
    inEl.addEventListener('change', () => {
      const a = parseIso(inEl.value); if (!a) return;
      outEl.min = iso(addDays(a, 1));
      if (!parseIso(outEl.value) || parseIso(outEl.value) <= a) outEl.value = iso(addDays(a, 1));
    });
    const syncGuests = () => { label.textContent = guestsText(+ad.value, +ch.value); };
    ad.addEventListener('change', syncGuests); ch.addEventListener('change', syncGuests); syncGuests();
    document.addEventListener('click', (e) => { if (guests.open && !guests.contains(e.target)) guests.open = false; });
    guests.addEventListener('keydown', (e) => { if (e.key === 'Escape') { guests.open = false; $('summary', guests).focus(); } });
  });

  /* ---------- Фільтр номерів ---------- */
  $$('[data-filters]').forEach((bar) => {
    const grid = $(bar.dataset.filters);
    const live = $('[data-filter-live]');
    const cards = $$('[data-for]', grid);
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      const key = btn.dataset.filter;
      $$('[data-filter]', bar).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let shown = 0;
      cards.forEach((c) => {
        const ok = key === 'all' || c.dataset.for.split(' ').includes(key);
        c.classList.toggle('is-filtered-out', !ok);
        if (ok) { shown++; c.classList.remove('is-in'); requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('is-in'))); }
      });
      if (live) live.textContent = `Показано ${shown} ${plural(shown, 'номер', 'номери', 'номерів')}`;
    });
  });

  /* ---------- Лайтбокс галереї ---------- */
  const groups = {};
  $$('[data-lightbox]').forEach((a) => (groups[a.dataset.lightbox] ||= []).push(a));
  if (Object.keys(groups).length && typeof HTMLDialogElement === 'function') {
    const dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('aria-label', 'Галерея фото');
    dlg.innerHTML = `
      <div class="flex items-center justify-between gap-4 p-4">
        <p class="font-display text-sm" data-lb-count aria-live="polite"></p>
        <button type="button" class="lightbox-btn" data-lb-close><svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg><span class="sr-only">Закрити</span></button>
      </div>
      <div class="lightbox-stage" data-lb-stage>
        <button type="button" class="lightbox-btn absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-6" data-lb-prev><svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg><span class="sr-only">Попереднє фото</span></button>
        <img alt="" data-lb-img>
        <button type="button" class="lightbox-btn absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-6" data-lb-next><svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg><span class="sr-only">Наступне фото</span></button>
      </div>
      <p class="mx-auto max-w-2xl p-5 text-center text-sand/80" data-lb-cap></p>`;
    document.body.appendChild(dlg);
    const img = $('[data-lb-img]', dlg), cap = $('[data-lb-cap]', dlg), cnt = $('[data-lb-count]', dlg);
    let list = [], idx = 0, opener = null;
    const show = (i) => {
      idx = (i + list.length) % list.length;
      const a = list[idx];
      img.src = a.getAttribute('href');
      img.alt = a.dataset.caption || '';
      cap.textContent = a.dataset.caption || '';
      cnt.textContent = `${idx + 1} / ${list.length}`;
      const nx = new Image(); nx.src = list[(idx + 1) % list.length].getAttribute('href');
    };
    Object.values(groups).forEach((items) => items.forEach((a, i) => a.addEventListener('click', (e) => {
      e.preventDefault(); list = items; opener = a; show(i); dlg.showModal();
    })));
    $$('[data-lightbox-open]').forEach((b) => b.addEventListener('click', () => {
      const items = groups[b.dataset.lightboxOpen]; if (!items) return;
      list = items; opener = b; show(0); dlg.showModal();
    }));
    $('[data-lb-prev]', dlg).addEventListener('click', () => show(idx - 1));
    $('[data-lb-next]', dlg).addEventListener('click', () => show(idx + 1));
    $('[data-lb-close]', dlg).addEventListener('click', () => dlg.close());
    dlg.addEventListener('close', () => opener && opener.focus());
    dlg.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') show(idx - 1); if (e.key === 'ArrowRight') show(idx + 1); });
    dlg.addEventListener('click', (e) => { if (e.target === $('[data-lb-stage]', dlg)) dlg.close(); });
    let x0 = null;
    dlg.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------- Схема району: підсвітка маршрутів ---------- */
  const map = $('.area-map');
  if (map) {
    const set = (id, on) => {
      $$(`[data-route="${id}"]`, map).forEach((p) => p.classList.toggle('is-on', on));
      $$(`[data-pt="${id}"]`, map).forEach((p) => p.classList.toggle('is-on', on));
      $$(`[data-place="${id}"]`).forEach((p) => p.classList.toggle('is-on', on));
    };
    $$('[data-place]').forEach((li) => {
      const id = li.dataset.place;
      ['mouseenter', 'focus'].forEach((ev) => li.addEventListener(ev, () => set(id, true)));
      ['mouseleave', 'blur'].forEach((ev) => li.addEventListener(ev, () => set(id, false)));
    });
    $$('[data-pt]', map).forEach((g) => {
      const id = g.dataset.pt;
      g.addEventListener('mouseenter', () => set(id, true));
      g.addEventListener('mouseleave', () => set(id, false));
    });
  }

  /* ---------- Google-мапа тільки на вимогу (швидкість + приватність) ---------- */
  $$('[data-map-load]').forEach((btn) => btn.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = btn.dataset.src; f.className = 'map-frame'; f.loading = 'lazy';
    f.title = 'Hotel 52 на мапі: вул. Європейська, 52, Одеса';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    const target = btn.dataset.target && $(btn.dataset.target);
    if (target) { f.className = 'absolute inset-0 h-full w-full border-0'; target.replaceChildren(f); }
    else btn.replaceWith(f);
    f.focus();
  }));

  /* ---------- Бронювання: показуємо, який номер людина дивилась ---------- */
  const pick = $('[data-room-pick]');
  if (pick && qs.get('room')) {
    try {
      const name = JSON.parse(pick.dataset.rooms)[qs.get('room')];
      if (name) { $('[data-room-name]', pick).textContent = name; pick.hidden = false; }
    } catch (e) { /* ігноруємо */ }
  }

  /* ---------- Мобільна панель: ховаємо, коли видно основну форму чи футер ---------- */
  const bar = $('[data-mobilebar]');
  const hideFor = $$('[data-hide-mobilebar], .site-footer');
  if (bar && hideFor.length && 'IntersectionObserver' in window) {
    const visible = new Set();
    const o = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      bar.classList.toggle('is-hidden', visible.size > 0);
    }, { threshold: 0.05 });
    hideFor.forEach((el) => o.observe(el));
  }

  /* ---------- Сторінка бронювання: передаємо дати в модуль Servio ---------- */
  const servio = $('#ServioContainer');
  if (servio) {
    const a = parseIso(qs.get('arrival')), d = parseIso(qs.get('departure'));
    const adults = Math.min(4, Math.max(1, parseInt(qs.get('adults') || '2', 10) || 2));
    try {
      if (a && d && d > a) {
        // Модуль зберігає пошук у localStorage['servio_booking'] (дати — мс від епохи, локальна північ)
        const ls = JSON.parse(localStorage.getItem('servio_booking') || '{}');
        ls.actual_localstorage_date = new Date();
        ls.date_arrival = a.getTime();
        ls.date_departure = d.getTime();
        ls.numbers_dict = { 1: { adults, children: [], loyalty_code: '' } };
        localStorage.setItem('servio_booking', JSON.stringify(ls));
      }
    } catch (e) { /* приватний режим — модуль просто покаже свої значення */ }
    const fail = $('[data-servio-fallback]');
    const s = document.createElement('script');
    s.src = servio.dataset.src;
    s.async = true;
    s.onerror = () => fail && (fail.hidden = false);
    document.body.appendChild(s);
    // Модуль працює лише на дозволеному домені; якщо він «завис» — показуємо телефони.
    // На демо-хостингу (не hotel52.od.ua) замість «не відповідає» пояснюємо, що це демо.
    const isProd = /(^|\.)hotel52\.od\.ua$/.test(location.hostname);
    setTimeout(() => {
      if (!fail || !(!servio.children.length || servio.querySelector('.init-preloader-block'))) return;
      if (!isProd) {
        servio.hidden = true;
        $$('[data-servio-live]', fail).forEach((el) => (el.hidden = true));
        $$('[data-servio-demo]', fail).forEach((el) => (el.hidden = false));
      }
      fail.hidden = false;
    }, isProd ? 20000 : 6000);
  }
})();

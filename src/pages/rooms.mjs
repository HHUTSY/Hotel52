import { page, bookingForm, roomCard, roomJsonLd } from '../lib/layout.mjs';
import { pic, money, photoUrl, altOf } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { site } from '../data/site.mjs';
import { rooms, commonAmenities, suiteAmenities } from '../data/rooms.mjs';

function gallery(r) {
  const n = r.photos.length;
  const item = (k, i) => {
    const big = i === 0;
    const vis = i < 5 ? '' : 'lg:hidden';
    return `<a href="${photoUrl(k, 1920)}" data-lightbox="room" data-caption="${altOf(k)}" class="gallery-item group w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-auto ${big ? 'lg:col-span-2 lg:row-span-2' : ''} ${vis}" aria-label="Відкрити фото ${i + 1} з ${n}: ${altOf(k)}">
      <span class="block aspect-[4/3] h-full lg:aspect-auto">${pic(k, { sizes: big ? '(min-width: 1024px) 50vw, 82vw' : '(min-width: 1024px) 25vw, 82vw', eager: big, imgCls: 'h-full w-full object-cover zoom-img' })}</span>
    </a>`;
  };
  return `<div class="relative">
    <div class="gallery -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-2 scrollbar-none sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:h-[min(40rem,72vh)] lg:grid-cols-4 lg:grid-rows-2 lg:overflow-visible lg:px-0">
      ${r.photos.map(item).join('')}
    </div>
    <button type="button" class="btn btn-light btn-sm absolute bottom-6 right-4 shadow-lift lg:bottom-4 lg:right-4" data-lightbox-open="room">${icon('images', 'h-5 w-5')} Усі фото · ${n}</button>
  </div>`;
}

function specs(r) {
  const rows = [
    ['area', 'Площа', `${r.area} м²`],
    [r.guests.base + r.guests.extra > 1 ? 'users' : 'user', 'Гості', r.guestsLabel],
    ['bed', 'Ліжка', r.beds],
    r.view ? ['window', 'Вид', r.view] : null,
    r.floor ? ['building', 'Поверх', r.floor] : null,
    ['balcony', 'Балкон', r.balcony || 'Немає'],
    r.bath ? ['bath', 'Ванна кімната', r.bath] : null,
  ].filter(Boolean);
  return `<dl class="grid grid-cols-2 gap-px overflow-hidden rounded-card bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-3">
    ${rows.map(([ic, k, v], i) => {
      const last = i === rows.length - 1;
      const span = !last ? '' : [rows.length % 2 ? 'col-span-2' : '', { 1: 'sm:col-span-3', 2: 'sm:col-span-2', 0: 'sm:col-span-1' }[rows.length % 3]].join(' ');
      return `<div class="flex flex-col gap-2 bg-sand-50 p-5 lg:p-6 ${span}"><dt class="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted">${icon(ic, 'h-5 w-5 text-moss')} ${k}</dt><dd class="font-display text-lg font-semibold leading-snug">${v}</dd></div>`;
    }).join('')}
  </dl>`;
}

function amenities(r) {
  const list = [...r.extras.map((a) => ({ ...a, hl: true })), ...commonAmenities, ...(r.suite ? suiteAmenities.map((a) => ({ ...a, hl: true })) : [])];
  const seen = new Set();
  const uniq = list.filter((a) => (seen.has(a.label) ? false : seen.add(a.label)));
  return `<ul class="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
    ${uniq.map((a) => `<li class="flex items-center gap-3"><span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${a.hl ? 'bg-sun/15 text-sun-ink' : 'bg-moss/10 text-moss'}">${icon(a.icon, 'h-5 w-5')}</span><span class="font-medium">${a.label}</span></li>`).join('')}
  </ul>`;
}

function goodToKnow(r) {
  const items = [
    ['key', 'Заїзд і виїзд', `Заїзд з ${site.checkin}, виїзд до ${site.checkout}. Рецепція працює цілодобово.`],
    ['coffee', 'Сніданок', `${site.breakfastHours} у Restaurant 52 — ${site.breakfastPrice} грн.`],
    r.guests.extra > 0 ? ['sofa', 'Додаткове місце', `${site.extraBedPrice} грн.`] : null,
    ['paw', 'З тваринами', 'Можна. Попередьте нас під час бронювання.'],
    ['shelter', 'Укриття', 'Обладнане: меблі, світло, вода, Wi-Fi.'],
    ['elevator', 'Ліфт', 'Є — валізи по сходах тягати не доведеться.'],
  ].filter(Boolean);
  return `<ul class="grid gap-4 sm:grid-cols-2">
    ${items.map(([ic, t, d]) => `<li class="flex gap-4 rounded-2xl bg-sand-50 p-5 ring-1 ring-ink/5">${icon(ic, 'h-6 w-6 shrink-0 text-moss')}<div><p class="font-bold">${t}</p><p class="mt-1 text-sm text-ink-soft">${d}</p></div></li>`).join('')}
  </ul>`;
}

function roomPage(r, i) {
  const others = rooms.map((x, j) => [x, j]).filter(([x]) => x.slug !== r.slug);
  const body = `
<section class="pt-8 lg:pt-12" aria-labelledby="room-title">
  <div class="container-site">
    <nav aria-label="Навігаційний ланцюжок" class="text-sm font-medium text-ink-muted">
      <ol class="flex flex-wrap items-center gap-2">
        <li><a class="hover:text-ink hover:underline" href="index.html">Головна</a></li>
        <li aria-hidden="true">${icon('chevronRight', 'h-3.5 w-3.5')}</li>
        <li><a class="hover:text-ink hover:underline" href="index.html#nomery">Номери</a></li>
        <li aria-hidden="true">${icon('chevronRight', 'h-3.5 w-3.5')}</li>
        <li aria-current="page" class="text-ink">${r.name}</li>
      </ol>
    </nav>
    <div class="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div class="flex flex-col gap-4">
        <p class="kicker text-ink-muted"><span class="kicker-num">${String(i + 1).padStart(2, '0')}/${String(rooms.length).padStart(2, '0')}</span>Номер</p>
        <h1 id="room-title" class="font-display font-semibold ${r.name.length > 12 ? 'text-[clamp(1.7rem,7.2vw,5.5rem)] leading-[1] tracking-[-0.03em]' : 'text-display-xl'}">${r.name}</h1>
        <p class="max-w-xl text-xl text-ink-soft">${r.tagline}</p>
      </div>
      <ul class="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
        <li class="chip">${icon('area', 'h-4 w-4 text-moss')} ${r.area} м²</li>
        <li class="chip">${icon('users', 'h-4 w-4 text-moss')} ${r.guestsLabel}</li>
        ${r.balcony ? `<li class="chip">${icon('balcony', 'h-4 w-4 text-moss')} ${r.balcony}</li>` : ''}
        ${r.badges.filter((b) => !/балкон|м²/i.test(b)).map((b) => `<li class="chip">${b}</li>`).join('')}
      </ul>
    </div>
  </div>
</section>

<section class="mt-10" aria-label="Фото номера">
  <div class="container-site">${gallery(r)}</div>
</section>

<section class="py-16 lg:py-24">
  <div class="container-site grid gap-14 lg:grid-cols-12 lg:gap-12">
    <div class="flex flex-col gap-16 lg:col-span-7 xl:col-span-8">
      <div>
        <h2 class="sr-only">Про номер</h2>
        <p class="font-display text-[clamp(1.3rem,2.2vw,1.75rem)] font-medium leading-snug tracking-tight text-pretty">${r.intro}</p>
      </div>
      <div class="flex flex-col gap-6">
        <h2 class="font-display text-display-sm">Характеристики</h2>
        ${specs(r)}
      </div>
      <div class="flex flex-col gap-6">
        <h2 class="font-display text-display-sm">Зручності в номері</h2>
        ${amenities(r)}
        ${r.suite ? `<p class="text-sm text-ink-muted">Халати й капці — бонус для гостей люксів.</p>` : ''}
      </div>
      <div class="flex flex-col gap-6">
        <h2 class="font-display text-display-sm">Корисно знати</h2>
        ${goodToKnow(r)}
        <a class="link-arrow" href="pravyla.html">Правила проживання ${icon('arrowRight', 'h-4 w-4')}</a>
      </div>
    </div>
    <aside class="lg:col-span-5 xl:col-span-4" aria-label="Ціна і бронювання">
      <div class="flex flex-col gap-5 rounded-card bg-sand-50 p-6 shadow-lift ring-1 ring-ink/5 lg:sticky lg:top-24 lg:p-7" data-hide-mobilebar>
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-semibold text-ink-muted">Ціна за ніч</p>
            <p class="mt-1 leading-none"><span class="text-ink-muted">від</span> <span class="font-display text-[2.8rem] font-semibold tracking-tight tabular-nums">${money(r.price)}</span> <span class="font-semibold">грн</span></p>
          </div>
          <span class="badge-stamp text-moss">${r.area} м²</span>
        </div>
        <ul class="flex flex-col gap-1.5 border-y border-ink/10 py-4 text-sm text-ink-soft">
          <li class="flex justify-between gap-4"><span>Сніданок</span><span class="font-semibold text-ink">${site.breakfastPrice} грн</span></li>
          ${r.guests.extra > 0 ? `<li class="flex justify-between gap-4"><span>Додаткове місце</span><span class="font-semibold text-ink">${site.extraBedPrice} грн</span></li>` : ''}
          <li class="flex justify-between gap-4"><span>Заїзд / виїзд</span><span class="font-semibold text-ink">${site.checkin} / ${site.checkout}</span></li>
        </ul>
        ${bookingForm({ id: 'room', room: r.slug, variant: 'card', submit: 'Забронювати' })}
        <p class="text-center text-sm text-ink-soft">Або голосом: <a class="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink" href="${site.phones[0].href}">${site.phones[0].label}</a></p>
      </div>
    </aside>
  </div>
</section>

<section class="bg-sand-100 py-20 lg:py-28" aria-labelledby="other-title">
  <div class="container-site">
    <div class="flex items-end justify-between gap-6">
      <h2 id="other-title" class="font-display text-display-md">Інші номери</h2>
      <a class="link-arrow shrink-0" href="index.html#nomery">Усі номери ${icon('arrowRight', 'h-4 w-4')}</a>
    </div>
    <div class="-mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 scrollbar-none sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
      ${others.map(([x, j]) => roomCard(x, j, { sizes: '(min-width: 1024px) 24vw, 80vw', cls: 'w-[80vw] max-w-[22rem] shrink-0 snap-start' })).join('')}
    </div>
  </div>
</section>`;

  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Головна', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'Номери', item: site.url + '#nomery' },
    { '@type': 'ListItem', position: 3, name: r.name, item: site.url + `nomer-${r.slug}.html` },
  ] };
  const path = `nomer-${r.slug}.html`;
  return {
    path,
    html: page({
      path,
      active: 'rooms',
      title: `${r.name} — ${r.area} м², від ${r.price} грн/ніч | Hotel 52, Одеса`,
      description: `${r.name} у Hotel 52: ${r.area} м², ${r.guestsLabel}, ${r.beds.toLowerCase()}. ${r.tagline}. Від ${r.price} грн/ніч, центр Одеси.`,
      ogImage: photoUrl(r.photos[0], 1280),
      jsonld: [roomJsonLd(r), crumbs],
      body,
      mobilebar: { price: r.price, room: r.slug },
    }),
  };
}

export default function render() {
  return rooms.map(roomPage);
}

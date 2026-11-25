import { page, bookingForm, roomCard, hotelJsonLd } from '../lib/layout.mjs';
import { pic, sectionHead, money } from '../lib/html.mjs';
import { icon, stars } from '../lib/icons.mjs';
import { stamp, badge, facade, bracket, areaMap } from '../lib/graphics.mjs';
import { site, reviews, places, services, promos } from '../data/site.mjs';
import { rooms, roomFilters } from '../data/rooms.mjs';

export const bulbs = (cls = '') => `<svg class="pointer-events-none ${cls}" viewBox="0 0 360 170" fill="none" aria-hidden="true" focusable="false">
  ${[[30, 70], [90, 120], [150, 54], [210, 104], [270, 64], [330, 128]].map(([x, len]) => `<g class="bulb" style="transform-origin:${x}px 0"><path d="M${x} 0V${len}" stroke="#E6D3B6" stroke-opacity=".55" stroke-width="1.5"/><rect x="${x - 5}" y="${len}" width="10" height="9" rx="2" fill="#C9A77C"/><g class="bulb-glow"><path d="M${x - 9} ${len + 22}a9 9 0 1 1 18 0c0 5-4 7-5 11h-8c-1-4-5-6-5-11z" fill="#F3DCA3"/><path d="M${x - 2.5} ${len + 18}v10M${x + 2.5} ${len + 18}v10" stroke="#C47F2A" stroke-width="1.2"/></g></g>`).join('')}
</svg>`;

export function promoCard(p) {
  const big = p.tag.length <= 4;
  return `<article class="group relative grid overflow-hidden rounded-card bg-sand-50 ring-1 ring-ink/5 sm:grid-cols-[0.95fr_1.05fr]" data-reveal>
    <div class="relative aspect-[4/3] overflow-hidden sm:aspect-auto">${pic(p.photo, { sizes: '(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw', imgCls: 'absolute inset-0 h-full w-full object-cover zoom-img' })}</div>
    <div class="flex flex-col gap-4 p-7 lg:p-9">
      ${badge(icon('calendar', 'h-3.5 w-3.5') + ' ' + p.date, 'w-fit text-sun-ink')}
      <p class="font-display ${big ? 'text-6xl' : 'text-3xl'} font-semibold leading-none tracking-tight text-sun">${p.tag}</p>
      <h3 class="font-display text-display-sm">${p.title}</h3>
      <p class="text-ink-soft">${p.text}</p>
      <a class="link-arrow mt-auto pt-2" href="${p.href}">${p.cta} ${icon('arrowRight', 'h-4 w-4')}</a>
    </div>
  </article>`;
}

export function serviceGrid(list, cls = '') {
  return `<ul class="grid grid-cols-2 gap-px overflow-hidden rounded-card bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-3 lg:grid-cols-4 ${cls}">
    ${list.map((s, i) => `<li class="group flex flex-col gap-3 bg-sand-50 p-5 transition-colors hover:bg-sand-100 lg:p-7" data-reveal style="--d:${(i % 4) * 60}ms">
      <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-moss/10 text-moss transition-transform duration-500 group-hover:-rotate-6">${icon(s.icon, 'h-6 w-6')}</span>
      <h3 class="font-sans text-base font-bold leading-snug">${s.title}</h3>
      <p class="text-sm text-ink-muted">${s.text}</p>
    </li>`).join('')}
  </ul>`;
}

export function reviewsBlock({ num = '06' } = {}) {
  return `<section class="relative bg-sand-50 py-24 lg:py-32" aria-labelledby="reviews-title">
  <div class="container-site grid gap-6 lg:grid-cols-12">
    <div class="flex flex-col justify-between gap-10 rounded-card bg-ink p-8 text-sand on-dark lg:col-span-5 lg:p-12" data-reveal>
      <p class="kicker text-sand/70"><span class="kicker-num">${num}</span>Відгуки гостей</p>
      <div>
        <p class="font-display text-[clamp(5rem,11vw,8.5rem)] font-semibold leading-[.85] tracking-tighter"><span data-count="4.5" data-decimals="1">4,5</span></p>
        <div class="mt-5 flex items-center gap-3 text-mustard">${stars(4.5, 'h-7 w-7')}<span class="text-sm font-semibold text-sand/70">Google</span></div>
      </div>
      <h2 id="reviews-title" class="font-display text-display-sm text-balance">${site.rating.count} відгук на Google. Гості не дадуть збрехати.</h2>
      <div class="flex flex-wrap gap-3">
        <a class="btn btn-light" href="${site.social.google.href}" target="_blank" rel="noopener">${icon('google', 'h-5 w-5')} Усі відгуки</a>
        <a class="btn btn-ghost-light" href="${site.social.tripadvisor.href}" target="_blank" rel="noopener">${icon('tripadvisor', 'h-5 w-5')} TripAdvisor</a>
      </div>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 lg:col-span-7">
      ${reviews.map((r, i) => `<figure class="flex flex-col justify-between gap-10 rounded-card bg-sand p-8 ring-1 ring-ink/5 lg:p-10" data-reveal style="--d:${i * 120}ms">
        <div>
          <span class="block font-display text-7xl leading-[.6] text-sun" aria-hidden="true">“</span>
          <blockquote class="mt-4 font-display text-[1.35rem] font-medium leading-snug tracking-tight"><p>${r.text}</p></blockquote>
        </div>
        <figcaption class="flex items-center gap-3">
          <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-moss font-display text-sm font-semibold text-sand" aria-hidden="true">${r.initials}</span>
          <span><span class="block font-bold">${r.name}</span><span class="text-sm text-ink-muted">Відгук на Google</span></span>
        </figcaption>
      </figure>`).join('')}
      <a href="${site.social.google.href}" target="_blank" rel="noopener" class="group relative flex items-center justify-between gap-6 overflow-hidden rounded-card bg-mustard p-8 sm:col-span-2 lg:p-10" data-reveal>
        <span class="font-display text-display-sm text-balance">Вже жили в нас? Розкажіть, як вам.</span>
        <span class="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink text-sand transition-transform duration-500 group-hover:rotate-45">${icon('arrowUpRight', 'h-6 w-6')}</span>
      </a>
    </div>
  </div>
</section>`;
}

export default function render() {
  const body = `
<!-- 1. HERO -->
<section class="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-moss-900 text-sand on-dark" aria-labelledby="hero-title">
  <div class="absolute inset-0 -z-10 overflow-hidden">
    <div class="hero-media h-full w-full" data-parallax="0.12">${pic('fasad', { eager: true, sizes: '100vw', imgCls: 'h-full w-full object-cover object-[50%_40%]' })}</div>
    <div class="absolute inset-0 bg-gradient-to-b from-moss-900/75 via-moss-900/20 to-moss-900/90"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-moss-900/70 via-moss-900/25 to-transparent"></div>
  </div>
  <p class="hero-52" aria-hidden="true">52</p>
  <div class="container-site relative flex flex-1 flex-col justify-end pb-8 pt-36 lg:pb-14">
    <div class="absolute right-6 top-28 hidden sm:block lg:right-10 lg:top-36" style="--stamp-bg:var(--mustard)">${stamp({ cls: 'h-32 w-32 lg:h-40 lg:w-40' })}</div>
    <p class="chip chip-dark mb-7 w-fit" data-reveal>${icon('star', 'h-4 w-4 text-mustard')} Бутік-готель 3★ · ${site.address.street}</p>
    <h1 id="hero-title" class="max-w-[15ch] font-display text-display-xl font-semibold" data-reveal style="--d:80ms">Живи в історії. <span class="text-mustard">Снідай як одесит.</span></h1>
    <p class="mt-6 max-w-xl text-lg leading-relaxed text-sand/85 lg:text-xl" data-reveal style="--d:160ms">Будинок 1848 року навпроти Свято-Троїцького собору. До Опери й Дерибасівської — 10–15 хвилин пішки, до Привозу — 700 метрів.</p>
    <div class="mt-10 max-w-5xl" data-hide-mobilebar data-reveal style="--d:240ms">${bookingForm({ id: 'hero' })}</div>
    <p class="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium text-sand/80">
      <span>Номери від ${money(site.minPrice)} грн/ніч</span><span aria-hidden="true">·</span><span>Заїзд з ${site.checkin}</span><span aria-hidden="true">·</span><span>Рецепція 24/7</span>
    </p>
  </div>
</section>

<!-- 2. ФАКТИ -->
<section class="relative z-[2] border-b border-ink/10 bg-sand-50" aria-label="Hotel 52 у цифрах">
  <div class="container-site">
    <div class="grid grid-cols-2 gap-px bg-ink/10 lg:grid-cols-5">
      <div class="fact bg-sand-50"><p class="fact-num"><span data-count="1848" data-from="1700">1848</span></p><p class="text-ink-soft">рік, коли звели будинок Шифман</p></div>
      <div class="fact bg-sand-50"><p class="fact-num">№<span data-count="52">52</span></p><p class="text-ink-soft">на Європейській — звідси й наше ім'я</p></div>
      <div class="fact bg-sand-50"><p class="fact-num"><span data-count="4.5" data-decimals="1">4,5</span><span class="text-sun">★</span></p><p class="text-ink-soft">Google, ${site.rating.count} відгук</p></div>
      <div class="fact bg-sand-50"><p class="fact-num">24/7</p><p class="text-ink-soft">рецепція: заселимо й о четвертій ранку</p></div>
      <div class="fact col-span-2 bg-sand-50 lg:col-span-1"><p class="fact-num flex items-center gap-3">${icon('shelter', 'h-12 w-12 text-moss')}</p><p class="text-ink-soft"><b class="font-semibold text-ink">Укриття</b> з меблями, світлом, водою і Wi-Fi</p></div>
    </div>
  </div>
</section>

<!-- 3. ЧОМУ 52 -->
<section class="relative py-24 lg:py-36" aria-labelledby="why-title">
  <div class="container-site">
    ${sectionHead({ num: '01', kicker: 'Чому саме 52', id: 'why-title', title: 'Чотири причини, чому тут хочеться <span class="text-sun">жити</span>' })}
    <div class="mt-14 grid gap-4 lg:grid-cols-12 lg:gap-5">
      <article class="group relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-card bg-moss-800 p-7 text-sand on-dark lg:col-span-6 lg:row-span-2 lg:min-h-[44rem] lg:p-10" data-reveal>
        <div class="absolute inset-0 -z-10">${pic('predstavnytskyi-7', { sizes: '(min-width: 1024px) 48vw, 100vw', imgCls: 'h-full w-full object-cover object-[85%_50%] zoom-img' })}</div>
        <div class="absolute inset-0 -z-10 bg-gradient-to-t from-moss-900/95 via-moss-900/30 to-transparent"></div>
        <div class="absolute left-6 top-6 lg:left-8 lg:top-8">${badge(icon('walk', 'h-3.5 w-3.5') + ' 10–15 хв до Опери', 'bg-mustard text-ink')}</div>
        <p class="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-sand/80">${icon('pin', 'h-4 w-4')} Локація</p>
        <h3 class="max-w-md font-display text-display-md">Навпроти собору, у серці старої Одеси</h3>
        <p class="mt-4 max-w-md text-sand/85">Свято-Троїцький собор — через дорогу. Дерибасівська, Опера, Приморський бульвар і Дюк — 10–15 хвилин пішки. Від вокзалу 5 хвилин машиною, від аеропорту — 15.</p>
      </article>

      <article class="paper relative flex flex-col gap-4 overflow-hidden rounded-card p-7 lg:col-span-6 lg:p-10" data-reveal style="--d:100ms">
        <div class="absolute -right-4 -top-2 text-ink/70 sm:right-6">${bracket('h-44 w-auto sm:h-52')}</div>
        <p class="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">${icon('building', 'h-4 w-4')} Історія</p>
        <h3 class="max-w-[14ch] font-display text-display-md">Будинок Шифман, 1848</h3>
        <p class="max-w-sm text-ink-soft">Дата досі на воротах. Колись тут жили й працювали купці, банкіри, міняйли та лікарі. Тепер — ви.</p>
        <a class="link-arrow mt-2" href="#istoriya">Історія будинку ${icon('arrowRight', 'h-4 w-4')}</a>
      </article>

      <article class="group relative flex flex-col gap-4 overflow-hidden rounded-card bg-moss p-7 text-sand on-dark lg:col-span-3" data-reveal style="--d:180ms">
        <div class="aspect-[16/10] overflow-hidden rounded-tile">${pic('food-4', { sizes: '(min-width: 1024px) 22vw, 100vw', imgCls: 'h-full w-full object-cover zoom-img' })}</div>
        <p class="inline-flex items-center gap-2 text-sm font-semibold text-sand/75">${icon('utensils', 'h-4 w-4')} Restaurant 52</p>
        <h3 class="font-display text-display-sm">Свій ресторан і лобі-бар</h3>
        <p class="text-sand/85">Сніданки ${site.breakfastHours} — навіть для тих, хто не жайворонок.</p>
        <a class="mt-auto inline-flex items-center gap-2 font-semibold text-mustard hover:underline" href="restoran.html">До ресторану ${icon('arrowRight', 'h-4 w-4')}</a>
      </article>

      <article class="relative flex flex-col gap-3 overflow-hidden rounded-card bg-sun p-7 text-ink lg:col-span-3" data-reveal style="--d:260ms">
        <span class="chevron-band absolute inset-x-0 bottom-0 text-ink/15" aria-hidden="true"></span>
        <p class="inline-flex items-center gap-2 text-sm font-semibold">${icon('key', 'h-4 w-4')} Ціни</p>
        <p class="font-display text-[clamp(2.6rem,4vw,3.4rem)] font-semibold leading-none tracking-tight">від ${money(site.minPrice)}<span class="block text-xl font-medium tracking-normal">грн/ніч</span></p>
        <p>Економ — від ${money(rooms[0].price)} грн. Стандарт із балконом — від ${money(rooms[1].price)} грн.</p>
        <a class="mt-auto inline-flex items-center gap-2 pb-4 font-bold underline decoration-2 underline-offset-4" href="#nomery">Обрати номер ${icon('arrowRight', 'h-4 w-4')}</a>
      </article>
    </div>
  </div>
</section>

<!-- 4. НОМЕРИ -->
<section id="nomery" class="relative bg-sand-100 py-24 lg:py-36" aria-labelledby="rooms-title">
  <div class="container-site">
    <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      ${sectionHead({ num: '02', kicker: 'Номери', id: 'rooms-title', title: 'Шість номерів — від 10 до 50 м²', lead: 'Для одного, для пари чи для всієї родини. Ортопедичні матраци, кондиціонер і Wi-Fi — у кожному.' })}
      <div class="flex flex-wrap gap-2" role="group" aria-label="Кому шукаємо номер" data-filters="#rooms-grid">
        ${roomFilters.map((f, i) => `<button type="button" class="filter-btn" data-filter="${f.key}" aria-pressed="${i === 0}">${f.label}</button>`).join('')}
      </div>
    </div>
    <p class="sr-only" aria-live="polite" data-filter-live></p>
    <div id="rooms-grid" class="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
      ${rooms.map((r, i) => roomCard(r, i, { cls: 'w-[84vw] max-w-sm shrink-0 snap-start sm:w-auto sm:max-w-none' })).join('')}
    </div>
    <p class="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink-soft">
      <span class="inline-flex items-center gap-2">${icon('coffee', 'h-4 w-4 text-moss')} Сніданок — ${site.breakfastPrice} грн</span>
      <span class="inline-flex items-center gap-2">${icon('sofa', 'h-4 w-4 text-moss')} Додаткове місце — ${site.extraBedPrice} грн</span>
      <span class="inline-flex items-center gap-2">${icon('key', 'h-4 w-4 text-moss')} Заїзд з ${site.checkin}, виїзд до ${site.checkout}</span>
    </p>
  </div>
</section>

<!-- 5. ІСТОРІЯ БУДИНКУ -->
<section id="istoriya" class="paper relative overflow-hidden py-24 lg:py-36" aria-labelledby="history-title">
  <div class="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
    <div class="flex flex-col gap-10 self-start lg:sticky lg:top-28 lg:col-span-5">
      ${sectionHead({ num: '03', kicker: 'Історія будинку', id: 'history-title', title: 'Будинок Шифман. Тут з 1848 року' })}
      <figure class="archive-card relative w-full max-w-md -rotate-2 rounded-md bg-sand-50 p-3 pb-4 shadow-lift" data-reveal>
        <span class="tape -left-4 top-3 -rotate-[30deg]" aria-hidden="true"></span>
        <span class="tape -right-4 top-3 rotate-[30deg]" aria-hidden="true"></span>
        <div class="aspect-[4/3] overflow-hidden rounded-sm">${pic('fasad', { sizes: '(min-width: 1024px) 28vw, 90vw', imgCls: 'h-full w-full object-cover sepia-[.55] contrast-[1.05] saturate-[.8]' })}</div>
        <figcaption class="mt-3 flex items-baseline justify-between gap-4 font-mono text-xs text-ink-soft"><span>Фасад будинку Шифман сьогодні</span><span>№ 52</span></figcaption>
      </figure>
    </div>
    <div class="flex flex-col gap-14 lg:col-span-7">
      <div class="relative rounded-card bg-sand-50/60 p-6 text-ink ring-1 ring-ink/10 lg:p-10" data-reveal>
        ${facade()}
        <p class="mt-4 font-mono text-xs text-ink-muted">Схема фасаду: три поверхи, класичний стиль, балкон на фігурних кронштейнах.</p>
      </div>
      <ol class="timeline">
        <li class="timeline-item" data-reveal><p class="font-display text-display-sm">1848</p><p class="mt-2 max-w-xl text-ink-soft">Будинок зводять у класичному стилі: три поверхи, строгий фасад, балкони на старовинних фігурних кронштейнах. Дата — досі на воротах.</p></li>
        <li class="timeline-item" data-reveal><p class="font-display text-display-sm">ХІХ–ХХ століття</p><p class="mt-2 max-w-xl text-ink-soft">Тут живуть і працюють купці, банкіри, міняйли та лікарі. Будинок бачив більше угод, ніж Привоз у суботу.</p></li>
        <li class="timeline-item" data-reveal><p class="font-display text-display-sm">Катерининська → Європейська</p><p class="mt-2 max-w-xl text-ink-soft">Вулиця змінила назву, будинок — ні. Адреса та сама: Європейська, 52.</p></li>
        <li class="timeline-item" data-reveal><p class="font-display text-display-sm">Сьогодні</p><p class="mt-2 max-w-xl text-ink-soft">Hotel 52 — бутік-готель 3★ і Restaurant 52. Історичні стіни, ортопедичні матраци і сніданок, після якого хочеться жити.</p></li>
      </ol>
      <blockquote class="relative border-l-4 border-sun pl-6 font-display text-display-sm text-balance" data-reveal>Кронштейни на наших балконах бачили більше, ніж будь-який гід.</blockquote>
    </div>
  </div>
</section>

<!-- 6. RESTAURANT 52 -->
<section id="restoran" class="relative overflow-hidden bg-moss-800 text-sand on-dark" aria-labelledby="resto-title">
  ${bulbs('absolute right-[4%] top-0 hidden w-[24rem] md:block')}
  <div class="container-site grid gap-14 py-24 lg:grid-cols-12 lg:items-center lg:py-36">
    <div class="flex flex-col gap-7 lg:col-span-5">
      ${sectionHead({ num: '04', kicker: 'Restaurant 52', id: 'resto-title', tone: 'light', title: 'Одеса без поїсти — <span class="text-mustard">не Одеса</span>', lead: 'Одеська та європейська кухня, лобі-бар і сніданки з 8:00 до 11:00. Синенькі, штрудель і вайб Привозу — тільки без черги.' })}
      <ul class="flex flex-wrap gap-2" data-reveal>
        <li class="chip chip-dark">${icon('coffee', 'h-4 w-4')} Сніданки ${site.breakfastHours}</li>
        <li class="chip chip-dark">${icon('glass', 'h-4 w-4')} Лобі-бар</li>
        <li class="chip chip-dark">${icon('sparkle', 'h-4 w-4')} Банкети і свята</li>
        <li class="chip chip-dark">${icon('cloche', 'h-4 w-4')} Кейтеринг</li>
      </ul>
      <div class="flex flex-wrap gap-3" data-reveal>
        <a class="btn btn-light" href="restoran.html#menu">${icon('utensils', 'h-5 w-5')} Меню</a>
        <a class="btn btn-sun" href="${site.restoPhones[0].href}">Забронювати столик ${icon('arrowRight', 'h-5 w-5')}</a>
      </div>
      <p class="text-sm text-sand/70">Ресторан: <a class="font-semibold text-sand hover:text-mustard" href="${site.restoPhones[0].href}">${site.restoPhones[0].label}</a></p>
    </div>
    <div class="relative lg:col-span-7">
      <div class="grid grid-cols-6 grid-rows-2 gap-3 sm:gap-4">
        <div class="group relative col-span-4 row-span-2 overflow-hidden rounded-card" data-reveal>${pic('food-4', { sizes: '(min-width: 1024px) 38vw, 66vw', imgCls: 'h-full w-full object-cover zoom-img aspect-[4/5]' })}</div>
        <div class="group relative col-span-2 overflow-hidden rounded-card" data-reveal style="--d:120ms">${pic('resto-11', { sizes: '(min-width: 1024px) 18vw, 33vw', imgCls: 'h-full w-full object-cover zoom-img' })}</div>
        <div class="group relative col-span-2 overflow-hidden rounded-card" data-reveal style="--d:220ms">${pic('resto-2', { sizes: '(min-width: 1024px) 18vw, 33vw', imgCls: 'h-full w-full object-cover zoom-img' })}</div>
      </div>
      <div class="absolute -bottom-10 -left-3 hidden w-44 rotate-[-7deg] overflow-hidden rounded-2xl bg-sand-50 p-2 shadow-float sm:block lg:-left-10 lg:w-52" data-reveal style="--d:320ms">
        <div class="aspect-square overflow-hidden rounded-xl">${pic('food-napoleon', { sizes: '13rem' })}</div>
        <p class="px-1 pt-2 font-display text-xs font-semibold text-ink">«Наполеон»</p>
      </div>
      <div class="absolute -right-2 -top-8 sm:right-6" style="--stamp-bg:var(--sun);--stamp-fg:var(--ink)">${stamp({ text: 'СНІДАНКИ • ЛОБІ-БАР • БАНКЕТИ • ', center: '52', cls: 'h-24 w-24 sm:h-28 sm:w-28' })}</div>
    </div>
  </div>
  <div class="border-t border-sand/10 py-7">
    <div class="marquee font-display text-[clamp(1.4rem,3vw,2.4rem)] font-semibold tracking-tight" aria-hidden="true">
      ${[0, 1].map(() => `<div class="marquee-track">${['Синенькі', 'Штрудель', 'Сніданки до 11:00', 'Лобі-бар', 'Привоз-вайб', 'Одеса без поїсти — не Одеса', 'Банкети', 'Кава на балконі'].map((w) => `<span>${w}</span><span class="text-mustard">✦</span>`).join('')}</div>`).join('')}
    </div>
  </div>
  <span class="chevron-band block text-sand/15" aria-hidden="true"></span>
</section>

<!-- 7. ВСЕ ПОРУЧ -->
<section id="poruch" class="relative py-24 lg:py-36" aria-labelledby="near-title">
  <div class="container-site">
  ${sectionHead({ num: '05', kicker: 'Все поруч', id: 'near-title', cls: 'max-w-4xl', title: 'До моря — рукою подати, до Привозу — носом почути' })}
  <div class="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
    <div class="lg:col-span-4">
      <ol class="flex flex-col">
        ${places.map((p, i) => `<li class="place-item" data-place="${p.id}"><span class="place-num" aria-hidden="true">${i + 1}</span><span class="flex-1"><span class="block font-semibold leading-tight">${p.name}</span><span class="text-sm text-ink-muted">${p.note}</span></span><span class="whitespace-nowrap font-display text-sm font-semibold">${p.time}</span></li>`).join('')}
      </ol>
      <p class="mt-6 flex gap-3 rounded-2xl bg-sand-50 p-4 text-sm text-ink-soft">${icon('car', 'h-5 w-5 shrink-0 text-moss')} Від вокзалу — 5 хвилин машиною, від аеропорту — 15. Трансфер організуємо.</p>
    </div>
    <div class="lg:col-span-8" data-reveal>
      ${areaMap()}
      <p class="mt-3 text-sm text-ink-muted">Схема не в масштабі. Час — орієнтовно, пішки від готелю.</p>
    </div>
  </div>
  </div>
</section>

<!-- 8. ВІДГУКИ -->
${reviewsBlock()}

<!-- 9. АКЦІЇ ТА ПОСЛУГИ -->
<section id="aktsii" class="relative py-24 lg:py-36" aria-labelledby="promo-title">
  <div class="container-site">
    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      ${sectionHead({ num: '07', kicker: 'Акції та послуги', id: 'promo-title', title: 'Приємні бонуси і все потрібне під рукою' })}
      <a class="link-arrow shrink-0" href="aktsii.html">Усі акції ${icon('arrowRight', 'h-4 w-4')}</a>
    </div>
    <div class="mt-12 grid gap-6 lg:grid-cols-2">${promos.map(promoCard).join('')}</div>
    ${serviceGrid(services.slice(0, 8), 'mt-6')}
    <a class="link-arrow mt-8" href="posluhy.html">Усі послуги ${icon('arrowRight', 'h-4 w-4')}</a>
  </div>
</section>

<!-- 10. INSTAGRAM -->
<section class="relative overflow-hidden pb-24 lg:pb-36" aria-labelledby="ig-title">
  <div class="container-site flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
    <div class="flex flex-col gap-4" data-reveal>
      <p class="kicker text-ink-muted"><span class="kicker-num">08</span>Instagram</p>
      <h2 id="ig-title" class="font-display text-display-lg">Підписуйся <a class="text-sun underline decoration-[3px] underline-offset-[10px] hover:decoration-ink" href="${site.social.instagram.href}" target="_blank" rel="noopener">${site.social.instagram.label}</a></h2>
      <p class="max-w-prose text-lg text-ink-soft">Сніданки, балкони, одеське світло — у стрічці щодня.</p>
    </div>
    <a class="btn btn-ink shrink-0" href="${site.social.instagram.href}" target="_blank" rel="noopener">${icon('instagram', 'h-5 w-5')} Підписатися</a>
  </div>
  <div class="mt-12 flex snap-x gap-3 overflow-x-auto px-4 pb-10 scrollbar-none sm:px-6 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-10">
    ${['resto-5', 'napivlyuks-4', 'resto-14', 'resto-4', 'lyuks-3', 'resto-3'].map((k, i) => `<a href="${site.social.instagram.href}" target="_blank" rel="noopener" class="group relative block aspect-square w-56 shrink-0 snap-start overflow-hidden rounded-card lg:w-auto ${i % 2 ? 'lg:mt-10' : ''}" data-reveal style="--d:${i * 70}ms" aria-label="Відкрити Instagram @hotel_52_od">${pic(k, { sizes: '(min-width: 1024px) 16vw, 14rem', imgCls: 'h-full w-full object-cover zoom-img' })}<span class="absolute inset-0 flex items-center justify-center bg-moss-900/0 text-sand opacity-0 transition duration-500 group-hover:bg-moss-900/40 group-hover:opacity-100">${icon('instagram', 'h-8 w-8')}</span></a>`).join('')}
  </div>
</section>
`;
  return {
    path: 'index.html',
    html: page({
      path: 'index.html',
      title: 'Hotel 52 — бутік-готель 3★ у центрі Одеси, вул. Європейська, 52',
      description: 'Бутік-готель у будинку 1848 року навпроти Свято-Троїцького собору. Номери від 1600 грн/ніч, власний Restaurant 52, рецепція 24/7. Бронюйте напряму.',
      overlay: true,
      jsonld: hotelJsonLd(),
      body,
      extraHead: `<link rel="preload" as="image" type="image/avif" imagesrcset="assets/img/photos/fasad-640.avif 640w, assets/img/photos/fasad-1280.avif 1280w, assets/img/photos/fasad-1920.avif 1920w" imagesizes="100vw">`,
    }),
  };
}

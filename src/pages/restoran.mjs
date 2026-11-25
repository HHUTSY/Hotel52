import { page } from '../lib/layout.mjs';
import { pic, sectionHead } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { stamp, mossTile } from '../lib/graphics.mjs';
import { breadcrumbs, crumbsJsonLd, ctaBand } from '../lib/blocks.mjs';
import { bulbs, promoCard } from './index.mjs';
import { site, promos } from '../data/site.mjs';
import { hotelJsonLd } from '../lib/layout.mjs';

const dishes = [
  ['resto-11', 'Синенькі', 'tall'],
  ['food-10', 'Сало з чорним хлібом', ''],
  ['resto-14', 'Креветки з лимоном', 'tall'],
  ['resto-15', 'Смажена рибка', ''],
  ['resto-9', 'Намазки', ''],
  ['food-napoleon', '«Наполеон»', 'tall'],
  ['resto-5', 'Какао з маршмелоу', ''],
];

const events = [
  ['sparkle', 'Дні народження', 'Торт, тости і стіл, за яким усім вистачить місця.'],
  ['heart', 'Весілля', 'Від камерної вечері до свята з першим танцем.'],
  ['users', 'Корпоративи', 'Командна вечеря без «а давайте в офісі».'],
  ['glass', 'Банкети', 'Збираємо стіл під ваш привід.'],
  ['cloche', 'Кейтеринг', 'Привеземо одеську кухню на ваш захід.'],
  ['board', 'Конференц-зал', 'Зустрілися, попрацювали — і одразу на обід.'],
];

export default function render() {
  const body = `
<section class="relative isolate flex min-h-[88svh] flex-col overflow-hidden bg-moss-900 text-sand on-dark" aria-labelledby="page-title">
  <div class="absolute inset-0 -z-10 overflow-hidden">
    <div class="hero-media h-full w-full" data-parallax="0.1">${pic('resto-bar', { eager: true, sizes: '100vw', imgCls: 'h-full w-full object-cover' })}</div>
    <div class="absolute inset-0 bg-gradient-to-t from-moss-900 via-moss-900/45 to-moss-900/70"></div>
  </div>
  ${bulbs('absolute left-[6%] top-0 hidden w-[22rem] opacity-80 md:block')}
  <div class="container-site relative flex flex-1 flex-col justify-end pb-14 pt-36 lg:pb-20">
    ${breadcrumbs([['Ресторан']], 'light')}
    <h1 id="page-title" class="mt-6 font-display text-display-xl font-semibold" data-reveal>Restaurant <span class="text-mustard">52</span></h1>
    <p class="mt-5 max-w-2xl font-display text-display-sm text-sand/90" data-reveal style="--d:80ms">Одеса без поїсти — не Одеса.</p>
    <div class="mt-9 flex flex-wrap gap-3" data-reveal style="--d:160ms">
      <a class="btn btn-sun" href="#stolyk">Забронювати столик ${icon('arrowRight', 'h-5 w-5')}</a>
      <a class="btn btn-ghost-light" href="#menu">${icon('utensils', 'h-5 w-5')} Меню</a>
    </div>
  </div>
</section>

<section class="py-24 lg:py-32" aria-labelledby="about-resto">
  <div class="container-site grid gap-14 lg:grid-cols-12 lg:items-center">
    <div class="flex flex-col gap-8 lg:col-span-6">
      ${sectionHead({ num: '01', kicker: 'Про ресторан', id: 'about-resto', title: 'Одеська та європейська кухня. І лобі-бар.', lead: 'Логотип «52» з живого моху на білій плитці, світле дерево, чорно-білий шеврон і лампочки над барною стійкою. Тут снідають гості готелю, обідають сусіди і святкують ті, хто знає, де смачно.' })}
      <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-card bg-ink/10 ring-1 ring-ink/10" data-reveal>
        <div class="bg-sand-50 p-5"><dt class="text-sm font-semibold text-ink-muted">Сніданки</dt><dd class="mt-1 font-display text-xl font-semibold">${site.breakfastHours}</dd></div>
        <div class="bg-sand-50 p-5"><dt class="text-sm font-semibold text-ink-muted">Сніданок для гостей</dt><dd class="mt-1 font-display text-xl font-semibold">${site.breakfastPrice} грн</dd></div>
        <div class="col-span-2 bg-sand-50 p-5"><dt class="text-sm font-semibold text-ink-muted">Бронювання столиків</dt><dd class="mt-1 flex flex-wrap gap-x-6 font-display text-xl font-semibold">${site.restoPhones.map((p) => `<a class="hover:text-sun-ink" href="${p.href}">${p.label}</a>`).join('')}</dd></div>
      </dl>
    </div>
    <div class="relative lg:col-span-6" data-reveal>
      <div class="overflow-hidden rounded-card shadow-lift">${mossTile()}</div>
      <div class="absolute -bottom-8 -right-3 sm:right-6" style="--stamp-bg:var(--sun)">${stamp({ text: 'ОДЕСЬКИЙ ВАЙБ • ЛОБІ-БАР • RESTAURANT • ', center: '52', cls: 'h-28 w-28' })}</div>
      <p class="mt-4 font-mono text-xs text-ink-muted">Фірмовий знак: «52» з живого моху на білій плитці</p>
    </div>
  </div>
</section>

<section id="menu" class="bg-moss-800 py-24 text-sand on-dark lg:py-32" aria-labelledby="menu-title">
  <div class="container-site">
    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      ${sectionHead({ num: '02', kicker: 'Смак Одеси', id: 'menu-title', tone: 'light', title: 'Синенькі, рибка і «Наполеон»', lead: 'Трохи з того, що подають у Restaurant 52. Актуальне меню змінюється разом із сезоном — підкажемо за телефоном.' })}
      <a class="btn btn-sun shrink-0" href="${site.restoPhones[0].href}">${icon('phone', 'h-5 w-5')} Дізнатися меню</a>
    </div>
    <div class="mt-14 columns-2 gap-3 sm:gap-4 lg:columns-4">
      ${dishes.map(([k, name, h], i) => `<figure class="group relative mb-3 break-inside-avoid overflow-hidden rounded-card sm:mb-4" data-reveal style="--d:${(i % 4) * 70}ms">
        <div class="${h ? 'aspect-[3/4]' : 'aspect-square'} overflow-hidden">${pic(k, { sizes: '(min-width: 1024px) 24vw, 48vw', imgCls: 'h-full w-full object-cover zoom-img' })}</div>
        <figcaption class="absolute inset-x-2 bottom-2 rounded-xl bg-sand-50/95 px-3 py-2 font-display text-sm font-semibold text-ink">${name}</figcaption>
      </figure>`).join('')}
      <div class="mb-3 flex aspect-square break-inside-avoid flex-col justify-between rounded-card bg-mustard p-6 text-ink sm:mb-4" data-reveal>
        <span class="font-display text-5xl leading-none" aria-hidden="true">“</span>
        <p class="font-display text-lg font-semibold leading-snug">Сніданок був смачний</p>
        <p class="text-sm font-semibold">Anna D., Google</p>
      </div>
    </div>
  </div>
  <div class="mt-20 border-y border-sand/10 py-6">
    <div class="marquee font-display text-[clamp(1.3rem,2.6vw,2rem)] font-semibold" aria-hidden="true">
      ${[0, 1].map(() => `<div class="marquee-track">${['Синенькі', 'Штрудель', 'Привоз-вайб', 'Сніданки 8:00–11:00', 'Лобі-бар', 'Одеса без поїсти — не Одеса'].map((w) => `<span>${w}</span><span class="text-mustard">✦</span>`).join('')}</div>`).join('')}
    </div>
  </div>
</section>

<section class="py-24 lg:py-32" aria-labelledby="events-title">
  <div class="container-site grid gap-14 lg:grid-cols-12">
    <div class="flex flex-col gap-8 lg:col-span-5">
      ${sectionHead({ num: '03', kicker: 'Свята і події', id: 'events-title', title: 'Банкети, весілля, дні народження', lead: 'Скажіть привід — решту організуємо: стіл, меню, атмосферу.' })}
      <div class="group aspect-[4/5] overflow-hidden rounded-card" data-reveal>${pic('resto-23', { sizes: '(min-width: 1024px) 38vw, 100vw', imgCls: 'h-full w-full object-cover zoom-img' })}</div>
    </div>
    <div class="flex flex-col gap-6 lg:col-span-7 lg:pt-40">
      <ul class="grid gap-4 sm:grid-cols-2">
        ${events.map(([ic, t, d], i) => `<li class="flex flex-col gap-3 rounded-card bg-sand-50 p-6 ring-1 ring-ink/5" data-reveal style="--d:${(i % 2) * 80}ms"><span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sun/15 text-sun-ink">${icon(ic, 'h-6 w-6')}</span><h3 class="font-sans text-lg font-bold">${t}</h3><p class="text-ink-soft">${d}</p></li>`).join('')}
      </ul>
      ${promoCard(promos[1])}
    </div>
  </div>
</section>

<section id="stolyk" class="container-site pb-8" aria-labelledby="table-title">
  <div class="grid overflow-hidden rounded-[2rem] bg-ink text-sand on-dark lg:grid-cols-2">
    <div class="flex flex-col gap-6 p-8 sm:p-12 lg:p-16" data-reveal>
      <p class="kicker text-sand/70"><span class="kicker-num">04</span>Столик</p>
      <h2 id="table-title" class="font-display text-display-md">Забронюйте столик дзвінком — так швидше</h2>
      <ul class="flex flex-col gap-3">
        ${site.restoPhones.map((p) => `<li><a class="group inline-flex items-center gap-4 font-display text-[clamp(1.4rem,3vw,2.2rem)] font-semibold hover:text-mustard" href="${p.href}"><span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sun text-ink transition-transform group-hover:rotate-12">${icon('phone', 'h-5 w-5')}</span>${p.label}</a></li>`).join('')}
      </ul>
      <p class="text-sand/70">Гостям готелю — сніданок щодня ${site.breakfastHours}.</p>
    </div>
    <div class="group relative min-h-[18rem]">${pic('resto-3', { sizes: '(min-width: 1024px) 45vw, 100vw', imgCls: 'absolute inset-0 h-full w-full object-cover zoom-img' })}</div>
  </div>
</section>
${ctaBand({ title: 'Поїли — тепер і поспати', text: 'Номери від 1 600 грн за ніч, сніданок — у Restaurant 52.' })}`;
  return {
    path: 'restoran.html',
    html: page({
      path: 'restoran.html', active: 'restoran', overlay: true,
      title: 'Restaurant 52 — одеська та європейська кухня, сніданки 8:00–11:00 | Hotel 52',
      description: 'Restaurant 52 на Європейській, 52: одеська та європейська кухня, лобі-бар, сніданки 8:00–11:00. Банкети, дні народження, весілля, корпоративи, кейтеринг. Бронювання: +380 95 135 05 99.',
      ogImage: 'assets/img/photos/food-4-1280.webp',
      jsonld: [hotelJsonLd(), crumbsJsonLd([['Ресторан', 'restoran.html']])],
      body,
    }),
  };
}

import { page, hotelJsonLd } from '../lib/layout.mjs';
import { pic } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { breadcrumbs, crumbsJsonLd, messengerButtons } from '../lib/blocks.mjs';
import { site } from '../data/site.mjs';

export default function render() {
  const body = `
<section class="pb-10 pt-8 lg:pt-12" aria-labelledby="page-title">
  <div class="container-site flex flex-col gap-6">
    ${breadcrumbs([['Контакти']])}
    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <h1 id="page-title" class="font-display text-display-xl font-semibold">Контакти</h1>
      <p class="max-w-md text-lg text-ink-soft">Європейська, 52 — навпроти собору. Рецепція на зв'язку цілодобово, тож дзвоніть хоч опівночі.</p>
    </div>
  </div>
</section>

<section class="pb-16 lg:pb-24" aria-label="Як з нами зв'язатися">
  <div class="container-site grid gap-5 lg:grid-cols-12">
    <article class="relative flex flex-col gap-6 overflow-hidden rounded-card bg-moss p-8 text-sand on-dark lg:col-span-7 lg:row-span-2 lg:p-12" data-reveal>
      <span class="absolute -right-6 -top-10 font-display text-[12rem] font-bold leading-none outline-text text-sand/15" aria-hidden="true">24/7</span>
      <p class="kicker text-sand/70">${icon('clock', 'h-4 w-4')} Рецепція — цілодобово</p>
      <ul class="relative flex flex-col gap-2">
        ${site.phones.map((p) => `<li><a class="font-display text-[clamp(1.7rem,4vw,3rem)] font-semibold tracking-tight hover:text-mustard" href="${p.href}">${p.label}</a></li>`).join('')}
      </ul>
      <a class="relative inline-flex w-fit items-center gap-2 text-lg font-semibold underline decoration-sand/30 underline-offset-4 hover:decoration-mustard" href="mailto:${site.email}">${icon('mail', 'h-5 w-5')} ${site.email}</a>
      <div class="relative mt-auto flex flex-col gap-3 pt-6">
        <p class="text-sm font-semibold text-sand/70">Месенджери</p>
        <div class="flex flex-wrap gap-2">
          <a class="btn btn-ghost-light btn-sm" href="${site.messengers.telegram}" target="_blank" rel="noopener">${icon('telegram', 'h-5 w-5')} Telegram</a>
          <a class="btn btn-ghost-light btn-sm" href="${site.messengers.viber}">${icon('viber', 'h-5 w-5')} Viber</a>
          <a class="btn btn-ghost-light btn-sm" href="${site.messengers.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp', 'h-5 w-5')} WhatsApp</a>
        </div>
      </div>
    </article>
    <article class="flex flex-col gap-4 rounded-card bg-sand-50 p-8 ring-1 ring-ink/5 lg:col-span-5" data-reveal style="--d:100ms">
      <p class="kicker text-ink-muted">${icon('utensils', 'h-4 w-4')} Restaurant 52</p>
      <ul class="flex flex-col gap-1">${site.restoPhones.map((p) => `<li><a class="font-display text-2xl font-semibold hover:text-sun-ink" href="${p.href}">${p.label}</a></li>`).join('')}</ul>
      <p class="text-ink-soft">Столики, банкети, кейтеринг. Сніданки ${site.breakfastHours}.</p>
    </article>
    <article class="flex flex-col gap-4 rounded-card bg-sand-50 p-8 ring-1 ring-ink/5 lg:col-span-5" data-reveal style="--d:160ms">
      <p class="kicker text-ink-muted">${icon('pin', 'h-4 w-4')} Адреса</p>
      <address class="font-display text-xl font-semibold not-italic leading-snug">${site.address.street}<span class="block text-base font-medium text-ink-muted">(${site.address.formerly}), ${site.address.city}, ${site.address.zip}</span></address>
      <ul class="flex flex-col gap-2 text-ink-soft">
        <li class="flex gap-3">${icon('car', 'h-5 w-5 shrink-0 text-moss')} Від вокзалу — 5 хвилин машиною</li>
        <li class="flex gap-3">${icon('plane', 'h-5 w-5 shrink-0 text-moss')} Від аеропорту — 15 хвилин, є трансфер</li>
        <li class="flex gap-3">${icon('walk', 'h-5 w-5 shrink-0 text-moss')} До Опери й Дерибасівської — 10–15 хвилин пішки</li>
      </ul>
    </article>

    <div class="relative overflow-hidden rounded-card bg-moss-800 lg:col-span-12" data-reveal>
      <div id="contacts-map" class="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
        <div class="absolute inset-0">${pic('fasad', { sizes: '100vw', imgCls: 'h-full w-full object-cover opacity-50 blur-[2px]' })}</div>
        <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-sand on-dark">
          <span class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sun text-ink">${icon('pin', 'h-8 w-8')}</span>
          <p class="font-display text-display-sm">Hotel 52 на мапі</p>
          <p class="max-w-sm text-sand/85">Мапа Google завантажиться тільки після натискання — так сторінка відкривається швидше.</p>
          <div class="flex flex-wrap justify-center gap-3">
            <button type="button" class="btn btn-light" data-map-load data-target="#contacts-map" data-src="${site.mapEmbed}">${icon('pin', 'h-5 w-5')} Показати мапу</button>
            <a class="btn btn-ghost-light" href="${site.social.google.href}" target="_blank" rel="noopener">Google Maps ${icon('arrowUpRight', 'h-5 w-5')}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 rounded-card bg-sand-50 p-8 ring-1 ring-ink/5 sm:flex-row sm:items-center sm:justify-between lg:col-span-12" data-reveal>
      <p class="font-display text-display-sm">Ми в соцмережах</p>
      <div class="flex flex-wrap gap-2">
        <a class="btn btn-ink btn-sm" href="${site.social.instagram.href}" target="_blank" rel="noopener">${icon('instagram', 'h-5 w-5')} ${site.social.instagram.label}</a>
        <a class="btn btn-ghost btn-sm" href="${site.social.facebook.href}" target="_blank" rel="noopener">${icon('facebook', 'h-5 w-5')} Facebook</a>
        <a class="btn btn-ghost btn-sm" href="${site.social.tripadvisor.href}" target="_blank" rel="noopener">${icon('tripadvisor', 'h-5 w-5')} TripAdvisor</a>
      </div>
    </div>
  </div>
</section>`;
  return {
    path: 'kontakty.html',
    html: page({
      path: 'kontakty.html', active: 'kontakty',
      title: 'Контакти Hotel 52 — вул. Європейська, 52, Одеса · +380 48 725 28 15',
      description: 'Hotel 52: вул. Європейська (колишня Катерининська), 52, Одеса, 65011. Рецепція 24/7: +380 48 725 28 15, +380 63 378 87 06, info@hotel52.od.ua. Ресторан: +380 95 135 05 99.',
      jsonld: [hotelJsonLd(), crumbsJsonLd([['Контакти', 'kontakty.html']])],
      body,
    }),
  };
}

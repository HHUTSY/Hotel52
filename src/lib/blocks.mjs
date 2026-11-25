// Спільні блоки внутрішніх сторінок
import { site } from '../data/site.mjs';
import { icon } from './icons.mjs';
import { pic } from './html.mjs';
import { stamp } from './graphics.mjs';

export function breadcrumbs(items, tone = 'ink') {
  const muted = tone === 'light' ? 'text-sand/70' : 'text-ink-muted';
  const cur = tone === 'light' ? 'text-sand' : 'text-ink';
  return `<nav aria-label="Навігаційний ланцюжок" class="text-sm font-medium ${muted}">
    <ol class="flex flex-wrap items-center gap-2">
      <li><a class="hover:underline" href="index.html">Головна</a></li>
      ${items.map((it, i) => `<li aria-hidden="true">${icon('chevronRight', 'h-3.5 w-3.5')}</li>${i === items.length - 1 ? `<li aria-current="page" class="${cur}">${it[0]}</li>` : `<li><a class="hover:underline" href="${it[1]}">${it[0]}</a></li>`}`).join('')}
    </ol>
  </nav>`;
}

export function crumbsJsonLd(items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [['Головна', ''], ...items].map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name, item: site.url + (href || '') })),
  };
}

/** Світлий hero внутрішньої сторінки: заголовок + фото зі штампом */
export function pageHero({ crumbs, num, kicker, title, lead, photo, photoAlt, actions = '', stampText, stampCenter = '52', aside }) {
  return `<section class="relative overflow-hidden pb-6 pt-8 lg:pt-12" aria-labelledby="page-title">
  <div class="container-site grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
    <div class="flex flex-col gap-6 lg:col-span-7 lg:pb-6">
      ${breadcrumbs(crumbs)}
      <p class="kicker text-ink-muted" data-reveal>${num ? `<span class="kicker-num">${num}</span>` : ''}${kicker}</p>
      <h1 id="page-title" class="font-display text-display-xl font-semibold" data-reveal style="--d:60ms">${title}</h1>
      ${lead ? `<p class="max-w-xl text-xl leading-relaxed text-ink-soft" data-reveal style="--d:120ms">${lead}</p>` : ''}
      ${actions ? `<div class="flex flex-wrap gap-3" data-reveal style="--d:180ms">${actions}</div>` : ''}
    </div>
    <div class="relative lg:col-span-5" data-reveal style="--d:120ms">
      ${aside || `<div class="group aspect-[4/3] overflow-hidden rounded-card bg-sand-200 lg:aspect-[4/5]">${pic(photo, { alt: photoAlt, eager: true, sizes: '(min-width: 1024px) 38vw, 100vw', imgCls: 'h-full w-full object-cover zoom-img' })}</div>`}
      ${stampText ? `<div class="absolute -left-4 -top-6 sm:-left-8" style="--stamp-bg:var(--mustard)">${stamp({ text: stampText, center: stampCenter, cls: 'h-24 w-24 sm:h-32 sm:w-32' })}</div>` : ''}
    </div>
  </div>
</section>`;
}

/** Смуга CTA перед футером */
export function ctaBand({ title = 'Готові до Одеси?', text = 'Оберіть дати — решту зробимо ми.', href = 'bronyuvannya.html', label = 'Забронювати номер' } = {}) {
  return `<section class="container-site py-16 lg:py-24" aria-label="Бронювання">
  <div class="relative flex flex-col gap-8 overflow-hidden rounded-[2rem] bg-sun p-8 text-ink sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16" data-reveal>
    <span class="chevron-band absolute inset-x-0 top-0 text-ink/15" aria-hidden="true"></span>
    <div class="flex flex-col gap-3">
      <h2 class="font-display text-display-md">${title}</h2>
      <p class="text-lg">${text}</p>
    </div>
    <div class="flex flex-wrap gap-3">
      <a class="btn btn-ink" href="${href}">${label} ${icon('arrowRight', 'h-5 w-5')}</a>
      <a class="btn btn-ghost" href="${site.phones[0].href}">${icon('phone', 'h-5 w-5')} ${site.phones[0].label}</a>
    </div>
  </div>
</section>`;
}

export const messengerButtons = (cls = '') => `<div class="flex flex-wrap gap-2 ${cls}">
  <a class="btn btn-ghost btn-sm" href="${site.messengers.telegram}" target="_blank" rel="noopener">${icon('telegram', 'h-5 w-5')} Telegram</a>
  <a class="btn btn-ghost btn-sm" href="${site.messengers.viber}">${icon('viber', 'h-5 w-5')} Viber</a>
  <a class="btn btn-ghost btn-sm" href="${site.messengers.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp', 'h-5 w-5')} WhatsApp</a>
</div>`;

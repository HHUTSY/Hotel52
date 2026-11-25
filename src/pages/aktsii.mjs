import { page } from '../lib/layout.mjs';
import { sectionHead } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { pageHero, crumbsJsonLd, ctaBand } from '../lib/blocks.mjs';
import { promoCard } from './index.mjs';
import { site, promos } from '../data/site.mjs';

const always = [
  ['calendarCheck', 'Довгострокове проживання', 'Залишаєтесь надовго — даємо знижку. Умови підкажемо на рецепції.', 'Дізнатися умови'],
  ['group', 'Розміщення груп', 'Команда, екскурсія, весільні гості — поселимо всіх разом.', 'Запитати про групу'],
];

export default function render() {
  const body = `
${pageHero({
  crumbs: [['Акції']],
  num: '★',
  kicker: 'Акції',
  title: 'Приємні бонуси <span class="text-sun">по-одеськи</span>',
  lead: 'Знижки, свята і ще кілька причин приїхати. Деталі — на рецепції або за телефоном.',
  photo: 'promo-1',
  stampText: 'РОМАНТИКА • 14 ЛЮТОГО • ',
  stampCenter: '−10%',
})}

<section class="py-16 lg:py-24" aria-labelledby="now-title">
  <div class="container-site">
    ${sectionHead({ num: '01', kicker: 'Зараз діють', id: 'now-title', title: 'Сезонні акції' })}
    <div class="mt-12 grid gap-6 lg:grid-cols-2">${promos.map(promoCard).join('')}</div>
  </div>
</section>

<section class="bg-sand-100 py-20 lg:py-28" aria-labelledby="always-title">
  <div class="container-site">
    ${sectionHead({ num: '02', kicker: 'Постійно', id: 'always-title', title: 'Пропозиції без дати в календарі' })}
    <div class="mt-12 grid gap-6 md:grid-cols-2">
      ${always.map(([ic, t, d, cta], i) => `<article class="relative flex flex-col gap-5 overflow-hidden rounded-card bg-sand-50 p-8 ring-1 ring-ink/5 lg:p-10" data-reveal style="--d:${i * 100}ms">
        <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-moss text-sand">${icon(ic, 'h-7 w-7')}</span>
        <h3 class="font-display text-display-sm">${t}</h3>
        <p class="max-w-md text-ink-soft">${d}</p>
        <a class="link-arrow mt-auto" href="${site.phones[0].href}">${cta} ${icon('arrowRight', 'h-4 w-4')}</a>
      </article>`).join('')}
    </div>
  </div>
</section>
${ctaBand({ title: 'Знайшли свою акцію?', text: 'Забронюйте номер або подзвоніть — розповімо всі умови.' })}`;
  return {
    path: 'aktsii.html',
    html: page({
      path: 'aktsii.html', active: 'aktsii',
      title: 'Акції Hotel 52 — «Романтичний вечір» −10%, Новорічна ніч 2027 у Restaurant 52',
      description: 'Акції Hotel 52 в Одесі: −10% на 14 лютого, Новорічна ніч 2027 у Restaurant 52, знижка на довгострокове проживання, розміщення груп.',
      ogImage: 'assets/img/photos/promo-1-1280.webp',
      jsonld: crumbsJsonLd([['Акції', 'aktsii.html']]),
      body,
    }),
  };
}

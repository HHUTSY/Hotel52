import { page } from '../lib/layout.mjs';
import { pic, sectionHead } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { pageHero, crumbsJsonLd, ctaBand } from '../lib/blocks.mjs';
import { serviceGrid } from './index.mjs';
import { site, services } from '../data/site.mjs';

export default function render() {
  const body = `
${pageHero({
  crumbs: [['Послуги']],
  num: '12',
  kicker: 'Послуги',
  title: 'Усе, щоб ви думали тільки про <span class="text-sun">Одесу</span>',
  lead: 'Трансфер, квитки, пляж, банкети, конференц-зал — і рецепція, яка не спить.',
  photo: 'slide3',
  stampText: 'РЕЦЕПЦІЯ 24/7 • HOTEL 52 • ',
  stampCenter: '24/7',
})}

<section class="py-16 lg:py-24" aria-labelledby="all-title">
  <div class="container-site">
    ${sectionHead({ num: '01', kicker: 'Що ми вміємо', id: 'all-title', title: 'Дванадцять речей, які роблять поїздку простішою' })}
    ${serviceGrid(services, 'mt-12')}
  </div>
</section>

<section class="py-16 lg:py-24" aria-labelledby="road-title">
  <div class="container-site grid gap-6 lg:grid-cols-3">
    <article class="flex flex-col gap-5 rounded-card bg-moss p-8 text-sand on-dark lg:col-span-1 lg:p-10" data-reveal>
      ${icon('plane', 'h-10 w-10 text-mustard')}
      <h2 id="road-title" class="font-display text-display-sm">Трансфер з аеропорту</h2>
      <p class="text-sand/85">Від аеропорту до готелю — близько 15 хвилин машиною, від вокзалу — 5. Подзвоніть або напишіть — організуємо.</p>
      <a class="mt-auto inline-flex items-center gap-2 font-semibold text-mustard hover:underline" href="${site.phones[1].href}">Замовити: ${site.phones[1].label}</a>
    </article>
    <article class="flex flex-col gap-5 rounded-card bg-sand-50 p-8 ring-1 ring-ink/5 lg:p-10" data-reveal style="--d:100ms">
      ${icon('shelter', 'h-10 w-10 text-moss')}
      <h2 class="font-display text-display-sm">Обладнане укриття</h2>
      <p class="text-ink-soft">Меблі, світло, вода і Wi-Fi. Рецепція працює цілодобово і підкаже дорогу в будь-який час.</p>
    </article>
    <article class="flex flex-col gap-5 rounded-card bg-sand-50 p-8 ring-1 ring-ink/5 lg:p-10" data-reveal style="--d:200ms">
      ${icon('paw', 'h-10 w-10 text-moss')}
      <h2 class="font-display text-display-sm">Можна з тваринами</h2>
      <p class="text-ink-soft">Беріть із собою хвостатого друга. Просто попередьте нас під час бронювання.</p>
    </article>
  </div>
</section>

<section class="bg-sand-100 py-20 lg:py-28" aria-labelledby="biz-title">
  <div class="container-site grid gap-12 lg:grid-cols-12 lg:items-center">
    <div class="group aspect-[4/3] overflow-hidden rounded-card lg:col-span-6" data-reveal>${pic('resto-23', { sizes: '(min-width: 1024px) 45vw, 100vw', imgCls: 'h-full w-full object-cover zoom-img' })}</div>
    <div class="flex flex-col gap-6 lg:col-span-6">
      ${sectionHead({ num: '02', kicker: 'Для бізнесу і свят', id: 'biz-title', title: 'Конференц-зал, банкети, кейтеринг', lead: 'Зустріч зранку, презентація вдень, вечеря ввечері — і все під однією адресою. Банкети, весілля і корпоративи — у Restaurant 52.' })}
      <div class="flex flex-wrap gap-3" data-reveal>
        <a class="btn btn-ink" href="${site.phones[0].href}">${icon('phone', 'h-5 w-5')} Обговорити захід</a>
        <a class="btn btn-ghost" href="mailto:${site.email}">${icon('mail', 'h-5 w-5')} ${site.email}</a>
      </div>
    </div>
  </div>
</section>
${ctaBand()}`;
  return {
    path: 'posluhy.html',
    html: page({
      path: 'posluhy.html', active: 'posluhy',
      title: 'Послуги Hotel 52 — трансфер, конференц-зал, банкети, укриття, з тваринами',
      description: 'Послуги Hotel 52 в Одесі: трансфер з аеропорту, квитки, допомога з пляжем, конференц-зал, банкети і кейтеринг, ліфт, обладнане укриття, проживання з тваринами, рецепція 24/7.',
      jsonld: crumbsJsonLd([['Послуги', 'posluhy.html']]),
      body,
    }),
  };
}

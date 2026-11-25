import { page, hotelJsonLd } from '../lib/layout.mjs';
import { pic, sectionHead } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { facade, bracket, areaMap } from '../lib/graphics.mjs';
import { pageHero, crumbsJsonLd, ctaBand } from '../lib/blocks.mjs';
import { reviewsBlock } from './index.mjs';
import { site, places } from '../data/site.mjs';

export default function render() {
  const body = `
${pageHero({
  crumbs: [['Про нас']],
  num: '52',
  kicker: 'Про нас',
  title: 'Old Odesa, <span class="text-sun">new vibe</span>',
  lead: 'Hotel 52 — бутік-готель 3★ у будинку 1848 року в самому центрі старої Одеси. Історичні стіни, молодий ресторан і люди, які раді вам о будь-якій годині.',
  photo: 'slide3',
  stampText: 'SINCE 1848 • HOTEL 52 • ODESA • ',
})}

<section class="relative z-[2] mt-10 border-y border-ink/10 bg-sand-50" aria-label="Коротко про готель">
  <div class="container-site">
    <div class="grid grid-cols-2 gap-px bg-ink/10 lg:grid-cols-4">
      <div class="fact bg-sand-50"><p class="fact-num"><span data-count="1848" data-from="1700">1848</span></p><p class="text-ink-soft">рік на воротах будинку</p></div>
      <div class="fact bg-sand-50"><p class="fact-num">3★</p><p class="text-ink-soft">бутік-готель</p></div>
      <div class="fact bg-sand-50"><p class="fact-num"><span data-count="4.5" data-decimals="1">4,5</span><span class="text-sun">★</span></p><p class="text-ink-soft">Google, ${site.rating.count} відгук</p></div>
      <div class="fact bg-sand-50"><p class="fact-num">24/7</p><p class="text-ink-soft">рецепція</p></div>
    </div>
  </div>
</section>

<section class="paper py-24 lg:py-32" aria-labelledby="house-title">
  <div class="container-site grid gap-14 lg:grid-cols-12">
    <div class="flex flex-col gap-8 lg:col-span-5">
      ${sectionHead({ num: '01', kicker: 'Будинок Шифман', id: 'house-title', title: 'Три поверхи історії на Катерининській' })}
      <div class="flex flex-col gap-5 text-lg leading-relaxed text-ink-soft" data-reveal>
        <p>Будинок звели в 1848 році — дату й сьогодні видно на воротах. Класичний стиль, три поверхи, строгий фасад і балкони на старовинних фігурних кронштейнах.</p>
        <p>Тут жили й працювали купці, банкіри, міняйли та лікарі. Вулиця встигла змінити назву з Катерининської на Європейську, а будинок і досі стоїть на тому самому місці — навпроти Свято-Троїцького собору архітектора Ф. Фраполлі.</p>
        <p>Сьогодні тут Hotel 52 і Restaurant 52. Ми залишили історії її місце, а собі взяли ортопедичні матраци, кондиціонери і Wi-Fi.</p>
      </div>
    </div>
    <div class="flex flex-col gap-6 lg:col-span-7">
      <div class="rounded-card bg-sand-50/60 p-6 ring-1 ring-ink/10 lg:p-10" data-reveal>${facade()}</div>
      <div class="grid gap-4 sm:grid-cols-3">
        <figure class="group overflow-hidden rounded-card sm:col-span-2" data-reveal><div class="aspect-[4/3] overflow-hidden">${pic('napivlyuks-4', { sizes: '(min-width: 1024px) 38vw, 100vw', imgCls: 'h-full w-full object-cover zoom-img' })}</div><figcaption class="bg-sand-50 px-4 py-3 text-sm text-ink-soft">Балкон із кованими перилами над вулицею</figcaption></figure>
        <div class="flex items-center justify-center rounded-card bg-sand-50 p-6 text-ink/75 ring-1 ring-ink/10" data-reveal style="--d:120ms">${bracket('h-48 w-auto')}</div>
      </div>
    </div>
  </div>
</section>

<section class="py-24 lg:py-32" aria-labelledby="where-title">
  <div class="container-site">
    ${sectionHead({ num: '02', kicker: 'Де ми', id: 'where-title', cls: 'max-w-4xl', title: 'У самому центрі — і водночас подалі від натовпу на Дерибасівській', lead: `${site.address.full}. Від вокзалу — 5 хвилин машиною, від аеропорту — 15.` })}
    <div class="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
      <ol class="flex flex-col lg:col-span-4">
        ${places.map((p, i) => `<li class="place-item" data-place="${p.id}"><span class="place-num" aria-hidden="true">${i + 1}</span><span class="flex-1"><span class="block font-semibold leading-tight">${p.name}</span><span class="text-sm text-ink-muted">${p.note}</span></span><span class="whitespace-nowrap font-display text-sm font-semibold">${p.time}</span></li>`).join('')}
      </ol>
      <div class="lg:col-span-8" data-reveal>${areaMap()}<p class="mt-3 text-sm text-ink-muted">Схема не в масштабі. Час — орієнтовно, пішки від готелю.</p></div>
    </div>
  </div>
</section>

${reviewsBlock({ num: '03' })}

<section class="py-24 lg:py-32" aria-labelledby="team-title">
  <div class="container-site grid gap-6 md:grid-cols-3">
    <div class="md:col-span-3">${sectionHead({ num: '04', kicker: 'Як ми працюємо', id: 'team-title', title: 'Три правила Hotel 52' })}</div>
    ${[
      ['sparkle', 'Чисто — завжди', '«Дуже чисто» — це з відгуку Anna D. Стараємось, щоб так писав кожен гість.'],
      ['heart', 'Уважно — без нав\'язливості', 'Підкажемо, допоможемо, організуємо. А потім дамо відпочити.'],
      ['key', 'Ціни видно одразу', 'Номери від 1 600 грн, сніданок — 280, додаткове місце — 600. Усе на сайті.'],
    ].map(([ic, t, d], i) => `<article class="flex flex-col gap-4 rounded-card bg-sand-50 p-8 ring-1 ring-ink/5" data-reveal style="--d:${i * 90}ms"><span class="font-display text-sm font-semibold text-sun-ink">0${i + 1}</span>${icon(ic, 'h-8 w-8 text-moss')}<h3 class="font-display text-xl">${t}</h3><p class="text-ink-soft">${d}</p></article>`).join('')}
  </div>
</section>
${ctaBand()}`;
  return {
    path: 'pro-nas.html',
    html: page({
      path: 'pro-nas.html', active: 'pro-nas',
      title: 'Про Hotel 52 — будинок Шифман 1848 року на Європейській, 52 в Одесі',
      description: 'Історія Hotel 52: будинок Шифман 1848 року, класичний фасад з кронштейнами балконів, навпроти Свято-Троїцького собору. Бутік-готель 3★ і Restaurant 52 у центрі Одеси.',
      ogImage: 'assets/img/og.jpg',
      jsonld: [hotelJsonLd(), crumbsJsonLd([['Про нас', 'pro-nas.html']])],
      body,
    }),
  };
}

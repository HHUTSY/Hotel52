import { page } from '../lib/layout.mjs';
import { icon } from '../lib/icons.mjs';
import { breadcrumbs, crumbsJsonLd, ctaBand } from '../lib/blocks.mjs';
import { site } from '../data/site.mjs';

// Лише підтверджені правила з брифу. Решту (оплата, скасування, ранній заїзд,
// паління, тиша, умови для тварин, діти) — уточнити в клієнта і додати сюди.
const groups = [
  {
    id: 'zaizd', icon: 'key', title: 'Заїзд і виїзд',
    items: [
      ['Заїзд', `з ${site.checkin}`],
      ['Виїзд', `до ${site.checkout}`],
      ['Рецепція', 'працює цілодобово'],
    ],
  },
  {
    id: 'kharchuvannia', icon: 'coffee', title: 'Харчування',
    items: [
      ['Сніданок', `${site.breakfastHours}, Restaurant 52`],
      ['Вартість сніданку', `${site.breakfastPrice} грн`],
      ['Лобі-бар', 'Restaurant 52'],
    ],
  },
  {
    id: 'rozmishchennia', icon: 'sofa', title: 'Розміщення',
    items: [
      ['Додаткове місце', `${site.extraBedPrice} грн`],
      ['Довгострокове проживання', 'зі знижкою'],
      ['Групи', 'розміщуємо'],
    ],
  },
  {
    id: 'tvaryny', icon: 'paw', title: 'Тварини',
    items: [['Проживання з тваринами', 'можна — попередьте під час бронювання']],
  },
  {
    id: 'bezpeka', icon: 'shelter', title: 'Безпека і зручність',
    items: [
      ['Укриття', 'обладнане: меблі, світло, вода, Wi-Fi'],
      ['Ліфт', 'є'],
      ['Wi-Fi', 'у всіх номерах'],
    ],
  },
];

export default function render() {
  const body = `
<section class="pb-10 pt-8 lg:pt-12" aria-labelledby="page-title">
  <div class="container-site flex flex-col gap-6">
    ${breadcrumbs([['Правила проживання']])}
    <h1 id="page-title" class="max-w-4xl font-display text-display-lg font-semibold">Правила проживання — коротко і по-людськи</h1>
    <p class="max-w-2xl text-xl text-ink-soft">Усе, що варто знати до приїзду. Якщо чогось тут немає — запитайте, ми на зв'язку цілодобово.</p>
  </div>
</section>

<section class="pb-16 lg:pb-24">
  <div class="container-site grid gap-12 lg:grid-cols-12">
    <nav class="self-start lg:sticky lg:top-28 lg:col-span-3" aria-label="Розділи правил">
      <ul class="flex gap-2 overflow-x-auto pb-2 scrollbar-none lg:flex-col lg:gap-1">
        ${groups.map((g) => `<li><a class="flex items-center gap-3 whitespace-nowrap rounded-full px-4 py-2.5 font-semibold ring-1 ring-ink/10 transition hover:bg-sand-50 lg:rounded-xl lg:ring-0" href="#${g.id}">${icon(g.icon, 'h-5 w-5 text-moss')} ${g.title}</a></li>`).join('')}
      </ul>
    </nav>
    <div class="flex flex-col gap-6 lg:col-span-9">
      ${groups.map((g) => `<section id="${g.id}" class="rounded-card bg-sand-50 p-7 ring-1 ring-ink/5 lg:p-10" aria-labelledby="${g.id}-h" data-reveal>
        <h2 id="${g.id}-h" class="flex items-center gap-3 font-display text-display-sm"><span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-moss/10 text-moss">${icon(g.icon, 'h-6 w-6')}</span>${g.title}</h2>
        <dl class="mt-6 divide-y divide-ink/10">
          ${g.items.map(([k, v]) => `<div class="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-8"><dt class="font-semibold">${k}</dt><dd class="text-ink-soft sm:text-right">${v}</dd></div>`).join('')}
        </dl>
      </section>`).join('')}
      <p class="flex gap-3 rounded-2xl bg-mustard/25 p-5 text-ink-soft">${icon('info', 'h-5 w-5 shrink-0 text-ink')} Питання про оплату, скасування бронювання чи ранній заїзд? Подзвоніть: <a class="font-semibold text-ink underline underline-offset-4" href="${site.phones[0].href}">${site.phones[0].label}</a></p>
    </div>
  </div>
</section>
${ctaBand()}`;
  return {
    path: 'pravyla.html',
    html: page({
      path: 'pravyla.html',
      title: 'Правила проживання — Hotel 52, Одеса',
      description: 'Правила проживання в Hotel 52: заїзд з 14:00, виїзд до 12:00, рецепція 24/7, сніданок 8:00–11:00 — 280 грн, додаткове місце 600 грн, можна з тваринами, обладнане укриття.',
      jsonld: crumbsJsonLd([['Правила проживання', 'pravyla.html']]),
      body,
    }),
  };
}

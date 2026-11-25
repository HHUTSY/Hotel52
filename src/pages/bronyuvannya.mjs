import { page, bookingForm } from '../lib/layout.mjs';
import { money } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { breadcrumbs } from '../lib/blocks.mjs';
import { site } from '../data/site.mjs';
import { rooms } from '../data/rooms.mjs';

export default function render() {
  const names = Object.fromEntries(rooms.map((r) => [r.slug, r.name]));
  const body = `
<section class="pb-8 pt-8 lg:pt-12" aria-labelledby="page-title">
  <div class="container-site flex flex-col gap-6">
    ${breadcrumbs([['Бронювання']])}
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <h1 id="page-title" class="font-display text-display-lg font-semibold">Бронювання</h1>
      <p class="max-w-md text-lg text-ink-soft">Перевірте ціни й наявність — і бронюйте напряму в готелі.</p>
    </div>
    <p class="chip w-fit" data-room-pick data-rooms='${JSON.stringify(names)}' hidden>${icon('bed', 'h-4 w-4 text-moss')} <span>Ви дивились: <b data-room-name></b></span></p>
    <div class="rounded-[1.75rem] bg-sand-50 p-3 ring-1 ring-ink/10" data-hide-mobilebar>${bookingForm({ id: 'bk', variant: 'page', submit: 'Оновити пошук' })}</div>
  </div>
</section>

<section class="pb-20 lg:pb-28" aria-label="Модуль бронювання">
  <div class="container-site grid gap-8 lg:grid-cols-12">
    <div class="lg:col-span-8">
      <div class="servio-shell min-h-[28rem] rounded-card bg-white p-4 ring-1 ring-ink/10 sm:p-6">
        <div id="ServioContainer" data-src="${site.booking.script}"></div>
        <div id="ServioResult"></div>
        <noscript><p class="p-6">Для онлайн-бронювання увімкніть JavaScript або подзвоніть: <a href="${site.phones[0].href}">${site.phones[0].label}</a>.</p></noscript>
        <div class="flex flex-col items-start gap-4 p-6" data-servio-fallback hidden>
          <p class="font-display text-display-sm" data-servio-live>Модуль бронювання не відповідає</p>
          <p class="text-ink-soft" data-servio-live>Таке буває. Забронюйте голосом — це займе дві хвилини.</p>
          <p class="font-display text-display-sm" data-servio-demo hidden>Тут буде онлайн-бронювання</p>
          <p class="max-w-lg text-ink-soft" data-servio-demo hidden>Це демо-версія сайту. Модуль Servio, з яким працює готель, запускається тільки на домені hotel52.od.ua — після перенесення сайту тут з'явиться вибір номера з вашими датами.</p>
          <div class="flex flex-wrap gap-3">${site.phones.map((p) => `<a class="btn btn-ink" href="${p.href}">${icon('phone', 'h-5 w-5')} ${p.label}</a>`).join('')}</div>
        </div>
      </div>
      <p class="mt-3 text-sm text-ink-muted">Бронювання працює через модуль Servio — той самий, що й раніше.</p>
    </div>
    <aside class="flex flex-col gap-5 lg:col-span-4" aria-label="Довідка">
      <div class="rounded-card bg-sand-50 p-6 ring-1 ring-ink/5">
        <h2 class="font-display text-lg">Ціни за ніч</h2>
        <ul class="mt-4 divide-y divide-ink/10">
          ${rooms.map((r) => `<li><a class="flex items-center justify-between gap-4 py-3 hover:text-sun-ink" href="nomer-${r.slug}.html"><span class="font-semibold">${r.name}</span><span class="whitespace-nowrap text-sm">від <b class="font-display text-base">${money(r.price)}</b> грн</span></a></li>`).join('')}
        </ul>
        <p class="mt-4 text-sm text-ink-muted">Сніданок — ${site.breakfastPrice} грн · Додаткове місце — ${site.extraBedPrice} грн</p>
      </div>
      <div class="rounded-card bg-moss p-6 text-sand on-dark">
        <h2 class="font-display text-lg">Зручніше голосом?</h2>
        <ul class="mt-3 flex flex-col gap-1">${site.phones.map((p) => `<li><a class="font-display text-xl font-semibold hover:text-mustard" href="${p.href}">${p.label}</a></li>`).join('')}</ul>
        <p class="mt-3 text-sm text-sand/75">Рецепція працює цілодобово. Заїзд з ${site.checkin}, виїзд до ${site.checkout}.</p>
      </div>
    </aside>
  </div>
</section>`;
  return {
    path: 'bronyuvannya.html',
    html: page({
      path: 'bronyuvannya.html',
      title: 'Бронювання номера — Hotel 52, Одеса',
      description: 'Забронюйте номер у Hotel 52 напряму: Економ від 1600 грн, Стандарт від 2600 грн, люкси від 3000 грн за ніч. Центр Одеси, вул. Європейська, 52.',
      body,
      extraHead: '<meta name="robots" content="noindex, follow">',
    }),
  };
}

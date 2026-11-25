import { page } from '../lib/layout.mjs';
import { icon } from '../lib/icons.mjs';
import { site } from '../data/site.mjs';

export default function render() {
  const body = `
<section class="relative flex min-h-[70svh] items-center overflow-hidden py-24" aria-labelledby="page-title">
  <p class="pointer-events-none absolute -right-6 bottom-0 select-none font-display text-[clamp(10rem,34vw,30rem)] font-bold leading-none outline-text text-ink/10" aria-hidden="true">404</p>
  <div class="container-site relative flex flex-col gap-6">
    <p class="kicker text-ink-muted"><span class="kicker-num">404</span>Сторінку не знайдено</p>
    <h1 id="page-title" class="max-w-3xl font-display text-display-lg font-semibold">Ой-вей! Такої сторінки в нас немає.</h1>
    <p class="max-w-xl text-xl text-ink-soft">Зате є номери, ресторан і собор навпроти. Може, туди?</p>
    <div class="flex flex-wrap gap-3">
      <a class="btn btn-sun" href="index.html">На головну ${icon('arrowRight', 'h-5 w-5')}</a>
      <a class="btn btn-ghost" href="index.html#nomery">Номери</a>
      <a class="btn btn-ghost" href="${site.phones[0].href}">${icon('phone', 'h-5 w-5')} Подзвонити</a>
    </div>
  </div>
</section>`;
  return {
    path: '404.html',
    html: page({ path: '404.html', title: 'Сторінку не знайдено — Hotel 52', description: 'Такої сторінки немає. Поверніться на головну Hotel 52.', body, extraHead: '<meta name="robots" content="noindex">' }),
  };
}

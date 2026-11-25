import { page } from '../lib/layout.mjs';
import { pic } from '../lib/html.mjs';
import { icon } from '../lib/icons.mjs';
import { breadcrumbs, crumbsJsonLd, ctaBand } from '../lib/blocks.mjs';
import { posts } from '../data/site.mjs';

const art = (p, big) => {
  if (p.photo) return pic(p.photo, { sizes: big ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, 100vw', imgCls: 'h-full w-full object-cover zoom-img' });
  const bg = { chevron: 'bg-ink text-sand', tiles: 'tiles-bg text-ink', dots: 'bg-mustard text-ink', lines: 'bg-moss text-sand' }[p.pattern];
  const fx = { chevron: '<span class="chevron-fill absolute inset-0 opacity-20" aria-hidden="true"></span>', tiles: '', dots: '<span class="dots-bg absolute inset-0" aria-hidden="true"></span>', lines: '<span class="lines-bg absolute inset-0 opacity-60" aria-hidden="true"></span>' }[p.pattern];
  return `<div class="relative flex h-full w-full items-end overflow-hidden p-6 ${bg}">${fx}<span class="relative max-w-full break-words font-display ${big ? 'text-[clamp(2.4rem,5vw,4.5rem)]' : 'text-[clamp(2.1rem,3.6vw,3.25rem)]'} font-semibold leading-none tracking-tighter opacity-90 transition-transform duration-700 group-hover:-translate-y-2" aria-hidden="true">${p.title.split(' ')[0]}</span></div>`;
};

export default function render() {
  const [first, ...rest] = posts;
  const body = `
<section class="pb-10 pt-8 lg:pt-12" aria-labelledby="page-title">
  <div class="container-site flex flex-col gap-6">
    ${breadcrumbs([['Блог']])}
    <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <h1 id="page-title" class="font-display text-display-xl font-semibold">Блог <span class="text-sun">про Одесу</span></h1>
      <p class="max-w-md text-lg text-ink-soft">Історії, маршрути і їжа — від тих, хто живе на Європейській з 1848 року.</p>
    </div>
  </div>
</section>

<section class="pb-16 lg:pb-24" aria-label="Статті">
  <div class="container-site grid gap-6 lg:grid-cols-3">
    <article class="group relative grid overflow-hidden rounded-card bg-sand-50 ring-1 ring-ink/5 lg:col-span-3 lg:grid-cols-2" data-reveal>
      <div class="aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]">${art(first, true)}</div>
      <div class="flex flex-col gap-4 p-8 lg:p-12">
        <span class="badge-stamp w-fit text-sun-ink">${first.tag}</span>
        <h2 class="font-display text-display-md"><a class="stretched-link" href="${first.href}">${first.title}</a></h2>
        <p class="text-lg text-ink-soft">${first.text}</p>
        <span class="link-arrow mt-auto">Читати ${icon('arrowRight', 'h-4 w-4')}</span>
      </div>
    </article>
    ${rest.map((p, i) => `<article class="group relative flex flex-col overflow-hidden rounded-card bg-sand-50 ring-1 ring-ink/5" data-reveal style="--d:${(i % 3) * 80}ms">
      <div class="aspect-[4/3]">${art(p)}</div>
      <div class="flex flex-1 flex-col gap-3 p-7">
        <span class="text-sm font-semibold text-sun-ink">${p.tag}</span>
        <h2 class="font-display text-xl"><a class="stretched-link" href="${p.href}">${p.title}</a></h2>
        <p class="text-ink-soft">${p.text}</p>
        <span class="link-arrow mt-auto pt-2">Читати ${icon('arrowRight', 'h-4 w-4')}</span>
      </div>
    </article>`).join('')}
  </div>
</section>
${ctaBand({ title: 'Прочитали — тепер приїжджайте', text: 'Усе з цих статей — у 10–15 хвилинах від нашого будинку.' })}`;
  return {
    path: 'blog.html',
    html: page({
      path: 'blog.html',
      title: 'Блог Hotel 52 — історія, кухня і маршрути Одесою',
      description: 'Блог Hotel 52: Бандитська Одеса, кухня по-одеськи, історія катакомб і Катерининської вулиці, екскурсії Одесою, що робити з дітьми в похмурий день.',
      jsonld: crumbsJsonLd([['Блог', 'blog.html']]),
      body,
    }),
  };
}

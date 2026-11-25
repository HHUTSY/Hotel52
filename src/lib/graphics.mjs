// Фірмова графіка Hotel 52: логотип, штампи, лінійний фасад, кронштейн, «моховий» знак, схема району.
import { places } from '../data/site.mjs';

// Монолінійне «52» (як на фірмовій підкладці ресторану)
const GLYPH_5 = 'M23 9.6H11.6v9.3c1.8-1.2 3.9-1.8 6.2-1.8 4.6 0 7.7 3 7.7 7.2 0 4.3-3.3 7.4-8 7.4-3 0-5.4-1.2-6.8-3.3';
const GLYPH_2 = 'M30.6 14.6c.9-3.2 3.7-5.3 7.1-5.3 4 0 6.9 2.7 6.9 6.4 0 2.8-1.6 4.8-4.4 7.1l-9.6 8.5h14.5';

export function logoMark(cls = 'h-10 w-auto') {
  return `<svg class="${cls}" viewBox="0 0 56 40" aria-hidden="true" focusable="false"><rect x="1" y="1" width="54" height="38" rx="12" class="logo-tile"/><g fill="none" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" class="logo-glyph"><path d="${GLYPH_5}"/><path d="${GLYPH_2}"/></g></svg>`;
}

export function logo({ tone = 'auto' } = {}) {
  return `<a href="index.html" class="logo ${tone === 'light' ? 'logo--light' : ''}" aria-label="Hotel 52 — на головну">
    ${logoMark('h-10 w-14 shrink-0')}
    <span class="flex flex-col leading-none">
      <span class="font-display text-[1.05rem] font-semibold tracking-tight">Hotel 52</span>
      <span class="mt-1 text-[0.68rem] font-semibold tracking-[0.14em] opacity-70">ОДЕСА · 1848</span>
    </span>
  </a>`;
}

// Кругла печатка з текстом по колу
export function stamp({ text = 'SINCE 1848 • HOTEL 52 • ODESA • ', center = '52', cls = 'h-28 w-28', spin = true } = {}) {
  const id = 'stamp-' + Math.abs(hash(text + center + cls));
  return `<svg class="stamp ${spin ? 'stamp--spin' : ''} ${cls}" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
    <defs><path id="${id}" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0"/></defs>
    <circle cx="100" cy="100" r="97" class="stamp-bg"/>
    <circle cx="100" cy="100" r="90" fill="none" class="stamp-line" stroke-dasharray="2 5"/>
    <circle cx="100" cy="100" r="54" fill="none" class="stamp-line"/>
    <g class="stamp-ring"><text class="stamp-text"><textPath href="#${id}" textLength="462">${text}</textPath></text></g>
    <text x="100" y="${center.length > 3 ? 106 : 114}" text-anchor="middle" class="stamp-center ${center.length > 3 ? 'stamp-center--sm' : ''}">${center}</text>
  </svg>`;
}

// Прямокутний штамп-бейдж («since 1848», «10–15 хв до Опери»)
export function badge(text, cls = '') {
  return `<span class="badge-stamp ${cls}">${text}</span>`;
}

function hash(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return h; }

/* ---------- Лінійний фасад будинку 1848 року ---------- */
export function facade({ cls = 'w-full h-auto', date = true } = {}) {
  const P = []; // path strings
  const add = (d, extra = '') => P.push(`<path pathLength="1" d="${d}" ${extra}/>`);
  const bays = [80, 160, 240, 320, 400, 480, 560];
  // Земля, контур, карниз
  add('M8 382H632');
  add('M40 382V74H600V382');
  add('M28 74H612M32 64H608M28 74 32 64M612 74 608 64');
  add(Array.from({ length: 48 }, (_, i) => `M${46 + i * 11.5} 74v7`).join(''));
  // Аттик над центральним ризалітом
  add('M200 64V46H440V64M212 46V38H428V46');
  // Міжповерхові тяги
  add('M40 162H600M40 252H600M40 258H600');
  // Пілястри центрального ризаліту
  add('M196 81V252M204 81V252M436 81V252M444 81V252');
  // Руст по кутах
  add([0, 1, 2, 3, 4].map((i) => `M40 ${276 + i * 21}h14M586 ${276 + i * 21}h14`).join(''));
  bays.forEach((c, i) => {
    // 3-й поверх
    add(`M${c - 16} 96h32v50h-32zM${c - 22} 90h44`);
    // 2-й поверх (бельетаж): двері на балкон у центрі, вікна з фронтонами по боках
    if (i >= 2 && i <= 4) add(`M${c - 18} 186h36v66h-36zM${c} 186v66`);
    else add(`M${c - 18} 186h36v56h-36zM${c - 24} 182H${c + 24}L${c} 168Z`);
    // 1-й поверх
    if (i === 3) {
      add(`M${c - 26} 382V312a26 26 0 0 1 52 0V382M${c} 312V382M${c - 18} 340h12M${c + 6} 340h12`);
    } else {
      add(`M${c - 18} 286h36v64h-36zM${c - 4} 280h8l-2 6h-4z`);
    }
  });
  // Балкон з кованими гратами
  add('M204 252H436M200 258H440');
  add('M208 224H432M208 252V224M432 252V224');
  add(Array.from({ length: 22 }, (_, i) => `M${218 + i * 10} 226v24`).join(''));
  add(Array.from({ length: 11 }, (_, i) => `M${223 + i * 20} 238a5 5 0 1 1 0.1 0`).join(''));
  // Фігурні кронштейни під балконом
  [212, 272, 368, 428].forEach((x) => add(`M${x - 6} 258h12v4c0 9-5 13-7 18-1.5 4 1.5 7 4.5 5.5 2.2-1.1 1.6-4-0.6-3.6`));
  const dateText = date ? `<text x="320" y="333" text-anchor="middle" class="facade-date">1848</text>` : '';
  return `<svg class="facade draw ${cls}" viewBox="0 0 640 392" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P.join('')}${dateText}</svg>`;
}

/* ---------- Кронштейн балкона (орнамент) ---------- */
export function bracket(cls = 'h-40 w-auto') {
  const d = [
    'M14 8H106M14 8V20H106V8',
    'M96 20C96 54 70 66 66 96C62 124 78 142 96 138C112 134 112 112 96 110C84 108 80 122 90 126',
    'M80 20C80 46 58 60 54 90C51 112 58 130 70 140',
    'M96 20C106 24 112 34 104 42C98 47 90 42 94 36',
    'M60 64C50 60 44 68 50 74C56 79 63 72 58 69',
    'M66 152H100',
  ];
  return `<svg class="draw ${cls}" viewBox="0 0 120 160" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d.map((x) => `<path pathLength="1" d="${x}"/>`).join('')}</svg>`;
}

/* ---------- «52» з моху на білій плитці (фірмовий знак ресторану) ---------- */
export function mossTile(cls = 'w-full h-auto') {
  return `<svg class="${cls}" viewBox="0 0 320 240" role="img" aria-label="Логотип 52 з живого моху на білій плитці">
    <defs>
      <pattern id="tile" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#F7F4EE"/><path d="M40 0V40H0" fill="none" stroke="#D9D2C6" stroke-width="1.5"/></pattern>
      <filter id="moss" x="-15%" y="-15%" width="130%" height="130%">
        <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="3" seed="7" result="n"/>
        <feColorMatrix in="n" type="matrix" values="0.30 0 0 0 0.10  0 0.70 0 0 0.20  0 0 0.22 0 0.06  0 0 0 0 1" result="green"/>
        <feComposite in="green" in2="SourceGraphic" operator="in" result="m"/>
        <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="3" result="w"/>
        <feDisplacementMap in="m" in2="w" scale="7" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
    <rect width="320" height="240" fill="url(#tile)"/>
    <rect x="58" y="44" width="204" height="152" rx="40" fill="none" stroke="#C9A77C" stroke-width="10"/>
    <g transform="translate(66 50) scale(3.4)" fill="none" stroke="#000" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round" filter="url(#moss)"><path d="${GLYPH_5}"/><path d="${GLYPH_2}"/></g>
  </svg>`;
}

/* ---------- Схема району «Все поруч» ---------- */
export function areaMap() {
  const W = 800, H = 520, hx = 330, hy = 320;
  const d = [0.8, -0.6], n = [0.6, 0.8];
  const lines = [];
  for (let k = -9; k <= 9; k++) { // вулиці вздовж Європейської
    const ox = hx + n[0] * k * 54, oy = hy + n[1] * k * 54;
    lines.push(`M${(ox - d[0] * 900).toFixed(1)} ${(oy - d[1] * 900).toFixed(1)}L${(ox + d[0] * 900).toFixed(1)} ${(oy + d[1] * 900).toFixed(1)}`);
  }
  for (let k = -12; k <= 12; k++) { // поперечні
    const ox = hx + d[0] * k * 62, oy = hy + d[1] * k * 62;
    lines.push(`M${(ox - n[0] * 900).toFixed(1)} ${(oy - n[1] * 900).toFixed(1)}L${(ox + n[0] * 900).toFixed(1)} ${(oy + n[1] * 900).toFixed(1)}`);
  }
  const main = `M${hx - d[0] * 520} ${hy - d[1] * 520}L${hx + d[0] * 520} ${hy + d[1] * 520}`;
  const cross = `M${hx - n[0] * 400} ${hy - n[1] * 400}L${hx + n[0] * 400} ${hy + n[1] * 400}`;
  const sea = 'M500 0H800V215C770 205 742 186 716 168C680 144 650 118 618 90C580 58 548 30 500 0Z';
  const waves = Array.from({ length: 6 }, (_, i) => `M${640 + i * 22} ${30 + i * 26}q10-6 20 0t20 0`).join('');
  const routes = places.map((p) => {
    const mx = (hx + p.x) / 2 + (p.y - hy) * 0.12, my = (hy + p.y) / 2 - (p.x - hx) * 0.12;
    return `<path class="map-route" data-route="${p.id}" pathLength="1" d="M${hx} ${hy}Q${mx.toFixed(1)} ${my.toFixed(1)} ${p.x} ${p.y}"/>`;
  }).join('');
  const pts = places.map((p, i) => `<g class="map-pt" data-pt="${p.id}" transform="translate(${p.x} ${p.y})"><circle r="15"/><text y="5" text-anchor="middle">${i + 1}</text><text class="map-label" x="${p.side === 'l' ? -22 : 22}" y="5" text-anchor="${p.side === 'l' ? 'end' : 'start'}">${p.name}</text></g>`).join('');
  return `<svg class="area-map h-auto w-full" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="map-title map-desc">
    <title id="map-title">Схема району навколо Hotel 52</title>
    <desc id="map-desc">Готель на вулиці Європейській, 52. Навпроти — Свято-Троїцький собор. Привоз — 700 метрів. Дерибасівська, Оперний театр, Приморський бульвар, Дюк і Потьомкінські сходи — 10–15 хвилин пішки.</desc>
    <defs><clipPath id="mapclip"><rect width="${W}" height="${H}" rx="28"/></clipPath></defs>
    <g clip-path="url(#mapclip)">
      <rect width="${W}" height="${H}" class="map-land"/>
      <path d="${lines.join('')}" class="map-street"/>
      <path d="${sea}" class="map-sea"/>
      <path d="${waves}" class="map-wave"/>
      <text x="742" y="74" class="map-sea-label" text-anchor="middle">Чорне море</text>
      <path d="${cross}" class="map-main map-main--cross"/>
      <path d="${main}" class="map-main"/>
      <text class="map-street-label" transform="translate(205 418) rotate(-36.87)">вул. Європейська</text>
      <text class="map-street-label" transform="translate(272 236) rotate(53.13)">вул. Успенська</text>
      ${routes}
      ${pts}
      <g class="map-hotel" transform="translate(${hx} ${hy})"><circle r="40" class="map-pulse"/><circle r="26"/><text y="6" text-anchor="middle">52</text></g>
    </g>
  </svg>`;
}

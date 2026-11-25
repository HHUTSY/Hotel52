import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { photos } from '../data/photos.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const META_PATH = path.join(ROOT, 'src', 'data', 'image-meta.json');
const meta = fs.existsSync(META_PATH) ? JSON.parse(fs.readFileSync(META_PATH, 'utf8')) : {};

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// 1600 -> «1 600» (нерозривний пробіл)
export const money = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const altOf = (key) => photos[key] || '';

/**
 * Адаптивне фото: AVIF + WebP, srcset, lazy-load, розмиття-плейсхолдер (LQIP).
 * Якщо фото немає — показуємо оформлений плейсхолдер з підписом, що має бути на фото.
 */
export function pic(key, { alt, sizes = '100vw', cls = 'block h-full w-full', imgCls = 'h-full w-full object-cover', eager = false, placeholder } = {}) {
  const m = meta[key];
  const a = alt ?? altOf(key);
  if (!m) return ph(placeholder || a || 'Фото', cls);
  const src = (w, f) => `assets/img/photos/${key}-${w}.${f}`;
  const set = (f) => m.widths.map((w) => `${src(w, f)} ${Math.min(w, m.w)}w`).join(', ');
  const fallbackW = m.widths.includes(1280) ? 1280 : m.widths[m.widths.length - 1];
  const loading = eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"';
  return `<picture class="${cls}"><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="${src(fallbackW, 'webp')}" alt="${esc(a)}" width="${m.w}" height="${m.h}" ${loading} decoding="async" class="lqip ${imgCls}" style="background-image:url(${m.lqip})"></picture>`;
}

/** URL однієї версії фото (для фонів, Open Graph тощо) */
export function photoUrl(key, w = 1280, f = 'webp') {
  const m = meta[key];
  if (!m) return '';
  const width = m.widths.includes(w) ? w : m.widths[m.widths.length - 1];
  return `assets/img/photos/${key}-${width}.${f}`;
}

export const photoMeta = (key) => meta[key];

/** Плейсхолдер на випадок відсутнього фото */
export function ph(caption, cls = '') {
  return `<div class="ph ${cls}" role="img" aria-label="${esc('Тут буде фото: ' + caption)}"><span class="ph-label"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="12" cy="12" r="3.5"/><path d="M8 5l1.5-2h5L16 5"/></svg>Фото: ${esc(caption)}</span></div>`;
}

/** Заголовок секції: номер-мітка + заголовок + підзаголовок */
export function sectionHead({ num, kicker, title, lead, cls = '', align = 'left', tone = 'ink', id }) {
  const center = align === 'center' ? 'mx-auto text-center items-center' : '';
  const kick = tone === 'light' ? 'text-sand/70' : 'text-ink-muted';
  const leadCls = tone === 'light' ? 'text-sand/80' : 'text-ink-soft';
  return `<header class="flex flex-col gap-4 ${center} ${cls}" data-reveal>
    ${kicker ? `<p class="kicker ${kick}">${num ? `<span class="kicker-num">${num}</span>` : ''}${kicker}</p>` : ''}
    <h2 ${id ? `id="${id}"` : ''} class="font-display text-display-lg text-balance">${title}</h2>
    ${lead ? `<p class="max-w-prose text-lg leading-relaxed ${leadCls} text-pretty">${lead}</p>` : ''}
  </header>`;
}

export const cx = (...a) => a.filter(Boolean).join(' ');

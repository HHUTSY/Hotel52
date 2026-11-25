// Власний набір іконок: 24×24, лінія 1.6, заокруглені кінці — один стиль на весь сайт.
const P = {
  arrowRight: '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 8.5h16M4 15.5h10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.01"/>',
  phone: '<path d="M5.2 3.8h3.3l1.9 4.6-2.4 1.5a11.5 11.5 0 0 0 6.1 6.1l1.5-2.4 4.6 1.9v3.3a1.6 1.6 0 0 1-1.7 1.6C10.4 19.9 4.1 13.6 3.6 5.5a1.6 1.6 0 0 1 1.6-1.7z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7.5 8 5.8 8-5.8"/>',
  pin: '<path d="M12 21s-7-6.1-7-11.4a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.6" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.4 2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  calendarCheck: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4M9 15l2 2 4-4"/>',
  user: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.7-3.8 3.4-6 7-6s6.3 2.2 7 6"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.6-3.4 3-5.5 6-5.5s5.4 2.1 6 5.5M15.6 5.1a3.2 3.2 0 0 1 0 6.1M17.6 14.4c1.9.8 3.1 2.6 3.4 5.1"/>',
  group: '<circle cx="12" cy="7.5" r="2.8"/><circle cx="5.5" cy="10" r="2.2"/><circle cx="18.5" cy="10" r="2.2"/><path d="M7.5 19.5c.5-3.2 2.2-5 4.5-5s4 1.8 4.5 5M2.5 18.5c.3-2 1.4-3.3 3-3.6M21.5 18.5c-.3-2-1.4-3.3-3-3.6"/>',
  area: '<path d="M3.5 16.8 16.8 3.5l3.7 3.7L7.2 20.5z"/><path d="m7.3 13 2 2M10.3 10l2 2M13.3 7l2 2"/>',
  bed: '<path d="M3 18.5V6.5M3 14h18v4.5M21 14v-2.4A3.6 3.6 0 0 0 17.4 8H11v6"/><circle cx="7" cy="11" r="1.9"/>',
  sofa: '<path d="M5 11V8.6A2.6 2.6 0 0 1 7.6 6h8.8A2.6 2.6 0 0 1 19 8.6V11"/><path d="M3 12.6a1.6 1.6 0 0 1 3.2 0V14h11.6v-1.4a1.6 1.6 0 0 1 3.2 0V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M5.5 18v2M18.5 18v2"/>',
  window: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M12 3v18M5 11h14"/>',
  balcony: '<path d="M7 11V7a5 5 0 0 1 10 0v4"/><path d="M3 11h18M4 11v9M20 11v9M8 11v9M12 11v9M16 11v9M3 20.5h18"/>',
  bath: '<path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M6 12V6.2a2.2 2.2 0 0 1 4-1.2M7 19l-1 2M17 19l1 2"/>',
  drop: '<path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5z"/><path d="M9.2 14.5a2.8 2.8 0 0 0 2.6 2.7"/>',
  tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
  fridge: '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M6 10h12M9 6v2M9 13v3"/>',
  safe: '<rect x="3.5" y="4" width="17" height="15" rx="2"/><circle cx="12" cy="11.5" r="3.2"/><path d="M12 8.3v1M12 13.7v1M7 19v2M17 19v2"/>',
  snow: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.6 4.6 12 6.6l2.4-2M9.6 19.4l2.4-2 2.4 2"/>',
  wifi: '<path d="M2.5 9a14 14 0 0 1 19 0M5.6 12.5a9.5 9.5 0 0 1 12.8 0M8.7 16a5 5 0 0 1 6.6 0M12 19.5v.01"/>',
  dryer: '<circle cx="9" cy="9" r="5.5"/><circle cx="9" cy="9" r="2"/><path d="M14.4 7.4 21 6v6l-6.6-1.4M7.8 14.4 7 21h4l.6-6.3"/>',
  towel: '<path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5V20H5z"/><path d="M5 9h14M5 16h14"/>',
  bottle: '<path d="M10 3h4v3h-4zM9 6h6l1 3v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9z"/><path d="M8 13h8"/>',
  robe: '<path d="M9 3h6l5 5-2.5 3L16 9.6V21H8V9.6L6.5 11 4 8z"/><path d="M9 3l3 6 3-6M12 9v12"/>',
  slippers: '<path d="M7.5 3C5 3 4 5.5 4 9v8a3.5 3.5 0 0 0 7 0V9c0-3.5-1-6-3.5-6zM16.5 3C14 3 13 5.5 13 9v8a3.5 3.5 0 0 0 7 0V9c0-3.5-1-6-3.5-6z"/><path d="M4 10h7M13 10h7"/>',
  mattress: '<rect x="3" y="7.5" width="18" height="9" rx="3"/><path d="M7.5 7.5v9M12 7.5v9M16.5 7.5v9M5.5 16.5v2M18.5 16.5v2"/>',
  leaf: '<path d="M5 19C5 10.2 10 5 20 4c-.6 10-5.6 15-15 15z"/><path d="M5 19c3-5 6.5-8 10-10"/>',
  star: '<path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z"/>',
  paw: '<circle cx="6.5" cy="10.5" r="1.8"/><circle cx="10" cy="6.3" r="1.8"/><circle cx="14.6" cy="6.3" r="1.8"/><circle cx="18" cy="10.5" r="1.8"/><path d="M12.3 11.5c-3 0-6 4.5-6 6.5 0 1.7 1.5 2.5 3 2.2 1.2-.3 2-.7 3-.7s1.8.4 3 .7c1.5.3 3-.5 3-2.2 0-2-3-6.5-6-6.5z"/>',
  elevator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9.5 10 12 7l2.5 3M9.5 14l2.5 3 2.5-3"/>',
  shelter: '<path d="M3 9.5 12 4l9 5.5"/><path d="M4.5 12.5h15V21h-15z"/><path d="M8 21v-2.5h3V16h3v-2.5h3"/>',
  car: '<path d="M4 17v-4l2-5.2A1.6 1.6 0 0 1 7.5 6.7h9a1.6 1.6 0 0 1 1.5 1.1L20 13v4"/><path d="M4 13h16M3.5 17h17M6 17v2.2M18 17v2.2M7.5 15h.01M16.5 15h.01"/>',
  plane: '<path d="M21 15.5 13.5 12V5.5a1.5 1.5 0 0 0-3 0V12L3 15.5V17l7.5-2v4l-2 1.5V22l3.5-1 3.5 1v-1.5l-2-1.5v-4l7.5 2z"/>',
  ticket: '<path d="M3 8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a2 2 0 0 0 0 4v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a2 2 0 0 0 0-4z"/><path d="M14.5 7.5v1.5M14.5 11.2v1.6M14.5 15v1.5"/>',
  umbrella: '<path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z"/><path d="M12 12v7.5a1.5 1.5 0 0 0 3 0M2.5 21.5c1.3 0 1.3-.8 2.6-.8s1.3.8 2.6.8"/>',
  board: '<path d="M3 4h18M5 4v10h14V4M12 14v3M8 21l4-4 4 4M9 10l2-2 2 1.5L16 7"/>',
  glass: '<path d="M8 3h8l-.5 6a3.5 3.5 0 0 1-7 0z"/><path d="M12 12.5V20M8.5 20.5h7M8.3 6.5h7.4"/>',
  cloche: '<path d="M4 17a8 8 0 0 1 16 0z"/><path d="M2.5 17.5h19M12 9V6.5M10.5 6h3"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  heart: '<path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.3 12 20 12 20z"/>',
  sparkle: '<path d="M11 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7z"/><path d="M19 15c.3 1.6 1 2.3 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.2 2.2-.9 2.5-2.5z"/>',
  coffee: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3.5v3M12 3.5v3"/>',
  utensils: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3.5 3.5-3.5 7v3H17"/>',
  walk: '<circle cx="13" cy="4.5" r="1.8"/><path d="M10 21l2-6 2.5 2.2V21M9 12.5l1.5-4.7 3.2.4 2 3.2 2.6 1M10.5 7.8 7 10.2v3"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l2 2M18.5 4.5l2 2"/>',
  building: '<path d="M4 21V6l8-3 8 3v15M3 21h18M9.5 21v-4h5v4M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01"/>',
  images: '<rect x="3" y="4.5" width="14" height="12" rx="2"/><path d="M7 20h11a3 3 0 0 0 3-3V8.5"/><path d="m3 13.5 4-4 4 4 2-2 4 4"/>',
  expand: '<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  // Соцмережі та месенджери
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4"/><path d="M17.4 6.6v.01"/>',
  facebook: '<path d="M14 21v-8h3l.5-3.5H14V7.8c0-1 .3-1.8 1.8-1.8h1.8V3a24 24 0 0 0-2.7-.1c-2.6 0-4.4 1.6-4.4 4.6v2H7.5V13h3v8"/>',
  telegram: '<path d="M21 4 3 11.2l6 2.1M21 4l-3.2 16-6.3-4.8M21 4 9 13.3v5.4l2.5-3.5"/>',
  viber: '<path d="M12 3c-5 0-8.5 1.5-8.5 7.4 0 3.5 1.2 5.5 3.5 6.5v3.6l3-2.8c.6.1 1.3.1 2 .1 5 0 8.5-1.5 8.5-7.4S17 3 12 3z"/><path d="M9.4 8.3c0 2.9 2.3 5.2 5.2 5.2l.8-1.4-1.6-.9-.8.6a3 3 0 0 1-1.9-1.9l.6-.8-.9-1.6z"/>',
  whatsapp: '<path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.2z"/><path d="M9 8.4c0 3.6 2.9 6.6 6.6 6.6l.8-1.6-2-1-.9.8a3.6 3.6 0 0 1-2.3-2.3l.8-.9-1-2z"/>',
  tripadvisor: '<circle cx="7" cy="13.5" r="3.6"/><circle cx="17" cy="13.5" r="3.6"/><circle cx="7" cy="13.5" r=".9"/><circle cx="17" cy="13.5" r=".9"/><path d="M2 8.5h4.2a13 13 0 0 1 11.6 0H22M10.6 14 12 16.5l1.4-2.5"/>',
  google: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20.5 12H12"/>',
};

export function icon(name, cls = 'h-5 w-5', label) {
  const body = P[name];
  if (!body) throw new Error('Невідома іконка: ' + name);
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${body}</svg>`;
}

// Зірка з заливкою для рейтингів (half = половинка)
let starSeq = 0;
export function stars(value = 4.5, cls = 'h-4 w-4') {
  let out = '';
  for (let i = 1; i <= 5; i++) {
    const fill = value >= i ? 1 : value >= i - 0.5 ? 0.5 : 0;
    const id = 'star' + ++starSeq;
    out += `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}"><stop offset="${fill * 100}%" stop-color="currentColor"/><stop offset="${fill * 100}%" stop-color="currentColor" stop-opacity=".22"/></linearGradient></defs><path fill="url(#${id})" d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/></svg>`;
  }
  return `<span class="inline-flex items-center gap-0.5" role="img" aria-label="Рейтинг ${String(value).replace('.', ',')} з 5">${out}</span>`;
}

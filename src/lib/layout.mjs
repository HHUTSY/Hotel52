import { site, nav } from '../data/site.mjs';
import { rooms } from '../data/rooms.mjs';
import { icon } from './icons.mjs';
import { esc, money, pic } from './html.mjs';
import { logo, logoMark } from './graphics.mjs';

const FONTS = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@400;500;600;700&display=swap';

/* ---------------- JSON-LD ---------------- */
export function hotelJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Hotel',
        '@id': site.url + '#hotel',
        name: 'Hotel 52',
        description: 'Бутік-готель 3* у будинку 1848 року в історичному центрі Одеси, навпроти Свято-Троїцького собору.',
        url: site.url,
        image: site.url + 'assets/img/og.jpg',
        telephone: '+380487252815',
        email: site.email,
        starRating: { '@type': 'Rating', ratingValue: '3' },
        priceRange: 'від 1600 грн',
        currenciesAccepted: 'UAH',
        checkinTime: '14:00',
        checkoutTime: '12:00',
        petsAllowed: true,
        address: { '@type': 'PostalAddress', streetAddress: 'вул. Європейська, 52', addressLocality: 'Одеса', postalCode: '65011', addressCountry: 'UA' },
        amenityFeature: ['Wi-Fi', 'Кондиціонер', 'Ліфт', 'Рецепція 24/7', 'Укриття', 'Ресторан', 'Лобі-бар', 'Конференц-зал', 'Трансфер з аеропорту'].map((n) => ({ '@type': 'LocationFeatureSpecification', name: n, value: true })),
        sameAs: [site.social.instagram.href, site.social.facebook.href, site.social.tripadvisor.href],
        containsPlace: { '@id': site.url + '#restaurant' },
        makesOffer: rooms.map((r) => ({
          '@type': 'Offer',
          name: r.name,
          url: site.url + `nomer-${r.slug}.html`,
          priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: r.price, priceCurrency: 'UAH', unitText: 'ніч' },
        })),
      },
      {
        '@type': 'Restaurant',
        '@id': site.url + '#restaurant',
        name: 'Restaurant 52',
        servesCuisine: ['Одеська', 'Європейська'],
        telephone: '+380951350599',
        address: { '@type': 'PostalAddress', streetAddress: 'вул. Європейська, 52', addressLocality: 'Одеса', postalCode: '65011', addressCountry: 'UA' },
        url: site.url + 'restoran.html',
        image: site.url + 'assets/img/photos/food-4-1280.webp',
      },
    ],
  };
}

export function roomJsonLd(r) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: `${r.name} — Hotel 52`,
    description: r.intro,
    url: site.url + `nomer-${r.slug}.html`,
    floorSize: { '@type': 'QuantitativeValue', value: r.area, unitCode: 'MTK' },
    occupancy: { '@type': 'QuantitativeValue', maxValue: r.guests.base + r.guests.extra },
    bed: r.beds,
    containedInPlace: { '@type': 'Hotel', name: 'Hotel 52', '@id': site.url + '#hotel' },
    offers: { '@type': 'Offer', priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: r.price, priceCurrency: 'UAH', unitText: 'ніч' } },
  };
}

/* ---------------- <head> ---------------- */
function head({ title, description, path, ogImage = 'assets/img/og.jpg', jsonld, extraHead = '' }) {
  const canonical = site.url + (path === 'index.html' ? '' : path);
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="uk" href="${canonical}">
<link rel="alternate" hreflang="en" href="${site.url}en.html">
<meta name="theme-color" content="#F4EDE3">
<meta property="og:type" content="website">
<meta property="og:locale" content="uk_UA">
<meta property="og:site_name" content="Hotel 52">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${process.env.ASSETS_URL || site.url}${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="assets/css/styles.css">
<script>document.documentElement.classList.add('js')</script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
${extraHead}`;
}

/* ---------------- Header ---------------- */
function header({ active, overlay }) {
  const items = nav.map((n) => `<li><a href="${n.href}" class="nav-link" ${active === n.key ? 'aria-current="page"' : ''}>${n.label}</a></li>`).join('');
  return `<a href="#main" class="skip-link">Перейти до змісту</a>
<header class="site-header" data-header ${overlay ? 'data-overlay' : ''}>
  <div class="container-site flex h-[4.5rem] items-center gap-4 lg:gap-8">
    ${logo()}
    <nav class="ml-auto hidden lg:block" aria-label="Головне меню"><ul class="flex items-center gap-1">${items}</ul></nav>
    <div class="lang ml-auto flex items-center lg:ml-0" aria-label="Мова сайту" role="group">
      <a href="index.html" class="lang-btn" aria-current="true" lang="uk">UA</a>
      <a href="en.html" class="lang-btn" lang="en" hreflang="en">EN</a>
    </div>
    <a href="bronyuvannya.html" class="btn btn-sun btn-sm hidden sm:inline-flex">Забронювати</a>
    <button type="button" class="menu-btn lg:hidden" data-menu-open aria-haspopup="dialog" aria-controls="mobile-menu">
      ${icon('menu', 'h-6 w-6')}<span class="sr-only">Відкрити меню</span>
    </button>
  </div>
</header>
<dialog id="mobile-menu" class="menu-dialog" aria-label="Меню">
  <div class="flex h-full flex-col">
    <div class="container-site flex h-[4.5rem] items-center justify-between">
      ${logo({ tone: 'light' })}
      <button type="button" class="menu-btn" data-menu-close>${icon('close', 'h-6 w-6')}<span class="sr-only">Закрити меню</span></button>
    </div>
    <nav class="container-site mt-6 flex-1" aria-label="Мобільне меню">
      <ul class="flex flex-col">
        ${nav.map((n, i) => `<li><a href="${n.href}" class="menu-link" style="--i:${i}"><span class="menu-num">0${i + 1}</span>${n.label}</a></li>`).join('')}
        <li><a href="blog.html" class="menu-link" style="--i:6"><span class="menu-num">07</span>Блог</a></li>
      </ul>
    </nav>
    <div class="container-site grid gap-3 pb-8 pt-6">
      <a href="bronyuvannya.html" class="btn btn-sun w-full justify-center">Забронювати номер</a>
      <a href="${site.phones[0].href}" class="btn btn-ghost-light w-full justify-center">${icon('phone', 'h-5 w-5')} ${site.phones[0].label}</a>
    </div>
  </div>
</dialog>`;
}

/* ---------------- Footer ---------------- */
function footer() {
  const pages = [
    ['index.html#nomery', 'Номери'], ['restoran.html', 'Ресторан'], ['aktsii.html', 'Акції'], ['posluhy.html', 'Послуги'],
    ['pro-nas.html', 'Про нас'], ['blog.html', 'Блог'], ['pravyla.html', 'Правила проживання'], ['kontakty.html', 'Контакти'],
  ];
  return `<footer class="site-footer relative overflow-hidden bg-moss-800 text-sand" aria-labelledby="footer-title">
  <div class="footer-52" aria-hidden="true">52</div>
  <div class="container-site relative pt-20 lg:pt-28">
    <div class="grid gap-10 border-b border-sand/15 pb-16 lg:grid-cols-[1.3fr_1fr] lg:items-end">
      <h2 id="footer-title" class="font-display text-display-lg text-balance">Одеса вже чекає. <span class="text-mustard">Номер&nbsp;— теж.</span></h2>
      <div class="flex flex-col gap-3 sm:flex-row lg:justify-end">
        <a href="bronyuvannya.html" class="btn btn-sun">Забронювати номер ${icon('arrowRight', 'h-5 w-5')}</a>
        <a href="${site.phones[0].href}" class="btn btn-ghost-light">${icon('phone', 'h-5 w-5')} Подзвонити</a>
      </div>
    </div>
    <div class="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
      <div class="flex flex-col gap-5">
        ${logo({ tone: 'light' })}
        <address class="not-italic leading-relaxed text-sand/80">${site.address.street}<br><span class="text-sand/60">(${site.address.formerly})</span><br>${site.address.city}, ${site.address.zip}</address>
        <div class="map-facade" data-map-facade>
          <button type="button" class="map-facade-btn" data-map-load data-src="${site.mapEmbed}">${icon('pin', 'h-5 w-5')} Показати на мапі</button>
          <a class="text-sm text-sand/70 underline decoration-sand/30 underline-offset-4 hover:text-sand" href="${site.social.google.href}" target="_blank" rel="noopener">Відкрити в Google Maps</a>
        </div>
      </div>
      <div>
        <h3 class="footer-h">Зв'язок</h3>
        <ul class="flex flex-col gap-2.5">
          ${site.phones.map((p) => `<li><a class="footer-link text-lg font-semibold" href="${p.href}">${p.label}</a></li>`).join('')}
          <li><a class="footer-link" href="mailto:${site.email}">${site.email}</a></li>
          <li class="pt-3 text-sm text-sand/60">Ресторан</li>
          ${site.restoPhones.map((p) => `<li><a class="footer-link" href="${p.href}">${p.label}</a></li>`).join('')}
        </ul>
        <div class="mt-6 flex gap-2" aria-label="Месенджери">
          <a class="icon-btn" href="${site.messengers.telegram}" target="_blank" rel="noopener" aria-label="Написати в Telegram">${icon('telegram')}</a>
          <a class="icon-btn" href="${site.messengers.viber}" aria-label="Написати у Viber">${icon('viber')}</a>
          <a class="icon-btn" href="${site.messengers.whatsapp}" target="_blank" rel="noopener" aria-label="Написати у WhatsApp">${icon('whatsapp')}</a>
        </div>
      </div>
      <div>
        <h3 class="footer-h">Сайт</h3>
        <ul class="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">${pages.map(([h, l]) => `<li><a class="footer-link" href="${h}">${l}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h3 class="footer-h">Правила коротко</h3>
        <ul class="flex flex-col gap-3 text-sand/85">
          <li class="flex gap-3">${icon('key', 'h-5 w-5 shrink-0 text-mustard')} Заїзд з ${site.checkin}, виїзд до ${site.checkout}</li>
          <li class="flex gap-3">${icon('clock', 'h-5 w-5 shrink-0 text-mustard')} Рецепція працює цілодобово</li>
          <li class="flex gap-3">${icon('coffee', 'h-5 w-5 shrink-0 text-mustard')} Сніданок ${site.breakfastHours} — ${site.breakfastPrice} грн</li>
          <li class="flex gap-3">${icon('paw', 'h-5 w-5 shrink-0 text-mustard')} Можна з тваринами</li>
        </ul>
        <a href="pravyla.html" class="mt-5 inline-flex items-center gap-2 font-semibold text-mustard hover:underline">Усі правила ${icon('arrowRight', 'h-4 w-4')}</a>
      </div>
    </div>
    <div class="flex flex-col gap-4 border-t border-sand/15 py-8 text-sm text-sand/60 sm:flex-row sm:items-center sm:justify-between">
      <p>© ${new Date().getFullYear()} Hotel 52 · Бутік-готель 3★ в Одесі</p>
      <div class="flex gap-2">
        <a class="icon-btn" href="${site.social.instagram.href}" target="_blank" rel="noopener" aria-label="Instagram ${site.social.instagram.label}">${icon('instagram')}</a>
        <a class="icon-btn" href="${site.social.facebook.href}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
        <a class="icon-btn" href="${site.social.tripadvisor.href}" target="_blank" rel="noopener" aria-label="TripAdvisor">${icon('tripadvisor')}</a>
      </div>
    </div>
  </div>
</footer>`;
}

/* ---------------- Mobile bottom bar ---------------- */
function mobileBar({ price, room } = {}) {
  const book = room ? `bronyuvannya.html?room=${room}` : 'bronyuvannya.html';
  return `<div class="mobilebar lg:hidden" data-mobilebar>
  <a href="${site.phones[0].href}" class="mobilebar-call ${price ? 'px-4' : ''}" aria-label="Подзвонити: ${site.phones[0].label}">${icon('phone', 'h-5 w-5')}${price ? '' : '<span>Подзвонити</span>'}</a>
  <a href="${book}" class="mobilebar-book">${price ? `<span class="whitespace-nowrap text-sm font-semibold opacity-80">від ${money(price)} грн</span>` : ''}<span>Забронювати</span>${icon('arrowRight', 'h-5 w-5')}</a>
</div>`;
}

/* ---------------- Booking form (hero, номер, сторінка бронювання) ---------------- */
export function bookingForm({ id = 'bk', room, variant = 'bar', submit = 'Перевірити ціни' } = {}) {
  const adultsOpts = [1, 2, 3, 4].map((n) => `<option value="${n}" ${n === 2 ? 'selected' : ''}>${n}</option>`).join('');
  const kidsOpts = [0, 1, 2, 3].map((n) => `<option value="${n}">${n}</option>`).join('');
  const variantCls = { bar: 'booking--bar', card: 'booking--card', page: 'booking--page' }[variant];
  return `<form class="booking ${variantCls}" action="bronyuvannya.html" method="get" data-booking>
  <div class="booking-field">
    <label for="${id}-in" class="booking-label">${icon('calendar', 'h-4 w-4')} Заїзд</label>
    <input id="${id}-in" name="arrival" type="date" required class="booking-input" data-arrival>
  </div>
  <div class="booking-field">
    <label for="${id}-out" class="booking-label">${icon('calendar', 'h-4 w-4')} Виїзд</label>
    <input id="${id}-out" name="departure" type="date" required class="booking-input" data-departure>
  </div>
  <details class="booking-field booking-guests" data-guests>
    <summary class="booking-summary"><span class="booking-label">${icon('users', 'h-4 w-4')} Гості</span><span class="booking-input booking-input--btn"><span data-guests-label>2 дорослих</span>${icon('chevronDown', 'h-4 w-4')}</span></summary>
    <div class="guests-pop">
      <label class="guests-row"><span>Дорослі</span><select name="adults" data-adults>${adultsOpts}</select></label>
      <label class="guests-row"><span>Діти</span><select name="children" data-children>${kidsOpts}</select></label>
      <p class="text-xs text-ink-muted">Вік дітей уточните на наступному кроці.</p>
    </div>
  </details>
  ${room ? `<input type="hidden" name="room" value="${room}">` : ''}
  <button type="submit" class="btn btn-sun booking-submit">${submit} ${icon('arrowRight', 'h-5 w-5')}</button>
</form>`;
}

/* ---------------- Room card ---------------- */
export function roomCard(r, i, { sizes = '(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 86vw', cls = '' } = {}) {
  const maxGuests = r.guests.base + r.guests.extra;
  return `<article class="room-card group ${cls}" data-for="${r.for.join(' ')}" data-reveal style="--d:${(i % 3) * 90}ms">
  <div class="room-card-media">
    ${pic(r.photos[0], { sizes, imgCls: 'h-full w-full object-cover zoom-img' })}
    <span class="room-card-num">${String(i + 1).padStart(2, '0')}</span>
    <span class="room-card-area">${r.area} м²</span>
  </div>
  <div class="flex flex-1 flex-col gap-3 pt-5">
    <h3 class="font-display text-display-sm"><a href="nomer-${r.slug}.html" class="stretched-link">${r.name}</a></h3>
    <p class="text-ink-soft">${r.tagline}</p>
    <ul class="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-soft">
      <li class="inline-flex items-center gap-1.5">${icon(maxGuests > 1 ? 'users' : 'user', 'h-4 w-4 text-moss')} ${r.guestsLabel}</li>
      <li class="inline-flex items-center gap-1.5">${icon('bed', 'h-4 w-4 text-moss')} ${r.beds}</li>
    </ul>
    <div class="mt-auto flex items-end justify-between gap-3 border-t border-ink/10 pt-4">
      <p class="leading-none"><span class="text-sm text-ink-muted">від</span> <span class="font-display text-2xl font-semibold tabular-nums">${money(r.price)}</span> <span class="text-sm text-ink-muted">грн/ніч</span></p>
      <a href="bronyuvannya.html?room=${r.slug}" class="btn btn-ink btn-sm relative z-10" aria-label="Забронювати: ${r.name}">Забронювати</a>
    </div>
  </div>
</article>`;
}

/* ---------------- Page shell ---------------- */
export function page(opts) {
  const { active, overlay = false, body, mobilebar = {}, bodyClass = '', bodyEnd = '' } = opts;
  return `<!doctype html>
<html lang="uk">
<head>
${head(opts)}
</head>
<body class="${bodyClass}">
${header({ active, overlay })}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
${mobileBar(mobilebar)}
<script src="assets/js/main.js" defer></script>
${bodyEnd}
</body>
</html>`;
}

export { logoMark };

// Англійська версія: компактна one-page сторінка з бронюванням (Servio, lang=en).
import { pic, money, esc } from '../lib/html.mjs';
import { icon, stars } from '../lib/icons.mjs';
import { logoMark, stamp } from '../lib/graphics.mjs';
import { site } from '../data/site.mjs';
import { rooms } from '../data/rooms.mjs';

const EN = {
  ekonom: ['Economy', '1 single bed', 'Courtyard view or skylights'],
  standart: ['Standard', 'Double or 2 single beds', 'Balcony, minibar'],
  napivlyuks: ['Junior Suite', 'Double bed + sofa', 'Balcony, bath or shower'],
  lyuks: ['Suite', 'Double bed + sofa', 'Balcony, Smart TV, bathrobes'],
  simeinyi: ['Family Room', 'Double + 2 single beds', 'Attic floor'],
  'predstavnytskyi-lyuks': ['Executive Suite', 'Double bed + 2 sofas', 'Bedroom + living room, 2 balconies'],
};
const guestsEn = (r) => (r.guests.extra ? `${r.guests.base} + ${r.guests.extra} guests` : r.guests.base === 1 ? '1 guest' : `${r.guests.base} guests`);
const SCRIPT = site.booking.script.replace('lang=uk', 'lang=en');

export default function render() {
  const title = 'Hotel 52 — boutique 3★ hotel in the heart of old Odesa';
  const description = 'Boutique hotel in an 1848 building opposite the Holy Trinity Cathedral, 52 Yevropeiska St, Odesa. Rooms from 1,600 UAH per night, own Restaurant 52, 24/7 reception.';
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${site.url}en.html">
<link rel="alternate" hreflang="uk" href="${site.url}">
<link rel="alternate" hreflang="en" href="${site.url}en.html">
<meta name="theme-color" content="#F4EDE3">
<meta property="og:type" content="website"><meta property="og:locale" content="en_US"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:image" content="${process.env.ASSETS_URL || site.url}assets/img/og.jpg">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="assets/css/styles.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a href="#main" class="skip-link">Skip to content</a>
<header class="site-header" data-header data-overlay>
  <div class="container-site flex h-[4.5rem] items-center gap-4">
    <a href="en.html" class="logo" aria-label="Hotel 52 — home">${logoMark('h-10 w-14 shrink-0')}<span class="font-display text-[1.05rem] font-semibold">Hotel 52</span></a>
    <nav class="ml-auto hidden md:block" aria-label="Main"><ul class="flex gap-1">
      <li><a class="nav-link" href="#rooms">Rooms</a></li><li><a class="nav-link" href="#restaurant">Restaurant</a></li><li><a class="nav-link" href="#location">Location</a></li><li><a class="nav-link" href="#contacts">Contacts</a></li>
    </ul></nav>
    <div class="lang ml-auto flex items-center md:ml-0" role="group" aria-label="Language">
      <a href="index.html" class="lang-btn" lang="uk" hreflang="uk">UA</a>
      <a href="en.html" class="lang-btn" aria-current="true">EN</a>
    </div>
    <a href="#book" class="btn btn-sun btn-sm hidden sm:inline-flex">Book now</a>
  </div>
</header>
<main id="main" tabindex="-1">
<section class="relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-moss-900 text-sand on-dark" aria-labelledby="hero-title">
  <div class="absolute inset-0 -z-10 overflow-hidden">
    <div class="hero-media h-full w-full" data-parallax="0.12">${pic('fasad', { eager: true, alt: 'Facade of the historic Hotel 52 building on Yevropeiska Street, Odesa', imgCls: 'h-full w-full object-cover' })}</div>
    <div class="absolute inset-0 bg-gradient-to-b from-moss-900/75 via-moss-900/20 to-moss-900/90"></div>
  </div>
  <p class="hero-52" aria-hidden="true">52</p>
  <div class="container-site relative flex flex-1 flex-col justify-end pb-14 pt-36">
    <div class="absolute right-4 top-28 sm:right-6 lg:right-10" style="--stamp-bg:var(--mustard)">${stamp({ cls: 'h-24 w-24 sm:h-32 sm:w-32' })}</div>
    <p class="chip chip-dark mb-6 w-fit">${icon('star', 'h-4 w-4 text-mustard')} Boutique hotel 3★ · 52 Yevropeiska St</p>
    <h1 id="hero-title" class="max-w-[14ch] font-display text-display-xl font-semibold">Live in history. <span class="text-mustard">Breakfast like a local.</span></h1>
    <p class="mt-6 max-w-xl text-lg text-sand/85">An 1848 building right opposite the Holy Trinity Cathedral. The Opera House and Derybasivska Street are a 10–15 minute walk, Pryvoz market is 700 m away.</p>
    <div class="mt-9 flex flex-wrap gap-3"><a class="btn btn-sun" href="#book">Check availability ${icon('arrowRight', 'h-5 w-5')}</a><a class="btn btn-ghost-light" href="${site.phones[0].href}">${icon('phone', 'h-5 w-5')} ${site.phones[0].label}</a></div>
  </div>
</section>

<section class="border-b border-ink/10 bg-sand-50" aria-label="Hotel 52 in numbers">
  <div class="container-site grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
    <div class="fact bg-sand-50"><p class="fact-num">1848</p><p class="text-ink-soft">the year on the gates</p></div>
    <div class="fact bg-sand-50"><p class="fact-num">4.5<span class="text-sun">★</span></p><p class="text-ink-soft">Google, ${site.rating.count} reviews</p></div>
    <div class="fact bg-sand-50"><p class="fact-num">24/7</p><p class="text-ink-soft">reception</p></div>
    <div class="fact bg-sand-50"><p class="fact-num flex">${icon('shelter', 'h-12 w-12 text-moss')}</p><p class="text-ink-soft">Equipped shelter with furniture, light, water and Wi-Fi</p></div>
  </div>
</section>

<section id="rooms" class="py-24 lg:py-32" aria-labelledby="rooms-title">
  <div class="container-site">
    <h2 id="rooms-title" class="font-display text-display-lg">Six rooms, from 10 to 50 m²</h2>
    <p class="mt-4 max-w-prose text-lg text-ink-soft">Orthopedic mattresses, hypoallergenic bedding, air conditioning, Wi-Fi, TV, fridge, safe and hairdryer in every room.</p>
    <div class="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      ${rooms.map((r) => `<article class="room-card group">
        <div class="room-card-media">${pic(r.photos[0], { alt: `${EN[r.slug][0]} room at Hotel 52`, sizes: '(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw', imgCls: 'h-full w-full object-cover zoom-img' })}<span class="room-card-area">${r.area} m²</span></div>
        <div class="flex flex-1 flex-col gap-2 pt-5">
          <h3 class="font-display text-display-sm">${EN[r.slug][0]}</h3>
          <p class="text-sm text-ink-soft">${guestsEn(r)} · ${EN[r.slug][1]} · ${EN[r.slug][2]}</p>
          <div class="mt-auto flex items-end justify-between border-t border-ink/10 pt-4"><p><span class="text-sm text-ink-muted">from</span> <span class="font-display text-2xl font-semibold">${money(r.price)}</span> <span class="text-sm text-ink-muted">UAH/night</span></p><a class="btn btn-ink btn-sm" href="#book">Book</a></div>
        </div>
      </article>`).join('')}
    </div>
    <p class="mt-10 text-sm text-ink-soft">Breakfast — ${site.breakfastPrice} UAH · Extra bed — ${site.extraBedPrice} UAH · Check-in from ${site.checkin}, check-out until ${site.checkout}</p>
  </div>
</section>

<section id="restaurant" class="bg-moss-800 py-24 text-sand on-dark lg:py-32" aria-labelledby="resto-title">
  <div class="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
    <div class="flex flex-col gap-6">
      <h2 id="resto-title" class="font-display text-display-lg">Restaurant 52. <span class="text-mustard">Odesa without food isn't Odesa.</span></h2>
      <p class="text-lg text-sand/85">Odesa and European cuisine, a lobby bar and breakfast from 8:00 to 11:00. Banquets, birthdays, weddings, corporate events and catering.</p>
      <p class="font-display text-xl">${site.restoPhones.map((p) => `<a class="mr-6 hover:text-mustard" href="${p.href}">${p.label}</a>`).join('')}</p>
    </div>
    <div class="grid grid-cols-2 gap-4"><div class="overflow-hidden rounded-card">${pic('food-4', { alt: 'The “52” logo made of living moss on white tiles', sizes: '(min-width: 1024px) 24vw, 46vw', imgCls: 'aspect-[4/5] h-full w-full object-cover' })}</div><div class="overflow-hidden rounded-card">${pic('resto-2', { alt: 'Restaurant 52 dining room with white tiles and globe lamps', sizes: '(min-width: 1024px) 24vw, 46vw', imgCls: 'aspect-[4/5] h-full w-full object-cover' })}</div></div>
  </div>
</section>

<section id="location" class="py-24 lg:py-32" aria-labelledby="loc-title">
  <div class="container-site grid gap-12 lg:grid-cols-2">
    <div>
      <h2 id="loc-title" class="font-display text-display-lg">Everything is close</h2>
      <p class="mt-4 max-w-prose text-lg text-ink-soft">${esc('52 Yevropeiska St (formerly Katerynynska), Odesa, 65011.')} 5 minutes by car from the railway station, 15 from the airport — we can arrange a transfer.</p>
    </div>
    <ul class="flex flex-col divide-y divide-ink/10 text-lg">
      ${[['Holy Trinity Cathedral', 'opposite'], ['Pryvoz market', '700 m'], ['Derybasivska Street', '10–15 min walk'], ['Opera House', '10–15 min walk'], ['Primorsky Boulevard & the Duke', '10–15 min walk'], ['Potemkin Stairs', '10–15 min walk']].map(([n, t]) => `<li class="flex justify-between gap-6 py-4"><span class="font-semibold">${n}</span><span class="text-ink-muted">${t}</span></li>`).join('')}
    </ul>
  </div>
</section>

<section id="book" class="bg-sand-100 py-24 lg:py-32" aria-labelledby="book-title">
  <div class="container-site grid gap-8 lg:grid-cols-12">
    <div class="flex flex-col gap-5 lg:col-span-4">
      <h2 id="book-title" class="font-display text-display-lg">Book direct</h2>
      <p class="text-lg text-ink-soft">Check prices and availability below, or call us — reception is open 24/7.</p>
      <div class="flex items-center gap-3 text-mustard">${stars(4.5, 'h-6 w-6')}<span class="font-semibold text-ink">4.5 on Google</span></div>
    </div>
    <div class="lg:col-span-8">
      <div class="min-h-[24rem] rounded-card bg-white p-4 ring-1 ring-ink/10 sm:p-6">
        <div id="ServioContainer" data-src="${SCRIPT}"></div><div id="ServioResult"></div>
        <div class="flex flex-col items-start gap-4 p-6" data-servio-fallback hidden><p class="font-display text-display-sm" data-servio-live>The booking module isn't responding</p><p class="font-display text-display-sm" data-servio-demo hidden>Online booking goes here</p><p class="max-w-lg text-ink-soft" data-servio-demo hidden>This is a demo version of the site. The hotel's Servio booking module runs only on hotel52.od.ua — once the site moves there, room selection with your dates will appear here.</p><div class="flex flex-wrap gap-3">${site.phones.map((p) => `<a class="btn btn-ink" href="${p.href}">${icon('phone', 'h-5 w-5')} ${p.label}</a>`).join('')}</div></div>
      </div>
    </div>
  </div>
</section>
</main>
<footer id="contacts" class="site-footer relative overflow-hidden bg-moss-800 text-sand">
  <div class="footer-52" aria-hidden="true">52</div>
  <div class="container-site relative grid gap-10 py-20 sm:grid-cols-2 lg:grid-cols-4">
    <div class="flex flex-col gap-3"><span class="font-display text-xl">Hotel 52</span><address class="not-italic text-sand/80">52 Yevropeiska St<br>(formerly Katerynynska)<br>Odesa, 65011, Ukraine</address></div>
    <div><h2 class="footer-h">Reception 24/7</h2><ul class="flex flex-col gap-2">${site.phones.map((p) => `<li><a class="footer-link text-lg font-semibold" href="${p.href}">${p.label}</a></li>`).join('')}<li><a class="footer-link" href="mailto:${site.email}">${site.email}</a></li></ul></div>
    <div><h2 class="footer-h">Restaurant 52</h2><ul class="flex flex-col gap-2">${site.restoPhones.map((p) => `<li><a class="footer-link" href="${p.href}">${p.label}</a></li>`).join('')}</ul></div>
    <div><h2 class="footer-h">Follow us</h2><div class="flex gap-2">
      <a class="icon-btn" href="${site.social.instagram.href}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
      <a class="icon-btn" href="${site.social.facebook.href}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
      <a class="icon-btn" href="${site.social.tripadvisor.href}" target="_blank" rel="noopener" aria-label="TripAdvisor">${icon('tripadvisor')}</a>
      <a class="icon-btn" href="${site.messengers.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a>
    </div></div>
  </div>
  <p class="container-site relative border-t border-sand/15 py-8 text-sm text-sand/60">© ${new Date().getFullYear()} Hotel 52 · Boutique hotel 3★ in Odesa</p>
</footer>
<div class="mobilebar lg:hidden" data-mobilebar>
  <a href="${site.phones[0].href}" class="mobilebar-call" aria-label="Call ${site.phones[0].label}">${icon('phone', 'h-5 w-5')}<span>Call</span></a>
  <a href="#book" class="mobilebar-book"><span>Book now</span>${icon('arrowRight', 'h-5 w-5')}</a>
</div>
<script src="assets/js/main.js" defer></script>
</body>
</html>`;
  return { path: 'en.html', html };
}

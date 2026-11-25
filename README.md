# Hotel 52: редизайн сайту

Статичний сайт: HTML + Tailwind CSS + трохи vanilla JS. Готова збірка лежить у `site/`. Її можна залити на будь-який хостинг як є.

## Перегляд

```
npm install
node build/serve.mjs      # http://localhost:5252
```

`site/index.html` відкривається і просто подвійним кліком. Модуль бронювання Servio працює тільки на домені hotel52.od.ua.

## Збірка

```
npm run build             # сторінки + CSS
npm run images            # фото → AVIF/WebP 640/1280/1920 + blur-плейсхолдери
node build/images.mjs fetch   # (раз) завантажити оригінали фото з поточного сайту
```

## Де що міняти

| Що | Файл |
|---|---|
| Телефони, адреса, ціни сніданку, акції, послуги, відгуки | `src/data/site.mjs` |
| Номери: площа, ціни, ліжка, фото, тексти | `src/data/rooms.mjs` |
| Alt-тексти фото | `src/data/photos.mjs` |
| Сторінки | `src/pages/*.mjs` |
| Шапка, футер, форма бронювання, картка номера, schema.org | `src/lib/layout.mjs` |
| Логотип, штампи, лінійний фасад, «моховий» знак, схема району | `src/lib/graphics.mjs` |
| Кольори, шрифти | `tailwind.config.js`, `src/css/input.css` |
| Поведінка (меню, лайтбокс, фільтр, лічильники, бронювання) | `src/js/main.js` |

## Бронювання

Форма «Перевірити ціни» веде на `bronyuvannya.html?arrival=…&departure=…&adults=…`. Перед завантаженням модуля Servio (`sbj.rkz.io`, module_id=14) сторінка записує дати в `localStorage['servio_booking']`, тож модуль відкривається з уже вибраними датами. Якщо модуль не відповідає 20 секунд, показуються кнопки дзвінка.

## Сторінки

`index`, 6 номерів (`nomer-*.html`), `restoran`, `aktsii`, `posluhy`, `pro-nas`, `pravyla`, `blog`, `kontakty`, `bronyuvannya`, `404`, `en` (англійська one-page).

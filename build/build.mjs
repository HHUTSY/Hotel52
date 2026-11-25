// Збирає статичні сторінки з src/pages/*.mjs у site/
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// --demo: превʼю посилань (og:image) береться з GitHub Pages, поки сайт не переїхав на hotel52.od.ua
if (process.argv.includes('--demo')) process.env.ASSETS_URL = 'https://hhutsy.github.io/Hotel52/';
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'site');

await fs.mkdir(path.join(OUT, 'assets', 'js'), { recursive: true });
await fs.mkdir(path.join(OUT, 'assets', 'img'), { recursive: true });

// 1) Сторінки
const pagesDir = path.join(SRC, 'pages');
const files = (await fs.readdir(pagesDir)).filter((f) => f.endsWith('.mjs')).sort();
let n = 0;
for (const f of files) {
  const mod = await import(pathToFileURL(path.join(pagesDir, f)).href);
  const out = await mod.default();
  for (const p of Array.isArray(out) ? out : [out]) {
    await fs.writeFile(path.join(OUT, p.path), p.html.replace(/\n\s*\n/g, '\n'), 'utf8');
    n++;
  }
}
console.log(`HTML: ${n} сторінок`);

// 2) JS
await fs.copyFile(path.join(SRC, 'js', 'main.js'), path.join(OUT, 'assets', 'js', 'main.js'));

// 3) Favicon, apple-touch-icon, Open Graph
const { logoMark } = await import(pathToFileURL(path.join(SRC, 'lib', 'graphics.mjs')).href);
const fav = logoMark('').replace('<svg class=""', '<svg xmlns="http://www.w3.org/2000/svg"')
  .replace('class="logo-tile"', 'fill="#3F5A3C"').replace('class="logo-glyph"', 'stroke="#F4EDE3"');
await fs.writeFile(path.join(OUT, 'assets', 'img', 'favicon.svg'), fav);
const favSquare = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#3F5A3C"/><g transform="translate(4 12)" fill="none" stroke="#F4EDE3" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round">${fav.match(/<g[^>]*>([\s\S]*?)<\/g>/)[1]}</g></svg>`;
await sharp(Buffer.from(favSquare)).resize(32, 32).png().toFile(path.join(OUT, 'assets', 'img', 'favicon-32.png'));
await sharp(Buffer.from(favSquare)).resize(180, 180).png().toFile(path.join(OUT, 'assets', 'img', 'apple-touch-icon.png'));

const og = path.join(OUT, 'assets', 'img', 'og.jpg');
const fasad = path.join(SRC, 'photos-original', 'fasad.jpg');
try {
  await fs.access(fasad);
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset=".35" stop-color="#182317" stop-opacity="0"/><stop offset="1" stop-color="#182317" stop-opacity=".75"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><g transform="translate(56 498) scale(1.6)"><rect width="56" height="40" rx="12" fill="#F4EDE3"/><g fill="none" stroke="#21301F" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round">${fav.match(/<g[^>]*>([\s\S]*?)<\/g>/)[1]}</g></g></svg>`);
  await sharp(fasad).rotate().resize(1200, 630, { fit: 'cover', position: 'centre' }).composite([{ input: overlay }]).jpeg({ quality: 82, mozjpeg: true }).toFile(og);
} catch { console.log('OG: немає fasad.jpg — пропускаю'); }

console.log('Готово → site/');

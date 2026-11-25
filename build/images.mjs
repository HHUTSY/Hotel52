// Фото-пайплайн:
//   node build/images.mjs fetch  — завантажити оригінали з hotel52.od.ua у src/photos-original/
//   node build/images.mjs        — згенерувати AVIF/WebP (640/1280/1920) у site/assets/img/ + src/data/image-meta.json
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { photoSources, UPLOADS } from './photo-sources.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIG = path.join(ROOT, 'src', 'photos-original');
const OUT = path.join(ROOT, 'site', 'assets', 'img', 'photos');
const META = path.join(ROOT, 'src', 'data', 'image-meta.json');
export const WIDTHS = [640, 1280, 1920];

const mode = process.argv[2] || 'build';

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

async function fetchAll() {
  await fs.mkdir(ORIG, { recursive: true });
  const entries = Object.entries(photoSources);
  let i = 0;
  const worker = async () => {
    while (i < entries.length) {
      const [key, rel] = entries[i++];
      const ext = path.extname(rel).toLowerCase() === '.png' ? '.png' : '.jpg';
      const dest = path.join(ORIG, key + ext);
      if (await exists(dest)) continue;
      try {
        const res = await fetch(UPLOADS + rel, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!res.ok) { console.log('MISS', key, res.status); continue; }
        const type = res.headers.get('content-type') || '';
        if (!type.startsWith('image/')) { console.log('NOT IMAGE', key, type); continue; }
        await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
        console.log('ok', key);
      } catch (e) { console.log('ERR', key, e.message); }
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
}

async function buildAll() {
  await fs.mkdir(OUT, { recursive: true });
  const files = (await fs.readdir(ORIG)).filter(f => /\.(jpe?g|png)$/i.test(f));
  const used = await usedKeys();
  const meta = {};
  for (const f of files) {
    const key = f.replace(/\.(jpe?g|png)$/i, '');
    if (used && !used.has(key)) continue;
    const src = path.join(ORIG, f);
    // rotate() застосовує EXIF-орієнтацію, тож сторони беремо вже після неї
    const m = await sharp(src, { failOn: 'none' }).rotate().toBuffer({ resolveWithObject: true });
    const w = m.info.width, h = m.info.height;
    meta[key] = { w, h, widths: [] };
    for (const W of WIDTHS) {
      // Якщо оригінал менший за крок — робимо одну останню версію в оригінальному розмірі
      const tw = Math.min(W, w);
      const isLast = W >= w;
      const base = path.join(OUT, `${key}-${W}`);
      if (!(await exists(base + '.webp'))) {
        await sharp(m.data).resize({ width: tw }).webp({ quality: 74, effort: 5 }).toFile(base + '.webp');
      }
      if (!(await exists(base + '.avif'))) {
        await sharp(m.data).resize({ width: tw }).avif({ quality: 52, effort: 4 }).toFile(base + '.avif');
      }
      meta[key].widths.push(W);
      if (isLast) break;
    }
    // Крихітний blur-плейсхолдер (LQIP) — інлайном у HTML
    const lqip = await sharp(m.data).resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
    meta[key].lqip = 'data:image/webp;base64,' + lqip.toString('base64');
    console.log('built', key, w + 'x' + h, meta[key].widths.join('/'));
  }
  await fs.mkdir(path.dirname(META), { recursive: true });
  await fs.writeFile(META, JSON.stringify(meta, null, 1));
}

// Генеруємо тільки ті фото, що реально використані в src/data/photos.mjs (якщо файл є)
async function usedKeys() {
  const p = path.join(ROOT, 'src', 'data', 'photos.mjs');
  if (!(await exists(p))) return null;
  const mod = await import(pathToFileURL(p).href + '?t=' + Date.now());
  return new Set(Object.keys(mod.photos));
}

if (mode === 'fetch') await fetchAll();
else await buildAll();

/**
 * Resizes WebP images in public/images/ to their maximum reasonable display width.
 * Run after convert-to-webp.js. Modifies files in-place.
 *
 * Also generates srcset variants for illustration.webp:
 *   illustration-400.webp, illustration-800.webp
 */
import sharp from "sharp";
sharp.cache(false);
import { readdir, stat, writeFile } from "fs/promises";
import { join, relative, dirname, basename, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "../public/images");

// Max display width rules — first match wins, fallback is last entry
const rules = [
  { test: (f) => f.includes("logo"),         maxWidth: 280 },
  { test: (f) => f.includes("illustration"), maxWidth: 1200 },
  { test: (f) => f.includes("background"),   maxWidth: 1920 },
  { test: () => true,                         maxWidth: 800  }, // thumbnails / screenshots
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (e.name.endsWith(".webp")) files.push(full);
  }
  return files;
}

const webps = (await walk(PUBLIC_DIR)).filter((f) => !f.includes("favicon_io"));
console.log(`Resizing ${webps.length} WebP files…\n`);

for (const file of webps) {
  const { width } = await sharp(file).metadata();
  const rule = rules.find((r) => r.test(file));

  if (width <= rule.maxWidth) {
    console.log(`  SKIP  ${relative(PUBLIC_DIR, file).padEnd(58)} (${width}px ≤ ${rule.maxWidth}px)`);
    continue;
  }

  const sizeBefore = ((await stat(file)).size / 1024).toFixed(0);

  try {
    const buffer = await sharp(file)
      .resize({ width: rule.maxWidth, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    await writeFile(file, buffer);
  } catch (err) {
    console.warn(`  WARN  could not resize ${relative(PUBLIC_DIR, file)}: ${err.message}`);
    continue;
  }

  const sizeAfter = ((await stat(file)).size / 1024).toFixed(0);
  const saved = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(0);
  console.log(
    `  RESIZE ${relative(PUBLIC_DIR, file).padEnd(56)} ${width}px → ${rule.maxWidth}px  ${sizeBefore}KB → ${sizeAfter}KB  (-${saved}%)`
  );
}

// Generate srcset variants for illustration.webp
const illustration = join(PUBLIC_DIR, "illustration.webp");
console.log("\nGenerating illustration srcset variants…");
for (const w of [400, 800]) {
  const out = join(PUBLIC_DIR, `illustration-${w}.webp`);
  await sharp(illustration).resize({ width: w }).webp({ quality: 82 }).toFile(out);
  const kb = ((await stat(out)).size / 1024).toFixed(0);
  console.log(`  illustration-${w}.webp  ${kb}KB`);
}

console.log("\nDone!");

// Regenerates the whole favicon/app-icon set from one SVG source, so every
// size and format (browser tab, Safari pinned tab, Apple touch icon, Android
// home screen, .ico) finally shares the real brand mark instead of three
// different, unrelated marks.
//
// Run with: node scripts/make-favicons.js
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const FAVICON_IO = join(PUBLIC, "favicon_io");

mkdirSync(FAVICON_IO, { recursive: true });

// ── Source art: the GlimmerInk ink-drop + feather mark on an indigo tile ──
// Mirrors the logo's gradient (sky -> indigo -> violet) and the white
// feather sliver, on a rounded square so it also works unmodified as the
// Apple touch icon and Android home-screen icon.
const TILE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="drop" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#38BDF8"/>
      <stop offset=".55" stop-color="#4F46E5"/>
      <stop offset="1" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="#1E1B4B"/>
  <path d="M32 8C32 8 49 28 49 40a17 17 0 0 1-34 0C15 28 32 8 32 8Z" fill="url(#drop)"/>
  <path d="M37 18C28 25 24 35 27 47 29 42 31 36 34 31 37 26 38 21 37 18Z" fill="#F5F3FF" opacity=".95"/>
</svg>`;

// Tab favicon: same mark without the tile background, so it reads cleanly
// as a small shape directly on the browser tab (no square behind it).
const TAB_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="drop" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#38BDF8"/>
      <stop offset=".55" stop-color="#4F46E5"/>
      <stop offset="1" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <path d="M32 3C32 3 53 27 53 42a21 21 0 0 1-42 0C11 27 32 3 32 3Z" fill="url(#drop)"/>
  <path d="M38 15C27 23 22 35 26 50 29 44 31 37 35 31 39 25 40 19 38 15Z" fill="#F5F3FF" opacity=".95"/>
</svg>`;

// Safari pinned-tab mask icon: a single-color silhouette (Safari recolors
// it itself), so it has to be one flat path with no gradient or second fill.
const MASK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="M32 3C32 3 53 27 53 42a21 21 0 0 1-42 0C11 27 32 3 32 3Z" fill="#000000"/>
</svg>`;

writeFileSync(join(PUBLIC, "favicon.svg"), TAB_SVG);
writeFileSync(join(FAVICON_IO, "safari-pinned-tab.svg"), MASK_SVG);
console.log("Wrote favicon.svg + safari-pinned-tab.svg");

const renderPng = (svg, size) => sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png();

const pngTargets = [
  { svg: TAB_SVG, size: 16, out: join(FAVICON_IO, "favicon-16x16.png") },
  { svg: TAB_SVG, size: 32, out: join(FAVICON_IO, "favicon-32x32.png") },
  { svg: TILE_SVG, size: 180, out: join(FAVICON_IO, "apple-touch-icon.png") },
  { svg: TILE_SVG, size: 192, out: join(FAVICON_IO, "android-chrome-192x192.png") },
  { svg: TILE_SVG, size: 512, out: join(FAVICON_IO, "android-chrome-512x512.png") },
];

// Also render the three sizes a .ico conventionally bundles.
const icoSizes = [16, 32, 48];

const build = async () => {
  for (const { svg, size, out } of pngTargets) {
    await renderPng(svg, size).toFile(out);
    console.log(`Wrote ${out}`);
  }

  const icoPngs = await Promise.all(icoSizes.map((size) => renderPng(TAB_SVG, size).toBuffer()));
  const ico = packIco(icoSizes, icoPngs);
  writeFileSync(join(FAVICON_IO, "favicon.ico"), ico);
  writeFileSync(join(PUBLIC, "favicon.ico"), ico);
  console.log("Wrote favicon.ico (root + favicon_io/, kept identical)");
};

// Minimal ICO container that embeds PNG-compressed images directly — valid
// since Windows Vista and what every current browser expects. Avoids a
// dependency just to pack a handful of bytes.
function packIco(sizes, pngBuffers) {
  const count = sizes.length;
  const headerSize = 6 + 16 * count;
  const dirEntries = [];
  const imageBuffers = [];
  let offset = headerSize;

  sizes.forEach((size, i) => {
    const png = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count (0 = no palette)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    dirEntries.push(entry);
    imageBuffers.push(png);
    offset += png.length;
  });

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(count, 4);

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

await build();
console.log("Favicon set regenerated.");

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "../public/images");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (e.name.endsWith(".png")) files.push(full);
  }
  return files;
}

const pngs = await walk(PUBLIC_DIR);
// Skip favicon directory — favicons must stay PNG
const toConvert = pngs.filter((f) => !f.includes("favicon_io"));

console.log(`Converting ${toConvert.length} PNG files to WebP…`);

for (const file of toConvert) {
  const webpPath = file.replace(/\.png$/, ".webp");
  const quality = file.includes("logo") ? 90 : 82;

  await sharp(file).webp({ quality }).toFile(webpPath);

  const origKB = ((await stat(file)).size / 1024).toFixed(0);
  const newKB = ((await stat(webpPath)).size / 1024).toFixed(0);
  const saved = (((origKB - newKB) / origKB) * 100).toFixed(0);
  console.log(
    `  ${relative(PUBLIC_DIR, file).padEnd(60)} ${origKB}KB → ${newKB}KB  (-${saved}%)`
  );
}

console.log("\nDone! You can now delete the originals if desired.");

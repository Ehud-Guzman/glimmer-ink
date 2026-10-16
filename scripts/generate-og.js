// Generates the 1200x630 social preview images in public/images/og/.
// Run by hand when the copy below changes (the images are committed):
//
//   npm i --no-save puppeteer-core
//   node scripts/generate-og.js
//
// Uses an installed Chrome/Edge (set CHROME_PATH to override) to render an HTML
// card with the site's own fonts, then sharp to write optimised JPEGs.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "public/images/og");
const CHROME =
  process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const font = (file) => pathToFileURL(join(ROOT, "public/fonts", file)).href;
const logo = `data:image/webp;base64,${readFileSync(join(ROOT, "public/images/logo-blue.webp")).toString("base64")}`;

const cards = [
  { name: "home", eyebrow: "Web developer · Busia, Kenya", title: "Custom websites, web apps & business systems.", sub: "Fast, mobile-first builds with clear pricing in KES." },
  { name: "work", eyebrow: "Selected work", title: "Live client websites and business systems.", sub: "Hospitality, trading, retail and legal." },
  { name: "services", eyebrow: "Services", title: "Development services built around your business.", sub: "Websites, online shops and systems. From KES 20,000." },
  { name: "about", eyebrow: "About · Busia, Kenya", title: "Web developer in Busia, building for businesses across Kenya.", sub: "Ehud Mwai · GlimmerInk Creations" },
  { name: "contact", eyebrow: "Contact", title: "Tell me what you need. Get a clear quote.", sub: "Reply within 24 hours · Busia, Kenya" },
  { name: "blog", eyebrow: "Blog", title: "Practical advice for businesses getting online in Kenya.", sub: "Website pricing, local SEO and web design." },
  { name: "busia", eyebrow: "Busia County, Kenya", title: "Web developer in Busia, Kenya.", sub: "Business websites, online shops and custom systems." },
];

const html = (card) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"SG";font-weight:700;src:url("${font("space-grotesk-latin-700-normal.woff2")}")}
@font-face{font-family:"IN";font-weight:400;src:url("${font("inter-latin-400-normal.woff2")}")}
@font-face{font-family:"IN";font-weight:600;src:url("${font("inter-latin-600-normal.woff2")}")}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:"IN",sans-serif;color:#fff;
 background:radial-gradient(ellipse 70% 90% at 100% 0%,rgba(37,99,235,.45),transparent 60%),#0b1220;position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(148,163,184,.10) 1px,transparent 1px),linear-gradient(to bottom,rgba(148,163,184,.10) 1px,transparent 1px);background-size:48px 48px;
 -webkit-mask-image:radial-gradient(ellipse 90% 80% at 70% 0%,#000 20%,transparent 75%)}
.wrap{position:absolute;inset:0;padding:56px 72px;display:flex;flex-direction:column}
.logo{background:#fff;border-radius:16px;padding:8px 16px;align-self:flex-start}
.logo img{height:52px;display:block}
.eyebrow{margin-top:auto;font:600 22px/1 "IN";letter-spacing:.16em;text-transform:uppercase;color:#60a5fa;display:flex;align-items:center;gap:18px}
.eyebrow:before{content:"";width:44px;height:2px;background:#60a5fa}
h1{margin-top:22px;font:700 68px/1.08 "SG";letter-spacing:-.02em;max-width:980px}
.sub{margin-top:22px;font:400 28px/1.35 "IN";color:#cbd5e1;max-width:900px}
.foot{margin-top:34px;padding-top:22px;border-top:1px solid rgba(148,163,184,.25);display:flex;justify-content:space-between;font:600 22px/1 "IN";color:#94a3b8}
</style></head><body><div class="grid"></div><div class="wrap">
<div class="logo"><img src="${logo}"></div>
<div class="eyebrow">${card.eyebrow}</div><h1>${card.title}</h1><p class="sub">${card.sub}</p>
<div class="foot"><span>glimmerink.co.ke</span><span>Busia, Kenya</span></div></div></body></html>`;

mkdirSync(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

for (const card of cards) {
  // Load from a real file so Chrome allows the file:// font URLs.
  const file = join(tmpdir(), `glimmerink-og-${card.name}.html`);
  writeFileSync(file, html(card));
  await page.goto(pathToFileURL(file).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: "png" });
  const jpg = await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
  await sharp(jpg).toFile(join(OUT, `${card.name}.jpg`));
  console.log(`og/${card.name}.jpg  ${(jpg.length / 1024).toFixed(0)} KB`);
}

await browser.close();

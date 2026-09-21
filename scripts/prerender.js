// Prerenders every route into a static HTML file under dist/:
//
//  1. Renders the real React tree for the route (through the SSR bundle built
//     by `vite build --ssr`) so crawlers and AI bots that never run JavaScript
//     get the actual page content instead of an empty <div id="root">.
//  2. Rewrites the per-route <head> tags (title, description, canonical, OG,
//     Twitter) for link-preview bots, which also never run JavaScript.
//  3. Bakes the route JSON-LD blocks into the static HTML.
//  4. Emits dist/404.html with a noindex robots tag.
//  5. Writes sitemap.xml from the same data the site renders from, so the two
//     can no longer drift apart.
//  6. Stamps the service worker cache version so every deploy busts the cache
//     for returning visitors.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import pageSeo from "../src/data/pageSeo.js";
import { developmentProjects } from "../src/data/developmentProjects.js";
import { blogPosts } from "../src/data/blogPosts.js";
import { serviceFaqs } from "../src/data/faqs.js";
import {
  DEFAULT_IMAGE,
  SITE_NAME,
  SITE_URL,
  article,
  blogCollection,
  breadcrumbs,
  caseStudy,
  contactPage,
  faqPage,
  person,
  professionalService,
  serviceList,
  webSite,
  workCollection,
} from "../src/data/schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, "../dist");
const SSR_ENTRY = join(__dirname, "../dist-ssr/entry-server.js");
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const template = readFileSync(join(DIST_DIR, "index.html"), "utf-8");

const ssrModule = existsSync(SSR_ENTRY) ? await import(pathToFileURL(SSR_ENTRY).href) : null;
const render = ssrModule?.render ?? null;

if (!render) {
  console.warn("! dist-ssr/entry-server.js missing - prerendering <head> metadata only, no body content.");
}

const resolveImage = (image) => (image ? new URL(image, `${SITE_URL}/`).toString() : DEFAULT_IMAGE);
const canonical = (path) => new URL(path, `${SITE_URL}/`).toString();

const projectSchema = (project) => [
  caseStudy(project),
  breadcrumbs([
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: project.title, path: `/work/${project.slug}` },
  ]),
];

const postSchema = (post) => [
  article(post),
  breadcrumbs([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]),
];

const STATIC_SCHEMA = {
  "/": () => [webSite(), professionalService()],
  "/work": () => [workCollection(developmentProjects)],
  "/services": () => [serviceList(), faqPage(serviceFaqs)],
  "/about": () => [person()],
  "/blog": () => [blogCollection(blogPosts)],
  "/contact": () => [contactPage()],
};

const STATIC_META = {
  "/": { priority: "1.0", changefreq: "weekly" },
  "/work": { priority: "0.9", changefreq: "weekly" },
  "/services": { priority: "0.9", changefreq: "monthly" },
  "/contact": { priority: "0.8", changefreq: "monthly" },
  "/blog": { priority: "0.8", changefreq: "weekly" },
  "/about": { priority: "0.7", changefreq: "monthly" },
};

const routes = [
  ...Object.values(pageSeo).map((seo) => ({
    ...seo,
    schema: STATIC_SCHEMA[seo.path]?.() ?? [],
    ...(STATIC_META[seo.path] ?? { priority: "0.6", changefreq: "monthly" }),
    lastmod: BUILD_DATE,
  })),
  ...developmentProjects.map((project) => {
    const images =
      project.images?.length > 0
        ? project.images
        : [project.fullImage ?? project.thumbnail].filter(Boolean);
    return {
      title: `${project.title} — Case Study`,
      description: project.description,
      path: `/work/${project.slug}`,
      image: resolveImage(images[0]),
      images,
      schema: projectSchema(project),
      lastmod: BUILD_DATE,
      priority: project.featured ? "0.9" : "0.8",
      changefreq: "monthly",
    };
  }),
  ...blogPosts.map((post) => ({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: DEFAULT_IMAGE,
    schema: postSchema(post),
    lastmod: post.date,
    priority: "0.7",
    changefreq: "monthly",
  })),
];

const replaceTag = (html, pattern, value) =>
  html.replace(pattern, (match, prefix, _old, suffix) => `${prefix}${value}${suffix}`);

const escapeAttr = (str) => String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const escapeXml = (str) => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const stripContext = (block) => {
  const copy = { ...block };
  delete copy["@context"];
  return copy;
};

const schemaTag = (blocks) => {
  const list = (blocks ?? []).filter(Boolean);
  if (list.length === 0) return "";

  const payload =
    list.length === 1 ? list[0] : { "@context": "https://schema.org", "@graph": list.map(stripContext) };

  // Escape "<" so data can never terminate the script tag early.
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");

  return `    <script type="application/ld+json" id="page-schema">${json}</script>\n`;
};

const withHead = (html, { path, image, schema }, title, description) => {
  let out = html;

  out = replaceTag(out, /(<title>)([^<]*)(<\/title>)/, escapeAttr(title));
  out = replaceTag(out, /(<meta name="description" content=")([^"]*)(")/, escapeAttr(description));
  out = replaceTag(out, /(<link rel="canonical" href=")([^"]*)(")/, canonical(path));
  out = replaceTag(out, /(<meta property="og:title" content=")([^"]*)(")/, escapeAttr(title));
  out = replaceTag(out, /(<meta property="og:description" content=")([^"]*)(")/, escapeAttr(description));
  out = replaceTag(out, /(<meta property="og:url" content=")([^"]*)(")/, canonical(path));
  out = replaceTag(out, /(<meta property="og:image" content=")([^"]*)(")/, image || DEFAULT_IMAGE);
  out = replaceTag(out, /(<meta name="twitter:title" content=")([^"]*)(")/, escapeAttr(title));
  out = replaceTag(out, /(<meta name="twitter:description" content=")([^"]*)(")/, escapeAttr(description));
  out = replaceTag(out, /(<meta name="twitter:image" content=")([^"]*)(")/, image || DEFAULT_IMAGE);
  out = out.replace("</head>", () => `${schemaTag(schema)}  </head>`);

  return out;
};

for (const route of routes) {
  const pageTitle = route.title ? `${route.title} | ${SITE_NAME}` : SITE_NAME;
  let html = withHead(template, route, pageTitle, route.description || "");

  if (render) {
    const appHtml = await render(route.path);
    html = html.replace("<!--app-html-->", () => appHtml);
  }

  const outDir = route.path === "/" ? DIST_DIR : join(DIST_DIR, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
}

// --- 404 page -------------------------------------------------------------
let notFoundHtml = withHead(
  template,
  { path: "/", image: DEFAULT_IMAGE, schema: [webSite(), professionalService()] },
  `Page not found | ${SITE_NAME}`,
  "This page does not exist. Explore the GlimmerInk Creations portfolio, services and case studies instead."
);
notFoundHtml = replaceTag(notFoundHtml, /(<meta name="robots" content=")([^"]*)(")/, "noindex, follow");

if (render) {
  const notFoundApp = await render("/404");
  notFoundHtml = notFoundHtml.replace("<!--app-html-->", () => notFoundApp);
}

writeFileSync(join(DIST_DIR, "404.html"), notFoundHtml);

// --- sitemap --------------------------------------------------------------
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ...routes.map((route) => {
    const lines = [
      "  <url>",
      `    <loc>${canonical(route.path)}</loc>`,
      `    <lastmod>${route.lastmod}</lastmod>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
    ];

    for (const image of (route.images ?? []).slice(0, 6)) {
      lines.push("    <image:image>");
      lines.push(`      <image:loc>${resolveImage(image)}</image:loc>`);
      lines.push(`      <image:title>${escapeXml(route.title ?? SITE_NAME)}</image:title>`);
      lines.push("    </image:image>");
    }

    lines.push("  </url>");
    return lines.join("\n");
  }),
  "</urlset>",
].join("\n");

writeFileSync(join(DIST_DIR, "sitemap.xml"), `${sitemap}\n`);

// --- service worker cache version ---------------------------------------
const SW_PATH = join(DIST_DIR, "sw.js");
if (existsSync(SW_PATH)) {
  const assetDir = join(DIST_DIR, "assets");
  const fingerprint = existsSync(assetDir)
    ? createHash("sha256").update(readdirSync(assetDir).sort().join("|")).digest("hex").slice(0, 10)
    : String(Date.now());

  const sw = readFileSync(SW_PATH, "utf-8");
  const stamped = sw.split("__BUILD_VERSION__").join(fingerprint);

  if (stamped === sw) {
    console.warn("! sw.js has no build version placeholder - returning visitors may get stale files.");
  } else {
    writeFileSync(SW_PATH, stamped);
    console.log(`Stamped service worker cache version ${fingerprint}`);
  }
}
console.log(
  `Prerendered ${routes.length} routes + 404.html with per-route metadata, JSON-LD` +
    (render ? " and content." : " (content skipped).")
);

// Bakes per-route <head> metadata (title, description, canonical, OG,
// Twitter) into static HTML files under dist/, one per route.
//
// Why: this site is a client-only SPA — SEOHead.jsx sets per-page meta
// tags inside a useEffect, so they only exist after JS runs. Social
// link-preview bots (Facebook, X, LinkedIn, WhatsApp, Slack) never run
// JS, so every shared link showed the homepage's title/description/
// image regardless of which page was actually shared. This script runs
// after `vite build` and writes dist/<route>/index.html with the
// correct tags already in the markup, which Netlify serves in place of
// the SPA fallback (static files win over the `/* /index.html 200`
// redirect). React still hydrates client-side as before.
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import pageSeo from "../src/data/pageSeo.js";
import { developmentProjects } from "../src/data/developmentProjects.js";
import { blogPosts } from "../src/data/blogPosts.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, "../dist");
const SITE_URL = "https://glimmerink.co.ke";
const SITE_NAME = "GlimmerInk Creations";
const DEFAULT_IMAGE = `${SITE_URL}/images/Glimmer-OG.jpg`;

const template = readFileSync(join(DIST_DIR, "index.html"), "utf-8");

const resolveImage = (image) =>
  image ? new URL(image, `${SITE_URL}/`).toString() : DEFAULT_IMAGE;

const routes = [
  ...Object.values(pageSeo),
  ...developmentProjects.map((project) => {
    const images =
      project.images?.length > 0
        ? project.images
        : [project.fullImage || project.thumbnail].filter(Boolean);
    return {
      title: `${project.title} — Case Study`,
      description: project.description,
      path: `/work/${project.slug}`,
      image: resolveImage(images[0]),
    };
  }),
  ...blogPosts.map((post) => ({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: DEFAULT_IMAGE,
  })),
];

const replaceTag = (html, pattern, value) =>
  html.replace(pattern, (match, prefix, _old, suffix) => `${prefix}${value}${suffix}`);

const escapeAttr = (str) => String(str).replace(/"/g, "&quot;");

for (const route of routes) {
  const pageTitle = route.title ? `${route.title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = new URL(route.path, `${SITE_URL}/`).toString();
  const description = escapeAttr(route.description || "");
  const image = route.image || DEFAULT_IMAGE;

  let html = template;
  html = replaceTag(html, /(<title>)([^<]*)(<\/title>)/, escapeAttr(pageTitle));
  html = replaceTag(
    html,
    /(<meta name="description" content=")([^"]*)(")/,
    description
  );
  html = replaceTag(
    html,
    /(<link rel="canonical" href=")([^"]*)(")/,
    canonicalUrl
  );
  html = replaceTag(
    html,
    /(<meta property="og:title" content=")([^"]*)(")/,
    escapeAttr(pageTitle)
  );
  html = replaceTag(
    html,
    /(<meta property="og:description" content=")([^"]*)(")/,
    description
  );
  html = replaceTag(html, /(<meta property="og:url" content=")([^"]*)(")/, canonicalUrl);
  html = replaceTag(html, /(<meta property="og:image" content=")([^"]*)(")/, image);
  html = replaceTag(
    html,
    /(<meta name="twitter:title" content=")([^"]*)(")/,
    escapeAttr(pageTitle)
  );
  html = replaceTag(
    html,
    /(<meta name="twitter:description" content=")([^"]*)(")/,
    description
  );
  html = replaceTag(html, /(<meta name="twitter:image" content=")([^"]*)(")/, image);

  const outDir = route.path === "/" ? DIST_DIR : join(DIST_DIR, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
}

console.log(`Prerendered ${routes.length} routes with route-specific <head> metadata.`);

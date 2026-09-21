import { useEffect } from "react";

const SITE_NAME = "GlimmerInk Creations";
const SITE_URL = "https://glimmerink.co.ke";
const DEFAULT_IMAGE = `${SITE_URL}/images/Glimmer-OG.jpg`;
const SCHEMA_ID = "page-schema";

const upsertMeta = ({ selector, createTag, attributes, content }) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement(createTag);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const stripContext = (block) => {
  const copy = { ...block };
  delete copy["@context"];
  return copy;
};

const SEOHead = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noIndex = false,
  jsonLd = null,
}) => {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const canonicalUrl = new URL(path, `${SITE_URL}/`).toString();

    document.title = pageTitle;

    upsertMeta({ selector: `meta[name="description"]`, createTag: "meta", attributes: { name: "description" }, content: description });
    upsertMeta({ selector: `meta[name="robots"]`, createTag: "meta", attributes: { name: "robots" }, content: noIndex ? "noindex, follow" : "index, follow" });
    upsertMeta({ selector: `meta[property="og:title"]`, createTag: "meta", attributes: { property: "og:title" }, content: pageTitle });
    upsertMeta({ selector: `meta[property="og:description"]`, createTag: "meta", attributes: { property: "og:description" }, content: description });
    upsertMeta({ selector: `meta[property="og:url"]`, createTag: "meta", attributes: { property: "og:url" }, content: canonicalUrl });
    upsertMeta({ selector: `meta[property="og:image"]`, createTag: "meta", attributes: { property: "og:image" }, content: image });
    upsertMeta({ selector: `meta[name="twitter:title"]`, createTag: "meta", attributes: { name: "twitter:title" }, content: pageTitle });
    upsertMeta({ selector: `meta[name="twitter:description"]`, createTag: "meta", attributes: { name: "twitter:description" }, content: description });
    upsertMeta({ selector: `meta[name="twitter:image"]`, createTag: "meta", attributes: { name: "twitter:image" }, content: image });

    let canonical = document.head.querySelector(`link[rel="canonical"]`);
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [description, image, noIndex, path, title]);

  // Structured data owned by this route, e.g. Article, FAQPage, BreadcrumbList.
  useEffect(() => {
    const stale = document.getElementById(SCHEMA_ID);
    if (stale) stale.remove();

    const blocks = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean);
    if (blocks.length === 0) return undefined;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = SCHEMA_ID;
    script.text = JSON.stringify(
      blocks.length === 1
        ? blocks[0]
        : { "@context": "https://schema.org", "@graph": blocks.map(stripContext) }
    );
    document.head.appendChild(script);

    return () => {
      const current = document.getElementById(SCHEMA_ID);
      if (current) current.remove();
    };
  }, [jsonLd]);

  return null;
};

export default SEOHead;

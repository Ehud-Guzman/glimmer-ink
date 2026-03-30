import { useEffect } from "react";

const SITE_NAME = "GlimmerInk Creations";
const SITE_URL = "https://glimmerink.co.ke";
const DEFAULT_IMAGE = `${SITE_URL}/images/Glimmer-OG.jpg`;

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

const SEOHead = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
}) => {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const canonicalUrl = new URL(path, `${SITE_URL}/`).toString();

    document.title = pageTitle;

    upsertMeta({
      selector: 'meta[name="description"]',
      createTag: "meta",
      attributes: { name: "description" },
      content: description,
    });

    upsertMeta({
      selector: 'meta[property="og:title"]',
      createTag: "meta",
      attributes: { property: "og:title" },
      content: pageTitle,
    });

    upsertMeta({
      selector: 'meta[property="og:description"]',
      createTag: "meta",
      attributes: { property: "og:description" },
      content: description,
    });

    upsertMeta({
      selector: 'meta[property="og:url"]',
      createTag: "meta",
      attributes: { property: "og:url" },
      content: canonicalUrl,
    });

    upsertMeta({
      selector: 'meta[property="og:image"]',
      createTag: "meta",
      attributes: { property: "og:image" },
      content: image,
    });

    upsertMeta({
      selector: 'meta[name="twitter:title"]',
      createTag: "meta",
      attributes: { name: "twitter:title" },
      content: pageTitle,
    });

    upsertMeta({
      selector: 'meta[name="twitter:description"]',
      createTag: "meta",
      attributes: { name: "twitter:description" },
      content: description,
    });

    upsertMeta({
      selector: 'meta[name="twitter:image"]',
      createTag: "meta",
      attributes: { name: "twitter:image" },
      content: image,
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [description, image, path, title]);

  return null;
};

export default SEOHead;

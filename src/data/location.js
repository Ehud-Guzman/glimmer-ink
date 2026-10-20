// Where the business operates from. Single source of truth for local SEO:
// the schema.js address/geo/areaServed, the /web-developer-busia landing page,
// the footer and the homepage copy all read from here, so relocating (e.g. to
// Thika) is one edit in this file plus renaming the landing page route.
// Pure data only - imported by Node (prerender) as well as the browser.
export const LOCATION = {
  town: "Busia",
  county: "Busia County",
  regionCode: "KE-04",
  region: "Western Kenya",
  country: "Kenya",
  countryCode: "KE",
  // Busia town centre - approximate on purpose, there is no street address.
  latitude: 0.4608,
  longitude: 34.1115,
  // Towns around Busia that get the same in-person service.
  nearbyTowns: ["Malaba", "Nambale", "Funyula", "Port Victoria", "Bumala", "Amagoro"],
  // Based in Busia but works with clients anywhere in Kenya, remotely by call,
  // video and WhatsApp. Nearest centres first, then the major cities.
  widerArea: ["Bungoma", "Kakamega", "Kisumu", "Eldoret", "Nakuru", "Nairobi", "Mombasa"],
  landingPath: "/web-developer-busia",
};

export const LOCATION_LABEL = `${LOCATION.town}, ${LOCATION.country}`;

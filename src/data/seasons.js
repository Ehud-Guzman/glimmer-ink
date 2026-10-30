// Seasonal themes. Add an entry to SEASONS (and its copy in SEASON_COPY) to
// theme another occasion; nothing else needs to change.
//
// Dates are MM-DD, inclusive, in the visitor's local time. A phase whose `to`
// is earlier than its `from` wraps over New Year. A season is active while any
// of its phases matches; the first phase is also its start.
//
// Preview out of season with  ?season=christmas  (optionally  &phase=newyear),
// switch it off with  ?season=off . The choice lasts for the browser session.

export const SEASONS = [
  {
    name: "christmas",
    phases: [
      { id: "greeting", from: "12-01", to: "12-23" },
      { id: "christmas", from: "12-24", to: "12-26" },
      { id: "newyear", from: "12-27", to: "01-05" },
    ],
  },
  // Picks up the day Christmas ends: a quiet banner, no decoration.
  {
    name: "january",
    phases: [
      { id: "term", from: "01-06", to: "01-18" },
      { id: "review", from: "01-19", to: "01-31" },
    ],
  },
];

// What each season switches on besides the announcement bar.
export const SEASON_FEATURES = {
  christmas: { snow: true, themeName: "festive theme" },
  january: { snow: false, themeName: "seasonal banner" },
};

// One offer per season, shared by every surface that mentions it (announcement
// bar, contact form, cost estimator, button badge). It runs for the whole
// season window. `claim` is the ?offer= value on the contact link; `label`
// finishes the sentence "... until <date>".
//   kind "discount": a percentage off (also shown in the cost estimator)
//   kind "review":   a free website review
// `title` heads the notice on the contact form; `subject`, `message` and
// `thanks` are what "Claim it" pre-fills and what the success message says.
export const SEASON_OFFERS = {
  christmas: {
    kind: "discount",
    title: "Festive offer",
    percent: 10,
    claim: "festive",
    label: "10% off all new projects",
    notice: "Send your request and I'll take it off your quote.",
    subject: "Quote request: festive offer",
    message: "Hi Ehud, I'd like a quote and to claim the festive offer ({label}).\n\nWhat I need:\n",
    thanks: "I'll apply your 10% festive offer to your quote.",
  },
  january: {
    kind: "review",
    title: "January offer",
    claim: "review",
    label: "a free website review",
    notice: "Send your website address, or tell me you don't have one yet, and I'll reply with honest suggestions.",
    subject: "Free website review request",
    message: "Hi Ehud, I'd like to claim the free website review.\n\nMy website address:\n\nWhat I'd like improved:\n",
    thanks: "I'll include your free website review in my reply.",
  },
};

// Tokens: {next} the year a season that began in December leads into (Dec 2026
// and Jan 2027 -> 2027; don't use it in a season that starts in January),
// {percent} the offer's percentage, {end} the last day of the season, e.g. "5 Jan".
// A cta with `claim: true` links to the contact form pre-filled for the offer.
export const SEASON_COPY = {
  christmas: {
    greeting: {
      icon: "tree",
      text: "Festive offer: {percent}% off all new projects until {end}. Planning a new site for {next}?",
      short: "Festive offer: {percent}% off all projects",
      cta: { label: "Claim it", claim: true },
    },
    christmas: {
      icon: "gift",
      text: "Merry Christmas from GlimmerInk Creations! Enjoy {percent}% off all new projects until {end}.",
      short: "Merry Christmas! {percent}% off all projects",
      cta: { label: "Claim it", claim: true },
    },
    newyear: {
      icon: "party",
      text: "Happy New Year {next}! {percent}% off all new projects until {end}. Make it your year online.",
      short: "Happy New Year! {percent}% off all projects",
      cta: { label: "Claim it", claim: true },
    },
  },
  january: {
    term: {
      icon: "school",
      text: "Starting a new term? Get a free website review for your school or business, or a quote for a management system, until {end}.",
      short: "New term? Get a free website review",
      cta: { label: "Get yours", claim: true },
    },
    review: {
      icon: "search",
      text: "New year, new website? Get a free website review until {end}. No obligation.",
      short: "Get a free website review",
      cta: { label: "Get yours", claim: true },
    },
  },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "5 Jan": the day the season's final phase ends.
export function seasonEnd(name) {
  const season = SEASONS.find((entry) => entry.name === name);
  if (!season) return "";
  const [month, day] = season.phases[season.phases.length - 1].to.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]}`;
}

// The season's first and last moments for a season that began in `year`
// (start 00:00 on the first phase's day, end 23:59:59 on the last phase's day).
export function seasonWindow(name, year) {
  const season = SEASONS.find((entry) => entry.name === name);
  if (!season) return null;
  const [fromMonth, fromDay] = season.phases[0].from.split("-").map(Number);
  const [toMonth, toDay] = season.phases[season.phases.length - 1].to.split("-").map(Number);
  const wraps = toMonth * 100 + toDay < fromMonth * 100 + fromDay;
  return {
    start: new Date(year, fromMonth - 1, fromDay),
    end: new Date(wraps ? year + 1 : year, toMonth - 1, toDay, 23, 59, 59),
  };
}

export const applyOffer = (amount, offer) => Math.round((amount * (100 - offer.percent)) / 100);

/**
 * Works out which season (if any) applies. Pure and self-contained on purpose:
 * vite.config.js inlines this function's source into index.html so it runs
 * before first paint, which means it must not reference anything outside itself.
 *
 * @param seasons  the SEASONS array
 * @param now      a Date
 * @param preview  "off", "<season>" or "<season>:<phase>", or a falsy value
 * @returns {{ name, phase, year, key } | null}  `year` is the year the season began
 */
export function resolveSeason(seasons, now, preview) {
  var mmdd = function (text) {
    var parts = text.split("-");
    return Number(parts[0]) * 100 + Number(parts[1]);
  };
  var inPhase = function (phase, value) {
    var from = mmdd(phase.from);
    var to = mmdd(phase.to);
    return from <= to ? value >= from && value <= to : value >= from || value <= to;
  };
  var result = function (season, phase, year) {
    return { name: season.name, phase: phase.id, year: year, key: season.name + "-" + year };
  };

  var parts = preview ? String(preview).split(":") : [];
  if (parts[0] === "off") return null;

  var value = (now.getMonth() + 1) * 100 + now.getDate();
  var thisYear = now.getFullYear();

  if (parts[0]) {
    for (var i = 0; i < seasons.length; i++) {
      if (seasons[i].name !== parts[0]) continue;
      var chosen = seasons[i].phases[0];
      for (var j = 0; j < seasons[i].phases.length; j++) {
        if (seasons[i].phases[j].id === parts[1]) chosen = seasons[i].phases[j];
      }
      return result(seasons[i], chosen, now.getMonth() < 6 ? thisYear - 1 : thisYear);
    }
  }

  for (var s = 0; s < seasons.length; s++) {
    var season = seasons[s];
    for (var p = 0; p < season.phases.length; p++) {
      if (!inPhase(season.phases[p], value)) continue;
      var startsBefore = value < mmdd(season.phases[0].from);
      return result(season, season.phases[p], startsBefore ? thisYear - 1 : thisYear);
    }
  }
  return null;
}

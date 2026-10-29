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
];

// The festive offer, one place for every surface that mentions it (announcement
// bar, contact form, cost estimator). It runs for the whole season window.
export const SEASON_OFFERS = {
  christmas: { percent: 10 },
};

// Tokens: {next} the year the season leads into (Dec 2026 and Jan 2027 -> 2027),
// {percent} the offer's percentage, {end} the last day of the season, e.g. "5 Jan".
export const SEASON_COPY = {
  christmas: {
    greeting: {
      icon: "tree",
      text: "Festive offer: {percent}% off all new projects until {end}. Planning a new site for {next}?",
      short: "Festive offer: {percent}% off all projects",
      cta: { label: "Claim it", to: "/contact" },
    },
    christmas: {
      icon: "gift",
      text: "Merry Christmas from GlimmerInk Creations! Enjoy {percent}% off all new projects until {end}.",
      short: "Merry Christmas! {percent}% off all projects",
      cta: { label: "Claim it", to: "/contact" },
    },
    newyear: {
      icon: "party",
      text: "Happy New Year {next}! {percent}% off all new projects until {end}. Make it your year online.",
      short: "Happy New Year! {percent}% off all projects",
      cta: { label: "Claim it", to: "/contact" },
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

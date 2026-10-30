import { useEffect, useRef, useState } from "react";
import { Link } from "@/components/ui/SlashLink";
import { ArrowRight, Check, CheckCircle2, Clock, Copy, ExternalLink, Monitor, MousePointerClick, ShieldCheck, Smartphone } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SafeImage from "@/components/ui/SafeImage";
import { demoProjects } from "@/data/developmentProjects";
import pageSeo from "@/data/pageSeo";
import { breadcrumbs, demosCollection } from "@/data/schema";
import { trackEvent } from "@/utils/analytics";

const DEMOS_SCHEMA = [
  demosCollection(demoProjects),
  breadcrumbs([
    { name: "Home", path: "/" },
    { name: "Demos", path: "/demos" },
  ]),
];

const KIND = {
  "live-demo": {
    badge: "Live demo · sample data",
    button: "Try the live demo",
    summary: "A working system. Click through every screen.",
  },
  demo: {
    badge: "Concept build",
    button: "View preview",
    summary: "An interface concept built to show what a system could look like.",
  },
};

const reassurances = [
  { icon: MousePointerClick, title: "Nothing to sign up for", text: "Sign-in is one tap, or a sample login shown on the demo itself." },
  { icon: ShieldCheck, title: "Safe to explore", text: "Demos use invented data and are read-only, so you cannot break or change anything." },
  { icon: Clock, title: "Opens in a new tab", text: "Some run on free hosting, so the first load after a quiet spell can be slow." },
];

// Copies a sample login value. Clipboard access can be refused (older browsers,
// blocked permissions), so the value stays selectable as plain text either way.
const CopyButton = ({ value, label, demo }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    trackEvent("demo_copy_login", { demo, field: label });
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 -my-1 font-mono text-sm text-text-light dark:text-text-dark hover:bg-primary/10 dark:hover:bg-primary-light/15 transition-colors"
    >
      {value}
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" aria-hidden="true" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-text-light/65 dark:text-text-dark/50" aria-hidden="true" />
      )}
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
    </button>
  );
};

const DemoRow = ({ project, index }) => {
  const [view, setView] = useState("desktop");
  const [active, setActive] = useState(0);
  const kind = KIND[project.status] ?? KIND.demo;
  const guide = project.demoGuide;
  const host = project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const hasPhone = !!project.mobileImages?.length;
  const phone = hasPhone && view === "phone";
  const images = phone ? project.mobileImages : project.images?.length ? project.images : [project.thumbnail];
  const captions = phone ? project.mobileCaptions : project.imageCaptions;
  const caption = captions?.[active];
  const open = (placement) => trackEvent("demo_open", { demo: project.slug, status: project.status, placement });
  const chooseView = (next) => {
    setView(next);
    setActive(0);
  };

  return (
    <article
      aria-labelledby={`demo-${project.slug}`}
      className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-start"
    >
      <div className={`min-w-0 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
        {hasPhone && (
          <div className="mb-5 flex justify-center">
            <div
              role="group"
              aria-label={`${project.title} screenshot view`}
              className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1"
            >
              {[
                { id: "desktop", label: "Desktop", icon: Monitor },
                { id: "phone", label: "Phone", icon: Smartphone },
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => chooseView(option.id)}
                    aria-pressed={view === option.id}
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      view === option.id
                        ? "bg-primary text-white shadow"
                        : "text-text-light/70 dark:text-text-dark/70 hover:text-text-light dark:hover:text-text-dark"
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="relative">
          <div className="absolute -inset-3 bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary rounded-2xl blur-xl opacity-15" aria-hidden="true" />
          {phone ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => open("screenshot")}
              aria-label={`Open the ${project.title} demo in a new tab`}
              className="relative mx-auto block w-full max-w-[17.5rem] rounded-[2.25rem] border-[10px] border-gray-900 dark:border-gray-700 bg-gray-900 shadow-2xl overflow-hidden"
            >
              <SafeImage
                src={images[active]}
                alt={`${project.title} demo on a phone, ${caption ?? `screenshot ${active + 1}`}`}
                className="block w-full rounded-[1.5rem] object-cover object-top"
                sizes="280px"
              />
            </a>
          ) : (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => open("screenshot")}
              aria-label={`Open the ${project.title} demo in a new tab`}
              className="relative block overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl"
            >
              <span className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5" aria-hidden="true">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </span>
                <span className="flex-1 truncate rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1 font-mono text-[11px] text-text-light/65 dark:text-text-dark/60">
                  {host}
                </span>
              </span>
              <SafeImage
                src={images[active]}
                alt={`${project.title} demo, ${caption ?? `screenshot ${active + 1}`}`}
                className="block w-full object-cover object-top"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </a>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-5">
            <p className="min-h-[1.25rem] mb-3 text-center font-mono text-xs uppercase tracking-wider text-text-muted dark:text-gray-400" aria-live="polite">
              {caption ?? `Screen ${active + 1} of ${images.length}`}
            </p>
            <div
              className={`grid gap-2 ${phone ? "grid-cols-5 max-w-[20rem] mx-auto" : "grid-cols-6"}`}
              role="group"
              aria-label={`${project.title} screenshots`}
            >
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={captions?.[i] ?? `Show screenshot ${i + 1}`}
                  aria-pressed={i === active}
                  className={`overflow-hidden rounded-lg border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    i === active
                      ? "border-primary shadow-md"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt=""
                    className={`w-full object-cover object-top ${phone ? "aspect-[9/16]" : "aspect-[8/5]"}`}
                    sizes="110px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-2">
          {kind.badge}
        </p>
        <h2 id={`demo-${project.slug}`} className="font-display text-3xl md:text-4xl font-bold mb-3 text-text-light dark:text-text-dark">
          {project.title}
        </h2>
        <p className="text-text-light/75 dark:text-text-dark/75 leading-relaxed mb-5">{project.description}</p>

        {guide ? (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-5 mb-6">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light mb-1">
              How to try it
            </h3>
            {guide.access && (
              <p className="text-sm text-text-light/65 dark:text-text-dark/60 mb-4">{guide.access}</p>
            )}

            <ul className="space-y-3">
              {guide.roles.map((r) => (
                <li key={r.role} className="flex flex-col items-start gap-1.5 sm:flex-row sm:gap-3">
                  <span className="mt-0.5 w-[5.75rem] shrink-0 rounded-full bg-primary/10 dark:bg-primary-light/15 px-2.5 py-0.5 text-center font-mono text-[11px] font-semibold uppercase tracking-wide text-primary-dark dark:text-primary-light">
                    {r.role}
                  </span>
                  <p className="text-sm text-text-light/80 dark:text-text-dark/80 leading-relaxed">
                    {r.action} <span className="text-text-light/65 dark:text-text-dark/60">{r.detail}</span>
                  </p>
                </li>
              ))}
            </ul>

            {!!guide.samples?.length && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs font-medium text-text-light/65 dark:text-text-dark/60 mb-2">
                  Sample members for the passbook (tap to copy)
                </p>
                <ul className="space-y-2">
                  {guide.samples.map((m) => (
                    <li key={m.id} className="rounded-xl bg-gray-50 dark:bg-gray-950/60 px-3 py-2.5">
                      <p className="text-sm font-semibold">
                        {m.name} <span className="font-normal text-text-light/65 dark:text-text-dark/60">· {m.status}</span>
                      </p>
                      <p className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-text-light/65 dark:text-text-dark/60">
                        <span className="inline-flex items-center gap-1.5">
                          ID <CopyButton value={m.id} label={`${m.name} ID`} demo={project.slug} />
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          Phone <CopyButton value={m.phone} label={`${m.name} phone`} demo={project.slug} />
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(guide.tip || guide.note) && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-1.5 text-xs text-text-light/65 dark:text-text-dark/60">
                {guide.tip && <p>{guide.tip}</p>}
                {guide.note && <p>{guide.note}</p>}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-text-light/65 dark:text-text-dark/60 mb-6">{kind.summary}</p>
        )}

        {!!project.features?.length && guide && (
          <ul className="space-y-2 mb-6">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-text-light/80 dark:text-text-dark/80">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary dark:text-primary-light" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => open("button")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors"
          >
            {kind.button} <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
          <Link
            to={`/work/${project.slug}`}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold text-text-light dark:text-text-dark hover:border-primary transition-colors"
          >
            Read the case study
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <p className="mt-5 text-sm text-text-light/70 dark:text-text-dark/70">
          Want something like this for your business?{" "}
          <Link
            to={`/contact?demo=${project.slug}`}
            onClick={() => trackEvent("demo_quote_click", { demo: project.slug })}
            className="font-semibold text-primary dark:text-primary-light hover:underline"
          >
            Get a quote
          </Link>
        </p>
      </div>
    </article>
  );
};

// Wake any demo API that sleeps when idle. A no-cors GET is enough: the response
// is never read, only the wake-up matters, and failures are ignored.
const warmDemos = () => {
  demoProjects.forEach((project) => {
    if (!project.demoWarmup) return;
    fetch(project.demoWarmup, { mode: "no-cors", cache: "no-store" }).catch(() => {});
  });
};

const Demos = () => {
  useEffect(warmDemos, []);

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <SEOHead {...pageSeo.demos} jsonLd={DEMOS_SCHEMA} />

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(100,116,139,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.13) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 25%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, #000 25%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-10 md:pb-14">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light">
            <span className="h-px w-8 bg-primary/60 dark:bg-primary-light/60" aria-hidden="true" />
            Demos
          </p>
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-bold font-display leading-[1.1] tracking-tight text-balance mb-4">
            Try the work, <span className="text-primary dark:text-primary-light">don&apos;t just look at it.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-text-muted dark:text-gray-300 leading-relaxed max-w-3xl mb-8">
            Screenshots only show so much. These are working builds you can open and click through, with sample data, so you can see how a custom system behaves before you commission one.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reassurances.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex items-start gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-4">
                  <Icon className="w-5 h-5 mt-0.5 shrink-0 text-primary dark:text-primary-light" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-text-muted dark:text-gray-400 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      <section className="px-4 md:px-6 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
          {demoProjects.map((project, index) => (
            <DemoRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section className="px-4 md:px-6 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto rounded-3xl bg-gray-900 dark:bg-gray-800 text-white px-6 py-10 sm:px-12 sm:py-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Want a system like this for your business?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-7">
            Tell me how you run things today and I&apos;ll reply with honest advice and a clear quote in KES.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
            >
              Start a project <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="https://wa.me/254746527253"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              WhatsApp me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demos;

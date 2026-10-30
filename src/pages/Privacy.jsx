import SEOHead from "@/components/SEO/SEOHead";
import pageSeo from "@/data/pageSeo";
import { LOCATION_LABEL } from "@/data/location";

const UPDATED = "16 October 2026";

// Describes what this site actually does: the contact form (sent via EmailJS),
// Google Analytics 4, the saved light/dark preference and Netlify hosting.
// If any of those change, update this page.
const sections = [
  {
    title: "Who we are",
    blocks: [
      {
        p: `GlimmerInk Creations is a web design and development business run by Ehud Mwai in ${LOCATION_LABEL}. This policy explains what personal information this website (glimmerink.co.ke) collects, why, and the choices you have.`,
      },
    ],
  },
  {
    title: "What we collect",
    blocks: [
      {
        h: "Information you give us",
        p: "When you use the contact form we collect your name, email address, phone number (optional), the service you are interested in, a subject and your message. We also keep what you send us by email, phone call or WhatsApp.",
      },
      {
        h: "Usage information",
        p: "We use Google Analytics 4 to understand how the site is used. It collects information such as the pages you view, how long you stay, your device and browser type, the website you came from and your approximate location (country or city level). It uses cookies or similar identifiers to do this.",
      },
      {
        h: "Your preferences",
        p: "If you switch between light and dark mode, your choice is saved in your browser so the site remembers it. This stays on your device.",
      },
    ],
  },
  {
    title: "How we use it",
    blocks: [
      {
        list: [
          "To reply to your enquiry and prepare a quote",
          "To deliver the work you ask for and keep a record of the project",
          "To understand which pages are useful and improve the site",
          "To keep the site secure and working properly",
        ],
      },
      { p: "We do not sell your personal information." },
    ],
  },
  {
    title: "Who we share it with",
    blocks: [
      { p: "We use a small number of service providers to run the site. They process information only to provide their service:" },
      {
        list: [
          "EmailJS, which delivers your contact form message to our email inbox",
          "Google, for Analytics and for the email service that receives your messages",
          "Netlify, which hosts the website",
        ],
      },
      {
        p: "Some of these providers process data outside Kenya. We may also share information where the law requires it.",
      },
    ],
  },
  {
    title: "How long we keep it",
    blocks: [
      {
        p: "We keep enquiries for as long as needed to respond to you and to handle any resulting project, and as the law requires. You can ask us to delete your information at any time (see below).",
      },
    ],
  },
  {
    title: "Your rights",
    blocks: [
      { p: "Under the Kenya Data Protection Act, 2019 you have the right to:" },
      {
        list: [
          "Ask what personal information we hold about you",
          "Ask us to correct information that is wrong",
          "Ask us to delete your information",
          "Object to how we use it, or withdraw consent you have given",
        ],
      },
      {
        p: "To use any of these rights, contact us using the details below. If you are not satisfied with our response, you can complain to the Office of the Data Protection Commissioner in Kenya.",
      },
    ],
  },
  {
    title: "Cookies",
    blocks: [
      {
        p: "The only cookies or similar identifiers on this site come from Google Analytics. You can block or delete cookies in your browser settings, or install Google's Analytics opt-out browser add-on. The site works normally without them.",
      },
    ],
  },
  {
    title: "Security and children",
    blocks: [
      {
        p: "The site is served over HTTPS and we take reasonable steps to protect the information you send us. This website is not aimed at children, and we do not knowingly collect their information.",
      },
    ],
  },
  {
    title: "Changes to this policy",
    blocks: [
      { p: `We may update this policy from time to time. The date at the top shows when it was last changed.` },
    ],
  },
  {
    title: "Contact us",
    blocks: [
      {
        p: "For any privacy question or request, email nyamuehud@gmail.com or call +254 746 527 253.",
      },
    ],
  },
];

const Privacy = () => (
  <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen">
    <SEOHead {...pageSeo.privacy} />

    <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16 md:pt-16 md:pb-24">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light">
        <span className="h-px w-8 bg-primary/60 dark:bg-primary-light/60" aria-hidden="true" />
        Legal
      </p>
      <h1 className="font-display text-[2rem] sm:text-5xl font-bold leading-[1.1] tracking-tight mb-3">Privacy Policy</h1>
      <p className="text-sm text-text-light/65 dark:text-text-dark/60 mb-10">Last updated: {UPDATED}</p>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-3">{section.title}</h2>
            <div className="space-y-3">
              {section.blocks.map((block, index) => (
                <div key={index}>
                  {block.h && <h3 className="font-semibold mb-1">{block.h}</h3>}
                  {block.p && (
                    <p className="text-text-light/80 dark:text-text-dark/80 leading-relaxed">{block.p}</p>
                  )}
                  {block.list && (
                    <ul className="space-y-2 pl-1">
                      {block.list.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-text-light/80 dark:text-text-dark/80">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  </div>
);

export default Privacy;

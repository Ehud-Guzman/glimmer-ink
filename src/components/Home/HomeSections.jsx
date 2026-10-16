import ServicesGallery from "@/components/Home/ServicesGallery";
import ProcessSection from "@/components/Home/ProcessSection";
import LocalSection from "@/components/Home/LocalSection";
import FlagshipClient from "@/components/Home/FlagshipClient";
import ServicesOverview from "@/components/Home/ServicesOverview";
import ContactTestimonials from "@/components/Contact/ContactTestimonials";
import CTASection from "@/components/Home/CTASection";

// Everything below the hero. Home loads this as its own chunk so the first
// screen can hydrate without waiting for (or paying for) the rest of the page.
const HomeSections = () => (
  <>
    {/* ── FLAGSHIP CLIENT ───────────────────── */}
    <FlagshipClient />

    {/* ── FEATURED WORK ─────────────────────── */}
    <section id="work">
      <ServicesGallery mode="home" />
    </section>

    {/* ── SERVICES + PRICES ─────────────────── */}
    <ServicesOverview />

    {/* ── CLIENT FEEDBACK ───────────────────── */}
    <ContactTestimonials className="pb-12 md:pb-16 px-4 sm:px-6" />

    {/* ── LOCAL (Busia) ─────────────────────── */}
    <LocalSection />

    {/* ── PROCESS ───────────────────────────── */}
    <section id="process">
      <ProcessSection />
    </section>

    {/* ── CTA ───────────────────────────────── */}
    <section id="contact">
      <CTASection />
    </section>
  </>
);

export default HomeSections;

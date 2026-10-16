import ContactHero from "../components/Contact/ContactHero";
import ContactForm from "../components/Contact/ContactForm";
import ContactInfo from "../components/Contact/ContactInfo";
import ContactTestimonials from "../components/Contact/ContactTestimonials";
import SEOHead from "../components/SEO/SEOHead";
import pageSeo from "../data/pageSeo";
import { contactPage } from "../data/schema";

const CONTACT_SCHEMA = [contactPage()];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <SEOHead {...pageSeo.contact} jsonLd={CONTACT_SCHEMA} />

      <ContactHero />

      {/* Form + direct contact details (email, phone, WhatsApp, hours) */}
      <section className="py-8 md:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="min-w-0">
            <ContactForm />
          </div>

          <div className="min-w-0">
            <ContactInfo />
          </div>
        </div>
      </section>

      <ContactTestimonials className="pt-4 pb-14 md:pb-20 px-4 sm:px-6" />
    </div>
  );
};

export default Contact;

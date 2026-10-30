import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "@/utils/motion";
import { useSearchParams } from "react-router-dom";
import { Send, Loader, User, Mail, Phone, MessageSquare, Gift } from "lucide-react";
import { developmentProjects } from "@/data/developmentProjects";
import { trackEvent } from "@/utils/analytics";
import { useSeason } from "@/utils/season";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = ({ preset = null }) => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    subject: "",
    service: "",
    message: "",
    // Honeypot: must stay empty. Never shown to real visitors. It is deliberately
    // NOT called "company"/"website"/"url": browsers and password managers
    // autofill those, which made real people look like bots.
    hp_check: "",
  });

  // /contact?demo=<slug> comes from the Demos page. Only a known project slug is
  // used (never the raw query text), and only while the visitor has typed nothing.
  const [searchParams] = useSearchParams();
  const demoSlug = searchParams.get("demo");

  // Festive offer (null outside a season). Rendered after hydration only.
  const { offer } = useSeason();
  const offerRequested = Boolean(offer) && searchParams.get("offer") === offer.claim;

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Spam guards: an off-screen honeypot field plus a minimum fill time.
  // Real visitors never touch either one. The time guard is short on purpose:
  // autofill plus a tap can legitimately be quick, and a blocked submission
  // shows a success message while sending nothing, so a false positive loses a lead.
  const formOpenedAt = useRef(Date.now());
  const SPAM_MIN_FILL_MS = 1200;

  // EmailJS config from env (Vite)
  const emailJsConfig = useMemo(() => {
    return {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    };
  }, []);

  /* =========================
     Apply CTA preset (if any)
  ========================== */
  useEffect(() => {
    if (!preset) return;

    setFormData((prev) => ({
      ...prev,
      service: preset.service || "",
      subject: preset.subject || "",
    }));

    if (window.gtag && preset?.service) {
      window.gtag("event", "contact_intent", {
        intent: preset.service,
        source: "cta_button",
      });
    }
  }, [preset]);

  useEffect(() => {
    const demo = developmentProjects.find((p) => p.slug === demoSlug);
    if (!demo) return;

    setFormData((prev) =>
      prev.subject || prev.message
        ? prev
        : {
            ...prev,
            service: "system",
            subject: `Quote request: a system like ${demo.title}`,
            message: `Hi Ehud, I tried the ${demo.title} demo and I'd like something similar for my business.\n\nWhat I need:\n`,
          }
    );

    if (window.gtag) {
      window.gtag("event", "contact_intent", { intent: "system", source: "demos_page" });
    }
  }, [demoSlug]);

  // "Claim it" links here with ?offer=festive. Pre-fill only while the visitor has
  // typed nothing, and only if the offer is actually running.
  const claimedOffer = offerRequested ? offer : null;
  useEffect(() => {
    if (!claimedOffer) return undefined;

    setFormData((prev) =>
      prev.subject || prev.message
        ? prev
        : {
            ...prev,
            subject: claimedOffer.subject,
            message: claimedOffer.message.replace("{label}", claimedOffer.label),
          }
    );

    // Bring the form into view. Delayed a beat so it runs after the app's own
    // scroll-to-top on route change, which would otherwise win.
    const timer = setTimeout(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document
        .getElementById("contact-form")
        ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(timer);
  }, [claimedOffer]);

  /* =========================
     Auto-clear alerts
  ========================== */
  useEffect(() => {
    if (!submitStatus) return;
    const timer = setTimeout(() => setSubmitStatus(null), 7000);
    return () => clearTimeout(timer);
  }, [submitStatus]);

  /* =========================
     Handlers
  ========================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const name = formData.from_name.trim();
    const email = formData.from_email.trim();
    const msg = formData.message.trim();

    if (!name) newErrors.from_name = "Name is required";
    if (!email) newErrors.from_email = "Email is required";
    else if (!EMAIL_RE.test(email)) newErrors.from_email = "Enter a valid email";
    if (!msg) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const trackSubmit = (status, extra = {}) => {
    if (!window.gtag) return;
    window.gtag("event", "form_submit", {
      form_name: "ContactForm",
      status,
      service: formData.service || "none",
      offer: offer?.claim ?? "none",
      ...extra,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Honeypot + fill-time check. Blocked submissions still get a success
    // response so bots learn nothing, but nothing is actually sent.
    const honeypotFilled = formData.hp_check.trim() !== "";
    const tooFast = Date.now() - formOpenedAt.current < SPAM_MIN_FILL_MS;

    if (honeypotFilled || tooFast) {
      trackSubmit("blocked", { reason: honeypotFilled ? "honeypot" : "too_fast" });
      setSubmitStatus({
        type: "success",
        message: "Thanks for reaching out. I will usually reply within 24 hours.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const { serviceId, templateId, publicKey } = emailJsConfig;

    // Hard fail with a helpful message if env vars are missing
    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus({
        type: "error",
        message: "Form is not configured yet. Please contact via email/WhatsApp.",
      });
      trackSubmit("error");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send using the controlled values (no need for sendForm)
      const payload = {
        from_name: formData.from_name.trim(),
        from_email: formData.from_email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        service: formData.service,
        // The offer is tagged on the message so it is visible in the inbox.
        message: offer
          ? `${formData.message.trim()}\n\n[${offer.title}: ${offer.label} until ${offer.until}]`
          : formData.message.trim(),
      };

      // Loaded on demand: keeps the EmailJS SDK out of the initial bundle and
      // out of the prerender (SSR) pass, which never sends a form.
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(serviceId, templateId, payload, { publicKey });

      setSubmitStatus({
        type: "success",
        message: `Thanks for reaching out.${offer ? ` ${offer.thanks}` : ""} I’ll usually reply within 24 hours.`,
      });

      trackSubmit("success");
      if (offer) trackEvent("offer_claimed", { offer: offer.claim });

      setFormData({
        from_name: "",
        from_email: "",
        phone: "",
        subject: preset?.subject || "",
        service: preset?.service || "",
        message: "",
        hp_check: "",
      });
    } catch (error) {
      // EmailJS rejects with { status, text } (for example 402/429 when the plan
      // limit is reached, 412 when the connected mailbox needs re-authorising).
      // No status means the request never got there (offline, blocked).
      trackSubmit("error", { error_code: String(error?.status ?? "network") });

      setSubmitStatus({
        type: "error",
        message:
          "Your message could not be sent right now. Please email nyamuehud@gmail.com or WhatsApp +254 746 527 253 and I will reply within 24 hours.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================
     Styles
  ========================== */
  const inputClass =
    "w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-light/20";

  const errorClass = "border-red-500 focus:border-red-500 focus:ring-red-500";

  return (
    <div
      id="contact-form"
      className="scroll-mt-28 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Let’s talk about your project
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Share a few details and I’ll take it from there.
        </p>
      </div>

      {offer && (
        <div
          className={`mb-6 flex items-start gap-3 rounded-lg border p-4 text-sm ${
            offer.kind === "discount"
              ? "border-red-200 bg-red-50 text-red-900 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-100"
              : "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-100"
          }`}
          role="note"
        >
          <Gift
            className={`mt-0.5 h-4 w-4 shrink-0 ${
              offer.kind === "discount" ? "text-red-600 dark:text-red-300" : "text-blue-600 dark:text-blue-300"
            }`}
            aria-hidden="true"
          />
          <p>
            <strong className="font-semibold">{offer.title}: {offer.label} until {offer.until}.</strong>{" "}
            {offer.notice}
          </p>
        </div>
      )}

      {/* Status */}
      {submitStatus && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            submitStatus.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
          }`}
          role="status"
          aria-live="polite"
        >
          {submitStatus.message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="from_name">
              Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="from_name"
                name="from_name"
                type="text"
                value={formData.from_name}
                onChange={handleChange}
                className={`${inputClass} ${errors.from_name ? errorClass : ""}`}
                placeholder="Your name"
                autoComplete="name"
                required
                aria-invalid={!!errors.from_name}
                aria-describedby={errors.from_name ? "from_name-error" : undefined}
              />
            </div>
            {errors.from_name && (
              <p id="from_name-error" className="text-sm text-red-500 mt-1" role="alert">{errors.from_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="from_email">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="from_email"
                name="from_email"
                type="email"
                value={formData.from_email}
                onChange={handleChange}
                className={`${inputClass} ${errors.from_email ? errorClass : ""}`}
                placeholder="you@email.com"
                autoComplete="email"
                inputMode="email"
                required
                aria-invalid={!!errors.from_email}
                aria-describedby={errors.from_email ? "from_email-error" : undefined}
              />
            </div>
            {errors.from_email && (
              <p id="from_email-error" className="text-sm text-red-500 mt-1" role="alert">{errors.from_email}</p>
            )}
          </div>
        </div>

        {/* Phone + Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="phone">
              Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="+254 700 000 000"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="service">
              Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              disabled={!!preset}
              onChange={handleChange}
              className={`${inputClass} ${preset ? "opacity-80 cursor-not-allowed" : ""}`}
            >
              <option value="">Select a service</option>
              <option value="website">Business Website</option>
              <option value="system">Business System</option>
              <option value="dashboard">Dashboard / Admin UI</option>
              <option value="landing-page">Landing Page</option>
              <option value="ui-ux">UI / UX Design</option>
              <option value="seo-improvement">SEO / Site Improvement</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className={inputClass}
            placeholder="Project inquiry"
            autoComplete="off"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="message">
            Message *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`${inputClass} resize-none ${errors.message ? errorClass : ""}`}
              placeholder="Tell me about your project, timeline, or what you want to improve…"
              required
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
          </div>
          {errors.message && (
            <p id="message-error" className="text-sm text-red-500 mt-1" role="alert">{errors.message}</p>
          )}
        </div>

        {/* Spam honeypot: off-screen, ignored by real visitors and assistive tech */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="hp_check">Leave this field empty</label>
          <input
            id="hp_check"
            name="hp_check"
            type="text"
            value={formData.hp_check}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default ContactForm;

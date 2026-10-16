// FAQs for the /web-developer-busia landing page. Feeds the on-page accordion
// and the FAQPage structured data, same pattern as faqs.js. Prices are read from
// pricing.js so the copy can never drift from the /services estimator.
import { servicePricing } from "./pricing.js";
import { LOCATION } from "./location.js";

const priceOf = (id) => servicePricing.find((service) => service.id === id)?.basePrice ?? 0;
const kes = (amount) => `KES ${amount.toLocaleString("en-US")}`;

export const localFaqs = [
  {
    question: `How much does a website cost in ${LOCATION.town}?`,
    answer: `A professional business website starts from ${kes(priceOf("static"))}. A dynamic site with forms, a CMS or an admin panel starts from ${kes(priceOf("fullstack"))}, and custom management systems from ${kes(priceOf("system"))}. You get a fixed quote after a short conversation, so there are no surprises. Use the cost estimator on the Services page for a quick ballpark.`,
  },
  {
    question: "Can we meet in person?",
    answer: `Yes. I am based in ${LOCATION.town}, so meetings in ${LOCATION.town} and nearby towns such as ${LOCATION.nearbyTowns.slice(0, 3).join(", ")} are easy to arrange. For clients elsewhere in ${LOCATION.region} we work over calls, video and WhatsApp.`,
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "A small business website usually takes 2 to 4 weeks from the first conversation to going live. Larger web applications and management systems take longer, and I give you a clear timeline once the scope is agreed.",
  },
  {
    question: "Can you add M-Pesa payments to my website?",
    answer:
      "Yes. I can integrate M-Pesa and card payments for online shops, bookings and invoicing, along with an admin dashboard so you can see orders and payments in one place.",
  },
  {
    question: "Will my business show up on Google when people search in Busia?",
    answer:
      "A well-built site gives you the foundation: fast loading, mobile-friendly pages, proper titles and local structured data. I also help you set up your Google Business Profile so you appear on Google Maps and in local searches. No one can honestly promise a specific ranking, but local businesses with a good site and a complete profile have a real advantage.",
  },
  {
    question: "Do you offer support after the site goes live?",
    answer:
      "Every project includes 30 days of free support after launch for bug fixes and small updates. Ongoing maintenance, hosting help and content updates are available afterwards if you want them.",
  },
];

export default localFaqs;

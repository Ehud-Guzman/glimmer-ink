import { featurePricing, servicePricing } from "./pricing.js";
import { kes } from "../utils/format.js";

const priceOf = (id) => servicePricing.find((service) => service.id === id)?.basePrice ?? 0;

export const blogPosts = [
  {
    id: 1,
    slug: "why-your-business-in-kenya-needs-a-website",
    title: "Why Your Business in Kenya Needs a Website — Not Just a WhatsApp Number",
    excerpt:
      "Most Kenyan SMEs run entirely off WhatsApp and social media. Here's why that's costing you clients you never even knew you lost.",
    date: "2026-02-10",
    readTime: "4 min read",
    category: "Business",
    tags: ["Kenya", "Web Design", "Business", "Digital"],
    content: [
      {
        type: "p",
        text: "Ask most small business owners in Kenya how customers find them, and the answer is almost always the same: 'WhatsApp, Instagram, or someone referred them.' It works — until it doesn't.",
      },
      {
        type: "p",
        text: "The problem isn't that social media is bad. The problem is that you don't own it. A platform can change its algorithm, limit your reach, or suspend your account at any time. And none of it is searchable on Google.",
      },
      {
        type: "h2",
        text: "The Google Problem",
      },
      {
        type: "p",
        text: "When someone in Busia needs a caterer, a plumber, or a web designer, the first thing they do is Google it. If you're not on Google, you simply don't exist to that person. A WhatsApp number cannot be indexed. An Instagram profile can — but barely, and with no control over what shows up.",
      },
      {
        type: "p",
        text: "A website puts you on the map. It's a page Google can read, rank, and show to people actively searching for what you offer.",
      },
      {
        type: "h2",
        text: "Trust is Built Before the First Call",
      },
      {
        type: "p",
        text: "Kenyan consumers — especially anyone spending above KSh 10,000 — will Google you before they commit. They want to see a professional presence. A working website with your services, photos, and contact details signals legitimacy in a way a WhatsApp profile simply cannot.",
      },
      {
        type: "p",
        text: "Think of it this way: a website is your business card, brochure, storefront, and sales pitch — all available 24/7, without you having to say a word.",
      },
      {
        type: "h2",
        text: "But Websites Are Expensive, Right?",
      },
      {
        type: "p",
        text: "This is the biggest myth. A clean, professional business website does not have to cost a fortune. A 3–5 page site with your services, contact form, and basic SEO can be built and deployed for a fraction of what you'd spend on a month of paid social ads — and it keeps working long after.",
      },
      {
        type: "ul",
        items: [
          "You pay once (or in milestones), not monthly",
          "It works around the clock without you managing it",
          "It grows with your business — add pages as you expand",
          "It builds trust with new clients before they ever speak to you",
        ],
      },
      {
        type: "h2",
        text: "Start Small, Start Now",
      },
      {
        type: "p",
        text: "You don't need a complex system to start. A homepage, a services page, and a contact form is enough to establish presence and start capturing organic traffic. Build from there.",
      },
      {
        type: "p",
        text: "The businesses winning online in Kenya right now aren't always the biggest — they're the ones that showed up first.",
      },
    ],
  },
  {
    id: 2,
    slug: "5-mistakes-that-make-your-website-look-unprofessional",
    title: "5 Mistakes That Make Your Website Look Unprofessional",
    excerpt:
      "A website that looks outdated or unpolished can silently kill conversions. Here are the five most common mistakes and how to fix them.",
    date: "2026-03-05",
    readTime: "5 min read",
    category: "Design",
    tags: ["Web Design", "Conversions", "UX", "Best Practices"],
    content: [
      {
        type: "p",
        text: "You can have the best product or service in your industry and still lose clients because your website gives the wrong first impression. Design communicates trust before a single word is read.",
      },
      {
        type: "p",
        text: "Here are the five mistakes I see most often — and what to do instead.",
      },
      {
        type: "h2",
        text: "1. Generic Stock Photos",
      },
      {
        type: "p",
        text: "Nothing says 'I didn't put effort into this' like a photo of a smiling businessman in a suit shaking hands over a laptop. Visitors recognize stock photos instantly, and they undermine trust.",
      },
      {
        type: "p",
        text: "Use real photos of your work, your team, or your products. If you can't afford a photographer yet, an iPhone photo of your actual workspace beats a Shutterstock model every time.",
      },
      {
        type: "h2",
        text: "2. No Clear Call to Action",
      },
      {
        type: "p",
        text: "Every page should answer one question: what do you want the visitor to do next? If the answer is 'I'm not sure,' you have a problem. The most common mistake is having no CTA at all — or having five competing ones.",
      },
      {
        type: "p",
        text: "Pick one primary action per page. 'Get a Quote,' 'Book a Call,' or 'Contact Us.' Make it obvious, make it a button, and put it where the eye lands.",
      },
      {
        type: "h2",
        text: "3. Not Mobile-First",
      },
      {
        type: "p",
        text: "Over 80% of web traffic in Kenya comes from mobile devices. If your website looks broken or cramped on a phone, you are losing most of your visitors. This isn't optional — it's the baseline.",
      },
      {
        type: "p",
        text: "Test your site on an actual phone, not just a browser resize. Pay attention to font sizes, button tap areas, and whether images load without breaking the layout.",
      },
      {
        type: "h2",
        text: "4. The Copyright Year Is Wrong",
      },
      {
        type: "p",
        text: "It sounds minor, but a footer that says '© 2021' in 2026 signals that the site has been abandoned. It's one of the fastest ways to lose credibility, especially with corporate or enterprise clients who are evaluating whether you're still active.",
      },
      {
        type: "p",
        text: "Fix: use a dynamic year in your footer code so it updates automatically.",
      },
      {
        type: "h2",
        text: "5. Contact Form With No Feedback",
      },
      {
        type: "p",
        text: "Someone fills out your contact form and hits submit. If they see nothing — no confirmation, no 'we'll be in touch' message — they have no idea if it worked. Most will just leave, and some will assume your business is unreliable.",
      },
      {
        type: "p",
        text: "Always show a clear success state after form submission. Ideally, send an automated email confirmation. It costs nothing and immediately raises the perceived quality of your service.",
      },
      {
        type: "h2",
        text: "The Common Thread",
      },
      {
        type: "p",
        text: "Every one of these mistakes shares the same root: not thinking about the experience from the visitor's perspective. Fix them one at a time — the compounding effect on trust and conversions is worth it.",
      },
    ],
  },
  {
    id: 3,
    slug: "react-vs-wordpress-which-is-right-for-your-business",
    title: "React vs WordPress: Which Is Right for Your Kenyan Business?",
    excerpt:
      "The two most common options for building a business website couldn't be more different. Here's how to think about the choice without the tech jargon.",
    date: "2026-04-01",
    readTime: "6 min read",
    category: "Development",
    tags: ["React", "WordPress", "Web Development", "Kenya", "Tech"],
    content: [
      {
        type: "p",
        text: "One of the most common questions I get from clients is some version of: 'What should my website be built on?' Usually they've been quoted a WordPress site by one developer and a React build by another, at very different prices, with no clear explanation of why.",
      },
      {
        type: "p",
        text: "Here's the honest breakdown.",
      },
      {
        type: "h2",
        text: "What WordPress Actually Is",
      },
      {
        type: "p",
        text: "WordPress is a content management system — it's designed to make it easy for non-technical people to publish and update content. You get a dashboard, a WYSIWYG editor, plugins for almost everything, and a huge ecosystem of themes.",
      },
      {
        type: "p",
        text: "It powers roughly 40% of websites on the internet for a reason: it's accessible, well-documented, and fast to deploy for standard needs.",
      },
      {
        type: "h2",
        text: "What React Actually Is",
      },
      {
        type: "p",
        text: "React is a JavaScript library for building user interfaces. A React site is typically a custom-coded application — there's no dashboard or built-in CMS. Everything is built to spec from the ground up.",
      },
      {
        type: "p",
        text: "React sites tend to be faster, more flexible, and more tailored to specific requirements. But they require a developer to update content unless a headless CMS is added on top.",
      },
      {
        type: "h2",
        text: "The Kenya Context: Performance Matters More Here",
      },
      {
        type: "p",
        text: "Mobile data in Kenya is expensive relative to income, and many users are on 3G or patchy 4G connections. A bloated WordPress site loaded with plugins and unoptimised images can take 6–10 seconds to load on mobile — most users won't wait.",
      },
      {
        type: "p",
        text: "A well-built React site with proper image optimisation and code splitting regularly loads in under 2 seconds. For a market where mobile performance is critical, this matters.",
      },
      {
        type: "h2",
        text: "When to Choose WordPress",
      },
      {
        type: "ul",
        items: [
          "You need to publish blog posts or news articles regularly without developer help",
          "You have a large product catalog managed by non-technical staff",
          "You need e-commerce with WooCommerce (if Shopify isn't available)",
          "Budget is tight and speed-to-launch matters more than performance",
        ],
      },
      {
        type: "h2",
        text: "When to Choose React",
      },
      {
        type: "ul",
        items: [
          "You want a fast, performant site that loads well on mobile data",
          "Your site has custom interactive features (dashboards, portals, booking flows)",
          "You're building a web application, not just a brochure site",
          "You care about long-term maintainability and code quality",
        ],
      },
      {
        type: "h2",
        text: "The Honest Answer",
      },
      {
        type: "p",
        text: "For most Kenyan SMEs with a straightforward website — homepage, services, about, contact — React is the better choice if performance and professionalism are the priority. WordPress makes more sense if you need frequent content updates managed by someone without technical skills.",
      },
      {
        type: "p",
        text: "The right answer depends on what you're building and who will maintain it. A good developer should ask those questions before recommending either.",
      },
    ],
  },
  {
    id: 4,
    slug: "how-much-does-a-website-cost-in-kenya",
    title: "How Much Does a Website Cost in Kenya? A 2026 Price Guide",
    excerpt:
      "Quotes for the same website can differ by ten times. Here is what actually drives the price, with real starting figures in Kenya shillings.",
    date: "2026-10-16",
    readTime: "6 min read",
    category: "Pricing",
    tags: ["Pricing", "Kenya", "Web Design", "Budget"],
    content: [
      {
        type: "p",
        text: "Ask three developers in Kenya for a website quote and you may get three very different numbers. That is not always because someone is overcharging. A five-page brochure site and an online shop with M-Pesa payments are completely different jobs, even though both are called 'a website'.",
      },
      {
        type: "p",
        text: "Here is how pricing works, using my own starting prices as a transparent example. Other developers will differ, but the factors are the same everywhere.",
      },
      {
        type: "h2",
        text: "Typical starting prices",
      },
      {
        type: "ul",
        items: [
          `Business or portfolio website (frontend only): from ${kes(priceOf("static"))}`,
          `Dynamic website with forms, a CMS or an admin panel: from ${kes(priceOf("fullstack"))}`,
          `Mobile app (Android or cross-platform): from ${kes(priceOf("mobile"))}`,
          `Custom management system (school, office or business): from ${kes(priceOf("system"))}`,
          `SaaS product MVP: from ${kes(priceOf("saas"))}`,
        ],
      },
      {
        type: "p",
        text: "These are starting points. The final quote depends on how many pages you need, how much custom functionality is involved, and how much content you can supply yourself.",
      },
      {
        type: "h2",
        text: "What pushes the price up",
      },
      {
        type: "p",
        text: "Most of the difference between a basic site and a larger one comes down to features. These are typical add-ons:",
      },
      {
        type: "ul",
        items: featurePricing.map((feature) => `${feature.label}: about ${kes(feature.price)}`),
      },
      {
        type: "h2",
        text: "Where very cheap quotes go wrong",
      },
      {
        type: "ul",
        items: [
          "The site is a pre-made template with your logo dropped in, so it looks like everyone else's",
          "It was never tested on a phone, where most of your visitors will see it",
          "Images are not optimised, so it loads slowly on mobile data",
          "You do not control your own domain or hosting, so you cannot easily move or update the site",
          "There is no support after launch when something breaks",
        ],
      },
      {
        type: "h2",
        text: "Do not forget the running costs",
      },
      {
        type: "p",
        text: "Besides the build, a website has small ongoing costs: your domain name renews every year, and depending on how it is set up there may be hosting too. Ask your developer to list these clearly, and make sure the domain is registered in your name.",
      },
      {
        type: "h2",
        text: "How to get an accurate quote",
      },
      {
        type: "ul",
        items: [
          "Say what the website must do for your business, such as taking bookings, selling products or simply showing your services",
          "List the pages you think you need, and share examples of sites you like",
          "Say whether you need payments, user accounts or an admin area",
          "Ask for the price, timeline and what support is included, in writing",
        ],
      },
      {
        type: "p",
        text: "If you want a quick ballpark first, the cost estimator on my Services page lets you pick a project type and features and see a range straight away.",
      },
    ],
  },
  {
    id: 5,
    slug: "put-your-busia-business-on-google-maps",
    title: "How to Put Your Busia Business on Google Maps (Free Guide)",
    excerpt:
      "When someone in Busia searches for a hotel, shop or service, Google shows a map with local businesses first. Here is how to get yours in that list, for free.",
    date: "2026-10-16",
    readTime: "5 min read",
    category: "Local SEO",
    tags: ["Busia", "Google Business Profile", "Local SEO", "Kenya"],
    content: [
      {
        type: "p",
        text: "Search for 'hotel in Busia' or 'electrician in Busia' and the first thing Google shows is usually a map with a short list of local businesses, before any website. If your business is not on that map, many nearby customers will never see you, however good your work is.",
      },
      {
        type: "p",
        text: "The good news is that getting listed is free. It is done through a Google Business Profile.",
      },
      {
        type: "h2",
        text: "What a Google Business Profile is",
      },
      {
        type: "p",
        text: "It is a free listing that shows your business name, phone number, opening hours, photos, reviews and website on Google Search and Google Maps. Customers can call you or get directions with one tap.",
      },
      {
        type: "h2",
        text: "How to set it up",
      },
      {
        type: "ul",
        items: [
          "Search for 'Google Business Profile' and sign in with a Google account you will keep using for the business",
          "Enter your business name and check whether it is already listed. If it is, you can claim it instead of creating a new one",
          "Choose your main category carefully, for example 'Hotel', 'Pharmacy' or 'Web designer'. This matters a lot for which searches you appear in",
          "If customers visit you, add your address. If you travel to customers, you can hide your address and list the areas you serve, such as Busia, Malaba and Nambale",
          "Add your phone number, opening hours and website",
          "Verify the business. Google will offer a method such as a video call, phone, email or postcard, depending on your type of business",
        ],
      },
      {
        type: "h2",
        text: "Make the profile complete",
      },
      {
        type: "p",
        text: "Complete profiles are easier for customers to trust and for Google to match to searches. Add real photos of your premises, your work and your team, write a short description of what you offer, and list your main services or products with prices if you can.",
      },
      {
        type: "h2",
        text: "Ask for reviews, and answer them",
      },
      {
        type: "p",
        text: "Reviews are one of the strongest signals on a local profile. After a job goes well, ask the customer to leave a review and send them the link. Reply to every review, good or bad, politely. Never buy or fake reviews: it breaks Google's rules and can get your profile removed.",
      },
      {
        type: "h2",
        text: "Keep your details identical everywhere",
      },
      {
        type: "p",
        text: "Use exactly the same business name, phone number and location on your Google profile, your website, Facebook, Instagram and anywhere else you are listed. Consistent details help Google trust that it is one real business.",
      },
      {
        type: "h2",
        text: "Why you still want a website",
      },
      {
        type: "p",
        text: "A profile gets you found on the map, but a website is where customers learn more and decide to contact you. Linking your site from your profile, and having a page that clearly says what you offer and where, strengthens both. If you need help with either, get in touch.",
      },
    ],
  },
  {
    id: 6,
    slug: "how-to-choose-a-web-developer-in-busia",
    title: "How to Choose a Web Developer in Busia: 7 Questions to Ask Before You Pay",
    excerpt:
      "Hiring the wrong developer can cost you money and months. These seven questions help Busia business owners spot a good one before paying a shilling.",
    date: "2026-10-16",
    readTime: "6 min read",
    category: "Business",
    tags: ["Busia", "Web Developer", "Hiring", "Kenya"],
    content: [
      {
        type: "p",
        text: "Most business owners in Busia have heard at least one story: someone paid a deposit, the developer went quiet, and the website never appeared, or it appeared broken and nobody could fix it. You do not need to understand code to avoid this. You only need to ask the right questions.",
      },
      {
        type: "h2",
        text: "1. Can I see websites you have built, and can I open them?",
      },
      {
        type: "p",
        text: "Ask for live links, not screenshots. Open them on your phone. Do they load quickly? Do they look right on a small screen? Can you tell who the client was? A developer with real work will happily share it, and will often explain what the client needed and how the site solved it.",
      },
      {
        type: "h2",
        text: "2. Who owns the domain, the hosting and the files?",
      },
      {
        type: "p",
        text: "Your domain name (for example yourbusiness.co.ke) should be registered in your name, not the developer's. You should also receive your site files and logins at the end of the project. If a developer keeps control of these, you cannot move to someone else without starting again.",
      },
      {
        type: "h2",
        text: "3. Is the price fixed and written down?",
      },
      {
        type: "p",
        text: "A good quote lists what you are getting, how long it will take, what it costs and when payments are due. Be careful with a vague 'we will see as we go' arrangement. Paying in milestones, for example part upfront, part midway and the rest on completion, protects both sides.",
      },
      {
        type: "h2",
        text: "4. Will it work well on a phone?",
      },
      {
        type: "p",
        text: "Most people in Kenya browse on their phones, often on mobile data. Ask how the developer tests on phones and what they do to keep pages light. A site that only looks good on a laptop is half a website.",
      },
      {
        type: "h2",
        text: "5. Can it take the payments and bookings I need?",
      },
      {
        type: "p",
        text: "If you want to sell online or take bookings, ask specifically about M-Pesa and card payments, and about how you will see orders and payments afterwards. A developer who has built this before will answer clearly.",
      },
      {
        type: "h2",
        text: "6. What happens after the site goes live?",
      },
      {
        type: "p",
        text: "Websites need small fixes and updates. Ask whether support is included and for how long, who you call when something breaks, and what ongoing maintenance costs. 'No support after launch' is a warning sign.",
      },
      {
        type: "h2",
        text: "7. Can we meet, or at least talk easily?",
      },
      {
        type: "p",
        text: "Working with someone nearby has real advantages: you can meet, show them your business and sort misunderstandings quickly. Whether local or remote, check that they reply promptly and explain things in plain language. How they communicate during the quote is how they will communicate during the project.",
      },
      {
        type: "h2",
        text: "Red flags to watch for",
      },
      {
        type: "ul",
        items: [
          "A price far below everyone else's, with no explanation of what is cut",
          "Pressure to pay the full amount upfront",
          "No examples of real, live work",
          "Refusing to put the scope and price in writing",
          "Registering your domain or hosting in their own name",
        ],
      },
      {
        type: "p",
        text: "I am a web developer based in Busia, and I am happy to answer all seven of these questions for my own work. If you would like a clear, written quote for a website or system for your business, get in touch.",
      },
    ],
  },
];

export const getBlogPost = (slug) => blogPosts.find((p) => p.slug === slug) || null;

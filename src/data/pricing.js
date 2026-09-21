// Pricing data for the /services cost estimator and the KES Offer structured
// data. Kept free of JSX so the prerender script can import it in Node too.
export const servicePricing = [
  { id: "static", label: "Website (Frontend Only)", description: "Static business or portfolio website", basePrice: 20000, timeline: 2, includedFeatures: [] },
  { id: "fullstack", label: "Website (Frontend + Backend)", description: "Dynamic site with forms, CMS or admin panel", basePrice: 40000, timeline: 3, includedFeatures: ["admin"] },
  { id: "saas", label: "SaaS MVP", description: "Core features to validate your idea", basePrice: 150000, timeline: 6, includedFeatures: ["admin", "api"] },
  { id: "saas-pro", label: "SaaS Pro", description: "Advanced SaaS with scaling in mind", basePrice: 300000, timeline: 9, includedFeatures: ["admin", "api"] },
  { id: "mobile", label: "Mobile App", description: "Android / cross-platform mobile app", basePrice: 70000, timeline: 6, includedFeatures: [] },
  { id: "system", label: "Custom System", description: "School, business or internal management system", basePrice: 100000, timeline: 6, includedFeatures: ["admin"] },
];

export const featurePricing = [
  { id: "auth", label: "User Authentication", price: 8000 },
  { id: "payment", label: "Payments (M-Pesa / Cards)", price: 12000 },
  { id: "admin", label: "Admin Dashboard", price: 10000 },
  { id: "api", label: "Third-party API Integration", price: 8000 },
  { id: "realtime", label: "Real-time Features", price: 12000 },
  { id: "analytics", label: "Analytics Dashboard", price: 7000 },
  { id: "multilang", label: "Multi-language Support", price: 5000 },
  { id: "responsive", label: "Advanced Responsiveness", price: 5000 },
];

export const budgetLimits = {
  starter: { min: 20000, max: 90000 },
  growth: { min: 90000, max: 200000 },
  pro: { min: 200000, max: Number.POSITIVE_INFINITY },
};

export const budgetRanges = [
  { id: "starter", label: "KES 20K - 90K", description: "Starter / MVP" },
  { id: "growth", label: "KES 90K - 200K", description: "Growing product" },
  { id: "pro", label: "KES 200K+", description: "Advanced system" },
];

export const priceRangeLabel = "KES 20,000 - KES 300,000+";

export default servicePricing;

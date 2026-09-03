export interface Plan {
  id: string;
  num: string;
  name: string;
  tagline: string;
  summary: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "basic",
    num: "01",
    name: "Basic",
    tagline: "For businesses that need a professional online presence.",
    summary: "Professional responsive website (up to 5 pages) with contact form, WhatsApp integration, and fast deployment.",
    features: [
      "Professional responsive website",
      "Up to 5 pages",
      "Mobile + desktop optimization",
      "Contact / enquiry form",
      "WhatsApp integration",
      "Basic SEO setup",
      "Social media links",
      "Fast-loading optimized design",
      "Basic deployment/setup",
    ],
    cta: "Start Basic",
    popular: false,
  },
  {
    id: "medium",
    num: "02",
    name: "Medium",
    tagline: "For businesses that want a stronger website and more customer-focused functionality.",
    summary: "Custom UI/UX design (up to 10 pages) with booking functionality, interactive maps, analytics, and advanced SEO.",
    features: [
      "Everything in Basic, plus:",
      "Up to 10 pages",
      "Custom UI/UX design",
      "Advanced animations",
      "Google Maps integration",
      "Booking / enquiry functionality",
      "Advanced SEO setup",
      "Google Analytics integration",
      "Gallery / portfolio section",
      "Performance optimization",
      "Deployment + configuration",
    ],
    cta: "Choose Medium",
    popular: true,
  },
  {
    id: "high",
    num: "03",
    name: "High",
    tagline: "For businesses that need a complete custom digital solution.",
    summary: "Fully custom digital solution with tailored business workflows, admin/dashboard, database, API integrations, and priority support.",
    features: [
      "Everything in Medium, plus:",
      "Fully custom website",
      "Advanced business functionality",
      "Custom dashboard / admin",
      "Database integration",
      "Advanced booking / lead systems",
      "Custom API integrations",
      "Advanced SEO",
      "Conversion-focused UX",
      "Priority development",
      "Post-launch support",
    ],
    cta: "Build My Solution",
    popular: false,
  },
];

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id.toLowerCase() === id.toLowerCase());
}

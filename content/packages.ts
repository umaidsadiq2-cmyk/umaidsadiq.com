/**
 * Monthly packages for the homepage pricing section.
 *
 * DRAFT CONTENT. The tiers and inclusions are a starting structure and every
 * price is a placeholder ("__"). While `draft` is true the section renders
 * only in local development, never on the live site. To publish: set the
 * real prices and inclusions, then flip `draft` to false.
 */
export type Package = {
  name: string;
  /** One line on who the package is for. */
  forWho: string;
  price: string;
  period: string;
  includes: string[];
  /** The tier most clients should pick; it gets the highlighted card. */
  featured?: boolean;
};

export const packagesDraft = true;

export const packages: Package[] = [
  {
    name: "Starter",
    forWho: "For small businesses getting consistent online.",
    price: "PKR __,___",
    period: "per month",
    includes: [
      "12 designed posts per month",
      "2 short reels",
      "Captions and hashtags",
      "Posting on Facebook and Instagram",
      "Monthly performance summary",
    ],
  },
  {
    name: "Growth",
    forWho: "For brands ready to turn followers into customers.",
    price: "PKR __,___",
    period: "per month",
    featured: true,
    includes: [
      "20 designed posts per month",
      "6 short reels",
      "Meta Ads management (ad budget separate)",
      "Audience targeting and retargeting",
      "Page management and replies",
      "Monthly report with leads and cost per lead",
    ],
  },
  {
    name: "Full Brand",
    forWho: "For businesses that want everything handled in one place.",
    price: "PKR __,___",
    period: "per month",
    includes: [
      "Everything in Growth",
      "30 posts and 10 reels per month",
      "AI video ads",
      "Local SEO and Google Business Profile",
      "Website updates and landing pages",
      "Priority support on WhatsApp",
    ],
  },
];

/** Shown under the cards: what does not fit a monthly package. */
export const packagesNote =
  "Need a website, ERP or CRM system? Those are quoted per project. Create a meeting and I will send a clear quote.";

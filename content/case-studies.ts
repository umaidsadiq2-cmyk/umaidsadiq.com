/**
 * Case studies for the homepage.
 *
 * DRAFT CONTENT. The clients and the work are real (taken from their Facebook
 * recommendations), but every number in `results` is a placeholder marked
 * with "__". While `draft` is true the entry renders only in local
 * development, never on the live site, so a made-up result can't reach a
 * real visitor. To publish one: replace the "__" figures with real numbers
 * from the client's account, then set `draft: false`.
 */
export type CaseStudy = {
  client: string;
  industry: string;
  /** What was wrong before the work started. */
  challenge: string;
  /** What was actually done, in plain words. */
  work: string[];
  /** Headline numbers. Keep each one short: a figure plus what it measures. */
  results: { metric: string; label: string }[];
  /** Group chips matching the services section. */
  services: string[];
  draft: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "Sahar Automotive",
    industry: "Lubricants manufacturer",
    challenge:
      "A strong product with almost no online presence. Posts were irregular, the page looked unbranded, and no paid campaigns were running to reach distributors or mechanics.",
    work: [
      "Ran Meta Ads campaigns aimed at distributors and workshop owners",
      "Designed a consistent, professional post style for the brand",
      "Produced short video ads for the lubricant range",
    ],
    results: [
      { metric: "+__%", label: "page reach in 90 days" },
      { metric: "__", label: "distributor inquiries" },
      { metric: "PKR __", label: "cost per lead" },
    ],
    services: ["Meta Ads", "Graphic Design", "Video Editing"],
    draft: true,
  },
  {
    client: "SA Decor",
    industry: "Event management",
    challenge:
      "Beautiful events, but the online presence did not show it. No website to send clients to, and social posts did not reflect the quality of the work.",
    work: [
      "Built a clean, modern website that showcases past events",
      "Ran Meta Ads campaigns for event bookings",
      "Designed social posts and produced video ads from event footage",
    ],
    results: [
      { metric: "__", label: "booking inquiries per month" },
      { metric: "+__%", label: "Instagram followers" },
      { metric: "__ days", label: "website delivered in" },
    ],
    services: ["Web & Software", "Meta Ads", "Video Editing"],
    draft: true,
  },
  {
    client: "Noor Accounting & Tax Services",
    industry: "Accounting and tax firm",
    challenge:
      "A professional service that needed to look trustworthy online, with no website and very little reach beyond word of mouth.",
    work: [
      "Developed a professional website for the firm",
      "Managed Meta Ads campaigns to reach small business owners",
      "Designed social posts and produced professional video ads",
    ],
    results: [
      { metric: "+__%", label: "social engagement" },
      { metric: "__", label: "client inquiries from ads" },
      { metric: "__", label: "new clients in 3 months" },
    ],
    services: ["Web & Software", "Meta Ads", "Graphic Design"],
    draft: true,
  },
];

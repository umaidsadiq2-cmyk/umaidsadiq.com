/**
 * Real client recommendations, taken from the reviews on Umaid's Facebook
 * page (see `reviewsUrl`). Quotes are trimmed for length but never reworded,
 * so every line here is something the client actually said.
 *
 * `highlight` must be an exact substring of `quote`; it is the line the
 * section emphasises. `services` lists only what the client's own review
 * mentions.
 *
 * Only real signals belong in this file. The earlier placeholder logos and
 * metrics were removed: a made-up client or number on a live site costs far
 * more trust than it could ever earn.
 */
export const reviewsUrl =
  "https://www.facebook.com/profile.php?id=61568369712322&sk=reviews";

export type Testimonial = {
  quote: string;
  highlight: string;
  author: string;
  role: string;
  services: string[];
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Umaid has done an outstanding job managing our Meta Ads campaigns, designing professional social media posts, and creating engaging video ads for our lubricant products. Thanks to his strategies and quality work, our brand visibility and online presence have significantly improved.",
    highlight: "our brand visibility and online presence have significantly improved",
    author: "Sahar Automotive",
    role: "Lubricants manufacturer",
    services: ["Meta Ads", "Post design", "Video ads"],
  },
  {
    quote:
      "He managed our Meta Ads campaigns, designed high quality social media posts, created professional video ads, and also developed our website professionally. Thanks to his efforts, our brand presence and engagement on social media have improved significantly. 100% recommended!",
    highlight: "our brand presence and engagement on social media have improved significantly",
    author: "Noor Accounting & Tax Services",
    role: "Accounting and tax firm",
    services: ["Meta Ads", "Post design", "Video ads", "Website"],
  },
  {
    quote:
      "He handled our Meta Ads campaigns, designed creative social media posts, and produced high quality video ads that helped our brand look more professional online. He also developed our website, and the result was a clean, modern, and professional platform that perfectly represents our business.",
    highlight: "a clean, modern, and professional platform that perfectly represents our business",
    author: "SA Decor",
    role: "Event management",
    services: ["Meta Ads", "Post design", "Video ads", "Website"],
  },
  {
    quote:
      "Highly professional and very skilled in Meta Ads, social media post design, and video advertisements. His creative ideas and marketing strategies helped us present our real estate projects in a more professional and attractive way online.",
    highlight: "in a more professional and attractive way online",
    author: "Hamza Associates",
    role: "Real estate agency",
    services: ["Meta Ads", "Post design", "Video ads"],
  },
  {
    quote:
      "As a travel agency, it's very important for us to have a strong online presence, and Umaid helped us achieve that professionally. His work is creative, professional, and always delivered on time. He understands how to grow social media pages and attract the right audience.",
    highlight: "always delivered on time",
    author: "Travmark",
    role: "Travel agency",
    services: ["Social media marketing"],
  },
];

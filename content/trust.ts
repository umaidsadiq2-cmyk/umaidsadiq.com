import { trustSignalSchema, type TrustSignal } from "@/lib/schemas";
import { z } from "zod";

/**
 * Real client recommendations, taken from the reviews on Umaid's Facebook
 * page (see `reviewsUrl`). Quotes are trimmed for length but never reworded,
 * so every line here is something the client actually said.
 *
 * Only real signals belong in this file. The earlier placeholder logos and
 * metrics were removed: a made-up client or number on a live site costs far
 * more trust than it could ever earn.
 */
export const reviewsUrl =
  "https://www.facebook.com/profile.php?id=61568369712322&sk=reviews";

export const trustSignals: TrustSignal[] = z.array(trustSignalSchema).parse([
  {
    type: "testimonial",
    order: 0,
    testimonial: {
      quote:
        "Umaid has done an outstanding job managing our Meta Ads campaigns, designing professional social media posts, and creating engaging video ads for our lubricant products. Thanks to his strategies and quality work, our brand visibility and online presence have significantly improved.",
      author: "Sahar Automotive",
      role: "Lubricants manufacturer",
    },
  },
  {
    type: "testimonial",
    order: 1,
    testimonial: {
      quote:
        "He managed our Meta Ads campaigns, designed high quality social media posts, created professional video ads, and also developed our website professionally. Thanks to his efforts, our brand presence and engagement on social media have improved significantly. 100% recommended!",
      author: "Noor Accounting & Tax Services",
      role: "Accounting and tax firm",
    },
  },
  {
    type: "testimonial",
    order: 2,
    testimonial: {
      quote:
        "He handled our Meta Ads campaigns, designed creative social media posts, and produced high quality video ads that helped our brand look more professional online. He also developed our website, and the result was a clean, modern, and professional platform that perfectly represents our business.",
      author: "SA Decor",
      role: "Event management",
    },
  },
  {
    type: "testimonial",
    order: 3,
    testimonial: {
      quote:
        "Highly professional and very skilled in Meta Ads, social media post design, and video advertisements. His creative ideas and marketing strategies helped us present our real estate projects in a more professional and attractive way online.",
      author: "Hamza Associates",
      role: "Real estate agency",
    },
  },
  {
    type: "testimonial",
    order: 4,
    testimonial: {
      quote:
        "As a travel agency, it's very important for us to have a strong online presence, and Umaid helped us achieve that professionally. His work is creative, professional, and always delivered on time. He understands how to grow social media pages and attract the right audience.",
      author: "Travmark",
      role: "Travel agency",
    },
  },
]);

export const testimonials = trustSignals
  .filter((t): t is Extract<TrustSignal, { type: "testimonial" }> => t.type === "testimonial")
  .sort((a, b) => a.order - b.order)
  .map((t) => t.testimonial);

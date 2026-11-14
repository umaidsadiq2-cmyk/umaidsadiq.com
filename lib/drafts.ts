/**
 * Draft content (placeholder prices, made-up case study numbers) is shown only
 * while developing locally. A production build, which is what the live site
 * runs, leaves it out, so placeholders can never reach a real visitor.
 */
export const showDrafts = process.env.NODE_ENV !== "production";

// ------------------------------------------------------------------
// Founding-client offer shown as a poster on the home and Services pages.
// Update `claimed` as clients sign up; the poster hides itself once
// every spot is taken, or when `active` is false.
// ------------------------------------------------------------------

export const offer = {
  active: true,
  total: 10,
  claimed: 3,
  // Set e.g. "30% off" to show the exact amount; null shows "Big discount"
  discount: null as string | null,
  perks: ["Websites, systems, AI & apps", "Same quality, lower price", "Direct line to me"],
};

export const spotsLeft = Math.max(0, offer.total - offer.claimed);
export const offerOpen = offer.active && spotsLeft > 0;

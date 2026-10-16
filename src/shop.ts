/**
 * Single source of truth for Top Tier Motorworks' contact + hours details.
 * These are placeholders — swap in the real shop info before launch.
 */
export const SHOP = {
  name: "Top Tier Motorworks",
  tagline: "Performance & repair",
  domain: "toptiermotorworks.ca",
  phone: "(905) 555-0142",
  phoneHref: "tel:+19055550142",
  email: "service@toptiermotorworks.ca",
  address: {
    line1: "1420 Gearbox Lane, Unit 4",
    line2: "Mississauga, ON  L5T 2K9",
  },
  mapHref: "https://maps.google.com/?q=Top+Tier+Motorworks+Mississauga",
  // 0 = Sunday … 6 = Saturday. [openMinutes, closeMinutes] or null when closed.
  hours: [
    { day: "Sunday", short: "Sun", range: null as null | [number, number] },
    { day: "Monday", short: "Mon", range: [8 * 60, 18 * 60] as [number, number] },
    { day: "Tuesday", short: "Tue", range: [8 * 60, 18 * 60] as [number, number] },
    { day: "Wednesday", short: "Wed", range: [8 * 60, 18 * 60] as [number, number] },
    { day: "Thursday", short: "Thu", range: [8 * 60, 18 * 60] as [number, number] },
    { day: "Friday", short: "Friday", range: [8 * 60, 18 * 60] as [number, number] },
    { day: "Saturday", short: "Sat", range: [9 * 60, 15 * 60] as [number, number] },
  ],
};

export function hoursLabel(range: [number, number] | null): string {
  if (!range) return "Closed";
  const fmt = (m: number) => {
    const h = Math.floor(m / 60);
    const min = m % 60;
    const ap = h >= 12 ? "pm" : "am";
    const h12 = ((h + 11) % 12) + 1;
    return min ? `${h12}:${String(min).padStart(2, "0")}${ap}` : `${h12}${ap}`;
  };
  return `${fmt(range[0])} – ${fmt(range[1])}`;
}

/** Client-side open/closed check for "now". Returns null until hydrated. */
export function isOpenNow(now = new Date()): boolean {
  const today = SHOP.hours[now.getDay()];
  if (!today.range) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= today.range[0] && mins < today.range[1];
}

export const SERVICE_OPTIONS = [
  "Maintenance & oil change",
  "Brakes & suspension",
  "Diagnostics & check-engine",
  "Tires & wheel alignment",
  "Performance tuning",
  "Inspection / pre-purchase",
  "Air conditioning & heating",
  "Something else",
];

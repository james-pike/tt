import { component$ } from "@builder.io/qwik";

type P = { class?: string; style?: string };
const S = {
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.6",
  "stroke-linecap": "round" as const,
  "stroke-linejoin": "round" as const,
};

export const IconPhone = component$<P>((p) => (
  <svg class={p.class} width="18" height="18" viewBox="0 0 24 24" {...S}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
  </svg>
));

export const IconMenu = component$<P>((p) => (
  <svg class={p.class} width="22" height="22" viewBox="0 0 24 24" {...S}>
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
));

export const IconClose = component$<P>((p) => (
  <svg class={p.class} width="22" height="22" viewBox="0 0 24 24" {...S}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
));

export const IconSun = component$<P>((p) => (
  <svg class={p.class} width="19" height="19" viewBox="0 0 24 24" {...S}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
));

export const IconMoon = component$<P>((p) => (
  <svg class={p.class} width="19" height="19" viewBox="0 0 24 24" {...S}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
));

export const IconCheck = component$<P>((p) => (
  <svg class={p.class} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
));

export const IconMapPin = component$<P>((p) => (
  <svg class={p.class} width="16" height="16" viewBox="0 0 24 24" {...S}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
));

export const IconMail = component$<P>((p) => (
  <svg class={p.class} width="16" height="16" viewBox="0 0 24 24" {...S}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
));

export const IconChevron = component$<P>((p) => (
  <svg class={p.class} style={p.style} width="18" height="18" viewBox="0 0 24 24" {...S}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
));

export const IconClock = component$<P>((p) => (
  <svg class={p.class} width="16" height="16" viewBox="0 0 24 24" {...S}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
));

/* ---- service icons ---- */
export const IconWrench = component$<P>((p) => (
  <svg class={p.class} viewBox="0 0 24 24" {...S}>
    <path d="M14.7 6.3a4 4 0 0 0 5 5l-9 9a2.8 2.8 0 0 1-4-4l9-9Z" />
    <path d="M14.7 6.3 18 3a4 4 0 0 0-5 5l-7 7" />
  </svg>
));

export const IconDisc = component$<P>((p) => (
  <svg class={p.class} viewBox="0 0 24 24" {...S}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
  </svg>
));

export const IconScan = component$<P>((p) => (
  <svg class={p.class} viewBox="0 0 24 24" {...S}>
    <path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2" />
    <path d="M7 12h2l1.5-3 3 6L15 12h2" />
  </svg>
));

export const IconTire = component$<P>((p) => (
  <svg class={p.class} viewBox="0 0 24 24" {...S}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3.2v4.3M12 16.5v4.3M3.2 12h4.3M16.5 12h4.3" />
  </svg>
));

export const IconGauge = component$<P>((p) => (
  <svg class={p.class} viewBox="0 0 24 24" {...S}>
    <path d="M4 18a9 9 0 1 1 16 0" />
    <path d="m12 14 4-4" />
    <circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none" />
  </svg>
));

export const IconClipboard = component$<P>((p) => (
  <svg class={p.class} viewBox="0 0 24 24" {...S}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9V4Z" />
    <path d="M8.5 11l1.5 1.5L13 9M8.5 16l1.5 1.5L13 14" />
  </svg>
));

export const IconSnow = component$<P>((p) => (
  <svg class={p.class} viewBox="0 0 24 24" {...S}>
    <path d="M12 2v20M4.2 7l15.6 10M19.8 7 4.2 17" />
    <path d="M12 6l2-2M12 6l-2-2M12 18l2 2M12 18l-2 2" />
  </svg>
));

export const IconSpark = component$<P>((p) => (
  <svg class={p.class} viewBox="0 0 24 24" {...S}>
    <path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9Z" />
  </svg>
));

/* ---- assurance icons ---- */
export const IconShield = component$<P>((p) => (
  <svg class={p.class} width="22" height="22" viewBox="0 0 24 24" {...S}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
));
export const IconBolt = component$<P>((p) => (
  <svg class={p.class} width="22" height="22" viewBox="0 0 24 24" {...S}>
    <path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9Z" />
  </svg>
));
export const IconTag = component$<P>((p) => (
  <svg class={p.class} width="22" height="22" viewBox="0 0 24 24" {...S}>
    <path d="M3 11.5 11.5 3H20a1 1 0 0 1 1 1v8.5L12.5 21a1.5 1.5 0 0 1-2.1 0L3 13.6a1.5 1.5 0 0 1 0-2.1Z" />
    <circle cx="16" cy="8" r="1.4" fill="currentColor" stroke="none" />
  </svg>
));
export const IconHandshake = component$<P>((p) => (
  <svg class={p.class} width="22" height="22" viewBox="0 0 24 24" {...S}>
    <path d="m11 17 2 2a1.4 1.4 0 0 0 2 0 1.4 1.4 0 0 0 2 0 1.4 1.4 0 0 0 2 0l1-1" />
    <path d="M3 8l3-1 5 4a1.5 1.5 0 0 1-2 2.2L6 11" />
    <path d="M21 8l-3-1-4 3M3 8v6M21 8v6" />
  </svg>
));

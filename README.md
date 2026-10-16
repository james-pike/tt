# Top Tier Motorworks — tt

Appointment-booking site for **Top Tier Motorworks** (toptiermotorworks.ca), an auto
repair + performance shop. Cloned from the `cm` Qwik City stack, with all login/auth,
cart, and apparel catalog removed and rebuilt as a public marketing + booking site.

- **Stack:** Qwik + Qwik City (SSR), hand-rolled components (no qwik-ui), Resend for email.
- **Theme:** dark-primary with a light mode (toggle in header, persisted to `localStorage`).
  Brand pulled from the shop emblem — gunmetal/chrome + racing red.
- **No auth.** The site is fully public and crawlable.

## Routes
- `/` — hero, services, why-us, reviews, visit/hours, booking CTA.
- `/book` — appointment request form → emails the shop via Resend.

## Run
```bash
npm run dev      # vite --mode ssr  → http://localhost:5173
npm run build    # production build
npm run preview  # build + preview
```

## Configure before launch
- **Shop details** (name, phone, email, address, hours, services) live in `src/shop.ts` —
  the current values are placeholders.
- **Booking emails** need Resend env vars (see `.env.example`):
  - `RESEND_API_KEY`, `RESEND_FROM` (verified domain), `BOOKING_NOTIFY_TO`.
  - Without a key the form still works in dev (logs the request server-side, no email sent).
- **Logo** assets: `public/logo.png` (header/mark use is retired in favour of the wordmark)
  and `public/logo-full.png` (hero emblem), both cropped from the source artwork.

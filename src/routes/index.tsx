import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Tabs, Carousel, Accordion, Tooltip } from "@qwik-ui/headless";
import { SHOP, hoursLabel } from "../shop";
import {
  IconPhone, IconMapPin, IconClock, IconShield, IconTag, IconBolt, IconHandshake, IconChevron,
  IconWrench, IconDisc, IconScan, IconTire, IconGauge, IconClipboard, IconSnow, IconSpark,
} from "../components/icons";

const SERVICE_TABS = [
  {
    key: "maintenance",
    label: "Maintenance",
    items: [
      { Icon: IconWrench, name: "Oil & service", desc: "Oil, fluids, filters and scheduled service that keeps the warranty intact." },
      { Icon: IconTire, name: "Tires & alignment", desc: "Mount, balance, rotate and a precision four-wheel alignment." },
      { Icon: IconSnow, name: "A/C & heating", desc: "Recharge, leak detection and heater repairs for year-round comfort." },
      { Icon: IconClipboard, name: "Inspections", desc: "Safety certificates and pre-purchase checks with an honest report." },
    ],
  },
  {
    key: "repair",
    label: "Repair",
    items: [
      { Icon: IconDisc, name: "Brakes & suspension", desc: "Pads, rotors, struts and steering — quiet, straight and sure to stop." },
      { Icon: IconScan, name: "Diagnostics", desc: "Check-engine lights traced to the root cause, not just the code." },
      { Icon: IconBolt, name: "Electrical & batteries", desc: "Starters, alternators, sensors and wiring sorted out properly." },
      { Icon: IconSpark, name: "Everything else", desc: "Belts, hoses, pumps, leaks — if it bolts to your car, we fix it." },
    ],
  },
  {
    key: "performance",
    label: "Performance",
    items: [
      { Icon: IconGauge, name: "ECU tuning", desc: "Dyno-backed tunes for real, repeatable, reliable gains." },
      { Icon: IconSpark, name: "Exhaust & intake", desc: "Bolt-ons installed and tuned to work together, not against each other." },
      { Icon: IconWrench, name: "Builds & upgrades", desc: "Turbo, clutch and cooling upgrades planned around how you drive." },
    ],
  },
];

const PLEDGES = [
  { Icon: IconTag, title: "Honest quotes", body: "You approve every line before a wrench turns. No surprises at pickup." },
  { Icon: IconShield, title: "Warranty backed", body: "Parts and labour covered for 24 months or 40,000 km, whichever comes first." },
  { Icon: IconBolt, title: "Fast turnaround", body: "Most services are same-day. We tell you exactly when it'll be ready." },
  { Icon: IconHandshake, title: "No pressure", body: "We fix what needs fixing and flag what can wait. Your call, every time." },
];

const REVIEWS = [
  { name: "Marcus D.", car: "Subaru WRX", stars: 5, quote: "Caught a boost leak two other shops missed, tuned it properly, and the quote was exactly what they said. These are my guys now." },
  { name: "Priya S.", car: "Honda CR-V", stars: 5, quote: "Booked online at 11pm, dropped it off at 8, home by lunch. Brakes feel brand new and nobody tried to upsell me." },
  { name: "Tyler R.", car: "Ford F-150", stars: 5, quote: "Straight answers, fair price, and they walked me through the inspection photos. Hard to find a shop you trust — found one." },
  { name: "Elena V.", car: "VW Golf GTI", stars: 5, quote: "They explained my options without the pressure, did the work ahead of schedule, and the car has never driven better." },
  { name: "Dwayne K.", car: "RAM 1500", stars: 5, quote: "Diagnosed an electrical gremlin three other places gave up on. Fixed right the first time. Can't recommend them enough." },
  { name: "Sofia M.", car: "Mazda 3", stars: 5, quote: "Clear text updates the whole time, fair price, and they even showed me the old parts. Finally a shop that treats you like an adult." },
];

const FAQ = [
  { q: "Do I need an appointment, or can I walk in?", a: "Walk-ins are welcome during open hours, but booking online guarantees a bay and usually gets you out faster. Most online requests are confirmed the same day." },
  { q: "Will I get a quote before any work starts?", a: "Always. We inspect, call or message you with an itemized quote, and only start once you approve it. No surprise charges when you pick up." },
  { q: "What's covered by your warranty?", a: "Parts and labour are backed for 24 months or 40,000 km, whichever comes first. Keep your invoice — that's your coverage." },
  { q: "Do you work on performance and modified cars?", a: "Yes. From bolt-ons to dyno-backed ECU tuning and full builds, we handle enthusiast cars with the same care as daily drivers." },
  { q: "Can you handle my manufacturer's maintenance schedule?", a: "We follow your vehicle's factory schedule so your maintenance records stay intact and your powertrain warranty is never at risk." },
];

export default component$(() => {
  const todayIdx = useSignal(-1);
  const perView = useSignal(3);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    todayIdx.value = new Date().getDay();
    const setPerView = () => {
      perView.value = window.innerWidth < 680 ? 1 : window.innerWidth < 1040 ? 2 : 3;
    };
    setPerView();
    window.addEventListener("resize", setPerView);
    cleanup(() => window.removeEventListener("resize", setPerView));
  });

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section class="hero">
        <div class="container hero__inner">
          <div class="hero__text">
            <span class="tick">Independent performance &amp; repair</span>
            <h1 class="hero__title chrome"><em>Your car,<br />running right.</em></h1>
            <p class="hero__sub">
              Diagnostics, repairs, maintenance and performance tuning under one roof.
              Licensed techs, honest quotes, and online booking that takes about two minutes.
            </p>
            <div class="hero__cta">
              <Link href="/book" class="btn btn--red btn--lg">Book an appointment</Link>
              <a href={SHOP.phoneHref} class="btn btn--ghost btn--lg"><IconPhone /> Call the shop</a>
            </div>
            <div class="hero__trust">
              <Tooltip.Root gutter={8} flip>
                <Tooltip.Trigger class="trust-trigger"><IconShield /> Licensed technicians</Tooltip.Trigger>
                <Tooltip.Panel class="tt-tip"><Tooltip.Arrow class="tt-tip__arrow" width={10} height={5} />Red Seal certified techs on every job — no apprentices left guessing.</Tooltip.Panel>
              </Tooltip.Root>
              <Tooltip.Root gutter={8} flip>
                <Tooltip.Trigger class="trust-trigger"><IconTag /> Up-front pricing</Tooltip.Trigger>
                <Tooltip.Panel class="tt-tip"><Tooltip.Arrow class="tt-tip__arrow" width={10} height={5} />You approve an itemized quote before any work begins. No surprises.</Tooltip.Panel>
              </Tooltip.Root>
              <Tooltip.Root gutter={8} flip>
                <Tooltip.Trigger class="trust-trigger"><IconBolt /> Most work same-day</Tooltip.Trigger>
                <Tooltip.Panel class="tt-tip"><Tooltip.Arrow class="tt-tip__arrow" width={10} height={5} />Drop off in the morning, back on the road by evening for most services.</Tooltip.Panel>
              </Tooltip.Root>
            </div>
          </div>

          <div class="hero__art">
            <img src="/logo-full.png" width="564" height="358" alt={`${SHOP.name} emblem`} class="hero__emblem" loading="eager" decoding="sync" />
          </div>
        </div>
      </section>

      {/* ---------- Services (Tabs) ---------- */}
      <section class="section" id="services">
        <div class="container">
          <div class="section__head">
            <span class="tick">Services</span>
            <h2 class="section__title">What we fix, tune and maintain</h2>
            <p class="section__lead">One shop for the whole car — pick a category, or just tell us the symptom and we'll sort it.</p>
          </div>
          <Tabs.Root class="svc-tabs">
            <Tabs.List class="svc-tablist">
              {SERVICE_TABS.map((t) => (
                <Tabs.Tab key={t.key} class="svc-tab">{t.label}</Tabs.Tab>
              ))}
            </Tabs.List>
            {SERVICE_TABS.map((t) => (
              <Tabs.Panel key={t.key}>
                <div class="services">
                  {t.items.map((s) => (
                    <article key={s.name} class="svc">
                      <s.Icon class="svc__icon" />
                      <h3 class="svc__name">{s.name}</h3>
                      <p class="svc__desc">{s.desc}</p>
                    </article>
                  ))}
                </div>
              </Tabs.Panel>
            ))}
          </Tabs.Root>
        </div>
      </section>

      {/* ---------- Why ---------- */}
      <section class="section section--alt" id="why">
        <div class="container">
          <div class="section__head">
            <span class="tick">Why Top Tier</span>
            <h2 class="section__title">The way service should feel</h2>
          </div>
          <div class="pledge">
            {PLEDGES.map((p) => (
              <div key={p.title} class="pledge__item">
                <span class="pledge__ic"><p.Icon /></span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Reviews (Carousel) ---------- */}
      <section class="section" id="reviews">
        <div class="container">
          <div class="section__head">
            <span class="tick">Reviews</span>
            <h2 class="section__title">Drivers who stuck around</h2>
          </div>
          <Carousel.Root class="rev-carousel" gap={18} slidesPerView={perView.value} rewind>
            <div class="rev-nav">
              <Carousel.Previous class="rev-arrow" aria-label="Previous review"><IconChevron style="transform:rotate(90deg)" /></Carousel.Previous>
              <Carousel.Next class="rev-arrow" aria-label="Next review"><IconChevron style="transform:rotate(-90deg)" /></Carousel.Next>
            </div>
            <Carousel.Scroller class="rev-scroller">
              {REVIEWS.map((r) => (
                <Carousel.Slide key={r.name} class="rev-slide">
                  <figure class="review">
                    <div class="review__stars" aria-label={`${r.stars} out of 5 stars`}>
                      {Array.from({ length: r.stars }).map((_, i) => (
                        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.5 7 .9-5 4.8 1.3 7-6.6-3.6L5.3 21l1.3-7-5-4.8 7-.9L12 2Z" /></svg>
                      ))}
                    </div>
                    <blockquote class="review__quote">"{r.quote}"</blockquote>
                    <figcaption class="review__by">
                      <span class="review__avatar">{r.name.charAt(0)}</span>
                      <span>
                        <span class="review__name" style="display:block">{r.name}</span>
                        <span class="review__car">{r.car}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Carousel.Slide>
              ))}
            </Carousel.Scroller>
            <Carousel.Pagination class="rev-dots">
              {REVIEWS.map((r) => (
                <Carousel.Bullet key={r.name} class="rev-dot" aria-label={`Go to ${r.name}'s review`} />
              ))}
            </Carousel.Pagination>
          </Carousel.Root>
        </div>
      </section>

      {/* ---------- FAQ (Accordion) ---------- */}
      <section class="section section--alt" id="faq">
        <div class="container">
          <div class="section__head">
            <span class="tick">Questions</span>
            <h2 class="section__title">Good to know</h2>
          </div>
          <Accordion.Root class="faq" multiple>
            {FAQ.map((f, i) => (
              <Accordion.Item key={f.q} id={`faq-${i}`} class="faq-item">
                <Accordion.Header class="faq-header">
                  <Accordion.Trigger class="faq-trigger">
                    <span>{f.q}</span>
                    <IconChevron class="chev" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content class="faq-content">
                  <div class="faq-content__inner">{f.a}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* ---------- Visit ---------- */}
      <section class="section" id="visit">
        <div class="container">
          <div class="section__head">
            <span class="tick">Visit</span>
            <h2 class="section__title">Find the shop</h2>
          </div>
          <div class="visit">
            <div class="visit__info">
              <div class="visit__line"><IconMapPin />
                <a href={SHOP.mapHref} target="_blank" rel="noreferrer">{SHOP.address.line1}<br />{SHOP.address.line2}</a>
              </div>
              <div class="visit__line"><IconPhone /><a href={SHOP.phoneHref}>{SHOP.phone}</a></div>
              <div class="visit__line"><IconClock /><span>Walk-ins welcome during open hours. Appointments jump the queue.</span></div>
              <Link href="/book" class="btn btn--red btn--lg" style="margin-top:26px">Book an appointment</Link>
            </div>
            <div class="book-aside__hours">
              {SHOP.hours.map((h, i) => (
                <div key={h.day} class={`row ${todayIdx.value === i ? "row--today" : ""}`}>
                  <span>{h.day}{todayIdx.value === i ? " · Today" : ""}</span>
                  <span>{hoursLabel(h.range)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA band ---------- */}
      <section class="cta-band">
        <div class="container cta-band__inner">
          <div>
            <h2 class="chrome">Ready when you are.</h2>
            <p>Pick a service, tell us about your vehicle, and choose a time that works. We'll confirm within one business hour.</p>
          </div>
          <Link href="/book" class="btn btn--red btn--lg">Book now</Link>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Top Tier Motorworks — Auto repair & performance in Mississauga",
  meta: [
    { name: "description", content: "Book auto repair, maintenance, diagnostics and performance tuning at Top Tier Motorworks. Licensed techs, honest quotes, fast turnaround. Online booking in two minutes." },
    { name: "theme-color", content: "#0a0a0c" },
    { property: "og:title", content: "Top Tier Motorworks" },
    { property: "og:description", content: "Auto repair & performance done right. Book online in two minutes." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://toptiermotorworks.ca/" },
    { property: "og:image", content: "https://toptiermotorworks.ca/logo-full.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Top Tier Motorworks" },
    { name: "twitter:description", content: "Auto repair & performance done right. Book online in two minutes." },
  ],
};

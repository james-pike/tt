import { component$, Slot, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Modal, Toggle, Popover } from "@qwik-ui/headless";
import { SHOP, hoursLabel } from "../shop";
import { IconPhone, IconMenu, IconClose, IconSun, IconMoon, IconClock, IconMapPin, IconMail } from "../components/icons";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#why", label: "Why us" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#visit", label: "Visit" },
];

export const Brand = component$(() => (
  <Link href="/" class="brand" aria-label={`${SHOP.name} — home`}>
    <span class="brand__word">
      <b>Top<span class="t2"> Tier</span></b>
      <span>Motorworks</span>
    </span>
  </Link>
));

export default component$(() => {
  const loc = useLocation();
  const menuOpen = useSignal(false);
  const isLight = useSignal(false);
  const ready = useSignal(false);
  const todayIdx = useSignal(-1);

  // Sync the toggle + today's-hours highlight to the real client state.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    isLight.value = document.documentElement.getAttribute("data-theme") === "light";
    todayIdx.value = new Date().getDay();
    ready.value = true;
  });

  // Apply the theme only on genuine user toggles (guarded so the initial sync
  // doesn't repaint and cause a flash).
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const light = track(() => isLight.value);
    if (!track(() => ready.value)) return;
    const t = light ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("tt-theme", t); } catch { /* ignore */ }
  });

  // Close the mobile menu on navigation.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => loc.url.pathname + loc.url.hash);
    menuOpen.value = false;
  });

  return (
    <>
      <header class="site-header">
        <div class="site-header__inner">
          <Brand />
          <nav class="nav" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <div class="header-actions">
            <Popover.Root floating="bottom-end" gutter={10}>
              <Popover.Trigger class="hours-trigger"><IconClock /> Hours</Popover.Trigger>
              <Popover.Panel class="hours-pop">
                <div class="hours-pop__head"><IconClock /> This week</div>
                {SHOP.hours.map((h, i) => (
                  <div key={h.day} class={`row ${todayIdx.value === i ? "row--today" : ""}`}>
                    <span>{h.day}</span>
                    <span>{hoursLabel(h.range)}</span>
                  </div>
                ))}
              </Popover.Panel>
            </Popover.Root>
            <a class="phone" href={SHOP.phoneHref}>
              <IconPhone /> {SHOP.phone}
            </a>
            <Toggle
              class="theme-toggle"
              bind:pressed={isLight}
              aria-label="Toggle colour theme"
            >
              {isLight.value ? <IconMoon /> : <IconSun />}
            </Toggle>
            <Link href="/book" class="btn btn--red book-cta">Book now</Link>
            <button class="icon-btn hamburger" aria-label="Open menu" onClick$={() => (menuOpen.value = true)}>
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — qwik-ui Modal as a right-side sheet */}
      <Modal.Root bind:show={menuOpen}>
        <Modal.Panel class="menu-panel">
          <div class="menu-inner">
            <div class="menu-top">
              <Brand />
              <Modal.Close class="icon-btn" aria-label="Close menu"><IconClose /></Modal.Close>
            </div>
            <nav class="menu-nav" aria-label="Mobile">
              {NAV.map((n, i) => (
                <a key={n.href} href={n.href} onClick$={() => (menuOpen.value = false)}>
                  <span class="idx">{String(i + 1).padStart(2, "0")}</span>{n.label}
                </a>
              ))}
            </nav>
            <div class="menu-cta">
              <Link href="/book" class="btn btn--red btn--block btn--lg" onClick$={() => (menuOpen.value = false)}>
                Book an appointment
              </Link>
              <a class="menu-phone" href={SHOP.phoneHref}>Or call {SHOP.phone}</a>
            </div>
          </div>
        </Modal.Panel>
      </Modal.Root>

      <main>
        <Slot />
      </main>

      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__brand">
              <Brand />
              <p>Honest, precise service for daily drivers and performance builds. Booked in minutes, done right the first time.</p>
            </div>
            <div>
              <h4>Shop</h4>
              <ul>
                <li><a href="/#services">Services</a></li>
                <li><a href="/#why">Why Top Tier</a></li>
                <li><a href="/#faq">FAQ</a></li>
                <li><Link href="/book">Book now</Link></li>
              </ul>
            </div>
            <div>
              <h4>Visit</h4>
              <ul>
                <li style="display:flex;gap:9px;align-items:flex-start"><IconMapPin /> <a href={SHOP.mapHref} target="_blank" rel="noreferrer">{SHOP.address.line1}, {SHOP.address.line2}</a></li>
                <li style="display:flex;gap:9px;align-items:center"><IconPhone /> <a href={SHOP.phoneHref}>{SHOP.phone}</a></li>
                <li style="display:flex;gap:9px;align-items:center"><IconMail /> <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a></li>
              </ul>
            </div>
            <div>
              <h4>Hours</h4>
              <ul>
                <li>Mon – Fri · 8am – 6pm</li>
                <li>Saturday · 9am – 3pm</li>
                <li>Sunday · Closed</li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© {new Date().getFullYear()} {SHOP.name}. All rights reserved.</span>
            <span>{SHOP.domain}</span>
          </div>
        </div>
      </footer>
    </>
  );
});

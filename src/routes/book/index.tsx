import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Resend } from "resend";
import { Select, Combobox, Checkbox, Collapsible } from "@qwik-ui/headless";
import { SHOP, hoursLabel, SERVICE_OPTIONS } from "../../shop";
import { IconCheck, IconPhone, IconShield, IconClock, IconChevron } from "../../components/icons";

const MAKES = [
  "Acura", "Audi", "BMW", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Honda",
  "Hyundai", "Jeep", "Kia", "Lexus", "Mazda", "Mercedes-Benz", "Nissan", "Ram",
  "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo", "Other",
];

const TIMES = ["Any time", "Morning (8–11)", "Midday (11–2)", "Afternoon (2–6)"];

const ADDONS = [
  { id: "courtesy", label: "Courtesy car / shuttle" },
  { id: "wait", label: "I'll wait on-site" },
  { id: "pickup", label: "Pickup & drop-off" },
];

function esc(s: string | undefined | null): string {
  if (s == null) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

export const useBook = routeAction$(
  async (data, { env, fail }) => {
    if (data.website && data.website.trim() !== "") {
      return fail(400, { message: "Submission flagged. Please call the shop." });
    }

    const ref = `TT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const vehicle = [data.vyear, data.vmake, data.vmodel].filter(Boolean).join(" ").trim();

    const apiKey = env.get("RESEND_API_KEY");
    const fromAddress = env.get("RESEND_FROM") || `${SHOP.name} <onboarding@resend.dev>`;
    const shopInbox = (env.get("BOOKING_NOTIFY_TO") || SHOP.email).split(",").map((s) => s.trim()).filter(Boolean);

    const rows: [string, string | undefined][] = [
      ["Reference", ref],
      ["Name", data.name],
      ["Phone", data.phone],
      ["Email", data.email || "—"],
      ["Vehicle", vehicle || "—"],
      ["Service", data.service],
      ["Preferred date", data.date || "First available"],
      ["Preferred time", data.time || "Any"],
      ["Add-ons", data.addons || "—"],
      ["Notes", data.notes || "—"],
    ];
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
        <div style="background:#0a0a0c;padding:22px 26px">
          <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:.5px">New appointment request</h1>
          <p style="color:#e01f2b;margin:6px 0 0;font-weight:bold;font-size:13px;letter-spacing:2px">${esc(ref)}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          ${rows.map(([k, v]) => `<tr>
            <td style="padding:11px 26px;color:#6b7280;border-bottom:1px solid #f0f0f0;width:150px;vertical-align:top">${esc(k)}</td>
            <td style="padding:11px 26px;color:#111;border-bottom:1px solid #f0f0f0;font-weight:600">${esc(v)}</td>
          </tr>`).join("")}
        </table>
        <div style="padding:16px 26px;color:#9ca3af;font-size:12px">${esc(SHOP.name)} · ${esc(SHOP.domain)}</div>
      </div>`;

    if (apiKey) {
      try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: fromAddress,
          to: shopInbox,
          subject: `New booking ${ref} — ${data.name} (${data.service})`,
          html,
          ...(data.email ? { replyTo: data.email } : {}),
        });
        if (data.email) {
          await resend.emails.send({
            from: fromAddress,
            to: [data.email],
            subject: `We got your request — ${SHOP.name} (${ref})`,
            html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
              <p>Hi ${esc(data.name)},</p>
              <p>Thanks for booking with <strong>${esc(SHOP.name)}</strong>. We've received your request and will confirm your appointment within one business hour.</p>
              <p>Your reference is <strong>${esc(ref)}</strong>.</p>
              ${html}
              <p>Need to change something? Call us at ${esc(SHOP.phone)}.</p>
            </div>`,
          });
        }
      } catch (err) {
        console.error("Booking email failed:", err);
      }
    } else {
      console.warn("[booking] RESEND_API_KEY not set — request not emailed. Ref:", ref, data);
    }

    return { success: true, ref };
  },
  zod$({
    name: z.string().min(1, "Please enter your name").max(120),
    phone: z.string().min(7, "Please enter a phone number we can reach you at").max(40),
    email: z.string().email("Enter a valid email").max(254).or(z.literal("")),
    vyear: z.string().max(10).optional().default(""),
    vmake: z.string().max(60).optional().default(""),
    vmodel: z.string().max(60).optional().default(""),
    service: z.string().min(1, "Please choose a service").max(80),
    date: z.string().max(40).optional().default(""),
    time: z.string().max(40).optional().default(""),
    addons: z.string().max(400).optional().default(""),
    notes: z.string().max(1200).optional().default(""),
    website: z.string().max(200).optional().default(""),
  }),
);

export default component$(() => {
  const action = useBook();
  const done = action.value?.success === true;

  // add-on checkbox state (joined into a hidden field for the form submit)
  const a0 = useSignal(false);
  const a1 = useSignal(false);
  const a2 = useSignal(false);
  const addonSigs = [a0, a1, a2];

  return (
    <section class="section">
      <div class="container">
        {done ? (
          <div class="booking-form" style="max-width:620px;margin:0 auto">
            <div class="booked">
              <div class="booked__check"><IconCheck /></div>
              <h2 class="chrome">Request received</h2>
              <p>Thanks — we'll confirm your appointment within one business hour during shop hours. If it's urgent, call us at {SHOP.phone}.</p>
              <div class="booked__ref">Reference {action.value?.ref}</div>
              <div style="margin-top:28px"><a href="/" class="btn btn--ghost">Back to home</a></div>
            </div>
          </div>
        ) : (
          <div class="book-wrap">
            <aside class="book-aside">
              <span class="tick">Book an appointment</span>
              <h1 class="section__title">Tell us about the car</h1>
              <p class="book-aside__lead">
                A couple of minutes now saves time at the counter. We'll confirm your slot by phone or email,
                usually within the hour.
              </p>
              <div class="visit__line" style="margin-top:24px"><IconShield /><span>Licensed technicians · 24-month / 40,000 km warranty</span></div>
              <div class="visit__line"><IconPhone /><span>Prefer to talk? Call <a href={SHOP.phoneHref}>{SHOP.phone}</a></span></div>
              <div class="visit__line"><IconClock /><span>Most requests are confirmed same day</span></div>

              <div style="margin-top:22px">
                <Collapsible.Root class="collapse-info">
                  <Collapsible.Trigger class="collapse-trigger">
                    <span>What happens after I book?</span>
                    <IconChevron class="chev" />
                  </Collapsible.Trigger>
                  <Collapsible.Content class="collapse-content">
                    <div class="collapse-content__inner">
                      We review your request, confirm a time that works, and send an itemized quote before any
                      work starts. You approve it, we fix it, and your parts &amp; labour are warranty-backed.
                    </div>
                  </Collapsible.Content>
                </Collapsible.Root>
              </div>

              <div class="book-aside__hours">
                {SHOP.hours.map((h) => (
                  <div key={h.day} class="row">
                    <span>{h.day}</span>
                    <span>{hoursLabel(h.range)}</span>
                  </div>
                ))}
              </div>
            </aside>

            <Form action={action} class="booking-form">
              {action.value?.failed && (
                <div class="form-error">
                  {action.value.message || "Please check the highlighted fields and try again."}
                </div>
              )}
              <div class="field-grid">
                <div class="field">
                  <label for="name">Full name <span class="req">*</span></label>
                  <input id="name" name="name" type="text" autoComplete="name" required placeholder="Alex Carter" />
                </div>
                <div class="field">
                  <label for="phone">Phone <span class="req">*</span></label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" required placeholder="(905) 555-0123" />
                </div>
                <div class="field field--full">
                  <label for="email">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="you@email.com — for your confirmation" />
                </div>

                <div class="field">
                  <label for="vyear">Vehicle year</label>
                  <input id="vyear" name="vyear" type="text" inputMode="numeric" placeholder="2019" />
                </div>

                {/* Combobox — vehicle make */}
                <Combobox.Root class="field">
                  <Combobox.Label class="bk-label">Make</Combobox.Label>
                  <Combobox.Control class="bk-combo-control">
                    <Combobox.Input name="vmake" class="bk-combo-input" placeholder="Start typing…" />
                    <Combobox.Trigger class="bk-combo-trigger" aria-label="Show makes">
                      <IconChevron />
                    </Combobox.Trigger>
                  </Combobox.Control>
                  <Combobox.Popover class="bk-popover" gutter={8}>
                    {MAKES.map((m) => (
                      <Combobox.Item key={m} class="bk-item">
                        <Combobox.ItemLabel>{m}</Combobox.ItemLabel>
                        <Combobox.ItemIndicator><IconCheck /></Combobox.ItemIndicator>
                      </Combobox.Item>
                    ))}
                  </Combobox.Popover>
                </Combobox.Root>

                <div class="field field--full">
                  <label for="vmodel">Model</label>
                  <input id="vmodel" name="vmodel" type="text" placeholder="WRX" />
                </div>

                {/* Select — service */}
                <Select.Root class="field field--full" name="service">
                  <Select.Label class="bk-label">What do you need? <span class="req">*</span></Select.Label>
                  <Select.HiddenNativeSelect required />
                  <Select.Trigger class="bk-trigger">
                    <Select.DisplayValue placeholder="Choose a service" />
                    <IconChevron class="chev" />
                  </Select.Trigger>
                  <Select.Popover class="bk-popover">
                    {SERVICE_OPTIONS.map((s) => (
                      <Select.Item key={s} class="bk-item">
                        <Select.ItemLabel>{s}</Select.ItemLabel>
                        <Select.ItemIndicator><IconCheck /></Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Popover>
                </Select.Root>

                <div class="field">
                  <label for="date">Preferred date</label>
                  <input id="date" name="date" type="date" />
                </div>

                {/* Select — time */}
                <Select.Root class="field" name="time">
                  <Select.Label class="bk-label">Preferred time</Select.Label>
                  <Select.HiddenNativeSelect />
                  <Select.Trigger class="bk-trigger">
                    <Select.DisplayValue placeholder="Any time" />
                    <IconChevron class="chev" />
                  </Select.Trigger>
                  <Select.Popover class="bk-popover">
                    {TIMES.map((t) => (
                      <Select.Item key={t} class="bk-item">
                        <Select.ItemLabel>{t}</Select.ItemLabel>
                        <Select.ItemIndicator><IconCheck /></Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Popover>
                </Select.Root>

                {/* Checkbox — add-ons */}
                <div class="field field--full">
                  <span class="bk-label">Anything else?</span>
                  <div class="addons">
                    {ADDONS.map((ad, i) => (
                      <Checkbox.Root key={ad.id} bind:checked={addonSigs[i]} class="addon">
                        <span class="addon__box"><Checkbox.Indicator><IconCheck /></Checkbox.Indicator></span>
                        {ad.label}
                      </Checkbox.Root>
                    ))}
                  </div>
                </div>

                <div class="field field--full">
                  <label for="notes">What's going on?</label>
                  <textarea id="notes" name="notes" placeholder="Symptoms, noises, warning lights, or the work you're after. The more detail, the faster we can help." />
                </div>
              </div>

              {/* hidden: add-ons joined for submission */}
              <input
                type="hidden"
                name="addons"
                value={ADDONS.filter((_, i) => addonSigs[i].value).map((a) => a.label).join(", ")}
              />
              {/* honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0" aria-hidden="true" />

              <div class="booking-form__foot">
                <button type="submit" class="btn btn--red btn--lg btn--block" disabled={action.isRunning}>
                  {action.isRunning ? "Sending…" : "Request appointment"}
                </button>
                <p class="booking-form__note">No payment now. We'll confirm the time and give you a quote before any work starts.</p>
              </div>
            </Form>
          </div>
        )}
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Book an appointment — Top Tier Motorworks",
  meta: [
    { name: "description", content: "Request a service appointment at Top Tier Motorworks. Tell us about your vehicle and pick a time — we confirm within one business hour." },
    { name: "theme-color", content: "#0a0a0c" },
  ],
};

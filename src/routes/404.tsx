import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="not-found-page">
      <div>
        <h1 class="not-found-page__code chrome">404</h1>
        <p class="not-found-page__text">That page took a wrong turn. Let's get you back on the road.</p>
        <Link href="/" class="btn btn--red btn--lg">Back to home</Link>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Page not found — Top Tier Motorworks",
  meta: [{ name: "robots", content: "noindex" }],
};

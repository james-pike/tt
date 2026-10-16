import { component$, isDev } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <meta name="theme-color" content="#0a0a0c" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {!isDev && (
          <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />
        )}
        <RouterHead />
        {/* Set the color theme before first paint so there's no flash. */}
        <script dangerouslySetInnerHTML="(function(){try{var t=localStorage.getItem('tt-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})()" />
        <style dangerouslySetInnerHTML={`
          body.loading{opacity:0}
          body.ready{opacity:1;transition:opacity 0.15s ease}
        `} />
      </head>
      <body lang="en" class="loading">
        <RouterOutlet />
        <script dangerouslySetInnerHTML="(function(){function r(){document.body.classList.remove('loading');document.body.classList.add('ready')}if(document.readyState!=='loading'){r()}else{document.addEventListener('DOMContentLoaded',r)}})()" />
      </body>
    </QwikCityProvider>
  );
});

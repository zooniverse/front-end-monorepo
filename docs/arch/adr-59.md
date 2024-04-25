# ADR 58: Incremental Static Regeneration for project pages

## Status
Accepted

## Context
When the first Engaging Crowds projects launched, project pages were built dynamically with `getServerSideProps`. Page builds were slow, with pages sometimes taking several seconds to load in the browser ([#2741](https://github.com/zooniverse/front-end-monorepo/issues/2741).)

## Decision
Use [Incremental Static Regeneration](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration) (ISR) to build project pages. ISR is a feature of Next.js, which allows page HTML and JSON to be built and cached on demand, then served with `stale-while-revalidate` cache control headers. While a page is building, visitors will get stale, cached content, resulting in a faster experience.

## Consequences
- Page builds were switched from `getServerSideProps` to `getStaticProps`, with a revalidation time of 60s. Revalidation can be set individually for each page route.
- `getStaticProps` can still be slow, when it runs, so data-fetching from the Panoptes API may need further optimisation ([#3341](https://github.com/zooniverse/front-end-monorepo/issues/3341).)
- Production projects and staging projects each have their own static routes: `/production/:owner/:project` and `/staging/:owner/:project`. Next.js middleware rewrites incoming request URLs to the production and staging routes used by the project app;
    - `/projects/nora-dot-eisner/planet-hunters-tess` is rewritten (proxied) to `/projects/production/nora-dot-eisner/planet-hunters-tess`.
    - `/projects/brooke/i-fancy-cats?env=staging` is rewritten (proxied) to `/projects/staging/brooke/i-fancy-cats`.
- API data isn't cached across page routes, so navigating between project pages will refetch the project and workflows etc. from the Panoptes API.
- When navigating between subjects, in a project that has page routes for individual subjects, `getStaticProps` is run for every subject. We worked around this by [shallow routing](https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating#shallow-routing) client-side subject navigation, when the Done button is pressed. A better solution might be server-side caching of Panoptes API data across page routes, to avoid redundant computing of existing page props for each new subject.
- Volunteers no longer interact directly with the Next.js app. Browsers request page HTML, and JSON page props, from the `www.zooniverse.org` CDN. The CDN cache requests content from the Next.js app when cached content becomes stale.


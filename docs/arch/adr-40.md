# ADR 40: Next.js Internationalized Routing

28 December 2021

## Context

Our goal is to internationalize FEM and provide translatable content based on a user's preferred locale. There are two types of translatable strings: static strings (e.g menu items, nav links) and dynamic strings (project-specific content provided by volunteers).

When a user specifies their locale preference, all translatable content should reflect that preference across the Zooniverse platform.

## Decision

In order to synchronize a user's locale preference across Zooniverse, we'll utilize [Next.js Internationalized Sub-path Routing](https://nextjs.org/docs/advanced-features/i18n-routing#sub-path-routing). With the exception of English (the default locale), the user's chosen locale is reflected in a url subpath.

For example, `www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess` will render content in English because `en` is the default locale. When a user decides to view the same page in French, the url will change to `www.zooniverse.org/projects/fr/nora-dot-eisner/planet-hunters-tess`. As explained in [ADR #36](https://github.com/zooniverse/front-end-monorepo/blob/master/docs/arch/adr-36.md), `/projects` is the base path for `app-project`, so `/fr/` falls after `/projects`. Therefore, the url to view Zooniverse About pages in French will look like `www.zooniverse.org/about/fr/publications`.

## Consequences

When a project is migrated to FEM, not all project pages are rendered with FEM. The project's Home, About, and Classify pages use FEM as a frontend, but Talk, Collections, and Recents pages use PFE as a frontend. Eventually, the latter three pages will be migrated to FEM and use Next.js Internationalized Routing, but for now, navigation requires some extra work by the dev team.

To navigate to FEM from PFE, we could add query params to `ProjectHeader` links in PFE, then Next.js middleware could handle conversion of param —> subpath. To navigate to PFE from FEM, we could also add query params to `ProjectHeader` links in FEM because PFE already accepts language as a custom query param.

## Status

Accepted

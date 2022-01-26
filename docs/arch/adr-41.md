# ADR 41: Use i18next to Translate Static Strings

13 January 2022

## Context

This decision relates to translatable static strings on Zooniverse that are not project-specific (e.g menus, link labels, etc). [ADR #6](adr-6.md) mentions FEM’s current implementation where small json files containing English strings live in the codebase next to their respective component and are translated by `counterpart`. However, there was no further plan on how to compile the json files for easy management by project managers or contribution by volunteers.

I’m proposing we re-think management of FEM’s translatable static strings and use the [i18next](https://www.i18next.com) ecosystem instead of `counterpart`.

`counterpart` is an old package that while simple, hasn’t been updated or maintained for several years. It's not built to integrate with React apps, so additional dev work was always going to be needed to handle switching locales in FEM using `counterpart`.

## Decision

The `i18next` ecosystem is mature, well-maintained and has packages developed specifically for integration with React apps and Next.js apps ([react-i18next](https://react.i18next.com/), [next-i18next](https://github.com/isaachinman/next-i18next)). In both cases, translatable static strings are organized into json dictionary files. The organization of dictionary files is up to us. For example, strings used in `app-project` can be stored in one large json file, or they could be split into multiple files according to a string's location in the codebase (e.g home.json, about.json, classify.json). The dictionary files should live in one umbrella directory though, not scattered across FEM.

FEM's two Next.js apps will use package `next-i18next`. The purely React apps will use package `react-i18next`.

## Consequences

Implementing translation with `i18next` will require reorganization of dictionary json files into one umbrella directory instead of the current file structure.

Replacing `counterpart` in frontend components will be straightforward. In most cases, the `useTranslation()` hook imported from `react-i18next` will directly replace `counterpart()`.

## Status

Approved

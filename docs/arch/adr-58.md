# ADR 58: internationalisation with the Panoptes translations API

## Status
Accepted

## Context
The Next.js apps support localisation via a locale passed down from the page URL. Panoptes has a translations API which localises the following resources:
- Projects
- Project pages
- Workflows
- Tutorials
- Field guides

Localised strings, for a given resource, can be fetched by specifying the resource type, ID, and language eg. `/api/translations/translated_type=project&translated_id=1234&language=fr`. Strings are identified by a unique key, mapped to the localised text for that key.

The translations API needed to be integrated into the Next.js apps, and libraries, so that projects could be served in locales other than `en-US` (US English.)

## Decision
### Next.js apps
Update `getStaticProps` to fetch translation strings alongside each translatable resource (projects and project pages.) Add a map of translation strings to each project, and pass that down in page props as `project.strings`. Localised properties are converted to computed properties in the MobX State Tree model, for backwards compatibility with older code. eg. `project.title` now maps to `project.strings.get('title')`.

### Client-side components
Add a custom data-fetching hook (`usePanoptesTranslations`) to fetch translations for workflows, tutorials and field guides. Store a map of translation strings on each resource eg. `workflow.strings`.

Workflow tasks are each given their own localised translations. Since tasks aren't first-class resources in Panoptes, task strings are extracted from a workflow translation, then assigned to each of that workflow's tasks.

## Consequences
- Many localised properties could be converted to computed properties in the MobX State Tree model, for backwards compatibility with older code. eg. `project.title` now maps to `project.strings.get('title')`.
- React task components need to be updated to use maps, where previously they accessed resource properties directly eg. `task.answers[1].label` becomes `task.strings.get('answers.1.label')`.
- SSR'ed translations use the `stale-while-revalidate` caching strategy built into Next.js, and should update when they become stale (or when the locale changes.)
- Client-side components fetch translations with [`useSWR` hooks](https://swr.vercel.app) ('react-query' is a more modern alternative now.) Translation strings are cached in the browser and re-fetched when they become stale (or the locale changes.)

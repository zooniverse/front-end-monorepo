# ADR 18: Workflow routing

Created: September 4, 2019

## Context

On PFE, there are a couple of different ways workflows are routed:

- Navigating to `/classify`, the user sees either the default workflow for that project, or the workflow stored in project preferences for logged-in volunteers.
- Navigating to `/classify?workflow=[workflow_id]` shows the workflow determined by the query parameter.

This is not optimal for several reasons. Users cannot bookmark specific workflows unless they use the query parameter; there can be uncertainty over which actual workflow is being shown (particularly as the workflow name isn't shown in the UI); different workflows can be shown at the same URL at different times; and ultimately, workflows are static resources that should be routed to - that's what URLs are for.

Additionally, [we currently have a requirement for CSSI CitSci to be able to route to specific subjects](https://github.com/zooniverse/front-end-monorepo/issues/806#issuecomment-495685027). It's conceivable that a project will have a requirement for routing to a specific subject set linked to a workflow as well.

## Decision

We adopt the following URL structure:

```
/projects/[owner]/[project]/classify/workflow/:workflow-id/subject-set/:subject-set-id/subject/:subject-id
```

This would be facilitated by the [dynamic routing feature in Next.js 9](https://github.com/zeit/next.js/#dynamic-routing) (see [#1071](https://github.com/zooniverse/front-end-monorepo/pull/1071)).

Workflow links from the home page would route directly to their workflow-specific URLs.

### `/classify` behaviour

When navigating to `/classify`, the page should redirect the user to the correct workflow URL in the following priority:

1. Workflow ID set in user project preferences by the user
1. Workflow ID set in user project preferences by the project
1. Project default workflow
1. Random active selection

The new URL that we redirect the user to should replace the entry for `/classify` in the browser history.

## Status

Proposed

## Consequences

- `/classify` will still have different effects depending on the user, but solely in terms of redirects rather than content.
- We'll have to start storing at least portions of the MST state object in the browser, in order to allow for users to navigate back and forth between Talk and the classifier transparently.
- Workflow access restriction can be managed at the workflow component file level.

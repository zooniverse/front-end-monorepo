# ADR 34: Workflow selection

Created: September 17, 2021

## Context

On PFE, workflows have a complex logic of programmatic workflow selection. [ADR 18](adr-18.md) has documented the original context. This ADR is a partial superseding of the decision on how to select the workflow when navigating to `/classify`

## Decision

We will continue to use the routing behavior defined by [ADR 18](adr-18.md)

### `/classify` behaviour

We will not programmatically select a workflow except for one case: when there is only one active workflow. For all other cases, we have a UI prompt for the volunteer to manually select which workflow they wish to contribute to. 

### Error handling

Cases when the workflow is not available are:

- The workflow does not actually exist, so this will 404.
- The workflow exists, but is in an inactive state. The activeness state effectively functions as a permissions mechanism since users with the project owner, collaborator, or expert role or Zooniverse admins can still request and load inactive workflows. Users with the correct role should be able to load an inactive workflow with a visual indication in the UI it is inactive. All other users will receive a 404.
- The workflow exists and is active, however, the project uses workflow assignment and the workflow has not been assigned to the volunteer yet. The classify page should load, the classifier itself doesn't, and the workflow selection prompt is rendered for the volunteer to choose between the workflows they have been assigned.

## Status

Accepted
Partially supersedes [ADR 18](adr-18.md)

## Consequences

- Default workflows programmatically no longer has any meaning. We could still use this to visually indicate a preferred or suggested workflow from the project team in the UI. This is a design question to explore if we are asked for it.

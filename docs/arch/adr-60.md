# ADR 60: Enabling Aggregations (Caesar Reducers) on Workflows

## Status

Accepted

## Context

Pulling aggregated data from Caesar is becoming more and more of a standard feature in Zooniverse workflows. For example, workflows with Transcription Tasks _automatically_ assume that there will be corresponding Caesar reductions to pull from.

We want to enable _more_ workflows to pull aggregations from Caesar, e.g. workflows with Drawing Tasks. The question then is **on what conditions** should the FEM Classifier ask Caesar for aggregations for a given workflow? (or in simpler English: when should the Classifier ask for Caesar reductions?)

- Up to Aug 2024, the answer was "it just depends on the Tasks in the workflow". e.g. if a workflow contains at least 1 Transcription Task, the FEM Classifier will always check Caesar.
  - For how this logic is currently implemented in code, see `Workflow`'s [`get caesarReductions()`](https://github.com/zooniverse/front-end-monorepo/blob/a419078/packages/lib-classifier/src/store/WorkflowStore/Workflow/Workflow.js#L45-L54)
- This however causes problems when we have a more general workflow - e.g. the common Drawing Task workflow - since many of them _don't want to_ use Caesar by default.
  - This means we don't want the FEM Classifier to _always_ check Caesar based on implicit heuristics (i.e. guessing).
  - Instead, we want the FEM Classifier to check Caesar _only_ when we _explicitly tell it to.

## Decision

For Caesar-enabled Drawing Tasks, we're introducing a new workflow configuration value: `workflow.configuration.enable_caesar_data_fetching = true | false | (undefined)` (Default: undefined/false)

- See [FEM PR 6039](https://github.com/zooniverse/front-end-monorepo/pull/6039), which implements the new Caesar-fetching conditions for the FEM Classifier.
- See [PFE PR 7148](https://github.com/zooniverse/Panoptes-Front-End/pull/7148), which enables project owners to toggle `workflow.configuration.enable_caesar_data_fetching`. (Note: this is currently hidden behind the 'caesarDataFetching' experimental flag.)

Note: project owners and/or Zooniverse team members still need to manually set up the corresponding data extractors & reducers on Caesar. We still don't have an automated "one click to setup Caesar" button.

Note: the decision **won't** retroactively apply to existing Transcription Projects, because they're working fine as is. We may revisit this decision in the future.

## Consequences

- For workflows with a Transcription Task, _no changes_ are required.
  - The FEM Classifier will continue to fetch "alice"-type Caesar reductions whenever a Transcription Task is detected.
- For workflows with a Drawing Task:
  - (1) the Drawing Task must use one of the compatible Drawing Tools: `circle`, `ellipse`, `freehandLine`, `line`, `point`, `polygon`, `rectangle`, `rotateRectangle`
  - (2) AND the workflow must have its `configuration.enable_caesar_data_fetching` set to `true`.
  - Once these two conditions are fulfilled, the FEM Classifier will ask Caesar for the appropriate "machineLearnt"-type aggregations.

⚠️ Warning: as of Aug 2024, we don't support multiple or mixed aggregation types. e.g. creating a workflow with both a Transcription Task and a Caesar-enabled Drawing Task will result in inconsistent behaviour. There is room for improvement on this front.

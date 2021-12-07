# ADR 37: Engaging Crowds: Indexed subject sets

7 December 2021

## Context

Engaging Crowds allows volunteers to browse and search subject sets, linked to a workflow, in order to pick which subjects they want to work on. We needed a solution that would allow us to search a set, via indexed subject metadata, and present the results to a volunteer.

The subjects table in Panoptes is too large to allow for fast querying, so we also needed to build our own indexing system for indexed sets.

## Decision

- Project owners can flag subject metadata columns as searchable by prefixing the heading with `%` in the manifest eg. these manifest headings `subject_id,image_name_1,%origin,link,%attribution,license,#secret_description` mark `metadata.origin` and `metadata.attribution` as searchable.
- Subject sets with indexed subjects have `metadata.indexFields` set to a list of indexed fields eg. `indexFields: 'origin,attribution'`.
- Subject metadata for indexed sets is copied to a separate database running on [Datasette](https://datasette.io). Each set is given its own table, named by subject set ID. Datasette gives us a RESTful API out of the box, allowing us to browse and search subject data as HTML or JSON. See https://subject-set-search-api.zooniverse.org/subjects.
- From a volunteers point-of-view, the Datasette service is used to find specific subject IDs to work on. Those IDs are then sent to the Panoptes API `/subjects/selection` endpoint, which returns those subjects, in order, for classification.

## Consequences

- Subject metadata has to be synchronised between Panoptes and the Datasette service. At the moment, this is a manual process, which can be run via Jenkins or `lita`. The service has to be rebuilt whenever changes are made to any indexed set.

  Rebuilding all indexed sets whenever one changes might prove costly as the number of indexed sets grows.

- A [new subject selection strategy](https://github.com/zooniverse/front-end-monorepo/blob/80de98c88966c0d6764d8d9ae4a4f0dcca7f4354/packages/lib-classifier/src/store/SubjectStore/helpers/subjectSelectionStrategy/subjectSelectionStrategy.js#L36-L52) has been added to the subjects store. It's invoked when a workflow is grouped and has indexed subject sets.

- All subjects linked to an indexed set are expected to have the same metadata fields. This isn't enforced in the code but mixing subjects with different sets of indexed fields isn't possible.

## Status

Accepted

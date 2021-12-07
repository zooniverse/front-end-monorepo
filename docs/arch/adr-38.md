# ADR 38: Engaging Crowds: Next/previous subjects

7 December 2021

## Context

Engaging Crowds allows volunteers to browse and search subject sets, linked to a workflow, in order to pick which subjects they want to work on. As part of this, volunteers can browse a subject set, in the classifier, while they decide which subject they wish to work on.

The classifier's subject queue was originally built to support random or sequential subject selection, with subjects being shown to a volunteer in the order they were received from the Panoptes API. Subjects were discarded after being classified. Going backwards through the queue, to view previous subjects, was not possible.

## Decision

- The subject queue was changed from an ordered map, `subjects.resources`, to an array `subjects.queue`. Each item in `subjects.queue` is a subject ID, pointing to a subject in `subjects.resources`. Subjects are shown to the volunteer in array order.
- Existing workflows continue to use the orignal queueing logic: subjects are shifted off the array after being classified. The active subject is always the first entry in `subjects.queue`.
- Indexed subject sets, for Engaging Crowds, use a different logic. Subject IDs are never removed from the queue. Volunteers can browse available subjects by moving forwards and backwards through the array, changing the active index.

## Consequences

- The `SubjectStore` model now supports two different models of subject queue, branching on whether `workflow.hasIndexedSubjects` set. It might be better to separate the behaviours into two different models, depending on workflow types.
- `store.workflows` and `store.subjects` are separate subtrees in the classfier store. If subjects and workflows were contained in the same subtree, we could have different `subjects` models for different types of workflow.
- Changing the active subject (`subjects.active`) deletes an existing classification and generates a new one. Consequently, next/previous don't work once you've started to classify a subject. We've elected to show a warning if you try to view the next/previous page while working on a subject.
- Subjects are given arbitary priority numbers by project owners. This makes it difficult/impossible to tell, in the frontend code, when we're looking at the first subject in a set. Ideally, we'd hide the Previous button at the beginning of a set.
- Subjects are loaded asynchronously in the `SubjectStore`. In practice this means we can't tell when we're at the end of a set, so can't hide the Next button at the end of a set.
- `subject.queue` holds subjects in ascending priority order. When you reach the end of the set, Done submits a classification but can't load a new subject. Instead, we show a message that you've finished the current subject and should choose something new to work on.

  Since volunteers can pick what they work on, and classify a set in the order of their choosing, completing the last subject is no guarantee that they've completed the entire set.

## Status

Accepted

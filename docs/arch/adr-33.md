# ADR 33: Survey Task Feedback

July 21, 2021

## Context

We plan to implement feedback for the survey task.

Currently in PFE, the only feedback related to the survey task is for the Gravity Spy project, and is referred to as "Gravity Spy Gold Standard". Gravity Spy Gold Standard is a PFE experimental feature (per workflow configuration object) that checks a subject's metadata for `'#Type' === 'Gold'` and provides feedback after classification completion with the [`gs-gold-standard-summary`](https://github.com/zooniverse/Panoptes-Front-End/blob/master/app/classifier/gs-gold-standard-summary.jsx). Survey task annotation values are compared to subject metadata `'#Label'` values. A message is then shown accordingly (i.e. success, failure, or special message per subject metadata `'#post_classification_feedback'`).

## Decision

To implement a survey task feedback strategy within [the existing feedback framework](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-classifier/src/store/feedback/strategies). The initial survey task annotation feedback will presume the annotation has one annotation value per survey task choice. The subject metadata will include:

- #feedback_N_id (required) - ID of the corresponding workflow task rule.
- #feedback_N_choice_labels (required) - comma separated target choice label(s) (not values, i.e. "Blip" not "BLP").
- #feedback_N_choice_strict (optional) - defaults to true, target label(s) must match annotation label(s) exactly for success. If false then any target label(s) match with annotation label(s) will be a success.
- #feedback_N_successMessage (optional) - message to show when the target is correctly annotated. Overrides the default success message set on the workflow task rule.
- #feedback_N_failureMessage (optional) - message to show when the target is incorrectly annotated. Overrides the default failure message set on the workflow task rule.

Feedback for annotation value answers and multiple annotation values of the same choice is to be determined.

## Status

Proposed

## Consequences

Adopting this will implement feedback for the survey task as defined.

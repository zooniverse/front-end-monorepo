# ADR 33: Simple Survey Task Feedback

July 21, 2021

## Context

We plan to implement simple feedback for the survey task. Simple survey task feedback will compare target to actual choice(s), excluding any comparison of choice question answers, multiple selection of the same choice, or any other aspect of the survey task annotation.

Currently in PFE, the only feedback related to the survey task is for the Gravity Spy project, and is referred to as "Gravity Spy Gold Standard". Gravity Spy Gold Standard is a PFE experimental feature (per workflow configuration object) that checks a subject's metadata for `'#Type' === 'Gold'` and provides feedback after classification completion with the [`gs-gold-standard-summary`](https://github.com/zooniverse/Panoptes-Front-End/blob/master/app/classifier/gs-gold-standard-summary.jsx). Survey task annotation values are compared to subject metadata `'#Label'` values. A message is then shown accordingly (i.e. success, failure, or special message per subject metadata `'#post_classification_feedback'`).

## Decision

To implement a simple survey task feedback strategy within [the existing feedback framework](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-classifier/src/store/feedback/strategies). The simple survey task feedback will be titled "Survey: Simple". The simple survey task feedback will presume the annotation has one annotation value per survey task choice. The subject metadata will include:

- #feedback_N_id (required) - ID of the corresponding workflow task rule.
- #feedback_N_choiceIds (required) - comma separated target choice ID(s) (i.e. "BLIP" or "AARDVARK,ELEPHANT,ZEBRA"). A choice's ID is determined at survey task creation and can be viewed in in the Project Builder from the relevant workflow and survey task editor *Raw task data* section or from the workflow data export. The choice ID is the key for the choice object. For survey tasks created since 2017, the choice ID is the choice name per the provided "Choices" CSV with non-word characters removed and all uppercase (`[choice name per CSV].replace(/\W/g, '').toUpperCase()`).
- #feedback_N_successMessage (optional) - message to show when the target is correctly annotated. Overrides the default success message set on the workflow task rule.
- #feedback_N_failureMessage (optional) - message to show when the target is incorrectly annotated. Overrides the default failure message set on the workflow task rule.

The target choice ID(s) provided must match the choice IDs in the annotation values exactly for the annotation to be considered a success. Any missing target choice or any additional annotation choice will result in failure.

Feedback for annotation value (choice specific question) answers and multiple annotation values of the same choice will be addressed with additional survey task feedback strategies.

## Status

Accepted

## Consequences

Adopting this will implement a simple survey feedback strategy ("Survey: Simple") for the survey task as defined. More complex survey task feedback strategies, like comparing target and annotation value (choice specific question) answers, will be implemented as additional separate feedback strategies as to be determined. If there's interest, we can also consider adding lenient comparison of target IDs to annotation IDs (any match, regardless of missing target IDs, additional annotation IDs, or some combination thereof, could result in success).

# Feedback Strategy: Simple Survey

Determines whether the user has correctly identified a choice or choices of a survey task.

## Subject metadata fields

A single subject can have multiple feedback rules. To group the metadata fields for a single feedback rule together, `N` should be an integer that is identical for each rule, e.g.:

```
#feedback_1_id,#feedback_1_choiceIds,#feedback_2_id,#feedback_2_choiceIds...
```

- `#feedback_N_id` (required) - ID of the corresponding workflow task rule.
- `#feedback_N_choiceIds` (required) - comma separated target choice ID(s) (i.e. "BLIP" or "AARDVARK,ELEPHANT,ZEBRA"). A choice's ID is determined at survey task creation and can be viewed in in the Project Builder from the relevant workflow and survey task editor *Raw task data* section or from the workflow data export. The choice ID is the key for the choice object. For survey tasks created since 2017, the choice ID is the choice name per the provided "Choices" CSV with non-word characters removed and all uppercase (`[choice name per CSV].replace(/\W/g, '').toUpperCase()`).
- `#feedback_N_successMessage` (optional) - message to show when the target is correctly annotated. Overrides the default success message set on the workflow task rule.
- `#feedback_N_failureMessage` (optional) - message to show when the target is incorrectly annotated. Overrides the default failure message set on the workflow task rule.

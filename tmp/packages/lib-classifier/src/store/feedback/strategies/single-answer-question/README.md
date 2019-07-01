# Feedback Strategy: Single Answer Question

Determines whether the user has correctly answered a question with a single answer, or no answer.

## Subject metadata fields

A single subject can have multiple feedback rules. To group the metadata fields for a single feedback rule together, `N` should be an integer that is identical for each rule, e.g.:

```
#feedback_1_id,#feedback_1_answer,#feedback_2_id,#feedback_2_answer...
```

- `#feedback_N_id` (**required**) - ID of the corresponding workflow task rule.
- `#feedback_N_answer` (**required**) - index of the correct answer for the corresponding workflow task. Like the answers, this should be zero-indexed, so if the first answer is the correct one, this value should be `0`; if the second answer, `1`, and so on. Setting this to `-1` means there should be no answer, if an answer isn't required.
- `#feedback_N_successMessage` (optional) - message to show when the target is correctly annotated. Overrides the default success message set on the workflow task rule.
- `#feedback_N_failureMessage` (optional) - message to show when the target is incorrectly annotated. Overrides the default failure message set on the workflow task rule.

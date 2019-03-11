# Feedback Strategy: Column

Determines whether a column is within a given tolerance.

## Subject metadata fields

- `#feedback_N_id` (**required**) - ID of the corresponding workflow task rule.
- `#feedback_N_x` (**required**) - x value of the target column.
- `#feedback_N_width` (**required**) - width value of the target column.
- `#feedback_N_tolerance` (optional) - Margin of error around the target column. Overrides the default tolerance set on the workflow task rule.
- `#feedback_N_successMessage` (optional) - message to show when the target is correctly annotated. Overrides the default success message set on the workflow task rule.
- `#feedback_N_failureMessage` (optional) - message to show when the target is incorrectly annotated. Overrides the default failure message set on the workflow task rule.

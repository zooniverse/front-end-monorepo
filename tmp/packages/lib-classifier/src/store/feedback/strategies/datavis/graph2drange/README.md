# Feedback Strategy: Graph2dRange

Determines whether a Graph2dRange is within a given tolerance.

## Subject metadata fields

- `#feedback_N_id` (**required**) - ID of the corresponding workflow task rule.
- `#feedback_N_x` (**required**) - x value of the target Graph2dRange.
- `#feedback_N_width` (**required**) - width value of the target Graph2dRange, with the x value as the center point of the range.
- `#feedback_N_tolerance` (optional) - Margin of error around the target Graph2dRange, i.e. a tolerance of 2 applied before and after a width of 3 would yield an effective width range of 7. Overrides the default tolerance set on the workflow task rule.
- `#feedback_N_successMessage` (optional) - message to show when the target is correctly annotated. Overrides the default success message set on the workflow task rule.
- `#feedback_N_failureMessage` (optional) - message to show when the target is incorrectly annotated. Overrides the default failure message set on the workflow task rule.

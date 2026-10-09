# Feedback Strategy: Geo Line

Determines whether a volunteer's geoDrawing mark follows, or falls on, a target line on the map, within a given tolerance.

The target is a `LineString` in `EPSG:4326` (matching the geoDrawing annotation) and the tolerance is a distance in **meters**. The target is grown into a corridor `tolerance` wide and the volunteer's mark must lie entirely inside it; a `LineString` counts in either direction; see the [geo grader](../grader/README.md).

`LineString` features (the `SegmentedLine` tool) and `Point` features (the `Point` tool) are both considered, so the same target grades a traced crest or a point dropped on one. Pair a Point tool with a nested target to ask "mark any one of these".

## Subject metadata fields

- `#feedback_N_id` (**required**) - ID of the corresponding workflow task rule.
- `#feedback_N_coordinates` (**required**) - the target as a JSON array of `[longitude, latitude]` pairs, at least two, e.g. `[[-91.948, 47.507], [-91.947, 47.508]]`. To treat several lines as one target, nest them: `[[[-91.948, 47.507], [-91.947, 47.508]], [[-91.945, 47.509], [-91.944, 47.510]]]`. A trace matching any one of them satisfies the rule, which gives a single pass or fail for a subject containing several of the same feature. Give each line its own `#feedback_N_*` block instead, all naming the same rule id, when the volunteer should be told which ones they found and missed.
- `#feedback_N_tolerance` (optional) - distance from the target line, in meters. Overrides the default tolerance set on the workflow task rule.
- `#feedback_N_successMessage` (optional) - message to show when the target is correctly annotated. Overrides the default success message set on the workflow task rule.
- `#feedback_N_failureMessage` (optional) - message to show when the target is incorrectly annotated. Overrides the default failure message set on the workflow task rule.

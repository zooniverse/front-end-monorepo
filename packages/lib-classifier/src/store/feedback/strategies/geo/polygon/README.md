# Feedback Strategy: Geo Polygon

Determines whether a volunteer's geoDrawing point falls inside a target polygon on the map, within a given tolerance.

The target is a polygon ring in `EPSG:4326` (matching the geoDrawing annotation) and the tolerance is a margin in **meters**. The polygon is grown by `tolerance` on every side and the point must fall inside the result; see the [geo grader](../grader/README.md).

Only `Point` features are considered. `SegmentedLine` features are ignored; use the [Geo Line](../line/README.md) strategy for those.

## Subject metadata fields

- `#feedback_N_id` (**required**) - ID of the corresponding workflow task rule.
- `#feedback_N_coordinates` (**required**) - the target ring as a JSON array of `[longitude, latitude]` pairs, at least three; the ring is closed automatically.
- `#feedback_N_tolerance` (optional) - margin of error around the target polygon, in meters. Overrides the default tolerance set on the workflow task rule.
- `#feedback_N_successMessage` (optional) - message to show when the target is correctly annotated. Overrides the default success message set on the workflow task rule.
- `#feedback_N_failureMessage` (optional) - message to show when the target is incorrectly annotated. Overrides the default failure message set on the workflow task rule.

# Feedback Strategy: Geo Box

Determines whether a volunteer's geoDrawing point falls inside a rectangular target region on the map, within a given tolerance.

The box follows the Rectangle and RotateRectangle mark convention: a center point plus width, height, and rotation. `x` is the center longitude and `y` the center latitude (`EPSG:4326`, matching the geoDrawing annotation). `width`, `height`, and `tolerance` are **meters**, matching the geoDrawing task's units (`task.unit`, `uncertainty_radius`); the point is projected onto a local tangent frame at the box center before the test. `theta` is the box rotation in **clockwise** degrees, the same convention as the pointInEllipse strategy.

Only `Point` features are considered. `SegmentedLine` features are ignored.

## Subject metadata fields

- `#feedback_N_id` (**required**) - ID of the corresponding workflow task rule.
- `#feedback_N_x` (**required**) - center longitude of the target box.
- `#feedback_N_y` (**required**) - center latitude of the target box.
- `#feedback_N_width` (**required**) - width of the target box, in meters.
- `#feedback_N_height` (**required**) - height of the target box, in meters.
- `#feedback_N_theta` (optional) - rotation of the target box in clockwise degrees. Default is 0.
- `#feedback_N_tolerance` (optional) - margin of error around the target box, in meters. Overrides the default tolerance set on the workflow task rule.
- `#feedback_N_successMessage` (optional) - message to show when the target is correctly annotated. Overrides the default success message set on the workflow task rule.
- `#feedback_N_failureMessage` (optional) - message to show when the target is incorrectly annotated. Overrides the default failure message set on the workflow task rule.

# Feedback Strategy: Geo Radial

Determines whether a volunteer's geoDrawing point is within a given distance of a target lon/lat.

This is the `radial` strategy carried into geographic coordinates. The geoDrawing annotation is a GeoJSON `FeatureCollection` in `EPSG:4326`, so `x` is longitude and `y` is latitude. The tolerance is a radius in **meters**, matching the geoDrawing task's units (`task.unit`, `uncertainty_radius`); distance is computed on a local tangent frame at the target's latitude, because degree-space arithmetic overstates east-west distances by roughly 1/cos(latitude).

Only `Point` features are considered. `SegmentedLine` features are ignored.

## Subject metadata fields

- `#feedback_N_id` (**required**) - ID of the corresponding workflow task rule.
- `#feedback_N_x` (**required**) - longitude of the target.
- `#feedback_N_y` (**required**) - latitude of the target.
- `#feedback_N_tolerance` (optional) - radius around the target, in meters. Overrides the default tolerance set on the workflow task rule.
- `#feedback_N_successMessage` (optional) - message to show when the target is correctly annotated. Overrides the default success message set on the workflow task rule.
- `#feedback_N_failureMessage` (optional) - message to show when the target is incorrectly annotated. Overrides the default failure message set on the workflow task rule.

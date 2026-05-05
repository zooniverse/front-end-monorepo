# GeoDrawing Task

The geoDrawing task is an experimental task type for capturing geospatial annotations. It is designed to pair with the [GeoMapViewer](../../../../../components/Classifier/components/SubjectViewer/components/GeoMapViewer/README.md) subject viewer.

Volunteers use the map viewer to view and reposition geographic point features. The task tracks the active feature selection, uncertainty radius, and map extent, and persists the final feature positions as a GeoJSON `FeatureCollection` annotation.

## Workflow Configuration

Task definition shape:

```json
"T0": {
  "type": "geoDrawing",
  "instruction": "Adjust the point to match the described location.",
  "required": false,
  "tools": [
    {
      "type": "Point",
      "label": "Location",
      "color": "#ff0000",
      "uncertainty_circle": true
    }
  ]
}
```

### Annotation

The annotation `value` is a GeoJSON `FeatureCollection` written by the map viewer as features are moved or modified. It is `null` until the subject data is loaded.

`isComplete` returns `true` when `value !== null`.

```json
{
  "task": "T0",
  "taskType": "geoDrawing",
  "value": {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-9189987.47, 4213962.65]
        },
        "properties": {
          "uncertainty_radius": 500
        }
      }
    ]
  }
}
```

#### `uncertainty_radius`

When `tool.uncertainty_circle` is `true`, each feature's `properties.uncertainty_radius` (in meters) records the size of the uncertainty circle drawn around the point. It is `null` when the tool does not use uncertainty circles or no radius has been set.

## Notable Behaviors

- **Dual state tracking**: The active point is tracked in two parallel references — an MST `activeFeature` (serializable model) and a volatile `activeOlFeature` (live OpenLayers `Feature`). Radius and geometry changes are synced to both so the map re-renders immediately without requiring a full MST snapshot.
- **Dynamic `maxRadius`**: The slider maximum adjusts as the volunteer zooms or pans the map, so the radius can never exceed the visible area.
- **Unit system**: `task.unit` (default `'meters'`) drives display in `FeatureCard`, `RadiusSlider`, and the measure tool in the map viewer. It is set by `UnitSelect` in the viewer and synced via `task.setUnit`.

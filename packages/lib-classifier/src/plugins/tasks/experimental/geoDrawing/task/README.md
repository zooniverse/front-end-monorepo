# GeoDrawing Task

The geoDrawing task is an experimental task type for capturing geospatial annotations. It is designed to pair with the [GeoMapViewer](../../../../../components/Classifier/components/SubjectViewer/components/GeoMapViewer/README.md) subject viewer.

Volunteers use the map viewer to view and reposition geographic point features and to draw segmented lines. The task tracks the active tool, active feature selection, uncertainty radius, and map extent, and persists the final features as a GeoJSON `FeatureCollection` annotation.

For the full project setup walkthrough (Project Builder steps, tile layers, subject format), see [External Setup: Workflows and Subjects](../../../../../components/Classifier/components/SubjectViewer/components/GeoMapViewer/README.md#external-setup-workflows-and-subjects) in the GeoMapViewer README.

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
    },
    {
      "type": "SegmentedLine",
      "label": "Route",
      "color": "#0000ff",
      "min": 1,
      "max": 3,
      "min_vertices": 3,
      "max_vertices": 10
    }
  ]
}
```

### Tools

Both tool types support:

- _label (string)_ display name for the tool
- _color (string)_ stroke/fill color for features drawn with the tool

`Point` tools additionally support:

- _uncertainty_circle (boolean = false)_ render a resizable uncertainty circle around the point and a radius slider in the task area

`SegmentedLine` tools additionally support:

- _min (number = 0)_ minimum number of lines that must be drawn before the task is complete
- _max (number)_ maximum number of lines that can be drawn; drawing is disabled once reached
- _min_vertices (number = 2)_ minimum vertices per line
- _max_vertices (number)_ maximum vertices per line, enforced while drawing and editing

Panoptes may serve the count fields as strings; the tool models coerce them to numbers.

### Annotation

The annotation `value` is a GeoJSON `FeatureCollection` written by the map viewer as features are moved, drawn, or modified. It is `null` until the subject data is loaded.

`isComplete` returns `true` when `value !== null` and every tool's `min` line count has been met.

Feature coordinates in the annotation are longitude/latitude (`EPSG:4326`), matching the subject GeoJSON. The map renders internally in web mercator (`EPSG:3857`), and features are reprojected back to `EPSG:4326` when the annotation is serialized. Features drawn by a tool carry `properties.toolIndex` identifying which tool created them.

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
          "coordinates": [-82.7326, 35.2351]
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

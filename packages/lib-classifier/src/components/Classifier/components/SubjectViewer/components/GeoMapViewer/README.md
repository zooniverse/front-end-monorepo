# Geographic Map Viewer

The GeoMapViewer is a variant of the Subject Viewer that displays geographic data on an interactive map using OpenLayers. It provides interactive tools for viewing, selecting, and modifying geographic features when paired with a [`geoDrawing`](../../../../../../plugins/tasks/experimental/geoDrawing/task/README.md) task.

## Features

- **Interactive Map Display**: Uses OpenLayers with OpenStreetMap as the default base layer
- **Configurable Tile Layers**: Base layers (OSM, WMS, XYZ, COG) are configured per workflow, with a layer control to switch between them
- **Feature Rendering**: Displays GeoJSON features with customizable styling based on feature properties
- **Feature Selection**: Click to select features for editing or annotation
- **Feature Translation**: Drag selected features to reposition them on the map
- **Line Drawing**: Draw and edit segmented lines when the active `geoDrawing` task has a `SegmentedLine` tool
- **Subject Extent Constraint**: Panning and zooming are constrained to the subject's `bbox`, with the area outside the subject bounds masked
- **Zoom Controls**: Zoom in/out buttons and scroll wheel zooming
- **Distance Measurement**: Toggle measurement mode to draw polylines on the map with live distance tooltips
- **Unit Selection**: Choose the display unit (meters, kilometers, feet, miles, nautical miles) for both the scale line and measurement tool
- **Coordinate Navigation**: Enter a latitude/longitude to pan and zoom the map to that location
- **Map Controls**: Recenter (fit view to all features) and reset (restore original GeoJSON) buttons

## Components

### GeoMapViewerContainer

The container component that:
- Fetches and parses subject JSON data via `useSubjectJSON` (expects `type.name === 'GeoJSON'`)
- Extracts GeoJSON and `reference_data` from the parsed subject file
- Seeds the `geoDrawing` annotation with the initial GeoJSON data on mount (if the annotation has no value yet)
- Passes `handleFeaturesChange`, `handleSelectedFeatureChange`, and `handleMapExtentChange` callbacks to `GeoMapViewer`, which update the `geoDrawing` annotation and task in the classifier store
- Renders `<ReferenceData>` above the map when reference data is present
- Returns `null` while loading; renders an error message on fetch failure

### GeoMapViewer

The main map component that:
- Creates the OpenLayers map **once on mount** with the configured tile layers (falling back to OSM), a vector features layer, and a `ScaleLine` control. When a `geoDrawing` task is active, it also creates `Select`, `Translate`, `ModifyUncertainty`, and `MoveToClick` interactions, plus `Draw` and `Modify` interactions for `SegmentedLine` tools
- Syncs the `ScaleLine` units and measure interaction when `selectedUnit` state changes
- Toggles measure mode on/off, pausing all other interactions during measurement and re-selecting the first feature on exit
- Reloads the vector source when the `geoJSON` prop changes, fits the view, and selects the first feature
- Reports map extent info (`widthMeters`, `heightMeters`, `resolution`) on `moveend` (throttled) via `onMapExtentChange`
- Serializes all OL features to a GeoJSON `FeatureCollection` on every add/change/remove and calls `onFeaturesChange`
- Manages cursor states for point center, drag handle (ew-resize), uncertainty circle, and hover

### LayerControl

Dropdown for switching the visible base tile layer. Only rendered when the workflow configures more than one tile layer. The initially visible layer is the one marked `default: true` (or the first layer when none is marked).

### ReferenceData

A component that displays contextual reference data about the geographic location being viewed. It appears above the map when reference data is provided in the GeoJSON. Returns `null` when `data` is falsy or empty.

### RecenterButton

Fits the map view to the extent of all loaded features. Only rendered when `geoJSON` is present. Requires an `onClick` prop.

### ResetButton

Reloads all map features from the original GeoJSON. Only rendered when both `geoJSON` and a `geoDrawingTask` are present. Wraps `onClick` in a `window.confirm()` guard — the reset only proceeds if the user confirms. Requires an `onClick` prop.

### UnitSelect

Dropdown for selecting the measurement unit for the scale line and measure tool. Exports a `UNIT_OPTIONS` constant.

Available options: `meters`, `kilometers`, `feet`, `miles`, `nautical miles`.

### CoordinateInput

Labeled text input and "Go" button to navigate the map to an entered latitude/longitude coordinate. Validates that input is two comma-separated numeric values within `[-90, 90]` (latitude) and `[-180, 180]` (longitude). Displays an inline error message on invalid input.

`onGoSubmit` is called with `{ latitude, longitude }` on valid submission.

## External Setup: Workflows and Subjects

### Setting Up a Project

A complete GeoMap project is set up as follows:

1. Create a project and workflow in the Project Builder
2. An admin toggles the "Mapping" experimental feature flag for the project
3. An admin sets the workflow's Subject Viewer to "Geographic Map" (`subject_viewer: 'geoMap'`)
4. Add a "GeoDrawing" task to the workflow
5. Add a "Point" or "Segmented Line" tool to the task
6. Add a map tile layer (without one, the viewer falls back to OpenStreetMap)
7. Create a subject set and upload GeoJSON subjects (see Subject Data below)
8. Set the workflow's subject set to the one created in step 7

Example project: [workflow editor](https://www.zooniverse.org/lab/34877/workflows/32503), [classify page](https://www.zooniverse.org/projects/kieftrav/mapping-test-project/classify/workflow/32503).

The "Mapping" experimental feature flag unlocks the map-specific options in the Project Builder. The classifier itself is driven entirely by the workflow configuration: `subject_viewer: 'geoMap'` selects both the GeoMapViewer and the GeoMapLayout.

### Workflow Configuration

The workflow must include a configuration for the GeoMapViewer:

```javascript
workflow.configuration = {
  subject_viewer: 'geoMap',
  subject_viewer_config: {
    tile_layers: [
      { type: 'osm', label: 'OpenStreetMap', default: true },
      {
        type: 'wms',
        label: '2023 imagery',
        url: 'https://imageserver.gisdata.mn.gov/cgi-bin/wms',
        params: { LAYERS: 'fsa2023' }
      }
    ]
  }
}
```

Workflows using GeoMapViewer typically include a [`geoDrawing`](../../../../../../plugins/tasks/experimental/geoDrawing/task/README.md) task that provides tools for annotating geographic features.

#### Tile Layers

`subject_viewer_config.tile_layers` is an array of base layer descriptors. When it is absent or empty, the viewer renders a single OpenStreetMap layer. Each descriptor supports:

- `type` (string, required): one of `osm`, `wms`, `xyz`, or `cog`
- `label` (string): display name shown in the layer control
- `url` (string): source URL, required for `wms`, `xyz`, and `cog` layers
- `params` (object): WMS request parameters; `LAYERS` is required for `wms` layers, `FORMAT` defaults to `image/png`
- `attributions` (string): attribution text for the layer source
- `projection` (string): source projection for `wms` and `xyz` layers
- `default` (boolean): marks the initially visible layer; otherwise the first layer is shown

### Subject Data

Subjects must contain GeoJSON data. The subject's location should be a JSON file (`application/json` mime type) containing a GeoJSON `FeatureCollection`.

#### GeoJSON Structure

The GeoJSON should be a `FeatureCollection`. A minimal subject defines only the map area, with no preloaded features:

```json
{
  "type": "FeatureCollection",
  "bbox": [-91.05, 47.96, -90.97, 48.01],
  "features": []
}
```

A subject can also preload features (for example, a point for volunteers to reposition) and include reference data:

```json
{
  "type": "FeatureCollection",
  "bbox": [-82.8, 35.15, -82.65, 35.3],
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-82.7326, 35.2351]
      },
      "properties": {
        "uncertainty_radius": 100
      }
    }
  ],
  "reference_data": {
    "county": "Transylvania County",
    "state": "NC",
    "country": "United States of America",
    "locality": "Along US Rt. 276, ca. 2.5 mi. S of Jct. with Blue Ridge Parkway."
  }
}
```

#### bbox

`bbox` is a GeoJSON bounding box (`[west, south, east, north]` in longitude/latitude) defining the subject's map area. The viewer fits the initial view to it and constrains panning and minimum zoom to the padded bounds, with the area outside the bounds masked. When `bbox` is absent, the extent of the subject's features is used instead; a zero-area extent (for example, a single point) is not constrained.

#### Reference Data

When the GeoJSON includes a `reference_data` property, it is displayed above the map using the ReferenceData component. This provides contextual information to volunteers about the location they are viewing.

**Expected Structure:**
- `reference_data` should be an object with string keys and string values
- All key-value pairs are displayed in the order they appear in the object
- The component gracefully handles empty or missing reference data by rendering nothing

**Example:**
```json
"reference_data": {
  "county": "Transylvania County",
  "state": "NC",
  "country": "United States of America",
  "locality": "Along US Rt. 276, ca. 2.5 mi. S of Jct. with Blue Ridge Parkway."
}
```

This information appears in a styled section above the map with labels and values formatted for readability.

## Interactions

When a `geoDrawing` task is active:

1. **Select**: Click a feature to select it (restricted to features layer)
2. **Translate**: Drag a selected feature to move it (restricted to a hit radius around the point center, clamped to the subject extent)
3. **Modify Uncertainty**: Drag the uncertainty circle's drag handle to resize the uncertainty radius
4. **Move to Click**: Move the selected point feature to a new location via a map click

When the active tool is a `SegmentedLine` tool:

1. **Draw**: Click to place vertices, double-click to finish the line, Escape to abort an in-progress line. Vertex counts and line counts are enforced from the tool's `min_vertices`/`max_vertices` and `min`/`max` configuration, and vertices must fall within the subject extent
2. **Modify**: Drag a selected line's vertices to edit it
3. **Delete**: Remove a selected line via the delete button anchored to its first vertex

Without a `geoDrawing` task, features are displayed in read-only mode with static styling.

## Layout

The [GeoMapLayout](../../../Layout/README.md#geomaplayout) is assigned to workflows with `configuration.subject_viewer` set as `geoMap`. The viewer container has a height of 90vh (70vh on screens ≤ 768px). The task area is sticky positioned with a width of 20rem.

# Geographic Map Viewer

The GeoMapViewer is a variant of the Subject Viewer that displays geographic data on an interactive map using OpenLayers. It provides interactive tools for viewing, selecting, and modifying geographic features when paired with a `geoDrawing` task.

## Features

- **Interactive Map Display**: Uses OpenLayers with OpenStreetMap as the default base layer
- **Feature Rendering**: Displays GeoJSON features with customizable styling based on feature properties
- **Feature Selection**: Click to select features for editing or annotation
- **Feature Translation**: Drag selected features to reposition them on the map
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
- Creates the OpenLayers map **once on mount** with an OSM tile layer, a vector features layer, a `ScaleLine` control, and — when a `geoDrawing` task is active — `Select`, `Translate`, `ModifyUncertainty`, and `MoveToClick` interactions
- Syncs the `ScaleLine` units and measure interaction when `selectedUnit` state changes
- Toggles measure mode on/off, pausing all other interactions during measurement and re-selecting the first feature on exit
- Reloads the vector source when the `geoJSON` prop changes, fits the view, and selects the first feature
- Reports map extent info (`widthMeters`, `heightMeters`, `resolution`) on `moveend` (throttled) via `onMapExtentChange`
- Serializes all OL features to a GeoJSON `FeatureCollection` on every add/change/remove and calls `onFeaturesChange`
- Manages cursor states for point center, drag handle (ew-resize), uncertainty circle, and hover

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

### Workflow Configuration

The workflow must include a configuration for the GeoMapViewer:

```javascript
workflow.configuration = { subject_viewer: 'geoMap' }
```

Workflows using GeoMapViewer typically include a `geoDrawing` task that provides tools for annotating geographic features.

### Subject Data

Subjects must contain GeoJSON data. The subject's JSON location should point to a GeoJSON file or the subject metadata should include GeoJSON data.

#### GeoJSON Structure

The GeoJSON should be a `FeatureCollection`:

```json
{
  "type": "FeatureCollection",
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
2. **Translate**: Drag a selected feature to move it (restricted to a hit radius around the point center)
3. **Modify Uncertainty**: Drag the uncertainty circle's drag handle to resize the uncertainty radius
4. **Move to Click**: Move the selected point feature to a new location via a map click

Without a `geoDrawing` task, features are displayed in read-only mode with static styling.

## Layout

The GeoMapLayout is assigned to workflows with `configuration.subject_viewer` set as `geoMap`. The viewer container has a height of 90vh (70vh on screens ≤ 768px). The task area is sticky positioned with a width of 20rem.

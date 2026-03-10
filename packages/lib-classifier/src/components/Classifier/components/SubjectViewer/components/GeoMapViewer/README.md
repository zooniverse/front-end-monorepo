# Geographic Map Viewer

The GeoMapViewer is a variant of the Subject Viewer that displays geographic data on an interactive map using OpenLayers. It provides interactive tools for viewing, selecting, and modifying geographic features when paired with a `geoDrawing` task.

## Features

- **Interactive Map Display**: Uses OpenLayers with OpenStreetMap as the default base layer
- **Feature Rendering**: Displays GeoJSON features with customizable styling based on feature properties
- **Feature Selection**: Click to select features for editing or annotation
- **Feature Translation**: Drag selected features to reposition them on the map
- **Uncertainty Modification**: Adjust uncertainty circles around point features
- **Move to Click**: Move selected features to a new location via click interaction
- **Reference Data Display**: Shows contextual information (e.g., location metadata) above the map
- **Map Controls**: Recenter and reset buttons for easy map navigation

## Components

### GeoMapViewerContainer

The container component that:
- Fetches and parses subject JSON data
- Extracts GeoJSON and reference data from the subject
- Updates the classification annotation with modified features
- Handles callbacks for GeoDrawing task component

### GeoMapViewer

The main map component that:
- Renders an OpenLayers map with default OSM base layer
- Displays GeoJSON features on a vector layer
- Manages map interactions (select, translate, modify)
- Tracks and reports map extent changes
- Provides recenter and reset controls

### ReferenceData

A component that displays contextual reference data about the geographic location being viewed. It appears above the map when reference data is provided in the GeoJSON.

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

1. **Select**: Click a feature to select it
2. **Translate**: Drag a selected feature to move it
3. **Modify Uncertainty**: Adjust uncertainty circles on point features
4. **Move to Click**: Use task-specific tools to move features to clicked locations

Without a `geoDrawing` task, features are displayed in read-only mode with static styling.

## Layout

The GeoMapLayout is assigned to workflows with `configuration.subject_viewer` set as `geoMap`. The viewer container has a height of 90vh (70vh on screens ≤ 768px). The task area is sticky positioned with a width of 20rem.

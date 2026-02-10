# ADR 64: GeoDrawing Task

January 6, 2026

## Status

Proposed

## Context

To support geographic and spatial annotation projects, we will create a task type that allows volunteers to draw geographic features on a map viewer. This task should support common geographic annotation types such as points, lines, and polygons, and store the annotations in a standard geographic data format.

## Decision

We will create a geoDrawing task that allows volunteers to draw geographic features on a map viewer. The task will:

- Initially support a point, named the geoPoint tool
- Store annotations as a valid [GeoJSON](https://geojson.org/) FeatureCollection in the annotation value
- The FeatureCollection will contain a `features` array of Feature objects
- Each drawn feature will be represented as a GeoJSON Feature object with:
  - A `geometry` object containing the geographic coordinates
  - A `properties` object for optional metadata (e.g., labels, descriptions)
  - A `type` field set to "Feature"

The following is an example of a geoDrawing task annotation value with a geoPoint tool:

```json
{
  "value": {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [2.2944810, 48.8583701]
        },
        "properties": {
          "name": "Eiffel Tower"
        }
      }
    ]
  },
  "task": "T0",
  "taskType": "geoDrawing",
  "tool": "geoPoint"
}
```

## Consequences

Create an experimental task, the geoDrawing task, in FEM.

### Subsequent Efforts

Future efforts will explore additional geoDrawing tool types such as lines and polygons, as well as styling options.

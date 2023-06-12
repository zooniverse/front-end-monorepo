# ADR 48: JSONData subject location type and viewer

8th June 2023

## Context

Since [ADR 28](adr-28.md) there are a number of JSON data subject viewers, each with its own loading and initialisation code, and its own custom view for rendering a chart as SVG:
- Bar Chart Viewer.
- Data Image Viewer.
- Light Curve Viewer.
- Scatter Plot Viewer.
- Variable Star Viewer.

Workflows that use these viewers are configured manually, by setting the viewer in the workflow configuration.

We can define custom types (MobX State Tree models) for each JSON data format used by these subjects.
## Decision

### JSONData type

A `JSONData` model, which is a union of the types used by individual subject types. It validates an incoming snapshot (from a subject location) and gives us a model of the appropriate type.

```js
const response = await fetch(subjectLocation)
const snapshot = await response.json()
const dataSubject = JSONData.create(snapshot)
const subjectType = getType(dataSubject) // one of BarChart, DataSeriesPlot, TESSLightCurve, or VariableStarPlots
```
Data types currently include:
- `BarChart`: Bar chart data.
- `DataSeriesPlot`: Charts with one or more `x, y` data series eg. SuperWASP: Black Hole Hunters.
- `TESSLightCurve`: Arrays of `x` and `y` points specific to the Planet Hunters TESS project.
- `VariableStarPlots`: A combination of one scatter plot, and one or more bar charts. Used by Zwicky's Stellar Sleuths.

### JSONDataViewer

A generic data loader which creates a `JSONData` type from a subject location, then renders the appropriate view for that type. It replaces individual connector and container components that load subject data for each data subject viewer.

## Status

Approved

## Consequences

- We don't need individual data loading code for each JSON data subject viewer. Old connector and container components, and their corresponding Enzyme tests, can be deleted.
- Workflow configuration doesn't need to be set by hand when a subject location's MIME type is `application/json`.
- Preview SVG's are automatically generated for `application/json` subject locations.
- Planet Hunters TESS, which uses the `text/plain` MIME type, does still need to have its viewer configured manually.
- When a JSON subject uses the `text/plain` MIME type, the project team still needs to add a preview image to each subject. The preview **must** be the first location for each subject and **must** use an `image/*` MIME type.
- Manual workflow configuration is replaced by a single `subject_viewer: 'jsonData'` setting. Old settings for individual viewers are kept for backwards compatibility, but deprecated.

# ADR 63: GeoMap Viewer

November 21, 2025

## Status

Proposed

## Context

To support projects with complex geospatial datasets and provide a better volunteer experience we will create a mapping viewer within the classifier. The mapping viewer will support panning and zooming, and geospatial annotations (latitude and longitude coordinates).

## Decision

Create a new `GeoMapViewer` subject viewer implemented with [OpenLayers](https://openlayers.org/) and a default [OpenStreetMap](https://www.openstreetmap.org/) (OSM) base tile layer. This viewer will:

- Be enabled via workflow configuration: `workflow.configuration.subject_viewer = 'geoMap'`
- Utilize a default OSM base layer
- Default to a minimal toolbar with panning and zooming capabilities

### OpenLayers mapping library

After evaluating mapping libraries including Leaflet, Mapbox GL JS, and OpenLayers, we have chosen OpenLayers (package name `ol`) for the following reasons:

- Open-source JavaScript library with permissive license
- Active community and ongoing maintenance
- Easy to customize and extend
- Good documentation and relevant examples
- Extensive features for handling vector and raster data

### OpenStreetMap default base tile layer

The OSM base tile layer provides a free, open-source, and widely used mapping layer that offers sufficient detail for most geospatial classification tasks. While OSM will be the default base layer, future work may include support for custom tile layers.

## Consequences

- A subsequent ADR will be created regarding geospatial annotation tasks and tools
- This ADR will be updated or a subsequent ADR will be created for custom tile layer support
- OSM is an external dependency; service availability or rate limits could impact the viewer, though custom tile layers can mitigate this in future work
- OpenLayers requires ESM support; we updated fe-project/app-project's Next.js config (`next.config.js`) with `experimental.esmExternals: 'loose'` to accommodate this, which may require revisiting as ESM and CJS interoperability evolves

### Subject

#### Initial Efforts

Initial efforts to add a mapping viewer focus on a subject that, before classification, will send locality data (i.e. country, state, locality description) to the GEOLocate API. The GEOLocate API will return latitude and longitude coordinates and an uncertainty value. The GEOLocate coordinates and uncertainty value will be processed through Caesar and ingested into the classifier with mapping viewer for volunteer confirmation or adjustment. The initial mapping viewer effort is agnostic to subject data per the Zooniverse subject resource `subject.locations` array.

#### Subsequent Efforts

Future efforts will explore additional mapping viewer possibilities based on subject data. Accordingly, while initial efforts will focus on sensible defaults, future work will likely support workflow configuration options to supersede the defaults, and subject data that would supersede the workflow configuration and defaults.

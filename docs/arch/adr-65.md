# ADR 65: GeoJSON Subject

October 1, 2026

## Status

Proposed

## Context

[ADR 28](adr-28.md) made JSON data a subject type and [ADR 48](adr-48.md) consolidated it into a shared `JSONData` model. In practice `JSONData` is a family of subtypes: a light curve, a bar chart and a variable star payload share only a MIME type.

Geographic projects need another member. [ADR 63](adr-63.md) covers the viewer and [ADR 64](adr-64.md) the task; neither covers the subject itself. This ADR does.

## Decision

GeoJSON is a member of the `JSONData` subject family, recognized by its payload and rendered by `GeoMapViewer`.

### Structure of a GeoJSON subject

One subject location of MIME type `application/json` whose body is an [RFC 7946](https://datatracker.ietf.org/doc/html/rfc7946) `FeatureCollection`:

- `features` lists `Feature` objects, each a `geometry` (`type` plus `coordinates`) and a free-form `properties`. It may be empty, leaving the volunteer to draw everything.
- `bbox` is optional and read as the subject extent, constraining the map. Omit it and the extent comes from the features, so one seeded point yields a point extent.
- `reference_data` is optional and a [Foreign Member](https://datatracker.ietf.org/doc/html/rfc7946#section-6.1), which RFC 7946 parsers must ignore. It carries provenance the volunteer needs to place a feature, such as a transcribed specimen locality, and is displayed above the map.
- Coordinates are presumed WGS84 (`EPSG:4326`) in longitude, latitude order, per RFC 7946.

The model is [`store/JSONData/GeoJSON.js`](../../packages/lib-classifier/src/store/JSONData/GeoJSON.js). Its geometry `type` enumeration admits the OpenLayers set, wider than RFC 7946: it also accepts `LinearRing` and `Circle`.

```json
{
  "type": "FeatureCollection",
  "bbox": [-105.2960, 39.9600, -105.2690, 39.9880],
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-105.2825, 39.9740]
      },
      "properties": {}
    }
  ],
  "reference_data": {
    "country": "U.S.A.",
    "stateprovince": "Colorado",
    "county": "Boulder",
    "locality": "City of Boulder Mountain Parks; Shanahan Ridge: base of Flatirons."
  }
}
```

### How the classifier detects a GeoJSON subject

Two independent decisions, which are easy to conflate:

- **Which viewer loads** is decided by the workflow, not the payload. [`Subject.viewer`](https://github.com/zooniverse/front-end-monorepo/blob/828eeeb/packages/lib-classifier/src/store/subjects/Subject/Subject.js#L49-L109) returns `geoMap` when `subject_viewer: "geoMap"` is configured, or when `subject_viewer_config` declares a non-empty `tile_layers` or `overlay_layers`.
- **Which model the payload becomes** is decided by the payload. The fetched JSON is parsed against a `types.union` of known models, first match wins. `GeoJSON` is discriminated by `type: types.literal('FeatureCollection')`.

With both satisfied, [`GeoMapViewerContainer`](https://github.com/zooniverse/front-end-monorepo/blob/828eeeb/packages/lib-classifier/src/components/Classifier/components/SubjectViewer/components/GeoMapViewer/GeoMapViewerContainer.jsx#L70-L84) renders `reference_data`, hands the FeatureCollection to the map, and seeds the `geoDrawing` annotation with the subject's features so seeded and drawn geometry share one FeatureCollection ([ADR 64](adr-64.md)). On submit, `ClassificationStore` records [`featureProjection` and `mapContext`](https://github.com/zooniverse/front-end-monorepo/blob/828eeeb/packages/lib-classifier/src/store/ClassificationStore.js#L125-L134) so an aggregator knows the projection, the active layer and the viewport.

### How a GeoJSON subject previews outside the classifier

`SubjectCard`, `CollectionCard` and Talk do not use the classifier's viewers. [FEM PR 7254](https://github.com/zooniverse/front-end-monorepo/pull/7254) added `GeoJSON` to the `lib-react-components` union so [`Media`](../../packages/lib-react-components/src/Media/components/Data/Data.jsx) recognizes the payload instead of erroring. No map preview is registered, so it falls through to the generic JSON viewer. That is intended: previews stay cheap rather than pulling OpenLayers into `lib-react-components`.

## Consequences

- Live JSON subject projects such as Planet Hunters TESS are unaffected. No existing payload carries the `FeatureCollection` literal, so `GeoJSON` cannot capture one.
- `GeoMapViewer` stays behind workflow configuration while the geo work is in progress. A valid GeoJSON subject without that configuration routes to the [`JSONDataViewer`](../../packages/lib-classifier/src/components/Classifier/components/SubjectViewer/components/JSONDataViewer/JSONDataViewer.jsx), which registers no `GeoJSON` viewer, so it does not degrade gracefully. This is a known gap, not a supported fallback.
- Opening the viewer to everyone means registering `GeoMapViewer` in `JSONDataViewer` alongside BarChart, ScatterPlot, LightCurve and VariableStar. Those viewers (except LightCurve) have `chartOptions` and `data` destructured for them by the parent, so each must take the raw JSON first, as [FEM PR 7254](https://github.com/zooniverse/front-end-monorepo/pull/7254) did for `Media`.
- A new `JSONData` member must be considered twice. The [classifier](../../packages/lib-classifier/src/store/JSONData/index.js) and [`lib-react-components`](../../packages/lib-react-components/src/types/JSONData/index.js) unions deliberately differ in membership, are order sensitive, and are fed by two parallel hooks.
- An invalid `FeatureCollection` falls back to raw JSON with a console warning, and the map renders no features.
- Feature `properties` are load-bearing: the drawing tools stamp `toolIndex` and `layer` there. See [issue 7387](https://github.com/zooniverse/front-end-monorepo/issues/7387) on whether `layer` should be top-level instead.

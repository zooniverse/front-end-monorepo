# ADR 65: GeoJSON Subject Viewer

March 17, 2026

## Status

Proposed

## Context

Since [ADR 28](adr-28.md), we support multiple JSON-based subject viewers. [ADR 48](adr-48.md) introduced a shared `JSONData` model and `JSONDataViewer` approach so JSON subject locations can be loaded and routed to the appropriate viewer.

For geographic annotation projects, [ADR 64](adr-64.md) proposes a new `geoDrawing` task with annotation values stored as GeoJSON. We need a subject viewer that can render GeoJSON subject data directly from a location with MIME type `application/json`.

## Decision

We will support GeoJSON as a `JSONData` subject type and render it with a dedicated map viewer.

- Add a `GeoJSON` model to the JSON data union used by the classifier.
- Treat valid GeoJSON `FeatureCollection` payloads from `application/json` subject locations as a GeoJSON subject.
- Render GeoJSON subjects with `GeoMapViewer`, including optional `reference_data` when present.
- When a workflow includes a `geoDrawing` task, initialize and update the task annotation value as GeoJSON `FeatureCollection` data.
- Per [RFC 7946](https://datatracker.ietf.org/doc/html/rfc7946), GeoJSON feature coordinates are presumed to use World Geodetic System 1984 (WGS84).

This keeps GeoJSON support aligned with the existing JSON subject viewer architecture.

## Consequences

- Projects can upload GeoJSON subject data as `application/json` and have it rendered by the GeoJSON viewer path.
- GeoJSON loading and rendering follows the same generic JSONData flow as other JSON viewers, reducing viewer-specific loading code.
- Existing JSON viewer behavior remains unchanged for non-GeoJSON payloads.
- GeoJSON subjects must provide valid `FeatureCollection` data to be parsed as this type.
- Future work may add viewer configuration to accept coordinate systems beyond WGS84.

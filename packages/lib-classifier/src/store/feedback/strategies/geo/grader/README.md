# Geo feedback grader

One grader for every geo strategy. A strategy turns its rule into a GeoJSON target (`geometry(rule)`: a `Point`, `LineString`, or `Polygon` in `EPSG:4326`) and names the annotation geometry types it grades; the grader grows the target by the rule's `tolerance` in meters ([`@turf/buffer`](https://turfjs.org/docs/api/buffer)) and passes every accepted feature that lies inside the result ([`@turf/boolean-within`](https://turfjs.org/docs/api/booleanWithin)).

So a point passes a Geo Radial rule when it is inside a circle of radius `tolerance`, a point passes a Geo Box or Geo Polygon rule when it is inside the shape grown by `tolerance` (rounded corners), and a line passes a Geo Line rule when every part of it stays inside a corridor `tolerance` wide around the target line. Longitudes are unwrapped onto the target's world copy first, so a target on the antimeridian works.

## Loading

turf and its geometry engine are about 250 KB minified, and most projects never use geo feedback, so `grader/turf.js` is the only module that imports `@turf/*` and it is only ever reached through `grader.load()` (a memoized `import()`). Every geo strategy exports `load: grader.load`; `FeedbackStore.createRules` awaits the loaders of the strategies a workflow references before it builds any rules, so the reducers can stay synchronous and the chunk is only fetched for subjects that carry geo feedback.

The feedback modal's map draws each rule's grown target via `grader.targetGeometry`.

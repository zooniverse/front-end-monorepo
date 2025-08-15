# ZTM 2025 Experimental Geographical Map Viewer

This is an experimental Subject Viewer for viewing geographical map data.

Context:
- The Zooniverse Team believes there's interest from research teams to use maps
  (of planet Earth mostly, but we're not limited to the terrestrial) on the
  Zooniverse platform.
- We don't have this functionality yet, as of 2025.
- During the Zooniverse Team Meeting in August 2025, a rogue loose canon
  web developer who doesn't play by the rules decided to explore what can be
  done with web mapping technology, what options are available, and what
  challenges we need to be aware of when building a Geographical Map Viewer.
- This is it. You're looking at that experiment.

Notes:
- Our code sometimes uses the term GeoMap instead of Map to differentiate it
  from a JavaScript Map object.

## Dev Notes

**Safety and Scope**

The Ztm2025GeoMapViewer should ONLY be accessible on a very limited set of
projects, hand-picked by Zooniverse team.

Features & functionality are limited at best, wonky at worst. It's an
experiment.

**How to enable/use this experiment**

TODO

## Dev Journal (aka How's the Experiment Going?)

**August 2025: ZTM Hack**

- Ztm2025GeoMapViewer added.
  - OpenLayers version added.
  - Leaflet version added.
- ⚒️ Ongoing Experiment: what are the pros/cons of OpenLayers vs Leaflet?
- 🤔 Item of Interest: **projections**
  - Different maps can have different projections (i.e. how they represent the
    curved Earth on a 2D plane).
    - Traditional GPS coordinates use WGS84 (aka EPSG:4326).
    - Web apps like Google Maps use Web Mercator (EPSG:3857). 
      - For bonus confusion points, Web Mercator is actually a subset or variant
        of WGS84, so you'll also see Web Mercator called
        "WGS 84 / Pseudo-Mercator".
    - ⚠️ Coordinates based on different projections aren't compatible with one
      another! e.g. The University of Oxford's Denys Wilkinson Building has the
      coordinates 51.7595°N, 1.2595°W in traditional GPS, but in Web Mercator
      those same coordinates are x=-140206 y=6756756.
    - ❗️ It's incredibly important that we figure out what projections we use to
      (1) display maps to volunteers, and (2) collect coordinates (annotations)
      from classifications.
    - ❗️ Different research teams may be used to different coordinate systems.
      We require real life examples.
  - OpenLayers uses Web Mercator by default, but natively supports all sorts of
    projections. (It's super easy to get WGS84 working, though the map is
    visually stretched and looks kinda bad.)
  - Leaflet only supports Web Mercator. There are plugins that could solve this,
    but this requires exploration.

## End-Of-Experiment Plans (aka Adoption or Ejection)

Eventually, this experiment has to end with either formal adoption into the FEM
codebase, or ignoble ejection into the void.

When this decision has to be made: at most 1 year after this experiment is last
actively maintained.

If we choose to adopt:
- The README should be updated.
- The code in this folder should be reorganised and cleaned up.
- This folder (and its components) should be renamed to something that's not
  Ztm2025GeoMapViewer.

If we choose to eject:
- Delete this folder.
- Remove `leaflet` and `ol` (OpenLayers) from package.json (packages/lib-classifier/package.json)
  (assuming these aren't used anywhere else)
- Remove ztm2025geomap entry from `viewers` in getViewer.js (packages/lib-classifier/src/components/Classifier/components/SubjectViewer/helpers/getViewer/getViewer.js)
- Remove ztm2025geomap property from subjectViewers.js (packages/lib-classifier/src/helpers/subjectViewers/subjectViewers.js)
- Double check that there's no leftover code that forces the ztm2025geomap selection in Subject's get viewer() (packages/lib-classifier/src/store/subjects/Subject/Subject.js)

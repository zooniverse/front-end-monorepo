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

## Dev Journal

**August 2025: ZTM Hack**

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

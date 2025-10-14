# ZTM 2025 Experimental Geographical Map Viewer

This is an experimental Subject Viewer for viewing geographical map data.

Context:
- The Zooniverse Team believes there's interest from research teams to use maps
  (of planet Earth mostly, but we're not limited to the terrestrial) on the
  Zooniverse platform.

Notes:
- Our code sometimes uses the term GeoMap instead of Map to differentiate it
  from a JavaScript Map object.
- This is based on the Experimental ZTM2025 Geographical Map Viewer. See
  https://github.com/zooniverse/front-end-monorepo/pull/6995

## Dev Notes

**Safety and Scope**

The Ztm2025GeoMapViewer should ONLY be accessible on a very limited set of
projects, hand-picked by Zooniverse team.

Features & functionality are limited at best, wonky at worst. It's an
experiment.

**How to enable/use this experiment**

Setup:
- Create (or select) a **workflow** which is configured to use the
  GeoMapViewer.
  - To enable the map viewer for a workflow, you just need to set its
    workflow.configuration.subject_viewer value to `geoMap` (see below).
    This is usually done via Panoptes CLI.

```
// Example workflow config
myWorkflow = {
  configuration: {
    subject_viewer: "geoMap"
  }
} 
```

- Add whatever **tasks** you want to the workflow.
  - At the moment, we don't have map-specific tasks.
- Add whatever **subjects** you want to the workflow's associated subject sets.
  - At the moment, we don't have map specific subjects.
- View the workflow on lib-classifier's dev server.
  - e.g.: `cd packages/lib-classifier ; yarn dev`
    then use Chrome to open https://local.zooniverse.org:8080/?env=staging&project=2025

# ZTM 2025 Experimental Geographical Map Viewer

This is an experimental Subject Viewer for viewing geographical map data.

Context:

- The Zooniverse Team believes there's interest from research teams to use maps
  (of planet Earth mostly, but we're not limited to the terrestrial) on the
  Zooniverse platform.
- We don't have this functionality yet, as of 2025.
- During the Zooniverse Team Meeting in August 2025, a rogue loose cannon
  web developer who doesn't play by the rules decided to explore what can be
  done with web mapping technology, what options are available, and what
  challenges we need to be aware of when building a Geographical Map Viewer.
- This is it. You're looking at that experiment.

Notes:
- Our code sometimes uses the term GeoMap instead of Map to differentiate it
  from a JavaScript Map object.

🌟 **This experiment is complete as of 14 Oct 2025!** 🌟

Key Lessons:

- **OpenLayers** appears to be the better choice, compared to Leaflet.
  - OL has more functionality for our needs, notably supporting different projections out of the box.
  - OL also seems to work better with our test suite.
- OL requires **lib-classifier be built in ES6**, not CJS.
- Remember to **_not_ include file extensions** on imports.
  - A lot of OL's example code has things like `import Map from 'ol/Map.js'`. For FEM, we want to change that to `import Map from 'ol/Map'`.
- **CSS files** can just be copied straight into our code, instead of being imported.

## Dev Notes

**Safety and Scope**

The Ztm2025GeoMapViewer should ONLY be accessible on a very limited set of
projects, hand-picked by Zooniverse team.

Features & functionality are limited at best, wonky at worst. It's an
experiment.

**How to enable/use this experiment**

Setup:
- Create (or select) a **workflow** which is configured to use the
  Ztm2025GeoMapViewer.
  - To enable the map viewer for a workflow, you just need to set its
    workflow.configuration.subject_viewer value to `ztm2025geomap` (see below).
    This is usually done via Panoptes CLI.

```
// Example workflow config
myWorkflow = {
  configuration: {
    subject_viewer: "ztm2025geomap"
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

Features:
- If you're looking at a workflow that's correctly set up, you should see...
  - ...a geographical map on the Subject Classifier.
  - ...that the map can be explored (using mouse drag, mouse scroll) like a
    typical map widget.
  - ...that the map displays data from OpenStreetMaps.
- You can switch between Leaflet and OpenLayers implementations of the
  explorable map.
- The Leaflet version...
  - ...should default to a view of somewhere in London.
- The OpenLayers version...
  - ...should default to a view of the Denys Wilkinson Building in the
    University of Oxford, in the UK.
  - ...allows you switch between Web Mercator and WGS84 (GPS) projections, if
    only to prove why we're using Web Mercator projections.

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

**Case Study: Planetary Response Network**

2025.08.15: Shaun & Brooke had a quick chat about how PRN uses maps on the
Zooniverse, and asked the question of, "if the GeoMapViewer wants to be useful
for the specific PRN use case, what does it need to address?"

- Map Tile Layers:
  - For disaster relief, we'll need to pull map tiles with (1) very recent data
    and (2) very high zoom (i.e. we want to see details in the _meter_ range.)
  - ❓ Question: where can we get access to this map data? Who'd provide it?
    - Would this be coming from a paid service, or hosted on a private server?
      Do we need to worry about archiving this data for future reference
      (e.g. for posts on Talk) ?
  - ⭐️ Useful feature: provide layers with "Before" and "After" data. Allow
    volunteers to examine/evaluate changes resulting from a disaster.
  - OpenStreetMaps might actually still be useful (if just a bit) so volunteers
    can compare the "official" map data and actual map photos. Might be worth
    adding a "map data doesn't match reality!" button for reporting, maybe.
- "Subject Data":
  - Most of the time we want to constrain/clamp volunteers to classifying on
    a specific area of the map, and prevent too much wandering around the larger
    map. (Dev note: we should be able to implement this.)
  - Conversely, it may sometimes be useful to allow volunteers to classify
    random parts of the map. (TODO: investigate cases for both.)
  - 🤔 Is allowing volunteers to choose which part of the map they look at,
    similar to letting volunteers choose their subject?
- Annotations & Classifying:
  - With PRN, the Subjects are such zoomed-in satellite images that getting
    exact GPS coordinates wasn't an issue. They took the lat/long of the image's
    corners and the x,y coordinates of annotations on the image, and extrapolated
    the GPS coordinates of the annotations from there. 
  - If we use the GeoMapViewer, we can actually get accurate GPS coordinates,
    so we SHOULD record those in annotations.
    - This means we devs need to figure out how to convert Web Mercator (x,y)
      coordinates to standard GSP (latitude, longitude) coordinates.
    - Storing exact GPS coordinates will also make it much easier to aggregate.

**Solved Issue: CSS Imports Breaking Build**

2025.08.15: (Fixed) OpenLayers & Leaflet imports used to kill `yarn build`
on the _app-project_ package. This meant that this PR used to break
`yarn bootstrap`. The error was traced to CSS imports (e.g.
`import 'ol/ol.css'`), and our workaround was to use inline CSS copies.

<details>
<summary>[Previous Notes]</summary>

2025.08.15: ❗️⚠️☠️ the OpenLayers & Leaflet imports kill `yarn build` on the
_app-project_ package. This means this PR breaks `yarn bootstrap` 😬
- Error message when running `cd packages/app-project ; yarn build`
  is `Module not found: ESM packages (ol/Map.js) need to be imported. Use 'import' to reference the package instead. https://nextjs.org/docs/messages/import-esm-externals`
- `yarn build` and `yarn dev` both work fine in lib-classifier.
- UPDATE: after some trial and error, it appears that the CSS imports, i.e.
  `import 'ol/ol.css'` and `import 'leaflet/dist/leaflet.css'`, were the reasons
  that app-project threw a fit. app-project's `yarn build` seems to work once
  those CSS import lines were commented out, but this 'solution' does mean we'd
  need to find another way of getting those CSS styles into the FEM page.

</details>

** Solved Issue: Broken Tests**

2025.10.14: (Fixed) Leaflet used to break our tests, so we removed Leaflet.

<details>
<summary>[Previous Notes]</summary>

2025.08.20: OpenLayers & Leaflet are killing `yarn test` on both
lib-classifier and app-project. Error message is:

```
Exception during run: TypeError: Cannot read properties of undefined (reading 'indexOf')
  at /Users/REDACTED/projects/front-end-monorepo/node_modules/leaflet/src/core/Browser.js:65:30
  at /Users/REDACTED/projects/front-end-monorepo/node_modules/leaflet/dist/leaflet-src.js:7:66
```

2025.10.13: Leaflet is killing `yarn test` on lib-classifier. Error message is:

```
TypeError: Cannot read properties of undefined (reading 'indexOf')
 > ../../node_modules/leaflet/src/core/Browser.js:65:30
 > ../../node_modules/leaflet/dist/leaflet-src.js:7:66
```

Good news is, we may decide not to use Leaflet altogether, so this may be a moot
issue.

</details>

**October 2025: CSSI Meeting & rebase**

- The dev branch was rebased on top of 62e4c77, which required some adjustments
  to get it (sort of) working.
  - .js files renamed to .jsx files.
  - All imports now don't have explicit filenames, e.g.
    `import OLMap from 'ol/Map.js'` => `import OLMap from 'ol/Map'` 
- We're now targetting **Node v22.20**
- ⚠️ New issue: Leaflet fails in lib-classifier's `yarn test`
    ```
    TypeError: Cannot read properties of undefined (reading 'indexOf')
    > ../../node_modules/leaflet/src/core/Browser.js:65:30
    > ../../node_modules/leaflet/dist/leaflet-src.js:7:66
    ```
    - lib-classifier's `yarn build` works fine, though.
    - "Solution"(?): remove Leaflet, since it looks like OpenLayers is the way
      to go anyhow.
- ⚠️ New issue: app-project can't run GeoMapViewer due to CJS/ESM nonsense
  - Running app-project's `yarn dev` and trying to view [an example project](https://local.zooniverse.org:3000/projects/darkeshard/geo-map-project/classify/workflow/3866?env=staging) now results in an error.
    ```
    Module not found: ESM packages (ol/Map) need to be imported. Use 'import' to reference the package instead. https://nextjs.org/docs/messages/import-esm-externals
    ```
  - app-project's `yarn build` works fine.
  - Workaround: force lib-classifier to use ESM instead of CJS by default.
    - Change `lib-classifier/package.json`'s `"main": "dist/cjs/components/Classifier/index.js"` to `"main": "dist/esm/components/Classifier/index.js"`
- ⚠️ New issue: yarn bootstrap also fails, do to CJS/ESM nonsense as well.
  ```
  ../lib-classifier/dist/cjs/components/Classifier/components/SubjectViewer/components/Ztm2025GeoMapViewer/OpenLayersGeoMap.js
  Module not found: ESM packages (ol/Map) need to be imported. Use 'import' to reference the package instead. https://nextjs.org/docs/messages/import-esm-externals
  ```
  - Workaround: force lib-classifier to use ESM instead of CJS by default.
    - Change `lib-classifier/package.json`'s `"main": "dist/cjs/components/Classifier/index.js"` to `"main": "dist/esm/components/Classifier/index.js"`

⚠️ **Active Issue: Build size**

2025.08.20: adding OpenLayers (ol) and Leaflet to lib-classifier may increase
build size of lib-classifier as a whole? This needs to be evaluated.

⚠️ **Active Issue: OpenLayers needs lib-classifier to be ESM**

2025.10.13: OpenLayers library is ESM-only, meaning lib-classifier can't be
built as CommonJS.
- `yarn bootstrap` fails. app-project's `yarn build` will also fail, if
  lib-classifier was built with CJS.
- Workaround(/Solution?): `yarn bootstrap:es6` works! (Don't forget to yarn
  panic first)
- If you want to get down to it, we just want to prevent lib-classifier from
  giving its CJS version to app-project. One hacky way is to change
  lib-classifier's package.json's `main` to point to "dist/esm" instead of
  "dist/cjs". Alternatively, I think cleaning out lib-classifier's dist and then
  running `yarn build:es6` should work too, since that's what bootstrap:es6
  actually does.
- PS: we're using Node v22.20 now, btw.

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
- Remove ztm2025geomap option from the subject_viewer & viewerType() lists in WorkflowConfiguration.js (packages/lib-classifier/src/store/WorkflowStore/Workflow/WorkflowConfiguration/WorkflowConfiguration.js)

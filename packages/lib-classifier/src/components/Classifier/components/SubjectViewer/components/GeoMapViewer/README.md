# Experimental Geographical Map Viewer

This is an experimental Subject Viewer for viewing geographical map data.

Context:
- The Zooniverse Team believes there's interest from research teams to use maps
  (of planet Earth mostly, but we're not limited to the terrestrial) on the
  Zooniverse platform.

Notes:
- Our code uses the term GeoMap instead of Map to differentiate it from a
  JavaScript Map object.
- This is based on the Experimental ZTM2025 Geographical Map Viewer. See
  https://github.com/zooniverse/front-end-monorepo/pull/6995

## Subject Viewer: GeoMapViewer

- Uses OpenLayers to display geographical map regions.
- Enabled by setting workflow.configuration.subject_viewer = 'geoMap'
- Map exploration is constrained to a certain region around a geographical point
  of interest.

## Subject Type: GeoMapV1

- A subtype of JSON Data Subjects.
- Describes a geographical point of interest, defined by a latitude, a
  longitude, and a zoom value.

Example JSON file:

```
{
  "_type": "geomap",
  "_version": 1,
  "info": "Buckingham Palace, London",
  "lat": 51.50165,
  "long": -0.14185,
  "zoom": 16
}
```

## Dev Notes

**Safety and Scope**

The GeoMapViewer should ONLY be accessible on a very limited set of
projects, hand-picked by Zooniverse team.

Features & functionality are limited at best, wonky at worst. It's an
experiment.

**How to enable/use this experiment**

If you just want to preview this experiment:

- Run `yarn panic` then `yarn bootstrap:es6`
  - (⚠️ OpenLayers requires ESM, and will cause problems if any package is built
    in CJS. 😬)
- Run lib-classifier's `yarn dev` and view a test project, e.g.
  https://local.zooniverse.org:8080/?env=staging&project=darkeshard/geo-map-project&workflow=3870&demo=true
- OR run app-project's `yarn dev` and view a test project, e.g.
  https://local.zooniverse.org:3000/projects/darkeshard/geo-map-project/classify/workflow/3870?env=staging
- You should see an explorable map, showing the Subject (a geographical point of interest).

If you want to set up _your own test project_ to work with this experiment:

<details>
<summary>Step 1: create a new Project.</summary>

Just go to https://www.zooniverse.org/lab and create a new Project.

</details>

<details>
<summary>Step 2: create some GeoMapV1 subjects</summary>

Here are 5 example you can copy and paste into 5 different JSON files.

```
{
  "_type": "geomap",
  "_version": 1,
  "info": "Buckingham Palace, London",
  "lat": 51.50165,
  "long": -0.14185,
  "zoom": 16
}
```

```
{
  "_type": "geomap",
  "_version": 1,
  "info": "Petronas Twin Towers, Kuala Lumpur",
  "lat": 3.15757,
  "long": 101.71157,
  "zoom": 16
}
```

```
{
  "_type": "geomap",
  "_version": 1,
  "info": "Radcliffe Camera, University of Oxford",
  "lat": 51.75357,
  "long": -1.25404,
  "zoom": 16
}
```

```
{
  "_type": "geomap",
  "_version": 1,
  "info": "Adler Planetarium, Chicago",
  "lat": 41.86653,
  "long": -87.60677,
  "zoom": 16
}
```

```
{
  "_type": "geomap",
  "_version": 1,
  "info": "Melbourne Central, Melbourne",
  "lat": -37.81008,
  "long": 144.96282,
  "zoom": 16
}
```

Upload these 5 JSON files to a new Subject Set, say "Example GeoMap POIs"

</details>

<details>
<summary>Step 3: create a Workflow that uses the GeoMapViewer, and uses the GeoMapV1 subjects</summary>

- Create a new Workflow in your new Project.
- Using whatever dark sorcery is available to you, change the configuration so we have `workflow.configuration.subject_viewer = 'geoMap'`
- Add a simple Question Task. (e.g. "Is this interesting?" "Yes/No")
- Add the "Example GeoMaps POI" Subject Set to the Workflow.

</details>

# ADR 9: Classifier - Logic for Selecting a Subject Viewer

October 23, 2018

## Context

The big question: which Subject Viewer should we use to view a given Subject?

At the moment, the Classifier tries to "guess" which Subject Viewer to use (see
`lib-classifier/src/store/Subject.js`, `get viewer()`) by analysing the Subject
itself. e.g. if the Subject has multiple images, show a multi-image viewer. If
the Subject has a video, show a video viewer.

While this method works in a majority of projects, certain projects with
extremely specific Subject structures breaks the generalised "guessing" logic,
or else warps the logic with so many "what if" clauses that it collapses into a
writhing mass of nonsense.

For example, a TESS Planet Hunters Subject looks like...

```
Subject 12345 = {
  ...
  locations: [
    { "image/png": "tess-data-12345.png" },
    { "application/json": "tess-data-12345.json" }
  ]
}

tess-data-12345.json = {
  x: [1,2,3,4,5],
  y: [6,7,8,9,0]
}
```

If we were to add to the "guess the Subject Viewer" logic by stating that _"any
Subject that has a JSON, and that JSON has x-y coordinates, should use the Light
Curve Viewer",_ then we'd have trouble if, say, a future project needs similar
JSONs with x-y coordinates for a Map Viewer or a Line Graph Viewer, etc.

Side note:
- The Light Curve Viewer can still also serve as a generic Scatterplot Viewer
  given proper tweaks - this should be marked for future dev so JSON data with
  generic x-y data can be "guessed".

## Decision

The "Choose a Subject Viewer" logic (again, see
`lib-classifier/src/store/Subject.js`, `get viewer()`) will _first_ try to check
if there's a **Workflow Configuration** stating the preferred Subject Viewer.

If this specific configuration does not exist, the logic will _continue_ to
"guess" the correct Subject Viewer to use, as per the current system.

```
//Example of a workflow.configuration for TESS project:
{
  subject_viewer: "lightcurveviewer"
}
```

We've also decided _not_ to specify the "Custom/Specific Subject Viewer" logic
within the _Subject_ itself, since it'll make the Subjects more complicated and
maintenance troublesome. (Compare changing the config field of one Workflow vs
updating the metadata or JSON of a million Subjects.)

i.e. we should **not** do something like:
```
tess-data-12345.json = {
  type: 'lightcurve',
  x: [1,2,3,4,5],
  y: [6,7,8,9,0]
}
```

## Status

Discussed by @shaun.a.noordin and @srallen.

## Consequences

- Zooniverse projects _may_ specify the subject viewer of their choice by
  modifying their **workflow configuration**
- Zooniverse projects may, of course, choose to ignore this.
- We'll need to create documentation somewhere of the catalogue of Subject
  Viewers that are available to project owners, OR build the option to select
  a specific Subject Viewer in the Project Builder.

Additional note:
- the LCV should be expanded into a generalised **Scatter Plot Viewer** so the
  "Select your Subject Viewer" logic can handle _generic situations_ when it
  detects that the Subject has a JSON with x-y values.

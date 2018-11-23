# Light Curve Viewer

The Light Curve Viewer is a variant of the Subject Viewer that's used to
display "light curve" data, which plots the brightness of a star over time.

The strength of the LCV over, say, a static image generated from the same
light curve data is that the LCV allows users to zoom in on different segments
of the data, at a very high precision.

The LCV was originally created by @shaun.a.noordin on Oct 2018, for the Planet
Hunters (2018/2019) project that's using data from TESS (NASA's Transiting
Exoplanet Survey Satellite)

## Features

The Light Curve Viewer...
- allows users to view light curve data (x-axis: brightness of a star, y-axis:
  time)
- allows users to zoom in and pan on the data

Note that the LCV is essentially a specialised subset of a generalised
"Scatterplot Viewer".

## External Setup: Workflows and Subjects

The Light Curve Viewer was originally designed to work with the TESS Planet
Hunters project. (Click [here](https://pfe-preview.zooniverse.org/projects/nora-dot-test/planet-finders-beta)
for the staging/development version.)

That project had a specific setup, which should be followed if we want to use
the LCV for other projects.

**Workflow**

The Workflow of the project had a configuration that specified to the Monorepo
Front End that the LCV should be used.

`workflow.configuration = { subject_viewer: 'lightcurve' }`

**Subject**

Each Subject has two files: an image file (which works as a "thumbnail" to be
seen on Talk) and a JSON file.

```
subject.locations = [
  { "image/png": "tess1234.png" },
  { "application/json": "tess1234.json" },
]
```

**JSON file**

The JSON file is a very, very basic structure of x-y coordinates.

```
//tess1234.json
{
  x: [1,2,3,4,5],
  y: [100,101,99,102,98]
}
```

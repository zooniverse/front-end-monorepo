# DataImageViewer

The Data Image Viewer is a variant of the Subject Viewer that is a composite of the Scatter Plot Viewer and an image viewer, rendered side-by-side.

- The Data Image Viewer has a very specific use case.
  - **// TODO: link to an example project**
- The Data Image Viewer _assumes_ any Subject fed into it will consists of:
  - _exactly 1_ JSON file that can be displayed on a Scatter Plot Viewer.
  - _1 or more_ image files.
- The Data Image Viewer must be enabled via Workflow configuration; its use can't be inferred from the presence of a Data Image Subject...
- ...because the Data Image Subject model doesn't exist.

See "External Set" and "Dev Notes" for more info.

## Features

The Data Image Viewer...
- allows users to view coordinate data series in a scatter plot
- allows users to view one or more images

## Props

// TODO add information about component props

## External Setup: Workflows and Subjects

### Workflow

The Workflow of the project should have a configuration specified that the Variable Star Viewer should be used.

`workflow.configuration = { subject_viewer: 'dataImage' }`

### Subject

Any Subject fed to the Data Image Viewer must have...

- _exactly 1_ JSON file that can be displayed on a Scatter Plot Viewer.
- _1 or more_ image files.

Example:

```js
subject.locations = [
  { "application/json": "data.json" },
  { "image/png": "transient-photo-1.png" },
  { "image/png": "transient-photo-2.png" }
]
```

Note that there is no such thing as a "Data Image Subject" model per se; i.e. nothing akin to a "Single Image Subject". The use of the "Data Image (pseudo-)Subject" is inferred from the workflow explicitly saying it wants the Data Image Viewer. See [useDataImageSubject.js](hooks/useDataImageSubject.js).

<details>
<summary>Historically, the Data Image Viewer assumed its Subject contained an optional thumbnail image. This is no longer the case.</summary>

_The following information was written prior to 2026, with the assumption that a thumbnail image was required to properly display "JSON Subjects" on Talk. This assumption was revised and removed on Apr 2026: https://github.com/zooniverse/front-end-monorepo/issues/7241_

Each Subject has three files:
- an image file (which works as a "thumbnail" to be seen on Talk, this must be first in the subject location's list)
- a JSON file containing the data for the scatter plot
- an image

``` js
subject.locations = [
  { "image/png": "talk-fallback.png" }, // Fallback image for Talk forums
  { "application/json": "data.json" },
  { "image/png": "transient-object.png" }
]
```

</details>

### JSON file

Use the `JSONData` model to validate a JSON-encoded string loaded from a URL:

```js
const JSONData = await import('@store/JSONData')
const response = await fetch(url)
const data = await response.json()
const chartData = JSONData.create(data)
```

The JSON file defines the data series for the scatter plot:

The multiple data series JSON shape is an object consisting of an array for `data` and an object for `chartOptions`:

``` json
{
  "data": [
    {
      "seriesData": [
        { "x": 1.46,
          "y": 6.37,
          "x_error": 2,
          "y_error": 0.5
        }, {
          "x": 7.58,
          "y": 9.210
        }
      ],
      "seriesOptions": {
        "color": "drawing-red",
        "label": "Filter 1",
        "period": 0.4661477096
      }
    }, {
      "seriesData": [
        { "x": 700,
          "y": 500,
          "x_error": 2,
          "y_error": 0.5
        }, {
          "x": 701,
          "y": 900
        }
      ],
      "seriesOptions": {
        "color": "drawing-blue",
        "label": "Filter 2",
        "period": 1.025524961
      }
    }
  ],
  "chartOptions": {
    "xAxisLabel": "Days",
    "yAxisLabel": "Brightness"
  }
}
```

#### `data`

For the `data` array, this JSON takes the same shape as expected for the generic `ScatterPlotViewer` when multiple data series are defined. The `seriesData` property should be an array of objects where at minimum an x and y coordinate is required. An optional `x_error` and/or `y_error` number can be specified if error bars need to be displayed for that single data point. Each series supports a set of options under `seriesOptions` and at minimum a string `label` is required for each series. An optional string `color` for can defined using either a variable name from the colors available from the [zooniverse theme object](https://github.com/zooniverse/front-end-monorepo/tree/main/packages/lib-grommet-theme) or a hex value. If a color is not provided, a color from the Zooniverse theme will be chosen and applied for each series.

#### `chartOptions`

A set of chart options can also be supplied that define the x-axis and y-axis labels as well as the custom margins to use. Margin is defined as the space outside axes lines. The scatter plot have a default margin of `{ bottom: 60, left: 60, right: 10, top: 10}`.

## Dev Notes

**No such thing as a Data Image Subject**

Unlike most viewers, the use of the Data Image Viewer must be _explicitly set_ in the workflow config, instead of its use being inferred from the current Subject.

This is because the definition of a "Data Image Subject" can get way too flexible or nebulous. If a Subject has 1 JSON file and 1 image file, is it meant to be displayed as a Scatterplot + Image? What if that JSON file is a GeoJSON file meant for a map viewer? What if that JSON file is a light curve and that image is a thumbnail, e.g. as used by early iterations of [Planet Hunters TESS](https://www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess)?

We can't "guess" that a Subject is specifically a Data Image Subject just because it has 1 JSON and 1+ images. Hence, we need to explicitly set the Data Image Viewer, and then infer the Data Image Subject from the presence of the viewer.

**Thoughts on scope expansion**

There were some initial discussions on expanding the scope of the Data Image Viewer. e.g. "perhaps it can show Subjects with 1+ JSON file?"

If we choose to go down this path, we need to accept that we're expanding the narrow design of the current Data Image Viewer and its specific use case. We'll then need to answer some questions, e.g.: what are the new layout rules? if a Data Image Subject contains 1+ JSON files and 1+ image files, do we add group all the JSON files into one "flipbook viewer" the same way all image files are grouped into a flipbook viewer?

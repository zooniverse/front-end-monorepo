# DataImageViewer

The Data Image Viewer is a variant of the Subject Viewer that is a composite of the Scatter Plot Viewer and the Single Image Viewer rendered side-by-side with controls to enable or disable pan and zoom per viewer.

## Features

The Data Image Viewer...
- allows users to view coordinate data series in scatter plot
- allows users to view an image

## Props

// TODO add information about component props

## External Setup: Workflows and Subjects

### Workflow

The Workflow of the project should have a configuration specified that the Variable Star Viewer should be used.

`workflow.configuration = { subject_viewer: 'dataImage' }`

### Subject

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

For the `data` array, this JSON takes the same shape as expected for the generic `ScatterPlotViewer` when multiple data series are defined. The `seriesData` property should be an array of objects where at minimum an x and y coordinate is required. An optional `x_error` and/or `y_error` number can be specified if error bars need to be displayed for that single data point. Each series supports a set of options under `seriesOptions` and at minimum a string `label` is required for each series. An optional string `color` for can defined using either a variable name from the colors available from the [zooniverse theme object](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme) or a hex value. If a color is not provided, a color from the Zooniverse theme will be chosen and applied for each series. 

#### `chartOptions`

A set of chart options can also be supplied that define the x-axis and y-axis labels as well as the custom margins to use. Margin is defined as the space outside axes lines. The scatter plot have a default margin of `{ bottom: 60, left: 60, right: 10, top: 10}`.

# Variable Star Viewer

The Variable Star Viewer is a variant of the Subject Viewer that is a composite of the Scatter Plot Viewer, the Bar Chart Viewer, and the Single Image Viewer, with a few additional custom controls.

## Features

The Variable Star Viewer...
- allows users to view coordinate data series in scatter plots
  - one of the plots of coordinate data is rendered by a phase multiple parameter
  - both plots can invert its y-axis
  - data series can be focusable by a toggle which changes the color rendered
- allows users to view feature data in bar charts
  - the bar charts render based on the phase multiple parameter
- allows users to view a HR diagram image

## Props

// TODO add information about component props

## External Setup: Workflows and Subjects

### Workflow

The Workflow of the project should have a configuration specified that the Variable Star Viewer should be used.

`workflow.configuration = { subject_viewer: 'variableStar' }`

### Subject

Each Subject has three files: 
- an image file (which works as a "thumbnail" to be seen on Talk, this must be first in the subject location's list)
- a JSON file containing the data for the scatter plots and bar charts
- an image of the subject's HR diagram

``` js
subject.locations = [
  { "image/png": "subject1234.png" }, // Fallback image for Talk forums
  { "application/json": "subject1234.json" },
  { "image/png": "hrDiagram.png" }
]
```

### JSON file

The JSON file takes the shapes for both the scatter plots and bar charts:


The multiple series JSON shape is an object consisting of an object for `scatterPlot` and an array for `barCharts`:

``` json
{ 
  "data": {
    "scatterPlot": {
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
    },
    "barCharts": {
      "period": { 
        "data": [
          {
            "color": "drawing-red",
            "label": "Filter 1",
            "value": 0.4661477096
          },
          {
            "color": "drawing-blue",
            "label": "Filter 2",
            "value": 1.025524961
          }
        ],
        "chartOptions": {
          "xAxisLabel": "Period",
          "yAxisLabel": ""
        }
      }, 
      "amplitude": {
        "data": [
          {
            "color": "drawing-red",
            "label": "Filter 1",
            "value": 1.045
          },
          {
            "color": "status-critical",
            "label": "filter-2",
            "value": 1.9989011347
          }
        ],
        "chartOptions": {
          "xAxisLabel": "Amplitude",
          "yAxisLabel": ""
        }
      }
    }
  }
}
```

#### `scatterPlot`

For the `scatterPlot` object, this JSON takes the same shape as expected for the generic `ScatterPlotViewer` when multiple data series are defined. The `seriesData` property should be an array of objects where at minimum an x and y coordinate is required. An optional `x_error` and/or `y_error` number can be specified if error bars need to be displayed for that single data point. Each series supports a set of options under `seriesOptions` and at minimum a string `label` is required for each series. An optional string `color` for can defined using either a variable name from the colors available from the [zooniverse theme object](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme) or a hex value. If a color is not provided, a color from the Zooniverse theme will be chosen and applied for each series. 

A set of chart options can also be supplied that define the x-axis and y-axis labels as well as the custom margins to use. Margin is defined as the space outside axes lines. The scatter plots have a default margin of `{ bottom: 60, left: 60, right: 10, top: 10}`.

#### `barCharts`

For the `barCharts` array, this JSON takes the same same as expected for the generic `BarChartViewer` with properties for `data` and `chartOptions`. The `data` property is an array of objects that at minimum contain a string `label` and number `value`. Optionally, a `color` for each bar can be set. The color can be a variable name from the colors available from the [zooniverse theme object](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme) or a hex value. The `chartOptions` object expects strings for `xAxisLabel` and `yAxisLabel`. It  optionally can set margins using a `margin` key expecting an object with for top, bottom, left, and right.  Margin is defined as the space outside of the axes lines. The bar charts have a default margin of `{ bottom: 40, left: 40, right: 0, top: 0 }`. Another option is to set y axis domain (see [d3 domains for linear scales](https://observablehq.com/@d3/d3-scalelinear)) as `yAxisDomain` which expects an array of two numbers. The domain for the bar charts defaults to a dynamically generated domain depending on the extent of the y values.

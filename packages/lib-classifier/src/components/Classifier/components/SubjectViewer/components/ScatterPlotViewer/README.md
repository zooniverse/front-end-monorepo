# Scatter Plot Viewer

The Scatter Plot Viewer is a variant of the Subject Viewer that's used to
display two variable coordinate data. The data is expected to have a numerical x-axis and y-axis values.

## Features

The Scatter Plot Viewer...
- allows users to view coordinate data
- can be configurable to display a standard outer facing axes or display a inner facing axes similar to the PH: TESS light curve viewer design. Right now this configuration is not available via API, but can be set by devs in the code if the design for the specific use case calls for it. The prop `tickDirection` which can be set to either `'outer'` or `'inner'`, defaulting to `'outer'`, is for this use case.
- can render single or multiple data series

## Props

- `data` _(object)_ Required. This should be set by the data property in the location JSON of the subject. See the section on [JSON file](#JSON_file) for more information on the allowed data formats for the data series.
- `dataPointSize` _(number)_ Default: `20`. The size of the SVG glyph icon. Not available to configure via the subject location JSON's options property.
- `invertAxes` _(object)_ Default: `{ x: false, y: false }`. Booleans to set whether or not the x-axis or y-axis is inverted.
- `margin` _(object)_ Default: `{ bottom: 60, left: 60, right: 10, top: 10 }`. An object of the numerical values for `top`, `bottom`, `left`, `right`. This sets the SVG space outside of the axes lines. This is configurable via the subject location JSON's options property (See the section on [JSON file](#JSON_file)). The amount of space necessary can vary based on the data, what the axes tick labels are, what the axes labels are, etc. Bottom and left margin should be greater since that is where the x-axis and y-axis are positioned for the chart.
- `padding` _(object)_ Default: `{ bottom: 0, left: 0, right: 0, top: 0 }`. An object of the numerical values for `top`, `bottom`, `left`, `right`. This sets the SVG space inside of the axes lines. This is configurable via the subject location JSON's options property (See the section on [JSON file](#JSON_file)). The amount of space necessary can vary based on the data, what the axes tick labels are, what the axes labels are, etc. This defaults to 0 because the default `tickDirection` of the axes is `'outer'` and no extra space is required for labels inside of the axes. This will need to be defined with values if the `tickDirection` is changed to `'inner'`.
- `panning` _(boolean)_ Default: `false`. Enable or disable being able to pan the svg. It is separately configurable from `zooming`, however, it is unlikely to keep this `false` when `zooming` is `true`. If `zooming` is fales, and `panning` is set to true, then this configuration is ignored, because panning doesn't need to function unless the full data series is not in view due to zooming in. 
- `parentHeight` _(number)_ Required. The size of the parent container's height. This is necessary for setting the size of the SVG Chart and for calculating the maximum of the y-axis scale. This is being provided by vx's `withParentSize` HOC if the default export of the `ScatterPlotViewer` is used. An undecorated `ScatterPlotViewer` is also exported and if this is used, then the `parentHeight` needs to be provided another way so the bar chart knows what pixel height to render.
- `parentWidth` _(number)_ Required. The size of the parent container's width. This is necessary for setting the size of the SVG Chart and for calculating the maximum of the x-axis scale. This is being provided by vx's `withParentSize` HOC if the default export of the `ScatterPlotViewer` is used. An undecorated `ScatterPlotViewer` is also exported and if this is used, then the `parentWidth` needs to be provided another way so the bar chart knows what pixel width to render.
- `theme` _object_ An object containing style information used by svg elements for their fill color, font size, and font family. This can be set via prop or provided by the React context if `ScatterPlotViewer` component decorated by styled-components `withTheme` HOC is used. The object shape is expected to be the same as [zooniverse theme object](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme).
- `tickDirection` _(string)_ Default: `'outer'`. The tick direction of the axis. This can be set to `'inner'` which styles the direction of the axes toward the inside of the plot area similar to PH: TESS light curve viewer design. This is not configurable by the the subject location JSON.
- `tickLength` _(number)_ Default: `5`. The length of the tick used by the axis. This is not configurable by the subject location JSON.
- `xAxisLabel` _(string)_ Default: `'x-axis'`. The label for the x-axis. This should be set by the subject location JSON's option property (See the section on [JSON file](#JSON_file)) with a label that makes sense for the data.
- `xAxisNumTicks` _(number)_ Default: `10`. The number of ticks to display on the x-axis.
- `yAxisLabel` _(string)_ Default: `'y-axis'`. The label for the y-axis. This should be set by the subject location JSON's option property (See the section on [JSON file](#JSON_file)) with a label that makes sense for the data.
- `yAxisNumTicks` _(number)_ Default: `10`. The number of ticks to display on the y-axis.
- `zooming` _(zooming)_ Default: `false`. Enable or disable being able to zoom the svg.

## External Setup: Workflows and Subjects

### Workflow

The Workflow of the project had a configuration that specified to the Monorepo
Front End that the Scatter Plot Viewer should be used.

`workflow.configuration = { subject_viewer: 'scatterplot' }`

### Subject

Each Subject has two files: an image file (which works as a "thumbnail" to be
seen on Talk) and a JSON file.

``` js
subject.locations = [
  { "image/png": "subject1234.png" },
  { "application/json": "subject1234.json" },
]
```

### JSON file

The JSON file can take two different shapes depending on if the data is a single series or multiple series. 

The single series JSON shape is a very, very basic data object consisting of an array of numbers for each axis:

``` json
//subject1234.json
{ "data": {
    "x": [
      1,
      2,
      0.356
    ],
    "y": [
      6,
      3,
      0.667
    ]
  },
  "chartOptions": {
    "xAxisLabel": "Days",
    "yAxisLabel": "Brightness"
  }
}
```

The multiple series JSON shape is an array of objects consisting of `seriesData` and `seriesOptions` properties:

``` json
{ "data": [
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
        "color": "accent-2",
        "label": "Filter 1"
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
        "color": "#98b6a7",
        "label": "Filter 2"
      }
    }
  ],
  "chartOptions": {
    "xAxisLabel": "Days",
    "yAxisLabel": "Brightness"
  }
}
```

The `seriesData` property should be an array of objects where at minimum an x and y coordinate is required. An optional `x_error` and/or `y_error` number can be specified if error bars need to be displayed for that single data point. Each series supports a set of options under `seriesOptions` and at minimum a string `label` is required for each series. An optional string `color` for can defined using either a variable name from the colors available in from the [zooniverse theme object](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme) or a hex value. If a color is not provided, a color from the zooniverse theme will be chosen and applied for each series. 

For both single series data and multiple series data, a set of chart options can also be supplied that define the x-axis and y-axis labels as well as the margins and padding to use. Padding is defined as the space inside the axes lines. Defined padding will likely only be used by scatter plots using an inner tick direction similar to the current PH: TESS light curve viewer. Margin is defined as the space outside axes lines. Defined margin should be used by the outer tick direction which is the default orientation for the scatter plot axes. 


``` json
//subject1234.json
{ "data": {
    "x": [
      1,
      2,
      0.356
    ],
    "y": [
      6,
      3,
      0.667
    ]
  },
  "chartOptions": {
    "margin": {
      "bottom": 10,
      "left": 10,
      "right": 10,
      "top": 10
    },
    "padding": {
      "bottom": 30,
      "left": 30,
      "right": 0,
      "top": 0
    },
    "xAxisLabel": "Days",
    "yAxisLabel": "Brightness",
  }
}
```

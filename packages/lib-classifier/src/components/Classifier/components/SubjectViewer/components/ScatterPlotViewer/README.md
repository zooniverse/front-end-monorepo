# Scatter Plot Viewer

The Scatter Plot Viewer is a variant of the Subject Viewer that's used to
display two variable coordinate data. The data is expected to have a numerical x-axis and y-axis values.

## Features

The Scatter Plot Viewer...
- allows users to view coordinate data
- can be configurable to display a standard outer facing axes or display a inner facing axes similar to the PH: TESS light curve viewer design. Right now this configuration is not available via API, but can be set by devs in the code if the design for the specific use case calls for it. The prop `tickDirection` which can be set to either `'outer'` or `'inner'`, defaulting to `'outer'`, is for this use case.

## Props

- `data` _(object)_ An object of the x and y coordinates. Each variable is an array of numbers. This should be set by the data property in the location JSON of the subject. See the section on [JSON file](#JSON_file) for more information. Defaults to `{ x: [1], y: [1]}`.
- `dataPointSize` _(string) or (number)_ The size of the radius of the SVG circle. Defaults to `1.5`. Not available to configure via the subject location JSON's options property.
- `margin` _(object)_ An object of the numerical values for `top`, `bottom`, `left`, `right`. This sets the SVG space outside of the axes lines. This is configurable via the subject location JSON's options property (See the section on [JSON file](#JSON_file)). The amount of space necessary can vary based on the data, what the axes tick labels are, what the axes labels are, etc. A default of `{ bottom: 60, left: 60, right: 10, top: 10 }` is set. Bottom and left margin is greater since that is where the x-axis and y-axis are positioned for the chart.
- padding _(object)_ An object of the numerical values for `top`, `bottom`, `left`, `right`. This sets the SVG space inside of the axes lines. This is configurable via the subject location JSON's options property (See the section on [JSON file](#JSON_file)). The amount of space necessary can vary based on the data, what the axes tick labels are, what the axes labels are, etc. A default of `{ bottom: 0, left: 0, right: 0, top: 0 }` is set. This defaults to 0 because the default `tickDirection` of the axes is `'outer'` and no extra space is required for labels inside of the axes. This will need to be defined with values if the `tickDirection` is changed to `'inner'`.
- panning _(boolean)_ Enable or disable being able to pan the svg. It is separately configurable from `zooming`, however, it is unlikely desired to keep this `false` when `zooming` is `true`. Defaults to `false`.
- parentHeight: _(number)_ The size of the parent container's height. This is necessary for setting the size of the SVG Chart and for calculating the maximum of the y-axis scale. Required.
- parentWidth _(number)_ The size of the parent container's width. This is necessary for setting the size of the SVG Chart and for calculating the maximum of the x-axis scale. Required.
- theme _object_ An object containing style information used by svg elements for their fill color, font size, and font family. This can be set via prop or provided by the React context if `ScatterPlotViewer` component decorated by styled-components `withTheme` HOC is used. The object shape is expected to be the same as [zooniverse theme object(https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme)].
- tickDirection _(string)_ The tick direction of the axis. Defaults to `'outer'`, but can be set to `'inner'` which styles the direction of the axes toward the inside of the plot area similar to PH: TESS light curve viewer design. This is not configurable by the the subject location JSON.
- tickLength _(number)_ The length of the tick used by the axis. Defaults to `5`. This is not configurable by the subject location JSON.
- xAxisLabel _(string)_ The label for the x-axis. This should be set by the subject location JSON's option property (See the section on [JSON file](#JSON_file)) with a label that makes sense for the data. Defaults to `'x-axis'`.
- yAxisLabel _(string)_ The label for the y-axis. This should be set by the subject location JSON's option property (See the section on [JSON file](#JSON_file)) with a label that makes sense for the data. Defaults to `'y-axis'`.
- zooming _(zooming)_ Enable or disable being able to zoom the svg. Defaults to `false`

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

The JSON file is a very, very basic data object consisting of an array of numbers for each axis.

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
  }
}
```

A set of options can be defined along with the data that define the x-axis and y-axis labels as well as the margins and padding to use. Padding is defined as the the space inside the axes lines. Defined padding will likely only be used by scatter plots using an inner tick direction similar to the current PH: TESS light curve viewer. Margin is defined as the space outside axes lines. Defined margin should be used by the outer tick direction which is the default orientation for the scatter plot axes. 


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
  "options": {
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

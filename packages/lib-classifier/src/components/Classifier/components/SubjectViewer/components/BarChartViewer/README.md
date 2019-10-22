# Bar Chart Viewer

The Bar Chart Viewer is a variant of the Subject Viewer that's used to
display bar chart data. The data is expected to have a numerical y-axis values against string categorical x-axis values.

## Features

The Bar Chart Viewer...
- allows users to view bar chart data (x-axis: categorical values, y-axis:
  numerical values for each category)

## Props

- `barStyles` _(object)_ An object containing properties for the individual bar styles. `padding` is the available configurable style and sets the space between each bar. It defaults to `0.25`.
- `data` _(array)_ An array of objects. Each object must contain a string label and a number value. A string color value is optional for each bar and can be set to either a string variable name from the [Zooniverse theme](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme) or any hex value. A color variable name is preferred from the theme since it has been approved by the Zooniverse designer and tested for accessibility. This should be set by the data property in the location JSON of the subject. See the section on [JSON file](#JSON_file) for more information. Required.
- `margin` _(object)_ An object of the numerical values for `top`, `bottom`, `left`, `right`. This sets the SVG space outside of the axes lines. This is configurable via the subject location JSON's options property (See the section on [JSON file](#JSON_file)). The amount of space necessary can vary based on the data, what the axes tick labels are, what the axes labels are, etc. A default of `{ bottom: 40, left: 40, right: 10, top: 10 }` is set. Bottom and left margin is greater since that is where the x-axis and y-axis are positioned for the chart.
- parentHeight: _(number)_ The size of the parent container's height. This is necessary for setting the size of the SVG Chart and for calculating the maximum of the y-axis scale. Required.
- parentWidth _(number)_ The size of the parent container's width. This is necessary for setting the size of the SVG Chart and for calculating the maximum of the x-axis scale. Required.
- theme _object_ An object containing style information used by svg elements for their fill color, font size, and font family. This can be set via prop or provided by the React context if `BarChartViewer` component decorated by styled-components `withTheme` HOC is used. The object shape is expected to be the same as [Zooniverse theme object](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme).
- xAxisLabel _(string)_ The label for the x-axis. This should be set by the subject location JSON's option property (See the section on [JSON file](#JSON_file)) with a label that makes sense for the data. Defaults to `'x-axis'`.
- yAxisLabel _(string)_ The label for the y-axis. This should be set by the subject location JSON's option property (See the section on [JSON file](#JSON_file)) with a label that makes sense for the data. Defaults to `'y-axis'`.

## External Setup: Workflows and Subjects

**Workflow**

The Workflow of the project had a configuration that specified to the Monorepo
Front End that the Bar Chart Viewer should be used.

`workflow.configuration = { subject_viewer: 'barchart' }`

**Subject**

Each Subject has two files: an image file (which works as a "thumbnail" to be
seen on Talk) and a JSON file.

``` js
subject.locations = [
  { "image/png": "subject1234.png" },
  { "application/json": "subject1234.json" },
]
```

**JSON file**

The JSON file is a very, very basic data object consisting of an array of objects defining labels and values.

``` json
//subject1234.json
{ "data": [
    {
      "label": "A",
      "value": 0.0356
    }
  ]
}
```

Optionally, each data object can define a color value. A string value from the zooniverse theme is preferred, but any hex value will be accepted.

``` json
//subject1234.json

// zooniverse theme color
{ "data": [
    {
      "color": "accent-3",
      "label": "A",
      "value": 0.0356
    }
  ]
}

// custom hex color
{ "data": [
    {
      "color": "#000000",
      "label": "A",
      "value": 0.0356
    }
  ]
}
```

An set of options can be defined along with the data that define the x-axis and y-axis labels and margins. The margins add space outside of the axes lines for the tick and axes labels.


``` json
//subject1234.json
{ "data": [
    {
      "label": "A",
      "value": 0.0356
    }
  ],
  "options": {
    "margin": {
      "bottom": 40,
      "left": 60,
      "right": 0,
      "top": 0
    },
    "xAxisLabel": "Letters",
    "yAxisLabel": "Frequency"
  }
}
```

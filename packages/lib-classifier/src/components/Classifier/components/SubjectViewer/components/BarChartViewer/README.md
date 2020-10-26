# Bar Chart Viewer

The Bar Chart Viewer is a variant of the Subject Viewer that's used to
display bar chart data. The data is expected to have a numerical y-axis values against string categorical x-axis values.

## Features

The Bar Chart Viewer...
- allows users to view bar chart data (x-axis: categorical values, y-axis:
  numerical values for each category)

## Props

- `barStyles` _(object)_ Default: `{ padding: 0.25 }` An object containing properties for the individual bar styles. The option for `padding` sets the space between each bar.
- `data` _(array)_ Required. An array of objects. Each object must contain a string label and a number value. A string color value is optional for each bar and can be set to either a string variable name from the [Zooniverse theme](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme) or any hex value. A color variable name is preferred from the theme since it has been approved by the Zooniverse designer and tested for accessibility. This should be set by the data property in the location JSON of the subject. See the section on [JSON file](#JSON_file) for examples.
- `margin` _(object)_ Default: `{ bottom: 40, left: 40, right: 10, top: 10 }`. An object of the numerical values for `top`, `bottom`, `left`, `right`. This sets the SVG space outside of the axes lines. This is configurable via the subject location JSON's options property (See the section on [JSON file](#JSON_file)). The amount of space necessary can vary based on the data, what the axes tick labels are, what the axes labels are, etc. Bottom and left margin is greater since that is where the x-axis and y-axis are positioned for the chart.
- `parentHeight`: _(number)_ Required. The size of the parent container's height. This is necessary for setting the size of the SVG Chart and for calculating the maximum of the y-axis scale. This is being provided by vx's `withParentSize` HOC if the default export of the `BarChartViewer` is used. An undecorated `BarChartViewer` is also exported and if this is used, then the `parentHeight` needs to be provided another way so the bar chart knows what pixel height to render.
- `parentWidth` _(number)_ Required. The size of the parent container's width. This is necessary for setting the size of the SVG Chart and for calculating the maximum of the x-axis scale. This is being provided by vx's `withParentSize` HOC if the default export of the `BarChartViewer` is used. An undecorated `BarChartViewer` is also exported and if this is used, then the `parentWidth` needs to be provided another way so the bar chart knows what pixel width to render.
- `theme` _object_ An object containing style information used by svg elements for their fill color, font size, and font family. This can be set via prop or provided by the React context if `BarChartViewer` component decorated by styled-components `withTheme` HOC is used. The object shape is expected to be the same as [Zooniverse theme object](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme).
- `xAxisLabel` _(string)_ Default: `'x-axis'`. The label for the x-axis. This should be set by the subject location JSON's option property (See the section on [JSON file](#JSON_file)) with a label that makes sense for the data.
- `yAxisDomain` _(array)_ Default: `[yDataExtent]`. An array of numbers for the domain to pass to d3's `scaleLinear` function used to set the values for the y-axis. It defaults to calculating the data extent (minimum and maximum) with d3's `extent` function using the number values from the `data` prop and rounds them using d3's `nice` function.
- `yAxisLabel` _(string)_ Default: `'y-axis'`. The label for the y-axis. This should be set by the subject location JSON's option property (See the section on [JSON file](#JSON_file)) with a label that makes sense for the data.

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

Optionally, each data object can define a color value. A string value from the [Zooniverse theme](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme) is preferred, but any hex value will be accepted.

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

A set of chart options can be defined along with the data that define the x-axis and y-axis labels and margins. The margins add space outside of the axes lines for the tick and axes labels.


``` json
//subject1234.json
{ "data": [
    {
      "label": "A",
      "value": 0.0356
    }
  ],
  "chartOptions": {
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

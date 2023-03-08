# Scatter Plot Viewer

The Scatter Plot Viewer is a variant of the Subject Viewer that's used to
display two variable coordinate data. The data is expected to have a numerical x-axis and y-axis values.

## Features

The Scatter Plot Viewer...
- allows users to view coordinate data
- can be configurable to display a standard outer facing axes or display a inner facing axes similar to the PH: TESS light curve viewer design. Right now this configuration is not available via API, but can be set by devs in the code if the design for the specific use case calls for it. The prop `tickDirection` which can be set to either `'outer'` or `'inner'`, defaulting to `'outer'`, is for this use case.
- can render single or multiple data series
- can be configurable for zoom

## Props

- `data` _(object)_ Required. This should be set by the data property in the location JSON of the subject. See the section on [JSON file](#JSON_file) for more information on the allowed data formats for the data series.
- `dataPointSize` _(number)_ Default: `25`. The size of the SVG glyph icon. Not available to configure via the subject location JSON's `chartOptions` property.
- `invertAxes` _(object)_ Default: `{ x: false, y: false }`. Booleans to set whether or not the x-axis or y-axis is inverted.
- `margin` _(object)_ Default: `{ bottom: 60, left: 60, right: 10, top: 10 }`. An object of the numerical values for `top`, `bottom`, `left`, `right`. This sets the SVG space outside of the axes lines. This is configurable via the subject location JSON's `chartOptions` property (See the section on [JSON file](#JSON_file)). The amount of space necessary can vary based on the data, what the axes tick labels are, what the axes labels are, etc. Bottom and left margin should be greater since that is where the x-axis and y-axis are positioned for the chart.
- `padding` _(object)_ Default: `{ bottom: 0, left: 0, right: 0, top: 0 }`. An object of the numerical values for `top`, `bottom`, `left`, `right`. This sets the SVG space inside of the axes lines. This is configurable via the subject location JSON's `chartOptions` property (See the section on [JSON file](#JSON_file)). The amount of space necessary can vary based on the data, what the axes tick labels are, what the axes labels are, etc. This defaults to 0 because the default `tickDirection` of the axes is `'outer'` and no extra space is required for labels inside of the axes. This will need to be defined with values if the `tickDirection` is changed to `'inner'`.
- `panning` _(boolean)_ Default: `false`. Enable or disable being able to pan the svg. It is separately configurable from `zooming`, however, it is unlikely to keep this `false` when `zooming` is `true`. If `zooming` is false, and `panning` is set to true, then this configuration is ignored, because panning doesn't need to function unless the full data series is not in view due to zooming in. 
- `parentHeight` _(number)_ Required. The size of the parent container's height. This is necessary for setting the size of the SVG Chart and for calculating the maximum of the y-axis scale. This is being provided by visx's `withParentSize` HOC if the default export of the `ScatterPlotViewer` is used. An undecorated `ScatterPlotViewer` is also exported and if this is used, then the `parentHeight` needs to be provided another way so the bar chart knows what pixel height to render.
- `parentWidth` _(number)_ Required. The size of the parent container's width. This is necessary for setting the size of the SVG Chart and for calculating the maximum of the x-axis scale. This is being provided by visx's `withParentSize` HOC if the default export of the `ScatterPlotViewer` is used. An undecorated `ScatterPlotViewer` is also exported and if this is used, then the `parentWidth` needs to be provided another way so the bar chart knows what pixel width to render.
- `theme` _object_ An object containing style information used by svg elements for their fill color, font size, and font family. This can be set via prop or provided by the React context if `ScatterPlotViewer` component decorated by styled-components `withTheme` HOC is used. The object shape is expected to be the same as [zooniverse theme object](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme).
- `tickDirection` _(string)_ Default: `'outer'`. The tick direction of the axis. This can be set to `'inner'` which styles the direction of the axes toward the inside of the plot area similar to PH: TESS light curve viewer design. This is not configurable by the the subject location JSON `chartOptions`.
- `tickLength` _(number)_ Default: `5`. The length of the tick used by the axis. This is not configurable by the subject location JSON `chartOptions`.
- `underlays` _(array)_ Default: `[]`. An array of objects to indicate how background underlays should be rendered. These objects should contain a browser standard color string for `fill`, a number for `startPosition` that corresponds to a x-axis data point, and a number for `xAxisWidth` which should be the width difference from zero. The numbers are used as parameters in a d3 scaleLinear function to determine the SVG coordinate position and width to place the SVG rectangle underlays. Example: `[{ fill: '#2d2d2d', startPosition: 0, xAxisWidth: 0.2 }]`
- `visibleSeries` _(array)_ Default: `[]`. If defined, this array should contain an object for each series using its label as the key and the value set to a boolean. If true, then the series uses the color expected to display. If false, then the series is filled with `'light-4'` from the Zooniverse Grommet theme, which is a gray color. This is to help visual focus as needed for scatter plots that have many data series. A control for this is not included with the default `ScatterPlotViewer`, but is available for the `VariableStarViewer`
- `xAxisLabel` _(string)_ Default: `'x-axis'`. The label for the x-axis. This should be set by the subject location JSON's `chartOptions` property (See the section on [JSON file](#JSON_file)) with a label that makes sense for the data.
- `xAxisLabelOffset` _(number)_ Default: `undefined`. The offset of the x-axis label. We rely on visx to position the label for us, but if it needs adjustment, then an offset can be set. This can be set by the subject location JSON's `chartOptions` property (See the section on [JSON file](#JSON_file)).
- `xAxisNumTicks` _(number)_ Default: `10`. The number of ticks to display on the x-axis.
- `yAxisLabel` _(string)_ Default: `'y-axis'`. The label for the y-axis. This should be set by the subject location JSON's `chartOptions` property (See the section on [JSON file](#JSON_file)) with a label that makes sense for the data.
- `yAxisLabelOffset` _(number)_ Default: `undefined`. The offset of the y-axis label. We rely on visx to position the label for us, but if it needs adjustment, then an offset can be set. This can be set by the subject location JSON's `chartOptions` property (See the section on [JSON file](#JSON_file)).
- `yAxisNumTicks` _(number)_ Default: `10`. The number of ticks to display on the y-axis.
- `zooming` _(zooming)_ Default: `false`. Enable or disable being able to zoom the svg.

## External Setup: Workflows and Subjects

### Workflow

The Workflow of the project had a configuration that specified to the Front End Monorepo that the Scatter Plot Viewer should be used. 

`workflow.configuration = { subject_viewer: 'scatterPlot' }`

The workflow configuration also supports subject viewer specific configurations. For the scatter plot, this includes zoom configuration that you wish to have applied to all subjects. [Read more about the allowed zoom configuration values.](#Chart_Options)

```js
workflow.configuration = {
  subject_viewer: 'scatterPlot',
  subject_viewer_config: {
    zoomConfiguration: {
      direction: 'both',
      minZoom: 1,
      maxZoom: 10,
      zoomInValue: 1.2,
      zoomOutValue: 0.8
    }
  }
}
```

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

Use the `JSONData` model to validate a JSON-encoded string loaded from a URL:

```js
const JSONData = await import('@store/JSONData')
const response = await fetch(url)
const data = await response.json()
const chartData = JSONData.create(data)
```

The JSON file can take two different shapes depending on if the data is a single series or multiple series. 

#### Series Data

The `seriesData` property should be an array of objects where at minimum an x and y coordinate is required. An optional `x_error` and/or `y_error` number can be specified if error bars need to be displayed for that single data point. 

Each series supports a set of options under `seriesOptions` and at minimum a string `label` is required for each series. An optional string `color` for can defined using either a variable name from the colors available in from the [zooniverse theme object](https://github.com/zooniverse/front-end-monorepo/tree/master/packages/lib-grommet-theme) or a hex value. If a color is not provided, a color from the zooniverse theme will be chosen and applied for each series. An optional `glyph` shape can be defined for the data series. This must be a string and must correspond to the following options: `'circle'`, `'cross'`, `'diamond'`, `'square'`, `'star'`, `'triangle'`, `'wye'`. If a glyph shape is not defined in the series options, then a fallback is automatically chosen based on the array order of the data series.

The single series JSON shape is a very, very basic data object consisting of an array of numbers for each axis. The multiple series shape can also be used for a single series and is required if you need to use error bars:

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
        "color": "accent-1",
        "glyph": "circle",
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
        "glyph": "cross",
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



#### Chart Options

For both single series data and multiple series data, a set of chart options can also be supplied that define the x-axis and y-axis labels as well as optionally the margins and padding to use and zoom configurations. Padding is defined as the space inside the axes lines. Defined padding will likely only be used by scatter plots using an inner tick direction similar to the current PH: TESS light curve viewer. Margin is defined as the space outside axes lines. Defined margin should be used by the outer tick direction which is the default orientation for the scatter plot axes.

Zoom configuration supports configuring the directionality of the zoom, the minimum zoom, maximum zoom, the zoom in value, and the zoom out value. The order of precedence for zoom configuration values are subject's chart options, the workflow configuration, then the default values. 

```js
// default zoom configuration values
{
  zoomConfiguration: {
    direction: 'both', // string. Allows 'both', 'x', 'y'
    minZoom: 1, // number
    maxZoom: 10, // number
    zoomInValue: 1.2, // number
    zoomOutValue: 0.8 // number
  }
}
```


Example of JSON using various chart options:

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
    "zoomConfiguration": {
      "direction": "x",
      "minZoom": 1,
      "maxZoom": 10,
      "zoomInValue": 1.2,
      "zoomOutValue": 0.8
    }
  }
}
```


# Bar Chart Viewer

The Bar Chart Viewer is a variant of the Subject Viewer that's used to
display bar chart data. The data is expected to have a numerical y-axis values against string categorical x-axis values.

## Features

The Bar Chart Viewer...
- allows users to view bar chart data (x-axis: categorical values, y-axis:
  numerical values for each category)

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

An set of options can be defined along with the data that define the x-axis and y-axis labels and margins.


``` json
//subject1234.json
{ "data": [
    {
      "label": "A",
      "value": 0.0356
    }
  ],
  "options": {
    "xAxisLabel": "Letters",
    "xAxisMargin": 60,
    "yAxisLabel": "Frequency",
    "yAxisMargin": 40
  }
}
```

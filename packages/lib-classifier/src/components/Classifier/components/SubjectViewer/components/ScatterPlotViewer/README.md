# Scatter Plot Viewer

The Scatter Plot Viewer is a variant of the Subject Viewer that's used to
display two variable coordinate data. The data is expected to have a numerical x-axis and y-axis values.

## Features

The Scatter Plot Viewer...
- allows users to view coordinate data
- can be configurable to display a standard outer facing axes or display a inner facing axes similar to the PH: TESS light curve viewer design. Right now this configuration is not available via API, but can be set by devs in the code if the design for the specific use case calls for it. The prop `tickDirection` which can be set to either `'outer'` or `'inner'`, defaulting to `'outer'`, is for this use case.

## External Setup: Workflows and Subjects

**Workflow**

The Workflow of the project had a configuration that specified to the Monorepo
Front End that the Scatter Plot Viewer should be used.

`workflow.configuration = { subject_viewer: 'scatterplot' }`

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

export const dataSeriesWithCustomColor = {
  "data": [
    {
      "seriesData": [
        {
          "x": 1.46,
          "y": 6.37,
          "x_error": 2,
          "y_error": 0.5
        }, {
          "x": 7.58,
          "y": 9.210
        }
      ],
      "seriesOptions": {
        "color": "#b296b5",
        "label": "Data series 1"
      }
    }, {
      "seriesData": [
        {
          "x": 700,
          "y": 500,
          "x_error": 2,
          "y_error": 0.5
        }, {
          "x": 701,
          "y": 900
        }
      ],
      "seriesOptions": {
        "color": "rgb(0,0,0)",
        "label": "Data series 2"
      }
    }
  ],
  "chartOptions": {
    "xAxisLabel": "Foo",
    "yAxisLabel": "Bar"
  }
}

export const dataSeriesWithInvalidCustomColor = {
  "data": [
    {
      "seriesData": [
        {
          "x": 1.46,
          "y": 6.37,
          "x_error": 2,
          "y_error": 0.5
        }, {
          "x": 7.58,
          "y": 9.210
        }
      ],
      "seriesOptions": {
        "color": "my favorite color",
        "label": "Data series 1"
      }
    }, {
      "seriesData": [
        {
          "x": 700,
          "y": 500,
          "x_error": 2,
          "y_error": 0.5
        }, {
          "x": 701,
          "y": 900
        }
      ],
      "seriesOptions": {
        "color": "ffffff",
        "label": "Data series 2"
      }
    }
  ],
  "chartOptions": {
    "xAxisLabel": "Foo",
    "yAxisLabel": "Bar"
  }
}

export const dataSeriesWithThemeColorVariables = {
  "data": [
    {
      "seriesData": [
        {
          "x": 1.46,
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
        "label": "Data series 1"
      }
    }, {
      "seriesData": [
        {
          "x": 700,
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
        "label": "Data series 2"
      }
    }
  ],
  "chartOptions": {
    "xAxisLabel": "Foo",
    "yAxisLabel": "Bar"
  }
}
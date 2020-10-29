# Helper > getDataSeriesColor

This is a helper utility function used by the data as a subject viewers `ScatterPlotViewer` and the `VariableStarViewer` to help determine if the data series is highlighted, meaning if it has a fill color applied to it and has a black stroke. 

## Parameters

- `highlightedSeries` _(array of objects)_ Defaults to []. Expects a value like: `[ { foo: true }, { bar: false }]`. In this example, `foo` and `bar` represent the data series and the boolean value is whether or not that series is highlighted.
- `seriesIndex` _(number)_ Defaults to 0. The array index of the series from the `highlightedSeries` array you want to know the boolean value of.
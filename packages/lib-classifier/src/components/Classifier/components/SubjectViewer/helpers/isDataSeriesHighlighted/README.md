# Helper > getDataSeriesColor

This is a helper utility function used by the data as a subject viewers `ScatterPlotViewer` and the `VariableStarViewer` to help determine if the data series is highlighted, meaning if it has a fill color applied to it and has a black stroke. Defaults to returning true to make sure that data series have fill colors.

## Parameters

Takes an object of two properties:

- `highlightedSeries` _(array of strings)_ Defaults to []. Expects a value like: `[ 'Filter 1', 'Filter 2' ]` which corresponds to the labels used for the data series.
- `seriesOptions` _(object)_ Defaults to {}. The series options from the series we're checking against the `highlightedSeries` array. The series options should contain a `label` property and note if it's missing, there is code in the `VariableStarViewContainer` to add a fallback label. If this utility helper is used elsewhere, then the logic there should be sure to provide a label. The shape of this object can be read about in the ScatterPlotViewer's [readme](../../../../components/ScatterPlotViewer/README.md)
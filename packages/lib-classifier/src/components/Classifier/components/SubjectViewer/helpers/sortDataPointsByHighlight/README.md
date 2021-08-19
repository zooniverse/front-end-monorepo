# Helper > sortDataPointsByHighlight

This is a helper utility function used by the data as a subject viewers `ScatterPlotViewer` and the `VariableStarViewer` to  determine the order to render the data series' data points by highlight state. The highlight state determines whether or not the SVG data points have a fill color and gray outline (unhighlighted) or fill color with darker outline (highlighted). If the data points of other data series render closely in the SVG coordinate space, then it can be difficult to view data points of other data series if the unhighlighted series appears on top of others. We want the highlighted series' data to appear on top of unhighlighted series, so the volunteer focus can go to those.

Thus, this function returns a new sorted array where the unhighlighted data series are first, then the highlighted series, so that the highlighted series are rendered on top. Note that CSS z-index cannot be used with SVG.  

## Parameters

- `dataPoints` _(array)_ An array of objects. Each object contains the series data points and the series options object. The same of this can be reference in the [ScatterPlotViewer](../../../../components/ScatterPlotViewer/README.md) documentation.
- `highlightedSeries` _(array)_ An array of strings. The strings should correspond to the labels set in each series' option object. 
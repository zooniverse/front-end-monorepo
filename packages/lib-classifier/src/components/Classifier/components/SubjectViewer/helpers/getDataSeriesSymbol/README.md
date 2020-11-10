# Helper > getDataSeriesSymbol

This is a helper utility function used by the data as a subject viewers `ScatterPlotViewer` and the `VariableStarViewer` to help determine which SVG glyph to render the data points as. Which symbol that is rendered is determined by the data series index from the subject JSON.

There are seven glyphs available used from the [`visx/glyph`](https://airbnb.io/visx/docs/glyph) library.
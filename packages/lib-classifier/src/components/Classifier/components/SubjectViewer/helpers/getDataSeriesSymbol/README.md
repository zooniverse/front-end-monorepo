# Helper > getDataSeriesSymbol

This is a helper utility function used by the data as a subject viewers `ScatterPlotViewer` and the `VariableStarViewer` to help determine which SVG glyph to render the data points as. Which symbol that is rendered is determined by the data series index from the subject JSON.

There are seven glyphs available used from the [`visx/glyph`](https://airbnb.io/visx/docs/glyph) library.

## Parameters

The function takes an object which includes:

- `seriesOptions` _(object)_ A `glyph` property can be defined on the series options' object and must map to a string value of the supported Glyphs. This can be: `'circle'`, `'cross'`, `'diamond'`, `'square'`, `'star'`, `'triangle'`, `'wye'`
- `seriesIndex` _(number)_ A number corresponding to the array index number of the series. This is the fallback method of selecting a glyph if one is not defined in the series options.
# Helper > getDataSeriesColor

This is a helper utility function used by the data as a subject viewers `ScatterPlotViewer` and the `VariableStarViewer` to help determine which color to render the data points as. Which color is rendered depends on the data series options object, a theme object, or default array of colors. The order of preference is:

- Use the color set in the data series options object. This can either be a variable name from the theme or directly a string hex, rgb, or hsl value that browsers accept.
- Use a color set in a default colors array in order.
- If the data series can be toggled for focus, the focus state should be passed in as a parameter, and if the series is not focused, the color is set to be `light-4` from the theme's colors

## Parameters

The parameters are an object consisting of:

- `seriesOptions` _(object)_ - the options object from the data series. The shape of this object can be read about in the ScatterPlotViewer's [readme](../../../../components/ScatterPlotViewer/README.md)
- `seriesIndex` _(number)_ - the series index from the data property from the subject JSON. This is used to ensure the fallback color picked from the default colors array is in the same each time provided the subject's data series are in a consistent order between subjects. Ensuring the order between subjects is the responsibility of the project builder or researcher who creates and uploads the JSON data to Panoptes.
- `themeColors` _(object)_ - an object of key-value pairs that consists of a variable name and a hex color value. The expected convention is what we use in the [Zooniverse Grommet theme](https://github.com/zooniverse/front-end-monorepo/tree/main/packages/lib-grommet-theme).
- `defaultColors` _(array)_ an array of default hex, rbg, or hsl color values. There should be at least seven colors defined in this array. In the context of the `ScatterPlotViewer` and `VariableStarViewer`, these default colors are also derived from the [Zooniverse Grommet theme](https://github.com/zooniverse/front-end-monorepo/tree/main/packages/lib-grommet-theme). The colors used are the drawing tool colors.
- `focusedSeries` _(array)_ an array of objects representing the state of the series that is being focused in the UI. This is for the `VariableStarViewer` use case where multiple data series are presented and unfocused data series are set to a gray color. This function could potentially be abstracted out for general use with the `ScatterPlotViewer` in the future.

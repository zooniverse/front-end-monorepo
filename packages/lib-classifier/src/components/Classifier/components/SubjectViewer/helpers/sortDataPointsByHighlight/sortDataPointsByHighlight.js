import isDataSeriesHighlighted from "../isDataSeriesHighlighted"
import glyphComponents from "../getDataSeriesSymbol/glyphComponents"

// SVG doesn't have a z-index, so we must sort by whether or not the series is highlighted
// Render the unhighlighted series first and then the highlighted series on top
export default function sortDataPointsByHighlight(dataPoints, highlightedSeries = []) {
  const highlightedDataSeries = []
  const unhighlightedDataSeries = []

  if (dataPoints === undefined || dataPoints === null) {
    throw new TypeError('dataPoints cannot be null or undefined')
  }

  if (highlightedSeries.length > 0) {
    dataPoints.forEach((series, seriesIndex) => {
      // Set the glyph if it's not already set
      // so we can make sure the series render with the same glyph
      // after they get sorted by highlight
      // This could be pulled into its own small utility helper function
      if (!series?.seriesOptions?.glyph) {
        const glyphNames = Object.keys(glyphComponents)
        const glyph = glyphNames[seriesIndex]
        series.seriesOptions = Object.assign({}, series.seriesOptions, { glyph })

      }

      if (isDataSeriesHighlighted({ highlightedSeries, seriesOptions: series?.seriesOptions })) {
        highlightedDataSeries.push(series)
      } else {
        unhighlightedDataSeries.push(series)
      }
    })

    return [...unhighlightedDataSeries, ...highlightedDataSeries]
  }

  return dataPoints
}
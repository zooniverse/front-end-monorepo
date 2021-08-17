export default function isDataSeriesHighlighted ({ highlightedSeries: highlightedSeries = [], seriesOptions: seriesOptions = {} }) {
  if (highlightedSeries.length > 0) return highlightedSeries.includes(seriesOptions.label)
  return true
}
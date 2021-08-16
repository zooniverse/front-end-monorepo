export default function isDataSeriesHighlighted ({ highlightedSeries: highlightedSeries = [], seriesOptions: seriesOptions = {} }) {
  return highlightedSeries.includes(seriesOptions.label)
}
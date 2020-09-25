export default function isDataSeriesHighlighted (highlightedSeries = [], seriesIndex = 0) {
  const [highlighted] = (highlightedSeries?.length > 0) ? Object.values(highlightedSeries[seriesIndex]) : [true]
  return highlighted
}
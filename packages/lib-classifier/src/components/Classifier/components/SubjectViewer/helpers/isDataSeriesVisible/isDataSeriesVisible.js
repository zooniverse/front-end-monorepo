export default function isDataSeriesVisible (visibleSeries = [], seriesIndex = 0) {
  const [visibility] = Object.values(visibleSeries[seriesIndex]) || []
  return visibility
}
export default function isDataSeriesVisible (visibleSeries = [], seriesIndex = 0) {
  const [visibility] = (visibleSeries?.length > 0) ? Object.values(visibleSeries[seriesIndex]) : []
  return visibility
}
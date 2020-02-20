import glyphComponents from './glyphComponents'

export default function getDataSeriesSymbol(seriesIndex) {
  if (seriesIndex === undefined || seriesIndex === null) {
    throw new TypeError('seriesIndex cannot be null or undefined')
  }
  return glyphComponents[seriesIndex]
}
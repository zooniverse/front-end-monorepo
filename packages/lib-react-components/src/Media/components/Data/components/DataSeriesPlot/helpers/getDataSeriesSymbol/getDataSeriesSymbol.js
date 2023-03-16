import glyphComponents from './glyphComponents'

export default function getDataSeriesSymbol({
  seriesOptions: seriesOptions = {},
  seriesIndex: seriesIndex = 0
}) {
  if (seriesIndex === undefined || seriesIndex === null) {
    throw new TypeError('seriesIndex cannot be null or undefined')
  }
  const glyphNames = Object.keys(glyphComponents)
  const glyphNameBySeriesIndex = glyphNames[seriesIndex]
  const glyphToRender = glyphComponents[seriesOptions.glyph] || glyphComponents[glyphNameBySeriesIndex]
  return glyphToRender
}

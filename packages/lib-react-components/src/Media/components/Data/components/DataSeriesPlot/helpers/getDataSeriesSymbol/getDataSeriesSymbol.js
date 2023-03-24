import * as Glyphs from '@visx/glyph'

export const glyphComponents = {
  circle: Glyphs.GlyphCircle,
  cross: Glyphs.GlyphCross,
  diamond: Glyphs.GlyphDiamond,
  square: Glyphs.GlyphSquare,
  star: Glyphs.GlyphStar,
  triangle: Glyphs.GlyphTriangle,
  wye: Glyphs.GlyphWye
}

export default function getDataSeriesSymbol({
  seriesOptions = {},
  seriesIndex = 0
}) {
  if (seriesIndex === undefined || seriesIndex === null) {
    throw new TypeError('seriesIndex cannot be null or undefined')
  }
  const glyphNames = Object.keys(glyphComponents)
  const glyphName = seriesOptions.glyph || glyphNames[seriesIndex]
  return glyphComponents[glyphName]
}

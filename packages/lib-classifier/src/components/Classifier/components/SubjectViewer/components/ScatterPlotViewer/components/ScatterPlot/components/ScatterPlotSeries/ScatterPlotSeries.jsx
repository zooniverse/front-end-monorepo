import { useTheme } from 'styled-components'

import ScatterPlotPoint from './ScatterPlotPoint'
import getDataSeriesColor from '@viewers/helpers/getDataSeriesColor'
import getDataSeriesSymbol from '@viewers/helpers/getDataSeriesSymbol'
import isDataSeriesHighlighted from '@viewers/helpers/isDataSeriesHighlighted'

export default function ScatterPlotSeries({
  color,
  dataPointSize,
  highlightedSeries,
  series,
  seriesIndex,
  xScale,
  yScale
}) {
  const {
    global: {
      colors = {}
    }
  } = useTheme()
  const highlighted = isDataSeriesHighlighted({ highlightedSeries, seriesOptions: series?.seriesOptions })
  const glyphColor = color || getDataSeriesColor({
    defaultColors: Object.values(colors.drawingTools),
    seriesOptions: series?.seriesOptions,
    seriesIndex,
    themeColors: colors,
    highlighted
  })

  const GlyphComponent = getDataSeriesSymbol({ seriesOptions: series?.seriesOptions, seriesIndex })

  return series.seriesData.map((point, index) => (
    <ScatterPlotPoint
      key={`point-${index}`}
      dataPointSize={dataPointSize}
      glyphColor={glyphColor}
      GlyphComponent={GlyphComponent}
      highlighted={highlighted}
      point={point}
      xScale={xScale}
      yScale={yScale}
    />
  ))
}

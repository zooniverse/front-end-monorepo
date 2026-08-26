import { arrayOf, bool, number, shape, oneOfType, object, string, } from 'prop-types'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { Group } from '@visx/group'
import { withParentSize } from '@visx/responsive'
import cuid from 'cuid'
import { lighten } from 'polished'
import { useTheme } from 'styled-components'

import getDataSeriesColor from './helpers/getDataSeriesColor'
import getDataSeriesSymbol from './helpers/getDataSeriesSymbol'
import getZoomBackgroundColor from './helpers/getZoomBackgroundColor'

import {
  getDataPoints,
  transformXScale,
  transformYScale
} from './helpers/utils'

const INVERT_AXES = {
  x: false,
  y: false
}

// The compact (default) layout has no margin, since there are no axes or legend to make room for.
const NO_MARGIN = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0
}

// Used as a fallback margin (i.e. when the subject JSON doesn't specify one)
// so there's enough space to render axis ticks and labels when showAxes is true.
const AXES_MARGIN = {
  bottom: 40,
  left: 50,
  right: 10,
  top: 10
}

const LEGEND_ITEM_HEIGHT = 20
const LEGEND_ITEM_WIDTH = 120
const LEGEND_SWATCH_SIZE = 10

const PADDING = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0
}

const TRANSFORM_MATRIX = {
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  translateX: 0,
  translateY: 0
}

const CHART_OPTIONS = {
  invertAxes: INVERT_AXES,
  margin: NO_MARGIN,
  padding: PADDING
}

// Adds a 5% buffer around the data points, so the points with min/max don't
// get "stuck" at the edges of the chart. 
const BUFFER_PERCENTAGE_FOR_DATA_EXTENT = 0.05

function DataSeriesPoint({
  GlyphComponent,
  dataPointSize = 10,
  glyphColor,
  point,
  xScaleTransformed,
  yScaleTransformed
}) {
  let xErrorBarPoints, yErrorBarPoints
  const { x, y, x_error, y_error } = point
  const cx = xScaleTransformed(x)
  const cy = yScaleTransformed(y)

  if (x_error) {
    xErrorBarPoints = {
      x1: xScaleTransformed(x - x_error),
      x2: xScaleTransformed(x + x_error)
    }
  }

  if (y_error) {
    yErrorBarPoints = {
      y1: yScaleTransformed(y + y_error),
      y2: yScaleTransformed(y - y_error)
    }
  }

  return (
    <g>
      {x_error &&
        <line
          stroke={lighten(0.25, glyphColor)}
          strokeWidth={2}
          x1={xErrorBarPoints.x1}
          x2={xErrorBarPoints.x2}
          y1={cy}
          y2={cy}
        />}
      {y_error &&
        <line
          stroke={lighten(0.25, glyphColor)}
          strokeWidth={2}
          x1={cx}
          x2={cx}
          y1={yErrorBarPoints.y1}
          y2={yErrorBarPoints.y2}
        />}
      <GlyphComponent
        data-x={x}
        data-y={y}
        left={cx}
        size={dataPointSize}
        top={cy}
        fill={glyphColor}
        stroke={'black'}
      />
    </g>
  )
}

function DataSeriesPlot({
  alt = '',
  backgroundColor = '',
  children,
  jsonData,
  dataPointSize = 25,
  parentHeight,
  parentWidth,
  showAxes = false,
  showLegend = false,
  transformMatrix = TRANSFORM_MATRIX,
  transform
}) {
  const {
    dark,
    global: {
      colors = {},
      font = {}
    }
  } = useTheme()

  // Destructure data and chartOptions from jsonData
  const { data, seriesOptions } = jsonData || {}
  const chartOptions = jsonData?.chartOptions || {
    ...CHART_OPTIONS,
    margin: showAxes ? AXES_MARGIN : NO_MARGIN
  }

  const {
    invertAxes = INVERT_AXES,
    padding = PADDING,
    xAxisLabel,
    xAxisLabelOffset,
    yAxisLabel,
    yAxisLabelOffset
  } = chartOptions

  const dataSeries = getDataPoints(data)
  const legendEntries = dataSeries
    .map((series, seriesIndex) => ({ label: series?.seriesOptions?.label, seriesIndex }))
    .filter(entry => Boolean(entry.label))
  const hasLegend = showLegend && legendEntries.length > 0

  // Fall back to a larger default margin when axes are shown, so there's
  // enough space to render the axis ticks and labels. The subject JSON's
  // chartOptions.margin, when provided, always takes precedence.
  const baseMargin = chartOptions.margin || (showAxes ? AXES_MARGIN : NO_MARGIN)
  const legendColumns = Math.max(1, Math.floor((parentWidth - baseMargin.left - baseMargin.right) / LEGEND_ITEM_WIDTH))
  const legendRows = hasLegend ? Math.ceil(legendEntries.length / legendColumns) : 0
  const legendHeight = legendRows * LEGEND_ITEM_HEIGHT
  const margin = {
    ...baseMargin,
    top: baseMargin.top + legendHeight
  }

  const rangeParameters = {
    invertAxes,
    margin,
    padding,
    parentHeight,
    parentWidth,
    tickDirection: 'outer'
  }

  const leftPosition = margin.left
  const topPosition = margin.top

  let background
  if (backgroundColor) {
    background = backgroundColor
  } else {
    background = getZoomBackgroundColor(dark, false, colors)
  }

  const sortedDataPoints = dataSeries
  const xScaleTransformed = transformXScale(data, transformMatrix, rangeParameters, BUFFER_PERCENTAGE_FOR_DATA_EXTENT)

  const yScaleTransformed = transformYScale(data, transformMatrix, rangeParameters, BUFFER_PERCENTAGE_FOR_DATA_EXTENT)

  const clipPathId = cuid()
  const plotHeight = parentHeight - margin.bottom - margin.top
  const plotWidth = parentWidth - margin.right - margin.left

  const axisColor = dark ? colors['light-1'] : colors['dark-5']
  const fontFamily = font.family
  const axisFontSize = 12

  function getSeriesColor(series, seriesIndex) {
    if (seriesOptions) {
      return getDataSeriesColor({
        defaultColors: Object.values(colors.drawingTools),
        seriesOptions,
        seriesIndex,
        themeColors: colors,
        highlighted: true
      })
    }

    return getDataSeriesColor({
      defaultColors: Object.values(colors.drawingTools),
      seriesOptions: series?.seriesOptions,
      seriesIndex,
      themeColors: colors,
      highlighted: true
    })
  }

  return (
    <svg
      role='img'
      aria-label={alt}
      height='100%'
      width='100%'
    >
      <rect fill={background} />
      <clipPath id={`scatter-plot-${clipPathId}`}>
        <rect
          height={plotHeight}
          width={plotWidth}
        />
      </clipPath>
      <Group
        clipPath={`url(#scatter-plot-${clipPathId})`}
        left={leftPosition}
        top={topPosition}
      >
        <rect
          fill={(dark) ? colors['light-3'] : colors['neutral-6']}
          height={plotHeight}
          left={leftPosition}
          stroke='none'
          strokeWidth={0}
          top={topPosition}
          width={plotWidth}
        />
        {sortedDataPoints.map((series, seriesIndex) => {
          const glyphColor = getSeriesColor(series, seriesIndex)
          const GlyphComponent = getDataSeriesSymbol({ seriesOptions: series?.seriesOptions, seriesIndex })

          return series.seriesData.map((point, pointIndex) => {
            const key = `data-point-${seriesIndex}-${pointIndex}`
            return <DataSeriesPoint
              key={key}
              GlyphComponent={GlyphComponent}
              dataPointSize={dataPointSize}
              glyphColor={glyphColor}
              point={point}
              xScaleTransformed={xScaleTransformed}
              yScaleTransformed={yScaleTransformed}
            />
          })
        })}
      </Group>
      {showAxes &&
        <Group
          className='dataSeriesPlotAxes'
          left={leftPosition}
          top={topPosition}
        >
          <AxisLeft
            label={yAxisLabel}
            labelOffset={yAxisLabelOffset ? yAxisLabelOffset : 10}
            labelProps={{
              fill: axisColor,
              fontFamily,
              fontSize: axisFontSize
            }}
            stroke={axisColor}
            tickLabelProps={value => ({
              fill: axisColor,
              fontFamily,
              fontSize: axisFontSize,
              dx: '-0.25em',
              dy: yScaleTransformed(value) <= plotHeight / 2 ? '0.25em' : '-0.25em',
              textAnchor: 'end'
            })}
            tickStroke={axisColor}
            scale={yScaleTransformed}
            tickValues={yScaleTransformed.domain()}
          />
          <AxisBottom
            label={xAxisLabel}
            labelOffset={xAxisLabelOffset ? xAxisLabelOffset : -10}
            labelProps={{
              fill: axisColor,
              fontFamily,
              fontSize: axisFontSize
            }}
            stroke={axisColor}
            tickLabelProps={value => ({
              fill: axisColor,
              fontFamily,
              fontSize: axisFontSize,
              textAnchor: xScaleTransformed(value) <= plotWidth / 2 ? 'start' : 'end'
            })}
            tickStroke={axisColor}
            scale={xScaleTransformed}
            tickValues={xScaleTransformed.domain()}
            top={plotHeight}
          />
        </Group>}
      {hasLegend &&
        <Group className='dataSeriesPlotLegend' left={leftPosition} top={0}>
          {legendEntries.map(({ label, seriesIndex }, legendIndex) => {
            const series = sortedDataPoints[seriesIndex]
            const swatchColor = getSeriesColor(series, seriesIndex)
            const GlyphComponent = getDataSeriesSymbol({ seriesOptions: series?.seriesOptions, seriesIndex })
            const itemColumn = legendIndex % legendColumns
            const itemRow = Math.floor(legendIndex / legendColumns)
            const itemLeft = itemColumn * LEGEND_ITEM_WIDTH
            const itemTop = itemRow * LEGEND_ITEM_HEIGHT
            const swatchCenter = LEGEND_ITEM_HEIGHT / 2

            return (
              <g key={`legend-item-${seriesIndex}`}>
                <GlyphComponent
                  fill={swatchColor}
                  left={itemLeft + LEGEND_SWATCH_SIZE / 2}
                  size={LEGEND_SWATCH_SIZE * (LEGEND_SWATCH_SIZE / 2)}
                  stroke='black'
                  top={itemTop + swatchCenter}
                />
                <text
                  dy='0.9em'
                  fill={axisColor}
                  fontFamily={fontFamily}
                  fontSize={axisFontSize}
                  x={itemLeft + LEGEND_SWATCH_SIZE + 6}
                  y={itemTop}
                >
                  {label}
                </text>
              </g>
            )
          })}
        </Group>}
    </svg>
  )
}




DataSeriesPlot.propTypes = {
  backgroundColor: string,
  jsonData: shape({
    chartOptions: shape({
      invertAxes: shape({
        x: bool,
        y: bool
      }),
      margin: shape({
        bottom: number,
        left: number,
        right: number,
        top: number
      }),
      padding: shape({
        bottom: number,
        left: number,
        right: number,
        top: number
      })
    }),
    data: oneOfType([
      shape({
        x: arrayOf(number),
        y: arrayOf(number)
      }),
      arrayOf(shape({
        seriesData: arrayOf(shape({
          x: number.isRequired,
          y: number.isRequired,
          x_error: number,
          y_error: number
        })).isRequired,
        seriesOptions: shape({
          color: string,
          label: string.isRequired
        }).isRequired
      }))
    ]).isRequired
  }).isRequired,
  dataPointSize: number,
  parentHeight: number.isRequired,
  parentWidth: number.isRequired,
  showAxes: bool,
  showLegend: bool,
  theme: object,
  transformMatrix: shape({
    scaleX: number,
    scaleY: number,
    skewX: number,
    skewY: number,
    translateX: number,
    translateY: number
  })
}

export { DataSeriesPlot }

export default withParentSize(DataSeriesPlot)

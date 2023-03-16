import PropTypes from 'prop-types'
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

const MARGIN = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0
}

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
  margin: MARGIN,
  padding: PADDING
}

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
  chartOptions = CHART_OPTIONS,
  children,
  data,
  dataPointSize = 25,
  parentHeight,
  parentWidth,
  transformMatrix = TRANSFORM_MATRIX,
  transform,
  underlays = []
}) {
  const {
    dark,
    global: {
      colors = {}
    }
  } = useTheme()

  const {
    invertAxes = INVERT_AXES,
    margin = MARGIN,
    padding = PADDING,
    xAxisLabel,
    xAxisLabelOffset,
    yAxisLabel,
    yAxisLabelOffset
  } = chartOptions

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

  const sortedDataPoints = getDataPoints(data)
  const xScaleTransformed = transformXScale(data, transformMatrix, rangeParameters)

  const yScaleTransformed = transformYScale(data, transformMatrix, rangeParameters)

  const clipPathId = cuid()
  const plotHeight = parentHeight - margin.bottom - margin.top
  const plotWidth = parentWidth - margin.right - margin.left

  let underlayParameters = []
  if (underlays.length > 0) {
    underlayParameters = underlays.map((underlay) => {
      const { fill, startPosition, xAxisWidth } = underlay
      const left = xScaleTransformed(startPosition)
      const width = xScaleTransformed(0) - xScaleTransformed(-xAxisWidth)
      return { fill, left, width }
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
          borderColor={(dark) ? colors['light-5'] : colors['dark-5']}
          fill={(dark) ? colors['light-3'] : colors['neutral-6']}
          height={plotHeight}
          left={leftPosition}
          top={topPosition}
          underlayParameters={underlayParameters}
          width={plotWidth}
        />
        {sortedDataPoints.map((series, seriesIndex) => {
          const glyphColor = getDataSeriesColor({
            defaultColors: Object.values(colors.drawingTools),
            seriesOptions: series?.seriesOptions,
            seriesIndex,
            themeColors: colors,
            highlighted: true
          })
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
    </svg>
  )
}



DataSeriesPlot.propTypes = {
  backgroundColor: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.number),
      y: PropTypes.arrayOf(PropTypes.number)
    }),
    PropTypes.arrayOf(PropTypes.shape({
      seriesData: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        x_error: PropTypes.number,
        y_error: PropTypes.number
      })).isRequired,
      seriesOptions: PropTypes.shape({
        color: PropTypes.string,
        label: PropTypes.string.isRequired
      }).isRequired
    }))
  ]).isRequired,
  dataPointSize: PropTypes.number,
  invertAxes: PropTypes.shape({
    x: PropTypes.bool,
    y: PropTypes.bool
  }),
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }),
  padding: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }),
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  theme: PropTypes.object,
  transformMatrix: PropTypes.shape({
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
    skewX: PropTypes.number,
    skewY: PropTypes.number,
    translateX: PropTypes.number,
    translateY: PropTypes.number
  }),
  underlays: PropTypes.arrayOf(PropTypes.object)
}

export default withParentSize(DataSeriesPlot)

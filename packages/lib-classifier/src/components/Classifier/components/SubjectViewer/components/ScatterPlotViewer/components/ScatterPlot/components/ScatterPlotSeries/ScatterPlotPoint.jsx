import { lighten } from 'polished'
import { useTheme } from 'styled-components'

export default function ScatterPlotPoint({
  dataPointSize,
  glyphColor,
  GlyphComponent,
  highlighted,
  point,
  xScale,
  yScale
}) {
  const {
    global: {
      colors = {}
    }
  } = useTheme()
  let xErrorBarPoints, yErrorBarPoints
  const { x, y, x_error, y_error } = point
  const cx = xScale(x)
  const cy = yScale(y)
  const errorBarColor = lighten(0.25, glyphColor)

  if (x_error) {
    xErrorBarPoints = {
      x1: xScale(x - x_error),
      x2: xScale(x + x_error)
    }
  }

  if (y_error) {
    yErrorBarPoints = {
      y1: yScale(y + y_error),
      y2: yScale(y - y_error)
    }
  }

  return (
    <g>
      {x_error &&
        <line
          className='errorBar'
          stroke={errorBarColor}
          strokeWidth={2}
          x1={xErrorBarPoints.x1}
          x2={xErrorBarPoints.x2}
          y1={cy}
          y2={cy}
        />}
      {y_error &&
        <line
          className='errorBar'
          stroke={errorBarColor}
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
        stroke={(highlighted) ? 'black' : colors['light-4']}
      />
    </g>
  )
}

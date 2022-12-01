import PropTypes from 'prop-types'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { withTheme } from 'styled-components'
import InnerTickAxis from '../InnerTickAxis'

function Axis (props) {
  const {
    axis,
    className,
    color,
    margin,
    padding,
    parentHeight,
    parentWidth,
    theme,
    tickDirection,
    tickLength
  } = props
  let axisColor

  if (color) {
    axisColor = color
  } else if (theme.dark) {
    axisColor = theme.global.colors['light-1']
  } else {
    axisColor = theme.global.colors['dark-5']
  }

  const fontFamily = theme.global.font.family

  const {
    label,
    labelOffset,
    numTicks,
    orientation,
    scale
  } = axis
  // TODO: is this still true with visx v1.0?
  // :( this doesn't work because of https://github.com/hshoff/vx/issues/283
  // const fontSize = theme.text.xsmall.size
  const fontSize = 12

  if (tickDirection === 'inner') {
    return (
      <InnerTickAxis
        axis={axis}
        color={axisColor}
        fontSize={fontSize}
        margin={margin}
        numTicks={numTicks}
        padding={padding}
        parentHeight={parentHeight}
        parentWidth={parentWidth}
        tickLength={tickLength}
      />
    )
  }

  if (orientation === 'left') {
    return (
      <AxisLeft
        axisClassName={className}
        label={label}
        labelClassName='Axis__label'
        labelOffset={labelOffset}
        labelProps={{
          dy: '2.5em',
          fill: axisColor,
          fontSize,
          fontFamily,
        }}
        left={padding.left}
        numTicks={numTicks}
        tickLabelProps={() => ({
          dx: '-0.25em',
          dy: '0.25em',
          fill: axisColor,
          fontSize,
          fontFamily,
          textAnchor: 'end'
        })}
        tickStroke={axisColor}
        stroke={axisColor}
        scale={scale}
        top={0}
      />
    )
  }

  if (orientation === 'bottom') {
    // TODO: check to see if this is still true with visx v1.0:
    // vx axis components assume center position for label,
    // so the labelProps textAnchor option doesn't do what you might think it does
    // x position on the text starts at the center of the scale range
    // so textAnchor='start' starts at the center of the range!
    // we calculate the dx to get the position to actually be at the start
    const dx = scale.range()[1] / 2
    return (
      <AxisBottom
        axisClassName={className}
        label={label}
        labelClassName='Axis__label'
        labelOffset={labelOffset}
        labelProps={{
          dx: -dx,
          fill: axisColor,
          fontSize,
          fontFamily,
        }}
        left={0}
        numTicks={numTicks}
        tickLabelProps={() => ({
          dy: '0.25em',
          fill: axisColor,
          fontSize,
          fontFamily,
          textAnchor: 'middle',
        })}
        tickStroke={axisColor}
        stroke={axisColor}
        scale={scale}
        top={parentHeight - margin.bottom - margin.top}
      />
    )
  }

  return null
}

Axis.defaultProps = {
  axis: {},
  color: '',
  margin: {
    bottom: 10,
    left: 10,
    right: 10,
    top: 10
  },
  numTicks: 10,
  padding: {
    bottom: 30,
    left: 30,
    right: 0,
    top: 0
  },
  theme: {
    global: {
      colors: {},
      font: {}
    }
  },
  tickDirection: 'outer',
  tickLength: 5
}

Axis.propTypes = {
  axis: PropTypes.shape({
    label: PropTypes.string.isRequired,
    labelOffset: PropTypes.number.isRequired,
    orientation: PropTypes.oneOf(['bottom', 'left']).isRequired,
    scale: PropTypes.func.isRequired // D3 scaleLinear function
  }),
  color: PropTypes.string,
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }).isRequired,
  numTicks: PropTypes.number,
  padding: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }).isRequired,
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  theme: PropTypes.object,
  tickDirection: PropTypes.oneOf(['inner', 'outer']),
  tickLength: PropTypes.number
}

export default withTheme(Axis)
export { Axis }

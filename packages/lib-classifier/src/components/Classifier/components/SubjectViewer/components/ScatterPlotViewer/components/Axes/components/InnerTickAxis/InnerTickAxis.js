import PropTypes from 'prop-types'
import { Axis } from '@visx/axis'
import { Line } from '@visx/shape'
import { Group } from '@visx/group'

function InnerTickAxis (props) {
  const {
    axis: {
      label,
      orientation,
      scale
    },
    color,
    fontSize,
    margin,
    numTicks,
    padding,
    parentHeight,
    parentWidth,
    tickLength
  } = props

  const top = {
    bottom: parentHeight - margin.top - tickLength,
    left: padding.top
  }

  const labelTransform = {
    bottom: `translate(${parentWidth - (padding.left + margin.left)}, ${0 - margin.right})`,
    left: `translate(${margin.left}, ${margin.right})`
  }

  const visxOrientation = {
    bottom: 'bottom',
    left: 'right' // this seems counter-intuitive, but this is how we can get the ticks to display in the correct direction
  }
  return (
    <Axis
      hideAxisLine
      label={label}
      left={0}
      numTicks={numTicks}
      orientation={visxOrientation[orientation]}
      tickLength={tickLength}
      top={top[orientation]}
      scale={scale}
    >
      {innerAxis => {
        return (
          <Group>
            {innerAxis.ticks.map((tick, i) => {
              const tickLabelTransform = {
                left: `translate(${tick.to.x + tickLength}, ${tick.to.y + 3})`,
                bottom: `translate(${tick.to.x}, ${tick.to.y - margin.bottom})`
              }
              const tickTextAnchor = {
                left: 'start',
                bottom: 'middle'
              }
              return (
                <Group key={`visx-tick-${tick.value}-${i}`} className='visx-axis-tick'>
                  <Line from={tick.from} to={tick.to} stroke={color} />
                  <text
                    transform={tickLabelTransform[orientation]}
                    fontSize={fontSize}
                    textAnchor={tickTextAnchor[orientation]}
                    fill={color}
                  >
                    {tick.formattedValue}
                  </text>
                </Group>
              )
            })}
            <text
              fill={color}
              fontSize={fontSize}
              transform={labelTransform[orientation]}
            >
              {innerAxis.label}
            </text>
          </Group>
        )
      }}
    </Axis>
  )
}

InnerTickAxis.defaultProps = {
  axis: {},
  color: 'black',
  fontSize: 12,
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
  tickLength: 5
}

InnerTickAxis.propTypes = {
  axis: PropTypes.shape({
    label: PropTypes.string.isRequired,
    orientation: PropTypes.oneOf(['bottom', 'left']).isRequired,
    scale: PropTypes.func.isRequired // D3 scaleLinear function
  }),
  color: PropTypes.string,
  fontSize: PropTypes.number,
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }),
  numTicks: PropTypes.number,
  padding: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number
  }),
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  tickLength: PropTypes.number
}

export default InnerTickAxis

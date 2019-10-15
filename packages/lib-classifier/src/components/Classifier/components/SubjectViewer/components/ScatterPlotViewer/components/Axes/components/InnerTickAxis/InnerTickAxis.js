import React from 'react'
import PropTypes from 'prop-types'
import { Axis } from '@vx/axis'
import { Line } from '@vx/shape'
import { Group } from '@vx/group'

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
    padding,
    parentHeight,
    parentWidth,
    tickLength
  } = props

  const top = {
    bottom: parentHeight - margin.top - tickLength,
    left: padding.left
  }

  const labelTransform = {
    bottom: `translate(${parentWidth - (padding.left + margin.left)}, ${0 - margin.right})`,
    left: `translate(${0 + margin.left}, ${0 - margin.right})`
  }

  const vxOrientation = {
    bottom: 'bottom',
    left: 'right' // this seems counter-intuitive, but this is how we can get the ticks to display in the correct direction
  }
  return (
    <Axis
      hideAxisLine
      label={label}
      left={0}
      orientation={vxOrientation[orientation]}
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
                <Group key={`vx-tick-${tick.value}-${i}`} className='vx-axis-tick'>
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
              );
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
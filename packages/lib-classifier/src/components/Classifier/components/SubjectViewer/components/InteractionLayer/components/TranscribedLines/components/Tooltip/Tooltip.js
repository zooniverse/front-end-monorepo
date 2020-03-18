import React from 'react'
import { number, shape, string } from 'prop-types'

export default function Tooltip (props) {
  const {
    background,
    className,
    id,
    label: {
      fill,
      text
    },
    x1,
    y1
  } = props
  return (
    <g
      className={className}
      id={id}
      transform={`translate(${x1 + 10}, ${y1 + 10})`}
    >
      <rect
        fill={background}
        x={0}
        y={0}
        height={45}
        width={320}
      >
      </rect>
      <text
        fill={fill}
        x={20}
        y={20}
      >
        {text}
      </text>
    </g>
  )
}

Tooltip.defaultProps = {
  background: '',
  className: '',
  index: Math.random()
}

Tooltip.propTypes = {
  background: string,
  className: string,
  index: number,
  label: shape({
    fill: string,
    text: string
  }).isRequired,
  x1: number.isRequired,
  y1: number.isRequired
}
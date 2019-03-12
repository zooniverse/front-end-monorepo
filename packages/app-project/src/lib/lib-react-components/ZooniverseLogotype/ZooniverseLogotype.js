import React from 'react'
import { number, string } from 'prop-types'

import SVGContent from './SVGContent'

export default function ZooniverseLogotype (props) {
  const { id, width, ...rest } = props
  const viewBoxHeight = 280.5
  const viewBoxWidth = 2433.8
  const height = (viewBoxHeight / viewBoxWidth) * width
  return (
    <svg
      aria-labelledby={id}
      height={height}
      role='img'
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width={width}
      {...rest}
    >
      <title id={id}>
        Zooniverse Logo
      </title>
      <g fill='currentColor' stroke='none'>
        <SVGContent />
      </g>
    </svg>
  )
}

ZooniverseLogotype.propTypes = {
  id: string.isRequired,
  width: number,
}

ZooniverseLogotype.defaultProps = {
  width: 178,
}

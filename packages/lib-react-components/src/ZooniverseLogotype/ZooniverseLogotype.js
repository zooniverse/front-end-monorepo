import React from 'react'
import { number, string } from 'prop-types'

import SVGContent from './SVGContent.js'

export default function ZooniverseLogotype({
  id,
  width = 178,
  ...rest
}) {
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
        Zooniverse
      </title>
      <g fill='currentColor' stroke='none'>
        <SVGContent />
      </g>
    </svg>
  )
}

ZooniverseLogotype.propTypes = {
  id: string.isRequired,
  width: number
}

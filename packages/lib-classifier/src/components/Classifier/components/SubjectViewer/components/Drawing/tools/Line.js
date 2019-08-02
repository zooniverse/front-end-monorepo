import PropTypes from 'prop-types'
import React from 'react'

import DrawingToolRoot from './root'

const Line = ({ active, mark, scale }) => {
  const secondaryCoordinates = mark.events.filter(event => event.type === 'mousemove' || event.type === 'mousedown')

  const coordinates = {
    x1: `${mark.events[0].x}`,
    y1: `${mark.events[0].y}`,
    x2: `${secondaryCoordinates[secondaryCoordinates.length - 1].x}`,
    y2: `${secondaryCoordinates[secondaryCoordinates.length - 1].y}`
  }

  return (
    <DrawingToolRoot active tool={mark.tool}>
      <line {...coordinates} />
    </DrawingToolRoot>
  )
}

export default Line

import React from 'react'
import PropTypes from 'prop-types'

import { draggable } from '@plugins/drawingTools/components'

const DraggableImage = draggable('image')
const DraggableRect = draggable('rect')

function SGVGridCell (props) {
  const {
    image,
    index,
    cellWidth,
    cellHeight,
    gridRows,
    gridColumns,
    cellStyle,
    panX,
    panY,
    zoom,
    dragMove,
  } = props
    
  const row = Math.floor(index / gridColumns)
  const col = index % gridColumns

  const cellXOffset = col * cellWidth
  const cellYOffset = row * cellHeight

  if (
    !image || !image.src || !image.naturalHeight || !image.naturalWidth  // Don't render an image if there's no image to render. Of course.
    || row < 0 || row >= gridRows || col < 0 || col >= gridColumns  // Don't render anything beyond the specified grid.
    || !cellWidth || !cellHeight || !gridColumns || !gridRows
  ) return null

  // TODO: what if there are fewer images than cells in the grid?

  const fitRatio = Math.max(
    image.naturalWidth / cellWidth,
    image.naturalHeight / cellHeight,
  )

  const imageHeight = image.naturalHeight / fitRatio
  const imageWidth = image.naturalWidth / fitRatio

  // image.x and image.y determine the default 'padding' for an image inside
  // its cell, and is applied before the zoom & translation/pan transforms.
  // Note: this COULD be consolidated into the transform calculations, but why
  // complicate things?
  const imageX = (cellWidth - imageWidth) / 2
  const imageY = (cellHeight - imageHeight) / 2

  // TODO: WARNING! CLIP PATH NOT WORKING
  const clipPathID = `subjectGroupViewer-clipPath-${index}`

  return (
    <g
      transform={`translate(${cellXOffset}, ${cellYOffset})`}
    >
      <clipPath id={clipPathID}>
        <rect width={cellWidth} height={cellHeight} />
      </clipPath>
      <DraggableRect
        fill={cellStyle.fill}
        width={cellWidth}
        height={cellHeight}
        dragMove={dragMove}
      />
      <g clipPath={`url(#${clipPathID})`}>
        <DraggableImage
          dragMove={dragMove}
          height={imageHeight}
          width={imageWidth}
          xlinkHref={image.src}
          x={imageX}
          y={imageY}
          transform={`scale(${zoom}) translate(${panX}, ${panY})`}
          transform-origin={`${imageWidth/2}px ${imageHeight/2}px`}
        />
      </g>
      <rect
        fill="none"
        stroke={cellStyle.stroke}
        strokeWidth={cellStyle.strokeWidth}
        width={cellWidth}
        height={cellHeight}
      />
    </g>
  )
}

SGVGridCell.defaultProps = {
}

SGVGridCell.propTypes = {
}

export default SGVGridCell

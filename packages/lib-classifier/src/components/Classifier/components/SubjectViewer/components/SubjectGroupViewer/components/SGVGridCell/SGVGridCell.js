import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { draggable } from '@plugins/drawingTools/components'

const BORDER_MULTIPLIER = 2  // Multiply by 2 because half of intended stroke-width will be clipped
const FOCUS_MULTIPLIER = 6

const DraggableImage = styled(draggable('image'))`
    cursor: grab;
  }
`

const DraggableRect = styled(draggable('rect'))`
    cursor: grab;
  }
`

const ClickableRect = styled('rect')`
    cursor: pointer;
    &:focus {
      ${props => css`stroke: ${props.cellStyle.highlight};`}
      ${props => css`stroke-width: ${props.cellStyle.highlightWidth * FOCUS_MULTIPLIER};`}
    }
  }
`

function SGVGridCell (props) {
  const {
    image,
    index,
    
    dragMove,
    
    cellWidth,
    cellHeight,
    cellStyle,
    gridRows,
    gridColumns,
    
    panX,
    panY,
    zoom,
    
    annotation,
    annotationMode,
    cellAnnotated,
  } = props
  
  const [checked, setChecked] = useState(cellAnnotated)
  
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

  const clipPathID = `subjectGroupViewer-clipPath-${index}`
  
  function toggleCellAnnotation () {
    if (!annotationMode || !annotation?.value) return

    const toggledValue = !checked
    setChecked(toggledValue)

    const annotationValue = annotation?.value?.slice() || []
    const hasCellIndex = annotationValue.includes(index)
    
    if (hasCellIndex && !toggledValue) {  // Remove cell index from annotation values
      const indexInValue = annotationValue.indexOf(index)
      annotationValue.splice(indexInValue, 1)
    } else if (!hasCellIndex && toggledValue) {  // Add cell index to annotation values
      annotationValue.push(index)
    }
    
    if (annotation?.update) annotation.update(annotationValue)
  }

  return (
    <g
      transform={`translate(${cellXOffset}, ${cellYOffset})`}
    >
      <clipPath id={clipPathID}>
        <rect width={cellWidth} height={cellHeight} />
      </clipPath>
      <DraggableRect
        fill={cellStyle.background}
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
        <DraggableRect
          fill={(checked) ? cellStyle.overlay : 'none'}
          stroke={(checked) ? cellStyle.highlight : cellStyle.stroke}
          strokeWidth={(checked)
            ? cellStyle.highlightWidth * BORDER_MULTIPLIER
            : cellStyle.strokeWidth * BORDER_MULTIPLIER
          }
          width={cellWidth}
          height={cellHeight}
        />
        {annotationMode && (
          <ClickableRect
            tabIndex={0}
            role='checkbox'
            aria-checked={checked}
            aria-label={`Cell at row ${row} column ${col}`}
            fill="transparent"
            cellStyle={cellStyle}
            width={cellWidth}
            height={cellHeight}
            onClick={(e) => {
              toggleCellAnnotation()
              e.preventDefault()
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                toggleCellAnnotation()
                e.preventDefault()
              }
            }}
          />
        )}
      </g>
    </g>
  )
}

SGVGridCell.propTypes = {
  image: PropTypes.object,
  index: PropTypes.number,
            
  dragMove: PropTypes.func,
  
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number,
  cellStyle: PropTypes.object,
  gridRows: PropTypes.number,
  gridColumns: PropTypes.number,

  panX: PropTypes.number,
  panY: PropTypes.number,
  zoom: PropTypes.number,

  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.array
  }),
  annotationMode: PropTypes.bool,
  cellAnnotated: PropTypes.bool,
}

SGVGridCell.defaultProps = {
  image: undefined,
  index: 0,
            
  dragMove: () => {},
  
  cellWidth: 200,
  cellHeight: 200,
  cellStyle: {},
  gridRows: 1,
  gridColumns: 1,

  panX: 0,
  panY: 0,
  zoom: 1,

  annotation: undefined,
  annotationMode: true,
  cellAnnotated: false,
}

export default SGVGridCell

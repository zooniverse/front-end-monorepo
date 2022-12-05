import { useState } from 'react';
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { draggable } from '@plugins/drawingTools/components'

const FOCUS_OFFSET = 2

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
      ${props => css`outline: ${props.cellStyle.focusOutline};`}
    }
  }
`

function SGVGridCell (props) {
  const {
    image,
    index,
    subjectId,
    
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
    const isThisCellSelected = annotationValue.find(item => item.index === index)
        
    if (isThisCellSelected && !toggledValue) {  // Remove cell index from annotation values
      const indexInValue = annotationValue.indexOf(isThisCellSelected)
      annotationValue.splice(indexInValue, 1)
    } else if (!isThisCellSelected && toggledValue) {  // Add cell index to annotation values
      annotationValue.push({
        index,
        subject: subjectId,
      })
    }
    
    if (annotation?.update) annotation.update(annotationValue)
  }
  
  // Use an offset to ensure the zoom/scale transform occurs at the centre of
  // the image, instead of the top-left (0,0) origin point.
  // This hack is necessary since Safari doesn't support transform-origin to
  // manually define the origin point, i.e. we can't use
  // transform-origin={`${imageWidth/2}px ${imageHeight/2}px`}
  const addOriginOffset = `translate(${imageWidth/2}, ${imageHeight/2})`
  const removeOriginOffset = `translate(${-imageWidth/2}, ${-imageHeight/2})`
  
  const imageTransform = `${addOriginOffset} scale(${zoom}) ${removeOriginOffset} translate(${panX}, ${panY})`

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
          href={image.src}
          x={imageX}
          y={imageY}
          transform={imageTransform}
        />
        <DraggableRect
          fill={(checked) ? cellStyle.overlay : 'none'}
          stroke={(checked) ? cellStyle.selectedStroke : cellStyle.stroke}
          strokeWidth={(checked)
            ? cellStyle.selectedStrokeWidth
            : cellStyle.strokeWidth
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
            x={FOCUS_OFFSET}
            y={FOCUS_OFFSET}
            width={cellWidth - FOCUS_OFFSET * 2}
            height={cellHeight - FOCUS_OFFSET * 2}
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
  subjectId: PropTypes.string,
            
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
  subjectId: '',
            
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

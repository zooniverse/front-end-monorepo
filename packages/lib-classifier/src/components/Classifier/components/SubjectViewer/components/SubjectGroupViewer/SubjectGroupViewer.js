import PropTypes from 'prop-types'
import React, { forwardRef, useContext, useRef } from 'react'
import styled from 'styled-components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import SGVGridCell from './components/SGVGridCell'

const Container = styled.div`
  animation: fadein 1s 0s forwards;
  height: 100%;
  overflow: hidden;
  width: 100%;

  @keyframes fadein {
    from {
      opacity: 0;
    }

    to {
      opacity: 100%;
    }
  }
`

const SubjectGroupViewer = forwardRef(function SubjectGroupViewer(props, ref) {
  const {
    images,
    subjectIds,
    
    dragMove,
    onKeyDown,
    
    cellWidth,
    cellHeight,
    cellStyle,
    gridRows,
    gridColumns,
    
    width,
    height,
    
    panX,
    panY,
    zoom,
    
    annotation,
    interactionMode,
    isCurrentTaskValidForAnnotation,
  } = props

  const transformLayer = useRef()
  const { svg } = useContext(SVGContext)
  const getScreenCTM = () => transformLayer.current.getScreenCTM()
  const annotatedValues = annotation?.value || []
    
  const annotationMode = interactionMode === 'annotate' && isCurrentTaskValidForAnnotation
  
  return (
    <SVGContext.Provider value={{ svg, getScreenCTM }}>
      <Container>
        <svg
          ref={ref}
          focusable
          onKeyDown={onKeyDown}
          tabIndex={0}
          viewBox={`0 0 ${width} ${height}`}
        >
          <g
            ref={transformLayer}
          >
            {images.map((image, index) => (
              <SGVGridCell
                key={`sgv-grid-cell-${index}`}
                
                image={image}
                index={index}
                subjectId={subjectIds[index]}
                
                dragMove={dragMove}
                
                cellWidth={cellWidth}
                cellHeight={cellHeight}
                cellStyle={cellStyle}
                gridRows={gridRows}
                gridColumns={gridColumns}
                
                panX={panX}
                panY={panY}
                zoom={zoom}

                annotation={annotation}
                annotationMode={annotationMode}
                cellAnnotated={annotatedValues.includes(index)}
              />
            ))}
          </g>
        </svg>
      </Container>
    </SVGContext.Provider>
  )
})

SubjectGroupViewer.propTypes = {
  images: PropTypes.array,
  subjectIds: PropTypes.arrayOf(PropTypes.string),
            
  dragMove: PropTypes.func,
  onKeyDown: PropTypes.func,
  
  cellWidth: PropTypes.number,
  cellHeight: PropTypes.number,
  cellStyle: PropTypes.object,
  gridRows: PropTypes.number,
  gridColumns: PropTypes.number,

  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,

  panX: PropTypes.number,
  panY: PropTypes.number,
  zoom: PropTypes.number,

  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.array
  }),
  interactionMode: PropTypes.oneOf(['annotate', 'move']),
  isCurrentTaskValidForAnnotation: PropTypes.bool,
}

SubjectGroupViewer.defaultProps = {
  images: [],
  subjectIds: [],
            
  dragMove: () => {},
  onKeyDown: () => {},
  
  cellWidth: 200,
  cellHeight: 200,
  cellStyle: {},
  gridRows: 1,
  gridColumns: 1,

  panX: 0,
  panY: 0,
  zoom: 1,

  annotation: undefined,
  interactionMode: 'move',
  isCurrentTaskValidForAnnotation: false,
}

export default SubjectGroupViewer

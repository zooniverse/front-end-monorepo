import PropTypes from 'prop-types'
import { forwardRef, useRef } from 'react';
import styled, { css } from 'styled-components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import SGVGridCell from './components/SGVGridCell'

const Container = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  ${props => props.gridMaxWidth
    ? css`max-width: ${props.gridMaxWidth};`
    : ''}
  ${props => props.gridMaxHeight
    ? css`max-height: ${props.gridMaxHeight};`
    : ''}

  animation: fadein 1s 0s forwards;
  @keyframes fadein {
    from {
      opacity: 0;
    }

    to {
      opacity: 100%;
    }
  }
`

/*
Note on Subject Viewer sizing/fitting:
- The grid should fit the height OR width of the available visible space.
- This is implemented with the container div AND the <svg> having
  width/height=100% (which 'fits') an optional max-width/height (which
  'restricts').
- Curious note: the max-width/height has to be repeated in <svg> due to
  Safari 12. If we ignore Safari, we only need max-width/height on the
  container div, not the <svg>
 */
export const SVG = styled.svg`
  width: 100%;
  height: 100%;

  ${props => props.gridMaxWidth
    ? css`max-width: ${props.gridMaxWidth};`
    : ''}
  ${props => props.gridMaxHeight
    ? css`max-height: ${props.gridMaxHeight};`
    : ''}
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
    gridMaxWidth,
    gridMaxHeight,
    
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
  const canvas = transformLayer.current
  const annotatedValues = annotation?.value || []
    
  const annotationMode = interactionMode === 'annotate' && isCurrentTaskValidForAnnotation
  
  return (
    <SVGContext.Provider value={{ canvas }}>
      <Container
        gridMaxWidth={gridMaxWidth}
        gridMaxHeight={gridMaxHeight}
      >
        <SVG
          ref={ref}
          focusable
          onKeyDown={onKeyDown}
          tabIndex={0}
          viewBox={`0 0 ${width} ${height}`}
          gridMaxWidth={gridMaxWidth}
          gridMaxHeight={gridMaxHeight}
          xmlns="http://www.w3.org/2000/svg"
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
        </SVG>
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
  gridMaxWidth: PropTypes.string,
  gridMaxHeight: PropTypes.string,

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
  gridMaxWidth: '',
  gridMaxHeight: '',

  panX: 0,
  panY: 0,
  zoom: 1,

  annotation: undefined,
  interactionMode: 'move',
  isCurrentTaskValidForAnnotation: false,
}

export default SubjectGroupViewer

import { array, arrayOf, bool, func, number, object, oneOf, shape, string } from 'prop-types'
import { forwardRef, useRef } from 'react'
import styled, { css } from 'styled-components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import SGVGridCell from './components/SGVGridCell'

const DEFAULT_CELL_STYLE = {}
const DEFAULT_IMAGES = []
const DEFAULT_HANDLER = () => false
const DEFAULT_SUBJECT_IDS = []

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !['gridMaxWidth', 'gridMaxHeight'].includes(prop)
})`
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
export const SVG = styled.svg.withConfig({
  shouldForwardProp: (prop) => !['gridMaxWidth', 'gridMaxHeight'].includes(prop)
})`
  width: 100%;
  height: 100%;

  ${props => props.gridMaxWidth
    ? css`max-width: ${props.gridMaxWidth};`
    : ''}
  ${props => props.gridMaxHeight
    ? css`max-height: ${props.gridMaxHeight};`
    : ''}
`

const SubjectGroupViewer = forwardRef(function SubjectGroupViewer({
  images = DEFAULT_IMAGES,
  subjectIds = DEFAULT_SUBJECT_IDS,
  
  dragMove = DEFAULT_HANDLER,
  onKeyDown = DEFAULT_HANDLER,
  
  cellWidth = 200,
  cellHeight = 200,
  cellStyle = DEFAULT_CELL_STYLE,
  gridRows = 1,
  gridColumns = 1,
  gridMaxWidth = '',
  gridMaxHeight = '',
  
  width,
  height,
  
  panX = 0,
  panY = 0,
  zoom = 1,
  
  annotation,
  currentTask = null,
  interactionMode = 'move',
  isCurrentTaskValidForAnnotation = false,
}, ref) {

  const transformLayer = useRef()
  const canvas = transformLayer.current
  // Extract cell indices for cellAnnotated prop
  const annotatedValues = annotation?.value ? annotation.value.map(cell => cell.index) : []

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
                currentTask={currentTask}
              />
            ))}
          </g>
        </SVG>
      </Container>
    </SVGContext.Provider>
  )
})

SubjectGroupViewer.propTypes = {
  images: array,
  subjectIds: arrayOf(string),

  dragMove: func,
  onKeyDown: func,

  cellWidth: number,
  cellHeight: number,
  cellStyle: object,
  gridRows: number,
  gridColumns: number,
  gridMaxWidth: string,
  gridMaxHeight: string,

  width: number.isRequired,
  height: number.isRequired,

  panX: number,
  panY: number,
  zoom: number,

  annotation: shape({
    value: array,
    getCellByIndex: func,
    addCell: func,
    removeCell: func
  }),
  currentTask: object,
  interactionMode: oneOf(['annotate', 'move']),
  isCurrentTaskValidForAnnotation: bool
}

export default SubjectGroupViewer

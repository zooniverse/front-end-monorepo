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
  } = props

  const transformLayer = useRef()
  const { svg } = useContext(SVGContext)
  const getScreenCTM = () => transformLayer.current.getScreenCTM()

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
                
                dragMove={dragMove}
                
                cellWidth={cellWidth}
                cellHeight={cellHeight}
                cellStyle={cellStyle}
                gridRows={gridRows}
                gridColumns={gridColumns}
                
                panX={panX}
                panY={panY}
                zoom={zoom}
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
}

SubjectGroupViewer.defaultProps = {
  images: [],
            
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
}

export default SubjectGroupViewer

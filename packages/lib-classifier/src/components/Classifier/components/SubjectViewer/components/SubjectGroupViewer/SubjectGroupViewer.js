import PropTypes from 'prop-types'
import React, { createRef, forwardRef, useContext } from 'react'
import styled from 'styled-components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import InteractionLayer from '../InteractionLayer'

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
    children,
    enableInteractionLayer,
    height,
    onKeyDown,
    rotate,
    scale,
    viewBox,
    width
  } = props

  const transformLayer = createRef()
  const { svg } = useContext(SVGContext)
  const transform = `rotate(${rotate} ${width / 2} ${height / 2 })`
  const getScreenCTM = () => transformLayer.current.getScreenCTM()

  return (
    <SVGContext.Provider value={{ svg, getScreenCTM }}>
      <Container>
        <svg
          ref={ref}
          focusable
          onKeyDown={onKeyDown}
          tabIndex={0}
          viewBox={viewBox}
        >
          <g
            ref={transformLayer}
            transform={transform}
          >
            {children}
            {enableInteractionLayer &&
              <InteractionLayer
                scale={scale}
                height={height}
                width={width}
              />}
            </g>
        </svg>
      </Container>
    </SVGContext.Provider>
  )
})

SubjectGroupViewer.propTypes = {
  enableInteractionLayer: PropTypes.bool,
  height: PropTypes.number.isRequired,
  onKeyDown: PropTypes.func,
  rotate: PropTypes.number,
  scale: PropTypes.number,
  viewBox: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
}

SubjectGroupViewer.defaultProps = {
  enableInteractionLayer: true,
  onKeyDown: () => true,
  rotate: 0,
  scale: 1
}

export default SubjectGroupViewer

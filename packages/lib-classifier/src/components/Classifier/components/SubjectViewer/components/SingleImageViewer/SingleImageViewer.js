import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import styled from 'styled-components'

import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import InteractionLayer from '../InteractionLayer'
import ZoomControlButton from '../ZoomControlButton'

const StyledBox = styled(Box)`
  image {
    filter: ${({ invert }) => invert ? 'invert(100%)' : 'invert(0%)'};
  }
`

function SingleImageViewer (props) {
  const {
    children,
    enableInteractionLayer = true,
    height,
    invert = false,
    onKeyDown = () => true,
    rotate = 0,
    scale = 1,
    title = {},
    viewBox,
    width,
    zoomControlFn = null,
    zooming = false
  } = props

  const transformLayer = useRef()
  const canvas = transformLayer.current
  const transform = `rotate(${rotate} ${width / 2} ${height / 2})`

  return (
    <SVGContext.Provider value={{ canvas }}>
      {zoomControlFn && (
        <ZoomControlButton
          onClick={zoomControlFn}
          zooming={zooming}
        />
      )}
      <StyledBox
        animation='fadeIn'
        invert={invert}
        overflow='hidden'
      >
        <svg
          focusable
          onKeyDown={onKeyDown}
          tabIndex={0}
          viewBox={viewBox}
          xmlns='http://www.w3.org/2000/svg'
        >
          {title?.id && title?.text && (
            <title id={title.id}>{title.text}</title>
          )}
          <g
            ref={transformLayer}
            transform={transform}
          >
            {children}
            {enableInteractionLayer && (
              <InteractionLayer
                scale={scale}
                height={height}
                width={width}
              />
            )}
          </g>
        </svg>
      </StyledBox>
    </SVGContext.Provider>
  )
}

SingleImageViewer.propTypes = {
  enableInteractionLayer: PropTypes.bool,
  height: PropTypes.number.isRequired,
  invert: PropTypes.bool,
  onKeyDown: PropTypes.func,
  rotate: PropTypes.number,
  scale: PropTypes.number,
  title: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string
  }),
  viewBox: PropTypes.string,
  width: PropTypes.number.isRequired,
  zoomControlFn: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  zooming: PropTypes.bool
}

export default SingleImageViewer

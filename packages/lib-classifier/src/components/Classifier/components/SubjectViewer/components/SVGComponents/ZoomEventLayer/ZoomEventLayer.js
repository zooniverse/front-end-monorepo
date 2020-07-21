import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const StyledRect = styled.rect`
  ${props => props.panning ?
   css`cursor: move;` :
   css`cursor: inherit;`}
  overscroll-behavior: none;

  &:focus {
    outline-color: #addde0;
    border-color: #addde0;
    box-shadow: 0 0 4px 4px #addde0;
  }
`

function ZoomEventLayer (props) {
  const {
    height,
    left = 0,
    onDoubleClick = () => {},
    onKeyDown = () => {},
    onMouseDown,
    onMouseEnter,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onWheel = () => {},
    panning = false,
    top = 0,
    width,
    ...rest
  } = props

  return (
    <StyledRect
      fill='transparent'
      height={height}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onWheel={onWheel}
      panning={(panning) ? 'true' : undefined}
      transform={`translate(${left}, ${top})`}
      width={width}
      {...rest}
    />
  )
}

ZoomEventLayer.propTypes = {
  height: PropTypes.number.isRequired,
  left: PropTypes.number,
  onDoubleClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onWheel: PropTypes.func,
  panning: PropTypes.bool,
  top: PropTypes.number,
  width: PropTypes.number.isRequired
}

export default ZoomEventLayer

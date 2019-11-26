import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledRect = styled.rect`
  cursor: ${props => props.panning ? 'move' : 'inherit'};
  overscroll-behavior: none;
`

function ZoomEventLayer(props) {
  const {
    onDoubleClick = () => {},
    onMouseDown,
    onMouseEnter,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onWheel = () => {},
    panning = false,
    parentHeight,
    parentWidth
  } = props

  return (
    <StyledRect
      height={parentHeight}
      fill='transparent'
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onWheel={onWheel}
      panning={(panning) ? 'true' : undefined}
      width={parentWidth}
    />
  )
}

ZoomEventLayer.propTypes = {
  onDoubleClick: PropTypes.func,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseMove: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onWheel: PropTypes.func,
  panning: PropTypes.bool,
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired
}

export default ZoomEventLayer
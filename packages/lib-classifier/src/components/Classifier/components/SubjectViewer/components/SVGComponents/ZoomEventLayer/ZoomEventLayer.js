import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledRect = styled.rect`
  cursor: ${props => props.panning ? 'move' : 'inherit'}
`

function ZoomEventLayer(props) {
  const {
    onDoubleClick,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onWheel,
    parentHeight,
    parentWidth,
    panning
  } = props

  return (
    <StyledRect
      height={parentHeight}
      fill='transparent'
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onWheel={onWheel}
      panning={(panning) ? 'true' : undefined}
      width={parentWidth}
    />
  )
}

export default ZoomEventLayer
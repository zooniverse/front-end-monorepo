import React from 'react'

function ZoomEventLayer(props) {
  const {
    onDoubleClick,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onWheel,
    parentHeight,
    parentWidth
  } = props

  return (
    <rect
      height={parentHeight}
      fill='transparent'
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onWheel={onWheel}
      width={parentWidth}
    />
  )
}

export default ZoomEventLayer
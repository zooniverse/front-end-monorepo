import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import DragHandle from '../../../components/DragHandle'

const StyledGroup = styled('g')`
  &:hover {
    cursor: pointer;
  }
`

const STROKE_WIDTH = 2
const GRAB_STROKE_WIDTH = 4

function FreehandLine({ active, mark, onFinish, scale }) {
  const { path, initialPoint, lastPoint, finished } = mark

  function onHandleDrag(coords) {
    mark.appendPath(coords)
  }

  return (
    <StyledGroup onPointerUp={active ? onFinish : undefined}>
      <path
        d={path}
        style={{
          strokeWidth: STROKE_WIDTH,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
          fill: 'none'
        }}
      />
      <path
        d={path}
        style={{
          strokeOpacity: '0',
          strokeWidth: GRAB_STROKE_WIDTH / scale
        }}
      />
      {active && (
        <DragHandle scale={scale} x={initialPoint.x} y={initialPoint.y} />
      )}
      {active && finished && (
        <DragHandle
          scale={scale}
          x={lastPoint.x}
          y={lastPoint.y}
          fill='transparent'
          invisibleWhenDragging={true}
          dragMove={(e) => onHandleDrag(e)}
        />
      )}
    </StyledGroup>
  )
}

FreehandLine.propTypes = {
  active: PropTypes.bool,
  mark: PropTypes.object.isRequired,
  onFinish: PropTypes.func,
  scale: PropTypes.number
}

FreehandLine.defaultProps = {
  active: false,
  onFinish: () => true,
  scale: 1
}

export default observer(FreehandLine)

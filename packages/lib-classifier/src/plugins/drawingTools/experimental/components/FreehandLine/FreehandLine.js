import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

const GRAB_STROKE_WIDTH = 6

function FreehandLine({ active, mark, onFinish, scale }) {
  const { path } = mark

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <path
        d={path}
        style={{
          stroke: 'black',
          strokeWidth: '2',
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
    </g>
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

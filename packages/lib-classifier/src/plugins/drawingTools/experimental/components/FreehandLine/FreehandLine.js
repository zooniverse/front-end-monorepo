import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

const GRAB_STROKE_WIDTH = 6

function FreehandLine({ active, mark, onFinish, scale }) {
  console.log('mark', mark)

  const { x, y } = mark

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <path
        d='M 0 1 L 1 2 L 2 3 L 9 9 L 15 15 L 27 22 L 30 24 L 37 26 L 44 28 L 47 28 L 53 28 L 56 28 L 58 28 L 62 28 L 64 28 L 68 28 L 73 29 L 74 30 L 81 34 L 86 37 L 87 39 L 87 40 L 87 41 L 84 44 L 79 47 L 68 51 L 58 54 L 52 55 L 44 58 L 43 58 L 42 60 L 41 62 L 41 64 L 40 66 L 40 68 L 40 69 L 40 71 L 41 73 L 42 74 L 42 76 L 43 77 L 43 77'
        style={{
          stroke: 'black',
          strokeWidth: '2',
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
          fill: 'none'
        }}
      />
      <path
        d='M 0 1 L 1 2 L 2 3 L 9 9 L 15 15 L 27 22 L 30 24 L 37 26 L 44 28 L 47 28 L 53 28 L 56 28 L 58 28 L 62 28 L 64 28 L 68 28 L 73 29 L 74 30 L 81 34 L 86 37 L 87 39 L 87 40 L 87 41 L 84 44 L 79 47 L 68 51 L 58 54 L 52 55 L 44 58 L 43 58 L 42 60 L 41 62 L 41 64 L 40 66 L 40 68 L 40 69 L 40 71 L 41 73 L 42 74 L 42 76 L 43 77 L 43 77'
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

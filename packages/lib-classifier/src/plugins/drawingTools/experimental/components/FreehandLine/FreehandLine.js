import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

function FreehandLine({ active, mark, onFinish, scale }) {
  console.log('mark', mark)

  const { d } = mark

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <path
        d='M 10,30 A 20,20 0,0,1 50,30'
        style={{
          stroke: 'black',
          strokeWidth: '2',
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
          fill: 'none'
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

import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const StyledGroup = styled('g')`
  &:hover {
    cursor: pointer;
  }
`

const STROKE_WIDTH = 2
const GRAB_STROKE_WIDTH = 6

function FreehandLine({ active, mark, onFinish, scale }) {
  const { path } = mark

  return (
    <StyledGroup onPointerUp={active ? onFinish : undefined}>
      <path
        d={path}
        style={{
          stroke: 'black',
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

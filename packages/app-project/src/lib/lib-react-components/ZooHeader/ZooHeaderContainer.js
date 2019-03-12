import PropTypes from 'prop-types'
import React from 'react'
import ReactResizeDetector from 'react-resize-detector'

import ZooHeader from './ZooHeader'

function ZooHeaderContainer (props) {
  const { breakpoint } = props
  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => {
        const isNarrow = (width) ? width <= breakpoint : false
        return (<ZooHeader isNarrow={isNarrow} {...props} />)
      }}
    </ReactResizeDetector>
  )
}

ZooHeaderContainer.defaultProps = {
  breakpoint: 960
}

ZooHeaderContainer.propTypes = {
  breakpoint: PropTypes.number
}

export default ZooHeaderContainer

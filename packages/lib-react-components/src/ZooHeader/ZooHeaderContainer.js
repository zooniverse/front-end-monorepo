import PropTypes from 'prop-types'
import React from 'react'
import ReactResizeDetector from 'react-resize-detector'

import ZooHeader from './ZooHeader'

export default function ZooHeaderContainer (props) {
  return (
    <ReactResizeDetector handleWidth>
      {width => (
        <ZooHeader isNarrow={width <= props.breakpoint} {...props} />
      )}
    </ReactResizeDetector>
  )
}

ZooHeaderContainer.defaultProps = {
  breakpoint: 960
}

ZooHeaderContainer.propTypes = {
  breakpoint: PropTypes.number
}

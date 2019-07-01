import PropTypes from 'prop-types'
import React from 'react'
import { withResizeDetector } from 'react-resize-detector'

import ZooHeader from './ZooHeader'

function ZooHeaderContainer (props) {
  const { breakpoint, className, height, width, ...rest } = props
  const isNarrow = width <= breakpoint
  return <ZooHeader className={className} isNarrow={isNarrow} {...rest} />
}

ZooHeaderContainer.defaultProps = {
  breakpoint: 960
}

ZooHeaderContainer.propTypes = {
  breakpoint: PropTypes.number
}

export default withResizeDetector(ZooHeaderContainer)
export { ZooHeaderContainer }

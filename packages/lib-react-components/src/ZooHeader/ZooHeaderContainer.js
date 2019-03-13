import PropTypes from 'prop-types'
import React from 'react'
import ResizeDetector from 'react-resize-detector'

import ZooHeader from './ZooHeader'

function ZooHeaderContainer (props) {
  const { breakpoint, ...componentProps } = props
  return (
    <ResizeDetector
      handleWidth
      render={({ width }) => (
        <ZooHeader
          isNarrow={width <= breakpoint}
          {...componentProps}
        />
      )}
    />
  )
}

ZooHeaderContainer.defaultProps = {
  breakpoint: 960
}

ZooHeaderContainer.propTypes = {
  breakpoint: PropTypes.number
}

export default ZooHeaderContainer

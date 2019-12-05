import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'

import InteractionLayer from '../InteractionLayer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const SingleImageViewer = forwardRef(function SingleImageViewer ({ children, height, scale, width }, ref) {
  const viewBox = `0 0 ${width} ${height}`
  return (
    <SVG
      ref={ref}
      viewBox={viewBox}
    >
      {children}
      <InteractionLayer
        scale={scale}
        height={height}
        svg={ref ? ref.current : null}
        width={width}
      />
    </SVG>
  )
})

SingleImageViewer.propTypes = {
  height: PropTypes.number.isRequired,
  scale: PropTypes.number,
  width: PropTypes.number.isRequired
}

SingleImageViewer.defaultProps = {
  scale: 1
}

export default SingleImageViewer

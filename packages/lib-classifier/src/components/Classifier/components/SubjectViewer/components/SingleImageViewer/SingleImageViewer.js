import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'

import InteractionLayer from '../InteractionLayer'

const Container = styled.div`
height: 100%;
overflow: hidden;
width: 100%;
`

const SingleImageViewer = forwardRef(function SingleImageViewer ({ children, height, rotate, scale, width }, ref) {
  const viewBox = `0 0 ${width} ${height}`
  const transform = `rotate(${rotate})`
  return (
    <Container>
      <svg
        ref={ref}
        transform={transform}
        viewBox={viewBox}
      >
        {children}
        <InteractionLayer
          scale={scale}
          height={height}
          width={width}
        />
      </svg>
    </Container>
  )
})

SingleImageViewer.propTypes = {
  height: PropTypes.number.isRequired,
  rotate: PropTypes.number,
  scale: PropTypes.number,
  width: PropTypes.number.isRequired
}

SingleImageViewer.defaultProps = {
  rotate: 0,
  scale: 1
}

export default SingleImageViewer

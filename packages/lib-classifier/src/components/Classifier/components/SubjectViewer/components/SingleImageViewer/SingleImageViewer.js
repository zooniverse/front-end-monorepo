import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'

import InteractionLayer from '../InteractionLayer'

const Container = styled.div`
  animation: fadein 1s 0s forwards;
  height: 100%;
  overflow: hidden;
  width: 100%;

  @keyframes fadein {
    from {
      opacity: 0;
    }

    to {
      opacity: 100%;
    }
  }
`

const SingleImageViewer = forwardRef(function SingleImageViewer ({ children, height, onKeyDown, rotate, scale, viewBox, width }, ref) {
  const transform = `rotate(${rotate} 0 0)`
  return (
    <Container>
      <svg
        ref={ref}
        focusable
        onKeyDown={onKeyDown}
        tabIndex={0}
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
  onKeyDown: PropTypes.func,
  rotate: PropTypes.number,
  scale: PropTypes.number,
  viewBox: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
}

SingleImageViewer.defaultProps = {
  onKeyDown: () => true,
  rotate: 0,
  scale: 1
}

export default SingleImageViewer

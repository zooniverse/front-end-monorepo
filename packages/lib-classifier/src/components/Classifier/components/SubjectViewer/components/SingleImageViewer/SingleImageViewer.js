import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'

import InteractionLayer from '../InteractionLayer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const SingleImageViewer = forwardRef(function SingleImageViewer ({ height, url, width }, ref) {
  const viewBox = `0 0 ${width} ${height}`
  return (
    <SVG
      ref={ref}
      viewBox={viewBox}
    >
      <image
        height='100%'
        width='100%'
        xlinkHref={url}
      />
      <InteractionLayer
        height={height}
        svg={ref ? ref.current : null}
        width={width}
      />
    </SVG>
  )
})

SingleImageViewer.propTypes = {
  height: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
}

export default SingleImageViewer

import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import InteractionLayer from '../InteractionLayer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const SingleImageViewer = React.forwardRef(function SingleImageViewer ({ url }, ref) {
  return (
    <SVG ref={ref}>
      <image
        height='100%'
        width='100%'
        xlinkHref={url}
      />
      <InteractionLayer />
    </SVG>
  )
})

SingleImageViewer.propTypes = {
  url: PropTypes.string.isRequired
}

export default SingleImageViewer

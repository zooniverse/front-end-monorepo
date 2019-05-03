import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import InteractionLayer from '../InteractionLayer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

function SingleImageViewer ({ onError, onLoad, url }) {
  return (
    <SVG>
      <image
        height='100%'
        width='100%'
        xlinkHref={url}
        onError={onError}
        onLoad={onLoad}
      />
      <InteractionLayer />
    </SVG>
  )
}

SingleImageViewer.defaultProps = {
  onError: () => true,
  onLoad: () => true
}

SingleImageViewer.propTypes = {
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  url: PropTypes.string.isRequired
}

export default SingleImageViewer

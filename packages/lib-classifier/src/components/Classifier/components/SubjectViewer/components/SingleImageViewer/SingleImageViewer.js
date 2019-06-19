import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import InteractionLayer from '../InteractionLayer'
import MarkingsInitializer from '../Drawing/markings-initializer'
import MarkingsRenderer from '../Drawing/markings-renderer'

const SVG = styled.svg`
  height: 100%;
  width: 100%;
`

const SingleImageViewer = React.forwardRef(function SingleImageViewer ({ onError, onLoad, url }, ref) {
  return (
    <SVG ref={ref}>
      <image
        height='100%'
        width='100%'
        xlinkHref={url}
        onError={onError}
        onLoad={onLoad}
      />
      <InteractionLayer />
      <MarkingsInitializer />
      <MarkingsRenderer />
    </SVG>
  )
})

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

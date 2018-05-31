import React from 'react'
import PropTypes from 'prop-types'

function ImageViewer ({ url }) {
  if (!url) {
    return null
  }

  return (
    <image
      xlinkHref={url}
    />
  )
}

ImageViewer.propTypes = {
  url: PropTypes.string
}

export default ImageViewer

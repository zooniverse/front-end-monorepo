import React from 'react'
import PropTypes from 'prop-types'

function RasterViewer ({ url }) {
  if (!url) {
    return null
  }

  return (
    <img
      src={this.props.url}
    />
  )
}

RasterViewer.propTypes = {
  url: PropTypes.string
}

export default RasterViewer

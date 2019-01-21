import React from 'react'
import PropTypes from 'prop-types'
import { Box, Video as GrommetVideo } from 'grommet'

export default function Video({ alt, controls, fit, src }) {
  const controlsOption = (controls) ? 'below' : false
  return (
    <Box>
      <GrommetVideo a11yTitle={alt} controls={controlsOption} fit={fit} preload='metadata' src={src} />
    </Box>
  )
}

Video.propTypes = {
  alt: PropTypes.string,
  controls: PropTypes.bool,
  fit: PropTypes.oneOf(['contain', 'cover']),
  src: PropTypes.string.isRequired,
}

Video.defaultProps = {
  alt: '',
  controls: true,
  fit: 'cover',
}
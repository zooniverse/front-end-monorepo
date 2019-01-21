import React from 'react'
import PropTypes from 'prop-types'
import mime from 'mime-types'
import Audio from './components/Audio'
import ThumbnailImage from './components/ThumbnailImage'
import Video from './components/Video'

const DEFAULT_THUMBNAIL_DIMENSION = 999

export default function Media(props) {
  const mimeType = mime.lookup(props.src)

  if (mimeType && mimeType.includes('image')) {
    return (
      <ThumbnailImage {...props} />
    )
  }

  if (mimeType && mimeType.includes('video')) {
    return (
      <Video {...props} />
    )
  }

  if (mimeType && mimeType.includes('audio')) {
    return (
      <Audio {...props} />
    )
  }

  return null
}

Media.propTypes = {
  alt: PropTypes.string,
  controls: PropTypes.bool,
  delay: PropTypes.number,
  fit: PropTypes.oneOf(['contain', 'cover']),
  height: PropTypes.number,
  origin: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  src: PropTypes.string.isRequired,
  width: PropTypes.number
}

Media.defaultProps = {
  alt: '',
  controls: true,
  delay: 0,
  fit: 'cover',
  height: DEFAULT_THUMBNAIL_DIMENSION,
  origin: 'https://thumbnails.zooniverse.org',
  placeholder: null,
  width: DEFAULT_THUMBNAIL_DIMENSION
}
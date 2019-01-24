import PropTypes from 'prop-types'

const DEFAULT_THUMBNAIL_DIMENSION = 999

export const propTypes = {
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

export const defaultProps = {
  alt: '',
  controls: true,
  delay: 0,
  fit: 'cover',
  height: DEFAULT_THUMBNAIL_DIMENSION,
  origin: 'https://thumbnails.zooniverse.org',
  placeholder: null,
  width: DEFAULT_THUMBNAIL_DIMENSION
}
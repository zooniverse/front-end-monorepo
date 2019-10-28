import PropTypes from 'prop-types'

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
  flex: 'grow',
  origin: 'https://thumbnails.zooniverse.org',
  placeholder: null
}
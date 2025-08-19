import { bool, number, object, oneOfType, string } from 'prop-types'

export const propTypes = {
  alt: string,
  controls: bool,
  delay: number,
  fit: oneOf(['contain', 'cover']),
  height: number,
  origin: string,
  placeholder: oneOfType([node, object]),
  src: string.isRequired,
  width: number
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

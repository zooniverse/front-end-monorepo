import { bool, node, number, object, oneOf, oneOfType, string } from 'prop-types'

export const propTypes = {
  alt: string,
  controls: bool,
  delay: number,
  fit: oneOf(['contain', 'cover']),
  height: number,
  origin: string,
  placeholder: oneOfType([node, object]),
  showAxes: bool,
  showLegend: bool,
  showPoster: bool,
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
  showAxes: false,
  showLegend: false,
  showPoster: false,
  placeholder: null
}

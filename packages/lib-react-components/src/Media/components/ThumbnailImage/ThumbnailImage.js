import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Image } from 'grommet'
import ProgressiveImage from 'react-progressive-image'
import zooTheme from '@zooniverse/grommet-theme'
import getThumbnailSrc from '../../helpers/getThumbnailSrc'
import pxToRem from '../../../helpers/pxToRem'

const DEFAULT_THUMBNAIL_DIMENSION = 999

const StyledBox = styled(Box)`
  max-height: ${props => props.maxHeight};
  max-width: ${props => props.maxWidth};
`

const StyledImage = styled(Image)`
  height: 100%;
  object-position: 50% 0%;
  width: 100%;
`

export function Placeholder(props) {
  return (
    <Box background={zooTheme.global.colors.brand} justify='center' align='center' {...props}>
      {props.children}
    </Box>
  )
}

export default class ThumbnailImage extends React.Component {
  constructor() {
    super()

    this.state = {
      failed: false
    }
  }

  handleError() {
    this.setState((prevState) => { if (!prevState.failed) return { failed: true } })
  }

  render() {
    const { alt, delay, fit, height, origin, placeholder, src, width } = this.props
    const heightInRem = pxToRem(height)
    const widthInRem = pxToRem(width)
    const thumbnailSrc = this.state.failed ? src : getThumbnailSrc({ height, origin, src, width })
    const fallbackStyle = {
      maxHeight: heightInRem,
      maxWidth: widthInRem
    }

    return (
      <ProgressiveImage
        onError={this.handleError.bind(this)}
        delay={delay}
        src={thumbnailSrc}
        placeholder=''
      >
        {(returnedSrc, loading) => (
          <>
            {loading ?
              <Placeholder height={heightInRem} width={widthInRem}>{placeholder}</Placeholder> :
              <StyledBox animation={loading ? undefined : "fadeIn"} maxWidth={widthInRem} maxHeight={heightInRem}>
                <StyledImage
                  alt={alt}
                  fit={fit}
                  src={returnedSrc}
                />
              </StyledBox>}
            <noscript>
              <div style={fallbackStyle}>
                <img src={returnedSrc} alt={alt} height='100%' width='100%' style={{ objectFit: fit }} />
              </div>
            </noscript>
          </>
        )}
      </ProgressiveImage>
    )
  }
}

ThumbnailImage.propTypes = {
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

ThumbnailImage.defaultProps = {
  alt: '',
  controls: true,
  delay: 0,
  fit: 'cover',
  height: DEFAULT_THUMBNAIL_DIMENSION,
  origin: 'https://thumbnails.zooniverse.org',
  placeholder: null,
  width: DEFAULT_THUMBNAIL_DIMENSION
}
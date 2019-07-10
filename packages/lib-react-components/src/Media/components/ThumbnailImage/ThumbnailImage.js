import React from 'react'
import styled from 'styled-components'
import { Box, Image } from 'grommet'
import ProgressiveImage from 'react-progressive-image'
import getThumbnailSrc from '../../helpers/getThumbnailSrc'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'

const StyledBox = styled(Box)`
  max-height: ${props => props.maxHeight}px;
  max-width: ${props => props.maxWidth}px;
`

const StyledImage = styled(Image)`
  height: 100%;
  object-position: 50% 0%;
  width: 100%;
`

export function Placeholder(props) {
  return (
    <Box background='brand' flex={props.flex} justify='center' align='center' {...props}>
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

  stringifySize (size) {
    return (typeof size === 'number') ? `${size}px` : size
  }

  render() {
    const {
      alt,
      delay,
      fit,
      flex,
      height,
      origin,
      placeholder,
      src,
      width,
      ...rest
    } = this.props
    const thumbnailSrc = this.state.failed ? src : getThumbnailSrc({ height, origin, src, width })
    const stringHeight = this.stringifySize(height)
    const stringWidth = this.stringifySize(width)
    const fallbackStyle = {
      maxHeight: this.stringifySize(height),
      maxWidth: this.stringifySize(width)
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
              <Placeholder height={stringHeight} flex={flex} width={stringWidth} {...rest}>{placeholder}</Placeholder> :
              <StyledBox
                animation={loading ? undefined : "fadeIn"}
                flex={flex}
                height='100%'
                maxWidth={width}
                maxHeight={height}
                width='100%'
                {...rest}
              >
                <StyledImage
                  alt={alt}
                  fit={fit}
                  src={returnedSrc}
                />
              </StyledBox>}
            <noscript>
              <div style={fallbackStyle}>
                <img src={returnedSrc} alt={alt} height='100%' width='100%' style={{ flex, objectFit: fit }} />
              </div>
            </noscript>
          </>
        )}
      </ProgressiveImage>
    )
  }
}

ThumbnailImage.propTypes = {
  ...propTypes
}

ThumbnailImage.defaultProps = {
  ...defaultProps
}
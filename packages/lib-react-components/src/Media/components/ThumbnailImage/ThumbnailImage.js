import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Box, Image } from 'grommet'
import ProgressiveImage from 'react-progressive-image'
import getThumbnailSrc from '../../helpers/getThumbnailSrc'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'

const DEFAULT_THUMBNAIL_DIMENSION = 999

const StyledBox = styled(Box)`
  ${props => props.maxHeight && css`max-height: ${props.maxHeight};`}
  ${props => props.maxWidth && css`max-width: ${props.maxWidth};`}
`

const StyledImage = styled(Image)`
  height: 100%;
  object-position: 50% 0%;
  width: 100%;
`

export function Placeholder({ children, flex, ...props}) {
  return (
    <Box background='brand' flex={flex} justify='center' align='center' {...props}>
      {children}
    </Box>
  )
}

function stringifySize (size) {
  return (typeof size === 'number') ? `${size}px` : size
}

export default function ThumbnailImage({
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
}) {
  const [failed, setFailed] = useState(false)

  function handleError() {
    setFailed(true)
  }

  const thumbnailSrc = failed ? src : getThumbnailSrc({ height, origin, src, width })
  const stringHeight = stringifySize(height)
  const stringWidth = stringifySize(width)
  const fallbackStyle = {
    maxHeight: stringHeight,
    maxWidth: stringWidth
  }

  return (
    <ProgressiveImage
      onError={handleError}
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
              className="thumbnailImage"
              flex={flex}
              maxWidth={stringWidth}
              maxHeight={stringHeight}
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

ThumbnailImage.propTypes = {
  ...propTypes
}

ThumbnailImage.defaultProps = {
  ...defaultProps,
  height: DEFAULT_THUMBNAIL_DIMENSION,
  width: DEFAULT_THUMBNAIL_DIMENSION
}
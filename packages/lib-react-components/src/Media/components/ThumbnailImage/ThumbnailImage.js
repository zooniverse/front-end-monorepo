import { Box, Image } from 'grommet'
import styled from 'styled-components'

import getThumbnailSrc from '../../helpers/getThumbnailSrc.js'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes.js'
import useProgressiveImage from '../../../hooks/useProgressiveImage.js'

const InlineBox = styled.span`
  display: inline-flex;
`

export function Placeholder({ children, flex, ...props}) {
  return (
    <Box as={InlineBox} background='brand' flex={flex} justify='center' align='center' {...props}>
      {children}
    </Box>
  )
}

export default function ThumbnailImage({
  alt = defaultProps.alt,
  delay = defaultProps.delay,
  fit = defaultProps.fit,
  flex = defaultProps.flex,
  height,
  origin = defaultProps.origin,
  placeholder = defaultProps.placeholder,
  src,
  width,
  ...rest
}) {
  const thumbnailSrc = getThumbnailSrc({ height, origin, src, width })
  const { error, loading } = useProgressiveImage({ delay, src: thumbnailSrc })

  const imageSrc = error ? src : thumbnailSrc
  const cssHeight = height > 0 ? `${height}px` : height
  const cssWidth = width > 0 ? `${width}px` : width
  const fallbackStyle = {
    display: 'inline-block',
    maxHeight: cssHeight,
    maxWidth: cssWidth
  }
  const boxHeight = {
    max: cssHeight
  }
  const boxWidth = {
    max: cssWidth
  }

  return (
    <>
      {loading ?
        <Placeholder height={cssHeight} flex={flex} width={cssWidth} {...rest}>{placeholder}</Placeholder> :
        <Box
          animation={loading ? undefined : 'fadeIn'}
          as={InlineBox}
          className='thumbnailImage'
          flex={flex}
          height={boxHeight}
          width={boxWidth}
          {...rest}
        >
          <Image
            alt={alt}
            fit={fit}
            src={imageSrc}
          />
        </Box>}
      <noscript>
        <span style={fallbackStyle}>
          <img src={imageSrc} alt={alt} height='100%' width='100%' style={{ flex, objectFit: fit }} />
        </span>
      </noscript>
    </>
  )
}

ThumbnailImage.propTypes = {
  ...propTypes
}

import { Box, Image } from 'grommet'
import getThumbnailSrc from '../../helpers/getThumbnailSrc.js'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes.js'
import useProgressiveImage from '../../../hooks/useProgressiveImage.js'

const DEFAULT_THUMBNAIL_DIMENSION = ''

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
  alt = defaultProps.alt,
  delay = defaultProps.delay,
  fit = defaultProps.fit,
  flex = defaultProps.flex,
  height = DEFAULT_THUMBNAIL_DIMENSION,
  origin = defaultProps.origin,
  placeholder = defaultProps.placeholder,
  src,
  width = DEFAULT_THUMBNAIL_DIMENSION,
  ...rest
}) {
  const thumbnailSrc = getThumbnailSrc({ height, origin, src, width })
  const { error, loading } = useProgressiveImage({ delay, src: thumbnailSrc })

  const imageSrc = error ? src : thumbnailSrc
  const stringHeight = stringifySize(height)
  const stringWidth = stringifySize(width)
  const fallbackStyle = {
    maxHeight: stringHeight,
    maxWidth: stringWidth
  }
  const boxHeight = {
    max: stringHeight
  }
  const boxWidth = {
    max: stringWidth
  }

  return (
    <>
      {loading ?
        <Placeholder height={stringHeight} flex={flex} width={stringWidth} {...rest}>{placeholder}</Placeholder> :
        <Box
          animation={loading ? undefined : 'fadeIn'}
          className='thumbnailImage'
          flex={flex}
          height={boxHeight}
          width={boxWidth}
          {...rest}
        >
          <Image
            alt={alt}
            fit={fit}
            fill
            src={imageSrc}
          />
        </Box>}
      <noscript>
        <div style={fallbackStyle}>
          <img src={imageSrc} alt={alt} height='100%' width='100%' style={{ flex, objectFit: fit }} />
        </div>
      </noscript>
    </>
  )
}

ThumbnailImage.propTypes = {
  ...propTypes
}

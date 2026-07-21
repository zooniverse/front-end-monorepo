import { Box, Video as GrommetVideo } from 'grommet'
import styled, { css } from 'styled-components'
import getThumbnailSrc from '../../helpers/getThumbnailSrc.js'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'

const StyledBox = styled(Box)`
  ${props => props.maxHeight && css`max-height: ${props.maxHeight}px;`}
  ${props => props.maxWidth && css`max-width: ${props.maxWidth}px;`}
`

const THUMBNAILER_SUPPORTED_HOSTS = [
  'panoptes-uploads-staging.zooniverse.org',
  'panoptes-uploads.zooniverse.org'
]

function canGeneratePosterFromSrc(src) {
  if (!src) return false

  try {
    const parsedUrl = new URL(src)
    return THUMBNAILER_SUPPORTED_HOSTS.includes(parsedUrl.hostname)
  } catch {
    return false
  }
}

export default function Video({
  alt = defaultProps.alt,
  controls = defaultProps.controls,
  fit = defaultProps.fit,
  flex = defaultProps.flex,
  height,
  origin = defaultProps.origin,
  showPoster = defaultProps.poster,
  src = defaultProps.src,
  width,
  ...rest
}) {
  const controlsOption = (controls) ? 'below' : false
  const shouldShowPoster = showPoster && canGeneratePosterFromSrc(src)

  let posterSrc = null
  if (shouldShowPoster) {
    const posterWidth = width > 0 ? width : 999
    const posterHeight = height > 0 ? height : posterWidth
    posterSrc = getThumbnailSrc({ height: posterHeight, origin, src, width: posterWidth })
  }

  const cssHeight = height > 0 ? `${height}px` : height
  const cssWidth = width > 0 ? `${width}px` : width
  const boxHeight = {
    max: cssHeight
  }
  const boxWidth = {
    max: cssWidth
  }

  return (
    <StyledBox
      {...rest}
      data-testid='video-viewer'
      flex={flex}
      height={boxHeight}
      width={boxWidth}
    >
      <GrommetVideo
        a11yTitle={alt}
        controls={controlsOption}
        fit={fit}
        poster={posterSrc}
        preload={shouldShowPoster ? 'none' : 'metadata'}
        src={src}
      />
    </StyledBox>
  )
}

Video.propTypes = {
  ...propTypes
}

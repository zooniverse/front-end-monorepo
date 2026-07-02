import { Box, Video as GrommetVideo } from 'grommet'
import styled, { css } from 'styled-components'
import getThumbnailSrc from '../../helpers/getThumbnailSrc.js'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'

const StyledBox = styled(Box)`
  ${props => props.maxHeight && css`max-height: ${props.maxHeight}px;`}
  ${props => props.maxWidth && css`max-width: ${props.maxWidth}px;`}
`

export default function Video({
  alt = defaultProps.alt,
  controls = defaultProps.controls,
  fit = defaultProps.fit,
  flex = defaultProps.flex,
  height,
  origin = defaultProps.origin,
  src = defaultProps.src,
  width,
  ...rest
}) {
  const controlsOption = (controls) ? 'below' : false
  const poster = getThumbnailSrc({ height, origin, src, width })

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
        poster={poster}
        preload={poster ? 'none' : 'metadata'}
        src={src}
      />
    </StyledBox>
  )
}

Video.propTypes = {
  ...propTypes
}

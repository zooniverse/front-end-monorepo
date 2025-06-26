import { Box, Video as GrommetVideo } from 'grommet'
import styled, { css } from 'styled-components'
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
  src = defaultProps.src,
  width,
  ...rest
}) {
  const controlsOption = (controls) ? 'below' : false

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
      flex={flex}
      height={boxHeight}
      width={boxWidth}
    >
      <GrommetVideo a11yTitle={alt} controls={controlsOption} fit={fit} preload='metadata' src={src} />
    </StyledBox>
  )
}

Video.propTypes = {
  ...propTypes
}

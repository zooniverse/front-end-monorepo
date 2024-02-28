import { Anchor, Box, Video as GrommetVideo } from 'grommet'
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
  height = defaultProps.height,
  src = defaultProps.src,
  width = defaultProps.width,
  ...rest
}) {
  const controlsOption = (controls) ? 'below' : false

  return (
    <StyledBox
      {...rest}
      flex={flex}
      height='100%'
      maxWidth={width}
      maxHeight={height}
      width='100%'
    >
      <GrommetVideo a11yTitle={alt} controls={controlsOption} fit={fit} preload='metadata' src={src} />
    </StyledBox>
  )
}

Video.propTypes = {
  ...propTypes
}

import { Anchor, Box } from 'grommet'
import styled, { css } from 'styled-components'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'

const StyledBox = styled(Box)`
  ${props => props.maxHeight && css`max-height: ${props.maxHeight}px;`}
  ${props => props.maxWidth && css`max-width: ${props.maxWidth}px;`}
`

export default function Audio({
  alt = defaultProps.alt,
  controls = defaultProps.controls,
  flex = defaultProps.flex,
  height = defaultProps.height,
  src = defaultProps.src,
  width = defaultProps.width,
  ...rest
}) {
  return (
    <StyledBox
      {...rest}
      flex={flex}
      height='100%'
      maxWidth={width}
      maxHeight={height}
      width='100%'
    >
      <audio aria-label={alt} controls={controls} preload='metadata'>
        <source src={src} />
        <Anchor href={src} label={alt} />
      </audio>
    </StyledBox>
  )
}

Audio.propTypes = {
  ...propTypes
}


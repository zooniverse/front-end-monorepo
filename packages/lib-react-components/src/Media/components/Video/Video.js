import React from 'react'
import { Anchor, Box, Video as GrommetVideo } from 'grommet'
import styled, { css } from 'styled-components'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes.js'

const StyledBox = styled(Box)`
  ${props => props.maxHeight && css`max-height: ${props.maxHeight}px;`}
  ${props => props.maxWidth && css`max-width: ${props.maxWidth}px;`}
`
  
export default function Video(props) {
  const { alt, controls, flex, fit, height, src, width, ...rest } = props
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
      <GrommetVideo a11yTitle={alt} controls={controlsOption} fit={fit} preload='metadata' src={src}>
        <Anchor href={src} label={alt} />
      </GrommetVideo>
    </StyledBox>
  )
}

Video.propTypes = {
  ...propTypes
}

Video.defaultProps = {
  ...defaultProps
}

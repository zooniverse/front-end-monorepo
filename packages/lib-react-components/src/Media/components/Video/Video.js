import React from 'react'
import { Anchor, Box, Video as GrommetVideo } from 'grommet'
import styled from 'styled-components'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'

const StyledBox = styled(Box)`
  max-height: ${props => props.maxHeight}px;
  max-width: ${props => props.maxWidth}px;
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

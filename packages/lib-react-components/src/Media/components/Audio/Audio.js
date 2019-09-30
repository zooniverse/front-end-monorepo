import React from 'react'
import { Anchor, Box } from 'grommet'
import styled from 'styled-components'
import { propTypes, defaultProps } from '../../helpers/mediaPropTypes'

const StyledBox = styled(Box)`
  max-height: ${props => props.maxHeight}px;
  max-width: ${props => props.maxWidth}px;
`

export default function Audio(props) {
  const { alt, controls, flex, height, src, width, ...rest } = props
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

Audio.defaultProps = {
  ...defaultProps
}

Audio.propTypes = {
  ...propTypes
}


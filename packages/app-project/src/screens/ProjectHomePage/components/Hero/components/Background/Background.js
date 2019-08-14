import { withResponsiveContext } from '@zooniverse/react-components'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Img = styled.img`
  height: 100%;
  min-height: 61.8vh;
  object-fit: cover;
  object-position: 0 50%;
  width: 100%;

  ${props => props.screenSize === 'small' && `
    height: auto;
    min-height: inherit;
    object-fit: contain;
    width: 100%;
  `}
`

function Background (props) {
  const { className, backgroundSrc, screenSize } = props
  return (
    <Img
      className={className}
      src={backgroundSrc}
      screenSize={screenSize}
    />
  )
}

Background.propTypes = {
  backgroundSrc: string
}

export default withResponsiveContext(Background)
export {
  Background
}

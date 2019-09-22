import { number, shape, string } from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

const Img = styled.img`
    height: 230px;
    min-height: inherit;
    object-fit: cover;
    width: 100%;

  @media (min-width: ${props => props.breakpoint}px) {
    height: 100%;
    object-fit: cover;
    object-position: 0 50%;
    width: 100%;
  }
`

function Background (props) {
  const { backgroundSrc, theme } = props
  const breakpoint = theme.global.breakpoints.small.value
  return (
    <Img
      alt=''
      breakpoint={breakpoint}
      src={backgroundSrc}
    />
  )
}

Background.propTypes = {
  backgroundSrc: string.isRequired,
  theme: shape({
    global: shape({
      breakpoints: shape({
        small: shape({
          value: number.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default withTheme(Background)
export {
  Background
}

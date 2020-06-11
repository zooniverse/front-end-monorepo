import { Box } from 'grommet'
import { bool, object, oneOf, shape, string } from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'

const SVG = styled.svg`
  display: block;
  ${props => {
    const rotation = {
      up: '0deg',
      down: '180deg',
      left: '-90deg',
      right: '90deg'
    }
    return css`
      fill: ${props.fill};
      height: ${props.height}px;
      transform: rotate(${rotation[props.pointDirection]});
      width: ${props.height}px;
    `
  }}
  z-index: 1;
`

function Triangle (props) {
  let fill
  const {
    color,
    height,
    justify,
    pad,
    pointDirection,
    theme,
    width
  } = props
  const { colors } = theme.global
  if (color) {
    fill = color
  } else {
    fill = (theme.dark) ? colors['neutral-6'] : colors['dark-2']
  }

  return (
    <Box
      aria-hidden='true'
      direction='row'
      justify={justify}
      pad={pad}
    >
      <SVG
        fill={fill}
        height={height}
        pointDirection={pointDirection}
        viewBox='0 0 10 10'
        width={width}
      >
        <polygon points='5,0 10,10 0,10' />
      </SVG>
    </Box>
  )
}

Triangle.defaultProps = {
  pad: { horizontal: 'small' },
  pointDirection: 'up',
  justify: 'center',
  height: 20,
  width: 20
}

Triangle.propTypes = {
  pad: oneOf([object, string]),
  pointDirection: oneOf(['down', 'left', 'right', 'up']),
  justify: oneOf(['start', 'center', 'end']),
  theme: shape({
    global: shape({
      colors: shape({
        'dark-2': string,
        'neutral-6': string
      })
    }),
    dark: bool
  })
}

export default withTheme(Triangle)

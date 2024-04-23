import { Box } from 'grommet'
import { bool, number, object, oneOf, oneOfType, shape, string } from 'prop-types'
import styled, { css, withTheme } from 'styled-components'

export const SVG = styled.svg`
  display: block;
  ${props => {
    return css`
      fill: ${props.fill};
      height: ${props.height}px;
      transform: rotate(${props.rotation});
      width: ${props.height}px;
    `
  }}
  z-index: 1;
`

const defaultPad = { horizontal: 'small' }

function Triangle({
  color = '',
  justify = 'center',
  pad = defaultPad,
  pointDirection = 'up',
  theme,
  width = 20
}) {
  let fill
  const { colors } = theme.global
  if (color) {
    fill = color
  } else {
    fill = theme.dark ? colors['neutral-6'] : colors['dark-2']
  }

  const rotation = {
    up: '0deg',
    down: '180deg',
    left: '-90deg',
    right: '90deg'
  }

  return (
    <Box aria-hidden='true' direction='row' justify={justify} pad={pad}>
      <SVG
        fill={fill}
        rotation={rotation[pointDirection]}
        viewBox='0 0 10 10'
        width={width}
      >
        <polygon points='5,0 10,10 0,10' />
      </SVG>
    </Box>
  )
}

Triangle.propTypes = {
  color: oneOfType([object, string]),
  justify: oneOf(['start', 'center', 'end']),
  pad: oneOfType([object, string]),
  pointDirection: oneOf(['down', 'left', 'right', 'up']),
  theme: shape({
    global: shape({
      colors: shape({
        'dark-2': string,
        'neutral-6': string
      })
    }),
    dark: bool
  }),
  width: number
}

export default withTheme(Triangle)

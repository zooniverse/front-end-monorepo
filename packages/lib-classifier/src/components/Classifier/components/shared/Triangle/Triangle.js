import { Box } from 'grommet'
import { object, oneOf, oneOfType, shape, string } from 'prop-types'
import styled, { css, withTheme } from 'styled-components'

const SVG = styled.svg`
  display: block;
  ${props => css`
    fill: ${props.fill};
    height: ${props.height}px;
    width: ${props.height}px;
  `}
  z-index: 1;
`

function Triangle (props) {
  let fill
  const {
    backgroundColor,
    height,
    justify,
    pad,
    pointDirection,
    theme,
    width
  } = props
  const { colors } = theme.global
  if (backgroundColor) {
    fill = backgroundColor
  } else {
    fill = (theme.mode === 'light') ? colors.white : colors['dark-2']
  }

  const points = {
    down: '0,0 10,0 5,10',
    left: '10,0 10,10 0,5',
    right: '0,0 0,10 10,5',
    up: '5,0 10,10 0,10',
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
        viewBox='0 0 10 10'
        width={width}
      >
        <polygon points={points[pointDirection]} />
      </SVG>
    </Box>
  )
}

Triangle.defaultProps = {
  pad: { horizontal: 'small' },
  pointDirection: 'up',
  justify: 'end',
  height: 20,
  width: 20
}

Triangle.propTypes = {
  pad: oneOfType([object, string]),
  pointDirection: oneOf(['down', 'left', 'right', 'up']),
  justify: oneOf(['start', 'center', 'end']),
  theme: shape({
    global: shape({
      colors: shape({
        'dark-2': string,
        white: string
      })
    }),
    mode: oneOf(['dark', 'light'])
  })
}

export default withTheme(Triangle)

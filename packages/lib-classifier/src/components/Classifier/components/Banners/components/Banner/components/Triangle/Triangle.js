import { Box } from 'grommet'
import { oneOf, shape, string } from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

const SVG = styled.svg`
  display: block;
  fill: ${props => props.fill};
  height: 20px;
  width: 20px;
  z-index: 1;
`

function Triangle (props) {
  const { theme } = props
  const { colors } = theme.global
  const fill = (theme.mode === 'light') ? colors.white : colors['dark-2']

  return (
    <Box
      aria-hidden='true'
      direction='row'
      justify='end'
      pad={{ horizontal: 'small' }}
    >
      <SVG viewBox='0 0 10 10' fill={fill}>
        <polygon points='5,0 10,10 0,10' />
      </SVG>
    </Box>
  )
}

Triangle.propTypes = {
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

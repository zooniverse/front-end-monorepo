import { Box } from 'grommet'
import React from 'react'
import styled from 'styled-components'

// Width is derived from the golden ratio 👑
const SVG = styled.svg`
  width: 38%;
`

function Placeholder () {
  return (
    <Box background='#007482' fill justify='center' align='center'>
      <SVG preserveAspectRatio='xMidYMid meet' role='img' viewBox='0 0 100 100' >
        <g fill='currentColor' stroke='none' transform='translate(50, 50)'>
          <path d='M 0 -45 A 45 45 0 0 1 0 45 A 45 45 0 0 1 0 -45 Z M 0 -30 A 30 30 0 0 0 0 30 A 30 30 0 0 0 0 -30 Z' /><path d='M 0 -14 A 14 14 0 0 1 0 14 A 14 14 0 0 1 0 -14 Z' />
          <ellipse cx='0' cy='0' rx='6' ry='65' transform='rotate(50)' />
        </g>
      </SVG>
    </Box>
  )
}

export default Placeholder

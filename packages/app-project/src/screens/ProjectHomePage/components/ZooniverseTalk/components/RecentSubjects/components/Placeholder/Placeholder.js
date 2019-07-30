import { Box, Grid } from 'grommet'
import React from 'react'
import { WaveLoading } from 'styled-spinkit'
import { withTheme } from 'styled-components'

function Placeholder (props) {
  const { theme } = props
  const spinnerColour = theme.dark
    ? theme.global.colors['light-5']
    : theme.global.colors['light-4']

  return (
    <Grid
      columns={['1fr', '1fr', '1fr']}
      fill
      gap='small'
      {...props}
    >
      {[null, null, null].map((element, index) => (
        <Box
          align='center'
          background={{
            dark: 'dark-4',
            light: 'light-2'
          }}
          children={<WaveLoading color={spinnerColour} />}
          elevation='small'
          fill
          key={`placeholder-${index}`}
          justify='center'
        />
      ))}
    </Grid>
  )
}

Placeholder.defaultProps = {
  theme: {
    global: {
      colors: {
      }
    }
  }
}

export default withTheme(Placeholder)
export { Placeholder }

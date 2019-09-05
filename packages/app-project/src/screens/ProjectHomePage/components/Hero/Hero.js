import { withResponsiveContext } from '@zooniverse/react-components'
import { Box, Grid } from 'grommet'
import React from 'react'
import styled from 'styled-components'

import Background from './components/Background'
import Introduction from './components/Introduction'
import WorkflowSelector from './components/WorkflowSelector'
import ContentBox from '../../../../shared/components/ContentBox'

const StyledContentBox = styled(ContentBox)`
  ${props => (props.screenSize !== 'small') && `
    border-color: transparent;
    max-height: 763px;
  `}
`

function Hero (props) {
  const { screenSize, workflows } = props

  // Default to `small` layout
  let component = (
    <Box
      align='stretch'
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      direction='column'
      justify='between'
    >
      <Background />
      <Grid margin={{ top: 'medium-neg', horizontal: 'medium' }}>
        <StyledContentBox gap='medium' screenSize={screenSize}>
          <Introduction />
          <WorkflowSelector workflows={workflows} />
        </StyledContentBox>
      </Grid>
    </Box>
  )

  if (screenSize !== 'small') {
    component = (
      <Grid columns={['1.618fr', '1fr']} margin={{ bottom: 'medium' }}>
        <Background />
        <StyledContentBox
          gap='medium'
          justify='between'
          pad='medium'
          screenSize={screenSize}
        >
          <Introduction />
          <WorkflowSelector workflows={workflows} />
        </StyledContentBox>
      </Grid>
    )
  }

  return component
}

const DecoratedHero = withResponsiveContext(Hero)

export {
  DecoratedHero as default,
  Hero
}

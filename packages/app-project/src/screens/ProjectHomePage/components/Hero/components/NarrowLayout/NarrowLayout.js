import { Box, Grid } from 'grommet'
import React from 'react'

import Background from '../Background'
import Introduction from '../Introduction'
import WorkflowSelector from '../WorkflowSelector'
import ContentBox from '@shared/components/ContentBox'

function NarrowLayout (props) {
  const { workflows } = props

  return (
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
        <ContentBox gap='medium' >
          <Introduction />
          <WorkflowSelector workflows={workflows} />
        </ContentBox>
      </Grid>
    </Box>
  )
}

NarrowLayout.defaultProps = {
  workflows: []
}

export default NarrowLayout

import { Box, Grid } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import Background from '../Background'
import Introduction from '../Introduction'
import WorkflowMenu from '../WorkflowMenu'
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
          <WorkflowMenu
            workflows={workflows}
          />
        </ContentBox>
      </Grid>
    </Box>
  )
}

NarrowLayout.defaultProps = {
  workflows: []
}

NarrowLayout.propTypes = {
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}
export default NarrowLayout

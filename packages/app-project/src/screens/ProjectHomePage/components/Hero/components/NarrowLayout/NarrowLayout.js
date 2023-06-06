import { Box, Grid } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'

import Background from '../Background'
import Introduction from '../Introduction'
import WorkflowSelector from '@shared/components/WorkflowSelector'
import ContentBox from '@shared/components/ContentBox'

function NarrowLayout ({
  workflows = []
}) {
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
          <WorkflowSelector
            workflows={workflows}
          />
        </ContentBox>
      </Grid>
    </Box>
  )
}

NarrowLayout.propTypes = {
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default NarrowLayout

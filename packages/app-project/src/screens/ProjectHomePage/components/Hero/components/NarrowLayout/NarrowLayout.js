import { Box, Grid } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'

import Background from '../Background'
import Introduction from '../Introduction'
import OrganizationLink from '../OrganizationLink'
import WorkflowSelector from '@shared/components/WorkflowSelector'
import ContentBox from '@shared/components/ContentBox'

function NarrowLayout ({
  organization = {},
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
          {organization?.id ? (
            <OrganizationLink
              slug={organization.slug}
              title={organization.strings?.title || organization.title}
            />
          ) : null}
          <WorkflowSelector
            workflows={workflows}
          />
        </ContentBox>
      </Grid>
    </Box>
  )
}

NarrowLayout.propTypes = {
  organization: shape({
    id: string,
    slug: string,
    title: string
  }),
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}
export default NarrowLayout

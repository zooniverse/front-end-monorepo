import { Box, Grid } from 'grommet'
import { observer, MobXProviderContext } from 'mobx-react'
import { arrayOf, shape, string } from 'prop-types'
import { useContext } from 'react'

import Background from '../Background'
import Introduction from '../Introduction'
import OrganizationLink from '../OrganizationLink'
import WorkflowSelector from '@shared/components/WorkflowSelector'
import ContentBox from '@shared/components/ContentBox'

function useStores() {
  const { store } = useContext(MobXProviderContext)
  const {
    organization
  } = store
  return {
    organization
  }
}

function NarrowLayout ({
  workflows = []
}) {
  const { organization } = useStores()

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
              title={organization.title}
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
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default observer(NarrowLayout)

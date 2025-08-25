import { Box } from 'grommet'
import { observer, MobXProviderContext } from 'mobx-react'
import { arrayOf, shape, string } from 'prop-types'
import { useContext } from 'react'
import styled from 'styled-components'

import Background from '../Background'
import Introduction from '../Introduction'
import OrganizationLink from '../OrganizationLink'
import WorkflowSelector from '@shared/components/WorkflowSelector'
import ContentBox from '@shared/components/ContentBox'

const GrowBox = styled(Box)`
  flex-grow: 1;
`

const StyledContentBox = styled(ContentBox)`
  border-color: transparent;
`

function useStores() {
  const { store } = useContext(MobXProviderContext)
  const {
    organization
  } = store
  return {
    organization
  }
}

function WideLayout ({
  workflows = []
}) {
  const { organization } = useStores()

  return (
    <GrowBox
      align='stretch'
      direction='row'
      justify='between'
    >
      <Box width='62%'>
        <Background />
      </Box>
      <StyledContentBox
        gap='small'
        justify='between'
        pad='medium'
        width='38%'
      >
        <Introduction />
        {organization.id ? (
          <OrganizationLink
            slug={organization.slug}
            title={organization.title}
          />
        ) : null}
        <WorkflowSelector
          workflows={workflows}
        />
      </StyledContentBox>
    </GrowBox>
  )
}

WideLayout.propTypes = {
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default observer(WideLayout)

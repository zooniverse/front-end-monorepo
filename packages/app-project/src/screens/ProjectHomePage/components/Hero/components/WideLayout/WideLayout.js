import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
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

function WideLayout ({
  organization = {},
  workflows = []
}) {
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
        {organization?.id ? (
          <OrganizationLink
            slug={organization.slug}
            title={organization.strings?.title || organization.title}
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
  organization: shape({
    id: string,
    slug: string,
    title: string
  }),
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default WideLayout

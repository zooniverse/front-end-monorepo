import { Loader } from '@zooniverse/react-components'
import { Box, Grid, Paragraph } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import styled from 'styled-components'

import GroupCardList from './components/GroupCardList'

const StyledGrid = styled(Grid)`
  gap: 20px 40px;
  justify-items: center;
  grid-template-columns: 1fr 1fr;

  @media (width < 80rem) {
    grid-template-columns: 1fr;
  }
`

function MyGroups({
  groups = [],
  loading = false
}) {
  if (loading) {
    return (
      <Box
        align='center'
        fill
        justify='center'
        pad='medium'
      >
        <Loader />
      </Box>
    )
  }

  if (!groups?.length) {
    return (
      <Box
        align='center'
        fill
        justify='center'
        pad='medium'
      >
        <Paragraph margin={{ top: '0', bottom: '20px' }}>
          You are not a member of any Groups.
        </Paragraph>
        <Paragraph margin={{ top: '0', bottom: '20px' }}>
          Create one below
        </Paragraph>
      </Box>
    )
  }

  return (
    <StyledGrid
      forwardedAs='ul'
      pad='none'
    >
      <GroupCardList groups={groups} />
    </StyledGrid>
  )
}

MyGroups.propTypes = {
  groups: arrayOf(
    shape({
      id: string,
      display_name: string
    })
  ),
  loading: bool
}

export default MyGroups

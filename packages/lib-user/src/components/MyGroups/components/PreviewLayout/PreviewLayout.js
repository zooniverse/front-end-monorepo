import { Loader } from '@zooniverse/react-components'
import { Box, Paragraph } from 'grommet'
import { arrayOf, bool, func, shape, string } from 'prop-types'

import { ContentBox } from '@components/shared'
import GroupCardContainer from '../GroupCard/GroupCardContainer.js'
import CreateButton from '../CreateButton'

const DEFAULT_HANDLER = () => true

export default function PreviewLayout({
  authUser,
  groups,
  loading = false,
  setGroupModalActive = DEFAULT_HANDLER
}) {
  return (
    <ContentBox
      linkLabel='See all'
      linkProps={{ href: `/users/${authUser?.login}/groups` }}
      title='My Groups'
    >
      {loading && (
        <Box fill justify='center' align='center'>
          <Loader />
        </Box>
      )}
      {!loading && groups?.length ? (
        <Box margin={{ bottom: 'medium' }}>
          {groups.slice(0, 2).map(group => (
            <GroupCardContainer
              key={group.id}
              id={group.id}
              displayName={group.displayName}
              role={group.role}
            />
          ))}
        </Box>
      ) : (
        <Box fill justify='center' align='center'>
          <Paragraph margin={{ top: '0', bottom: '20px' }}>
            You are not a member of any Groups.
          </Paragraph>
          <Paragraph margin={{ top: '0', bottom: '20px' }}>
            Create one below
          </Paragraph>
        </Box>
      )}
      <CreateButton onClick={() => setGroupModalActive(true)} />
    </ContentBox>
  )
}

PreviewLayout.propTypes = {
  authUser: shape({
    id: string.isRequired
  }),
  groups: arrayOf(
    shape({
      display_name: string,
      id: string,
      roles: arrayOf(string)
    })
  ),
  loading: bool,
  setGroupModalActive: func
}

import { SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { arrayOf, func, shape, string } from 'prop-types'

import MemberListItem from './components/MemberListItem'

const DEFAULT_HANDLER = () => true

function MembersList({
  authUserId = '',
  handleDeleteMembership = DEFAULT_HANDLER,
  handleUpdateMembership = DEFAULT_HANDLER,
  memberships = [],
  users = []
}) {
  return (
    <Box
      margin={{ top: 'small' }}
    >
      <SpacedText
        color={{ dark: 'neutral-6', light: 'neutral-7' }}
        size='1rem'
        uppercase={false}
      >
        Group Members
      </SpacedText>
      <SpacedText
        margin={{ top: 'xxsmall' }}
        size='0.8rem'
        uppercase={false}
      >
        Removing a member inactivates their membership in the group. They will no longer have access to the group, but contributions while a member will persist.
      </SpacedText>
      <Box
        as='ul'
        border={[{ color: 'light-5', size: '1px', style: 'solid' }]}
        height='small'
        margin={{ top: 'xsmall' }}
        overflow={{ vertical: 'auto' }}
        round='4px'
      >
        {memberships?.map(membership => {
          const user = users?.find(user => user.id === membership.links.user)
          const role = membership.roles[0]
          const disabled = authUserId === user?.id
          
          return (
            <MemberListItem
              key={membership.id}
              disabled={disabled}
              handleDelete={handleDeleteMembership}
              handleUpdate={handleUpdateMembership}
              membershipId={membership.id}
              role={role}
              user={user}
            />
          )
        })}
      </Box>
    </Box>
  )
}

MembersList.propTypes = {
  authUserId: string,
  handleDeleteMembership: func,
  handleUpdateMembership: func,
  memberships: arrayOf(shape({
    id: string,
    roles: arrayOf(string)
  })),
  users: arrayOf(shape({
    id: string
  }))
}

export default MembersList

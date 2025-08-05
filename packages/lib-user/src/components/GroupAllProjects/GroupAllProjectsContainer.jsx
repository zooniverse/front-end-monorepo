'use client'

import { bool, shape, string } from 'prop-types'

import { GroupContainer } from '@components/shared'
import GroupAllProjects from './GroupAllProjects'

function GroupAllProjectsContainer({
  adminMode,
  authUser,
  groupId,
  joinToken
}) {
  return (
    <GroupContainer
      adminMode={adminMode}
      authUser={authUser}
      groupId={groupId}
      joinToken={joinToken}
    >
      <GroupAllProjects />
    </GroupContainer>
  )
}

GroupAllProjectsContainer.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  groupId: string,
  joinToken: string
}

export default GroupAllProjectsContainer

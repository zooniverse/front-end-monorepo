'use client'

import { bool, shape, string } from 'prop-types'

import { GroupContainer } from '@components/shared'

import GroupStats from './GroupStats'

function GroupStatsContainer({
  adminMode = false,
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
      <GroupStats />
    </GroupContainer>
  )
}

GroupStatsContainer.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  groupId: string,
  joinToken: string
}

export default GroupStatsContainer

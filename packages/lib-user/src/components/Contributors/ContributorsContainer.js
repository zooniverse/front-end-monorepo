'use client'

import { bool, shape, string } from 'prop-types'

import { GroupContainer } from '@components/shared'

import Contributors from './Contributors'

function ContributorsContainer({
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
      <Contributors />
    </GroupContainer>
  )
}

ContributorsContainer.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  groupId: string,
  joinToken: string
}

export default ContributorsContainer

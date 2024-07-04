'use client'

import { bool, func, shape, string } from 'prop-types'

import { GroupContainer } from '@components/shared'

import GroupStats from './GroupStats'

function GroupStatsContainer({
  adminMode = false,
  authUser,
  groupId,
  joinToken,
  selectedProject,
  setSelectedProject
}) {
  return (
    <GroupContainer
      adminMode={adminMode}
      authUser={authUser}
      groupId={groupId}
      joinToken={joinToken}
    >
      <GroupStats
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </GroupContainer>
  )
}

GroupStatsContainer.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  groupId: string,
  joinToken: string,
  selectedProject: string,
  setSelectedProject: func
}

export default GroupStatsContainer

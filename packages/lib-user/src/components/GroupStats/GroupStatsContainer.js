'use client'

import { bool, func, shape, string } from 'prop-types'

import { GroupContainer } from '@components/shared'

import GroupStats from './GroupStats'

function GroupStatsContainer({
  adminMode = false,
  authUser,
  groupId,
  joinToken,
  selectedDateRange,
  selectedProject,
  setSelectedDateRange,
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
        selectedDateRange={selectedDateRange}
        selectedProject={selectedProject}
        setSelectedDateRange={setSelectedDateRange}
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
  selectedDateRange: shape({
    endDate: string,
    startDate: string
  }),
  selectedProject: string,
  setSelectedDateRange: func,
  setSelectedProject: func
}

export default GroupStatsContainer

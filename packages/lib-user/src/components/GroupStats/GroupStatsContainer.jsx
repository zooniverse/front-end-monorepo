'use client'

import { bool, func, shape, string } from 'prop-types'

import { GroupContainer } from '@components/shared'

import GroupStats from './GroupStats'

const DEFAULT_HANDLER = () => true

function GroupStatsContainer({
  adminMode = false,
  authUser,
  groupId,
  joinToken,
  paramsValidationMessage = '',
  selectedDateRange,
  selectedProject = undefined,
  setSelectedDateRange = DEFAULT_HANDLER,
  setSelectedProject = DEFAULT_HANDLER
}) {
  return (
    <GroupContainer
      adminMode={adminMode}
      authUser={authUser}
      groupId={groupId}
      joinToken={joinToken}
    >
      <GroupStats
        paramsValidationMessage={paramsValidationMessage}
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
  groupId: string.isRequired,
  joinToken: string,
  paramsValidationMessage: string,
  selectedDateRange: shape({
    endDate: string,
    startDate: string
  }).isRequired,
  selectedProject: string,
  setSelectedDateRange: func,
  setSelectedProject: func
}

export default GroupStatsContainer

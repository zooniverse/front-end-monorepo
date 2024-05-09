'use client'

import { bool, shape, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesProjects,
  usePanoptesUserGroup,
  useStats
} from '@hooks'

import {
  deletePanoptesUserGroup,
  getDateInterval,
  updatePanoptesUserGroup
} from '@utils'

import GroupStats from './GroupStats'

const STATS_ENDPOINT = '/classifications/user_groups'

function GroupStatsContainer({
  adminMode,
  authUser,
  groupId
}) {
  const [selectedProject, setSelectedProject] = useState('AllProjects')
  const [selectedDateRange, setSelectedDateRange] = useState('Last7Days')

  // fetch user_group
  const {
    data,
    error: groupError,
    isLoading: groupLoading
  } = usePanoptesUserGroup({
    authUserId: authUser?.id,
    groupId
  })
  const group = data?.body?.user_groups?.[0]
  
  // fetch all projects stats, used by projects select and top projects regardless of selected project
  const allProjectsStatsQuery = getDateInterval(selectedDateRange)
  allProjectsStatsQuery.top_contributors = 10
  
  const {
    data: allProjectsStats,
    error: statsError,
    isLoading: statsLoading
  } = useStats({
    endpoint: STATS_ENDPOINT,
    sourceId: group?.id,
    query: allProjectsStatsQuery
  })
  
  // fetch individual project stats
  const projectStatsQuery = getDateInterval(selectedDateRange)
  projectStatsQuery.project_id = parseInt(selectedProject)
  projectStatsQuery.top_contributors = 10
  
  const {
    data: projectStats,
    error: projectStatsError,
    isLoading: projectStatsLoading
  } = useStats({
    endpoint: STATS_ENDPOINT,
    sourceId: group?.id,
    query: projectStatsQuery
  })
  
  // fetch projects
  const projectIDs = allProjectsStats?.project_contributions?.map(project => project.project_id)

  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects(projectIDs)

  function handleProjectSelect (project) {
    setSelectedProject(project.value)
  }

  function handleDateRangeSelect (dateRange) {
    setSelectedDateRange(dateRange.value)
  }

  async function handleGroupDelete() {
    try {
      const deleteResponse = await deletePanoptesUserGroup({ groupId, etag: data.headers.etag })
      console.log('deleteResponse', deleteResponse)
      window.location.href =  '?users=[login]/groups'
    } catch (error) {
      console.error(error)
    }
  }

  async function handleGroupUpdate(updates) {
    try {
      const updatedGroup = await updatePanoptesUserGroup({ updates, etag: data.headers.etag })
      console.log('updatedGroup', updatedGroup)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <GroupStats
      allProjectsStats={allProjectsStats}
      group={group}
      handleDateRangeSelect={handleDateRangeSelect}
      handleGroupDelete={handleGroupDelete}
      handleGroupUpdate={handleGroupUpdate}
      handleProjectSelect={handleProjectSelect}
      login={authUser?.login}
      projectStats={projectStats}
      projects={projects}
      selectedDateRange={selectedDateRange}
      selectedProject={selectedProject}
    />
  )
}

GroupStatsContainer.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  groupId: string
}

export default GroupStatsContainer

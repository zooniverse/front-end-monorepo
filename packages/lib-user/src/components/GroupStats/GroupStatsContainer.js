'use client'

import { object, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesAuthUser,
  usePanoptesProjects,
  usePanoptesUserGroup,
  useStats
} from '@hooks'

import {
  deletePanoptesUserGroup,
  getBearerToken,
  getDateInterval,
  updatePanoptesUserGroup
} from '@utils'

import GroupStats from './GroupStats'

const STATS_ENDPOINT = '/classifications/user_groups'

function GroupStatsContainer({
  authClient,
  groupId
}) {
  const [selectedProject, setSelectedProject] = useState('AllProjects')
  const [selectedDateRange, setSelectedDateRange] = useState('Last7Days')

  // fetch authenticated user
  const {
    data: authUser
  } = usePanoptesAuthUser(authClient)

  // fetch user_group
  const {
    data,
    error: groupError,
    isLoading: groupLoading
  } = usePanoptesUserGroup({
    authClient,
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
    authClient,
    authUserId: authUser?.id,
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
    authClient,
    authUserId: authUser?.id,
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

  async function getRequestHeaders() {
    const authorization = await getBearerToken(authClient)
    const requestHeaders = {
      authorization,
      etag: data.headers.etag
    }
    return requestHeaders
  }

  async function handleGroupDelete() {
    try {
      const requestHeaders = await getRequestHeaders()
      const deleteResponse = await deletePanoptesUserGroup({ groupId, headers: requestHeaders })
      console.log('deleteResponse', deleteResponse)
      window.location.href =  '?users=[login]/groups'
    } catch (error) {
      console.error(error)
    }
  }

  async function handleGroupUpdate(updates) {
    try {
      const requestHeaders = await getRequestHeaders()
      const updatedGroup = await updatePanoptesUserGroup({ updates, headers: requestHeaders })
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
  authClient: object,
  groupId: string
}

export default GroupStatsContainer

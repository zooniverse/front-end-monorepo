import { shape, string } from 'prop-types'
import { usePanoptesProjects, useStats } from '@hooks'
import RecentProjects from './RecentProjects.js'

function RecentProjectsContainer({ authUser }) {
  const recentProjectsQuery = {
    project_contributions: true,
    order_project_contributions_by: 'recents',
    period: 'day'
  }

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError
  } = useStats({ sourceId: authUser?.id, query: recentProjectsQuery })

  // limit to 20 projects fetched from panoptes
  const contributionStats = stats?.project_contributions.slice(0, 20)
  const projectIds = contributionStats?.map(project => project.project_id)

  // Get more info about each project
  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError
  } = usePanoptesProjects({
    cards: true,
    id: projectIds?.join(',')
  })

  // Attach project info to each contribution stat
  if (projects?.length && contributionStats?.length) {
    contributionStats.forEach(stat => {
      const projectObj = projects.find(
        project => parseInt(project.id) === stat.project_id
      )
      stat.projectInfo = projectObj
    })
  }

  return (
    <RecentProjects
      error={statsError || projectsError}
      isLoading={statsLoading || projectsLoading}
      recentProjectsStats={contributionStats}
    />
  )
}

RecentProjectsContainer.propTypes = {
  authUser: shape({
    id: string
  })
}

export default RecentProjectsContainer

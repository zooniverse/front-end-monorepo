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

  // Get more info about each project
  const projectIds = stats?.project_contributions?.map(
    project => project.project_id
  )

  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError
  } = usePanoptesProjects({
    cards: true,
    id: projectIds?.join(','),
    page_size: 20
  })

  // Attach contributions to each project
  if (projects?.length && stats.project_contributions.length) {
    projects.forEach(project => {
      const projectStat = stats.project_contributions.find(
        stat => stat.project_id === parseInt(project.id)
      )
      project.userContributions = projectStat.count
    })
  }

  return (
    <RecentProjects
      error={statsError || projectsError}
      isLoading={statsLoading || projectsLoading}
      recentProjectsStats={projects}
    />
  )
}

RecentProjectsContainer.propTypes = {
  authUser: shape({
    id: string
  })
}

export default RecentProjectsContainer

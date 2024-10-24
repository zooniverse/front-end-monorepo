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
  const contributions = stats?.project_contributions.slice(0, 20)
  const projectIds = contributions?.map(project => project.project_id)

  // Get more info about each project
  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError
  } = usePanoptesProjects({
    cards: true,
    id: projectIds?.join(',')
  })

  // Attach project info to each contribution stat (see similar behavior in TopProjects)
  let recentProjects = []

  if (projects?.length && contributions?.length) {
    recentProjects = contributions
      .map(projectContribution => {
        const projectData = projects?.find(
          project => project.id === projectContribution.project_id.toString()
        )
        return {
          count: projectContribution.count,
          ...projectData
        }
      })
      .filter(project => project?.id) // exclude private or deleted projects
  }

  return (
    <RecentProjects
      error={statsError || projectsError}
      isLoading={statsLoading || projectsLoading}
      recentProjects={recentProjects}
    />
  )
}

RecentProjectsContainer.propTypes = {
  authUser: shape({
    id: string
  })
}

export default RecentProjectsContainer

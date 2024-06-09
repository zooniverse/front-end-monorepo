import { shape, string } from 'prop-types'

import { usePanoptesProjects, useStats } from '@hooks'
import RecentProjects from './RecentProjects.js'

export default function RecentProjectsContainer({ authUser }) {
  // Returns all projects a user has classified in descending order (most classifications first)
  const { data: statsData } = useStats({
    sourceId: authUser.id,
    query: { project_contributions: true }
  })

  // We only display 10 in the UI, so only fetch project data for the first 10 statsData
  const recentProjectIds = statsData?.project_contributions
    ?.slice(0, 10)
    .map(project => project.project_id)

  const { data: projects } = usePanoptesProjects(recentProjectIds)

  let projectsWithClassificationCount = []

  // Attach 'count' to each project object
  if (projects?.length) {
    projectsWithClassificationCount = projects?.map(project => {
      const { count } = statsData?.project_contributions?.find(
        stat => stat.project_id.toString() === project.id
      )
      project.user_classifications = count
      return project
    })
    // Re-sort into descending order (most classifications first)
    projectsWithClassificationCount.sort(
      (a, b) => b.user_classifications - a.user_classifications
    )
  }

  return <RecentProjects projects={projectsWithClassificationCount} />
}

RecentProjectsContainer.propTypes = {
  user: shape({
    id: string.isRequired
  })
}

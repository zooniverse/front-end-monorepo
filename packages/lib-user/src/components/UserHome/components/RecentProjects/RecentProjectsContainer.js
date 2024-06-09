import { shape, string } from 'prop-types'

import { usePanoptesProjects, useStats } from '@hooks'
import RecentProjects from './RecentProjects.js'

export default function RecentProjectsContainer({ authUser }) {

  const { data } = useStats({
    sourceId: authUser.id,
    query: { project_contributions: true }
  })

  const recentProjectIds = data?.project_contributions?.slice(0,10).map(project => project.project_id)

  const { data: projects } = usePanoptesProjects(recentProjectIds)

  return <RecentProjects projects={projects} />
}

RecentProjectsContainer.propTypes = {
  user: shape({
    id: string.isRequired,
  })
}

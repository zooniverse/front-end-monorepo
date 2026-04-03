import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'

import ProjectStatsPage from './ProjectStatsPage'

function useStores() {
  const stores = useContext(MobXProviderContext)
  const { project } = stores.store
  return {
    projectDisplayName: project?.display_name
  }
}

function ProjectStatsPageConnector() {
  const { projectDisplayName, projectId } = useStores()

  return (
    <ProjectStatsPage
      projectDisplayName={projectDisplayName}
      projectId={projectId}
    />
  )
}

export default observer(ProjectStatsPageConnector)

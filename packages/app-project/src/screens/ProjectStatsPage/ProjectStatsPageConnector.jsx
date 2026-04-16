import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { arrayOf, shape, string } from 'prop-types'

import ProjectStatsPage from './ProjectStatsPage'

function useStores() {
  const stores = useContext(MobXProviderContext)
  const { project } = stores.store
  return {
    projectDisplayName: project?.display_name
  }
}

function ProjectStatsPageConnector({ workflows }) {
  const { projectDisplayName, projectId } = useStores()

  return (
    <ProjectStatsPage
      projectDisplayName={projectDisplayName}
      projectId={projectId}
      workflows={workflows}
    />
  )
}

export default observer(ProjectStatsPageConnector)

ProjectStatsPageConnector.propTypes = {
  projectDisplayName: string,
  projectId: string,
  workflows: arrayOf(
    shape({
      id: string.isRequired
    })
  )
}

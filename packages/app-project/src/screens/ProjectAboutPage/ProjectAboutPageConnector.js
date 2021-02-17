import { observer, MobXProviderContext } from 'mobx-react'
import React, { useContext } from 'react'

import ProjectHomePage from './ProjectHomePage'

function useStoreContext (stores) {
  const { store } = stores || useContext(MobXProviderContext)
  const { inBeta } = store.project
  return {
    inBeta
  }
}

/**
  Connect the about page to the store. Pass down...
*/
function ProjectAboutPageConnector ({
  stores
}) {
  return <ProjectHomePage />
}

export default observer(ProjectAboutPageConnector)

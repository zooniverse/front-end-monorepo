import { observer, MobXProviderContext } from 'mobx-react'
import React, { useContext } from 'react'

import ProjectAboutPage from './ProjectAboutPage'

function useStoreContext (stores) {
  const { store } = stores || useContext(MobXProviderContext)
  const aboutPages = store.project.about_pages
  return {
    aboutPages
  }
}

/**
  Connect the about page to the store. Pass down...
*/
function ProjectAboutPageConnector ({
  stores
}) {
  const { aboutPages } = useStoreContext(stores)
  return <ProjectAboutPage aboutPages={aboutPages} />
}

export default observer(ProjectAboutPageConnector)

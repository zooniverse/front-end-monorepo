import { observer, MobXProviderContext } from 'mobx-react'
import React, { useContext } from 'react'
import { arrayOf, shape, string } from 'prop-types'

import ProjectAboutPage from './ProjectAboutPage'

function useStoreContext (stores) {
  const { store } = stores || useContext(MobXProviderContext)
  const aboutPages = store.project.about_pages
  return {
    aboutPages
  }
}

/**
  Connect the about page to the store. Pass down aboutPages data.
*/
function ProjectAboutPageConnector ({
  stores,
  pageType,
  aboutPages
}) {
  // const { aboutPages } = useStoreContext(stores)
  const [aboutPageData] = aboutPages.filter(page => page.url_key === pageType)
  return <ProjectAboutPage aboutPageData={aboutPageData} />
}

ProjectAboutPageConnector.propTypes = {
  stores: shape({
    store: shape({
      project: shape({
        about_pages: arrayOf(shape({
          id: string.isRequired
        }))
      })
    })
  })
}

export default observer(ProjectAboutPageConnector)

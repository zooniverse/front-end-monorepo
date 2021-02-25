import { observer, MobXProviderContext } from 'mobx-react'
import React, { useContext } from 'react'
import { arrayOf, shape, string } from 'prop-types'

import ProjectAboutPage from './ProjectAboutPage'

/**
  Connect the about page to the store. Pass down aboutPages data.
*/
function ProjectAboutPageConnector ({
  project,
  pageType,
  teamArray
}) {
  // console.log(teamArray)
  const { store } = useContext(MobXProviderContext)
  const { inBeta } = store.project
  const { about_pages: aboutPages } = project
  const [aboutPageData] = aboutPages.filter(page => page.url_key === pageType)
  return aboutPageData && <ProjectAboutPage inBeta={inBeta} aboutPageData={aboutPageData} />
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

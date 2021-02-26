import { observer, MobXProviderContext } from 'mobx-react'
import React, { useContext } from 'react'
import { arrayOf, bool, object, shape, string } from 'prop-types'

import ProjectAboutPage from './ProjectAboutPage'

/**
  Connect the about page to the store. Pass down aboutPages data.
*/
function ProjectAboutPageConnector ({ project, pageType, teamArray }) {
  const { store } = useContext(MobXProviderContext)
  const { inBeta } = store.project
  const { about_pages: aboutPages } = project
  const [aboutPageData] = aboutPages.filter(page => page.url_key === pageType)
  return aboutPageData ? (
    <ProjectAboutPage
      inBeta={inBeta}
      aboutPageData={aboutPageData}
      teamArray={teamArray}
    />
  ) : (
    <p>No data for this page...</p>
  )
}

ProjectAboutPageConnector.propTypes = {
  inBeta: bool,
  project: object,
  teamArray: arrayOf(shape({
    avatar_src: string,
    display_name: string,
    id: string.isRequired,
    login: string,
    role: string
  }))
}

export default observer(ProjectAboutPageConnector)

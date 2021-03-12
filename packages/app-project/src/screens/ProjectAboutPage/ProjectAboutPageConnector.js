import { observer, MobXProviderContext } from 'mobx-react'
import React from 'react'
import { arrayOf, bool, object, shape, string } from 'prop-types'

import ProjectAboutPage from './ProjectAboutPage'

/**
  Connect the about page to the store. Pass down correct aboutPages data.
*/
function ProjectAboutPageConnector ({ pageType, teamArray }) {
  const {
    store: {
      project: {
        inBeta = false,
        about_pages = [],
        display_name = ''
      }
    }
  } = React.useContext(MobXProviderContext)
  const [aboutPageData] = about_pages.filter(page => page.url_key === pageType)
  return aboutPageData ? (
    <ProjectAboutPage
      inBeta={inBeta}
      aboutPageData={aboutPageData}
      teamArray={teamArray}
      projectDisplayName={display_name}
    />
  ) : (
    <p>No data for this page...</p>
  )
}

ProjectAboutPageConnector.propTypes = {
  inBeta: bool,
  initialState: object,
  teamArray: arrayOf(
    shape({
      avatar_src: string,
      display_name: string,
      id: string.isRequired,
      login: string,
      role: string
    })
  )
}

export default observer(ProjectAboutPageConnector)

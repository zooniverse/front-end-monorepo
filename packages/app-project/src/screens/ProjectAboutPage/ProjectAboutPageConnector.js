import { observer, MobXProviderContext } from 'mobx-react'
import React from 'react'
import { arrayOf, bool, object, shape, string } from 'prop-types'

import ProjectAboutPage from './ProjectAboutPage'

const handleMissingTitle = pageType => {
  switch (pageType) {
    case 'science_case':
      return 'Research'
    case 'team':
      return 'The Team'
    case 'results':
      return 'Results'
    case 'education':
      return 'Education'
    case 'faq':
      return 'FAQ'
    default:
      return 'Research'
  }
}

/**
  Connect the about page to the store. Pass down correct aboutPages data.
*/
function ProjectAboutPageConnector({ pageType, teamArray }) {
  const {
    store: {
      project: { inBeta = false, about_pages = [], display_name = '' }
    }
  } = React.useContext(MobXProviderContext)
  let aboutPageData
  if (about_pages.length) aboutPageData = about_pages.filter(page => page.url_key === pageType)[0]
  else {
    const pageTitle = handleMissingTitle(pageType)
    aboutPageData = {
      title: pageTitle,
      content: 'No content yet.'
    }
  }
  return (
    <ProjectAboutPage
      inBeta={inBeta}
      aboutPageData={aboutPageData}
      teamArray={teamArray}
      projectDisplayName={display_name}
    />
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

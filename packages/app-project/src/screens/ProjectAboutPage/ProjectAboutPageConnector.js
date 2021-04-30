import { observer, MobXProviderContext } from 'mobx-react'
import React from 'react'
import { arrayOf, bool, object, shape, string } from 'prop-types'

import ProjectAboutPage from './ProjectAboutPage'

/**
  Connect the about page to the store. Pass down correct aboutPages data.
  If a non-required about page is empty or missing, content is set as null.
*/
function ProjectAboutPageConnector({ pageType, teamArray }) {
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

  const returnDefaultContent = () => {
    const pageTitle = handleMissingTitle(pageType)
    const requiredPage = pageType === 'science_case' || pageType === 'team'

    return {
      title: pageTitle,
      content: requiredPage ? 'No content yet.' : null
    }
  }

  const {
    store: {
      project: { inBeta = false, about_pages = [], display_name = '' }
    }
  } = React.useContext(MobXProviderContext)

  let aboutPageData
  if (about_pages.length) {
    aboutPageData = about_pages.filter(page => page.url_key === pageType)[0]
    if (!aboutPageData) {
      aboutPageData = returnDefaultContent()
    }
  } else {
    aboutPageData = returnDefaultContent()
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

import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { arrayOf, bool, shape, string } from 'prop-types'

import ProjectAboutPage from './ProjectAboutPage'

/**
  Connect the about page to the store. Pass down correct aboutPages data.
  If a non-required about page is empty or missing, content is set as null.
*/
const ProjectAboutPageConnector = ({ pageType, teamArray }) => {
  const returnDefaultContent = () => {
    const pageTitle = pageType === 'science_case' ? 'research' : pageType

    return {
      title: pageTitle,
      strings: {
        title: pageTitle,
        content: 'No content yet.'
      }
    }
  }

  const {
    store: {
      project: { inBeta = false, about_pages = [], display_name = '' }
    }
  } = useContext(MobXProviderContext)

  let aboutPageData

  const aboutNavLinks = ['research', 'team']
  if (about_pages.length) {
    about_pages.forEach(page => {
      const type = page.url_key === 'science_case' ? 'research' : page.url_key
      if (
        page.content?.length &&
        !aboutNavLinks.includes(type)
      ) {
        aboutNavLinks.push(type)
      }
    })
    aboutPageData = about_pages.filter(page => page.url_key === pageType)[0]

    // Some old project Research pages have default title 'Research Case'
    // Title is corrected here for translation files
    if (aboutPageData?.title.toLowerCase().includes('research')) {
      aboutPageData.title = 'research'
    }

    if (!aboutPageData) {
      aboutPageData = returnDefaultContent()
    }
  } else {
    aboutPageData = returnDefaultContent()
  }

  return (
    <ProjectAboutPage
      aboutNavLinks={aboutNavLinks}
      aboutPageData={aboutPageData}
      inBeta={inBeta}
      projectDisplayName={display_name}
      teamArray={teamArray}
    />
  )
}

ProjectAboutPageConnector.propTypes = {
  inBeta: bool,
  pageType: string,
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

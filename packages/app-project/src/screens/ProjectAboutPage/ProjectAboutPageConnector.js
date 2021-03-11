import { observer, MobXProviderContext } from 'mobx-react'
import React, { useContext } from 'react'
import { arrayOf, bool, object, shape, string } from 'prop-types'

import ProjectAboutPage from './ProjectAboutPage'

/**
  This is for enzyme tests.
*/
function useStoreContext (testStore) {
  const { store } = testStore || useContext(MobXProviderContext)
  return {
    store
  }
}

/**
  Connect the about page to the store. Pass down correct aboutPages data.
*/
function ProjectAboutPageConnector ({ pageType, teamArray, testStore }) {
  const {
    store: {
      project: {
        inBeta = false,
        about_pages = []
      }
    }
  } = useStoreContext(testStore)
  const [aboutPageData] = about_pages.filter(page => page.url_key === pageType)
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
  initialState: object,
  teamArray: arrayOf(
    shape({
      avatar_src: string,
      display_name: string,
      id: string.isRequired,
      login: string,
      role: string
    })
  ),
  /**
   This store is used in enzyme tests
  */
  testStore: shape({
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

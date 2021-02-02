import { observer, MobXProviderContext } from 'mobx-react'
import { arrayOf, bool, shape, string } from 'prop-types'
import React, { useContext } from 'react'

import ProjectHomePage from './ProjectHomePage'

function useStoreContext(stores) {
  const { store } = stores || useContext(MobXProviderContext)
  const { inBeta } = store.project
  return {
    inBeta
  }
}

function ProjectHomePageContainer({ stores, workflows }) {
  const { inBeta } = useStoreContext(stores)
  return <ProjectHomePage inBeta={inBeta} workflows={workflows} />
}

ProjectHomePageContainer.defaultProps = {
  workflows: []
}

ProjectHomePageContainer.propTypes = {
  stores: shape({
    store: shape({
      project: shape({
        inBeta: bool
      })
    })
  }),
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default observer(ProjectHomePageContainer)

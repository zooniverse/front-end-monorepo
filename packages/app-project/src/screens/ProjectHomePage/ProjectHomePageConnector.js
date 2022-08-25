import { observer, MobXProviderContext } from 'mobx-react'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useContext } from 'react'

import ProjectHomePage from './ProjectHomePage'

// function useStoreContext(stores) {
//   const { store } = stores || useContext(MobXProviderContext)
//   const { inBeta } = store.project
//   return {
//     inBeta
//   }
// }

function useStores(store) {
  const stores = useContext(MobXProviderContext)
  store = store || stores.store
  const { inBeta } = store.project
  return {
    inBeta
  }
}

/**
  Connect the home page to the store. Pass down the project beta status and active workflows.
*/
function ProjectHomePageConnector({
  stores,
  workflows = []
}) {
  const { inBeta } = useStores(stores)
  return <ProjectHomePage inBeta={inBeta} workflows={workflows} />
}

ProjectHomePageConnector.propTypes = {
  /**
   Optional project store. Use this to mock the stores for tests etc.
  */
  stores: shape({
    store: shape({
      project: shape({
        inBeta: bool
      })
    })
  }),
  /**
    Active project workflows,containing the workflow names,completeness and any linked subject sets.
  */
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default observer(ProjectHomePageConnector)

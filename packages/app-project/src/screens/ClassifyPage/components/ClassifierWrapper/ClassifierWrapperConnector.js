import { MobXProviderContext, observer } from 'mobx-react'
import { func, string } from 'prop-types'
import { useContext } from 'react'

import ClassifierWrapper from './ClassifierWrapper'

function useStore(mockStore) {
  const stores = useContext(MobXProviderContext)
  const store = mockStore || stores.store
  const {
    appLoadingState,
    project,
    user,
    ui: {
      mode
    }
  } = store

  return {
    appLoadingState,
    collections : user.collections,
    mode,
    project,
    recents: user.recents,
    user,
    yourStats: user.personalization
  }
}

/**
  A wrapper for the Classifier component. Connects the classifier to the project store and is responsible for handling:
  - classifier errors.
  - updates to project recents on classification complete.
  - updates to stored favourites,when the classification subject is favourited.
  - updates to stored collections, when the classification subject is added to a collection.

  ```jsx
  <ClassifierWrapper
    onAddToCollection={addToCollection}
    subjectID={subjectID}
    subjectSetID={subjectSetID}
    workflowID={workflowID}
  />
  ```
*/
function ClassifierWrapperConnector({ mockStore, ...props }) {
  const {
    appLoadingState,
    collections,
    mode,
    project,
    recents,
    user,
    yourStats
  } = useStore(mockStore)

  return (
    <ClassifierWrapper
      appLoadingState={appLoadingState}
      collections={collections}
      mode={mode}
// We use a POJO here, as the `project` resource is also stored in a
// `mobx-state-tree` store in the classifier and an MST node can't be in two
// stores at the same time.
      project={project.toJSON()}
      recents={recents}
      user={user}
      userID={user.id}
      yourStats={yourStats}
      {...props}
    />
  )
}

ClassifierWrapperConnector.propTypes = {
  /** Callback that will be called with a subject ID when the classification subject is added to a collection. */
  onAddToCollection: func,
  /** optional subjectID (from the page URL.) */
  subjectID: string,
  /** optional subject set ID (from the page URL.) */
  subjectSetID: string,
  /** required workflow ID (from the page URL.) */
  workflowID: string
}

export default observer(ClassifierWrapperConnector)

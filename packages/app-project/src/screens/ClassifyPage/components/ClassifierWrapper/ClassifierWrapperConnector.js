import { MobXProviderContext, observer } from 'mobx-react'
import { func, string, shape } from 'prop-types'
import React from 'react'
import asyncStates from '@zooniverse/async-states'

import ClassifierWrapper from './ClassifierWrapper'

function useStore() {
  const { store } = React.useContext(MobXProviderContext)
  const {
    collections,
    project,
    recents,
    user,
    ui: {
      mode
    }
  } = store

  return ({
    collections,
    mode,
    project,
    recents,
    user,
    yourStats: user.personalization
  })
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
function ClassifierWrapperConnector(props) {
  const {
    collections,
    mode,
    project,
    recents,
    user,
    yourStats
  } = useStore()

  if (user.loadingState === asyncStates.loading) {
    return (
      <p>
        Signing in…
      </p>
    )
  }

  return (
    <ClassifierWrapper
      collections={collections}
      mode={mode}
// We use a POJO here, as the `project` resource is also stored in a
// `mobx-state-tree` store in the classifier and an MST node can't be in two
// stores at the same time.
      project={project.toJSON()}
      recents={recents}
      user={user}
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

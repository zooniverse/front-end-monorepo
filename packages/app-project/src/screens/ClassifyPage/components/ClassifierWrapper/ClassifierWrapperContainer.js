import Classifier from '@zooniverse/classifier'
import { MobXProviderContext, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
import { func, shape } from 'prop-types'
import React, { Component, useContext } from 'react'
import asyncStates from '@zooniverse/async-states'
import { logToSentry } from '@helpers/logger'
import ErrorMessage from './components/ErrorMessage'

export function storeMapper(store) {
  const {
    collections,
    project,
    recents,
    user,
    ui: {
      mode
    },
    yourStats
  } = store

  return ({
    collections,
    mode,
    project,
    recents,
    user,
    yourStats
  })
}

function withStore(Component) {
  function DecoratedComponent(props) {
    const { store } = useContext(MobXProviderContext)
    const {
      collections,
      mode,
      project,
      recents,
      user,
      yourStats
    } = storeMapper(store)
    return (
      <Component
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
  return observer(DecoratedComponent)
}

export function ClassifierWrapperContainer({
  onAddToCollection = () => true,
  authClient = auth,
  collections,
  mode,
  project,
  recents,
  subjectID,
  subjectSetID,
  user,
  workflowID,
  yourStats
}) {

  function onCompleteClassification(classification, subject) {
    yourStats.increment()
    recents.add({
      favorite: subject.favorite,
      subjectId: subject.id,
      locations: subject.locations
    })
  }

  function onError(error, errorInfo={}) {
    logToSentry(error, errorInfo)
    console.error('Classifier error', error)
  }

  function onToggleFavourite(subjectId, isFavourite) {
    if (isFavourite) {
      collections.addFavourites([subjectId])
    } else {
      collections.removeFavourites([subjectId])
    }
  }

  const somethingWentWrong = project.loadingState === asyncStates.error

  if (somethingWentWrong) {
    const { error } = project
    const errorToMessage = error || new Error('Something went wrong')
    return (
      <ErrorMessage error={errorToMessage} />
    )
  }

  if (user.loadingState === asyncStates.loading) {
    return (
      <p>
        Signing in…
      </p>
    )
  }

  try {
    if (project.loadingState === asyncStates.success) {
      const key = user.id || 'no-user'
      return (
        <Classifier
          authClient={authClient}
          key={key}
          mode={mode}
          onAddToCollection={onAddToCollection}
          onCompleteClassification={onCompleteClassification}
          onError={onError}
          onToggleFavourite={onToggleFavourite}
          project={project}
          subjectID={subjectID}
          subjectSetID={subjectSetID}
          workflowID={workflowID}
        />
      )
    }
  } catch (error) {
    onError(error)
    return (
      <ErrorMessage error={error} />
    )
  }

  return (
    <div>Loading…</div>
  )
}

ClassifierWrapperContainer.propTypes = {
  onAddToCollection: func,
  authClient: shape({}),
  project: shape({})
}

export default withStore(ClassifierWrapperContainer)

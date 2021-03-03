import Classifier from '@zooniverse/classifier'
import { inject, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
import { func, shape } from 'prop-types'
import React, { Component } from 'react'
import asyncStates from '@zooniverse/async-states'
import ErrorMessage from './components/ErrorMessage'

function storeMapper (stores) {
  const { collections, project, recents, user, yourStats } = stores.store
  const { mode } = stores.store.ui
  // We return a POJO here, as the `project` resource is also stored in a
  // `mobx-state-tree` store in the classifier and an MST node can't be in two
  // stores at the same time.
  return {
    collections,
    mode,
    project: project.toJSON(),
    recents,
    user,
    yourStats
  }
}

@inject(storeMapper)
@observer
class ClassifierWrapperContainer extends Component {
  constructor () {
    super()
    this.onCompleteClassification = this.onCompleteClassification.bind(this)
    this.onToggleFavourite = this.onToggleFavourite.bind(this)
    this.state = {
      error: null
    }
  }

  static getDerivedStateFromError (error) {
    console.error('error', error)
    return {
      error
    }
  }

  onCompleteClassification (classification, subject) {
    const { recents, yourStats } = this.props
    yourStats.increment()
    recents.add({
      favorite: subject.favorite,
      subjectId: subject.id,
      locations: subject.locations
    })
  }

  onToggleFavourite (subjectId, isFavourite) {
    const { collections } = this.props
    if (isFavourite) {
      collections.addFavourites([subjectId])
    } else {
      collections.removeFavourites([subjectId])
    }
  }

  render () {
    const { onAddToCollection, authClient, mode, project, subjectID, subjectSetID, user, workflowID } = this.props
    const somethingWentWrong = this.state.error || project.loadingState === asyncStates.error

    if (somethingWentWrong) {
      const { error } = this.state || project
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

    if (project.loadingState === asyncStates.success) {
      const key = user.id || 'no-user'
      return (
        <Classifier
          authClient={authClient}
          key={key}
          mode={mode}
          onAddToCollection={onAddToCollection}
          onCompleteClassification={this.onCompleteClassification}
          onToggleFavourite={this.onToggleFavourite}
          project={project}
          subjectID={subjectID}
          subjectSetID={subjectSetID}
          workflowID={workflowID}
        />
      )
    }

    return (
      <div>Loading…</div>
    )
  }
}

ClassifierWrapperContainer.propTypes = {
  onAddToCollection: func,
  authClient: shape({}),
  project: shape({})
}

ClassifierWrapperContainer.defaultProps = {
  onAddToCollection: () => true,
  authClient: auth
}

export default ClassifierWrapperContainer

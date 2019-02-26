import Classifier from '@zooniverse/classifier'
import { inject, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
import { shape } from 'prop-types'
import React, { Component } from 'react'
import asyncStates from '@zooniverse/async-states'
import ErrorMessage from './components/ErrorMessage'

function storeMapper (stores) {
  const { project, recents, user } = stores.store
  const { mode } = stores.store.ui
  // We return a POJO here, as the `project` resource is also stored in a
  // `mobx-state-tree` store in the classifier and an MST node can't be in two
  // stores at the same time.
  return {
    mode,
    project: project.toJSON(),
    recents,
    user
  }
}

@inject(storeMapper)
@observer
class ClassifierWrapperContainer extends Component {
  constructor () {
    super()
    this.onCompleteClassification = this.onCompleteClassification.bind(this)
    this.state = {
      error: null
    }
  }

  static getDerivedStateFromError (error) {
    return {
      error
    }
  }

  onCompleteClassification (classification, subject) {
    const { recents } = this.props
    recents.add({
      subjectId: subject.id,
      locations: subject.locations
    })
  }

  render () {
    const { authClient, mode, project, user } = this.props
    const somethingWentWrong = this.state.error || project.loadingState === asyncStates.error

    if (somethingWentWrong) {
      const { error } = this.state || project
      return (
        <ErrorMessage error={error} />
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
          onCompleteClassification={this.onCompleteClassification}
          project={project}
        />
      )
    }

    return (
      <div>Loading…</div>
    )
  }
}

ClassifierWrapperContainer.propTypes = {
  authClient: shape({}),
  project: shape({})
}

ClassifierWrapperContainer.defaultProps = {
  authClient: auth
}

export default ClassifierWrapperContainer

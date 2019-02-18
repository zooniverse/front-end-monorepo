import Classifier from '@zooniverse/classifier'
import { inject, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
import { shape } from 'prop-types'
import React, { Component } from 'react'
import asyncStates from '@zooniverse/async-states'
import ErrorMessage from './components/ErrorMessage'

function storeMapper (stores) {
  const { project, user } = stores.store
  // We return a POJO here, as the `project` resource is also stored in a
  // `mobx-state-tree` store in the classifier and an MST node can't be in two
  // stores at the same time.
  return {
    project: project.toJSON(),
    user
  }
}

@inject(storeMapper)
@observer
export default class ClassifierWrapperContainer extends Component {
  constructor () {
    super()
    this.state = {
      error: null
    }
  }

  static getDerivedStateFromError (error) {
    return {
      error
    }
  }

  render () {
    const { authClient, project, user } = this.props
    const { error } = this.state

    if (error) {
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
      return (
        <Classifier
          authClient={authClient}
          project={project}
        />
      )
    }

    if (project.loadingState === asyncStates.error) {
      return (
        <p>
          {project.error}
        </p>
      )
    }

    return (
      <div>Loading…</div>
    )
  }
}

ClassifierWrapperContainer.propTypes = {
  authClient: shape({}),
  project: shape({}),
}

ClassifierWrapperContainer.defaultProps = {
  authClient: auth
}

import Classifier from '@zooniverse/classifier'
import { inject, observer } from 'mobx-react'
import auth from 'panoptes-client/lib/auth'
import { shape } from 'prop-types'
import React, { Component } from 'react'

import ErrorMessage from './components/ErrorMessage'

function storeMapper (stores) {
  const { project } = stores.store
  // We return a POJO here, as the `project` resource is also stored in a
  // `mobx-state-tree` store in the classifier and an MST node can't be in two
  // stores at the same time.
  return {
    project: project.toJSON()
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
    const { authClient, project } = this.props
    const { error } = this.state

    if (error) {
      return (
        <ErrorMessage error={error} />
      )
    }

    if (project.loadingState === 'success') {
      return (
        <Classifier
          authClient={authClient}
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
  project: shape({}),
}

ClassifierWrapperContainer.defaultProps = {
  authClient: auth
}

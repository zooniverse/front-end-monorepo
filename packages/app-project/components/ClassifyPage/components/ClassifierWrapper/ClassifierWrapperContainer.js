import { inject, observer } from 'mobx-react'
import { shape } from 'prop-types'
import React, { Component } from 'react'
import auth from 'panoptes-client/lib/auth'
import Classifier from '@zooniverse/classifier'

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
      hasError: false
    }
  }

  static getDerivedStateFromError (error) {
    return {
      hasError: true
    }
  }

  render () {
    const { authClient, project } = this.props

    if (this.state.hasError) {
      return (
        <Box>
          There was an error in the classifier :(
        </Box>
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
      <div>Loading...</div>
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

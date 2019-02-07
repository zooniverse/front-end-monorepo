import { inject, observer } from 'mobx-react'
import { shape } from 'prop-types'
import React, { Component } from 'react'
import auth from 'panoptes-client/lib/auth'
import Classifier from '@zooniverse/classifier'
import { cloneDeep } from 'lodash'

function storeMapper (stores) {
  const { project } = stores.store
  // We return a POJO here, as the `project` resource is also stored in a
  // `mobx-state-tree` store in the classifier and an MST node can't be in two
  // stores at the same time.
  return {
    project: project.toJSON()
  }
}

const authInterface = _.cloneDeep(auth)
authInterface.getBearerToken = auth.checkBearerToken
authInterface.getUser = auth.checkCurrent

@inject(storeMapper)
@observer
export default class ClassifierWrapperContainer extends Component {
  render () {
    const { authClient, project } = this.props
    console.info('ClassifierWrapperContainer', project)

    if (project.loadingState === 'success') {
      return (
        <Classifier
          authClient={authClient}
          project={project}
          />
      )
    }

    return (
      <div>Loading</div>
    )
  }
}

ClassifierWrapperContainer.propTypes = {
  authClient: shape({}),
  project: shape({}),
}

ClassifierWrapperContainer.defaultProps = {
  authClient: authInterface
}

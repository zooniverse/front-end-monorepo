import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import Classifier from '@zooniverse/classifier'

function storeMapper (stores) {
  const { id } = stores.store.project
  return {
    projectId: id
  }
}

@inject(storeMapper)
@observer
export default class ClassifierWrapperContainer extends Component {
  render () {
    const { projectId } = this.props
    return (
      <Classifier
        projectId={projectId}
      />
    )
  }
}

ClassifierWrapperContainer.propTypes = {
  projectId: string
}

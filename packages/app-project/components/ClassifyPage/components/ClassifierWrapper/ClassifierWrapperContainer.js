import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ClassifierWrapper from './ClassifierWrapper'

function storeMapper (stores) {
  const { id } = stores.store.project
  return {
    project: {
      id
    }
  }
}

@inject(storeMapper)
@observer
export default class ClassifierWrapperContainer extends Component {
  render () {
    const { project } = this.props
    return (
      <ClassifierWrapper
        project={project}
      />
    )
  }
}

ClassifierWrapperContainer.propTypes = {
}

ClassifierWrapperContainer.defaultProps = {
}

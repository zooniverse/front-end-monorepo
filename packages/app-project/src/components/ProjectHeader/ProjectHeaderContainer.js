import { inject, observer } from 'mobx-react'
import { shape, string } from 'prop-types'
import React, { Component } from 'react'

import ProjectHeader from './ProjectHeader'

function storeMapper (stores) {
  return {
    project: stores.store.project
  }
}

@inject(storeMapper)
@observer
class ProjectHeaderContainer extends Component {
  render () {
    return (
      <ProjectHeader
        title={this.props.project.display_name}
      />
    )
  }
}

ProjectHeaderContainer.propTypes = {
  project: shape({
    display_name: string
  })
}

export default ProjectHeaderContainer

import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import { Component } from 'react'

import ProjectName from './ProjectName'

function storeMapper (stores) {
  const projectName = stores.store.project.display_name
  return {
    projectName
  }
}

class ProjectNameContainer extends Component {
  render () {
    return (
      <ProjectName projectName={this.props.projectName} />
    )
  }
}

ProjectNameContainer.propTypes = {
  projectName: string
}

export default inject(storeMapper)(observer(ProjectNameContainer))

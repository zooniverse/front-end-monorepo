import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import ProjectLink from './ProjectLink'

function storeMapper (stores) {
  const { mode } = stores.store.ui
  return {
    mode
  }
}

@inject(storeMapper)
@observer
class ProjectLinkContainer extends Component {
  render () {
    return (
      <ProjectLink {...this.props} />
    )
  }
}

ProjectLinkContainer.propTypes = {
  mode: string
}

export default ProjectLinkContainer

import { inject, observer } from 'mobx-react'
import { bool } from 'prop-types'
import React, { Component } from 'react'

import ProjectHomePage from './ProjectHomePage'

function storeMapper(stores) {
  const { inBeta } = stores.store.project
  return {
    inBeta
  }
}

@inject(storeMapper)
@observer
class ProjectHomePageContainer extends Component {
  render() {
    const { inBeta } = this.props

    return <ProjectHomePage inBeta={inBeta} {...this.props} />
  }
}

ProjectHomePageContainer.defaultProps = {
  inBeta: false
}

ProjectHomePageContainer.propTypes = {
  inBeta: bool
}

export default ProjectHomePageContainer

import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import StatsPage from './StatsPage'

function storeMapper(stores) {
  const { project } = stores.store
  return {
    projectName: project['display_name']
  }
}

@inject(storeMapper)
@observer
class StatsPageContainer extends Component {
  render () {
    const { projectName } = this.props
    return (
      <StatsPage projectName={projectName} />
    )
  }
}

StatsPageContainer.propTypes = {
  projectName: string
}

export default StatsPageContainer

import React from 'react'
import { inject, observer } from 'mobx-react'
import asyncStates from '../../helpers/asyncStates'

function storeMapper (stores) {
  return {
    project: stores.store.project
  }
}

@inject(storeMapper)
@observer
class ProjectHome extends React.Component {
  render () {
    if (this.props.project.loadingState === asyncStates.loading) {
      return (
        <div>Loading</div>
      )
    }

    return (
      <div>
        {this.props.project.displayName}
      </div>
    )
  }
}

export default ProjectHome

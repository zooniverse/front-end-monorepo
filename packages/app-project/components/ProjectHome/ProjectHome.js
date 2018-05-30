import React from 'react'
import { inject, observer } from 'mobx-react'

function storeMapper (stores) {
  return {
    project: stores.store.project
  }
}

@inject(storeMapper)
@observer
class ProjectHome extends React.Component {
  render () {
    return (
      <div>
        {this.props.project.displayName}
      </div>
    )
  }
}

export default ProjectHome

import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class ProjectHome extends React.Component {
  render () {
    return (
      <div>
        {this.props.store.project.data.display_name}
      </div>
    )
  }
}

export default ProjectHome

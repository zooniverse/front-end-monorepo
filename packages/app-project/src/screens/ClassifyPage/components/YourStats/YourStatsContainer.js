import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import YourStats from './YourStats'
import withRequireUser from '../../../../shared/components/withRequireUser'

function storeMapper (stores) {
  return {
    projectName: stores.store.project['display_name']
  }
}

@inject(storeMapper)
@observer
class YourStatsContainer extends Component {
  render () {
    return (
      <YourStats
        projectName={this.props.projectName}
      />
    )
  }
}

YourStatsContainer.propTypes = {
  projectName: string
}

export default withRequireUser(YourStatsContainer)
export { YourStatsContainer }

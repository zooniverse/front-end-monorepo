import { inject, observer } from 'mobx-react'
import { number, string } from 'prop-types'
import React, { Component } from 'react'

import YourStats from './YourStats'
import withRequireUser from '../../../../shared/components/withRequireUser'

function storeMapper (stores) {
  const { project, yourStats: { counts } } = stores.store
  return {
    counts,
    projectName: project['display_name']
  }
}

@inject(storeMapper)
@withRequireUser
@observer
class YourStatsContainer extends Component {
  render () {
    const { counts, projectName } = this.props
    console.info('YourStatsContainer', counts)
    return (
      <YourStats
        counts={counts}
        projectName={projectName}
      />
    )
  }
}

YourStatsContainer.propTypes = {
  projectName: string
}

export default YourStatsContainer

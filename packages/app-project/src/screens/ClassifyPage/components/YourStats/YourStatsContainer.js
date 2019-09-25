import { inject, observer } from 'mobx-react'
import { object, string } from 'prop-types'
import React, { Component } from 'react'

import YourStats from './YourStats'
import withRequireUser from '@shared/components/withRequireUser'

function storeMapper (stores) {
  const { project, yourStats: { counts } } = stores.store
  return {
    counts,
    projectName: project['display_name']
  }
}

class YourStatsContainer extends Component {
  render () {
    const { counts, projectName } = this.props
    return (
      <YourStats
        counts={counts}
        projectName={projectName}
      />
    )
  }
}

YourStatsContainer.propTypes = {
  counts: object,
  projectName: string
}

@inject(storeMapper)
@withRequireUser
@observer
class DecoratedYourStatsContainer extends YourStatsContainer { }

export default DecoratedYourStatsContainer

export { YourStatsContainer }

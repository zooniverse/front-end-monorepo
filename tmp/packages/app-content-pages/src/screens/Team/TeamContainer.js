import asyncStates from '@zooniverse/async-states'
import { inject, observer } from 'mobx-react'
import { array } from 'prop-types'
import React, { Component } from 'react'

import Team from './Team'

function storeMapper (stores) {
  return {
    data: stores.store.team.uiData,
    filters: stores.store.team.uiFilters
  }
}

class TeamContainer extends Component {
  static async getInitialProps (context, store) {
    if (store.team.loading !== asyncStates.success) {
      await store.team.fetch()
    }
    return {}
  }

  render () {
    return (
      <Team
        data={this.props.data}
        filters={this.props.filters}
      />
    )
  }
}

TeamContainer.propTypes = {
  data: array,
  filters: array
}

@inject(storeMapper)
@observer
class WrappedTeamContainer extends TeamContainer { }

export default WrappedTeamContainer
export { TeamContainer }

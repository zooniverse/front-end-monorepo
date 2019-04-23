import asyncStates from '@zooniverse/async-states'
import { inject, observer } from 'mobx-react'
import { array, arrayOf, func, shape, string } from 'prop-types'
import React, { Component } from 'react'

import Team from './Team'

function storeMapper (stores) {
  return {
    team: stores.store.team
  }
}

@inject(storeMapper)
@observer
class TeamContainer extends Component {
  static async getInitialProps (context, store) {
    if (store.team.loading !== asyncStates.success) {
      await store.team.fetch()
    }
    return {}
  }

  render () {
    const {
      activeFilter,
      currentView,
      filters,
      setActiveFilter
    } = this.props.team

    return (
      <Team
        activeFilter={activeFilter}
        data={currentView}
        filters={filters}
        setActiveFilter={setActiveFilter}
      />
    )
  }
}

TeamContainer.propTypes = {
  team: shape({
    activeFilter: string,
    currentView: array,
    filters: arrayOf(string),
    setActiveFilter: func
  })
}

export default TeamContainer

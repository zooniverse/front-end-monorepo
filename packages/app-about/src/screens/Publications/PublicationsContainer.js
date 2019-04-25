import asyncStates from '@zooniverse/async-states'
import { inject, observer } from 'mobx-react'
import { array, arrayOf, func, shape, string } from 'prop-types'
import React, { Component } from 'react'

import Publications from './Publications'

function storeMapper (stores) {
  return {
    publications: stores.store.publications
  }
}

@inject(storeMapper)
@observer
class PublicationsContainer extends Component {
  static async getInitialProps (context, store) {
    if (store.publications.loading !== asyncStates.success) {
      await store.publications.fetch()
    }
    return {}
  }

  render () {
    const {
      activeFilter,
      currentView,
      filters,
      setActiveFilter
    } = this.props.publications

    return (
      <Publications
        activeFilter={activeFilter}
        data={currentView}
        filters={filters}
        setActiveFilter={setActiveFilter}
      />
    )
  }
}

PublicationsContainer.propTypes = {
  publications: shape({
    activeFilter: string,
    currentView: array,
    filters: arrayOf(string),
    setActiveFilter: func
  })
}

export default PublicationsContainer

import asyncStates from '@zooniverse/async-states'
import { inject, observer } from 'mobx-react'
import { array, arrayOf, func, shape, string } from 'prop-types'
import React, { Component } from 'react'
import Publications from './Publications'

function storeMapper (stores) {
  return {
    data: stores.store.publications.uiData,
    filters: stores.store.publications.uiFilters
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
    return (
      <Publications
        data={this.props.data}
        filters={this.props.filters}
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

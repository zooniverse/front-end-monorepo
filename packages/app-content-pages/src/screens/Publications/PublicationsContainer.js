import asyncStates from '@zooniverse/async-states'
import { inject, observer } from 'mobx-react'
import { array } from 'prop-types'
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
  data: array,
  filters: array
}

export default PublicationsContainer

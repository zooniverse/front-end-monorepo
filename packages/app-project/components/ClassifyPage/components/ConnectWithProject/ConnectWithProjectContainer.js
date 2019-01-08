import { inject, observer } from 'mobx-react'
import { arrayOf, shape, string } from 'prop-types'
import React, { Component } from 'react'

import ConnectWithProject from './ConnectWithProject'

function storeMapper (stores) {
  const { displayName, urls } = stores.store.project
  return {
    projectName: displayName,
    urls
  }
}

@inject(storeMapper)
@observer
export default class ConnectWithProjectContainer extends Component {
  render () {
    const { projectName, urls } = this.props
    return (!urls || urls.length > 0)
      ? <ConnectWithProject projectName={projectName} urls={urls} />
      : null
  }
}

ConnectWithProjectContainer.propTypes = {
  projectName: string,
  urls: arrayOf(shape({
    label: string.isRequired,
    url: string.isRequired
  }))
}

import { inject, observer } from 'mobx-react'
import { arrayOf, shape, string } from 'prop-types'
import React, { Component } from 'react'

import ConnectWithProject from './ConnectWithProject'
import isValidUrl from './helpers/isValidUrl'

function storeMapper (stores) {
  const { display_name, urls } = stores.store.project
  return {
    projectName: display_name,
    urls
  }
}

@inject(storeMapper)
@observer
export default class ConnectWithProjectContainer extends Component {
  render () {
    const { projectName, urls } = this.props
    const validUrls = urls && urls.filter && urls.filter(urlObject => isValidUrl(urlObject.url))
    return (!validUrls || validUrls.length > 0)
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

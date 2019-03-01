import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import ContentBox from './ContentBox'

function storeMapper (stores) {
  const { mode } = stores.store.ui
  return {
    mode
  }
}

@inject(storeMapper)
@observer
class ContentBoxContainer extends Component {
  render () {
    const { mode, ...props } = this.props
    return (
      <ContentBox mode={mode} {...props} />
    )
  }
}

ContentBoxContainer.propTypes = {
  mode: string
}

ContentBoxContainer.defaultProps = {
  mode: 'light'
}

export default ContentBoxContainer

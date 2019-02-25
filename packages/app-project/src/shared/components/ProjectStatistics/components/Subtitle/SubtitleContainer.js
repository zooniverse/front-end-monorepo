import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import Subtitle from './Subtitle'

function storeMapper (stores) {
  const { mode } = stores.store.ui
  return {
    mode
  }
}

@inject(storeMapper)
@observer
class SubtitleContainer extends Component {
  render () {
    return (
      <Subtitle {...this.props} />
    )
  }
}

SubtitleContainer.propTypes = {
  mode: string
}

export default SubtitleContainer

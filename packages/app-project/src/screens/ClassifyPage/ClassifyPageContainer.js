import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import ClassifyPage from './ClassifyPage'

function storeMapper (stores) {
  const { mode } = stores.store.ui
  return {
    mode
  }
}

@inject(storeMapper)
@observer
class ClassifyPageContainer extends Component {
  render () {
    return (
      <ClassifyPage {...this.props} />
    )
  }
}

ClassifyPageContainer.propTypes = {
  mode: string
}

ClassifyPageContainer.defaultProps = {
  mode: 'light'
}

export default ClassifyPageContainer

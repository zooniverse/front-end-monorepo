import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
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
}

ClassifyPageContainer.defaultProps = {
}

export default ClassifyPageContainer

import { inject, observer } from 'mobx-react'
import { bool } from 'prop-types'
import React, { Component } from 'react'

import StandardLayout from './StandardLayout'

function storeMapper(stores) {
  const { inBeta } = stores.store.project
  return {
    inBeta
  }
}

@inject(storeMapper)
@observer
class StandardLayoutContainer extends Component {
  render() {
    const { inBeta } = this.props

    return <StandardLayout inBeta={inBeta} {...this.props} />
  }
}

StandardLayoutContainer.defaultProps = {
  inBeta: false
}

StandardLayoutContainer.propTypes = {
  inBeta: bool
}

export default StandardLayoutContainer

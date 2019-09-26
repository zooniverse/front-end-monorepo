import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import CompletionBar from './CompletionBar'

function storeMapper (stores) {
  return {
    completeness: stores.store.project.completeness
  }
}

class CompletionBarContainer extends Component {
  render () {
    const { completeness } = this.props
    return (
      <CompletionBar completeness={completeness} />
    )
  }
}

CompletionBarContainer.propTypes = {
  completeness: PropTypes.number.isRequired
}

CompletionBarContainer.defaultProps = {
  completeness: 0
}

@inject(storeMapper)
@observer
class DecoratedCompletionBarContainer extends CompletionBarContainer {}

export {
  DecoratedCompletionBarContainer as default,
  CompletionBarContainer
}

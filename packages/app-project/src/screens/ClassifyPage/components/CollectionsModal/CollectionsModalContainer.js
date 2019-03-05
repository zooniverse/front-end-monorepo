import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import CollectionsModal from './CollectionsModal'

function storeMapper (stores) {
  const { collections } = stores.store
  return {
    collections
  }
}

@inject(storeMapper)
@observer
class CollectionsModalContainer extends Component {
  constructor () {
    super()
    this.state = {
      active: false
    }
  }

  componentDidMount () {
    this.setState({ active: true })
  }

  render () {
    const { active } = this.state

    return (
      <CollectionsModal
        active={active}
        closeFn={() => this.setState({ active: false })}
      />
    )
  }
}

CollectionsModalContainer.propTypes = {
  subjectId: PropTypes.string.isRequired
}

CollectionsModalContainer.defaultProps = {
}

export default CollectionsModalContainer

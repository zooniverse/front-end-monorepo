import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import ClassifyPage from './ClassifyPage'
import CollectionsModal from './components/CollectionsModal'

function storeMapper (stores) {
  const { mode } = stores.store.ui
  return {
    mode
  }
}

@inject(storeMapper)
@observer
class ClassifyPageContainer extends Component {
  constructor() {
    super()
    this.collectionsModal = React.createRef()
    this.addToCollection = this.addToCollection.bind(this)
  }

  addToCollection (subjectId) {
    this.collectionsModal.current.wrappedInstance.open(subjectId)
  }

  render () {
    return (
      <>
        <CollectionsModal
          ref={this.collectionsModal}
        />
        <ClassifyPage
          addToCollection = {this.addToCollection}
          {...this.props}
        />
      </>
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

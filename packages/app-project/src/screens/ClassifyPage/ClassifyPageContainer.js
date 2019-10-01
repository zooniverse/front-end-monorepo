import React, { Component } from 'react'

import ClassifyPage from './ClassifyPage'
import CollectionsModal from '../../shared/components/CollectionsModal'

class ClassifyPageContainer extends Component {
  constructor () {
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
          addToCollection={this.addToCollection}
          {...this.props}
        />
      </>
    )
  }
}

export default ClassifyPageContainer

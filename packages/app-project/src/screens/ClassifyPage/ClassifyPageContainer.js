import React, { Component } from 'react'

import ClassifyPage from './ClassifyPage'
import CollectionsModal from '../../shared/components/CollectionsModal'

function ClassifyPageContainer(props) {
  const collectionsModal = React.createRef()

  function addToCollection (subjectId) {
    collectionsModal.current.wrappedInstance.open(subjectId)
  }

  return (
    <>
      <CollectionsModal
        ref={collectionsModal}
      />
      <ClassifyPage
        addToCollection={addToCollection}
        {...props}
      />
    </>
  )
}

export default ClassifyPageContainer

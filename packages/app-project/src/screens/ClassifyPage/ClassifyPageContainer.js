import { createRef, Component } from 'react';

import ClassifyPage from './ClassifyPage'
import CollectionsModal from '../../shared/components/CollectionsModal'

function ClassifyPageContainer(props) {
  const collectionsModal = createRef()

  function addToCollection (subjectId) {
    collectionsModal.current.open(subjectId)
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

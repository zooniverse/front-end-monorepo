import { createRef, useEffect, useState } from 'react'

import ClassifyPage from './ClassifyPage'
import CollectionsModal from '../../shared/components/CollectionsModal'

function ClassifyPageContainer({
  subjectID: subjectFromURL,
  ...props
}) {
  const [ subjectID, setSubjectID ] = useState(subjectFromURL)
  const collectionsModal = createRef()

  useEffect(function onSubjectChange() {
    setSubjectID(subjectFromURL)
  }, [subjectFromURL])

  function addToCollection(subjectId) {
    collectionsModal.current.open(subjectId)
  }

  function onSubjectReset() {
    setSubjectID(undefined)
  }

  return (
    <>
      <CollectionsModal
        ref={collectionsModal}
      />
      <ClassifyPage
        addToCollection={addToCollection}
        onSubjectReset={onSubjectReset}
        subjectID={subjectID}
        {...props}
      />
    </>
  )
}

export default ClassifyPageContainer

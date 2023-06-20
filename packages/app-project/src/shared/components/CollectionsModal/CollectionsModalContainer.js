import { MobXProviderContext, observer } from 'mobx-react'
import { useContext, useState } from 'react'
import { bool, func, string } from 'prop-types'

import CollectionsModal from './CollectionsModal'
import SelectCollection from './components/SelectCollection'
import CreateCollection from './components/CreateCollection'

function useStore() {
  const { store } = useContext(MobXProviderContext)

  const { addSubjects, collections, createCollection } = store.user?.collections

  return {
    addSubjects,
    collections,
    createCollection
  }
}

const DEFAULT_HANDLER = () => true
const defaultNewCollection = {
  display_name: '',
  private: false
}

const CollectionsModalContainer = ({
  collectionsModalActive = false,
  setCollectionsModalActive = DEFAULT_HANDLER,
  subjectID = ''
}) => {
  const {
    addSubjects = DEFAULT_HANDLER,
    collections = [],
    createCollection = DEFAULT_HANDLER
  } = useStore()

  const [newCollection, setNewCollection] = useState(defaultNewCollection)
  const [selectedCollection, setSelectedCollection] = useState(undefined)
  const [selectedSubjectID, setSelectedSubjectID] = useState(subjectID)

  const addToCollection = (event) => {
    event.preventDefault()
    addSubjects(selectedCollection.id, [selectedSubjectID])
    this.close()
  }

  const createNewCollection = (event) => {
    event.preventDefault()
    createCollection(newCollection, [selectedSubjectID])
    this.close()
  }

  const onSelect = (event) => {
    const collection = event.value
    setSelectedCollection(collection)
  }

  const close = () => {
    setCollectionsModalActive(false)
    setSelectedSubjectID(null)
  }

  const updateCollection = (collectionDetails) => {
    const prevNewCollectionDetails = newCollection
    const updatedCollection = Object.assign(
      {},
      prevNewCollectionDetails,
      collectionDetails
    )
    setNewCollection(updatedCollection)
  }

  return (
    <CollectionsModal active={collectionsModalActive} closeFn={close}>
      <SelectCollection
        collections={collections}
        disabled={!selectedCollection}
        onSelect={onSelect}
        onSubmit={addToCollection}
        selected={selectedCollection}
      />
      <CreateCollection
        disabled={!newCollection.display_name}
        collection={newCollection}
        onChange={updateCollection}
        onSubmit={createNewCollection}
      />
    </CollectionsModal>
  )
}

export default observer(CollectionsModalContainer)

CollectionsModalContainer.propTypes = {
  collectionsModalActive: bool,
  setCollectionsModalActive: func,
  subjectID: string
}

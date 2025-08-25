import { MobXProviderContext, observer } from 'mobx-react'
import { useContext, useState } from 'react'
import { bool, func, string } from 'prop-types'

import CollectionsModal from './CollectionsModal'
import SelectCollection from './components/SelectCollection'
import CreateCollection from './components/CreateCollection'

function useStore() {
  const { store } = useContext(MobXProviderContext)
  const { id } = store.user
  const { addSubjects, collections, createCollection, searchCollections } = store.user?.collections

  return {
    addSubjects,
    collections,
    createCollection,
    searchCollections,
    userID: id
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
    createCollection = DEFAULT_HANDLER,
    searchCollections = DEFAULT_HANDLER,
    userID = ''
  } = useStore()

  const [newCollection, setNewCollection] = useState(defaultNewCollection)
  const [selectedCollection, setSelectedCollection] = useState(undefined)

  function addToCollection (event) {
    event.preventDefault()
    addSubjects(selectedCollection.id, [subjectID])
    close()
  }

  function createNewCollection (event) {
    event.preventDefault()
    createCollection(newCollection, [subjectID])
    close()
  }

  function onSelect (event) {
    const collection = event.value
    setSelectedCollection(collection)
  }

  function close () {
    setCollectionsModalActive(false)
  }

  function updateCollection (collectionDetails) {
    const prevNewCollectionDetails = newCollection
    const updatedCollection = {
      ...prevNewCollectionDetails,
      ...collectionDetails
    }
    setNewCollection(updatedCollection)
  }

  return (
    <CollectionsModal active={collectionsModalActive} closeFn={close}>
      <SelectCollection
        collections={collections}
        disabled={!selectedCollection}
        onSearch={searchCollections}
        onSelect={onSelect}
        onSubmit={addToCollection}
        selected={selectedCollection}
        userID={userID}
      />
      <CreateCollection
        disabled={!newCollection.display_name}
        collection={newCollection}
        onChange={updateCollection}
        onSearch={searchCollections}
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

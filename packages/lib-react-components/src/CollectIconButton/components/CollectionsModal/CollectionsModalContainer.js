import { bool, func, string } from 'prop-types'
import { useState } from 'react'

import { useUserCollections } from '../../../hooks'
import {
  addSubjectsToCollection,
  createCollection
} from '../../../helpers/collections'

import CollectionsModal from './CollectionsModal'
import SelectCollection from './components/SelectCollection'
import CreateCollection from './components/CreateCollection'

const DEFAULT_HANDLER = () => true
const DEFAULT_COLLECTION_QUERY = {
  favorite: false,
  current_user_roles: 'owner,collaborator,contributor'
}
const defaultNewCollection = {
  display_name: '',
  private: false
}

const CollectionsModalContainer = ({
  collectionsModalActive = false,
  projectId = '',
  setCollectionsModalActive = DEFAULT_HANDLER,
  subjectId = '',
  userId = ''
}) => {
  const [collectionsQuery, setCollectionsQuery] = useState(DEFAULT_COLLECTION_QUERY)
  const [newCollection, setNewCollection] = useState(defaultNewCollection)
  const [selectedCollection, setSelectedCollection] = useState(undefined)

  const {
    data: collections,
    error,
    isLoading
  } = useUserCollections({
    query: collectionsQuery
  })

  function searchCollections (query) {
    setCollectionsQuery(query)
  }

  function addToCollection (event) {
    event.preventDefault()
    addSubjectsToCollection({
      collectionId: selectedCollection.id,
      subjectIds: [subjectId]  
    })
    close()
  }

  function createNewCollection (event) {
    event.preventDefault()
    createCollection({
      options: newCollection, 
      projectId,
      subjectIds: [subjectId]
    })
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
    <CollectionsModal
      active={collectionsModalActive}
      closeFn={close}
    >
      <SelectCollection
        collections={collections}
        disabled={!selectedCollection}
        onSearch={searchCollections}
        onSelect={onSelect}
        onSubmit={addToCollection}
        selected={selectedCollection}
        userId={userId}
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

export default CollectionsModalContainer

CollectionsModalContainer.propTypes = {
  collectionsModalActive: bool,
  projectId: string,
  setCollectionsModalActive: func,
  subjectId: string,
  userId: string
}

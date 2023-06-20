import { Provider } from 'mobx-react'

import Store from '@stores/Store'
import { Collection } from '@stores/User/Collections/Collections.js'
import CollectionsModalContainer from './CollectionsModalContainer.js'

export default {
  title: 'Project App / shared / Collections Modal',
  component: CollectionsModalContainer,
}

const mockCollection = Collection.create({
  display_name: 'mock collection',
  favorite: false,
  id: '123',
})

const mockCollectionTwo = Collection.create({
  display_name: 'collection two',
  favorite: true,
  id: '456'
})

const snapshot = {
  project: {
    strings: {
      display_name: 'Snapshot Serengeti',
    },
  },
  user: {
    collections: {
      collections: [mockCollection, mockCollectionTwo]
    },
  },
}

const store = Store.create(snapshot)

export const Default = () => {
  return (
    <Provider store={store}>
      <CollectionsModalContainer collectionsModalActive subjectID='1234' />
    </Provider>
  )
}

import { Provider } from 'mobx-react'

import Store from '@stores/Store'
import { Collection } from '@stores/User/Collections/Collections.js'
import CollectionsModalContainer from './CollectionsModalContainer.js'

export default {
  title: 'Project App / shared / Collections Modal',
  component: CollectionsModalContainer,
}

const mockCollectionNames = ['1', '2', '3', '4', '5', '6', '10', '12', '16']

const mockCollections = mockCollectionNames.map((collection) =>
  Collection.create({ display_name: `Collection: ${collection}`, id: collection })
)

const snapshot = {
  project: {
    strings: {
      display_name: 'Snapshot Serengeti',
    }
  },
  user: {
    collections: {
      collections: mockCollections,
    }
  }
}

const store = Store.create(snapshot)

export const Default = () => {
  return (
    <Provider store={store}>
      <CollectionsModalContainer collectionsModalActive subjectID='1234' />
    </Provider>
  )
}

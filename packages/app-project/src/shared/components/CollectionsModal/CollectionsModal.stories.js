import { Provider } from 'mobx-react'

import Store from '@stores/Store'
import { Collection } from '@stores/User/Collections/Collections.js'
import CollectionsModalContainer from './CollectionsModalContainer.js'

/** Note that the User > Collections store method searchCollections()
 * is not mocked in storybook and will not accurately filter the
 * sample collections below */

export default {
  title: 'Project App / shared / Collections Modal',
  component: CollectionsModalContainer
}

const mockCollectionNames = ['1', '2', '3', '10', '12']

const usersCollections = mockCollectionNames.map((collection) =>
  Collection.create({
    display_name: `Collection: ${collection}`,
    id: collection,
    links: {
      owner: {
        id: '123'
      }
    }
  })
)

const otherOwnerCollection = Collection.create({
  display_name: 'Collection: 1',
  id: '934667',
  links: {
    owner: {
      display_name: 'Zooni',
      id: '456'
    }
  }
})

const mockCollections = [...usersCollections, otherOwnerCollection]

const snapshot = {
  project: {
    strings: {
      display_name: 'Snapshot Serengeti'
    }
  },
  user: {
    collections: {
      collections: mockCollections
    },
    id: '123'
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

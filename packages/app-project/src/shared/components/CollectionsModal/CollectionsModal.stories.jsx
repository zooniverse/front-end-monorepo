import { Provider } from 'mobx-react'

import Store from '@stores/Store'
import { Collection } from '@stores/User/Collections/Collections'
import CollectionsModalContainer from './CollectionsModalContainer'

/** Note that the User > Collections store method searchCollections()
 * is not mocked in storybook and will not accurately filter the
 * sample collections below */

export default {
  title: 'Project App / shared / Collections Modal',
  component: CollectionsModalContainer,
  excludeStories: ['mockCollections']
}

const mockCollectionNames = ['Gravity Spy', 'TESS', 'Planet Four', 'Transcriptions']

const usersCollections = mockCollectionNames.map((collection, index) =>
  Collection.create({
    display_name: collection,
    id: index.toString(),
    links: {
      owner: {
        id: '123'
      }
    }
  })
)

const otherOwnerCollection = Collection.create({
  display_name: 'Transcriptions',
  id: '934667',
  links: {
    owner: {
      display_name: 'Zooni',
      id: '456'
    }
  }
})

export const mockCollections = [...usersCollections, otherOwnerCollection]

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

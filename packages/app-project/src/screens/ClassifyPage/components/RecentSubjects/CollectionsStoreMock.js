import { Collection } from '@stores/User/Collections/Collections.js'

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

export const CollectionsStoreMock = {
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

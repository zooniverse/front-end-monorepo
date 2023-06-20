import { Provider } from 'mobx-react'
import asyncStates from '@zooniverse/async-states'

import Store from '@stores/Store'
import CollectionsModalContainer from './CollectionsModalContainer.js'

export default {
  title: 'Project App / shared / Collections Modal',
  component: CollectionsModalContainer
}

const snapshot = {
  project: {
    strings: {
      display_name: 'Snapshot Serengeti',
    }
  },
  user: {
    collections: {
      addSubjects: () => true,
      collections: [],
      createCollection: () => true,
      searchCollections: () => true
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

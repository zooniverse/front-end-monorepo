// import readme from './README.md'
import { Provider } from 'mobx-react'

import Store from '@stores/Store'
import CollectionsButton from './'

const CAT = {
  favorite: false,
  id: '123',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/335/0/2d63944e-f0bc-4fc5-8531-f603886513a1.jpeg'
    }
  ]
}

const snapshot = {
  project: {
    strings: {
      display_name: 'Snapshot Serengeti'
    }
  }
}

const store = Store.create(snapshot)

export default {
  title: 'Project App / Shared / Collections Button',
  component: CollectionsButton,
  parameters: {
    // docs: {
    //   description: {
    //     component: readme
    //   }
    // }
  }
}

export const Plain = () => (
  <Provider store={store}>
    <CollectionsButton disabled={false} subject={CAT} />
  </Provider>
)

// import readme from './README.md'
import { Provider } from 'mobx-react'

import Store from '@stores/Store'
import CollectionsButtonComponent from './'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

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
  component: CollectionsButtonComponent,
  parameters: {
    // docs: {
    //   description: {
    //     component: readme
    //   }
    // }
  }
}

export const CollectionsButton = () => (
  <Provider store={store}>
    <Grommet theme={zooTheme}>
      <CollectionsButtonComponent disabled={false} subject={CAT} />
    </Grommet>
  </Provider>
)

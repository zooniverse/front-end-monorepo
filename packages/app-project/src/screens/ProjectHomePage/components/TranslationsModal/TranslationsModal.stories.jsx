import { Provider } from 'mobx-react'

import initStore from '@stores'
import TranslationsModal from './TranslationsModal'

const snapshot = {
  project: {
    configuration: {
      languages: ['en', 'fr']
    }
  }
}

const store = initStore(true, snapshot)

function StoryContext(Story) {
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  )
}

export default {
  title: 'Project App / Shared / TranslationsModal',
  component: TranslationsModal,
  decorators: [StoryContext]
}

export const Default = {}
Default.args = {
  locale: 'ja' // not in project.configuration.languages
}

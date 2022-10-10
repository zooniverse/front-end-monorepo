import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import zooTheme from '@zooniverse/grommet-theme'
import Router from 'next/router'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import PropTypes from 'prop-types'

import LocaleSwitcher from './LocaleSwitcher'
import initStore from '@stores'

const LocaleSwitcherStory = {
  title: 'Project App / Shared / Project Header / LocaleSwitcher',
  component: LocaleSwitcher
}

export default LocaleSwitcherStory

function RouterMock ({ children }) {
  const mockRouter = {
    asPath: '/zooniverse/snapshot-serengeti/about/research',
    basePath: '/projects',
    locale: 'en',
    push: () => {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {
      owner: 'zooniverse',
      project: 'snapshot-serengeti'
    }
  }

  Router.router = mockRouter

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  )
}

RouterMock.propTypes = {
  children: PropTypes.node.isRequired
}

export function Default({ project }) {
  const snapshot = { project }
  applySnapshot(Default.store, snapshot)
  return (
    <Grommet theme={zooTheme}>
      <RouterMock>
        <Provider store={Default.store} >
          <LocaleSwitcher />
        </Provider>
      </RouterMock>
    </Grommet>
  )
}
Default.store = initStore(true)
Default.args ={
  project: {
    avatar: {
      src: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg'
    },
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg'
    },
    configuration: {
      languages: ['en', 'fr', 'es']
    },
    slug: 'zooniverse/snapshot-serengeti',
    strings: {
      display_name: 'Snapshot Serengeti'
    },
    links: {
      active_workflows: ['1234']
    }
  }
}

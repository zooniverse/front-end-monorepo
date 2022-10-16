import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'

import Nav from './Nav.js'
import initStore from '@stores'

function ThemedStory(Story) {
  return (
    <Grommet theme={zooTheme} background='dark-3'>
      <Story />
    </Grommet>
  )
}

export default {
  title: 'Project App / Shared / Project Header / Nav',
  component: Nav,
  decorators: [ThemedStory]
}

export function Default(props) {
  const snapshot = {
    project: {
      avatar: {
        src: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg'
      },
      background: {
        src: 'https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg'
      },
      beta_approved: false,
      configuration: {
        languages: ['en']
      },
      launch_approved: false,
      slug: 'zooniverse/snapshot-serengeti',
      strings: {
        display_name: 'Snapshot Serengeti'
      },
      links: {
        active_workflows: ['1']
      }
    }
  }
  applySnapshot(Default.store, snapshot)
  return (
    <Provider store={Default.store}>
      <Nav {...props} />
    </Provider>
  )
}
Default.store = initStore(true)

export function LoggedIn(props) {
  const snapshot = {
    project: {
      avatar: {
        src: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg'
      },
      background: {
        src: 'https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg'
      },
      beta_approved: false,
      configuration: {
        languages: ['en']
      },
      launch_approved: false,
      slug: 'zooniverse/snapshot-serengeti',
      strings: {
        display_name: 'Snapshot Serengeti'
      },
      links: {
        active_workflows: ['1']
      }
    },
    user: {
      id: '1',
      login: 'zoo.volunteer'
    }
  }
  applySnapshot(LoggedIn.store, snapshot)
  return (
    <Provider store={LoggedIn.store}>
      <Nav {...props} />
    </Provider>
  )
}
LoggedIn.store = initStore(true)

export function AdminMode(props) {
  const snapshot = {
    project: {
      avatar: {
        src: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg'
      },
      background: {
        src: 'https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg'
      },
      beta_approved: false,
      configuration: {
        languages: ['en']
      },
      launch_approved: false,
      slug: 'zooniverse/snapshot-serengeti',
      strings: {
        display_name: 'Snapshot Serengeti'
      },
      links: {
        active_workflows: ['1']
      }
    },
    user: {
      admin: true,
      id: '1',
      login: 'zoo.admin'
    }
  }
  applySnapshot(AdminMode.store, snapshot)
  return (
    <Provider store={AdminMode.store}>
      <Nav {...props} adminMode />
    </Provider>
  )
}
AdminMode.store = initStore(true)

import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import Nav from './Nav'
import initStore from '@stores'

const mockRouter = {
  asPath: '/zooniverse/snapshot-serengeti/about/team',
  basePath: '/projects',
  locale: 'en',
  push() {},
  prefetch: () => new Promise((resolve, reject) => {}),
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}

function NextRouterStory(Story) {
  return (
    <RouterContext.Provider value={mockRouter}>
      <Story />
    </RouterContext.Provider>
  )
}

function ThemedStory(Story) {
  return (
    <Box background='dark-3'>
      <Story />
    </Box>
  )
}

export default {
  title: 'Project App / Shared / Project Header / Nav',
  component: Nav,
  decorators: [NextRouterStory, ThemedStory]
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
  AdminMode.store.user.setAdminMode(true)
  return (
    <Provider store={AdminMode.store}>
      <Nav {...props} />
    </Provider>
  )
}
AdminMode.store = initStore(true)

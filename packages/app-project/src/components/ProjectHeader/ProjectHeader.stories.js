import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import initStore from '@stores'
import ProjectHeader from './ProjectHeader.js'
import * as subcomponents from './components'

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

function ThemedStory(Story) {
  return (
    <Grommet theme={zooTheme}>
      <Story />
    </Grommet>
  )
}

export default {
  title: 'Project App / Shared / Project Header',
  component: ProjectHeader,
  decorators: [ThemedStory],
  subcomponents
}

export function NotLoggedIn({ adminMode, className, project }) {
  const snapshot = {
    project
  }
  applySnapshot(NotLoggedIn.store, snapshot)
  return (
    <Provider store={NotLoggedIn.store}>
      <ProjectHeader adminMode={adminMode} className={className} />
    </Provider>
  )
}
NotLoggedIn.store = initStore(true)
NotLoggedIn.args = {
  adminMode: false,
  className: '',
  project: {
    avatar: {
      src: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg'
    },
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg'
    },
    configuration: {
      languages: ['en']
    },
    slug: 'zooniverse/snapshot-serengeti',
    strings: {
      display_name: 'Snapshot Serengeti'
    },
    links: {
      active_workflows: ['1']
    }
  }
}

export function LoggedIn({ adminMode, className, project }) {
  const snapshot = {
    project,
    user: {
      admin: true,
      id: '1',
      login: 'zooAdmin'
    }
  }
  applySnapshot(LoggedIn.store, snapshot)
  return (
    <Provider store={LoggedIn.store}>
      <ProjectHeader adminMode={adminMode} className={className} />
    </Provider>
  )
}
LoggedIn.store = initStore(true)
LoggedIn.args = {
  adminMode: false,
  className: '',
  project: {
    avatar: {
      src: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg'
    },
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg'
    },
    configuration: {
      languages: ['en']
    },
    slug: 'zooniverse/snapshot-serengeti',
    strings: {
      display_name: 'Snapshot Serengeti'
    },
    links: {
      active_workflows: ['1']
    }
  }
}

export function InBeta({ adminMode, className, project }) {
  const snapshot = {
    project,
    user: {
      admin: true,
      id: '1',
      login: 'zooAdmin'
    }
  }
  applySnapshot(InBeta.store, snapshot)
  return (
    <Provider store={InBeta.store}>
      <ProjectHeader />
    </Provider>
  )
}
InBeta.store = initStore(true)
InBeta.args = {
  adminMode: false,
  className: '',
  project: {
    avatar: {
      src: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg'
    },
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg'
    },
    beta_approved: true,
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

export function LaunchApproved({ adminMode, className, project }) {
  const snapshot = {
    project,
    user: {
      admin: true,
      id: '1',
      login: 'zooAdmin'
    }
  }
  applySnapshot(LaunchApproved.store, snapshot)
  return (
    <Provider store={LaunchApproved.store}>
      <ProjectHeader />
    </Provider>
  )
}
LaunchApproved.store = initStore(true)
LaunchApproved.args = {
  adminMode: false,
  className: '',
  project: {
    avatar: {
      src: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg'
    },
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg'
    },
    beta_approved: true,
    configuration: {
      languages: ['en']
    },
    launch_approved: true,
    slug: 'zooniverse/snapshot-serengeti',
    strings: {
      display_name: 'Snapshot Serengeti'
    },
    links: {
      active_workflows: ['1']
    }
  }
}

export function AdminMode({ adminMode, className, project }) {
  const snapshot = {
    project,
    user: {
      admin: true,
      id: '1',
      login: 'zooAdmin'
    }
  }
  applySnapshot(AdminMode.store, snapshot)
  return (
    <Provider store={AdminMode.store}>
      <ProjectHeader adminMode={adminMode} className={className} />
    </Provider>
  )
}
AdminMode.store = initStore(true)
AdminMode.args = {
  adminMode: true,
  className: '',
  project: {
    avatar: {
      src: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg'
    },
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg'
    },
    configuration: {
      languages: ['en']
    },
    slug: 'zooniverse/snapshot-serengeti',
    strings: {
      display_name: 'Snapshot Serengeti'
    },
    links: {
      active_workflows: ['1']
    }
  }
}

export function DefaultWorkflow({ adminMode, className, project }) {
  const snapshot = {
    project,
    user: {
      admin: true,
      id: '1',
      login: 'zooAdmin'
    }
  }
  applySnapshot(DefaultWorkflow.store, snapshot)
  return (
    <Provider store={DefaultWorkflow.store}>
      <ProjectHeader adminMode={adminMode} className={className} />
    </Provider>
  )
}
DefaultWorkflow.store = initStore(true)
DefaultWorkflow.args = {
  adminMode: false,
  className: '',
  project: {
    avatar: {
      src: 'https://panoptes-uploads.zooniverse.org/project_avatar/442e8392-6c46-4481-8ba3-11c6613fba56.jpeg'
    },
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/project_background/7a3c6210-f97d-4f40-9ab4-8da30772ee01.jpeg'
    },
    configuration: {
      languages: ['en']
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

export function MultipleLanguages({ adminMode, className, project }) {
  const snapshot = {
    project,
    user: {
      admin: true,
      id: '1',
      login: 'zooAdmin'
    }
  }
  applySnapshot(MultipleLanguages.store, snapshot)
  return (
    <RouterContext.Provider value={mockRouter}>
      <Provider store={MultipleLanguages.store}>
        <ProjectHeader />
      </Provider>
    </RouterContext.Provider>
  )
}
MultipleLanguages.store = initStore(true)
MultipleLanguages.args = {
  adminMode: false,
  className: '',
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

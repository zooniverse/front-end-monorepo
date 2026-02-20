import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import initStore from '@stores'
import ProjectHeader from './ProjectHeader'

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

const ORGANIZATION = {
  id: '1',
  listed: true,
  slug: 'zooniverse/snapshot-safari',
  strings: {
    title: 'Snapshot Safari'
  }
}

export default {
  title: 'Project App / Shared / Project Header',
  component: ProjectHeader,
  decorators: [NextRouterStory]
}

export function NotLoggedIn({ className, project }) {
  const snapshot = {
    project
  }
  applySnapshot(NotLoggedIn.store, snapshot)
  return (
    <Provider store={NotLoggedIn.store}>
      <ProjectHeader className={className} />
    </Provider>
  )
}
NotLoggedIn.store = initStore(true)
NotLoggedIn.args = {
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

export function LoggedIn({ className, project }) {
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
      <ProjectHeader className={className} />
    </Provider>
  )
}
LoggedIn.store = initStore(true)
LoggedIn.args = {
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

export function InBeta({ className, project }) {
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

export function LaunchApproved({ className, project }) {
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

export function AdminMode({ className, project }) {
  const snapshot = {
    project,
    user: {
      admin: true,
      id: '1',
      login: 'zooAdmin'
    }
  }
  applySnapshot(AdminMode.store, snapshot)
  AdminMode.store.user.setAdminMode(true)
  return (
    <Provider store={AdminMode.store}>
      <ProjectHeader className={className} />
    </Provider>
  )
}
AdminMode.store = initStore(true)
AdminMode.args = {
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

export function DefaultWorkflow({ className, project }) {
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
      <ProjectHeader className={className} />
    </Provider>
  )
}
DefaultWorkflow.store = initStore(true)
DefaultWorkflow.args = {
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

export function MultipleLanguages({ className, project }) {
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

export function OrganizationLink({ organization, project }) {
  const snapshot = {
    organization,
    project
  }
  applySnapshot(OrganizationLink.store, snapshot)
  return (
    <RouterContext.Provider value={mockRouter}>
      <Provider store={OrganizationLink.store}>
        <ProjectHeader />
      </Provider>
    </RouterContext.Provider>
  )
}
OrganizationLink.store = initStore(true)
OrganizationLink.args = {
  className: '',
  organization: ORGANIZATION,
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

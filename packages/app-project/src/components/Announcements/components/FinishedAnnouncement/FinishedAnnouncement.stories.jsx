import { Provider } from 'mobx-react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import FinishedAnnouncementConnector from './FinishedAnnouncementConnector'

const mockedRouter = {
  asPath: '/projects/zookeeper/galaxy-zoo/about/team',
  basePath: '/projects',
  query: {
    owner: 'zookeeper',
    project: 'galaxy-zoo'
  }
}

function NextRouterStory(Story) {
  return (
    <RouterContext.Provider value={mockedRouter}>
      <Story />
    </RouterContext.Provider>
  )
}

const mockStore = {
  project: {
    hasResultsPage: true,
    isComplete: true,
    slug: 'zookeeper/galaxy-zoo'
  }
}

export default {
  title: 'Project App / Screens / Project Home / Announcements / FinishedAnnouncement',
  component: FinishedAnnouncementConnector,
  decorators: [NextRouterStory]
}

export const Default = () => (
  <Provider store={mockStore}>
    <FinishedAnnouncementConnector />
  </Provider>
)

const mockStoreNoResults = {
  project: {
    hasResultsPage: false,
    isComplete: true,
    slug: 'zookeeper/galaxy-zoo'
  }
}

export const WithoutResultsPage = () => (
  <Provider store={mockStoreNoResults}>
    <FinishedAnnouncementConnector />
  </Provider>
)

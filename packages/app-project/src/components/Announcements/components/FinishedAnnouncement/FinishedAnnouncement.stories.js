import { Provider } from 'mobx-react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import FinishedAnnouncementConnector from './FinishedAnnouncementConnector'
// import readme from './README.md'

const mockedRouter = {
  asPath: '/zookeeper/galaxy-zoo/about/team',
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
    baseUrl: '/projects/zookeeper/galaxy-zoo',
    hasResultsPage: true,
    isComplete: true
  }
}

export default {
  title: 'Project App / Screens / Project Home / Announcements / FinishedAnnouncement',
  component: FinishedAnnouncementConnector,
  decorators: [NextRouterStory]
  // parameters: {
  //   docs: {
  //     description: {
  //       component: readme
  //     }
  //   }
  // }
}

export const Default = () => (
  <Provider store={mockStore}>
    <FinishedAnnouncementConnector />
  </Provider>
)

const mockStoreNoResults = {
  project: {
    baseUrl: '/projects/zookeeper/galaxy-zoo',
    hasResultsPage: false,
    isComplete: true
  }
}

export const WithoutResultsPage = () => (
  <Provider store={mockStoreNoResults}>
    <FinishedAnnouncementConnector />
  </Provider>
)

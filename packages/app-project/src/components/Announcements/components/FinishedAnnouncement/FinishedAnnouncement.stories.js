import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'

import FinishedAnnouncementConnector from './FinishedAnnouncementConnector'
import readme from './README.md'

const mockStore = {
  project: {
    baseUrl: '/projects/zookeeper/galaxy-zoo',
    isComplete: true
  }
}

export default {
  title:
    'Project App / Screens / Project Home / Announcements / FinishedAnnouncement',
  component: FinishedAnnouncementConnector,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = () => (
  <Provider store={mockStore}>
    <Grommet theme={zooTheme}>
      <FinishedAnnouncementConnector />
    </Grommet>
  </Provider>
)

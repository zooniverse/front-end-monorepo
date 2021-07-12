import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'

import ProjectAnnouncementConnector from './ProjectAnnouncementConnector'
import readme from './README.md'

const ANNOUNCEMENT = 'Neque magnis massa cum elementum dignissim nibh congue facilisis suscipit dictumst, porta hac porttitor praesent purus velit nullam nascetur eu ultricies libero, ipsum viverra molestie orci mollis faucibus habitant a placerat.'

const mockStore = {
  project: {
    configuration: {
      announcement: ANNOUNCEMENT
    }
  },
  ui: {
    dismissProjectAnnouncementBanner: () => {},
    showAnnouncement: true
  }
}

storiesOf('Project App / Screens / Project Home / Announcements / ProjectAnnouncement', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Provider store={mockStore}>
      <Grommet theme={zooTheme}>
        <ProjectAnnouncementConnector />
      </Grommet>
    </Provider>
  ), {
    notes: {
      markdown: readme
    }
  })

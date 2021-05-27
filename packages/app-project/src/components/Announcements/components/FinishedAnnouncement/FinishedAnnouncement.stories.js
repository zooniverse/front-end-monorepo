import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import React from 'react'

import FinishedAnnouncementConnector from './FinishedAnnouncementConnector'
import readme from './README.md'

const mockStore = {
  project: {
    baseUrl: '/projects/zookeeper/galaxy-zoo',
    isComplete: true
  }
}

storiesOf('Project App / Screens / Project Home / Announcements / FinishedAnnouncement', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Provider store={mockStore}>
      <Grommet theme={zooTheme}>
        <FinishedAnnouncementConnector />
      </Grommet>
    </Provider>
  ), {
    notes: {
      markdown: readme
    }
  })

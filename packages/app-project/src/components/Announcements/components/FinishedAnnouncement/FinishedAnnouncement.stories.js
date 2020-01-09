import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import { FinishedAnnouncementContainer } from './FinishedAnnouncementContainer'
// import readme from './README.md'

storiesOf('Project App / Screens / Project Home / Announcements / FinishedAnnouncement', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Grommet theme={zooTheme}>
      <FinishedAnnouncementContainer
        baseUrl='/projects/zookeeper/galaxy-zoo'
        isVisible
        theme={zooTheme}
      />
    </Grommet>
  ))

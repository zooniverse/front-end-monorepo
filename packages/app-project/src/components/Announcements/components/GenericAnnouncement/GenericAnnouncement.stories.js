import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import GenericAnnouncement from './GenericAnnouncement'
import readme from './README.md'

const ANNOUNCEMENT =
  'Neque magnis massa cum elementum dignissim nibh congue facilisis suscipit dictumst, porta hac porttitor praesent purus velit nullam nascetur eu ultricies libero, ipsum viverra molestie orci mollis faucibus habitant a placerat.'

export default {
  title:
    'Project App / Screens / Project Home / Announcements / GenericAnnouncement',
  component: GenericAnnouncement,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = () => (
  <Grommet theme={zooTheme}>
    <GenericAnnouncement
      announcement={ANNOUNCEMENT}
      color='neutral-2'
      dismissable={false}
    />
  </Grommet>
)

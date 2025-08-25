import TalkLinkComponent from './TalkLink'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

export default {
  title: 'Project App / Shared / Talk Link',
  component: TalkLinkComponent,
}

export const TalkLink = () => (
  <Grommet theme={zooTheme}>
    <TalkLinkComponent href='/project/slug/talk/1234' />
  </Grommet>
)

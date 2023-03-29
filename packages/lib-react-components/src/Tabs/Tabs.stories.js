import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Key } from 'grommet-icons'

import Tabs from './Tabs'
import Tab from '../Tab'
import readme from './README.md'

const config = {
  docs: {
    description: {
      component: readme
    }
  }
}

export default {
  title: 'Components / Tabs',
  component: Tabs,
  args: {
    dark: false
  },
  parameters: config
}

const ComplexTitle = () => (
  <span>
    <Key size='small' a11yTitle='Restricted Section:' />
    &nbsp;
    <span>Members Only</span>
  </span>
)

export const Default = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <Tabs>
      <Tab title='one'>One</Tab>
      <Tab title='two'>Two</Tab>
      <Tab title='three'>Three</Tab>
      <Tab title={<ComplexTitle />}>Tab with complex title (tab header)</Tab>
    </Tabs>
  </Grommet>
)

import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Add } from 'grommet-icons'

import MetaToolsButton from './'
import readme from './README.md'

const config = {
  docs: {
    description: {
      component: readme
    }
  }
}

export default {
  title: 'Components / MetaToolsButton',
  component: MetaToolsButton,
  args: {
    dark: false
  },
  parameters: config
}

export const Default = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <MetaToolsButton disabled={false} icon={<Add size='small' />} text='Add' />
  </Grommet>
)

export const AsLink = ({ dark }) => (
  <Grommet
    background={{
      dark: 'dark-1',
      light: 'light-1'
    }}
    theme={zooTheme}
    themeMode={dark ? 'dark' : 'light'}
  >
    <MetaToolsButton
      disabled={false}
      href='/mypage'
      icon={<Add size='small' />}
      text='Add'
    />
  </Grommet>
)

import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { useState } from 'react'

import ZooFooter from './ZooFooter'
import readme from './README.md'
import AdminCheckbox from '../AdminCheckbox'

const config = {
  docs: {
    description: {
      component: readme
    }
  }
}

export default {
  title: 'Components / ZooFooter',
  component: ZooFooter,
  args: {
    dark: false
  }
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
    <Box fill>
      <ZooFooter />
    </Box>
  </Grommet>
)

Default.story = {
  parameters: config
}

export const WithAdmin = ({ dark }) => {
  const [checked, setChecked] = useState(false)
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box fill>
        <ZooFooter
          adminContainer={
            <AdminCheckbox checked={checked} onChange={() => setChecked(!checked)} />
          }
        />
      </Box>
    </Grommet>
  )
}

WithAdmin.story = {
  parameters: config
}

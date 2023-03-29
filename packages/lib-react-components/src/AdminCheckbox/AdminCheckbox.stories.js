import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { useState } from 'react'

import AdminCheckbox from './AdminCheckbox'

export default {
  title: 'Components/AdminCheckbox',
  component: AdminCheckbox,
  args: {
    dark: false
  }
}

export const Default = ({ dark }) => {
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
      <Box align='center' justify='center' height='medium'>
        <AdminCheckbox checked={checked} onChange={() => setChecked(!checked)} />
      </Box>
    </Grommet>
  )
}

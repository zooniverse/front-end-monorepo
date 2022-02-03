import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import ZoomOutButton from './ZoomOutButton'

const args = {
  dark: false,
  onClick: () => console.log('clicked')
}

export default {
  title: 'Image Toolbar / ZoomOutButton',
  component: ZoomOutButton,
  args
}

export function Default({ dark, onClick }) {
  const theme = { ...zooTheme, dark }
  return (
    <Box width='72px'>
      <Grommet
        background={{
          dark: 'dark-3',
          light: 'white'
        }}
        theme={theme}
        themeMode={dark ? 'dark' : 'light'}
      >
        <Box pad='12px'>
          <ZoomOutButton onClick={onClick} />
        </Box>
      </Grommet>
    </Box>
  )
}

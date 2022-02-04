import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import ZoomInButton from './ZoomInButton'

export default {
  title: 'Image Toolbar / ZoomInButton',
  component: ZoomInButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  dark: false
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
          <ZoomInButton onClick={onClick} />
        </Box>
      </Grommet>
    </Box>
  )
}

import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import InvertButton from './InvertButton'

const args = {
  dark: false,
  disabled: false
}

export default {
  title: 'Image Toolbar / InvertButton',
  component: InvertButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  args
}

export function Default({ dark, disabled, onClick }) {
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
          <InvertButton disabled={disabled} onClick={onClick} />
        </Box>
      </Grommet>
    </Box>
  )
}

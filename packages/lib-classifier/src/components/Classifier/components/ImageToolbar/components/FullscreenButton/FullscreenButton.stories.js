import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import FullscreenButton from './FullscreenButton'

const args = {
  dark: false,
  active: false,
  disabled: false
}

export default {
  title: 'Image Toolbar / FullscreenButton',
  component: FullscreenButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  args
}

export function Default({ dark, active, disabled, onClick }) {
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
          <FullscreenButton
            active={active}
            disabled={disabled}
            onClick={onClick}
          />
        </Box>
      </Grommet>
    </Box>
  )
}

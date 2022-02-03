import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import MoveButton from './MoveButton'

const args = {
  dark: false,
  active: false,
  onClick: () => console.log('clicked')
}

export default {
  title: 'Image Toolbar / MoveButton',
  component: MoveButton,
  args
}

export function Default({ dark, active, onClick }) {
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
          <MoveButton active={active} onClick={onClick} />
        </Box>
      </Grommet>
    </Box>
  )
}

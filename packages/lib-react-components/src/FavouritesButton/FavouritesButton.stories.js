import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import React from 'react'
import readme from './README.md'

import FavouritesButton from './'

const CAT = {
  favorite: false,
  id: '123',
  locations: [
    {
      'image/jpeg':
        'https://panoptes-uploads.zooniverse.org/335/0/2d63944e-f0bc-4fc5-8531-f603886513a1.jpeg'
    }
  ]
}

export default {
  title: 'Components/FavouritesButton',
  component: FavouritesButton,
  args: {
    dark: false,
    disabled: false,
    subject: CAT
  },
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  notes: {
    markdown: readme
  }
}

export function Default({ dark, disabled, onClick, subject }) {
  const theme = { ...zooTheme, dark }
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={theme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box align='center' justify='center' height='medium'>
        <FavouritesButton
          disabled={disabled}
          onClick={onClick}
          subject={subject}
        />
      </Box>
    </Grommet>
  )
}

import { Box, Grommet } from 'grommet'
import React from 'react'

import zooTheme from '@zooniverse/grommet-theme'

import SingleTextViewer from './SingleTextViewer'

const content = 'Herbarium of the University of North Carolina\nSOUTH CAROLINA\nCharleston County\nGnaphalium peregrinum Fern,\nrailroad right-of-way, Johns Island Station on\nCounty Rt. 20 (wes t of Charleston.\nHarry E. Ahles 22002 April 2, 1957\nwith John G. Haesloop\nCollected for the “Flora of the Carolinas"'

export default {
  title: 'Subject Viewers / SingleTextViewer',
  component: SingleTextViewer,
  args: {
    content
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

const background = {
  dark: 'dark-1',
  light: 'light-1'
}

export const LightTheme = ({ content }) => {
  return (
    <Grommet
      background={background}
      theme={zooTheme}
      themeMode='light'
    >
      <Box height='500px' width='large'>
        <SingleTextViewer content={content} />
      </Box>
    </Grommet>
  )
}

export const DarkTheme = ({ content }) => {
  return (
    <Grommet
      background={background}
      theme={zooTheme}
      themeMode='dark'
    >
      <Box height='500px' width='large'>
        <SingleTextViewer content={content} />
      </Box>
    </Grommet>
  )
}

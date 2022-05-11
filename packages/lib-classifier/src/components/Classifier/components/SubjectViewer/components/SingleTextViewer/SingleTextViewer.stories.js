import { Box, Grommet } from 'grommet'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

import SingleTextViewer from './SingleTextViewer'

const content = 'Herbarium of the University of North Carolina\nSOUTH CAROLINA\nCharleston County\nGnaphalium peregrinum Fern,\nrailroad right-of-way, Johns Island Station on\nCounty Rt. 20 (wes t of Charleston.\nHarry E. Ahles 22002 April 2, 1957\nwith John G. Haesloop\nCollected for the “Flora of the Carolinas"'

export default {
  title: 'Subject Viewers / SingleTextViewer',
  component: SingleTextViewer,
  args: {
    content,
    dark: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Default ({ content, dark }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box height='500px' width='large'>
        <SingleTextViewer content={content} />
      </Box>
    </Grommet>
  )
}

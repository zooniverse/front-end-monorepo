import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import { withKnobs, number } from '@storybook/addon-knobs'
import setupMock from './helpers/setupMock'
import ConsensusPopup from './ConsensusPopup'

const config = {}
const completedLines = setupMock()
const stories = storiesOf('Drawing Tools | TranscribedLines/ConsensusPopup', module)
stories.addDecorator(withKnobs)

function ConsensusPopupStory (props) {
  const { dark = false, index = 0 } = props

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark)? 'dark' : 'light'}
    >
      <Box width='1000px'>
        <ConsensusPopup active line={completedLines[index]} />
      </Box>
    </Grommet>
  )
}

stories
  .add('default', () => (
    <ConsensusPopupStory
      index={number('Completed lines index', 0, { min: 0, max: 12 })}
    />
  ), config)
  .add('dark theme', () => (
    <ConsensusPopupStory
      dark
      index={number('Completed lines index', 0, { min: 0, max: 10 })}
    />
  ), config)
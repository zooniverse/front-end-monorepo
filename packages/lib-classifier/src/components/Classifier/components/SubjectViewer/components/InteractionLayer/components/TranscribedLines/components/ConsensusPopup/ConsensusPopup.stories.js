import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import setupMock from './helpers/setupMock'
import ConsensusPopup from './ConsensusPopup'

const completedLines = setupMock()

export default {
  title: 'Drawing Tools / TranscribedLines/ConsensusPopup',
  component: ConsensusPopup,
  parameters: {
    docs: {
      inlineStories: false
    }
  }
}

function ConsensusPopupStory(props) {
  const { dark = false, index = 0 } = props

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={{ ...zooTheme, dark }}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box width='1000px'>
        <ConsensusPopup active line={completedLines[index]} />
      </Box>
    </Grommet>
  )
}

export function Default() {
  return (
    <ConsensusPopupStory />
  )
}

export function DarkTheme() {
  return (
    <ConsensusPopupStory
      dark
    />
  )
}

import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import HidePreviousTranscriptionsButton from './HidePreviousTranscriptionsButton'

const args = {
  dark: false,
  disabled: false
}

export default {
  title: 'Meta Tools / HidePreviousTranscriptionButton',
  component: HidePreviousTranscriptionsButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  args
}

export function ShowAllMarks({ dark, disabled, onClick, shownMarks = 'ALL' }) {
  const theme = { ...zooTheme, dark }
  return (
    <Grommet
      background={{
        dark: 'dark-3',
        light: 'white'
      }}
      theme={theme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box pad='12px'>
        <HidePreviousTranscriptionsButton
          disabled={disabled}
          onClick={onClick}
          shownMarks={shownMarks}
        />
      </Box>
    </Grommet>
  )
}

export function ShowYourMarks({ dark, disabled, onClick, shownMarks = 'USER' }) {
  const theme = { ...zooTheme, dark }
  return (
    <Grommet
      background={{
        dark: 'dark-3',
        light: 'white'
      }}
      theme={theme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box pad='12px'>
        <HidePreviousTranscriptionsButton
          disabled={disabled}
          onClick={onClick}
          shownMarks={shownMarks}
        />
      </Box>
    </Grommet>
  )
}



export function HideAllMarks({ dark, disabled, onClick, shownMarks = 'NONE' }) {
  const theme = { ...zooTheme, dark }
  return (
    <Grommet
      background={{
        dark: 'dark-3',
        light: 'white'
      }}
      theme={theme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box pad='12px'>
        <HidePreviousTranscriptionsButton
          disabled={disabled}
          onClick={onClick}
          shownMarks={shownMarks}
        />
      </Box>
    </Grommet>
  )
}

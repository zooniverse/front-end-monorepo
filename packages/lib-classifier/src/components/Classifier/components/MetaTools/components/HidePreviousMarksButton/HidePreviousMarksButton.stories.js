import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import HidePreviousMarksButton from './HidePreviousMarksButton'

const args = {
  dark: false,
  disabled: false
}

export default {
  title: 'Meta Tools / HidePreviousMarksButton',
  component: HidePreviousMarksButton,
  argTypes: {
    onClick: {
      action: 'clicked'
    }
  },
  args
}

export function MarksAreShown({ dark, disabled, onClick, shownMarks = 'ALL' }) {
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
        <HidePreviousMarksButton
          disabled={disabled}
          onClick={onClick}
          shownMarks={shownMarks}
        />
      </Box>
    </Grommet>
  )
}


export function MarksAreHidden({ dark, disabled, onClick, shownMarks = 'NONE' }) {
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
        <HidePreviousMarksButton
          disabled={disabled}
          onClick={onClick}
          shownMarks={shownMarks}
        />
      </Box>
    </Grommet>
  )
}

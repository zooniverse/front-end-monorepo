import { Box } from 'grommet'
import HidePreviousTranscriptionsButton from './HidePreviousTranscriptionsButton'

const args = {
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

export function ShowAllMarks({ disabled, onClick, shownMarks = 'ALL' }) {
  return (
    <Box pad='12px'>
      <HidePreviousTranscriptionsButton
        disabled={disabled}
        onClick={onClick}
        shownMarks={shownMarks}
      />
    </Box>
  )
}

export function ShowYourMarks({ disabled, onClick, shownMarks = 'USER' }) {
  return (
    <Box pad='12px'>
      <HidePreviousTranscriptionsButton
        disabled={disabled}
        onClick={onClick}
        shownMarks={shownMarks}
      />
    </Box>
  )
}

export function HideAllMarks({ disabled, onClick, shownMarks = 'NONE' }) {
  return (
    <Box pad='12px'>
      <HidePreviousTranscriptionsButton
        disabled={disabled}
        onClick={onClick}
        shownMarks={shownMarks}
      />
    </Box>
  )
}

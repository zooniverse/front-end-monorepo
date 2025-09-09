import { Box } from 'grommet'
import HidePreviousMarksButton from './HidePreviousMarksButton'

const args = {
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

export function MarksAreShown({ disabled, onClick, shownMarks = 'ALL' }) {
  return (
    <Box pad='12px'>
      <HidePreviousMarksButton
        disabled={disabled}
        onClick={onClick}
        shownMarks={shownMarks}
      />
    </Box>
  )
}

export function MarksAreHidden({ disabled, onClick, shownMarks = 'NONE' }) {
  return (
    <Box pad='12px'>
      <HidePreviousMarksButton
        disabled={disabled}
        onClick={onClick}
        shownMarks={shownMarks}
      />
    </Box>
  )
}

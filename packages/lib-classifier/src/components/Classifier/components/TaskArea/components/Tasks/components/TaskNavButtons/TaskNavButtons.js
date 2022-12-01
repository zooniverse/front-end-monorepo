import PropTypes from 'prop-types'
import { Box } from 'grommet'

import NextButton from './components/NextButton'
import DoneButton from './components/DoneButton'
import DoneAndTalkButton from './components/DoneAndTalkButton'
import BackButton from './components/BackButton'
import ExpertOptions from './components/ExpertOptions'

export default function TaskNavButtons({
  disabled = false
}) {
  return (
    <Box direction='row'>
      <BackButton />
      <NextButton
        autoFocus={false}
        disabled={disabled}
      />
      <DoneAndTalkButton
        flex='grow'
        disabled={disabled}
      />
      <DoneButton
        flex='grow'
        disabled={disabled}
      />
      <ExpertOptions />
    </Box>
  )
}

TaskNavButtons.propTypes = {
  disabled: PropTypes.bool
}

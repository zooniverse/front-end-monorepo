import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { useState } from 'react'

import NextButton from './components/NextButton'
import DoneButton from './components/DoneButton'
import DoneAndTalkButton from './components/DoneAndTalkButton'
import BackButton from './components/BackButton'
import ExpertOptions from './components/ExpertOptions'

export default function TaskNavButtons({
  disabled = false
}) {
  const [saving, setSaving] = useState(false)

  return (
    <Box
      direction='row'
      justify='center'
    >
      <BackButton />
      <NextButton
        autoFocus={false}
        disabled={disabled}
      />
      <DoneAndTalkButton
        flex='grow'
        disabled={disabled || saving}
        setSaving={setSaving}
      />
      <DoneButton
        flex='grow'
        disabled={disabled || saving}
        setSaving={setSaving}
      />
      <ExpertOptions />
    </Box>
  )
}

TaskNavButtons.propTypes = {
  disabled: PropTypes.bool
}

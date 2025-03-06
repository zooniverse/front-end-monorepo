import { bool } from 'prop-types'
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
      gap='1ch'
    >
      <BackButton />
      <NextButton
        autoFocus={false}
        disabled={disabled}
      />
      <DoneAndTalkButton
        disabled={disabled || saving}
        setSaving={setSaving}
      />
      <DoneButton
        disabled={disabled || saving}
        setSaving={setSaving}
      />
      <ExpertOptions />
    </Box>
  )
}

TaskNavButtons.propTypes = {
  disabled: bool
}

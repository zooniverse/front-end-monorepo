import { bool } from 'prop-types'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { useStores } from '@hooks'

import NextButton from './components/NextButton'
import DoneButton from './components/DoneButton'
import DoneAndTalkButton from './components/DoneAndTalkButton'
import SGVDoneAndTalkButton from './components/SGVDoneAndTalkButton'
import BackButton from './components/BackButton'
import ExpertOptions from './components/ExpertOptions'

function storeMapper(classifierStore) {
  const subjectViewer = classifierStore.workflows?.active?.configuration?.subject_viewer
  return {
    isSubjectGroupViewer: subjectViewer === 'subjectGroup'
  }
}

function TaskNavButtons({ disabled = false }) {
  const [saving, setSaving] = useState(false)
  const { isSubjectGroupViewer } = useStores(storeMapper)

  return (
    <Box direction='row' justify='center'>
      <BackButton />
      <NextButton disabled={disabled} />
      {isSubjectGroupViewer ? (
        <SGVDoneAndTalkButton disabled={disabled || saving} setSaving={setSaving} />
      ) : (
        <DoneAndTalkButton disabled={disabled || saving} setSaving={setSaving} />
      )}
      <DoneButton disabled={disabled || saving} setSaving={setSaving} />
      <ExpertOptions />
    </Box>
  )
}

TaskNavButtons.propTypes = {
  disabled: bool
}

export default observer(TaskNavButtons)

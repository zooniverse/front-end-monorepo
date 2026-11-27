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
    hasUnsupportedTasks: classifierStore.workflowSteps.hasUnsupportedTasks,
    isSubjectGroupViewer: subjectViewer === 'subjectGroup'
  }
}

function TaskNavButtons({ disabled = false }) {
  const [saving, setSaving] = useState(false)
  const { hasUnsupportedTasks, isSubjectGroupViewer } = useStores(storeMapper)
  const doneDisabled = disabled || saving || hasUnsupportedTasks

  return (
    <Box direction='row' justify='center'>
      <BackButton />
      <NextButton disabled={disabled} />
      {isSubjectGroupViewer ? (
        <SGVDoneAndTalkButton disabled={doneDisabled} setSaving={setSaving} />
      ) : (
        <DoneAndTalkButton disabled={doneDisabled} setSaving={setSaving} />
      )}
      <DoneButton disabled={doneDisabled} setSaving={setSaving} />
      <ExpertOptions />
    </Box>
  )
}

TaskNavButtons.propTypes = {
  disabled: bool
}

export default observer(TaskNavButtons)

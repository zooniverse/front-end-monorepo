import { tryReference } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'
import { withStores } from '@helpers'
import getViewer from './helpers/getViewer'
import SubTaskPopup from './components/SubTaskPopup'

function storeMapper(classifierStore) {
  const {
    subjects: { active: subject, loadingState: subjectQueueState },
    subjectViewer: { onSubjectReady, onError, loadingState: subjectReadyState },
  } = classifierStore

  const drawingTasks = classifierStore?.workflowSteps.findTasksByType('drawing')
  const transcriptionTasks = classifierStore?.workflowSteps.findTasksByType('transcription')
  const enableInteractionLayer = drawingTasks.length > 0 || transcriptionTasks.length > 0
  const { activeInteractionTask } = classifierStore.workflowSteps
  const activeMark = tryReference(() => activeInteractionTask?.activeMark)
  const deleteMark = activeInteractionTask?.deleteMark

  return {
    activeMark,
    deleteMark,
    enableInteractionLayer,
    onError,
    onSubjectReady,
    subject,
    subjectQueueState,
    subjectReadyState
  }
}

function SubjectViewer({
  activeMark,
  deleteMark,
  enableInteractionLayer,
  onError,
  onSubjectReady,
  subject,
  subjectQueueState = asyncStates.initialized,
  subjectReadyState
}) {
  const { t } = useTranslation('components')

  switch (subjectQueueState) {
    case asyncStates.initialized: {
      return null
    }
    case asyncStates.loading: {
      return <div>{t('SubjectViewer.loading')}</div>
    }
    case asyncStates.error: {
      console.error('There was an error loading the subjects')
      return null
    }
    case asyncStates.success: {
      const Viewer = getViewer(subject?.viewer)

      if (Viewer) {
        return (
          <>
            <Viewer
              enableInteractionLayer={enableInteractionLayer}
              key={subject.id}
              loadingState={subjectReadyState}
              onError={onError}
              onReady={onSubjectReady}
              subject={subject}
              title={{
                id: 'subject-title',
                text: `Subject ${subject.id}`
              }}
              viewerConfiguration={subject?.viewerConfiguration}
            />
            <SubTaskPopup
              activeMark={activeMark}
              onDelete={deleteMark}
            />
          </>
        )
      }

      return null
    }
  }
}

SubjectViewer.propTypes = {
  subjectQueueState: PropTypes.oneOf(asyncStates.values),
  subject: PropTypes.shape({
    viewer: PropTypes.string
  })
}

export default withStores(SubjectViewer, storeMapper)
export { SubjectViewer }

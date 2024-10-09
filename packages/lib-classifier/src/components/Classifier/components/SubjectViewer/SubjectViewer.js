import { useState } from 'react'
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import { withStores } from '@helpers'
import getViewer from './helpers/getViewer'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject,
      loadingState: subjectQueueState
    },
    subjectViewer: {
      onSubjectReady,
      onError,
      loadingState: subjectReadyState
    }
  } = classifierStore

  const drawingTasks = classifierStore?.workflowSteps.findTasksByType('drawing')
  const transcriptionTasks = classifierStore?.workflowSteps.findTasksByType('transcription')
  const enableInteractionLayer = (drawingTasks.length > 0 || transcriptionTasks.length > 0)

  return {
    enableInteractionLayer,
    onError,
    onSubjectReady,
    subject,
    subjectQueueState,
    subjectReadyState
  }
}

function SubjectViewer({
  enableInteractionLayer,
  onError,
  onSubjectReady,
  subject,
  subjectQueueState = asyncStates.initialized,
  subjectReadyState
}) {
  const { t } = useTranslation('components')
  const [Viewer, setViewer] = useState(null)

  async function loadViewer() {
    setViewer(await getViewer(subject?.viewer))
  }

  switch (subjectQueueState) {
    case asyncStates.initialized: {
      return null
    }
    case asyncStates.loading: {
      return (<div>{t('SubjectViewer.loading')}</div>)
    }
    case asyncStates.error: {
      console.error('There was an error loading the subjects')
      return null
    }
    case asyncStates.success: {
      if (Viewer === null) {
        loadViewer();
      } else if (Viewer) {
        return (
          <Viewer
            enableInteractionLayer={enableInteractionLayer}
            key={subject.id}
            subject={subject}
            loadingState={subjectReadyState}
            onError={onError}
            onReady={onSubjectReady}
            viewerConfiguration={subject?.viewerConfiguration}
          />
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

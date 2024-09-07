import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { useTranslation } from '@translations/i18n'

import { withStores } from '@helpers'
import getViewer from './helpers/getViewer'

function storeMapper(classifierStore) {
  const {
    projects: {
      active: {
        experimental_tools
      }
    },
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
  const projectViewer = (experimental_tools.includes('volumetricViewer'))
    ? 'volumetric'
    : null

  return {
    classifierStore,
    enableInteractionLayer,
    onError,
    onSubjectReady,
    projectViewer,
    subject,
    subjectQueueState,
    subjectReadyState
  }
}

function SubjectViewer({
  classifierStore,
  enableInteractionLayer,
  onError,
  onSubjectReady,
  projectViewer,
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
      return (<div>{t('SubjectViewer.loading')}</div>)
    }
    case asyncStates.error: {
      console.error('There was an error loading the subjects')
      return null
    }
    case asyncStates.success: {
      const Viewer = getViewer(projectViewer ?? subject?.viewer)
      
      if (Viewer) {
        if (!projectViewer) {
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
        } else {
          const subjectUrl = Object.values(subject.locations[0])[2];
          const view = Viewer({ subjectUrl });
          classifierStore.subjects.addViewerModels({ models: view.data.models });
          const Component = view.component;
          
          return (
            <Component {...view.data} />
          )
        }
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

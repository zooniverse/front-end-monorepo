import { useEffect, useState } from 'react';
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
  const projectViewer = (classifierStore?.projects?.active?.experimental_tools?.includes('volumetricViewer'))
    ? 'volumetric'
    : null

  return {
    enableInteractionLayer,
    onError,
    onSubjectReady,
    projectViewer,
    subject,
    subjectViewer: classifierStore?.subjectViewer,
    subjectQueueState,
    subjectReadyState
  }
}

function SubjectViewer({
  enableInteractionLayer,
  onError,
  onSubjectReady,
  projectViewer,
  subject,
  subjectViewer,
  subjectQueueState = asyncStates.initialized,
  subjectReadyState
}) {
  const [Viewer, setViewer] = useState(null);

  useEffect(() => {
    setViewer(null)

    async function loadViewer() {
      const viewer = await getViewer(projectViewer ?? subject?.viewer)

      if (projectViewer === 'volumetric') {
        const subjectUrl = subject?.locations[0].url ?? '';
        const { config, component } = viewer({ subjectUrl });
        setViewer({ Component: component })
        subjectViewer.setConfig(config)
      } else {
        setViewer({ Component: viewer })
      }
    }
    loadViewer()
  }, [subject])

  const { t } = useTranslation('components')

  if (subjectQueueState === asyncStates.loading) {
    return (<div>{t('SubjectViewer.loading')}</div>)
  } else if (subjectQueueState === asyncStates.error) {
    console.error('There was an error loading the subjects')
  } else if (subjectQueueState === asyncStates.success && subject && Viewer?.Component) {
    if (projectViewer === 'volumetric') {
      return (<div data-testid="subject-viewer">
        <Viewer.Component {...subjectViewer.config} />
      </div>)
    } else {
      return (<div data-testid="subject-viewer">
        <Viewer.Component
          enableInteractionLayer={enableInteractionLayer}
          key={subject.id}
          loadingState={subjectReadyState}
          onError={onError}
          onReady={onSubjectReady}
          subject={subject}
          viewerConfiguration={subject?.viewerConfiguration}
        />
      </div>)
    }
  }

  return null
}

SubjectViewer.propTypes = {
  subjectQueueState: PropTypes.oneOf(asyncStates.values),
  subject: PropTypes.shape({
    viewer: PropTypes.string
  })
}

export default withStores(SubjectViewer, storeMapper)
export { SubjectViewer }

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
	const [hasViewer, setHasViewer] = useState(null)
	const [viewer, setViewer] = useState({})

	useEffect(() => {
		delete viewer.Component
		setHasViewer(null)

		async function loadViewer() {
			setTimeout(async () => {
				viewer.Component = await getViewer(subject?.viewer);
				setViewer(viewer)
				setHasViewer(true)
			}, 10);
		}
		loadViewer()
	}, [subject])

	if (subjectQueueState === asyncStates.initialized) {
		return null
	} else if (subjectQueueState === asyncStates.loading) {
    return (<div>{t('SubjectViewer.loading')}</div>)
	} else if (subjectQueueState === asyncStates.error) {
		return null
	} else if (subjectQueueState === asyncStates.success && hasViewer !== null) {
		if (viewer.Component) {
			const Viewer = viewer.Component
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
			return null
		}
	} else {
		return null
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

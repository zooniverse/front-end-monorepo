import asyncStates from '@zooniverse/async-states'
import { lazy, Suspense } from 'react'
import { withStores } from '@helpers'

const VolumetricViewer = lazy(() => import('@zooniverse/subject-viewers/VolumetricViewer'))
const DEFAULT_HANDLER = () => {}

function storeMapper(classifierStore) {
  const {
    classifications: { addAnnotation },
    workflowSteps: { activeStepTasks },
  } = classifierStore

  const activeTask = (activeStepTasks && activeStepTasks.length > 0)
    ? activeStepTasks[0]
    : null;
  
  return {
    activeTask,
    addAnnotation,
  }
}

function VolumetricViewerWrapper({
  activeTask,
  addAnnotation = DEFAULT_HANDLER,
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject,
}) {
  function onAnnotationUpdate(annotations) {
    addAnnotation(activeTask, annotations)
  }

  return <Suspense fallback={<p>Suspense boundary</p>}>
    <VolumetricViewer
      loadingState={loadingState}
      onAnnotation={onAnnotationUpdate}
      onError={onError}
      onReady={onReady}
      subject={subject}
    />
  </Suspense>
}

export default withStores(VolumetricViewerWrapper, storeMapper)
export { VolumetricViewerWrapper }

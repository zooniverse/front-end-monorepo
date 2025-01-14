import asyncStates from '@zooniverse/async-states'
import { lazy, Suspense } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'

const VolumetricViewer = lazy(() => import('@zooniverse/subject-viewers/VolumetricViewer'))
const DEFAULT_HANDLER = () => {}

function VolumetricViewerWrapper({
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject,
}) {
  const stores = useContext(MobXProviderContext)
  const addAnnotation = stores?.classifierStore?.classifications?.addAnnotation ?? DEFAULT_HANDLER
  const activeStepTasks = stores?.classifierStore?.workflowSteps?.activeStepTasks ?? []

  function onAnnotationUpdate(annotations) {
    if (activeStepTasks[0])
      addAnnotation(activeStepTasks[0], annotations)
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

export default VolumetricViewerWrapper

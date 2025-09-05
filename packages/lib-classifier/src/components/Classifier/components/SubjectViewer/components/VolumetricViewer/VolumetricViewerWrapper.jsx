import asyncStates from '@zooniverse/async-states'
import { lazy, Suspense } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'

const DEFAULT_HANDLER = () => {}
const VolumetricViewer = lazy(() => import('@zooniverse/subject-viewers/VolumetricViewer/VolumetricFull'))

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

  const config = {
    loadingState,
    onAnnotation: onAnnotationUpdate,
    onError,
    onReady,
    subject,
  }

  return <Suspense fallback={<p>Loading Volumetric Viewer...</p>}>
    <VolumetricViewer {...config} />
  </Suspense>
}

export default VolumetricViewerWrapper

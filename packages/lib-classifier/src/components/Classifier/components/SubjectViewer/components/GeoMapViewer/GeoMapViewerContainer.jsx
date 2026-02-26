import asyncStates from '@zooniverse/async-states'
import { observer } from 'mobx-react'
import { func } from 'prop-types'
import { useEffect } from 'react'

import { useStores, useSubjectJSON } from '@hooks'
import GeoMapViewer from './GeoMapViewer'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      loadingState
    },
    workflowSteps: {
      activeStepTasks
    }
  } = classifierStore

  const latest = subject?.stepHistory.latest

  return {
    activeStepTasks,
    latest,
    loadingState,
    subject
  }
}

const DEFAULT_HANDLER = () => true

function GeoMapViewerContainer ({
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER
}) {
  const {
    activeStepTasks,
    latest,
    loadingState,
    subject
  } = useStores(storeMapper)
  const {
    data,
    error,
    loading,
    type,
    viewer
  } = useSubjectJSON({
    onError,
    onReady,
    subject
  })
  // Eventually, we will determine the geoJSON data from the subject's location, Caesar reductions, other sources, or a combination thereof.
  // Requesting Caesar reductions might look like something like this:
  // const { data: caesarData, error: caesarError, loading: caesarLoading } = useCaesarReductions({ subjectId: subject.id })
  // For now, we are only loading geoJSON data from the subject JSON data, if applicable.

  let geoJSONData = null
  
  if (data && type?.name === 'GeoJSON') {
    geoJSONData = data
  }

  // Initialize the geoDrawing annotation with GeoJSON data
  useEffect(() => {
    const geoAnnotation = latest?.annotations?.find(annotation => annotation?.taskType === 'geoDrawing')
    if (geoAnnotation && geoJSONData && !geoAnnotation.value) {
      geoAnnotation.update(geoJSONData)
    }
  }, [geoJSONData, latest?.annotations])

  function handleFeaturesChange(updatedFeatureCollection) {
    const geoAnnotation = latest?.annotations?.find(annotation => annotation?.taskType === 'geoDrawing')
    if (geoAnnotation && updatedFeatureCollection) {
      geoAnnotation.update(updatedFeatureCollection)
    }
  }

  function handleSelectedFeatureChange(featureInfo) {
    const geoDrawingTask = activeStepTasks.find(task => task?.type === 'geoDrawing')
    if (!geoDrawingTask) return

    if (featureInfo) {
      geoDrawingTask.setActiveFeature?.(featureInfo.mstFeature)
      geoDrawingTask.setActiveOlFeature?.(featureInfo.olFeature)
    } else {
      geoDrawingTask.clearActiveFeature?.()
      geoDrawingTask.clearActiveOlFeature?.()
    }
  }

  function handleMapExtentChange(extentInfo) {
    const geoDrawingTask = activeStepTasks.find(task => task?.type === 'geoDrawing')
    if (geoDrawingTask) {
      geoDrawingTask.setMapExtent?.(extentInfo)
    }
  }

  if (loadingState === asyncStates.loading || loading) {
    return null
  }
  if (error) {
    return <p>{ error.message }</p>
  }

  const geoDrawingTask = activeStepTasks.find(task => task.type === 'geoDrawing')

  return (
    <GeoMapViewer
      geoDrawingTask={geoDrawingTask}
      geoJSON={geoJSONData}
      subjectId={subject.id}
      onFeaturesChange={handleFeaturesChange}
      onMapExtentChange={handleMapExtentChange}
      onSelectedFeatureChange={handleSelectedFeatureChange}
    />
  )
}

GeoMapViewerContainer.propTypes = {
  onError: func,
  onReady: func
}

export default observer(GeoMapViewerContainer)

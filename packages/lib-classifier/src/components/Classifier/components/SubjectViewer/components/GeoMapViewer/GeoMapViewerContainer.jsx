import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { func } from 'prop-types'
import { useEffect } from 'react'

import { useStores, useSubjectJSON } from '@hooks'
import GeoMapViewer from './GeoMapViewer'
import ReferenceData from './components/ReferenceData'
import {
  DEFAULT_DATA_PROJECTION,
  DEFAULT_FEATURE_PROJECTION
} from './helpers/mapContext'

function storeMapper(classifierStore) {
  const {
    classifications: {
      active: classification
    },
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
    classificationMetadata: classification?.metadata,
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
    classificationMetadata,
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

  let geoJSONData = null
  let referenceData = null
  
  if (data && type?.name === 'GeoJSON') {
    geoJSONData = data
    referenceData = data.reference_data
  }

  // workflow configuration settings could take precedent over the default projections here, but for now just use the defaults
  const dataProjection = DEFAULT_DATA_PROJECTION
  const featureProjection = DEFAULT_FEATURE_PROJECTION

  // Initialize the classification metadata with map context when the subject JSON and metadata are both available
  useEffect(function initializeClassificationMetadataMapContext() {
    if (classificationMetadata && geoJSONData) {
      classificationMetadata.update({
        mapContext: {
          dataProjection,
          featureProjection
        }
      })
    }
  }, [classificationMetadata, dataProjection, featureProjection, geoJSONData])

  // Initialize the geoDrawing annotation with GeoJSON data
  useEffect(function initializeGeoDrawingAnnotation() {
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
    <Box fill>
      {referenceData && <ReferenceData data={referenceData} />}
      <GeoMapViewer
        dataProjection={dataProjection}
        featureProjection={featureProjection}
        geoDrawingTask={geoDrawingTask}
        geoJSON={geoJSONData}
        subjectId={subject.id}
        onFeaturesChange={handleFeaturesChange}
        onMapExtentChange={handleMapExtentChange}
        onSelectedFeatureChange={handleSelectedFeatureChange}
      />
    </Box>
  )
}

GeoMapViewerContainer.propTypes = {
  onError: func,
  onReady: func
}

export default observer(GeoMapViewerContainer)

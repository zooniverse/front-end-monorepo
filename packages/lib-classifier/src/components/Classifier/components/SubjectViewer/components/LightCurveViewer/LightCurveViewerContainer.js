import asyncStates from '@zooniverse/async-states'
import { extent } from 'd3'
import { zip } from 'lodash'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'

import { withStores } from '@helpers'
import withKeyZoom from '../../../withKeyZoom'

import { useJSONData } from '@helpers'
import LightCurveViewer from './LightCurveViewer'
import locationValidator from '../../helpers/locationValidator'

function storeMapper (classifierStore) {
  const {
    subjectViewer: {
      enableAnnotate,
      enableMove,
      interactionMode,
      setOnPan,
      setOnZoom
    },
    classifications: {
      addAnnotation
    },
    workflowSteps: {
      activeStepTasks
    },
    subjects: {
      active: subject
    },
  } = classifierStore

  const [ activeDataVisTask ] = activeStepTasks.filter(task => task?.type === 'dataVisAnnotation')
  const { activeToolIndex } = activeDataVisTask || {}

  let annotation
  const latest = subject?.stepHistory.latest
  if (latest) {
    ([ annotation ] = latest.annotations.filter(annotation => activeDataVisTask && annotation.task === activeDataVisTask.taskKey))
  }

  return {
    activeDataVisTask,
    activeToolIndex,
    addAnnotation,
    annotation,  // dataVisAnnotation
    enableAnnotate,
    enableMove,
    interactionMode,
    setOnPan,
    setOnZoom
  }
}

const defaultSubject = {
  id: '',
  locations: []
}

export function LightCurveViewerContainer({
  activeDataVisTask = undefined,
  activeToolIndex = undefined,
  addAnnotation = () => {},
  annotation = undefined,
  drawFeedbackBrushes = () => {},
  enableAnnotate = () => {},
  enableMove = () => {},
  feedback = false,
  interactionMode = 'annotate',
  onKeyDown = () => {},
  setOnPan = () => {},
  setOnZoom = () => {},
  subject = defaultSubject,
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
}) {
  const viewer = useRef()
  const JSONdata = useJSONData(
    subject, 
    () => onReady(viewer?.current),
    (error) => onError(error)
  )

  let dataExtent = { x: [], y: [] }
  let dataPoints = []
  
  if (JSONdata?.x && JSONdata?.y) {
    dataExtent = {
      x: extent(JSONdata.x),
      y: extent(JSONdata.y)
    }
    dataPoints = zip(JSONdata.x, JSONdata.y)
  }

  if (!subject.id) {
    return null
  }

  return (
    <LightCurveViewer
      addAnnotation={addAnnotation}
      annotation={annotation}
      currentTask={activeDataVisTask}
      dataExtent={dataExtent}
      dataPoints={dataPoints}
      drawFeedbackBrushes={drawFeedbackBrushes}
      enableAnnotate={enableAnnotate}
      enableMove={enableMove}
      feedback={feedback}
      forwardRef={viewer}
      interactionMode={interactionMode}
      onKeyDown={onKeyDown}
      setOnPan={setOnPan}
      setOnZoom={setOnZoom}
      subjectID={subject.id}
      toolIndex={activeToolIndex}
    />
  )
}

LightCurveViewerContainer.propTypes = {
  activeDataVisTask: PropTypes.object,
  activeToolIndex: PropTypes.number,
  addAnnotation: PropTypes.func,
  drawFeedbackBrushes: PropTypes.func,
  enableAnnotate: PropTypes.func,
  enableMove: PropTypes.func,
  feedback: PropTypes.bool,
  interactionMode: PropTypes.oneOf(['annotate', 'move']),
  onKeyDown: PropTypes.func.isRequired,
  setOnPan: PropTypes.func.isRequired,
  setOnZoom: PropTypes.func.isRequired,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  }),

  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
}

export default withKeyZoom(withStores(LightCurveViewerContainer, storeMapper))

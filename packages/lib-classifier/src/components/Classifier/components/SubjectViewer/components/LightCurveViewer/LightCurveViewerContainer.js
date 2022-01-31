import asyncStates from '@zooniverse/async-states'
import * as d3 from 'd3'
import { zip } from 'lodash'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'

import { withStores } from '@helpers'
import withKeyZoom from '../../../withKeyZoom'

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

function getSubjectUrl(subject) {
  // Find the first location that has a JSON MIME type.
  // NOTE: we also temporarily accept plain text, due to quirks with the
  // Panoptes CLI uploading wonky MIME types (@shaun 20181024)
  const jsonLocation = subject.locations.find(l => l['application/json'] || l['text/plain']) || {}
  const url = Object.values(jsonLocation)[0]
  if (url) {
    return url
  } else {
    throw new Error('No JSON url found for this subject')
  }
}

async function requestData(subject) {
  const url = getSubjectUrl(subject)
  const response = await fetch(url)
  if (!response.ok) {
    const error = new Error(response.statusText)
    error.status = response.status
    throw error
  }
  const body = await response.json()
  return body
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
  const [dataExtent, setDataExtent] = useState({ x: [], y: [] })
  const [dataPoints, setDataPoints] = useState([])

  async function onSubjectChange() {
    if (subject) {
      await handleSubject()
    }
  }

  useEffect(() => onSubjectChange(), [subject])

  async function handleSubject() {
    try {
      const rawData = await requestData(subject)
      if (rawData) onLoad(rawData)
    } catch (error) {
      onError(error)
    }
  }

  function onLoad(rawData) {
    const target = viewer.current
    setDataExtent({
        x: d3.extent(rawData.x),
        y: d3.extent(rawData.y)
    })
    setDataPoints(zip(rawData.x, rawData.y))
    onReady(target)
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

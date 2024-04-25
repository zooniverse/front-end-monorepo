import asyncStates from '@zooniverse/async-states'
import { extent } from 'd3-array'
import { Box } from 'grommet'
import { zip } from 'lodash'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useMemo } from 'react';

import { useKeyZoom, useStores } from '@hooks'

import { useSubjectJSON } from '@hooks'
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

const SUBJECT = {
  id: '',
  locations: []
}

export function LightCurveViewerContainer({
  data = null,
  feedback = false,
  feedbackBrushes = []
}) {
  const {
    activeDataVisTask,
    activeToolIndex,
    addAnnotation,
    annotation,  // dataVisAnnotation
    enableAnnotate,
    enableMove,
    interactionMode,
    setOnPan,
    setOnZoom
  } = useStores(storeMapper)
  const { onKeyZoom } = useKeyZoom()

  const { dataExtent, dataPoints } = useMemo(() => {
    let dataExtent = { x: [], y: [] }
    let dataPoints = []

    if (data?.x && data?.y) {
      dataExtent = {
        x: extent(data.x),
        y: extent(data.y)
      }
      dataPoints = zip(data.x, data.y)
    }

    return { dataExtent, dataPoints }
  }, [data])

  if (!data) {
    return null
  }

  return (
    <Box width='100%' height='500px'>
      <LightCurveViewer
        addAnnotation={addAnnotation}
        annotation={annotation}
        currentTask={activeDataVisTask}
        dataExtent={dataExtent}
        dataPoints={dataPoints}
        enableAnnotate={enableAnnotate}
        enableMove={enableMove}
        feedback={feedback}
        feedbackBrushes={feedbackBrushes}
        interactionMode={interactionMode}
        onKeyDown={onKeyZoom}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        toolIndex={activeToolIndex}
      />
    </Box>
  )
}

LightCurveViewerContainer.propTypes = {
  feedback: PropTypes.bool,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  }),

  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
}

export default observer(LightCurveViewerContainer)

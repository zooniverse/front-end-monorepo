import asyncStates from '@zooniverse/async-states'
import * as d3 from 'd3'
import { zip } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import request from 'superagent'
import { inject, observer } from 'mobx-react'
import withKeyZoom from '../../../withKeyZoom'

import LightCurveViewer from './LightCurveViewer'
import locationValidator from '../../helpers/locationValidator'

function storeMapper (stores) {
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
  } = stores.classifierStore

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

class LightCurveViewerContainer extends Component {
  constructor () {
    super()
    this.viewer = React.createRef()
    this.state = {
      dataExtent: {
        x: [],
        y: []
      },
      dataPoints: []
    }
  }

  async componentDidMount () {
    const { subject } = this.props
    if (subject) {
      await this.handleSubject()
    }
  }

  async componentDidUpdate (prevProps) {
    const { subject } = this.props
    const prevSubjectId = prevProps.subject && prevProps.subject.id
    const subjectChanged = subject && (subject.id !== prevSubjectId)

    if (subjectChanged) {
      await this.handleSubject()
    }
  }

  getSubjectUrl () {
    // Find the first location that has a JSON MIME type.
    // NOTE: we also temporarily accept plain text, due to quirks with the
    // Panoptes CLI uploading wonky MIME types (@shaun 20181024)
    const jsonLocation = this.props.subject.locations.find(l => l['application/json'] || l['text/plain']) || {}
    const url = Object.values(jsonLocation)[0]
    if (url) {
      return url
    } else {
      throw new Error('No JSON url found for this subject')
    }
  }

  async requestData () {
    const { onError } = this.props
    try {
      const url = this.getSubjectUrl()
      const response = await request.get(url)

      // Get the JSON data, or (as a failsafe) parse the JSON data if the
      // response is returned as a string
      return response.body || JSON.parse(response.text)
    } catch (error) {
      onError(error)
      return { x: [], y: [] }
    }
  }

  async handleSubject () {
    const { onError } = this.props
    try {
      const rawData = await this.requestData()
      if (rawData) this.onLoad(rawData)
    } catch (error) {
      onError(error)
    }
  }

  onLoad (rawData) {
    const { onReady } = this.props
    const target = this.viewer.current
    this.setState({
      dataExtent: {
        x: d3.extent(rawData.x),
        y: d3.extent(rawData.y)
      },
      dataPoints: zip(rawData.x, rawData.y)
    },
    function () {
      onReady({ target })
    })
  }

  render () {
    const {
      activeDataVisTask,
      activeToolIndex,
      addAnnotation,
      annotation,  // dataVisAnnotation
      drawFeedbackBrushes,
      enableAnnotate,
      enableMove,
      feedback,
      interactionMode,
      onKeyDown,
      setOnPan,
      setOnZoom,
      subject
    } = this.props

    if (!subject.id) {
      return null
    }

    return (
      <LightCurveViewer
        addAnnotation={addAnnotation}
        annotation={annotation}
        currentTask={activeDataVisTask}
        dataExtent={this.state.dataExtent}
        dataPoints={this.state.dataPoints}
        drawFeedbackBrushes={drawFeedbackBrushes}
        enableAnnotate={enableAnnotate}
        enableMove={enableMove}
        feedback={feedback}
        forwardRef={this.viewer}
        interactionMode={interactionMode}
        onKeyDown={onKeyDown}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        toolIndex={activeToolIndex}
      />
    )
  }
}

LightCurveViewerContainer.defaultProps = {
  activeDataVisTask: undefined,
  activeToolIndex: undefined,
  addAnnotation: () => {},
  annotation: undefined,
  drawFeedbackBrushes: () => {},
  enableAnnotate: () => {},
  enableMove: () => {},
  feedback: false,
  interactionMode: 'annotate',
  onKeyDown: () => {},
  setOnPan: () => {},
  setOnZoom: () => {},
  subject: {
    id: '',
    locations: []
  },

  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
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

@inject(storeMapper)
@withKeyZoom
@observer
class DecoratedLightCurveViewerContainer extends LightCurveViewerContainer { }

export default DecoratedLightCurveViewerContainer
export { LightCurveViewerContainer }

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

function storeMapper(stores) {
  const {
    enableAnnotate,
    enableMove,
    interactionMode,
    setOnPan,
    setOnZoom
  } = stores.classifierStore.subjectViewer

  const {
    addAnnotation
  } = stores.classifierStore.classifications
  const annotations = stores.classifierStore.classifications.currentAnnotations

  const currentTask =
    (stores.classifierStore.workflowSteps.activeStepTasks &&
      stores.classifierStore.workflowSteps.activeStepTasks[0]) ||
    {}

  const { active: toolIndex } = stores.classifierStore.dataVisAnnotating

  return {
    addAnnotation,
    annotations,
    currentTask,
    enableAnnotate,
    enableMove,
    interactionMode,
    setOnPan,
    setOnZoom,
    toolIndex
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
      dataPoints: zip(rawData.x, rawData.y),
    },
    function () {
      onReady({ target })
    })
  }

  render () {
    const {
      addAnnotation,
      annotations,
      currentTask,
      drawFeedbackBrushes,
      enableAnnotate,
      enableMove,
      feedback,
      interactionMode,
      onKeyDown,
      setOnPan,
      setOnZoom,
      subject,
      toolIndex,
    } = this.props

    if (!subject.id) {
      return null
    }

    return (
      <LightCurveViewer
        addAnnotation={addAnnotation}
        annotations={annotations}
        currentTask={currentTask}
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
        toolIndex={toolIndex}
      />
    )
  }
}

LightCurveViewerContainer.defaultProps = {
  addAnnotation: () => {},
  drawFeedbackBrushes: () => {},
  interactionMode: 'annotate',
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
  subject: {
    id: '',
    locations: []
  },
}

LightCurveViewerContainer.propTypes = {
  addAnnotation: PropTypes.func,
  drawFeedbackBrushes: PropTypes.func,
  interactionMode: PropTypes.oneOf(['annotate', 'move']),
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onKeyDown: PropTypes.func.isRequired,
  onReady: PropTypes.func,
  setOnPan: PropTypes.func.isRequired,
  setOnZoom: PropTypes.func.isRequired,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  }),
  toolIndex: PropTypes.number
}

@inject(storeMapper)
@withKeyZoom
@observer
class DecoratedLightCurveViewerContainer extends LightCurveViewerContainer { }

export default DecoratedLightCurveViewerContainer
export { LightCurveViewerContainer }

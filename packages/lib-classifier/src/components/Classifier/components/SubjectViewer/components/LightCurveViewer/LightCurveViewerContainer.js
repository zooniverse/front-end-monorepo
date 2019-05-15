import asyncStates from '@zooniverse/async-states'
import * as d3 from 'd3'
import { get, zip } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import request from 'superagent'

import LightCurveViewer from './LightCurveViewer'
import locationValidator from '../../helpers/locationValidator'
import withKeyZoom from '../../../withKeyZoom'

@withKeyZoom
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
    const { onError, subject } = this.props
    if (subject) {
      try {
        await this.handleSubject()
      } catch (error) {
        onError(error)
      }
    }
  }

  async componentDidUpdate (prevProps) {
    const { onError, subject } = this.props
    const prevSubjectId = prevProps.subject && prevProps.subject.id
    const subjectChanged = subject && (subject.id !== prevSubjectId)

    if (subjectChanged) {
      try {
        await this.handleSubject()
      } catch (error) {
        onError(error)
      }
    }
  }

  getSubjectUrl () {
    // Find the first location that has a JSON MIME type.
    // NOTE: we also temporarily accept plain text, due to quirks with the
    // Panoptes CLI uploading wonky MIME types (@shaun 20181024)
    const locations = get(this, 'props.subject.locations', [])
    const jsonLocation = locations.find(l => l['application/json'] || l['text/plain']) || {}
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
      // this.setState({ loading: asyncStates.loading })
      const url = this.getSubjectUrl()
      const response = await request.get(url)
      if (response.ok) {
        // Get the JSON data, or (as a failsafe) parse the JSON data if the
        // response is returned as a string
        return response.body || JSON.parse(response.text)
      }
    } catch (error) {
      onError(error)
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
    const { subject } = this.props
    if (!subject.id) {
      return null
    }

    return (
      <LightCurveViewer
        forwardRef={this.viewer}
        dataExtent={this.state.dataExtent}
        dataPoints={this.state.dataPoints}
        drawFeedbackBrushes={this.props.drawFeedbackBrushes}
        feedback={this.props.feedback}
        onKeyDown={this.props.onKeyDown}
      />
    )
  }
}

LightCurveViewerContainer.wrappedComponent.defaultProps = {
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
  subject: {
    id: '',
    locations: []
  }
}

LightCurveViewerContainer.wrappedComponent.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default LightCurveViewerContainer

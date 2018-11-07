import asyncStates from '@zooniverse/async-states'
import * as d3 from 'd3'
import { get, zip } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import request from 'superagent'

import LightCurveViewer from './LightCurveViewer'
import locationValidator from '../../helpers/locationValidator'

class LightCurveViewerContainer extends Component {
  constructor () {
    super()
    this.state = {
      loading: asyncStates.initialized,
      extent: {
        x: [],
        y: []
      },
      points: []
    }
  }

  componentDidMount () {
    if (this.props.subject) {
      this.handleSubject()
    }
  }

  componentDidUpdate (prevProps) {
    const prevSubject = prevProps.subject.toJSON()
    const subject = this.props.subject.toJSON()
    console.info(prevSubject.id, subject.id)
    if (subject && (!prevSubject || prevSubject.id !== subject.id)) {
      this.handleSubject()
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
    try {
      this.setState({ loading: asyncStates.loading })
      const url = this.getSubjectUrl()
      const response = await request.get(url)
      if (!response.ok) {
        throw new Error('Invalid response')
      } else {
        // Get the JSON data, or (as a failsafe) parse the JSON data if the
        // response is returned as a string
        this.setState({ loading: asyncStates.success })
        return response.body || JSON.parse(response.text)
      }
    } catch (error) {
      this.setState({
        loading: asyncStates.error,
        data: null
      })
      return error
    }
  }

  async handleSubject () {
    try {
      const rawData = await this.requestData()
      this.setState({
        extent: {
          x: d3.extent(rawData.x),
          y: d3.extent(rawData.y)
        },
        points: zip(rawData.x, rawData.y)
      })
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    const { subject } = this.props
    if (!subject) {
      return null
    }

    return (
      <LightCurveViewer
        extent={this.state.extent}
        points={this.state.points}
      />
    )
  }
}

LightCurveViewerContainer.propTypes = {
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

LightCurveViewerContainer.defaultProps = {}

export default LightCurveViewerContainer

import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import request from 'superagent'

import ScatterPlotViewer from './ScatterPlotViewer'
import locationValidator from '../../helpers/locationValidator'

class ScatterPlotViewerContainer extends Component {
  constructor() {
    super()
    this.viewer = React.createRef()

    this.state = {
      JSONData: {
        data: [],
        chartOptions: {}
      }
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
    const jsonLocation = this.props.subject.locations.find(l => l['application/json']) || {}
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
      const responseData = response.body || JSON.parse(response.text)
      if (responseData.data && responseData.chartOptions) {
        return responseData
      } else {
        return { chartOptions: {}, data: responseData }
      }
    } catch (error) {
      onError(error)
      return null
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

  onLoad (JSONData) {
    const { onReady } = this.props
    const target = this.viewer.current
    this.setState({
      JSONData
    },
      function () {
        onReady({ target })
      })
  }

  render() {
    const {
      subject,
      ...rest
    } = this.props

    const { chartOptions, data } = this.state.JSONData

    if (!subject.id) {
      return null
    }

    return (
      <ScatterPlotViewer
        data={data}
        margin={chartOptions?.margin}
        padding={chartOptions?.padding}
        xAxisLabel={chartOptions?.xAxisLabel}
        xAxisLabelOffset={chartOptions?.xAxisLabelOffset}
        yAxisLabel={chartOptions?.yAxisLabel}
        yAxisLabelOffset={chartOptions?.yAxisLabelOffset}
        {...rest}
      />
    )
  }
}

ScatterPlotViewerContainer.defaultProps = {
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
  subject: {
    id: '',
    locations: []
  }
}

ScatterPlotViewerContainer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default ScatterPlotViewerContainer
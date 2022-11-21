import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Box } from 'grommet'
import ScatterPlotViewer from './ScatterPlotViewer'
import locationValidator from '../../helpers/locationValidator'
import { findLocationsByMediaType } from '@helpers'

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
    let jsonLocation = {}
    const { subject } = this.props
    // Find the first location that has a JSON MIME type.
    // do we need to support the text file fallback?
    const locations = findLocationsByMediaType(subject.locations, 'application') || []
    if (locations?.length > 0 && locations[0]) {
      jsonLocation = locations[0]
    }
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
      const response = await fetch(url)
      if (!response.ok) {
        const error = new Error(response.statusText)
        error.status = response.status
        throw error
      }
      const responseData = await response.json()

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
    const viewer = this.viewer.current
    const { width: clientWidth, height: clientHeight } = viewer ? viewer.getBoundingClientRect() : {}
    const target = { clientWidth, clientHeight, naturalWidth: 0, naturalHeight: 0 }

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
      viewerConfiguration,
      ...rest
    } = this.props

    const { chartOptions, data } = this.state.JSONData

    if (!subject.id) {
      return null
    }

    const zoomConfiguration = chartOptions?.zoomConfiguration || viewerConfiguration?.zoomConfiguration

    return (
      <Box ref={this.viewer} width='100%' height='500px'>
        <ScatterPlotViewer
          data={data}
          margin={chartOptions?.margin}
          padding={chartOptions?.padding}
          xAxisLabel={chartOptions?.xAxisLabel}
          xAxisLabelOffset={chartOptions?.xAxisLabelOffset}
          yAxisLabel={chartOptions?.yAxisLabel}
          yAxisLabelOffset={chartOptions?.yAxisLabelOffset}
          zoomConfiguration={zoomConfiguration}
          zooming
          {...rest}
        />
      </Box>
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
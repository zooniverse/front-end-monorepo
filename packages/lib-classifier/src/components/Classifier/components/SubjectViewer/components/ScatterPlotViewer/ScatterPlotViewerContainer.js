import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import request from 'superagent'
import { inject, observer } from 'mobx-react'

import ScatterPlotViewer from './ScatterPlotViewer'
import locationValidator from '../../helpers/locationValidator'

function storeMapper(stores) {
  // TODO connect to get other data / function as needed
}

class ScatterPlotViewerContainer extends Component {
  constructor() {
    super()
    this.viewer = React.createRef()

    this.state = {
      JSONdata: null
    }
  }

  async componentDidMount() {
    const { subject } = this.props
    if (subject) {
      await this.handleSubject()
    }
  }

  async componentDidUpdate(prevProps) {
    const { subject } = this.props
    const prevSubjectId = prevProps.subject && prevProps.subject.id
    const subjectChanged = subject && (subject.id !== prevSubjectId)

    if (subjectChanged) {
      await this.handleSubject()
    }
  }

  getSubjectUrl() {
    // Find the first location that has a JSON MIME type.
    const jsonLocation = this.props.subject.locations.find(l => l['application/json']) || {}
    const url = Object.values(jsonLocation)[0]
    if (url) {
      return url
    } else {
      throw new Error('No JSON url found for this subject')
    }
  }

  async requestData() {
    const { onError } = this.props
    try {
      const url = this.getSubjectUrl()
      const response = await request.get(url)

      // Get the JSON data, or (as a failsafe) parse the JSON data if the
      // response is returned as a string
      return response.body || JSON.parse(response.text)
    } catch (error) {
      onError(error)
      return null
    }
  }

  async handleSubject() {
    const { onError } = this.props
    try {
      const rawData = await this.requestData()
      if (rawData) this.onLoad(rawData)
    } catch (error) {
      onError(error)
    }
  }

  onLoad(JSONdata) {
    const { onReady } = this.props
    const target = this.viewer.current
    this.setState({
      JSONdata
    },
      function () {
        onReady({ target })
      })
  }

  render() {
    const {
      subject
    } = this.props

    if (!subject.id) {
      return null
    }

    return (
      <ScatterPlotViewer
        data={this.state.JSONdata}
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

@inject(storeMapper)
@observer
class DecoratedScatterPlotViewerContainer extends ScatterPlotViewerContainer { }

export default DecoratedScatterPlotViewerContainer
export { ScatterPlotViewerContainer }
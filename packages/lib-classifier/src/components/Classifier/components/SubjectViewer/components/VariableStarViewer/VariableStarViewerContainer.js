import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import request from 'superagent'
import { inject, observer } from 'mobx-react'

import VariableStarViewer from './VariableStarViewer'
import locationValidator from '../../helpers/locationValidator'

function storeMapper(stores) {
  // TODO connect to get other functions
}

class VariableStarViewerContainer extends Component {
  constructor() {
    super()
    this.viewer = React.createRef()
    this.state = {
      barJSON: {
        amplitude: {
          data: [],
          options: {}
        },
        period: {
          data: [],
          options: {}
        }
      },
      focusedSeries: [],
      imageSrc: '',
      invertYAxis: false,
      loadingState: asyncStates.initialized,
      periodMultiple: 1,
      phasedJSON: {
        data: [],
        chartOptions: {}
      },
      rawJSON: {
        data: [],
        chartOptions: {}
      }
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
      const rawJSON = await this.requestData()
      if (rawJSON) this.onLoad(rawJSON)
    } catch (error) {
      onError(error)
    }
  }

  onLoad(rawJSON) {
    const { onReady } = this.props
    const target = this.viewer.current
    const phasedJSON = this.calculatePhase(rawJSON)
    const barJSON = this.calculateBarJSON(rawJSON)
    this.setState({
      barJSON,
      phasedJSON,
      rawJSON
    },
      function () {
        onReady({ target })
      })
  }

  calculatePhase(rawJSON) {
    // TODO
    return {
      data: [],
      chartOptions: {}
    }
  }

  calculateBarJSON(rawJSON) {
    // TODO
    return {
      amplitude: {
        data: [],
        options: {}
      },
      period: {
        data: [],
        options: {}
      }
    }
  }

  calculateJSON() {
    const { rawJSON } = this.state
    const phasedJSON = calculatePhase(rawJSON)
    const barJSON = calculateBarJSON(rawJSON)
    this.setState({
      barJSON,
      phasedJSON
    })
  }

  setPeriodMultiple(multiple) {
    const periodMultiple = parseFloat(multiple)
    this.setState({ periodMultiple }, () => this.calculateJSON())
  }

  setSeriesFocus(seriesToFocus) {
    // TODO add handling
  }

  setYAxisInversion () {
    this.setState((prevState) => { return { invertYAxis: !prevState.invertYAxis } })
  }

  render() {
    const {
      subject,
    } = this.props

    if (!subject.id) {
      return null
    }

    return (
      <VariableStarViewer
        barJSON={this.state.barJSON}
        imageSrc={this.state.imageSrc}
        invertYAxis={this.state.invertYAxis}
        periodMultiple={this.state.periodMultiple}
        phasedJSON={this.state.phasedJSON}
        rawJSON={this.state.rawJSON}
        setPeriodMultiple={this.setPeriodMultiple}
        setSeriesFocus={this.setSeriesFocus}
        setYAxisInversion={this.setYAxisInversion}
      />
    )
  }
}

VariableStarViewerContainer.defaultProps = {
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
  subject: {
    id: '',
    locations: []
  }
}

VariableStarViewerContainer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  })
}

@inject(storeMapper)
@observer
class DecoratedVariableStarViewerContainer extends VariableStarViewerContainer { }

export default DecoratedVariableStarViewerContainer
export { VariableStarViewerContainer }
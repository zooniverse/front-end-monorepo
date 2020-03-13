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
      phaseLimit: 0.2,
      rawJSON: {
        data: [],
        chartOptions: {}
      }
    }

    this.setPeriodMultiple = this.setPeriodMultiple.bind(this)
    this.setSeriesFocus = this.setSeriesFocus.bind(this)
    this.setYAxisInversion = this.setYAxisInversion.bind(this)
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
    const focusedSeries = this.setupSeriesFocus(rawJSON)
    this.setState({
      barJSON,
      focusedSeries,
      phasedJSON,
      rawJSON
    },
      function () {
        onReady({ target })
      })
  }

  calculatePhase (rawJSON) {
    const { periodMultiple, phaseLimit } = this.state
    // temp for demo purposes
    // Will use series.seriesOptions.period in future
    const seriesPeriods = [0.4661477096, 1.025524961]
    let phasedJSON = { data: [], chartOptions: rawJSON.chartOptions }
    rawJSON.data.forEach((series, seriesIndex) => {
      const seriesPeriod = seriesPeriods[seriesIndex] * periodMultiple
      const seriesData = []
      series.seriesData.forEach((datum) => {
        let phasedXPoint
        const calculatedXPoint = (datum.x % seriesPeriod) / seriesPeriod
        seriesData.push(Object.assign({}, datum, { x: calculatedXPoint, mirrored: false }))

        if (calculatedXPoint < phaseLimit) {
          phasedXPoint = calculatedXPoint + 1
        } else if (calculatedXPoint > 1 - phaseLimit) {
          phasedXPoint = calculatedXPoint - 1
        }

        if (phasedXPoint) seriesData.push(Object.assign({}, datum, { x: phasedXPoint, mirrored: true }))
      })

      phasedJSON.data.push({ seriesData, seriesOptions: series.seriesOptions })
    })

    return phasedJSON
  }

  calculateBarJSON (rawJSON) {
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

  calculateJSON () {
    const { rawJSON } = this.state
    const phasedJSON = this.calculatePhase(rawJSON)
    const barJSON = this.calculateBarJSON(rawJSON)
    this.setState({
      barJSON,
      phasedJSON
    })
  }

  setupSeriesFocus (rawJSON) {
    return rawJSON.data.map((series) => {
      if (series?.seriesData.length > 0) {
        return { [series.seriesOptions.label]: true }
      }
    })
  }

  setPeriodMultiple (event) {
    const periodMultiple = parseFloat(event.target.value)
    this.setState({ periodMultiple }, () => this.calculateJSON())
  }

  setSeriesFocus(event) {
    const newFocusedSeriesState = this.state.focusedSeries.map((series) => {
      const [[label, checked]] = Object.entries(series)
      if (label === event.target.value) {
        return { [event.target.value]: event.target.checked }
      } else {
        return series
      }
    })

    this.setState({ focusedSeries: newFocusedSeriesState })
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
        focusedSeries={this.state.focusedSeries}
        imageSrc={this.state.imageSrc}
        invertYAxis={this.state.invertYAxis}
        periodMultiple={this.state.periodMultiple}
        phaseLimit={this.state.phaseLimit}
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
  onReady: PropTypes.func,
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
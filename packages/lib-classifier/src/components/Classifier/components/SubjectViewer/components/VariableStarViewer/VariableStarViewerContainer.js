import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import request from 'superagent'

import VariableStarViewer from './VariableStarViewer'
import locationValidator from '../../helpers/locationValidator'

class VariableStarViewerContainer extends Component {
  constructor () {
    super()
    this.viewer = React.createRef()
    this.state = {
      allowPanZoom: '',
      barJSON: {
        amplitude: {
          data: [],
          chartOptions: {}
        },
        period: {
          data: [],
          chartOptions: {}
        }
      },
      imageSrc: '',
      invertYAxis: false,
      loadingState: asyncStates.initialized,
      periodMultiple: 1,
      phaseFocusedSeries: 0,
      phasedJSON: {
        data: [],
        chartOptions: {}
      },
      phaseLimit: 0.2,
      rawJSON: {
        scatterPlot: {
          data: [],
          chartOptions: {}
        },
        barCharts: {
          amplitude: {
            data: [],
            chartOptions: {}
          },
          period: {
            data: [],
            chartOptions: {}
          }
        }
      },
      visibleSeries: []
    }

    this.setAllowPanZoom = this.setAllowPanZoom.bind(this)
    this.setPeriodMultiple = this.setPeriodMultiple.bind(this)
    this.setSeriesPhaseFocus = this.setSeriesPhaseFocus.bind(this)
    this.setSeriesVisibility = this.setSeriesVisibility.bind(this)
    this.setYAxisInversion = this.setYAxisInversion.bind(this)
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
      return response.body || JSON.parse(response.text)
    } catch (error) {
      onError(error)
      return null
    }
  }

  async handleSubject () {
    const { onError } = this.props
    try {
      const rawJSON = await this.requestData()
      if (rawJSON) this.onLoad(rawJSON)
    } catch (error) {
      onError(error)
    }
  }

  onLoad (rawJSON) {
    const {
      scatterPlot,
      barCharts
    } = rawJSON
    const { onReady, subject } = this.props
    const target = this.viewer.current
    const phasedJSON = this.calculatePhase(scatterPlot)
    const barJSON = this.calculateBarJSON(barCharts)
    const visibleSeries = this.setupSeriesVisibility(scatterPlot)
    const imageLocation = subject.locations.find(location => location['image/png']) || {}
    const imageSrc = imageLocation['image/png'] || ''

    this.setState({
      barJSON,
      imageSrc,
      phasedJSON,
      rawJSON,
      visibleSeries
    },
      function () {
        onReady({ target })
      })
  }

  calculatePhase (scatterPlotJSON, seriesIndexForPeriod = this.state.phaseFocusedSeries) {
    const { periodMultiple, phaseLimit } = this.state
    let phasedJSON = { data: [], chartOptions: scatterPlotJSON.chartOptions }
    scatterPlotJSON.data.forEach((series, seriesIndex) => {
      const periodToUse = parseFloat(scatterPlotJSON.data[seriesIndexForPeriod].seriesOptions.period)
      const seriesPeriod = periodToUse * periodMultiple
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

  calculateBarJSON (barChartJSON) {
    const { periodMultiple } = this.state
    let phasedBarChartJSON = { 
      amplitude: barChartJSON.amplitude, 
      period: { 
        data: [], 
        chartOptions: barChartJSON.period.chartOptions
      }
    }
    barChartJSON.period.data.forEach((datum) => {
      const phasedDatum = Object.assign({}, datum, { value: Math.abs(datum.value) * periodMultiple })
      phasedBarChartJSON.period.data.push(phasedDatum)
    })
    return phasedBarChartJSON
  }

  calculateJSON () {
    const {
      rawJSON: {
        scatterPlot,
        barCharts
      }
    } = this.state
    const phasedJSON = this.calculatePhase(scatterPlot)
    const barJSON = this.calculateBarJSON(barCharts)
    this.setState({
      barJSON,
      phasedJSON
    })
  }

  setupSeriesVisibility (scatterPlotJSON) {
    return scatterPlotJSON.data.map((series) => {
      if (series?.seriesData.length > 0) {
        return { [series.seriesOptions.label]: true }
      }
    })
  }

  setAllowPanZoom (area) {
    this.setState({ allowPanZoom: area })
  }

  setPeriodMultiple (event) {
    const periodMultiple = parseFloat(event.target.value)
    this.setState({ periodMultiple }, () => this.calculateJSON())
  }

  setSeriesVisibility (event) {
    const newVisibleSeriesState = this.state.visibleSeries.map((series) => {
      const [[label, checked]] = Object.entries(series)
      if (label === event.target.value) {
        return { [event.target.value]: event.target.checked }
      } else {
        return series
      }
    })

    this.setState({ visibleSeries: newVisibleSeriesState })
  }

  setSeriesPhaseFocus (event) {
    const seriesIndexForPeriod = parseInt(event.target.value)
    const phasedJSON = this.calculatePhase(this.state.rawJSON.scatterPlot, seriesIndexForPeriod)
    this.setState({ phasedJSON, phaseFocusedSeries: seriesIndexForPeriod })
  }

  setYAxisInversion () {
    this.setState((prevState) => { return { invertYAxis: !prevState.invertYAxis } })
  }

  render () {
    const {
      setOnPan,
      setOnZoom,
      subject,
    } = this.props

    if (!subject.id) {
      return null
    }

    return (
      <VariableStarViewer
        allowPanZoom={this.state.allowPanZoom}
        barJSON={this.state.barJSON}
        imageSrc={this.state.imageSrc}
        invertYAxis={this.state.invertYAxis}
        periodMultiple={this.state.periodMultiple}
        phaseFocusedSeries={this.state.phaseFocusedSeries}
        phaseLimit={this.state.phaseLimit}
        phasedJSON={this.state.phasedJSON}
        rawJSON={this.state.rawJSON}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        setAllowPanZoom={this.setAllowPanZoom}
        setPeriodMultiple={this.setPeriodMultiple}
        setSeriesPhaseFocus={this.setSeriesPhaseFocus}
        setSeriesVisibility={this.setSeriesVisibility}
        setYAxisInversion={this.setYAxisInversion}
        visibleSeries={this.state.visibleSeries}
      />
    )
  }
}

VariableStarViewerContainer.defaultProps = {
  loadingState: asyncStates.initialized,
  onError: () => true,
  onReady: () => true,
  setOnPan: () => {},
  setOnZoom: () => {},
  subject: {
    id: '',
    locations: []
  }
}

VariableStarViewerContainer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  subject: PropTypes.shape({
    id: PropTypes.string,
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default VariableStarViewerContainer
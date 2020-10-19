import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import request from 'superagent'
import counterpart from 'counterpart'
import { extent } from 'd3'
import VariableStarViewer from './VariableStarViewer'
import { additiveDictionary } from './helpers/constants'
import locationValidator from '../../helpers/locationValidator'
import en from './locales/en'

counterpart.registerTranslations('en', en)

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
      highlightedSeries: [],
      imageLocation: null,
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
        data: {
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
        }
      },
    }

    this.setAllowPanZoom = this.setAllowPanZoom.bind(this)
    this.setPeriodMultiple = this.setPeriodMultiple.bind(this)
    this.setSeriesPhaseFocus = this.setSeriesPhaseFocus.bind(this)
    this.setSeriesHighlight = this.setSeriesHighlight.bind(this)
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
      data: {
        scatterPlot,
        barCharts
      }
    } = rawJSON

    const { onReady, subject } = this.props
    const target = this.viewer.current
    const phasedJSON = this.calculatePhase(scatterPlot)
    const barJSON = this.calculateBarJSON(barCharts)
    const highlightedSeries = this.setupSeriesHighlight(scatterPlot)
    // think about a better way to do this
    const imageLocation = subject.locations[2] || {}

    this.setState({
      barJSON,
      imageLocation,
      phasedJSON,
      rawJSON,
      highlightedSeries
    },
      function () {
        // temporarily remove ref param
        onReady({ target: {} })
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
    const { chartOptions } = phasedBarChartJSON.period

    barChartJSON.period.data.forEach((datum) => {
      const phasedDatum = Object.assign({}, datum, { value: datum.value + additiveDictionary[periodMultiple.toString()] })
      phasedBarChartJSON.period.data.push(phasedDatum)
    })

    if (!chartOptions.yAxisDomain) {
      const yDataExtent = extent(phasedBarChartJSON.period.data.map(datum => datum.value))
      const yAxisDomain = [Math.floor(yDataExtent[0]), Math.ceil(yDataExtent[1]) + 1]
      phasedBarChartJSON.period.chartOptions = Object.assign({}, chartOptions, { yAxisDomain })
    }

    return phasedBarChartJSON
  }

  calculateJSON () {
    const {
      rawJSON: {
        data: {
          scatterPlot,
          barCharts
        }
      }
    } = this.state

    const phasedJSON = this.calculatePhase(scatterPlot)
    const barJSON = this.calculateBarJSON(barCharts)
    this.setState({
      barJSON,
      phasedJSON
    })
  }

  setupSeriesHighlight (scatterPlotJSON) {
    return scatterPlotJSON.data.map((series, index) => {
      if (series?.seriesData.length > 0) {
        const fallbackLabel = counterpart('VariableStarViewer.label', { id: index + 1 })
        const label = series.seriesOptions?.label || fallbackLabel
        return { [label]: true }
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

  setSeriesHighlight (event) {
    const newHighlightedSeriesState = this.state.highlightedSeries.map((series) => {
      const [[label, checked]] = Object.entries(series)
      if (label === event.target.value) {
        return { [event.target.value]: event.target.checked }
      } else {
        return series
      }
    })

    this.setState({ highlightedSeries: newHighlightedSeriesState })
  }

  setSeriesPhaseFocus (event) {
    const seriesIndexForPeriod = parseInt(event.target.value)
    const phasedJSON = this.calculatePhase(this.state.rawJSON.data.scatterPlot, seriesIndexForPeriod)
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
        highlightedSeries={this.state.highlightedSeries}
        imageLocation={this.state.imageLocation}
        invertYAxis={this.state.invertYAxis}
        periodMultiple={this.state.periodMultiple}
        phaseFocusedSeries={this.state.phaseFocusedSeries}
        phaseLimit={this.state.phaseLimit}
        phasedJSON={this.state.phasedJSON}
        rawJSON={this.state.rawJSON}
        ref={this.viewer}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        setAllowPanZoom={this.setAllowPanZoom}
        setPeriodMultiple={this.setPeriodMultiple}
        setSeriesPhaseFocus={this.setSeriesPhaseFocus}
        setSeriesHighlight={this.setSeriesHighlight}
        setYAxisInversion={this.setYAxisInversion}
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
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { createRef, Component } from 'react';
import { extent } from 'd3-array'
import { withTranslation } from '@translations/i18n'

import VariableStarViewer from './VariableStarViewer'
import { additiveDictionary } from './helpers/constants'
import locationValidator from '../../helpers/locationValidator'

class VariableStarViewerContainer extends Component {
  constructor () {
    super()
    this.viewer = createRef()
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
    }

    this.setAllowPanZoom = this.setAllowPanZoom.bind(this)
    this.setPeriodMultiple = this.setPeriodMultiple.bind(this)
    this.setSeriesPhaseFocus = this.setSeriesPhaseFocus.bind(this)
    this.setSeriesHighlight = this.setSeriesHighlight.bind(this)
    this.setYAxisInversion = this.setYAxisInversion.bind(this)
  }

  async componentDidMount () {
    const { data } = this.props
    if (data) {
      await this.onLoad(data)
    }
  }

  async componentDidUpdate (prevProps) {
    const { data } = this.props
    const prevData = prevProps.data
    const subjectChanged = data !== prevData

    if (subjectChanged) {
      await this.onLoad(data)
    }
  }


  onLoad (data) {
    const {
      scatterPlot,
      barCharts
    } = data

    const { onReady, subject } = this.props
    const container = this.viewer.current?.container
    const phasedJSON = this.calculatePhase(scatterPlot)
    const barJSON = this.calculateBarJSON(barCharts)
    const highlightedSeries = this.setupSeriesHighlight(scatterPlot)
    // think about a better way to do this
    const imageLocation = subject.locations[2] || {}

    const { width: clientWidth, height: clientHeight } = container ? container.getBoundingClientRect() : {}
    const target = { clientWidth, clientHeight, naturalWidth: 0, naturalHeight: 0 }

    this.setState({
      barJSON,
      imageLocation,
      phasedJSON,
      rawJSON: data,
      highlightedSeries
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
      scatterPlot,
      barCharts
    } = this.state.rawJSON

    const phasedJSON = this.calculatePhase(scatterPlot)
    const barJSON = this.calculateBarJSON(barCharts)
    this.setState({
      barJSON,
      phasedJSON
    })
  }

  setupSeriesHighlight (scatterPlotJSON) {
    const { t } = this.props
    return scatterPlotJSON.data.map((series, index) => {
      if (series?.seriesData.length > 0) {
        const fallbackLabel = t('SubjectViewer.VariableStarViewer.label', { id: index + 1 })
        series.seriesOptions.label ??= fallbackLabel

        return series.seriesOptions.label
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
    const newHighlightedSeriesState = this.state.highlightedSeries
    const seriesToUnhighlightIndex = this.state.highlightedSeries.findIndex((highlightedLabel) => {
      return highlightedLabel === event.target.value
    })

    if (seriesToUnhighlightIndex > -1) {
      newHighlightedSeriesState.splice(seriesToUnhighlightIndex, 1)
    } else {
      newHighlightedSeriesState.push(event.target.value)
    }

    this.setState({ highlightedSeries: newHighlightedSeriesState })
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
      loadingState,
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
        loadingState={loadingState}
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
  },
  t: (key) => key
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

export default withTranslation('components')(VariableStarViewerContainer)
export { VariableStarViewerContainer }

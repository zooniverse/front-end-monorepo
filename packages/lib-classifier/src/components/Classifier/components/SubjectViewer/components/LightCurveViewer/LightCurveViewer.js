import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactResizeDetector from 'react-resize-detector'

import addBackgroundLayer from './d3/addBackgroundLayer'
import addBorderLayer from './d3/addBorderLayer'
import addDataLayer from './d3/addDataLayer'
import addInterfaceLayer from './d3/addInterfaceLayer'
import setPointStyle from './d3/setPointStyle'

class LightCurveViewer extends Component {
  constructor () {
    super()
    this.svgContainer = React.createRef()
    this.d3dataLayer = null
    this.d3interfaceLayer = null
    this.d3svg = null
    this.xScale = null
    this.yScale = null
  }

  componentDidMount () {
    this.initChart()
  }

  componentDidUpdate (prevProps) {
    const isFirstDraw = !prevProps.points.length && this.props.points.length
    if (isFirstDraw) {
      const container = this.svgContainer.current
      const height = container.offsetHeight || 0
      const width = container.offsetWidth || 0
      this.drawChart(width, height, isFirstDraw)
    }
  }

  componentWillUnmount () {
    this.d3interfaceLayer.on('.zoom', null)
  }

  drawChart (width, height, isFirstDraw = false) {
    if (!height || !width) {
      return false
    }

    this.xScale
      .domain(this.props.extent.x)
      .range([0, width])

    this.yScale
      .domain(this.props.extent.y)
      .range([height, 0])

    const points = this.d3dataLayer.selectAll('circle')
      .data(this.props.points)

    const setPointCoords = selection => selection
      .attr('cx', d => this.xScale(d[0]))
      .attr('cy', d => this.yScale(d[1]))

    if (isFirstDraw) {
      points.enter()
        .append('circle')
        .call(setPointStyle)
        .merge(points)
        .call(setPointCoords)
    } else {
      points.enter()
        .append('circle')
        .call(setPointStyle)
        .merge(points)
        .transition()
        .call(setPointCoords)
    }
  }

  initChart () {
    const container = this.svgContainer.current
    this.d3svg = d3.select(container)
      .append('svg')
      .attr('class', 'light-curve-viewer')
      .attr('height', '100%')
      .attr('width', '100%')

    this.d3svg.call(addBackgroundLayer)
    this.d3dataLayer = this.d3svg
      .append('g')
      .attr('class', 'data-layer')
    this.d3svg.call(addBorderLayer)
    this.xScale = d3.scaleLinear()
    this.yScale = d3.scaleLinear()

    this.d3interfaceLayer = this.d3svg.call(addInterfaceLayer)
    this.d3interfaceLayer.call(d3.zoom()
      .scaleExtent([1, 10])
      .on('zoom', () => {
        this.d3dataLayer.attr('transform', d3.event.transform)
      })
    )
  }

  render () {
    return (
      <div className='light-curve-viewer' ref={this.svgContainer}>
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.drawChart.bind(this)}
          refreshMode='debounce'
          refreshRate={500}
        />
      </div>
    )
  }
}

LightCurveViewer.propTypes = {
  extent: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
}

export default LightCurveViewer

import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactResizeDetector from 'react-resize-detector'

import addBackgroundLayer from './d3/addBackgroundLayer'
import addBorderLayer from './d3/addBorderLayer'
import addDataLayer from './d3/addDataLayer'
import addInterfaceLayer from './d3/addInterfaceLayer'
import setPointStyle from './d3/setPointStyle'

//TODO: move into props or some other configurable
const LIGHTCURVE_DATA_CONSTRAINTS = {
  /*
  Zoom range of 1x to 10x.
  Minimum zoom prevent users from "zooming out" (< 1x zoom) beyond
  reasonable subject area, maximum zoom is arbitrary.
   */
  minScale: 1,
  maxScale: 10,  
}

class LightCurveViewer extends Component {
  constructor () {
    super()
    
    this.svgContainer = React.createRef()
    
    // D3 Selection elements
    this.d3dataLayer = null
    this.d3interfaceLayer = null
    this.d3svg = null
    
    // D3 Zoom controller: manipulates and stores scale/translate values
    this.zoom = null
    
    /*
    The D3 x-scales/y-scales is used to map the x-y coordinates on the visual
    <svg> to the x-y values of the data points.
    
    IMPORTANT: the y-axis in an <svg> increases as you go downwards, while the
    y-axis in most scientific charts increases as you go upwards. We must
    reverse the mapping accordingly when setting up this.yScale.
     */
    this.xScale = null
    this.yScale = null
    
    /*
    The "D3 axis" represents the visual axis and the axis labels.
    Not to be confused with x-scales and y-scales.
    Note the naming: d3axisX and d3axisY are used for the D3 selection (i.e. the
    actual elements in the SVG) whereas xAxis and yAxis represent the data
    model.
     */
    this.d3axisX = null
    this.d3axisY = null
    this.xAxis = null
    this.yAxis = null
  }

  componentDidMount () {
    this.initChart()
  }

  componentDidUpdate (prevProps) {
    const points = this.props.points
    const prevPoints = prevProps.points
    const sameSubject = (points === prevPoints)

    if (!sameSubject) {
      this.clearChart()
    }

    const container = this.svgContainer.current
    const height = container.offsetHeight || 0
    const width = container.offsetWidth || 0
    this.drawChart(width, height, sameSubject)
  }

  componentWillUnmount () {
    this.d3interfaceLayer && this.d3interfaceLayer.on('.zoom', null)
  }

  clearChart () {
    this.d3dataLayer.selectAll('circle')
      .remove()
  }

  /*
  Updates the D3 chart to fit the size of the container, and adds/updates the
  data points.
  Called when new data (points) is received, and when chart is resized.
   */
  drawChart (width, height, shouldAnimate = false) {
    if (!height || !width) {
      return false
    }
    
    /*
    Limit zoom panning to x-direction (yMin=0, yMax=0), and don't allow panning
    beyond the start (xMin=0) or end (xMax=width) of the light curve.
    */
    this.zoom.translateExtent([[0, 0], [width, 0]])

    // Update x-y scales to fit current size of container
    this.xScale
      .domain(this.props.extent.x)
      .range([0, width])
    this.yScale
      .domain(this.props.extent.y)
      .range([height, 0])  //Note that this is reversed
    
    this.updateAxes()
    
    // Add the data points
    const points = this.d3dataLayer.selectAll('.data-point')
      .data(this.props.points)

    const t = this.getCurrentTransform()
    const setPointCoords = selection => selection
      // users can only zoom & pan in the x-direction
      .attr('cx', d => t.rescaleX(this.xScale)(d[0]))
      .attr('cy', d => this.yScale(d[1]))

    if (shouldAnimate) {
      points.enter()
        .append('circle')  // Note: all circles are of class '.data-point'
        .call(setPointStyle)
        .merge(points)
        .transition()
        .call(setPointCoords)
    } else {
      points.enter()
        .append('circle')
        .call(setPointStyle)
        .merge(points)
        .call(setPointCoords)
    }
  }
  
  getCurrentTransform () {
    return (d3.event && d3.event.transform)
      || d3.zoomTransform(this.d3interfaceLayer.node())
      || d3.zoomIdentity
  }

  /*
  Initialises the D3 scatterplot chart.
  The chart is divided into multiple layers (both functional and decorative).
  IMPORTANT: note the order these layers are added.
   */
  initChart () {
    const container = this.svgContainer.current
    this.d3svg = d3.select(container)
      .append('svg')
        .attr('class', 'light-curve-viewer')
        .attr('height', '100%')
        .attr('width', '100%')
    this.xScale = d3.scaleLinear()
    this.yScale = d3.scaleLinear()
    
    // Deco layer
    this.d3svg.call(addBackgroundLayer)
    
    /*
    Data layer: data points are added here in drawChart()
    */
    this.d3dataLayer = this.d3svg.call(addDataLayer)
    
    /*
    Axis layer
    Actual scaling done in updateAxes()
     */
    this.xAxis = d3.axisBottom(this.yScale)
    this.yAxis = d3.axisRight(this.yScale)
    const axisLayer = this.d3svg
      .append('g')
        .attr('class', 'axis-layer')
    this.d3axisX = axisLayer
      .append('g')
        .attr('class', 'x-axis')
        .call(this.xAxis)
    this.d3axisY = axisLayer
      .append('g')
        .attr('class', 'y-axis')
        .call(this.yAxis)
    
    // Deco layer
    this.d3svg.call(addBorderLayer)

    // Zoom controller
    this.zoom = d3.zoom()
      .scaleExtent([LIGHTCURVE_DATA_CONSTRAINTS.minScale, LIGHTCURVE_DATA_CONSTRAINTS.maxScale])  // Limit zoom scale
    
      .on('zoom', () => {
        const t = d3.event.transform
        
        // Re-draw the data points to fit the new view
        // Note: users can only zoom & pan in the x-direction
        this.d3dataLayer.selectAll('.data-point')
          .attr('cx', d => t.rescaleX(this.xScale)(d[0]))
        
        this.updateAxes()
      })
    
    /*
    The Interface Layer is the last (i.e. top-most) layer added, capturing all
    mouse input but making it impossible to directly interact with any layer
    elements beneath it.
     */
    this.d3interfaceLayer = this.d3svg.call(addInterfaceLayer)
    this.d3interfaceLayer.call(this.zoom)
  }
  
  /*
  Update the x-axis and y-axis to fit the new zoom/pan view.
  Note that for light curves, we only allow panning & zooming in the x-direction.
   */
  updateAxes() {
    const t = this.getCurrentTransform()
    
    this.xAxis.scale(t.rescaleX(this.xScale))
    this.d3axisX.call(this.xAxis)
    
    this.yAxis.scale(this.yScale)
    this.d3axisY.call(this.yAxis)
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

import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { inject, observer } from 'mobx-react'

import addAxisLabel from './d3/addAxisLabel'
import addBackgroundLayer from './d3/addBackgroundLayer'
import addBorderLayer from './d3/addBorderLayer'
import addDataLayer from './d3/addDataLayer'
import addDataMask from './d3/addDataMask'
import addInterfaceLayer from './d3/addInterfaceLayer'
import getClickCoords from './d3/getClickCoords'
import setPointStyle from './d3/setPointStyle'

// The following are arbitrary as all heck, numbers are chosen for what "feels good"
const ZOOM_IN_VALUE = 1.2
const ZOOM_OUT_VALUE = 0.8
const ZOOMING_TIME = 100  // milliseconds

function storeMapper (stores) {
  const {
    annotate,  // bool: Indicates if the Classifier is in Annotate mode
    move,  // bool: Indicates if the Classifier is in Annotate mode
    setOnZoom,  // func: sets onZoom event handler
  } = stores.classifierStore.subjectViewer
  
  let interactionMode = ''
  if (annotate && !move) interactionMode = 'annotate'
  if (!annotate && move) interactionMode = 'move'
  
  return {
    interactionMode,
    setOnZoom,
  }
}

@inject(storeMapper)
@observer
class LightCurveViewer extends Component {
  constructor () {
    super()
    
    this.svgContainer = React.createRef()
    
    // D3 Selection elements
    this.d3annotationsLayer = null
    this.d3dataMask = null
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
    this.d3axisXLabel = null
    this.d3axisYLabel = null
    this.xAxis = null
    this.yAxis = null
  }

  componentDidMount () {
    this.initChart()
    this.props.setOnZoom(this.handleToolbarZoom.bind(this))
  }

  componentDidUpdate (prevProps) {
    const points = this.props.dataPoints
    const prevPoints = prevProps.dataPoints
    const sameSubject = (points === prevPoints)

    if (!sameSubject) {
      this.clearChart()
    }

    const container = this.svgContainer.current
    const height = container.offsetHeight || 0
    const width = container.offsetWidth || 0
    this.drawChart(width, height, sameSubject)
    this.updateInteractionMode(this.props.interactionMode)
  }

  componentWillUnmount () {
    this.zoom && this.zoom.on('zoom', null)
    this.d3svg && this.d3svg.on('zoom', null)
  }

  clearChart () {
    this.d3dataLayer.selectAll('.data-point')
      .remove()
  }

  /*
  Updates the D3 chart to fit the size of the container, and adds/updates the
  data points.
  Called when new data (points) is received, and when chart is resized.
   */
  drawChart (width, height, shouldAnimate = false) {
    const props =  this.props
    if (!height || !width) {
      return false
    }
    
    /*
    Limit zoom panning to x-direction (yMin=0, yMax=0), and don't allow panning
    beyond the start-ish (xMin=0-margin) or end-ish (xMax=width+margin) of the
    light curve.
    
    UX: the +/-margins add some "give" to chart that lets users see _some_
    interactivity at 1.0x zoom. Without this give, users won't see any feedback
    to drag/move actions in Move mode at 1.0x zoom, possibly causing them to
    incorrectly think they're in Annotate Mode. Feel free to remove these
    margins if we can find a better way to communicate when a user is in Move
    Mode but cannot actually pan the image.
    */
    this.zoom.translateExtent([[-props.outerMargin, 0], [width + props.outerMargin, 0]])

    // Update x-y scales to fit current size of container
    this.xScale
      .domain(this.props.dataExtent.x)
      .range([0 + props.innerMargin, width - props.innerMargin])
    this.yScale
      .domain(this.props.dataExtent.y)
      .range([height - props.innerMargin, 0 + props.innerMargin])  //Note that this is reversed
    
    this.updatePresentation(width, height)
    
    // Add the data points
    const points = this.d3dataLayer.selectAll('.data-point')
      .data(this.props.dataPoints)

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
      || (this.d3interfaceLayer && d3.zoomTransform(this.d3interfaceLayer.node()))
      || d3.zoomIdentity
  }
  
  /*
  Event Handler: Zoom (from Classifier's ImageToolbar)
  Responds to zoom actions initiated by components outside the D3 model.
   */
  handleToolbarZoom (type, zoomValue) {
    const doZoom = {
      'zoomin': this.zoomIn.bind(this),
      'zoomout': this.zoomOut.bind(this),
      'zoomto': this.zoomTo.bind(this)
    }
    
    if (doZoom[type]) {
      doZoom[type](zoomValue)
    }
  }
  
  zoomIn() {
    this.zoom.scaleBy(this.d3interfaceLayer.transition().duration(ZOOMING_TIME), ZOOM_IN_VALUE)
  }
  
  zoomOut() {
    this.zoom.scaleBy(this.d3interfaceLayer.transition().duration(ZOOMING_TIME), ZOOM_OUT_VALUE)
  }
  
  zoomTo(zoomValue) {
    this.zoom.scaleTo(this.d3interfaceLayer.transition().duration(ZOOMING_TIME), zoomValue)
  }

  /*
  Initialises the D3 scatterplot chart.
  The chart is divided into multiple layers (both functional and decorative).
  IMPORTANT: layers are added in z-index order, lowest first.
   */
  initChart () {
    const props = this.props
    
    const container = this.svgContainer.current
    this.d3svg = d3.select(container)
      .append('svg')
        .attr('class', 'light-curve-viewer')
        .attr('height', '100%')
        .attr('width', '100%')
        .style('cursor', 'crosshair')
    this.xScale = d3.scaleLinear()
    this.yScale = d3.scaleLinear()
    
    // Deco layer
    this.d3svg.call(addBackgroundLayer)
    
    /*
    Data layer
    Data points are added to this layer in drawChart().
    The supplementary data mask is a "window" or clipping path that prevents the
    data points from appearing outside of the 'middle' of the chart, i.e.
    prevents <circle>s from appearing in the margins of the container.
    */
    this.d3svg.call(addDataLayer)
    this.d3dataLayer = this.d3svg.select('.data-layer')
    this.d3svg.call(addDataMask, props.outerMargin)
    this.d3dataMask = this.d3svg.select('.data-mask')
    
    /*
    Axis layer
    Actual scaling done in updatePresentation()
     */
    this.xAxis = d3.axisTop(this.yScale)
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
    
    axisLayer.call(addAxisLabel, 'x-axis-label', props.axisXLabel, props.axisLabelStyle)
    this.d3axisXLabel = axisLayer.select('.x-axis-label')
    
    axisLayer.call(addAxisLabel, 'y-axis-label', props.axisYLabel, props.axisLabelStyle)
    this.d3axisYLabel = axisLayer.select('.y-axis-label')
      
    // Deco layer
    this.d3svg.call(addBorderLayer)

    // Zoom controller
    this.zoom = d3.zoom()
      .scaleExtent([props.minZoom, props.maxZoom])  // Limit zoom scale
      .on('zoom', this.doZoom.bind(this))
    
    // Annotations/markings layer
    this.d3svg
      .append('g')
        .attr('class', 'annotations-layer')
    this.d3annotationsLayer = this.d3svg.select('.annotations-layer')
    
    // TEST: Can we stop event propagation on clicks?
    // ANSWER: YES
    this.d3annotationsLayer
      .append('rect')
        .attr('class', 'example-annotation')
        .attr('transform', 'translate(50,50)')
        .attr('width', 50)
        .attr('height', 100)
        .attr('fill', '#c44')
        .attr('fill-opacity', '0.5')
        .style('cursor', 'pointer')
        .on('click', () => { console.log('+++ Example Annotation clicked'); d3.event.stopPropagation() ; d3.event.preventDefault() })  // Prevents clicks on the parent d3annotationsLayer, which add new annotations.
        .on('mousedown', () => { d3.event.stopPropagation() ; d3.event.preventDefault() })  // Prevents "drag selection"
        .on('touchstart', () => { d3.event.stopPropagation() ; d3.event.preventDefault() })
    
    /*
    The Interface Layer is the last (i.e. top-most) layer added, capturing all
    mouse input but making it impossible to directly interact with any layer
    elements beneath it.
     */
    this.d3svg.call(addInterfaceLayer)
    this.d3interfaceLayer = this.d3svg.select('.interface-layer')
    this.d3interfaceLayer.call(this.zoom)
    this.updateInteractionMode(props.interactionMode)
  }
  
  /*
  Updates interaction logic, switching between navigation and annotation.
   */
  updateInteractionMode(interactionMode = '') {
    if (!this.zoom || !this.d3interfaceLayer) return
    
    if (interactionMode === 'annotate') {
      // HACK: Prevent zoom by "running in place"
      // this.zoom.on('zoom', null) doesn't work, because transforms are just
      // "deferred" until Move Mode is reinstated.
      /*this.savedTransform = this.getCurrentTransform()
      this.zoom.on('zoom', () => {
        if (d3.event.transform.x !== this.savedTransform.x
            || d3.event.transform.y !== this.savedTransform.y
            || d3.event.transform.k !== this.savedTransform.k) {
          this.zoom.transform(this.d3interfaceLayer, this.savedTransform)
        }
      })
      this.d3interfaceLayer.style('cursor', 'crosshair')
      this.d3interfaceLayer.on('click', this.doInsertAnnotation.bind(this))*/
      
      this.d3svg.on('click', this.doInsertAnnotation.bind(this))
      this.d3interfaceLayer.style('display', 'none')
      
    } else if (interactionMode === 'move') {
      //this.zoom.on('zoom', this.doZoom.bind(this))
      
      this.d3svg.on('click', null)
      this.d3interfaceLayer.style('display', null)
      
    } else {  // Users should never reach this point
      console.error('LightCurveViewer: illogical move/annotate state detected.')
    }
  }
  
  doZoom () {
    const t = this.getCurrentTransform()

    // Re-draw the data points to fit the new view
    // Note: users can only zoom & pan in the x-direction
    this.d3dataLayer.selectAll('.data-point')
      .attr('cx', d => t.rescaleX(this.xScale)(d[0]))

    this.updatePresentation()
  }
  
  doInsertAnnotation () {
    const t = this.getCurrentTransform()
    const clickCoords = getClickCoords(this.d3svg.node(), this.xScale, this.yScale, t)
    console.log('+++ click coords: ', clickCoords)
    
    // TEST
    this.d3annotationsLayer.append('circle')
      .attr('r', 10)
      .attr('fill', '#c44')
      .attr('cx', this.xScale(clickCoords[0]))
      .attr('cy', this.yScale(clickCoords[1]))
  }
  
  /*
  Update the x-axis, y-axis, and other presentation elements to fit the new
  zoom/pan view.
  width and height are only defined if the container size changes.
   */
  updatePresentation(width, height) {
    const props = this.props
    const t = this.getCurrentTransform()
    
    this.updateScales(t)
    
    if (width && height) {  // Update if container size changes.
      this.repositionAxes(width, height)
      this.repositionAxisLabels(width, height, props.axisLabelStyle)
      this.resizeDataMask(width, height, props.outerMargin)
    }
  }
  
  updateScales (transform) {
    this.xAxis.scale(transform.rescaleX(this.xScale))  // Rescale the x-axis to fit zoom
    this.d3axisX.call(this.xAxis)
    
    this.yAxis.scale(this.yScale)  // Do NOT rescale the y-axis
    this.d3axisY.call(this.yAxis)
  }
  
  repositionAxes (width, height) {
    this.d3axisX.attr('transform', `translate(0, ${height})`)
    this.d3axisY.attr('transform', `translate(0, 0)`)
  }
  
  repositionAxisLabels (width, height, labelStyle) {
    this.d3axisXLabel
      .attr('transform', `translate(${width + labelStyle.xOffsetX}, ${height + labelStyle.xOffsetY})`)
    this.d3axisYLabel
      .attr('transform', `translate(${labelStyle.yOffsetX}, ${labelStyle.yOffsetY})`)
  }

  // Resize the data mask, so data-points remain in view 
  resizeDataMask (width, height, margin) {
    this.d3dataMask
      .attr('width', width - margin * 2)
      .attr('height', height - margin * 2)
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

LightCurveViewer.wrappedComponent.propTypes = {
  // Data values
  dataExtent: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  dataPoints: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),

  // Zoom (scale) range
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  
  innerMargin: PropTypes.number,  // Defines space where data-points appear at 1x zoom
  outerMargin: PropTypes.number,  // Any data-points outside these margins (i.e. when zoomed in) are cropped
  
  axisXLabel: PropTypes.string,
  axisYLabel: PropTypes.string,
  
  axisLabelStyle: PropTypes.shape({
    fontFamily: PropTypes.string,
    fontSize: PropTypes.string,
    xOffsetX: PropTypes.number,
    xOffsetY: PropTypes.number,
    yOffsetX: PropTypes.number,
    yOffsetY: PropTypes.number,
  }),
  
  // Store-mapped Properties
  interactionMode: PropTypes.string,
  setOnZoom: PropTypes.func.isRequired,
}

LightCurveViewer.wrappedComponent.defaultProps = {
  dataExtent: { x: [-1,1], y: [-1,1] },
  dataPoints: [[]],
  
  setOnZoom: (type, zoomValue) => {},

  minZoom: 1,
  maxZoom: 10,
  
  innerMargin: 30,
  outerMargin: 10,
  
  axisXLabel: 'Day',
  axisYLabel: 'Brightness',
  
  axisLabelStyle: {
    fontFamily: 'inherit',
    fontSize: '0.75rem',
    xOffsetX: -40,
    xOffsetY: -20,
    yOffsetX: 20,
    yOffsetY: 20,
  },
  
  interactionMode: '',
  setOnZoom: (type, n) => {},
}

export default LightCurveViewer

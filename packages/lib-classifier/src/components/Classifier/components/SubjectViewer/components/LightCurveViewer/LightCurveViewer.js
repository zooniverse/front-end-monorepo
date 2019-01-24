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
import setDataPointStyle from './d3/setDataPointStyle'
import setUserAnnotationAttr from './d3/setUserAnnotationAttr'

// The following are arbitrary as all heck, numbers are chosen for what "feels good"
const ZOOM_IN_VALUE = 1.2
const ZOOM_OUT_VALUE = 0.8
const ZOOMING_TIME = 100 // milliseconds

function storeMapper (stores) {
  const {
    enableAnnotate,
    enableMove,
    interactionMode, // string: indicates if the Classifier is in 'annotate' (default) mode or 'move' mode
    setOnZoom // func: sets onZoom event handler
  } = stores.classifierStore.subjectViewer

  const {
    addAnnotation
  } = stores.classifierStore.classifications
  const annotations = stores.classifierStore.classifications.currentAnnotations
  const { active: step } = stores.classifierStore.workflowSteps
  
  const currentTask =
    (stores.classifierStore.workflowSteps.activeStepTasks
     && stores.classifierStore.workflowSteps.activeStepTasks[0])
    || {}
  
  return {
    addAnnotation,
    annotations,
    currentTask,
    enableAnnotate,
    enableMove,
    interactionMode,
    setOnZoom
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
    
    // Chart dimensions, updated on drawChart()
    this.chartWidth = 100
    this.chartHeight = 100
    
    // WIP
    // Each Annotation is represented as a single D3 Brush
    this.annotationBrushes = []  // This keeps track of the annotation-brushes in existence, including the DEFAULT brush that exists even when there are no annotations.
  }

  componentDidMount () {
    this.initChart()
    this.props.setOnZoom(this.handleToolbarZoom.bind(this))
  }

  componentDidUpdate (prevProps) {
    const points = this.props.dataPoints
    const prevPoints = prevProps.dataPoints
    const sameSubject = (points === prevPoints)
    
    const currentTaskKey = (this.props.currentTask && this.props.currentTask.taskKey) || ''
    const prevTaskKey = (prevProps.currentTask && prevProps.currentTask.taskKey) || ''
    const sameTask = (currentTaskKey === prevTaskKey)

    if (!sameSubject) {  // Triggers when changing between Subjects
      this.clearChart()

      const container = this.svgContainer.current
      const height = container.offsetHeight || 0
      const width = container.offsetWidth || 0
      this.drawChart(width, height, sameSubject)
      
    } else if (!sameTask) {  // Triggers when changing between Workflow tasks.
      this.updateUserAnnotations()
    }

    if (prevProps.interactionMode !== this.props.interactionMode) {
      this.updateInteractionMode(this.props.interactionMode)
    }
  }

  componentWillUnmount () {
    this.zoom && this.zoom.on('zoom', null)
    this.d3svg && this.d3svg.on('zoom', null)
  }

  clearChart () {
    this.d3dataLayer.selectAll('.data-point').remove()
    this.d3annotationsLayer.selectAll('.user-annotation').remove()
    this.zoomTo(1.0)
    // TODO/Optional: reset view pan/translate to 0,0?
  }

  /*
  Updates the D3 chart to fit the size of the container, and adds/updates the
  data points.
  Called when new data (points) is received, and when chart is resized.
   */
  drawChart (width, height, shouldAnimate = true) {
    const props = this.props
    if (!height || !width) {
      return false
    }
    
    this.chartWidth = width
    this.chartHeight = height

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
      .range([height - props.innerMargin, 0 + props.innerMargin]) // Note that this is reversed

    this.updatePresentation(width, height)

    // Add the data points
    const points = this.d3dataLayer.selectAll('.data-point')
      .data(this.props.dataPoints)

    // For each new and existing data point, add (append) a new SVG circle.
    points.enter()
      .append('circle') // Note: all circles are of class '.data-point'
      .call(setDataPointStyle)

    // For each SVG circle old/deleted data point, remove the corresponding SVG circle.
    points.exit().remove()

    // Update visual elements
    this.updateDataPoints(shouldAnimate)
    this.updateUserAnnotations()
    this.updatePresentation(width, height)
    
    this.initBrushes()
  }
  
  // WIP
  /*  Initialise D3 brushes
      One brush needs to be created at all times as an interface for listening
      for brush events.
   */
  initBrushes () {
    // WIP: Brushes
    //this.d3annotationsLayer.call(d3.brushX().extent([[0,0], [this.chartWidth, this.chartHeight]]))
    
    this.createAnnotationBrush()
    this.updateAnnotationBrushes()
    
    // TODO:
    // For each existing annotation (i.e. when moving back/forth between steps) create a new Annotation brush.
    
    // TODO: Check for the following scenarios:
    // - Change of Subject
    // - Change of step/task
    // - Canvas redraw (e.g. window resize)
  }
  
  /*
  Mulitple brushes require a special solution
  http://bl.ocks.org/ludwigschubert/0236fa8594c4b02711b2606a8f95f605
   */
  createAnnotationBrush () {
    var brush = d3.brushX()
      .on('start', this.onAnnotationBrushStart.bind(this))
      .on('brush', this.onAnnotationBrushBrushed.bind(this))
      .on('end', this.onAnnotationBrushEnd.bind(this))

    this.annotationBrushes.push({id: this.annotationBrushes.length, brush: brush})
  }
  
  /*
  Get the most recently used D3 brush, as a DOM node.
   */
  getLastBrush () {
    return (this.annotationBrushes.length) && this.annotationBrushes[this.annotationBrushes.length - 1]
  }
  
  onAnnotationBrushStart () { console.log('+++ brush-START') }
  
  onAnnotationBrushBrushed () { console.log('+++ brush-BRUSHED') }
  
  onAnnotationBrushEnd (a, b, c) {
    console.log('+++ brush-END', a, b, c)
    
    const props = this.props

    // Find the last used D3 brush - i.e. the brush that the user just
    // interacted with - and if that brush selected anything (i.e. see if the
    // user marked any [xMin, xMax] dimensions).
    const lastBrush = this.getLastBrush()
    const brushSelection = d3.event.selection
    
    // NOTE: Alternative is to use
    // brushSelection = lastBrush && d3.brushSelection(lastBrush.node)
    
    // lastBrush should NEVER be null, but if it is, we've got a glitch.
    if (!lastBrush) {
      console.error('ERROR: /Classifier/SubjectViewer/LightCurveViewer - could not find last used D3 brush')
      return
    }
    
    // If the user attempted to make a selection, BUT the current task isn't
    // a valid task, cancel that last brush.
    if (brushSelection && !this.isCurrentTaskValidForAnnotation())
    {
      this.d3annotationsLayer.select('.brush').call(lastBrush.brush.move, null)  // WARNING: calling brush.move() WILL trigger brush start/brushed/end events.
      props.enableMove && props.enableMove()
      return
    }
    
    // NOTE: when MOVE mode is enabled, the d3interfaceLayer appears on top of
    // the d3annotations layer, essentially blocking any d3 brush interactions.
    // This means in practice, we don't need to check if we're in Annotate mode
    // to validate a brush action, we just need to check the current task.
    
    // TODO: check if we need to check for interactionMode anyway.

    // If the last used brush was used to select something, (i.e., it has a
    // "selection", i.e. a set of dimensions indicating a range of interest)
    // we need to create a NEW one.
    if (brushSelection && brushSelection[0] !== brushSelection[1]) {
      this.createAnnotationBrush()
    }
    
    // NOTE: we ALWAYS need one brush as the 'interface' for new brushes,
    // meaning this.annotationBrushes always has one D3 brush more than
    // Zooniverse annotations.

    this.updateAnnotationBrushes()
  }
  
  /*
  Updates and re-draws the Annotation Brushes.
   */  
  updateAnnotationBrushes () {
    console.log('+++ updateAnnotationBrushes ')
    
    var brushSelection = this.d3annotationsLayer
      .selectAll('.brush')
      .data(this.annotationBrushes, function (d){return d.id});

    // Set up new brushes
    brushSelection.enter()
      .insert('g', '.brush')
      .attr('class', 'brush')
      .attr('id', (brush) => (`brush-${brush.id}`))
      .each(function (brushObject) {  // Don't use ()=>{}
        //call the brush
        brushObject.brush(d3.select(this))
      })

    const annotationBrushes = this.annotationBrushes
    
    brushSelection
      .each(function (brushObject) {
        d3.select(this)
          .attr('class', 'brush')
          .selectAll('.overlay')
          .style('pointer-events', () => {
            var brush = brushObject.brush;
            if (brushObject.id === annotationBrushes.length-1 && brush !== undefined) {
              return 'all';
            } else {
              return 'none';
            }
          });
      })

    brushSelection.exit()
      .remove();
}

  getAnnotationValues () {
    const { annotations, currentTask } = this.props
    const annotation = annotations.get(currentTask.taskKey)
    if (annotation && this.isCurrentTaskValidForAnnotation()) return Array.from(annotation.value) || []
    return []
  }

  getCurrentTransform () {
    return (d3.event && d3.event.transform) ||
      (this.d3interfaceLayer && d3.zoomTransform(this.d3interfaceLayer.node())) ||
      d3.zoomIdentity
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

  zoomIn () {
    this.zoom.scaleBy(this.d3interfaceLayer.transition().duration(ZOOMING_TIME), ZOOM_IN_VALUE)
  }

  zoomOut () {
    this.zoom.scaleBy(this.d3interfaceLayer.transition().duration(ZOOMING_TIME), ZOOM_OUT_VALUE)
  }

  zoomTo (zoomValue) {
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
      .scaleExtent([props.minZoom, props.maxZoom]) // Limit zoom scale
      .on('zoom', this.doZoom.bind(this))
    
    // Annotations/markings layer
    this.d3svg
      .append('g')
      .attr('class', 'annotations-layer')
    this.d3annotationsLayer = this.d3svg.select('.annotations-layer')
    
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
  updateInteractionMode (interactionMode = '') {
    if (!this.zoom || !this.d3interfaceLayer) return

    if (interactionMode === 'annotate') {
      //this.d3svg.on('click', this.doInsertAnnotation.bind(this))
      
      this.d3interfaceLayer.style('display', 'none')
    } else if (interactionMode === 'move') {
      this.d3svg.on('click', null)
      this.d3interfaceLayer.style('display', 'inline')
    }
  }

  doZoom () {
    this.updateDataPoints()
    this.updateUserAnnotations()
    this.updatePresentation()
  }

  doInsertAnnotation () {
    const STARTING_WIDTH = 0.4
    const props = this.props
    const t = this.getCurrentTransform()
    
    if (!this.isCurrentTaskValidForAnnotation()) {
      props.enableMove && props.enableMove()
      return
    }

    // Figure out where the user clicked on the graph, then add a new annotation
    // to the array of annotations.
    const clickCoords = getClickCoords(this.d3svg.node(), this.xScale, this.yScale, t)
    const values = this.getAnnotationValues().slice()  // Create a copy
    values.push({ x: clickCoords[0], width: STARTING_WIDTH })

    props.addAnnotation(values, props.currentTask)

    this.updateUserAnnotations()
  }
  
  isCurrentTaskValidForAnnotation () {
    return this.props.currentTask.type === 'graph2dRangeX'
  }

  /*
  Re-draw the data points to fit the new view
  We don't don't add/remove data points at this step (no enter() or exit())
  because new data points are only added/removed at the drawChart() step.
  Note: users can only zoom & pan in the x-direction
   */
  updateDataPoints (shouldAnimate = false) {
    const t = this.getCurrentTransform()
    const dataPoints = this.d3dataLayer.selectAll('.data-point')

    if (shouldAnimate) {
      dataPoints
        .transition()
        .attr('cx', d => t.rescaleX(this.xScale)(d[0]))
        .attr('cy', d => this.yScale(d[1]))
    } else {
      dataPoints
        .attr('cx', d => t.rescaleX(this.xScale)(d[0]))
        .attr('cy', d => this.yScale(d[1]))
    }
  }

  /*
  Update the x-axis, y-axis, and other presentation elements to fit the new
  zoom/pan view.
  width and height are only defined if the container size changes.
   */
  updatePresentation (width, height) {
    const props = this.props
    const currentTransform = this.getCurrentTransform()

    this.updateScales(currentTransform)

    if (width && height) { // Update if container size changes.
      this.repositionAxes(width, height)
      this.repositionAxisLabels(width, height, props.axisLabelStyle)
      this.resizeDataMask(width, height, props.outerMargin)
    }
  }

  updateScales (transform) {
    this.xAxis.scale(transform.rescaleX(this.xScale)) // Rescale the x-axis to fit zoom
    this.d3axisX.call(this.xAxis)

    this.yAxis.scale(this.yScale) // Do NOT rescale the y-axis
    this.d3axisY.call(this.yAxis)
  }

  /*
  Re-draw the user annotations to fit the new view
  Note: users can only zoom & pan in the x-direction
   */
  updateUserAnnotations () {
    const t = this.getCurrentTransform()

    // Add the user annotations
    const annotationValues = this.getAnnotationValues()
    const annotations = this.d3annotationsLayer.selectAll('.user-annotation')
      .data(annotationValues)

    const getLeftEdgeOfAnnotation = (x, width = 0, xScale, transform) =>
      transform.rescaleX(this.xScale)(x - width / 2)

    const getRightEdgeOfAnnotation = (x, width, xScale, transform) =>
      transform.rescaleX(this.xScale)(x + width / 2)

    const getWidthOfAnnotation = (x, width, xScale, transform) => {
      const left = getLeftEdgeOfAnnotation(x, width, xScale, transform)
      const right = getRightEdgeOfAnnotation(x, width, xScale, transform)
      return Math.max(right - left, 0)
    }

    // For each newly added annotation value, create a new corresponding annotation SVG element.
    annotations.enter()
      .append('rect') // Class: '.user-annotation'
      .call(setUserAnnotationAttr)

      // And for all current annotations, update their annotation SVG element
      .merge(annotations)
      .attr('x', d => getLeftEdgeOfAnnotation(d.x, d.width, this.xScale, t))
      .attr('width', d => getWidthOfAnnotation(d.x, d.width, this.xScale, t))
      .attr('y', d => 0)
      .attr('height', d => '100%')

    // For each annotation SVG element that no longer has an annotation value
    // (e.g. the annotation value was deleted, or this is a fresh new Subject)
    // clean it up.
    annotations.exit().remove()
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

  innerMargin: PropTypes.number, // Defines space where data-points appear at 1x zoom
  outerMargin: PropTypes.number, // Any data-points outside these margins (i.e. when zoomed in) are cropped

  axisXLabel: PropTypes.string,
  axisYLabel: PropTypes.string,

  axisLabelStyle: PropTypes.shape({
    fontFamily: PropTypes.string,
    fontSize: PropTypes.string,
    xOffsetX: PropTypes.number,
    xOffsetY: PropTypes.number,
    yOffsetX: PropTypes.number,
    yOffsetY: PropTypes.number
  }),

  // Store-mapped Properties
  interactionMode: PropTypes.oneOf(['annotate', 'move']),
  setOnZoom: PropTypes.func.isRequired
}

LightCurveViewer.wrappedComponent.defaultProps = {
  dataExtent: { x: [-1, 1], y: [-1, 1] },
  dataPoints: [[]],

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
    yOffsetY: 20
  },

  interactionMode: '',
  setOnZoom: (type, zoomValue) => {}
}

export default LightCurveViewer

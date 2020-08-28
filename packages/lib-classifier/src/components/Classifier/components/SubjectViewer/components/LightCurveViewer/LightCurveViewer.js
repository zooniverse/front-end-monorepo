import * as d3 from 'd3'
import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactResizeDetector from 'react-resize-detector'

import addAxisLayer from './d3/addAxisLayer'
import addRemoveAnnotationButton from './d3/addRemoveAnnotationButton'
import addBackgroundLayer from './d3/addBackgroundLayer'
import addBorderLayer from './d3/addBorderLayer'
import addDataLayer from './d3/addDataLayer'
import addDataMask from './d3/addDataMask'
import addInterfaceLayer from './d3/addInterfaceLayer'
import setDataPointStyle from './d3/setDataPointStyle'

// The following are arbitrary as all heck, numbers are chosen for what "feels good"
const ZOOM_IN_VALUE = 1.2
const ZOOM_OUT_VALUE = 0.8
const ZOOMING_TIME = 100 // milliseconds
const PAN_DISTANCE = 20

class LightCurveViewer extends Component {
  constructor (props) {
    super(props)

    this.svgContainer = props.forwardRef

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
    Note: xAxis and yAxis represent the data models, not the DOM nodes or visual
    D3 components.
     */
    this.xAxis = null
    this.yAxis = null

    // Chart dimensions, updated on drawChart()
    this.chartWidth = 100
    this.chartHeight = 100

    // Each Annotation is represented as a single D3 Brush
    this.annotationBrushes = [] // This keeps track of the annotation-brushes in existence, including the DEFAULT brush (the interface brush, for creating new annotations) that exists even when there are no annotations.
  }

  componentDidMount () {
    this.initChart()
    this.props.setOnZoom(this.handleToolbarZoom.bind(this))
    this.props.setOnPan(this.pan.bind(this))
  }

  componentDidUpdate (prevProps) {
    const points = this.props.dataPoints
    const prevPoints = prevProps.dataPoints
    const sameSubject = (points === prevPoints)

    const currentTaskKey = (this.props.currentTask && this.props.currentTask.taskKey) || ''
    const prevTaskKey = (prevProps.currentTask && prevProps.currentTask.taskKey) || ''
    const sameTask = (currentTaskKey === prevTaskKey)

    if (!sameSubject) { // Triggers when changing between Subjects
      this.clearChart()

      const container = this.svgContainer.current
      const height = container.offsetHeight || 0
      const width = container.offsetWidth || 0
      this.drawChart(width, height, sameSubject)
    } else if (!sameTask) { // Triggers when changing between Workflow tasks.
      // TODO: load annotations when changing tasks.
      // If invalid task, blank out all annotaitons
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
    // Reset Subject data
    this.d3dataLayer.selectAll('.data-point').remove()

    this.resetBrushes()

    // Reset view
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
    if (height && width) {
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
        .call(setDataPointStyle, props.chartStyle)

      // For each SVG circle old/deleted data point, remove the corresponding SVG circle.
      points.exit().remove()

      // Update visual elements
      this.updateDataPoints(shouldAnimate)
      this.updatePresentation(width, height)

      if (this.props.feedback) {
        this.updateInteractionMode('move')
        this.disableBrushEvents()
        this.props.drawFeedbackBrushes(this.d3annotationsLayer, this.repositionBrush.bind(this))
      } else {
        this.updateAnnotationBrushes()
        this.initBrushes()
      }
    }
  }

  /*  Initialise D3 brushes
      One brush needs to be created at all times as an interface for listening
      for brush events.
   */
  initBrushes () {
    if (!this.annotationBrushes.length) {
      this.createAnnotationBrush() // Create the initial brush
      this.updateAnnotationBrushes()
    }

    // WIP  // TODO
    // - Create 'loadBrushesFromAnnotations()'

    // TODO: Check for the following scenarios:
    // - Change of Subject
    // - Change of step/task
    // - Canvas redraw (e.g. window resize)
  }

  resetBrushes () {
    this.annotationBrushes = []
    this.d3annotationsLayer.selectAll('.brush').remove()
  }

  /*  Save data from Annotation-Brushes to our Annotations (for Classification)
   */
  saveBrushesToAnnotations () {
    const props = this.props
    if (!this.isCurrentTaskValidForAnnotation()) return // Sanity check

    const annotations = this.annotationBrushes
      .filter((raw) => (raw.minX !== undefined && raw.maxX !== undefined && raw.minX !== null && raw.maxX !== null))
      .map((raw) => {
        const x = (raw.minX + raw.maxX) / 2
        const width = Math.abs(raw.maxX - raw.minX)
        const toolType = props.currentTask.tools[props.toolIndex].type
        return { x, width, tool: props.toolIndex, zoomLevelOnCreation: raw.zoomLevelOnCreation, toolType }
      })

    props.addAnnotation(props.currentTask, annotations)
  }

  /*
  We can create multiple D3 brushes, but this requires a special solution:
  http://bl.ocks.org/ludwigschubert/0236fa8594c4b02711b2606a8f95f605
   */
  createAnnotationBrush () {
    const defaultBrush = this.getDefaultBrush() // a.k.a. the latest brush
    const nextAvailableId = (defaultBrush && defaultBrush.id + 1) || 0

    const brush = d3.brushX()
      .on('start', this.onAnnotationBrushStart.bind(this))
      .on('brush', this.onAnnotationBrushBrushed.bind(this))
      .on('end', this.onAnnotationBrushEnd.bind(this))

    this.annotationBrushes.push({
      id: nextAvailableId,
      brush: brush,
      minX: undefined, // x, relative to the data range (not the SVG dimensions)
      maxX: undefined,
      zoomLevelOnCreation: undefined
    })
  }

  removeAnnotationBrush (annotationBrush) {
    this.annotationBrushes = this.annotationBrushes.filter((ab) => ab.id !== annotationBrush.id)
    this.updateAnnotationBrushes()
    this.saveBrushesToAnnotations()
  }

  // Helper function to prevent infinite loops
  disableBrushEvents () {
    this.annotationBrushes.forEach((annotationBrush) => {
      annotationBrush.brush
        .on('start', null)
        .on('brush', null)
        .on('end', null)
    })
  }

  enableBrushEvents () {
    this.annotationBrushes.forEach((annotationBrush) => {
      annotationBrush.brush
        .on('start', this.onAnnotationBrushStart.bind(this))
        .on('brush', this.onAnnotationBrushBrushed.bind(this))
        .on('end', this.onAnnotationBrushEnd.bind(this))
    })
  }

  /*
  Get the 'default' D3 brush, which is used as an interface to create new brushes.
   */
  getDefaultBrush () {
    return (this.annotationBrushes.length) && this.annotationBrushes[this.annotationBrushes.length - 1]
  }

  onAnnotationBrushStart () {}

  onAnnotationBrushBrushed () {}

  onAnnotationBrushEnd (annotationBrush, index, domElements) {
    const props = this.props
    const brushSelection = d3.event.selection // Returns [xMin, xMax] or null, where x is relative to the SVG (not the data)

    // If the user attempted to make a selection, BUT the current task isn't
    // a valid task, cancel that brush.
    if (!this.isCurrentTaskValidForAnnotation()) {
      // WARNING: calling brush.move() WILL trigger brush start/brushed/end
      // events. Temporarily disable events to prevent recursion.
      this.disableBrushEvents()

      this.d3annotationsLayer.select('.brush').call(annotationBrush.brush.move, null) // TODO: this is only valid for the default brush.

      // TODO: Catch what happens if a user MODIFIES an annotation-brush when it's in the wrong task
      // IDEA: reset the position of the brush.

      this.enableBrushEvents()
      props.enableMove && props.enableMove()
      return
    }

    // Update the Annotation-Brush with the data range values that was selected
    const currentTransform = this.getCurrentTransform()
    let dataMinX = brushSelection && brushSelection[0]
    let dataMaxX = brushSelection && brushSelection[1]
    annotationBrush.minX = dataMinX && currentTransform.rescaleX(this.xScale).invert((dataMinX))
    annotationBrush.maxX = dataMaxX && currentTransform.rescaleX(this.xScale).invert((dataMaxX))

    if (annotationBrush.zoomLevelOnCreation === undefined) {
      annotationBrush.zoomLevelOnCreation = this.getCurrentTransform().k
    }

    // NOTE: when MOVE mode is enabled, the d3interfaceLayer appears on top of
    // the d3annotations layer, essentially blocking any d3 brush interactions.
    // This means in practice, we don't need to check if we're in Annotate mode
    // to validate a brush action, we just need to check the current task.

    // TODO: check if we need to check for interactionMode anyway.

    // If the brush that the user used was the default brush - and that brush
    // has a "selection" (i.e. a data range) - then it means the user wants to
    // create a new annotation.
    // Otherwise, this .onbrushend might have been triggered by the user
    // modifying an existing annotation-brush.
    if (this.getDefaultBrush() === annotationBrush && brushSelection) {
      this.createAnnotationBrush()
    }

    // NOTE: we ALWAYS need one 'default' brush as the 'interface' for creating
    // new brushes, meaning this.annotationBrushes always has one D3 brush more
    // than Zooniverse annotations.

    this.updateAnnotationBrushes()
    this.saveBrushesToAnnotations()
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

  doZoom () {
    this.updateDataPoints()
    this.updatePresentation()
    if (this.props.feedback) {
      this.updateInteractionMode('move')
      this.disableBrushEvents()
      this.props.drawFeedbackBrushes(this.d3annotationsLayer, this.repositionBrush.bind(this))
    } else {
      this.updateAnnotationBrushes()
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

  pan (xMultiplier) {
    this.zoom.translateBy(this.d3interfaceLayer.transition().duration(ZOOMING_TIME), -xMultiplier * PAN_DISTANCE, 0)
  }

  /*
  Initialises the D3 scatterplot chart.
  The chart is divided into multiple layers (both functional and decorative).
  IMPORTANT: layers are added in z-index order, lowest first.
   */
  initChart () {
    const props = this.props
    const { onKeyDown } = props

    const container = this.svgContainer.current
    this.d3svg = d3.select(container)
      .append('svg')
      .attr('class', 'light-curve-viewer')
      .attr('height', '100%')
      .attr('width', '100%')
      .attr('focusable', true)
      .attr('tabindex', 0)
      .on('keydown', () => onKeyDown(d3.event))
      .style('cursor', 'crosshair')
    this.xScale = d3.scaleLinear()
    this.yScale = d3.scaleLinear()

    // Deco layer
    this.d3svg.call(addBackgroundLayer, props.chartStyle)

    /*
    Data layer
    Data points are added to this layer in drawChart().
    The supplementary data mask is a "window" or clipping path that prevents the
    data points from appearing outside of the 'middle' of the chart, i.e.
    prevents <circle>s from appearing in the margins of the container.
    */
    const uniqueId = props.id || Math.floor(Math.random() * 1000000)
    this.d3svg.call(addDataLayer, uniqueId)
    this.d3dataLayer = this.d3svg.select('.data-layer')
    this.d3svg.call(addDataMask, props.outerMargin, uniqueId)
    this.d3dataMask = this.d3svg.select('.data-mask')

    /*
    Axis layer
    Actual scaling done in updatePresentation()
     */
    this.xAxis = d3.axisTop(this.yScale)
    this.yAxis = d3.axisRight(this.yScale)
    addAxisLayer(this.d3svg, props.chartStyle, this.xAxis, this.yAxis, props.axisXLabel, props.axisYLabel)
    // Adds: g.axis-layer, g.x-axis, g.y-axis, text.x-axis-label, text.y-axis-label

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

    // Show or hide the interface layer (which blocks interaction with the
    // annotations layer)
    if (interactionMode === 'annotate') {
      this.d3interfaceLayer.style('display', 'none')
    } else if (interactionMode === 'move') {
      this.d3interfaceLayer.style('display', 'inline')
    }
  }

  isCurrentTaskValidForAnnotation () {
    return this.props.currentTask.type === 'dataVisAnnotation' && this.props.currentTask.tools.some(tool => tool.type === 'graph2dRangeX')
  }

  /*
  Updates and re-draws the Annotation Brushes.
   */
  updateAnnotationBrushes () {
    const annotationBrushes = this.annotationBrushes
    const defaultBrush = this.getDefaultBrush()

    // Join the D3 brush objects with our internal annotationBrushes array
    const brushSelection = this.d3annotationsLayer
      .selectAll('.brush')
      .data(annotationBrushes, (d) => d.id)

    // Set up new brushes
    brushSelection.enter()
      .insert('g', '.brush')
      .attr('class', 'brush')
      .attr('id', (brush) => (`brush-${brush.id}`))
      .each(function applyBrushLogic (annotationBrush) { // Don't use ()=>{}
        annotationBrush.brush(d3.select(this)) // Apply the brush logic to the <g.brush> element (i.e. 'this')
      })
      .call(addRemoveAnnotationButton, this.removeAnnotationBrush.bind(this)) // Note: the datum (the Annotation Brush) is passed as an argument to removeAnnotationBrush() due to the way that the data is joined by `.data()` above

    // Modify brushes so that their invisible overlays don't overlap and
    // accidentally block events from the brushes below them. The 'default'
    // brush - aka the interface for creating new brushes - is the exception.
    brushSelection
      .each(function disableInvisibleBrushOverlay (annotationBrush) { // Don't use ()=>{}
        d3.select(this)
          .attr('class', 'brush')
          .selectAll('.overlay')
          .style('pointer-events', () => {
            const brush = annotationBrush.brush
            if (annotationBrush.id === defaultBrush.id && brush !== undefined) return 'all'
            return 'none'
          })
      })

    // Remove unused brushes
    brushSelection.exit()
      .remove()

    // Reposition/re-draw brushes
    this.disableBrushEvents() // Temporarily disable brush events to prevent recursion from `annotationBrush.brush.move`
    this.annotationBrushes.forEach((annotationBrush) => {
      const d3brush = this.d3annotationsLayer.select(`#brush-${annotationBrush.id}`)

      // If the brush has no selection (e.g. the default brush), ignore.
      if (!annotationBrush.minX || !annotationBrush.maxX) {
        d3brush.select('.remove-button').attr('visibility', 'hidden')
        return
      }

      this.repositionBrush(annotationBrush, d3brush)
    })
    this.enableBrushEvents() // Re-enable brush events
  }

  repositionBrush (brush, d3brush) {
    const currentTransform = this.getCurrentTransform()

    const minXonScreen = currentTransform.rescaleX(this.xScale)(brush.minX)
    const maxXonScreen = currentTransform.rescaleX(this.xScale)(brush.maxX)
    const midXonScreen = currentTransform.rescaleX(this.xScale)((brush.minX + brush.maxX) / 2)

    // Reposition the brushes (selected areas)...
    d3brush.call(brush.brush.move, [minXonScreen, maxXonScreen])

    // ...and their corresponding 'remove annotation' buttons
    d3brush.select('.remove-button')
      .attr('visibility', 'visible')
      .attr('transform', `translate(${midXonScreen}, 0)`)
  }

  /*
  Re-draw the data points to fit the new view
  We don't don't add/remove data points at this step (no enter() or exit())
  because new data points are only added/removed at the drawChart() step.
  Note: users can only zoom & pan in the x-direction
   */
  updateDataPoints (shouldAnimate = false) {
    const currentTransform = this.getCurrentTransform()
    const dataPoints = this.d3dataLayer.selectAll('.data-point')

    if (shouldAnimate) {
      dataPoints
        .transition()
        .attr('cx', d => currentTransform.rescaleX(this.xScale)(d[0]))
        .attr('cy', d => this.yScale(d[1]))
    } else {
      dataPoints
        .attr('cx', d => currentTransform.rescaleX(this.xScale)(d[0]))
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
      this.repositionAxisLabels(width, height, props.chartStyle)
      this.resizeDataMask(width, height, props.outerMargin)
    }
  }

  updateScales (transform) {
    this.xAxis.scale(transform.rescaleX(this.xScale)) // Rescale the x-axis to fit zoom
    this.d3svg.select('.x-axis').call(this.xAxis)

    this.yAxis.scale(this.yScale) // Do NOT rescale the y-axis
    this.d3svg.select('.y-axis').call(this.yAxis)
  }

  repositionAxes (width, height) {
    this.d3svg.select('.x-axis').attr('transform', `translate(0, ${height})`)
    this.d3svg.select('.y-axis').attr('transform', `translate(0, 0)`)
  }

  repositionAxisLabels (width, height, chartStyle) {
    const props = this.props
    this.d3svg.select('.x-axis-label')
      .attr('transform', `translate(${width + props.axisXOffsetX}, ${height + props.axisXOffsetY})`)
    this.d3svg.select('.y-axis-label')
      .attr('transform', `translate(${props.axisYOffsetX}, ${props.axisYOffsetY})`)
  }

  // Resize the data mask, so data-points remain in view
  resizeDataMask (width, height, margin) {
    this.d3dataMask
      .attr('width', width - margin * 2)
      .attr('height', height - margin * 2)
  }

  render () {
    return (
      <Box
        className='light-curve-viewer'
        fill
        ref={this.svgContainer}
      >
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.drawChart.bind(this)}
          refreshMode='debounce'
          refreshRate={500}
        />
      </Box>
    )
  }
}

LightCurveViewer.propTypes = {
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
  axisXOffsetX: PropTypes.number,
  axisXOffsetY: PropTypes.number,

  axisYLabel: PropTypes.string,
  axisYOffsetX: PropTypes.number,
  axisYOffsetY: PropTypes.number,

  chartStyle: PropTypes.shape({
    color: PropTypes.string,
    background: PropTypes.string,
    dataPointSize: PropTypes.string,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.string
  }),

  id: PropTypes.number,
  interactionMode: PropTypes.oneOf(['annotate', 'move']),
  setOnZoom: PropTypes.func.isRequired,

  onKeyDown: PropTypes.func
}

LightCurveViewer.defaultProps = {
  forwardRef: React.createRef(),

  dataExtent: { x: [-1, 1], y: [-1, 1] },
  dataPoints: [[]],

  minZoom: 1,
  maxZoom: 10,

  innerMargin: 30,
  outerMargin: 10,

  axisXLabel: 'Days',
  axisXOffsetX: -40,
  axisXOffsetY: -20,

  axisYLabel: 'Brightness',
  axisYOffsetX: 20,
  axisYOffsetY: 20,

  chartStyle: {
    color: '#eff2f5', // Zooniverse Light Grey
    background: '#003941', // Zooniverse Dark Teal
    dataPointSize: '1.5',
    fontFamily: 'inherit',
    fontSize: '0.75rem'
  },

  id: undefined, // Specify a unique ID for each LCV; required to distinguish data-masks. WARNING: do not apply Math.random() here, as the random value will be set at the class level, and therefore be the same for each instance of the LCV.
  interactionMode: 'annotate',

  onKeyDown: () => true
}

export default LightCurveViewer

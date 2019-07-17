import cuid from 'cuid'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import getDrawingTool from '../Drawing/helpers/getDrawingTool'
import InteractionLayer from './InteractionLayer'

function storeMapper (stores) {
  const {
    active: activeDrawingTool,
    addToStream,
    eventStream
  } = stores.classifierStore.drawing
  const { dimensions } = stores.classifierStore.subjectViewer
  const { activeStepTasks } = stores.classifierStore.workflowSteps
  return {
    activeDrawingTool,
    activeStepTasks,
    addToStream,
    dimensions,
    eventStream
  }
}

@inject(storeMapper)
@observer
class InteractionLayerContainer extends Component {
  constructor () {
    super()

    this.state = {
      currentMark: null,
      drawing: false,
      marks: new Map()
    }

    this.drawMark = this.drawMark.bind(this)
    this.getEventOffset = this.getEventOffset.bind(this)
    this.getNewMark = this.getNewMark.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  componentDidMount () {
    // const stream = this.props.eventStream
    // stream.subscribe(z => console.log('z = ', z))
    this.drawMark()
  }

  componentDidUpdate () {
    this.drawMark()
  }

  drawMark () {
    const { eventStream } = this.props

    if (eventStream) {
      eventStream.subscribe(event => {
        const { currentMark, drawing, marks } = this.state
        let newMark
  
        // initial mark
        if (marks.size === 0 && event.type === 'mousedown') {
          newMark = this.getNewMark(event)
          this.setState({ currentMark: newMark, drawing: true })
        }
  
        // while drawing
        if (drawing) {
          // move mark
          if (event.type === 'mousemove') {
          newMark = this.getNewMark(event)
          this.setState({ currentMark: newMark })
          }
          // finish mark
          if (event.type === 'mouseup') {
            this.setState({ drawing: false })
          }
        }
  
        // subsequent mark
        if (!drawing && currentMark !== null && event.type === 'mousedown') {
          newMark = this.getNewMark(event)
          const newMarks = new Map(marks)
          newMarks.set(currentMark.id, currentMark)
          this.setState({ currentMark: newMark, drawing: true, marks: newMarks })
        }
      })
    }
  }

  getEventOffset (x, y) {
    const { svg } = this.props

    const svgEvent = svg.createSVGPoint()
    svgEvent.x = x
    svgEvent.y = y
    const svgEventOffset = svgEvent.matrixTransform(svg.getScreenCTM().inverse())

    return svgEventOffset
  }

  getNewMark (event) {
    const { activeDrawingTool, activeStepTasks } = this.props

    const [drawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
    const newMark = Object.assign({
      id: cuid(),
      toolType: drawingTask.tools[activeDrawingTool].type
    }, event)

    return newMark
  }

  addToStream (event, type) {
    const svgEventOffset = this.getEventOffset(event.clientX, event.clientY)

    this.props.addToStream({
      target: event.target,
      type,
      x: svgEventOffset.x,
      y: svgEventOffset.y
    })
  }

  onMouseDown (event) {
    this.addToStream(event, 'mousedown')
  }

  onMouseMove (event) {
    this.addToStream(event, 'mousemove')
  }

  onMouseUp (event) {
    this.addToStream(event, 'mouseup')
  }

  render () {
    const subjectDimensions = toJS(this.props.dimensions)
    const { currentMark, marks } = this.state
    
    let MarkComponent
    let scale = {
      horizontal: 1,
      vertical: 1
    }

    if (subjectDimensions && subjectDimensions.length) {
      const [dimensions] = subjectDimensions
      scale = {
        horizontal: dimensions.clientWidth / dimensions.naturalWidth,
        vertical: dimensions.clientHeight / dimensions.naturalHeight
      }
    }

    if (currentMark !== null) {
      MarkComponent = getDrawingTool(currentMark.toolType)
    }

    return (
      <>
        <InteractionLayer
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        />
        {MarkComponent && (
          <MarkComponent key={currentMark.id} active mark={currentMark} scale={scale} />
        )}
        {marks.size > 0 && Array.from(marks, ([id, marking]) => {
          if (marking === null) {
            return null
          }

          const MarkingComponent = getDrawingTool(marking.toolType)
          return (
            <MarkingComponent key={id} mark={marking} scale={scale} />
          )
        })}
      </>
    )
  }
}

InteractionLayerContainer.wrappedComponent.propTypes = {
  activeDrawingTool: PropTypes.number,
  activeStepTasks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string
    })
  ),
  addToStream: PropTypes.func,
  dimensions: PropTypes.arrayOf(
    PropTypes.shape({
      clientHeight: PropTypes.number,
      clientWidth: PropTypes.number,
      naturalHeight: PropTypes.number,
      naturalWidth: PropTypes.number
    })
  ),
  eventStream: PropTypes.object
}

export default InteractionLayerContainer

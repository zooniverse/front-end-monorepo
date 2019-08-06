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

    this.finishDrawing = this.finishDrawing.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }

  finishDrawing (id) {
    const { drawing, currentMark } = this.state
    if (drawing && id === currentMark.id) {
      this.setState({ drawing: false })
    }
  }

  addToStream (event) {
    this.props.addToStream(event)
  }

  onMouseDown (event) {
    this.addToStream(event)
    if (!this.state.drawing) {
      const { activeDrawingTool, activeStepTasks } = this.props
      const [drawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
      this.setState({
        drawing: true,
        currentMark: {
          id: cuid(),
          tool: drawingTask.tools[activeDrawingTool]
        }
      })
    }
  }

  onMouseMove (event) {
    this.addToStream(event)
  }

  onMouseUp (event) {
    this.addToStream(event)
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

    if (currentMark !== null && currentMark.tool && currentMark.tool.type) {
      MarkComponent = getDrawingTool(currentMark.tool.type)
    }

    return (
      <>
        <InteractionLayer
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        />
        {MarkComponent && (
          <MarkComponent
            key={currentMark.id}
            active
            finishDrawing={this.finishDrawing}
            mark={currentMark}
            scale={scale}
          />
        )}
        {marks.size > 0 && Array.from(marks, ([id, marking]) => {
          if (marking === null) {
            return null
          }

          const MarkingComponent = getDrawingTool(marking.tool.type)
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

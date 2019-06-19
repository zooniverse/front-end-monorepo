import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'

import getDrawingTool from './tools'

function storeMapper (stores) {
  const {
    enableAnnotate,
    enableMove,
    interactionMode,
    setOnPan,
    setOnZoom
  } = stores.classifierStore.subjectViewer

  const {
    addAnnotation,
    currentAnnotations
  } = stores.classifierStore.classifications

  const currentTask =
    (stores.classifierStore.workflowSteps.activeStepTasks &&
      stores.classifierStore.workflowSteps.activeStepTasks[0]) ||
    {}

  const {
    addToStream,
    eventStream,
    activeTask,
    activeTool
  } = stores.classifierStore.drawing
  
  return {
    activeTask,
    activeTool,
    addAnnotation,
    addToStream,
    currentAnnotations,
    currentTask,
    enableAnnotate,
    enableMove,
    eventStream,
    interactionMode,
    setOnPan,
    setOnZoom
  }
}

@inject(storeMapper)
@observer
class MarkingsInitializer extends Component {
  constructor () {
    super()

    this.state = {
      event: null
    }
  }

  componentDidMount() {
    const { addAnnotation, currentAnnotations, currentTask, eventStream } = this.props
    eventStream.subscribe(event => {
      const eventType = event.event
      
      if (eventType === 'mousedown') {
        this.setState({ event })
      }

      if (eventType === 'mousemove') {
        this.setState({ event })
      }

      if (eventType === 'mouseup') {
        const value = [{
          tool: 0,
          toolType: 'point',
          x: event.x,
          y: event.y
        }]
        addAnnotation(value, currentTask)
        this.setState({ event: null })
      }
    })
  }

  render () {
    const { activeTask, activeTool, currentTask } = this.props
    const toolDescription = currentTask.tools[0]

    const scale = {
      horizontal: 0.5,
      vertical: 0.5
    }

    const MarkComponent = getDrawingTool(toolDescription.type)

    const { event } = this.state

    if (currentTask && toolDescription && event) {
      return (
        <g
          height='100%'
          width='100%'
        >
          <MarkComponent key={Math.random()} mark={event} scale={scale} />
        </g>
      )
    } else {
      return null
    }
  }
}

MarkingsInitializer.wrappedComponent.defaultProps = {}

MarkingsInitializer.wrappedComponent.propTypes = {}

export default MarkingsInitializer

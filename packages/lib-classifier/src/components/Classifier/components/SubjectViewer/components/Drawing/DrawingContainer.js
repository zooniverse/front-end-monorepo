import cuid from 'cuid'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import getDrawingTool from './helpers/getDrawingTool'

function storeMapper (stores) {
  const { activeDrawingTool, eventStream } = stores.classifierStore.drawing
  const { activeStepTasks } = stores.classifierStore.workflowSteps
  return {
    activeDrawingTool,
    activeStepTasks,
    eventStream
  }
}

@inject(storeMapper)
@observer
class DrawingContainer extends Component {
  constructor () {
    super()

    this.state = {
      activeMark: null,
      marks: new Map()
    }

    // TEMP CODE UNTIL COORDINATE STREAM
    this.tempSubscription = null

    this.finishMark = this.finishMark.bind(this)
  }

  componentDidMount () {
    this.setActiveMark()

    // TEMP CODE UNTIL COORDINATE STREAM
    const { eventStream } = this.props
    if (eventStream) {
      this.tempSubscription = eventStream.subscribe(event => {
        if (event.type === 'pointerup') {
          this.tempMarkCreation()
        }
      })
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.activeStepTasks !== prevProps.activeStepTasks || this.props.activeDrawingTool !== prevProps.activeDrawingTool) {
      this.setActiveMark()
    }
  }

  // TEMP CODE UNTIL COORDINATE STREAM
  componentWillUnmount () {
    if (this.tempSubscription) {
      this.tempSubscription.unsubscribe()
    }
  }

  // TEMP CODE UNTIL COORDINATE STREAM
  tempMarkCreation () {
    const { activeDrawingTool, activeStepTasks } = this.props

    if (activeStepTasks && activeStepTasks.length > 0) {
      const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
      const tool = activeDrawingTask.tools[activeDrawingTool]
      if (tool.type === 'line') {
        const coordinates = { x1: (Math.floor(Math.random() * 400)), y1: (Math.floor(Math.random() * 400)), x2: (Math.floor(Math.random() * 400)), y2: (Math.floor(Math.random() * 400)) }
        this.finishMark(coordinates)
      }
      if (tool.type === 'point') {
        const coordinates = { x: (Math.floor(Math.random() * 400)), y: (Math.floor(Math.random() * 400)) }
        this.finishMark(coordinates)
      }
    }
  }

  setActiveMark () {
    const { activeDrawingTool, activeStepTasks } = this.props

    if (activeStepTasks && activeStepTasks.length > 0) {
      const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
      this.setState({
        activeMark: {
          id: cuid(),
          tool: activeDrawingTask.tools[activeDrawingTool]
        }
      })
    }
  }

  finishMark (coordinates) {
    if (!coordinates) return null

    const { activeDrawingTool, activeStepTasks } = this.props
    const { activeMark, marks } = this.state

    const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')

    const newMark = {
      id: cuid(),
      tool: activeDrawingTask.tools[activeDrawingTool]
    }

    const finishedMark = Object.assign(activeMark, { coordinates })
    const newMarks = new Map(marks)
    newMarks.set(finishedMark.id, finishedMark)

    this.setState({ activeMark: newMark, marks: newMarks })
  }

  render () {
    const { activeMark, marks } = this.state
    if (!activeMark) return null

    const MarkComponent = getDrawingTool(activeMark.tool.type)
    // TODO: add error handling if don't get requested tool type

    return (
      <>
        <MarkComponent
          key={activeMark.id}
          active
          finishDrawing={this.finishMark}
          tool={activeMark.tool}
        />
        {marks.size > 0 && Array.from(marks, ([id, marking]) => {
          if (!marking) {
            return null
          }

          const MarkingComponent = getDrawingTool(marking.tool.type)
          return (
            <MarkingComponent
              key={id}
              coordinates={marking.coordinates}
              tool={marking.tool}
            />
          )
        })}
      </>
    )
  }
}

DrawingContainer.propTypes = {
  activeDrawingTool: PropTypes.number,
  activeStepTasks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string
    })
  )
}

export default DrawingContainer

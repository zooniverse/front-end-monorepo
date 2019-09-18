import cuid from 'cuid'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import getDrawingTool from './helpers/getDrawingTool'

function storeMapper (stores) {
  const { activeDrawingTool } = stores.classifierStore.drawing
  const { activeStepTasks } = stores.classifierStore.workflowSteps
  return {
    activeDrawingTool,
    activeStepTasks
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

    this.finishMark = this.finishMark.bind(this)
  }

  componentDidMount () {
    this.setActiveMark()
  }

  componentDidUpdate (prevProps) {
    if (this.props.activeStepTasks !== prevProps.activeStepTasks || this.props.activeDrawingTool !== prevProps.activeDrawingTool) {
      this.setActiveMark()
    }
  }

  setActiveMark () {
    const { activeDrawingTool, activeStepTasks } = this.props
    const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
    this.setState({
      activeMark: {
        id: cuid(),
        tool: activeDrawingTask.tools[activeDrawingTool]
      }
    })
  }

  finishMark (coordinates) {
    if (!coordinates || coordinates.length === 0) return null

    const { activeDrawingTask, activeDrawingTool } = this.props
    const { activeMark, marks } = this.state
    
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

export default DrawingContainer

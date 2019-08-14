import cuid from 'cuid'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import getDrawingTool from './helpers/getDrawingTool'
import withCoordsFromStream from './helpers/withCoordsFromStream'

function storeMapper (stores) {
  const {
    active: activeDrawingTool
  } = stores.classifierStore.drawing
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

    this.storeMark = this.storeMark.bind(this)
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
    const [drawingTask] = activeStepTasks.filter(task => task.type === 'drawing')

    this.setState({
      activeMark: {
        id: cuid(),
        tool: drawingTask.tools[activeDrawingTool]
      }
    })
  }

  storeMark (coordinates) {
    if (!coordinates || coordinates.length === 0) return null

    const { activeDrawingTool, activeStepTasks } = this.props
    const [drawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
    const { activeMark, marks } = this.state

    const newMark = {
      id: cuid(),
      tool: drawingTask.tools[activeDrawingTool]
    }

    const storeMark = Object.assign(activeMark, { coordinates })
    const newMarks = new Map(marks)
    newMarks.set(storeMark.id, storeMark)

    this.setState({ activeMark: newMark, marks: newMarks })
  }

  render () {
    const { activeMark, marks } = this.state
    if (!activeMark) return null

    const MarkComponent = getDrawingTool(activeMark.tool.type)
    const WithStreamCoordsMarkComponent = withCoordsFromStream(MarkComponent)

    return (
      <>
        <WithStreamCoordsMarkComponent
          key={activeMark.id}
          active
          storeMark={this.storeMark}
          svg={this.props.svg}
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

DrawingContainer.wrappedComponent.propTypes = {
  activeDrawingTool: PropTypes.number,
  activeStepTasks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string
    })
  ),
  svg: PropTypes.object
}

export default DrawingContainer

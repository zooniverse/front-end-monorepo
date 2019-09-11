import cuid from 'cuid'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import getDrawingTool from './helpers/getDrawingTool'

function storeMapper (stores) {
  const {
    activeDrawingTask,
    activeDrawingTool,
    coordinateStream,
    drawingInActiveWorkflowStepBoolean,
    eventStream
  } = stores.classifierStore.drawing
  return {
    activeDrawingTask,
    activeDrawingTool,
    coordinateStream,
    drawingInActiveWorkflowStepBoolean,
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

    this.finishMark = this.finishMark.bind(this)
  }

  componentDidMount () {
    const { coordinateStream, eventStream } = this.props
    // eventStream.subscribe(event => console.log('eventStream sanity check'))
  
    // coordinateStream.subscribe(event => console.log('coordinateStream', event))
    
    this.setActiveMark()
  }

  componentDidUpdate (prevProps) {
    if (this.props.activeDrawingTask !== prevProps.activeDrawingTask || this.props.activeDrawingTool !== prevProps.activeDrawingTool) {
      this.setActiveMark()
    }
  }

  setActiveMark () {
    const { activeDrawingTask, activeDrawingTool } = this.props
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
          tool={activeMark.tool}
          finishMark={this.finishMark}
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
  activeDrawingTask: PropTypes.shape({
    tool: PropTypes.arrayOf(
      PropTypes.object // TODO elaborate
    )
  }),
  activeDrawingTool: PropTypes.number,
  svg: PropTypes.object
}

export default DrawingContainer
